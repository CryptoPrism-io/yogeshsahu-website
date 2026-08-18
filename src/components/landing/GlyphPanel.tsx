"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, BookOpen, Mail, Terminal, Zap } from "lucide-react";
import { rhythmDelays } from "@/lib/motion";
import { trackEvent } from "@/lib/analytics";

const NAV_ITEMS = [
  {
    label: "Capabilities",
    desc: "Finance · Tech/AI · Leadership",
    icon: "zap",
    type: "window" as const,
    id: "capability-graph",
  },
  {
    label: "Terminal",
    desc: "Command interface · Quick access",
    icon: "terminal",
    type: "window" as const,
    id: "terminal",
  },
  {
    label: "Work",
    desc: "12 case studies · 3 clusters",
    icon: "briefcase",
    type: "link" as const,
    href: "/work",
  },
];

const ICON_MAP: Record<string, React.ElementType> = {
  briefcase: Briefcase,
  bookOpen: BookOpen,
  mail: Mail,
  terminal: Terminal,
  zap: Zap,
};

export default function GlyphPanel({ onOpen }: { onOpen: (id: string) => void }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const rowDelays = rhythmDelays(NAV_ITEMS.length, 0.35, 0.85);

  return (
    <motion.aside
      className="absolute left-6 top-[58px] z-[0] hidden lg:block xl:left-10 xl:top-[66px] xl:h-[calc(90vh-50px)]"
      style={{
        width: "min(48vw, 620px)",
        height: "calc(90vh - 42px)",
      }}
    >
      <div className="flex h-full flex-col">
        <motion.p
          className="mb-3 text-[9px] font-bold uppercase tracking-[0.28em]"
          style={{ fontFamily: "var(--font-mono)", color: "rgba(255,244,233,0.42)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 0.84, 0.44, 1] }}
        >
          Navigation Portal
        </motion.p>

        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {NAV_ITEMS.map((item, i) => {
            const isDimmed = hoveredIndex !== null && hoveredIndex !== i;

            const inner = (
              <motion.div
                className="group relative flex items-center gap-4 cursor-pointer"
                style={{
                  flex: 1,
                  borderTop: "1px solid rgba(255,244,233,0.10)",
                  ...(i === NAV_ITEMS.length - 1
                    ? { borderBottom: "1px solid rgba(255,244,233,0.10)" }
                    : {}),
                  padding: "0 8px",
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

                {/* Icon badge */}
                <motion.span
                  className="relative shrink-0 flex items-center justify-center"
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    background: "rgba(255,244,233,0.08)",
                    border: "1px solid rgba(255,244,233,0.10)",
                    color: "rgba(255,244,233,0.55)",
                  }}
                  variants={{
                    hovered: {
                      scale: 1.4,
                      background: "rgba(255,255,255,0.12)",
                      borderColor: "rgba(255,255,255,0.2)",
                      color: "rgba(255,255,255,0.9)",
                    },
                  }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  {(() => {
                    const IconComp = ICON_MAP[item.icon];
                    return IconComp ? <IconComp size={13} strokeWidth={2} /> : null;
                  })()}
                </motion.span>

                {/* Title */}
                <motion.span
                  className="relative flex-1 font-black uppercase leading-none"
                  style={{
                    fontFamily: "var(--font-headline)",
                    fontSize: "clamp(12px, 1.7vw, 22px)",
                    letterSpacing: "-0.025em",
                    color: "rgba(255,250,244,0.90)",
                    transformOrigin: "left center",
                  }}
                  variants={{ hovered: { scale: 1.6 } }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  {item.label}
                  {/* underline */}
                  <motion.span
                    className="absolute -bottom-0.5 left-0 h-[1.5px]"
                    style={{ background: "var(--ys-accent)", transformOrigin: "left" }}
                    initial={{ scaleX: 0 }}
                    variants={{ hovered: { scaleX: 1 } }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                </motion.span>

                {/* Right: desc + arrow */}
                <div className="relative flex shrink-0 items-center gap-3">
                  <span
                    className="hidden text-right leading-[1.5] xl:block"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      color: "rgba(255,244,233,0.38)",
                      maxWidth: "200px",
                    }}
                  >
                    {item.desc}
                  </span>
                  <motion.span
                    variants={{ hovered: { x: 5, color: "rgba(255,250,244,0.9)" } }}
                    style={{ color: "rgba(255,244,233,0.22)" }}
                    transition={{ duration: 0.18 }}
                  >
                    <ArrowRight size={16} />
                  </motion.span>
                </div>
              </motion.div>
            );

            const entranceProps = {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: rowDelays[i], duration: 0.5, ease: [0.16, 0.84, 0.44, 1] as const },
              style: { flex: "1 1 0%" as const, display: "flex" as const, minHeight: 0 },
            };

            if (item.type === "link") {
              return (
                <motion.div key={item.label} {...entranceProps}>
                  <Link
                    href={item.href}
                    style={{ flex: 1, display: "flex", minHeight: 0 }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onClick={() => trackEvent("nav_click", { destination: item.href })}
                  >
                    {inner}
                  </Link>
                </motion.div>
              );
            }

            return (
              <motion.div key={item.label} {...entranceProps}>
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
