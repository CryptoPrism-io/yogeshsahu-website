# Friend Onboarding — Concierge Analyst Experiment

Recruit exactly 2 friends (3 max). Prefer a mix: SaaS/product + marketplace/e-commerce/app.
Recruiting is manual (you); everything technical below is ready.

## What I need from you, per friend
- Product domain (must resolve) — I register it in Plausible BEFORE they paste anything
- Product type (SaaS / marketplace / app / content)
- Confirmation they're OK with analytics flowing to the self-hosted Plausible instance

## What each friend does (~2 minutes)
1. Paste this ONE script tag into their site's `<head>` (all pages):

```html
<script defer data-domain="THEIR-DOMAIN" data-outbound-links data-file-downloads
  src="https://plausible.yogeshsahu.xyz/js/script.outbound-links.js"></script>
```

2. (Recommended) Track their ONE conversion:
   - Signup/contact goes to an external URL (Calendly, Typeform, external auth) → nothing needed, outbound clicks auto-track.
   - Same-domain action → add to the button:
     ```html
     <button onclick="plausible('signup_click')">Sign up</button>
     ```
3. Tell me when it's live → verify HTTP 202 + data arriving.

## Registration (me — the only SSH use)
Per `.claude/skills/plausible-analytics/SKILL.md`: register site in DB → restart container → verify 202. Never before the friend is ready to paste.

## Baseline
~7 days of data before the first session. Friends get NO dashboard access — all interaction is through the analyst.

## The 30-minute session (verbatim script — give them nothing else)

> "Imagine this is your product analyst. Ask it whatever you genuinely want to know about your business."

- Record EVERY question verbatim into `validation.md` (QUESTION / ANSWER QUALITY / FOLLOW-UP / ACTION / RESULT)
- Do NOT show them the 10 self-test questions
- Run each question:
  ```bash
  node --env-file=analyst/.env analyst/ask.mjs --site THEIR-DOMAIN --period 7d --compare 30d "their question"
  ```
- If they sit silent, wait. Their first question IS the product spec.

## Weekly memo (2–3 weeks — manual WhatsApp, no automation)
- Day 7 after their snippet is live:
  ```bash
  node --env-file=analyst/.env analyst/weekly-memo.mjs --site THEIR-DOMAIN
  ```
- Paste the output to WhatsApp manually. Track per founder:
  `Question → Recommendation → Founder action → Metric afterward`

## Success gate (after 3 weeks)

> At least 2 of 3 founders independently return with another question AND act on ≥1 recommendation within 3 weeks.

Yes → productize (MCP, portal, provisioning, billing). No → change the prompt, not the infra.
