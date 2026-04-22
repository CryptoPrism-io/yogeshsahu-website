"use client";

import { motion, useDragControls } from "framer-motion";
import { Copy, Minus, Square, X } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import type { WindowState } from "@/hooks/useWindowManager";
import { MOTION_DURATION, MOTION_EASE_STANDARD } from "@/lib/motion";

interface WindowProps {
  state: WindowState;
  isFocused: boolean;
  titleIcon?: ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onDragEnd: (pos: { x: number; y: number }) => void;
  children: ReactNode;
}

export default function Window({
  state,
  isFocused,
  titleIcon,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onDragEnd,
  children,
}: WindowProps) {
  const dragControls = useDragControls();
  const [isCompactScreen, setIsCompactScreen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const syncMode = () => setIsCompactScreen(media.matches);
    syncMode();
    media.addEventListener("change", syncMode);
    return () => media.removeEventListener("change", syncMode);
  }, []);

  const isCompactWindow = isCompactScreen && !state.isMaximized;
  const windowShadow = isFocused
    ? "0 20px 46px rgba(34, 18, 10, 0.32), 0 40px 78px rgba(34, 18, 10, 0.24)"
    : "0 16px 34px rgba(34, 18, 10, 0.24), 0 24px 54px rgba(34, 18, 10, 0.18)";

  if (!state.isOpen || state.isMinimized) return null;

  return (
    <motion.div
      className="window-shadow absolute flex flex-col border"
      style={{
        width: isCompactWindow ? "calc(100% - 16px)" : state.isMaximized ? "100%" : `${state.size.width}px`,
        height: isCompactWindow ? "calc(100% - 16px)" : state.isMaximized ? "100%" : `${state.size.height}px`,
        left: isCompactWindow ? 8 : state.isMaximized ? 0 : undefined,
        top: isCompactWindow ? 8 : state.isMaximized ? 0 : undefined,
        zIndex: state.zIndex,
        borderRadius: state.isMaximized ? 0 : isCompactWindow ? 10 : 12,
        overflow: "hidden",
      }}
      initial={
        isCompactWindow
          ? { x: 0, y: 18, opacity: 0, scale: 0.98 }
          : { x: state.position.x, y: state.position.y, opacity: 0, scale: 0.96 }
      }
      animate={{
        x: state.isMaximized || isCompactWindow ? 0 : state.position.x,
        y: state.isMaximized || isCompactWindow ? 0 : state.position.y,
        opacity: 1,
        scale: isFocused ? 1 : 0.996,
        boxShadow: state.isMaximized ? "none" : windowShadow,
        borderColor: isFocused ? "rgba(215, 189, 168, 0.9)" : "rgba(215, 189, 168, 0.62)",
      }}
      transition={{
        duration: state.isMaximized ? MOTION_DURATION.quick : MOTION_DURATION.base,
        ease: MOTION_EASE_STANDARD,
      }}
      drag={!state.isMaximized && !isCompactWindow}
      dragControls={dragControls}
      dragMomentum={false}
      dragListener={false}
      onDragEnd={(_, info) => {
        onDragEnd({ x: state.position.x + info.offset.x, y: state.position.y + info.offset.y });
      }}
      onPointerDown={onFocus}
    >
      <div
        className="flex flex-shrink-0 select-none items-center justify-between border-b px-4"
        style={{
          height: state.isMaximized ? 44 : 40,
          borderColor: "var(--ys-border)",
          background: state.isMaximized ? "var(--ys-surface-strong)" : "var(--ys-surface)",
          cursor: state.isMaximized || isCompactWindow ? "default" : "grab",
        }}
        onPointerDown={(e) => {
          if (!state.isMaximized && !isCompactWindow) dragControls.start(e);
        }}
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-2.5">
          {titleIcon && <span style={{ color: "var(--ys-text-soft)" }}>{titleIcon}</span>}
          <span
            className="text-[12px] font-semibold tracking-wide"
            style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
          >
            {state.title}
          </span>
        </div>

        <div className="-mr-4 flex h-full items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="focus-ring flex h-full items-center justify-center px-3.5 transition-colors"
            style={{ color: "var(--ys-text-soft)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(215, 189, 168, 0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
            onFocus={(e) => {
              e.currentTarget.style.background = "rgba(215, 189, 168, 0.45)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
            title="Minimize"
            aria-label={`Minimize ${state.title}`}
          >
            <Minus size={14} strokeWidth={1.5} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            className="focus-ring flex h-full items-center justify-center px-3.5 transition-colors"
            style={{ color: "var(--ys-text-soft)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(215, 189, 168, 0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
            onFocus={(e) => {
              e.currentTarget.style.background = "rgba(215, 189, 168, 0.45)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
            title={state.isMaximized ? "Restore" : "Maximize"}
            aria-label={`${state.isMaximized ? "Restore" : "Maximize"} ${state.title}`}
          >
            {state.isMaximized ? <Copy size={12} strokeWidth={1.5} /> : <Square size={12} strokeWidth={1.5} />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="focus-ring flex h-full items-center justify-center rounded-tr-xl px-3.5 transition-colors"
            style={{ color: "var(--ys-text-soft)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--ys-accent)";
              e.currentTarget.style.color = "var(--ys-surface)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--ys-text-soft)";
            }}
            onFocus={(e) => {
              e.currentTarget.style.background = "var(--ys-accent)";
              e.currentTarget.style.color = "var(--ys-surface)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--ys-text-soft)";
            }}
            title="Close"
            aria-label={`Close ${state.title}`}
          >
            <X size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-hidden overflow-y-auto" style={{ background: "var(--ys-surface)" }}>
        {children}
      </div>
    </motion.div>
  );
}
