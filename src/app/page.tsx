"use client";

import AboutWindow from "@/components/windows/AboutWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import CredentialsWindow from "@/components/windows/CredentialsWindow";
import ExperienceWindow from "@/components/windows/ExperienceWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import TerminalWindow from "@/components/windows/TerminalWindow";
import CustomCursor from "@/components/desktop/CustomCursor";
import DesktopIcon from "@/components/desktop/DesktopIcon";
import Dock from "@/components/desktop/Dock";
import MenuBar from "@/components/desktop/MenuBar";
import Window from "@/components/desktop/Window";
import { type WindowConfig, useWindowManager } from "@/hooks/useWindowManager";
import {
  ArrowRight,
  Award,
  Briefcase,
  FileText,
  FolderOpen,
  Mail,
  Terminal,
} from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, MOTION_DURATION, MOTION_EASE_QUICK } from "@/lib/motion";

const WINDOW_CONFIGS: WindowConfig[] = [
  {
    id: "about",
    title: "About",
    icon: "about",
    defaultOpen: false,
    defaultPosition: { x: 160, y: 20 },
    defaultSize: { width: 580, height: 540 },
  },
  {
    id: "projects",
    title: "Projects",
    icon: "projects",
    defaultOpen: false,
    defaultPosition: { x: 240, y: 50 },
    defaultSize: { width: 540, height: 500 },
  },
  {
    id: "contact",
    title: "Contact",
    icon: "contact",
    defaultOpen: false,
    defaultPosition: { x: 300, y: 30 },
    defaultSize: { width: 460, height: 540 },
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: "terminal",
    defaultOpen: false,
    defaultPosition: { x: 180, y: 60 },
    defaultSize: { width: 580, height: 420 },
  },
  {
    id: "credentials",
    title: "Credentials",
    icon: "credentials",
    defaultOpen: false,
    defaultPosition: { x: 260, y: 40 },
    defaultSize: { width: 560, height: 500 },
  },
  {
    id: "experience",
    title: "Experience",
    icon: "experience",
    defaultOpen: false,
    defaultPosition: { x: 200, y: 50 },
    defaultSize: { width: 520, height: 520 },
  },
];

const ICON_MAP: Record<string, ReactNode> = {
  about: <FileText size={18} strokeWidth={1.5} />,
  projects: <FolderOpen size={18} strokeWidth={1.5} />,
  contact: <Mail size={18} strokeWidth={1.5} />,
  terminal: <Terminal size={18} strokeWidth={1.5} />,
  credentials: <Award size={18} strokeWidth={1.5} />,
  experience: <Briefcase size={18} strokeWidth={1.5} />,
};

