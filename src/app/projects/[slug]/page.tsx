import { projects } from "@/lib/projects";
import { projectDetails } from "@/data/project-details";
import type { Metadata } from "next";
import Link from "next/link";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectDetails[slug];
  if (!project) {
    return { title: "Project Not Found — yogeshsahu.xyz" };
  }
  return {
    title: `${project.name} — yogeshsahu.xyz`,
    description: project.tagline,
    openGraph: {
      title: `${project.name} — Yogesh Sahu`,
      description: project.tagline,
      url: `https://yogeshsahu.xyz/projects/${project.id}`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectDetails[slug];

  if (!project) {
    return (
      <main
        className="flex min-h-screen items-center justify-center"
        style={{ background: "var(--ys-surface)" }}
      >
        <div className="text-center">
          <h1
            className="mb-4 text-[2rem] font-black uppercase"
            style={{
              fontFamily: "var(--font-headline)",
              color: "var(--ys-text)",
            }}
          >
            Project Not Found
          </h1>
          <Link
            href="/"
            className="text-[13px] font-medium underline"
            style={{ color: "var(--ys-accent)" }}
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ background: "var(--ys-surface)" }}>
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b px-5 py-3"
        style={{
          borderColor: "var(--ys-border)",
          background: "var(--ys-surface)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            href="/"
            className="text-[12px] font-bold uppercase tracking-[0.1em]"
            style={{
              fontFamily: "var(--font-headline)",
              color: "var(--ys-text)",
            }}
          >
            YS.
          </Link>
          <span
            className="text-[10px] uppercase tracking-[0.15em]"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--ys-text-soft)",
            }}
          >
            {project.language}
          </span>
        </div>
      </nav>

      <header className="mx-auto max-w-4xl px-5 pt-20 pb-10">
        <p
          className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--ys-text-soft)",
          }}
        >
          {project.tags.join(" / ")}
        </p>
        <h1
          className="mb-4 text-[clamp(1.8rem,5vw,3rem)] font-black uppercase leading-[0.95]"
          style={{
            fontFamily: "var(--font-headline)",
            color: "var(--ys-text)",
          }}
        >
          {project.name}
        </h1>
        <p
          className="mb-6 max-w-[60ch] text-[15px] leading-[1.8]"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--ys-text-soft)",
          }}
        >
          {project.tagline}
        </p>
        <div className="flex items-center gap-4">
          <div
            className="rounded-xl border px-4 py-3"
            style={{
              borderColor: "var(--ys-border)",
              background: "var(--ys-surface-strong)",
            }}
          >
            <p
              className="text-[1.2rem] font-bold"
              style={{
                fontFamily: "var(--font-headline)",
                color: "var(--ys-accent)",
              }}
            >
              {project.stat}
            </p>
            <p
              className="text-[9px] uppercase tracking-[0.12em]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--ys-text-soft)",
              }}
            >
              {project.statLabel}
            </p>
          </div>
          {project.githubHref && (
            <a
              href={project.githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em] transition-colors hover:opacity-80"
              style={{
                fontFamily: "var(--font-headline)",
                borderColor: "var(--ys-border)",
                color: "var(--ys-text)",
              }}
            >
              View Source
            </a>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 pb-8">
        <ImagePlaceholder
          variant="screenshot"
          label={project.name}
          className="aspect-video w-full"
        />
      </div>

      {project.sections.length > 0 && (
        <div className="mx-auto max-w-4xl px-5 pb-16">
          {project.sections.map((section) => (
            <section key={section.title} className="mb-10">
              <h2
                className="mb-3 text-[14px] font-bold uppercase tracking-[0.1em]"
                style={{
                  fontFamily: "var(--font-headline)",
                  color: "var(--ys-text)",
                }}
              >
                {section.title}
              </h2>
              <p
                className="text-[14px] leading-[1.8]"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--ys-text-soft)",
                }}
              >
                {section.content}
              </p>
            </section>
          ))}
        </div>
      )}

      <footer
        className="border-t px-5 py-8"
        style={{ borderColor: "var(--ys-border)" }}
      >
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            href="/"
            className="text-[11px] font-bold uppercase tracking-[0.1em] underline"
            style={{
              fontFamily: "var(--font-headline)",
              color: "var(--ys-accent)",
            }}
          >
            Back to Home
          </Link>
          <span
            className="text-[10px] uppercase tracking-[0.15em]"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--ys-text-soft)",
            }}
          >
            yogeshsahu.xyz
          </span>
        </div>
      </footer>
    </main>
  );
}
