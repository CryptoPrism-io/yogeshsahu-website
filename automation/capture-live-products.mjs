#!/usr/bin/env node
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, '../public/images/projects');

const CAPTURES = [
  {
    name: 'cryptoprism-landing',
    url: 'https://cryptoprism.io',
    waitFor: 3000,
  },
  {
    name: 'becoming-landing',
    url: 'https://ai-becoming.web.app',
    waitFor: 3000,
  },
  {
    name: 'polymind-landing',
    url: 'https://ai-polymind.web.app',
    waitFor: 3000,
  },
];

async function main() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 2 });

  for (const cap of CAPTURES) {
    try {
      console.log(`Capturing: ${cap.name} from ${cap.url}...`);
      await page.goto(cap.url, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise((r) => setTimeout(r, cap.waitFor));

      const outPath = path.join(OUTPUT_DIR, `${cap.name}.webp`);
      await page.screenshot({
        path: outPath,
        type: 'webp',
        quality: 90,
        clip: { x: 0, y: 0, width: 1400, height: 900 },
      });
      console.log(`  -> saved ${outPath}`);
    } catch (err) {
      console.error(`  !! Failed ${cap.name}: ${err.message}`);
    }
  }

  await browser.close();
  console.log('\nDone.');
}

main().catch(console.error);
