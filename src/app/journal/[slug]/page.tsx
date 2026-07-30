import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import MobileNav from "@/components/layout/MobileNav";
import { getJournalEntry, getAllJournalSlugs, journal } from "@/data/journal";

export function generateStaticParams() {
  return getAllJournalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getJournalEntry(slug);
  if (!entry) return { title: "Not Found — yogeshsahu.xyz" };
  return {
    title: `${entry.title} — Journal`,
    description: entry.excerpt,
    openGraph: {
      title: `${entry.title} — Journal`,
      description: entry.excerpt,
      type: "article",
      publishedTime: entry.date,
      url: `https://yogeshsahu.xyz/journal/${entry.slug}`,
    },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getJournalEntry(slug);
  if (!entry) notFound();

  const sorted = [...journal].sort((a, b) => (a.date < b.date ? 1 : -1));
  const currentIdx = sorted.findIndex((j) => j.slug === slug);
  const prev = currentIdx < sorted.length - 1 ? sorted[currentIdx + 1] : null;
  const next = currentIdx > 0 ? sorted[currentIdx - 1] : null;

  return (
    <main className="h-screen overflow-y-auto" style={{ background: "var(--ys-surface)", color: "var(--ys-text)" }}>
      <div className="fixed top-4 left-4 z-50 hidden max-[767px]:block">
        <MobileNav />
      </div>
      <nav
        className="fixed top-4 left-1/2 z-50 -translate-x-1/2 inline-flex items-center gap-4 px-4 py-2"
        style={{
          background: "color-mix(in oklch, var(--ys-surface) 78%, transparent)",
          backdropFilter: "blur(14px) saturate(120%)",
          WebkitBackdropFilter: "blur(14px) saturate(120%)",
          border: "1px solid color-mix(in oklch, var(--ys-border) 70%, transparent)",
          borderRadius: 9999,
          boxShadow: "0 8px 24px -12px oklch(0% 0 0 / 0.18)",
        }}
      >
        <Link
          href="/"
          aria-label="Home"
          className="text-[11px] font-bold uppercase tracking-[0.1em]"
          style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
        >
          YS.
        </Link>
        <span aria-hidden style={{ width: 1, height: 14, background: "var(--ys-border)" }} />
        <span
          className="text-[9px] uppercase tracking-[0.15em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          Journal
        </span>
      </nav>

      <article className="mx-auto max-w-[760px] px-5 pt-24 pb-16">
        <Link
          href="/journal"
          className="mb-8 inline-block text-[9px] uppercase tracking-[0.15em] transition-opacity hover:opacity-60"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          ← Journal
        </Link>

        <div className="mb-3 flex items-center gap-3">
          <span
            className="text-[9px] uppercase tracking-[0.15em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ys-accent)" }}
          >
            {entry.date} · Friday
          </span>
          {entry.mood && (
            <span
              className="text-[9px] uppercase tracking-[0.12em]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--ys-text-soft)",
                fontStyle: "italic",
              }}
            >
              mood: {entry.mood}
            </span>
          )}
        </div>

        <h1
          className="mb-6 font-bold uppercase"
          style={{
            fontFamily: "var(--font-headline)",
            color: "var(--ys-text)",
            fontSize: "clamp(32px,5vw,56px)",
            lineHeight: 1,
            letterSpacing: "-0.025em",
          }}
        >
          {entry.title}
        </h1>

        <div className="mb-10 flex items-center gap-3">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] uppercase tracking-[0.12em]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--ys-accent-strong)",
                border: "1px solid var(--ys-border)",
                padding: "2px 6px",
              }}
            >
              {tag}
            </span>
          ))}
          <span
            className="text-[9px] uppercase tracking-[0.15em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
          >
            {entry.readTime} min read
          </span>
        </div>

        <div className="border-t pt-8" style={{ borderColor: "var(--ys-border)" }}>
          {entry.body.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="mb-5 text-[15.5px] leading-[1.85]"
              style={{ fontFamily: "var(--font-body)", color: "var(--ys-text)" }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* prev / next */}
        <nav
          className="mt-16 grid grid-cols-1 gap-6 border-t pt-8 sm:grid-cols-2"
          style={{ borderColor: "var(--ys-border)" }}
        >
          {prev ? (
            <Link
              href={`/journal/${prev.slug}`}
              className="transition-opacity hover:opacity-70"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span
                className="block text-[9px] uppercase tracking-[0.15em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
              >
                ← Older
              </span>
              <span
                className="mt-1 block font-bold"
                style={{
                  fontFamily: "var(--font-headline)",
                  color: "var(--ys-text)",
                  fontSize: 16,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}
              >
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next && (
            <Link
              href={`/journal/${next.slug}`}
              className="transition-opacity hover:opacity-70 sm:text-right"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span
                className="block text-[9px] uppercase tracking-[0.15em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
              >
                Newer →
              </span>
              <span
                className="mt-1 block font-bold"
                style={{
                  fontFamily: "var(--font-headline)",
                  color: "var(--ys-text)",
                  fontSize: 16,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}
              >
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      </article>

      <footer
        className="px-10 py-[72px]"
        style={{ borderTop: "1px solid var(--ys-border)" }}
      >
        <div className="mx-auto max-w-[760px] grid gap-8">
          <p
            className="m-0"
            style={{
              fontFamily: "var(--font-serif-display)",
              fontSize: "clamp(1.75rem, 5vw, 3.25rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "var(--ys-text)",
              maxWidth: "28ch",
            }}
          >
            Build something they&apos;ll remember.
          </p>
          <div
            className="flex justify-between items-baseline pt-2"
            style={{ borderTop: "1px solid var(--ys-border)" }}
          >
            <span
              className="text-[11px] font-bold uppercase tracking-[0.1em]"
              style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
            >
              YS.
            </span>
            <span
              className="text-[9px] uppercase tracking-[0.15em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              yogeshsahu.xyz
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
