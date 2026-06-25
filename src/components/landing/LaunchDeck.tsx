"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, MOTION_DURATION, MOTION_EASE_QUICK } from "@/lib/motion";
import CareerHighlights from "./CareerHighlights";

export default function LaunchDeck({ onOpen }: { onOpen: (id: string) => void }) {
  const metrics = [
    { value: "6+", label: "apps shipped" },
    { value: "2M+", label: "lines of code" },
    { value: "1B+", label: "datapoints / day" },
  ];

  return (
    <motion.section
      className="absolute left-3 right-3 top-3 z-[2] md:left-auto md:right-4 md:top-4 md:w-[540px] xl:w-[560px]"
      variants={fadeUp(0, 24)}
      initial="initial"
      animate="animate"
    >
      <div
        className="rounded-2xl border p-2.5"
        style={{
          borderColor: "var(--ys-card-border)",
          background: "var(--ys-card-bg)",
          backdropFilter: "blur(20px) saturate(1.12)",
          WebkitBackdropFilter: "blur(20px) saturate(1.12)",
          boxShadow:
            "0 1px 2px rgba(31,17,11,0.06), 0 4px 8px rgba(31,17,11,0.10), 0 16px 32px rgba(31,17,11,0.14), 0 48px 80px rgba(31,17,11,0.18)",
        }}
      >
        <div className="grid items-stretch gap-2.5" style={{ gridTemplateColumns: "0.96fr 1.04fr" }}>
          {/* Left column: identity + stats + CTA */}
          <div className="flex flex-col gap-2.5">
            <motion.div
              className="flex flex-1 flex-col justify-center rounded-xl border px-4 py-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              style={{ borderColor: "var(--ys-card-border-strong)", background: "var(--ys-surface-strong)" }}
            >
              <p
                className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
              >
                Founder | AI-Native Builder | CTO
              </p>
              <h1
                className="mb-2 text-[clamp(1.6rem,3.6vw,2.2rem)] font-black uppercase leading-[0.9]"
                style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
              >
                Yogesh Sahu
              </h1>
              <p
                className="text-[12.5px] leading-[1.6]"
                style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
              >
                I build and ship AI-native B2B and B2C products end-to-end — 6+ production-grade apps
                in 6 months, not MVPs.
              </p>
            </motion.div>

            {/* Achievements */}
            <div className="grid grid-cols-3 gap-2">
              {metrics.map((item, idx) => (
                <motion.div
                  key={item.label}
                  className="overflow-hidden rounded-xl border px-2.5 py-2.5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, delay: 0.14 + idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  style={{ borderColor: "var(--ys-card-border-strong)", background: "var(--ys-surface-strong)" }}
                >
                  <p
                    className="text-[1.3rem] font-bold leading-none tabular-nums"
                    style={{
                      fontFamily: "var(--font-headline)",
                      color: "var(--ys-accent)",
                      fontFeatureSettings: '"tnum"',
                    }}
                  >
                    {item.value}
                  </p>
                  <p
                    className="mt-1.5 text-[8.5px] uppercase leading-tight tracking-[0.08em]"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
                  >
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Primary CTA */}
            <motion.button
              onClick={() => onOpen("diagnostic")}
              className="focus-ring flex items-center justify-between rounded-xl border px-4 py-3 text-left"
              aria-label="Start a diagnostic"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              style={{
                borderColor: "var(--ys-btn-teal-border)",
                background: "var(--ys-btn-teal-bg)",
                color: "var(--ys-highlight)",
                fontFamily: "var(--font-headline)",
                transitionDuration: MOTION_DURATION.quick,
                transitionTimingFunction: `cubic-bezier(${MOTION_EASE_QUICK.join(",")})`,
              }}
            >
              <span className="text-[12px] font-bold uppercase tracking-[0.08em]">Start a Diagnostic</span>
              <ArrowRight size={15} />
            </motion.button>
          </div>

          {/* Right column: hero portrait */}
          <motion.div
            className="relative overflow-hidden rounded-xl border"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ borderColor: "var(--ys-card-border-strong)" }}
          >
            <Image
              src="/images/profile.jpg"
              alt="Yogesh Sahu"
              fill
              sizes="320px"
              className="object-cover"
              style={{ objectPosition: "center 24%" }}
              priority
            />
          </motion.div>
        </div>
      </div>

      <CareerHighlights />
    </motion.section>
  );
}
