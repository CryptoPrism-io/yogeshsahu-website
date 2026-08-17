"use client";

import { useEffect, useRef, useCallback } from "react";

interface MatrixRainProps {
  onComplete: () => void;
  duration?: number;
}

const CHARS = "ヲヱンヲエオヤユヨワヰンヴヵヶヷヸヹヺ・ーヽヾ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function MatrixRain({ onComplete, duration = 5000 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const columns = Math.floor(canvas.width / 14);
    const drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text color - green matrix style
      ctx.fillStyle = "#0F0";
      ctx.font = "14px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(text, i * 14, drops[i] * 14);

        // Randomly reset drop or move down
        if (drops[i] * 14 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      // Check if duration exceeded
      if (Date.now() - startTimeRef.current > duration) {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        window.removeEventListener("resize", resize);
        onComplete();
        return;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    startTimeRef.current = Date.now();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onComplete, duration]);

  useEffect(() => {
    const cleanup = init();
    return () => {
      if (cleanup) cleanup();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ background: "#000" }}
    />
  );
}
