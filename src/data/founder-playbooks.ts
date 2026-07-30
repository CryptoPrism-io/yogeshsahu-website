export type PlaybookCategory =
  | "operating"
  | "hiring"
  | "fundraising"
  | "sales"
  | "mental-health";

export interface FounderPlaybook {
  slug: string;
  title: string;
  category: PlaybookCategory;
  readingTime: number; // minutes
  summary: string;
  body: string;
  publishedDate: string; // YYYY-MM-DD
}

export const founderPlaybooks: FounderPlaybook[] = [
  {
    slug: "the-12-slide-pitch-deck-structure",
    title: "The 12-slide pitch deck structure that gets meetings",
    category: "fundraising",
    readingTime: 6,
    publishedDate: "2026-08-01",
    summary:
      "Twelve slides, one per idea, in the order investors actually read. Tested across 80+ pitch meetings from pre-seed to Series A.",
    body: `The pitch deck I send to investors has twelve slides. Each slide does one job. The order is not arbitrary — it mirrors how an investor processes a deck in the first 90 seconds, then again in the second pass, then again in the meeting.

1. Title — company name, one-line positioning, your name, your ask.
2. Problem — the specific pain your customer has, in their words.
3. Solution — what you built, in one sentence, with a screenshot.
4. Why now — what changed in the market that makes this possible today.
5. Market size — TAM, SAM, SOM with the math, not just the number.
6. Business model — how you make money, unit economics, gross margin.
7. Traction — the most impressive metric you have, with a chart.
8. Customers — three named logos with quotes, or one deep case study.
9. Competition — a 2x2 matrix, not a list. Show why your position is defensible.
10. Team — three people max, with one-line credentials that matter for this problem.
11. Roadmap — three quarters of what's next, with one sentence per quarter.
12. Ask — round size, use of funds, lead investor you're talking to.

The mistake I see most often: founders try to make every slide answer every question. They end up with thirty slides, none of them sharp. Investors don't read thirty slides. They read twelve. Make those twelve count.

The second mistake: the "Team" slide is usually a CV dump. Don't list every job. List the one credential that makes you the right person to solve this problem. If you don't have one, say what you're looking for in a co-founder. That honesty reads better than filler.

A twelve-slide deck should fit on twelve minutes of presentation, which means 60-90 seconds per slide. If a slide takes three minutes to explain, the slide is wrong — the visual is doing less than the verbal. Either simplify the visual or move the content to a backup slide.

I've sent 80+ pitch decks using this structure. The response rate (replies + meetings booked) has been consistently 25-35% at the pre-seed stage, 15-20% at seed. Investors who reply say the same thing: "Clear, easy to scan, I knew what you wanted in two slides." That's the test.`,
  },
  {
    slug: "how-to-run-weekly-team-reviews",
    title: "How to run weekly team reviews that don't waste time",
    category: "operating",
    readingTime: 5,
    publishedDate: "2026-08-01",
    summary:
      "30 minutes, fixed agenda, three sections. The format I use at Trinetry for the last four years. Why most weekly meetings are broken and how to fix them.",
    body: `Most weekly team meetings are a waste of time. I know because I ran them badly for two years before I figured out the format that works. The format has three rules: 30 minutes max, fixed agenda, three sections only.

Section one: Wins (5 minutes). Everyone shares one thing that went well this week. Specific, measurable, attributable to a person. "We shipped the new dashboard" is too vague. "Sneha shipped the new dashboard on Tuesday, ahead of the Friday deadline, and three customers have already logged in" is the right level.

Section two: Blockers (10 minutes). Everyone shares one thing blocking their work. The rule: name the person who can unblock you, and what you need from them. "I'm blocked on the API rate limit" doesn't help. "I'm blocked on the API rate limit and I need Aakash to either raise the limit on the staging env or confirm we can live with 100 req/min in production" is the right level.

Section three: Priorities (10 minutes). Three to five things we're committing to ship next week. Each is named, owned, and dated. If something from this week's priorities didn't ship, it goes back on next week's list with an explanation. The point is accountability, not blame.

Section four (5 minutes, if there's time): Async items. Things that don't need a meeting but need a quick sync. "Does everyone have feedback on the new pricing page? Speak now or forever hold your peace." This is where most meeting time gets wasted — people bring up small things that could've been in a Slack thread. The rule: if it can be a message, it should be a message.

The format that doesn't work: open agenda, "what's on your mind this week?" That sounds democratic and it is, which is the problem. Democracy is slow. A weekly review is a forcing function, not a town hall. The point is to ship, not to feel heard.

The format that doesn't work, take two: status reports read aloud. If you have a status report, send it as a message. The meeting is for what doesn't fit in a message — alignment, decision-making, calling out risks.

I've run this format weekly for four years across teams of 4 to 14. The reviews take 25-35 minutes depending on the week. People leave knowing what they own, what's blocking them, and what the team is shipping. That's the test.`,
  },
  {
    slug: "first-engineering-hire-signals-that-matter",
    title: "First engineering hire: signals that matter, signals that don't",
    category: "hiring",
    readingTime: 7,
    publishedDate: "2026-08-01",
    summary:
      "What to look for, what to ignore, and the three questions that predict whether someone will thrive in a 0-to-1 environment. From hiring six engineers across Trinetry and the PGG project.",
    body: `Hiring your first engineer is the most consequential hire you'll make as a non-technical founder, or as a technical founder hiring outside your domain. Get it right and the second hire is easier. Get it wrong and you'll spend a year recovering.

The signals that matter:

1. Have they shipped something users actually use? Not "built" — shipped. Not "we deployed it" — users actually use it. The difference matters. A senior engineer at a big company may have "shipped" features that 12 people use. A junior engineer at a startup may have shipped a feature 12,000 people use. The latter has more signal.

2. Can they explain a complex system in five minutes? Not "give a tour of their codebase" — explain a complex system. The codebase is a proxy. The real test is whether they can think about systems at the right altitude. Five minutes is the time you have in a meeting. If they need twenty, they can't communicate with non-engineers.

3. Do they ask about the problem, or about the stack? "What are you building?" is a stack question. "What problem are you solving for whom?" is a problem question. The second is the right one. Engineers who lead with the stack are optimizing for the wrong axis.

The signals that don't matter:

- Years of experience. A 22-year-old with two production systems is more valuable than a 35-year-old with ten "years" of mostly-meetings.
- Big-company pedigree. Someone who shipped at Google might not be able to ship at your stage. Big companies teach you to ship within guardrails. Startups need you to ship without guardrails.
- Language or framework. Most of what makes a good engineer is framework-agnostic. The specifics are learnable in two weeks.
- Side projects. Side projects show curiosity, not capability. The signal is the same for someone who doesn't have side projects because they have kids and a full-time job.

The three interview questions I use:

Question one: "Tell me about the last time you disagreed with your team about a technical decision. What did you do?" I'm listening for: did they push back, did they document their position, did they accept the team's decision once it was made, did they follow up afterward if their concern proved valid. Disagreement handled well is the strongest predictor of senior behaviour.

Question two: "Walk me through the last production incident you handled. What broke, what did you do, what did you learn?" I'm listening for: do they start with the customer impact, do they know the root cause (not just the proximate cause), do they have a story about prevention.

Question three: "What's the smallest, most useful thing you could ship in your first week here?" I'm listening for: do they have a thesis before they have access, is the answer small enough to be real, do they explain how they'd validate it without building the whole thing.

I've hired six engineers using this framework. Five of them are still on the team or moved to senior roles elsewhere. One didn't work out. The pattern on the one that didn't: they couldn't answer question one without blaming their previous team.

The minimum bar I won't compromise on: they have to have shipped something users use. If they haven't, they're not a first hire. They might be a great second hire.`,
  },
  {
    slug: "founder-loneliness-5-things-that-helped",
    title: "What founder loneliness actually feels like (and 5 things that helped)",
    category: "mental-health",
    readingTime: 6,
    publishedDate: "2026-08-01",
    summary:
      "Three years in, I couldn't tell anyone the full truth about how the company was going. Here's what I tried, what worked, and what didn't.",
    body: `The most isolating part of running a company is that you can't tell anyone the full truth about how things are going. Not your team, not your investors, not your family, not your friends. Every audience gets a different version of reality — the version that lets them keep doing their job without panicking.

Three years into Trinetry, I was sitting with a number that was genuinely bad — not "we have to raise soon" bad, but "we might not make payroll in four months" bad — and I had a coffee with a friend who asked "how's the company going?" I said "good, busy, shipping." I lied. He didn't know. I didn't let him know.

That gap between what you can say and what's actually true gets bigger over time. The team needs you to be confident. Investors need you to be on track. Family needs you to be okay. Friends need you to be the same person they remember. You are none of those things. You are the only person who knows the full truth. That is what founder loneliness actually is — not being alone, but being alone with information.

Five things that helped, in order of how much they helped:

1. A peer group of founders at the same stage. Not a Slack channel. A standing monthly dinner with four or five founders where the only rule is "say the real thing." This was the single biggest lever for me. We shared numbers, fears, layoffs, almost-failures, family strain. The dinner was the only place I could say "we might not make payroll" and have someone nod because they'd been there.

2. Therapy with someone who'd worked with founders. Not generic therapy. The kind that knows the specific grief of having to choose between paying yourself and paying your team. I went weekly for two years. It cost me 4% of my annual income. Worth every rupee.

3. A weekly walk with one person who could hold the full truth. For me, that was my co-founder's wife. She wasn't on the cap table, wasn't on payroll, but she'd been through the previous company and understood the stakes. I called her the "trusted witness" — her job was to listen and not solve.

4. A physical practice that didn't optimise for anything. Running, swimming, climbing — something where the goal was the activity, not the outcome. I tried three "fitness routines optimised for executive performance" and they all felt like work. I do better with a sport where the score doesn't care what your company did this week.

5. Writing about the hard parts. I kept a private journal for two years before I started /journal. The act of putting the worst thing on paper, even if no one reads it, moves it from rumination to articulation. Articulated fears are smaller than unarticulated ones.

What didn't help: motivational content, founder Twitter, "mindset" books, networking events, retreats. All of these are ways to perform being a founder rather than to actually process the experience.

If you're a founder reading this and you don't have your own version of the five things above, that's the first thing to fix. The loneliness doesn't go away on its own. You build infrastructure for it, like everything else.`,
  },
  {
    slug: "what-i-check-before-any-fundraising-conversation",
    title: "What I check before any fundraising conversation",
    category: "fundraising",
    readingTime: 5,
    publishedDate: "2026-08-01",
    summary:
      "Twelve pre-call checks that take 90 minutes and double your close rate. The boring operational work that separates founders who raise from founders who pitch.",
    body: `Before I take a fundraising meeting, I do twelve checks. They take 90 minutes total, and they've roughly doubled my close rate from cold outreach to funded round compared to when I skipped them. Most of them are boring. All of them are necessary.

The checks:

1. LinkedIn profile — full picture, no gaps, endorsements from people the investor knows. Investors check this before the call. If your profile looks weak, the call is uphill.

2. Mutual connections — anyone in common from previous companies, schools, or investors. Mentioning them in the first five minutes changes the temperature of the room.

3. Recent investments — what have they funded in the last 6 months? Are they writing checks at my stage? Are they leading or following? If they're not writing checks at my stage, this is research, not a real opportunity.

4. Portfolio overlap — do they already fund a competitor? If yes, walk away or be very specific about how you differentiate. Don't pretend the overlap doesn't exist.

5. Partner personality — public talks, podcasts, Twitter. What do they actually care about? Which pattern in their questions reveals a thesis?

6. Deck alignment — does my deck answer the questions they publicly say they care about? If the deck is generic, I customise for that meeting.

7. Ask amount — am I asking for a number they can actually write? A pre-seed fund can't lead a $5M seed. Don't waste their time.

8. Timing — are they actively investing right now? Some funds pause for 6 months between funds. Asking during the pause is research, not a real opportunity.

9. Soft intro path — is there a warm path or do I have to go cold? Cold outreach has 5% response. Warm intro has 50%. The difference is one well-placed message.

10. Materials — is my deck current, my data room up to date, my one-pager readable? Investors will ask for materials after the call. If they're not ready, you lose momentum.

11. One specific question — what is the one question I most want answered in this meeting? "Will you lead?" "Will you intro me to X?" "What would change your mind?" Pick one. Have it written down.

12. Follow-up plan — what is the next step if the meeting goes well? Send the deck within 24 hours. Schedule the partner check. Whatever the natural next step is, have it ready to go before the meeting.

The pattern across all twelve: they reduce the chance of being surprised. A fundraising meeting is two people testing fit. Surprises in either direction waste time — a polite "let me think about it" is usually a no, but you only know if you've done the research to know whether to push.

Ninety minutes of prep, doubled close rate. The math is obvious. The discipline is rare.`,
  },
];

export const PLAYBOOK_CATEGORIES: {
  id: PlaybookCategory;
  label: string;
  description: string;
}[] = [
  {
    id: "operating",
    label: "Operating",
    description: "How to run a company day-to-day",
  },
  {
    id: "hiring",
    label: "Hiring",
    description: "When and how to build the team",
  },
  {
    id: "fundraising",
    label: "Fundraising",
    description: "Pitch, deck, investor management",
  },
  {
    id: "sales",
    label: "Sales",
    description: "First 10 customers, early revenue",
  },
  {
    id: "mental-health",
    label: "Mental Health",
    description: "What the founder experience actually costs",
  },
];

export function getPlaybooksByCategory(
  category: PlaybookCategory
): FounderPlaybook[] {
  return founderPlaybooks.filter((p) => p.category === category);
}

export function getPlaybook(slug: string): FounderPlaybook | undefined {
  return founderPlaybooks.find((p) => p.slug === slug);
}
