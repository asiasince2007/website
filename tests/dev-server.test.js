// Der Vorschau-Server soll öffentliche Dateien zeigen und bei kaputten URLs weiterlaufen.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { once } = require('node:events');
const { createServer } = require('../scripts/dev-server.js');

test('Vorschau: nur Website-Dateien, GET/HEAD und robuste URL-Behandlung', async t => {
  const server = createServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise(resolve => server.close(resolve)));
  const request = (path, method = 'GET') => new Promise((resolve, reject) => {
    http.request({ hostname: '127.0.0.1', port: server.address().port, path, method }, response => {
      let body = '';
      response.on('data', chunk => body += chunk);
      response.on('end', () => resolve({ status: response.statusCode, body, headers: response.headers }));
    }).on('error', reject).end();
  });
  for (const file of ['/', '/kontakt.html', '/assets/css/site.css?v=1', '/site.webmanifest']) {
    assert.equal((await request(file)).status, 200, file);
  }
  for (const file of ['/package.json', '/.git/config', '/docs/qa-output/', '/90_Archiv/',
    '/assets/../package.json', '/assets/%2e%2e/package.json', '/assets/%5c..%5cpackage.json',
    '/assets/%00.png', '/C:/Windows/win.ini', '/assets/images/']) {
    assert.equal((await request(file)).status, 404, file);
  }
  assert.equal((await request('/%ZZ')).status, 400);
  assert.equal((await request('/', 'POST')).status, 405);
  const head = await request('/', 'HEAD');
  assert.equal(head.status, 200); assert.equal(head.body, '');
  assert.equal(head.headers['cache-control'], 'no-store');
  assert.match((await request('/')).body, /<!DOCTYPE html>/, 'Server bleibt nach Fehlanfragen erreichbar');
});
