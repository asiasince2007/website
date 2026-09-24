// Reproduzierbare Größen des bestehenden Logos für Tabs und Lesezeichen.
// Nur Kreiszuschnitt und Skalierung per Canvas; keine Neuzeichnung des Logos.
// Quelle: unverändertes Inhaberoriginal in design/thien_phu_logo.png (2048²).
// Der grüne Ring liegt um (1024,1024). Radius 936 erhält auch die vier Goldpunkte.
const { chromium } = require('@playwright/test');
const { readFileSync, writeFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { inflateSync, deflateSync, crc32 } = require('node:zlib');
const { ROOT } = require('./site-files.js');

// Browser-PNGs verlustfrei nachkomprimieren; Pixel und Transparenz bleiben identisch.
function compressPng(png) {
  const chunks = [], data = [];
  for (let offset = 8; offset < png.length;) {
    const length = png.readUInt32BE(offset);
    const chunk = png.subarray(offset, offset + length + 12);
    if (chunk.toString('ascii', 4, 8) === 'IDAT') data.push(chunk.subarray(8, -4));
    else chunks.push(chunk);
    offset += length + 12;
  }
  const payload = deflateSync(inflateSync(Buffer.concat(data)), { level: 9 });
  const idat = Buffer.alloc(payload.length + 12);
  idat.writeUInt32BE(payload.length); idat.write('IDAT', 4); payload.copy(idat, 8);
  idat.writeUInt32BE(crc32(idat.subarray(4, -4)), idat.length - 4);
  return Buffer.concat([png.subarray(0, 8), ...chunks.slice(0, -1), idat, chunks.at(-1)]);
}

async function main() {
  const browser = await chromium.launch({ channel: process.env.CI ? undefined : 'chrome' });
  try {
    const page = await browser.newPage();
    const source = readFileSync(resolve(ROOT, 'design/thien_phu_logo.png')).toString('base64');
    const images = await page.evaluate(async source => {
      const image = new Image();
      image.src = 'data:image/png;base64,' + source;
      await image.decode();
      if (image.width !== 2048 || image.height !== 2048) throw new Error('Logoquelle geändert: Zuschnitt neu prüfen.');
      const output = {};
      for (const size of [16, 32, 48, 180, 192, 512]) {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = size;
        const context = canvas.getContext('2d');
        context.imageSmoothingQuality = 'high';
        context.beginPath();
        context.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
        context.clip();
        context.drawImage(image, 88, 88, 1872, 1872, 0, 0, size, size);
        output[size] = canvas.toDataURL('image/png').split(',')[1];
      }
      return output;
    }, source);
    for (const [size, file] of [[180, 'apple-touch-icon.png'], [192, 'icon-192.png'], [512, 'icon-512.png']]) {
      writeFileSync(resolve(ROOT, 'assets/images', file), compressPng(Buffer.from(images[size], 'base64')));
    }
    // ICO-Verzeichnis mit drei PNG-Bildern. Alle Größen haben echte Alpha-Transparenz.
    const sizes = [16, 32, 48];
    const header = Buffer.alloc(6 + sizes.length * 16);
    header.writeUInt16LE(1, 2);
    header.writeUInt16LE(sizes.length, 4);
    let offset = header.length;
    const payloads = sizes.map((size, index) => {
      const png = Buffer.from(images[size], 'base64');
      const entry = 6 + index * 16;
      header[entry] = header[entry + 1] = size;
      header.writeUInt16LE(1, entry + 4);
      header.writeUInt16LE(32, entry + 6);
      header.writeUInt32LE(png.length, entry + 8);
      header.writeUInt32LE(offset, entry + 12);
      offset += png.length;
      return png;
    });
    writeFileSync(resolve(ROOT, 'favicon.ico'), Buffer.concat([header, ...payloads]));
    console.log('Runde Icons erzeugt: ICO 16/32/48, PNG 180/192/512.');
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
