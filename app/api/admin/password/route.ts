import { NextResponse } from "next/server";
import { readAdminConfig, writeAdminConfig } from "@/lib/admin-config.server";

export const dynamic = "force-dynamic";

// GET /api/admin/password  → return current username (no password)
export async function GET() {
  const config = await readAdminConfig();
  return NextResponse.json({ username: config.username });
}

// PUT /api/admin/password  → change password (and optionally username)
export async function PUT(request: Request) {
  try {
    const { currentPassword, newUsername, newPassword } = await request.json();

    const config = await readAdminConfig();
    if (currentPassword !== config.password) {
      return NextResponse.json({ error: "Password saat ini salah." }, { status: 401 });
    }

    if (!newPassword || newPassword.length < 4) {
      return NextResponse.json(
        { error: "Password baru minimal 4 karakter." },
        { status: 400 }
      );
    }

    const newUsername2 = (newUsername ?? "").trim();
    if (!newUsername2 || newUsername2.length < 3) {
      return NextResponse.json(
        { error: "Username minimal 3 karakter." },
        { status: 400 }
      );
    }

    await writeAdminConfig({ username: newUsername2, password: newPassword });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[password] PUT error:", e);
    const msg = e instanceof Error ? e.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
