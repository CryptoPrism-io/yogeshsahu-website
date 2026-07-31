export interface CommunityItem {
  name: string;
  type: "community" | "podcast" | "book" | "conference";
  location?: string; // for communities: city/region, virtual
  price?: string; // e.g. "free", "$200/yr", "₹30K/yr"
  oneLiner: string;
  url: string;
  audience?: "founders" | "builders";
}

export const community: CommunityItem[] = [
  // ── Communities ─────────────────────────────────────────────
  {
    name: "South Park Commons",
    type: "community",
    location: "Bengaluru · virtual",
    price: "invite",
    oneLiner: "The founder/operator community in Bengaluru. Monthly dinners, a real network, no hype.",
    url: "https://southparkcommons.com",
    audience: "founders",
  },
  {
    name: "On Deck",
    type: "community",
    location: "virtual",
    price: "$250-750/cohort",
    oneLiner: "Cohort-based founder community. The ODF (Founder) cohort is the strongest for first-time founders.",
    url: "https://beondeck.com",
    audience: "founders",
  },
  {
    name: "YC Startup School",
    type: "community",
    location: "virtual",
    price: "free",
    oneLiner: "The best free founder curriculum. Even if you never apply to YC, do Startup School.",
    url: "https://www.startupschool.org",
    audience: "founders",
  },
  {
    name: "Indie Hackers",
    type: "community",
    location: "virtual",
    price: "free",
    oneLiner: "For bootstrapped and indie founders. The interviews are worth the visit alone.",
    url: "https://www.indiehackers.com",
    audience: "founders",
  },
  {
    name: "r/startups",
    type: "community",
    location: "virtual",
    price: "free",
    oneLiner: "A surprisingly honest founder forum. Skip the memes, read the failure postmortems.",
    url: "https://reddit.com/r/startups",
    audience: "founders",
  },
  {
    name: "Postman API collective",
    type: "community",
    location: "virtual",
    price: "free",
    oneLiner: "The largest API builder community. Great for builders shipping products with public APIs.",
    url: "https://www.postman.com/collective",
    audience: "builders",
  },
  {
    name: "Dev.to",
    type: "community",
    location: "virtual",
    price: "free",
    oneLiner: "The friendliest engineering community on the web. Publish what you learn, build an audience.",
    url: "https://dev.to",
    audience: "builders",
  },
  {
    name: "Hacker News",
    type: "community",
    location: "virtual",
    price: "free",
    oneLiner: "The default watering hole for builders and technical founders. Read the comments, not just the posts.",
    url: "https://news.ycombinator.com",
    audience: "builders",
  },
  {
    name: "Indie Hackers India",
    type: "community",
    location: "virtual",
    price: "free",
    oneLiner: "The India-focused offshoot. Good for rupee-denominated problems like GST and payments.",
    url: "https://www.indiehackers.com",
    audience: "founders",
  },
  {
    name: "Founders Circle (local)",
    type: "community",
    location: "your city",
    price: "free",
    oneLiner: "The local founder dinner I recommend to every founder. 4-8 founders, monthly, no agenda.",
    url: "#",
    audience: "founders",
  },

  // ── Podcasts ───────────────────────────────────────────────
  {
    name: "Acquired",
    type: "podcast",
    oneLiner: "Deep dives on the greatest companies ever built. Two hours per episode, worth every minute.",
    url: "https://www.acquired.fm",
    audience: "founders",
  },
  {
    name: "a16z Podcast",
    type: "podcast",
    oneLiner: "The venture firm's take on technology and business trends. Good signal for what's coming.",
    url: "https://a16z.com/podcasts/a16z-podcast",
    audience: "founders",
  },
  {
    name: "Founders",
    type: "podcast",
    oneLiner: "David Senra reads biographies of founders and distills the lessons. History repeats.",
    url: "https://founderspodcast.com",
    audience: "founders",
  },
  {
    name: "Lex Fridman Podcast",
    type: "podcast",
    oneLiner: "Long-form conversations with builders and scientists. The engineering episodes are gold.",
    url: "https://lexfridman.com/podcast",
    audience: "builders",
  },
  {
    name: "Syntax",
    type: "podcast",
    oneLiner: "The best practical web development podcast. Wes Bos and Scott Tolinski keep it real.",
    url: "https://syntax.fm",
    audience: "builders",
  },
  {
    name: "The Knowledge Project",
    type: "podcast",
    oneLiner: "Shane Parrish interviews operators about mental models and decision-making.",
    url: "https://fs.blog/knowledge-project",
    audience: "founders",
  },
  {
    name: "Practical AI",
    type: "podcast",
    oneLiner: "For builders shipping AI products, not AI researchers. Grounded, practical, current.",
    url: "https://practicalai.fm",
    audience: "builders",
  },
  {
    name: "Masters of Scale",
    type: "podcast",
    oneLiner: "Reid Hoffman interviews founders on how to scale. Episode quality varies; the early ones are best.",
    url: "https://mastersofscale.com",
    audience: "founders",
  },

  // ── Books ──────────────────────────────────────────────────
  {
    name: "The Hard Thing About Hard Things",
    type: "book",
    oneLiner: "Ben Horowitz on the parts of being a founder nobody talks about. Read it before you need it.",
    url: "https://a16z.com/book",
    audience: "founders",
  },
  {
    name: "Zero to One",
    type: "book",
    oneLiner: "Peter Thiel on creating value with technology. The contrarian questions are the point.",
    url: "#",
    audience: "founders",
  },
  {
    name: "The Mom Test",
    type: "book",
    oneLiner: "How to talk to customers without leading the witness. The 90-minute read that fixes your interviews.",
    url: "http://momtestbook.com",
    audience: "founders",
  },
  {
    name: "Atomic Habits",
    type: "book",
    oneLiner: "The systems approach to personal change. Not founder-specific, but it's the operating manual for consistency.",
    url: "#",
    audience: "founders",
  },
  {
    name: "Designing Data-Intensive Applications",
    type: "book",
    oneLiner: "The engineering bible. If you build data pipelines or databases, this is required reading.",
    url: "https://dataintensive.net",
    audience: "builders",
  },
  {
    name: "Clean Architecture",
    type: "book",
    oneLiner: "Robert C. Martin on software structure. Controversial in places, but the principles are sound.",
    url: "#",
    audience: "builders",
  },
  {
    name: "The Pragmatic Programmer",
    type: "book",
    oneLiner: "The classic that teaches you to think like a software engineer. Still relevant after 20 years.",
    url: "#",
    audience: "builders",
  },
  {
    name: "Good to Great",
    type: "book",
    oneLiner: "Jim Collins on what separates enduring companies. The hedgehog concept alone is worth the read.",
    url: "#",
    audience: "founders",
  },

  // ── Conferences ────────────────────────────────────────────
  {
    name: "Product Hunt Radio Live",
    type: "conference",
    oneLiner: "Product launches and founder stories. The community is the value.",
    url: "#",
    audience: "founders",
  },
  {
    name: "YC Demo Day (watch live)",
    type: "conference",
    oneLiner: "Free to watch online. The best education in pitch structure and traction framing.",
    url: "https://www.ycombinator.com",
    audience: "founders",
  },
  {
    name: "GopherCon / PyCon India",
    type: "conference",
    oneLiner: "Language-specific engineering conferences. The talks are on YouTube free forever after.",
    url: "#",
    audience: "builders",
  },
  {
    name: "AWS re:Invent / Google Cloud Next",
    type: "conference",
    oneLiner: "Cloud conferences. Watch the keynotes online; skip the travel unless you're a cloud architect.",
    url: "#",
    audience: "builders",
  },
  {
    name: "TiE / NASSCOM startup summits",
    type: "conference",
    oneLiner: "Indian founder conferences. Good for the India-specific network (funding, hiring, GST).",
    url: "#",
    audience: "founders",
  },
];

export const COMMUNITY_TYPE_LABELS: Record<CommunityItem["type"], string> = {
  community: "Communities",
  podcast: "Podcasts",
  book: "Books",
  conference: "Conferences",
};

export const COMMUNITY_TYPE_ORDER: CommunityItem["type"][] = [
  "community",
  "podcast",
  "book",
  "conference",
];

export function getCommunityByType(
  type: CommunityItem["type"]
): CommunityItem[] {
  return community.filter((c) => c.type === type);
}

export function getCommunityByAudience(
  audience: "founders" | "builders"
): CommunityItem[] {
  return community.filter((c) => !c.audience || c.audience === audience);
}
