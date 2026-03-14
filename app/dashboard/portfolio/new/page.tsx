import { ProjectForm } from "@/components/admin/ProjectForm";

export const metadata = { title: "Tambah Proyek — Admin" };

export default function NewProjectPage() {
  return <ProjectForm mode="new" />;
}
