"use client";

import { useState } from "react";
import {
  Users,
  FileCode,
  BookOpen,
  Wrench,
  Sparkles,
  BarChart3,
  List,
  Users2,
} from "lucide-react";
import InvestorPool from "./InvestorPool";
import InvestorDashboard from "./InvestorDashboard";
import PlaybookList from "./PlaybookList";
import type { DashboardFilters } from "./InvestorDashboard";
import investorsData from "@/data/investors.json";

type TabType =
  | "investors"
  | "playbooks"
  | "decks"
  | "toolkit"
  | "community";
type InvestorView = "list" | "dashboard";

export default function FounderHubView() {
  const [activeTab, setActiveTab] = useState<TabType>("investors");
  const [investorView, setInvestorView] = useState<InvestorView>("list");
  const [dashboardFilters, setDashboardFilters] = useState<DashboardFilters | null>(
    null
  );
  const [filterKey, setFilterKey] = useState(0);

  const handleDashboardFilter = (f: DashboardFilters) => {
    setDashboardFilters(f);
    setFilterKey((k) => k + 1);
    setInvestorView("list");
  };

  const handleShowDashboard = () => {
    setDashboardFilters(null);
    setInvestorView("dashboard");
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Founder Hub Hero */}
      <header className="space-y-4">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-accent)" }}
        >
          Founder Hub · Built by a 2× Founder
        </p>
        <h1
          className="font-bold uppercase"
          style={{
            fontFamily: "var(--font-headline)",
            color: "var(--ys-text)",
            fontSize: "clamp(40px,6vw,80px)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
          }}
        >
          Founder Hub
        </h1>
        <p
          className="max-w-[60ch] text-[15px] leading-[1.7]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          A curated hub for founders and operators: an 8,600+ investor
          directory, playbooks for operating/hiring/fundraising/sales/mental
          health, deck templates, a founder toolkit, and community. Built
          from the mistakes I made running Trinetry and the PGG project.
        </p>
      </header>

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
            <span>Investors</span>
            <span
              className="rounded px-2 py-0.5 text-[10px] font-mono border"
              style={{
                background: "rgba(11, 141, 128, 0.1)",
                borderColor: "rgba(11, 141, 128, 0.3)",
                color: "var(--ys-highlight)",
              }}
            >
              {investorsData.length.toLocaleString()}
            </span>
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
            <span>Playbooks</span>
            <span
              className="rounded px-2 py-0.5 text-[10px] font-mono border"
              style={{
                background: "rgba(207, 79, 39, 0.1)",
                borderColor: "rgba(207, 79, 39, 0.3)",
                color: "var(--ys-accent-strong)",
              }}
            >
              5
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
            <span>Decks & Templates</span>
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
            <span>Toolkit</span>
          </button>

          <button
            onClick={() => setActiveTab("community")}
            className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-mono font-semibold transition-all shrink-0 ${
              activeTab === "community"
                ? "border-[var(--ys-accent)] text-[var(--ys-accent-strong)] bg-[rgba(207,79,39,0.06)]"
                : "border-transparent text-[var(--ys-text-soft)] hover:text-[var(--ys-text)] hover:bg-[var(--ys-surface-strong)]"
            }`}
          >
            <Users2 size={15} />
            <span>Community</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "investors" && (
        <div className="space-y-6">
          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setDashboardFilters(null);
                setInvestorView("list");
              }}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-mono font-semibold transition-all ${
                investorView === "list"
                  ? "border-[var(--ys-accent)] text-[var(--ys-accent-strong)] bg-[rgba(207,79,39,0.06)]"
                  : "border-[var(--ys-border)] text-[var(--ys-text-soft)] hover:text-[var(--ys-text)]"
              }`}
            >
              <List size={14} />
              List View
            </button>
            <button
              onClick={handleShowDashboard}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-mono font-semibold transition-all ${
                investorView === "dashboard"
                  ? "border-[var(--ys-accent)] text-[var(--ys-accent-strong)] bg-[rgba(207,79,39,0.06)]"
                  : "border-[var(--ys-border)] text-[var(--ys-text-soft)] hover:text-[var(--ys-text)]"
              }`}
            >
              <BarChart3 size={14} />
              Dashboard
            </button>
            {dashboardFilters && investorView === "list" && (
              <span
                className="text-[10px] font-mono ml-2"
                style={{ color: "var(--ys-highlight)" }}
              >
                Filtered from dashboard ·{" "}
                <button
                  onClick={() => {
                    setDashboardFilters(null);
                    setFilterKey((k) => k + 1);
                  }}
                  className="underline hover:no-underline"
                  style={{ color: "var(--ys-accent-strong)" }}
                >
                  Clear
                </button>
              </span>
            )}
          </div>

          {investorView === "dashboard" ? (
            <div style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
              <div className="px-4 sm:px-6 lg:px-8">
                <InvestorDashboard
                  data={investorsData}
                  onFilter={handleDashboardFilter}
                />
              </div>
            </div>
          ) : (
            <InvestorPool
              key={filterKey}
              initialFilters={dashboardFilters || undefined}
            />
          )}
        </div>
      )}

      {activeTab === "playbooks" && <PlaybookList />}

      {activeTab === "decks" && (
        <div
          className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 px-6 text-center"
          style={{ borderColor: "var(--ys-border)" }}
        >
          <div
            className="rounded-xl border px-4 py-2 text-xs font-mono uppercase tracking-widest mb-4"
            style={{
              borderColor: "var(--ys-border)",
              color: "var(--ys-accent-strong)",
              background: "rgba(207, 79, 39, 0.06)",
            }}
          >
            <Sparkles size={14} className="inline mr-2" />
            Q3 2026
          </div>
          <h2
            className="text-xl font-bold mb-2"
            style={{
              fontFamily: "var(--font-headline)",
              color: "var(--ys-text)",
            }}
          >
            Pitch Decks & Templates
          </h2>
          <p
            className="text-sm max-w-md"
            style={{ color: "var(--ys-text-soft)" }}
          >
            Slide-by-slide pitch deck templates, sample decks, data room
            checklist, and one-pager structure. Being prepared for Q3 2026.
          </p>
        </div>
      )}

      {activeTab === "toolkit" && (
        <div
          className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 px-6 text-center"
          style={{ borderColor: "var(--ys-border)" }}
        >
          <div
            className="rounded-xl border px-4 py-2 text-xs font-mono uppercase tracking-widest mb-4"
            style={{
              borderColor: "var(--ys-border)",
              color: "var(--ys-accent)",
              background: "rgba(207, 79, 39, 0.06)",
            }}
          >
            <Sparkles size={14} className="inline mr-2" />
            Q3 2026
          </div>
          <h2
            className="text-xl font-bold mb-2"
            style={{
              fontFamily: "var(--font-headline)",
              color: "var(--ys-text)",
            }}
          >
            Founder & Engineer Toolkit
          </h2>
          <p
            className="text-sm max-w-md"
            style={{ color: "var(--ys-text-soft)" }}
          >
            Curated tools, open-source stacks, and automation scripts — being
            prepared for Q3 2026.
          </p>
        </div>
      )}

      {activeTab === "community" && (
        <div
          className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 px-6 text-center"
          style={{ borderColor: "var(--ys-border)" }}
        >
          <div
            className="rounded-xl border px-4 py-2 text-xs font-mono uppercase tracking-widest mb-4"
            style={{
              borderColor: "var(--ys-border)",
              color: "var(--ys-highlight)",
              background: "rgba(11, 141, 128, 0.06)",
            }}
          >
            <Sparkles size={14} className="inline mr-2" />
            Q3 2026
          </div>
          <h2
            className="text-xl font-bold mb-2"
            style={{
              fontFamily: "var(--font-headline)",
              color: "var(--ys-text)",
            }}
          >
            Community & Reading
          </h2>
          <p
            className="text-sm max-w-md"
            style={{ color: "var(--ys-text-soft)" }}
          >
            Founder communities, podcasts, books, and conferences I
            recommend. Being prepared for Q3 2026.
          </p>
        </div>
      )}
    </div>
  );
}
