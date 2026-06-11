# Projekt-Gedächtnis — Asia Markt Thien Phu Website

> **Zweck:** Lebendes Gedächtnis dieses Projekts. Hier stehen verbindliche Fakten,
> Architektur­entscheidungen, Konventionen sowie ein laufendes Protokoll aller
> Erkenntnisse, Fehler und Fixes. **Vor jeder Arbeitssitzung lesen, nach jeder ergänzen.**
> Letzte Aktualisierung: 2026-06-11 (Einrichtung des Projekts & Erst-Analyse).

---

## 1. Stammdaten (NAP) — verbindlich, überall identisch verwenden

| Feld | Wert |
|---|---|
| **Name** | Asia Markt Thien Phu |
| **Straße** | Hauptstraße 74 |
| **PLZ / Ort** | 40764 Langenfeld (Rheinland) |
| **Land** | Deutschland |
| **Telefon (Anzeige)** | 02173 1065590 |
| **Telefon (`tel:`-Link)** | +4921731065590 |
| **E-Mail** | asia.since2007@gmail.com (auf der Seite obfuskiert als `[at]`) |
| **Inhaber** | Van Tran (Quelle: `impressum.html`, dort öffentlich genannt; für Schema-Nutzung Bestätigung → `TODO(inhaber)`) |
| **Gegründet** | 2007 („Ihr Asia Markt seit 2007") |
| **Google-Maps-Kurzlink** | https://maps.app.goo.gl/AYB2Qmshj8aWzXBR7 |
| **Geo (Laden, präzise)** | lat 51.1051371 · lon 6.9479852 (Quelle: Maps-Place-URL im Bewertungs-Export) |
| **Bezahlung** | Kartenzahlung und Bargeld |
| **Parken** | gegenüber, Parkticketautomat; 15 Min gratis, danach 1 €/Std.; E-Auto 5 Std. kostenlos mit Parkscheibe |

**Öffnungszeiten (verbindlich):**

| Tag | Zeit |
|---|---|
| Montag–Freitag | 09:00 – 18:00 |
| Samstag | 09:00 – 14:00 |
| Sonntag | geschlossen |

> ⚠️ Diese Werte müssen mit dem **Google Business Profile** exakt übereinstimmen
> (NAP-Konsistenz = Trust-Signal). Bei Abweichung: GBP ist die Quelle der Wahrheit,
> hier nachziehen und im Protokoll vermerken.

---

## 2. Geschäftskontext

- Kleines, inhabergeführtes Fachgeschäft für asiatische Lebensmittel.
- Sortiment: frische Kräuter & Gemüse (Koriander, Basilikum, Zitronengras, Wasserspinat,
  Ingwer, grüne Papaya, Thai-Auberginen), Nudeln & Ramen (SamYang, Mama, Udon, Glasnudeln),
  Saucen, Gewürze, Tiefkühlartikel, Tee, Getränke, Snacks.
- **Kein Online-Shop** — Verkauf ausschließlich vor Ort.
- Zielgruppe: lokale Kundschaft in Langenfeld + Umgebung, Liebhaber asiatischer Küche.
- Sehr gute Reputation. **Google-Maps-Profil (Stand 2026-06-11, Angabe Inhaber): Ø 4,4 bei
  125 Bewertungen — nur Google, ohne Yelp und golocal (dort existieren weitere Profile →
  `sameAs`-Kandidaten).** Diese Werte stehen im JSON-LD (`aggregateRating`) und sichtbar auf
  der Startseite (Hero-Pill + Bewertungs-Sektion); bei Änderung überall nachziehen.
  Der ältere Export (100 aktuellste, Ø 4,39 — 5★: 63, 4★: 22, 3★: 8, 2★: 5, 1★: 2) bleibt
  Quelle der Marquee-Texte. Persönliche Beratung durch den Inhaber wird häufig gelobt →
  starkes Marken-Asset. Kuratierte deutsche 5-Sterne-Bewertungen für das Hero-Marquee
  liegen in `docs/bewertungen-kuratiert.json`.
- **Kein WhatsApp Business** (Stand 2026-06-11) — kein WhatsApp-Kontakt-CTA einbauen;
  nur die bestehende „über WhatsApp teilen"-Funktion behalten.
- Bezahlung: Karte + Bargeld. Parken gegenüber (Automat, 15 Min gratis). Diese Fakten eignen
  sich für `paymentAccepted` im Schema bzw. lokale Content-Signale.

---

## 3. Architektur-Entscheidungen (ADR-Kurzform)

- **ADR-01 (2026-06-11): Statisch bleiben, aber echte Multi-Page-Struktur.**
  Empfehlung statt Framework-Migration (Astro/Eleventy): Aufteilen der SPA in echte
  HTML-Seiten mit eigenen URLs (`/`, `/sortiment.html`, `/ueber-uns.html`, `/kontakt.html`).
  *Begründung:* Niedrigstes Risiko für autonome Umsetzung, GitHub-Pages-nativ, behebt das
  größte SEO-Problem (nur eine URL). Astro bleibt als optionaler Zukunftsschritt dokumentiert
  (PLAN.md, Anhang B).
- **ADR-02 (2026-06-11): Tailwind als Build-Schritt statt CDN-Runtime.**
  `cdn.tailwindcss.com` ist laut Tailwind ausdrücklich nicht für Produktion gedacht
  (Performance, FOUC, Render-Blocking). `npm run build:css` existiert bereits.
- **ADR-03 (2026-06-11): Sprache nur Deutsch.** Kein i18n/hreflang.
- **ADR-04 (2026-06-11): JSON-LD `GroceryStore` als Schema-Typ** (Subtyp von LocalBusiness).
- **ADR-05 (2026-06-11): Sortiment bewusst ohne Produktfotos.** Entscheidung des Inhabers
  (keine eigenen hochwertigen Produktfotos möglich). Die textbasierten Icon/Karten-Layouts
  auf „Unser Sortiment" sind daher gewollt und werden **beibehalten** — Claude Code soll dort
  **keine** Produktfotos einfordern/einbauen. (Hero- und „Über uns"-Bilder sind davon
  ausgenommen, siehe F-06/F-07.)
- **ADR-06 (2026-06-11): Hero-Bewertungs-Marquee.** Unter/zum Hero ein endlos von rechts nach
  links laufendes Band echter Google-Bewertungen. Spez + Referenzcode:
  `docs/HERO-BEWERTUNGEN-KARUSSELL.md`; Daten: `docs/bewertungen-kuratiert.json`.

---

## 4. Konventionen

- Bilder: WebP/AVIF mit `<picture>`-Fallback, `loading="lazy"` (außer Hero = `eager`),
  `width`/`height` gesetzt (CLS vermeiden). Keine Datei > 300 KB.
- Farben/Brand: Tailwind-`brand`-Palette in `tailwind.config.js` (green `#5B8A68`,
  darkGreen `#2D4A36`, cream `#FDFBF7`, terracotta `#B83A2D`, gold `#F59E0B` u. a.).
- Schriften: Lora (serif, Überschriften), Nunito (sans, Fließtext), `display=swap`.
- Commits: klein, thematisch, deutschsprachige Imperativ-Messages.

---

## 5. Bekannte Fehler & Fixes (Wissensdatenbank)

| # | Problem | Ursache | Fix / Status |
|---|---|---|---|
| F-01 | `assets/css/styles.min.css` ist **0 Byte** | Tailwind-Build nie ausgeführt; Site lädt deshalb Tailwind-CDN als Fallback | `npm run build:css` ausführen & Ergebnis committen → PLAN P1 |
| F-02 | `thien_phu_logo.png` ist **3,48 MB** (Header/Footer-Logo) | Unkomprimiertes PNG; zusätzlich Dublette in `design/` | Auf ~20–40 KB optimieren / SVG-Logo nutzen → PLAN P1 |
| F-03 | **Kein JSON-LD / strukturierte Daten** | Nie angelegt | `GroceryStore`-Schema einbauen → PLAN P2 |
| F-04 | **Keine `sitemap.xml` / `robots.txt`** (beide 404) | Nie angelegt | Anlegen → PLAN P2 |
| F-05 | **Nur eine URL** (JS-`page-view`-Routing) | SPA-artige Single-File-Struktur | Echte Multi-Page → PLAN P3 |
| F-06 | Hero zeigt **„Coming soon"-Platzhalter** statt Foto | Bild fehlt | Echtes Hero-Foto. **Im Code liegt bereits ein detailliertes Foto-Briefing** (Hochformat 4:5, ~800×1000 px, frische Zutaten von oben) → PLAN P4 / `TODO(inhaber)` Foto |
| F-07 | **Leerer Bild-Platzhalter** auf „Tradition & Auswahl/Über uns" | Bild fehlt | Innenaufnahme einsetzen. **Briefing bereits im Code** (Ladeninterieur, ~800×1000 px) → PLAN P4 |
| F-08 | Nur 3 `<meta>`-Tags, **kein Open Graph / Twitter Card** | Unvollständiger `<head>` | Social-Meta ergänzen → PLAN P2 |
| F-09 | Bewertungen sind **statischer Text**, kein `Review`/`aggregateRating`-Schema | Hardcodiert | Review-Schema + Pflegekonzept → PLAN P2 |

---

## 6. Offene Punkte für den Inhaber (`TODO(inhaber)`)

- Echte Fotos liefern: Ladenfront, Innenraum, Regale, frisches Gemüse, Team/Inhaber.
  (Stand 2026-06-11: „kommen bald wahrscheinlich" — Interims-Visuals bleiben bis dahin.)
- Inhabername für Impressum/Schema bestätigen.
- Google-Business-Profile-Zugang (für NAP-Abgleich, Fotos, Posts).
- Yelp- und golocal-Profil-URLs liefern → als `sameAs` ins JSON-LD aufnehmen.
- Optional: Liefer-/Reservierungswünsche, Social-Media-Profile (Instagram/Facebook?).

---

## 7. Änderungs- & Lernprotokoll (append-only)

- **2026-06-11** — Projekt eingerichtet. Repo geklont & analysiert, Live-Site visuell
  (Desktop) geprüft, Local-SEO recherchiert. `ANALYSE.md`, `PLAN.md`, `CLAUDE.md`,
  dieses Gedächtnis angelegt. Architektur­entscheidungen ADR-01..04 getroffen.
  Mobil-Reflow konnte im Tool nicht final verifiziert werden → in P0 nachholen.
- **2026-06-11 (2. Sitzung)** — Vertiefte Untertab-Analyse via Browser + vollständige
  Inhaltsextraktion aus dem Repo. Erkenntnisse: (1) Sortiment hat **6 detaillierte Icon/Text-
  Karten** (Kräuter & Gemüse, Nudeln & Ramen, Saucen & Würzmittel, Tofu/Tee & Getränke,
  Snacks & Spezialzutaten, Tiefkühlprodukte) — bewusst ohne Produktfotos (ADR-05).
  (2) Hero- und „Über uns"-Platzhalter enthalten **bereits detaillierte Foto-Briefings**.
  (3) Kontaktseite inhaltsstark (Parken-, Bezahl-, Teilen-Details). (4) Präzise Geo-Koordinaten
  aus dem Bewertungs-Export gewonnen → Schema in PLAN korrigiert. Bewertungs-Export (100,
  Ø 4,39) ausgewertet; 13 deutsche 5-Sterne-Bewertungen für ein Hero-Marquee kuratiert
  (`bewertungen-kuratiert.json` + `HERO-BEWERTUNGEN-KARUSSELL.md`). ADR-05/06 ergänzt.
- **2026-06-11 (3. Sitzung, autonome Umsetzung)** — P0.1: `npm install` + `npm run build:css`
  ausgeführt; `assets/css/styles.min.css` jetzt 22 KB (war 0 Byte, Befund F-01 teilbehoben —
  CDN-Entfernung folgt in P1.2). `styles.min.css` war in `index.html` bereits verlinkt (Z. 11).
- **2026-06-11** — P0.2 **Lighthouse-Baseline (Mobil, Live-Site, headless Chrome):**
  Performance **62** · Accessibility **93** · Best Practices **96** · SEO **100**.
  Metriken: LCP 21,5 s · FCP 4,5 s · TBT 0 ms · CLS 0 · Speed Index 5,3 s.
  **Erkenntnis:** LCP-Element ist das Header-SVG-Logo — Rendering wird massiv durch das
  render-blockierende Tailwind-CDN-Skript verzögert (F-01) → P1.2 ist der größte Hebel.
  (Roh-Report lokal: `docs/lighthouse-baseline.json`, nicht committet.)
- **2026-06-11** — P0.3 **Mobil-Reflow (390 px, lokal via http-server + Headless-Chrome) geprüft.**
  Befunde: (1) Kein horizontaler Overflow (scrollWidth = 390; dekorative absolute Shapes werden
  geclippt). (2) Mobile-Menü öffnet/schließt korrekt (Klassen-Toggle `hidden`). (3) **`aria-expanded`
  fehlt am `#mobile-menu-button` vollständig** (nur statisches `aria-label="Menü öffnen"`) →
  in P6.1 beheben. (4) **Floating-Button „Vorschlag einreichen" überdeckt je nach Scroll-Position
  den „Kundenstimmen"-CTA** → bestätigt P4.4. Screenshots: `docs/qa-mobil-390-*.jpg`;
  QA-Skript: `scripts/mobile-screenshots.js` (puppeteer-core + System-Chrome, dev-only).
- **2026-06-11** — P1.1 **Logo optimiert (F-02 behoben):** `thien_phu_logo.png` (3,4 MB, 2048²)
  → `thien_phu_logo.webp` (8,4 KB, 220², via sharp aus `design/`-Original). Beide Referenzen in
  `index.html` (Header + Footer) umgestellt, PNG aus `assets/images/` entfernt. Original bleibt
  als Quelle in `design/` liegen. Visuell im Preview verifiziert (scharf, lädt korrekt).
- **2026-06-11** — P1.2 **Tailwind-CDN entfernt (F-01 vollständig behoben):** CDN-Skript +
  Inline-`tailwind.config` aus `index.html`, `impressum.html`, `datenschutz.html` entfernt;
  alle drei binden jetzt `assets/css/styles.min.css` ein. `tailwind.config.js` → `content:
  ['./*.html']` (erfasst künftige Seiten). Alle 3 Seiten im Preview verifiziert: 0 Requests an
  `cdn.tailwindcss.com`, Brand-Farben/Fonts identisch. **Nebenbefund:** `impressum.html` nennt
  öffentlich „Inhaber: Van Tran" → Stammdaten-Tabelle aktualisiert (Schema-Nutzung weiterhin
  erst nach Inhaber-Bestätigung).
- **2026-06-11** — P1.3 **Font Awesome durch Inline-SVG ersetzt:** 75 `<i>`-Tags in 3 HTML-Dateien
  (inkl. JS-Template-Strings) per Skript `scripts/fa-to-svg.js` durch Inline-SVGs ersetzt
  (Pfaddaten aus offiziellen `@fortawesome/*`-npm-Paketen, dev-only via `--no-save`).
  `.svg-icon`-Basisklasse + `fa-spin`-Keyframes (mit `prefers-reduced-motion`) in `src/styles.css`.
  FA-Vendor-Ordner (CSS + 3 Webfonts) gelöscht → nur noch 2 Font-Requests (Lora/Nunito).
  Verifiziert via Headless-Chrome (`scripts/qa-check.js`): alle Seiten, 0 Konsolenfehler außer
  bekanntem `favicon.ico`-404 (→ P2.5). Font-Self-Hosting auf P6.2 (DSGVO) verschoben.
  **Gelernt:** `npm install --no-save X` entfernt zuvor per `--no-save` installierte Pakete —
  dev-Tools (puppeteer-core etc.) in einem Aufruf gemeinsam installieren.
- **2026-06-11** — P1.4 **Google Maps als Klick-zum-Laden-Fassade** (statt nur `loading="lazy"`):
  Fassade mit Pin-Icon, Datenschutz-Hinweis, „Karte laden"-Button und Direktlink zu Google Maps;
  iframe wird erst per JS nach Klick injiziert. Verifiziert (`scripts/qa-maps.js`): 0 Google-
  Requests vor Klick, Karte lädt korrekt nach Klick. **Erfüllt damit auch die Maps-Anforderung
  aus P6.2 (DSGVO).** Datenschutz-Text („beim Laden der Seite automatisch…") in P6.2 anpassen.
- **2026-06-11** — P2.1 **GroceryStore-JSON-LD** in alle 3 Seiten eingebaut (identischer Block,
  `@id: …/#store`). **Abweichung vom PLAN-Template:** `image`/`logo` = Logo-WebP statt
  nicht existentem `storefront.jpg` (keine Erfindungen); `sameAs` weggelassen →
  `TODO(inhaber)`-Kommentar im Head. Zusätzlich `foundingDate: 2007`, `currenciesAccepted`.
  Lokal validiert (`scripts/qa-jsonld.js`: JSON-Parse + NAP-Abgleich, alle OK). Google
  Rich-Results-Test nach Deploy ausführen (lokal nicht möglich).
- **2026-06-11** — P2.2 **`sitemap.xml` + `robots.txt`** im Root angelegt (3 URLs: /, Impressum,
  Datenschutz; nach Phase 3 erweitern). `robots.txt` sperrt `cowork/`, `docs/`, `design/`,
  `demo/` (Planungs-/Designdateien, sollen nicht in den Index) und verweist auf die Sitemap.
  Lokal verifiziert (beide via http-server erreichbar).
- **2026-06-11** — P2.3 **Open-Graph- & Twitter-Card-Meta** auf allen 3 Seiten (seitenspezifische
  Titel/URLs). **OG-Bild (1200×630, 45 KB JPG)** aus Brand-Elementen gerendert (Logo, Lora/Nunito,
  Markenfarben) via `scripts/og-template.html` + Puppeteer → `assets/images/og-image.jpg`.
  Sharing-Vorschau (WhatsApp etc.) erst nach Deploy real testbar.
- **2026-06-11** — P2.4 **`aggregateRating`** (4.39 / 100, Quelle: Bewertungs-Export) in alle
  3 JSON-LD-Blöcke. Einzelne `Review`-Objekte bewusst weggelassen (optional lt. PLAN).
  **Hinweis:** Google zeigt selbst gehostete LocalBusiness-Sterne seit 2019 meist nicht als
  Rich Result („self-serving") — Markup ist dennoch valide und für andere Suchmaschinen nützlich.
  **Pflege:** Bei neuem Export `ratingValue`/`reviewCount` in allen 3 Dateien aktualisieren
  (Phase 3 dedupliziert die Blöcke ohnehin in echte Einzelseiten).
- **2026-06-11** — P2.5 **Favicon-Set + technische Meta:** `favicon.ico` (16/32/48, Root),
  `icon-192/512.png`, `apple-touch-icon.png` (alle aus `design/`-Logo via sharp),
  `site.webmanifest`, `theme-color #FDFBF7` — auf allen 3 Seiten verlinkt. QA: 0 Konsolenfehler
  (Favicon-404 behoben), alle Dateien lokal erreichbar. **Phase 0–2 damit komplett.**
- **2026-06-11** — **Phase 3 komplett: Multi-Page-Umbau (F-05 behoben).** SPA in 4 echte Seiten
  zerlegt: `index.html` (Start), `sortiment.html`, `ueber-uns.html`, `kontakt.html` — per
  Migrationsskript `scripts/split-pages.js` (Bausteine aus alter index.html extrahiert, Head je
  Seite mit eigenem Title/Description/Canonical/OG parametrisiert, H2→H1 auf Unterseiten).
  Gemeinsames JS inkl. Modal-Templates jetzt in `assets/js/main.js` (defer, eine Quelle statt
  Duplikate). Nav/Footer auf echte Links, aktiver Zustand statisch + `aria-current="page"`;
  `aria-expanded` am Mobile-Menü ergänzt (Befund aus P0.3 behoben). `navigateTo`/`page-view`-
  Logik entfernt. Alt-Hash-Links (`/#sortiment` …) leiten per JS auf echte URLs um (auch via
  `hashchange`); `#bewertungen` bleibt Anker auf Start. Sitemap um 3 URLs erweitert (jetzt 6).
  QA: `scripts/qa-multipage.js` — 23 Checks (Titel/H1/Nav-Zustand je Seite, Klick-Navigation,
  Mobile-Menü, Modals, Maps-Fassade, Reviews, Hash-Redirects, Footer-Links, 0 Konsolenfehler).
  **Gelernt:** (1) Regex-Block-Entfernung in CSS war zu gierig/lazy → verwaiste Keyframe-Zeilen
  brachen `.organic-shape` (visuell entdeckt, gefixt). (2) Same-Document-Hash-Navigation feuert
  kein DOMContentLoaded → Redirect zusätzlich an `hashchange` gebunden.
- **2026-06-11** — P4.1/4.2 **Interims-Brand-Visuals statt „Coming soon"** (F-06/F-07 interimistisch
  behoben): `hero-interim.webp` (19 KB) + `tradition-interim.webp` (21 KB), je 800×1000, gerendert
  aus `scripts/interim-visuals.html` (Markenfarben, Lampion, Logo, echte NAP-Texte) via
  `scripts/render-interim-visuals.js`. Hero mit `fetchpriority="high"` (LCP), Tradition lazy.
  Foto-Briefings bleiben als `TODO(inhaber)`-HTML-Kommentare erhalten. P4.3: Sortiment-Karten
  geprüft, bewusst ohne Fotos (ADR-05), konsistent — unverändert. P4.4: Floating-Button auf
  Mobil icon-only (runder 48-px-Button, `aria-label`), überdeckt CTAs nicht mehr funktional.
- **2026-06-11** — P4b.1 **Bewertungs-Marquee** unter dem Hero (Spez:
  `docs/HERO-BEWERTUNGEN-KARUSSELL.md`): 13 kuratierte echte 5-Sterne-Bewertungen aus
  `assets/data/bewertungen-kuratiert.json` (getrimmte Kopie der docs-Datei), Karten + aria-
  hidden-Klone für nahtlose Schleife (translateX −50 %, 55 s), Pause bei Hover/Fokus,
  `prefers-reduced-motion` → scrollbares Band, Texte HTML-escaped. QA: `scripts/qa-marquee.js`
  (7 Checks OK). **Wichtig gelernt: Tailwind-`content` muss `assets/js/main.js` enthalten** —
  JS-generiertes Markup (Modals, Marquee-Karten) verlor sonst Klassen wie `w-80`;
  `tailwind.config.js` entsprechend erweitert. Utility `overflow-hidden` schlug Komponenten-
  Regel im reduced-motion-Fall → `overflow` in die `.marquee`-Komponente verlegt.
- **2026-06-11** — P5.1/5.2 **„Anfahrt & Parken"-Abschnitt** (`kontakt.html#anfahrt`, 3 Karten:
  Lage/Route, Parken mit Automat-Konditionen, E-Auto-Vorteil) und **FAQ-Abschnitt**
  (`kontakt.html#faq`, 5 Fragen via `<details>`-Akkordeon ohne JS) ergänzt — ausschließlich
  dokumentierte Fakten aus den Stammdaten. **FAQPage-JSON-LD** auf `kontakt.html` (Antworten
  identisch zum sichtbaren Inhalt, Google-Richtlinie). JSON-LD-QA: alle 7 Blöcke valide.
  P5.3 (Rezepte) bewusst offen — nur mit echten Inhalten (`TODO(inhaber)`).
- **2026-06-11** — P6.2 **DSGVO: Google Fonts self-gehostet.** 14 WOFF2 (Lora 400/600/700,
  Nunito 400/500/600/700, latin + latin-ext) via `scripts/fetch-fonts.js` nach `assets/fonts/`,
  `@font-face` in `assets/css/fonts.css`, alle 6 Seiten umgestellt (+ Preload Lora-700/
  Nunito-400). Datenschutzerklärung aktualisiert: Fonts-Abschnitt → „lokal gehostet",
  Maps-Abschnitt → Zwei-Klick-Lösung (Einwilligung), Drittland-Liste angepasst.
  Verifiziert: **0 externe Requests beim Seitenaufruf** auf allen Seiten, Fonts laden korrekt.
  Impressum/Datenschutz nennen Inhaber Van Tran (Vollständigkeit geprüft).
- **2026-06-11** — P6.1 **A11y: axe-core-Scan (WCAG 2.1 AA) auf 0 Verstöße gebracht**
  (`scripts/qa-axe.js`, alle 6 Seiten). Fixes: (1) **Markenfarbe `brand-green` von #5B8A68 auf
  #4D7558 abgedunkelt** — erfüllt jetzt 4,5:1 sowohl als Weiß-auf-Grün (5,25) als auch
  Grün-auf-Beige (4,58); überall ersetzt (Tailwind-Config + Inline-Styles aller Seiten).
  (2) Highlight-Subtexte gray-500→gray-600 auf Beige. (3) Sonntag-Zeile gray-400→gray-500.
  (4) `<title>` + Description + Canonical auf Impressum/Datenschutz ergänzt (fehlten!).
  `aria-expanded` (P0.3-Befund) war bereits in P3 behoben; Fokus-Stile + alt-Texte geprüft.
- **2026-06-11** — P6.3 **Abschluss-QA bestanden (lokal, http-server + Headless-Chrome).**
  Überschriften-Hierarchie aller Seiten begradigt (Footer h4→h2, Sortiment-Karten h3→h2,
  Kontakt h3/h4 neu gestuft). **Lighthouse Mobil final:** Start 91/100/100/100 ·
  Sortiment 96/100/100/100 · Über-uns 96/100/100/100 · Kontakt 95/100/100/100 ·
  Impressum 99/100/100/100 · Datenschutz 98/100/100/100 (Perf/A11y/BP/SEO; Baseline
  Live-Site war 62/93/96/100). axe: 0 Verstöße; Multipage-QA: 23/23 OK; JSON-LD: 7/7 valide;
  NAP konsistent; 0 Konsolenfehler; Sitemap 6 URLs.
  **Nach dem Deploy (git push) noch ausstehend:** (1) Google Rich-Results-Test mit Live-URL,
  (2) Lighthouse-Nachmessung gegen https://www.asiamarkt.info/, (3) Sharing-Vorschau
  (WhatsApp) testen, (4) Search Console: Sitemap einreichen.
  **Session-Zusammenfassung:** Phasen 0–6 vollständig abgearbeitet bis auf P5.3 (Rezepte —
  bewusst offen, braucht echte Inhalte vom Inhaber). Offene `TODO(inhaber)`: echte Fotos
  (Hero/Tradition/Storefront), `sameAs`-Profile, Rezept-Themen, GBP-Pflege.
- **2026-06-11 (4. Sitzung) — Conversion-Optimierung (P7, Auftrag Inhaber, mobile-first).**
  Ziel: Besucher aus Google-Suche/Maps schneller zur Fahrt-/Anruf-Entscheidung bringen.
  (1) **Öffnungsstatus-Badge** („Jetzt geöffnet · bis 18 Uhr" / „öffnet morgen um 9 Uhr"):
  `openStatusNow()`/`initOpenStatus()` in `main.js`; Elemente mit `[data-open-status]`
  (+ `data-status-dot`/`data-status-text`), Aktualisierung je Minute. Progressive Enhancement:
  ohne JS bleiben statische Öffnungszeiten stehen. **Bewusste Limitation: keine Feiertagslogik**
  — an Feiertagen zeigt das Badge ggf. fälschlich „geöffnet" (wie Google Maps ohne
  Sonderzeiten). (2) **Mobile Aktionsleiste** (`.action-bar`, nur < 768 px, alle 4 Hauptseiten):
  Anrufen / Route / Öffnungsstatus, fix am unteren Rand; `body.has-action-bar` reserviert
  Platz (Footer nicht verdeckt), `safe-area-inset-bottom` beachtet. (3) **Floating
  „Vorschlag einreichen" nur noch Desktop** (`hidden md:flex`) — mobil hat die Leiste Vorrang;
  Ersatz: Footer-Button auf allen 4 Hauptseiten; FAQ-Text „Button unten rechts" → „im
  Seitenfuß" angepasst (JSON-LD-Antwort unverändert konsistent). (4) **Hero-CTAs neu:**
  primär „Route planen" (Maps-Deep-Link), sekundär „Anrufen" (`tel:`), tertiär Sortiment;
  „Kundenstimmen"-Button ersetzt durch klickbare **Bewertungs-Pill „4,4 bei Google ·
  125 Bewertungen"** (→ `#bewertungen`); Status-Zeile über den CTAs; Info-Zeile
  „Hauptstraße 74 · Parken gegenüber (15 Min gratis) · Karte & Bargeld" ergänzt.
  (5) **Bewertungsdaten 4,39/100 → 4,4/125** (Angabe Inhaber, nur Google) in allen 6
  JSON-LD-Blöcken + sichtbar in der Bewertungs-Sektion. (6) **Abschluss-CTA-Sektionen**
  auf `sortiment.html` („Alles davon finden Sie bei uns im Laden") und `ueber-uns.html`
  („Überzeugen Sie sich vor Ort") mit Status + Route/Anruf. (7) **Kontakt:** Anker
  `#oeffnungszeiten` (`scroll-mt-28`) + Status-Badge am Öffnungszeiten-Block.
  (8) **Meta/OG-Description Startseite** mit Zeiten/Parken konkretisiert (SERP-CTR).
  **QA:** JSON-LD 7/7 valide, Multipage 23/23 OK, axe 0 Verstöße, mobil 390 px ohne
  Overflow, Statuslogik für 6 Randfälle (Werktag offen/vor/nach, Sa 13:59/15:00, So)
  verifiziert, 0 Konsolenfehler. **Entscheidungen:** kein WhatsApp-CTA (kein Business-
  Account), Fotos folgen separat (Interims-Visuals bleiben), Yelp/golocal nur als
  künftige `sameAs`-Kandidaten erfasst.
- _(Nächste Einträge hier anhängen: Datum — was geändert, was gelernt, welcher Fehler/Fix.)_
