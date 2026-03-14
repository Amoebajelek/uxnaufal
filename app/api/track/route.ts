/**
 * Public endpoint — records a page view.
 * Called client-side by <PageTracker /> on each new page visit.
 */
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase.server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { path, referrer } = await request.json();
    if (!path || typeof path !== "string") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    // Never track admin or API paths
    if (path.startsWith("/admin") || path.startsWith("/api")) {
      return NextResponse.json({ ok: false });
    }
    await supabase
      .from("page_views")
      .insert({ path: path.slice(0, 255), referrer: referrer?.slice(0, 255) ?? null });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
