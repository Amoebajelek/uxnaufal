import { NextResponse } from "next/server";
import {
  readAllProjects,
  writeAllProjects,
  seedIfEmpty,
} from "@/lib/data-store.server";
import type { Project } from "@/lib/projects";

export const dynamic = "force-dynamic";

// GET /api/admin/projects
export async function GET() {
  seedIfEmpty();
  const projects = readAllProjects();
  return NextResponse.json(projects);
}

// POST /api/admin/projects  → create
export async function POST(request: Request) {
  try {
    seedIfEmpty();
    const body = (await request.json()) as Project;

    if (!body.id || !body.title) {
      return NextResponse.json({ error: "ID dan judul wajib diisi." }, { status: 400 });
    }

    const all = readAllProjects();
    if (all.find((p) => p.id === body.id)) {
      return NextResponse.json({ error: "ID proyek sudah digunakan." }, { status: 409 });
    }

    // Ensure slug matches id if slug is empty
    const project: Project = {
      ...body,
      slug: body.slug || body.id,
    };

    all.push(project);
    writeAllProjects(all);
    return NextResponse.json(project, { status: 201 });
  } catch (e) {
    console.error("[projects] POST error:", e);
    const msg = e instanceof Error ? e.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
