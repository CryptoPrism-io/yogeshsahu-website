"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const scanRef = useRef<SVGPathElement>(null);
  const coreRef = useRef<SVGPathElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const velocity = useRef(0);
  const hovering = useRef(false);
  const clicking = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const ring = ringRef.current;
    const scan = scanRef.current;
    const core = coreRef.current;
    if (!root || !ring || !scan || !core) return;

    let prevX = -100;

    const onMove = (event: MouseEvent) => {
      const dx = prevX < 0 ? 0 : event.clientX - prevX;
      velocity.current = Math.min(22, Math.abs(dx));
      prevX = event.clientX;
      target.current = { x: event.clientX, y: event.clientY };
    };

    const onDown = () => {
      clicking.current = true;
    };

    const onUp = () => {
      clicking.current = false;
    };

    const onOver = (event: MouseEvent) => {
      const element = event.target as HTMLElement | null;
      hovering.current = Boolean(element?.closest("a, button, [role='button'], input, textarea"));
    };

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;
      velocity.current *= 0.9;

      const scale = clicking.current ? 0.94 : hovering.current ? 1.08 : 1;
      const rotate = hovering.current ? 10 : velocity.current * 0.55;
      const ringOpacity = hovering.current ? 0.74 : 0.48;
      const dash = hovering.current ? "4 5" : "2 6";

      root.style.left = `${current.current.x}px`;
      root.style.top = `${current.current.y}px`;
      root.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`;

      ring.setAttribute("stroke-dasharray", dash);
      ring.setAttribute("opacity", `${ringOpacity}`);
      scan.style.opacity = hovering.current ? "0.9" : "0.52";
      scan.style.transform = `rotate(${rotate * 1.1}deg)`;
      core.style.opacity = hovering.current ? "0.92" : clicking.current ? "0.88" : "0.7";

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
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div ref={rootRef} className="pointer-events-none fixed z-[99999] hidden md:block">
      <div className="relative h-[58px] w-[58px]">
        <svg
          width="58"
          height="58"
          viewBox="0 0 58 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: "drop-shadow(0 6px 12px rgba(17, 10, 7, 0.14))",
            transition: "transform 160ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <circle cx="29" cy="29" r="17" fill="rgba(255, 248, 241, 0.08)" />
          <circle
            ref={ringRef}
            cx="29"
            cy="29"
            r="17"
            stroke="rgba(255, 245, 235, 0.86)"
            strokeWidth="1"
            strokeDasharray="2 6"
          />

          <path
            ref={scanRef}
            d="M29 12 A17 17 0 0 1 46 29"
            stroke="#0b8d80"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ transformOrigin: "29px 29px", transition: "opacity 160ms ease" }}
          />

          <path d="M29 15 V21" stroke="rgba(255, 245, 235, 0.78)" strokeWidth="1" strokeLinecap="round" />
          <path d="M29 37 V43" stroke="rgba(255, 245, 235, 0.78)" strokeWidth="1" strokeLinecap="round" />
          <path d="M15 29 H21" stroke="rgba(255, 245, 235, 0.78)" strokeWidth="1" strokeLinecap="round" />
          <path d="M37 29 H43" stroke="rgba(255, 245, 235, 0.78)" strokeWidth="1" strokeLinecap="round" />

          <path
            ref={coreRef}
            d="M29 22 L32.5 29 L29 36 L25.5 29 Z"
            fill="rgba(255, 245, 235, 0.9)"
            stroke="#2a170f"
            strokeWidth="0.9"
          />
          <circle cx="29" cy="29" r="2.3" fill="#0b8d80" />
          <circle cx="29" cy="29" r="5.5" stroke="rgba(11, 141, 128, 0.34)" strokeWidth="0.9" />
          <path d="M40.5 18.5 L46 18.5" stroke="#2a170f" strokeWidth="1.2" strokeLinecap="round" opacity="0.72" />
          <path d="M42 22 L47.5 22" stroke="#2a170f" strokeWidth="1.2" strokeLinecap="round" opacity="0.72" />
        </svg>
      </div>
    </div>
  );
}
