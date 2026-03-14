/**
 * Server-only portfolio data store — backed by Supabase.
 * Falls back to in-memory defaults from lib/projects.ts when DB is unavailable.
 */

import { supabase } from "./supabase.server";
import type { Project } from "./projects";
import { projects as DEFAULT_PROJECTS } from "./projects";

/** Deep clone helper. */
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

/** Map a Supabase row → Project object. */
function rowToProject(row: Record<string, unknown>): Project {
  return {
    id:           row.id          as string,
    slug:         row.slug        as string,
    title:        row.title       as string,
    type:         (row.type        as string) ?? "",
    year:         (row.year        as string) ?? "",
    duration:     (row.duration    as string) ?? "",
    role:         row.role         as string | undefined,
    client:       row.client       as string | undefined,
    liveUrl:      row.live_url     as string | undefined,
    description:  (row.description as string) ?? "",
    tags:         (row.tags        as string[]) ?? [],
    color:        (row.color       as string) ?? "#1a1a1a",
    accent:       (row.accent      as string) ?? "#ffffff",
    thumbnail:    row.thumbnail    as string | undefined,
    externalHref: row.external_href as string | undefined,
    skills:       (row.skills      as string[]) ?? [],
    sections:     (row.sections    as Project["sections"]) ?? [],
  };
}

/** Map a Project → Supabase row. */
function projectToRow(p: Project, sortOrder?: number) {
  return {
    id:            p.id,
    slug:          p.slug,
    title:         p.title,
    type:          p.type ?? null,
    year:          p.year ?? null,
    duration:      p.duration ?? null,
    role:          p.role ?? null,
    client:        p.client ?? null,
    live_url:      p.liveUrl ?? null,
    description:   p.description ?? "",
    tags:          p.tags ?? [],
    color:         p.color ?? "#1a1a1a",
    accent:        p.accent ?? "#ffffff",
    thumbnail:     p.thumbnail ?? null,
    external_href: p.externalHref ?? null,
    skills:        p.skills ?? [],
    sections:      p.sections ?? [],
    ...(sortOrder !== undefined ? { sort_order: sortOrder } : {}),
  };
}

// ── Read ─────────────────────────────────────────────────────────

export async function readAllProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from("portfolio")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) {
      // DB is empty — return defaults (first run)
      return deepClone(DEFAULT_PROJECTS);
    }
    return data.map(rowToProject);
  } catch (e) {
    console.error("[data-store] readAllProjects error:", e);
    return deepClone(DEFAULT_PROJECTS);
  }
}

export async function readOneProject(id: string): Promise<Project | undefined> {
  try {
    const { data, error } = await supabase
      .from("portfolio")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return undefined;
    return rowToProject(data);
  } catch (e) {
    console.error("[data-store] readOneProject error:", e);
    return undefined;
  }
}

// ── Write ────────────────────────────────────────────────────────

export async function upsertProject(project: Project): Promise<void> {
  // Preserve existing sort_order if record already exists
  const { data: existing } = await supabase
    .from("portfolio")
    .select("sort_order")
    .eq("id", project.id)
    .maybeSingle();

  const sortOrder = (existing as { sort_order?: number } | null)?.sort_order ?? Date.now();

  const { error } = await supabase
    .from("portfolio")
    .upsert(projectToRow(project, sortOrder), { onConflict: "id" });

  if (error) throw error;
}

export async function deleteProject(id: string): Promise<boolean> {
  const { error, count } = await supabase
    .from("portfolio")
    .delete({ count: "exact" })
    .eq("id", id);

  if (error) throw error;
  return (count ?? 0) > 0;
}

/**
 * Seed the Supabase `portfolio` table from lib/projects.ts defaults
 * if the table is empty. Safe to call multiple times.
 */
export async function seedIfEmpty(): Promise<void> {
  try {
    const { count } = await supabase
      .from("portfolio")
      .select("*", { count: "exact", head: true });

    if ((count ?? 0) === 0) {
      const rows = DEFAULT_PROJECTS.map((p, i) => projectToRow(p, i));
      const { error } = await supabase.from("portfolio").insert(rows);
      if (error) throw error;
      console.log("[data-store] Seeded Supabase portfolio table from defaults.");
    }
  } catch (e) {
    console.error("[data-store] seedIfEmpty error:", e);
  }
}
