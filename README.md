# Asia Markt Thien Phu

Statische Website des Ladengeschäfts in Langenfeld: [www.asiamarkt.info](https://www.asiamarkt.info/). GitHub Pages veröffentlicht `main`, Cloudflare liegt davor. Kein Shop, kein Framework und kein Build-Schritt für die Website.

## Code und Zuständigkeiten

| Dateien | Aufgabe |
|---|---|
| `index.html`, `sortiment.html`, `ueber-uns.html`, `kontakt.html` | Startseite, Sortiment, Laden und Besuchsinformationen. |
| `impressum.html`, `datenschutz.html` | Rechtstexte und Kontaktangaben. |
| `route.html` | Google-Maps-Weiterleitung auch ohne JavaScript; bewusst außerhalb der Sitemap. |
| `assets/css/site.css` | Gestaltung aller sechs Inhaltsseiten, nach Komponenten gegliedert. |
| `assets/css/fonts.css`, `assets/fonts/` | Lokal gehostete Lora 700; Arial/Systemschriften für Fließtext. |
| `assets/js/site.js` | Menü, Berliner Öffnungsstatus und Karte nach Freigabe. |
| `assets/images/`, `favicon.ico`, `site.webmanifest` | Verwendete Bilder und Browser-/Lesezeichen-Icons. |
| `design/` | Unverändertes Logooriginal für die Icon-Erzeugung und Schriftlizenz. Nicht ausgeliefert. |
| `scripts/` | Lokale Vorschau, Seiteninventar, Icon-Erzeugung und Lighthouse. |
| `tests/`, `playwright.config.js`, `.github/workflows/website.yml` | Automatische Qualitätsprüfung lokal und in GitHub Actions. |

Dieses Git-Repository enthält ausschließlich den Website-Bestand einschließlich notwendiger Quellen, Lizenzen und Prüfwerkzeuge. Projektgedächtnis, manuelle Berichte, Archive, Agenten-Einstellungen und temporäre Prüfergebnisse bleiben lokal und sind per `.gitignore` ausgeschlossen. Ein Strukturtest verhindert ihre erneute Versionierung. Frühere Commits bleiben historische Stände.

## Starten und prüfen

Node ab 22.19 und Chrome erforderlich. Falls Chrome fehlt: `npx playwright install chrome`. CI installiert das zu Playwright passende Chromium gemäß [offizieller Anleitung](https://playwright.dev/docs/ci).

```bash
npm ci
npm run dev            # http://127.0.0.1:4173
npm test               # Logik, Struktur, Server und Browser
npm run qa:lighthouse  # aktuelle Mobilmessung der sechs Inhaltsseiten
npm run build:icons    # nur bei Änderungen am Logo oder Zuschnitt
```

Die Vorschau bindet ausschließlich an `127.0.0.1` und liefert nur öffentliche Dateien. Optional ändert `PORT` den Port; Tests verwenden 4173. Es gibt keinen CSS-Build und keine Tailwind-Abhängigkeit.

Geprüft werden 320/390/768/1280 px, Menü/Tastatur, Navigation ohne JavaScript, Maps-Freigabe/Widerruf, Routenziel, Öffnungszeiten, JSON-LD, Referenzen einschließlich `srcset`/Schriften/Manifest, verwendete Assets und transparente Icon-Ecken. Berichte/Screenshots entstehen unter `docs/qa-output/` und werden nicht versioniert. Axe ersetzt keine vollständige Prüfung mit Hilfsmitteln, Lighthouse keine Felddaten; reale Google-/Cloudflare-Funktion nach Deployment separat prüfen.

## Pflege

Seitentexte stehen direkt im jeweiligen HTML, Gestaltung in `site.css`, Verhalten in `site.js`. Gemeinsame Navigation/Footer und vier JSON-LD-Blöcke sind bewusst statisch wiederholt: Jede URL funktioniert ohne JavaScript und Generator. Strukturtests sichern ihre Konsistenz. Die eigenständige Route besitzt ein kleines eigenes Stylesheet.

- Startseite: Geschäftsname ohne Bildlogo. Unterseiten und JSON-LD verwenden weiter `thien_phu_logo.webp`.
- Öffnungszeiten: `OEFFNUNGSZEITEN` in `site.js`, sichtbare Wochenzeiten und JSON-LD gemeinsam ändern. Index 0 ist Sonntag. Standortzeit `Europe/Berlin`; NRW-Feiertage geschlossen. Ausnahmen nur nach Inhaberbestätigung mit `bestaetigtAm`; 24./31. Dezember bleiben bis zur Bestätigung ungeklärt. Schema und Rückgabeverträge stehen direkt am Code.
- Keine erfundenen Produkte, Bewertungen oder Geschäftsaussagen. Bewertungsstand und Veröffentlichungsdatum der Zitate sind getrennte Angaben.
- Cloudflare-E-Mail-Schutz bleibt aktiv. Karten vor Freigabe nicht laden; Widerruf erhalten. Routenlinks verwenden `/route.html`.
- CSS/JS/Schriften/Icons über die gleiche Cacheversion in allen Seiten aktualisieren; Icons außerdem in Route und Manifest. Sitemap-Datum nur bei tatsächlichen Seitenänderungen anpassen.
- Vor Push/Merge aktuelle Tests und Sichtprüfung durchführen; nach Merge erfolgreichen Pages-Lauf und Live-Auslieferung prüfen.

## Bild- und Schriftquellen

`design/thien_phu_logo.png` ist das unveränderte Inhaberoriginal (2048²). `scripts/build-icons.js` dokumentiert den Kreiszuschnitt um den grünen Ring einschließlich der vier Goldpunkte. Es erzeugt transparente ICO-Größen 16/32/48 und PNG-Größen 180/192/512 ohne Neuzeichnung. PNGs werden verlustfrei komprimiert; Betriebssysteme können Startbildschirm-Symbolen selbst einen Hintergrund geben. Icon-Verweise und Größen orientieren sich an der [HTML-Dokumentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel#icon).

Ladenfotos und responsive Varianten stammen aus dem vorhandenen Inhaberbestand. Veröffentlichte Bilder bleiben unter 300 KB; das nicht ausgelieferte Logooriginal ist bewusst größer. Die einzige Webschrift ist Lora 700, lokal in den Teilmengen `latin`/`latin-ext`: [Quelle](https://github.com/google/fonts/tree/main/ofl/lora), [OFL-Lizenz](design/OFL-Lora.txt). Keine externen Schriftanfragen beim Seitenaufruf.

`_config.yml` schließt Quellen und Werkzeuge vom Pages-Output aus. Diese Konfiguration ersetzt nicht die Git-Ausschlüsse lokaler Unterlagen.
