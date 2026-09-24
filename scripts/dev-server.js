// Lokale Vorschau des öffentlichen Dateibaums, ausschließlich auf Loopback.
// Kein Produktionsserver und keine Nachbildung der Cloudflare-Funktionen.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { ROOT, PUBLIC_FILES } = require('./site-files.js');
const PORT = Number(process.env.PORT || 4173);
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

function createServer() {
  return http.createServer((req, res) => {
    const reply = (code, text) => {
      res.writeHead(code, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(text);
    };
    if (!['GET', 'HEAD'].includes(req.method)) {
      res.setHeader('Allow', 'GET, HEAD');
      return reply(405, 'Method not allowed');
    }
    let urlPath;
    // Ungültige Prozentkodierung darf nicht den gesamten Vorschauprozess beenden.
    try { urlPath = decodeURIComponent(req.url.split('?')[0]); }
    catch { return reply(400, 'Bad request'); }
    if (/[\\\0:]/.test(urlPath) || urlPath.split('/').some(part => part.startsWith('.'))) {
      return reply(404, 'Not found');
    }
    const relative = urlPath === '/' ? 'index.html' : urlPath.replace(/^\//, '');
    if (!PUBLIC_FILES.includes(relative) && !relative.startsWith('assets/')) {
      return reply(404, 'Not found');
    }
    const file = path.resolve(ROOT, relative);
    if (!file.startsWith(ROOT + path.sep)) return reply(404, 'Not found');
    fs.stat(file, (error, stat) => {
      if (error || !stat.isFile()) return reply(404, 'Not found');
      // realpath verhindert auch das Ausliefern eines lokalen Symlink-Ziels außerhalb des Repos.
      fs.realpath(file, (realError, realFile) => {
        if (realError || !realFile.startsWith(ROOT + path.sep)) return reply(404, 'Not found');
        const headers = {
          'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
          'Cache-Control': 'no-store',
          'Content-Length': stat.size,
        };
        if (req.method === 'HEAD') { res.writeHead(200, headers); return res.end(); }
        const stream = fs.createReadStream(realFile);
        stream.on('error', () => {
          if (!res.headersSent) reply(500, 'Read error');
          else res.destroy();
        });
        stream.on('open', () => { res.writeHead(200, headers); stream.pipe(res); });
      });
    });
  });
}

if (require.main === module) {
  createServer().listen(PORT, '127.0.0.1', () => console.log(`Dev-Server: http://127.0.0.1:${PORT}/`));
}
module.exports = { createServer };
