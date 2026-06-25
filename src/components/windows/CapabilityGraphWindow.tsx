"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, FileText, FolderOpen, User } from "lucide-react";
import { fadeUp } from "@/lib/motion";

type CapabilityId = "finance" | "leadership" | "technology";
type SubdomainId =
  | "markets"
  | "pricing"
  | "signals"
  | "discovery"
  | "alignment"
  | "delivery"
  | "ai"
  | "data"
  | "systems";

interface CapabilityGraphWindowProps {
  onOpen: (id: string) => void;
}

interface ProofLink {
  label: string;
  href: string;
  note: string;
}

interface Subdomain {
  id: SubdomainId;
  label: string;
  detail: string;
}

const CAPABILITIES: Record<
  CapabilityId,
  {
    name: string;
    title: string;
    summary: string;
    skills: string[];
    subdomains: Subdomain[];
    color: string;
    proofs: ProofLink[];
  }
> = {
  finance: {
    name: "Finance",
    title: "FinTech and market systems under real operating pressure",
    summary:
      "This node covers financial systems, market context, pricing logic, signal design, and data products built for actual trading and analytical workflows.",
    skills: ["FinTech", "Quant Systems", "Pricing Logic", "Market Data", "Decision Tools"],
    subdomains: [
      { id: "markets", label: "Markets", detail: "Live market context, trading surfaces, and financial product logic." },
      { id: "pricing", label: "Pricing", detail: "Modeling decisions, valuation framing, and risk-aware system behavior." },
      { id: "signals", label: "Signals", detail: "Indicators, screening, and analytical workflows for operator decisions." },
    ],
    color: "var(--ys-accent)",
    proofs: [
      {
        label: "On-chain Analytics",
        href: "/projects/cryptoprism-onchain",
        note: "1B+ datapoints/day across 100+ coins via BigQuery pipeline.",
      },
      {
        label: "CryptoPrism API",
        href: "/projects/cryptoprism-api",
        note: "FastAPI microservices for analytics and trading endpoints.",
      },
      {
        label: "TimesFM Bot",
        href: "/projects/timesfm-trading-bot",
        note: "ML-powered trading signals across 100 coins.",
      },
    ],
  },
  leadership: {
    name: "Leadership",
    title: "Discovery, influence, and delivery ownership without waiting for formal authority",
    summary:
      "This is the consulting and operator layer: framing the problem, aligning stakeholders, leading discovery, and keeping execution commercially credible.",
    skills: ["Discovery", "SOW Thinking", "Stakeholder Alignment", "Execution Clarity", "Influence"],
    subdomains: [
      { id: "discovery", label: "Discovery", detail: "Problem framing, discovery sessions, and engagement definition." },
      { id: "alignment", label: "Align", detail: "Cross-functional trust, expectation management, and direction setting." },
      { id: "delivery", label: "Delivery", detail: "Execution pressure, sequencing, and keeping delivery commercially credible." },
    ],
    color: "var(--ys-highlight)",
    proofs: [
      {
        label: "Kari Mobile Game",
        href: "https://apps.apple.com/app/kari-and-the-lost-shrines",
        note: "Shipped on minimal budget through vision alignment and fast execution.",
      },
      {
        label: "CryptoPrism Platform",
        href: "https://cryptoprism.io",
        note: "Product direction, delivery judgment, and ongoing system ownership.",
      },
      {
        label: "Open About Window",
        href: "#about",
        note: "Leadership context, consulting fit, and working style.",
      },
    ],
  },
  technology: {
    name: "Technology",
    title: "Hands-on architecture, AI-native systems, and production-grade execution",
    summary:
      "This node is the technical core: architecture decisions, AI integration, APIs, data pipelines, and the ability to stay close to code while leading the system.",
    skills: ["Architecture", "AI Systems", "FastAPI", "PostgreSQL", "Cloud Data"],
    subdomains: [
      { id: "ai", label: "AI", detail: "Applied AI flows, orchestration, and product-level integration." },
      { id: "data", label: "Data", detail: "Pipelines, schemas, movement, and analytical system design." },
      { id: "systems", label: "Systems", detail: "Architecture, APIs, reliability, and production execution." },
    ],
    color: "var(--ys-text)",
    proofs: [
      {
        label: "Pratyaksha",
        href: "/projects/pratyaksha",
        note: "4-agent AI journaling pipeline in production.",
      },
      {
        label: "News Engine",
        href: "/projects/cryptoprism-news-fetcher",
        note: "AI-aware content and signal pipeline feeding spot trading.",
      },
      {
        label: "AI Bharatverse",
        href: "/projects/ai-bharatverse",
        note: "Interactive AI platform for Indian history. Built for Times of India.",
      },
    ],
  },
};

