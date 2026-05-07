import { NextResponse } from "next/server";
import { readAllProjects, upsertProject, seedIfEmpty } from "@/lib/data-store.server";
import { validateProjectPayload } from "@/lib/project-validation.server";

export const dynamic = "force-dynamic";

// GET /api/admin/projects
export async function GET() {
  await seedIfEmpty();
  const projects = await readAllProjects();
  return NextResponse.json(projects);
}

// POST /api/admin/projects  → create
export async function POST(request: Request) {
  try {
    await seedIfEmpty();
    const project = validateProjectPayload(await request.json());

    const all = await readAllProjects();
    if (all.find((p) => p.id === project.id || p.slug === project.slug)) {
      return NextResponse.json({ error: "ID proyek sudah digunakan." }, { status: 409 });
    }

    await upsertProject(project);
    return NextResponse.json(project, { status: 201 });
  } catch (e) {
    console.error("[projects] POST error:", e);
    const msg = e instanceof Error ? e.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
