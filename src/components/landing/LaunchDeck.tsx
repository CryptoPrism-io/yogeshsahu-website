"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, MOTION_DURATION, MOTION_EASE_QUICK } from "@/lib/motion";

export default function LaunchDeck({ onOpen }: { onOpen: (id: string) => void }) {
  const metrics = [
    { value: "6+", label: "production apps shipped" },
    { value: "2M+", label: "lines of code" },
    { value: "1B+", label: "datapoints/day" },
  ];

  return (
    <motion.section
      className="absolute left-3 right-3 top-3 z-[2] md:left-auto md:right-4 md:top-4 md:w-[500px] xl:w-[480px]"
      variants={fadeUp(0, 24)}
      initial="initial"
      animate="animate"
    >
      <div
        className="overflow-hidden rounded-2xl border"
        style={{
          borderColor: "var(--ys-card-border)",
          background: "var(--ys-card-bg)",
          backdropFilter: "blur(20px) saturate(1.12)",
          WebkitBackdropFilter: "blur(20px) saturate(1.12)",
          boxShadow: "0 1px 2px rgba(31,17,11,0.06), 0 4px 8px rgba(31,17,11,0.10), 0 16px 32px rgba(31,17,11,0.14), 0 48px 80px rgba(31,17,11,0.18)",
        }}
      >
        {/* Photo hero */}
        <div className="relative w-full" style={{ height: 192 }}>
          <Image
            src="/images/profile.jpg"
            alt="Yogesh Sahu"
            fill
            className="object-cover"
            style={{ objectPosition: "center 35%" }}
            priority
          />
          <div
            className="absolute inset-x-0 bottom-0 px-5 pb-4 pt-16"
            style={{ background: "linear-gradient(to bottom, transparent 0%, var(--ys-card-bg) 100%)" }}
          >
            <p
              className="mb-1 text-[9px] font-bold uppercase tracking-[0.22em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              FOUNDER | AI-NATIVE BUILDER | CTO
            </p>
            <h1
              className="text-[clamp(2rem,5.4vw,3rem)] font-black uppercase leading-[0.92]"
              style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
            >
              Yogesh Sahu
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-5 pt-3">
        <motion.p
          className="mb-5 max-w-[50ch] text-[15px] leading-[1.75]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          I build and ship AI-native B2B and B2C products end-to-end — 6+ production-grade apps
          in 6 months, not MVPs. I lead teams and customers to success across fintech, data
          infrastructure, and applied AI.
        </motion.p>

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
                className="text-[1.35rem] font-bold tabular-nums"
                style={{ fontFamily: "var(--font-headline)", color: "var(--ys-accent)", fontFeatureSettings: '"tnum"' }}
              >
                {item.value}
              </p>
              <p
                className="text-[10px] uppercase tracking-[0.12em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
              >
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-2 gap-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
        >
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
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
        <Link
          href="/work"
          className="mt-3 flex items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-colors hover:opacity-90"
          style={{
            borderColor: "var(--ys-card-border-strong)",
            background: "var(--ys-card-bg)",
            color: "var(--ys-text)",
            fontFamily: "var(--font-headline)",
          }}
        >
          <div>
            <span className="mb-0.5 block text-[12px] font-bold uppercase tracking-[0.08em]">
              /work hub
            </span>
            <span
              className="block text-[9px] uppercase tracking-[0.12em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              12 case studies · 3 leadership clusters
            </span>
          </div>
          <ArrowRight size={14} />
        </Link>
        </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
