// QA (P8): Modal-UX (Scroll-Lock, Escape, Fokus), Menü-Außenklick,
// Öffnungsstatus in Europe/Berlin, Route-Deep-Links, responsive Header/Hero.
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

  // 1) Modal: Scroll-Lock, ARIA, Fokus, Escape, Fokus-Rückgabe
  await page.evaluate(() => { window.scrollTo(0, 600); });
  await new Promise((r) => setTimeout(r, 100));
  await page.evaluate(() => openSuggestionModal());
  const modalState = await page.evaluate(() => ({
    visible: !document.getElementById('suggestion-modal').classList.contains('hidden'),
    bodyFixed: document.body.style.position === 'fixed',
    bodyTop: document.body.style.top,
    role: document.querySelector('#suggestion-modal [role="dialog"]')?.getAttribute('aria-modal'),
    focusInDialog: document.querySelector('#suggestion-modal').contains(document.activeElement),
  }));
  check('Modal offen + Scroll-Lock (body fixed, top=-600px)',
    modalState.visible && modalState.bodyFixed && modalState.bodyTop === '-600px', JSON.stringify(modalState));
  check('Dialog hat aria-modal + Fokus im Dialog', modalState.role === 'true' && modalState.focusInDialog);

  // Tab bleibt im Dialog (Fokus-Falle): 12× Tab darf den Dialog nicht verlassen
  for (let i = 0; i < 12; i++) await page.keyboard.press('Tab');
  const stillInDialog = await page.evaluate(() =>
    document.getElementById('suggestion-modal').contains(document.activeElement));
  check('Fokus-Falle: 12× Tab bleibt im Dialog', stillInDialog);

  await page.keyboard.press('Escape');
  const afterEsc = await page.evaluate(() => ({
    hidden: document.getElementById('suggestion-modal').classList.contains('hidden'),
    bodyRestored: document.body.style.position === '',
    scrollY: window.scrollY,
  }));
  check('Escape schließt + Scroll-Position wiederhergestellt',
    afterEsc.hidden && afterEsc.bodyRestored && afterEsc.scrollY === 600, JSON.stringify(afterEsc));

  // 2) Mobile-Menü: Außenklick schließt
  await page.setViewport({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle0' });
  await page.click('#mobile-menu-button');
  let menuOpen = await page.$eval('#mobile-menu', (e) => !e.classList.contains('hidden'));
  check('Mobile-Menü öffnet', menuOpen);
  await page.mouse.click(195, 700); // Klick weit unterhalb der Navigation
  const afterOutside = await page.evaluate(() => ({
    hidden: document.getElementById('mobile-menu').classList.contains('hidden'),
    expanded: document.getElementById('mobile-menu-button').getAttribute('aria-expanded'),
  }));
  check('Außenklick schließt Menü + aria-expanded=false',
    afterOutside.hidden && afterOutside.expanded === 'false', JSON.stringify(afterOutside));

  // 3) Responsive Maße: Header 64px mobil, Hero-Bild 420px mobil
  const mobileSizes = await page.evaluate(() => ({
    header: document.querySelector('#navbar .flex.justify-between').getBoundingClientRect().height,
    hero: document.querySelector('img[src*="hero-interim"]').getBoundingClientRect().height,
  }));
  check('Mobil: Header 64px, Hero 420px',
    Math.round(mobileSizes.header) === 64 && Math.round(mobileSizes.hero) === 420, JSON.stringify(mobileSizes));
  await page.setViewport({ width: 1280, height: 900 });
  await page.reload({ waitUntil: 'networkidle0' });
  const desktopSizes = await page.evaluate(() => ({
    header: document.querySelector('#navbar .flex.justify-between').getBoundingClientRect().height,
    hero: document.querySelector('img[src*="hero-interim"]').getBoundingClientRect().height,
  }));
  check('Desktop: Header 96px, Hero 550px',
    Math.round(desktopSizes.header) === 96 && Math.round(desktopSizes.hero) === 550, JSON.stringify(desktopSizes));

  // 4) Öffnungsstatus rechnet in Europe/Berlin (Instant fix, Erwartung TZ-unabhängig)
  const status = await page.evaluate(() => ({
    // Mi 2026-06-10 12:00 UTC = 14:00 Berlin → offen bis 18 Uhr
    offen: openStatusNow(new Date('2026-06-10T12:00:00Z')).label,
    // Sa 2026-06-13 13:30 UTC = 15:30 Berlin → zu, öffnet Montag
    saNachmittag: openStatusNow(new Date('2026-06-13T13:30:00Z')).label,
    // So 2026-06-14 10:00 UTC → öffnet morgen 9 Uhr
    sonntag: openStatusNow(new Date('2026-06-14T10:00:00Z')).label,
    // Fr 2026-06-12 05:30 UTC = 07:30 Berlin → öffnet heute 9 Uhr
    vorOeffnung: openStatusNow(new Date('2026-06-12T05:30:00Z')).label,
  }));
  check('Status Mi 14:00 → geöffnet bis 18',
    status.offen === 'Jetzt geöffnet · bis 18 Uhr', status.offen);
  check('Status Sa 15:30 → öffnet Montag',
    status.saNachmittag === 'Geschlossen · öffnet Montag um 9 Uhr', status.saNachmittag);
  check('Status So → öffnet morgen 9 Uhr',
    status.sonntag === 'Geschlossen · öffnet morgen um 9 Uhr', status.sonntag);
  check('Status Fr 07:30 → öffnet heute 9 Uhr',
    status.vorOeffnung === 'Noch geschlossen · öffnet heute um 9 Uhr', status.vorOeffnung);

  // 5) Route-CTAs nutzen den Directions-Deep-Link (api=1)
  const routeLinks = await page.$$eval('a[href*="maps"]', (as) => as.map((a) => a.href));
  const dirLinks = routeLinks.filter((h) => h.includes('google.com/maps/dir/?api=1'));
  const oldLinks = routeLinks.filter((h) => h.includes('maps.google.com/?q='));
  check('Route-Links = Directions-Deep-Link, keine alten q=-Links',
    dirLinks.length >= 2 && oldLinks.length === 0, `${dirLinks.length} dir, ${oldLinks.length} alt`);

  // 6) Anker #bewertungen landet nicht unter dem fixen Header (scroll-padding-top)
  await page.evaluate(() => { location.hash = '#bewertungen'; });
  await new Promise((r) => setTimeout(r, 400));
  const anchorTop = await page.evaluate(() => document.getElementById('bewertungen').getBoundingClientRect().top);
  check('Anker-Ziel unterhalb des Headers (top >= 96px)', anchorTop >= 95, anchorTop.toFixed(0) + 'px');

  await browser.close();
  console.log(failures ? `\n${failures} FEHLER` : '\nALLE TESTS OK');
  process.exit(failures ? 1 : 0);
})();
