import path from "node:path";
import { automationPath } from "./config.mjs";
import { ensureDir, writeJson } from "./fs.mjs";

function stamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

export async function createRunLogger(siteName) {
  const runDir = automationPath("runs", new Date().toISOString().slice(0, 10), `${stamp()}-${siteName}`);
  await ensureDir(runDir);

  const events = [];

  return {
    runDir,
    async event(type, detail = {}) {
      events.push({
        at: new Date().toISOString(),
        type,
        detail
      });
      await writeJson(path.join(runDir, "events.json"), events);
    },
    async screenshot(page, name, options = {}) {
      const filePath = path.join(runDir, `${name}.png`);
      await page.screenshot({
        path: filePath,
        fullPage: false,
        animations: "disabled",
        timeout: 15000,
        ...options
      });
      return filePath;
    },
    async write(name, payload) {
      await writeJson(path.join(runDir, name), payload);
    }
  };
}
