"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, BarChart3, Code2, Users } from "lucide-react";
import { CAPABILITIES, DOMAIN_ORDER, type CapabilityId, type ProofLink } from "@/data/capabilities";
import { BRAND_SVG_MAP, BrandSvg } from "@/lib/brand-svgs";

interface CapabilityGraphWindowProps {
  onOpen: (id: string) => void;
}

const TAB_ICONS: Record<CapabilityId, React.ReactNode> = {
  finance: <BarChart3 size={14} strokeWidth={1.8} />,
  technology: <Code2 size={14} strokeWidth={1.8} />,
  leadership: <Users size={14} strokeWidth={1.8} />,
};

const DOMAIN_COLORS: Record<CapabilityId, string> = {
  finance: "#cf4f27",
  technology: "#4a7da5",
  leadership: "#0b8d80",
};

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
});

const cardHover = { y: -2, boxShadow: "0 6px 20px -8px rgba(0,0,0,0.12)" };

export default function CapabilityGraphWindow({ onOpen }: CapabilityGraphWindowProps) {
  const [activeNode, setActiveNode] = useState<CapabilityId>(DOMAIN_ORDER[0]);
  const active = CAPABILITIES[activeNode];
  const domainColor = DOMAIN_COLORS[activeNode];

  const userInteracted = useRef(false);
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let i = 0;
    const timer = setInterval(() => {
      if (userInteracted.current) {
        clearInterval(timer);
        return;
      }
      i += 1;
      if (i >= DOMAIN_ORDER.length) {
        setActiveNode(DOMAIN_ORDER[0]);
        clearInterval(timer);
        return;
      }
      setActiveNode(DOMAIN_ORDER[i]);
    }, 800);

    return () => clearInterval(timer);
  }, []);

  const openProof = (proof: ProofLink) => {
    if (proof.openWindow) {
      onOpen(proof.openWindow);
      return;
    }
    if (proof.href) {
      window.open(proof.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="p-6 md:p-8">
      {/* Domain tabs */}
      <div
        className="mb-6 overflow-hidden rounded-xl border"
        style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}
      >
        <div className="flex items-stretch">
          {DOMAIN_ORDER.map((id, i) => {
            const config = CAPABILITIES[id];
            const isActive = activeNode === id;
            const color = DOMAIN_COLORS[id];
            return (
              <button
                key={id}
                onClick={() => {
                  userInteracted.current = true;
                  setActiveNode(id);
                }}
                className="focus-ring relative flex flex-1 items-center justify-center gap-2.5 px-4 py-3.5"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: isActive ? color : "var(--ys-text-soft)",
                  background: isActive ? `${color}0f` : "transparent",
                  borderRight: i < DOMAIN_ORDER.length - 1 ? `1px solid var(--ys-border)` : "none",
                  borderBottom: isActive ? `2px solid ${color}` : "2px solid transparent",
                  transition: "background .2s, color .2s, border-color .2s",
                }}
              >
                <span style={{ opacity: isActive ? 1 : 0.5, transition: "opacity .2s" }}>
                  {TAB_ICONS[id]}
                </span>
                {config.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Headline */}
          <motion.h3
            {...stagger(0)}
            className="mb-3 max-w-[30ch] text-[1.45rem] font-black leading-[1.08]"
            style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
          >
            {active.title}
          </motion.h3>

          {/* Summary */}
          <motion.p
            {...stagger(1)}
            className="mb-5 text-[15px] leading-[1.75]"
            style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
          >
            {active.summary}
          </motion.p>

          {/* Core Skills */}
          <motion.div
            {...stagger(2)}
            className="mb-5 rounded-xl border p-4"
            style={{ borderColor: `${domainColor}44`, background: `${domainColor}06` }}
          >
            <p
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em]"
              style={{ fontFamily: "var(--font-mono)", color: domainColor }}
            >
              Core Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {active.skills.map((skill, si) => {
                const svgSlug = BRAND_SVG_MAP[skill];
                return (
                  <motion.span
                    key={skill}
                    {...stagger(si + 5)}
                    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px]"
                    style={{
                      fontFamily: "var(--font-mono)",
                      borderColor: `${domainColor}33`,
                      color: "var(--ys-text)",
                      background: "rgba(255,248,241,0.94)",
                    }}
                  >
                    {svgSlug && <BrandSvg slug={svgSlug} alt={skill} />}
                    {skill}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>

          {/* Focus Areas */}
          <div className="mb-5">
            <motion.p
              {...stagger(3)}
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              Focus Areas
            </motion.p>
            <div className="grid grid-cols-3 gap-2.5">
              {active.subdomains.map((subdomain, si) => (
                <motion.div
                  key={subdomain.id}
                  {...stagger(si + 6)}
                  whileHover={cardHover}
                  className="rounded-xl border p-3.5"
                  style={{
                    borderColor: `${domainColor}33`,
                    background: "var(--ys-surface)",
                    borderLeft: `3px solid ${domainColor}`,
                    transition: "box-shadow .2s",
                  }}
                >
                  <p
                    className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em]"
                    style={{ fontFamily: "var(--font-mono)", color: domainColor }}
                  >
                    {subdomain.label}
                  </p>
                  <p
                    className="text-[13px] leading-[1.65]"
                    style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
                  >
                    {subdomain.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Proof Links */}
          <div>
            <motion.p
              {...stagger(4)}
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              Proof Links
            </motion.p>
            <div className="flex flex-col gap-2.5">
              {active.proofs.map((proof, pi) => (
                <motion.button
                  key={proof.label}
                  {...stagger(pi + 9)}
                  whileHover={{ y: -1, boxShadow: "0 4px 14px -6px rgba(0,0,0,0.1)" }}
                  onClick={() => openProof(proof)}
                  className="focus-ring rounded-xl border p-4 text-left"
                  style={{
                    borderColor: "var(--ys-border)",
                    background: "var(--ys-surface)",
                    borderLeft: `3px solid ${domainColor}`,
                    transition: "box-shadow .2s",
                  }}
                >
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <p
                      className="text-[12px] font-bold uppercase tracking-[0.08em]"
                      style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
                    >
                      {proof.label}
                    </p>
                    <ArrowUpRight size={14} strokeWidth={1.8} color={domainColor} />
                  </div>
                  <p
                    className="text-[14px] leading-[1.75]"
                    style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
                  >
                    {proof.note}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
