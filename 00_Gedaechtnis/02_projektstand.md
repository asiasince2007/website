# 02 — Projektstand

> **Diese Inhalte stehen gesammelt in [`gedaechtnis-gesamt.md`](gedaechtnis-gesamt.md).** Jene Datei ist historisch als **eine** durchgehende Wissensdatei geführt worden, deren sieben Abschnitte genau den kanonischen Kerndateien entsprechen. Bei der Vereinheitlichung am 31.07.2026 wurde sie bewusst **nicht** zerschnitten, weil ihre Abschnitte aufeinander verweisen und das Änderungsprotokoll am Ende sie zusammenhält.

Maßgeblich sind **Abschnitt 6 (Offene Punkte für den Inhaber)** und **Abschnitt 7 (Änderungs- und Lernprotokoll, append-only)** der Gesamtdatei sowie [`plan-relaunch.md`](plan-relaunch.md) mit dem phasenweisen Arbeitsplan und seinen Akzeptanzkriterien.

## Neue Einträge

_Neue Standmeldungen können wahlweise hier oder direkt im entsprechenden Abschnitt von `gedaechtnis-gesamt.md` ergänzt werden — aber konsequent an **einer** Stelle. Wird diese Datei genutzt, gehört ein Verweis darauf in den betreffenden Abschnitt der Gesamtdatei._

---

_Angelegt am 31.07.2026._

## Archiviert am 31.07.2026

Das Projekt wurde auf Wunsch des Nutzers nach `ZZ_Archiv_Abgeschlossene-Projekte/` verschoben. Der Stand der Website bleibt unverändert live; der Ordner wird nur nicht mehr aktiv weiterentwickelt.

**Was beim Wiederaufnehmen zuerst zu lesen ist:** `gedaechtnis-gesamt.md` (Abschnitt 5 „Bekannte Fehler & Fixes", `F-01` bis `F-09`) und `plan-relaunch.md`. Die dort offenen Punkte — leere `styles.min.css`, 3,48 MB großes Logo, fehlendes JSON-LD, fehlende Sitemap, Platzhalterbilder — sind zum Zeitpunkt der Archivierung **nicht** erledigt.

## Relaunch auf „Richtung A" am 09.08.2026

Das Projekt wurde trotz Archivierung wieder angefasst: Die in Claude Design
entworfene Richtung A („Ladenschild") ist als echte Multi-Page-Struktur
umgesetzt. Begründungen der Abweichungen stehen in [`03_entscheidungen.md`](03_entscheidungen.md)
(`E-10` bis `E-14`), die dabei aufgetretenen Fehler in
[`04_stolperfallen.md`](04_stolperfallen.md) (`F-10` bis `F-12`).

**Erledigt damit auch:** Platzhalterbilder (jetzt echte Ladenfotos des
Inhabers), JSON-LD auf Start- und Kontaktseite, aktuelle `sitemap.xml`,
Bewertungszahl überall einheitlich 4,4 / 127.

**Stand:** Branch `relaunch-richtung-a`, Pull Request
[#49](https://github.com/asiasince2007/website/pull/49). **Noch nicht live** —
der Merge auf `main` ist der Live-Schritt und wartet auf die Freigabe des
Inhabers.

### Nachgearbeitet am 09.08.2026

Die drei zunächst offenen Punkte sind erledigt:

- **Rechtsseiten** tragen jetzt das neue Design. Der Rechtstext ist
  zeichengenau unverändert (belegt per Textvergleich, 17 bzw. 60 Textblöcke).
- **Lighthouse** erstmals gemessen, mobil: Performance 94–99,
  Accessibility/Best Practices/SEO jeweils 100 über alle geprüften Seiten.
  Definition of Done damit erfüllt.
- **Vorschlags-Dialog** kehrt bewusst nicht zurück, siehe unten.

Dabei zusätzlich gefunden und behoben: ein öffentlich ausgeliefertes
`main.js` mit gültigem Web3Forms-Schlüssel (`F-14`) und eine
Google-widrige Bewertungsweiche in derselben Datei (`F-15`).

### Offen

- **TODO(inhaber):** Den Web3Forms-Schlüssel `f91a4036-…` im Web3Forms-Konto
  ersetzen oder löschen. Er steht in der Git-Historie und lässt sich daraus
  rekonstruieren; das Entfernen aus der ausgelieferten Site genügt nicht.
- Der **Vorschlags-Dialog** bleibt entfallen. Er hing am selben Schlüssel und
  an `api.web3forms.com` in der CSP. Soll er zurück, dann mit neuem Schlüssel
  und **ohne** die Bewertungsweiche aus `F-15`.
- **WebP/AVIF** wären noch rund 96 KB wert, brauchen aber einen Encoder;
  `System.Drawing` kann es nicht.
- Der Umbau `docs/` → `00_Gedaechtnis/` ist seit dem 09.08.2026 committet.
