// QA-Helfer: lädt Seiten lokal, sammelt Konsolenfehler und macht Screenshots.
const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
  page.on('requestfailed', (r) => errors.push('REQFAIL: ' + r.url()));

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  for (const p of ['index.html', 'impressum.html', 'datenschutz.html']) {
    await page.goto('http://localhost:4173/' + p, { waitUntil: 'networkidle0' });
    const svgCount = await page.$$eval('svg.svg-icon', (els) => els.length);
    console.log(p, '— svg-icons:', svgCount);
  }
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'docs/qa-tmp-mobil.jpg', quality: 80 });
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
  await page.screenshot({ path: 'docs/qa-tmp-desktop.jpg', quality: 80 });
  console.log('Konsolenfehler:', errors.length ? errors : 'keine');
  await browser.close();
})();
