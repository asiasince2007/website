// QA (P4b.1): Bewertungs-Marquee — Karten, Animation, Hover-Pause, reduced-motion.
const puppeteer = require('puppeteer-core');

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
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });

  const counts = await page.evaluate(() => ({
    total: document.querySelectorAll('.marquee__track > li').length,
    clones: document.querySelectorAll('.marquee__track > li[aria-hidden="true"]').length,
  }));
  check('26 Karten (13 + 13 Klone)', counts.total === 26 && counts.clones === 13, JSON.stringify(counts));

  const firstAuthor = await page.$eval('.marquee__track li figcaption', (e) => e.textContent.trim());
  check('Erster Autor aus JSON (Andre Jansen)', firstAuthor.startsWith('Andre Jansen'), firstAuthor.slice(0, 40));

  // Außerhalb des Viewports (Seitenanfang): Animation per IntersectionObserver pausiert
  const offscreenState = await page.$eval('.marquee__track', (e) => getComputedStyle(e).animationPlayState);
  check('Offscreen pausiert (Akku/CPU)', offscreenState === 'paused', offscreenState);

  // Ins Sichtfeld scrollen → Animation läuft
  await page.evaluate(() => document.querySelector('.reviews-marquee').scrollIntoView({ block: 'center' }));
  await new Promise((r) => setTimeout(r, 400));
  const anim = await page.$eval('.marquee__track', (e) => {
    const cs = getComputedStyle(e);
    return { name: cs.animationName, state: cs.animationPlayState, duration: cs.animationDuration };
  });
  check('Animation läuft im Viewport', anim.name === 'marquee' && anim.state === 'running', JSON.stringify(anim));

  // Bewegt sich das Band wirklich?
  const x1 = await page.$eval('.marquee__track', (e) => new DOMMatrixReadOnly(getComputedStyle(e).transform).m41);
  await new Promise((r) => setTimeout(r, 1200));
  const x2 = await page.$eval('.marquee__track', (e) => new DOMMatrixReadOnly(getComputedStyle(e).transform).m41);
  check('Band bewegt sich nach links', x2 < x1, `${x1.toFixed(1)} → ${x2.toFixed(1)}`);

  await page.hover('.marquee');
  const paused = await page.$eval('.marquee__track', (e) => getComputedStyle(e).animationPlayState);
  check('Pause bei Hover', paused === 'paused', paused);

  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  const reduced = await page.$eval('.marquee__track', (e) => getComputedStyle(e).animationName);
  const scrollable = await page.$eval('.marquee', (e) => getComputedStyle(e).overflowX);
  check('reduced-motion: Animation aus, scrollbar', reduced === 'none' && scrollable === 'auto', `${reduced}/${scrollable}`);
  await page.emulateMediaFeatures([]);

  // Mobil: Kartenbreite & kein Layout-Shift
  await page.setViewport({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle0' });
  const cardW = await page.$eval('.marquee__track li', (e) => e.getBoundingClientRect().width);
  check('Mobil: Kartenbreite 320px', Math.round(cardW) === 320, cardW + 'px');
  await page.evaluate(() => document.querySelector('.reviews-marquee').scrollIntoView({ block: 'center' }));
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: 'docs/qa-tmp-marquee.jpg', quality: 75 });

  await browser.close();
  console.log(failures ? `\n${failures} FEHLER` : '\nALLE TESTS OK');
  process.exit(failures ? 1 : 0);
})();
