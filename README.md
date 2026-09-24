# Asia Markt Thien Phu — Website-Projekt

**Aktives Projekt, Stand 24.09.2026.** `main` wird über GitHub Pages veröffentlicht; Cloudflare liegt davor. Ein Merge auf `main` verändert die öffentliche Website.

Statische Website von **Asia Markt Thien Phu**
(asiatisches Lebensmittelgeschäft, Hauptstraße 74, 40764 Langenfeld).
Live: https://www.asiamarkt.info/ · Repo: `asiasince2007/website` (GitHub Pages).

## Aktueller Einstieg

| Datei | Zweck |
|---|---|
| `00_Gedaechtnis/gestaltungsanalyse_2026-09-24.md` | Neueste klassische Ladenansicht: Analyse aller Seiten, lokale Vorbilder, Quellen und Nachweis des Inhalts-/SEO-Erhalts. Lokal geprüft, noch nicht veröffentlicht. |
| `CLAUDE.md` | Verbindliche Arbeitsregeln und aktueller Stack. |
| `00_Gedaechtnis/02_projektstand.md` | Aktueller Stand, Prüfnachweise und offene externe Schritte. |
| `00_Gedaechtnis/kundenanalyse_2026-09-24.md` | Ausgangsanalyse aus Kundensicht, vor der Umsetzung. |
| `00_Gedaechtnis/umsetzung-kundenanalyse_2026-09-24.md` | Änderungen, Quellen, tatsächlich durchgeführte Tests und Prüfgrenzen. |
| `00_Gedaechtnis/nacharbeit-kundenangaben_2026-09-24.md` | Letzte Inhabervorgaben: Feiertage geschlossen, Texte vereinfacht, Buttons entfernt, Linkhaftung geprüft. |
| `00_Gedaechtnis/oeffnungszeiten-pflegen.md` | Reguläre Zeiten, NRW-Feiertage und bestätigte Ausnahmen pflegen. |
| `00_Gedaechtnis/_INDEX.md` | Einstieg in Entscheidungen, Fehlerwissen und historische Protokolle. |

## Technik und lokale Prüfung

Sechs eigenständige HTML-Seiten plus `/route.html`. Aktive Gestaltung und Verhalten liegen in **`assets/css/site.css` und `assets/js/site.js`**. Kein Build-Schritt für die Website erforderlich. `fonts.css`, lokale Schriftdateien und vorhandene Ladenfotos bleiben eingebunden. Tailwind-Quellen und `styles.min.css` sind historische, unbenutzte Bestände.

```bash
npm ci
npm run dev             # http://127.0.0.1:4173
npm test                # Statuslogik, Struktur/JSON-LD, 36 Browserfälle
npm run qa:lighthouse   # aktuelle lokale Mobilmessung aller sechs Seiten
node scripts/qa-design-preservation.cjs # Nachweis des reinen Gestaltungsumbaus gegen 3e1e459
```

Voraussetzungen: Node ab 22.19 und installiertes Chrome. Falls Chrome fehlt: `npx playwright install chrome`. Getestet am 24.09.2026 mit Node 26.7 und lokalem Chrome. Ergebnisse/Screenshots liegen in `docs/qa-output/` (Git-ignoriert). Die Browserprüfung deckt 320, 390, 768 und 1280 px ab. Maps-/Routenintegration in der reproduzierbaren Suite nutzt kontrollierte Netzwerkantworten; echte Drittanbieter und Cloudflare zusätzlich live prüfen. Automatische Axe-Tests sind keine vollständige WCAG-Zertifizierung, JSON-LD-Tests kein Google Rich-Results-Test, lokale Lighthouse-Werte keine Felddaten.

Historische QA-Skripte: `90_Archiv/qa-v1_2026-09-24/`. Frühere README-/CLAUDE-Fassungen: `90_Archiv/projektleitfaden-v1_2026-09-24/`. Nicht den alten Tailwind-/Modal-Tests folgen. Der verbleibende Befehl `legacy:build:css` dient ausschließlich historischen Quellen und ändert nicht das aktuelle Layout.

## Pflege und Veröffentlichung

Die neueste lokale Darstellung folgt E-43: vorhandene Lora für Überschriften, Arial im Fließtext, Schaufensterrot und helle Naturtöne, klassische Navigation und keine Scroll-Einblendungen. Alle sechs HTML-Bodies bleiben gegenüber `3e1e459` unverändert. CSS-/JS-Vorfassungen liegen in `90_Archiv/gestaltung-v1_2026-09-24/`. Stand und Veröffentlichungsgrenze im Gestaltungsbericht oben; ältere Live-Prüfungen belegen diesen neuen Branch noch nicht.

- Wochenzeiten im sichtbaren HTML, in vier JSON-LD-Blöcken und im zentralen `OEFFNUNGSZEITEN`-Objekt synchron halten. Sonderzeiten nur nach Inhaberbestätigung; Anleitung oben.
- An gesetzlichen NRW-Feiertagen immer geschlossen (Inhaberbestätigung 24.09.2026). 24. und 31. Dezember: 9 bis 14 Uhr nur vorläufig vorgemerkt, endgültige Bestätigung offen. Keine pauschalen Feiertagswarnungen mehr, kurze Information über mögliche kurzfristige Schließungen.
- Zeitspannen in sichtbaren Texten und Metadaten mit „bis“, keine Halb-/Geviertstriche. Keine zusätzlichen Warengruppenbuttons auf der kurzen Sortimentsseite.
- **Cloudflare-E-Mail-Schutz bleibt auf ausdrücklichen Inhaberwunsch aktiv.** Keine Obfuscation-Ausnahme vorbereiten oder aktivieren. Die E-Mail kann deshalb ohne JavaScript live verborgen bleiben; lokale Darstellung und Live-Prüfung unterscheiden.
- Routenlinks verwenden weiter `/route.html`. Keine Produkte, Bestände, Zahlungsarten oder Aussagen zur Zugänglichkeit ergänzen, die nicht belegt sind.
- Bei Assetänderungen die CSS-/JS-Version in allen sechs Seiten synchron erhöhen; Sitemap-`lastmod` nur bei echten Seitenänderungen pflegen.
- Push/Merge nur im beauftragten Rahmen; am 24.09.2026 wurden beide ausdrücklich autorisiert. Nach dem Merge Pages-Deployment und Live-Auslieferung prüfen.
- Den Website-Link im Google-Unternehmensprofil separat auf `https://www.asiamarkt.info/` setzen. Eine Repository-Änderung erledigt diesen externen Schritt nicht.

`_config.yml` schließt Dokumentation, Archiv und Testwerkzeuge vom Pages-Output aus. Das Git-Repository selbst ist öffentlich; keine vertraulichen Unterlagen oder Zugangsschlüssel einchecken.
