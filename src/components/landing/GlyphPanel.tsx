"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const NAV_ITEMS = [
  {
    num: "01",
    label: "Projects",
    desc: "12 case studies · AI / Fintech / Infrastructure",
    type: "window" as const,
    id: "projects",
  },
  {
    num: "02",
    label: "Work Hub",
    desc: "3 leadership clusters · Architecture & Delivery",
    type: "link" as const,
    href: "/work",
  },
  {
    num: "03",
    label: "Capabilities",
    desc: "Finance · Technology / AI · Leadership",
    type: "window" as const,
    id: "capability-graph",
  },
  {
    num: "04",
    label: "Diagnostic",
    desc: "5-day scope · Discovery to Pricing",
    type: "window" as const,
    id: "diagnostic",
  },
  {
    num: "05",
    label: "About",
    desc: "Founder journey · CTO Profile · Credentials",
    type: "window" as const,
    id: "about",
  },
  {
    num: "06",
    label: "Contact",
    desc: "Architecture mandates · Book a call",
    type: "window" as const,
    id: "contact",
  },
];

export default function GlyphPanel({ onOpen }: { onOpen: (id: string) => void }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.aside
      className="absolute left-6 top-[58px] z-[0] hidden lg:block xl:left-10 xl:top-[66px]"
      style={{ width: "min(52vw, 680px)", height: "min(78vh, 680px)", opacity: 1 }}
    >
      <div className="flex h-full flex-col">
        <p
          className="mb-4 text-[9px] font-bold uppercase tracking-[0.28em]"
          style={{ fontFamily: "var(--font-mono)", color: "rgba(255,244,233,0.42)" }}
        >
          Navigation Portal
        </p>

        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {NAV_ITEMS.map((item, i) => {
            const isDimmed = hoveredIndex !== null && hoveredIndex !== i;

            const inner = (
              <motion.div
                className="group relative flex items-center gap-5 overflow-hidden cursor-pointer"
                style={{
                  flex: 1,
                  borderTop: "1px solid rgba(255,244,233,0.12)",
                  ...(i === NAV_ITEMS.length - 1
                    ? { borderBottom: "1px solid rgba(255,244,233,0.12)" }
                    : {}),
                  padding: "0 6px",
                }}
                animate={{ opacity: isDimmed ? 0.38 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                initial={false}
                whileHover="hovered"
              >

                {/* Sweep fill */}
                <motion.span
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "rgba(169,61,29,0.14)", transformOrigin: "left", scaleX: 0 }}
                  variants={{ hovered: { scaleX: 1 } }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                />

                {/* Number */}
                <span
                  className="relative shrink-0 text-[10px] font-bold tracking-[0.1em]"
                  style={{ fontFamily: "var(--font-mono)", color: "rgba(255,244,233,0.22)" }}
                >
                  {item.num}
                </span>

                {/* Title */}
                <span
                  className="relative flex-1 font-black uppercase leading-none transition-colors duration-150"
                  style={{
                    fontFamily: "var(--font-headline)",
                    fontSize: "clamp(24px, 3.4vw, 44px)",
                    letterSpacing: "-0.025em",
                    color: "rgba(255,250,244,0.90)",
                  }}
                >
                  {item.label}
                </span>

                {/* Right: desc + arrow */}
                <div className="relative flex shrink-0 items-center gap-4">
                  <span
                    className="hidden truncate text-right leading-[1.55] xl:block"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "rgba(255,244,233,0.38)",
                      maxWidth: "220px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.desc}
                  </span>
                  <motion.span
                    variants={{ hovered: { x: 6, color: "rgba(255,250,244,0.9)" } }}
                    style={{ color: "rgba(255,244,233,0.22)" }}
                    transition={{ duration: 0.18 }}
                  >
                    <ArrowRight size={20} />
                  </motion.span>
                </div>
              </motion.div>
            );

            const entranceProps = {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.18 + i * 0.045, duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
              style: { flex: "1 1 0%" as const, display: "flex" as const, minHeight: 0 },
            };

            if (item.type === "link") {
              return (
                <motion.div key={item.num} {...entranceProps}>
                  <Link
                    href={item.href}
                    style={{ flex: 1, display: "flex", minHeight: 0 }}
                    onMouseEnter={() => setHoveredIndex(i)}
                  >
                    {inner}
                  </Link>
                </motion.div>
              );
            }

            return (
              <motion.div key={item.num} {...entranceProps}>
                <button
                  onClick={() => onOpen(item.id)}
                  className="text-left"
                  style={{ flex: 1, display: "flex", minHeight: 0, background: "none", border: "none", padding: 0 }}
                  onMouseEnter={() => setHoveredIndex(i)}
                >
                  {inner}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
}
