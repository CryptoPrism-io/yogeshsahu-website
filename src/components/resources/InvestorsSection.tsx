"use client";

import { useState } from "react";
import { BarChart3, List } from "lucide-react";
import InvestorPool from "./InvestorPool";
import InvestorDashboard from "./InvestorDashboard";
import type { DashboardFilters } from "./InvestorDashboard";
import investorsData from "@/data/investors.json";

type InvestorView = "list" | "dashboard";

/**
 * Investor directory — list ⇄ dashboard toggle. Extracted verbatim from the
 * old ResourcesView tab machine; no behaviour changed.
 */
export default function InvestorsSection() {
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
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setDashboardFilters(null);
            setInvestorView("list");
          }}
          className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-mono font-semibold transition-colors duration-[var(--dur-fast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
            investorView === "list"
              ? "border-[var(--color-accent)] text-[var(--color-accent-strong)] bg-[color-mix(in oklch, var(--color-accent) 6%, transparent)]"
              : "border-[var(--color-rule)] text-[var(--color-ink-2)] hover:text-[var(--color-ink)]"
          }`}
        >
          <List size={14} />
          List View
        </button>
        <button
          onClick={handleShowDashboard}
          className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-mono font-semibold transition-colors duration-[var(--dur-fast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
            investorView === "dashboard"
              ? "border-[var(--color-accent)] text-[var(--color-accent-strong)] bg-[color-mix(in oklch, var(--color-accent) 6%, transparent)]"
              : "border-[var(--color-rule)] text-[var(--color-ink-2)] hover:text-[var(--color-ink)]"
          }`}
        >
          <BarChart3 size={14} />
          Dashboard
        </button>
        {dashboardFilters && investorView === "list" && (
          <span
            className="text-[11px] font-mono ml-2"
            style={{ color: "var(--color-accent-strong)" }}
          >
            Filtered from dashboard ·{" "}
            <button
              onClick={() => {
                setDashboardFilters(null);
                setFilterKey((k) => k + 1);
              }}
              className="underline hover:no-underline"
              style={{ color: "var(--color-accent-strong)" }}
            >
              Clear
            </button>
          </span>
        )}
      </div>

      {investorView === "dashboard" ? (
        <div style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
          <div className="px-4 sm:px-6 lg:px-8">
            <InvestorDashboard data={investorsData} onFilter={handleDashboardFilter} />
          </div>
        </div>
      ) : (
        <InvestorPool key={filterKey} initialFilters={dashboardFilters || undefined} />
      )}
    </div>
  );
}
