/**
 * Server-only: persists admin credentials in Supabase.
 * Falls back to hardcoded defaults (admin/admin) if DB is unavailable.
 */

import { supabase } from "./supabase.server";

export interface AdminConfig {
  username: string;
  password: string;
}

const DEFAULT_CONFIG: AdminConfig = { username: "admin", password: "admin" };

export async function readAdminConfig(): Promise<AdminConfig> {
  try {
    const { data, error } = await supabase
      .from("admin_config")
      .select("username, password")
      .eq("id", 1)
      .maybeSingle();

    if (error) throw error;
    if (data && data.username && data.password) {
      return { username: data.username as string, password: data.password as string };
    }
  } catch (e) {
    console.error("[admin-config] read error:", e);
  }
  return { ...DEFAULT_CONFIG };
}

export async function writeAdminConfig(config: AdminConfig): Promise<void> {
  const { error } = await supabase
    .from("admin_config")
    .upsert({ id: 1, username: config.username, password: config.password }, { onConflict: "id" });

  if (error) throw error;
}
