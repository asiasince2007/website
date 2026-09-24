// QA (P6.1): axe-core-Scan (WCAG 2.1 AA) über alle Seiten.
const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
  });
  const page = await browser.newPage();
  const axeSource = fs.readFileSync('node_modules/axe-core/axe.min.js', 'utf8');
  let total = 0;

  for (const url of ['/', '/sortiment.html', '/ueber-uns.html', '/kontakt.html', '/impressum.html', '/datenschutz.html']) {
    await page.goto('http://localhost:4173' + url, { waitUntil: 'networkidle0' });
    await page.evaluate(axeSource);
    const results = await page.evaluate(() =>
      axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })
    );
    console.log(`\n=== ${url} — ${results.violations.length} Verstöße ===`);
    for (const v of results.violations) {
      total += v.nodes.length;
      console.log(`[${v.impact}] ${v.id}: ${v.help} (${v.nodes.length}x)`);
      v.nodes.slice(0, 3).forEach((n) => console.log('   ', n.target.join(' '), '—', (n.failureSummary || '').split('\n')[1] || ''));
    }
  }
  await browser.close();
  console.log(`\nGesamt: ${total} Verstoß-Instanzen`);
})();
