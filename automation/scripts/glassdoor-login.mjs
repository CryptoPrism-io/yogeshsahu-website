import { ROOT_DIR, loadSiteConfig } from "./lib/config.mjs";
import { launchPersistentBrowser } from "./lib/browser.mjs";
import { createRunLogger } from "./lib/logger.mjs";
import { waitForEnter } from "./lib/prompt.mjs";

const siteConfig = await loadSiteConfig("glassdoor");
const logger = await createRunLogger(siteConfig.site);
const session = await launchPersistentBrowser(ROOT_DIR, siteConfig);
const { context, page, authDir } = session;

try {
  await logger.event("session_started", {
    authDir,
    startUrl: siteConfig.startUrl,
    managedExternally: session.managedExternally ?? false,
    debugPort: session.debugPort ?? null,
    launchedNow: session.launchedNow ?? false
  });
  await page.goto(siteConfig.startUrl, { waitUntil: "domcontentloaded" });
  await logger.screenshot(page, "01-start");

  console.log(`Persistent auth dir: ${authDir}`);
  console.log(siteConfig.manualNavigationPrompt);

  await waitForEnter("Complete Glassdoor login or any CAPTCHA manually in the browser.");
  await logger.screenshot(page, "02-post-login");
  await logger.event("login_checkpoint_completed", { url: page.url() });
} finally {
  if (!session.managedExternally) {
    await context.close();
  }
}
