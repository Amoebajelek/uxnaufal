/**
 * Server-only: persists admin credentials.
 *
 * Storage strategy:
 *  - Local / writable FS  → data/admin-config.json
 *  - Vercel / read-only FS → /tmp/uxnaufal-admin-config.json
 *
 * NOTE: /tmp on Vercel is ephemeral — it is wiped on cold-start / redeploy.
 * After a redeploy the password resets to the hardcoded default ("admin/admin").
 * For permanent credential storage a database (e.g. Vercel KV) would be needed.
 */

import fs from "fs";
import path from "path";

export interface AdminConfig {
  username: string;
  password: string;
}

const DEFAULT_CONFIG: AdminConfig = { username: "admin", password: "admin" };

const LOCAL_PATH = path.join(process.cwd(), "data", "admin-config.json");
const TMP_PATH   = "/tmp/uxnaufal-admin-config.json";

/** Returns a writable file path for the config. */
function getWritablePath(): string {
  try {
    const dir = path.dirname(LOCAL_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.accessSync(dir, fs.constants.W_OK);
    return LOCAL_PATH;
  } catch {
    return TMP_PATH;
  }
}

export function readAdminConfig(): AdminConfig {
  // On Vercel the writable path is /tmp; check that first, then LOCAL_PATH.
  const writablePath = getWritablePath();
  const candidates = writablePath === LOCAL_PATH
    ? [LOCAL_PATH]
    : [TMP_PATH, LOCAL_PATH];

  for (const filePath of candidates) {
    try {
      if (fs.existsSync(filePath)) {
        const parsed = JSON.parse(fs.readFileSync(filePath, "utf-8")) as AdminConfig;
        if (parsed.username && parsed.password) return parsed;
      }
    } catch {
      // try next candidate
    }
  }
  return { ...DEFAULT_CONFIG };
}

export function writeAdminConfig(config: AdminConfig): void {
  const filePath = getWritablePath();
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(config, null, 2), "utf-8");
}