const DESKTOP_ITEMS = [
  { id: "about", label: "about.txt" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
  { id: "terminal", label: "Terminal" },
  { id: "credentials", label: "Credentials" },
  { id: "experience", label: "Experience" },
];

const WINDOW_CONTENT: Record<string, ReactNode> = {
  about: <AboutWindow />,
  projects: <ProjectsWindow />,
  contact: <ContactWindow />,
  terminal: <TerminalWindow />,
  credentials: <CredentialsWindow />,
  experience: <ExperienceWindow />,
};

function LaunchDeck({ onOpen }: { onOpen: (id: string) => void }) {
  const metrics = [
    { value: "1B+", label: "data points/day" },
    { value: "99.9%", label: "uptime SLA" },
    { value: "23", label: "public repos" },
  ];

  return (
    <motion.section
      className="absolute left-3 right-3 top-3 z-[2] md:left-auto md:right-4 md:top-4 md:w-[560px]"
      variants={fadeUp(0, 24)}
      initial="initial"
      animate="animate"
    >
      <div
        className="rounded-2xl border p-5 md:p-6"
        style={{
          borderColor: "rgba(215, 189, 168, 0.55)",
          background: "rgba(255, 244, 233, 0.84)",
          backdropFilter: "blur(20px) saturate(1.12)",
          WebkitBackdropFilter: "blur(20px) saturate(1.12)",
          boxShadow: "0 24px 56px rgba(34, 18, 11, 0.24)",
        }}
      >
        <p
          className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          FRACTIONAL CTO | FINTECH INFRASTRUCTURE | AI PRODUCT
        </p>
        <h1
          className="mb-3 text-[clamp(2rem,5.4vw,3.2rem)] font-black uppercase leading-[0.95]"
          style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
        >
          Yogesh Sahu
        </h1>
        <p
          className="mb-5 max-w-[50ch] text-[13px] leading-[1.8]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          I design and ship fintech systems that stay live under pressure. Explore the track record,
          architecture work, and current mandate availability from this workspace.
        </p>

        <div className="mb-5 grid grid-cols-3 gap-2">
          {metrics.map((item, idx) => (
            <motion.div
              key={item.label}
              className="rounded-xl border px-3 py-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12 + idx * 0.08 }}
              style={{
                borderColor: "rgba(215, 189, 168, 0.75)",
                background: "rgba(255, 248, 241, 0.92)",
              }}
            >
              <p
                className="text-[1.1rem] font-bold"
                style={{ fontFamily: "var(--font-headline)", color: "var(--ys-accent)" }}
              >
                {item.value}
              </p>
              <p
                className="text-[9px] uppercase tracking-[0.12em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
              >
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <motion.button
            onClick={() => onOpen("projects")}
            className="focus-ring flex items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-colors"
            aria-label="Open projects window"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_QUICK }}
            style={{
              borderColor: "rgba(169, 61, 29, 0.35)",
              background: "rgba(207, 79, 39, 0.1)",
              color: "var(--ys-accent-strong)",
              fontFamily: "var(--font-headline)",
            }}
          >
            <span className="text-[12px] font-bold uppercase tracking-[0.08em]">See Projects</span>
            <ArrowRight size={14} />
          </motion.button>
          <motion.button
            onClick={() => onOpen("contact")}
            className="focus-ring flex items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-colors"
            aria-label="Open contact window"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_QUICK }}
            style={{
              borderColor: "rgba(11, 141, 128, 0.36)",
              background: "rgba(11, 141, 128, 0.1)",
              color: "var(--ys-highlight)",
              fontFamily: "var(--font-headline)",
            }}
          >
            <span className="text-[12px] font-bold uppercase tracking-[0.08em]">Book Mandate</span>
            <ArrowRight size={14} />
          </motion.button>
          <motion.button
            onClick={() => onOpen("about")}
            className="focus-ring rounded-xl border px-3 py-2.5 text-left text-[11px] font-bold uppercase tracking-[0.08em] transition-colors"
            aria-label="Open about window"
            whileHover={{ y: -1, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_QUICK }}
            style={{
              borderColor: "rgba(215, 189, 168, 0.75)",
              color: "var(--ys-text)",
              fontFamily: "var(--font-headline)",
            }}
          >
            Open Profile
          </motion.button>
          <motion.button
            onClick={() => onOpen("terminal")}
            className="focus-ring rounded-xl border px-3 py-2.5 text-left text-[11px] font-bold uppercase tracking-[0.08em] transition-colors"
            aria-label="Open terminal window"
            whileHover={{ y: -1, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_QUICK }}
            style={{
              borderColor: "rgba(215, 189, 168, 0.75)",
              color: "var(--ys-text)",
              fontFamily: "var(--font-headline)",
            }}
          >
            Open Terminal
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}

export default function Home() {
  const {
    openWindows,
    dockWindows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updatePosition,
  } = useWindowManager(WINDOW_CONFIGS);
  const topZIndex = openWindows.reduce((max, current) => Math.max(max, current.zIndex), 0);

  return (
    <div className="desktop-surface desktop-pattern desktop-cursor relative h-screen w-screen overflow-hidden">
      <CustomCursor />
      <MenuBar />

      <main className="absolute top-11 left-0 right-0 bottom-16 overflow-hidden">
        <LaunchDeck onOpen={openWindow} />

        <div className="absolute left-4 top-4 z-[1] hidden flex-col gap-1 md:flex">
          {DESKTOP_ITEMS.map((di, i) => (
            <DesktopIcon
              key={di.id}
              icon={ICON_MAP[di.id]}
              label={di.label}
              onClick={() => openWindow(di.id)}
              delay={i * 0.06}
            />
          ))}
        </div>

        {openWindows.map((w) => (
          <Window
            key={w.id}
            state={{ ...w, icon: "" }}
            isFocused={w.zIndex === topZIndex}
            titleIcon={ICON_MAP[w.id]}
            onClose={() => closeWindow(w.id)}
            onMinimize={() => minimizeWindow(w.id)}
            onMaximize={() => maximizeWindow(w.id)}
            onFocus={() => focusWindow(w.id)}
            onDragEnd={(pos) => updatePosition(w.id, pos)}
          >
            {WINDOW_CONTENT[w.id]}
          </Window>
        ))}
      </main>

      <Dock windows={dockWindows} iconMap={ICON_MAP} onOpen={openWindow} onFocus={focusWindow} />
    </div>
  );
}
