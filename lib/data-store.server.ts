/**
 * Server-only data store.
 * Source of truth: data/portfolio.json
 * Falls back to lib/projects.ts defaults only when JSON doesn't exist.
 * Always returns deep copies so callers can't accidentally mutate the default list.
 */

import fs from "fs";
import path from "path";
import type { Project } from "./projects";
import { projects as DEFAULT_PROJECTS } from "./projects";

const DATA_PATH = path.join(process.cwd(), "data", "portfolio.json");

function ensureDir() {
  const dir = path.dirname(DATA_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/** Deep clone helper — prevents callers from mutating in-memory defaults. */
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

export function readAllProjects(): Project[] {
  try {
    ensureDir();
    if (fs.existsSync(DATA_PATH)) {
      const raw = fs.readFileSync(DATA_PATH, "utf-8");
      return JSON.parse(raw) as Project[];
    }
  } catch (e) {
    console.error("[data-store] read error:", e);
  }
  // Return a deep copy so callers can't mutate the static default array.
  return deepClone(DEFAULT_PROJECTS);
}

export function writeAllProjects(projects: Project[]): void {
  ensureDir();
  fs.writeFileSync(DATA_PATH, JSON.stringify(projects, null, 2), "utf-8");
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
 * Seed data/portfolio.json from lib/projects.ts defaults
 * if the file doesn't exist yet. Safe to call on every startup.
 */
export function seedIfEmpty(): void {
  try {
    ensureDir();
    if (!fs.existsSync(DATA_PATH)) {
      writeAllProjects(deepClone(DEFAULT_PROJECTS));
      console.log("[data-store] Seeded data/portfolio.json from defaults.");
    }
  } catch (e) {
    console.error("[data-store] seed error:", e);
  }
}
