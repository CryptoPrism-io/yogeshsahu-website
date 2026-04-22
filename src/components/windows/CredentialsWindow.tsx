"use client";

import {
  BarChart3,
  Brain,
  Cloud,
  Cpu,
  Database,
  Flag,
  GraduationCap,
  Landmark,
  Layers,
  PenLine,
  Server,
  Shield,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import type { ReactNode } from "react";

interface Credential {
  name: string;
  org: string;
  detail: string;
  icon: ReactNode;
  accent: string;
}

interface CredentialCategory {
  title: string;
  items: Credential[];
}

const CATEGORIES: CredentialCategory[] = [
  {
    title: "Cloud and Infrastructure",
    items: [
      {
        name: "Professional Cloud Architect",
        org: "Google Cloud",
        detail: "Distributed systems, enterprise cloud architecture, and reliability.",
        icon: <Cloud size={20} strokeWidth={1.5} />,
        accent: "var(--ys-accent)",
      },
      {
        name: "Professional Data Engineer",
        org: "Google Cloud",
        detail: "BigQuery pipelines, Dataflow orchestration, and data platform design.",
        icon: <Database size={20} strokeWidth={1.5} />,
        accent: "var(--ys-highlight)",
      },
      {
        name: "AZ-305 Solutions Architect Expert",
        org: "Microsoft Azure",
        detail: "Identity, governance, networking, and continuity planning.",
        icon: <Layers size={20} strokeWidth={1.5} />,
        accent: "var(--ys-text)",
      },
      {
        name: "DP-203 Data Engineering",
        org: "Microsoft Azure",
        detail: "Synapse, Data Factory, and real-time engineering workflows.",
        icon: <Server size={20} strokeWidth={1.5} />,
        accent: "var(--ys-highlight)",
      },
    ],
  },
  {
    title: "AI and Machine Learning",
    items: [
      {
        name: "Claude Certified Architect",
        org: "Anthropic",
        detail: "Agentic architecture, structured output, and MCP workflows.",
        icon: <Sparkles size={20} strokeWidth={1.5} />,
        accent: "var(--ys-accent)",
      },
      {
        name: "Professional ML Engineer",
        org: "Google Cloud",
        detail: "Model lifecycle planning, deployment, and MLOps operations.",
        icon: <Brain size={20} strokeWidth={1.5} />,
        accent: "var(--ys-highlight)",
      },
      {
        name: "AI-102 Azure AI Engineer",
        org: "Microsoft Azure",
        detail: "Cognitive services, NLP, and production integration.",
        icon: <Sparkles size={20} strokeWidth={1.5} />,
        accent: "var(--ys-text)",
      },
      {
        name: "Deep Learning Fundamentals",
        org: "NVIDIA DLI",
        detail: "Neural network training and GPU-accelerated experimentation.",
        icon: <Cpu size={20} strokeWidth={1.5} />,
        accent: "var(--ys-highlight)",
      },
    ],
  },
  {
    title: "Finance and Analytics",
    items: [
      {
        name: "Bloomberg BMC and ESG",
        org: "Bloomberg",
        detail: "Markets, ESG context, and core investment concepts.",
        icon: <BarChart3 size={20} strokeWidth={1.5} />,
        accent: "var(--ys-highlight)",
      },
      {
        name: "Power BI PL-300",
        org: "Microsoft",
        detail: "DAX modelling, business reporting, and dashboard delivery.",
        icon: <BarChart3 size={20} strokeWidth={1.5} />,
        accent: "var(--ys-accent)",
      },
      {
        name: "Investment Banking Diploma",
        org: "LIBF",
        detail: "Corporate finance and financial markets fundamentals.",
        icon: <Landmark size={20} strokeWidth={1.5} />,
        accent: "var(--ys-text)",
      },
      {
        name: "CSPO",
        org: "PMI / Scrum Alliance",
        detail: "Product ownership and agile delivery leadership.",
        icon: <Target size={20} strokeWidth={1.5} />,
        accent: "var(--ys-highlight)",
      },
    ],
  },
  {
    title: "Academic and Recognition",
    items: [
      {
        name: "MS Financial Technology",
        org: "Strathclyde Business School",
        detail: "Merit, dissertation topper (82/100), TimesFM applied research.",
        icon: <GraduationCap size={20} strokeWidth={1.5} />,
        accent: "var(--ys-accent)",
      },
      {
        name: "CA-CPT Cleared",
        org: "ICAI",
        detail: "All India Rank 42 in a 500,000+ candidate cohort.",
        icon: <Trophy size={20} strokeWidth={1.5} />,
        accent: "var(--ys-accent-strong)",
      },
      {
        name: "GMAT 690",
        org: "GMAC",
        detail: "90th percentile for graduate management admission testing.",
        icon: <PenLine size={20} strokeWidth={1.5} />,
        accent: "var(--ys-text)",
      },
      {
        name: "DPIIT Recognised Startup",
        org: "Government of India",
        detail: "CryptoPrism / Trinetry Infotech Pvt Ltd.",
        icon: <Flag size={20} strokeWidth={1.5} />,
        accent: "var(--ys-accent)",
      },
      {
        name: "SC-900 Security Fundamentals",
        org: "Microsoft Azure",
        detail: "Identity, compliance, and foundational security principles.",
        icon: <Shield size={20} strokeWidth={1.5} />,
        accent: "var(--ys-highlight)",
      },
    ],
  },
];

export default function CredentialsWindow() {
  const total = CATEGORIES.reduce((sum, category) => sum + category.items.length, 0);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          Certifications and Education
        </p>
        <span
          className="rounded-full px-2.5 py-1 text-[10px] font-bold"
          style={{
            fontFamily: "var(--font-mono)",
            background: "var(--ys-accent)",
            color: "var(--ys-surface)",
          }}
        >
          {total}
        </span>
      </div>

      <div className="flex flex-col gap-6">
        {CATEGORIES.map((category) => (
          <section key={category.title}>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-px flex-1" style={{ background: "var(--ys-border)" }} />
              <span
                className="shrink-0 text-[9px] font-bold uppercase tracking-[0.15em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
              >
                {category.title}
              </span>
              <div className="h-px flex-1" style={{ background: "var(--ys-border)" }} />
            </div>

            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
              {category.items.map((item) => (
                <article
                  key={item.name}
                  className="group rounded-xl border p-3.5 transition-all"
                  style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-105"
                      style={{
                        background: "color-mix(in srgb, white 86%, var(--ys-surface-strong) 14%)",
                        color: item.accent,
                        border: `1.5px solid color-mix(in srgb, ${item.accent} 18%, transparent)`,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p
                        className="mb-0.5 text-[11.5px] font-bold leading-tight"
                        style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="mb-0.5 text-[8.5px] font-semibold uppercase tracking-[0.12em]"
                        style={{ fontFamily: "var(--font-mono)", color: item.accent }}
                      >
                        {item.org}
                      </p>
                      <p
                        className="text-[10.5px] leading-[1.5]"
                        style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
                      >
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
