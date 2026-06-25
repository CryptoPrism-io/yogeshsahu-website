"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type ReactNode, useRef, useState } from "react";
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
  const [pressed, setPressed] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return 150;
    return val - rect.x - rect.width / 2;
  });

  const widthSync = useTransform(distance, [-120, 0, 120], [44, 68, 44]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 12 });

  const isActive = w.isOpen && !w.isMinimized;

  return (
    <motion.button
      ref={ref}
      onClick={() => (isActive ? onFocus(w.id) : onOpen(w.id))}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      className="focus-ring group relative flex flex-col items-center"
      style={{ width }}
      title={w.title}
      aria-label={`Open ${w.title}`}
      whileTap={{ scale: 0.86 }}
      transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_QUICK }}
    >
      <motion.div
        className="aspect-square flex items-center justify-center rounded-2xl"
        style={{
          width,
          color: w.isOpen ? "var(--ys-surface)" : "#e6c9b3",
          background: w.isOpen ? "var(--ys-accent)" : "rgba(43, 23, 14, 0.88)",
          border: w.isOpen ? "1px solid rgba(215, 189, 168, 0.15)" : "1px solid rgba(215, 189, 168, 0.35)",
        }}
        animate={{
          y: pressed ? 0 : 0,
          boxShadow: pressed
            ? "0 1px 4px rgba(0,0,0,0.3), inset 0 2px 6px rgba(0,0,0,0.35)"
            : w.isOpen
              ? "0 6px 20px rgba(169, 61, 29, 0.4), 0 0 24px rgba(169, 61, 29, 0.18)"
              : "0 2px 8px rgba(0,0,0,0.25)",
        }}
        whileHover={{ y: -3, scale: 1.04 }}
        transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_QUICK }}
      >
        {icon}
      </motion.div>

      {/* Active indicator */}
      <motion.span
        className="absolute -bottom-2 rounded-full"
        initial={false}
        animate={{
          width: isActive ? 14 : 4,
          opacity: w.isOpen ? 1 : 0,
        }}
        transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_QUICK }}
        style={{
          height: 3,
          background: "var(--ys-surface)",
          boxShadow: "0 0 6px rgba(255, 242, 228, 0.8)",
        }}
      />

      {/* Tooltip */}
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
      className="fixed bottom-3 left-1/2 z-[9999] -translate-x-1/2"
      variants={fadeUp(0.08, 12)}
      initial="initial"
      animate="animate"
    >
      {/* Idle 25% → wakes to full opacity on hover */}
      <motion.div
        initial={{ opacity: 0.25 }}
        animate={{ opacity: 0.25 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.32, ease: MOTION_EASE_QUICK }}
      >
        <motion.div
          className="flex items-end gap-1 rounded-2xl border px-3 py-2"
          style={{
            borderColor: "rgba(215, 189, 168, 0.4)",
            background: "var(--ys-shell-glass)",
            backdropFilter: "blur(20px) saturate(1.35)",
            WebkitBackdropFilter: "blur(20px) saturate(1.35)",
          }}
          animate={{ boxShadow: "0 8px 30px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.1)" }}
          whileHover={{
            y: -4,
            boxShadow: "0 16px 44px rgba(0,0,0,0.42), 0 0 32px rgba(169,61,29,0.14), inset 0 1px 0 rgba(255,255,255,0.16)",
          }}
          transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_QUICK }}
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
      </motion.div>
    </motion.nav>
  );
}
