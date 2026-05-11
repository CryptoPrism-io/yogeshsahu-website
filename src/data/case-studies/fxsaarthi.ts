import type { CaseStudyContent } from './types';

export const fxsaarthi: CaseStudyContent = {
  slug: 'fxsaarthi',
  cluster: 'A',
  archetype: 'Founder-Operator',
  oneLineTagline:
    'A professional forex session dashboard — 24-hour session timeline, 28-pair coverage, economic calendar, position sizing, and volatility monitoring — built with React 19, TypeScript, and a multi-job Cloud Run data pipeline serving live OANDA and ForexFactory data.',
  sourceFile: 'C:\\cpio_db\\portfolio\\case-fxsaarthi.html',

  leadershipLens: {
    call: 'Identified a gap between simplistic world-clock widgets and expensive institutional terminals: no tool in the middle offered session-aware analytics with live data pipelines at zero cost. Chose to build a focused, specialist dashboard that solves one problem exceptionally well — knowing exactly which session is active and what it means for the 28 pairs you trade — rather than a generalist trading platform.',
    bet: 'Bet that separating the data pipeline into three independent Cloud Run jobs (ForexFactory scraper every 3 minutes, OANDA candles hourly, correlation matrix daily) — each owning exactly one concern — would give better reliability and a clearer upgrade path than a monolithic ingestion service, even though it meant maintaining three separate GitHub Actions workflows and Docker images.',
    tradeoff:
      'Accepted no real-time price streaming (60-second refresh cycle) and no user authentication layer in v1, trading these features for a dramatically simpler deployment footprint: a single Cloud Run service serving both the React frontend and Express API from a multi-stage Docker build, with zero managed WebSocket infrastructure and no auth complexity to operate.',
    outcome:
      'A live, production-deployed dashboard covering 4 forex sessions (Sydney/Tokyo/London/New York), 28 currency pairs, 84 timezone options, and 5 PostgreSQL tables — with a 1-second session status engine, ATR-aware position sizing, a 28-pair correlation heatmap, and a ForexFactory-backed economic calendar updating every 3 minutes. Also deployed as a static GitHub Pages demo for offline visibility.',
    coordinated:
      'Sole engineer and designer across the full system: React 19 frontend (40+ components, 8 custom hooks, glass-morphism design system), Node/Express API (9 endpoints), PostgreSQL schema design (fx_global, 5 tables), Python OANDA pipeline and ForexFactory scraper, Docker containerization, Cloud Run deployment, and CI/CD across three independent repositories.',
    nextStep:
      'Add WebSocket streaming to push price and session-status updates in real time without polling, introduce user profiles for saving preferred timezone and watchlist pairs, and extend the correlation engine to compute session-specific correlations (London-only vs. NY-only) rather than a single daily aggregate.',
  },

  sections: [
    // ─────────────────────────────────────────────────────────────
    // 01  THE UX CHALLENGE
    // ─────────────────────────────────────────────────────────────
    {
      number: '01',
      eyebrow: 'Chapter 1',
      title: 'The UX Challenge',
      blocks: [
        {
          type: 'prose',
          body: 'The same currency pair behaves differently depending on which trading session is active. EUR/USD during the London–New York overlap is a different beast than EUR/USD during the quiet Sydney session. Volatility spikes, liquidity shifts, and economic releases cluster around specific hours — yet most forex tools treat all hours as equal.\n\nExisting tools fall into one of two traps: they are either simple world-clock widgets with no analytical depth, or complex institutional terminals that require a Bloomberg subscription. Nothing in between offers session-aware analysis with integrated data pipelines at zero cost.',
        },
        {
          type: 'callout',
          title: 'Problem Statement',
          body: 'Forex traders need a single dashboard that unifies session timelines, economic calendar events, position sizing, correlation analysis, and volatility monitoring — all updating in real time, all session-aware, all accessible from a phone at 3 AM.',
        },
        {
          type: 'stats',
          cols: 6,
          items: [
            { label: 'Components', value: '40+', sub: 'React TSX', tone: 'blue' },
            { label: 'Custom Hooks', value: '8', sub: 'Reusable logic', tone: 'cyan' },
            { label: 'Currency Pairs', value: '28', sub: 'Major + crosses', tone: 'green' },
            { label: 'Timezones', value: '84', sub: 'Full global coverage', tone: 'purple' },
            { label: 'DB Tables', value: '5', sub: 'fx_global schema', tone: 'gold' },
            { label: 'Update Cycle', value: '1s', sub: 'Real-time clock' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 02  DESIGN SYSTEM
    // ─────────────────────────────────────────────────────────────
    {
      number: '02',
      eyebrow: 'Chapter 2',
      title: 'Design System',
      blocks: [
        {
          type: 'prose',
          body: 'FxSaarthi uses a glass-morphism aesthetic — translucent panels with subtle gradients, backdrop blur, and inset highlights floating over a dark background (#0f1419). Each trading session has a unique color so a glance at any chart or clock tells the trader which market is driving the action.',
        },
        {
          type: 'prose',
          heading: 'Session Color Palette',
          body: 'Sydney — #38bdf8 (sky blue)\nTokyo — #f472b6 (pink)\nLondon — #facc15 (yellow)\nNew York — #34d399 (green)',
        },
        {
          type: 'prose',
          heading: 'Responsive Breakpoints',
          body: 'Mobile (< 768px): single column, 8-tab bottom nav with snap-scroll\nTablet (768–1024px): 2-column grid, tab nav\nDesktop (> 1024px): 4-quadrant Bento grid with fixed 52px navbar',
        },
        {
          type: 'prose',
          heading: 'Component Hierarchy',
          body: 'App.tsx (root orchestrator)\n  Desktop (>= 1024px) → BentoDesktopLayout\n    DesktopNavbar (52px fixed)\n    Left Sidebar (20%): TimeCard, ActiveSessions, PairsToTrade\n    Right Content Grid (80%): ForexChart, VolumeChart, EconomicCalendar, SessionClocks\n  Mobile / Tablet (< 1024px)\n    OverviewPanel, EconomicCalendar, ForexChart, SessionGuide\n    WorldClockPanel, FXToolsPanel, BestPairsWidget\n    BottomNavBar (8 tabs, snap-scroll)',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 03  IMPLEMENTATION
    // ─────────────────────────────────────────────────────────────
    {
      number: '03',
      eyebrow: 'Chapter 3',
      title: 'Implementation',
      blocks: [
        {
          type: 'prose',
          body: '40+ React components, 8 custom hooks, zero state management libraries. FxSaarthi is built entirely with React hooks — no Redux, no Context API, no Zustand. State flows top-down from App.tsx, which orchestrates timezone selection, real-time clock updates, and session status calculations.',
        },
        {
          type: 'table',
          headers: [
            { label: 'Hook', align: 'left' },
            { label: 'Responsibility', align: 'left' },
          ],
          rows: [
            [
              { value: 'usePWAInstall', mono: true },
              { value: 'Manages PWA install prompt across Chrome, Safari, and Firefox' },
            ],
            [
              { value: 'useSessionAlerts', mono: true },
              { value: 'Browser notifications for session open/close/warning events' },
            ],
            [
              { value: 'useReducedMotion', mono: true },
              { value: 'Detects OS-level prefers-reduced-motion and disables animations' },
            ],
            [
              { value: 'useViewport', mono: true },
              { value: 'Responsive breakpoint detection for mobile/tablet/desktop layouts' },
            ],
            [
              { value: 'useFXVolatility', mono: true },
              { value: 'Fetches HV-20, ATR, SMA-30, BB Width with 1-hour cache' },
            ],
            [
              { value: 'useFXPrice', mono: true },
              { value: 'Live bid/ask/mid prices with 60-second auto-refresh' },
            ],
            [
              { value: 'useFXCorrelation', mono: true },
              { value: '28-pair correlation matrix from PostgreSQL via Express API' },
            ],
            [
              { value: 'useFXAvailableInst', mono: true },
              { value: 'Instrument list for dropdowns and filters across all FX tools' },
            ],
          ],
        },
        {
          type: 'prose',
          heading: 'Animation System',
          body: 'Every animation is built with Framer Motion 11.18.2 and respects prefers-reduced-motion via the useReducedMotion hook. All animations use GPU-accelerated properties (transform, opacity) with type: "tween" for predictable 60fps rendering.',
        },
        {
          type: 'stats',
          cols: 4,
          items: [
            { label: 'Clock Update', value: '100ms', sub: 'Smooth second hand', tone: 'cyan' },
            { label: 'App Cycle', value: '1s', sub: 'Session status check', tone: 'blue' },
            { label: 'Price Refresh', value: '60s', sub: 'Live bid/ask/mid', tone: 'green' },
            { label: 'Vol. Cache', value: '1hr', sub: 'ATR, HV, BB Width', tone: 'purple' },
          ],
        },
        {
          type: 'callout',
          tone: 'green',
          title: 'Accessibility-First Architecture',
          body: 'React Aria Components 1.13.0 provides automatic ARIA attributes, focus management, and keyboard navigation (Tab, Escape, Arrow keys) across all interactive elements. Screen readers receive semantic labels for every session bar, clock face, and calendar event.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 04  DATA PIPELINE
    // ─────────────────────────────────────────────────────────────
    {
      number: '04',
      eyebrow: 'Chapter 4',
      title: 'Data Pipeline',
      blocks: [
        {
          type: 'prose',
          body: 'Three data sources converge into one database, served by one API, rendered in one UI. The pipeline architecture separates concerns: scraping runs on its own schedule, price ingestion on another, and correlation analysis runs daily. All write into the shared fx_global PostgreSQL database on Cloud SQL.',
        },
        {
          type: 'flow',
          title: 'Data Pipeline Architecture',
          rows: [
            [
              { label: 'OANDA API', tone: 'navy' },
              { label: 'FX Pipeline (hourly)', tone: 'purple' },
              { label: 'oanda_candles', tone: 'green' },
            ],
            [
              { label: 'OANDA API', tone: 'navy' },
              { label: 'FX Pipeline (daily)', tone: 'purple' },
              { label: 'correlation_matrix', tone: 'cyan' },
            ],
            [
              { label: 'ForexFactory', tone: 'navy' },
              { label: 'Scraper (every 3 min)', tone: 'gold' },
              { label: 'economic_calendar_ff', tone: 'blue' },
            ],
            [
              { label: 'fx_global (PostgreSQL)', tone: 'navy' },
              { label: 'Express API', tone: 'blue' },
              { label: 'React UI', tone: 'green' },
            ],
          ],
        },
        {
          type: 'table',
          headers: [
            { label: 'Table', align: 'left' },
            { label: 'Source', align: 'left' },
            { label: 'Schedule', align: 'left' },
            { label: 'Purpose', align: 'left' },
          ],
          rows: [
            [
              { value: 'economic_calendar_ff', bold: true },
              { value: 'ForexFactory Scraper' },
              { value: '3 min', mono: true },
              { value: 'Economic events: dates, currencies, impact, actual/forecast/previous' },
            ],
            [
              { value: 'oanda_candles', bold: true },
              { value: 'OANDA via FX Pipeline' },
              { value: 'hourly', mono: true },
              { value: 'OHLC price data for 28 currency pairs' },
            ],
            [
              { value: 'volatility_metrics', bold: true },
              { value: 'FX Pipeline (computed)' },
              { value: 'hourly', mono: true },
              { value: 'HV-20, ATR-14, SMA-30, Bollinger Band width' },
            ],
            [
              { value: 'correlation_matrix', bold: true },
              { value: 'FX Pipeline (computed)' },
              { value: 'daily', mono: true },
              { value: 'Pairwise correlation coefficients for all 28 pairs' },
            ],
            [
              { value: 'best_pairs_tracker', bold: true },
              { value: 'FX Pipeline (computed)' },
              { value: 'daily', mono: true },
              { value: 'Ranked pair recommendations: hedging, trending, reversal' },
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'blue',
          title: 'CI/CD Pipeline',
          body: 'Three independent GitHub repositories, three GitHub Actions workflows, all auto-deploying on push to main. The dashboard also has a parallel GitHub Pages deployment for the frontend-only demo at github.io/Forex-Session-Dashboard/.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 05  FEATURES DEEP-DIVE
    // ─────────────────────────────────────────────────────────────
    {
      number: '05',
      eyebrow: 'Chapter 5',
      title: 'Features Deep-Dive',
      blocks: [
        {
          type: 'prose',
          heading: '24-Hour Session Timeline',
          body: 'Built with Recharts BarChart and a custom CustomBarShape renderer. Sessions are stacked in three layers: main sessions (90% row height), overlaps (40%), and killzones (40%). A blinking "Now" line pulses every second with a glow effect, position calculated via useMemo for zero transition overhead. Sessions split across midnight are rendered as p1/p2 segments. Timezone offset shifts all bar positions dynamically.',
        },
        {
          type: 'prose',
          heading: 'Economic Calendar',
          body: 'AG Grid table displaying events from the economic_calendar_ff table, refreshed every 3 minutes via the ForexFactory scraper pipeline. Countdown timers: red (< 2h), amber (2–6h), cyan (> 6h), grey (past). Multi-currency filter: USD, EUR, GBP, JPY, AUD, CAD, NZD, CHF, CNY. Impact filtering: High, Medium, Low. Quick filters: Yesterday, Today, Tomorrow.',
        },
        {
          type: 'prose',
          heading: 'Position Size Calculator',
          body: 'Risk-based lot sizing with live ATR data from the volatility_metrics table. The calculator uses useFXVolatility to fetch real-time ATR values, so recommended position sizes reflect current market conditions. Inputs: account balance, risk % (0.5–5% slider), stop loss pips, instrument. Outputs: lot size, risk amount in account currency, pip value. ATR-aware: suggests stop-loss based on current 14-period ATR.',
        },
        {
          type: 'prose',
          heading: 'Correlation Heatmap',
          body: 'A 28-pair matrix and network graph showing pairwise correlations. Data computed daily by the FX Pipeline and stored in correlation_matrix. Color scale: green (+0.7 to +1), grey (neutral), red (−0.7 to −1). Pair screener covers hedging, trending, and reversal categories with ranked best-pairs recommendations.',
        },
        {
          type: 'prose',
          heading: 'World Clocks',
          body: 'Four analog clocks — Sydney, Tokyo, London, New York — each with session-aware status indicators. Borders glow when the session is OPEN and pulse on WARNING. 100ms update interval for smooth second hand rotation with millisecond precision (second + ms / 1000). Session-colored accents: cyan, pink, yellow, green.',
        },
        {
          type: 'prose',
          heading: 'Volatility Monitor',
          body: 'Sortable grid showing all 28 instruments from the volatility_metrics table, color-coded by volatility regime. Metrics: HV-20, ATR-14, SMA-30, Bollinger Band Width. Row colors: green (low), yellow (medium), red (high volatility). Sortable by any column for quick pair discovery. Hourly refresh via FX Pipeline Cloud Run job.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 06  SESSION LOGIC & TIMEZONE ENGINE
    // ─────────────────────────────────────────────────────────────
    {
      number: '06',
      eyebrow: 'Chapter 6',
      title: 'Session Logic & Timezone Engine',
      blocks: [
        {
          type: 'prose',
          body: 'The core of FxSaarthi is its session status engine. Every second, App.tsx recalculates whether each session is OPEN, CLOSED, or WARNING (opening/closing within 15 minutes). The logic handles overnight sessions (Sydney crosses midnight UTC) by checking both "today" and "yesterday" ranges.',
        },
        {
          type: 'table',
          headers: [
            { label: 'Session', align: 'left' },
            { label: 'UTC Range', align: 'left' },
            { label: 'Key Overlap', align: 'left' },
            { label: 'Killzone', align: 'left' },
          ],
          rows: [
            [
              { value: 'Sydney', bold: true },
              { value: '21:00 – 06:00', mono: true },
              { value: 'Asia-London 07:00–09:00' },
              { value: '—' },
            ],
            [
              { value: 'Tokyo', bold: true },
              { value: '00:00 – 09:00', mono: true },
              { value: '—' },
              { value: '—' },
            ],
            [
              { value: 'London', bold: true },
              { value: '07:00 – 16:00', mono: true },
              { value: 'London-NY 12:00–16:00' },
              { value: '07:00–10:00 UTC' },
            ],
            [
              { value: 'New York', bold: true },
              { value: '12:00 – 21:00', mono: true },
              { value: '—' },
              { value: '12:00–15:00 / 18:00–20:00 UTC' },
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'purple',
          title: 'Timezone Conversion',
          body: 'All session times are stored as UTC hours (0–24+, where > 24 indicates next-day ranges). The ForexChart adjusts bar positions with left = (session_utc_start + offset) % 24. SessionClocks use Intl.DateTimeFormat with the timeZone parameter for locale-accurate display. Users choose from 84 timezone options covering every major financial center.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 07  TECH STACK
    // ─────────────────────────────────────────────────────────────
    {
      number: '07',
      eyebrow: 'Chapter 7',
      title: 'Technology Stack',
      blocks: [
        {
          type: 'prose',
          heading: 'Frontend',
          body: '',
        },
        {
          type: 'tags',
          items: [
            { label: 'React 19.2', tone: 'blue' },
            { label: 'TypeScript 5.5', tone: 'blue' },
            { label: 'Vite 6.4.1', tone: 'blue' },
            { label: 'Framer Motion 11.18.2', tone: 'purple' },
            { label: 'React Aria 1.13.0', tone: 'purple' },
            { label: 'Recharts', tone: 'cyan' },
            { label: 'AG Grid', tone: 'cyan' },
            { label: 'Tailwind CSS', tone: 'cyan' },
            { label: 'PWA', tone: 'green' },
            { label: 'Service Worker', tone: 'green' },
          ],
        },
        {
          type: 'prose',
          heading: 'Backend & Data',
          body: '',
        },
        {
          type: 'tags',
          items: [
            { label: 'Node.js', tone: 'green' },
            { label: 'Express.js', tone: 'green' },
            { label: 'PostgreSQL (Cloud SQL)', tone: 'blue' },
            { label: 'Python', tone: 'purple' },
            { label: 'OANDA API', tone: 'purple' },
            { label: 'ForexFactory Scraper', tone: 'gold' },
            { label: 'Cloud Scheduler', tone: 'gold' },
            { label: 'Docker', tone: 'navy' },
            { label: 'Google Cloud Run', tone: 'navy' },
            { label: 'GitHub Actions CI/CD' },
            { label: 'GitHub Pages' },
          ],
        },
        {
          type: 'table',
          headers: [
            { label: 'Endpoint', align: 'left' },
            { label: 'Description', align: 'left' },
          ],
          rows: [
            [
              { value: '/api/calendar/events', mono: true },
              { value: 'Economic events with date/currency/impact filters' },
            ],
            [
              { value: '/api/fx/prices/current', mono: true },
              { value: 'Live bid/ask/mid for a single instrument' },
            ],
            [
              { value: '/api/fx/prices/all', mono: true },
              { value: 'All 28 instrument prices' },
            ],
            [
              { value: '/api/fx/volatility/:inst', mono: true },
              { value: 'HV-20, ATR, SMA-30, BB Width for instrument' },
            ],
            [
              { value: '/api/fx/correlation-matrix', mono: true },
              { value: 'Full pairwise correlation matrix' },
            ],
            [
              { value: '/api/fx/best-pairs', mono: true },
              { value: 'Ranked pair recommendations by category' },
            ],
            [
              { value: '/api/fx/instruments', mono: true },
              { value: 'Available instrument list' },
            ],
          ],
        },
        {
          type: 'prose',
          heading: 'Repository Architecture',
          body: 'Forex-Session-Dashboard — React + Express + Docker → Cloud Run Service\nForexFactory-Calendar-Scraper — Python + Docker → Cloud Run Job (every 3 min)\nDataPipeLine-FX-APP — Python + Docker → Cloud Run Jobs (hourly + daily)',
        },
      ],
    },
  ],
};
