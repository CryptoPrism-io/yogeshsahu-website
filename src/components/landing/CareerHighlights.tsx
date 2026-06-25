"use client";

import { motion } from "framer-motion";

const SMALL = [
  {
    value: "2M+",
    title: "Kari & Lost Shrines",
    desc: "2M social reach in 2020.",
  },
  {
    value: "100K+",
    title: "Gamerz Nation",
    desc: "First startup at 22 — 7 franchises and 100K+ revenue in its first year.",
  },
];

export default function CareerHighlights() {
  return (
    <motion.div
      className="mt-3 rounded-2xl border p-2.5"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderColor: "var(--ys-card-border)",
        background: "var(--ys-card-bg)",
        backdropFilter: "blur(20px) saturate(1.12)",
        WebkitBackdropFilter: "blur(20px) saturate(1.12)",
        boxShadow:
          "0 1px 2px rgba(31,17,11,0.06), 0 4px 8px rgba(31,17,11,0.10), 0 16px 32px rgba(31,17,11,0.14)",
      }}
    >
      {/* Header */}
      <div className="mb-2.5 flex items-center justify-between px-1.5 pt-1">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          Career Highlights
        </p>
        <span
          className="rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em]"
          style={{
            fontFamily: "var(--font-mono)",
            borderColor: "var(--ys-btn-accent-border)",
            background: "var(--ys-btn-accent-bg)",
            color: "var(--ys-accent-strong)",
          }}
        >
          2× Founder
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {/* Marquee: CryptoPrism data pipeline */}
        <motion.div
          className="rounded-xl border px-4 py-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.34, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
          style={{ borderColor: "var(--ys-btn-teal-border)", background: "var(--ys-btn-teal-bg)" }}
        >
          <div className="mb-1.5 flex items-baseline gap-2">
            <span
              className="text-[1.7rem] font-bold leading-none tabular-nums"
              style={{ fontFamily: "var(--font-headline)", color: "var(--ys-highlight)", fontFeatureSettings: '"tnum"' }}
            >
              72 PB+
            </span>
            <span
              className="text-[10px] font-bold uppercase tracking-[0.12em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              CryptoPrism
            </span>
          </div>
          <p
            className="text-[12.5px] leading-[1.6]"
            style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
          >
            Built a 72+ petabyte data pipeline and made it accessible to anyone through an
            NLP-to-SQL chat — query the entire crypto market in plain language.
          </p>
        </motion.div>

        {/* Two ventures */}
        <div className="grid grid-cols-2 gap-2.5">
          {SMALL.map((item, idx) => (
            <motion.div
              key={item.title}
              className="rounded-xl border px-3.5 py-3.5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: 0.52 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ borderColor: "var(--ys-card-border-strong)", background: "var(--ys-surface-strong)" }}
            >
              <p
                className="text-[1.4rem] font-bold leading-none tabular-nums"
                style={{ fontFamily: "var(--font-headline)", color: "var(--ys-accent)", fontFeatureSettings: '"tnum"' }}
              >
                {item.value}
              </p>
              <p
                className="mb-1.5 mt-1.5 text-[11px] font-bold uppercase tracking-[0.06em]"
                style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
              >
                {item.title}
              </p>
              <p
                className="text-[11px] leading-[1.55]"
                style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
