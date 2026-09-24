const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const { PAGES } = require('../../scripts/site-files.js');
const pages = PAGES.map(file => file === 'index.html' ? '/' : '/' + file);

// Drittanbieter werden in den Interaktionstests kontrolliert beantwortet.
// Diese Suite prüft den Website-Code; reale Google-/Cloudflare-Funktion separat.

test('Verzögertes JavaScript verursacht keinen Sprung durch das Mobilmenü', async ({ page }) => {
  await page.setViewportSize({width:390,height:844});
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  await page.route('**/assets/js/site.js?*', async route => { await gate; await route.continue(); });
  await page.goto('/', {waitUntil:'commit'});
  await page.locator('h1').waitFor();
  await page.evaluate(() => document.fonts.ready);
  const before = await page.locator('main').boundingBox();
  release();
  await expect(page.locator('header')).toHaveClass(/menue-bereit/);
  const after = await page.locator('main').boundingBox();
  expect(Math.abs(after.y-before.y)).toBeLessThan(1);
});

for (const width of [320, 390, 768, 1280]) {
  test.describe(`${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });
    for (const url of pages) test(`${url} Layout, Links, Barrierefreiheit`, async ({ page }) => {
      const errors = []; page.on('pageerror', e => errors.push(e.message));
      await page.goto(url);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('h1')).toHaveCount(1);
      const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
      expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client);
      await expect(page.getByRole('contentinfo')).toContainText('Hauptstraße 74');
      await expect(page.getByRole('contentinfo').locator('a[href="tel:+4921731065590"]')).toHaveCount(1);
      for (const link of await page.locator('a[href^="#"]').all()) {
        await expect(page.locator(await link.getAttribute('href'))).toHaveCount(1);
      }
      // Hauptbereiche sichtbar prüfen; keine Abhängigkeit von alten Reveal-Markern.
      for (const target of await page.locator('main > section, main > div').all()) {
        await target.scrollIntoViewIfNeeded();
        await expect(target).toHaveCSS('opacity', '1');
      }
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
      expect(axe.violations).toEqual([]);
      expect(errors).toEqual([]);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: `docs/qa-output/${url === '/' ? 'start' : url.slice(1,-5)}-${width}.png`, fullPage: true });
    });
    test('Menü und Anrufkontrast einschließlich Hover und Tastaturfokus', async ({ page }) => {
      await page.goto('/');
      const button = page.locator('#menue-schalter');
      if (width <= 900) {
        await button.focus(); await page.keyboard.press('Enter');
        await expect(button).toHaveAttribute('aria-expanded','true');
        await page.keyboard.press('Tab');
        await expect(page.locator('#hauptnavigation a').first()).toBeFocused();
      }
      const call = page.locator('#hauptnavigation .btn-anruf');
      await expect(call).toHaveCSS('color','rgb(255, 255, 255)');
      await call.hover(); await expect(call).toHaveCSS('color','rgb(255, 255, 255)');
      await call.focus(); await expect(call).toHaveCSS('color','rgb(255, 255, 255)');
      const axe = await new AxeBuilder({ page }).include('#hauptnavigation').withTags(['wcag2aa']).analyze();
      expect(axe.violations).toEqual([]);
      if (width <= 900) {
        await page.keyboard.press('Escape');
        await expect(button).toBeFocused();
        await expect(button).toHaveAttribute('aria-expanded','false');
        await button.click();
      }
      await page.locator('#hauptnavigation a[href="sortiment.html"]').click();
      await expect(page).toHaveURL(/sortiment.html$/);
    });
  });
}

test('Ohne JavaScript: sechs Seiten erreichbar, Menü sichtbar, reguläre Zeiten lesbar', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 900 } });
  const page = await context.newPage();
  for (const url of pages) {
    await page.goto('http://127.0.0.1:4173' + url);
    await expect(page.locator('#hauptnavigation')).toBeVisible();
    await expect(page.locator('#menue-schalter')).toBeHidden();
    await expect(page.locator('[data-status-text]').first()).toContainText('Regulär');
  }
  await page.locator('#hauptnavigation a[href="sortiment.html"]').click();
  await expect(page).toHaveURL(/sortiment.html$/);
  await page.goto('http://127.0.0.1:4173/kontakt.html');
  await expect(page.locator('#karte-laden')).toBeHidden();
  await expect(page.getByRole('link', {name:'Oder direkt in Google Maps öffnen'})).toBeVisible();
  await context.close();
});

test('Alle Seitenköpfe ohne Bildlogo; Browsericons mit transparenten Ecken und vollständigem Kreis', async ({ page }) => {
  for (const url of pages) {
    await page.goto(url);
    await expect(page.locator('.marke img')).toHaveCount(0);
    await expect(page.locator('.marke')).toContainText('Asia Markt Thien Phu');
  }
  // Tatsächliche Pixel prüfen: CSS-Rundung hätte auf ein Tab-Symbol keinen Einfluss.
  const icons = await page.evaluate(async () => {
    const paths = ['/assets/images/icon-192.png', '/assets/images/icon-512.png', '/assets/images/apple-touch-icon.png'];
    const ico = new DataView(await (await fetch('/favicon.ico')).arrayBuffer());
    for (let i = 0; i < ico.getUint16(4, true); i++) {
      const entry = 6 + i * 16;
      const length = ico.getUint32(entry + 8, true), offset = ico.getUint32(entry + 12, true);
      paths.push('data:image/png;base64,' + btoa(String.fromCharCode(...new Uint8Array(ico.buffer, offset, length))));
    }
    const result = [];
    for (const path of paths) {
      const img = new Image(); img.src = path; await img.decode();
      const canvas = document.createElement('canvas'); canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0);
      const alpha = (x, y) => ctx.getImageData(x, y, 1, 1).data[3];
      result.push({ size: img.width, height: img.height,
        corners: [[0, 0], [img.width - 1, 0], [0, img.height - 1], [img.width - 1, img.height - 1]].map(([x,y]) => alpha(x,y)),
        center: alpha(img.width / 2, img.height / 2),
        top: alpha(img.width / 2, 1), bottom: alpha(img.width / 2, img.height - 2) });
    }
    return result;
  });
  expect(icons.map(icon => icon.size)).toEqual([192, 512, 180, 16, 32, 48]);
  for (const icon of icons) {
    expect(icon.height).toBe(icon.size);
    expect(icon.corners).toEqual([0, 0, 0, 0]);
    expect(icon.center).toBe(255); expect(icon.top).toBe(255); expect(icon.bottom).toBe(255);
  }
});

test('Sortiment früh erreichbar, ohne zusätzliche Gruppenbuttons, Besuchsaktionen vorhanden', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/sortiment.html');
  expect((await page.locator('#frisches').boundingBox()).y).toBeLessThan(450);
  expect((await page.locator('.verfuegbarkeit').boundingBox()).y).toBeLessThan(400);
  await expect(page.getByRole('navigation',{name:'Warengruppen'})).toHaveCount(0);
  for (const url of ['/sortiment.html','/ueber-uns.html']) {
    await page.goto(url);
    await expect(page.locator('.besuch a[href="/route.html"]')).toBeVisible();
    await expect(page.locator('.besuch a[href="tel:+4921731065590"]')).toBeVisible();
  }
});

test('Maps lädt nur nach Freigabe und lässt sich wieder ausblenden', async ({ page }) => {
  const thirdParty = [];
  page.on('request', req => { if (new URL(req.url()).hostname !== '127.0.0.1') thirdParty.push(req.url()); });
  // Isolierter Funktionstest: echte Google-Verbindung separat nach Deployment.
  await page.route('https://www.google.com/maps/embed**', route => route.fulfill({ body: '<html><body>Testkarte</body></html>', contentType: 'text/html' }));
  await page.goto('/kontakt.html');
  await expect(page.locator('iframe')).toHaveCount(0);
  expect(thirdParty).toEqual([]);
  await page.getByRole('button',{name:'Karte laden',exact:true}).click();
  await expect(page.locator('iframe')).toHaveAttribute('src', /https:\/\/www.google.com\/maps\/embed/);
  await page.getByRole('button',{name:'Karte ausblenden',exact:true}).click();
  await expect(page.locator('iframe')).toHaveCount(0);
  await expect(page.getByRole('button',{name:'Karte laden',exact:true})).toBeFocused();
});

test('Route öffnet im neuen Tab mit richtigem Ziel auch ohne JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  await context.route('https://www.google.com/maps/dir/**', route => route.fulfill({body:'Maps-Ziel erreicht',contentType:'text/html'}));
  const page = await context.newPage(); await page.goto('http://127.0.0.1:4173/sortiment.html');
  const popupPromise = page.waitForEvent('popup');
  await page.locator('.besuch a[href="/route.html"]').click();
  const popup = await popupPromise;
  await popup.waitForURL('https://www.google.com/maps/dir/**');
  const url = new URL(popup.url());
  expect(url.searchParams.get('destination')).toBe('Asia Markt Thien Phu, Hauptstraße 74, 40764 Langenfeld');
  await context.close();
});

for (const timezoneId of ['Europe/Berlin','Pacific/Honolulu','Asia/Tokyo']) {
  test(`Browserstatus ${timezoneId}: NRW-Feiertag statt falscher Öffnung`, async ({ browser }) => {
    const context = await browser.newContext({timezoneId}); const page = await context.newPage();
    await page.clock.setFixedTime(new Date('2026-10-03T08:00:00Z'));
    await page.goto('http://127.0.0.1:4173/');
    await expect(page.locator('[data-status-text]').first()).toContainText('Tag der Deutschen Einheit');
    await expect(page.locator('[data-status-text]').first()).toContainText('Heute geschlossen');
    await expect(page.locator('[data-status-text]').first()).toContainText('Montag um 9 Uhr');
    for (const dot of await page.locator('[data-status-punkt]').all()) await expect(dot).not.toHaveClass(/offen/);
    await page.setViewportSize({width:320,height:900});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth)).toBe(true);
    await context.close();
  });
}
