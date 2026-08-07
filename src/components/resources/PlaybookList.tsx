"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BookOpen, Filter } from "lucide-react";
import PlaybookCard from "./PlaybookCard";
import {
  founderPlaybooks,
  PLAYBOOK_CATEGORIES,
  type PlaybookCategory,
} from "@/data/founder-playbooks";

export default function PlaybookList() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<PlaybookCategory | "all">(
    "all"
  );

  const filtered =
    activeCategory === "all"
      ? founderPlaybooks
      : founderPlaybooks.filter((p) => p.category === activeCategory);

  const handleToggle = (slug: string) => {
    setOpenSlug((current) => (current === slug ? null : slug));
  };

  return (
    <div className="space-y-6">
      {/* Category filter pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.15em]"
          style={{ color: "var(--color-ink-2)" }}
        >
          <Filter size={10} />
          Filter
        </span>
        <button
          onClick={() => setActiveCategory("all")}
          className="rounded-full border px-3 py-1 text-[11px] font-mono uppercase tracking-[0.1em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          style={
            activeCategory === "all"
              ? {
                  background: "var(--color-accent-strong)",
                  color: "var(--color-paper)",
                  borderColor: "var(--color-accent-strong)",
                }
              : {
                  background: "transparent",
                  color: "var(--color-ink-2)",
                  borderColor: "var(--color-rule)",
                }
          }
        >
          All ({founderPlaybooks.length})
        </button>
        {PLAYBOOK_CATEGORIES.map((cat) => {
          const count = founderPlaybooks.filter(
            (p) => p.category === cat.id
          ).length;
          if (count === 0) return null;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="rounded-full border px-3 py-1 text-[11px] font-mono uppercase tracking-[0.1em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              style={
                activeCategory === cat.id
                  ? {
                      background: "var(--color-accent)",
                      color: "var(--color-paper)",
                      borderColor: "var(--color-accent)",
                    }
                  : {
                      background: "transparent",
                      color: "var(--color-ink-2)",
                      borderColor: "var(--color-rule)",
                    }
              }
            >
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Hero banner */}
      {activeCategory === "all" && (
        <div
          className="flex items-center gap-3 rounded-xl border px-5 py-4"
          style={{
            borderColor: "var(--color-rule)",
            background: "var(--color-paper-2)",
          }}
        >
          <BookOpen size={18} style={{ color: "var(--color-accent)" }} />
          <div>
            <p
              className="mb-1 text-[11px] font-mono uppercase tracking-[0.15em]"
              style={{ color: "var(--color-accent-strong)" }}
            >
              Founder & Builder Playbooks
            </p>
            <p
              className="text-[13.5px] leading-[1.5]"
              style={{ color: "var(--color-ink-2)" }}
            >
              Operating, fundraising, sales, hiring and mental health — playbooks
              written from the mistakes I actually made. No theory. Just what
              worked, what didn&apos;t, and why.
            </p>
          </div>
        </div>
      )}

      {/* Playbook list */}
      <div className="space-y-3">
        {filtered.map((playbook) => (
          <AnimatePresence key={playbook.slug}>
            <PlaybookCard
              playbook={playbook}
              onOpen={handleToggle}
              isExpanded={openSlug === playbook.slug}
            />
          </AnimatePresence>
        ))}
      </div>

      {filtered.length === 0 && (
        <div
          className="rounded-2xl border border-dashed py-12 text-center"
          style={{ borderColor: "var(--color-rule)" }}
        >
          <p
            className="text-[12px] font-mono uppercase tracking-[0.15em]"
            style={{ color: "var(--color-ink-2)" }}
          >
            No playbooks in this category yet
          </p>
        </div>
      )}
    </div>
  );
}
