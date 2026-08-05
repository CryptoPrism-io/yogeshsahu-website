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
];
