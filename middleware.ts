import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME  = "uxnaufal_admin";
const COOKIE_VALUE = "authenticated";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Legacy /admin/* → redirect to /dashboard/* ──────────────────────────
  if (pathname.startsWith("/admin")) {
    const newPath = pathname.replace(/^\/admin/, "/dashboard");
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  // ── Allow login page and auth API without auth ───────────────────────────
  if (
    pathname === "/dashboard/login" ||
    pathname.startsWith("/api/admin/auth")
  ) {
    return NextResponse.next();
  }

  // ── Protect /dashboard/* and /api/admin/* ────────────────────────────────
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/api/admin")) {
    const token = request.cookies.get(COOKIE_NAME);
    if (token?.value !== COOKIE_VALUE) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/dashboard/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/api/admin/:path*"],
};
