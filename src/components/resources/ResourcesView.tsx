"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Users,
  FileCode,
  BookOpen,
  Wrench,
  Sparkles,
  BarChart3,
  List,
  Users2,
  Cog,
  Rocket,
} from "lucide-react";
import InvestorPool from "./InvestorPool";
import InvestorDashboard from "./InvestorDashboard";
import PlaybookList from "./PlaybookList";
import ToolkitList from "./ToolkitList";
import CommunityList from "./CommunityList";
import type { DashboardFilters } from "./InvestorDashboard";
import investorsData from "@/data/investors.json";

type Hub = "founders" | "builders";
type TabType = "investors" | "playbooks" | "decks" | "toolkit" | "community";
type InvestorView = "list" | "dashboard";

const HUB_TABS: Record<Hub, TabType[]> = {
  founders: ["investors", "playbooks", "decks", "community"],
  builders: ["toolkit", "playbooks", "community"],
};

const TAB_META: Record<TabType, { label: string; icon: React.ReactNode }> = {
  investors: { label: "Investors", icon: <Users size={15} /> },
  playbooks: { label: "Playbooks", icon: <BookOpen size={15} /> },
  decks: { label: "Decks & Templates", icon: <FileCode size={15} /> },
  toolkit: { label: "Toolkit", icon: <Wrench size={15} /> },
  community: { label: "Community", icon: <Users2 size={15} /> },
};

export default function FounderHubView() {
  const [hub, setHub] = useState<Hub>("founders");
  const [activeTab, setActiveTab] = useState<TabType>("investors");
  const [investorView, setInvestorView] = useState<InvestorView>("list");
  const [dashboardFilters, setDashboardFilters] = useState<DashboardFilters | null>(
    null
  );
  const [filterKey, setFilterKey] = useState(0);

  const handleHubChange = (next: Hub) => {
    setHub(next);
    setActiveTab(HUB_TABS[next][0]);
    setDashboardFilters(null);
    setInvestorView("list");
  };

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
      {/* Resources Hero */}
      <header className="space-y-4">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-accent)" }}
        >
          Resources · Founder Hub + Builder Hub
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
          Resources
        </h1>
        <p
          className="max-w-[60ch] text-[15px] leading-[1.7]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          Two hubs, one place. For founders: an 8,600+ investor directory,
          operating/fundraising/sales playbooks, deck templates, and
          community. For builders: an engineering toolkit, hiring playbooks,
          and architecture notes. Built from the mistakes I made running
          Trinetry and the PGG project.
        </p>
      </header>

      {/* Hub segmented control */}
      <div
        className="inline-flex items-center gap-1 rounded-xl border p-1"
        style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-muted)" }}
        role="tablist"
        aria-label="Resource audience"
      >
        <button
          role="tab"
          aria-selected={hub === "founders"}
          onClick={() => handleHubChange("founders")}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-mono font-semibold transition-all"
          style={
            hub === "founders"
              ? {
                  background: "var(--ys-accent)",
                  color: "var(--ys-surface)",
                }
              : {
                  background: "transparent",
                  color: "var(--ys-text-soft)",
                }
          }
        >
          <Rocket size={13} />
          For Founders
        </button>
        <button
          role="tab"
          aria-selected={hub === "builders"}
          onClick={() => handleHubChange("builders")}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-mono font-semibold transition-all"
          style={
            hub === "builders"
              ? {
                  background: "var(--ys-accent)",
                  color: "var(--ys-surface)",
                }
              : {
                  background: "transparent",
                  color: "var(--ys-text-soft)",
                }
          }
        >
          <Cog size={13} />
          For Builders
        </button>
      </div>

      {/* Hub description */}
      <p
        className="-mt-4 text-[12.5px] leading-[1.6]"
        style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
      >
        {hub === "founders"
          ? "Fundraising, operating, selling, and staying sane. Everything a founder needs before and during the journey."
          : "Tools, hiring, and engineering practice. Everything a technical founder or lead engineer reaches for daily."}
      </p>

      {/* Navigation Tabs */}
      <div className="border-b" style={{ borderColor: "var(--ys-border)" }}>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {HUB_TABS[hub].map((tab) => {
            const meta = TAB_META[tab];
            const isActive = activeTab === tab;
            const count =
              tab === "investors"
                ? investorsData.length.toLocaleString()
                : undefined;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-mono font-semibold transition-all shrink-0 ${
                  isActive
                    ? "border-[var(--ys-accent)] text-[var(--ys-accent-strong)] bg-[rgba(207,79,39,0.06)]"
                    : "border-transparent text-[var(--ys-text-soft)] hover:text-[var(--ys-text)] hover:bg-[var(--ys-surface-strong)]"
                }`}
              >
                {meta.icon}
                <span>{meta.label}</span>
                {count && (
                  <span
                    className="rounded px-2 py-0.5 text-[10px] font-mono border"
                    style={{
                      background: "rgba(11, 141, 128, 0.1)",
                      borderColor: "rgba(11, 141, 128, 0.3)",
                      color: "var(--ys-highlight)",
                    }}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${hub}-${activeTab}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
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

      {activeTab === "playbooks" && <PlaybookList audience={hub} />}

      {activeTab === "toolkit" && <ToolkitList />}

      {activeTab === "community" && <CommunityList audience={hub} />}

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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
