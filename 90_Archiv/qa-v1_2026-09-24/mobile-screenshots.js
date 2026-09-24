// Einmaliges QA-Skript (P0.3): Mobil-Screenshots (390 px) für docs/ erzeugen.
const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });

  await page.screenshot({ path: 'docs/qa-mobil-390-hero.jpg', quality: 80 });

  await page.click('#mobile-menu-button');
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: 'docs/qa-mobil-390-menue-offen.jpg', quality: 80 });
  await page.click('#mobile-menu-button');

  // CTA-Bereich mit Floating-Button (Überlappung dokumentieren)
  await page.evaluate(() => {
    const el = [...document.querySelectorAll('a,button')].find((e) =>
      /Kundenstimmen/.test(e.textContent),
    );
    if (el) el.scrollIntoView({ block: 'center' });
  });
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: 'docs/qa-mobil-390-cta-floating-button.jpg', quality: 80 });

  await browser.close();
  console.log('OK: 3 Screenshots in docs/ abgelegt');
})();
