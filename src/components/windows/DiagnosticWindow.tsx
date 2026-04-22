"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const FIT_SIGNALS = [
  "Product and engineering leaders in fast-moving, regulated, or funded environments",
  "Teams under pressure to integrate AI without breaking product or architecture",
  "Companies that need technical leadership without committing to a full-time CTO too early",
  "Situations where authority is fragmented and alignment matters as much as code",
];

const DELIVERABLES = [
  "AI integration map from workflow to enterprise use case",
  "Architecture review and decision memo",
  "Product-engineering alignment risks",
  "90-day execution plan",
  "Priorities across system, team, and stakeholder flow",
  "Executive debrief",
];

const TIMELINE = [
  {
    day: "Day 1",
    body: "Context intake on roadmap pressure, AI ambition, stakeholder friction, and the current technical landscape.",
  },
  {
    day: "Day 2",
    body: "Architecture review across boundaries, failure points, scaling risks, and the cost of the current direction.",
  },
  {
    day: "Day 3",
    body: "AI integration review across workflows, tooling, product fit, and what should stay lightweight versus enterprise-ready.",
  },
  {
    day: "Day 4",
    body: "Decision review on tradeoffs, stakeholder alignment, sequencing, hiring gaps, and what should not be worked on.",
  },
  {
    day: "Day 5",
    body: "Executive synthesis with a ranked risk register, 90-day plan, and recommended next cadence.",
  },
];

interface DiagnosticWindowProps {
  onStart: () => void;
}

export default function DiagnosticWindow({ onStart }: DiagnosticWindowProps) {
  return (
    <div className="p-6 md:p-8">
      <motion.div
        className="mb-6 rounded-xl border p-5"
        variants={fadeUp(0, 12)}
        initial="initial"
        animate="animate"
        style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}
      >
        <p
          className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          Paid Entry Offer
        </p>
        <h2
          className="mb-3 text-[1.9rem] font-black italic leading-[1.05]"
          style={{ fontFamily: "var(--font-serif-display)", color: "var(--ys-text)" }}
        >
          Solutions architecture diagnostic
          <br />
          for teams moving faster than their systems.
        </h2>
        <p
          className="max-w-2xl text-[13px] leading-[1.85]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          This is for clients who need a hands-on chief solutions architect who can shape the work before
          it is built. The goal is not a generic audit. The goal is to make the next 90 days executable,
          scoped, and commercially credible.
        </p>
      </motion.div>

      <div className="mb-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          className="rounded-xl border p-5"
          variants={fadeUp(0.06, 10)}
          initial="initial"
          animate="animate"
          style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}
        >
          <p
            className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
          >
            Best Fit
          </p>
          <div className="flex flex-col gap-3">
            {FIT_SIGNALS.map((signal) => (
              <div
                key={signal}
                className="border-l-2 pl-3"
                style={{ borderColor: "var(--ys-highlight)" }}
              >
                <p
                  className="text-[12px] leading-[1.75]"
                  style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
                >
                  {signal}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="rounded-xl border p-5"
          variants={fadeUp(0.12, 10)}
          initial="initial"
          animate="animate"
          style={{
            borderColor: "rgba(11, 141, 128, 0.28)",
            background: "rgba(11, 141, 128, 0.08)",
          }}
        >
          <p
            className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
          >
            Commercials
          </p>
          <p
            className="mb-1 text-[2rem] font-bold leading-none"
            style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
          >
            USD 5k-7.5k
          </p>
          <p
            className="mb-4 text-[11px] uppercase tracking-[0.12em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
          >
            Fixed scope | 5 business days
          </p>
          <div className="space-y-2">
            <p className="text-[12px] leading-[1.75]" style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}>
              Payment terms: 50% upfront, 50% on delivery.
            </p>
            <p className="text-[12px] leading-[1.75]" style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}>
              Output: AI roadmap, architecture direction, alignment risks, and a clear recommendation on what to do next.
            </p>
            <p className="text-[12px] leading-[1.75]" style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}>
              Follow-on paths: architecture leadership, focused delivery work, or a sharper hiring brief.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          className="rounded-xl border p-5"
          variants={fadeUp(0.18, 10)}
          initial="initial"
          animate="animate"
          style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}
        >
          <p
            className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
          >
            Deliverables
          </p>
          <div className="flex flex-col gap-2.5">
            {DELIVERABLES.map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <span
                  className="mt-[5px] inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--ys-accent)" }}
                />
                <p
                  className="text-[12px] leading-[1.7]"
                  style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="rounded-xl border p-5"
          variants={fadeUp(0.24, 10)}
          initial="initial"
          animate="animate"
          style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}
        >
          <p
            className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
          >
            What Happens In 5 Days
          </p>
          <div className="flex flex-col gap-3">
            {TIMELINE.map((item) => (
              <div
                key={item.day}
                className="border-l-2 px-0 pl-3"
                style={{ borderColor: "var(--ys-accent)" }}
              >
                <p
                  className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text)" }}
                >
                  {item.day}
                </p>
                <p
                  className="text-[12px] leading-[1.75]"
                  style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="rounded-xl border p-5"
        variants={fadeUp(0.3, 10)}
        initial="initial"
        animate="animate"
        style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p
              className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              Core Promise
            </p>
            <p
              className="text-[13px] leading-[1.85]"
              style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
            >
              This engagement is designed to create immediate clarity, visible risk reduction, and a clean
              next step. By the end, the client should know how AI fits the business, which architecture
              decisions matter now, where alignment is breaking down, and whether the next move is ongoing
              CTO support, focused execution, or a hiring decision.
            </p>
          </div>

          <button
            onClick={onStart}
            className="focus-ring rounded-lg px-5 py-3 text-[11px] font-bold uppercase tracking-[0.1em] transition-colors"
            style={{
              fontFamily: "var(--font-headline)",
              background: "var(--ys-text)",
              color: "var(--ys-surface)",
            }}
          >
            Start Architecture Inquiry
          </button>
        </div>
      </motion.div>
    </div>
  );
}
