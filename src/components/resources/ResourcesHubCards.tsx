"use client";

import Link from "next/link";
import { BarChart3, BookOpen, FileCode, Users, Users2, Wrench, ArrowRight, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import investorsData from "@/data/investors.json";
import { founderPlaybooks } from "@/data/founder-playbooks";
import { toolkit } from "@/data/toolkit";
import { community } from "@/data/community";

const RESOURCES: {
  href: string;
  title: string;
  benefit: string;
  cta: string;
  icon: React.ReactNode;
  count?: string;
}[] = [
  {
    href: "/resources/investors",
    title: "Investors",
    benefit: "Angels, VCs and funds relevant to what you're building.",
    cta: "Explore directory",
    icon: <Users size={18} strokeWidth={1.5} />,
    count: investorsData.length.toLocaleString() + "+",
  },
  {
    href: "/resources/playbooks",
    title: "Playbooks",
    benefit: "Practical guides for building and fundraising.",
    cta: "Browse playbooks",
    icon: <BookOpen size={18} strokeWidth={1.5} />,
    count: String(founderPlaybooks.length),
  },
  {
    href: "/resources/toolkit",
    title: "Engineering Toolkit",
    benefit: "Skills, prompts and tools from real engineering work.",
    cta: "Explore toolkit",
    icon: <Wrench size={18} strokeWidth={1.5} />,
    count: String(toolkit.length),
  },
  {
    href: "/resources/decks",
    title: "Decks & Templates",
    benefit: "Useful starting points for founders.",
    cta: "Browse templates",
    icon: <FileCode size={18} strokeWidth={1.5} />,
  },
];

function CardLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const destination = href.replace("/resources/", "resources:");
  return (
    <Link
      href={href}
      onClick={() => trackEvent("nav_click", { destination })}
      className="group flex flex-col rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-28px_rgba(42,23,15,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        outlineColor: "var(--ys-accent)",
        borderColor: "var(--ys-border)",
        background: "var(--ys-surface-muted)",
        color: "inherit",
      }}
    >
      {children}
    </Link>
  );
}

/**
 * Hub card grid — client component (only for nav_click tracking).
 * Featured AI Product Analyst first, then the resource library.
 */
export default function ResourcesHubCards() {
  return (
    <div className="space-y-3">
      {/* FEATURED — AI Product Analyst */}
      <Link
        href="/resources/analytics"
        onClick={() => trackEvent("nav_click", { destination: "resources:analytics" })}
        className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border p-6 md:p-8 transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_44px_-30px_rgba(42,23,15,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{
          outlineColor: "var(--ys-accent)",
          borderColor: "var(--ys-border)",
          background:
            "linear-gradient(135deg, var(--ys-surface-strong) 0%, var(--ys-surface-muted) 100%)",
          color: "inherit",
        }}
      >
        <span
          className="inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.15em]"
          style={{
            borderColor: "rgba(207, 79, 39, 0.35)",
            color: "var(--ys-accent-strong)",
            background: "rgba(207, 79, 39, 0.08)",
          }}
        >
          <Sparkles size={11} />
          Featured · Live experiment
        </span>
        <div className="flex items-start gap-4">
          <span
            className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
            style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)" }}
          >
            <BarChart3 size={20} strokeWidth={1.5} style={{ color: "var(--ys-accent)" }} />
          </span>
          <div className="space-y-2">
            <h3
              className="text-xl md:text-2xl font-bold uppercase leading-[1.05]"
              style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
            >
              AI Product Analyst
            </h3>
            <p className="text-[14.5px] leading-[1.6]" style={{ color: "var(--ys-text-soft)" }}>
              Your analytics tell you what happened. This tells you what to do next.
            </p>
            <p
              className="pt-1 text-[11.5px] font-mono uppercase tracking-[0.12em]"
              style={{ color: "var(--ys-highlight)" }}
            >
              Ask → understand → experiment
            </p>
          </div>
        </div>
        <span
          className="inline-flex items-center gap-1.5 text-[12px] font-mono font-bold uppercase tracking-[0.1em] transition-transform group-hover:translate-x-0.5"
          style={{ color: "var(--ys-accent-strong)" }}
        >
          Explore
          <ArrowRight size={13} />
        </span>
      </Link>

      {/* Grid — investors + playbooks */}
      <div className="grid gap-3 md:grid-cols-2">
        {RESOURCES.slice(0, 2).map((r) => (
          <CardLink key={r.href} href={r.href}>
            <div className="mb-3 flex items-start justify-between gap-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-lg border"
                style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)" }}
              >
                {r.icon}
              </span>
              {r.count && (
                <span
                  className="rounded border px-2 py-0.5 text-[10px] font-mono tabular-nums"
                  style={{
                    background: "rgba(11, 141, 128, 0.1)",
                    borderColor: "rgba(11, 141, 128, 0.3)",
                    color: "var(--ys-highlight)",
                  }}
                >
                  {r.count}
                </span>
              )}
            </div>
            <h3
              className="text-[17px] font-bold uppercase leading-tight"
              style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
            >
              {r.title}
            </h3>
            <p className="mt-1.5 flex-1 text-[13px] leading-[1.55]" style={{ color: "var(--ys-text-soft)" }}>
              {r.benefit}
            </p>
            <span
              className="mt-4 inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-[0.1em] transition-transform group-hover:translate-x-0.5"
              style={{ color: "var(--ys-accent-strong)" }}
            >
              {r.cta}
              <ArrowRight size={12} />
            </span>
          </CardLink>
        ))}
      </div>

      {/* Grid — toolkit + decks */}
      <div className="grid gap-3 md:grid-cols-2">
        {RESOURCES.slice(2).map((r) => (
          <CardLink key={r.href} href={r.href}>
            <div className="mb-3 flex items-start justify-between gap-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-lg border"
                style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)" }}
              >
                {r.icon}
              </span>
              {r.count && (
                <span
                  className="rounded border px-2 py-0.5 text-[10px] font-mono tabular-nums"
                  style={{
                    background: "rgba(11, 141, 128, 0.1)",
                    borderColor: "rgba(11, 141, 128, 0.3)",
                    color: "var(--ys-highlight)",
                  }}
                >
                  {r.count}
                </span>
              )}
            </div>
            <h3
              className="text-[17px] font-bold uppercase leading-tight"
              style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
            >
              {r.title}
            </h3>
            <p className="mt-1.5 flex-1 text-[13px] leading-[1.55]" style={{ color: "var(--ys-text-soft)" }}>
              {r.benefit}
            </p>
            <span
              className="mt-4 inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-[0.1em] transition-transform group-hover:translate-x-0.5"
              style={{ color: "var(--ys-accent-strong)" }}
            >
              {r.cta}
              <ArrowRight size={12} />
            </span>
          </CardLink>
        ))}
      </div>

      {/* Community — full width */}
      <CardLink href="/resources/community">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
              style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)" }}
            >
              <Users2 size={18} strokeWidth={1.5} />
            </span>
            <div>
              <h3
                className="text-[17px] font-bold uppercase leading-tight"
                style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
              >
                Community
              </h3>
              <p className="mt-0.5 text-[13px]" style={{ color: "var(--ys-text-soft)" }}>
                {community.length} communities, programs and places worth knowing.
              </p>
            </div>
          </div>
          <span
            className="inline-flex shrink-0 items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-[0.1em]"
            style={{ color: "var(--ys-accent-strong)" }}
          >
            View
            <ArrowRight size={12} />
          </span>
        </div>
      </CardLink>
    </div>
  );
}
