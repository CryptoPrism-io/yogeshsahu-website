"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";
import type { WindowState } from "@/hooks/useWindowManager";
import { MOTION_DURATION, MOTION_EASE_QUICK, fadeUp } from "@/lib/motion";

interface DockProps {
  windows: WindowState[];
  iconMap: Record<string, ReactNode>;
  onOpen: (id: string) => void;
  onFocus: (id: string) => void;
}

function DockItem({
  w,
  icon,
  mouseX,
  onOpen,
  onFocus,
}: {
  w: WindowState;
  icon: ReactNode;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  onOpen: (id: string) => void;
  onFocus: (id: string) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return 150;
    return val - rect.x - rect.width / 2;
  });

  const widthSync = useTransform(distance, [-120, 0, 120], [44, 68, 44]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 12 });

  return (
    <motion.button
      ref={ref}
      onClick={() => (w.isOpen && !w.isMinimized ? onFocus(w.id) : onOpen(w.id))}
      className="focus-ring group relative flex flex-col items-center"
      style={{ width }}
      title={w.title}
      aria-label={`Open ${w.title}`}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_QUICK }}
    >
      <motion.div
        className="aspect-square rounded-2xl flex items-center justify-center transition-colors"
        style={{
          width,
          color: w.isOpen ? "var(--ys-surface)" : "#d8b8a0",
          background: w.isOpen ? "var(--ys-accent)" : "rgba(43, 23, 14, 0.88)",
          border: w.isOpen ? "1px solid rgba(215, 189, 168, 0.15)" : "1px solid rgba(215, 189, 168, 0.35)",
          boxShadow: w.isOpen
            ? "0 6px 20px rgba(169, 61, 29, 0.4), 0 0 24px rgba(169, 61, 29, 0.18)"
            : "0 2px 8px rgba(0,0,0,0.25)",
        }}
        whileHover={{ y: -2 }}
        transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_QUICK }}
      >
        {icon}
      </motion.div>

      {w.isOpen && (
        <span
          className="absolute -bottom-1.5 h-1 w-1 rounded-full"
          style={{ background: "var(--ys-surface)", boxShadow: "0 0 4px rgba(255, 242, 228, 0.75)" }}
        />
      )}

      <span
        className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-lg px-2.5 py-1 text-[9px] font-medium tracking-wider opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--ys-surface)",
          background: "rgba(34, 18, 11, 0.95)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
        }}
      >
        {w.title}
      </span>
    </motion.button>
  );
}

export default function Dock({ windows, iconMap, onOpen, onFocus }: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.nav
      className="fixed bottom-2 left-1/2 z-[9999] -translate-x-1/2"
      variants={fadeUp(0.08, 12)}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="flex items-end gap-1 rounded-2xl border px-3 py-2"
        style={{
          borderColor: "rgba(215, 189, 168, 0.4)",
          background: "var(--ys-shell-glass)",
          backdropFilter: "blur(20px) saturate(1.35)",
          WebkitBackdropFilter: "blur(20px) saturate(1.35)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {windows.map((w) => (
          <DockItem
            key={w.id}
            w={w}
            icon={iconMap[w.id]}
            mouseX={mouseX}
            onOpen={onOpen}
            onFocus={onFocus}
          />
        ))}
      </motion.div>
    </motion.nav>
  );
}
