// Einmaliges Migrationsskript (P1.3): ersetzt alle Font-Awesome-<i>-Tags
// in den HTML-Dateien durch Inline-SVGs (Pfaddaten aus den offiziellen FA-Paketen).
const fs = require('fs');
const path = require('path');

const packs = {
  solid: require('@fortawesome/free-solid-svg-icons'),
  regular: require('@fortawesome/free-regular-svg-icons'),
  brands: require('@fortawesome/free-brands-svg-icons'),
};

function camel(name) {
  return 'fa' + name.split('-').map((p) => p[0].toUpperCase() + p.slice(1)).join('');
}

function toSvg(style, name, extraClasses) {
  const icon = packs[style][camel(name)];
  if (!icon) throw new Error(`Icon nicht gefunden: ${style}/${name}`);
  const [w, h, , , d] = icon.icon;
  const paths = Array.isArray(d) ? d : [d];
  const cls = ('svg-icon ' + extraClasses.trim()).trim();
  return (
    `<svg class="${cls}" viewBox="0 0 ${w} ${h}" fill="currentColor" aria-hidden="true">` +
    paths.map((p) => `<path d="${p}"/>`).join('') +
    `</svg>`
  );
}

const re = /<i class="fa-(solid|regular|brands) fa-([a-z0-9-]+)((?:\s[^"]*)?)"(?:\s+aria-hidden="true")?\s*><\/i>/g;

let total = 0;
for (const file of fs.readdirSync('.').filter((f) => f.endsWith('.html'))) {
  const src = fs.readFileSync(file, 'utf8');
  let count = 0;
  const out = src.replace(re, (m, style, name, extra) => {
    count++;
    return toSvg(style, name, extra);
  });
  if (count) {
    fs.writeFileSync(file, out);
    console.log(`${file}: ${count} Icons ersetzt`);
    total += count;
  }
  const rest = (out.match(/<i class="fa-/g) || []).length;
  if (rest) console.warn(`  WARNUNG: ${rest} nicht erfasste FA-Tags in ${file}`);
}
console.log(`Gesamt: ${total}`);
