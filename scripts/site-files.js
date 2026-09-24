// Gemeinsames Inventar für lokale Vorschau, Strukturtests und Messungen.
// Die sechs Inhaltsseiten sind eigenständiges HTML; route.html ist nur Weiterleitung.
const path = require('node:path');
const ROOT = path.resolve(__dirname, '..');
const PAGES = ['index.html', 'sortiment.html', 'ueber-uns.html', 'kontakt.html', 'impressum.html', 'datenschutz.html'];
const PUBLIC_FILES = [...PAGES, 'route.html', 'favicon.ico', 'site.webmanifest', 'robots.txt', 'sitemap.xml', 'CNAME'];
module.exports = { ROOT, PAGES, PUBLIC_FILES };
