# Verbesserungsplan — Asia Markt Thien Phu Website

> **Für Claude Code zur autonomen Umsetzung.** Phasen in Reihenfolge abarbeiten.
> Jede Aufgabe hat **Akzeptanzkriterien**. Erledigtes abhaken (`[x]`), klein committen,
> nach jeder Phase `docs/GEDAECHTNIS.md` → „Änderungs- & Lernprotokoll" ergänzen.
> Verbindliche Fakten (NAP, Öffnungszeiten) ausschließlich aus `docs/GEDAECHTNIS.md`.

**Leitplanken:** Deutsch only · kein Online-Shop · GitHub-Pages-kompatibel (statisch) ·
NAP überall identisch · nichts erfinden (`TODO(inhaber)` statt Platzhalter-Fakten).

**Zielbild:** Schnelle, technisch saubere, gut auffindbare Multi-Page-Site mit echten Fotos,
vollständigem `GroceryStore`-Schema und Lighthouse-Mobil ≥ 90 in allen Kategorien.

---

## Phase 0 — Setup & Baseline (Voraussetzung)

- [x] **0.1 Build verifizieren.** `npm install`, dann `npm run build:css`. Prüfen, dass
  `assets/css/styles.min.css` **nicht leer** ist.
  *Akzeptanz:* Datei > 0 Byte, Seite rendert lokal ohne `cdn.tailwindcss.com`.
- [x] **0.2 Baseline messen.** Lighthouse (Mobil) für die aktuelle Live-Seite festhalten
  (Performance, SEO, Best Practices, A11y) als Vergleichswert in `GEDAECHTNIS.md`.
- [x] **0.3 Mobil-Reflow real testen** (Chrome DevTools, 390 px): Mobile-Menü öffnet/schließt,
  `aria-expanded` korrekt, keine horizontalen Overflows, CTAs nicht vom Floating-Button verdeckt.
  *Akzeptanz:* Screenshots in `docs/` abgelegt, Befunde notiert.

---

## Phase 1 — Performance-Sofortmaßnahmen (höchster Ertrag, geringes Risiko)

- [x] **1.1 Logo optimieren (Befund F-02).** `assets/images/thien_phu_logo.png` (3,48 MB)
  auf ~20–40 KB bringen: als WebP exportieren bzw. das vorhandene SVG-Logo
  (`logo-thien-phu-header.svg`) nutzen. Dublette `design/thien_phu_logo.png` entfernen oder
  aus dem ausgelieferten Pfad heraushalten.
  *Akzeptanz:* Kein Bild im Auslieferungspfad > 300 KB; Header/Footer-Logo unverändert scharf.
- [x] **1.2 Tailwind-CDN entfernen (Befund F-01).** `<script src="https://cdn.tailwindcss.com">`
  und die Inline-`tailwind.config` aus `index.html` entfernen; gebautes `styles.min.css`
  einbinden. Sicherstellen, dass `tailwind.config.js` → `content` **alle** künftigen
  HTML-Dateien erfasst (`./*.html` bzw. `./**/*.html`).
  *Akzeptanz:* Kein Netzwerk-Request an `cdn.tailwindcss.com`; kein FOUC; Styling identisch.
- [x] **1.3 Fonts entlasten.** Nur genutzte Schriftschnitte laden (ist gesetzt); optional
  Self-Hosting prüfen. Font Awesome durch Inline-SVG für die wenigen Icons ersetzen.
  *Akzeptanz:* Weniger Render-blockierende Requests; Icons unverändert sichtbar.
- [ ] **1.4 Google-Maps-iframe lazy laden** (`loading="lazy"` oder Klick-zum-Laden-Fassade).
  *Akzeptanz:* Maps lädt erst bei Bedarf; LCP verbessert.

---

## Phase 2 — SEO-Fundament (kann parallel zu Phase 1 laufen)

- [ ] **2.1 `GroceryStore`-JSON-LD einbauen (Befund F-03).** Vollständiges Schema im `<head>`
  jeder Seite. Datenquelle: `GEDAECHTNIS.md` → NAP & Öffnungszeiten. Grundgerüst:

  ```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "GroceryStore",
    "name": "Asia Markt Thien Phu",
    "image": "https://www.asiamarkt.info/assets/images/storefront.jpg",
    "@id": "https://www.asiamarkt.info/#store",
    "url": "https://www.asiamarkt.info/",
    "telephone": "+4921731065590",
    "priceRange": "€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Hauptstraße 74",
      "postalCode": "40764",
      "addressLocality": "Langenfeld (Rheinland)",
      "addressCountry": "DE"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 51.1051371, "longitude": 6.9479852 },
    "paymentAccepted": "Bargeld, Kartenzahlung",
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        "opens": "09:00", "closes": "18:00" },
      { "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday", "opens": "09:00", "closes": "14:00" }
    ],
    "hasMap": "https://maps.app.goo.gl/AYB2Qmshj8aWzXBR7",
    "sameAs": []
  }
  </script>
  ```
  *Hinweis:* Geo = präzise Ladenkoordinaten aus dem Maps-Place (51.1051371, 6.9479852).
  `sameAs` mit echten Profilen (Google, golocal, evtl. Social) füllen — `TODO(inhaber)`.
  *Akzeptanz:* Google Rich-Results-Test fehlerfrei; NAP exakt wie `GEDAECHTNIS.md`.

