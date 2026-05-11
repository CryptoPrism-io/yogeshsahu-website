#!/usr/bin/env node
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPORTS_DIR = path.resolve(__dirname, '../public/reports');
const OUTPUT_DIR = path.resolve(__dirname, '../public/images/projects');

const CAPTURES = [
  {
    name: 'news-fetcher-ml-architecture',
    file: 'ml-signal-architecture.html',
    scrollTo: 0,
    clip: { x: 0, y: 0, width: 1400, height: 700 },
  },
  {
    name: 'news-fetcher-cover',
    file: 'ml-signal-architecture.html',
    scrollTo: 0,
    clip: { x: 0, y: 0, width: 1400, height: 500 },
  },
  {
    name: 'onchain-cover',
    file: 'onchain-architecture.html',
    scrollTo: 0,
    clip: { x: 0, y: 0, width: 1400, height: 500 },
  },
  {
    name: 'onchain-intelligence-layers',
    file: 'onchain-architecture.html',
    scrollTo: 800,
    clip: { x: 0, y: 0, width: 1400, height: 700 },
  },
  {
    name: 'timesfm-cover',
    file: 'timesfm-report.html',
    scrollTo: 0,
    clip: { x: 0, y: 0, width: 1400, height: 500 },
  },
  {
    name: 'trishula-pnl-cover',
    file: 'trishula-pnl.html',
    scrollTo: 0,
    clip: { x: 0, y: 0, width: 1400, height: 500 },
  },
  {
    name: 'trading-playbook-cover',
    file: 'trading-playbook.html',
    scrollTo: 0,
    clip: { x: 0, y: 0, width: 1400, height: 500 },
  },
  {
    name: 'q4-backtest-cover',
    file: 'q4-backtest.html',
    scrollTo: 0,
    clip: { x: 0, y: 0, width: 1400, height: 500 },
  },
];

async function main() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1080, deviceScaleFactor: 2 });

  for (const cap of CAPTURES) {
    try {
      const filePath = path.join(REPORTS_DIR, cap.file);
      const fileUrl = `file://${filePath.replace(/\\/g, '/')}`;
      console.log(`Capturing: ${cap.name} from ${cap.file}...`);
      await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });

      if (cap.scrollTo > 0) {
        await page.evaluate((y) => window.scrollTo(0, y), cap.scrollTo);
        await new Promise((r) => setTimeout(r, 500));
      }

      const outPath = path.join(OUTPUT_DIR, `${cap.name}.webp`);
      await page.screenshot({
        path: outPath,
        type: 'webp',
        quality: 90,
        clip: cap.clip,
      });
      console.log(`  -> saved ${outPath}`);
    } catch (err) {
      console.error(`  !! Failed ${cap.name}: ${err.message}`);
    }
  }

  await browser.close();
  console.log('\nDone. Screenshots saved to public/images/projects/');
}

main().catch(console.error);
