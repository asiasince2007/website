const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { ROOT: root, PAGES } = require('../scripts/site-files.js');
const pages = [...PAGES, 'route.html'];
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

test('Git enthält nur Website-Bestand, keine lokalen Gedächtnis- oder Prüfunterlagen', () => {
  const tracked = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' }).split('\0').filter(Boolean);
  for (const file of tracked) assert.doesNotMatch(file,
    /^(?:00_Gedaechtnis\/|90_Archiv\/|docs\/|\.claude\/|\.idea\/|node_modules\/|CLAUDE\.md$|AGENTS\.md$)/,
    `nur lokal aufbewahren: ${file}`);
});

test('Interne HTML-Links, Medien und seitenübergreifende Sprungziele existieren', () => {
  for (const file of pages) {
    for (const [, raw] of read(file).matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (/^(https?:|mailto:|tel:|data:)/.test(raw)) continue;
      const url = new URL(raw, 'https://www.asiamarkt.info/' + file);
      const target = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname.slice(1));
      assert.ok(fs.existsSync(path.join(root,target)), `${file}: ${raw}`);
      if (url.hash) assert.ok(read(target).includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${file}: ${raw}`);
    }
  }
});

test('Cacheversionen, Navigation und Footer bleiben seitenübergreifend synchron', () => {
  const versions = new Set();
  const navigations = new Set();
  const footers = new Set();
  for (const file of PAGES) {
    const html = read(file);
    for (const [, version] of html.matchAll(/(?:src|href)="[^\"]+\?v=(\d+)"/g)) versions.add(version);
    navigations.add(html.match(/<nav id="hauptnavigation"[\s\S]*?<\/nav>/)[0].replace(/ aria-current="page"/g, '').replace(/\s+/g, ' '));
    footers.add(html.match(/<footer class="fuss">[\s\S]*?<\/footer>/)[0].replace(/ aria-current="page"/g, '').replace(/\s+/g, ' '));
    assert.doesNotMatch(html, /data-reveal|class="marker"| style="/, `${file}: keine abgelösten Marker oder Inline-Stile`);
  }
  assert.equal(versions.size, 1, 'eine Version für Styles, Script und Icons');
  assert.equal(navigations.size, 1, 'identische Navigation, außer aktivem Eintrag');
  assert.equal(footers.size, 1, 'identische Geschäftsdaten im Footer');
});

test('Jedes aktive Asset ist erreichbar und jede lokale Asset-Referenz existiert', () => {
  const seen = new Set();
  const queue = [...pages, 'site.webmanifest'];
  const origin = 'https://www.asiamarkt.info';
  const add = (raw, from) => {
    const url = new URL(raw.replaceAll('&amp;', '&'), origin + '/' + from);
    if (url.origin !== origin) return;
    const file = decodeURIComponent(url.pathname.slice(1)) || 'index.html';
    assert.ok(fs.existsSync(path.join(root, file)), `${from}: ${raw}`);
    if (!seen.has(file)) queue.push(file);
  };
  while (queue.length) {
    const file = queue.shift();
    if (seen.has(file)) continue;
    seen.add(file);
    if (!/\.(html|css|webmanifest)$/.test(file)) continue;
    const text = read(file);
    for (const [, raw] of text.matchAll(/(?:href|src)="([^"]+)"/g)) add(raw, file);
    for (const [, candidates] of text.matchAll(/srcset="([^"]+)"/g)) {
      for (const candidate of candidates.split(',')) add(candidate.trim().split(/\s+/)[0], file);
    }
    for (const [, raw] of text.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) add(raw, file);
    // JSON-LD-Logos und Manifest-Icons werden nicht als HTML-Bild eingebunden.
    for (const [, raw] of text.matchAll(/"(?:image|logo|src)"\s*:\s*"([^"]+)"/g)) add(raw, file);
    for (const [, raw] of text.matchAll(/content="(https:\/\/www\.asiamarkt\.info\/assets\/[^\"]+)"/g)) add(raw, file);
  }
  for (const file of fs.readdirSync(path.join(root, 'assets'), { recursive: true })) {
    const relative = 'assets/' + file.replaceAll('\\', '/');
    if (fs.statSync(path.join(root, relative)).isFile()) assert.ok(seen.has(relative), `unreferenziertes Asset: ${relative}`);
  }
});

test('Geschäftsdaten und reguläre Zeiten in allen vier JSON-LD-Blöcken konsistent', () => {
  let count = 0;
  for (const file of pages) {
    for (const [, raw] of read(file).matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      const data = JSON.parse(raw); count++;
      assert.equal(data['@type'], 'GroceryStore');
      assert.equal(data.name, 'Asia Markt Thien Phu');
      assert.equal(data.telephone, '+4921731065590');
      assert.equal(data.address.streetAddress, 'Hauptstraße 74');
      assert.equal(data.address.postalCode, '40764');
      assert.equal(data.url, 'https://www.asiamarkt.info/');
      const times = data.openingHoursSpecification;
      assert.equal(times.length, 2);
      assert.deepEqual(times[0].dayOfWeek, ['Monday','Tuesday','Wednesday','Thursday','Friday']);
      assert.equal(times[0].opens, '09:00'); assert.equal(times[0].closes, '18:00');
      assert.deepEqual([times[1].dayOfWeek].flat(), ['Saturday']);
      assert.equal(times[1].opens, '09:00'); assert.equal(times[1].closes, '14:00');
      assert.equal(data.aggregateRating, undefined, 'keine Eigenbewertungs-Sterne im Schema');
    }
  }
  assert.equal(count, 4);
});

test('Aktive Assets, kanonische URLs und Sitemap stimmen mit den sechs Inhaltsseiten überein', () => {
  const sitemap = read('sitemap.xml');
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
  assert.equal(urls.length, 6);
  for (const file of pages.filter(f=>f!=='route.html')) {
    const html = read(file);
    const canonical = file === 'index.html' ? 'https://www.asiamarkt.info/' : 'https://www.asiamarkt.info/' + file;
    assert.ok(html.includes(`rel="canonical" href="${canonical}"`));
    assert.ok(urls.includes(canonical));
    assert.match(html, /assets\/css\/site\.css\?v=\d+/);
    assert.match(html, /assets\/js\/site\.js\?v=\d+/);
    assert.doesNotMatch(html, /styles\.min\.css|assets\/js\/main\.js|email_off/);
    assert.doesNotMatch(html, /[–—]/, `${file}: Zeitspannen mit bis schreiben`);
    assert.doesNotMatch(html, /An Feiertagen können|Feiertage und Sonderzeiten bitte/);
    assert.match(html, /Sonntag &amp; Feiertage/);
  }
});
