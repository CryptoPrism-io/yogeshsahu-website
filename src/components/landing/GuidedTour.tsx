"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOUR_STEPS = [
  {
    title: "Welcome to YogeshOS",
    description: "This is an interactive desktop. Click windows in the dock below to explore my work, or use the launch deck on the right.",
    position: "center" as const,
  },
  {
    title: "Domain Map",
    description: "Hover the graph on the left to explore my expertise across Finance, Leadership, and Technology. Click any node to see proof.",
    position: "left" as const,
  },
  {
    title: "Launch Deck",
    description: "Quick access to projects, the 5-day diagnostic offer, and contact. Start here if you know what you're looking for.",
    position: "right" as const,
  },
];

const TOUR_KEY = "ys-tour-complete";

export default function GuidedTour({ onOpenWindow }: { onOpenWindow: (id: string) => void }) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(TOUR_KEY)) {
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(TOUR_KEY, "1");
    } catch {
      // ignore
    }
  };

  const next = () => {
    if (step >= TOUR_STEPS.length - 1) {
      dismiss();
      onOpenWindow("about");
      return;
    }
    setStep(step + 1);
  };

  const currentStep = TOUR_STEPS[step];

  const positionClasses = {
    center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    left: "left-8 top-1/2 -translate-y-1/2 xl:left-12",
    right: "right-8 top-1/3 xl:right-12",
  };

  return (
    <AnimatePresence>
      {visible && currentStep && (
        <>
          <motion.div
            className="fixed inset-0 z-[99990]"
            style={{ background: "rgba(42, 23, 15, 0.55)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
          />
          <motion.div
            className={`fixed z-[99991] w-[min(380px,calc(100%-32px))] rounded-2xl border p-6 ${positionClasses[currentStep.position]}`}
            style={{
              borderColor: "var(--ys-card-border)",
              background: "var(--ys-surface)",
              boxShadow: "0 24px 56px rgba(34, 18, 11, 0.35)",
            }}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            key={step}
          >
            <p
              className="mb-1 text-[9px] font-bold uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              {step + 1} / {TOUR_STEPS.length}
            </p>
            <h3
              className="mb-2 text-[16px] font-bold"
              style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
            >
              {currentStep.title}
            </h3>
            <p
              className="mb-5 text-[13px] leading-[1.7]"
              style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
            >
              {currentStep.description}
            </p>
            <div className="flex items-center justify-between">
              <button
                onClick={dismiss}
                className="text-[11px] font-medium uppercase tracking-[0.08em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
              >
                Skip tour
              </button>
              <button
                onClick={next}
                className="rounded-xl border px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] transition-colors hover:opacity-90"
                style={{
                  fontFamily: "var(--font-headline)",
                  borderColor: "var(--ys-btn-accent-border)",
                  background: "var(--ys-accent)",
                  color: "var(--ys-surface)",
                }}
              >
                {step >= TOUR_STEPS.length - 1 ? "Get Started" : "Next"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
