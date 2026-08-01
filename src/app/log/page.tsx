"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, BookOpen } from "lucide-react";
import MobileNav from "@/components/layout/MobileNav";
import Reveal from "@/components/ui/Reveal";
import { posts, ALL_TAGS, type PostKind } from "@/data/posts";

type TagFilter = string | "all";
type KindFilter = PostKind | "all";

const KIND_META: Record<PostKind, { label: string; eyebrow: string; color: string }> = {
  thinking: { label: "Thinking", eyebrow: "T", color: "var(--ys-accent)" },
  journal: { label: "Journal", eyebrow: "J", color: "var(--ys-highlight)" },
};

export default function LogPage() {
  const [tagFilter, setTagFilter] = useState<TagFilter>("all");
  const [kindFilter, setKindFilter] = useState<KindFilter>("all");

  const filtered = posts.filter((p) => {
    if (kindFilter !== "all" && p.kind !== kindFilter) return false;
    if (tagFilter !== "all" && !p.tags.includes(tagFilter)) return false;
    return true;
  });

  const thinkingCount = posts.filter((p) => p.kind === "thinking").length;
  const journalCount = posts.filter((p) => p.kind === "journal").length;

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
          Log · {posts.length} posts
        </span>
      </nav>

      <div className="mx-auto max-w-[820px] px-5 pt-24 pb-16">
        <Reveal delay={0}>
          <p
            className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ys-accent)" }}
          >
            Architecture Notes · Weekly Reflections
          </p>
        </Reveal>
        <Reveal delay={0.16}>
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
            Log
          </h1>
          <p
            className="mb-6 max-w-[60ch] text-[15px] leading-[1.8]"
            style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
          >
            Architecture notes, cost lessons, decision logs, and weekly
            reflections — all in one thread. Filter by type or tag.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <p
            className="mb-10 max-w-[60ch] text-[13px] leading-[1.6]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
          >
            {posts.length} posts · Subscribe via{" "}
            <a href="/log/rss.xml" style={{ color: "var(--ys-accent)", textDecoration: "underline" }}>
              RSS
            </a>
          </p>
        </Reveal>

        {/* kind filter */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <LayoutGrid size={13} style={{ color: "var(--ys-text-soft)" }} />
          <button
            onClick={() => setKindFilter("all")}
            className="rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.1em] transition-colors"
            style={
              kindFilter === "all"
                ? { background: "var(--ys-text)", color: "var(--ys-surface)", borderColor: "var(--ys-text)" }
                : { background: "transparent", color: "var(--ys-text-soft)", borderColor: "var(--ys-border)" }
            }
          >
            All ({posts.length})
          </button>
          {(["thinking", "journal"] as PostKind[]).map((kind) => {
            const count = kind === "thinking" ? thinkingCount : journalCount;
            const active = kindFilter === kind;
            return (
              <button
                key={kind}
                onClick={() => setKindFilter(kind)}
                className="rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.1em] transition-colors"
                style={
                  active
                    ? { background: "var(--ys-accent)", color: "var(--ys-surface)", borderColor: "var(--ys-accent)" }
                    : { background: "transparent", color: "var(--ys-text-soft)", borderColor: "var(--ys-border)" }
                }
              >
                {KIND_META[kind].label} ({count})
              </button>
            );
          })}
        </div>

        {/* tag filter */}
        <div className="mb-12 flex flex-wrap items-center gap-2 border-t border-b py-4" style={{ borderColor: "var(--ys-border)" }}>
          <span
            className="mr-1 text-[9px] font-mono uppercase tracking-[0.15em]"
            style={{ color: "var(--ys-text-soft)" }}
          >
            Tags
          </span>
          <button
            onClick={() => setTagFilter("all")}
            className="rounded border px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.1em] transition-colors"
            style={
              tagFilter === "all"
                ? { background: "var(--ys-highlight)", color: "var(--ys-surface)", borderColor: "var(--ys-highlight)" }
                : { background: "transparent", color: "var(--ys-text-soft)", borderColor: "var(--ys-border)" }
            }
          >
            all
          </button>
          {ALL_TAGS.map((tag) => {
            const count = posts.filter((p) => p.tags.includes(tag)).length;
            const active = tagFilter === tag;
            return (
              <button
                key={tag}
                onClick={() => setTagFilter(active ? "all" : tag)}
                className="rounded border px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.1em] transition-colors"
                style={
                  active
                    ? { background: "var(--ys-highlight)", color: "var(--ys-surface)", borderColor: "var(--ys-highlight)" }
                    : { background: "transparent", color: "var(--ys-text-soft)", borderColor: "var(--ys-border)" }
                }
              >
                {tag} ({count})
              </button>
            );
          })}
        </div>

        {/* posts */}
        <div className="flex flex-col gap-10">
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => {
              const kind = KIND_META[post.kind];
              return (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={`/log/${post.slug}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    className="block transition-opacity hover:opacity-80"
                  >
                    <article className="border-t pt-6" style={{ borderColor: "var(--ys-border)" }}>
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span
                          className="flex h-5 w-5 items-center justify-center rounded text-[8px] font-bold"
                          style={{ fontFamily: "var(--font-mono)", background: kind.color, color: "var(--ys-surface)" }}
                          title={kind.label}
                        >
                          {kind.eyebrow}
                        </span>
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
                        <span
                          className="text-[9px] uppercase tracking-[0.15em]"
                          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
                        >
                          {post.readTime} min read
                        </span>
                      </div>
                      <h2
                        className="mb-3 font-bold leading-[1.1]"
                        style={{
                          fontFamily: "var(--font-headline)",
                          color: "var(--ys-text)",
                          fontSize: "clamp(22px,3vw,32px)",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {post.title}
                      </h2>
                      <p
                        className="mb-3 text-[14.5px] leading-[1.7]"
                        style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
                      >
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
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
                        <BookOpen size={13} style={{ color: "var(--ys-text-soft)" }} />
                      </div>
                    </article>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed py-12 text-center" style={{ borderColor: "var(--ys-border)" }}>
            <p className="text-[12px] font-mono uppercase tracking-[0.15em]" style={{ color: "var(--ys-text-soft)" }}>
              No posts match these filters
            </p>
          </div>
        )}
      </div>

      {/* connect CTA */}
      <section className="mx-auto max-w-[820px] px-5 pb-24">
        <div
          className="rounded-2xl border px-6 py-10 text-center"
          style={{
            borderColor: "var(--ys-border)",
            background: "var(--ys-surface-strong)",
          }}
        >
          <p
            className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ys-accent)" }}
          >
            Reading the log · Ready to ship?
          </p>
          <h2
            className="mb-4 font-black italic"
            style={{
              fontFamily: "var(--font-serif-display)",
              color: "var(--ys-text)",
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Start a diagnostic to connect now.
          </h2>
          <p
            className="mx-auto mb-7 max-w-[46ch] text-[14px] leading-[1.7]"
            style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
          >
            Five days, fixed scope, a 90-day execution plan. If the log shows
            how I think, the diagnostic shows what I&apos;d do for you.
          </p>
          <a
            href="mailto:yogesh.sahu@cryptoprism.io?subject=5-day%20CTO%20Diagnostic&body=Hi%20Yogesh%2C%0A%0AI%20want%20to%20explore%20the%205-day%20CTO%20diagnostic.%20The%20main%20issue%20we%20are%20dealing%20with%20is%3A%20%0A%0ACompany%3A%20%0AStage%3A%20%0ACurrent%20pressure%3A%20"
            className="inline-block px-7 py-3 text-[12px] uppercase tracking-[0.14em] transition-opacity hover:opacity-80"
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              background: "var(--ys-highlight)",
              color: "var(--ys-surface)",
            }}
          >
            Start a Diagnostic →
          </a>
        </div>
      </section>

      <footer className="px-10 py-[72px]" style={{ borderTop: "1px solid var(--ys-border)" }}>
        <div className="mx-auto max-w-[820px] grid gap-8">
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
          <div className="flex justify-between items-baseline pt-2" style={{ borderTop: "1px solid var(--ys-border)" }}>
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
