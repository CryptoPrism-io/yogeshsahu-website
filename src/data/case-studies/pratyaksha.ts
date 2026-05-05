import type { CaseStudyContent } from './types';

export const pratyaksha: CaseStudyContent = {
  slug: 'pratyaksha',
  cluster: 'C',
  archetype: 'Product Visionary',
  oneLineTagline:
    'AI-powered cognitive journaling platform with a 4-agent LangChain pipeline — transforms raw thoughts into actionable self-insight through real-time streaming analysis, live at ai-becoming.web.app.',
  sourceFile: 'C:\\cpio_db\\portfolio\\case-pratyaksha.html',

  leadershipLens: {
    call: 'Chose to build Pratyaksha as a cognitive mirror rather than a conversational AI assistant. The real product decision was rejecting the chatbot framing — where AI suggests what to write and responds to prompts — in favour of a system that works entirely on the user\'s own words without interjecting. This meant the AI had to be invisible during the writing act and illuminate only what the user had already expressed, a fundamentally harder design problem than building a guided journaling bot.',
    bet: 'Bet that decomposing the cognitive analysis task into a sequential 4-agent pipeline — Thought Parser, Pattern Recognizer, Insight Generator, Growth Tracker — would produce richer, more accurate self-insights than a single monolithic prompt pass. The architectural commitment was to LangChain\'s chain orchestration and streaming API, accepting the additional latency overhead of four sequential LLM calls in exchange for the depth that specialisation enables. Each agent focuses on one cognitive task rather than attempting everything at once.',
    tradeoff:
      'Traded the simplicity of a single-prompt approach for the depth of a 4-stage pipeline, accepting a sub-10-second full-pass latency (vs. sub-2-second for a single call) to gain genuinely richer analysis. Also deliberately chose not to add social features, sharing, or gamification — common retention mechanics in consumer wellness apps — to protect the privacy-first design principle. Every data point stays in the user\'s own Firebase namespace; no aggregation, no model training on user data, no third-party access. This trades growth-hacking levers for the trust that a journaling product requires.',
    outcome:
      'Live product at ai-becoming.web.app — a full React + Express + LangChain platform where journal entries are processed through the 4-agent pipeline in real-time, with streamed results appearing progressively as each agent completes. The Growth Tracker agent builds a longitudinal model across sessions, making each new analysis richer than the last. Firebase Auth + Firestore provides per-user data isolation with encryption at rest. The architecture is modular — new cognitive agents can be appended to the pipeline without rewriting existing stages.',
    coordinated:
      'Sole product and engineering decision-maker. All product direction (the "cognitive mirror" framing, the privacy-first stance, the anti-chatbot design philosophy), all architectural choices (4-agent decomposition, LangChain orchestration, Firebase data isolation), and all UX principles (progressive disclosure, minimal friction, invisible AI) were set without an external product team. The discipline here was choosing what NOT to build — resisting feature creep toward social and gamification mechanics that would have undermined the core proposition.',
    nextStep:
      'Introduce a weekly reflection digest — a fifth agent that synthesises patterns across the week\'s entries into a longitudinal insight report delivered to the user on demand. Add a "blind spot" detection layer that flags areas the user consistently avoids writing about (identified by absence rather than presence). Explore a voice-input mode for the journal entry step, which would lower friction for users who think faster than they type and open the platform to a broader use case around spoken reflection.',
  },

  sections: [
    // ─────────────────────────────────────────────────────────────
    // 01  THE VISION
    // ─────────────────────────────────────────────────────────────
    {
      number: '01',
      eyebrow: 'Chapter 1',
      title: 'Why Build a Cognitive Mirror?',
      blocks: [
        {
          type: 'prose',
          body: 'Journaling is one of the most powerful tools for self-awareness and personal growth. Yet most people write without structure — thoughts flow but patterns remain invisible, contradictions go unnoticed, and actionable insights never surface.\n\nWhat if AI could read your raw thoughts in real-time and help you see patterns, contradictions, and actionable insights you\'d miss on your own?',
        },
        {
          type: 'prose',
          body: 'Pratyaksha is not a chatbot. It doesn\'t converse or suggest what to write. It is a cognitive mirror — reflecting back what you\'ve already expressed, illuminating the structure hidden in your own thinking.',
        },
        {
          type: 'callout',
          tone: 'purple',
          title: 'Design Philosophy',
          body: 'The best self-insight comes from your own words, not someone else\'s advice. Pratyaksha amplifies your existing awareness rather than replacing it with AI-generated guidance.',
        },
        {
          type: 'stats',
          cols: 4,
          items: [
            {
              label: 'AI Agents',
              value: '4',
              sub: 'Orchestrated pipeline',
              tone: 'purple',
            },
            {
              label: 'Processing',
              value: 'Real-time',
              sub: 'Streaming feedback',
              tone: 'blue',
            },
            {
              label: 'Privacy',
              value: 'Encrypted',
              sub: 'No data sharing',
              tone: 'green',
            },
            {
              label: 'Growth',
              value: 'Tracked',
              sub: 'Over time',
              tone: 'gold',
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 02  4-AGENT AI ARCHITECTURE
    // ─────────────────────────────────────────────────────────────
    {
      number: '02',
      eyebrow: 'Chapter 2',
      title: '4-Agent AI Architecture',
      blocks: [
        {
          type: 'prose',
          body: 'Pratyaksha employs a sequential multi-agent pipeline powered by LangChain. Each agent has a distinct cognitive role, building on the output of the previous stage to transform raw journaling into structured self-insight.',
        },
        {
          type: 'flow',
          title: 'Agent Pipeline Flow',
          rows: [
            [
              { label: 'Raw Journal Entry', tone: 'light' },
              { label: 'Agent 1: Thought Parser', tone: 'navy' },
              { label: 'Agent 2: Pattern Recognizer', tone: 'blue' },
              { label: 'Agent 3: Insight Generator', tone: 'purple' },
              { label: 'Agent 4: Growth Tracker', tone: 'green' },
              { label: 'Actionable Insight', tone: 'gold' },
            ],
          ],
        },
        {
          type: 'prose',
          heading: 'Agent 01 — Thought Parser',
          body: 'Breaks the raw journal entry into discrete thought units. Identifies individual ideas, emotions, questions, and assertions within unstructured text. Creates a structured representation of the user\'s stream of consciousness.',
        },
        {
          type: 'prose',
          heading: 'Agent 02 — Pattern Recognizer',
          body: 'Identifies recurring themes, emotional patterns, and contradictions across parsed thought units. Cross-references with historical entries to surface long-term behavioural patterns the user may not consciously recognise.',
        },
        {
          type: 'prose',
          heading: 'Agent 03 — Insight Generator',
          body: 'Synthesises recognised patterns into actionable self-insight. Transforms raw pattern data into human-readable reflections that highlight growth opportunities, blind spots, and areas of cognitive dissonance.',
        },
        {
          type: 'prose',
          heading: 'Agent 04 — Growth Tracker',
          body: 'Tracks changes over time and measures cognitive development. Monitors how thought patterns evolve, identifies positive shifts, flags regressions, and builds a longitudinal map of personal growth.',
        },
        {
          type: 'callout',
          tone: 'blue',
          title: 'Why 4 Agents Instead of 1?',
          body: 'A single monolithic prompt produces shallow analysis. By decomposing the cognitive task into specialised stages, each agent can focus deeply on its domain — producing richer, more accurate insights than any single pass could achieve.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 03  TECHNICAL ARCHITECTURE
    // ─────────────────────────────────────────────────────────────
    {
      number: '03',
      eyebrow: 'Chapter 3',
      title: 'Technical Architecture',
      blocks: [
        {
          type: 'prose',
          body: 'The platform is built as a modern full-stack application with clear separation between the user-facing SPA and the AI orchestration backend. Firebase provides authentication, storage, and hosting while Express manages the agent pipeline lifecycle.',
        },
        {
          type: 'prose',
          heading: 'Frontend — React SPA',
          body: 'Single-page application with real-time updates. Minimal, distraction-free writing interface that lets users focus on journaling while AI analysis runs asynchronously in the background.',
        },
        {
          type: 'prose',
          heading: 'Backend — Express API',
          body: 'Node.js server orchestrating the LangChain agent pipeline. Manages prompt chaining, memory context, and async processing. Handles journal submission and streams results back to the client.',
        },
        {
          type: 'prose',
          heading: 'AI Layer — LangChain Orchestration',
          body: 'LangChain manages agent orchestration, prompt chaining, and memory management. Each agent runs as a chain with its own system prompt, output parser, and connection to the next stage.',
        },
        {
          type: 'prose',
          heading: 'Storage — Firebase',
          body: 'Firebase Auth for user identity, Firestore for journal entries and user profiles, Firebase Hosting for the production SPA. Encrypted at rest with Firestore security rules for per-user data isolation.',
        },
        {
          type: 'flow',
          title: 'System Architecture',
          rows: [
            [
              { label: 'React SPA', tone: 'blue' },
              { label: 'Express API', tone: 'navy' },
              { label: 'LangChain Pipeline', tone: 'purple' },
              { label: 'Firebase', tone: 'gold' },
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'blue',
          title: 'Processing Flow',
          body: 'When a user submits a journal entry, the Express API triggers the LangChain pipeline asynchronously. Each agent processes sequentially, building on the previous agent\'s output. The complete pipeline executes within seconds, and results are streamed back to the frontend as they become available.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 04  UX DESIGN PRINCIPLES
    // ─────────────────────────────────────────────────────────────
    {
      number: '04',
      eyebrow: 'Chapter 4',
      title: 'UX Design Principles',
      blocks: [
        {
          type: 'prose',
          body: 'The user experience is designed around one core belief: journaling should feel effortless. The AI should enhance the experience without adding friction, complexity, or distraction.',
        },
        {
          type: 'prose',
          heading: 'Principle 01 — Minimal Friction',
          body: 'Write naturally, exactly as you think. No templates, no required fields, no structure imposed. The AI works entirely in the background — you never have to prompt it or wait for it.',
        },
        {
          type: 'prose',
          heading: 'Principle 02 — Progressive Disclosure',
          body: 'Insights appear as they become ready, not all at once. The interface reveals analysis gradually — thought units first, then patterns, then insights — matching the pipeline\'s natural processing order.',
        },
        {
          type: 'prose',
          heading: 'Principle 03 — Privacy-First',
          body: 'Journal entries are encrypted and never shared. User data stays in their own Firebase namespace with strict security rules. No aggregation, no training on user data, no third-party access.',
        },
        {
          type: 'prose',
          heading: 'Principle 04 — Reflection Prompts',
          body: 'Based on identified gaps in journaling patterns, the AI suggests angles to explore. Not prescriptive — gentle nudges toward areas the user hasn\'t examined in a while.',
        },
        {
          type: 'callout',
          tone: 'green',
          title: 'Core UX Insight',
          body: 'The best journaling AI is invisible. Users should feel like they\'re writing for themselves, and insights should feel like their own realisations — not external judgements.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 05  REAL-TIME ANALYSIS ENGINE
    // ─────────────────────────────────────────────────────────────
    {
      number: '05',
      eyebrow: 'Chapter 5',
      title: 'Real-Time Analysis Engine',
      blocks: [
        {
          type: 'prose',
          body: 'Pratyaksha leverages LangChain\'s streaming capabilities to provide live feedback as the user writes. The agent pipeline completes within seconds of journal submission, and historical pattern analysis grows more insightful over time as the system accumulates more context.',
        },
        {
          type: 'stats',
          cols: 3,
          items: [
            {
              label: 'Streaming',
              value: 'Live',
              sub: 'LangChain streaming API',
              tone: 'cyan',
            },
            {
              label: 'Pipeline Latency',
              value: '< 10s',
              sub: 'Full 4-agent pass',
              tone: 'blue',
            },
            {
              label: 'Pattern Depth',
              value: 'Growing',
              sub: 'Improves with usage',
              tone: 'green',
            },
          ],
        },
        {
          type: 'prose',
          heading: 'T+0s — Journal Submitted',
          body: 'User finishes writing and submits entry. Express API receives the raw text.',
        },
        {
          type: 'prose',
          heading: 'T+1s — Thought Parsing Complete',
          body: 'Agent 1 breaks entry into discrete thought units. Streamed to UI immediately.',
        },
        {
          type: 'prose',
          heading: 'T+3s — Patterns Identified',
          body: 'Agent 2 cross-references with history. Recurring themes and contradictions surfaced.',
        },
        {
          type: 'prose',
          heading: 'T+6s — Insights & Growth Tracking',
          body: 'Agents 3 & 4 synthesise insights and update growth trajectory. Full analysis delivered.',
        },
        {
          type: 'callout',
          title: 'Compounding Intelligence',
          body: 'Historical pattern analysis grows more insightful over time. The Growth Tracker agent builds a longitudinal model of the user\'s cognitive patterns, making each new analysis richer than the last.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 06  TECH STACK & IMPACT
    // ─────────────────────────────────────────────────────────────
    {
      number: '06',
      eyebrow: 'Chapter 6',
      title: 'Technologies & Impact',
      blocks: [
        {
          type: 'stats',
          cols: 4,
          items: [
            {
              label: 'Frontend',
              value: 'React',
              sub: 'Real-time streaming UI',
              tone: 'blue',
            },
            {
              label: 'AI Framework',
              value: 'LangChain',
              sub: 'Agent orchestration',
              tone: 'purple',
            },
            {
              label: 'Backend',
              value: 'Express',
              sub: 'Pipeline orchestration',
              tone: 'navy',
            },
            {
              label: 'Storage',
              value: 'Firebase',
              sub: 'Auth + Firestore',
              tone: 'gold',
            },
          ],
        },
        {
          type: 'tags',
          items: [
            { label: 'React', tone: 'blue' },
            { label: 'TypeScript', tone: 'cyan' },
            { label: 'Express.js', tone: 'navy' },
            { label: 'LangChain', tone: 'purple' },
            { label: 'Firebase Auth', tone: 'gold' },
            { label: 'Firestore', tone: 'gold' },
            { label: 'Firebase Hosting', tone: 'gold' },
            { label: 'Streaming API', tone: 'green' },
          ],
        },
        {
          type: 'table',
          headers: [
            { label: 'Layer', align: 'left' },
            { label: 'Technology', align: 'left' },
            { label: 'Role', align: 'left' },
          ],
          rows: [
            [
              { value: 'Frontend', bold: true },
              { value: 'React + TypeScript', mono: true },
              { value: 'SPA with real-time streaming UI' },
            ],
            [
              { value: 'Backend', bold: true },
              { value: 'Express.js', mono: true },
              { value: 'API server, pipeline orchestration' },
            ],
            [
              { value: 'AI', bold: true },
              { value: 'LangChain', mono: true },
              { value: 'Agent orchestration, prompt chaining, memory' },
            ],
            [
              { value: 'Auth', bold: true },
              { value: 'Firebase Auth', mono: true },
              { value: 'User identity and session management' },
            ],
            [
              { value: 'Database', bold: true },
              { value: 'Firestore', mono: true },
              { value: 'Journal entries, user profiles, agent outputs' },
            ],
            [
              { value: 'Hosting', bold: true },
              { value: 'Firebase Hosting', mono: true },
              { value: 'Production deployment with CDN' },
            ],
          ],
        },
        {
          type: 'table',
          headers: [
            { label: 'Resource', align: 'left' },
            { label: 'URL', align: 'left' },
          ],
          rows: [
            [
              { value: 'Live Product', bold: true },
              { value: 'ai-becoming.web.app', mono: true },
            ],
            [
              { value: 'Source Code', bold: true },
              { value: 'github.com/CryptoPrism-io/pratyaksha', mono: true },
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'green',
          title: 'Key Takeaway',
          body: 'The most powerful AI applications don\'t replace human thinking — they illuminate it. Pratyaksha proves that a well-designed agent pipeline can surface insights that would take months of unassisted reflection to discover.',
        },
      ],
    },
  ],
};
