# CLAUDE.md — Projektleitfaden für Claude Code

> Dieses Repo ist die Website von **Asia Markt Thien Phu**, einem inhabergeführten
> asiatischen Lebensmittelgeschäft in Langenfeld (Rheinland).
> Live: https://www.asiamarkt.info/ · Hosting: GitHub Pages · Repo: `asiasince2007/website`

## Wichtigste Regeln für die autonome Umsetzung

1. **Lies zuerst `docs/GEDAECHTNIS.md`** — dort stehen verbindliche Fakten (NAP, Öffnungszeiten),
   getroffene Architektur­entscheidungen, bekannte Fehler und ihre Fixes. Aktualisiere diese
   Datei nach jeder Sitzung (Abschnitt „Änderungs- & Lernprotokoll").
2. **Arbeite den `docs/PLAN.md` phasenweise ab.** Jede Aufgabe hat Akzeptanzkriterien.
   Hake erledigte Punkte ab (`[x]`) und committe in kleinen, thematisch sauberen Schritten.
3. **NAP-Konsistenz ist heilig.** Name, Adresse, Telefon müssen exakt mit dem Google
   Business Profile übereinstimmen — überall identisch (Footer, Kontakt, Schema, Impressum).
   Siehe `docs/GEDAECHTNIS.md` → „Stammdaten (NAP)".
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
keine Konsolenfehler, und `docs/GEDAECHTNIS.md` aktualisiert ist.
