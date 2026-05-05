import { projects } from "@/lib/projects";

export interface ProjectDetail {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stat: string;
  statLabel: string;
  tags: string[];
  language: string;
  href: string;
  githubHref: string;
  image?: string;
  reportHref?: string;
  reports?: { label: string; href: string }[];
  sections: { title: string; content: string }[];
}

export const projectDetails: Record<string, ProjectDetail> = Object.fromEntries(
  projects.map((p) => [
    p.id,
    {
      id: p.id,
      name: p.name,
      tagline: p.description,
      description: p.description,
      stat: p.stat,
      statLabel: p.statLabel,
      tags: p.tags,
      language: p.language,
      href: p.href,
      githubHref: p.githubHref,
      image: p.image,
      reportHref: p.reportHref,
      reports: p.reports,
      sections: [],
    },
  ])
);
