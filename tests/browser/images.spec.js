const { test, expect } = require('@playwright/test');

test('Bildgrößenangaben entsprechen den tatsächlichen Spalten an den Layoutgrenzen', async ({ page }) => {
  for (const width of [320, 390, 760, 761, 768, 900, 901, 980, 981, 1140, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const url of ['/', '/ueber-uns.html']) {
      await page.goto(url);
      const photos = await page.locator('img.foto').evaluateAll(images => images.map(img => {
        // Den ersten zutreffenden sizes-Eintrag wie der Browser auswählen und
        // seine CSS-Länge mit der unabhängig berechneten Layoutbreite vergleichen.
        const candidate = img.sizes.split(',').map(value => value.trim()).find(value => {
          const media = value.match(/^(\([^)]*\))\s+/);
          return !media || matchMedia(media[1]).matches;
        });
        const length = candidate.replace(/^\([^)]*\)\s+/, '');
        const probe = document.createElement('div');
        probe.style.cssText = `position:absolute;visibility:hidden;width:${length}`;
        document.body.append(probe);
        const declared = probe.getBoundingClientRect().width;
        probe.remove();
        return { src: img.getAttribute('src'), declared, actual: img.getBoundingClientRect().width };
      }));
      for (const photo of photos) {
        expect(Math.abs(photo.declared - photo.actual), `${url}, ${width}px, ${photo.src}`).toBeLessThan(1);
      }
    }
  }
});
