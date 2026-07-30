export type JournalTag = "build" | "life" | "reading" | "ama";

export interface JournalEntry {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD, always Friday
  tags: JournalTag[];
  mood?: string;
  excerpt: string;
  body: string;
  readTime: number; // minutes
}

export const journal: JournalEntry[] = [
  {
    slug: "why-im-writing-this-weekly",
    title: "Why I'm writing this weekly",
    date: "2026-07-31",
    tags: ["life", "build"],
    mood: "clear",
    readTime: 3,
    excerpt:
      "A new Friday ritual. Three reasons I'm starting a personal journal alongside the technical notes and the founder hub — and what to expect.",
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
    tags: ["life", "build"],
    mood: "tired but clear",
    readTime: 4,
    excerpt:
      "Gamerz Nation was my first company at 22. Trinetry was my second. Both taught me things I wish I'd known earlier. The honest version.",
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
    tags: ["build"],
    mood: "energised",
    readTime: 4,
    excerpt:
      "How I rewrote the home page, added a desktop metaphor, shipped 12 deep case studies, and wrote 12 architecture notes — all in 72 hours.",
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

export function getJournalEntry(slug: string): JournalEntry | undefined {
  return journal.find((j) => j.slug === slug);
}

export function getAllJournalSlugs(): string[] {
  return journal.map((j) => j.slug);
}

export function getJournalByTag(tag: JournalTag): JournalEntry[] {
  return journal.filter((j) => j.tags.includes(tag));
}

export const JOURNAL_TAGS: { id: JournalTag; label: string; description: string }[] = [
  { id: "build", label: "Build", description: "Behind the scenes of shipping things" },
  { id: "life", label: "Life", description: "Personal reflections, family, culture" },
  { id: "reading", label: "Reading", description: "Books and articles with short commentary" },
  { id: "ama", label: "AMA", description: "Once a month, public questions answered" },
];
