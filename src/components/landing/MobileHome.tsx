"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Briefcase, FileText, Terminal, Award, FolderOpen } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import AboutWindow from "@/components/windows/AboutWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import ExperienceWindow from "@/components/windows/ExperienceWindow";
import CredentialsWindow from "@/components/windows/CredentialsWindow";
import DiagnosticWindow from "@/components/windows/DiagnosticWindow";
import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";

const HERO_STATS = [
  { value: "6+", label: "production apps", context: "shipped in 6 months — not MVPs" },
  { value: "1B+", label: "datapoints / day", context: "processed at CryptoPrism" },
  { value: "2M+", label: "lines of code", context: "across 12 production projects" },
  { value: "4", label: "institutions built at", context: "Times of India · Barclays · Strathclyde · Isha" },
] as const;

function MobileSection({ title, icon, children, defaultOpen = false }: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section
      className="border-b"
      style={{ borderColor: "var(--ys-card-border)" }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-5 py-4"
        style={{ background: "var(--ys-surface)" }}
      >
        <div className="flex items-center gap-3">
          <span style={{ color: "var(--ys-text-soft)" }}>{icon}</span>
          <span
            className="text-[13px] font-bold uppercase tracking-[0.1em]"
            style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
          >
            {title}
          </span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: "var(--ys-text-soft)" }}
        >
          <ArrowRight size={16} />
        </motion.span>
      </button>
      {isOpen && (
        <div style={{ background: "var(--ys-surface)" }}>
          {children}
        </div>
      )}
    </section>
  );
}

