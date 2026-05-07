/**
 * Public endpoint — records a page view.
 * Called client-side by <PageTracker /> on each new page visit.
 */
import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase.server";

export const dynamic = "force-dynamic";

const WINDOW_MS = 60_000;
const MAX_EVENTS_PER_WINDOW = 30;
const hits = new Map<string, { count: number; resetAt: number }>();

function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  return origin === new URL(request.url).origin;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const current = hits.get(key);

  if (!current || current.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > MAX_EVENTS_PER_WINDOW;
}

function isPublicPath(path: string): boolean {
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
  if (path.startsWith("/admin") || path.startsWith("/dashboard") || path.startsWith("/api")) return false;
  if (/^https?:\/\//i.test(path)) return false;
  return path.length <= 255;
}

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ ok: false }, { status: 403 });
    }

    if (isRateLimited(clientIp(request))) {
      return NextResponse.json({ ok: false }, { status: 429 });
    }

    const { path, referrer } = await request.json();
    if (!path || typeof path !== "string" || !isPublicPath(path)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const supabase = getSupabase();
    await supabase
      .from("page_views")
      .insert({ path: path.slice(0, 255), referrer: referrer?.slice(0, 255) ?? null });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
