"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Users, ExternalLink, Filter } from "lucide-react";
import {
  community,
  COMMUNITY_TYPE_LABELS,
  COMMUNITY_TYPE_ORDER,
  type CommunityItem,
} from "@/data/community";

const TYPE_COLORS: Record<
  CommunityItem["type"],
  { bg: string; text: string; border: string }
> = {
  community: {
    bg: "rgba(11, 141, 128, 0.1)",
    text: "var(--color-accent-strong)",
    border: "rgba(11, 141, 128, 0.3)",
  },
  podcast: {
    bg: "rgba(74, 125, 165, 0.1)",
    text: "#4a7da5",
    border: "rgba(74, 125, 165, 0.3)",
  },
  book: {
    bg: "rgba(207, 79, 39, 0.1)",
    text: "var(--color-accent-strong)",
    border: "rgba(207, 79, 39, 0.3)",
  },
  conference: {
    bg: "rgba(140, 110, 80, 0.1)",
    text: "#8c6e50",
    border: "rgba(140, 110, 80, 0.3)",
  },
};

export default function CommunityList({
  audience = "all",
}: {
  audience?: "founders" | "builders" | "all";
}) {
  const [activeType, setActiveType] = useState<CommunityItem["type"] | "all">(
    "all"
  );

  const filtered = community.filter((c) => {
    if (audience !== "all" && c.audience && c.audience !== audience) return false;
    if (activeType !== "all" && c.type !== activeType) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Type filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.15em]"
          style={{ color: "var(--color-ink-2)" }}
        >
          <Filter size={10} />
          Type
        </span>
        <button
          onClick={() => setActiveType("all")}
          className="rounded-full border px-3 py-1 text-[11px] font-mono uppercase tracking-[0.1em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          style={
            activeType === "all"
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
          All ({filtered.length})
        </button>
        {COMMUNITY_TYPE_ORDER.map((type) => {
          const count = community.filter(
            (c) =>
              c.type === type &&
              (audience === "all" || !c.audience || c.audience === audience)
          ).length;
          if (count === 0) return null;
          return (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className="rounded-full border px-3 py-1 text-[11px] font-mono uppercase tracking-[0.1em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              style={
                activeType === type
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
              {COMMUNITY_TYPE_LABELS[type]} ({count})
            </button>
          );
        })}
      </div>

      {/* Hero banner */}
      {activeType === "all" && (
        <div
          className="flex items-center gap-3 rounded-xl border px-5 py-4"
          style={{
            borderColor: "var(--color-rule)",
            background: "var(--color-paper-2)",
          }}
        >
          <Users size={18} style={{ color: "var(--color-accent)" }} />
          <div>
            <p
              className="mb-1 text-[10px] font-mono uppercase tracking-[0.15em]"
              style={{ color: "var(--color-accent-strong)" }}
            >
              Community & Reading
            </p>
            <p
              className="text-[14px] leading-[1.55]"
              style={{ color: "var(--color-ink-2)" }}
            >
              Communities, podcasts, books, and conferences I actually
              recommend — for founders and builders.
            </p>
          </div>
        </div>
      )}

      {/* Group by type when showing all */}
      {activeType === "all" ? (
        <div className="space-y-8">
          {COMMUNITY_TYPE_ORDER.map((type) => {
            const items = filtered.filter((c) => c.type === type);
            if (items.length === 0) return null;
            return (
              <div key={type}>
                <h3
                  className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em]"
                  style={{
                    fontFamily: "var(--font-headline)",
                    color: "var(--color-ink)",
                  }}
                >
                  {COMMUNITY_TYPE_LABELS[type]}
                  <span
                    className="ml-2 text-[11px] font-normal tracking-[0.1em]"
                    style={{ color: "var(--color-ink-2)" }}
                  >
                    {items.length}
                  </span>
                </h3>
                <div className="space-y-2">
                  {items.map((item) => (
                    <CommunityRow key={`${type}-${item.name}`} item={item} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((item) => (
            <CommunityRow key={`${activeType}-${item.name}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function CommunityRow({ item }: { item: CommunityItem }) {
  const colors = TYPE_COLORS[item.type];
  const isExternal = item.url !== "#";
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 8px 20px -12px rgba(207,79,39,0.2)" }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={item.url}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="group flex items-start justify-between gap-4 rounded-xl border px-4 py-3"
        style={{
          background: "var(--color-paper-2)",
          borderColor: "var(--color-rule)",
        }}
      >
      <div className="flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <h4
            className="text-[14px] font-bold"
            style={{
              fontFamily: "var(--font-headline)",
              color: "var(--color-ink)",
              letterSpacing: "-0.01em",
            }}
          >
            {item.name}
          </h4>
          <span
            className="rounded px-1.5 py-0.5 text-[8px] font-mono uppercase tracking-[0.08em]"
            style={{
              background: colors.bg,
              color: colors.text,
              border: `1px solid ${colors.border}`,
            }}
          >
            {item.type}
          </span>
        </div>
        <p
          className="text-[14px] leading-[1.55]"
          style={{ color: "var(--color-ink-2)" }}
        >
          {item.oneLiner}
        </p>
        {(item.location || item.price) && (
          <p
            className="mt-1 text-[11px] font-mono uppercase tracking-[0.1em]"
            style={{ color: "var(--color-ink-2)" }}
          >
            {[item.location, item.price].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
      <ExternalLink
        size={14}
        className="mt-1 shrink-0 opacity-40 transition-opacity group-hover:opacity-80"
        style={{ color: "var(--color-ink-2)" }}
      />
    </Link>
    </motion.div>
  );
}
