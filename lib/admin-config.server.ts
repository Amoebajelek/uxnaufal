/**
 * Server-only: persists admin credentials in Supabase.
 * Falls back to env credentials, or dev-only admin/admin when DB is unavailable.
 */

import { getSupabase } from "./supabase.server";
import { hashPassword, verifyPassword } from "./password.server";

export interface AdminConfig {
  username: string;
  passwordHash?: string;
  legacyPassword?: string;
}

function fallbackConfig(): AdminConfig {
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD;

  if (!password && process.env.NODE_ENV === "production") {
    throw new Error("Admin credentials are unavailable. Configure Supabase admin_config or ADMIN_PASSWORD.");
  }

  return {
    username,
    legacyPassword: password ?? "admin",
  };
}

export async function readAdminConfig(): Promise<AdminConfig> {
  try {
    const supabase = getSupabase();
    let { data, error } = await supabase
      .from("admin_config")
      .select("username, password, password_hash")
      .eq("id", 1)
      .maybeSingle();

    if (error && /password_hash/i.test(error.message)) {
      const legacy = await supabase
        .from("admin_config")
        .select("username, password")
        .eq("id", 1)
        .maybeSingle();
      data = legacy.data ? { ...legacy.data, password_hash: null } : null;
      error = legacy.error;
    }

    if (error) throw error;
    if (data && data.username) {
      const passwordHash = data.password_hash as string | null | undefined;
      const legacyPassword = data.password as string | null | undefined;

      if (passwordHash) {
        return { username: data.username as string, passwordHash };
      }
      if (legacyPassword) {
        return { username: data.username as string, legacyPassword };
      }
    }
  } catch (e) {
    console.error("[admin-config] read error:", e);
  }
  return fallbackConfig();
}

export function verifyAdminPassword(config: AdminConfig, password: string): boolean {
  if (config.passwordHash) return verifyPassword(password, config.passwordHash);
  if (config.legacyPassword) return password === config.legacyPassword;
  return false;
}

export async function writeAdminConfig(config: { username: string; password: string }): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase
    .from("admin_config")
    .upsert(
      {
        id: 1,
        username: config.username,
        password_hash: hashPassword(config.password),
        password: null,
      },
      { onConflict: "id" },
    );

  if (error) throw error;
}
