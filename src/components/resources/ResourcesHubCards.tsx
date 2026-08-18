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
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const destination = href.replace("/resources/", "resources:");
  return (
    <Link
      href={href}
      onClick={() => trackEvent("nav_click", { destination })}
      className={`group flex flex-col rounded-2xl border p-5 transition-[transform,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-28px_rgba(42,23,15,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
      style={{
        outlineColor: "var(--color-accent)",
        borderColor: "var(--color-rule)",
        background: "var(--color-paper-muted)",
        color: "inherit",
      }}
    >
      {children}
    </Link>
  );
}

/**
 * Bento grid — client component (only for nav_click tracking).
 * Productized resources with varied card sizes based on importance.
 */
export default function ResourcesHubCards() {
  return (
    <div className="grid grid-cols-12 gap-3">
      {/* ROW 1: Featured AI Product Analyst — spans full width */}
      <Link
        href="/resources/analytics"
        onClick={() => trackEvent("nav_click", { destination: "resources:analytics" })}
        className="group relative col-span-12 flex flex-col gap-4 overflow-hidden rounded-2xl border p-6 md:p-8 transition-[transform,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-[0_24px_44px_-30px_rgba(42,23,15,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{
          outlineColor: "var(--color-accent)",
          borderColor: "var(--color-rule)",
          background:
            "linear-gradient(135deg, var(--color-paper-2) 0%, var(--color-paper-muted) 100%)",
          color: "inherit",
        }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-30" />
        <span
          className="inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.15em]"
          style={{
            borderColor: "color-mix(in oklch, var(--color-accent) 35%, transparent)",
            color: "var(--color-accent-strong)",
            background: "color-mix(in oklch, var(--color-accent) 8%, transparent)",
          }}
        >
          <Sparkles size={11} />
          Featured · Live experiment
        </span>
        <div className="flex items-start gap-4">
          <span
            className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
            style={{ borderColor: "var(--color-rule)", background: "var(--color-paper)" }}
          >
            <BarChart3 size={22} strokeWidth={1.5} style={{ color: "var(--color-accent)" }} />
          </span>
          <div className="space-y-2">
            <h3
              className="text-xl md:text-2xl font-bold uppercase leading-[1.05]"
              style={{ fontFamily: "var(--font-headline)", color: "var(--color-ink)" }}
            >
              AI Product Analyst
            </h3>
            <p className="text-[15px] leading-[1.6] max-w-[55ch]" style={{ color: "var(--color-ink-2)" }}>
              Your analytics tell you what happened. This tells you what to do next.
            </p>
            <p
              className="pt-1 text-[11.5px] font-mono uppercase tracking-[0.12em]"
              style={{ color: "var(--color-accent-strong)" }}
            >
              Ask → understand → experiment
            </p>
          </div>
        </div>
        <span
          className="inline-flex items-center gap-1.5 text-[12px] font-mono font-bold uppercase tracking-[0.1em] transition-transform group-hover:translate-x-0.5"
          style={{ color: "var(--color-accent-strong)" }}
        >
          Explore
          <ArrowRight size={13} />
        </span>
      </Link>

      {/* ROW 2: Investors (large) + Playbooks (medium) + Decks (small) */}
      {/* Investors — spans 6 cols */}
      <CardLink href="/resources/investors" className="col-span-12 md:col-span-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl border"
            style={{ borderColor: "var(--color-rule)", background: "var(--color-paper)" }}
          >
            <Users size={20} strokeWidth={1.5} />
          </span>
          <span
            className="rounded border px-2.5 py-1 text-[11px] font-mono font-bold tabular-nums"
            style={{
              background: "color-mix(in oklch, var(--color-accent) 8%, transparent)",
              borderColor: "color-mix(in oklch, var(--color-accent) 30%, transparent)",
              color: "var(--color-accent-strong)",
            }}
          >
            {investorsData.length.toLocaleString()}+
          </span>
        </div>
        <h3
          className="text-lg font-bold uppercase leading-tight"
          style={{ fontFamily: "var(--font-headline)", color: "var(--color-ink)" }}
        >
          Investors
        </h3>
        <p className="mt-2 text-[14px] leading-[1.55]" style={{ color: "var(--color-ink-2)" }}>
          Angels, VCs and funds relevant to what you&apos;re building. Curated with check sizes, focus areas and warm intro paths.
        </p>
        <span
          className="mt-5 inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-[0.1em] transition-transform group-hover:translate-x-0.5"
          style={{ color: "var(--color-accent-strong)" }}
        >
          Explore directory
          <ArrowRight size={12} />
        </span>
      </CardLink>

      {/* Playbooks — spans 4 cols */}
      <CardLink href="/resources/playbooks" className="col-span-12 md:col-span-4">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-lg border"
            style={{ borderColor: "var(--color-rule)", background: "var(--color-paper)" }}
          >
            <BookOpen size={18} strokeWidth={1.5} />
          </span>
          <span
            className="rounded border px-2 py-0.5 text-[11px] font-mono tabular-nums"
            style={{
              background: "color-mix(in oklch, var(--color-accent) 8%, transparent)",
              borderColor: "color-mix(in oklch, var(--color-accent) 30%, transparent)",
              color: "var(--color-accent-strong)",
            }}
          >
            {String(founderPlaybooks.length)}
          </span>
        </div>
        <h3
          className="text-[16px] font-bold uppercase leading-tight"
          style={{ fontFamily: "var(--font-headline)", color: "var(--color-ink)" }}
        >
          Playbooks
        </h3>
        <p className="mt-1.5 text-[13.5px] leading-[1.5]" style={{ color: "var(--color-ink-2)" }}>
          Practical guides for building and fundraising.
        </p>
        <span
          className="mt-4 inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-[0.1em] transition-transform group-hover:translate-x-0.5"
          style={{ color: "var(--color-accent-strong)" }}
        >
          Browse
          <ArrowRight size={12} />
        </span>
      </CardLink>

      {/* Decks — spans 2 cols (compact) */}
      <CardLink href="/resources/decks" className="col-span-12 md:col-span-2">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-lg border mb-3"
          style={{ borderColor: "var(--color-rule)", background: "var(--color-paper)" }}
        >
          <FileCode size={17} strokeWidth={1.5} />
        </span>
        <h3
          className="text-[15px] font-bold uppercase leading-tight"
          style={{ fontFamily: "var(--font-headline)", color: "var(--color-ink)" }}
        >
          Decks
        </h3>
        <p className="mt-1 text-[13px] leading-[1.45]" style={{ color: "var(--color-ink-2)" }}>
          Pitch templates &amp; examples.
        </p>
      </CardLink>

      {/* ROW 3: Community (wide) + Engineering Toolkit + Investors preview */}
      {/* Community — spans 5 cols */}
      <CardLink href="/resources/community" className="col-span-12 md:col-span-5">
        <div className="flex flex-col h-full">
          <div className="mb-3 flex items-center gap-3">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-lg border"
              style={{ borderColor: "var(--color-rule)", background: "var(--color-paper)" }}
            >
              <Users2 size={18} strokeWidth={1.5} />
            </span>
            <span
              className="rounded border px-2 py-0.5 text-[11px] font-mono tabular-nums"
              style={{
                background: "color-mix(in oklch, var(--color-accent) 8%, transparent)",
                borderColor: "color-mix(in oklch, var(--color-accent) 30%, transparent)",
                color: "var(--color-accent-strong)",
              }}
            >
              {community.length}
            </span>
          </div>
          <h3
            className="text-[17px] font-bold uppercase leading-tight"
            style={{ fontFamily: "var(--font-headline)", color: "var(--color-ink)" }}
          >
            Community
          </h3>
          <p className="mt-1.5 flex-1 text-[14px] leading-[1.5]" style={{ color: "var(--color-ink-2)" }}>
            Communities, programs and places worth knowing for founders.
          </p>
          <span
            className="mt-4 inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-[0.1em] transition-transform group-hover:translate-x-0.5"
            style={{ color: "var(--color-accent-strong)" }}
          >
            Discover
            <ArrowRight size={12} />
          </span>
        </div>
      </CardLink>

      {/* Engineering Toolkit — spans 4 cols */}
      <CardLink href="/resources/toolkit" className="col-span-12 md:col-span-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-lg border"
            style={{ borderColor: "var(--color-rule)", background: "var(--color-paper)" }}
          >
            <Wrench size={18} strokeWidth={1.5} />
          </span>
          <span
            className="rounded border px-2 py-0.5 text-[11px] font-mono tabular-nums"
            style={{
              background: "color-mix(in oklch, var(--color-accent) 8%, transparent)",
              borderColor: "color-mix(in oklch, var(--color-accent) 30%, transparent)",
              color: "var(--color-accent-strong)",
            }}
          >
            {String(toolkit.length)}
          </span>
        </div>
        <h3
          className="text-[16px] font-bold uppercase leading-tight"
          style={{ fontFamily: "var(--font-headline)", color: "var(--color-ink)" }}
        >
          Engineering Toolkit
        </h3>
        <p className="mt-1.5 text-[13.5px] leading-[1.5]" style={{ color: "var(--color-ink-2)" }}>
          Skills, prompts and tools from real engineering work.
        </p>
        <span
          className="mt-4 inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-[0.1em] transition-transform group-hover:translate-x-0.5"
          style={{ color: "var(--color-accent-strong)" }}
        >
          Explore
          <ArrowRight size={12} />
        </span>
      </CardLink>

      {/* Quick stat card — spans 3 cols */}
      <div
        className="col-span-12 md:col-span-3 flex flex-col justify-center rounded-2xl border p-5"
        style={{
          borderColor: "var(--color-rule)",
          background: "var(--color-paper-muted)",
        }}
      >
        <p
          className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] mb-3"
          style={{ color: "var(--color-ink-2)" }}
        >
          Total Resources
        </p>
        <div className="flex items-baseline gap-2">
          <span
            className="text-3xl font-bold"
            style={{ fontFamily: "var(--font-headline)", color: "var(--color-ink)" }}
          >
            {investorsData.length + founderPlaybooks.length + toolkit.length + community.length}+
          </span>
          <span
            className="text-[13px]"
            style={{ color: "var(--color-ink-2)" }}
          >
            items
          </span>
        </div>
        <p
          className="mt-2 text-[12px] leading-[1.5]"
          style={{ color: "var(--color-ink-2)" }}
        >
          Free to explore, copy and use.
        </p>
      </div>
    </div>
  );
}
