// QA (P2.1): JSON-LD aus allen HTML-Dateien extrahieren, parsen und NAP prüfen.
const fs = require('fs');

const SOLL = {
  name: 'Asia Markt Thien Phu',
  telephone: '+4921731065590',
  streetAddress: 'Hauptstraße 74',
  postalCode: '40764',
  addressLocality: 'Langenfeld (Rheinland)',
  latitude: 51.1051371,
  longitude: 6.9479852,
};

let fail = 0;
for (const file of fs.readdirSync('.').filter((f) => f.endsWith('.html'))) {
  const html = fs.readFileSync(file, 'utf8');
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const [, raw] of blocks) {
    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      console.error(`${file}: UNGÜLTIGES JSON — ${e.message}`);
      fail++;
      continue;
    }
    const probs = [];
    if (data['@type'] === 'GroceryStore') {
      if (data.name !== SOLL.name) probs.push('name');
      if (data.telephone !== SOLL.telephone) probs.push('telephone');
      if (data.address.streetAddress !== SOLL.streetAddress) probs.push('streetAddress');
      if (data.address.postalCode !== SOLL.postalCode) probs.push('postalCode');
      if (data.address.addressLocality !== SOLL.addressLocality) probs.push('addressLocality');
      if (data.geo.latitude !== SOLL.latitude || data.geo.longitude !== SOLL.longitude) probs.push('geo');
    }
    console.log(`${file}: ${data['@type']} — ${probs.length ? 'ABWEICHUNG: ' + probs.join(',') : 'OK'}`);
    if (probs.length) fail++;
  }
}
process.exit(fail ? 1 : 0);
