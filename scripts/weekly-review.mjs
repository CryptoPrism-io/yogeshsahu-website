#!/usr/bin/env node
/**
 * Weekly Review Generator
 *
 * Pulls the last 7 days of activity from the CryptoPrism-io GitHub account,
 * sends it to OpenRouter (cheap model) to compose a "Week in Review" post,
 * and appends it to src/data/weekly-reviews.ts.
 *
 * Runs weekly from .github/workflows/weekly-review.yml (Friday 8am IST).
 *
 * Env:
 *   GH_TOKEN              — GitHub token (secrets.GITHUB_TOKEN works)
 *   OPENROUTER_API_KEY    — OpenRouter API key
 *   OPENROUTER_MODELS     — comma-separated free model ids to rotate (default below)
 *   THEMES_URL            — Pratyaksha weekly-themes Lambda URL (optional)
 *   THEMES_KEY            — shared key for THEMES_URL (required if URL set)
 *   SITE_OWNER            — default "CryptoPrism-io"
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REVIEWS_PATH = resolve(__dirname, "../src/data/weekly-reviews.ts");
const OWNER = process.env.SITE_OWNER ?? "CryptoPrism-io";
const GH_TOKEN = process.env.GH_TOKEN;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const THEMES_URL = process.env.THEMES_URL;
const THEMES_KEY = process.env.THEMES_KEY;
const FREE_MODELS = ["openrouter/free", "openrouter/auto", "openrouter/auto-beta"];
const MODELS = (process.env.OPENROUTER_MODELS ?? FREE_MODELS.join(","))
  .split(",")
  .map((m) => m.trim())
  .filter(Boolean);

function isoWeekOfYear(d = new Date()) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
}

// Rotate the model each week so usage is spread across the free tier.
const MODEL = MODELS[(isoWeekOfYear() - 1) % MODELS.length];

if (!GH_TOKEN || !OPENROUTER_KEY) {
  console.error("Missing GH_TOKEN or OPENROUTER_API_KEY");
  process.exit(1);
}

const GH = "https://api.github.com";
const headers = { Authorization: `token ${GH_TOKEN}`, Accept: "application/vnd.github+json" };

function weekAgoISO() {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  return d.toISOString();
}

async function ghJson(path) {
  const res = await fetch(`${GH}${path}`, { headers });
  if (!res.ok) throw new Error(`GitHub ${path}: ${res.status}`);
  return res.json();
}

async function collectRepos() {
  const repos = await ghJson(`/users/${OWNER}/repos?per_page=100&sort=updated`);
  return repos
    .filter((r) => !r.archived)
    .map((r) => ({ name: r.name, defaultBranch: r.default_branch }));
}

async function collectWeekActivity() {
  const since = weekAgoISO();
  const repos = await collectRepos();
  const activity = [];

  for (const repo of repos) {
    try {
      const [commits, pulls] = await Promise.all([
        ghJson(`/repos/${OWNER}/${repo.name}/commits?since=${since}&per_page=50`),
        ghJson(`/repos/${OWNER}/${repo.name}/pulls?state=all&sort=updated&direction=desc&per_page=10`),
      ]);

      const weekPulls = pulls.filter((p) => new Date(p.updated_at) >= new Date(since));
      const mergedPulls = weekPulls.filter((p) => p.merged_at);

      if (commits.length || weekPulls.length) {
        activity.push({
          repo: repo.name,
          commits: commits.length,
          commitMessages: commits.slice(0, 10).map((c) => c.commit.message.split("\n")[0]),
          pullsOpen: weekPulls.filter((p) => !p.merged_at && p.state === "open").length,
          pullsMerged: mergedPulls.map((p) => p.title),
        });
      }
    } catch (e) {
      console.warn(`Skipping ${repo.name}: ${e.message}`);
    }
  }
  return activity;
}

async function collectThemes() {
  if (!THEMES_URL) {
    console.log("THEMES_URL not set — skipping journal themes");
    return null;
  }
  if (!THEMES_KEY) {
    console.warn("THEMES_URL set but THEMES_KEY missing — skipping journal themes");
    return null;
  }
  try {
    const since = weekAgoISO();
    const res = await fetch(`${THEMES_URL}?since=${encodeURIComponent(since)}&days=7`, {
      headers: { "x-themes-key": THEMES_KEY },
    });
    if (!res.ok) {
      console.warn(`Themes endpoint ${res.status} — skipping journal themes`);
      return null;
    }
    const data = await res.json();
    if (!data?.ok) {
      console.warn("Themes endpoint returned ok:false — skipping journal themes");
      return null;
    }
    // Empty window is real data (founder may not have journaled this week).
    if (!data.themes || data.themes.length === 0) {
      console.log("No journal themes this week — continuing without them");
      return null;
    }
    return { themes: data.themes, mood: data.mood, entryCount: data.entryCount };
  } catch (e) {
    console.warn(`Themes fetch failed: ${e.message} — skipping journal themes`);
    return null;
  }
}

async function composePost(activity, themes, model) {
  const today = new Date();
  const weekNum = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (7 * 24 * 3600 * 1000));
  const dateStr = today.toISOString().slice(0, 10);
  const iso = today.toISOString().split("T")[0];

  const themesSection = themes
    ? `\nAlso here is the anonymized journal summary from the founder's reflection app for the same week (themes + mood only, no private text):\n\n${JSON.stringify(themes, null, 2)}\n\nIf provided, weave a brief "Reflection" line into the post using the mood/themes. Never invent journal content if absent.`
    : "";

  const prompt = `You are writing a "Week in Review" post for a founder's portfolio site (yogeshsahu.xyz). The voice is candid, technical, and direct — short paragraphs, no hype, first person. This is a public post on a personal site, so keep it professional but human.

Here is the raw GitHub activity from the last 7 days across the ${OWNER} repos:

${JSON.stringify(activity, null, 2)}
${themesSection}

Write the post body in plain text with \\n\\n paragraph breaks. Structure it like:
1. One-paragraph opening: what the week was about in aggregate.
2. "Shipped" — the merged PRs / notable commits, grouped by repo.
3. "In progress" — open work.
4. One-line closing about next week.
${themes ? "5. Optionally a one-line \"Reflection\" using the journal mood/themes above." : ""}

Then output a JSON object with these fields (NO markdown, raw JSON only):
{
  "slug": "week-${String(weekNum).padStart(2, "0")}-review",
  "title": "Week ${weekNum} — <short human summary>",
  "date": "${iso}",
  "tags": ["Review"],
  "excerpt": "<one sentence>",
  "readTime": <number>,
  "body": "<the full body text with \\n\\n>"
}`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_KEY}`,
      "HTTP-Referer": "https://yogeshsahu.xyz",
      "X-Title": "weekly-review-bot",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1200,
      temperature: 0.7,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter API ${res.status}: ${err}`);
  }
  const data = await res.json();
  if (data.error) {
    throw new Error(`OpenRouter error (${model}): ${data.error.message ?? JSON.stringify(data.error)}`);
  }
  const text = data.choices?.[0]?.message?.content ?? "";
  if (!text) {
    throw new Error(`OpenRouter returned empty content for model ${model}`);
  }

  const parseJson = (s) => {
    try {
      return JSON.parse(s);
    } catch (e) {
      throw new Error(
        `Failed to parse model JSON (${model}): ${e.message}. Response: ${text.slice(0, 200)}`
      );
    }
  };

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end > start) return parseJson(text.slice(start, end + 1));
  return parseJson(text);
}

function appendToFile(post) {
  let content = readFileSync(REVIEWS_PATH, "utf8");
  // Insert the new entry just before the closing ]; of WEEKLY_REVIEWS
  const idx = content.lastIndexOf("];");
  const entry = `  {\n    slug: "${post.slug}",\n    title: "${post.title.replace(/"/g, '\\"')}",\n    date: "${post.date}",\n    tags: ${JSON.stringify(post.tags)},\n    excerpt: "${post.excerpt.replace(/"/g, '\\"')}",\n    readTime: ${post.readTime},\n    body: \`${post.body.replace(/`/g, "\\`")}\`,\n  },\n`;
  content = content.slice(0, idx) + entry + content.slice(idx);
  writeFileSync(REVIEWS_PATH, content);
  console.log(`Appended ${post.slug}`);
}

async function main() {
  console.log("Collecting activity for", OWNER);
  const activity = await collectWeekActivity();
  console.log(`Found ${activity.length} repos with activity`);
  const themes = await collectThemes();

  const startIdx = MODELS.indexOf(MODEL);
  const ordered = [...MODELS.slice(startIdx), ...MODELS.slice(0, startIdx)];
  let lastError;
  for (const model of ordered) {
    try {
      const post = await composePost(activity, themes, model);
      appendToFile(post);
      console.log("Done.");
      return;
    } catch (e) {
      lastError = e;
      console.warn(`Model ${model} failed: ${e.message}`);
    }
  }
  throw lastError ?? new Error("No models available to compose the post");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
