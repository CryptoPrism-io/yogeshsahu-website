"use client";

import { useEffect, useRef, useCallback } from "react";

export default function CustomCursor() {
  const bikeRef = useRef<HTMLDivElement>(null);
  const rearWheelRef = useRef<SVGGElement>(null);
  const frontWheelRef = useRef<SVGGElement>(null);
  const smokeCanvasRef = useRef<HTMLCanvasElement>(null);
  const wheelRotation = useRef(0);
  const speed = useRef(0);
  const clicking = useRef(false);
  const hovering = useRef(false);
  const facingRight = useRef(true);
  const bikePos = useRef({ x: -100, y: -100 });

  interface Puff {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    maxSize: number;
    life: number;
    maxLife: number;
    opacity: number;
  }

  const createSpokes = useCallback((cx: number, cy: number, r: number, spokeCount: number) => {
    const spokes = [];
    for (let i = 0; i < spokeCount; i++) {
      const angle = (i * 360) / spokeCount;
      const rad = (angle * Math.PI) / 180;
      const x2 = cx + Math.cos(rad) * (r - 0.8);
      const y2 = cy + Math.sin(rad) * (r - 0.8);
      spokes.push(
        <line key={i} x1={cx} y1={cy} x2={x2} y2={y2}
              stroke="#2d1810" strokeWidth="0.5" opacity="0.55" />
      );
    }
    return spokes;
  }, []);

  useEffect(() => {
    const bike = bikeRef.current;
    const rearWheel = rearWheelRef.current;
    const frontWheel = frontWheelRef.current;
    const canvas = smokeCanvasRef.current;
    if (!bike || !rearWheel || !frontWheel || !canvas) return;

    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    let mouseX = -100, mouseY = -100;
    let bx = -100, by = -100;
    let prevX = -100;
    const puffs: Puff[] = [];
    let lastPuff = 0;

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - mouseX;
      speed.current = Math.abs(dx);
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (Math.abs(e.clientX - prevX) > 2) {
        facingRight.current = e.clientX > prevX;
      }
      prevX = e.clientX;
    };

    const onDown = () => { clicking.current = true; };
    const onUp = () => { clicking.current = false; };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      hovering.current = !!target.closest("a, button, [role='button'], input, textarea");
    };
    const onOut = () => { hovering.current = false; };

    const spawnPuff = (intensity: "idle" | "moving" | "wheelie") => {
      const dir = facingRight.current ? -1 : 1;
      const exhaust = {
        x: bx + dir * 20,
        y: by + 6,
      };

      const count = intensity === "wheelie" ? 2 : 1;
      for (let i = 0; i < count; i++) {
        const spread = intensity === "wheelie" ? 1.5 : 0.8;
        puffs.push({
          x: exhaust.x + (Math.random() - 0.5) * 3,
          y: exhaust.y + (Math.random() - 0.5) * 2,
          vx: dir * (0.2 + Math.random() * spread),
          vy: -(0.15 + Math.random() * 0.4),
          size: 1 + Math.random() * 1,
          maxSize: intensity === "wheelie" ? 9 + Math.random() * 5 : intensity === "moving" ? 6 + Math.random() * 3 : 3 + Math.random() * 2,
          life: 0,
          maxLife: intensity === "wheelie" ? 48 : intensity === "moving" ? 40 : 30,
          opacity: intensity === "wheelie" ? 0.35 : intensity === "moving" ? 0.22 : 0.12,
        });
      }
    };

    const animate = () => {
      bx += (mouseX - bx) * 0.12;
      by += (mouseY - by) * 0.12;
      bikePos.current = { x: bx, y: by };

      // Wheels
      const baseSpeed = 2;
      const moveBoost = Math.min(speed.current * 3, 40);
      wheelRotation.current = (wheelRotation.current + baseSpeed + moveBoost) % 360;
      speed.current *= 0.92;

      if (bike) {
        const flip = facingRight.current ? 1 : -1;
        bike.style.left = `${bx}px`;
        bike.style.top = `${by}px`;
        bike.style.transform = `translate(-50%, -50%) scaleX(${flip})`;

        // Wheelie / hover tilt
        const svgEl = bike.querySelector("svg") as SVGSVGElement | null;
        if (svgEl) {
          if (clicking.current) {
            svgEl.style.transform = "rotate(-30deg) translateY(-3px)";
          } else if (hovering.current) {
            svgEl.style.transform = "rotate(-10deg)";
          } else {
            svgEl.style.transform = "rotate(0deg)";
          }
        }
      }

      const rot = `rotate(${wheelRotation.current})`;
      rearWheel.setAttribute("transform", rot);
      frontWheel.setAttribute("transform", rot);

      // Spawn smoke
      const now = performance.now();
      const isMoving = speed.current > 1.5;
      const interval = clicking.current ? 60 : isMoving ? 100 : 300;
      if (now - lastPuff > interval && bx > 0) {
        lastPuff = now;
        const intensity = clicking.current ? "wheelie" : isMoving ? "moving" : "idle";
        spawnPuff(intensity);
      }

      // Draw smoke on canvas with blur
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = "blur(3px)";
      for (let i = puffs.length - 1; i >= 0; i--) {
        const p = puffs[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.98;
        const progress = p.life / p.maxLife;
        const currentSize = p.size + (p.maxSize - p.size) * progress;
        const currentOpacity = p.opacity * (1 - progress * progress); // ease out fade

        if (p.life >= p.maxLife) {
          puffs.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 160, 140, ${currentOpacity})`;
        ctx.fill();

        // Inner lighter core
        if (currentSize > 4) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentSize * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(210, 190, 170, ${currentOpacity * 0.5})`;
          ctx.fill();
        }
      }

      ctx.filter = "none";

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("resize", onResize);
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const REAR_CX = 10, REAR_CY = 25, REAR_R = 6;
  const FRONT_CX = 34, FRONT_CY = 25, FRONT_R = 6;
  const SPOKE_COUNT = 12;

  return (
    <>
      {/* Smoke canvas — full screen behind bike */}
      <canvas
        ref={smokeCanvasRef}
        className="pointer-events-none fixed inset-0 z-[99998] hidden md:block"
      />

      {/* Bike */}
      <div ref={bikeRef} className="pointer-events-none fixed z-[99999] hidden md:block">
        <svg
          width="44" height="32" viewBox="0 0 44 32"
          fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{
            transformOrigin: "65% 90%",
            transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.35))",
          }}
        >
          {/* Rear wheel */}
          <circle cx={REAR_CX} cy={REAR_CY} r={REAR_R} stroke="#2d1810" strokeWidth="2" fill="none" />
          <circle cx={REAR_CX} cy={REAR_CY} r={REAR_R - 1.2} stroke="#2d1810" strokeWidth="0.4" fill="none" opacity="0.3" />
          <circle cx={REAR_CX} cy={REAR_CY} r="1.5" fill="#2d1810" />
          <g ref={rearWheelRef} style={{ transformOrigin: `${REAR_CX}px ${REAR_CY}px` }}>
            {createSpokes(REAR_CX, REAR_CY, REAR_R - 0.3, SPOKE_COUNT)}
          </g>

          {/* Front wheel */}
          <circle cx={FRONT_CX} cy={FRONT_CY} r={FRONT_R} stroke="#2d1810" strokeWidth="2" fill="none" />
          <circle cx={FRONT_CX} cy={FRONT_CY} r={FRONT_R - 1.2} stroke="#2d1810" strokeWidth="0.4" fill="none" opacity="0.3" />
          <circle cx={FRONT_CX} cy={FRONT_CY} r="1.5" fill="#2d1810" />
          <g ref={frontWheelRef} style={{ transformOrigin: `${FRONT_CX}px ${FRONT_CY}px` }}>
            {createSpokes(FRONT_CX, FRONT_CY, FRONT_R - 0.3, SPOKE_COUNT)}
          </g>

          {/* Engine */}
          <rect x="14" y="17" width="8" height="6" rx="1.5" fill="#e8552e" stroke="#c4431f" strokeWidth="0.8" />
          <line x1="15" y1="18.5" x2="21" y2="18.5" stroke="#c4431f" strokeWidth="0.5" opacity="0.6" />
          <line x1="15" y1="20" x2="21" y2="20" stroke="#c4431f" strokeWidth="0.5" opacity="0.6" />
          <line x1="15" y1="21.5" x2="21" y2="21.5" stroke="#c4431f" strokeWidth="0.5" opacity="0.6" />

          {/* Frame */}
          <line x1="10" y1="25" x2="18" y2="17" stroke="#2d1810" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="17" x2="30" y2="13" stroke="#e8552e" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="22" y1="17" x2="30" y2="17" stroke="#e8552e" strokeWidth="1.8" strokeLinecap="round" />

          {/* Tank */}
          <ellipse cx="24" cy="12" rx="5" ry="3" fill="#e8552e" stroke="#c4431f" strokeWidth="0.8" />
          <line x1="20" y1="12" x2="28" y2="12" stroke="#fff5eb" strokeWidth="0.8" opacity="0.5" />

          {/* Front fork */}
          <line x1="30" y1="13" x2="34" y2="25" stroke="#2d1810" strokeWidth="2" strokeLinecap="round" />
          <line x1="31" y1="14" x2="34.5" y2="24" stroke="#8a7060" strokeWidth="1" strokeLinecap="round" opacity="0.5" />

          {/* Handlebars */}
          <line x1="29" y1="11" x2="33" y2="9" stroke="#2d1810" strokeWidth="2" strokeLinecap="round" />
          <line x1="33" y1="9" x2="35" y2="8" stroke="#2d1810" strokeWidth="1.5" strokeLinecap="round" />

          {/* Seat */}
          <path d="M17 11 Q20 9.5 24 10" stroke="#2d1810" strokeWidth="2.2" fill="none" strokeLinecap="round" />

          {/* Tail + light */}
          <line x1="13" y1="15" x2="10" y2="13" stroke="#e8552e" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="10" cy="13" r="1" fill="#e8552e" stroke="#c4431f" strokeWidth="0.5" />

          {/* Exhaust */}
          <path d="M16 22 Q12 24 8 23" stroke="#8a7060" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <circle cx="7.5" cy="23" r="1" fill="none" stroke="#8a7060" strokeWidth="0.8" />

          {/* Headlight */}
          <circle cx="35" cy="11" r="1.5" fill="#fbbf24" stroke="#e8552e" strokeWidth="0.6" />

          {/* Rider */}
          <line x1="21" y1="10" x2="24" y2="4" stroke="#2d1810" strokeWidth="2" strokeLinecap="round" />
          <circle cx="25" cy="3" r="2.5" fill="#2d1810" />
          <line x1="26.5" y1="2.5" x2="27.5" y2="3.5" stroke="#0d9488" strokeWidth="1" strokeLinecap="round" />
          <path d="M23 6 Q28 7 32 9" stroke="#2d1810" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <path d="M20 11 Q17 16 16 19" stroke="#2d1810" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    </>
  );
}
