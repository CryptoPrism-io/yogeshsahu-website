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
];
