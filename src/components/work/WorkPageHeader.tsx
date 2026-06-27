"use client";

import { motion } from "framer-motion";

export default function WorkPageHeader() {
  return (
    <header className="mx-auto max-w-[1180px] px-10 pt-[72px] pb-10">
      <motion.p
        className="mb-[18px] text-[12px] uppercase tracking-[0.22em]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
      >
        Twelve case studies&nbsp;&nbsp;/&nbsp;&nbsp;Three leadership clusters
      </motion.p>
      <motion.h1
        className="mb-[26px] font-bold uppercase"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: "var(--font-headline)",
          color: "var(--ys-text)",
          fontSize: "clamp(52px,8vw,108px)",
          lineHeight: 0.9,
          letterSpacing: "-0.03em",
        }}
      >
        Work
      </motion.h1>
      <motion.p
        className="max-w-[640px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--ys-text-soft)",
          fontSize: "clamp(18px,2vw,23px)",
          lineHeight: 1.5,
        }}
      >
        Each case opens with a decision, a bet, and an outcome —{" "}
        <em
          style={{
            fontFamily: "var(--font-serif-display)",
            fontStyle: "italic",
            color: "var(--ys-accent-strong)",
          }}
        >
          engineering depth in support, not in the lead.
        </em>
      </motion.p>
    </header>
  );
}
