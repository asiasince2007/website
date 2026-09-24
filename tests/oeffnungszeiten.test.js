const { test } = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { status, nrwFeiertage, config } = require('../assets/js/site.js');

test('alle elf NRW-Feiertage 2026, mit korrekten beweglichen Feiertagen', () => {
  assert.deepEqual(Object.keys(nrwFeiertage(2026)).sort(), [
    '2026-01-01', '2026-04-03', '2026-04-06', '2026-05-01', '2026-05-14',
    '2026-05-25', '2026-06-04', '2026-10-03', '2026-11-01', '2026-12-25', '2026-12-26'
  ]);
  for (const date of Object.keys(nrwFeiertage(2026))) {
    const s = status(new Date(date + 'T10:00:00Z'));
    assert.equal(s.offen, false, date);
    assert.notEqual(s.unklar, true, date);
    assert.match(s.text, /Heute geschlossen/);
    assert.doesNotMatch(s.text, /telefonisch prüfen/);
  }
});

test('NRW-Grenzen: Heilige Drei Könige und Reformationstag sind reguläre Tage', () => {
  assert.equal(status(new Date('2026-01-06T10:00:00Z')).offen, true);
  assert.equal(status(new Date('2026-10-31T10:00:00Z')).offen, true);
});

test('Osterberechnung über Jahreswechsel und Schaltjahre', () => {
  assert.equal(nrwFeiertage(2027)['2027-03-26'], 'Karfreitag');
  assert.equal(nrwFeiertage(2028)['2028-06-15'], 'Fronleichnam');
  assert.equal(nrwFeiertage(2024)['2024-04-01'], 'Ostermontag');
});

test('Wochenzeiten öffnen einschließlich 09:00 und schließen ausschließlich Endzeit', () => {
  assert.match(status(new Date('2026-09-24T06:59:00Z')).text, /öffnet heute um 9 Uhr/);
  assert.equal(status(new Date('2026-09-24T07:00:00Z')).offen, true);
  assert.equal(status(new Date('2026-09-24T15:59:59Z')).offen, true);
  assert.match(status(new Date('2026-09-24T16:00:00Z')).text, /öffnet morgen um 9 Uhr/);
  assert.equal(status(new Date('2026-09-26T11:59:00Z')).offen, true);
  assert.match(status(new Date('2026-09-26T12:00:00Z')).text, /Montag um 9 Uhr/);
  assert.match(status(new Date('2026-09-27T10:00:00Z')).text, /morgen um 9 Uhr/);
});

test('Standortzeit unabhängig vom Betriebssystem einschließlich Mitternacht und DST', () => {
  const inputs = ['2026-09-24T08:00:00Z', '2026-10-02T22:15:00Z',
    '2026-03-29T00:30:00Z', '2026-03-29T01:30:00Z',
    '2026-10-25T00:30:00Z', '2026-10-25T01:30:00Z', '2026-01-05T08:00:00Z'];
  const source = `const {status}=require('./assets/js/site.js'); console.log(JSON.stringify(${JSON.stringify(inputs)}.map(d=>status(new Date(d)))));`;
  const values = ['Europe/Berlin', 'UTC', 'Pacific/Honolulu', 'Asia/Tokyo'].map(TZ =>
    execFileSync(process.execPath, ['-e', source], { cwd: require('node:path').resolve(__dirname, '..'), env: { ...process.env, TZ }, encoding: 'utf8' }));
  values.forEach(v => assert.equal(v, values[0]));
  assert.match(status(new Date(inputs[1])).text, /Heute geschlossen \(Tag der Deutschen Einheit\)/, 'In Berlin bereits 3. Oktober');
  assert.equal(status(new Date(inputs[6])).offen, true, 'Winterzeit 09:00');
});

test('Nächste Öffnung überspringt die bestätigten Feiertagsschließungen', () => {
  const s = status(new Date('2026-10-02T17:00:00Z'));
  assert.match(s.text, /öffnet Montag um 9 Uhr/);
  assert.doesNotMatch(s.text, /Sonderzeiten bitte prüfen/);
  const year = status(new Date('2026-12-30T18:00:00Z'));
  assert.match(year.text, /Samstag um 9 Uhr/);
});

test('Heiligabend und Silvester bleiben ohne Bestätigung ungeklärt', () => {
  assert.equal(status(new Date('2026-12-24T14:00:00Z')).unklar, true);
  assert.equal(status(new Date('2026-12-31T10:00:00Z')).unklar, true);
  assert.equal(nrwFeiertage(2026)['2026-12-24'], undefined, 'kein NRW-Feiertag');
});

test('Bestätigte Sonderzeiten, Mittagspause und Schließtage haben Vorrang', () => {
  const c = structuredClone(config);
  c.ausnahmen['2026-10-02'] = { zeiten: [['10:00', '12:00'], ['13:30', '15:00']], bestaetigtAm: '2026-09-24' };
  assert.equal(status(new Date('2026-10-02T08:00:00Z'), c).offen, true);
  assert.match(status(new Date('2026-10-02T10:00:00Z'), c).text, /heute um 13:30 Uhr/);
  assert.equal(status(new Date('2026-10-02T13:00:00Z'), c).offen, false);
  c.ausnahmen['2026-10-05'] = { zeiten: [], bestaetigtAm: '2026-09-24' };
  assert.match(status(new Date('2026-10-02T17:00:00Z'), c).text, /öffnet Dienstag um 9 Uhr/);
});

test('Feiertage bleiben auch bei einem widersprüchlichen Ausnahme-Eintrag geschlossen', () => {
  const c = structuredClone(config);
  c.ausnahmen['2026-10-03'] = { zeiten: [['09:00','18:00']], bestaetigtAm:'2026-09-24' };
  const s = status(new Date('2026-10-03T10:00:00Z'),c);
  assert.equal(s.offen,false);
  assert.match(s.text,/Heute geschlossen/);
});

test('Unbestätigte oder ungültige Ausnahmen behaupten niemals geöffnet', () => {
  for (const entry of [{ zeiten: [['09:00','18:00']] },
    { zeiten: [['25:00','26:00']], bestaetigtAm: '2026-09-24' },
    { zeiten: [['14:00','10:00']], bestaetigtAm: '2026-09-24' },
    { zeiten: [['09:00','15:00'],['14:00','16:00']], bestaetigtAm: '2026-09-24' }]) {
    const c = structuredClone(config); c.ausnahmen['2026-09-24'] = entry;
    assert.equal(status(new Date('2026-09-24T10:00:00Z'), c).unklar, true);
  }
});

test('Betriebsferien länger als eine Woche werden bis zum nächsten Termin übersprungen', () => {
  const c = structuredClone(config);
  for (let d = 24; d <= 30; d++) c.ausnahmen['2026-09-' + d] = { zeiten: [], bestaetigtAm: '2026-09-24' };
  assert.match(status(new Date('2026-09-24T10:00:00Z'), c).text, /Donnerstag, 1\.10\. um 9 Uhr/);
});

test('Fehlerhafte Gerätezeit hat einen neutralen Rückfall', () => {
  assert.equal(status(new Date('invalid')).unklar, true);
});
