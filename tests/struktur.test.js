const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const pages = ['index.html','sortiment.html','ueber-uns.html','kontakt.html','impressum.html','datenschutz.html','route.html'];
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

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
