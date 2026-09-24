const { defineConfig } = require('@playwright/test');
// Lokal vorhandenes Chrome; CI installiert das zu Playwright passende Chromium.
module.exports = defineConfig({
  testDir: './tests/browser',
  timeout: 30000,
  fullyParallel: false,
  workers: 1,
  reporter: [['list'], ['json', { outputFile: 'docs/qa-output/playwright-results.json' }]],
  outputDir: 'docs/qa-output/test-results',
  use: { browserName: 'chromium', channel: process.env.CI ? undefined : 'chrome', baseURL: 'http://127.0.0.1:4173',
    locale: 'de-DE', timezoneId: 'Europe/Berlin', screenshot: 'only-on-failure' },
  webServer: { command: 'node scripts/dev-server.js', url: 'http://127.0.0.1:4173', reuseExistingServer: !process.env.CI }
});
