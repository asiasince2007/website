// QA (P1.4): Klick-zum-Laden-Fassade für Google Maps verifizieren.
const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
  });
  const page = await browser.newPage();
  const goog = [];
  page.on('request', (r) => {
    if (/google\.com\/maps|maps\.googleapis|gstatic\.com\/maps/.test(r.url())) goog.push(r.url());
  });
  await page.setViewport({ width: 1280, height: 1600 });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const l = [...document.querySelectorAll('a,button')].find((e) => /Kontakt$/.test(e.textContent.trim()));
    l.click();
  });
  await new Promise((r) => setTimeout(r, 500));
  console.log('Google-Requests VOR Klick:', goog.length);
  await page.evaluate(() => document.getElementById('maps-facade').scrollIntoView({ block: 'center' }));
  await page.screenshot({ path: 'docs/qa-tmp-fassade.jpg', quality: 75 });
  await page.click('#maps-load-btn');
  await new Promise((r) => setTimeout(r, 3000));
  console.log('Google-Requests NACH Klick:', goog.length);
  const hasIframe = await page.$eval('#maps-container iframe', (e) => !!e.src).catch(() => false);
  console.log('iframe geladen:', hasIframe);
  await page.screenshot({ path: 'docs/qa-tmp-karte.jpg', quality: 75 });
  await browser.close();
})();
