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
  {
    slug: "when-to-fire-a-customer",
    title: "When to fire a customer (and how to do it well)",
    category: "operating",
    readingTime: 5,
    publishedDate: "2026-08-01",
    summary:
      "Some customers cost more than they pay. The signals that it's time, the conversation that closes the relationship, and what to do with the lessons.",
    body: `The first time I fired a customer, I waited too long. We were six months in, the contract was $40K ARR, and the customer was consuming 35% of our support bandwidth. By the time I had the conversation, the team had lost two engineers to the stress of the account.

The signals that it's time to fire a customer:

1. The customer is consuming more support time than the contract pays for, and that's not changing after intervention. We've tried. They've been told. The pattern persists.

2. The customer is using your product in a way that doesn't fit your roadmap. You're building features for one customer that 90% of your other customers don't need.

3. The customer is causing team morale damage. This is the hardest signal to measure, but it's the most important. Your team knows. They'll tell you if you ask.

4. The customer is asking for terms that bend your standard contract — payment terms, custom SLAs, exception pricing. Once is a negotiation. Repeated is a pattern.

The conversation that closes the relationship:

1. Be direct. Don't pretend it's about a price change or a product change they should accept. Say "this isn't working for either of us and we should end it."

2. Give them a graceful exit. Refund the unused portion of the contract. Offer to help them transition to a competitor. Don't be petty.

3. Don't negotiate. If you offer an exit and they counter-offer, you might be tempted to take it. Don't. The underlying dynamic won't change. The pattern is the pattern.

4. Document the decision. Write down what went wrong, what signal you missed, what you'd do differently next time. Future-you will need this.

What to do with the lessons:

- Update your ICP. If a customer is wrong for you, your sales motion probably let them in. Fix the qualification.
- Update your onboarding. Often, customers go wrong because they didn't get the right setup. The fix isn't to fire them — it's to onboard the next one better.
- Update your team. The engineers and support folks who lived through the bad customer have stories. Capture them. Use them in training.

The cost of not firing a customer: the visible cost is revenue, but the hidden cost is the team's energy. Every hour spent on a bad customer is an hour not spent on the customers who'd actually compound. Fire fast, fire kindly, learn.`,
  },
  {
    slug: "how-to-run-a-customer-interview",
    title: "How to run a customer interview without leading the witness",
    category: "operating",
    readingTime: 6,
    publishedDate: "2026-08-01",
    summary:
      "Twenty questions, one rule: don't ask leading questions. The interview script I use to validate problems before building solutions.",
    body: `Most customer interviews are useless. The founder asks "would you use a product that does X?" and the customer says yes to be polite. The founder leaves thinking they've validated the idea. They have not.

The rule that fixes this: don't ask leading questions. A leading question is one where the answer is implied. "Would you use a tool that automated your invoicing?" is leading. "Tell me about the last time you had to invoice someone" is not.

The interview script I use has twenty questions, divided into four sections. The whole interview takes 30-45 minutes. I record it (with permission) and transcribe later.

Section one: context (5 minutes, 3 questions). "Tell me about your role." "What does a typical day look like?" "What's the company working on this quarter?" The point is to get the customer talking about themselves, not your product. People open up when they talk about their work.

Section two: the problem (10 minutes, 5 questions). "Tell me about the last time you dealt with [problem]." "How often does this happen?" "What did you do?" "What worked? What didn't?" "How much time/money did it cost?" The point is to make them describe the problem in their own words, with their own examples, with their own numbers. The numbers are gold.

Section three: the workaround (10 minutes, 5 questions). "What are you using today to handle this?" "How did you find that?" "What do you like about it?" "What do you wish it did better?" "If you could wave a magic wand, what would change?" The point is to understand their current solution, including the parts they tolerate. The things they tolerate are the actual market.

Section four: the close (5 minutes, 4 questions). "Who else do you know that has this problem?" "Is there anyone on your team I should talk to?" "Can I follow up in 6 months if I have something to show?" "Anything I should have asked?" The last question is the most important one. It always surfaces things I missed.

Three rules for asking:

1. Never ask "would you use X." Ask "tell me about the last time you needed X." If the second question has no recent answer, X isn't a real need.

2. Never ask "would you pay for X." Ask "what do you currently pay for things that solve part of this problem?" The existing spend tells you the budget. Hypothetical spend tells you nothing.

3. Never show your product. This is an interview about the problem, not a sales call. If they ask to see the product, say "we'll do that in a separate conversation." Showing the product in the interview contaminates everything they say afterward.

The output of a good interview is a transcript with specific stories, specific numbers, and specific language. The language is the most important part. When you later write copy for your landing page, the words should come from the customer's mouth, not yours. If the customer said "I spend 4 hours every Friday reconciling spreadsheets," that's the headline. Don't rewrite it.`,
  },
  {
    slug: "first-30-days-at-a-new-startup",
    title: "The first 30 days at a new startup: an operating checklist",
    category: "operating",
    readingTime: 5,
    publishedDate: "2026-08-01",
    summary:
      "Twelve things to do in the first 30 days of a new company. The order matters. Skip the wrong one and you spend the next 6 months recovering.",
    body: `The first 30 days of a new company set the trajectory for the next three years. I run the same checklist every time I start something new. The order matters — skip the wrong step and you spend the next six months recovering.

Days 1-3: foundation
1. Set up the entity correctly. Don't use a friend's LLP. Get a real structure. Lawyer + CA. Cost: 50-150K INR. Worth it.
2. Open a real business bank account. Don't mix personal and business. The pain of un-mixing is worse than the discipline of separating from day one.
3. Set up accounting software. Zoho Books or Tally. Whatever you know. The point is to start tracking from day one, not to pick the perfect tool.

Days 4-7: identity
4. Register the domain. Buy the .com, .co, .in, and .ai if relevant. Skipping this is how you spend 18 months building a brand and then can't get the URL.
5. Set up email on the domain. Google Workspace. 1 user for the first month is fine.
6. Get a logo and a one-line description. Not because you need it now — because you'll need it in week 8, and you'll be too busy then.

Days 8-14: legal and financial
7. Set up GST if you're in India. Even if you don't think you need to register yet, register. The threshold is lower than you think, and the late fees are higher than you think.
8. Get the right insurance. D&O for any company that will have investors. Cyber insurance if you touch customer data. Professional indemnity if you're a service company.
9. Set up a cap table. Even if it's just you. Spreadsheet is fine. The point is to have a record. The day you bring in a co-founder or an investor, you'll thank yourself.

Days 15-21: people
10. Tell 10 people you trust what you're building. Not to pitch them — to make it real. Saying it out loud changes the commitment.
11. Identify the three people you most want to work with. Reach out. Don't hire them yet — just start the conversation.
12. Pick your cofounder (if you don't have one). Or decide definitively that you're going solo. Both are fine. The indecision is not fine.

Days 22-30: product
13. Ship the smallest possible version of the thing. The version you're embarrassed to show. The version you'd hide from your last employer. Ship it anyway.
14. Get 5 users. They don't have to pay. They don't have to love it. They have to use it once. Five users is a sample. Zero is a hypothesis.
15. Write down what you learned. Not in your head. In a document. The first 30 days are full of decisions that you'll need to remember why you made. The document is your future self's gift to your past self.

The order is: foundation → identity → legal → people → product. Each step is cheap. The total cost is maybe 200-300K INR and 30 days. Skipping any step costs more in the long run than doing it.

I've started four companies using this checklist. The first time I skipped days 1-3 because I was in a hurry. I spent the next four months re-doing the entity work after my first investor asked for proper corporate housekeeping. Don't skip.`,
  },
  {
    slug: "the-90-day-new-hire-ramp",
    title: "The 90-day new-hire ramp framework I use at Trinetry",
    category: "hiring",
    readingTime: 6,
    publishedDate: "2026-08-01",
    summary:
      "Three phases, three deliverables, three conversations. The ramp framework that takes a new hire from confused to productive in 90 days.",
    body: `The first 90 days of any new hire set the tone for the next three years. Most founders wing this, which is why most new hires take 6 months to be productive when they should take 3. The framework below takes 6 hours of founder time per hire and consistently produces a 90-day ramp instead of a 6-month one.

Phase one: weeks 1-4, orientation. The new hire's only job is to understand the company, the product, the customers, and the team. They aren't producing yet. They are absorbing.

Deliverable at week 4: a one-page memo answering "What is this company, who is it for, why does it exist, and what is my job here?" If they can write that memo well, they've absorbed the basics. If they can't, they need more orientation, not more work.

Three conversations in phase one: week 1 (welcome + expectations), week 2 (workstyle + comms preferences), week 4 (deliverable review). Each is 30 minutes. Skip any of them and you spend the next 3 months correcting course.

Phase two: weeks 5-8, first contribution. The new hire is now producing a defined piece of work. The piece should be scoped, time-bound, and visible to the team. Not "explore the codebase." Not "shadow the senior engineer." A specific thing with a specific deadline.

Deliverable at week 8: the first contribution. Could be a small feature, a research report, a sales call sequence, a customer interview summary. Anything that produces a tangible output. The point is to give them a win. A win in week 8 sets the trajectory for the next 12 months.

Three conversations in phase two: week 5 (assign the first contribution), week 6 (mid-point check-in), week 8 (deliverable review). Same 30-minute format.

Phase three: weeks 9-12, ownership. The new hire is now running something on their own. They have a domain, a budget (even if small), and accountability for an outcome. Not a task — an outcome.

Deliverable at week 12: a quarterly plan for their domain. What they'll own, what they'll deliver, what they won't. The point is to move them from "doing tasks" to "running a function." That's the difference between an employee and a leader.

Three conversations in phase three: week 9 (hand over the domain), week 11 (plan review), week 12 (90-day retro). The retro is the most important conversation of all three phases. The questions are: what worked, what didn't, what's missing, what should we change for the next hire. The new hire sees things you can't. Capture it.

Three things this framework assumes:

1. You have a written job description. If you don't, write one before the ramp starts. The new hire needs to know what they're ramping into.

2. You have a peer who can answer the day-to-day questions. The founder can't be the only person training. Pick a peer for the new hire — someone at the same level who's been at the company longer.

3. You're willing to fail a new hire in 30 days. If the new hire is clearly not working out by week 4, you need to be willing to have the conversation. The framework gives you the data — the week-4 memo tells you if they absorbed the basics. If they didn't, no amount of phase 2 or 3 fixes the foundation.

I've used this framework for six hires. Five ramped in 90 days. One didn't — and I caught it at week 4, not month 6.`,
  },
  {
    slug: "hiring-your-first-salesperson",
    title: "When to hire your first salesperson (and how)",
    category: "hiring",
    readingTime: 5,
    publishedDate: "2026-08-01",
    summary:
      "The four signals that it's time, the four signals that it's too early, and the two profile types to look for.",
    body: `Founders hire their first salesperson at the wrong time in 80% of cases. They hire too early (before the product sells itself) and burn cash on someone who can't close. Or they hire too late (after the founder is the bottleneck) and miss the market. The four signals that it's time, the four that say it's too early, and the two profile types to look for.

Four signals that it's time:

1. The founder is the only person who can close a deal. If the founder spends >50% of their time on sales calls, the founder is the bottleneck. The fix is more sellers.

2. The product has clear ICP, clear value prop, and clear objection handling. The founder knows why people buy. The founder knows why people don't. A salesperson can replicate that.

3. The company has a repeatable sales motion. The same pitch, the same channels, the same conversion rates, the same customer profile. A salesperson can run the motion.

4. The company has at least 3 months of runway beyond the cost of the new hire. Salespeople take 3-6 months to ramp. If you can't afford that, you're hiring too early.

Four signals that it's too early:

1. The founder is still figuring out who the customer is. If the ICP keeps changing, a salesperson will optimise for the wrong thing.

2. The product is fundamentally not selling. If 50% of qualified leads don't buy, the problem isn't the salesperson — it's the product.

3. There's no repeatable motion. If every sale is bespoke, a salesperson will struggle to build pipeline.

4. The company has less than 6 months of runway. Sales hires are slow-burn. You need to be able to fund the ramp.

Two profile types to look for:

Profile A: the "former founder" salesperson. Someone who has sold before, ideally in the same industry, ideally at a company that failed or got acquired. They understand the founder's world. They don't need a script — they need a story. They cost more, but they ramp faster.

Profile B: the "inbound specialist" salesperson. Someone who is great at closing inbound leads but not at generating outbound. This works if your company has strong inbound. If you don't, this person will fail. Be honest about your funnel before hiring this profile.

Most founders should look for profile A. The exception is if you have a strong inbound engine and a clear "we close what comes to us" motion. Then profile B is fine.

The compensation structure: at the first sales hire, base + small commission. Most founders try to put the salesperson on 100% commission. That doesn't work — the salesperson can't afford to wait for the founder to fix the product. Some base salary is necessary. The exact split depends on your market, but 60/40 base/commission is a reasonable starting point.

The interview: ask the candidate to sell you your own product. Give them 10 minutes to prepare and 5 minutes to pitch. If they can't sell you your own product, they can't sell it to your customers. The signal is the same.`,
  },
  {
    slug: "how-to-build-an-investor-update-email",
    title: "How to build an investor update email people actually read",
    category: "fundraising",
    readingTime: 4,
    publishedDate: "2026-08-01",
    summary:
      "Monthly, two pages, same structure. The investor update that has kept my investor relationships warm across two raises and three years.",
    body: `The investor update is the most underrated piece of founder communication. Most founders either don't send them or send a 1,500-word essay that nobody reads. The format that has worked for me across two raises and three years is: monthly, two pages max, same structure every time.

The structure:

Section one: the headline. One line. "October: $32K MRR, +18% MoM, hired Sarah as VP Sales." That's it. The headline tells the investor everything they need to know about the month in five seconds. If they want more, they read on.

Section two: the metrics. A small table or three to four bullet points. MRR, growth rate, burn, runway, customer count, any KPI specific to your business. The numbers, not the story.

Section three: the wins. Three to five bullet points. Be specific. "Closed Acme Corp at $50K ARR" not "good momentum with enterprise customers."

Section four: the challenges. Two to three bullet points. Be honest. Investors respect honesty. They'll find out anyway. Telling them first builds trust.

Section five: the asks. One to three bullet points. Specific. "Need an intro to a Series A fintech founder." "Looking for a fractional CMO." "Want feedback on the new pricing page." Each ask is a thing the investor can either help with or pass. Don't ask for things they can't help with.

Section six: the calendar. One line. "Next update: December 5." Investors like knowing when the next one is coming. The regularity itself builds trust.

The tone: candid, not promotional. Investors can smell promotional from a mile away. They want to know how the company is actually doing, including the hard parts. A monthly update that hides bad news loses investor trust faster than no update at all.

The length: 500-800 words. Anything longer signals "I'm burying the lead." Anything shorter signals "I don't have much to say." 500-800 is the sweet spot.

The timing: send the first Monday of the month, before noon IST. Investors read updates in batches. The first Monday is when they're catching up on email after the weekend. Mid-morning is when they have time to read.

The format: text, not slides. Investors don't want a deck. They want to read an email on their phone. Plain text works. A simple HTML with the metrics table also works. Anything fancier is friction.

The one rule: never miss a month. If you miss one, investors notice. If you miss two, they've written you off. The update is a forcing function — it makes you summarise the month even when you don't want to.

I've sent 36 consecutive monthly updates. The pattern I see in investor behaviour: the ones who reply are the ones who are most likely to invest in the next round. The ones who go silent are usually going to pass. The update is also a way to test your investor list — if nobody replies, your investor list is weak.`,
  },
  {
    slug: "pre-seed-to-seed-in-india-2025-2026",
    title: "Pre-seed to seed in India: what changed in 2025-26",
    category: "fundraising",
    readingTime: 5,
    publishedDate: "2026-08-01",
    summary:
      "Indian pre-seed to seed is faster, smaller, and more thesis-driven than 2023. The new playbook for raising in the current cycle.",
    body: `The Indian pre-seed to seed market in 2025-26 is meaningfully different from 2022-23. The thesis has shifted from "growth at all costs" to "profitable growth, fast." The ticket sizes have shrunk. The decision velocity has slowed. The investors who are still writing checks are more thesis-driven than they were in 2022. Here's what changed and what to do about it.

The shift in thesis:

2022-23: growth at all costs. "How many users?" "What's the growth rate?" "How much runway?" Investors were optimising for big outcomes. The downside was tolerated.

2025-26: profitable growth. "What's the gross margin?" "What's the CAC payback period?" "What's the path to default-alive?" Investors are optimising for resilience. The downside matters again.

What this means for your pitch:

1. Lead with the unit economics, not the market size. A seed investor in 2026 wants to see that you understand the business, not just the market. The market is assumed; the unit economics are the proof.

2. Have a clear path to default-alive. "Default-alive" means the company can reach profitability on the capital it has, without needing a Series A. If your plan requires a Series A to survive, you're in trouble.

3. Smaller rounds. Pre-seed is now 50L-2CR. Seed is now 2-7CR. The 10CR seed round is rare. Plan for the round size that matches your stage.

4. Thesis-driven investors. Investors are picking 2-3 themes per fund and writing 80% of their checks into those themes. Generic pitches don't work. You need to know which themes the investor is writing into, and position yourself inside one.

The decision velocity has slowed:

In 2022, a pre-seed investor would meet you and decide in 2 weeks. Now it takes 4-8 weeks. The due diligence is more thorough. The partner check is more rigorous. The committee is more skeptical.

What this means for your fundraising timeline:

1. Start earlier. If you think you need to raise in 6 months, start reaching out now. The process is slower.

2. Run a tight process. The number of investors you should be talking to at any one time is 5-8. More than that and the process gets unwieldy. Less than that and you don't have enough shots.

3. Have a closing argument. Investors in 2026 want to know why now. The closing argument isn't "because the market is big." It's "because we have 18 months of data, 3 paying customers, and a clear next step."

The investors who are still writing:

The 2022 froth attracted a lot of tourists. Most of them are gone. The investors who are still writing checks in 2026 are professionals who have been through cycles before. They know what they're looking for. They take longer to decide. They write smaller checks. They want to be on the cap table for the long term.

The pre-seed investors still active in India in 2026: better (anish godha), firstcheque (gaurav), allin capital, jovs, several angels. The seed investors still active: accel, peak xv, kalaari, chiratae, blume. The Series A investors still active: peak xv, accel, lightbox, saurabh mungadikar.

The new playbook for 2025-26:

1. Raise a smaller round at a higher valuation. The bar is higher, but the dilution is lower.

2. Run a 4-6 week process, not a 2-week sprint. Investors need time.

3. Get a warm intro to the partners, not the analysts. Partner-level conviction is what closes a seed round in 2026.

4. Have a strong "why now" answer. The market is more skeptical; you need to give them a reason to act now.

I've raised in both cycles. The 2026 cycle is harder to raise but easier to operate. The discipline is the same: clear thesis, good unit economics, honest numbers, strong team.`,
  },
  {
    slug: "first-10-b2b-customers",
    title: "First 10 B2B customers: a founder's playbook",
    category: "sales",
    readingTime: 6,
    publishedDate: "2026-08-01",
    summary:
      "The first 10 customers are sold differently from the 100th. What works for the first 10: founder-led, manual, often below list price. What doesn't.",
    body: `The first 10 B2B customers are sold differently from the 100th. What's worked for the first 10 doesn't work at scale. What's worked at scale doesn't work for the first 10. The first 10 require founder involvement, manual processes, and often below-list pricing. The 100th requires repeatable motions, automation, and standard pricing. Trying to do both at once is how most founders burn out their first 6 months of selling.

The first 10 are sold with:

1. Founder-led, every call. The founder is on every sales call. Not the AE. Not the BDR. The founder. The reason: the first 10 are buying the founder, not the product. They want to know the founder is going to be there if the product breaks. They want to know the founder has the conviction to keep building. They want to know the founder can pivot if needed. None of that is in the deck.

2. Manual, bespoke outreach. The founder sends personalised emails. The founder does the LinkedIn messages. The founder does the cold calls. There is no scale at this stage — the goal is 10 customers, not 100. Personalised outreach converts 5-10x better than automated. Use that.

3. Below-list pricing. Often 30-50% below list. Often with custom terms. Often with a paid pilot instead of an annual contract. The point is to reduce friction, not maximise revenue. The first 10 customers are early adopters. Early adopters pay less. They also give better feedback and stay longer.

4. Hand-holding through onboarding. The founder does the kickoff call. The founder does the training. The founder checks in weekly for the first month. The first 10 customers are also the first 10 reference customers. Their success is your marketing. Their failure is your death.

The first 10 are NOT:

1. Sold with a sales playbook. The first 10 are too few to have meaningful sales data. Trying to optimise a sales playbook at 10 customers is optimising noise.

2. Sold with a marketing site. The first 10 are typically sold through personal networks, founder outreach, and warm intros. A marketing site is for the 100th customer.

3. Sold with a standard contract. The first 10 need flexibility. The contract is whatever the customer needs it to be. That's a feature, not a bug.

4. Sold with a sales engineer. There is no sales engineer. The founder is the sales engineer.

The transition from 10 to 100:

The 100th customer is sold differently. The transition is hard. Most founders over-correct in one direction or the other.

If you stay in founder-led mode for 100 customers, you burn out and never scale. The founder becomes the bottleneck.

If you move to sales-led mode too early (after 10 customers), the sales team fails because the motions aren't repeatable yet. The product isn't positioned, the objection handling isn't refined, the onboarding isn't systematised.

The right transition point is around 15-25 customers. By then, the founder has done enough sales to know the patterns. The 10-20 customers should have revealed the repeatable motion — the same pitch, the same objections, the same close. The sales team is hired to replicate that motion, not invent a new one.

The handoff: the founder does the first 20-30 sales calls with the new sales hire listening. The sales hire takes notes. The founder does the close, then explains why they closed. The sales hire takes the next call, the founder shadows. By the 30th call, the sales hire is doing it alone.

The metrics to watch during the transition:

- Time from first touch to close. Should be shortening.
- Win rate on qualified leads. Should be above 20%.
- CAC payback period. Should be under 12 months.
- Net revenue retention. Should be above 100%.

If any of these drop during the transition, the founder is doing it wrong. Pull the new sales hire back into shadow mode. Recalibrate.

The first 10 are the foundation. The next 90 are the scale. Most founders confuse the two. The best founders know which mode they're in.`,
  },
  {
    slug: "how-to-run-a-paid-trial-week",
    title: "How to run a paid trial week instead of a 5-round interview",
    category: "sales",
    readingTime: 4,
    publishedDate: "2026-08-01",
    summary:
      "A one-week paid trial is the highest-signal interview in hiring — for both sides. How I structure them and when to use them.",
    body: `The 5-round interview is broken. It's slow, it doesn't measure the thing that matters, and it optimises for the wrong candidate. The paid trial week is the highest-signal interview I've used — for both sides. The candidate works with us for a week, gets paid a meaningful amount, and produces a tangible output. At the end, both sides know whether the fit is real.

When to use a paid trial week:

- Senior hires (lead, principal, staff, manager). The cost of a bad senior hire is too high for a normal interview process to catch.
- Hires where the work is collaborative. Engineering, design, product management — anything where you need to see the person work with the team.
- Hires where the work is unfamiliar to the candidate. A career switch, a domain change, a different tech stack. The trial tells you if they can ramp.

When NOT to use a paid trial week:

- Junior hires. The signal is too high — you waste a week of senior time, and the candidate's productivity in a new context isn't the right measure anyway.
- Hires where the work is individual. Sales, marketing, support. You want to see how they do the job, not how they collaborate.
- Hires from competitors. There's a non-zero risk of IP leakage. Better to keep them at arm's length until they're on the team.

How to structure a paid trial week:

Day 1: orientation. Same as a new hire ramp — the candidate meets the team, sees the codebase (if engineering), gets a tour of the product. The point is to make them feel welcome and set them up to succeed.

Days 2-3: scope a real task. Not a fake task. A real task the company needs done. The candidate knows it's a real task. They know their work might ship. That's the point.

Days 4-5: do the work. The candidate works in the same tools, same channels, same cadence as a regular employee. They ask questions the same way. They commit code the same way (if engineering). They participate in standups. They're part of the team for the week.

Day 5: present the work. 15-30 minutes to the team. What they did, what they learned, what they'd do next. The team asks questions. The conversation is the interview — not the code, not the resume, the conversation.

The pay:

The candidate should be paid a meaningful amount for the week. The exact number depends on your market, but the rule is: enough that the candidate isn't financially worse off for trying. For senior roles in the US, that's $5-10K. For mid-level, $2-5K. For senior roles in India, ₹50K-1L. The pay is not negotiable. It's part of the trial structure.

The cost-benefit:

The trial costs the company $5-10K + the team's time (typically 10-20% of one person for the week). That's $10-20K total. Compared to a bad senior hire costing $200-500K in salary + opportunity cost in the first year, the trial is cheap insurance.

The team benefits too. They get a real sense of the candidate in 5 days. They can spot red flags that wouldn't show up in an interview: how does the candidate handle ambiguity? How do they push back on bad ideas? How do they ask for help? These are the things that determine whether a senior hire succeeds.

The candidate benefits too. They get a real sense of the company in 5 days. They can spot red flags: is the codebase a mess? Is the team dysfunctional? Is the founder someone they want to work with? A 5-round interview tells the candidate nothing about what it's actually like to work here. The trial tells them everything.

I've used paid trial weeks for 6 senior hires. 5 of them converted. The 1 that didn't was a mutual "this isn't the right fit" decision after the week — much better than discovering it 3 months in.

The trial week is the highest-signal interview in hiring. The cost is real but worth it.`,
  },
  {
    slug: "therapy-coaching-peer-groups-which-to-use-when",
    title: "Therapy, coaching, peer groups: which to use when",
    category: "mental-health",
    readingTime: 4,
    publishedDate: "2026-08-01",
    summary:
      "Three different tools for three different problems. How to know which one you need, and how to find one that works.",
    body: `Three different tools for three different problems. The founder mental-health conversation often confuses them. Here's how to know which one you need, and how to find one that works.

Therapy:

What it is: a clinical relationship with a licensed professional. The therapist is trained in diagnosis and treatment. The relationship is private and protected.

What it's for: patterns that are hurting you and that you can't change on your own. Anxiety that won't go away. A relationship pattern that keeps repeating. A trauma that's showing up in your work. Substance use. Anything that's getting in the way of you functioning.

What it's not for: business advice. Decision-making. Performance optimisation. A therapist will not tell you whether to raise money or whether to fire an employee. That's not their job.

How to find one: ask friends for referrals. Filter for someone who has experience with founders or high-stress professionals. The first therapist you try might not be the right fit — try 2-3 before settling.

Coaching:

What it is: a professional relationship with a coach (often an executive coach, sometimes a peer coach). The coach is not a clinician. They're a thinking partner.

What it's for: clarifying decisions, getting unstuck, developing specific skills. "I keep avoiding the conversation with my co-founder." "I don't know how to scale myself out of day-to-day operations." "I want to get better at public speaking." A coach helps you think through these.

What it's not for: clinical issues. If you're depressed, anxious, or have a pattern that's hurting your life, coaching is not the answer. Therapy first, coaching second.

How to find one: ask other founders for referrals. The market is full of bad coaches. Filter for someone who's done the work themselves (run a company, scaled a team) and has real references.

Peer groups:

What it is: a regular meeting of 4-8 founders at the same stage. The group is the resource. The facilitator (if any) is just there to keep the meeting on track.

What it's for: the loneliness problem. "I'm the only one who knows the full truth about how the company is going." The peer group is the place where you can say the real thing and have someone nod because they've been there. It's also a place to share practical advice: how do you handle this investor? How do you structure this deal? How do you deal with this employee issue?

What it's not for: clinical issues, deep personal work, or one-on-one support. The peer group is a sounding board, not a treatment.

How to find one: ask founders you respect if they're in a group. Most good groups are invite-only. If you can't get invited to one, consider starting your own. The format is straightforward: 4-8 founders, monthly dinner, "say the real thing" as the only rule.

The three-tool mental model:

- Therapy: for what's wrong with you. Past patterns, present symptoms, future prevention.
- Coaching: for what's next. Career, decisions, skills.
- Peer groups: for the part no one else can help with. The founder-specific loneliness.

Most founders reach for peer groups first because they're free, social, and feel like "networking." That's wrong order. The order should be: therapy if you have clinical issues, then peer group for the founder-specific stuff, then coaching for specific skills or decisions.

The cost-benefit:

- Therapy: 4-8K INR/month for weekly sessions. Worth it.
- Coaching: 30-100K INR/month. Worth it for specific skills or transitions, not for general "make me better."
- Peer groups: free if informal, 10-30K INR/year if structured. Always worth it.

I've used all three. The order I needed them in: therapy (years 1-2), peer group (years 2-present), coaching (year 3 transition). The order you need them in will be different. The right answer is the one that addresses the problem you actually have, not the one that sounds most impressive.`,
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
