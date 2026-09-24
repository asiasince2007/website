// Vergleich gegen den letzten veroeffentlichten Stand vor der Gestaltung.
// Absichtlich ein Migrationsnachweis, kein dauerhaft eingefrorener Inhaltstest.
// Aufruf: node scripts/qa-design-preservation.cjs [Git-Referenz]
const { execFileSync } = require('node:child_process');
const { readFileSync, writeFileSync, mkdirSync } = require('node:fs');
const { resolve } = require('node:path');
const assert = require('node:assert/strict');
const root = resolve(__dirname, '..');
const base = process.argv[2] || '3e1e459';
const git = args => execFileSync('git', args, { cwd: root, maxBuffer: 10 * 1024 * 1024 });
const original = file => git(['show', `${base}:${file}`]);
const current = file => readFileSync(resolve(root, file));
const pages = ['index.html', 'sortiment.html', 'ueber-uns.html', 'kontakt.html', 'impressum.html', 'datenschutz.html'];
// Nur die tatsaechlich gewollten Darstellungs-Aenderungen im head freigeben.
const normalize = html => html.replace(/\r\n/g, '\n')
  .replace(/assets\/(css\/site\.css|js\/site\.js)\?v=\d+/g, 'assets/$1?v=VERSION')
  .replace(/^    <link rel="preload" as="font" type="font\/woff2" href="assets\/fonts\/(?:nunito-(?:400|700)|lora-700)-latin\.woff2" crossorigin>\n/gm, '');
const report = { base: git(['rev-parse', base]).toString().trim(), checkedAt: new Date().toISOString(), pages: [], unchangedFiles: [] };
for (const file of pages) {
  const before = original(file).toString('utf8');
  const after = current(file).toString('utf8');
  assert.equal(normalize(after), normalize(before), `${file}: unerwartete Inhalts- oder Metadatenaenderung`);
  assert.equal(after.replace(/\r\n/g, '\n').split('<body>')[1], before.replace(/\r\n/g, '\n').split('<body>')[1], `${file}: body muss bis auf Git-Zeilenenden zeichengleich bleiben`);
  const versions = [...after.matchAll(/assets\/(?:css\/site\.css|js\/site\.js)\?v=(\d+)/g)].map(m => m[1]);
  assert.deepEqual(versions, ['2026092403', '2026092403'], `${file}: Cacheversion`);
  report.pages.push({ file, completeBodyIdentical: true, headIdenticalExceptFontsAndCache: true });
}
const files = ['route.html', 'robots.txt', 'sitemap.xml', 'site.webmanifest', 'CNAME', '_config.yml', 'assets/css/fonts.css',
  ...git(['ls-tree', '-r', '--name-only', base, '--', 'assets/images', 'assets/fonts']).toString().trim().split('\n')];
for (const file of files) {
  // Git normalisiert Textdateien auf LF, Windows checkt sie teils als CRLF aus.
  if (/\.(html|txt|xml|webmanifest|yml|css|svg)$/.test(file) || file === 'CNAME') {
    assert.equal(current(file).toString().replace(/\r\n/g, '\n'), original(file).toString().replace(/\r\n/g, '\n'), `${file}: unerwartete Textaenderung`);
  } else {
    assert.deepEqual(current(file), original(file), `${file}: unerwartete Binaeraenderung`);
  }
  report.unchangedFiles.push(file);
}
mkdirSync(resolve(root, 'docs/qa-output/design'), { recursive: true });
writeFileSync(resolve(root, 'docs/qa-output/design/inhalt-seo-vergleich.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`${pages.length} vollstaendige HTML-Seiten: Texte, Links, Alt-Texte, Ueberschriften, Metadaten und JSON-LD unveraendert.`);
console.log(`${files.length} weitere Dateien unveraendert: Route und SEO-Steuerung nach Git-Zeilenendnormalisierung, Fotos und Schriften bytegleich.`);
