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
| **Inhaber** | inhabergeführt (Name öffentlich nicht bestätigt → `TODO(inhaber)`) |
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
- Sehr gute Reputation. **Google-Bewertungen (Export der 100 aktuellsten, Stand 2026-06):
  Ø 4,39 — Verteilung 5★: 63, 4★: 22, 3★: 8, 2★: 5, 1★: 2.** Persönliche Beratung durch den
  Inhaber wird häufig gelobt → starkes Marken-Asset. Kuratierte deutsche 5-Sterne-Bewertungen
  für das Hero-Marquee liegen in `docs/bewertungen-kuratiert.json`.
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
- Inhabername für Impressum/Schema bestätigen.
- Google-Business-Profile-Zugang (für NAP-Abgleich, Fotos, Posts).
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
- _(Nächste Einträge hier anhängen: Datum — was geändert, was gelernt, welcher Fehler/Fix.)_
