# CLAUDE.md — Projektleitfaden für Claude Code

> **Abgeschlossenes Projekt.** Dieser Ordner liegt im Archiv `ZZ_Archiv_Abgeschlossene-Projekte/`. Er wird vollständig aufbewahrt, aber nicht mehr fortgeschrieben. Inhalte können überholt sein — vor jeder Wiederverwendung Aktualität prüfen. Soll wieder daran gearbeitet werden, wandert der Ordner zurück auf die oberste Ebene.
>
> **Achtung, dieses Projekt ist live.** Der Ordner ist ein Git-Repository, dessen `main`-Branch über GitHub Pages die öffentlich erreichbare Website ausliefert (`www.asiamarkt.info`, CNAME im Repo). Archiviert heißt hier: es wird nicht mehr aktiv weiterentwickelt — **nicht**, dass Änderungen folgenlos wären. Ein Push auf `main` geht sofort live.

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
2. **Arbeite den `00_Gedaechtnis/plan-relaunch.md` phasenweise ab.** Jede Aufgabe hat Akzeptanzkriterien.
   Hake erledigte Punkte ab (`[x]`) und committe in kleinen, thematisch sauberen Schritten.
3. **NAP-Konsistenz ist heilig.** Name, Adresse, Telefon müssen exakt mit dem Google
   Business Profile übereinstimmen — überall identisch (Footer, Kontakt, Schema, Impressum).
   Siehe `00_Gedaechtnis/gedaechtnis-gesamt.md` → „Stammdaten (NAP)".
4. **Keine Erfindungen.** Produkte, Marken, Preise, Bewertungen oder Aussagen nur verwenden,
   wenn sie belegt sind. Im Zweifel als `TODO(inhaber)` markieren statt zu erfinden.
5. **Sprache:** ausschließlich Deutsch (Entscheidung des Inhabers). Kein i18n/hreflang nötig.
6. **Es ist KEIN Online-Shop.** Conversion-Ziele sind: Anruf, Routenplanung, Google-Bewertung,
   WhatsApp-Weiterleitung. Niemals Warenkorb/Checkout bauen.

## Tech-Stack (Ist → Soll)

- **Ist:** Eine einzige `index.html` (~1140 Zeilen) mit JS-gesteuertem Seiten-Umschalten
  (`page-view`-Divs), Tailwind über `cdn.tailwindcss.com` (Runtime), leeres `styles.min.css`.
- **Soll (siehe PLAN.md):** Echte Multi-Page-Struktur (eigene `.html`-Dateien & URLs),
  Tailwind als Build-Schritt (`npm run build:css`), JSON-LD-Schema, `sitemap.xml`/`robots.txt`,
  optimierte Bilder. Bleibt statisch und GitHub-Pages-kompatibel.

## Build & Deploy

```bash
npm install
npm run build:css      # erzeugt assets/css/styles.min.css aus src/styles.css
# Deploy: Push auf main → GitHub Pages (CNAME: www.asiamarkt.info)
```

## Verzeichnis-Konventionen

- `docs/` — Analyse, Plan, Gedächtnis (diese Planungsdateien, nicht Teil der ausgelieferten Site).
- `assets/images/` — optimierte Bilder (WebP/AVIF + Fallback). Keine Datei > 300 KB committen.
- `assets/vendor/` — Drittanbieter (Font Awesome). Möglichst durch Inline-SVG ersetzen.
- `src/styles.css` — Tailwind-Quelle (Direktiven + `@layer`).

## Definition of Done (global)

Eine Änderung gilt erst als fertig, wenn: Build läuft fehlerfrei, Lighthouse (Mobil)
in allen vier Kategorien ≥ 90, valides JSON-LD (Rich-Results-Test), NAP konsistent,
keine Konsolenfehler, und `00_Gedaechtnis/gedaechtnis-gesamt.md` aktualisiert ist.

---

_Kanon-Block am 31.07.2026 bei der projektübergreifenden Strukturvereinheitlichung ergänzt; der projektspezifische Teil blieb inhaltlich unverändert._
