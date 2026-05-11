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
        className="px-5 pt-12 pb-8"
        style={{ background: "var(--ys-bg)" }}
        variants={fadeUp(0, 18)}
        initial="initial"
        animate="animate"
      >
        {/* Headshot — focal point with warm halo + breathing concentric rings */}
        <div className="relative mx-auto mb-6 h-36 w-36">
          {/* Warm radial glow behind */}
          <div
            className="pointer-events-none absolute inset-[-28px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,250,244,0.22) 0%, rgba(255,250,244,0) 65%)",
            }}
          />
          {/* Outer breathing dashed ring */}
          <motion.div
            className="pointer-events-none absolute inset-[-14px] rounded-full border border-dashed"
            style={{ borderColor: "rgba(255,248,241,0.42)" }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          {/* Solid inner ring */}
          <div
            className="pointer-events-none absolute inset-[-4px] rounded-full border-2"
            style={{ borderColor: "rgba(255,248,241,0.78)" }}
          />
          {/* Photo */}
          <Image
            src="/images/profile.jpg"
            alt="Yogesh Sahu"
            width={144}
            height={144}
            className="relative h-36 w-36 rounded-full object-cover"
            priority
          />
        </div>

        {/* Brand-mark name — italic serif + caps sans, same as desktop About */}
        <h1 className="mb-2 text-center leading-[0.88] tracking-[-0.02em]">
          <span
            className="block text-[2.6rem] font-black italic"
            style={{ fontFamily: "var(--font-serif-display)", color: "rgba(255,248,241,0.96)" }}
          >
            Yogesh
          </span>
          <span
            className="block text-[2.1rem] font-black uppercase"
            style={{ fontFamily: "var(--font-headline)", color: "var(--ys-surface)" }}
          >
            Sahu
          </span>
        </h1>

        {/* Role */}
        <p
          className="mb-6 text-center text-[9.5px] font-bold uppercase tracking-[0.22em]"
          style={{ fontFamily: "var(--font-mono)", color: "rgba(255,239,225,0.72)" }}
        >
          Founder · AI-Native Builder · CTO
        </p>

        {/* Rotating stat card */}
        <div
          className="rounded-2xl border px-5 py-6 backdrop-blur-md"
          style={{
            borderColor: "rgba(255,244,233,0.32)",
            background: "rgba(28,17,11,0.5)",
            boxShadow:
              "0 18px 38px -22px rgba(15,8,4,0.55), inset 0 1px 0 rgba(255,244,233,0.14)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={statIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <p
                className="text-[2.6rem] font-black leading-none"
                style={{ fontFamily: "var(--font-headline)", color: "var(--ys-surface)" }}
              >
                {activeStat.value}
              </p>
              <p
                className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ fontFamily: "var(--font-mono)", color: "rgba(255,244,233,0.88)" }}
              >
                {activeStat.label}
              </p>
              <p
                className="mt-2 text-[12px] leading-[1.55]"
                style={{ fontFamily: "var(--font-body)", color: "rgba(255,239,225,0.74)" }}
              >
                {activeStat.context}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress pills */}
          <div className="mt-5 flex items-center gap-1.5">
            {HERO_STATS.map((_, i) => (
              <motion.div
                key={i}
                className="h-[3px] rounded-full"
                animate={{
                  width: i === statIndex ? 28 : 10,
                  opacity: i === statIndex ? 0.95 : 0.32,
                }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                style={{ background: "rgba(255,250,244,1)" }}
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
