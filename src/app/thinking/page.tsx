import Link from "next/link";
import type { Metadata } from "next";
import MobileNav from "@/components/layout/MobileNav";

export const metadata: Metadata = {
  title: "Thinking — Yogesh Sahu",
  description:
    "Architecture notes, cost lessons, and decision logs from building crypto data infrastructure and AI-native products. 12 posts spanning engineering decisions across the CryptoPrism fleet.",
  openGraph: {
    title: "Thinking — Yogesh Sahu",
    description:
      "Architecture notes, cost lessons, and decision logs — 12 posts on crypto data infrastructure, CI/CD, security, and AI product engineering.",
    url: "https://yogeshsahu.xyz/thinking",
  },
};

const POSTS = [
  {
    title: "The Instagram auth that broke 10 workflows at once",
    date: "2026-04-08",
    tag: "Operations",
    body: `We had 10 GitHub Actions workflows feeding content to Instagram. One morning, all 10 failed simultaneously with PhotoNotUpload: {"message":"login_required"}. Not gradual — instant, total, silent.

The root cause was an instagrapi session file that expired overnight. Instagram's unofficial API uses a saved session cookie for auth, and when that cookie expires, every single posting job goes dark at once. No partial degradation, no warning — just all-red from one morning to the next.

What made it worse: the AI caption API key (Together AI) had also expired in the same window. So even if the session had survived, the captions wouldn't have generated. Two independent credentials, both silently dead, and the monitoring only checked workflow exit codes (which were non-zero but identical to a transient API timeout).

The fix had three parts: re-authenticate Instagram interactively and store the session as a base64-encoded GitHub secret; rotate the AI key; add a dedicated session-freshness canary job that alerts distinctly from a generic workflow failure.

The structural lesson: unofficial session-based integrations rot silently. The only reliable path is the official Graph API with OAuth tokens. We're migrating, but the migration itself is a project — and every week the session doesn't expire is a week we deprioritise it. That's the trap.`,
  },
  {
    title: "The SSH key that nobody rotated",
    date: "2026-04-25",
    tag: "Security",
    body: `Our ML trading bot deploys via SSH to a VM. The deploy workflow had been green for months — every commit showed a passing check. Except it wasn't deploying.

The workflow had two jobs: a Cloud Run dashboard deployment (triggered on path changes) and an SSH deploy (triggered on a different path filter). The dashboard job was succeeding constantly because we pushed frequent frontend changes. The SSH job had been failing for three weeks — ssh: handshake failed: ssh: unable to authenticate, attempted methods [none publickey] — and nobody noticed, because the workflow's overall status was green.

Path-filtered multi-job workflows hide a broken job behind a healthy one. The root cause was trivial: someone had reprovisioned the VM without copying the deploy public key. The VM's authorized_keys no longer matched the GitHub secret.

It took three weeks to discover because monitoring only checks the workflow-level status, not per-job. The fix was straightforward — regenerate keypair, update secret — but the pattern is dangerous: any CI pipeline with conditional job execution can mask failures for the less-frequently-triggered path.

We now tag each deploy job with an independent status badge and alert on per-job failure, not workflow-level green.`,
  },
  {
    title: "Workflows that disable themselves: GitHub Actions 60-day inactivity trap",
    date: "2026-05-10",
    tag: "DevOps",
    body: `Five of our repos had cron workflows that were supposed to run daily. They weren't. But not because of code failures — because GitHub silently disabled them after 60 days without a repository commit.

GitHub Actions auto-disables scheduled workflows in repositories that haven't received a push in 60 days. The workflow simply stops triggering. No notification. No alert. The state is called disabled_inactivity, and the only way to find it is to explicitly query gh workflow list and look for it.

Here's the insidious part: some workflows still showed recent run history even while disabled, because external triggers (workflow_dispatch) still worked. A workflow that appears to have runs can actually have a dead cron trigger, and you'd never know until the data stops arriving.

The fix is a monthly keep-alive workflow: a single YAML file on a 25-day cron that does an empty commit with [skip ci] in the message. This resets the 60-day counter without triggering any downstream builds.

We rolled this out to every repo with a schedule trigger. But the deeper lesson is: a disabled workflow produces zero run history. It's not a failing workflow — it's an invisible one. Monitoring must distinguish between "ran and failed" and "never ran at all."`,
  },
  {
    title: "Append vs Upsert: duplicate key violations in time-series pipelines",
    date: "2026-05-28",
    tag: "Database",
    body: `A 9% failure rate on our daily data pipeline. The errors were all UniqueViolation: duplicate key value violates unique constraint. They clustered at specific hours — 20:xx, 08:xx, 15:xx — and then disappeared for days.

The root cause was a two-destination write pattern. The script wrote the same data to two databases: production used if_exists='replace' (truncate and re-insert, always succeeds), and the backtest database used if_exists='append'. When retries or scheduler jitter caused overlapping run windows, the second run tried to append rows that the first run had already inserted. The production database never showed the error — it was silently re-creating tables. The backtest database caught the conflict and failed.

Any time-series pipeline where run windows can overlap must use upsert semantics, never plain append. The fix was a staging temp table pattern with INSERT ... ON CONFLICT DO UPDATE, which handles retries, overlapping runs, and backfills without data duplication.

We applied this across the fleet. But the broader pattern is worth naming: whenever your pipeline writes to multiple destinations with different write strategies, you're one deployment away from a non-obvious failure that only affects some outputs.`,
  },
  {
    title: "The GCP to AWS migration: firewall, health checks, and SSL idle drops",
    date: "2026-06-15",
    tag: "Infrastructure",
    body: `We migrated our main PostgreSQL database from GCP Cloud SQL to AWS RDS in June. The migration itself took an afternoon. Recovering from it took two weeks.

Three problems stacked:

1. The AWS security group only allowlisted a single old home IP. When GitHub Actions runners tried to connect, they were silently black-holed — not connection refused, just timeout. The migration checklist had "update firewall rules" as a line item, but nobody had enumerated every caller IP beforehand.

2. The R price-fetch job opened a database connection at startup, spent 2-3 minutes fetching ~1,000 coin prices, and then tried to save — only to find the connection had been dropped by the new AWS idle timeout. This had never happened on GCP Cloud SQL because it had a different connection-handling policy. The fix: reconnect before write and set sslmode=require.

3. The health check was reporting green throughout. It was checking "did the step script run?" not "is the database reachable and returning fresh data?" A health check that doesn't fail on the actual failure mode is worse than no health check — it creates false confidence that delays investigation.

We fixed all three — opened the firewall, added reconnect-before-write logic, and replaced the fake health check with a real pipeline that verifies connectivity, auth, and data freshness. But the migration bill was 11 days of missing data and a scramble to backfill.

The playbook now has a "pre-cutover" step: enumerate every consumer's IP or network range and open the firewall before the switch. Every migration gets a two-gate deletion rule: a backup must exist and a parity check must pass before the old resource is retired.`,
  },
  {
    title: "11 days of missing data: how we backfilled with duplicate-safe writes",
    date: "2026-06-22",
    tag: "Operations",
    body: `After the GCP to AWS migration resolved, we had 11 days of missing data (June 14-24). The pipeline had been running but writing to a database it couldn't reach. Backfilling 11 days of per-coin, per-exchange OHLCV data is not a replay — it's a data archaeology project.

The challenge: many of the external APIs (exchange websockets, on-chain RPC nodes) don't allow historical queries beyond a rolling window. Binance's REST API goes back 500 candles, but only for recent pairs. BigQuery public datasets have lag — some chains are 6-12 hours behind real-time. A simple "re-run the last 11 days" would produce partial results at best.

The strategy was three-tier:
1. Primary: re-query exchange REST APIs for the window, using pagination where available.
2. Fallback: pull from BigQuery public crypto datasets, which have complete historical coverage but at delayed freshness.
3. Last resort: interpolate from daily snapshots stored in GCS (we had daily Parquet exports going back months — a design choice that saved us).

The write side used INSERT ... ON CONFLICT DO UPDATE everywhere, so re-running the same day twice produced the same result. The backfill took 36 hours across staggered jobs, each writing to a staging schema first, then swapping partitions atomically.

The lesson that saved us: daily Parquet exports to object storage. We set them up as a debugging aid and never used them until the migration broke. Now they're a non-negotiable part of every pipeline's data contract.`,
  },
  {
    title: "Self-hosting LLMs: when to buy vs run your own",
    date: "2026-06-29",
    tag: "Cost Engineering",
    body: `We run AI features across most of our products — NLP-to-SQL chat, on-chain anomaly classification, automated caption generation, RAG for financial documents. At our scale (~1,000-5,000 inference requests per day), the decision to self-host or use an API comes down to one number: the break-even threshold.

Our analysis showed that self-hosting only beats APIs above ~1,000-1,600 requests per day AND when you need 70B+ parameter quality. Below that, APIs are cheaper and maintenance-free:

100 req/day → Gemini/Groq free tier ($0)
1K req/day → Groq Llama 8B ($~1/mo)
10K req/day → Local RTX 3090 ($~61/mo) vs DeepSeek API ($~168/mo)
100K req/day → 4x RTX 4090 ($~468/mo) vs DeepSeek API ($~1,680/mo)

We run a LiteLLM proxy with a fallback chain: local Ollama → Gemini free tier → OpenRouter free → OpenRouter paid → Claude/GPT-4o last resort. This means simple classification goes through the free tiers and only the complex reasoning queries hit the paid Claude endpoint.

For single-user and dev workloads, Ollama is fine. For production multi-user, vLLM delivers 793 TPS vs Ollama's 41 TPS — the same hardware, 19x throughput. The switch to vLLM cost one afternoon of setup and saved us from having to buy a second GPU.

The architecture lesson: don't treat inference as a binary self-host-vs-API choice. Run a gateway with a fallback chain, route each request to the cheapest tier that can handle its complexity, and only buy hardware when the math clearly pencils out.`,
  },
  {
    title: "What happens when there's no CI: the pratyaksha deploy",
    date: "2026-07-03",
    tag: "DevOps",
    body: `Pratyaksha — our AI cognitive journaling app — had no CI pipeline. Every release depended on three fragile local conditions: a running Docker daemon, a fresh Firebase CLI token, and valid local AWS credentials. If any of those were missing, the deploy failed. And every deploy was manual.

The failure cascade was predictable: merge to main, deploy nothing. The developer tries to deploy locally, Docker Desktop isn't running. Start Docker, try again, Firebase auth token expired (firebase login:list lied and showed the account as logged in). Try firebase login --reauth — refuses non-interactive mode in the terminal. Three hours lost to a deployment that should have been a push.

The fix was PR #20: a deploy-pratyaksha.yml that triggers on push to main, builds the frontend on the GitHub runner, pushes the Docker image to ECR, and redeploys Lightsail — all with keyless WIF/OIDC auth. No local credentials, no Docker Desktop dependency. The pipeline ran green on first push: frontend in 2m55s, backend in 3m49s.

The rule: a production app with no push-to-deploy pipeline is an incident waiting to happen. CI is not optional infrastructure — it's the minimum viable deployment mechanism. Every hour spent on CI setup saves a day of debugging "but it works on my machine" later.

Also: CLI login tokens rot independently of browser sessions. firebase login --reauth cannot be automated. Use keyless identity (WIF/OIDC) everywhere.`,
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
  {
    title: "Why CryptoScore weights are a product decision, not an engineering one",
    date: "2026-07-10",
    tag: "Architecture",
    body: `CryptoScore is our composite token rating — a single number that combines on-chain metrics, market value dynamics, and momentum signals. It sounds like an engineering problem. It's not.

The formula today: OnChain (40%) + Value (30%) + Momentum (30%). When on-chain data is missing for a chain, the remaining two components reweight to 50/50. These weights determine which tokens surface to users, which get flagged as anomalies, and which disappear from the discovery feed. Changing a weight is a product decision that directly affects what users see.

The engineering challenge is less about the math and more about the architecture. compute_crypto_score() is a single function with hardcoded positional float arguments. There's no signal registry — adding a new signal means editing the function signature, adding a parameter, rebalancing all existing weights, and remembering to update both call sites (single-token endpoint AND leaderboard endpoint) independently. They duplicated the branching logic, and nothing enforces that the two stay in sync.

The same pattern applies to on-chain metrics: no plugin system, no base class. Each metric gets its own hand-written Python module with a fetch() function, then gets manually wired into the scheduler pipeline via copy-paste if-blocks. It works — we have 17 chains running — but adding a new chain means editing three separate files in the right order.

The honest fix would be a signal registry with a plugin interface. But the real constraint is that every weight change needs a product conversation first. Until the formula stabilises, the brittle architecture is the right tradeoff — it's easier to change a hardcoded function than a plugin system, and the weights are changing quarterly.`,
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
    title: "Why we built a 72 PB pipeline instead of buying Glassnode",
    date: "2026-07-20",
    tag: "Architecture",
    body: `Glassnode charges $800/mo for the same data we now serve at $30/mo. The build-vs-buy case was never about cost alone — it was about control over schema design, query shapes, and the ability to add an execution layer on top without asking a vendor for API access.

The key insight: crypto market data is public. Every transaction, every block, every on-chain event is broadcast and recorded. The moat isn't the data — it's the pipeline that normalises, indexes, and makes it queryable. Once we owned that pipeline, we could build things a vendor would never prioritise: NLP-to-SQL chat, cross-chain correlation, custom ML scoring.

The real cost wasn't the $427/yr in BigQuery — it was the 2,200 lines of SQL that needed to stay correct across hard forks, chain reorgs, and schema drift. That's a people cost, not an infrastructure cost. We bet that writing and maintaining that SQL was cheaper than paying Glassnode's margin forever. Two years in, it was the right call.`,
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
          Thinking · 12 posts
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
          from building crypto data infrastructure and AI-native products. 12 posts spanning
          April through July 2026.
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
