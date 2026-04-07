import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Legacy /admin/* → redirect to /dashboard/* ──────────────────────────
  if (pathname.startsWith("/admin")) {
    const newPath = pathname.replace(/^\/admin/, "/dashboard");
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  // ── Auth API: always allow ────────────────────────────────────────────────
  if (pathname.startsWith("/api/admin/auth")) {
    return NextResponse.next();
  }

  // ── Verify session cookie (used for all /dashboard/* and /api/admin/*) ───
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const { valid, sessionId } = await verifySessionToken(token);

  // ── Login page: only show when session is NOT valid ──────────────────────
  if (pathname === "/dashboard/login") {
    if (valid) {
      // Already authenticated → redirect to dashboard (or ?next= target)
      const next = request.nextUrl.searchParams.get("next") ?? "/dashboard";
      return NextResponse.redirect(new URL(next, request.url));
    }
    return NextResponse.next();
  }

  // ── Protect /dashboard/* and /api/admin/* ────────────────────────────────
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/api/admin")) {
    if (!valid) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const loginUrl = new URL("/dashboard/login", request.url);
      loginUrl.searchParams.set("next", pathname);
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
