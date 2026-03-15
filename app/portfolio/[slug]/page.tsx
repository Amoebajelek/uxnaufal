import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { readAllProjects } from "@/lib/data-store.server";
import { PortfolioDetail } from "@/components/PortfolioDetail";

export const dynamic = "force-dynamic";

const BASE_URL = "https://uxnaufal.vercel.app";
const AUTHOR   = "Naufal Abdussyakur";
const HANDLE   = "@uxnaufal";

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug }  = await params;
  const projects  = await readAllProjects();
  const project   = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const url = `${BASE_URL}/portfolio/${slug}`;

  // Specific description — includes role, client, type, year for long-tail keywords
  const descParts = [
    project.description,
    project.role   ? `Role: ${project.role}.`   : null,
    project.client ? `Client: ${project.client}.` : null,
    `${project.type}, ${project.year}.`,
  ].filter(Boolean);
  const description = descParts.join(" ");

  // Keywords: tags + skills + client + type + designer context
  const keywords = [
    ...(project.tags   ?? []),
    ...(project.skills ?? []),
    project.client,
    project.type,
    "UI/UX Designer",
    "UX Case Study",
    "Product Design",
    "Figma",
    AUTHOR,
    "uxnaufal",
  ].filter(Boolean) as string[];

  // OG image with explicit dimensions
  const ogImages = project.thumbnail
    ? [{
        url:    `${BASE_URL}${project.thumbnail}`,
        width:  1200,
        height: 630,
        alt:    `${project.title} — Case Study by ${AUTHOR}`,
        type:   "image/jpeg",
      }]
    : undefined;

  return {
    title:       project.title,
    description,
    keywords,
    authors:     [{ name: AUTHOR, url: BASE_URL }],
    creator:     AUTHOR,
    publisher:   AUTHOR,
    category:    "Design Portfolio",
    alternates:  { canonical: url },

    openGraph: {
      title:         `${project.title} — uxnaufal`,
      description,
      url,
      siteName:      "uxnaufal",
      locale:        "en_US",
      type:          "article",
      authors:       [AUTHOR],
      publishedTime: `${project.year}-01-01T00:00:00.000Z`,
      tags:          project.tags,
      ...(ogImages && { images: ogImages }),
    },

    twitter: {
      card:        "summary_large_image",
      title:       `${project.title} — uxnaufal`,
      description,
      creator:     HANDLE,
      site:        HANDLE,
      ...(ogImages && { images: [ogImages[0].url] }),
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ProjectPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug }  = await params;
  const projects  = await readAllProjects();
  const project   = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const url = `${BASE_URL}/portfolio/${slug}`;

  const descParts = [
    project.description,
    project.role   ? `Role: ${project.role}.`   : null,
    project.client ? `Client: ${project.client}.` : null,
    `${project.type}, ${project.year}.`,
  ].filter(Boolean);
  const description = descParts.join(" ");

  const keywords = [
    ...(project.tags   ?? []),
    ...(project.skills ?? []),
    project.client,
    project.type,
    "UI/UX Designer",
    "UX Case Study",
    AUTHOR,
  ].filter(Boolean).join(", ");

  // ── JSON-LD: BreadcrumbList ──
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",      item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: `${BASE_URL}/#portfolio` },
      { "@type": "ListItem", position: 3, name: project.title, item: url },
    ],
  };

  // ── JSON-LD: CreativeWork (rich) ──
  const creativeWork = {
    "@context":         "https://schema.org",
    "@type":            "CreativeWork",
    "@id":              url,
    name:               project.title,
    headline:           project.title,
    description,
    keywords,
    url,
    dateCreated:        `${project.year}-01-01`,
    datePublished:      `${project.year}-01-01`,
    inLanguage:         "en",
    isAccessibleForFree: true,
    genre:              project.type,
    author: {
      "@type":    "Person",
      name:       AUTHOR,
      url:        BASE_URL,
      jobTitle:   "UI/UX Designer",
      sameAs: [
        "https://www.linkedin.com/in/naufalabdussyakur/",
        "https://www.instagram.com/uxnaufal",
      ],
    },
    ...(project.client && {
      contributor: { "@type": "Organization", name: project.client },
    }),
    ...(project.thumbnail && {
      image:        `${BASE_URL}${project.thumbnail}`,
      thumbnailUrl: `${BASE_URL}${project.thumbnail}`,
    }),
    ...(project.liveUrl && { sameAs: project.liveUrl }),
    ...(project.tags?.length && { about: project.tags.map((t) => ({ "@type": "Thing", name: t })) }),
    isPartOf: {
      "@type": "ProfilePage",
      name:    `${AUTHOR} — Portfolio`,
      url:     BASE_URL,
    },
  };

  // ── JSON-LD: WebPage ──
  const webPage = {
    "@context":    "https://schema.org",
    "@type":       "WebPage",
    "@id":         `${url}#webpage`,
    url,
    name:          `${project.title} — uxnaufal`,
    description,
    inLanguage:    "en",
    isPartOf:      { "@id": `${BASE_URL}/#website` },
    breadcrumb:    { "@id": `${url}#breadcrumb` },
    primaryImageOfPage: project.thumbnail
      ? { "@type": "ImageObject", url: `${BASE_URL}${project.thumbnail}`, width: 1200, height: 630 }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWork) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <PortfolioDetail project={project} />
    </>
  );
}
