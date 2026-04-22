"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { MOTION_DURATION, MOTION_EASE_QUICK, fadeUp } from "@/lib/motion";

interface DesktopIconProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  delay?: number;
}

export default function DesktopIcon({ icon, label, onClick, delay = 0 }: DesktopIconProps) {
  return (
    <motion.button
      onClick={onClick}
      className="focus-ring group flex w-[78px] flex-col items-center gap-1.5 rounded-xl p-2.5 transition-all"
      aria-label={`Open ${label}`}
      style={{ background: "transparent" }}
      variants={fadeUp(delay, 8)}
      initial="initial"
      animate="animate"
      whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 242, 228, 0.09)" }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_QUICK }}
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl text-[#fff5eb] transition-all group-hover:scale-105"
        style={{
          background: "linear-gradient(135deg, var(--ys-accent) 0%, var(--ys-accent-strong) 100%)",
          boxShadow: "0 2px 8px rgba(169, 61, 29, 0.35), 0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        {icon}
      </div>
      <span
        className="text-center text-[10px] font-medium leading-tight tracking-wide text-white/90"
        style={{
          fontFamily: "var(--font-mono)",
          textShadow: "0 1px 4px rgba(0,0,0,0.4)",
        }}
      >
        {label}
      </span>
    </motion.button>
  );
}
