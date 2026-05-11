import type { CaseStudyContent } from './types';

export const cryptoprismNewsFetcher: CaseStudyContent = {
  slug: 'cryptoprism-news-fetcher',
  cluster: 'A',
  archetype: 'Founder-Operator',
  oneLineTagline:
    'From 66K news articles to daily predictions for 1,000 coins — an end-to-end ML system that reads crypto news, engineers 50 features across 10 tables, and produces ranked trading signals every day.',
  sourceFile: 'C:\\cpio_db\\portfolio\\case-cryptoprism-ml-signals.html',

  leadershipLens: {
    call: 'Chose to build a fully automated end-to-end ML signal pipeline — from news ingestion through FinBERT NLP, feature engineering, and LightGBM inference — rather than buying a third-party signal feed or limiting scope to price-based indicators alone.',
    bet: 'Bet that separating the training database (cp_backtest, years of history) from the inference database (dbcp, live snapshots) was the correct architecture, and that fixing this dual-DB wiring would unlock the majority of predictive signal — committing to the refactor before any performance evidence.',
    tradeoff:
      'Accepted a slower, heavier pipeline (FinBERT NLP is GPU-bound, BTC residual decomposition runs on hourly OHLCV for 250 coins) in exchange for a model that can see independent alpha — coins that move for their own reasons, not just because Bitcoin moved.',
    outcome:
      'IC climbed from -0.007 (broken, worse than random) to +0.129 (above the 0.10 target), Sharpe 7.69, 60.7% accuracy on unseen data, max drawdown -3.0% — with 10 GitHub Actions workflows producing daily signals for 1,000 coins without human intervention.',
    coordinated:
      'Sole engineer-of-record across the full stack: news API integrations (44 sources), FinBERT sentiment pipeline, 10 FE tables, dual-PostgreSQL architecture, 6-model ensemble, and all GitHub Actions scheduling.',
    nextStep:
      'Wire ML_SIGNALS into the CryptoPrism API (FastAPI /ml endpoints), expose top-ranked coin predictions to the Saarthi AI advisor, and extend the hourly ensemble to cover 500 coins from the current 250.',
  },

  sections: [
    // ─────────────────────────────────────────────────────────────
    // 01  THE PROBLEM
    // ─────────────────────────────────────────────────────────────
    {
      number: '01',
      eyebrow: 'Chapter 1',
      title: 'The Problem',
      blocks: [
        {
          type: 'prose',
          body: 'Crypto markets move on news and price patterns. With 1,000 coins trading 24/7, manual analysis is impossible. A bullish CoinDesk headline about Solana, a volume spike on Arbitrum, a regulatory mention of XRP — these signals are scattered across dozens of sources, mixed with noise, and stale within hours.',
        },
        {
          type: 'prose',
          body: 'We needed a system that could: (1) automatically read hundreds of articles per day, (2) extract sentiment and categorize by coin, (3) combine news signals with price-based technical features, and (4) produce a single ranked prediction for every coin, every day.',
        },
        {
          type: 'callout',
          tone: 'red',
          title: 'The Scale Challenge',
          body: '1,000 coins × 50 features × 365 days = 18.25 million data points per year. No human team can process this. The system must be fully automated, running without intervention, and producing predictions before markets open each day.',
        },
        {
          type: 'stats',
          cols: 4,
          items: [
            {
              label: 'Coins Tracked',
              value: '1,000',
              sub: 'ranked daily',
              tone: 'gold',
            },
            {
              label: 'News Sources',
              value: '44',
              sub: 'CoinDesk, CryptoCompare, etc.',
              tone: 'blue',
            },
            {
              label: 'Categories',
              value: '182+',
              sub: 'topic classifications',
              tone: 'purple',
            },
            {
              label: 'Throughput',
              value: '500+',
              sub: 'articles per hour',
              tone: 'green',
            },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 02  DATA ARCHITECTURE
    // ─────────────────────────────────────────────────────────────
    {
      number: '02',
      eyebrow: 'Chapter 2',
      title: 'Data Architecture: Three Databases',
      blocks: [
        {
          type: 'prose',
          body: 'The system spans three PostgreSQL databases on the same server, each serving a distinct purpose. This separation was not just organizational — it was the key architectural insight that unlocked model performance.',
        },
        {
          type: 'prose',
          heading: 'Database Roles',
          body: 'PRODUCTION — dbcp: Today\'s signals, news sentiment, Fear & Greed index, and the model\'s latest predictions. Trading bots read from here. Only holds recent snapshots — the live dashboard.\n\nHISTORICAL — cp_backtest: Years of daily FE tables — millions of rows. The training ground. All 10 feature engineering tables live here with full history for backtesting and model training.\n\nHOURLY — cp_backtest_h: Hourly OHLCV for 250 coins with 30-day rolling windows. Powers the BTC residual decomposition and hourly neural network models that need fine-grained price data.',
        },
        {
          type: 'stats',
          cols: 4,
          items: [
            {
              label: 'Articles Stored',
              value: '66K+',
              sub: 'since Oct 2025',
              tone: 'gold',
            },
            {
              label: 'Historical Rows',
              value: 'Millions',
              sub: 'across 10 FE tables',
              tone: 'blue',
            },
            {
              label: 'Hourly Coins',
              value: '250',
              sub: '30-day windows',
              tone: 'purple',
            },
            {
              label: 'Features Per Coin',
              value: '50',
              sub: 'signals per day',
              tone: 'green',
            },
          ],
        },
        {
          type: 'callout',
          title: 'Why Three Databases?',
          body: 'The live database (dbcp) only has snapshots — it knows what happened today, not what happened two years ago. The model needs history to learn, so it reads from cp_backtest during training. When we discovered the model was only reading from dbcp (the "blind training" bug), all the historical features were empty. Connecting it to cp_backtest was the single biggest improvement in the entire project.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 03  FEATURE ENGINEERING
    // ─────────────────────────────────────────────────────────────
    {
      number: '03',
      eyebrow: 'Chapter 3',
      title: 'Feature Engineering: 10 FE Tables',
      blocks: [
        {
          type: 'prose',
          body: 'Feature Engineering is the process of turning raw data into useful signals the model can learn from. Each FE table holds a different family of signals. Together they give the model a 360-degree view of every coin.',
        },
        {
          type: 'table',
          headers: [
            { label: 'Table', align: 'left' },
            { label: 'What It Measures', align: 'left' },
            { label: 'Plain English', align: 'left' },
          ],
          rows: [
            [
              { value: 'FE_PCT_CHANGE', bold: true },
              { value: 'Daily returns, cumulative return, volatility, risk' },
              { value: 'How much did this coin move today? How risky is it?' },
            ],
            [
              { value: 'FE_MOMENTUM_SIGNALS', bold: true },
              { value: 'Rate of change, Williams %R, CMO, SMI' },
              { value: 'Is this coin on a hot streak, or losing steam?' },
            ],
            [
              { value: 'FE_OSCILLATORS_SIGNALS', bold: true },
              { value: 'MACD, CCI, ADX, Ultimate Oscillator, Trix' },
              { value: 'Is the coin overbought or oversold? Reversal coming?' },
            ],
            [
              { value: 'FE_TVV_SIGNALS', bold: true },
              { value: 'On-Balance Volume, SMA/EMA crossovers, CMF' },
              { value: 'Is money flowing into or out of this coin?' },
            ],
            [
              { value: 'FE_RATIOS_SIGNALS', bold: true },
              { value: 'Alpha, Beta, Sharpe, Sortino, Win Rate' },
              { value: 'Good returns for the risk you take?' },
            ],
            [
              { value: 'FE_FEAR_GREED_CMC', bold: true },
              { value: 'CoinMarketCap Fear & Greed Index' },
              { value: 'Is the market feeling greedy or scared today?' },
            ],
            [
              { value: 'FE_NEWS_SIGNALS', bold: true },
              { value: 'Sentiment scores, article volume, event flags' },
              { value: 'What is the news saying? Is coverage spiking?' },
            ],
            [
              { value: 'FE_BTC_RESIDUALS', bold: true },
              { value: 'Beta, alpha, residual after stripping BTC' },
              { value: "How much of this coin's move was just following BTC?" },
            ],
            [
              { value: 'FE_RESIDUAL_FEATURES', bold: true },
              { value: 'Momentum, z-score, vol regime, autocorrelation' },
              { value: "After removing BTC, is the coin's own move trending?" },
            ],
            [
              { value: 'FE_CROSS_COIN', bold: true },
              { value: 'Percentile ranks, market breadth, dispersion, HHI' },
              { value: 'How is this coin doing vs. every other coin today?' },
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'blue',
          title: 'The Key Insight',
          body: "No single table is very predictive on its own. The model's power comes from combining all of them — 50 signals per coin per day. A coin might look great on momentum but terrible on risk-adjusted ratios. The model weighs all trade-offs simultaneously across 1,000 coins every day.",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 04  THE JOURNEY
    // ─────────────────────────────────────────────────────────────
    {
      number: '04',
      eyebrow: 'Chapter 4',
      title: 'The Journey: Four Phases',
      blocks: [
        {
          type: 'prose',
          body: 'The project started as a simple news collector and evolved into a full prediction engine over seven months. Here is the story told in four phases.',
        },
        {
          type: 'prose',
          heading: 'Phase 1 — Collecting the News (Sep 2025)',
          body: 'Built a program connecting to CoinDesk and CryptoCompare that downloads every article published. Runs every hour on GitHub Actions, storing title, body, source, and category in PostgreSQL. By February 2026: 66,000+ articles from 44 sources across 182 categories.',
        },
        {
          type: 'prose',
          heading: 'Phase 2 — Teaching It to Read (Feb 2026)',
          body: 'Added FinBERT — a language model trained on financial text. It reads each article and scores it as positive, negative, or neutral. Scores are grouped by coin and averaged into daily "news signals": Is the news about Bitcoin bullish today? Is article volume spiking for Ethereum? Are there regulatory stories about Solana?',
        },
        {
          type: 'prose',
          heading: 'Phase 3 — The Big Fix: Dual-DB Bug (Apr 8)',
          body: 'Discovered the model had been "blind" — a database wiring bug meant it could only see 1 out of 54 available signals during training. The fix: connected training pipeline to cp_backtest (years of history) while keeping real-time news on dbcp. This dual-database approach unlocked all 34 price features overnight. IC jumped from -0.007 to +0.081.',
        },
        {
          type: 'prose',
          heading: 'Phase 4 — Making It Smarter (Apr 9–11)',
          body: 'Added BTC residual decomposition (stripping Bitcoin\'s influence), cross-coin percentile ranks, market breadth and dispersion metrics. Went from 34 features to 50. Model hit IC +0.129 and Sharpe 7.69 — exceeding our 0.10 IC target.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 05  BTC RESIDUAL DECOMPOSITION
    // ─────────────────────────────────────────────────────────────
    {
      number: '05',
      eyebrow: 'Chapter 5',
      title: 'Key Innovation: BTC Residual Decomposition',
      blocks: [
        {
          type: 'prose',
          body: "In crypto, when Bitcoin goes up 5%, most altcoins go up too. If you are trying to predict which coins will outperform, you first need to strip out this \"following Bitcoin\" effect. Otherwise the model just learns \"buy everything when BTC is up\" — which is not useful.",
        },
        {
          type: 'flow',
          title: 'Decomposition Pipeline',
          rows: [
            [
              { label: 'Hourly OHLCV', tone: 'navy' },
              { label: '30-Day Rolling Regression', tone: 'blue' },
              { label: 'Beta + Alpha', tone: 'gold' },
              { label: 'Residual (Independent Alpha)', tone: 'green' },
            ],
          ],
        },
        {
          type: 'prose',
          heading: 'How It Works',
          body: "For each coin, we run a 30-day rolling regression against Bitcoin's returns. This gives us a beta (how much the coin follows BTC) and a residual (whatever is left — the coin's own independent movement).",
        },
        {
          type: 'callout',
          title: 'Example',
          body: "Ethereum went up 8% and Bitcoin went up 5%. If ETH's beta is 1.2, we'd expect a 6% move (1.2 × 5%) just from following BTC. The residual is the extra 2% — that's Ethereum's own alpha. Our model predicts these residuals, not raw price moves.",
        },
        {
          type: 'prose',
          heading: '8 Second-Order Features From Residuals',
          body: 'The FE_RESIDUAL_FEATURES table then extracts patterns from these stripped returns: residual momentum, z-score (mean reversion signal), volatility regime, autocorrelation, cumulative residual drift, residual acceleration, vol-of-vol, and trend strength. These become 8 additional features that capture the coin\'s independent behavior after removing the Bitcoin tide.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 06  RESULTS
    // ─────────────────────────────────────────────────────────────
    {
      number: '06',
      eyebrow: 'Chapter 6',
      title: 'Results: Model Performance',
      blocks: [
        {
          type: 'prose',
          body: 'We measure prediction quality with IC (Information Coefficient) — how well the model\'s rankings correlate with actual outcomes (0 = random, 0.05 = useful in tradfi, 0.10+ = strong for daily crypto) — and Sharpe Ratio (risk-adjusted return; above 2 is very good, above 5 is exceptional).',
        },
        {
          type: 'table',
          headers: [
            { label: 'Model Version', align: 'left' },
            { label: 'When', align: 'left' },
            { label: 'Features', align: 'right' },
            { label: 'IC-3d', align: 'right' },
            { label: 'Sharpe', align: 'right' },
            { label: 'Assessment', align: 'left' },
          ],
          rows: [
            [
              { value: 'Original (broken)' },
              { value: 'pre-Apr 8', mono: true },
              { value: '1', mono: true },
              { value: '-0.007', mono: true, tone: 'red' },
              { value: '-2.16', mono: true, tone: 'red' },
              { value: 'Worse than random — the "blind" bug' },
            ],
            [
              { value: 'After dual-DB fix' },
              { value: 'Apr 8', mono: true },
              { value: '34', mono: true },
              { value: '+0.081', mono: true, tone: 'green' },
              { value: '+6.18', mono: true, tone: 'green' },
              { value: 'Working! First real signal' },
            ],
            [
              { value: '+ Ensemble (6 models)' },
              { value: 'Apr 9', mono: true },
              { value: '53', mono: true },
              { value: '+0.086', mono: true, tone: 'green' },
              { value: '—', mono: true },
              { value: 'Slight gain, many features cold-starting' },
            ],
            [
              { value: '+ Residual + Cross-coin', bold: true },
              { value: 'Apr 11', mono: true },
              { value: '50', mono: true, bold: true },
              { value: '+0.129', mono: true, tone: 'green' },
              { value: '+7.69', mono: true, tone: 'green' },
              { value: 'Target hit. Stable generalization.', bold: true },
            ],
          ],
        },
        {
          type: 'stats',
          cols: 4,
          items: [
            {
              label: 'Prediction IC',
              value: '0.129',
              sub: 'Target was 0.10',
              tone: 'green',
            },
            {
              label: 'Sharpe Ratio',
              value: '7.69',
              sub: 'risk-adjusted return',
              tone: 'blue',
            },
            {
              label: 'Accuracy',
              value: '60.7%',
              sub: 'on unseen data',
              tone: 'gold',
            },
            {
              label: 'Max Drawdown',
              value: '-3.0%',
              sub: 'worst loss in test period',
              tone: 'red',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'green',
          title: 'What This Means',
          body: 'If you ranked 1,000 coins every day using this model and bought the top-ranked ones while shorting the bottom-ranked ones, you would have earned positive risk-adjusted returns on unseen data with a maximum dip of only 3%. The signal is real, stable across different time windows, and above the target we set.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 07  AUTOMATION
    // ─────────────────────────────────────────────────────────────
    {
      number: '07',
      eyebrow: 'Chapter 7',
      title: 'Pipeline Automation',
      blocks: [
        {
          type: 'prose',
          body: 'The entire system runs on autopilot via GitHub Actions — cloud servers that execute code on a schedule. Ten workflows, zero manual intervention.',
        },
        {
          type: 'table',
          headers: [
            { label: 'Schedule', align: 'left' },
            { label: 'Workflow', align: 'left' },
            { label: 'What It Does', align: 'left' },
          ],
          rows: [
            [
              { value: 'Every hour', mono: true, bold: true },
              { value: 'News Fetch' },
              { value: 'Downloads 30–60 new articles from CryptoCompare, stores in database' },
            ],
            [
              { value: '00:00 UTC', mono: true, bold: true },
              { value: 'FE Tables Update' },
              { value: "Refreshes all 10 FE_* tables with today's prices and indicators" },
            ],
            [
              { value: '00:30 UTC', mono: true, bold: true },
              { value: 'NLP Pipeline' },
              { value: "FinBERT reads today's articles, scores sentiment, creates FE_NEWS_SIGNALS" },
            ],
            [
              { value: '01:00 UTC', mono: true, bold: true },
              { value: 'ML Signals (daily)' },
              { value: 'Refreshes features, runs model, ranks all 1,000 coins → ML_SIGNALS' },
            ],
            [
              { value: 'Every 4 hours', mono: true, bold: true },
              { value: 'Ensemble (6 models)' },
              { value: '6-component model generates granular signals → ML_SIGNALS_V2' },
            ],
            [
              { value: 'Sundays 02:00', mono: true, bold: true },
              { value: 'Weekly Retrain' },
              { value: 'Regenerates labels, refreshes views, retrains model with latest data' },
            ],
          ],
        },
        {
          type: 'flow',
          title: 'Daily Pipeline Flow',
          rows: [
            [
              { label: 'News Fetch (hourly)', tone: 'navy' },
              { label: 'FinBERT NLP', tone: 'blue' },
              { label: 'FE Tables', tone: 'gold' },
              { label: 'LightGBM', tone: 'purple' },
              { label: 'ML_SIGNALS', tone: 'green' },
            ],
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 08  KEY LESSONS
    // ─────────────────────────────────────────────────────────────
    {
      number: '08',
      eyebrow: 'Chapter 8',
      title: 'Key Lessons',
      blocks: [
        {
          type: 'prose',
          heading: 'Lesson 1 — Data Plumbing > Model Complexity',
          body: 'The single biggest improvement came from fixing a database routing bug — not from using fancier AI. A simple model with good data beats a complex model with broken data every time. IC jumped from -0.007 to +0.081 overnight.',
        },
        {
          type: 'prose',
          heading: 'Lesson 2 — Context Is Everything',
          body: 'A coin going up 5% tells you nothing until you know what the rest of the market did. Cross-coin features (ranks, breadth, dispersion) turned an unstable model into a generalizing one. Collapsed the gap between validation and test performance.',
        },
        {
          type: 'prose',
          heading: 'Lesson 3 — Strip the Market, Find the Alpha',
          body: 'Most crypto movement is just "following Bitcoin." By removing that with BTC residual decomposition, we let the model focus on each coin\'s unique story — which is where the actual prediction signal lives.',
        },
        {
          type: 'prose',
          heading: 'Lesson 4 — Automate Everything',
          body: 'Ten GitHub Actions workflows run the entire pipeline without human intervention. News fetching, sentiment scoring, feature generation, model retraining, and daily predictions all happen automatically, every day, on schedule.',
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // 09  TECH STACK
    // ─────────────────────────────────────────────────────────────
    {
      number: '09',
      eyebrow: 'Chapter 9',
      title: 'Tech Stack',
      blocks: [
        {
          type: 'tags',
          items: [
            { label: 'Python', tone: 'navy' },
            { label: 'FinBERT (NLP)', tone: 'purple' },
            { label: 'LightGBM', tone: 'green' },
            { label: 'PostgreSQL (3 DBs)', tone: 'blue' },
            { label: 'GitHub Actions', tone: 'gold' },
            { label: 'CoinDesk API', tone: 'cyan' },
            { label: 'CryptoCompare API' },
            { label: 'pandas' },
            { label: 'scikit-learn' },
            { label: 'psycopg2' },
            { label: 'statsmodels' },
            { label: 'NumPy' },
          ],
        },
        {
          type: 'prose',
          heading: 'Data Layer — 3 PostgreSQL Databases',
          body: 'dbcp (production), cp_backtest (historical), cp_backtest_h (hourly). Dual-DB architecture separates inference from training.',
        },
        {
          type: 'prose',
          heading: 'ML Layer — LightGBM + Ensemble',
          body: 'Gradient boosting for daily signals. 6-model ensemble (LightGBM, XGBoost, Ridge, LSTM, TCN, market regime) for hourly predictions.',
        },
        {
          type: 'prose',
          heading: 'NLP Layer — FinBERT Sentiment',
          body: 'Financial domain-specific BERT model. Scores each article as positive/negative/neutral. Aggregated by coin into daily news signals.',
        },
      ],
    },
  ],
};
