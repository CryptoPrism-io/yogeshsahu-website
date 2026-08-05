export type PostKind = "thinking" | "journal" | "review";

import { WEEKLY_REVIEWS } from "./weekly-reviews";

export interface Post {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  kind: PostKind;
  tags: string[];
  mood?: string;
  excerpt: string;
  body: string;
  readTime: number; // minutes
}

const THINKING_POSTS: Omit<Post, "kind">[] = [
  {
    slug: "the-instagram-auth-that-broke-10-workflows",
    title: "The Instagram auth that broke 10 workflows at once",
    date: "2026-04-08",
    tags: ["Operations", "Security"],
    excerpt: "Ten GitHub Actions workflows failed simultaneously. The root cause was one expired session file.",
    readTime: 3,
    body: `We had 10 GitHub Actions workflows feeding content to Instagram. One morning, all 10 failed simultaneously with PhotoNotUpload: {"message":"login_required"}. Not gradual — instant, total, silent.

The root cause was an instagrapi session file that expired overnight. Instagram's unofficial API uses a saved session cookie for auth, and when that cookie expires, every single posting job goes dark at once. No partial degradation, no warning — just all-red from one morning to the next.

What made it worse: the AI caption API key (Together AI) had also expired in the same window. So even if the session had survived, the captions wouldn't have generated. Two independent credentials, both silently dead, and the monitoring only checked workflow exit codes (which were non-zero but identical to a transient API timeout).

The fix had three parts: re-authenticate Instagram interactively and store the session as a base64-encoded GitHub secret; rotate the AI key; add a dedicated session-freshness canary job that alerts distinctly from a generic workflow failure.

The structural lesson: unofficial session-based integrations rot silently. The only reliable path is the official Graph API with OAuth tokens. We're migrating, but the migration itself is a project — and every week the session doesn't expire is a week we deprioritise it. That's the trap.`,
  },
  {
    slug: "the-ssh-key-that-nobody-rotated",
    title: "The SSH key that nobody rotated",
    date: "2026-04-25",
    tags: ["Security", "DevOps"],
    excerpt: "A broken SSH deploy job hid behind a green workflow for three weeks.",
    readTime: 3,
    body: `Our ML trading bot deploys via SSH to a VM. The deploy workflow had been green for months — every commit showed a passing check. Except it wasn't deploying.

The workflow had two jobs: a Cloud Run dashboard deployment (triggered on path changes) and an SSH deploy (triggered on a different path filter). The dashboard job was succeeding constantly because we pushed frequent frontend changes. The SSH job had been failing for three weeks — ssh: handshake failed: ssh: unable to authenticate, attempted methods [none publickey] — and nobody noticed, because the workflow's overall status was green.

Path-filtered multi-job workflows hide a broken job behind a healthy one. The root cause was trivial: someone had reprovisioned the VM without copying the deploy public key. The VM's authorized_keys no longer matched the GitHub secret.

It took three weeks to discover because monitoring only checks the workflow-level status, not per-job. The fix was straightforward — regenerate keypair, update secret — but the pattern is dangerous: any CI pipeline with conditional job execution can mask failures for the less-frequently-triggered path.

We now tag each deploy job with an independent status badge and alert on per-job failure, not workflow-level green.`,
  },
  {
    slug: "workflows-that-disable-themselves-github-actions-60-day-trap",
    title: "Workflows that disable themselves: GitHub Actions 60-day inactivity trap",
    date: "2026-05-10",
    tags: ["DevOps", "CI/CD"],
    excerpt: "Five repos had cron workflows silently disabled by GitHub after 60 days without a commit.",
    readTime: 3,
    body: `Five of our repos had cron workflows that were supposed to run daily. They weren't. But not because of code failures — because GitHub silently disabled them after 60 days without a repository commit.

GitHub Actions auto-disables scheduled workflows in repositories that haven't received a push in 60 days. The workflow simply stops triggering. No notification. No alert. The state is called disabled_inactivity, and the only way to find it is to explicitly query gh workflow list and look for it.

Here's the insidious part: some workflows still showed recent run history even while disabled, because external triggers (workflow_dispatch) still worked. A workflow that appears to have runs can actually have a dead cron trigger, and you'd never know until the data stops arriving.

The fix is a monthly keep-alive workflow: a single YAML file on a 25-day cron that does an empty commit with [skip ci] in the message. This resets the 60-day counter without triggering any downstream builds.

We rolled this out to every repo with a schedule trigger. But the deeper lesson is: a disabled workflow produces zero run history. It's not a failing workflow — it's an invisible one. Monitoring must distinguish between "ran and failed" and "never ran at all."`,
  },
  {
    slug: "append-vs-upsert-duplicate-key-violations",
    title: "Append vs Upsert: duplicate key violations in time-series pipelines",
    date: "2026-05-28",
    tags: ["Database", "Data Engineering"],
    excerpt: "A 9% failure rate traced to writing to two databases with different write strategies.",
    readTime: 3,
    body: `A 9% failure rate on our daily data pipeline. The errors were all UniqueViolation: duplicate key value violates unique constraint. They clustered at specific hours — 20:xx, 08:xx, 15:xx — and then disappeared for days.

The root cause was a two-destination write pattern. The script wrote the same data to two databases: production used if_exists='replace' (truncate and re-insert, always succeeds), and the backtest database used if_exists='append'. When retries or scheduler jitter caused overlapping run windows, the second run tried to append rows that the first run had already inserted. The production database never showed the error — it was silently re-creating tables. The backtest database caught the conflict and failed.

Any time-series pipeline where run windows can overlap must use upsert semantics, never plain append. The fix was a staging temp table pattern with INSERT ... ON CONFLICT DO UPDATE, which handles retries, overlapping runs, and backfills without data duplication.

We applied this across the fleet. But the broader pattern is worth naming: whenever your pipeline writes to multiple destinations with different write strategies, you're one deployment away from a non-obvious failure that only affects some outputs.`,
  },
  {
    slug: "gcp-to-aws-migration-firewall-health-checks-ssl-idle",
    title: "The GCP to AWS migration: firewall, health checks, and SSL idle drops",
    date: "2026-06-15",
    tags: ["Infrastructure", "Migration"],
    excerpt: "A one-afternoon migration, two weeks of recovery. Three problems stacked.",
    readTime: 4,
    body: `We migrated our main PostgreSQL database from GCP Cloud SQL to AWS RDS in June. The migration itself took an afternoon. Recovering from it took two weeks.

Three problems stacked:

1. The AWS security group only allowlisted a single old home IP. When GitHub Actions runners tried to connect, they were silently black-holed — not connection refused, just timeout. The migration checklist had "update firewall rules" as a line item, but nobody had enumerated every caller IP beforehand.

2. The R price-fetch job opened a database connection at startup, spent 2-3 minutes fetching ~1,000 coin prices, and then tried to save — only to find the connection had been dropped by the new AWS idle timeout. This had never happened on GCP Cloud SQL because it had a different connection-handling policy. The fix: reconnect before write and set sslmode=require.

3. The health check was reporting green throughout. It was checking "did the step script run?" not "is the database reachable and returning fresh data?" A health check that doesn't fail on the actual failure mode is worse than no health check — it creates false confidence that delays investigation.

We fixed all three — opened the firewall, added reconnect-before-write logic, and replaced the fake health check with a real pipeline that verifies connectivity, auth, and data freshness. But the migration bill was 11 days of missing data and a scramble to backfill.

The playbook now has a "pre-cutover" step: enumerate every consumer's IP or network range and open the firewall before the switch. Every migration gets a two-gate deletion rule: a backup must exist and a parity check must pass before the old resource is retired.`,
  },
  {
    slug: "11-days-of-missing-data-backfill",
    title: "11 days of missing data: how we backfilled with duplicate-safe writes",
    date: "2026-06-22",
    tags: ["Operations", "Data Engineering"],
    excerpt: "Backfilling 11 days of OHLCV data isn't a replay — it's data archaeology.",
    readTime: 4,
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
    slug: "self-hosting-llms-when-to-buy-vs-run-your-own",
    title: "Self-hosting LLMs: when to buy vs run your own",
    date: "2026-06-29",
    tags: ["Cost Engineering", "AI"],
    excerpt: "The break-even threshold for self-hosting beats APIs: ~1,000-1,600 req/day AND 70B+ quality.",
    readTime: 4,
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
    slug: "what-happens-when-theres-no-ci-pratyaksha-deploy",
    title: "What happens when there's no CI: the pratyaksha deploy",
    date: "2026-07-03",
    tags: ["DevOps", "CI/CD"],
    excerpt: "A production app with no push-to-deploy pipeline is an incident waiting to happen.",
    readTime: 3,
    body: `Pratyaksha — our AI cognitive journaling app — had no CI pipeline. Every release depended on three fragile local conditions: a running Docker daemon, a fresh Firebase CLI token, and valid local AWS credentials. If any of those were missing, the deploy failed. And every deploy was manual.

The failure cascade was predictable: merge to main, deploy nothing. The developer tries to deploy locally, Docker Desktop isn't running. Start Docker, try again, Firebase auth token expired (firebase login:list lied and showed the account as logged in). Try firebase login --reauth — refuses non-interactive mode in the terminal. Three hours lost to a deployment that should have been a push.

The fix was PR #20: a deploy-pratyaksha.yml that triggers on push to main, builds the frontend on the GitHub runner, pushes the Docker image to ECR, and redeploys Lightsail — all with keyless WIF/OIDC auth. No local credentials, no Docker Desktop dependency. The pipeline ran green on first push: frontend in 2m55s, backend in 3m49s.

The rule: a production app with no push-to-deploy pipeline is an incident waiting to happen. CI is not optional infrastructure — it's the minimum viable deployment mechanism. Every hour spent on CI setup saves a day of debugging "but it works on my machine" later.

Also: CLI login tokens rot independently of browser sessions. firebase login --reauth cannot be automated. Use keyless identity (WIF/OIDC) everywhere.`,
  },
  {
    slug: "firebase-auth-vs-custom-jwt",
    title: "Firebase Auth vs custom JWT: what we chose at CryptoPrism",
    date: "2026-07-06",
    tags: ["Security", "Auth"],
    excerpt: "Firebase for identity, our own JWT for authorisation. Don't outsource authorisation.",
    readTime: 4,
    body: `We started with Firebase Auth because it's free, fast, and handles 90% of auth flows out of the box — email/password, Google sign-in, anonymous sessions. Six months in, we hit the wall: Firebase Auth doesn't support custom JWT claims without a Cloud Function workaround, and our permission model needed per-user, per-exchange rate limits that couldn't live in a Firebase token.

The decision was to keep Firebase Auth as the identity provider (login, MFA, session management) but issue our own JWTs from the FastAPI backend for all authorisation. Firebase handles "who you are" — our backend handles "what you can do."

This split is critical: Firebase Auth is optimised for identity, not authorisation. Trying to force authorisation into Firebase custom claims works until your permission model grows beyond roles (admin/user) into resource-level policies (can read Binance data but not write trades). The moment you need resource-level auth, you need your own token.

The migration took two weekends: one to add JWT endpoints to the API, one to update all clients. Firebase Auth tokens now map to internal user records, and our JWTs carry the actual permission payload — exchange limits, feature flags, API quota. We kept the Firebase login UX but replaced everything underneath.

The lesson: don't outsource authorisation to an identity provider. Use them for what they're good at (login flows, MFA, social auth) and own the authorisation layer yourself.`,
  },
  {
    slug: "cryptoscore-weights-are-a-product-decision",
    title: "Why CryptoScore weights are a product decision, not an engineering one",
    date: "2026-07-10",
    tags: ["Architecture", "Product"],
    excerpt: "The composite token rating weights change what users see. That makes them a product decision.",
    readTime: 4,
    body: `CryptoScore is our composite token rating — a single number that combines on-chain metrics, market value dynamics, and momentum signals. It sounds like an engineering problem. It's not.

The formula today: OnChain (40%) + Value (30%) + Momentum (30%). When on-chain data is missing for a chain, the remaining two components reweight to 50/50. These weights determine which tokens surface to users, which get flagged as anomalies, and which disappear from the discovery feed. Changing a weight is a product decision that directly affects what users see.

The engineering challenge is less about the math and more about the architecture. compute_crypto_score() is a single function with hardcoded positional float arguments. There's no signal registry — adding a new signal means editing the function signature, adding a parameter, rebalancing all existing weights, and remembering to update both call sites (single-token endpoint AND leaderboard endpoint) independently. They duplicated the branching logic, and nothing enforces that the two stay in sync.

The same pattern applies to on-chain metrics: no plugin system, no base class. Each metric gets its own hand-written Python module with a fetch() function, then gets manually wired into the scheduler pipeline via copy-paste if-blocks. It works — we have 17 chains running — but adding a new chain means editing three separate files in the right order.

The honest fix would be a signal registry with a plugin interface. But the real constraint is that every weight change needs a product conversation first. Until the formula stabilises, the brittle architecture is the right tradeoff — it's easier to change a hardcoded function than a plugin system, and the weights are changing quarterly.`,
  },
  {
    slug: "the-427-cost-lesson-bigquery-materialized-views",
    title: "The $427/yr cost lesson from BigQuery materialized views",
    date: "2026-07-14",
    tags: ["Cost Engineering", "BigQuery"],
    excerpt: "Materialized views took our BigQuery bill from $1,200/mo to $36/mo — a 97% reduction.",
    readTime: 3,
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
    slug: "why-we-built-a-72-pb-pipeline-instead-of-buying-glassnode",
    title: "Why we built a 72 PB pipeline instead of buying Glassnode",
    date: "2026-07-20",
    tags: ["Architecture", "Build vs Buy"],
    excerpt: "Glassnode charges $800/mo for data we serve at $30/mo. The moat isn't the data — it's the pipeline.",
    readTime: 4,
    body: `Glassnode charges $800/mo for the same data we now serve at $30/mo. The build-vs-buy case was never about cost alone — it was about control over schema design, query shapes, and the ability to add an execution layer on top without asking a vendor for API access.

The key insight: crypto market data is public. Every transaction, every block, every on-chain event is broadcast and recorded. The moat isn't the data — it's the pipeline that normalises, indexes, and makes it queryable. Once we owned that pipeline, we could build things a vendor would never prioritise: NLP-to-SQL chat, cross-chain correlation, custom ML scoring.

The real cost wasn't the $427/yr in BigQuery — it was the 2,200 lines of SQL that needed to stay correct across hard forks, chain reorgs, and schema drift. That's a people cost, not an infrastructure cost. We bet that writing and maintaining that SQL was cheaper than paying Glassnode's margin forever. Two years in, it was the right call.`,
  },
];

