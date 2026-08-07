#!/usr/bin/env node
/**
 * Interactive product analyst — ask anything about a site's analytics.
 *
 * Usage:
 *   node analyst/ask.mjs --site yogeshsahu.xyz --period 7d "Why aren't people signing up?"
 *   node analyst/ask.mjs --site yogeshsahu.xyz --compare "30d" "What happened last week?"
 *
 * Env:
 *   PLAUSIBLE_API_KEY  — Stats API key (analyst/.env)
 *   OPENROUTER_API_KEY — OpenRouter key
 *   OPENROUTER_MODELS  — comma-separated model rotation (default: free tier)
 */

import { parseArgs } from "node:util";
import { collectAll, comparePeriods } from "./stats.mjs";
import { SYSTEM_PROMPT, ANSWER_PROMPT } from "./prompts.mjs";

const { values, positionals } = parseArgs({
  options: {
    site: { type: "string", required: true },
    period: { type: "string", default: "7d" },
    compare: { type: "string" },
  },
  allowPositionals: true,
});

const question = positionals.join(" ").trim() || "What is the state of my product right now?";

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

async function llmAnswer(facts, model) {
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
        { role: "user", content: ANSWER_PROMPT(facts, question) },
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
  return text;
}

console.log(`\nAnalyzing ${values.site} (${values.period}${values.compare ? ` vs ${values.compare}` : ""})`);
console.log(`Question: "${question}"\n`);

const facts = await collectAll(values.site, values.period);
if (values.compare) {
  facts.comparison = (await comparePeriods(values.site, values.period, values.compare)).deltas;
}

let lastError;
for (const model of MODELS) {
  try {
    const answer = await llmAnswer(facts, model);
    console.log(`\n${answer}\n`);
    process.exit(0);
  } catch (e) {
    lastError = e;
    console.warn(`Model ${model} failed: ${e.message}`);
  }
}
console.error(lastError ?? new Error("No models available"));
process.exit(1);
