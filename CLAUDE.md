# CLAUDE.md — Projektleitfaden für Claude Code

> **Aktiver Stand: 24.09.2026.** Statische Mehrseitenwebsite mit `site.css`/`site.js`; `main` wird über GitHub Pages und Cloudflare öffentlich ausgeliefert. Aktuelle Anleitung: `README.md`. Historische Projekteinstufung und Tailwind-Pläne sind überholt.

> Dieses Repo ist die Website von **Asia Markt Thien Phu**, einem inhabergeführten
> asiatischen Lebensmittelgeschäft in Langenfeld (Rheinland).
> Live: https://www.asiamarkt.info/ · Hosting: GitHub Pages · Repo: `asiasince2007/website`

> **Projektübergreifender Kanon.** Der folgende Block ist in *allen* Projekten identisch.
> Die projektspezifischen Regeln stehen darunter. Architektur aller Projekte: `../../00_META_Projektarchitektur.md`.

## Pflicht-Workflow (gilt unverändert für jede Sitzung in jedem Projekt)

1. **Vor der Arbeit:** `README.md` lesen, danach alle Dateien in `00_Gedaechtnis/` in der Reihenfolge `01` → `05`. Ohne diesen Schritt nicht mit der eigentlichen Aufgabe beginnen.
2. **Während der Arbeit:** Ordnerstruktur, Nummerierungspräfixe und Namensschemata nicht verändern. Neue Dateien fügen sich in die bestehenden Schemata ein (siehe `00_Gedaechtnis/05_konventionen.md`).
3. **Nach der Arbeit:** `00_Gedaechtnis/02_projektstand.md` fortschreiben (Ist-Zustand, offene Fragen, Datum). Neue Entscheidungen samt verworfener Alternative nach `03_entscheidungen.md`; jeder Fehler mit *Was passiert ist · Warum · Wie behoben · Wie künftig vermieden* nach `04_stolperfallen.md`; neue Regeln nach `05_konventionen.md`. Jeden neuen Gedächtniseintrag mit einer Zeile in `_INDEX.md` verlinken.
4. **Nicht projektspezifische Technikfehler** (Werkzeug-, Dateisystem-, Encoding-, Timeout-Probleme) gehören **zusätzlich** in `../../00_UNIVERSAL_Technikgedaechtnis.md` — dort steht das projektübergreifende Erfahrungswissen, das eine Sitzung vor bereits gemachten Fehlern bewahrt.

## Kanonische Gedächtnisstruktur

| Datei | Inhalt | Zeitrichtung |
|---|---|---|
| `00_Gedaechtnis/_INDEX.md` | eine Zeile pro Eintrag, Einstiegspunkt | — |
| `00_Gedaechtnis/01_kontext.md` | Wer, was, warum; dauerhafte Rahmenbedingungen | dauerhaft |
| `00_Gedaechtnis/02_projektstand.md` | Ist-Zustand, offene Fragen, nächster Schritt | Gegenwart |
| `00_Gedaechtnis/03_entscheidungen.md` | getroffene Entscheidungen **mit** Begründung und verworfener Alternative | Vergangenheit mit Bindung |
| `00_Gedaechtnis/04_stolperfallen.md` | Fehler, Ursache, Fix, Vermeidung | Vergangenheit als Warnung |
| `00_Gedaechtnis/05_konventionen.md` | projektspezifische Namens-, Format- und Fachregeln | Zukunft als Regel |

Weitere thematische Einträge liegen als `<thema>_<JJJJ-MM-TT>.md` daneben und werden im `_INDEX.md` verlinkt.

## Sprache und Darstellung

Durchgängig **Deutsch**. Zentrale Fachbegriffe bei Erstnennung zusätzlich mit dem exakten englischen Fachterm in Klammern. Konzeptionelle Erklärungen, Argumentationsketten und Herleitungen als kohärenter **Fließtext**, nicht als zerhackte Stichpunktliste; Bulletpoints und Tabellen ausschließlich für echte Aufzählungen. Mathematik in sauberem LaTeX (`\cdot` statt `*`, Dezimalkomma als `0{,}5`, Brüche als `\frac{}{}`). Bei Herleitungen gilt die Null-Vorwissen-Regel: kein Zwischenschritt wird übersprungen, jede Variable wird einzeln benannt und erklärt.

## Was in diesem Projekt nicht getan werden soll