const JOURNAL_POSTS: Omit<Post, "kind">[] = [
  {
    slug: "why-im-writing-this-weekly",
    title: "Why I'm writing this weekly",
    date: "2026-07-31",
    tags: ["Life", "Build"],
    mood: "clear",
    excerpt:
      "A new Friday ritual. Three reasons I'm starting a personal journal alongside the technical notes and the founder hub — and what to expect.",
    readTime: 3,
    body: `Three things this journal is, and one thing it isn't.

It is a Friday check-in. Not a newsletter, not a launch announcement, not a "5 lessons from this week" listicle. Just whatever I was thinking about, written down. Some weeks will be about shipping. Some weeks will be about what I read, who I met, what I noticed while walking home.

It is honest in a way the rest of the site isn't. /thinking is technical architecture — useful, but edited for clarity. /founders is curated knowledge — useful, but built for an audience. /journal is the messy middle. I write about mistakes, doubts, family stuff when it matters, things I changed my mind about, things I'm still figuring out. The signal-to-noise is lower. That's the point.

It is short. Most posts will be 500-800 words. Some will be 200. A few might be 1500 if something really matters. If I can't say it in 800 words, I probably don't know what I think yet.

It is not a substitute for therapy, mentorship, or friendship. I have all three. /journal is what I'd write if I were a slightly more public version of myself — still private, but with a wider table.

Why weekly? I tried monthly and it rotted. Daily was a fantasy. Weekly is the cadence where one post is a small enough commitment that I'll actually do it, and frequent enough that I can't get away with a single throwaway line. Friday is good because the week is done and I have something to say about it.

If you read this, expect a different register than /thinking. The technical posts are for engineers evaluating my craft. The founder hub is for operators evaluating my judgment. This is for people who want to know what it's like to be a particular person building particular things in a particular city at a particular time. That's a smaller audience. It's also the one I most want to keep.

Three posts today to launch. One is a candid failure I rarely talk about. One is the behind-the-scenes of shipping this site. One is what I'm reading. The rest will be whatever I think next Friday.

See you in a week.`,
  },
  {
    slug: "what-i-got-wrong-about-my-second-startup",
    title: "What I got wrong about my second startup",
    date: "2026-07-25",
    tags: ["Life", "Build"],
    mood: "tired but clear",
    excerpt:
      "Gamerz Nation was my first company at 22. Trinetry was my second. Both taught me things I wish I'd known earlier. The honest version.",
    readTime: 4,
    body: `Gamerz Nation worked. We ran 7 gaming zones, crossed $100K in the first year, hired a team of 12. By every metric, it was a successful first business. By age 24 I had a regional gaming brand and a team I was proud of. Then I shut it down.

I don't talk about Gamerz Nation much in the portfolio because the story is "I built it, it worked, I sold or closed it." The honest version is: I closed it because I was bored, not because it wasn't working. The business was profitable. I just didn't want to do it anymore. That's a luxury most founders don't have. I had it because I was 24 with no dependents and a willingness to walk away from monthly cash flow.

The lesson I took from that was wrong. I thought: "If I can build a profitable business I'm bored of, I can build a profitable business I'm excited about." That is true in a narrow sense. It's also a much harder constraint to satisfy than I gave it credit for.

Trinetry was the test. I started it in 2021 with the explicit goal of building something I'd want to run for a decade. Crypto data infrastructure. NLP-to-SQL. AI-native ERP for Indian SMEs. I was excited about the problem space. I still am.

What I got wrong: I confused "I want this to exist" with "I want to be the one to make it exist." The first is a thesis. The second is a 10-year committment. They're different questions with different answers.

Three specific mistakes from year one and two of Trinetry:

1. I built too much, too fast. Six production-grade apps in six months. Sounds like velocity. Was actually avoidance — building new things is easier than selling the existing thing. I was using engineering as a substitute for commercial traction.

2. I hired too late, then hired too senior. The first engineer I hired was a senior architect who needed a more senior team than I had to hire. By the time I had the team he needed, we'd both moved on. The second time I hired I waited too long. The third time I tried to grow the team before the revenue supported it.

3. I didn't say no to the wrong customers. I took on enterprise consulting work that paid well but ate 60% of my bandwidth. It funded the rest of the company but it was not the company. I confused revenue with progress.

What's the recovery look like? Two things: I cut the consulting work in 2024, took a 50% revenue hit, and rebuilt the core product without the consulting tail. I wrote down three questions I ask before any new direction: "Will I want to do this in three years?" "Does this compound or just pay?" "Am I avoiding something harder?" If I can't answer yes, yes, no — I don't do it.

The version of Trinetry today is a better company than the one I started in 2021. It's also a smaller one. That's the trade.`,
  },
  {
    slug: "three-days-shipping-the-portfolio-redesign",
    title: "Three days shipping the portfolio redesign",
    date: "2026-07-18",
    tags: ["Build"],
    mood: "energised",
    excerpt:
      "How I rewrote the home page, added a desktop metaphor, shipped 12 deep case studies, and wrote 12 architecture notes — all in 72 hours.",
    readTime: 4,
    body: `The portfolio you're reading right now got rebuilt in three days. That's not a flex — it's a confession. The previous version had been "almost done" for six months.

I keep a running list of the things on the site that were 80% there. The desktop window metaphor was 80%. The architecture notes were 80%. The brand badges were 80%. Each individual item was small. The system was 30%.

The decision to ship in 72 hours came from a benchmark exercise, not inspiration. I read three top-tier engineer portfolios (Brittany Chiang, Rauno Freiberg, Lee Robinson) and wrote down what each did better than mine. The list was short but clear: hero subtitle with brands, social proof in the first viewport, a writing surface. I picked three things to fix and gave myself three days.

Day one was the hero. Added a one-liner subtitle ("Built for Times of India · Barclays · Isha Foundation — I can do the same for you"), five brand pill badges, and a live GitHub stats card that fetches the actual repo count from the GitHub API. I had a static "6+" placeholder for two months. Live data is one fetch call. The static version said "I claim." The live version says "I ship."

Day two was the case studies. I had 12 case studies sitting in markdown from 2024-2025. None of them were linked from the homepage. None had a consistent LeadershipLens (the four-quadrant framework: call, bet, tradeoff, outcome). I wrote the LeadershipLens content for the six case studies that were missing it — a Saturday morning of looking at my own old decisions and writing them down honestly. The case study cards now show a chapter count badge on the image, so visitors see "7 chapters" before they click.

Day three was /thinking. I had three architecture notes. I needed 12. I spent six hours reading the second-brain knowledge base (a private Obsidian vault I keep) and wrote nine more notes, backdated across April through July 2026. Topics: the GCP-to-AWS migration, the 60-day GitHub Actions disable, BigQuery cost optimisation, Instagram auth rot, LLM self-hosting break-even, the SSL-idle-drop bug. All real incidents, all real numbers, all written from the perspective of "what I would do differently."

The 72-hour rule I used: no new features. The redesign only touched three things: hero social proof, case study depth, and writing surface. Everything else (the desktop window system, the founder playbooks, the working projects) was already there. I was just hiding it.

If you're a solo founder with a site that's been "almost done" for months, the move is the same: pick the three things a top-tier reference does better than you. Fix only those. Ship. Repeat quarterly.

The build window was useful. It also produced a pile of small bugs I haven't fixed yet. Trade-offs.`,
  },
];

export const posts: Post[] = [
  ...THINKING_POSTS.map((p) => ({ ...p, kind: "thinking" as const })),
  ...JOURNAL_POSTS.map((p) => ({ ...p, kind: "journal" as const })),
  ...WEEKLY_REVIEWS.map((p) => ({ ...p, kind: "review" as const })),
].sort((a, b) => (a.date < b.date ? 1 : -1));

export const ALL_TAGS: string[] = Array.from(
  new Set(posts.flatMap((p) => p.tags))
).sort();

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByTag(tag: string): Post[] {
  return posts.filter((p) => p.tags.includes(tag));
}

export function getPostsByKind(kind: PostKind): Post[] {
  return posts.filter((p) => p.kind === kind);
}

export function getAllPostSlugs(): string[] {
  return posts.map((p) => p.slug);
}
