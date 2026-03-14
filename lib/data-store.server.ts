/**
 * Server-only data store.
 *
 * Storage strategy:
 *  - Local / writable FS  → data/portfolio.json   (committed to git)
 *  - Vercel / read-only FS → /tmp/uxnaufal-portfolio.json
 *    Read priority on Vercel: /tmp (recent edits) → data/ (deployed snapshot) → defaults
 *
 * Always returns deep copies so callers can't accidentally mutate the static list.
 */

import fs from "fs";
import path from "path";
import type { Project } from "./projects";
import { projects as DEFAULT_PROJECTS } from "./projects";

const LOCAL_PATH = path.join(process.cwd(), "data", "portfolio.json");
const TMP_PATH   = "/tmp/uxnaufal-portfolio.json";

/** Deep clone helper — prevents callers from mutating in-memory defaults. */
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

/** Returns a writable file path. On Vercel data/ is read-only → use /tmp. */
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

export function readAllProjects(): Project[] {
  const writablePath = getWritablePath();

  // When writable path IS the local path, just read that file.
  // On Vercel (writable = /tmp):
  //   1. /tmp — contains most recent CMS edits (may not exist on cold start)
  //   2. data/portfolio.json — deployed snapshot (committed to git, always readable)
  //   3. in-memory defaults
  const candidates = writablePath === LOCAL_PATH
    ? [LOCAL_PATH]
    : [TMP_PATH, LOCAL_PATH];

  for (const filePath of candidates) {
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(raw) as Project[];
      }
    } catch (e) {
      console.error(`[data-store] read error (${filePath}):`, e);
    }
  }

  return deepClone(DEFAULT_PROJECTS);
}

export function writeAllProjects(projects: Project[]): void {
  const filePath = getWritablePath();
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(projects, null, 2), "utf-8");
}

export function readOneProject(id: string): Project | undefined {
  return readAllProjects().find((p) => p.id === id);
}

export function upsertProject(project: Project): void {
  const all = readAllProjects();
  const idx = all.findIndex((p) => p.id === project.id);
  if (idx >= 0) {
    all[idx] = project;
  } else {
    all.push(project);
  }
  writeAllProjects(all);
}

export function deleteProject(id: string): boolean {
  const all = readAllProjects();
  const next = all.filter((p) => p.id !== id);
  if (next.length === all.length) return false;
  writeAllProjects(next);
  return true;
}

/**
 * Seed the writable data file from lib/projects.ts defaults if it doesn't
 * exist yet. Safe to call on every request — no-op if file already exists.
 */
export function seedIfEmpty(): void {
  try {
    const filePath = getWritablePath();
    if (!fs.existsSync(filePath)) {
      writeAllProjects(deepClone(DEFAULT_PROJECTS));
      console.log(`[data-store] Seeded ${filePath} from defaults.`);
    }
  } catch (e) {
    console.error("[data-store] seed error:", e);
  }
}
