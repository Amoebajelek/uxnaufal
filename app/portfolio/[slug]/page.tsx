import { notFound } from "next/navigation";
import { readAllProjects } from "@/lib/data-store.server";
import { PortfolioDetail } from "@/components/PortfolioDetail";

// No static params — always dynamic so admin changes show immediately
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const projects = await readAllProjects();
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — uxnaufal`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const projects = await readAllProjects();
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();
  return <PortfolioDetail project={project} />;
}
