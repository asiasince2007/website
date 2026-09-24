# Umsetzung der Kundenanalyse vom 24.09.2026

**Historischer Stand der Grundumsetzung aus PR #50.** Anschließend bestätigte der Inhaber die Feiertagsschließung und beauftragte weitere Vereinfachungen. Aktuell maßgeblich: [Nacharbeit](nacharbeit-kundenangaben_2026-09-24.md) und `02_projektstand.md`. Die nachfolgenden Angaben zu Feiertagsunsicherheit, Gruppenbuttons und zunächst weggelassener Bewertungsanzahl beschreiben die zuerst veröffentlichte Fassung; die Nacharbeit ersetzt diese Punkte. PR #50 wurde erfolgreich veröffentlicht und live geprüft.

Grundlage: [Kundenanalyse](kundenanalyse_2026-09-24.md), aktueller August-Code und anschließender Umsetzungsauftrag des Inhabers. Bestehende Gestaltung, Geschäftsidentität, sechs statische Inhaltsseiten und vorhandene URLs bleiben erhalten. Bearbeitet wurden insbesondere die tatsächlich eingebundenen Dateien `assets/css/site.css` und `assets/js/site.js`.

## Änderungen und Begründung

| Bereich | Vorher | Jetzt |
|---|---|---|
| Öffnungsstatus | Gerätezeitzone und reine Wochenliste; falsche Öffnung an Feiertagen möglich | `Europe/Berlin`, elf NRW-Feiertage, bestätigte Schließtage/Sonderzeiten mit Vorrang, nächste Öffnung unter Berücksichtigung der Ausnahmen |
| Ungeklärte Zeiten | Reguläre Öffnung ungeprüft übernommen | Ehrlicher telefonischer Prüfhinweis an ungeklärten Feiertagen, zusätzlich Heiligabend/Silvester; keine Sonderöffnung erfunden |
| Pflege | Keine zentrale Ausnahmeliste | Dokumentiertes `OEFFNUNGSZEITEN`-Objekt mit Datum, Zeitfenstern und Bestätigungsdatum; [Pflegeanleitung](oeffnungszeiten-pflegen.md) |
| Anrufbutton | Dunkle Schrift auf Rot im Menü, 2,77:1 | Weiße Schrift, dunklerer Hover-/Fokuszustand, sichtbare Tastaturkontur in Desktop-/Mobilmenü |
| Bewertungsquellen | 4,12:1 auf dem rosafarbenen Band | Vorhandener dunklerer Grauton; ebenfalls im aktuellen Axe-Scan geprüft |
| Datenschutz bei 320 px | Lange Überschrift lief horizontal über | Sinnvolle Trennstelle „Datenschutz-erklärung“ plus allgemeiner Umbruch; keine abgeschnittenen Inhalte |
| Navigation ohne JS | Mobile Menüpunkte verborgen | `noscript`-Grundzustand zeigt normale Links im Dokumentfluss; kein toter Menüschalter. Mit JS kompakte Navigation wie bisher |
| Ladezustand | Zwischenzeitliche erste Umsetzung konnte beim Menüstart springen | Kein kurzzeitig ausgeklapptes Menü während verzögerter JS-Ausführung; eigener Regressionstest |
| E-Mail-Schutz | Cloudflare-Obfuscation aktiv | Auf ausdrücklichen Inhaberwunsch erhalten; keine Ausnahme vorbereitet und keine Cloudflare-Einstellung geändert |
| Besuchsabschluss | Keine Route am Ende von Sortiment und Ladenseite | Adresse, reguläre Zeiten, Feiertagshinweis und „Route planen“/„Anrufen“; Route weiterhin über `/route.html` |
| Sortiment mobil | Wiederholtes großes Außenfoto; später Anrufhinweis | Kompakter Einstieg ohne Außenfoto, frühere telefonische Bestandsprüfung, sechs Sprunglinks; erste Warengruppe bei 390 px ab ca. 504 statt ca. 690 px, Anrufhinweis ca. 313 statt ca. 1900 px |
| Warengruppen | Tofu doppelt, Gemüse bei Getränken | Frisches/Gemüse/Tofu zusammen, Tee/Getränke und Snacks/Süßigkeiten klar getrennt; nur bereits vorhandene Beispiele umgeordnet |
| Parken | Verkürzte Freipark-Angaben ohne Bedingungen | Automatenstart auch für kostenlose 15 Minuten, Stundenregel und E-Parken mit Bedingungen/Befristung; städtische Regeln und konkrete Stellplätze getrennt |
| Bewertungen | 4,4 / 127, Stand August | 4,4 Sterne, Stand 24.09.2026, auf beiden Seiten konsistent ohne genaue Anzahl; historische Zitatdaten unverändert |
| Sitemap/Cache | Teilweise alte Änderungsdaten | `lastmod` 24.09.2026 für alle sechs tatsächlich geänderten Seiten, Cacheversion für aktive CSS/JS synchron |
| Dokumentation/Tests | Stale Tailwind-/Modal-Anweisungen | README/CLAUDE aktiv berichtigt, historische Fassungen und QA-Skripte archiviert, Tests direkt gegen aktuelle Quellen |

