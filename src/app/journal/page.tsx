import Link from "next/link";
import type { Metadata } from "next";
import MobileNav from "@/components/layout/MobileNav";
import { journal, JOURNAL_TAGS } from "@/data/journal";

export const metadata: Metadata = {
  title: "Journal — Yogesh Sahu",
  description:
    "A weekly Friday check-in on what I'm building, reading, and figuring out. Honest reflections from running crypto data infrastructure and AI-native products.",
  openGraph: {
    title: "Journal — Yogesh Sahu",
    description:
      "Weekly Friday reflections on building, life, and the messy middle of running a portfolio of companies.",
    url: "https://yogeshsahu.xyz/journal",
  },
  twitter: {
    card: "summary",
    title: "Journal — Yogesh Sahu",
    description: "Weekly Friday reflections on building, life, and the messy middle.",
  },
};

export default function JournalPage() {
  const sorted = [...journal].sort((a, b) => (a.date < b.date ? 1 : -1));
  const latest = sorted[0];
  const rest = sorted.slice(1);

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
          Journal · Weekly · Friday
        </span>
      </nav>

      <div className="mx-auto max-w-[760px] px-5 pt-24 pb-16">
        <p
          className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-accent)" }}
        >
          Weekly Check-in · Friday
        </p>
        <h1
          className="mb-3 font-bold uppercase"
          style={{
            fontFamily: "var(--font-headline)",
            color: "var(--ys-text)",
            fontSize: "clamp(36px,5.6vw,72px)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
          }}
        >
          Journal
        </h1>
        <p
          className="mb-6 max-w-[58ch] text-[15px] leading-[1.8]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          A Friday check-in on what I'm building, what I'm reading, and what I'm
          figuring out. Honest reflections from the messy middle of running a
          portfolio of companies.
        </p>
        <p
          className="mb-12 max-w-[58ch] text-[13px] leading-[1.6]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          {sorted.length} {sorted.length === 1 ? "post" : "posts"} · Subscribe via{" "}
          <a
            href="/journal/rss.xml"
            style={{ color: "var(--ys-accent)", textDecoration: "underline" }}
          >
            RSS
          </a>
        </p>

        {/* tag legend */}
        <div
          className="mb-12 flex flex-wrap gap-2 border-t border-b py-4"
          style={{ borderColor: "var(--ys-border)" }}
        >
          {JOURNAL_TAGS.map((t) => (
            <span
              key={t.id}
              className="text-[9px] uppercase tracking-[0.12em]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--ys-text-soft)",
                border: "1px solid var(--ys-border)",
                padding: "3px 8px",
                lineHeight: 1.3,
              }}
              title={t.description}
            >
              {t.label} · {journal.filter((j) => j.tags.includes(t.id)).length}
            </span>
          ))}
        </div>

        {/* latest — large hero card */}
        {latest && (
          <Link
            href={`/journal/${latest.slug}`}
            className="block mb-14"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <article
              className="border-t pt-6 transition-opacity hover:opacity-80"
              style={{ borderColor: "var(--ys-border)" }}
            >
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="text-[9px] uppercase tracking-[0.15em]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--ys-accent)" }}
                >
                  Latest · {latest.date}
                </span>
                {latest.mood && (
                  <span
                    className="text-[9px] uppercase tracking-[0.12em]"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--ys-text-soft)",
                      fontStyle: "italic",
                    }}
                  >
                    mood: {latest.mood}
                  </span>
                )}
              </div>
              <h2
                className="mb-4 font-bold leading-[1.05]"
                style={{
                  fontFamily: "var(--font-headline)",
                  color: "var(--ys-text)",
                  fontSize: "clamp(28px,4vw,44px)",
                  letterSpacing: "-0.025em",
                }}
              >
                {latest.title}
              </h2>
              <p
                className="mb-3 text-[15px] leading-[1.7]"
                style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
              >
                {latest.excerpt}
              </p>
              <div className="flex items-center gap-3">
                {latest.tags.map((tag) => (
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
                  {latest.readTime} min read
                </span>
              </div>
            </article>
          </Link>
        )}

        {/* archive list */}
        <div className="flex flex-col gap-10">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
              className="transition-opacity hover:opacity-80"
            >
              <article className="border-t pt-6" style={{ borderColor: "var(--ys-border)" }}>
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="text-[9px] uppercase tracking-[0.15em]"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
                  >
                    {post.date}
                  </span>
                  {post.mood && (
                    <span
                      className="text-[9px] uppercase tracking-[0.12em]"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--ys-text-soft)",
                        fontStyle: "italic",
                      }}
                    >
                      mood: {post.mood}
                    </span>
                  )}
                </div>
                <h3
                  className="mb-3 font-bold leading-[1.1]"
                  style={{
                    fontFamily: "var(--font-headline)",
                    color: "var(--ys-text)",
                    fontSize: "clamp(22px,3vw,32px)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {post.title}
                </h3>
                <p
                  className="mb-3 text-[14.5px] leading-[1.7]"
                  style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
                >
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3">
                  {post.tags.map((tag) => (
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
                    {post.readTime} min read
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

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
