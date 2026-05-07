import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";
import { safeDashboardPath } from "@/lib/redirect";

async function isSessionActive(sessionId: string): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return false;

  const endpoint = new URL("/rest/v1/admin_sessions", url);
  endpoint.searchParams.set("select", "id");
  endpoint.searchParams.set("id", `eq.${sessionId}`);
  endpoint.searchParams.set("is_active", "eq.true");
  endpoint.searchParams.set("expires_at", `gt.${new Date().toISOString()}`);
  endpoint.searchParams.set("limit", "1");

  try {
    const res = await fetch(endpoint, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      cache: "no-store",
    });
    if (!res.ok) return false;
    const rows = (await res.json()) as unknown[];
    return rows.length > 0;
  } catch {
    return false;
  }
}

function hasTrustedOrigin(request: NextRequest): boolean {
  const method = request.method.toUpperCase();
  if (method === "GET" || method === "HEAD" || method === "OPTIONS") return true;

  const origin = request.headers.get("origin");
  if (!origin) return true;

  return origin === request.nextUrl.origin;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Legacy /admin/* → redirect to /dashboard/* ──────────────────────────
  if (pathname.startsWith("/admin")) {
    const newPath = pathname.replace(/^\/admin/, "/dashboard");
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  // ── Login API: allow unauthenticated credential check ─────────────────────
  if (pathname === "/api/admin/auth" && request.method === "POST") {
    if (!hasTrustedOrigin(request)) {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }
    return NextResponse.next();
  }

  // ── Verify session cookie (used for all /dashboard/* and /api/admin/*) ───
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const { valid, sessionId } = await verifySessionToken(token);
  const active = valid ? await isSessionActive(sessionId) : false;

  // ── Login page: only show when session is NOT valid ──────────────────────
  if (pathname === "/dashboard/login") {
    if (active) {
      // Already authenticated → redirect to dashboard (or ?next= target)
      const next = safeDashboardPath(request.nextUrl.searchParams.get("next"));
      return NextResponse.redirect(new URL(next, request.url));
    }
    return NextResponse.next();
  }

  if (pathname === "/api/admin/auth" && request.method === "DELETE") {
    if (!hasTrustedOrigin(request)) {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }
    if (!active) return NextResponse.next();

    const headers = new Headers(request.headers);
    headers.set("x-session-id", sessionId);
    return NextResponse.next({ request: { headers } });
  }

  // ── Protect /dashboard/* and /api/admin/* ────────────────────────────────
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/api/admin")) {
    if (pathname.startsWith("/api/admin") && !hasTrustedOrigin(request)) {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }

    if (!active) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const loginUrl = new URL("/dashboard/login", request.url);
      loginUrl.searchParams.set("next", safeDashboardPath(pathname));
      return NextResponse.redirect(loginUrl);
    }

    // Inject session ID into request headers for downstream handlers
    const headers = new Headers(request.headers);
    headers.set("x-session-id", sessionId);
    return NextResponse.next({ request: { headers } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/api/admin/:path*"],
};
