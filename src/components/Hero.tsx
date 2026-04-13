"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center gold-glow-bg px-6 pt-20 overflow-hidden"
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(251,191,36,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.6) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Cinematic panel / avatar placeholder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-xl border border-[rgba(251,191,36,0.3)] bg-[#0d0d0d]/60 flex flex-col items-center justify-center overflow-hidden mb-12"
        style={{ boxShadow: "0 0 60px rgba(251,191,36,0.2)" }}
      >
        {/* Carbon-texture overlay */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 12px)",
          }}
        />
        {/* Monogram */}
        <div
          className="relative w-[110px] h-[110px] rounded-full border-2 border-[#fbbf24] flex items-center justify-center bg-[#080808] z-10"
          style={{ boxShadow: "0 0 32px rgba(251,191,36,0.35)" }}
        >
          <span
            className="text-[2.8rem] font-black text-[#fbbf24] leading-none"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Y
          </span>
        </div>

        <div className="absolute bottom-4 left-0 w-full text-center">
          <span className="text-[9px] uppercase tracking-[0.22em] text-neutral-500 font-bold">
            Veo 3 · scroll activated
          </span>
        </div>
      </motion.div>

      {/* Hero copy */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-center z-10 max-w-3xl"
      >
        {/* Eyebrow */}
        <p
          className="text-[#fbbf24] font-bold uppercase tracking-[0.22em] text-[0.65rem] mb-6"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Fractional CTO · Founder, CryptoPrism · Pre-Seed Q2 2026
        </p>

        {/* Main headline */}
        <h1
          className="font-black leading-[0.88] tracking-[-0.03em] flex flex-col items-center mb-6"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          <span className="text-white text-[clamp(3.2rem,10vw,7rem)] uppercase">
            YOGESH
          </span>
          <span
            className="text-[#fbbf24] text-[clamp(3.2rem,10vw,7rem)] -mt-3"
            style={{
              fontFamily: "var(--font-serif-display)",
              fontStyle: "italic",
              fontWeight: 900,
            }}
          >
            Sahu
          </span>
        </h1>

        {/* Sub-role */}
        <p
          className="text-[#fbbf24]/70 font-bold uppercase tracking-[0.28em] text-[0.6rem] mb-12"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Fintech Infrastructure · AI · Data Engineering
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#work"
            className="group flex items-center gap-2 bg-[#fbbf24] text-[#080808] px-8 py-3.5 font-bold text-[0.78rem] uppercase tracking-[0.12em] hover:bg-[#d97706] transition-colors active:scale-95"
          >
            The Work
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 border border-white/15 text-white/70 px-8 py-3.5 font-bold text-[0.78rem] uppercase tracking-[0.12em] hover:border-[#fbbf24]/40 hover:text-white transition-colors"
          >
            Book a Call
          </a>
        </div>

        {/* Scroll hint */}
        <div className="mt-12 flex flex-col items-center gap-1.5 opacity-40">
          <span className="text-[0.58rem] uppercase tracking-[0.22em] text-neutral-400">
            ↓ scroll
          </span>
        </div>
      </motion.div>

      {/* Availability badge */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="fixed bottom-8 right-8 flex items-center gap-2.5 bg-[#0d0d0d]/90 backdrop-blur-sm border border-white/8 py-2 px-4 rounded-full z-50"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="text-[9px] text-white/65 uppercase tracking-[0.18em] font-bold">
          Accepting mandates
        </span>
      </motion.div>
    </section>
  );
}
