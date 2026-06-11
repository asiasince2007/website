// Einmalig (P6.2): Lora + Nunito von Google Fonts herunterladen und @font-face-CSS erzeugen.
const fs = require('fs');
const path = require('path');

const CSS_URL = 'https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Nunito:wght@400;500;600;700&display=swap';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

(async () => {
  const css = await (await fetch(CSS_URL, { headers: { 'User-Agent': UA } })).text();
  fs.mkdirSync('assets/fonts', { recursive: true });

  // Blöcke parsen: Kommentar (/* latin */) + @font-face
  const blocks = [...css.matchAll(/\/\* ([a-z-]+) \*\/\s*@font-face \{([\s\S]*?)\}/g)];
  let out = '/* Selbst gehostete Fonts (P6.2, DSGVO) — generiert via scripts/fetch-fonts.js */\n';
  let downloaded = 0;

  for (const [, subset, body] of blocks) {
    if (!['latin', 'latin-ext'].includes(subset)) continue;
    const family = body.match(/font-family: '([^']+)'/)[1];
    const weight = body.match(/font-weight: (\d+)/)[1];
    const url = body.match(/url\((https:[^)]+\.woff2)\)/)[1];
    const range = body.match(/unicode-range: ([^;]+);/)[1];
    const file = `${family.toLowerCase()}-${weight}-${subset}.woff2`;
    const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
    fs.writeFileSync(path.join('assets/fonts', file), buf);
    downloaded++;
    out += `@font-face {\n  font-family: '${family}';\n  font-style: normal;\n  font-weight: ${weight};\n  font-display: swap;\n  src: url('../fonts/${file}') format('woff2');\n  unicode-range: ${range};\n}\n`;
  }

  fs.writeFileSync('assets/css/fonts.css', out);
  console.log(`OK: ${downloaded} woff2-Dateien + assets/css/fonts.css`);
})();