- [ ] **2.2 `sitemap.xml` + `robots.txt` anlegen (Befund F-04).** Im Repo-Root. `robots.txt`
  verweist auf die Sitemap. Sitemap nach Phase 3 um alle echten URLs ergänzen.
  *Akzeptanz:* Beide unter `https://www.asiamarkt.info/…` erreichbar (kein 404).

- [ ] **2.3 Social-Meta ergänzen (Befund F-08).** Open Graph (`og:title/description/image/url/
  type=website/locale=de_DE`) + Twitter-Card im `<head>` jeder Seite. OG-Bild (1200×630)
  erstellen.
  *Akzeptanz:* Sharing-Vorschau (z. B. WhatsApp) zeigt Titel + Bild.

- [ ] **2.4 Review-/`aggregateRating`-Schema (Befund F-09).** Reale Werte aus dem Export
  verwenden: `aggregateRating` **ratingValue 4.39, reviewCount 100** (Quelle:
  `docs/bewertungen-kuratiert.json` → `meta`). Optional einzelne `Review`-Objekte aus
  `marquee_auswahl`. Keine erfundenen Zahlen; bei späterem Stand aktualisieren.
  *Akzeptanz:* Valides Markup; Zahlen = Exportwerte.

- [ ] **2.5 Technische Meta:** `theme-color`, Favicon-Set, optional `site.webmanifest`.
  *Akzeptanz:* Favicon im Tab sichtbar; `theme-color` gesetzt.

---

## Phase 3 — Echte Multi-Page-Struktur (Kern-SEO-Umbau)

> Ziel: aus der SPA echte Seiten mit eigenen URLs machen (Befund F-05). Statisch bleiben.

- [ ] **3.1 Seiten auftrennen.** Aus den `page-view`-Blöcken eigenständige Dateien erzeugen:
  `index.html` (Start), `sortiment.html`, `ueber-uns.html`, `kontakt.html`
  (Impressum/Datenschutz existieren bereits). Gemeinsame Teile (Header, Footer, `<head>`-Basis)
  konsistent in jede Datei übernehmen.
  *Akzeptanz:* Jede Seite ist direkt per URL aufrufbar und valide (ohne JS-Routing).
- [ ] **3.2 Navigation auf echte Links** (`href="/sortiment.html"` …) umstellen; aktiven
  Zustand serverseitig/statisch je Seite setzen. JS-`navigateTo` und `page-view`-Logik entfernen
  oder auf reine UI-Interaktionen reduzieren.
  *Akzeptanz:* Keine Hash-Navigation mehr; Zurück-Button & Direktaufruf funktionieren.
