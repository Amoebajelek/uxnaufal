import { NextResponse } from "next/server";
import { readAdminConfig } from "@/lib/admin-config.server";

export const dynamic = "force-dynamic";

const COOKIE_NAME = "uxnaufal_admin";
const COOKIE_VALUE = "authenticated";

// POST /api/admin/auth  → login
export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const config = readAdminConfig();
    if (username === config.username && password === config.password) {
      const res = NextResponse.json({ success: true });
      res.cookies.set(COOKIE_NAME, COOKIE_VALUE, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });
      return res;
    }
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}

// DELETE /api/admin/auth  → logout
export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
  return res;
}
