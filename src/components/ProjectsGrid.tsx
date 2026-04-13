"use client";

import { useState } from "react";
import { ExternalLink, GitBranch, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "@/lib/projects";
import type { Category } from "@/lib/projects";

const FILTER_TABS: { label: string; value: Category | "all" }[] = [
  { label: "All",       value: "all"     },
  { label: "Fintech",   value: "fintech" },
  { label: "AI",        value: "ai"      },
  { label: "Quant",     value: "quant"   },
  { label: "Web",       value: "web"     },
  { label: "Tools",     value: "tools"   },
];

const LANG_COLOURS: Record<string, string> = {
  Python:     "#3b82f6",
  TypeScript: "#a78bfa",
  "C#":       "#22d3ee",
  DAX:        "#f59e0b",
  default:    "#6b7280",
};

export default function ProjectsGrid() {
  const [active, setActive] = useState<Category | "all">("all");

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.category.includes(active));

  return (
    <section id="work" className="bg-[#080808] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#fbbf24]" />
          <span
            className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#fbbf24]"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            SELECTED WORK
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <h2
            className="text-4xl md:text-5xl font-black text-white tracking-[-0.03em] uppercase"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            20 repos.{" "}
            <span
              className="text-[#fbbf24]"
              style={{
                fontFamily: "var(--font-serif-display)",
                fontStyle: "italic",
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Real systems.
            </span>
          </h2>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {FILTER_TABS.map((t) => (
              <button
                key={t.value}
                onClick={() => setActive(t.value)}
                className={`px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] border transition-colors ${
                  active === t.value
                    ? "bg-[#fbbf24] text-[#080808] border-[#fbbf24]"
                    : "text-neutral-500 border-white/10 hover:border-white/25 hover:text-white"
                }`}
                style={{ fontFamily: "var(--font-headline)" }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((p, i) => (
            <motion.article
              key={p.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              className="group bg-[#0d0d0d] border border-white/6 p-5 flex flex-col gap-4 card-left-glow transition-all duration-300 hover:border-white/12"
            >
              {/* Top row */}
              <div className="flex items-start justify-between">
                <span
                  className="text-[9px] font-black uppercase tracking-widest text-neutral-600"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {p.language}
                </span>
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{
                    background: LANG_COLOURS[p.language] ?? LANG_COLOURS.default,
                  }}
                />
              </div>

              {/* Name + description */}
              <div>
                <h3
                  className="text-sm font-black text-white mb-1.5 group-hover:text-[#fbbf24] transition-colors"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {p.name}
                </h3>
                <p className="text-[0.78rem] text-neutral-500 leading-relaxed line-clamp-3">
                  {p.description}
                </p>
              </div>

              {/* Stat */}
              <div className="mt-auto">
                <span
                  className="text-lg font-black text-[#fbbf24]"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {p.stat}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-neutral-600 font-bold ml-1.5">
                  {p.statLabel}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {p.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-white/5 border border-white/8 text-[10px] text-neutral-500 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 pt-1 border-t border-white/5">
                <a
                  href={p.githubHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-neutral-600 hover:text-white text-[10px] font-bold uppercase tracking-wider transition-colors"
                >
                  <GitBranch size={12} />
                  Code
                </a>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-neutral-600 hover:text-[#fbbf24] text-[10px] font-bold uppercase tracking-wider transition-colors ml-auto"
                >
                  View
                  <ArrowUpRight size={11} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
