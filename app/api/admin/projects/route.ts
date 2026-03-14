import { NextResponse } from "next/server";
import { readAllProjects, writeAllProjects } from "@/lib/data-store.server";
import type { Project } from "@/lib/projects";

// GET /api/admin/projects
export async function GET() {
  const projects = readAllProjects();
  return NextResponse.json(projects);
}

// POST /api/admin/projects  → create
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Project;
    const all = readAllProjects();
    // Ensure unique id
    if (all.find((p) => p.id === body.id)) {
      return NextResponse.json({ error: "Project id already exists" }, { status: 409 });
    }
    all.push(body);
    writeAllProjects(all);
    return NextResponse.json(body, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