## Quellen und Ungewissheiten

**Feiertage:** [Feiertagsgesetz NRW, § 2](https://recht.nrw.de/lrgv/gesetz/01012000-bekanntmachung-der-neufassung-des-gesetzes-ueber-die-sonn-und-feiertage/), geprüft 24.09.2026. Berechnung: sechs feste und fünf von Ostern abhängige Feiertage. Heiligabend/Silvester ausdrücklich keine gesetzlichen Feiertage. Ohne bestätigte Betriebszeiten wird keine Öffnung behauptet; tatsächliche Sonderzeiten fehlen bislang und wurden nicht aus Kalenderdaten abgeleitet.

**Parken:** [Städtische Park-FAQ](https://www.langenfeld.de/Startseite/Aktuelles-und-Information/Aktuelles.htm/Aktuelles/Zukunft-des-strassenbegleitenden-Parkens.html) und [Elektromobilität Langenfeld](https://www.langenfeld.de/Seiten/Elektromobilitaet-in-Langenfeld.html), beide erneut am 24.09.2026 geöffnet. Beim städtischen Straßenparken: Kennzeichen und Parkdauer am Automaten auch für die freien 15 Minuten; 1 € je angefangene Stunde. E-Fahrzeuge mit E-Kennzeichen oder blauer Langenfelder Plakette und Parkscheibe bis zur zulässigen Höchstparkdauer (FAQ: fünf Stunden). Verlängerung bis 31.12.2026, ausgenommen beschrankte Anlagen/Parkhäuser/Tiefgaragen. Beschilderung und Zuordnung der Stellplätze direkt gegenüber sind damit nicht vor Ort geprüft. Sichtbarer Hinweis verweist auf den konkreten Tarif und die Schilder.

**Bewertungen:** [Öffentliches Google-Profil](https://maps.app.goo.gl/AYB2Qmshj8aWzXBR7) erneut in Chrome geöffnet. Name, Adresse und Telefon entsprechen der Website; 4,4 Sterne sichtbar. Anders als in der vorausgehenden Analyse zeigte diese erneute eingeschränkte Maps-Ansicht keine Bewertungsanzahl. Die dort zuvor beobachteten 128 werden deshalb nicht ungeprüft übernommen. Neue Darstellung verzichtet auf die genaue Anzahl, hält das bestätigte Rating und das aktuelle Prüfdatum fest. Screenshot lokal: `docs/qa-output/google-profil-2026-09-24.png`.

## Tatsächlich durchgeführte lokale Prüfung

- **14 Node-Tests bestanden:** elf NRW-Feiertage 2026, bewegliche Feiertage in mehreren Jahren, NRW-Abgrenzung, Öffnungs-/Schließgrenzen, Samstage/Sonntage, Berliner Mitternacht, Sommer-/Winterzeit, Jahreswechsel, vier Gerätezeitzonen, bestätigte Ausnahmen/Mittagspause/Betriebsferien, ungültige und unbestätigte Ausnahmen, fehlerhafte Gerätezeit. Strukturprüfung aller internen HTML-Ziele/Medien/Sprungmarken, vier JSON-LD-Blöcke mit Geschäftsdaten und Wochenzeiten, kanonische URLs und Sitemap.
- **36 Browserfälle bestanden (35 im vollständigen Lauf plus separater neuer Ladezustandsfall):** sechs Inhaltsseiten × 320/390/768/1280 px, jeweils ohne horizontalen Überlauf, ohne JavaScript-Laufzeitfehler und ohne automatisch festgestellte Axe-WCAG-Verstöße; Reveal-Inhalte vor dem Scan sichtbar gemacht. Vier Menütests mit Enter/Tab/Escape, Fokus-Rückgabe, Navigation sowie Anruf-Farben einschließlich Hover/Fokus. Zusätzlich sechs Seiten ohne JavaScript, frühere Sortiments-/Anrufposition, Besuchsaktionen, Karte laden/ausblenden mit Fokus-Rückgabe, Routenweiterleitung ohne JavaScript und Status am 03.10.2026 in Berlin/Honolulu/Tokio. Eigenständiger Regressionstest mit verzögert ausgeliefertem `site.js` gegen den Mobilmenü-Layoutsprung.
- **Visuell angesehen:** mobile Sortimentsansicht bei 390 px, Datenschutzüberschrift und geöffnetes Menü bei 320 px, Kontaktseite bei 1280 px. Alle 24 Kombinationen als vollständige Screenshots aufgenommen. Ohne aktiviertes JavaScript bleiben Karte-direkt-Link und Navigation erreichbar; der JS-Kartenknopf ist dann ausgeblendet.
- **Abhängigkeiten:** `npm audit` meldet nach kompatibler Aktualisierung drei historischer transitiver Pakete 0 bekannte Schwachstellen. Keine zusätzlichen Laufzeitpakete für die ausgelieferte Website. Neue Pakete dienen ausschließlich lokalen Tests/Messungen.
- **Git:** `git diff --check` durchgeführt. Historische Skripte verschoben statt gelöscht; fremde Arbeitsstände in `.claude/worktrees/` nicht verändert.

Maps und Route nutzen im reproduzierbaren Browserlauf kontrollierte Antwortseiten. Das prüft Einwilligung, URL und Weiterleitung, nicht Googles Kartenserver. Ein echter Anruf oder eine E-Mail wurde nicht ausgelöst. Automatisierte Axe-Tests sind keine umfassende Prüfung mit Screenreadern. Keine native Safari-/iOS-/Android-Gerätematrix, kein aktueller Google Rich-Results-Test, keine Search-Console- oder Cloudflare-Kontostatistik. Die absolute Geräteuhr bleibt eine technische Voraussetzung für den dynamischen Status.

### Neue Lighthouse-Messung

Lokales Chrome, Lighthouse 13.5, Mobile-Simulation, sechs Seiten, 24.09.2026. Vollständige JSON-Berichte und Messzeitpunkte: `docs/qa-output/lighthouse-*.json`, Übersicht `lighthouse-summary.json`. Endgültiger Durchlauf: 2026-09-24T12:00:51.115Z bis 2026-09-24T12:01:25.848Z.

| Seite | Performance | Accessibility | Best Practices | SEO | CLS |
|---|---:|---:|---:|---:|---:|
| index | 93 | 100 | 100 | 100 | 0.0002 |
| sortiment | 99 | 100 | 100 | 100 | 0.0002 |
| ueber-uns | 96 | 100 | 100 | 100 | 0.0002 |
| kontakt | 99 | 100 | 100 | 100 | 0.0002 |
| impressum | 99 | 100 | 100 | 100 | 0.0002 |
| datenschutz | 99 | 100 | 100 | 100 | 0.0002 |

Ältere Augustwerte werden nicht als Nachweis verwendet.

Die Zwischenmessung zeigte auf der Startseite einen sporadischen Menü-Layoutsprung (CLS ca. 0,356, Performance 76). Daraufhin wurde der `noscript`-Grundzustand ergänzt und ein Regressionstest mit verzögertem Skript eingeführt. Ein früherer Aufräumfehler beim Chrome-Temp-Profil ist separat in F-25 dokumentiert; das Messskript verwendet jetzt ein eigenes lokales Profil.

## Veröffentlichung und externe Schritte

Der letzte Satz des Auftrags autorisiert Push und Merge. Der geprüfte Stand geht über `codex/kundenverbesserungen-2026-09-24` und einen Pull Request nach `main`; GitHub Pages veröffentlicht. Lokale Prüfung und spätere Live-Prüfung getrennt behandeln. Nach Merge: Deployment-Ergebnis, aktuelle Seiten/Assets, echte Karte und Routenweiterleitung sowie E-Mail-Decodierung hinter Cloudflare prüfen. Live-Nachweis wird separat protokolliert.

**Noch außerhalb dieser Codeänderung erforderlich:**

1. Im Google-Unternehmensprofil den Website-Link von `http://asiamarkt.info` auf **`https://www.asiamarkt.info/`** ändern. Danach öffentlichen Link und tatsächliche Weiterleitungen erneut prüfen. Es wurden keine Kontoeinstellungen im Google-Profil verändert.
2. Inhaber bestätigt, welche Tarife/Höchstparkdauer/Automatenbedingungen auf den Stellplätzen gegenüber tatsächlich angeschlagen sind. Erst dann daraus konkrete Stellplatzversprechen formulieren. E-Parkregel spätestens zum 31.12.2026 erneut prüfen.
3. Inhaber bestätigt tatsächliche Feiertags-/Sonderzeiten und etwaige Schließtage. Bis dahin bleiben neutrale Hinweise und eine leere Ausnahmeliste. Keine erfundenen Öffnungen, Produkte, Preise, Bestände, Zahlungsarten oder Aussagen zur Zugänglichkeit.

**Bewusst erhaltene Grenze:** Der Cloudflare-E-Mail-Schutz kann die Adresse ohne JavaScript verbergen. Das wurde vom Inhaber ausdrücklich gewünscht; es gibt keinen offenen Abschaltauftrag. Menü und reguläre Besuchsinformationen sind davon unabhängig nutzbar.
