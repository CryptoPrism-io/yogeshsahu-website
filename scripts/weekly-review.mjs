#!/usr/bin/env node
/**
 * Weekly Review Generator
 *
 * Pulls the last 7 days of activity from the CryptoPrism-io GitHub account,
 * sends it to Claude to compose a "Week in Review" post, and appends it to
 * src/data/weekly-reviews.ts.
 *
 * Runs weekly from .github/workflows/weekly-review.yml (Friday 8am IST).
 *
 * Env:
 *   GH_TOKEN            — GitHub token (secrets.GITHUB_TOKEN works)
 *   ANTHROPIC_API_KEY   — Claude API key
 *   SITE_OWNER          — default "CryptoPrism-io"
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REVIEWS_PATH = resolve(__dirname, "../src/data/weekly-reviews.ts");
const OWNER = process.env.SITE_OWNER ?? "CryptoPrism-io";
const GH_TOKEN = process.env.GH_TOKEN;
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

if (!GH_TOKEN || !ANTHROPIC_KEY) {
  console.error("Missing GH_TOKEN or ANTHROPIC_API_KEY");
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

async function composePost(activity) {
  const today = new Date();
  const weekNum = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (7 * 24 * 3600 * 1000));
  const dateStr = today.toISOString().slice(0, 10);
  const iso = today.toISOString().split("T")[0];

  const prompt = `You are writing a "Week in Review" post for a founder's portfolio site (yogeshsahu.xyz). The voice is candid, technical, and direct — short paragraphs, no hype, first person. This is a public post on a personal site, so keep it professional but human.

Here is the raw GitHub activity from the last 7 days across the ${OWNER} repos:

${JSON.stringify(activity, null, 2)}

Write the post body in plain text with \\n\\n paragraph breaks. Structure it like:
1. One-paragraph opening: what the week was about in aggregate.
2. "Shipped" — the merged PRs / notable commits, grouped by repo.
3. "In progress" — open work.
4. One-line closing about next week.

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

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 1200,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API ${res.status}: ${err}`);
  }
  const data = await res.json();
  const text = data.content[0].text;
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  return JSON.parse(text.slice(start, end + 1));
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
  const post = await composePost(activity);
  appendToFile(post);
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
