import { NextResponse } from "next/server";
import { readAdminConfig } from "@/lib/admin-config.server";
import { supabase } from "@/lib/supabase.server";
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

    if (username !== config.username || password !== config.password) {
      return NextResponse.json({ error: "Username atau password salah" }, { status: 401 });
    }

    const maxAge = rememberMe ? SESSION_DURATION.long : SESSION_DURATION.short;
    const expiresAt = new Date(Date.now() + maxAge * 1000);

    // Create session record in DB (best-effort — login still works if this fails)
    let sessionId: string;
    try {
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

      if (error || !session) throw error ?? new Error("no session returned");
      sessionId = session.id;
    } catch (dbErr) {
      console.warn("[auth] session DB insert failed (continuing without it):", dbErr);
      // Fallback: random UUID — token still validates via HMAC, sessions list just won't show it
      sessionId = crypto.randomUUID();
    }

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
