"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Download,
  FileSpreadsheet,
  Check,
  ExternalLink,
  Mail,
  Filter,
  Grid,
  List,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Share2
} from "lucide-react";
import investorsDataRaw from "@/data/investors.json";
import { downloadCSV, downloadExcel, type InvestorRecord } from "@/lib/exportUtils";
import Link from "next/link";

function LinkedInIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/>
    </svg>
  );
}

const investorsData = investorsDataRaw as InvestorRecord[];

const TYPES = ["All", "Angel Investor", "Individual Investor", "VC / Fund", "Incubator & Accelerator"];
const SECTORS = ["All", "AI / ML", "Fintech", "Web3 / Crypto", "SaaS", "Deep Tech"];

export default function InvestorPool() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedSector, setSelectedSector] = useState("All");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);
  const [jumpPage, setJumpPage] = useState("");
  const pageSize = 25;

  const filteredData = useMemo(() => {
    return investorsData.filter((item) => {
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.firm.toLowerCase().includes(search.toLowerCase()) ||
        item.role.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesType = selectedType === "All" || item.type === selectedType;

      const matchesSector =
        selectedSector === "All" ||
        item.tags.some((t) => t.toLowerCase().includes(selectedSector.toLowerCase())) ||
        item.role.toLowerCase().includes(selectedSector.toLowerCase());

      return matchesSearch && matchesType && matchesSector;
    });
  }, [search, selectedType, selectedSector]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage]);

  const handleCopyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div
        className="relative overflow-hidden rounded-2xl border p-6 md:p-8"
        style={{
          borderColor: "var(--ys-border)",
          background: "linear-gradient(135deg, var(--ys-surface-strong) 0%, var(--ys-surface-muted) 100%)",
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-md border px-3 py-1 text-[11px] font-mono tracking-wider uppercase font-bold"
                 style={{ borderColor: "rgba(207, 79, 39, 0.3)", color: "var(--ys-accent-strong)", background: "rgba(207, 79, 39, 0.08)" }}>
              <Sparkles size={12} /> Global Investor & Angel Pool ({investorsData.length.toLocaleString()}+ Active Contacts)
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}>
              Explore Investors & Export Lead Lists
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--ys-text-soft)" }}>
              Curated, verified pool of global angel investors, VCs, individual family offices, and tech incubators. Search, filter, and export into CSV or Excel for outreach.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => downloadCSV(filteredData, `investors-${selectedType.toLowerCase().replace(/[^a-z]/g, '')}.csv`)}
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-mono font-semibold transition-all hover:scale-[1.02] shadow-sm"
              style={{ background: "var(--ys-accent)", color: "#ffffff" }}
              id="export-csv-btn"
            >
              <Download size={14} /> Export CSV ({filteredData.length})
            </button>
            <button
              onClick={() => downloadExcel(filteredData, `investors-${selectedType.toLowerCase().replace(/[^a-z]/g, '')}.xls`)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-mono font-semibold transition-all hover:bg-[var(--ys-surface-strong)]"
              style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)", color: "var(--ys-text)" }}
              id="export-excel-btn"
            >
              <FileSpreadsheet size={14} style={{ color: "var(--ys-highlight)" }} /> Export Excel
            </button>
          </div>
        </div>
      </div>

      {/* Cross-Link Traction Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border px-5 py-4"
           style={{ borderColor: "rgba(11, 141, 128, 0.3)", background: "rgba(11, 141, 128, 0.06)" }}>
        <div className="flex items-center gap-3 text-xs" style={{ color: "var(--ys-text-soft)" }}>
          <ShieldCheck style={{ color: "var(--ys-highlight)" }} className="shrink-0" size={18} />
          <span>
            <strong>Pitching to these investors?</strong> Need a hands-on Fractional CTO to build your AI or Fintech product architecture first?
          </span>
        </div>
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold hover:underline shrink-0"
          style={{ color: "var(--ys-highlight)" }}
        >
          View Case Studies & Deliverables <ArrowRight size={14} />
        </Link>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-4 rounded-xl border p-4" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}>
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--ys-text-soft)" }} size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by investor name, firm, role, location, or tag..."
              className="w-full rounded-lg border py-2.5 pl-10 pr-4 text-xs outline-none transition-colors"
              style={{
                borderColor: "var(--ys-border)",
                background: "var(--ys-surface)",
                color: "var(--ys-text)",
              }}
              id="investor-search-input"
            />
          </div>

          {/* Controls: View Mode & Share */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-mono transition-colors hover:bg-[var(--ys-surface-muted)]"
              style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)", color: "var(--ys-text-soft)" }}
              title="Share Database URL"
            >
              {copiedShare ? <Check size={14} style={{ color: "var(--ys-highlight)" }} /> : <Share2 size={14} />}
              <span>{copiedShare ? "Link Copied!" : "Share"}</span>
            </button>

            <div className="flex items-center rounded-lg border p-1" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)" }}>
              <button
                onClick={() => setViewMode("table")}
                className={`rounded p-1.5 text-xs transition-colors ${viewMode === "table" ? "bg-[var(--ys-accent)] text-white" : "text-[var(--ys-text-soft)] hover:text-[var(--ys-text)]"}`}
                title="Table View"
              >
                <List size={15} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded p-1.5 text-xs transition-colors ${viewMode === "grid" ? "bg-[var(--ys-accent)] text-white" : "text-[var(--ys-text-soft)] hover:text-[var(--ys-text)]"}`}
                title="Grid View"
              >
                <Grid size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Chips: Type & Sector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t" style={{ borderColor: "var(--ys-border)" }}>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            <Filter size={13} style={{ color: "var(--ys-text-soft)" }} className="shrink-0" />
            <span className="text-[11px] font-mono uppercase tracking-wider shrink-0" style={{ color: "var(--ys-text-soft)" }}>Type:</span>
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setSelectedType(t);
                  setCurrentPage(1);
                }}
                className={`rounded-md px-2.5 py-1 text-[11px] font-mono transition-colors shrink-0 ${
                  selectedType === t
                    ? "bg-[var(--ys-accent)] text-white font-bold"
                    : "border border-[var(--ys-border)] bg-[var(--ys-surface)] text-[var(--ys-text-soft)] hover:text-[var(--ys-text)] hover:bg-[var(--ys-surface-muted)]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            <span className="text-[11px] font-mono uppercase tracking-wider shrink-0" style={{ color: "var(--ys-text-soft)" }}>Sector:</span>
            {SECTORS.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSelectedSector(s);
                  setCurrentPage(1);
                }}
                className={`rounded-md px-2.5 py-1 text-[11px] font-mono transition-colors shrink-0 ${
                  selectedSector === s
                    ? "bg-[var(--ys-highlight)] text-white font-bold"
                    : "border border-[var(--ys-border)] bg-[var(--ys-surface)] text-[var(--ys-text-soft)] hover:text-[var(--ys-text)] hover:bg-[var(--ys-surface-muted)]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dataset Results Summary */}
      <div className="flex items-center justify-between text-xs font-mono px-1" style={{ color: "var(--ys-text-soft)" }}>
        <span>
          Showing {paginatedData.length} of {filteredData.length} investors (Total database: {investorsData.length.toLocaleString()})
        </span>
        <span>Page {currentPage} of {totalPages}</span>
      </div>

      {/* Main View Display: Table or Grid */}
      {viewMode === "table" ? (
        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)" }}>
          <table className="w-full text-left text-xs" style={{ color: "var(--ys-text)" }}>
            <thead className="border-b uppercase text-[10px] font-mono tracking-wider"
                   style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-muted)", color: "var(--ys-text)" }}>
              <tr>
                <th className="p-3.5">Investor / Org</th>
                <th className="p-3.5">Firm / Affiliation</th>
                <th className="p-3.5">Type & Location</th>
                <th className="p-3.5">Focus / Tags</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "var(--ys-border)" }}>
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-[var(--ys-surface-strong)] transition-colors">
                  <td className="p-3.5 font-medium max-w-[220px]">
                    <div className="font-bold text-sm" style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}>{item.name}</div>
                    {item.role && <div className="text-[11px] truncate" style={{ color: "var(--ys-text-soft)" }}>{item.role}</div>}
                  </td>
                  <td className="p-3.5 max-w-[180px]" style={{ color: "var(--ys-text-soft)" }}>
                    <span className="truncate block">{item.firm || "Independent"}</span>
                  </td>
                  <td className="p-3.5">
                    <div className="inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider mb-1"
                         style={{ background: "rgba(207, 79, 39, 0.08)", borderColor: "rgba(207, 79, 39, 0.2)", color: "var(--ys-accent-strong)" }}>
                      {item.type}
                    </div>
                    <div className="text-[11px]" style={{ color: "var(--ys-text-soft)" }}>{item.location || "Global"}</div>
                  </td>
                  <td className="p-3.5 max-w-[240px]">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="rounded border px-2 py-0.5 text-[10px] font-mono"
                              style={{ background: "var(--ys-surface-muted)", borderColor: "var(--ys-border)", color: "var(--ys-text-soft)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3.5 text-right space-x-2 shrink-0">
                    {item.email && (
                      <button
                        onClick={() => handleCopyEmail(item.email!, item.id)}
                        className="inline-flex items-center gap-1 rounded border px-2.5 py-1 text-[11px] font-mono transition-colors hover:opacity-90"
                        style={{ background: "rgba(11, 141, 128, 0.08)", borderColor: "rgba(11, 141, 128, 0.3)", color: "var(--ys-highlight)" }}
                        title="Copy Email Address"
                      >
                        {copiedId === item.id ? <Check size={12} /> : <Mail size={12} />}
                        <span>{copiedId === item.id ? "Copied" : "Email"}</span>
                      </button>
                    )}

                    {item.linkedin && (
                      <a
                        href={item.linkedin.startsWith("http") ? item.linkedin : `https://${item.linkedin}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded border px-2.5 py-1 text-[11px] font-mono transition-colors hover:opacity-90"
                        style={{ background: "rgba(207, 79, 39, 0.08)", borderColor: "rgba(207, 79, 39, 0.3)", color: "var(--ys-accent-strong)" }}
                      >
                        <LinkedInIcon size={12} />
                        <span>Profile</span>
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-xl border p-4 space-y-3 transition-all hover:border-[var(--ys-accent)]"
              style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm" style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}>{item.name}</h3>
                    <p className="text-xs" style={{ color: "var(--ys-text-soft)" }}>{item.firm}</p>
                  </div>
                  <span className="rounded border px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider"
                        style={{ background: "rgba(207, 79, 39, 0.08)", borderColor: "rgba(207, 79, 39, 0.2)", color: "var(--ys-accent-strong)" }}>
                    {item.type}
                  </span>
                </div>

                {item.role && <p className="text-xs line-clamp-2" style={{ color: "var(--ys-text-soft)" }}>{item.role}</p>}
                
                <div className="text-[11px] font-mono" style={{ color: "var(--ys-text-soft)" }}>📍 {item.location || "Global"}</div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="rounded border px-2 py-0.5 text-[10px] font-mono"
                          style={{ background: "var(--ys-surface-muted)", borderColor: "var(--ys-border)", color: "var(--ys-text-soft)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t text-xs" style={{ borderColor: "var(--ys-border)" }}>
                {item.email ? (
                  <button
                    onClick={() => handleCopyEmail(item.email!, item.id)}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold"
                    style={{ color: "var(--ys-highlight)" }}
                  >
                    {copiedId === item.id ? <Check size={13} /> : <Mail size={13} />}
                    <span>{copiedId === item.id ? "Email Copied!" : "Copy Email"}</span>
                  </button>
                ) : (
                  <span className="text-[11px] font-mono" style={{ color: "var(--ys-text-soft)" }}>Verified Lead</span>
                )}

                {item.linkedin && (
                  <a
                    href={item.linkedin.startsWith("http") ? item.linkedin : `https://${item.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold"
                    style={{ color: "var(--ys-accent-strong)" }}
                  >
                    <span>LinkedIn</span> <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      <div className="flex items-center justify-between pt-4 border-t flex-wrap gap-3" style={{ borderColor: "var(--ys-border)" }}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="rounded-lg border px-3 py-1.5 text-xs font-mono transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--ys-surface-strong)]"
          style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)", color: "var(--ys-text)" }}
        >
          Previous
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono" style={{ color: "var(--ys-text-soft)" }}>
            Page {currentPage} of {totalPages}
          </span>
          <span className="text-[10px] font-mono" style={{ color: "var(--ys-text-soft)" }}>Jump to:</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const p = parseInt(jumpPage, 10);
                if (p >= 1 && p <= totalPages) {
                  setCurrentPage(p);
                  setJumpPage("");
                }
              }
            }}
            placeholder="#"
            className="w-14 rounded-lg border px-2 py-1.5 text-xs font-mono text-center outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)", color: "var(--ys-text)" }}
          />
        </div>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="rounded-lg border px-3 py-1.5 text-xs font-mono transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--ys-surface-strong)]"
          style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)", color: "var(--ys-text)" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
