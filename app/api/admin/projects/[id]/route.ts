import { NextResponse } from "next/server";
import {
  readOneProject,
  upsertProject,
  deleteProject,
  seedIfEmpty,
} from "@/lib/data-store.server";
import type { Project } from "@/lib/projects";

export const dynamic = "force-dynamic";

// GET /api/admin/projects/[id]
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  await seedIfEmpty();
  const project = await readOneProject(params.id);
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

// PUT /api/admin/projects/[id]  → update
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await seedIfEmpty();
    const body = (await request.json()) as Project;

    const existing = await readOneProject(params.id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const updated: Project = {
      ...body,
      id:   params.id,
      slug: body.slug || params.id,
    };

    await upsertProject(updated);
    return NextResponse.json(updated);
  } catch (e) {
    console.error("[projects] PUT error:", e);
    const msg = e instanceof Error ? e.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// DELETE /api/admin/projects/[id]
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await seedIfEmpty();
  const ok = await deleteProject(params.id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
