# Concierge Product Analyst — Validation Log

This file is the product spec. The code is disposable; this dataset is not.
Raw analytics and friend data NEVER go in this repo (memos live in analyst/memos/, gitignored).

## Success metric (locked)

> **At least 2 of 3 founders independently return with another question AND act on at least one recommendation within 3 weeks.**

If broadly yes → productize (MCP, portal, provisioning, billing).
If no → change the prompt first, never the infra.

## Per-question log (record EVERY question, every session)

```
QUESTION
What did they ask?

ANSWER QUALITY
Useful / obvious / wrong

FOLLOW-UP
Did they ask another question without prompting?

ACTION
What did they actually change?

RESULT
Did the metric subsequently move?
```

Repeated questions after 3 weeks = the eventual product's tool list. Capture verbatim where possible.

## Self-validation — yogeshsahu.xyz (2026-08-07)

Raw Q&A in `analyst/qa-runs/2026-08-07-self-validation.md` (round 1) and `-rerun.md` (round 2).
Test: the 10-question suite, 30d period (2 visitors / 4 pageviews / 50% bounce — thin but real).

**Round 1 (baseline):** Q1 returned garbage ("User Safety: safe") — no answer. Q4/Q6/Q7
truncated at max_tokens 800 mid-sentence — no action step. "Single action" failed 4/10 (≥3).

**One adjustment made** (then re-ran the SAME 10 questions, no per-question tweaks):
- System prompt: "Always end your answer with a final line: ACTION: <the single highest-value action>"
- max_tokens 800 → 1200 (headroom so the final ACTION line lands)

**Round 2 (rerun):**

| Q | Numbers | Facts/Hyp | No causality | Honest | Action | Verdict |
|---|---------|-----------|--------------|--------|--------|---------|
| 1 | ✅ | ✅ | ✅ | ✅ | ✅ | PASS (recommended GA4 — contextually wrong, we run Plausible; noted) |
| 2 | ❌ | ❌ | ❌ | ❌ | ❌ | FAIL — "User Safety: safe" garbage from openrouter/free |
| 3 | ✅ | ✅ | ✅ | ✅ | ✅ | PASS ("n=2 is not a sample, it's anecdote") |
| 4 | ✅ | ✅ | ✅ | ✅ | ✅ | PASS |
| 5 | ✅ | ✅ | ✅ | ✅ | ✅ | PASS |
| 6 | ✅ | ✅ | ✅ | ✅ | ✅ | PASS |
| 7 | ✅ | ✅ | ✅ | ✅ | ✅ | PASS |
| 8 | ✅ | ✅ | ✅ | ✅ | ✅ | PASS |
| 9 | ✅ | ✅ | ✅ | ✅ | ✅ | PASS (excellent) |
| 10 | ✅ | ✅ | ✅ | ✅ | ✅ | PASS (experiment + success metric; truncated only on closing line) |

**Gate result:** "single action" fails 1/10 (< 3) → NO further prompt changes.
**Guard added (code, not prompt):** answers < 80 chars or starting "User Safety" are
treated as degenerate → model rotation retries. Protects founder sessions.

**Decision:** analyst is good enough to show friends. Self-testing STOPPED.
Known caveats at this data volume: models over-hedge on tiny samples (correct behavior),
and free-tier occasionally emits a safety-annotation stub (rotation handles it).

---

## Per-founder log

### Founder A
Product: <domain / what it is>
Status: <onboarded / baseline / observing / acted>
Entry: <date> — <question or note>

### Founder B
Product:
Status:
Entry:

### Founder C (if used)
Product:
Status:
Entry:

## Week-3 exit review (per founder)

1. Did they voluntarily ask follow-up questions?
2. Did they implement a recommendation?
3. Did the subsequent data tell you whether that recommendation worked?
4. Would they be annoyed if you stopped sending the report?
