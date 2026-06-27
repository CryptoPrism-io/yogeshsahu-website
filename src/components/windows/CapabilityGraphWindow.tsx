"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CAPABILITIES, DOMAIN_ORDER, type CapabilityId, type ProofLink } from "@/data/capabilities";

interface CapabilityGraphWindowProps {
  onOpen: (id: string) => void;
}

export default function CapabilityGraphWindow({ onOpen }: CapabilityGraphWindowProps) {
  const [activeNode, setActiveNode] = useState<CapabilityId>(DOMAIN_ORDER[0]);
  const active = CAPABILITIES[activeNode];

  // Auto-preview: flash through each domain (0.8s apiece), then settle back on
  // the first tab. A manual tab click cancels the rotation for good.
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
        setActiveNode(DOMAIN_ORDER[0]); // full pass done — rest on the first tab
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
        className="mb-5 overflow-hidden rounded-xl border"
        style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}
      >
        <div className="flex items-stretch">
          {DOMAIN_ORDER.map((id, i) => {
            const config = CAPABILITIES[id];
            const isActive = activeNode === id;
            return (
              <button
                key={id}
                onClick={() => {
                  userInteracted.current = true;
                  setActiveNode(id);
                }}
                className="focus-ring relative flex flex-1 items-center justify-center gap-2.5 px-4 py-3.5 transition-colors"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: isActive ? "var(--ys-text)" : "var(--ys-text-soft)",
                  background: isActive ? "var(--ys-surface)" : "transparent",
                  borderRight: i < DOMAIN_ORDER.length - 1 ? `1px solid var(--ys-border)` : "none",
                  borderBottom: isActive ? "2px solid var(--ys-accent)" : "2px solid transparent",
                }}
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: config.color }}
                />
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
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          {/* Headline */}
          <h3
            className="mb-3 max-w-[30ch] text-[1.45rem] font-black leading-[1.08]"
            style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
          >
            {active.title}
          </h3>

          {/* Summary */}
          <p
            className="mb-5 text-[15px] leading-[1.75]"
            style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
          >
            {active.summary}
          </p>

          {/* Core Skills */}
          <div
            className="mb-5 rounded-xl border p-4"
            style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)" }}
          >
            <p
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              Core Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {active.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border px-2.5 py-1 text-[10px]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    borderColor: "var(--ys-border)",
                    color: "var(--ys-text)",
                    background: "rgba(255,248,241,0.94)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Focus Areas */}
          <div className="mb-5">
            <p
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              Focus Areas
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              {active.subdomains.map((subdomain) => (
                <div
                  key={subdomain.id}
                  className="rounded-xl border p-3.5"
                  style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)" }}
                >
                  <p
                    className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em]"
                    style={{ fontFamily: "var(--font-mono)", color: active.color }}
                  >
                    {subdomain.label}
                  </p>
                  <p
                    className="text-[13px] leading-[1.65]"
                    style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
                  >
                    {subdomain.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Proof Links */}
          <div>
            <p
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              Proof Links
            </p>
            <div className="flex flex-col gap-2.5">
              {active.proofs.map((proof) => (
                <button
                  key={proof.label}
                  onClick={() => openProof(proof)}
                  className="focus-ring rounded-xl border p-4 text-left transition-colors"
                  style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)" }}
                >
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <p
                      className="text-[12px] font-bold uppercase tracking-[0.08em]"
                      style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
                    >
                      {proof.label}
                    </p>
                    <ArrowUpRight size={14} strokeWidth={1.8} color="var(--ys-accent-strong)" />
                  </div>
                  <p
                    className="text-[14px] leading-[1.75]"
                    style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
                  >
                    {proof.note}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
