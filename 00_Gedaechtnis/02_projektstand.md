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

## Rechtsprüfung der Rechtsseiten am 12.08.2026

Impressum und Datenschutzerklärung sind gegen den tatsächlich ausgelieferten Code
und gegen den Rechtsstand vom 12.08.2026 geprüft worden. **Nur Analyse, keine
Änderung an den Seiten.** Acht Befunde, davon fünf mit realem Abmahnrisiko:

1. **Die Datenschutzerklärung beschreibt drei Verarbeitungen, die es nicht mehr
   gibt** — die beiden Web3Forms-Formulare (`datenschutz.html:175`), Cloudflare Web
   Analytics (`:218`) und Font Awesome (`:213`). Alle drei sind mit dem Relaunch am
   09.08.2026 entfallen; die Erklärung ist mitgezogen worden. Besonders heikel ist
   die Behauptung, man stütze sich gegenüber Web3Forms auf Standardvertragsklauseln
   (`:194`) — wenn nie welche geschlossen wurden, ist das eine unwahre Angabe.
2. **`§ 5 TMG`** (`impressum.html:130`) und **`§§ 7 bis 10 TMG`** (`:169`) zitieren
   ein Gesetz, das am 14.05.2024 außer Kraft getreten ist. Zuständig ist jetzt das DDG.
3. **Der OS-Plattform-Hinweis** (`impressum.html:158`) verweist auf eine Plattform,
   die die EU zum 20.07.2025 abgeschaltet hat (VO (EU) 2024/3228). Die Hinweispflicht
   ist entfallen, der Hinweis muss weg.
4. **Ohne JavaScript steht im Impressum keine E-Mail-Adresse.** `site.js:165` setzt
   sie erst im Browser zusammen; im HTML steht nur `…` (`impressum.html:143`).
   § 5 Abs. 1 Nr. 2 DDG verlangt „unmittelbar erreichbar und ständig verfügbar".
5. **Die drei Bewertungszitate auf der Startseite** (`index.html:215`) tragen keinen
   Hinweis nach § 5b Abs. 3 UWG, ob und wie die Echtheit sichergestellt wird.

Dazu drei mittlere Befunde (doppelte Rechtsgrundlage bei Google Maps, fehlende
Speicherdauer der Server-Logs, überholter Drittland-Abschnitt) und eine Reihe
ausdrücklicher Entwarnungen: `§ 18 Abs. 2 MStV` und `§ 25 TDDDG` sind korrekt
zitiert, die Zwei-Klick-Karte ist technisch sauber (vor dem Klick geht wirklich
kein Request an Google), Cookie-Banner zu Recht nicht vorhanden, AGB und
Widerrufsbelehrung mangels Vertragsschluss nicht nötig, BFSG nicht anwendbar.

**Offen, nur vom Inhaber zu klären:** Umsatzsteuer-Identifikationsnummer vorhanden?
Zehn oder weniger Beschäftigte (§ 36 Abs. 3 VSBG)? Wurden mit Web3Forms je
Standardvertragsklauseln geschlossen?

### Am selben Tag behoben und live gestellt

Alle acht Befunde sind umgesetzt, siehe [`03_entscheidungen.md`](03_entscheidungen.md)
(`E-20` bis `E-24`). Die Datenschutzerklärung ist von neun auf elf Abschnitte
umgebaut: Web3Forms, Cloudflare, Tailwind und Font Awesome sind ersatzlos raus,
Google Maps steht jetzt auf einer einzigen Rechtsgrundlage (Art. 6 Abs. 1 lit. a
DSGVO, § 25 Abs. 1 TDDDG) und hat einen Widerruf, die Server-Protokolle haben eine
Angabe zur Speicherdauer, das Widerspruchsrecht nach Art. 21 DSGVO steht gesondert
in einem eigenen Abschnitt.

**Korrektur an der eigenen Analyse:** Die §§ 8 bis 10 DDG sind **nicht** die
Nachfolger der §§ 8 bis 10 TMG — das DDG regelt dort Sperrungsanspruch,
Anbieterlisten und Auskunftsverlangen. Die Haftungsprivilegien stehen seit dem
17.02.2024 in Art. 4 bis 6 DSA, das Überwachungsverbot in Art. 8 DSA; § 7 Abs. 1
DDG verweist nur darauf. Wer beim Umschreiben eines Impressums schlicht „TMG"
durch „DDG" ersetzt, zitiert falsch. Gehört auch in
[`04_stolperfallen.md`](04_stolperfallen.md).

**Nicht nachgemessen:** Lighthouse ist nach diesen Änderungen nicht erneut
gelaufen. Die Eingriffe sind fast nur Text; hinzugekommen sind ein Knopf und vier
CSS-Zeilen, weggefallen ist ein erlaubter Fremd-Host in der CSP. Ein Einbruch der
Werte ist nicht zu erwarten, belegt ist er aber nicht.