- [ ] **3.3 Seitenspezifische `<title>`, `<meta description>`, `<h1>`, Canonical** je Seite,
  keyword-orientiert (z. B. „Asiatisches Sortiment in Langenfeld — Asia Markt Thien Phu").
  *Akzeptanz:* Jede Seite hat eindeutige, sprechende Metadaten.
- [ ] **3.4 Sitemap & interne Verlinkung** um die neuen URLs ergänzen; sinnvolle interne Links.
  *Akzeptanz:* Sitemap vollständig; alle Seiten intern erreichbar.
- [ ] **3.5 301-Verhalten für alte Hash-Links** sicherstellen (clientseitiges Mapping
  `#sortiment` → `/sortiment.html`), damit geteilte Alt-Links nicht ins Leere laufen.
  *Akzeptanz:* Alte `#…`-Links landen auf der korrekten Seite.

---

## Phase 4 — Visuelles & Bilder

> Abhängig von Fotolieferung des Inhabers (`TODO(inhaber)`). Bis dahin hochwertige Interims-
> Lösung statt „Coming soon".

- [ ] **4.1 Hero-Bild ersetzen (Befund F-06).** „Coming soon"-Platzhalter durch echtes
  Laden-/Produktfoto (oder ansprechendes Marken-Visual) ersetzen; als WebP/AVIF, `eager`,
  korrektes `width/height` (CLS), aussagekräftiger `alt`.
  *Akzeptanz:* Above-the-fold zeigt echtes Bild; LCP-Element optimiert.
- [ ] **4.2 Tradition-Platzhalter füllen (Befund F-07).**
  *Akzeptanz:* Kein leerer/gestrichelter Bildrahmen mehr.
- [ ] **4.3 Sortiment bleibt bewusst ohne Produktfotos (ADR-05).** **Keine** Produktfotos
  einbauen (Inhaberentscheidung). Stattdessen die bestehenden 6 Icon/Text-Karten beibehalten
  und ggf. visuell verfeinern (einheitliche Höhen, dezente Icons/Illustrationen statt Fotos).
  *Akzeptanz:* Sortiment ohne Fotos, Karten optisch konsistent.
- [ ] **4.4 Floating-Button „Vorschlag einreichen" prüfen:** Zweck klären, Platzierung so
  anpassen, dass er mobil keine CTAs verdeckt.
  *Akzeptanz:* Keine Überlagerung wichtiger Aktionselemente.

### Phase 4b — Hero-Bewertungs-Marquee (gewünschtes Feature)

- [ ] **4b.1 Endlos-Laufband echter Google-Bewertungen** (rechts → links) im/unter dem Hero
  umsetzen. **Vollständige Spezifikation + Referenz-Code:** `docs/HERO-BEWERTUNGEN-KARUSSELL.md`.
  Daten: `docs/bewertungen-kuratiert.json` (`marquee_auswahl`, 13 Stück) — nach
  `assets/data/` ausliefern oder beim Build inlinen.
  *Akzeptanz (Kurzfassung):* nahtlose Endlosschleife, Pause bei Hover/Fokus,
  `prefers-reduced-motion` respektiert, nur reale Bewertungen, mobil sauber. Detailkriterien
  in der Spez-Datei.

---

## Phase 5 — Content-Ausbau

- [ ] **5.1 Seite/Abschnitt „Anfahrt & Parken"** (lokale Relevanz, Keywords).
- [ ] **5.2 FAQ-Sektion** (Öffnungszeiten, Parken, Bezahlung, Sortiment-Anfragen) — optional mit
  `FAQPage`-Schema.
- [ ] **5.3 Optionaler Rezepte-/Ratgeber-Bereich** (z. B. „Was brauche ich für Pho?") mit
  Brücke zum Sortiment — themenrelevanter Traffic-Hebel. Nur mit echten Inhalten.
  *Akzeptanz je Punkt:* Eindeutige Metadaten, interne Verlinkung, valides Schema (falls genutzt).

---

## Phase 6 — Barrierefreiheit, Recht & Qualitätssicherung

- [ ] **6.1 A11y:** Kontraste (WCAG AA), sichtbare Fokus-Stile, Mobile-Menü `aria-expanded`/
  Fokusführung, alle Bilder mit sinnvollem `alt`.
- [ ] **6.2 Datenschutz/DSGVO:** Google Fonts self-hosten **oder** Consent; Maps als
  Klick-zum-Laden; `datenschutz.html`/`impressum.html` auf Vollständigkeit & Inhabername prüfen.
- [ ] **6.3 Abschluss-QA (Definition of Done):** Lighthouse-Mobil ≥ 90 in allen Kategorien,
  Rich-Results-Test fehlerfrei, NAP konsistent, keine Konsolenfehler, Sitemap aktuell, alle
  Seiten direkt aufrufbar. Ergebnisse in `GEDAECHTNIS.md` protokollieren.

---

## Off-Page (`TODO(inhaber)` — nicht im Code lösbar)

Google Business Profile pflegen (Kategorien, wöchentlich Fotos, Beiträge, Q&A) · NAP über alle
Verzeichnisse (golocal, cylex, Yelp …) konsistent halten · aktiv frische Google-Bewertungen
sammeln · echte Fotos & Inhabername liefern · evtl. Social-Profile bereitstellen.

---

## Anhang A — Aufwand/Wirkung-Reihenfolge (Empfehlung)

1. Phase 1 (Performance) + Phase 2.1/2.2 (Schema, Sitemap/Robots) → **schnellste, größte Wirkung.**
2. Phase 3 (Multi-Page) → **strukturell wichtigster SEO-Hebel.**
3. Phase 4 (Bilder) sobald Fotos vorliegen.
4. Phase 5/6 (Content, A11y/Recht) iterativ.

## Anhang B — Optionaler Zukunftsschritt: Astro/Eleventy

Falls später mehr Inhalte/Komponenten nötig werden (z. B. wachsender Rezepte-Bereich), ist eine
Migration zu einem Static-Site-Generator (Astro empfohlen: Komponenten, automatische
Bild-Optimierung, sauberes Routing, statischer Export für GitHub Pages) sinnvoll. **Nicht**
Teil des aktuellen Plans — erst umsetzen, wenn der Pflegebedarf es rechtfertigt. Entscheidung
und Begründung in `GEDAECHTNIS.md` (ADR-01) dokumentiert.
