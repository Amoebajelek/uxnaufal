import { notFound } from "next/navigation";
import { readOneProject, seedIfEmpty } from "@/lib/data-store.server";
import { ProjectForm } from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await seedIfEmpty();
  const project = await readOneProject(id);
  return { title: project ? `Edit ${project.title} — Admin` : "Edit Proyek" };
}

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await seedIfEmpty();
  const project = await readOneProject(id);
  if (!project) notFound();
  return <ProjectForm mode="edit" initial={project} />;
}
