import type { CaseStudyContent } from './types';

export const timesfmTradingBot: CaseStudyContent = {
  slug: 'timesfm-trading-bot',
  cluster: 'A',
  archetype: 'Founder-Operator',
  oneLineTagline:
    "Google's TimesFM 2.5 foundation model fine-tuned with LoRA adapters for automated crypto futures trading — 100 coins, 4 tiers, hourly ML signals executed live on Binance with a Flask monitoring dashboard on Cloud Run.",
  sourceFile: 'C:\\cpio_db\\portfolio\\case-timesfm-bot.html',

  leadershipLens: {
    call: 'Chose to build on Google TimesFM 2.5 200M — a pre-trained time-series foundation model — rather than hand-engineering technical indicators or training a bespoke model from scratch, betting that transfer learning from 100B real-world time points would outperform feature-engineered baselines on crypto OHLCV data.',
    bet: 'Bet that fine-tuning the foundation model with LoRA adapters on crypto-specific data, using only 192-bar context windows on a 7.8 GB RAM CPU-only VM, would achieve production-grade signal quality (AUC > 0.85) without GPU infrastructure — and designed the entire tiered execution system around that constraint from day one.',
    tradeoff:
      'Accepted sequential TimesFM inference across all 100 coins (no concurrent model instances) due to the 2.4 GB model footprint against the VM\'s 7.8 GB RAM ceiling, in exchange for avoiding a costly GPU instance upgrade and keeping infrastructure costs flat while running 6 live algo variants simultaneously.',
    outcome:
      'Six live algo variants (s4_hourly, fm_sniper, fm_broadnet, fm_patience, fm_momentum, fm_conviction) running 24/7 on Binance Futures across 100 coins in 4 tiers — with backtest AUC of 0.896 and precision of 0.880, automated grid entries, trailing stops, and a Flask dashboard on Cloud Run delivering daily and weekly PDF performance reports.',
    coordinated:
      'Sole engineer-of-record across the full stack: GCP VM provisioning, TimesFM model integration and LoRA fine-tuning, Binance SDK derivatives integration, PostgreSQL schema design, Cloud Run dashboard deployment, and GitHub Actions CI/CD with 4 path-filtered jobs covering both VM and containerized deployments.',
    nextStep:
      'Extend LoRA fine-tuning with live trade feedback to close the backtest-to-live performance gap, add multi-timeframe signal confluence (1h + 4h) to improve entry quality, and integrate BigQuery for long-horizon trade analytics and model retraining pipelines.',
  },

  sections: [
    // ─────────────────────────────────────────────────────────────
    // 01  THE PROBLEM
    // ─────────────────────────────────────────────────────────────
    {
      number: '01',
      eyebrow: 'Chapter 1',
      title: 'ML-Powered Signals at Scale Across 100 Coins',
      blocks: [
        {
          type: 'prose',
          body: "Crypto markets operate 24/7 across hundreds of assets. Manual trading cannot scale — human attention is limited, emotional bias degrades decisions, and opportunity windows close in minutes. The challenge: generate ML-powered trading signals at scale and execute them automatically with rigorous risk management.\n\nGoogle TimesFM is a pre-trained time-series foundation model trained on 100B real-world time points. Unlike traditional technical indicators, it captures complex temporal patterns without hand-engineered features. The goal: leverage this foundation model for signal generation across 100 coins with automated Binance futures execution.",
        },
        {
          type: 'callout',
          tone: 'blue',
          title: 'Design Constraint',
          body: 'The GCP VM has only 7.8 GB RAM — the TimesFM model consumes ~2.4 GB. The bot must load the model once at startup and share it across all scan jobs. No concurrent model instances are possible.',
        },
        {
          type: 'stats',
          cols: 4,
          items: [
            {
              label: 'Coins Tracked',
              value: '100',
              sub: 'across 4 tiers',
              tone: 'gold',
            },
            {
              label: 'Signal Freq',
              value: 'Hourly',
              sub: 'fires at HH:01',
              tone: 'blue',
            },
            {
              label: 'Backtest AUC',
              value: '0.896',
              sub: 'precision 0.880',
              tone: 'green',
            },
            {
              label: 'Context',
              value: '192',
              sub: 'bars per inference',
              tone: 'purple',
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 02  MODEL ARCHITECTURE
    // ─────────────────────────────────────────────────────────────
    {
      number: '02',
      eyebrow: 'Chapter 2',
      title: 'TimesFM 2.5 Foundation Model with LoRA Fine-Tuning',
      blocks: [
        {
          type: 'prose',
          body: 'The system is built on Google TimesFM 2.5 200M — a decoder-only transformer pre-trained on diverse time-series data. Rather than training from scratch, the foundation model is fine-tuned on crypto OHLCV data using LoRA adapters, achieving strong out-of-sample performance with minimal compute.',
        },
        {
          type: 'flow',
          title: 'End-to-End Signal Flow',
          rows: [
            [
              { label: 'Price History (OHLCV)', tone: 'navy' },
              { label: 'TimesFM Prediction', tone: 'purple' },
              { label: 'Signal Generation', tone: 'blue' },
              { label: 'Binance API', tone: 'gold' },
              { label: 'Trade Execution', tone: 'green' },
            ],
          ],
        },
        {
          type: 'prose',
          heading: 'Tiered Trading Strategy',
          body: '',
        },
        {
          type: 'table',
          headers: [
            { label: 'Tier', align: 'left' },
            { label: 'Coins', align: 'right' },
            { label: 'Allocation', align: 'right' },
            { label: 'Threshold', align: 'right' },
            { label: 'Character', align: 'left' },
          ],
          rows: [
            [
              { value: 'T1 — High Conviction', bold: true },
              { value: '10', mono: true },
              { value: '$120/trade', mono: true },
              { value: '0.57%', mono: true },
              { value: 'Top-tier liquidity, lowest threshold' },
            ],
            [
              { value: 'T2 — Broad Net', bold: true },
              { value: '15', mono: true },
              { value: '$100/trade', mono: true },
              { value: '0.75%', mono: true },
              { value: 'Mid-cap, moderate confidence' },
            ],
            [
              { value: 'T3 — Momentum', bold: true },
              { value: '25', mono: true },
              { value: '$20/trade', mono: true },
              { value: '1.33%', mono: true },
              { value: 'Small-cap, high threshold filter' },
            ],
            [
              { value: 'T4 — Patience', bold: true },
              { value: '31', mono: true },
              { value: '$13/trade', mono: true },
              { value: '1.50%', mono: true },
              { value: 'Lowest allocation, strictest filter' },
            ],
          ],
        },
        {
          type: 'prose',
          heading: 'Position Lifecycle',
          body: 'Grid Entry (40/35/25%) → Partial Fills → Full Position\n  → Profit Monitor (every 5 min: trailing stop tracking)\n  → Reconcile (every hour: check SL/TP hits on exchange)\n  → EOD Close (MAX_HOLD_H=4h, force market close)\n  → Exit recorded (bot.positions, PnL calculated)',
        },
        {
          type: 'prose',
          heading: 'Risk Management',
          body: '',
        },
        {
          type: 'stats',
          cols: 4,
          items: [
            {
              label: 'Trailing SL',
              value: '0.5%',
              sub: 'arm + trail',
              tone: 'green',
            },
            {
              label: 'Take Profit',
              value: '4.5%',
              sub: 'limit exit',
              tone: 'blue',
            },
            {
              label: 'Max Hold',
              value: '4h',
              sub: 'EOD force close',
              tone: 'gold',
            },
            {
              label: 'Regime Filter',
              value: 'BTC',
              sub: 'SuperTrend gate',
              tone: 'purple',
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 03  SYSTEM COMPONENTS
    // ─────────────────────────────────────────────────────────────
    {
      number: '03',
      eyebrow: 'Chapter 3',
      title: 'Four-Subsystem Architecture',
      blocks: [
        {
          type: 'prose',
          body: 'The platform is organized into four major subsystems, each responsible for a distinct concern — from core trading logic to model training to operational monitoring.',
        },
        {
          type: 'prose',
          heading: 'Repository Layout',
          body: 's4_bot/           Main bot — 4 variants (T1-high, T1-broad, T2, PAXG)\n  config/          All variant configs (coins, filters, SL/TP, leverage)\n  core/            Signal logic, position management, trailing stops\n  data/            OHLCV fetching (ThreadPoolExecutor, 20 workers)\n  db/              Postgres state: positions, account, daily_log\n  jobs/            APScheduler tasks: scan, reconcile, eod_close\n  scripts/         Operational: deploy_restart.sh, run_loop\ndashboard/        Flask + Cloud Run — portfolio view, metrics, reports\nhourly_timesfm/   Training: finetune.py, predict.py, evaluate.py\ntimesfm_repo/     Google TimesFM model source + adapters',
        },
        {
          type: 'prose',
          heading: 'Component A — s4_bot/ Core Trading Bot',
          body: 'The production trading engine. Contains config (settings, variant configs), core (signal logic, position management), data (OHLCV fetching, 20 parallel workers), db (Postgres state management), deploy (restart scripts), jobs (APScheduler tasks), scripts (operational utilities), and utils (Binance SDK wrappers). Entry point: main.py fires hourly at HH:01.',
        },
        {
          type: 'prose',
          heading: 'Component B — dashboard/ Flask + Cloud Run',
          body: 'Monitoring web application deployed on Cloud Run. Flask backend with app.py, configs.py, db.py for Postgres connectivity, metrics.py for performance calculations, report.py for daily/weekly PDF generation, and email_sender.py for automated report distribution. Served with Docker containerization.',
        },
        {
          type: 'prose',
          heading: 'Component C — hourly_timesfm/ Training Pipeline',
          body: 'Model fine-tuning and evaluation pipeline. Includes finetune.py (LoRA adapter training), predict.py (batch inference), evaluate.py (backtest metrics), config.py (hyperparameters), dataset.py (data loading), lora_layers.py (adapter architecture), and multiple backtest variants for parameter sweeping.',
        },
        {
          type: 'prose',
          heading: 'Component D — timesfm_repo/ Model Integration',
          body: 'Fork of Google Research TimesFM repository. Contains the model source (src/), v1 compatibility layer, and project scaffolding (pyproject.toml). Provides the base TimesFM model that the hourly_timesfm pipeline fine-tunes with crypto-specific LoRA adapters.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 04  DEPLOYMENT ARCHITECTURE
    // ─────────────────────────────────────────────────────────────
    {
      number: '04',
      eyebrow: 'Chapter 4',
      title: 'Hybrid GCP VM + Cloud Run Deployment',
      blocks: [
        {
          type: 'prose',
          body: 'The system uses a hybrid deployment model: the trading bot runs on a GCP VM (for persistent process and low-latency exchange connectivity), while the monitoring dashboard is containerized and deployed to Cloud Run (for scalability and zero-ops serving).',
        },
        {
          type: 'flow',
          title: 'GitHub Actions Workflow (deploy.yml)',
          rows: [
            [
              { label: 'Push to master', tone: 'light' },
              { label: 'Job 1: Detect Changes', tone: 'navy' },
              { label: 'Path Filter', tone: 'light' },
            ],
            [
              { label: 's4_bot/** changed', tone: 'blue' },
              { label: 'SSH to VM', tone: 'purple' },
              { label: 'git pull + restart', tone: 'green' },
            ],
            [
              { label: 'dashboard/** changed', tone: 'blue' },
              { label: 'Docker Build', tone: 'gold' },
              { label: 'Cloud Run Deploy', tone: 'green' },
            ],
          ],
        },
        {
          type: 'prose',
          heading: 'VM — Bot Execution (GCP Compute Engine)',
          body: 'Host: openclaw-bot. 7.8 GB RAM, CPU-only. Python 3.11, APScheduler for job orchestration. Bot process runs continuously, model loaded once at startup (~2.4 GB). Deploy via SSH + appleboy/ssh-action.',
        },
        {
          type: 'prose',
          heading: 'Cloud Run — Monitoring Dashboard',
          body: 'Docker image built from dashboard/Dockerfile. Auto-scaling, HTTPS. Cloud Scheduler triggers daily reports at 02:30 UTC and weekly reports on Monday 02:30 UTC. Zero-ops serving with gcloud deploy.',
        },
        {
          type: 'callout',
          title: 'Deployment Pattern',
          body: 'Bot deploys use SSH to pull latest code and run deploy_restart.sh, which gracefully stops the current process and restarts with the new code. This preserves the model in memory during the brief restart window, minimizing downtime to under 30 seconds.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 05  MONITORING DASHBOARD
    // ─────────────────────────────────────────────────────────────
    {
      number: '05',
      eyebrow: 'Chapter 5',
      title: 'Flask Dashboard with Automated PDF Reports',
      blocks: [
        {
          type: 'prose',
          body: 'The Flask-based dashboard provides real-time visibility into bot performance, portfolio allocation, and trade history. Deployed on Cloud Run with automated report generation.',
        },
        {
          type: 'stats',
          cols: 3,
          items: [
            {
              label: 'Coins Tracked',
              value: '100',
              sub: '4 tiers, daily scans',
              tone: 'gold',
            },
            {
              label: 'Reports',
              value: 'Daily',
              sub: '+ weekly summary',
              tone: 'blue',
            },
            {
              label: 'Automation',
              value: '24/7',
              sub: 'Cloud Scheduler',
              tone: 'green',
            },
          ],
        },
        {
          type: 'table',
          headers: [
            { label: 'Module', align: 'left' },
            { label: 'File', align: 'left' },
            { label: 'Responsibility', align: 'left' },
          ],
          rows: [
            [
              { value: 'Application', bold: true },
              { value: 'app.py', mono: true },
              { value: 'Flask routes, API endpoints, template rendering' },
            ],
            [
              { value: 'Configuration', bold: true },
              { value: 'configs.py', mono: true },
              { value: 'Environment variables, Cloud Run settings' },
            ],
            [
              { value: 'Database', bold: true },
              { value: 'db.py', mono: true },
              { value: 'Postgres connection pool, query helpers' },
            ],
            [
              { value: 'Metrics', bold: true },
              { value: 'metrics.py', mono: true },
              { value: 'PnL calculations, Sharpe ratio, drawdown analysis' },
            ],
            [
              { value: 'Reports', bold: true },
              { value: 'report.py', mono: true },
              { value: 'Daily/weekly PDF generation, HTML formatting' },
            ],
            [
              { value: 'Notifications', bold: true },
              { value: 'email_sender.py', mono: true },
              { value: 'Automated report distribution via email' },
            ],
          ],
        },
        {
          type: 'prose',
          heading: 'Database Schema (Postgres — cp_ai)',
          body: 'bot.account          — per-algo equity, allocation, daily PnL\nbot.positions        — all trades (OPEN/CLOSED), entry/exit, PnL\nbot.daily_log        — cumulative PnL per day per algo\nbot.pending_entries  — grid entry tranches (t1/t2/t3)\nbot.bot_events       — START/STOP/CRASH lifecycle events',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 06  TECH STACK
    // ─────────────────────────────────────────────────────────────
    {
      number: '06',
      eyebrow: 'Chapter 6',
      title: 'Technology Stack',
      blocks: [
        {
          type: 'prose',
          body: 'A Python-native stack optimized for ML inference, exchange connectivity, and operational reliability.',
        },
        {
          type: 'tags',
          items: [
            { label: 'Python 3.12', tone: 'navy' },
            { label: 'Google TimesFM 2.5', tone: 'purple' },
            { label: 'PyTorch 2.10', tone: 'gold' },
            { label: 'Binance SDK', tone: 'blue' },
            { label: 'PostgreSQL', tone: 'green' },
            { label: 'BigQuery', tone: 'cyan' },
            { label: 'Flask' },
            { label: 'Docker' },
            { label: 'Cloud Run', tone: 'blue' },
            { label: 'GitHub Actions', tone: 'purple' },
            { label: 'APScheduler', tone: 'green' },
            { label: 'LoRA Adapters', tone: 'gold' },
          ],
        },
        {
          type: 'prose',
          heading: 'Key Technical Decisions',
          body: 'MODEL — TimesFM 2.5 200M: Foundation model pre-trained on 100B time points. Fine-tuned with LoRA adapters on crypto OHLCV data. Context length of 192 bars provides sufficient temporal context for hourly predictions. Checkpoint size: ~500 MB.\n\nEXCHANGE — Binance SDK (Native): Using official binance-sdk-derivatives-trading-usds-futures (v7.1.1) — NOT ccxt. Direct futures API access for grid orders, trailing stops, and position management. Taker fee: 0.05%, maker: 0.02%.\n\nSCHEDULING — APScheduler: BlockingScheduler for main bot loop (hourly scans), BackgroundScheduler for 5-minute profit monitoring. Runs as persistent process on VM — no serverless cold starts affecting latency.\n\nDATA FETCHING — ThreadPoolExecutor (20 workers): Parallel OHLCV fetching across all 100 coins. Sequential TimesFM inference (GPU/CPU bound). This hybrid approach maximizes throughput while respecting model memory constraints.',
        },
        {
          type: 'table',
          headers: [
            { label: 'Algo ID', align: 'left' },
            { label: 'Strategy', align: 'left' },
            { label: 'Status', align: 'left' },
          ],
          rows: [
            [
              { value: 's4_hourly', mono: true },
              { value: 'Main S4 bot — 4-tier hourly signals' },
              { value: 'LIVE', tone: 'green' },
            ],
            [
              { value: 'fm_sniper', mono: true },
              { value: 'High-conviction, tight stops' },
              { value: 'LIVE', tone: 'green' },
            ],
            [
              { value: 'fm_broadnet', mono: true },
              { value: 'Wide net, relaxed thresholds' },
              { value: 'LIVE', tone: 'green' },
            ],
            [
              { value: 'fm_patience', mono: true },
              { value: 'High threshold, low frequency' },
              { value: 'LIVE', tone: 'green' },
            ],
            [
              { value: 'fm_momentum', mono: true },
              { value: 'Trend-following confirmation' },
              { value: 'LIVE', tone: 'green' },
            ],
            [
              { value: 'fm_conviction', mono: true },
              { value: 'Maximum confidence filter' },
              { value: 'LIVE', tone: 'green' },
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'green',
          title: 'Performance Metrics',
          body: 'Backtest results: AUC = 0.896, Precision = 0.880, F1 = 0.839, optimal threshold = 0.0249. The model demonstrates strong discriminative ability between profitable and non-profitable trades across all four tiers.',
        },
      ],
    },
  ],
};
