import { ROOT_DIR, getByPath, loadProfile, loadSiteConfig } from "./lib/config.mjs";
import { launchPersistentBrowser } from "./lib/browser.mjs";
import { createRunLogger } from "./lib/logger.mjs";
import { waitForEnter } from "./lib/prompt.mjs";

async function findField(page, labels) {
  for (const label of labels) {
    const locator = page.getByLabel(label, { exact: false }).first();

    if (await locator.count()) {
      return { locator, label };
    }
  }

  return null;
}

async function fillLocator(locator, value) {
  await locator.click({ force: true });
  await locator.fill(String(value));
}

const siteConfig = await loadSiteConfig("glassdoor");
const profile = await loadProfile();
const logger = await createRunLogger(siteConfig.site);
const session = await launchPersistentBrowser(ROOT_DIR, siteConfig);
const { context, page } = session;

try {
  await page.goto(siteConfig.startUrl, { waitUntil: "domcontentloaded" });
  console.log(siteConfig.manualNavigationPrompt);
  await waitForEnter("Open the Glassdoor profile form you want to fill.");

  const results = [];

  for (const field of siteConfig.fields) {
    const value = getByPath(profile, field.source);

    if (!value) {
      results.push({
        field: field.id,
        status: "skipped_missing_value"
      });
      continue;
    }

    const match = await findField(page, field.labels);

    if (!match) {
      results.push({
        field: field.id,
        status: "not_found",
        labels: field.labels
      });
      continue;
    }

    await fillLocator(match.locator, value);
    results.push({
      field: field.id,
      status: "filled",
      matchedLabel: match.label
    });
  }

  await logger.event("profile_fill_attempted", { url: page.url(), results });
  await logger.write("profile-fill-results.json", results);
  await logger.screenshot(page, "profile-fill-review");

  console.log("Review the browser and save manually if the changes look correct.");
  await waitForEnter("Leave the page open for review.");
} finally {
  if (!session.managedExternally) {
    await context.close();
  }
}
