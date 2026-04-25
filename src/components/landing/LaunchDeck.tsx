"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, MOTION_DURATION, MOTION_EASE_QUICK } from "@/lib/motion";

export default function LaunchDeck({ onOpen }: { onOpen: (id: string) => void }) {
  const metrics = [
    { value: "1B+", label: "data points/day" },
    { value: "99.9%", label: "uptime SLA" },
    { value: "23", label: "public repos" },
  ];

  return (
    <motion.section
      className="absolute left-3 right-3 top-3 z-[2] md:left-auto md:right-4 md:top-4 md:w-[500px] xl:w-[480px]"
      variants={fadeUp(0, 24)}
      initial="initial"
      animate="animate"
    >
      <div
        className="rounded-2xl border p-5 md:p-6"
        style={{
          borderColor: "var(--ys-card-border)",
          background: "var(--ys-card-bg)",
          backdropFilter: "blur(20px) saturate(1.12)",
          WebkitBackdropFilter: "blur(20px) saturate(1.12)",
          boxShadow: "0 24px 56px rgba(34, 18, 11, 0.24)",
        }}
      >
        <p
          className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          CHIEF SOLUTIONS ARCHITECT | FRACTIONAL CTO
        </p>
        <h1
          className="mb-3 text-[clamp(2rem,5.4vw,3.2rem)] font-black uppercase leading-[0.95]"
          style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
        >
          Yogesh Sahu
        </h1>
        <p
          className="mb-5 max-w-[50ch] text-[13px] leading-[1.8]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          I scope, architect, code, and lead client-facing AI, fintech, and data-heavy engagements from
          discovery through delivery. Start with a hands-on architecture diagnostic, then move into
          focused leadership without taking on the wrong full-time hire too early.
        </p>

        <div className="mb-5 grid grid-cols-3 gap-2">
          {metrics.map((item, idx) => (
            <motion.div
              key={item.label}
              className="rounded-xl border px-3 py-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12 + idx * 0.08 }}
              style={{
                borderColor: "var(--ys-card-border-strong)",
                background: "var(--ys-card-bg)",
              }}
            >
              <p
                className="text-[1.1rem] font-bold"
                style={{ fontFamily: "var(--font-headline)", color: "var(--ys-accent)" }}
              >
                {item.value}
              </p>
              <p
                className="text-[9px] uppercase tracking-[0.12em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
              >
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <motion.button
            onClick={() => onOpen("projects")}
            className="focus-ring flex items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-colors"
            aria-label="Open projects window"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_QUICK }}
            style={{
              borderColor: "var(--ys-btn-accent-border)",
              background: "var(--ys-btn-accent-bg)",
              color: "var(--ys-accent-strong)",
              fontFamily: "var(--font-headline)",
            }}
          >
            <span className="text-[12px] font-bold uppercase tracking-[0.08em]">See Projects</span>
            <ArrowRight size={14} />
          </motion.button>
          <motion.button
            onClick={() => onOpen("contact")}
            className="focus-ring flex items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-colors"
            aria-label="Open contact window"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_QUICK }}
            style={{
              borderColor: "var(--ys-btn-teal-border)",
              background: "var(--ys-btn-teal-bg)",
              color: "var(--ys-highlight)",
              fontFamily: "var(--font-headline)",
            }}
          >
            <span className="text-[12px] font-bold uppercase tracking-[0.08em]">Start Diagnostic</span>
            <ArrowRight size={14} />
          </motion.button>
          <motion.button
            onClick={() => onOpen("diagnostic")}
            className="focus-ring col-span-2 flex items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-colors"
            aria-label="Open diagnostic window"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_QUICK }}
            style={{
              borderColor: "var(--ys-btn-accent-border)",
              background: "var(--ys-card-bg)",
              color: "var(--ys-text)",
              fontFamily: "var(--font-headline)",
            }}
          >
            <div>
              <span className="mb-0.5 block text-[12px] font-bold uppercase tracking-[0.08em]">View 5-day scope</span>
              <span
                className="block text-[9px] uppercase tracking-[0.12em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
              >
                discovery, architecture, delivery, pricing
              </span>
            </div>
            <ArrowRight size={14} />
          </motion.button>
          <motion.button
            onClick={() => onOpen("about")}
            className="focus-ring rounded-xl border px-3 py-2.5 text-left text-[11px] font-bold uppercase tracking-[0.08em] transition-colors"
            aria-label="Open about window"
            whileHover={{ y: -1, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_QUICK }}
            style={{
              borderColor: "var(--ys-card-border-strong)",
              color: "var(--ys-text)",
              fontFamily: "var(--font-headline)",
            }}
          >
            Open Profile
          </motion.button>
          <motion.button
            onClick={() => onOpen("terminal")}
            className="focus-ring rounded-xl border px-3 py-2.5 text-left text-[11px] font-bold uppercase tracking-[0.08em] transition-colors"
            aria-label="Open terminal window"
            whileHover={{ y: -1, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_QUICK }}
            style={{
              borderColor: "var(--ys-card-border-strong)",
              color: "var(--ys-text)",
              fontFamily: "var(--font-headline)",
            }}
          >
            Open Terminal
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}
