import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const CURRENT_FILE = fileURLToPath(import.meta.url);

export const ROOT_DIR = path.resolve(path.dirname(CURRENT_FILE), "..", "..", "..");

export async function readJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

export function automationPath(...segments) {
  return path.join(ROOT_DIR, "automation", ...segments);
}

export async function loadSiteConfig(siteName) {
  return readJson(automationPath("sites", `${siteName}.json`));
}

export async function loadProfile() {
  return readJson(automationPath("data", "profile.master.json"));
}

export function getByPath(object, sourcePath) {
  return sourcePath.split(".").reduce((value, segment) => {
    if (value == null) {
      return undefined;
    }

    if (/^\d+$/.test(segment)) {
      return value[Number(segment)];
    }

    return value[segment];
  }, object);
}
