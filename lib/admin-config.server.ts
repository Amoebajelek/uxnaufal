/**
 * Server-only: persists admin credentials to data/admin-config.json
 * Falls back to env vars or hardcoded defaults on first run.
 */

import fs from "fs";
import path from "path";

interface AdminConfig {
  username: string;
  password: string;
}

const DEFAULT_CONFIG: AdminConfig = { username: "admin", password: "admin" };

function getConfigPath(): string {
  const localPath = path.join(process.cwd(), "data", "admin-config.json");
  try {
    const dir = path.dirname(localPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.accessSync(dir, fs.constants.W_OK);
    return localPath;
  } catch {
    return "/tmp/uxnaufal-admin-config.json";
  }
}

export function readAdminConfig(): AdminConfig {
  try {
    const p = getConfigPath();
    if (fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p, "utf-8")) as AdminConfig;
    }
  } catch {}
  return DEFAULT_CONFIG;
}

export function writeAdminConfig(config: AdminConfig): void {
  const p = getConfigPath();
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(p, JSON.stringify(config, null, 2), "utf-8");
}
