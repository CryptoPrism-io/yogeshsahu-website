"use client";

import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

const slideInLeft = (delay = 0) => ({
  initial: { scaleX: 0, originX: 0 },
  animate: { scaleX: 1 },
  transition: { duration: 0.6, delay, ease: EASE },
});

interface StatBlockProps {
  label: string;
  rawValue: number;
  suffix: string;
  sub: string;
  dark?: boolean;
  delay?: number;
}

function StatBlock({ label, rawValue, suffix, sub, dark = false, delay = 0 }: StatBlockProps) {
  const { ref, count } = useCountUp(rawValue, 1.8);

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      className="flex-1 p-5 lg:p-6 border-b border-[#f0f0f0] last:border-b-0 flex flex-col justify-between"
      style={{ background: dark ? "#1a1a1a" : "#ffffff" }}
      {...fadeUp(delay)}
    >
      <p
        className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2"
        style={{
          color: dark ? "#555" : "#bbb",
          fontFamily: "var(--font-headline)",
        }}
      >
        {label}
      </p>
      <div>
        <p
          className="text-[2.6rem] lg:text-[3rem] font-black leading-none tracking-[-0.03em]"
          style={{
            color: dark ? "#ffffff" : "#1a1a1a",
            fontFamily: "var(--font-headline)",
          }}
        >
          {count.toLocaleString()}{suffix}
        </p>
        <p
          className="text-[10px] uppercase tracking-[0.1em] mt-1"
          style={{
            color: dark ? "#555" : "#ccc",
            fontFamily: "var(--font-headline)",
          }}
        >
          {sub}
        </p>
      </div>
    </motion.div>
  );
}

function MobileStatBlock({ label, rawValue, suffix, dark = false, delay = 0, borderRight = false, borderBottom = false }: {
  label: string; rawValue: number; suffix: string; dark?: boolean; delay?: number; borderRight?: boolean; borderBottom?: boolean;
}) {
  const { ref, count } = useCountUp(rawValue, 1.8);
  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      className={`p-5 ${borderRight ? "border-r border-[#e0e0e0]" : ""} ${borderBottom ? "border-b border-[#e0e0e0]" : ""}`}
      style={{ background: dark ? "#1a1a1a" : "white" }}
      {...fadeUp(delay)}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1"
        style={{ color: dark ? "#555" : "#bbb", fontFamily: "var(--font-headline)" }}>
        {label}
      </p>
      <p className="text-[1.4rem] sm:text-[1.8rem] font-black leading-none"
        style={{ color: dark ? "#fff" : "#1a1a1a", fontFamily: "var(--font-headline)" }}>
        {count.toLocaleString()}{suffix}
      </p>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="snap-section pt-[46px] bg-[#f7f4ee]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_300px] h-full border-b-2 border-[#1a1a1a]">

        {/* Left: editorial copy */}
        <div className="flex flex-col justify-between p-6 sm:p-8 md:p-14 py-8 sm:py-10 overflow-hidden">
          <div>
            <motion.p
              className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-8"
              style={{ fontFamily: "var(--font-headline)" }}
              {...fadeUp(0.1)}
            >
              FRACTIONAL CTO · FOUNDER · CRYPTOPRISM · DPIIT
            </motion.p>

            <h1 className="leading-[0.85] tracking-[-0.04em] mb-6">
              <motion.span
                className="block text-[clamp(3.6rem,9vw,6.5rem)] font-black italic text-[#1a1a1a]"
                style={{ fontFamily: "var(--font-serif-display)" }}
                {...fadeUp(0.2)}
              >
                Yogesh
              </motion.span>
              <motion.span
                className="block text-[clamp(3.2rem,8vw,6rem)] font-black text-[#1a1a1a] uppercase"
                style={{ fontFamily: "var(--font-headline)" }}
                {...fadeUp(0.35)}
              >
                SAHU
              </motion.span>
            </h1>

            {/* Animated rule */}
            <div className="overflow-hidden w-14 mb-6">
              <motion.div
                className="h-[3px] bg-[#1a1a1a]"
                {...slideInLeft(0.5)}
                style={{ transformOrigin: "left" }}
              />
            </div>

            <motion.p
              className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#888] leading-[2]"
              style={{ fontFamily: "var(--font-headline)" }}
              {...fadeUp(0.55)}
            >
              Fintech Infrastructure · AI · Data Engineering<br />
              Pre-seed Q2 2026 · Strathclyde MS FinTech
            </motion.p>
          </div>

          <motion.div
            className="flex flex-wrap gap-2 sm:gap-3 mt-6 sm:mt-8"
            {...fadeUp(0.65)}
          >
            <a
              href="#contact"
              className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.12em] text-[#1a1a1a] border-2 border-[#1a1a1a] px-4 sm:px-6 py-2.5 sm:py-3 hover:bg-[#1a1a1a] hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Open to mandates ↗
            </a>
            <a
              href="#work"
              className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.12em] text-[#999] border border-[#ddd] px-4 sm:px-6 py-2.5 sm:py-3 hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              View Work
            </a>
          </motion.div>
        </div>

        {/* Vertical divider */}
        <div className="hidden lg:block bg-[#e0ddd6]" />

        {/* Right: animated stat column */}
        <div className="hidden lg:flex flex-col bg-white">
          <StatBlock label="DATA PROCESSED" rawValue={1000000000} suffix="+" sub="points / day" delay={0.3} />
          <StatBlock label="UPTIME SLA" rawValue={99} suffix=".9%" sub="production system" delay={0.4} />
          <StatBlock label="REPOS LIVE" rawValue={23} suffix="" sub="github · public" delay={0.5} />
          <StatBlock label="GAME DOWNLOADS" rawValue={50000} suffix="" sub="kari · 21 days · 110 countries" dark delay={0.6} />
        </div>
      </div>

      {/* Mobile stats 2×2 */}
      <div className="lg:hidden grid grid-cols-2 border-t-2 border-[#1a1a1a]">
        <MobileStatBlock label="DATA" rawValue={1000000000} suffix="+" dark={false} delay={0.3} borderRight borderBottom />
        <MobileStatBlock label="UPTIME" rawValue={99} suffix=".9%" dark={false} delay={0.4} borderBottom />
        <MobileStatBlock label="REPOS" rawValue={23} suffix="" dark={false} delay={0.5} borderRight />
        <MobileStatBlock label="DOWNLOADS" rawValue={50000} suffix="" dark delay={0.6} />
      </div>
    </section>
  );
}
