import type { MetadataRoute } from "next";
import { readAllProjects } from "@/lib/data-store.server";

const BASE_URL = "https://uxnaufal.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await readAllProjects();

  const projectUrls: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/portfolio/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectUrls,
  ];
}