- **Keine Datei löschen.** Abgelöste Fassungen wandern nach `90_Archiv/` — mit Versionsnummer und Datum im Namen, nie in den Papierkorb.
- **Keine Parallelversionen** (`_v2`, `_neu`, `_final`, `_Update`) neben der aktiven Datei. Pro Thema existiert genau eine maßgebliche Datei; ihr Name ändert sich beim Versionswechsel **nicht**, damit Verlinkungen stabil bleiben.
- **Vor jeder Umbenennung** den Zielnamen **case-insensitiv** gegen den Zielordner prüfen. Windows/NTFS unterscheidet Groß- und Kleinschreibung nicht; ein Rename, der sich nur darin unterscheidet, überschreibt die bestehende Datei kommentarlos. Dieser Fehler hat in diesem Projektverbund bereits Daten vernichtet.
- **Nichts erfinden.** Unbelegtes wird als `TODO(phu)` markiert statt geraten. Eine Einzelaussage ist ein Einzeldatenpunkt und keine Regel.

## Wichtigste Regeln für die autonome Umsetzung

1. **Lies zuerst `00_Gedaechtnis/gedaechtnis-gesamt.md`** — dort stehen verbindliche Fakten (NAP, Öffnungszeiten),
   getroffene Architektur­entscheidungen, bekannte Fehler und ihre Fixes. Aktualisiere diese
   Datei nach jeder Sitzung (Abschnitt „Änderungs- & Lernprotokoll").
2. **Lies den aktuellen Stand in `00_Gedaechtnis/02_projektstand.md`.** Die Kundenanalyse und ihre Umsetzung vom 24.09.2026 sind maßgeblich. Der Juni-Relaunchplan ist Historie und keine aktuelle offene Aufgabenliste.
3. **NAP-Konsistenz ist heilig.** Name, Adresse, Telefon müssen exakt mit dem Google
   Business Profile übereinstimmen — überall identisch (Footer, Kontakt, Schema, Impressum).
   Siehe `00_Gedaechtnis/gedaechtnis-gesamt.md` → „Stammdaten (NAP)".
4. **Keine Erfindungen.** Produkte, Marken, Preise, Bewertungen oder Aussagen nur verwenden,
   wenn sie belegt sind. Im Zweifel als `TODO(inhaber)` markieren statt zu erfinden.
5. **Sprache:** ausschließlich Deutsch (Entscheidung des Inhabers). Kein i18n/hreflang nötig.
6. **Es ist KEIN Online-Shop.** Conversion-Ziele sind: Anruf, Routenplanung, Google-Bewertung,
   vollständiges Google-Profil. Niemals Warenkorb/Checkout oder einen unbelegten WhatsApp-Kontakt bauen.

## Aktiver Stack und fachliche Regeln

- Aktuelle veröffentlichte Gestaltung nach E-43: klassischer Geschäftskopf, vorhandene Lora-Überschriften, Arial-Fließtext, Schaufensterrot/Naturtöne, keine Scroll-Reveals. Alle sechs HTML-Bodies und SEO-Angaben unverändert gegen `3e1e459`; Nachweis über `node scripts/qa-design-preservation.cjs`. Aktuelle Cacheversion `2026092403`. Vollständige Analyse und Prüfgrenzen: `00_Gedaechtnis/gestaltungsanalyse_2026-09-24.md`. Mit PR #54/Merge `539d6b8` veröffentlicht; Pages-Lauf `36014734951` erfolgreich, anschließend aktuelle Live-Prüfung einschließlich Cloudflare/Karte/Route.

- Sechs statische Inhaltsseiten plus `/route.html`, aktive Dateien `assets/css/site.css` und `assets/js/site.js`. Keine Framework- oder Tailwind-Migration. Vorhandene URLs, Gestaltung und Geschäftsidentität erhalten.
- Öffnungsstatus ausschließlich in `Europe/Berlin`; elf NRW-Feiertage sind laut Inhaber **immer geschlossen** (Nachtrag 24.09.2026). Heiligabend/Silvester: 9 bis 14 Uhr vorläufig vorgemerkt, erst nach endgültiger Bestätigung veröffentlichen. Bestätigte Ausnahmen in `OEFFNUNGSZEITEN`, Anleitung: `00_Gedaechtnis/oeffnungszeiten-pflegen.md`. Feste Feiertagsschließung hat Vorrang vor versehentlichen Öffnungseinträgen.
- Navigation und reguläre Zeiten bleiben ohne JavaScript erreichbar. **Cloudflare-Obfuscation bleibt ausdrücklich aktiv (Inhaberentscheidung 24.09.2026, E-34). Keine `email_off`-Ausnahme.** Lokaler E-Mail-Klartext belegt nicht die Live-Darstellung.
- Routenaktionen weiter über `/route.html`. Google Maps erst nach Freigabe laden und wieder ausblendbar halten. Vor Freigabe keine Google-Anfragen.
- Öffentliche Parkregeln von belegten Bedingungen konkreter Stellplätze trennen. Quellen und Datum sichtbar führen. E-Parkregel nach dem 31.12.2026 neu prüfen.
- Aktuell 4,4 Sterne bei 128 Bewertungen, Stand 24.09.2026, zuletzt im echten Google-Embed visuell bestätigt. Durchschnitt und Zitatdaten getrennt pflegen; keine `aggregateRating`-Eigenbewertung im Schema. Neue Werte nur nach Quellenprüfung.
- Sichtbare Texte und Metadaten ohne Halb-/Geviertstriche, Zeitspannen mit „bis“. Sortiments-Sprungbuttons auf Wunsch entfernt. Kurzer Schließungshinweis statt pauschaler Feiertagsunsicherheit. Kein pauschaler Linkhaftungsausschluss im Datenschutz; Stadtseiten klar als externe Quellen bezeichnen. Begründung/Quellen: `00_Gedaechtnis/nacharbeit-kundenangaben_2026-09-24.md`.

## Build & Deploy

```bash
npm ci
npm run dev           # Port 4173, kein Build für die aktive Website
npm test              # aktive Logik, Struktur, JSON-LD und Browser
npm run qa:lighthouse # aktuelle lokale Mobilmessung
# Deploy: Push auf main → GitHub Pages (CNAME: www.asiamarkt.info)
```

Node ab 22.19 und Chrome erforderlich, weitere Hinweise in README. Historischer CSS-Build heißt ausdrücklich `legacy:build:css`. Am 24.09.2026 hat der Inhaber Push und Merge am Ende der geprüften Umsetzung autorisiert. Nach Deployment reale Auslieferung einschließlich Cloudflare-E-Mail, Karte und Cacheversionen prüfen.

## Verzeichnis-Konventionen

- `00_Gedaechtnis/` — aktives Projektgedächtnis, vom Pages-Output ausgeschlossen.
- `docs/` — Belege; aktuelle Rohprüfungen in `docs/qa-output/` werden nicht eingecheckt.
- `assets/images/` — optimierte Bilder (WebP/AVIF + Fallback). Keine Datei > 300 KB committen.
- `assets/vendor/` — Drittanbieter (Font Awesome). Möglichst durch Inline-SVG ersetzen.
- `src/styles.css` — historische Tailwind-Quelle, nicht Teil des aktuellen Layouts.
- `tests/` und `scripts/qa-lighthouse.mjs` — aktuelle Prüfungen; alte QA-Skripte archiviert unter `90_Archiv/qa-v1_2026-09-24/`.
- Alle Prüf-/Gedächtnis-/Archivdateien in `_config.yml` ausschließen. Sie bleiben trotzdem im öffentlichen Git-Repository. Keine vertraulichen Daten einchecken.

## Definition of Done (global)

Prüfen: 320/390/768/1280 px, Menü/Tastatur, ohne JavaScript, Karte/Routenlink, konsistente Geschäftsdaten und reguläre Zeiten, Zeitzonen/Wochenenden/NRW-Feiertage und bestätigte Ausnahmen. `npm test` muss bestehen. Lighthouse lokal mobil neu messen (Ziel vier Kategorien ≥90); Datum/Umgebung nennen und keine früheren Werte als aktuellen Nachweis verwenden. Isolierte Maps-/Routentests ersetzen keine Live-Prüfung, automatische Axe-Tests keine vollständige Prüfung mit Hilfsmitteln, JSON-LD-Tests keinen Google Rich-Results-Test.

Projektstand/Gedächtnis fortschreiben, Prüfgrenzen und externe Schritte benennen. Cacheversionen bei CSS-/JS-Änderungen auf allen Seiten synchronisieren. Sitemap-`lastmod` nur bei tatsächlichen Änderungen pflegen.

---

_Kanon-Block am 31.07.2026 bei der projektübergreifenden Strukturvereinheitlichung ergänzt; der projektspezifische Teil blieb inhaltlich unverändert._
