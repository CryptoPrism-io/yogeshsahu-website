"use client";

import { useState } from "react";
import { Users, FileCode, BookOpen, Wrench, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import InvestorPool from "./InvestorPool";
import Link from "next/link";

type TabType = "investors" | "decks" | "playbooks" | "toolkit";

export default function ResourcesView() {
  const [activeTab, setActiveTab] = useState<TabType>("investors");

  return (
    <div className="space-y-8 pb-12">
      {/* Navigation Tabs */}
      <div className="border-b" style={{ borderColor: "var(--ys-border)" }}>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("investors")}
            className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-mono font-semibold transition-all shrink-0 ${
              activeTab === "investors"
                ? "border-[var(--ys-accent)] text-[var(--ys-accent-strong)] bg-[rgba(207,79,39,0.06)]"
                : "border-transparent text-[var(--ys-text-soft)] hover:text-[var(--ys-text)] hover:bg-[var(--ys-surface-strong)]"
            }`}
          >
            <Users size={15} />
            <span>Investors Pool (2,500+)</span>
            <span className="rounded px-2 py-0.5 text-[10px] font-mono border"
                  style={{ background: "rgba(11, 141, 128, 0.1)", borderColor: "rgba(11, 141, 128, 0.3)", color: "var(--ys-highlight)" }}>
              Active
            </span>
          </button>

          <button
            onClick={() => setActiveTab("decks")}
            className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-mono font-semibold transition-all shrink-0 ${
              activeTab === "decks"
                ? "border-[var(--ys-accent)] text-[var(--ys-accent-strong)] bg-[rgba(207,79,39,0.06)]"
                : "border-transparent text-[var(--ys-text-soft)] hover:text-[var(--ys-text)] hover:bg-[var(--ys-surface-strong)]"
            }`}
          >
            <FileCode size={15} />
            <span>Pitch Decks & Samples</span>
          </button>

          <button
            onClick={() => setActiveTab("playbooks")}
            className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-mono font-semibold transition-all shrink-0 ${
              activeTab === "playbooks"
                ? "border-[var(--ys-accent)] text-[var(--ys-accent-strong)] bg-[rgba(207,79,39,0.06)]"
                : "border-transparent text-[var(--ys-text-soft)] hover:text-[var(--ys-text)] hover:bg-[var(--ys-surface-strong)]"
            }`}
          >
            <BookOpen size={15} />
            <span>Playbooks & Architecture</span>
          </button>

          <button
            onClick={() => setActiveTab("toolkit")}
            className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-mono font-semibold transition-all shrink-0 ${
              activeTab === "toolkit"
                ? "border-[var(--ys-accent)] text-[var(--ys-accent-strong)] bg-[rgba(207,79,39,0.06)]"
                : "border-transparent text-[var(--ys-text-soft)] hover:text-[var(--ys-text)] hover:bg-[var(--ys-surface-strong)]"
            }`}
          >
            <Wrench size={15} />
            <span>Founder & Engineer Toolkit</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "investors" && <InvestorPool />}

      {activeTab === "decks" && (
        <div className="space-y-6">
          <div className="rounded-2xl border p-6 md:p-8 space-y-4" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest" style={{ color: "var(--ys-accent-strong)" }}>
              <Sparkles size={14} /> Founder Resources
            </div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}>
              High-Traction Seed & Series-A Pitch Deck Blueprints
            </h2>
            <p className="text-sm max-w-3xl leading-relaxed" style={{ color: "var(--ys-text-soft)" }}>
              Curated slide-by-slide structure used by top AI & Fintech startups to convey product-market fit, unit economics, technical moats, and vision to angel networks and VC partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border p-5 space-y-3" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-base" style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}>10-Slide Seed Pitch Deck Checklist</h3>
                <span className="rounded px-2 py-0.5 text-[10px] font-mono border"
                      style={{ background: "rgba(207, 79, 39, 0.08)", borderColor: "rgba(207, 79, 39, 0.25)", color: "var(--ys-accent-strong)" }}>
                  Template
                </span>
              </div>
              <ul className="space-y-2 text-xs" style={{ color: "var(--ys-text-soft)" }}>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="shrink-0" style={{ color: "var(--ys-highlight)" }} /> 1. Title & One-Line Value Proposition</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="shrink-0" style={{ color: "var(--ys-highlight)" }} /> 2. The Urgent Problem & Market Pain</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="shrink-0" style={{ color: "var(--ys-highlight)" }} /> 3. The Product Solution & AI/Tech Demo</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="shrink-0" style={{ color: "var(--ys-highlight)" }} /> 4. Market Size (TAM, SAM, SOM)</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="shrink-0" style={{ color: "var(--ys-highlight)" }} /> 5. Business Model & Unit Economics</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="shrink-0" style={{ color: "var(--ys-highlight)" }} /> 6. Proprietary Tech / AI Architecture Moat</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="shrink-0" style={{ color: "var(--ys-highlight)" }} /> 7. Early Traction & Metrics</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="shrink-0" style={{ color: "var(--ys-highlight)" }} /> 8. Competitive Landscape</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="shrink-0" style={{ color: "var(--ys-highlight)" }} /> 9. Core Founder & Technical Team</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="shrink-0" style={{ color: "var(--ys-highlight)" }} /> 10. The Ask & Milestones Timeline</li>
              </ul>
            </div>

            <div className="rounded-xl border p-5 space-y-4 flex flex-col justify-between" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-base" style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}>Fractional CTO Deck Audit</h3>
                  <span className="rounded px-2 py-0.5 text-[10px] font-mono border"
                        style={{ background: "rgba(11, 141, 128, 0.1)", borderColor: "rgba(11, 141, 128, 0.3)", color: "var(--ys-highlight)" }}>
                    Advisory
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--ys-text-soft)" }}>
                  Before pitching to VCs, ensure your technical architecture, AI scalability plan, and security compliance hold up under institutional investor due diligence.
                </p>
              </div>

              <div className="pt-4 border-t" style={{ borderColor: "var(--ys-border)" }}>
                <Link
                  href="/work"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-lg text-xs font-mono font-semibold py-2.5 transition-colors"
                  style={{ background: "var(--ys-accent)", color: "#ffffff" }}
                >
                  Review Technical Case Studies <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "playbooks" && (
        <div className="space-y-6">
          <div className="rounded-2xl border p-6 md:p-8 space-y-4" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest" style={{ color: "var(--ys-highlight)" }}>
              <Sparkles size={14} /> Architecture Playbooks
            </div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}>
              Fractional CTO & AI Engineering Frameworks
            </h2>
            <p className="text-sm max-w-3xl leading-relaxed" style={{ color: "var(--ys-text-soft)" }}>
              Step-by-step technical playbooks for scaling AI applications, fintech payment compliance, high-throughput microservices, and lean engineering teams.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="rounded-xl border p-5 space-y-3" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}>
              <div className="text-xs font-mono" style={{ color: "var(--ys-accent)" }}>Playbook #01</div>
              <h3 className="font-semibold text-base" style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}>LLM & Multi-Agent Stack Blueprint</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--ys-text-soft)" }}>
                Architecting deterministic LLM pipelines, vector indexing, RAG fallback chains, and sub-agent orchestration for zero latency.
              </p>
            </div>

            <div className="rounded-xl border p-5 space-y-3" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}>
              <div className="text-xs font-mono" style={{ color: "var(--ys-accent)" }}>Playbook #02</div>
              <h3 className="font-semibold text-base" style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}>Fintech Ledger & Payments Compliance</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--ys-text-soft)" }}>
                Double-entry immutable ledgers, RBI/PCI-DSS compliance pipelines, webhook resilience, and real-time fraud scoring.
              </p>
            </div>

            <div className="rounded-xl border p-5 space-y-3" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}>
              <div className="text-xs font-mono" style={{ color: "var(--ys-accent)" }}>Playbook #03</div>
              <h3 className="font-semibold text-base" style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}>Zero to 100k WAU Infra Scaling</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--ys-text-soft)" }}>
                Cost-effective cloud infrastructure setups (AWS / GCP / Cloudflare Edge), caching strategies, and automated CI/CD.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "toolkit" && (
        <div className="space-y-6">
          <div className="rounded-2xl border p-6 md:p-8 space-y-4" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest" style={{ color: "var(--ys-accent)" }}>
              <Sparkles size={14} /> Solopreneur & Engineer Stack
            </div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}>
              Curated Tools for Founders & Tech Builders
            </h2>
            <p className="text-sm max-w-3xl leading-relaxed" style={{ color: "var(--ys-text-soft)" }}>
              Handpicked tools, open-source AI repos, infrastructure providers, and automation scripts to accelerate MVP development without bloating headcount.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-2" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}>
              <h4 className="font-semibold text-sm" style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}>🤖 AI & Agentic Development</h4>
              <p className="text-xs" style={{ color: "var(--ys-text-soft)" }}>LangChain, LlamaIndex, Ollama, Vercel AI SDK, Supabase Vector, Pinecone.</p>
            </div>
            <div className="rounded-xl border p-4 space-y-2" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}>
              <h4 className="font-semibold text-sm" style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}>⚡ Core Tech Stack</h4>
              <p className="text-xs" style={{ color: "var(--ys-text-soft)" }}>Next.js 16, TypeScript, Tailwind CSS, Framer Motion, PostgreSQL, Redis, Cloudflare Workers.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
