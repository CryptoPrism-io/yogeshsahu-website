"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { FounderPlaybook } from "@/data/founder-playbooks";
import { getPlaybook } from "@/data/founder-playbooks";

interface PlaybookCardProps {
  playbook: FounderPlaybook;
  onOpen: (slug: string) => void;
  isExpanded: boolean;
}

const categoryAccent: Record<string, { bg: string; text: string; border: string }> = {
  operating: {
    bg: "rgba(11, 141, 128, 0.08)",
    text: "var(--ys-highlight)",
    border: "rgba(11, 141, 128, 0.3)",
  },
  hiring: {
    bg: "rgba(74, 125, 165, 0.08)",
    text: "#4a7da5",
    border: "rgba(74, 125, 165, 0.3)",
  },
  fundraising: {
    bg: "rgba(207, 79, 39, 0.08)",
    text: "var(--ys-accent-strong)",
    border: "rgba(207, 79, 39, 0.3)",
  },
  sales: {
    bg: "rgba(168, 79, 45, 0.08)",
    text: "var(--ys-accent)",
    border: "rgba(168, 79, 45, 0.3)",
  },
  "mental-health": {
    bg: "rgba(140, 110, 80, 0.08)",
    text: "#8c6e50",
    border: "rgba(140, 110, 80, 0.3)",
  },
};

const categoryLabel: Record<string, string> = {
  operating: "Operating",
  hiring: "Hiring",
  fundraising: "Fundraising",
  sales: "Sales",
  "mental-health": "Mental Health",
};

export default function PlaybookCard({
  playbook,
  onOpen,
  isExpanded,
}: PlaybookCardProps) {
  const accent = categoryAccent[playbook.category] ?? categoryAccent.operating;

  return (
    <motion.article
      layout
      initial={false}
      className="overflow-hidden rounded-2xl border"
      style={{
        background: "var(--ys-surface-strong)",
        borderColor: "var(--ys-border)",
      }}
    >
      <button
        onClick={() => onOpen(playbook.slug)}
        className="group w-full px-6 py-5 text-left transition-colors hover:bg-[rgba(207,79,39,0.04)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-3 flex items-center gap-2">
              <span
                className="rounded px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.1em]"
                style={{
                  background: accent.bg,
                  color: accent.text,
                  border: `1px solid ${accent.border}`,
                }}
              >
                {categoryLabel[playbook.category]}
              </span>
              <span
                className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-[0.1em]"
                style={{ color: "var(--ys-text-soft)" }}
              >
                <Clock size={10} />
                {playbook.readingTime} min
              </span>
            </div>
            <h3
              className="mb-2 font-bold leading-[1.2]"
              style={{
                fontFamily: "var(--font-headline)",
                color: "var(--ys-text)",
                fontSize: 20,
                letterSpacing: "-0.01em",
              }}
            >
              {playbook.title}
            </h3>
            <p
              className="text-[13.5px] leading-[1.6]"
              style={{ color: "var(--ys-text-soft)" }}
            >
              {playbook.summary}
            </p>
          </div>
          <span
            className="shrink-0 text-lg transition-transform"
            style={{
              color: isExpanded ? "var(--ys-accent)" : "var(--ys-text-soft)",
              transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          >
            +
          </span>
        </div>
      </button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="border-t px-6 py-5"
          style={{ borderColor: "var(--ys-border)" }}
        >
          <div
            className="prose prose-sm max-w-none"
            style={{ color: "var(--ys-text)" }}
          >
            {playbook.body.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="mb-3 text-[14px] leading-[1.7]"
                style={{ color: "var(--ys-text-soft)" }}
              >
                {para}
              </p>
            ))}
          </div>
        </motion.div>
      )}
    </motion.article>
  );
}
