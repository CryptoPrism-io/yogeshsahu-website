import { chromium } from "playwright";
import { spawn } from "node:child_process";
import path from "node:path";
import http from "node:http";
import { ensureDir } from "./fs.mjs";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getChromeExecutable() {
  return path.join(process.env.PROGRAMFILES, "Google", "Chrome", "Application", "chrome.exe");
}

function quotePowerShell(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

function launchChromeProcess(args) {
  const chrome = getChromeExecutable();

  if (process.platform === "win32") {
    const psCommand = `Start-Process -FilePath ${quotePowerShell(chrome)} -ArgumentList @(${args
      .map((arg) => quotePowerShell(arg))
      .join(",")})`;

    spawn("powershell.exe", ["-NoProfile", "-Command", psCommand], {
      detached: true,
      stdio: "ignore"
    }).unref();

    return;
  }

  spawn(chrome, args, {
    detached: true,
    stdio: "ignore"
  }).unref();
}

async function isDebugEndpointReady(port) {
  return new Promise((resolve) => {
    const request = http.get(`http://127.0.0.1:${port}/json/version`, (response) => {
      resolve(response.statusCode === 200);
      response.resume();
    });

    request.on("error", () => resolve(false));
    request.setTimeout(1500, () => {
      request.destroy();
      resolve(false);
    });
  });
}

async function waitForDebugEndpoint(port, timeoutMs = 20000) {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    if (await isDebugEndpointReady(port)) {
      return true;
    }

    await sleep(500);
  }

  return false;
}

async function launchOrAttachSystemChrome(siteConfig) {
  const debugPort = Number(siteConfig.debugPort || 9222);
  const debugUrl = `http://127.0.0.1:${debugPort}`;
  const userDataDir = path.join(process.env.LOCALAPPDATA, "Google", "Chrome", "User Data");

  let launchedNow = false;

  if (!(await isDebugEndpointReady(debugPort))) {
    const args = [
      `--remote-debugging-port=${debugPort}`,
      `--user-data-dir=${userDataDir}`,
      `--profile-directory=${siteConfig.chromeProfileDirectory}`,
      "--no-first-run",
      "--start-maximized"
    ];

    launchChromeProcess(args);

    launchedNow = true;

    if (!(await waitForDebugEndpoint(debugPort, 30000))) {
      throw new Error(`Chrome debug endpoint did not come up on port ${debugPort}`);
    }
  }

  const browser = await chromium.connectOverCDP(debugUrl);
  const context = browser.contexts()[0] || await browser.newContext();
  const page = context.pages()[0] || await context.newPage();
  page.setDefaultTimeout(30000);
  page.setDefaultNavigationTimeout(45000);

  return {
    browser,
    context,
    page,
    authDir: userDataDir,
    managedExternally: true,
    debugPort,
    launchedNow
  };
}

export async function launchPersistentBrowser(rootDir, siteConfig) {
  if (siteConfig.useSystemChromeUserData) {
    return launchOrAttachSystemChrome(siteConfig);
  }

  const launchArgs = ["--start-maximized"];
  const authDir = path.join(rootDir, "automation", ".auth", siteConfig.site);
  await ensureDir(authDir);

  const context = await chromium.launchPersistentContext(authDir, {
    headless: false,
    channel: siteConfig.browserChannel || undefined,
    viewport: null,
    ignoreHTTPSErrors: true,
    args: launchArgs
  });

  const page = context.pages()[0] || await context.newPage();
  page.setDefaultTimeout(30000);
  page.setDefaultNavigationTimeout(45000);

  return { context, page, authDir, managedExternally: false };
}
