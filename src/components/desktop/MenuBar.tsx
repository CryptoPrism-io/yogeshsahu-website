"use client";

import { useEffect, useState } from "react";

export default function MenuBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      setTime(
        `${days[ist.getDay()]} ${ist.getDate()} ${months[ist.getMonth()]} ${ist
          .getHours()
          .toString()
          .padStart(2, "0")}:${ist.getMinutes().toString().padStart(2, "0")} IST`
      );
    };

    tick();
    const interval = setInterval(tick, 10_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[9999] flex h-11 items-center justify-between border-b px-5"
      style={{
        borderColor: "rgba(215, 189, 168, 0.4)",
        background: "var(--ys-shell-glass)",
        backdropFilter: "blur(16px) saturate(1.3)",
        WebkitBackdropFilter: "blur(16px) saturate(1.3)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
      }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-1/2 focus:-translate-y-1/2 focus:z-[99999] focus:rounded-lg focus:px-3 focus:py-1.5 focus:text-[11px] focus:font-bold"
        style={{
          fontFamily: "var(--font-mono)",
          background: "var(--ys-surface)",
          color: "var(--ys-text)",
        }}
      >
        Skip to content
      </a>
      <div className="flex items-center gap-4">
        <span
          className="text-[14px] font-bold tracking-wide"
          style={{ fontFamily: "var(--font-headline)", color: "var(--ys-surface)" }}
        >
          YS.
        </span>
        <span
          className="hidden text-[10px] tracking-wider md:inline"
          style={{ fontFamily: "var(--font-mono)", color: "#d8b8a0" }}
        >
          CHIEF SOLUTIONS ARCHITECT | FRACTIONAL CTO
        </span>
      </div>

      <div className="flex items-center gap-5">
        <a
          href="mailto:yogesh@cryptoprism.io?subject=Fractional%20CTO%20Diagnostic"
          className="focus-ring hidden items-center gap-2 text-[10px] tracking-wider transition-colors md:flex hover:opacity-90"
          aria-label="Email Yogesh for mandates"
          style={{ fontFamily: "var(--font-mono)", color: "#d8b8a0" }}
        >
          <span className="h-1.5 w-1.5 rounded-full animate-heartbeat" style={{ background: "var(--ys-highlight)" }} />
          OPEN TO ARCHITECTURE MANDATES
        </a>
        <span
          className="text-[11px]"
          style={{ fontFamily: "var(--font-mono)", color: "#ab8a75" }}
        >
          {time}
        </span>
      </div>
    </header>
  );
}
