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
          className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.15em]"
          style={{ color: "var(--ys-text-soft)" }}
        >
          <Filter size={10} />
          Filter
        </span>
        <button
          onClick={() => setActiveCategory("all")}
          className="rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.1em] transition-colors"
          style={
            activeCategory === "all"
              ? {
                  background: "var(--ys-accent)",
                  color: "var(--ys-surface)",
                  borderColor: "var(--ys-accent)",
                }
              : {
                  background: "transparent",
                  color: "var(--ys-text-soft)",
                  borderColor: "var(--ys-border)",
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
              className="rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.1em] transition-colors"
              style={
                activeCategory === cat.id
                  ? {
                      background: "var(--ys-accent)",
                      color: "var(--ys-surface)",
                      borderColor: "var(--ys-accent)",
                    }
                  : {
                      background: "transparent",
                      color: "var(--ys-text-soft)",
                      borderColor: "var(--ys-border)",
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
            borderColor: "var(--ys-border)",
            background: "var(--ys-surface-strong)",
          }}
        >
          <BookOpen size={18} style={{ color: "var(--ys-accent)" }} />
          <div>
            <p
              className="mb-1 text-[10px] font-mono uppercase tracking-[0.15em]"
              style={{ color: "var(--ys-accent-strong)" }}
            >
              Founder & Builder Playbooks
            </p>
            <p
              className="text-[13.5px] leading-[1.5]"
              style={{ color: "var(--ys-text-soft)" }}
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
          style={{ borderColor: "var(--ys-border)" }}
        >
          <p
            className="text-[12px] font-mono uppercase tracking-[0.15em]"
            style={{ color: "var(--ys-text-soft)" }}
          >
            No playbooks in this category yet
          </p>
        </div>
      )}
    </div>
  );
}
