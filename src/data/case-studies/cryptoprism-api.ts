import type { CaseStudyContent } from './types';

export const cryptoprismApi: CaseStudyContent = {
  slug: 'cryptoprism-api',
  cluster: 'A',
  archetype: 'Founder-Operator',
  oneLineTagline:
    'FastAPI microservices with sub-50ms p99 latency on Cloud Run — serving analytics, scoring, signals, and portfolio endpoints for the CryptoPrism platform.',
  sourceFile: 'C:\\cpio_db\\portfolio\\case-cryptoprism-api.html',

  leadershipLens: {
    call: 'Chose to build a unified, stateless FastAPI backend on Cloud Run rather than coupling each product feature to a dedicated service or BaaS, consolidating 40+ endpoints across 15 router modules into a single auto-scaling container.',
    bet: 'Bet that a two-tier Redis + in-memory-fallback caching strategy with tuned TTLs per data category would achieve sub-50ms p99 latency without a dedicated CDN or query-level optimisation pass — and committed to that architecture from day one.',
    tradeoff:
      'Accepted min-instance=0 (scale-to-zero) in dev/staging, accepting cold-start latency in non-production environments, in exchange for zero idle cost and a simpler infrastructure footprint.',
    outcome:
      '40+ live endpoints covering prices, on-chain analytics, DMV scoring, ML inference, and AI-assisted features — all from a single stateless container serving the React frontend at sub-50ms p99, with 99.9% uptime on the Cloud Run SLA.',
    coordinated:
      'Sole engineer-of-record; coordinated GCP project config, Cloud SQL connection pooling, Memorystore Redis provisioning, Firebase auth integration, and GitHub Actions CI/CD pipeline.',
    nextStep:
      'Expand ML inference endpoints, wire portfolio management routes to the on-chain pipeline, and add Arbitrum/Base chain coverage through the on-chain service module.',
  },

  sections: [
    // ─────────────────────────────────────────────────────────────
    // 01  THE CHALLENGE
    // ─────────────────────────────────────────────────────────────
    {
      number: '01',
      eyebrow: 'Chapter 1',
      title: 'A Unified Backend for Real-Time Crypto Intelligence',
      blocks: [
        {
          type: 'prose',
          body: 'CryptoPrism.io needed a single API layer to serve its React frontend with live prices, on-chain analytics, proprietary DMV scoring, AI-generated signals, and portfolio management. The requirements were demanding: sub-50ms p99 latency under burst traffic, horizontal auto-scaling during market volatility events, a layered caching strategy, and zero-downtime deployments via CI/CD.',
        },
        {
          type: 'stats',
          cols: 4,
          items: [
            {
              label: 'P99 Latency',
              value: '<50ms',
              sub: 'cached responses',
              tone: 'green',
            },
            {
              label: 'API Endpoints',
              value: '40+',
              sub: 'across 15 routers',
              tone: 'blue',
            },
            {
              label: 'Chains Covered',
              value: '14',
              sub: 'on-chain metrics',
              tone: 'purple',
            },
            {
              label: 'Uptime',
              value: '99.9%',
              sub: 'Cloud Run SLA',
              tone: 'gold',
            },
          ],
        },
        {
          type: 'callout',
          title: 'Design Constraint',
          body: 'The API must remain stateless and read-only against PostgreSQL so that Cloud Run can scale instances from 0 to N without coordination overhead or write conflicts.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 02  ARCHITECTURE
    // ─────────────────────────────────────────────────────────────
    {
      number: '02',
      eyebrow: 'Chapter 2',
      title: 'Layered Microservices on Cloud Run',
      blocks: [
        {
          type: 'prose',
          body: 'The codebase follows a clean three-layer architecture: routes (HTTP interface), services (business logic + caching), and core (config, DB, auth, Redis). Each layer has a single responsibility, making the system testable and independently deployable.',
        },
        {
          type: 'flow',
          title: 'Request Flow',
          rows: [
            [
              { label: 'React Client', tone: 'light' },
              { label: 'Cloud Run (auto-scale)', tone: 'navy' },
              { label: 'FastAPI + Uvicorn', tone: 'blue' },
              { label: 'Service Layer', tone: 'green' },
              { label: 'PostgreSQL', tone: 'purple' },
            ],
            [
              { label: '', tone: 'light' },
              { label: '', tone: 'light' },
              { label: '', tone: 'light' },
              { label: 'Redis Cache', tone: 'cyan' },
              { label: 'In-Memory Fallback', tone: 'light' },
            ],
          ],
        },
        {
          type: 'prose',
          heading: 'Project Structure',
          body: 'src/api/ — HTTP layer\n  app.py — FastAPI app, middleware, router registration\n  middleware.py — Request logging (X-Response-Time header)\n  routes/ — 15 router modules\n\nsrc/core/ — Shared infrastructure\n  config.py — Pydantic Settings (env-driven)\n  database.py — Async SQLAlchemy engine + session factory\n  redis.py — get_or_compute pattern + in-memory fallback\n  auth.py — Firebase token verification dependency\n  constants.py — Chain/token mappings\n\nsrc/services/ — Business logic\n  screener.py — Dynamic SQL builder + cached queries\n  signals.py — Heatmap, consensus, divergences\n  onchain.py — Cross-chain metrics, whale alerts\n  prices.py — Live prices via CoinGecko\n  scores.py — CryptoScore leaderboard\n  ml.py — ML model inference endpoints\n  ... + 6 more service modules',
        },
        {
          type: 'prose',
          heading: 'Middleware Stack',
          body: 'MIDDLEWARE 1 — CORS: Whitelist-based origin control for app.cryptoprism.io, localhost:3000, and Firebase hosting domains. Credentials enabled for auth cookies.\n\nMIDDLEWARE 2 — Request Logging: Custom Starlette middleware injects X-Response-Time header and logs method, path, status, and latency in ms for every request.\n\nMIDDLEWARE 3 — Firebase Auth: FastAPI dependency (get_current_user) verifies Bearer tokens via firebase-admin SDK. Returns uid, email, name. Optional variant for public endpoints.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 03  PERFORMANCE
    // ─────────────────────────────────────────────────────────────
    {
      number: '03',
      eyebrow: 'Chapter 3',
      title: 'Sub-50ms at Scale',
      blocks: [
        {
          type: 'prose',
          body: 'Every performance decision cascades from one principle: never hit the database on a hot path if the data hasn\'t changed. The API implements a two-tier caching strategy with tuned TTLs per data category, plus connection pooling to eliminate cold-connect overhead.',
        },
        {
          type: 'prose',
          heading: 'Cache Architecture: Get-or-Compute',
          body: 'async def get_or_compute(key, ttl, compute_fn):\n    # Layer 1: Try Redis\n    cached = await cache_get(key)\n    if cached: return cached\n\n    # Layer 2: In-memory fallback (Redis down)\n    mem = _mem_get(key)\n    if mem: return mem\n\n    # Layer 3: Compute + cache in both layers\n    result = await compute_fn()\n    _mem_set(key, result, ttl)\n    await cache_set(key, result, ttl)\n    return result',
        },
        {
          type: 'prose',
          heading: 'TTL Strategy by Data Type',
          body: '',
        },
        {
          type: 'table',
          headers: [
            { label: 'Data Category', align: 'left' },
            { label: 'TTL', align: 'right' },
            { label: 'Rationale', align: 'left' },
          ],
          rows: [
            [
              { value: 'Live Prices', bold: true },
              { value: '60s', mono: true },
              { value: 'Market data refreshes every minute from CoinGecko' },
            ],
            [
              { value: 'Market Overview', bold: true },
              { value: '300s', mono: true },
              { value: 'Global stats (total cap, BTC dominance) change slowly' },
            ],
            [
              { value: 'Screener', bold: true },
              { value: '300s', mono: true },
              { value: 'DMV scores recomputed every 5 minutes upstream' },
            ],
            [
              { value: 'CryptoScores', bold: true },
              { value: '1800s', mono: true },
              { value: 'Composite scores updated twice per hour' },
            ],
            [
              { value: 'On-Chain Metrics', bold: true },
              { value: '21600s', mono: true },
              { value: 'Daily chain data; 6-hour TTL balances freshness vs load' },
            ],
          ],
        },
        {
          type: 'prose',
          heading: 'Connection Pooling',
          body: '',
        },
        {
          type: 'stats',
          cols: 4,
          items: [
            {
              label: 'Pool Size',
              value: '5',
              sub: 'persistent connections',
              tone: 'blue',
            },
            {
              label: 'Max Overflow',
              value: '3',
              sub: 'burst capacity',
              tone: 'cyan',
            },
            {
              label: 'Pool Recycle',
              value: '30m',
              sub: 'prevent stale connections',
              tone: 'green',
            },
            {
              label: 'Pre-Ping',
              value: 'ON',
              sub: 'validate before use',
              tone: 'gold',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'green',
          title: 'Performance Result',
          body: 'With Redis cache hits, typical response times are 3-8ms. Even cache-miss queries with PostgreSQL round-trips stay under 50ms p99 thanks to connection pooling and indexed queries.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 04  DEPLOYMENT
    // ─────────────────────────────────────────────────────────────
    {
      number: '04',
      eyebrow: 'Chapter 4',
      title: 'Containerized CI/CD to Cloud Run',
      blocks: [
        {
          type: 'prose',
          body: 'The API ships as a minimal Docker image, deployed automatically to Google Cloud Run via GitHub Actions. The pipeline handles linting, testing, building, and deploying — all triggered on push to main.',
        },
        {
          type: 'flow',
          title: 'CI/CD Flow',
          rows: [
            [
              { label: 'git push main', tone: 'light' },
              { label: 'GitHub Actions', tone: 'navy' },
              { label: 'Lint + Test', tone: 'blue' },
              { label: 'Docker Build', tone: 'purple' },
              { label: 'Cloud Run Deploy', tone: 'green' },
            ],
          ],
        },
        {
          type: 'prose',
          heading: 'Docker Configuration',
          body: 'FROM python:3.12-slim\nWORKDIR /app\n\n# Install dependencies\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\n# Copy application\nCOPY src/ ./src/\n\n# Run with Uvicorn\nCMD ["uvicorn", "src.api.app:app", "--host", "0.0.0.0", "--port", "8080"]',
        },
        {
          type: 'prose',
          heading: 'Cloud Run Configuration',
          body: 'AUTO-SCALING — Scale to Zero: Min instances: 0 (dev/staging), 1 (prod). Max instances: 10. Scales based on concurrent requests per instance (80 target). Cold start mitigated by min-instance in production.\n\nENVIRONMENT MANAGEMENT — Three Environments: Development (local Docker), Staging (Cloud Run with test DB), Production (Cloud Run + Cloud SQL + Memorystore Redis). Secrets injected via GCP Secret Manager.',
        },
        {
          type: 'callout',
          tone: 'blue',
          title: 'Zero-Downtime Deploys',
          body: 'Cloud Run performs rolling updates with traffic splitting. New revisions receive a canary percentage before full cutover, ensuring zero downtime and instant rollback capability.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 05  API DESIGN
    // ─────────────────────────────────────────────────────────────
    {
      number: '05',
      eyebrow: 'Chapter 5',
      title: 'RESTful Endpoints with Pydantic Validation',
      blocks: [
        {
          type: 'prose',
          body: 'The API exposes 15 route modules covering every data domain of the CryptoPrism platform. All endpoints follow consistent patterns: JSON responses, query-param filtering, Pydantic validation, and structured error handling with appropriate HTTP status codes.',
        },
        {
          type: 'prose',
          heading: 'Prices & Market',
          body: 'GET /api/v1/prices/live — Top tokens by market cap (paginated)\nGET /api/v1/prices/market-overview — Global stats: total cap, BTC dominance\nGET /api/v1/prices/{token_id} — Single token with 24h change, volume',
        },
        {
          type: 'prose',
          heading: 'On-Chain Analytics',
          body: 'GET /api/v1/on-chain/cross-chain — Compare metrics across 14 chains\nGET /api/v1/on-chain/{chain}/summary — Latest metrics + WoW/MoM/QoQ trends\nGET /api/v1/on-chain/{chain}/whale-alerts — Large transaction detection\nGET /api/v1/on-chain/{chain}/exchange-flow — Inflow/outflow to exchanges',
        },
        {
          type: 'prose',
          heading: 'Signals & Scoring',
          body: 'GET /api/v1/signals/heatmap — Top N tokens x 6 signal categories\nGET /api/v1/signals/divergences — On-chain vs TA divergence detection\nGET /api/v1/scores/leaderboard — CryptoScore ranking (top N)\nGET /api/v1/screener — Dynamic filter by DMV scores + presets',
        },
        {
          type: 'prose',
          heading: 'Auth & System',
          body: 'POST /api/v1/auth/verify — Verify Firebase token\nGET /api/v1/auth/me — Current user profile\nGET /health — Service health (PG + Redis status)',
        },
        {
          type: 'prose',
          heading: 'Error Handling Pattern',
          body: '# 401 — Auth failure\n{"detail": "Token expired"}\n\n# 404 — Resource not found\n{"detail": "Token \'xyz\' not found"}\n\n# 422 — Validation (auto from Pydantic)\n{"detail": [{"loc": ["query","limit"], "msg": "...", "type": "..."}]}',
        },
        {
          type: 'callout',
          tone: 'purple',
          title: 'Dynamic Screener Query Builder',
          body: 'The screener endpoint builds parameterized SQL dynamically based on filter combinations (momentum, durability, valuation, bullish signal count), with results cached by MD5 hash of the filter set for 5 minutes.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 06  TECH STACK
    // ─────────────────────────────────────────────────────────────
    {
      number: '06',
      eyebrow: 'Chapter 6',
      title: 'Production Dependencies',
      blocks: [
        {
          type: 'prose',
          body: 'Every dependency was chosen for async performance, type safety, and minimal cold-start footprint in a containerized environment.',
        },
        {
          type: 'prose',
          heading: 'Core Components',
          body: 'FRAMEWORK — FastAPI + Uvicorn: Async Python framework with automatic OpenAPI docs. Uvicorn ASGI server for high-concurrency request handling.\n\nDATABASE — PostgreSQL + asyncpg: Cloud SQL PostgreSQL with async driver via SQLAlchemy 2.0. Connection pooling with pool_pre_ping for reliability.\n\nCACHE — Redis (Memorystore): GCP Memorystore Redis for distributed caching. 20 max connections. In-memory dict fallback if Redis is unreachable.\n\nAUTH — Firebase Admin SDK: Server-side ID token verification. FastAPI dependency injection for both required and optional auth flows.\n\nVALIDATION — Pydantic v2: Type-safe settings management (BaseSettings) and request validation. Regex-constrained query parameters.\n\nINFRA — Cloud Run + Docker: Serverless containers with auto-scaling. GitHub Actions CI/CD. Python 3.12-slim base image for minimal footprint.',
        },
        {
          type: 'tags',
          items: [
            { label: 'Python 3.12', tone: 'navy' },
            { label: 'FastAPI', tone: 'blue' },
            { label: 'Uvicorn', tone: 'blue' },
            { label: 'PostgreSQL', tone: 'green' },
            { label: 'SQLAlchemy 2.0', tone: 'green' },
            { label: 'asyncpg', tone: 'green' },
            { label: 'Redis', tone: 'cyan' },
            { label: 'aioredis', tone: 'cyan' },
            { label: 'Firebase Admin', tone: 'purple' },
            { label: 'Pydantic v2', tone: 'purple' },
            { label: 'Docker', tone: 'gold' },
            { label: 'Cloud Run', tone: 'gold' },
            { label: 'GitHub Actions' },
            { label: 'Cloud SQL' },
            { label: 'GCP Memorystore' },
            { label: 'Ruff (linting)', tone: 'red' },
            { label: 'pytest (async)' },
          ],
        },
        {
          type: 'callout',
          tone: 'green',
          title: 'Key Metric',
          body: 'The full application serves 40+ endpoints across prices, on-chain analytics, proprietary scoring, ML inference, and AI-assisted features — all from a single stateless container with sub-50ms p99 latency.',
        },
      ],
    },
  ],
};
