# Brand SVG Audit — Remaining Opportunities

Every plain-text brand/tech name that could be replaced with a theSVG CDN icon.
Priority: **High** (visible in primary windows) > **Medium** (work hub, case study cards) > **Low** (terminal help text, investor JSON, package.json)

---

## High Priority — ExperienceWindow Tech Tags

File: `src/components/windows/ExperienceWindow.tsx`
Each timeline entry has a `tags` array rendered as <span> badges. These are highly visible.

| Entry | Current Plain-Text Tags | Suggested SVG Slugs |
|---|---|---|
| Trinetry | `Python`, `TypeScript`, `React`, `PostgreSQL`, `Firebase`, `BigQuery`, `Cloud Run`, `FastAPI`, `LangChain`, `TimesFM`, `Binance` | `python`, `typescript`, `react`, `postgresql`, `firebase`, `google-cloud-bigquery`, `google-cloud-run`, `fastapi`, `langchain` (check if exists), `timesfm` (custom?), `binance` |
| CryptoPrism | `Python`, `React`, `PostgreSQL`, `BigQuery`, `Cloud Run`, `FastAPI`, `Binance`, `TimesFM`, `AI/Agents` | `python`, `react`, `postgresql`, `google-cloud-bigquery`, `google-cloud-run`, `fastapi`, `binance` |
| Times of India | `Python`, `BigQuery`, `AI/ML` | `python`, `google-cloud-bigquery` |
| Barclays | `Python`, `Bloomberg` | `python`, `bloomberg` |
| Isha Foundation | `Unity`, `Flutter` | `unity`, `flutter` |
| Ubisoft | `Unreal Engine` | `unreal-engine` |
| Strathclyde | `Bloomberg` | `bloomberg` |
| Gamerz Nation | (no tags shown) | — |

---

## High Priority — CapabilityGraphWindow Skills

File: `src/components/windows/CapabilityGraphWindow.tsx`
Skills rendered as chips in all 3 domain tabs.

| Domain | Plain-Text Skills | Suggested Slides |
|---|---|---|
| Finance | OANDA, Bloomberg APIs | `oanda`, `bloomberg` |
| Leadership | — | (no brand tech names) |
| Technology | Python, TypeScript, React, PostgreSQL, FastAPI, Cloud Run, Firebase | `python`, `typescript`, `react`, `postgresql`, `fastapi`, `google-cloud-run`, `firebase` |

---

## High Priority — Project Cards (CaseCard + ProjectsWindow)

File: `src/components/work/CaseCard.tsx` — 12 project cards on /work, each with tag chips.
File: `src/components/windows/ProjectsWindow.tsx` — 3 featured project cards.

Tags from `src/lib/projects.ts` — all visible as chips on cards:

| Project Slug | Plain-Text Tags | Suggested Slugs |
|---|---|---|
| `cryptoprism-onchain` | Python, BigQuery, Cloud Run | `python`, `google-cloud-bigquery`, `google-cloud-run` |
| `cryptoprism-api` | Python, FastAPI, Cloud Run, Redis, PostgreSQL | `python`, `fastapi`, `google-cloud-run`, `redis`, `postgresql` |
| `cryptoprism-news-fetcher` | Python, Binance | `python`, `binance` |
| `timesfm-trading-bot` | Python, TimesFM, Binance | `python`, `binance` |
| `fxsaarthi` | Python, OANDA | `python`, `oanda` |
| `pgg-erp` | Python, PostgreSQL, React | `python`, `postgresql`, `react` |
| `pgg-crm` | Python, PostgreSQL, React | `python`, `postgresql`, `react` |
| `trinetry-erp` | Python, React, PostgreSQL, AI/Agents | `python`, `react`, `postgresql` |
| `gyanmarg` | React, Firebase, TypeScript | `react`, `firebase`, `typescript` |
| `ai-bharatverse` | React, Python, TypeScript, LangChain | `react`, `python`, `typescript`, `langchain` |
| `pratyaksha` | React, Python, TypeScript, Firebase, LangChain | `react`, `python`, `typescript`, `firebase`, `langchain` |
| `kari` | Unity | `unity` |

