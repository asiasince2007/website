# Ausführliche Website-Analyse — Asia Markt Thien Phu

**Analysiert am:** 2026-06-11 · **Live-URL:** https://www.asiamarkt.info/ ·
**Repo:** `asiasince2007/website` · **Hosting:** GitHub Pages (CNAME `www.asiamarkt.info`)

**Methodik:** Statische Code-Analyse des geklonten Repos (`index.html`, `tailwind.config.js`,
`package.json`, Assets), visuelle Live-Prüfung per Browser (Desktop 1440 px, alle vier
Ansichten), Prüfung von `robots.txt`/`sitemap.xml` (beide HTTP 404), Recherche zu Local-SEO-
und LocalBusiness-Schema-Best-Practices (Stand 2026) sowie zur lokalen Auffindbarkeit.

---

## 1. Gesamturteil

Die Seite ist **gestalterisch bereits auf gutem Niveau**: stimmiges, warmes Markendesign
(Naturtöne, Serifen-Headlines, organische Formen), klare Informationsarchitektur und
vollständige, korrekte Kontaktdaten. Das Fundament ist solide.

Die Schwächen liegen in drei Bereichen, die für ein **lokales Ladengeschäft** geschäftlich
am wichtigsten sind: **(1) technisches SEO-Fundament** (nur eine URL, kein strukturiertes
Daten-Markup, keine Sitemap/Robots), **(2) Performance** (3,5-MB-Logo, Tailwind-CDN statt
Build) und **(3) fehlende echte Bilder** (zwei „Coming soon"-Platzhalter, keine Produktfotos).
Diese Punkte sind die Hebel mit dem höchsten Ertrag und werden im `PLAN.md` priorisiert.

**Schweregrad-Legende:** 🔴 kritisch (Geschäftswirkung/Ranking) · 🟠 hoch · 🟡 mittel · 🟢 niedrig.

---

## 2. Technische Architektur

Die gesamte Website besteht aus **einer einzigen `index.html`** (~1.140 Zeilen). Die vier
„Seiten" (Startseite, Sortiment, Tradition & Auswahl, Kontakt) sowie Impressum und
Datenschutz sind als `<div class="page-view">`-Container im selben Dokument hinterlegt und
werden per JavaScript (`navigateTo(pageId)`) ein-/ausgeblendet (`display:none`/`active`).
Die URL ändert sich dabei nur via `history.pushState` zu einem **Hash** (`#sortiment`,
`#kontakt` …). Es gibt zusätzlich separate `impressum.html` und `datenschutz.html`.

**Bewertung:**

- 🔴 **Nur eine indexierbare URL.** Für Google existiert faktisch eine Seite. Die thematisch
  wertvollen Inhalte „Sortiment", „Über uns/Tradition" und „Kontakt" können **nicht als
  eigenständige Seiten ranken** und konkurrieren nicht um spezifische Suchanfragen
  (z. B. „asiatische Lebensmittel Langenfeld", „Ramen kaufen Langenfeld"). Hash-Fragmente
  (`#…`) werden von Suchmaschinen nicht als eigene URLs behandelt.
- 🟠 **Inhalte in `display:none`.** Der Inhalt ist zwar im DOM vorhanden (also grundsätzlich
  crawlbar), aber dauerhaft per CSS ausgeblendete Inhalte erhalten erfahrungsgemäß geringeres
  Gewicht und liefern keine seitenspezifischen Signale (Title/Description/H1 je Thema).
- 🟡 **Wartbarkeit.** Eine 1.140-Zeilen-Datei mit eingebettetem CSS und JS ist schwer zu
  pflegen und fehleranfällig.

---

## 3. SEO-Analyse

### 3.1 On-Page-Grundlagen (Ist)

Positiv vorhanden: `<html lang="de">`, sprechender `<title>`, eine `<meta name="description">`,
`rel="canonical"`, genau eine `<h1>` je sichtbarer View, sinnvolle `alt`-Texte an den
meisten Bildern, semantische Überschriftenhierarchie, `width`/`height` an Bildern.

### 3.2 Kritische Lücken

- 🔴 **Kein strukturiertes Daten-Markup (JSON-LD).** Es existiert **kein** `LocalBusiness`/
  `GroceryStore`-Schema. Das ist für lokale Auffindbarkeit der größte Einzel-Hebel: Google
  und KI-Assistenten (AI Overviews, ChatGPT, Perplexity, Sprachassistenten) nutzen
  `openingHoursSpecification`, `address`, `geo`, `telephone` direkt zur Beantwortung von
  Anfragen wie „Asia Markt Langenfeld offen?". Vollständiges Schema erhöht den Entity-Trust,
  besonders wenn es mit dem Google Business Profile konsistent ist.
- 🔴 **Keine `sitemap.xml` und keine `robots.txt`** (beide liefern HTTP 404). Suchmaschinen
  erhalten keine Crawl-Hinweise; bei einer künftigen Multi-Page-Struktur ist die Sitemap
  Pflicht.
- 🟠 **Keine Open-Graph-/Twitter-Card-Tags.** Beim Teilen (WhatsApp, Facebook, etc.) erscheint
  kein Vorschaubild/Titel — relevant, da die Seite aktiv WhatsApp-Sharing anbietet.
- 🟠 **Bewertungen ohne `Review`/`aggregateRating`-Markup.** Die hervorragenden 5-Sterne-
  Bewertungen liegen nur als statischer Text vor und erzeugen keine Rich-Snippet-Sterne.
- 🟡 **Fehlende technische Meta:** kein `theme-color`, keine `geo.position`/`ICBM`-Angaben,
  kein `robots`-Meta, kein Favicon-Set/Web-App-Manifest erkennbar.
- 🟡 **Title/Description nur einmal** für die gesamte SPA — bei Multi-Page brauchen alle
  Seiten eigene, keyword-optimierte Title/Descriptions.

### 3.3 Local-SEO-Kontext (off-page, recherchiert)

Das Geschäft ist in mehreren Verzeichnissen gelistet (golocal, stadtbranchenbuch, cylex,
finde-offen, Yelp, Future-City-Langenfeld) und genießt durchweg Top-Bewertungen. Die eigene
Website rankt für den Markennamen, schöpft aber generische Lokal-Keywords nicht aus.
Wichtigste off-page-Hebel (im PLAN als `TODO(inhaber)`): **Google-Business-Profile-Pflege**
(Kategorien, wöchentlich neue Fotos, Beiträge, Q&A), NAP-Konsistenz über alle Verzeichnisse,
aktives Sammeln frischer Google-Bewertungen.

---

## 4. Performance-Analyse

- 🔴 **`thien_phu_logo.png` = 3,48 MB.** Wird als Header- und Footer-Logo eingebunden
  (angezeigt mit ~64 px Höhe) — ein gravierendes Missverhältnis. Zusätzlich liegt dieselbe
  Datei dupliziert in `design/`. Allein dieses Bild dominiert die Ladezeit und schadet den
  Core Web Vitals (insb. LCP) massiv, vor allem mobil.
- 🔴 **Tailwind über `cdn.tailwindcss.com` (Runtime-Compiler).** Diese CDN-Variante ist laut
  Tailwind ausdrücklich **nicht für Produktion** gedacht: großes JS-Bundle, Render-Blocking,
  kurzes „Flash of Unstyled Content". Das lokale `assets/css/styles.min.css` ist **leer
  (0 Byte)**, weil der vorhandene Build (`npm run build:css`) nie ausgeführt wurde — deshalb
  greift die Seite überhaupt erst auf den CDN-Fallback zurück.
- 🟠 **Render-blockierende Webfonts** (Google Fonts) ohne selbst-Hosting; `display=swap` ist
  immerhin gesetzt.
- 🟡 **Font Awesome komplett geladen** für wenige Icons — durch Inline-SVG ersetzbar.
- 🟡 **Eingebetteter Google-Maps-`<iframe>`** lädt eager → besser lazy/„click-to-load".

---

## 5. Visuelle & UX-Analyse (Live-Prüfung)

**Stärken:** Stimmiges, hochwertiges Markenbild; gute Lesbarkeit; klare CTAs auf der
Startseite („Kontakt & Öffnungszeiten", „Unser Sortiment", „Kundenstimmen"); ansprechende
Bewertungs-Sektion; sehr guter, informativer Footer mit NAP + Öffnungszeiten; sinnvolle
Conversion-Elemente (Anruf, Route, „Bewertung schreiben", WhatsApp-Teilen).

**Schwächen:**

- 🔴 **Hero-Bereich zeigt einen „Coming soon"-Platzhalter** (große leere organische Form)
  statt eines echten Laden-/Produktfotos. Der visuell wichtigste Bereich „above the fold"
  bleibt leer und wirkt unfertig.
- 🟠 **„Tradition & Auswahl" hat einen leeren Bild-Platzhalter** (gestrichelte Box) — gleicher
  Eindruck des Unfertigen.
- 🟢 **Sortiment bewusst ohne Produktfotos** (Inhaberentscheidung, ADR-05 — keine eigenen
  hochwertigen Produktfotos möglich). Die textbasierten Icon/Karten sind gewollt und bleiben.
  Verbesserung hier nur gestalterisch (konsistente Karten/Icons), **nicht** durch Fotos.
  Echte Fotos fehlen aber dort, wo sie vorgesehen sind: **Hero** und **„Über uns"** (s. u.).
- 🟡 **„Vorschlag einreichen"-Floating-Button** überlagert dauerhaft Inhalte (auch mobil über
  CTAs) — Funktion/Ziel unklar, Platzierung prüfen.
- 🟡 **Mobil-Reflow nicht final verifiziert** (Tool-Limit beim Fenster-Resize). Responsive
  `md:`-Klassen und ein Mobile-Menü-Button sind im Code vorhanden → in P0 real testen.
- 🟢 Aktiver Nav-Zustand (grüne Pille/Unterstrich) ist klar; Logo/Markenkopf könnte etwas
  größer/prägnanter sein.

---

## 6. Inhalt & Content

**Stärken:** Authentische, warme Texte („Originaler Geschmack. Aus echter Tradition."),
glaubwürdige Markenstory (inhabergeführt, seit 2007, persönliche Beratung), konkrete
Sortiment-Beispiele mit Markennamen.

**Schwächen:**

- 🟠 **Wenig Keyword-Tiefe / dünner Content** für Local-SEO. Es fehlen Inhalte, die typische
  Suchintentionen bedienen (z. B. eigene Sortiment-Unterthemen, „Anfahrt & Parken",
  saisonale Frischware, FAQ).
- 🟡 **Kein Blog/Rezepte/Ratgeber.** Gerade für asiatische Küche sind Rezepte ein starker,
  themenrelevanter Traffic- und Verweildauer-Hebel (z. B. „Pho-Zutaten", „Ramen selber
  kochen") — mit klarer Brücke zum Sortiment.
- 🟡 **Bewertungen statisch & ohne Quellenlink.** Glaubwürdiger mit Verlinkung zum
  Google-Profil und einem Pflege-/Aktualisierungsprozess.

---

## 6a. Detailanalyse pro Untertab (Live + Code)

**Startseite (`#start`).** Hero mit Badge „Ihr Asia Markt seit 2007", starker Headline
(„Originaler Geschmack. Aus echter Tradition."), Markentext, drei CTAs (Kontakt/Öffnungszeiten,
Sortiment, Kundenstimmen) und Hinweis „kein Online-Shop". Rechts ein großer Bild-Platzhalter
(„Coming soon") — im Code steckt bereits ein **detailliertes Foto-Briefing** (Hochformat 4:5,
~800×1000 px, frische Zutaten aus der Vogelperspektive). Darunter Sektion „Google Bewertungen"
mit drei **statischen** Zitaten (kein Live-Bezug, kein Schema). Befund: Hero-Bild ersetzen +
geplantes **Bewertungs-Marquee** (s. eigene Spez-Datei) hebt genau diesen Bereich.

**Unser Sortiment (`#sortiment`).** Intro + Hinweis „kein Online-Shop" + **sechs inhaltlich
starke Kategorie-Karten**: (1) Frische Kräuter & Gemüse, (2) Nudeln & Ramen (Marken SamYang,
Mama, Udon, Glasnudeln), (3) Saucen & Würzmittel (Soja, Teriyaki, Currypaste, Fischsauce),
(4) Tofu, Tee & Getränke (Silken Tofu, Edamame, Enoki, Jasmintee), (5) Snacks & Spezialzutaten
(Mochi, Reiscracker, Yams, Pandan), (6) Tiefkühlprodukte (Fisch, Garnelen, Gyoza, Bällchen).
Bewusst **ohne Produktfotos** (ADR-05). Inhaltlich sehr gut & keyword-reich — als Basis für
spätere echte Unterseiten ideal.

**Tradition & Auswahl / Über uns (`#ueber-uns`).** Markenstory („Aus Liebe zur asiatischen
Esskultur"), Motivation (Pho, Curry, Ramen), Frischlieferungen, drei Kennzahlen-Kacheln
(Seit 2007 · Ganz Asien · Reichhaltig). Links **leerer Bild-Platzhalter** mit bereits
hinterlegtem Briefing (Ladeninterieur, ~800×1000 px). Befund: nur das Foto fehlt.

**Kontakt (`#kontakt`).** Inhaltlich die stärkste Seite: vollständige Adresse, Telefon,
**Parken** (gegenüber, Automat, 15 Min gratis, danach 1 €/Std., E-Auto 5 Std. kostenlos),
**Bezahlung** (Karte + Bargeld), Öffnungszeiten-Tabelle, „Bewerten Sie uns", Routen-/Teilen-
Funktionen (inkl. WhatsApp) und Google-Maps-Embed. Diese Fakten sollten zusätzlich ins Schema
(`paymentAccepted`, `openingHoursSpecification`, `hasMap`) und als lokale Content-Signale.

## 7. Barrierefreiheit (A11y) & Datenschutz

- 🟡 Farb­kontraste prüfen (helle Akzenttöne auf Creme), Fokus-Stile für Tastatur­navigation
  sicherstellen, Mobile-Menü auf `aria-expanded` und Fokus-Falle prüfen.
- 🟡 Google-Maps-`<iframe>` und Google Fonts laden Drittinhalte → Datenschutz-Hinweis /
  Consent bzw. Self-Hosting prüfen (DSGVO). `datenschutz.html` und `impressum.html` sind
  vorhanden und sollten auf Aktualität/Vollständigkeit geprüft werden.

---

## 8. Priorisierte Befundliste (Top-Hebel)

| Prio | Befund | Bereich | Aufwand | Wirkung |
|---|---|---|---|---|
| 1 | 3,5-MB-Logo optimieren | Performance | niedrig | hoch |
| 2 | Tailwind-Build statt CDN; `styles.min.css` bauen | Performance/Tech | niedrig | hoch |
| 3 | `GroceryStore`-JSON-LD-Schema | SEO | niedrig | sehr hoch |
| 4 | `sitemap.xml` + `robots.txt` | SEO | niedrig | mittel |
| 5 | Echte Multi-Page-Struktur (eigene URLs) | SEO/Tech | mittel | sehr hoch |
| 6 | Hero- & Tradition-Bilder ersetzen + Produktfotos | Visuell | mittel¹ | hoch |
| 7 | Open Graph / Twitter Cards | SEO/Social | niedrig | mittel |
| 8 | Review-/aggregateRating-Schema | SEO | niedrig | mittel |
| 9 | Content-Ausbau (FAQ, Anfahrt, Rezepte) | Content | mittel | mittel |
| 10 | A11y + Datenschutz/Consent | A11y/Recht | mittel | mittel |

¹ Aufwand abhängig von Fotolieferung durch den Inhaber (`TODO(inhaber)`).

---

> Die konkrete, umsetzbare Abarbeitung dieser Befunde — phasenweise, mit Aufgaben,
> Datei-Hinweisen und Akzeptanzkriterien für Claude Code — steht in **`PLAN.md`**.
