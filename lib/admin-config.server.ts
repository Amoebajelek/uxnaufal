/**
 * Server-only: persists admin credentials to data/admin-config.json
 * Falls back to hardcoded defaults (admin/admin) on first run.
 */

import fs from "fs";
import path from "path";

export interface AdminConfig {
  username: string;
  password: string;
}

const DEFAULT_CONFIG: AdminConfig = { username: "admin", password: "admin" };

// Always use the local data/ directory (committed with .gitkeep)
const CONFIG_PATH = path.join(process.cwd(), "data", "admin-config.json");

function ensureDir() {
  const dir = path.dirname(CONFIG_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function readAdminConfig(): AdminConfig {
  try {
    ensureDir();
    if (fs.existsSync(CONFIG_PATH)) {
      const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
      const parsed = JSON.parse(raw) as AdminConfig;
      // Validate shape
      if (parsed.username && parsed.password) return parsed;
    }
  } catch (e) {
    console.error("[admin-config] read error:", e);
  }
  return { ...DEFAULT_CONFIG };
}

export function writeAdminConfig(config: AdminConfig): void {
  ensureDir();
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");
}