---

## Medium Priority — Case Study Detail Pages

File: `src/data/case-studies/*.ts` — contains CalloutBlock, TagsBlock, and ProseBlock with inline brand mentions.

| File | Brand Mentions |
|---|---|
| `cryptoprism-onchain.ts` | Python, BigQuery, Cloud Run, Dataform, dbt |
| `cryptoprism-api.ts` | FastAPI, Cloud Run, Redis, PostgreSQL, Docker, GitHub Actions |
| `cryptoprism-news-fetcher.ts` | Python, Binance API, News API |
| `timesfm-trading-bot.ts` | Python, Binance API, TimesFM |
| `fxsaarthi.ts` | OANDA API |
| `pgg-erp.ts` | Python, PostgreSQL, React |
| `pgg-crm.ts` | Python, PostgreSQL, React |
| `trinetry-erp.ts` | Python, React, PostgreSQL, AI/Agents |
| `gyanmarg.ts` | React, Firebase, TypeScript |
| `ai-bharatverse.ts` | React, Python, TypeScript, LangChain |
| `pratyaksha.ts` | React, Python, TypeScript, Firebase, LangChain, Express |
| `kari.ts` | Unity |

---

## Medium Priority — AboutWindow Career Highlights

File: `src/components/windows/AboutWindow.tsx`

Currently brand SVGs for Barclays only. Could also add:
- **Times of India** — check theSVG for slug
- **Isha Foundation** — check theSVG for slug

---

## Low Priority — TerminalWindow Help Text

File: `src/components/windows/TerminalWindow.tsx`
Lines like `...Python, React, FastAPI, TimesFM, Binance, ...` in skill/help output.
Could style these with inline SVG badges if terminal is refactored to support HTML output.

---

## Low Priority — Database / Config Files

- `src/data/investors.json` — 161K lines with investor records mentioning Microsoft (6×), Barclays (3×) — not a UI concern
- `package.json` — Next.js, Tailwind, Framer Motion as dependency names — not rendered
- `src/data/proofs.ts` — OANDA, FastAPI, Cloud Run, BigQuery in text descriptions
- `src/data/capabilities.ts` — Python, PostgreSQL, React, FastAPI in skills arrays

---

## theSVG Slug Reference

From skill docs, common tech slugs to verify:
- `python` → /public/icons/python/default.svg
- `typescript` → /public/icons/typescript/default.svg
- `react` → /public/icons/react/default.svg
- `postgresql` → /public/icons/postgresql/default.svg
- `firebase` → /public/icons/firebase/default.svg
- `fastapi` → /public/icons/fastapi/default.svg
- `redis` → /public/icons/redis/default.svg
- `docker` → /public/icons/docker/default.svg
- `github` → /public/icons/github/default.svg
- `binance` → /public/icons/binance/default.svg
- `bloomberg` → /public/icons/bloomberg/default.svg
- `unity` → /public/icons/unity/default.svg
- `flutter` → /public/icons/flutter/default.svg
- `unreal-engine` → /public/icons/unreal-engine/default.svg
- `oanda` → /public/icons/oanda/default.svg
- `next-js` → /public/icons/next-js/default.svg
- `node-js` → /public/icons/node-js/default.svg
- `google-cloud-bigquery` → /public/icons/google-cloud-bigquery/default.svg
- `google-cloud-run` → /public/icons/google-cloud-run/default.svg
- `langchain` → need to verify

---

## Summary

- **~60+ total brand/tech text occurrences** across UI components
- **6 already SVG'd** (Google Cloud, AWS, Azure, Microsoft, Scrum Alliance, Barclays, Ubisoft)
- **~40+ viable SVG replacements** in high/medium priority UI
- **Best bang-for-buck**: ExperienceWindow tags → ~18 SVGs in one file
- **Second**: CaseCard tags on /work hub → ~12 SVGs across 12 cards
- **Third**: CapabilityGraphWindow chips → ~8 SVGs
- **Low effort**: AboutWindow career highlights → 2 more SVGs
