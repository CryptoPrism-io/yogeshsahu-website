"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const target = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);
  const clicking = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ringEl || !label) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onDown = () => { clicking.current = true; };
    const onUp = () => { clicking.current = false; };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const interactive = el?.closest("a, button, [role='button'], input, textarea, [data-cursor-hover]");
      hovering.current = Boolean(interactive);
      if (interactive) {
        const customLabel = (interactive as HTMLElement).dataset.cursor;
        label.textContent = customLabel ?? "OPEN";
      }
    };

    const animate = () => {
      dot.style.left = `${target.current.x}px`;
      dot.style.top = `${target.current.y}px`;

      ring.current.x += (target.current.x - ring.current.x) * 0.2;
      ring.current.y += (target.current.y - ring.current.y) * 0.2;
      ringEl.style.left = `${ring.current.x}px`;
      ringEl.style.top = `${ring.current.y}px`;

      const ringSize = clicking.current ? 24 : hovering.current ? 52 : 30;
      const ringOpacity = hovering.current ? 0.9 : 0.55;
      const dotOpacity = hovering.current ? 0 : clicking.current ? 0.6 : 1;
      const dotScale = clicking.current ? 0.7 : 1;
      const labelOpacity = hovering.current ? 1 : 0;

      ringEl.style.width = `${ringSize}px`;
      ringEl.style.height = `${ringSize}px`;
      ringEl.style.opacity = `${ringOpacity}`;
      dot.style.opacity = `${dotOpacity}`;
      dot.style.transform = `translate(-50%, -50%) scale(${dotScale})`;
      label.style.opacity = `${labelOpacity}`;

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[99999] hidden md:block"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#FFF4E9",
          transform: "translate(-50%, -50%)",
          willChange: "left, top",
          boxShadow: "0 0 0 1px rgba(30, 10, 4, 0.5)",
          transition: "opacity 120ms ease",
        }}
      />

      {/* Ring — lags behind with label */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[99998] hidden md:flex md:items-center md:justify-center"
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          border: "1.5px solid rgba(255, 244, 233, 0.8)",
          transform: "translate(-50%, -50%)",
          transition: "width 200ms cubic-bezier(0.22, 1, 0.36, 1), height 200ms cubic-bezier(0.22, 1, 0.36, 1), opacity 150ms ease",
          willChange: "left, top, width, height",
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 8,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255, 244, 233, 0.9)",
            opacity: 0,
            transition: "opacity 150ms ease",
            userSelect: "none",
          }}
        >
          OPEN
        </span>
      </div>
    </>
  );
}
