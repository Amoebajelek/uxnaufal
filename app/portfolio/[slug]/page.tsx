import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { readAllProjects } from "@/lib/data-store.server";
import { PortfolioDetail } from "@/components/PortfolioDetail";

export const dynamic = "force-dynamic";

const BASE_URL = "https://uxnaufal.vercel.app";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const projects = await readAllProjects();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const ogImage = project.thumbnail ? `${BASE_URL}/${project.thumbnail}` : undefined;

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `${BASE_URL}/portfolio/${slug}` },
    openGraph: {
      title: `${project.title} — uxnaufal`,
      description: project.description,
      url: `${BASE_URL}/portfolio/${slug}`,
      type: "article",
      ...(ogImage && { images: [{ url: ogImage, alt: project.title }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — uxnaufal`,
      description: project.description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function ProjectPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const projects = await readAllProjects();
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${BASE_URL}/portfolio/${slug}`,
    author: { "@type": "Person", name: "Naufal Abdussyakur", url: BASE_URL },
    keywords: project.tags?.join(", "),
    ...(project.thumbnail && { image: `${BASE_URL}/${project.thumbnail}` }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioDetail project={project} />
    </>
  );
}
