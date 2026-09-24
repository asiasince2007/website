# 05 — Konventionen

> **Diese Inhalte stehen gesammelt in [`gedaechtnis-gesamt.md`](gedaechtnis-gesamt.md).** Jene Datei ist historisch als **eine** durchgehende Wissensdatei geführt worden, deren sieben Abschnitte genau den kanonischen Kerndateien entsprechen. Bei der Vereinheitlichung am 31.07.2026 wurde sie bewusst **nicht** zerschnitten, weil ihre Abschnitte aufeinander verweisen und das Änderungsprotokoll am Ende sie zusammenhält.

Maßgeblich ist **Abschnitt 4 (Konventionen)** der Gesamtdatei, ergänzt um die Verzeichnis- und Build-Konventionen in [`../CLAUDE.md`](../CLAUDE.md).

## Neue Einträge

### Gestaltung nach E-43, 24.09.2026

Klassische Ladenansicht aus Schaufensterrot, Naturtönen, lokal vorhandener Lora für Überschriften und Systemschrift Arial für Fließtext. Texte und Fotos sind eigenständige Inhalte; keine neuen Geschäftsaussagen aus einer Designentscheidung ableiten. Keine Scroll-Reveals oder anfängliche Unsichtbarkeit. Bei weiteren reinen Darstellungsaufträgen Inhalt und SEO gegen einen benannten Ausgangscommit vergleichen. `scripts/qa-design-preservation.cjs` dokumentiert speziell diesen Umbau gegen `3e1e459`; es ist kein dauerhafter Inhaltsstopp für spätere ausdrücklich beauftragte Textpflege. Aktuelle Assetversion `2026092403`.

### Aktive Websitepflege, 24.09.2026

**Letzter Inhabernachtrag hat Vorrang:** NRW-Feiertage immer geschlossen, keine pauschalen Feiertagswarnungen. Kurzer Hinweis auf kurzfristige Schließungen. 24./31. Dezember vorläufig 9 bis 14 Uhr, endgültige Bestätigung als TODO. „bis“ statt Halb-/Geviertstrich auch in Zeitspannen/Metadaten. Keine Gruppenbuttons auf der kurzen Sortimentsseite. Aktuell 4,4 Sterne bei 128 Google-Bewertungen, im Live-Embed bestätigt. Keine pauschalen Link-Disclaimer; Quellen klar extern kennzeichnen. Details E-38 bis E-40.

- Maßgeblich sind `site.css`/`site.js`, sechs HTML-Seiten und `/route.html`. Tailwind- und alte Modal-/Marquee-Tests sind historische Quellen.
- Sonderzeiten nur mit Bestätigungsdatum nach [Pflegeanleitung](oeffnungszeiten-pflegen.md), keine realen Ausnahmezeiten aus Testdaten übernehmen. Standortzeit Berlin, Feiertage NRW; statische Wochenzeiten erhalten.
- Cloudflare-E-Mail-Obfuscation gemäß E-34 erhalten. Live-Prüfung nach Deployment ist ein anderer Nachweis als lokales HTML ohne Cloudflare.
- CSS-/JS-Cacheversionen überall synchron; Sitemap-`lastmod` nur für tatsächliche Änderungen. Name, Anschrift, Telefon und reguläre Zeiten in sichtbarem HTML und JSON-LD konsistent halten.
- Neue Tests in `tests/`, Messungen über `npm test` und `npm run qa:lighthouse`. Rohdaten/Screenshots/temporäre Browserprofile unter `docs/qa-output/` lokal ignoriert, knapper dauerhafter Prüfbericht im Gedächtnis. Layoutbreiten 320/390/768/1280 px, Reveal-Inhalte sichtbar prüfen.
- Aktuellen Stand von Quellen und Grenzen dokumentieren; präzise Bewertungsanzahlen sind optional. Durchschnitts-Prüfdatum nicht mit Veröffentlichungsdatum alter Zitate verwechseln. Parkregeln der Stadt begründen noch nicht den konkreten Stellplatztarif.

_Neue Konventionen können wahlweise hier oder direkt im entsprechenden Abschnitt von `gedaechtnis-gesamt.md` ergänzt werden — aber konsequent an **einer** Stelle. Wird diese Datei genutzt, gehört ein Verweis darauf in den betreffenden Abschnitt der Gesamtdatei._

---

_Angelegt am 31.07.2026._
