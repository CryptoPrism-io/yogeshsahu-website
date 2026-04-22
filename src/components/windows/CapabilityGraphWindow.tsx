"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
        label: "CryptoPrism DB",
        href: "/projects/cryptoprism-db.html",
        note: "1B+ data points/day, multi-database market infrastructure.",
      },
      {
        label: "Forex Pipeline",
        href: "/projects/forex-pipeline.html",
        note: "Trading-time workflow and market session data operations.",
      },
      {
        label: "Pratyaksha",
        href: "/projects/pratyaksha.html",
        note: "130+ technical indicators in a live scanner.",
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
        href: "/projects/pratyaksha.html",
        note: "Real-time scanner connected to live data and indicator engines.",
      },
      {
        label: "News Engine",
        href: "/projects/news-fetcher.html",
        note: "AI-aware content and signal pipeline.",
      },
      {
        label: "CryptoPrism Screener",
        href: "/projects/cryptoprism-screener.html",
        note: "Interface and backend execution for live analysis workflows.",
      },
    ],
  },
};

const NODES: Array<{
  id: CapabilityId;
  x: number;
  y: number;
}> = [
  { id: "finance", x: 114, y: 96 },
  { id: "leadership", x: 334, y: 96 },
  { id: "technology", x: 224, y: 236 },
];

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
      <motion.div
          className="mb-6 rounded-xl border p-5"
        variants={fadeUp(0, 12)}
        initial="initial"
        animate="animate"
        style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}
      >
        <p
          className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          Capability Graph
        </p>
        <h2
          className="mb-3 text-[1.85rem] font-black italic leading-[1.05]"
          style={{ fontFamily: "var(--font-serif-display)", color: "var(--ys-text)" }}
        >
          One operating shape.
          <br />
          Three proof-backed nodes.
        </h2>
        <p
          className="max-w-3xl text-[13px] leading-[1.85]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          The landing-page mark is now a hierarchy, not a badge. Three primary domains define the operating
          model, and each one expands into subdomains with direct proof of work behind it.
        </p>
      </motion.div>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          className="rounded-xl border p-5"
          variants={fadeUp(0.08, 10)}
          initial="initial"
          animate="animate"
          style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}
        >
          <div className="mb-4 flex items-center justify-between">
            <p
              className="text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              Interactive Map
            </p>
            <p
              className="text-[9px] uppercase tracking-[0.14em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              domains on top / subdomains underneath
            </p>
          </div>

          <div className="rounded-[28px] border p-4" style={{ borderColor: "var(--ys-border)" }}>
            <svg viewBox="0 0 448 352" className="h-auto w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M52 146H396" stroke="rgba(31,20,13,0.08)" strokeWidth="1" strokeDasharray="5 10" />
              <path d="M52 248H396" stroke="rgba(31,20,13,0.06)" strokeWidth="1" strokeDasharray="5 12" />

              {NODES.map((node) => {
                const config = CAPABILITIES[node.id];
                const activeStroke = activeNode === node.id ? "rgba(31,20,13,0.88)" : "rgba(31,20,13,0.3)";
                const activeRing = activeNode === node.id ? "rgba(255,244,233,0.98)" : "rgba(255,244,233,0.76)";

                return (
                  <g key={node.id}>
                    <path
                      d={`M${node.x} ${node.y + 20}L${node.x} 156`}
                      stroke="rgba(31,20,13,0.18)"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                    <circle cx={node.x} cy={node.y} r="21" fill="rgba(255,248,241,0.94)" stroke={activeRing} strokeWidth="8" />
                    <circle cx={node.x} cy={node.y} r="17" fill={config.color} fillOpacity="0.12" stroke={activeStroke} strokeWidth="2.4" />
                    <circle cx={node.x} cy={node.y} r="5.5" fill={config.color} />
                    <text
                      x={node.x}
                      y={node.y - 34}
                      textAnchor="middle"
                      fill="rgba(255,239,225,0.8)"
                      style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em" }}
                    >
                      {config.name.toUpperCase()}
                    </text>
                    {config.subdomains.map((subdomain, index) => {
                      const x = node.x + (index - 1) * 42;
                      const y = index === 1 ? 286 : 226;
                      const isSubdomainActive = activeSubdomain === subdomain.id;

                      return (
                        <g
                          key={subdomain.label}
                          onClick={() => {
                            setActiveNode(node.id);
                            setActiveSubdomain(subdomain.id);
                          }}
                          className="cursor-pointer"
                        >
                          <path
                            d={`M${node.x} 156L${x} ${y}`}
                            stroke={isSubdomainActive ? "rgba(31,20,13,0.46)" : activeNode === node.id ? "rgba(31,20,13,0.38)" : "rgba(31,20,13,0.16)"}
                            strokeWidth={isSubdomainActive ? "1.8" : "1.4"}
                            strokeLinecap="round"
                          />
                          <circle
                            cx={x}
                            cy={y}
                            r={isSubdomainActive ? "10" : "8.5"}
                            fill="rgba(255,248,241,0.94)"
                            stroke={isSubdomainActive ? "rgba(31,20,13,0.28)" : "rgba(31,20,13,0.16)"}
                            strokeWidth="1.4"
                          />
                          <circle cx={x} cy={y} r={isSubdomainActive ? "4.2" : "3.2"} fill={config.color} />
                          <text
                            x={x}
                            y={y + (index === 1 ? 22 : -14)}
                            textAnchor="middle"
                            fill={isSubdomainActive ? "rgba(31,20,13,0.84)" : "rgba(31,20,13,0.54)"}
                            style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.12em" }}
                          >
                            {subdomain.label.toUpperCase()}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {NODES.map((node) => {
              const config = CAPABILITIES[node.id];
              const isActive = activeNode === node.id;

              return (
                <button
                  key={node.id}
                  onClick={() => {
                    setActiveNode(node.id);
                    setActiveSubdomain(CAPABILITIES[node.id].subdomains[0].id);
                  }}
                  className="focus-ring rounded-xl border px-3 py-3 text-left transition-colors"
                  style={{
                    borderColor: isActive ? "rgba(31,20,13,0.28)" : "var(--ys-border)",
                    background: isActive ? "rgba(255, 248, 241, 0.98)" : "var(--ys-surface)",
                  }}
                >
                  <p
                    className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em]"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
                  >
                    {config.name}
                  </p>
                  <p
                    className="text-[11px] leading-[1.55]"
                    style={{ fontFamily: "var(--font-body)", color: "var(--ys-text)" }}
                  >
                    {config.skills.slice(0, 2).join(" / ")}
                  </p>
                </button>
              );
            })}
          </div>
        </motion.div>

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
                className="max-w-[22ch] text-[1.45rem] font-black leading-[1.05]"
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
            className="mb-5 text-[13px] leading-[1.8]"
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
              <FolderOpen size={14} strokeWidth={1.8} color="var(--ys-accent-strong)" />
              <p
                className="text-[10px] font-bold uppercase tracking-[0.16em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
              >
                Subdomains
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {active.subdomains.map((subdomain) => (
                <button
                  key={subdomain.label}
                  onClick={() => setActiveSubdomain(subdomain.id)}
                  className="focus-ring rounded-lg border p-3 text-left transition-colors"
                  style={{
                    borderColor: activeSubdomain === subdomain.id ? "rgba(31,20,13,0.22)" : "var(--ys-border)",
                    background: activeSubdomain === subdomain.id ? "rgba(255,244,233,0.98)" : "rgba(255,248,241,0.94)",
                  }}
                >
                  <p
                    className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em]"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text)" }}
                  >
                    {subdomain.label}
                  </p>
                  <p
                    className="text-[11px] leading-[1.6]"
                    style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
                  >
                    {subdomain.detail}
                  </p>
                </button>
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
                Active Focus
              </p>
            </div>
            <p
              className="mb-1 text-[12px] font-bold uppercase tracking-[0.08em]"
              style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
            >
              {activeSubdomainDetail.label}
            </p>
            <p
              className="text-[12px] leading-[1.75]"
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
                    className="text-[12px] leading-[1.7]"
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
    </div>
  );
}
