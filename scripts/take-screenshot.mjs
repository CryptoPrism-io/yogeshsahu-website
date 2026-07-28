import { chromium } from 'playwright';
import path from 'path';

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  console.log('Navigating to http://localhost:3000/resources...');
  await page.goto('http://localhost:3000/resources', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const outPath1 = 'C:\\Users\\44776\\.gemini\\antigravity\\brain\\88599aa5-8a41-4461-acd1-c6d64cd7cf4a\\resources_preview.png';
  await page.screenshot({ path: outPath1, fullPage: false });
  console.log(`Saved screenshot to ${outPath1}`);

  console.log('Navigating to desktop home http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const outPath2 = 'C:\\Users\\44776\\.gemini\\antigravity\\brain\\88599aa5-8a41-4461-acd1-c6d64cd7cf4a\\desktop_home_preview.png';
  await page.screenshot({ path: outPath2, fullPage: false });
  console.log(`Saved desktop home screenshot to ${outPath2}`);

  await browser.close();
}

capture().catch(err => console.error(err));
