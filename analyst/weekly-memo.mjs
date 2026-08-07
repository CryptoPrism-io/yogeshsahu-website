#!/usr/bin/env node
/**
 * Weekly Product Memo generator — one memo per site, paste-ready.
 *
 * Usage:
 *   node analyst/weekly-memo.mjs --site yogeshsahu.xyz
 *   node analyst/weekly-memo.mjs --site frienddomain.com --out analyst/memos/frienddomain-2026-08-07.md
 *
 * Output goes to stdout (paste to WhatsApp) and to analyst/memos/<domain>-<date>.md
 * (gitignored — never commit raw analytics or friend data).
 *
 * Env: PLAUSIBLE_API_KEY, OPENROUTER_API_KEY, OPENROUTER_MODELS (optional)
 */

import { parseArgs } from "node:util";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { collectAll, comparePeriods } from "./stats.mjs";
import { SYSTEM_PROMPT, MEMO_PROMPT } from "./prompts.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const { values } = parseArgs({
  options: {
    site: { type: "string", required: true },
    days: { type: "string", default: "7" },
    out: { type: "string" },
  },
});

const DAYS = parseInt(values.days, 10);
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const FREE_MODELS = ["openrouter/free", "openrouter/auto", "openrouter/auto-beta"];
const MODELS = (process.env.OPENROUTER_MODELS ?? FREE_MODELS.join(","))
  .split(",")
  .map((m) => m.trim())
  .filter(Boolean);

if (!OPENROUTER_KEY) {
  console.error("Missing OPENROUTER_API_KEY");
  process.exit(1);
}

function isoDaysAgo(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

async function llmMemo(facts, model) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_KEY}`,
      "HTTP-Referer": "https://yogeshsahu.xyz",
      "X-Title": "product-analyst",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1200,
      temperature: 0.4,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: MEMO_PROMPT(facts) },
      ],
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter ${res.status}: ${err.slice(0, 200)}`);
  }
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content ?? "";
  if (!text || text.trim().length < 80 || /^User Safety/i.test(text.trim())) {
    throw new Error(`Degenerate content from ${model}: ${JSON.stringify(text?.slice(0, 60))}`);
  }
  return text.replace(/^```[a-z]*\n?|```$/g, "").trim();
}

const period = `${DAYS}d`;
const prevRange = [isoDaysAgo(DAYS * 2), isoDaysAgo(DAYS)];
console.log(`\nBuilding weekly memo for ${values.site} (${period}, vs ${prevRange.join("..")})...\n`);

const current = await collectAll(values.site, period);
const comparison = (await comparePeriods(values.site, period, prevRange)).deltas;
const facts = { site: values.site, current, previous_period: prevRange.join(".."), comparison };

let memo;
let lastError;
for (const model of MODELS) {
  try {
    memo = await llmMemo(facts, model);
    break;
  } catch (e) {
    lastError = e;
    console.warn(`Model ${model} failed: ${e.message}`);
  }
}
if (!memo) {
  console.error(lastError ?? new Error("No models available"));
  process.exit(1);
}

const dateStr = isoDaysAgo(0);
const defaultOut = resolve(__dirname, `memos/${values.site}-${dateStr}.md`);
const outPath = resolve(values.out ?? defaultOut);

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, memo + "\n");
console.log(memo);
console.log(`\nSaved to ${outPath}`);
