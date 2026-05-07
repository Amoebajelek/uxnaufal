import type { Project, ProjectSection, SectionType } from "./projects";

const SECTION_TYPES = new Set<SectionType>([
  "nutshell",
  "context",
  "problem-discovery",
  "problem",
  "solution",
  "finaldesign",
  "reflection",
  "notion-only",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value.trim() : fallback;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
}

function optionalString(value: unknown): string | undefined {
  const str = asString(value);
  return str || undefined;
}

function normalizeSlug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function assertHexColor(value: string, field: string) {
  if (!/^#[0-9a-f]{6}$/i.test(value)) {
    throw new Error(`${field} harus berupa warna hex, contoh #1a1a1a.`);
  }
}

function assertSafePathOrUrl(value: string | undefined, field: string) {
  if (!value) return;
  if (value.startsWith("/")) return;

  try {
    const url = new URL(value);
    if (url.protocol === "https:" || url.protocol === "http:") return;
  } catch {
    // handled below
  }

  throw new Error(`${field} harus berupa path lokal atau URL http(s).`);
}

function normalizeSection(value: unknown): ProjectSection {
  if (!isRecord(value)) throw new Error("Section tidak valid.");

  const type = asString(value.type) as SectionType;
  if (!SECTION_TYPES.has(type)) throw new Error("Tipe section tidak valid.");

  const heading = asString(value.heading);
  if (!heading) throw new Error("Heading section wajib diisi.");

  const boldList = Array.isArray(value.boldList)
    ? value.boldList.filter(isRecord).map((item) => ({
        term: asString(item.term),
        desc: asString(item.desc),
      })).filter((item) => item.term || item.desc)
    : undefined;

  const items = Array.isArray(value.items)
    ? value.items.filter(isRecord).map((item) => ({
        label: asString(item.label),
        image: asString(item.image),
      })).filter((item) => item.label && item.image)
    : undefined;

  return {
    type,
    heading,
    label: optionalString(value.label),
    content: optionalString(value.content),
    image: optionalString(value.image),
    list: asStringArray(value.list),
    boldList,
    items,
    learnings: asStringArray(value.learnings),
    collaborators: asStringArray(value.collaborators),
  };
}

export function validateProjectPayload(payload: unknown, fallbackId?: string): Project {
  if (!isRecord(payload)) throw new Error("Payload proyek tidak valid.");

  const title = asString(payload.title);
  if (!title) throw new Error("Judul wajib diisi.");

  const id = normalizeSlug(asString(payload.id) || fallbackId || title);
  const slug = normalizeSlug(asString(payload.slug) || id);
  if (!id || !slug) throw new Error("ID dan slug wajib diisi.");

  const color = asString(payload.color, "#1a1a1a");
  const accent = asString(payload.accent, "#ffffff");
  assertHexColor(color, "Background color");
  assertHexColor(accent, "Accent color");

  const thumbnail = optionalString(payload.thumbnail);
  const externalHref = optionalString(payload.externalHref);
  const liveUrl = optionalString(payload.liveUrl);
  assertSafePathOrUrl(thumbnail, "Thumbnail");
  assertSafePathOrUrl(externalHref, "External URL");
  assertSafePathOrUrl(liveUrl, "Live URL");

  return {
    id,
    slug,
    title,
    type: asString(payload.type),
    year: asString(payload.year),
    duration: asString(payload.duration),
    role: optionalString(payload.role),
    client: optionalString(payload.client),
    liveUrl,
    description: asString(payload.description),
    tags: asStringArray(payload.tags),
    color,
    accent,
    thumbnail,
    externalHref,
    skills: asStringArray(payload.skills),
    sections: Array.isArray(payload.sections) ? payload.sections.map(normalizeSection) : [],
  };
}
