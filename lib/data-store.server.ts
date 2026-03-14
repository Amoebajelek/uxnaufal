/**
 * Server-only data store.
 * Reads from data/portfolio.json (if exists), falls back to lib/projects.ts defaults.
 * On Vercel: writes to /tmp (ephemeral). Locally: writes to data/portfolio.json.
 */

import fs from "fs";
import path from "path";
import type { Project } from "./projects";
import { projects as DEFAULT_PROJECTS } from "./projects";

function getDataPath(): string {
  const localPath = path.join(process.cwd(), "data", "portfolio.json");
  try {
    // Check if directory is writable
    const dir = path.dirname(localPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.accessSync(dir, fs.constants.W_OK);
    return localPath;
  } catch {
    return "/tmp/uxnaufal-portfolio.json";
  }
}

export function readAllProjects(): Project[] {
  try {
    const filePath = getDataPath();
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(raw) as Project[];
    }
  } catch (e) {
    console.error("[data-store] read error:", e);
  }
  return DEFAULT_PROJECTS;
}

export function writeAllProjects(projects: Project[]): void {
  const filePath = getDataPath();
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
