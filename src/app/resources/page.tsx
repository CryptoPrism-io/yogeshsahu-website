"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MobileNav from "@/components/layout/MobileNav";

export default function ResourcesRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/founders");
  }, [router]);

  return (
    <main className="h-screen overflow-y-auto relative" style={{ background: "var(--ys-surface)", color: "var(--ys-text)" }}>
      {/* Meta refresh for crawlers / non-JS users */}
      <meta httpEquiv="refresh" content="0; url=/founders" />

      <div className="fixed top-4 left-4 z-50 hidden max-[767px]:block">
        <MobileNav />
      </div>
      <nav
        className="fixed top-4 left-1/2 z-50 -translate-x-1/2 inline-flex items-center gap-4 px-4 py-2"
        style={{
          background: "color-mix(in oklch, var(--ys-surface) 78%, transparent)",
          backdropFilter: "blur(14px) saturate(120%)",
          WebkitBackdropFilter: "blur(14px) saturate(120%)",
          border: "1px solid color-mix(in oklch, var(--ys-border) 70%, transparent)",
          borderRadius: 9999,
          boxShadow: "0 8px 24px -12px oklch(0% 0 0 / 0.18)",
        }}
      >
        <Link
          href="/"
          aria-label="Home"
          className="text-[11px] font-bold uppercase tracking-[0.1em]"
          style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
        >
          YS.
        </Link>
        <span aria-hidden style={{ width: 1, height: 14, background: "var(--ys-border)" }} />
        <span
          className="text-[9px] uppercase tracking-[0.15em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
        >
          Redirecting...
        </span>
      </nav>

      <div className="mx-auto max-w-[600px] px-5 pt-32 pb-16 text-center">
        <p
          className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-accent)" }}
        >
          Page moved
        </p>
        <h1
          className="mb-4 font-bold uppercase"
          style={{
            fontFamily: "var(--font-headline)",
            color: "var(--ys-text)",
            fontSize: "clamp(28px,5vw,48px)",
            lineHeight: 0.95,
            letterSpacing: "-0.025em",
          }}
        >
          Resources is now Founder Hub
        </h1>
        <p
          className="mb-8 text-[15px] leading-[1.7]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          We renamed and expanded the page. The investor directory is now one
          tab inside a broader hub of playbooks, templates, tools, and
          community for founders.
        </p>
        <Link
          href="/founders"
          className="inline-block px-6 py-3 text-[12px] uppercase tracking-[0.14em] transition-opacity hover:opacity-80"
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
            background: "var(--ys-highlight)",
            color: "var(--ys-surface)",
          }}
        >
          Go to Founder Hub →
        </Link>
      </div>
    </main>
  );
}
