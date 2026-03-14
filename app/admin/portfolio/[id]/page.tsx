import { notFound } from "next/navigation";
import { readOneProject } from "@/lib/data-store.server";
import { ProjectForm } from "@/components/admin/ProjectForm";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const project = readOneProject(params.id);
  return { title: project ? `Edit ${project.title} — Admin` : "Edit Proyek" };
}

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const project = readOneProject(params.id);
  if (!project) notFound();
  return <ProjectForm mode="edit" initial={project} />;
}
