"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Wrench, ExternalLink, Filter } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import {
  toolkit,
  TOOLKIT_CATEGORIES,
  PRICING_LABELS,
  PRICING_COLORS,
  type ToolkitCategory,
  type Pricing,
} from "@/data/toolkit";

export default function ToolkitList() {
  const [activeCategory, setActiveCategory] = useState<ToolkitCategory | "all">(
    "all"
  );
  const [activePricing, setActivePricing] = useState<Pricing | "all">("all");

  const filtered = toolkit.filter((t) => {
    if (activeCategory !== "all" && t.category !== activeCategory) return false;
    if (activePricing !== "all" && t.pricing !== activePricing) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.15em]"
            style={{ color: "var(--color-ink-2)" }}
          >
            <Filter size={10} />
            Category
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
            All ({toolkit.length})
          </button>
          {TOOLKIT_CATEGORIES.map((cat) => {
            const count = toolkit.filter((t) => t.category === cat.id).length;
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

        <div className="flex flex-wrap items-center gap-2">
          <span
            className="text-[11px] font-mono uppercase tracking-[0.15em]"
            style={{ color: "var(--color-ink-2)" }}
          >
            Pricing
          </span>
          {(["all", "free", "freemium", "paid", "enterprise"] as const).map(
            (p) => (
              <button
                key={p}
                onClick={() => setActivePricing(p)}
                className="rounded-full border px-3 py-1 text-[11px] font-mono uppercase tracking-[0.1em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                style={
                  activePricing === p
                    ? {
                        background: "var(--color-ink)",
                        color: "var(--color-paper)",
                        borderColor: "var(--color-ink)",
                      }
                    : {
                        background: "transparent",
                        color: "var(--color-ink-2)",
                        borderColor: "var(--color-rule)",
                      }
                }
              >
                {p === "all" ? "All" : PRICING_LABELS[p]}
              </button>
            )
          )}
        </div>
      </div>

      {/* Hero banner */}
      {activeCategory === "all" && activePricing === "all" && (
        <div
          className="flex items-center gap-3 rounded-xl border px-5 py-4"
          style={{
            borderColor: "var(--color-rule)",
            background: "var(--color-paper-2)",
          }}
        >
          <Wrench size={18} style={{ color: "var(--color-accent)" }} />
          <div>
            <p
              className="mb-1 text-[11px] font-mono uppercase tracking-[0.15em]"
              style={{ color: "var(--color-accent-strong)" }}
            >
              Founder & Engineer Toolkit
            </p>
            <p
              className="text-[13.5px] leading-[1.5]"
              style={{ color: "var(--color-ink-2)" }}
            >
              The tools I actually use every day — engineering, design,
              productivity, finance, and AI. Filter by category or pricing.
              Each entry has a one-liner on why it's in the stack.
            </p>
          </div>
        </div>
      )}

      {/* Toolkit grid */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {filtered.map((item) => {
          const pricing = PRICING_COLORS[item.pricing];
          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => trackEvent("toolkit_link", { tool: item.name })}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl border px-5 py-4 transition-[transform,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-16px_rgba(207,79,39,0.25)]"
              style={{
                background: "var(--color-paper-2)",
                borderColor: "var(--color-rule)",
              }}
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <h3
                  className="font-bold leading-[1.2]"
                  style={{
                    fontFamily: "var(--font-headline)",
                    color: "var(--color-ink)",
                    fontSize: 16,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.name}
                </h3>
                <ExternalLink
                  size={14}
                  className="shrink-0 opacity-40 transition-opacity group-hover:opacity-80"
                  style={{ color: "var(--color-ink-2)" }}
                />
              </div>
              <p
                className="mb-3 text-[12.5px] leading-[1.5]"
                style={{ color: "var(--color-ink-2)" }}
              >
                {item.oneLiner}
              </p>
              <div className="flex items-center gap-2">
                <span
                  className="rounded px-2 py-0.5 text-[11px] font-mono uppercase tracking-[0.1em]"
                  style={{
                    background: pricing.bg,
                    color: pricing.text,
                    border: `1px solid ${pricing.border}`,
                  }}
                >
                  {PRICING_LABELS[item.pricing]}
                </span>
                {item.pricingNote && (
                  <span
                    className="text-[11px] font-mono"
                    style={{ color: "var(--color-ink-2)" }}
                  >
                    {item.pricingNote}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
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
            No tools match these filters
          </p>
        </div>
      )}
    </div>
  );
}
