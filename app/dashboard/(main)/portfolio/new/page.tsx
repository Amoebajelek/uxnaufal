import { ProjectForm } from "@/components/admin/ProjectForm";

export const metadata = { title: "New Project — Dashboard" };

export default function NewProjectPage() {
  return <ProjectForm mode="new" />;
}
