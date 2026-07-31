import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { journal } from "@/data/journal";

export const dynamic = "force-static";

const BASE = "https://yogeshsahu.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/thinking`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/resources`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/investors`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE}/projects/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const journalRoutes: MetadataRoute.Sitemap = journal.map((entry) => ({
    url: `${BASE}/journal/${entry.slug}`,
    lastModified: new Date(entry.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...journalRoutes];
}
