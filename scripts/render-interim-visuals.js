// Rendert die Interims-Brand-Visuals (P4.1/P4.2) als WebP nach assets/images/.
const puppeteer = require('puppeteer-core');
const sharp = require('sharp');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 2100, deviceScaleFactor: 1 });
  await page.goto('http://localhost:4173/scripts/interim-visuals.html', { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  for (const [id, out] of [['hero', 'hero-interim'], ['tradition', 'tradition-interim']]) {
    const el = await page.$('#' + id);
    await el.screenshot({ path: `tmp-${id}.png` });
    const info = await sharp(`tmp-${id}.png`).webp({ quality: 82 }).toFile(`assets/images/${out}.webp`);
    fs.unlinkSync(`tmp-${id}.png`);
    console.log(`${out}.webp: ${Math.round(info.size / 1024)} KB (${info.width}x${info.height})`);
  }
  await browser.close();
})();
