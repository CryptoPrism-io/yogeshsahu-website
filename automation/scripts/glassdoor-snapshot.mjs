import { ROOT_DIR, loadSiteConfig } from "./lib/config.mjs";
import { launchPersistentBrowser } from "./lib/browser.mjs";
import { createRunLogger } from "./lib/logger.mjs";
import { waitForEnter } from "./lib/prompt.mjs";

const siteConfig = await loadSiteConfig("glassdoor");
const logger = await createRunLogger(siteConfig.site);
const session = await launchPersistentBrowser(ROOT_DIR, siteConfig);
const { context, page } = session;

try {
  await page.goto(siteConfig.startUrl, { waitUntil: "domcontentloaded" });
  console.log(siteConfig.manualNavigationPrompt);
  await waitForEnter("Navigate to the exact Glassdoor page you want to inspect.");

  const inventory = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll("input, textarea, select"));

    return elements.map((element, index) => {
      const label = element.labels?.[0]?.innerText?.trim() || "";
      const ariaLabel = element.getAttribute("aria-label") || "";
      const placeholder = element.getAttribute("placeholder") || "";
      const name = element.getAttribute("name") || "";
      const id = element.getAttribute("id") || "";
      const type = element.getAttribute("type") || element.tagName.toLowerCase();

      return {
        index,
        tag: element.tagName.toLowerCase(),
        type,
        label,
        ariaLabel,
        placeholder,
        name,
        id
      };
    });
  });

  await logger.event("snapshot_captured", { url: page.url(), fieldCount: inventory.length });
  await logger.write("form-fields.json", inventory);
  try {
    await logger.screenshot(page, "snapshot-page");
  } catch (error) {
    await logger.event("snapshot_screenshot_failed", {
      message: error instanceof Error ? error.message : String(error)
    });
  }
  console.log(`Saved ${inventory.length} fields to ${logger.runDir}`);
} finally {
  if (!session.managedExternally) {
    await context.close();
  }
}
