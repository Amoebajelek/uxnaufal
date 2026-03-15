import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase.server";

export const dynamic = "force-dynamic";

// ── GET /api/admin/sessions — list active sessions ──────────────────────────
export async function GET(request: Request) {
  const currentSessionId = request.headers.get("x-session-id") ?? "";

  const { data, error } = await supabase
    .from("admin_sessions")
    .select("id, created_at, expires_at, ip, user_agent, is_active")
    .eq("is_active", true)
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const sessions = (data ?? []).map((s) => ({
    ...s,
    is_current: s.id === currentSessionId,
  }));

  return NextResponse.json(sessions);
}

// ── DELETE /api/admin/sessions — revoke session(s) ──────────────────────────
// ?id=<uuid>   → revoke specific session
// ?all=1       → revoke all sessions except current
export async function DELETE(request: Request) {
  const currentSessionId = request.headers.get("x-session-id") ?? "";
  const { searchParams } = new URL(request.url);
  const id  = searchParams.get("id");
  const all = searchParams.get("all") === "1";

  if (all) {
    const { error } = await supabase
      .from("admin_sessions")
      .update({ is_active: false })
      .eq("is_active", true)
      .neq("id", currentSessionId);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else if (id) {
    const { error } = await supabase
      .from("admin_sessions")
      .update({ is_active: false })
      .eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    return NextResponse.json({ error: "Sertakan ?id=<uuid> atau ?all=1" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
