// QA (P3): Multi-Page-Umbau verifizieren — Laden, Nav, Modals, Maps, Reviews, Hash-Redirects.
const puppeteer = require('puppeteer-core');

const BASE = 'http://localhost:4173';
let failures = 0;
function check(name, ok, extra) {
  console.log((ok ? 'OK  ' : 'FAIL') + ' ' + name + (extra ? ' — ' + extra : ''));
  if (!ok) failures++;
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  await page.setViewport({ width: 1280, height: 900 });

  // 1) Jede Seite lädt mit korrektem Titel, H1 und aktivem Nav-Zustand
  const pages = [
    { url: '/', h1: 'Originaler Geschmack', active: '/' },
    { url: '/sortiment.html', h1: 'Unser asiatisches Sortiment', active: 'sortiment.html' },
    { url: '/ueber-uns.html', h1: 'Aus Liebe zur asiatischen Esskultur', active: 'ueber-uns.html' },
    { url: '/kontakt.html', h1: 'Wir freuen uns auf Sie', active: 'kontakt.html' },
  ];
  for (const p of pages) {
    await page.goto(BASE + p.url, { waitUntil: 'networkidle0' });
    const h1 = await page.$eval('h1', (e) => e.textContent.trim()).catch(() => '');
    check(`${p.url} H1`, h1.includes(p.h1), h1.slice(0, 50));
    const active = await page.$eval('nav [aria-current="page"]', (e) => e.getAttribute('href')).catch(() => null);
    check(`${p.url} aktiver Nav-Link`, active === p.active, String(active));
    const title = await page.title();
    check(`${p.url} Titel eindeutig`, title.length > 10, title.slice(0, 60));
  }

  // 2) Navigation per Klick (kontakt → sortiment)
  await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
  await Promise.all([page.waitForNavigation(), page.click('nav a[href="sortiment.html"]')]);
  check('Klick-Navigation zu Sortiment', page.url().endsWith('/sortiment.html'), page.url());

  // 3) Mobile-Menü inkl. aria-expanded
  await page.setViewport({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle0' });
  await page.click('#mobile-menu-button');
  const expanded = await page.$eval('#mobile-menu-button', (e) => e.getAttribute('aria-expanded'));
  const menuVisible = await page.$eval('#mobile-menu', (e) => !e.classList.contains('hidden'));
  check('Mobile-Menü öffnet + aria-expanded', expanded === 'true' && menuVisible);
  await page.setViewport({ width: 1280, height: 900 });

  // 4) Vorschlags-Modal (Floating-Button) auf Unterseite
  await page.goto(BASE + '/ueber-uns.html', { waitUntil: 'networkidle0' });
  await page.click('button[title="Vorschlag einreichen"]');
  const modalVisible = await page.$eval('#suggestion-modal', (e) => !e.classList.contains('hidden')).catch(() => false);
  check('Vorschlags-Modal öffnet (ueber-uns)', modalVisible);

  // 5) Review-Modal + Maps-Fassade auf Kontaktseite
  await page.goto(BASE + '/kontakt.html', { waitUntil: 'networkidle0' });
  await page.evaluate(() => openReviewModal());
  const reviewVisible = await page.$eval('#review-modal', (e) => !e.classList.contains('hidden')).catch(() => false);
  check('Review-Modal öffnet (kontakt)', reviewVisible);
  await page.evaluate(() => closeReviewModal());
  await page.click('#maps-load-btn');
  await new Promise((r) => setTimeout(r, 2500));
  const iframeOk = await page.$eval('#maps-container iframe', (e) => !!e.src).catch(() => false);
  check('Maps-Fassade lädt iframe (kontakt)', iframeOk);

  // 6) Bewertungen laden auf Startseite (Observer)
  await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.getElementById('bewertungen').scrollIntoView());
  await new Promise((r) => setTimeout(r, 800));
  const cards = await page.$$eval('#reviews-grid > div', (els) => els.length);
  check('Bewertungs-Karten geladen (start)', cards === 3, cards + ' Karten');

  // 7) Alt-Hash-Redirects
  for (const [hash, target] of [['#sortiment', '/sortiment.html'], ['#kontakt', '/kontakt.html'], ['#impressum', '/impressum.html']]) {
    await page.goto('about:blank');
    await page.goto(BASE + '/' + hash, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 400));
    check(`Hash-Redirect ${hash}`, page.url().endsWith(target), page.url());
  }

  // 8) Footer-Links echt
  await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
  const footerHrefs = await page.$$eval('footer a', (as) => as.map((a) => a.getAttribute('href')));
  check('Footer ohne Hash-Links', footerHrefs.every((h) => !h.startsWith('#')), footerHrefs.join(','));

  const realErrors = errors.filter((e) => !/favicon/.test(e));
  check('Keine Konsolen-/Seitenfehler', realErrors.length === 0, realErrors.slice(0, 3).join(' | '));

  await browser.close();
  console.log(failures ? `\n${failures} FEHLER` : '\nALLE TESTS OK');
  process.exit(failures ? 1 : 0);
})();
