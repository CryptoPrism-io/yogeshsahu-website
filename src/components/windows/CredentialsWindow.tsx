"use client";

import {
  BarChart3,
  Brain,
  Cloud,
  Database,
  Flag,
  GraduationCap,
  Layers,
  PenLine,
  Server,
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
        name: "AWS Data Engineering",
        org: "Amazon Web Services",
        detail: "Data lake architecture, ETL pipelines, and analytics workflows.",
        icon: <Server size={20} strokeWidth={1.5} />,
        accent: "var(--ys-text)",
      },
      {
        name: "Azure Data Infrastructure & Pipelines",
        org: "Microsoft Azure",
        detail: "Data Factory, Synapse, and real-time engineering workflows.",
        icon: <Layers size={20} strokeWidth={1.5} />,
        accent: "var(--ys-highlight)",
      },
    ],
  },
  {
    title: "AI, Analytics and Finance",
    items: [
      {
        name: "Professional ML Engineer",
        org: "Google Cloud",
        detail: "Model lifecycle planning, deployment, and MLOps operations.",
        icon: <Brain size={20} strokeWidth={1.5} />,
        accent: "var(--ys-accent)",
      },
      {
        name: "Bloomberg Market Concepts",
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
        accent: "var(--ys-text)",
      },
    ],
  },
  {
    title: "Leadership and Management",
    items: [
      {
        name: "PMP",
        org: "PMI",
        detail: "Project management professional — planning, execution, and delivery.",
        icon: <Target size={20} strokeWidth={1.5} />,
        accent: "var(--ys-accent)",
      },
      {
        name: "Product Management",
        org: "PMI",
        detail: "Product strategy, roadmapping, and stakeholder alignment.",
        icon: <Sparkles size={20} strokeWidth={1.5} />,
        accent: "var(--ys-highlight)",
      },
      {
        name: "CSPO",
        org: "Scrum Alliance",
        detail: "Certified Scrum Product Owner — agile delivery leadership.",
        icon: <Target size={20} strokeWidth={1.5} />,
        accent: "var(--ys-text)",
      },
    ],
  },
  {
    title: "Academic and Recognition",
    items: [
      {
        name: "MSc Financial Technology",
        org: "Strathclyde Business School, UK",
        detail: "Merit, dissertation topper (82/100). AML false positives 87% → 59%.",
        icon: <GraduationCap size={20} strokeWidth={1.5} />,
        accent: "var(--ys-accent)",
      },
      {
        name: "BCom Commerce — Dean's List",
        org: "BMCC, Pune",
        detail: "Brihan Maharashtra College of Commerce.",
        icon: <GraduationCap size={20} strokeWidth={1.5} />,
        accent: "var(--ys-highlight)",
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
        detail: "Trinetry Infotech Pvt Ltd.",
        icon: <Flag size={20} strokeWidth={1.5} />,
        accent: "var(--ys-accent)",
      },
      {
        name: "Gold Medal — Academic Excellence",
        org: "",
        detail: "Recognised for outstanding academic performance.",
        icon: <Trophy size={20} strokeWidth={1.5} />,
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
