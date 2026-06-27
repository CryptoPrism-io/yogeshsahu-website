import { projects } from "@/lib/projects";
import { projectDetails } from "@/data/project-details";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import LeadershipLens from "@/components/work/LeadershipLens";
import CaseStudyBlocks from "@/components/work/CaseStudyBlocks";
import ProjectGallery from "@/components/work/ProjectGallery";

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
    <main className="h-screen overflow-y-auto" style={{ background: "var(--ys-surface)" }}>
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b px-5 py-3"
        style={{
          borderColor: "var(--ys-border)",
          background: "var(--ys-surface)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="mx-auto flex max-w-[1100px] items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/work"
              aria-label="Back to Work"
              className="focus-ring flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors hover:bg-[var(--ys-surface-strong)]"
              style={{
                fontFamily: "var(--font-mono)",
                borderColor: "var(--ys-border)",
                color: "var(--ys-text-soft)",
              }}
            >
              <ArrowLeft size={13} strokeWidth={2} />
              Back
            </Link>
            <span aria-hidden style={{ width: 1, height: 16, background: "var(--ys-border)" }} />
            <Link
              href="/"
              aria-label="Home"
              className="text-[12px] font-bold uppercase tracking-[0.1em]"
              style={{
                fontFamily: "var(--font-headline)",
                color: "var(--ys-text)",
              }}
            >
              YS.
            </Link>
          </div>
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

      <header className="mx-auto max-w-[1100px] px-5 pt-20 pb-10">
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
          className="mb-5 font-bold uppercase"
          style={{
            fontFamily: "var(--font-headline)",
            color: "var(--ys-text)",
            fontSize: "clamp(40px,6.4vw,84px)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
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
        <div className="mb-14 flex flex-wrap items-stretch gap-3.5">
          <div
            className="border px-[22px] py-4"
            style={{
              borderColor: "#e9d3bf",
              background: "var(--ys-surface-strong)",
              minWidth: 150,
            }}
          >
            <p
              className="text-[26px] font-bold tabular-nums leading-none"
              style={{
                fontFamily: "var(--font-headline)",
                color: "var(--ys-accent)",
                fontFeatureSettings: '"tnum"',
              }}
            >
              {project.stat}
            </p>
            <p
              className="mt-[7px] text-[10px] uppercase tracking-[0.12em]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--ys-text-soft)",
              }}
            >
              {project.statLabel}
            </p>
          </div>
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center border px-[26px] text-[12px] uppercase tracking-[0.14em] transition-colors hover:opacity-80"
              style={{
                fontFamily: "var(--font-mono)",
                borderColor: "var(--ys-btn-accent-border)",
                background: "var(--ys-btn-accent-bg)",
                color: "var(--ys-accent-strong)",
              }}
            >
              Live App
            </a>
          )}
          {project.githubHref && (
            <a
              href={project.githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center border px-[26px] text-[12px] uppercase tracking-[0.14em] transition-colors hover:opacity-80"
              style={{
                fontFamily: "var(--font-mono)",
                borderColor: "var(--ys-border)",
                color: "var(--ys-text)",
              }}
            >
              View Source
            </a>
          )}
          {project.reportHref && (
            <a
              href={project.reportHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center border px-[26px] text-[12px] uppercase tracking-[0.14em] transition-colors hover:opacity-80"
              style={{
                fontFamily: "var(--font-mono)",
                borderColor: "var(--ys-btn-teal-border)",
                background: "var(--ys-btn-teal-bg)",
                color: "var(--ys-highlight)",
              }}
            >
              Deep Dive
            </a>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-[1100px] px-5 pb-8">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            width={1600}
            height={900}
            priority
            className="w-full rounded-xl object-cover"
          />
        ) : (
          <ImagePlaceholder
            variant="screenshot"
            label={project.name}
            className="aspect-video w-full"
          />
        )}
      </div>

      {project.gallery && project.gallery.images.length > 1 && (
        <ProjectGallery gallery={project.gallery} projectName={project.name} />
      )}

      {project.reports && project.reports.length > 0 && (
        <div className="mx-auto max-w-[1100px] px-5 pb-10">
          <h2
            className="mb-4 text-[14px] font-bold uppercase tracking-[0.1em]"
            style={{
              fontFamily: "var(--font-headline)",
              color: "var(--ys-text)",
            }}
          >
            Deep Dives
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {project.reports.map((report) => (
              <a
                key={report.href}
                href={report.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border px-4 py-3 text-center transition-colors hover:opacity-80"
                style={{
                  borderColor: "var(--ys-btn-teal-border)",
                  background: "var(--ys-btn-teal-bg)",
                }}
              >
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.08em]"
                  style={{
                    fontFamily: "var(--font-headline)",
                    color: "var(--ys-highlight)",
                  }}
                >
                  {report.label}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}

      {project.caseStudy && (
        <div className="mx-auto max-w-[1100px] px-5 pt-2">
          <LeadershipLens lens={project.caseStudy.leadershipLens} />
        </div>
      )}

      {project.caseStudy && project.caseStudy.sections.length > 0 && (
        <CaseStudyBlocks sections={project.caseStudy.sections} />
      )}

      <footer className="mx-auto max-w-[1100px] px-10 pb-20" style={{ marginTop: 90 }}>
        <div
          className="flex flex-wrap items-end justify-between gap-6"
          style={{ borderTop: "1px solid var(--ys-border)", paddingTop: 46 }}
        >
          <div>
            <p
              className="mb-3 text-[11px] uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              Next
            </p>
            <Link
              href="/work"
              className="font-bold uppercase transition-colors hover:text-[var(--ys-accent)]"
              style={{
                fontFamily: "var(--font-headline)",
                color: "var(--ys-text)",
                fontSize: "clamp(28px,4vw,44px)",
                letterSpacing: "-0.02em",
              }}
            >
              All Work →
            </Link>
          </div>
          <Link
            href="/"
            className="px-[26px] py-[18px] text-[12px] uppercase tracking-[0.16em] transition-opacity hover:opacity-90"
            style={{ fontFamily: "var(--font-mono)", background: "var(--ys-highlight)", color: "var(--ys-surface)" }}
          >
            Start a Diagnostic →
          </Link>
        </div>
      </footer>
    </main>
  );
}
