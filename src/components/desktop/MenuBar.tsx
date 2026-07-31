"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeDown } from "@/lib/motion";
import { Briefcase, Clock, Mail } from "lucide-react";

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
    <motion.header
      className="fixed top-0 left-0 right-0 flex h-11 items-center justify-between border-b px-5"
      variants={fadeDown(0)}
      initial="initial"
      animate="animate"
      style={{
        zIndex: "var(--z-menu)",
        borderColor: "rgba(215, 189, 168, 0.18)",
        background: "rgba(30, 14, 6, 0.42)",
        backdropFilter: "blur(24px) saturate(1.6)",
        WebkitBackdropFilter: "blur(24px) saturate(1.6)",
        boxShadow: "0 1px 0 rgba(215, 189, 168, 0.12), 0 4px 24px rgba(0,0,0,0.18)",
      }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-1/2 focus:-translate-y-1/2 focus:rounded-lg focus:px-3 focus:py-1.5 focus:text-[11px] focus:font-bold"
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
        <span aria-hidden style={{ width: 1, height: 14, background: "rgba(215,189,168,0.3)" }} />
        <Briefcase size={11} strokeWidth={1.8} style={{ color: "#d8b8a0" }} />
        <span
          className="hidden text-[10px] tracking-wider md:inline"
          style={{ fontFamily: "var(--font-mono)", color: "#d8b8a0" }}
        >
          CHIEF SOLUTIONS ARCHITECT | FRACTIONAL CTO
        </span>
      </div>

      <div className="flex items-center gap-5">
        <a
          href="mailto:yogesh.sahu@cryptoprism.io?subject=Fractional%20CTO%20Diagnostic"
          className="focus-ring hidden items-center gap-2 text-[10px] tracking-wider transition-colors md:flex hover:opacity-90"
          aria-label="Email Yogesh for mandates"
          style={{ fontFamily: "var(--font-mono)", color: "#d8b8a0" }}
        >
          <span className="h-1.5 w-1.5 rounded-full animate-heartbeat" style={{ background: "var(--ys-highlight)" }} />
          <Mail size={11} strokeWidth={1.8} />
          OPEN TO ARCHITECTURE MANDATES
        </a>
        <span aria-hidden style={{ width: 1, height: 14, background: "rgba(215,189,168,0.3)" }} />
        <Clock size={11} strokeWidth={1.8} style={{ color: "#ab8a75" }} />
        <span
          className="text-[11px]"
          style={{ fontFamily: "var(--font-mono)", color: "#ab8a75" }}
        >
          {time}
        </span>
      </div>
    </motion.header>
  );
}
