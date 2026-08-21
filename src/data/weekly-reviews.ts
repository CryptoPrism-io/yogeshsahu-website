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
];