export default function MobileHome() {
  const [statIndex, setStatIndex] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => {
      setStatIndex((i) => (i + 1) % HERO_STATS.length);
    }, 3500);
    return () => clearInterval(tick);
  }, []);

  const activeStat = HERO_STATS[statIndex];

  return (
    <div className="fixed inset-0 overflow-y-auto" style={{ background: "var(--ys-surface)" }}>
      <motion.header
        className="relative flex min-h-[760px] flex-col overflow-hidden"
        style={{ background: "var(--ys-bg)" }}
        variants={fadeUp(0, 18)}
        initial="initial"
        animate="animate"
      >
        {/* Index block — top-left masthead metadata */}
        <div className="px-5 pt-12">
          <p
            className="text-[10px] uppercase leading-[1.4] tracking-[0.18em]"
            style={{ fontFamily: "var(--font-mono)", color: "rgba(255,244,233,0.7)" }}
          >
            INDEX № 01 / YS
            <br />
            PORTFOLIO — 2026
          </p>
          <div
            className="mt-2 h-px w-[55%]"
            style={{ background: "rgba(255,244,233,0.55)" }}
          />
        </div>

        {/* Headshot — top-right, with teal registration arc */}
        <div className="absolute right-5 top-[68px] flex h-[180px] w-[180px] items-center justify-center">
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              border: "1.5px solid transparent",
              borderTopColor: "var(--ys-highlight)",
              transform: "rotate(38deg)",
            }}
          />
          <div
            className="relative h-40 w-40 overflow-hidden rounded-full"
            style={{ border: "1px solid rgba(255,244,233,0.85)" }}
          >
            <Image
              src="/images/profile.jpg"
              alt="Yogesh Sahu"
              width={160}
              height={160}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Name lockup — fills the lower-left two-thirds */}
        <div className="flex flex-grow flex-col justify-end px-5 pb-7">
          <h1>
            <span
              className="block font-black italic"
              style={{
                fontFamily: "var(--font-serif-display)",
                color: "var(--ys-surface)",
                fontSize: "clamp(5rem, 24vw, 6.25rem)",
                lineHeight: 0.82,
                letterSpacing: "-0.045em",
                textShadow: "0 2px 0 #1f140d",
              }}
            >
              Yogesh
            </span>
            <span className="-mt-3 flex justify-end pr-8">
              <span
                className="font-black uppercase"
                style={{
                  fontFamily: "var(--font-headline)",
                  color: "var(--ys-surface)",
                  fontSize: "clamp(2.4rem, 12vw, 3.1rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                  textShadow: "0 2px 0 #1f140d",
                }}
              >
                Sahu
              </span>
            </span>
          </h1>
          <p
            className="mt-5 text-[10.5px] font-bold uppercase tracking-[0.22em]"
            style={{ fontFamily: "var(--font-mono)", color: "rgba(255,244,233,0.82)" }}
          >
            — Founder · AI-Native Builder · CTO
          </p>
        </div>

        {/* Stat band — full-width letterpress band */}
        <div
          className="flex items-end justify-between px-5 py-5"
          style={{
            background: "rgba(31,20,13,0.42)",
            borderTop: "1px solid rgba(31,20,13,0.4)",
          }}
        >
          <div className="flex items-end gap-3">
            <AnimatePresence mode="wait">
              <motion.span
                key={`val-${statIndex}`}
                className="inline-block font-black italic"
                style={{
                  fontFamily: "var(--font-serif-display)",
                  color: "var(--ys-surface)",
                  fontSize: "3.6rem",
                  lineHeight: 0.82,
                  letterSpacing: "-0.04em",
                  textShadow: "0 2px 0 #1f140d",
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {activeStat.value}
              </motion.span>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={`lbl-${statIndex}`}
                className="flex flex-col leading-tight"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <span
                  className="text-[9.5px] font-bold uppercase tracking-[0.18em]"
                  style={{ fontFamily: "var(--font-mono)", color: "rgba(255,244,233,0.88)" }}
                >
                  {activeStat.label}
                </span>
                <span
                  className="mt-1 text-[10px] tracking-[0.04em]"
                  style={{ fontFamily: "var(--font-mono)", color: "rgba(255,244,233,0.6)" }}
                >
                  {activeStat.context}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1.5 pb-1">
            {HERO_STATS.map((_, i) => (
              <motion.div
                key={i}
                className="h-[3px]"
                animate={{
                  width: i === statIndex ? 28 : 10,
                  opacity: i === statIndex ? 1 : 0.35,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ background: "var(--ys-surface)" }}
              />
            ))}
          </div>
        </div>
      </motion.header>

      <section
        className="border-b"
        style={{ borderColor: "var(--ys-card-border)" }}
      >
        <Link
          href="/work"
          className="flex w-full items-center justify-between px-5 py-4"
          style={{ background: "var(--ys-surface)" }}
        >
          <div className="flex items-center gap-3">
            <span style={{ color: "var(--ys-accent)" }}>
              <FolderOpen size={16} />
            </span>
            <div>
              <span
                className="block text-[13px] font-bold uppercase tracking-[0.1em]"
                style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
              >
                /work hub
              </span>
              <span
                className="block text-[10px] uppercase tracking-[0.12em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
              >
                12 case studies · 3 clusters
              </span>
            </div>
          </div>
          <span style={{ color: "var(--ys-text-soft)" }}>
            <ArrowRight size={16} />
          </span>
        </Link>
      </section>

      <MobileSection title="About" icon={<FileText size={16} />} defaultOpen>
        <AboutWindow hideHeader />
      </MobileSection>

      <MobileSection title="Projects" icon={<FolderOpen size={16} />} defaultOpen>
        <ProjectsWindow />
      </MobileSection>

      <MobileSection title="Experience" icon={<Briefcase size={16} />}>
        <ExperienceWindow />
      </MobileSection>

      <MobileSection title="Credentials" icon={<Award size={16} />}>
        <CredentialsWindow />
      </MobileSection>

      <MobileSection title="5-Day Diagnostic" icon={<Terminal size={16} />}>
        <DiagnosticWindow onStart={() => {
          document.getElementById("mobile-contact")?.scrollIntoView({ behavior: "smooth" });
        }} />
      </MobileSection>

      <div id="mobile-contact">
        <MobileSection title="Contact" icon={<Mail size={16} />} defaultOpen>
          <ContactWindow />
        </MobileSection>
      </div>

      <footer
        className="px-5 py-6 text-center"
        style={{ background: "var(--ys-surface-strong)" }}
      >
        <p
          className="text-[10px] uppercase tracking-[0.15em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          yogeshsahu.xyz
        </p>
      </footer>
    </div>
  );
}
