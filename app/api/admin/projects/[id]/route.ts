import { NextResponse } from "next/server";
import {
  readAllProjects,
  writeAllProjects,
  deleteProject,
} from "@/lib/data-store.server";
import type { Project } from "@/lib/projects";

// GET /api/admin/projects/[id]
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const project = readAllProjects().find((p) => p.id === params.id);
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

// PUT /api/admin/projects/[id]  → update
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = (await request.json()) as Project;
    const all = readAllProjects();
    const idx = all.findIndex((p) => p.id === params.id);
    if (idx < 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
    all[idx] = { ...body, id: params.id }; // id is immutable
    writeAllProjects(all);
    return NextResponse.json(all[idx]);
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}

// DELETE /api/admin/projects/[id]
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const ok = deleteProject(params.id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
