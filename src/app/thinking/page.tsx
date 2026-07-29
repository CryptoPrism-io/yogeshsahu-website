import Link from "next/link";
import type { Metadata } from "next";
import MobileNav from "@/components/layout/MobileNav";

export const metadata: Metadata = {
  title: "Thinking — Yogesh Sahu",
  description:
    "Architecture notes, cost lessons, and decision logs from building crypto data infrastructure and AI-native products.",
  openGraph: {
    title: "Thinking — Yogesh Sahu",
    description:
      "Architecture notes, cost lessons, and decision logs.",
    url: "https://yogeshsahu.xyz/thinking",
  },
};

const POSTS = [
  {
    title: "Why we built a 72 PB pipeline instead of buying Glassnode",
    date: "2026-07-20",
    tag: "Architecture",
    body: `Glassnode charges $800/mo for the same data we now serve at $30/mo. The build-vs-buy case was never about cost alone — it was about control over schema design, query shapes, and the ability to add an execution layer on top without asking a vendor for API access.

The key insight: crypto market data is public. Every transaction, every block, every on-chain event is broadcast and recorded. The moat isn't the data — it's the pipeline that normalises, indexes, and makes it queryable. Once we owned that pipeline, we could build things a vendor would never prioritise: NLP-to-SQL chat, cross-chain correlation, custom ML scoring.

The real cost wasn't the $427/yr in BigQuery — it was the 2,200 lines of SQL that needed to stay correct across hard forks, chain reorgs, and schema drift. That's a people cost, not an infrastructure cost. We bet that writing and maintaining that SQL was cheaper than paying Glassnode's margin forever. Two years in, it was the right call.`,
  },
  {
    title: "The $427/yr cost lesson from BigQuery materialized views",
    date: "2026-07-14",
    tag: "Cost Engineering",
    body: `Our on-chain pipeline was costing $1,200/mo in BigQuery queries. Materialised views brought it to $36/mo. That's a 97% reduction.

The mistake: we were querying raw ingestion tables with repeated GROUP BY operations across the same time windows. Every dashboard refresh — every single one — was paying the full scan cost of 72 PB of data. BigQuery charges by bytes processed, and we were processing everything, every time.

The fix was a four-layer materialisation strategy:
1. Raw ingestion → hourly rollups (5-minute windows aggregated)
2. Hourly rollups → daily summaries (per-coin, per-exchange)
3. Daily summaries → weekly snapshots (for ML training windows)
4. Weekly → monthly (for long-term trend queries)

Each layer costs ~1-2% of the layer below it. A query that would scan 50 TB now scans 4 GB. The dashboard that took 14 seconds and cost $2.40 now takes 600ms and costs $0.02.

The principle generalises: if you query the same shape of data more than once, materialise it. This applies to Postgres materialised views, Redis caches, and even memoized API responses. The first time you write the query, you pay full price. Every time after that should be near-free.`,
  },
  {
    title: "Firebase Auth vs custom JWT: what we chose at CryptoPrism",
    date: "2026-07-06",
    tag: "Security",
    body: `We started with Firebase Auth because it's free, fast, and handles 90% of auth flows out of the box — email/password, Google sign-in, anonymous sessions. Six months in, we hit the wall: Firebase Auth doesn't support custom JWT claims without a Cloud Function workaround, and our permission model needed per-user, per-exchange rate limits that couldn't live in a Firebase token.

The decision was to keep Firebase Auth as the identity provider (login, MFA, session management) but issue our own JWTs from the FastAPI backend for all authorisation. Firebase handles "who you are" — our backend handles "what you can do."

This split is critical: Firebase Auth is optimised for identity, not authorisation. Trying to force authorisation into Firebase custom claims works until your permission model grows beyond roles (admin/user) into resource-level policies (can read Binance data but not write trades). The moment you need resource-level auth, you need your own token.

The migration took two weekends: one to add JWT endpoints to the API, one to update all clients. Firebase Auth tokens now map to internal user records, and our JWTs carry the actual permission payload — exchange limits, feature flags, API quota. We kept the Firebase login UX but replaced everything underneath.

The lesson: don't outsource authorisation to an identity provider. Use them for what they're good at (login flows, MFA, social auth) and own the authorisation layer yourself.`,
  },
];

export default function ThinkingPage() {
  return (
    <main className="h-screen overflow-y-auto" style={{ background: "var(--ys-surface)", color: "var(--ys-text)" }}>
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
          Thinking
        </span>
      </nav>

      <div className="mx-auto max-w-[760px] px-5 pt-24 pb-16">
        <p
          className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ys-accent)" }}
        >
          Architecture Notes · Cost Lessons · Decision Logs
        </p>
        <h1
          className="mb-3 font-bold uppercase"
          style={{
            fontFamily: "var(--font-headline)",
            color: "var(--ys-text)",
            fontSize: "clamp(36px,5.6vw,72px)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
          }}
        >
          Thinking
        </h1>
        <p
          className="mb-14 max-w-[58ch] text-[15px] leading-[1.8]"
          style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
        >
          Raw notes on architecture decisions, cost engineering, and technology choices
          from building crypto data infrastructure and AI-native products.
        </p>

        <div className="flex flex-col gap-12">
          {POSTS.map((post) => (
            <article key={post.title} className="border-t pt-6" style={{ borderColor: "var(--ys-border)" }}>
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="text-[9px] uppercase tracking-[0.15em]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
                >
                  {post.date}
                </span>
                <span
                  className="text-[9px] uppercase tracking-[0.12em]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--ys-accent-strong)",
                    border: "1px solid var(--ys-border)",
                    padding: "2px 6px",
                  }}
                >
                  {post.tag}
                </span>
              </div>
              <h2
                className="mb-4 font-bold leading-[1.1]"
                style={{
                  fontFamily: "var(--font-headline)",
                  color: "var(--ys-text)",
                  fontSize: "clamp(22px,3vw,32px)",
                  letterSpacing: "-0.02em",
                }}
              >
                {post.title}
              </h2>
              {post.body.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="mb-3 text-[14.5px] leading-[1.75]"
                  style={{ fontFamily: "var(--font-body)", color: "var(--ys-text-soft)" }}
                >
                  {para}
                </p>
              ))}
            </article>
          ))}
        </div>
      </div>

      <footer
        className="px-10 py-[72px]"
        style={{ borderTop: "1px solid var(--ys-border)" }}
      >
        <div className="mx-auto max-w-[760px] grid gap-8">
          <p
            className="m-0"
            style={{
              fontFamily: "var(--font-serif-display)",
              fontSize: "clamp(1.75rem, 5vw, 3.25rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "var(--ys-text)",
              maxWidth: "28ch",
            }}
          >
            Build something they&apos;ll remember.
          </p>
          <div
            className="flex justify-between items-baseline pt-2"
            style={{ borderTop: "1px solid var(--ys-border)" }}
          >
            <span
              className="text-[11px] font-bold uppercase tracking-[0.1em]"
              style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}
            >
              YS.
            </span>
            <span
              className="text-[9px] uppercase tracking-[0.15em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ys-text-soft)" }}
            >
              yogeshsahu.xyz
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
