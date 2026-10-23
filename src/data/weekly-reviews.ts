import type { Post } from "./posts";

// AUTO-GENERATED weekly reviews.
// The `weekly-review` GitHub Actions workflow appends a new entry here every
// Friday. Do NOT edit by hand — the bot owns this file.
export const WEEKLY_REVIEWS: Omit<Post, "kind">[] = [
  {
    slug: "week-01-auto-pilot",
    title: "Week 01 — the portfolio starts writing itself",
    date: "2026-08-07",
    tags: ["Review", "Build"],
    excerpt:
      "The first auto-generated weekly review — what shipped across the fleet, what broke, and what's next.",
    readTime: 2,
    body: `This is the first entry in the Weekly Review series. Every Friday, an automated pipeline pulls the last seven days of activity from the CryptoPrism repos, composes a summary, and publishes it here.

If this post reads like a changelog, that's the point. A portfolio should show the work, and the work should speak for itself — week after week, without a human having to remember to write it down.

Check back next Friday.`,
  },
  {
    slug: "week-31-review",
    title: "Week 31 — Plausible analytics rollout and UI polish",
    date: "2026-08-07",
    tags: ["Review"],
    excerpt: "Integrated Plausible self‑hosted analytics across multiple sites and shipped UI tweaks and bug fixes.",
    readTime: 2,
    body: `This week we merged multiple Plausible analytics integrations across our portfolio sites, refined analytics tracking, and made several small bug fixes and UI tweaks.

Shipped:
yogeshsahu-website: merged 10 PRs including UI fixes for landing pages, a design overhaul, an investor directory feature, and cursor companion enhancements.

trinetryinfotech-website: merged a PR adding the Plausible self‑hosted tracker.

puneglobalgroup-website: merged two PRs, one adding Firebase storage cleanup workflow and another adding Plausible analytics.

pratyaksha: merged a PR adding Plausible analytics.

gyanmarg: merged two PRs, one adding Plausible analytics and another fixing science‑adjacent content errors.

cpio-website: merged a PR adding Plausible analytics.

cryptoprism-tech-website: merged a PR adding Plausible analytics.

In progress:
Open PRs remain in puneglobalgroup-website, pratyaksha, gyanmarg, and cryptoprism-tech-website. The CryptoPrism-DB-Monitor repo continues daily auto‑date updates for the banner, indicating ongoing UI refinement.

Next week we’ll focus on finalizing the Plausible analytics rollout and polishing the landing page interactions.`,
  },
  {
    slug: "week-32-review",
    title: "Week 32 — Data Validation & Infrastructure",
    date: "2026-08-14",
    tags: ["Review"],
    excerpt: "This week's review covers data validation, infrastructure, and website updates for CryptoPrism and personal projects.",
    readTime: 2,
    body: `This week was focused on data validation and infrastructure improvements across CryptoPrism, alongside website updates and asset refreshes.

Shipped:

CryptoPrism-DB-D:
- Merged PRs for MVRV validation on daily data, materializing the latest top-100 DMV serving snapshot, and completing a PIT-safe DMV shadow rebuild.
- Also merged work on the PIT-safe DMV computation layer and the bounded shadow-rebuild dry-run runner.

CryptoPrism-News-Fetcher:
- Merged fixes for B0 event data, restoring FE_NEWS_EVENTS freshness and XRP/ripple mapping.
- Documented 9 pre-existing test failures as technical debt.

yogeshsahu-website:
- Updated availability mandates to use dynamic dates.
- Polished the Hallmark design system, migrating to design tokens and refining visual elements.
- Restructured the resources hub into dedicated pages.
- Added an AI Product Analyst offering, including a one-pager and design partner CTA.
- Implemented a reusable repo prompt and skill for product instrumentation.

linkedin-engine-assets:
- Deployed updated rotation images and carousels with improved readability.
- Replaced an image with a canvas-design hybrid.

In progress:
- CryptoPrism-DB-Monitor: Auto-updating banner dates.
- CryptoPrism-DB-D: One open pull request.

Next week, I'll be continuing to refine the data pipelines and website offerings.

Reflection: A hopeful outlook on growth and learning this week.`,
  },
  {
    slug: "week-32-review",
    title: "Week 32 — Database updates and site tweaks",
    date: "2026-08-17",
    tags: ["Review"],
    excerpt: "Automated banners, PR merges for CP-020 and CP-018, and a website fix",
    readTime: 3,
    body: `The week was mostly about database work and minor site fixes. In CryptoPrism-DB-Monitor, I automated banner date updates for the next week—seven commits, all boilerplate. CryptoPrism-DB-D saw more activity: merged PRs for final promotion recommendations, MVRV validation, and a PIT-safe DMV rebuild. The website repo merged a master branch and fixed a push error. Open work includes one pending pull in CP-DB-D. Next week, I’ll resolve that pull and expand on the DMV validations.


Reflection: Gratitude for the progress, even in the small wins, kept the mood hopeful.`,
  },
  {
    slug: "week-33-review",
    title: "Week 33 — Site Updates and Docs",
    date: "2026-08-21",
    tags: ["Review"],
    excerpt: "This week's review includes website redesigns, automated updates, and documentation merges.",
    readTime: 1,
    body: `This week was focused on incremental improvements and documentation. The DB Monitor saw automated updates, while the website received significant visual and functional enhancements. Some critical documentation work was also merged.

Shipped:

CryptoPrism-DB-Monitor:
Seven commits were purely automated banner date updates.

_yogeshsahu-website_:
Redesigned the Resources page with a bento grid.
Updated the TopNav with collapse and hover expansion.
Fixed a CSS variable for TopNav z-index.
Removed a WebkitBackdropFilter from Framer Motion.
Added a null initial value to an animation ref.
Integrated hideHeader prop for AboutWindow.
Triggered a redeploy.
Added profile enhancements and terminal commander integration.
Made the profile section interactive with product links on hover.

CryptoPrism-DB-D:
Merged a PR for the final promotion recommendation.
Documented the final promotion recommendation decision.

In progress:
pratyaksha: One open pull request.

Next week, I'll be focusing on the open PR for pratyaksha.`,
  },
  {
    slug: "week-34-review",
    title: "Week 34 — Website Tweaks and Maintenance",
    date: "2026-08-28",
    tags: ["Review"],
    excerpt: "This week involved website updates and routine maintenance across our projects.",
    readTime: 1,
    body: `This past week was focused on website updates and minor maintenance. We pushed changes to both the main marketing site and the technical documentation site, along with some routine updates to our monitoring tools.

Shipped:

CryptoPrism-DB-Monitor:
- Automated banner date updates.

cryptoprism-tech-website:
- Synced local Plausible analytics skill with remote master.

cpio-website:
- Fixed homepage CTAs to route to the product app.
- Reverted a previous change that routed CTAs directly to the product app.
- Merged a feature to route marketing CTAs to the product app.
- Refined the desktop homepage hierarchy and proof.

In progress:
No open pull requests this week.

Next week, we'll be looking at further website optimizations.`,
  },
  {
    slug: "week-35-review",
    title: "Week 35 — Maintenance and Upkeep",
    date: "2026-09-04",
    tags: ["Review"],
    excerpt: "A look at the past week's GitHub activity, focused on maintenance and automated tasks.",
    readTime: 1,
    body: `This past week was largely about maintenance and ensuring core services are running. No major feature development, mostly keeping the lights on. Automated tasks continue to execute as expected, and I've updated some expiry dates on a few internal tools.

**Shipped**

*   **CryptoPrism-DB-Monitor**: 8 commits, updating banner expiry dates across the next few years.
*   **CryptoPrism-News-Fetcher**: 3 commits, continuing automated hourly news fetches.
*   **CryptoPrism-QA-System**: 1 commit, a minor keep-alive.
*   **CryptoPrism-DB-H**: 1 commit, a minor keep-alive.
*   **CryptoPrism-DB-Backtest**: 1 commit, a minor keep-alive.
*   **ForexFactory-Calendar-Scraper**: 1 commit, a minor keep-alive.
*   **yogeshsahu-website**: 1 commit, adding this weekly review.

**In progress**

*   **puneglobalgroup-website**: 1 open pull request. Still waiting on final review for that.

Next week, I'll be looking at some performance tuning for the database monitor.`,
  },
  {
    slug: "week-36-review",
    title: "Week 36 — Maintenance and Infrastructure Deployment",
    date: "2026-09-11",
    tags: ["Review"],
    excerpt: "This week saw automated maintenance for our monitoring and news fetching systems, alongside a significant infrastructure deployment for our outreach CRM.",
    readTime: 1,
    body: `This week was focused on maintaining background processes and deploying a key piece of infrastructure. Automation updates and a significant infrastructure deployment were the main activities.

Shipped:

CryptoPrism-DB-Monitor:
Seven commits, all automated updates to the banner date. This ensures our monitoring system reflects current operational parameters.

CryptoPrism-News-Fetcher:
Five commits, all automated hourly news fetches. Keeping the news pipeline running consistently is critical for timely data ingestion.

puneglobalgroup-website:
One merged pull request: "Deploy Outreach CRM to private AWS runtime." This is a foundational step for our customer outreach capabilities, moving it to a dedicated AWS environment.

In progress:
No open pull requests across the repositories.

Next week, we'll be focusing on enhancing data processing pipelines.`,
  },
  {
    slug: "week-37-review",
    title: "Week 37 — Keeping the data pipeline current",
    date: "2026-09-18",
    tags: ["Review"],
    excerpt: "This week was mostly routine maintenance: daily banner updates and scheduled news ingestion across the CryptoPrism repositories.",
    readTime: 1,
    body: `This week was mostly routine maintenance across CryptoPrism. The repositories stayed current through scheduled automation: daily updates to the database monitor banner and several automated news-fetch runs.

Shipped

CryptoPrism-DB-Monitor
Seven automated commits updated the banner date for Sep 12 through Sep 18, 2026.

CryptoPrism-News-Fetcher
Five automated hourly news-fetch runs completed between Sep 11 and Sep 17.

There were no merged pull requests this week.

In progress

There are no open pull requests or other active work represented in this week's activity. The focus remains on keeping the existing scheduled jobs running reliably.

Next week, I’ll continue monitoring the automated pipeline and address anything that needs attention.`,
  },
  {
    slug: "week-38-review",
    title: "Week 38 — Pipeline Maintenance",
    date: "2026-09-25",
    tags: ["Review"],
    excerpt: "This week's CryptoPrism review covers automated pipeline maintenance and data fetching.",
    readTime: 1,
    body: `This past week focused on maintaining and automating core data pipelines for CryptoPrism. The bulk of the activity involved ensuring our monitoring and news fetching systems ran smoothly and were up-to-date.

Shipped:

CryptoPrism-DB-Monitor:
Automated banner date updates across seven commits. This ensures our internal monitoring tools reflect current operational statuses.

CryptoPrism-News-Fetcher:
Five commits for automated hourly news fetches. These updates confirm the continuous ingestion of relevant market information.

In progress:
No open pull requests this week.

Next week, we'll be looking at performance optimizations.`,
  },
  {
    slug: "week-39-review",
    title: "Week 39 — Automation and maintenance keep the pipeline humming",
    date: "2026-10-02",
    tags: ["Review"],
    excerpt: "Routine automation updates and keep‑alive commits kept the CryptoPrism services running smoothly this week.",
    readTime: 1,
    body: `This week I focused on tightening up automation — updating banner dates, scheduling hourly news fetches, and keeping services alive with simple keep‑alive commits.

Shipped: CryptoPrism-DB-Monitor updated the banner date each day from Sep 26 to Oct 2, 2026; CryptoPrism-News-Fetcher executed hourly news fetches between Sep 25 and Oct 1, 2026; the other repos received keep‑alive commits.

No open PRs or pending work this week.

Next week I’ll keep the automation pipeline stable and begin integrating additional data sources.`,
  },
  {
    slug: "week-41-review",
    title: "Week 41 — Moving two apps off Firebase and onto AWS",
    date: "2026-10-16",
    tags: ["Review"],
    excerpt: "A quiet commit week on the surface, but two merged PRs moved pratyaksha and Polymind fully onto AWS.",
    readTime: 2,
    body: `Week 41 was mostly an infrastructure week. The commit counts look quiet — a lot of them are bot-generated — but the real work happened in two merged PRs that moved two products off Firebase and onto AWS. Everything else ran itself, which is honestly the point of the automation.

Shipped

pratyaksha — Merged PR #25: frontend hosting moved from Firebase to S3 + CloudFront. Same content, faster edge delivery, and one less vendor to manage.

gyanmarg — Merged PR #28: Polymind user data moved to DynamoDB and hosting to CloudFront. This closes out the storage side of the AWS migration for that app.

CryptoPrism-DB-Monitor — 7 automated commits keeping the banner dates current. Boring by design.

CryptoPrism-News-Fetcher — 5 automated hourly fetches through the week. The pipeline did its job without me touching it.

In progress

No open PRs right now. The follow-up work from this week is unglamorous: verifying CloudFront cache behavior on the migrated frontends, tightening IAM policies for the new DynamoDB access patterns, and comparing the first AWS bill against what Firebase was charging us. I want real numbers before I call the migration done.

Next week: finish the migration cleanup, kill the Firebase billing, and write up what the move actually cost in time versus what it saves.`,
  },
  {
    slug: "week-42-review",
    title: "Week 42 — Reliability and QA fixes",
    date: "2026-10-23",
    tags: ["Review"],
    excerpt: "This week I focused on making backfills, QA checks, and scheduled workflows more dependable across CryptoPrism.",
    readTime: 2,
    body: `This week was mostly about reliability across the CryptoPrism repos: fixing data backfills and QA checks, keeping scheduled workflows active, and resolving a dependency issue in backtesting. The news fetcher and DB monitor also continued their automated updates.

Shipped

CryptoPrism-DB-D: Merged fixes to backfill all coins and add Supertrend, Aroon, and Bollinger Bands, with atomic writes and safer defaults. I also added a monthly workflow keep-alive and enabled Claude workflows to post reviews and replies.

CryptoPrism-QA-System: Updated checks for the current RDS schema and made errors fail the run. Fixed stale imports and the SSL connection to RDS, and corrected the DMV score range to -100..100.

CryptoPrism-DB-Backtest: Pinned Plotly below version 6 to keep it compatible with vectorbt 0.28.1.

CryptoPrism-DB-Monitor and CryptoPrism-News-Fetcher: Automated banner-date updates and hourly news-fetch runs continued through the week. I also refreshed READMEs across the repos.

In progress

There are four open PRs in CryptoPrism-DB-D and one in CryptoPrism-QA-System. The activity data doesn’t include their details, so I’ll review and move those forward next.

Next week, I’ll focus on closing the remaining open PRs and checking that the updated workflows run cleanly.`,
  },
];