const DOMAIN_ORDER: CapabilityId[] = ["finance", "leadership", "technology"];

export default function CapabilityGraphWindow({ onOpen }: CapabilityGraphWindowProps) {
  const [activeNode, setActiveNode] = useState<CapabilityId>("technology");
  const [activeSubdomain, setActiveSubdomain] = useState<SubdomainId>("ai");
  const active = CAPABILITIES[activeNode];
  const activeSubdomainDetail =
    active.subdomains.find((subdomain) => subdomain.id === activeSubdomain) ?? active.subdomains[0];

  useEffect(() => {
    const handleCapabilityFocus = (event: Event) => {
      const customEvent = event as CustomEvent<{ domainId?: CapabilityId; subdomainId?: SubdomainId | null }>;
      const domainId = customEvent.detail?.domainId;
      const subdomainId = customEvent.detail?.subdomainId;

      if (domainId && CAPABILITIES[domainId]) {
        setActiveNode(domainId);
        const nextSubdomain =
          CAPABILITIES[domainId].subdomains.find((subdomain) => subdomain.id === subdomainId) ??
          CAPABILITIES[domainId].subdomains[0];
        setActiveSubdomain(nextSubdomain.id);
      }
    };

    window.addEventListener("capability-focus", handleCapabilityFocus as EventListener);

    return () => {
      window.removeEventListener("capability-focus", handleCapabilityFocus as EventListener);
    };
  }, []);

  const openProof = (proof: ProofLink) => {
    if (proof.href === "#about") {
      onOpen("about");
      return;
    }

    window.open(proof.href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="p-6 md:p-8">
      {/* ── Row 1: Primary domain tabs ── */}
      <div
        className="mb-0 overflow-hidden rounded-t-xl border border-b-0"
        style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}
      >
        <div className="flex items-stretch">
          {DOMAIN_ORDER.map((id, i) => {
            const config = CAPABILITIES[id];
            const isActive = activeNode === id;
            return (
              <button
                key={id}
                onClick={() => {
                  setActiveNode(id);
                  setActiveSubdomain(CAPABILITIES[id].subdomains[0].id);
                }}
                className="focus-ring relative flex flex-1 items-center justify-center gap-2.5 px-4 py-3.5 transition-colors"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: isActive ? "var(--ys-text)" : "var(--ys-text-soft)",
                  background: isActive ? "var(--ys-surface)" : "transparent",
                  borderRight: i < DOMAIN_ORDER.length - 1 ? `1px solid var(--ys-border)` : "none",
                  borderBottom: isActive ? "2px solid var(--ys-accent)" : "2px solid transparent",
                }}
              >
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ background: config.color }}
                />
                {config.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Row 2: Subdomain secondary nav ── */}
      <div
        className="mb-5 flex items-center gap-0 overflow-hidden rounded-b-xl border"
        style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)" }}
      >
        <p
          className="shrink-0 border-r px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.22em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)", borderColor: "var(--ys-border)" }}
        >
          Focus
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode}
            className="flex items-center gap-1 px-3 py-2"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.15 }}
          >
            {active.subdomains.map((subdomain) => {
              const isActive = activeSubdomain === subdomain.id;
              return (
                <button
                  key={subdomain.id}
                  onClick={() => setActiveSubdomain(subdomain.id)}
                  className="focus-ring rounded-lg px-3.5 py-1.5 text-[11px] uppercase tracking-[0.1em] transition-all"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: isActive ? 700 : 500,
                    background: isActive ? "var(--ys-text)" : "transparent",
                    color: isActive ? "var(--ys-surface)" : "var(--ys-text-soft)",
                  }}
                >
                  {subdomain.label}
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        className="rounded-xl border p-5"
        variants={fadeUp(0.14, 10)}
        initial="initial"
        animate="animate"
        style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p
              className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              Active Node
            </p>
            <h3
              className="max-w-[28ch] text-[1.45rem] font-black leading-[1.05]"
              style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
            >
              {active.title}
            </h3>
          </div>
          <span
            className="rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em]"
            style={{
              fontFamily: "var(--font-mono)",
              borderColor: "var(--ys-border)",
              color: "var(--ys-text-soft)",
            }}
          >
            {active.name}
          </span>
        </div>

        <p
          className="mb-5 text-[15px] leading-[1.75]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          {active.summary}
        </p>

        <div className="mb-5 rounded-xl border p-4" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)" }}>
          <div className="mb-3 flex items-center gap-2">
            <FileText size={14} strokeWidth={1.8} color="var(--ys-accent)" />
            <p
              className="text-[10px] font-bold uppercase tracking-[0.16em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              Core Skills
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {active.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border px-2.5 py-1 text-[10px]"
                style={{
                  fontFamily: "var(--font-mono)",
                  borderColor: "var(--ys-border)",
                  color: "var(--ys-text)",
                  background: "rgba(255,248,241,0.94)",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-5 rounded-xl border p-4" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)" }}>
          <div className="mb-3 flex items-center gap-2">
            <User size={14} strokeWidth={1.8} color="var(--ys-highlight)" />
            <p
              className="text-[10px] font-bold uppercase tracking-[0.16em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              Active Focus — {activeSubdomainDetail.label}
            </p>
          </div>
          <p
            className="text-[14px] leading-[1.75]"
            style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
          >
            {activeSubdomainDetail.detail}
          </p>
        </div>

        <div className="mb-5">
          <div className="mb-3 flex items-center gap-2">
            <FolderOpen size={14} strokeWidth={1.8} color="var(--ys-highlight)" />
            <p
              className="text-[10px] font-bold uppercase tracking-[0.16em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              Proof Links
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {active.proofs.map((proof) => (
              <button
                key={proof.label}
                onClick={() => openProof(proof)}
                className="focus-ring rounded-xl border p-4 text-left transition-colors"
                style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)" }}
              >
                <div className="mb-1 flex items-center justify-between gap-3">
                  <p
                    className="text-[12px] font-bold uppercase tracking-[0.08em]"
                    style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
                  >
                    {proof.label}
                  </p>
                  <ArrowUpRight size={14} strokeWidth={1.8} color="var(--ys-accent-strong)" />
                </div>
                <p
                  className="text-[14px] leading-[1.75]"
                  style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
                >
                  {proof.note}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <button
            onClick={() => onOpen("projects")}
            className="focus-ring rounded-xl border px-4 py-3 text-left transition-colors"
            style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)" }}
          >
            <div className="mb-1 flex items-center gap-2">
              <FolderOpen size={14} strokeWidth={1.8} color="var(--ys-accent)" />
              <p
                className="text-[10px] font-bold uppercase tracking-[0.16em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
              >
                Related Window
              </p>
            </div>
            <p
              className="text-[12px] font-bold uppercase tracking-[0.08em]"
              style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
            >
              Open projects
            </p>
          </button>

          <button
            onClick={() => onOpen("about")}
            className="focus-ring rounded-xl border px-4 py-3 text-left transition-colors"
            style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)" }}
          >
            <div className="mb-1 flex items-center gap-2">
              <User size={14} strokeWidth={1.8} color="var(--ys-highlight)" />
              <p
                className="text-[10px] font-bold uppercase tracking-[0.16em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
              >
                Related Window
              </p>
            </div>
            <p
              className="text-[12px] font-bold uppercase tracking-[0.08em]"
              style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
            >
              Open profile
            </p>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
