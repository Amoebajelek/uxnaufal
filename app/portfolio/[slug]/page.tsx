import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";
import { PortfolioDetail } from "@/components/PortfolioDetail";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — uxnaufal`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();
  return <PortfolioDetail project={project} />;
}
