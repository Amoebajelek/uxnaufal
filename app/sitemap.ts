import type { MetadataRoute } from "next";
import { readAllProjects } from "@/lib/data-store.server";

const BASE_URL = "https://uxnaufal.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await readAllProjects();

  // Sort newest-first so crawlers discover fresh content first
  const sorted = [...projects].sort(
    (a, b) => parseInt(b.year, 10) - parseInt(a.year, 10),
  );

  const projectUrls: MetadataRoute.Sitemap = sorted.map((p, i) => ({
    url:             `${BASE_URL}/portfolio/${p.slug}`,
    lastModified:    new Date(`${p.year}-06-01`),  // mid-year approximation
    changeFrequency: "monthly" as const,
    priority:        i < 2 ? 0.9 : 0.8,           // top 2 get slightly higher priority
  }));

  return [
    {
      url:             BASE_URL,
      lastModified:    new Date(),
      changeFrequency: "weekly" as const,
      priority:        1.0,
    },
    ...projectUrls,
  ];
}
