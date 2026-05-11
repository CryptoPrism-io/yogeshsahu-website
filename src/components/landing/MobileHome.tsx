"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Briefcase, FileText, Terminal, Award, FolderOpen } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import AboutWindow from "@/components/windows/AboutWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import ExperienceWindow from "@/components/windows/ExperienceWindow";
import CredentialsWindow from "@/components/windows/CredentialsWindow";
import DiagnosticWindow from "@/components/windows/DiagnosticWindow";
import { useState, type ReactNode } from "react";
import Image from "next/image";

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
  return (
    <div className="fixed inset-0 overflow-y-auto" style={{ background: "var(--ys-surface)" }}>
      <motion.header
        className="px-5 pt-16 pb-6"
        style={{ background: "var(--ys-bg)" }}
        variants={fadeUp(0, 18)}
        initial="initial"
        animate="animate"
      >
        <div className="mb-4 flex items-center gap-4">
          <Image
            src="/images/profile.jpg"
            alt="Yogesh Sahu"
            width={80}
            height={80}
            className="h-20 w-20 shrink-0 rounded-full object-cover"
          />
          <div>
            <h1
              className="mb-1 text-[2rem] font-black uppercase leading-[0.95]"
              style={{ fontFamily: "var(--font-headline)", color: "var(--ys-surface)" }}
            >
              Yogesh Sahu
            </h1>
            <p
              className="text-[9px] font-bold uppercase tracking-[0.22em]"
              style={{ fontFamily: "var(--font-mono)", color: "rgba(255,239,225,0.6)" }}
            >
              FOUNDER | AI-NATIVE BUILDER | CTO
            </p>
          </div>
        </div>
        <p
          className="mb-5 text-[13px] leading-[1.8]"
          style={{ fontFamily: "var(--font-body)", color: "rgba(255,239,225,0.82)" }}
        >
          I build and ship AI-native B2B and B2C products end-to-end — 6+ production-grade apps
          in 6 months, not MVPs.
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: "6+", label: "production apps shipped" },
            { value: "2M+", label: "lines of code" },
            { value: "1B+", label: "datapoints/day" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border px-3 py-2.5"
              style={{
                borderColor: "rgba(255,244,233,0.18)",
                background: "rgba(255,248,241,0.12)",
              }}
            >
              <p
                className="text-[1rem] font-bold"
                style={{ fontFamily: "var(--font-headline)", color: "var(--ys-surface)" }}
              >
                {item.value}
              </p>
              <p
                className="text-[8px] uppercase tracking-[0.1em]"
                style={{ fontFamily: "var(--font-mono)", color: "rgba(255,239,225,0.6)" }}
              >
                {item.label}
              </p>
            </div>
          ))}
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
