import { NextResponse } from "next/server";
import { readAdminConfig, verifyAdminPassword, writeAdminConfig } from "@/lib/admin-config.server";
import { getSupabase } from "@/lib/supabase.server";
import { SESSION_COOKIE, SESSION_DURATION, createSessionToken } from "@/lib/session";

export const dynamic = "force-dynamic";

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

// ── POST /api/admin/auth — login ────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const { username, password, rememberMe } = await request.json();
    const config = await readAdminConfig();

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      username !== config.username ||
      !verifyAdminPassword(config, password)
    ) {
      return NextResponse.json({ error: "Username atau password salah" }, { status: 401 });
    }

    if (config.legacyPassword) {
      writeAdminConfig({ username: config.username, password }).catch((e) => {
        console.warn("[auth] legacy password hash upgrade failed:", e);
      });
    }

    const maxAge = rememberMe ? SESSION_DURATION.long : SESSION_DURATION.short;
    const expiresAt = new Date(Date.now() + maxAge * 1000);

    const supabase = getSupabase();
    const { data: session, error } = await supabase
      .from("admin_sessions")
      .insert({
        expires_at: expiresAt.toISOString(),
        ip: getClientIp(request),
        user_agent: request.headers.get("user-agent") ?? "unknown",
        is_active: true,
      })
      .select("id")
      .single();

    if (error || !session) {
      console.error("[auth] session DB insert failed:", error);
      return NextResponse.json({ error: "Gagal membuat sesi login." }, { status: 500 });
    }

    const sessionId = session.id;

    // Build signed cookie token
    const token = await createSessionToken(sessionId, expiresAt.getTime());

    const res = NextResponse.json({ success: true });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge,
      path: "/",
    });
    return res;
  } catch (e) {
    console.error("[auth] POST error:", e);
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}

// ── DELETE /api/admin/auth — logout ─────────────────────────────────────────
export async function DELETE(request: Request) {
  // Middleware injects x-session-id for authenticated routes
  const sessionId = request.headers.get("x-session-id");

  if (sessionId) {
    const supabase = getSupabase();
    const { error: deactivateErr } = await supabase
      .from("admin_sessions")
      .update({ is_active: false })
      .eq("id", sessionId);
    if (deactivateErr) console.warn("[auth] session deactivate failed:", deactivateErr);
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, "", { maxAge: 0, path: "/" });
  return res;
}
