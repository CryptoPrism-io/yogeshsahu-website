"use client";

import { motion } from "framer-motion";

export default function WorkPageHeader() {
  return (
    <header className="mx-auto max-w-5xl px-5 pt-20 pb-10">
      <motion.p
        className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
      >
        Twelve case studies / three leadership clusters
      </motion.p>
      <motion.h1
        className="mb-4 text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[0.95]"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
      >
        Work
      </motion.h1>
      <motion.p
        className="max-w-[60ch] text-[15px] leading-[1.8]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
        style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
      >
        Each case opens with a decision, a bet, and an outcome — engineering depth in support, not in the lead.
      </motion.p>
    </header>
  );
}
