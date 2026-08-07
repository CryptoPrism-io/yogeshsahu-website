import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { posts } from "@/data/posts";

export const dynamic = "force-static";

const BASE = "https://yogeshsahu.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/log`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/resources`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p) => !p.internalHref)
    .map((p) => ({
      url: p.htmlHref ? `${BASE}${p.htmlHref}` : `${BASE}/projects/${p.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p.htmlHref ? 0.6 : 0.7,
    }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/log/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
