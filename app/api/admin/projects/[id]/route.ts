import { NextResponse } from "next/server";
import {
  readAllProjects,
  writeAllProjects,
  deleteProject,
  seedIfEmpty,
} from "@/lib/data-store.server";
import type { Project } from "@/lib/projects";

export const dynamic = "force-dynamic";

// GET /api/admin/projects/[id]
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  seedIfEmpty();
  const project = readAllProjects().find((p) => p.id === params.id);
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

// PUT /api/admin/projects/[id]  → update
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    seedIfEmpty();
    const body = (await request.json()) as Project;
    const all = readAllProjects();
    const idx = all.findIndex((p) => p.id === params.id);
    if (idx < 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Preserve original id; allow slug changes
    all[idx] = {
      ...body,
      id: params.id,
      slug: body.slug || params.id,
    };
    writeAllProjects(all);
    return NextResponse.json(all[idx]);
  } catch (e) {
    console.error("[projects] PUT error:", e);
    const msg = e instanceof Error ? e.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// DELETE /api/admin/projects/[id]
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  seedIfEmpty();
  const ok = deleteProject(params.id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
