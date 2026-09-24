// Aktuelle lokale Messung; kein Zugriff auf PageSpeed-API erforderlich.
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const base = 'http://127.0.0.1:4173';
let server;
try { await fetch(base); } catch {
  server = spawn(process.execPath, ['scripts/dev-server.js'], { stdio: 'ignore', windowsHide: true });
  for (let n=0; n<40; n++) {
    try { await fetch(base); break; } catch { await new Promise(r=>setTimeout(r,100)); }
  }
}
let chrome;
try {
  await mkdir('docs/qa-output', {recursive:true});
  // Eigenes QA-Profil: chrome-launcher loescht sonst unter Windows gelegentlich
  // noch gesperrte Temp-Dateien. Profil bleibt als ignoriertes lokales Artefakt.
  const userDataDir = await mkdtemp(resolve('docs/qa-output/lighthouse-profile-'));
  chrome = await launch({ userDataDir, chromeFlags: ['--headless', '--no-first-run', '--disable-extensions'] });
  const summary = [];
  for (const page of ['index','sortiment','ueber-uns','kontakt','impressum','datenschutz']) {
    const { lhr } = await lighthouse(`${base}/${page}.html`, { port: chrome.port, logLevel:'error',
      onlyCategories:['performance','accessibility','best-practices','seo'], output:'json', maxWaitForLoad:30000 });
    await writeFile(`docs/qa-output/lighthouse-${page}.json`, JSON.stringify(lhr));
    const row = {page, measuredAt:lhr.fetchTime, scores:Object.fromEntries(Object.entries(lhr.categories).map(([k,v])=>[k,Math.round(v.score*100)])),
      lcp:lhr.audits['largest-contentful-paint'].numericValue, cls:lhr.audits['cumulative-layout-shift'].numericValue};
    summary.push(row); console.log(JSON.stringify(row));
    if (lhr.runtimeError || Object.values(row.scores).some(score=>score<90)) process.exitCode=1;
  }
  await writeFile('docs/qa-output/lighthouse-summary.json', JSON.stringify(summary,null,2));
} finally { if (chrome) await chrome.kill(); if (server) server.kill(); }
