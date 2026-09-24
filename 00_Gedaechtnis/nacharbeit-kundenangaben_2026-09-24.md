# Nacharbeit der Kundenangaben und Abschlussprüfung

Stand: 24.09.2026. Dieser Nachtrag ist für die jüngsten Inhabervorgaben maßgeblich. Die [Kundenanalyse](kundenanalyse_2026-09-24.md) und die [erste Umsetzung](umsetzung-kundenanalyse_2026-09-24.md) bleiben als datierte Ausgangsstände erhalten.

## Umsetzung

| Vorher | Jetzt |
|---|---|
| Gesetzliche Feiertage waren nach der ersten Korrektur vorsichtshalber ungeklärt. | Inhaber bestätigt: immer geschlossen. Alle elf NRW-Feiertage schließen automatisch; nächste Öffnung überspringt sie. Auch ein versehentlicher Ausnahme-Eintrag kann diese Regel nicht umgehen. |
| Allgemeine Hinweise auf mögliche Feiertagsabweichungen. | Statische Zeiten nennen Sonntag und Feiertage als geschlossen. Hinweis: „In Ausnahmefällen sind kurzfristige Schließungen möglich. Rufen Sie bei Fragen gerne an.“ |
| Zeitspannen teils mit Halbgeviertstrichen, auch in Metadaten. | Sichtbares HTML und Metadaten aller sechs Seiten mit „bis“; keine Halb-/Geviertstriche. |
| Sechs zusätzliche Sprungbuttons über der kurzen Sortimentsliste. | Auf ausdrücklichen Wunsch entfernt, zugehöriges CSS bereinigt. Warenüberschriften, bestehende Anker und frühe telefonische Verfügbarkeitsfrage erhalten. |
| Nach eingeschränkter Google-Ansicht zunächst keine genaue Bewertungsanzahl veröffentlicht. | Echter Google-Embed zeigt visuell 4,4 Sterne und 128 Bewertungen, erneut geprüft am 24.09.2026. Startseite und Ladenseite konsistent gepflegt. |
| Stadtlinks als Quellen, ohne ausdrücklich sichtbare Kennzeichnung als externe Seiten. | Herkunft und externe Ziele klar beschriftet. Kein pauschaler Haftungsausschluss hinzugefügt. |

Der erste Warenabschnitt beginnt bei 390 px Bildschirmbreite jetzt bei rund **388 px** Dokumenthöhe, die telefonische Frage bei **313 px**. In der Ausgangsanalyse begann der Warenbereich erst ungefähr bei 690 px; die Zwischenfassung mit Gruppenbuttons lag bei rund 504 px. Das ursprüngliche Design, die URLs und die statische Mehrseitenstruktur bleiben erhalten.

Die Fehlerkorrekturen aus PR #50 bleiben aktiv: Europe/Berlin, pflegbare bestätigte Ausnahmen, kontrastreiche Anrufbuttons, Datenschutzumbruch bei 320 px, Mobilnavigation ohne JavaScript, Besuchsabschlüsse, präzisierte Parkregeln. Cloudflare-E-Mail-Schutz bleibt auf ausdrücklichen Wunsch aktiv.

## Heiligabend und Silvester: ausdrücklich offen

Inhaberantwort: An beiden Tagen regulär geöffnet, vorläufig nur bis 14 Uhr; genaue Bestätigung folgt. Damit **24. und 31. Dezember vorläufig jeweils 9 bis 14 Uhr** im Projekt vorgemerkt. Noch keine bestätigten Produktionsausnahmen eingetragen. Bis zur Bestätigung zeigt die Statuslogik an diesen Tagen einen neutralen telefonischen Prüfhinweis. Die Tage sind keine gesetzlichen NRW-Feiertage und werden nicht einfach als Feiertag geschlossen eingestuft.

Nach Bestätigung konkrete Daten in `OEFFNUNGSZEITEN.ausnahmen` eintragen und statische Hinweise sowie das Google-Unternehmensprofil passend pflegen. Vorgehen: [Öffnungszeiten pflegen](oeffnungszeiten-pflegen.md).

## Recherche: Haftung für externe Links

Die Frage betrifft eine behauptete Haftungsfreistellung für verlinkte Inhalte. Ein pauschaler Satz im Datenschutz wie „Wir haften nicht für externe Seiten“ ist dafür kein verlässlicher Schutz. Die IHK Mittlerer Niederrhein rät von pauschalen Disclaimern ab; eine allgemeine Pflicht, einen solchen Disclaimer aufzunehmen, ergibt sich aus dieser Beratung nicht. Deshalb wird kein zusätzlicher Haftungstext eingefügt. [IHK Mittlerer Niederrhein: Haftungsausschluss/Disclaimer](https://mittlerer-niederrhein.ihk.de/themen/recht-steuern/recht-von-a-bis-z/haftungsausschluss-disclaimer), abgerufen am 24.09.2026.

Nach der IHK Schwerin folgt eine Verantwortung nicht schon allein aus dem Setzen eines Links. Relevant können insbesondere zu eigen gemachte Inhalte, offensichtliche Rechtsverletzungen oder unterlassene Reaktion auf konkrete Hinweise sein. Externe Ziele sollen als solche erkennbar bleiben. Für diese Website folgt daraus: nur passende bekannte Stadtquellen verlinken, Herkunft deutlich kennzeichnen, bei konkreten Problemen den Link prüfen und gegebenenfalls entfernen. Eine Kennzeichnung selbst schafft keine Haftungsbefreiung. [IHK Schwerin: Haftung für Links im Internet](https://www.ihk.de/schwerin/recht/datenschutz-und-digitalisierung/haftung-fuer-links-im-internet-6297740), abgerufen am 24.09.2026.

Die Prüfung beantwortet die konkrete Disclaimerfrage anhand dieser veröffentlichten IHK-Hinweise. Sie ist keine anwaltliche Einzelfallfreigabe der gesamten Website. Die gesonderte Einwilligung für die eingebettete Google-Karte und ihre Datenschutzbeschreibung bleiben bestehen.

## Tatsächlich durchgeführte lokale Prüfungen

Umgebung: Windows, Node 26.7, installiertes Chrome, Playwright 1.63.0, Axe 4.13.0, Lighthouse 13.5.0; statischer Entwicklungsserver auf 127.0.0.1:4173.

- `npm test`: **15 Logik-/Strukturtests und 36 Browserfälle bestanden**, Exit 0. Letzter vollständiger Lauf nach den Nachträgen. Kalenderfälle umfassen Öffnungs-/Schließgrenzen, Wochenende, alle elf NRW-Feiertage 2026, bewegliche Feiertage anderer Jahre, Sommer-/Winterzeit, Berliner Mitternacht, fremde Gerätezeitzonen, bestätigte Schließtage/Sonderzeiten, Mittagspause, ungültige/unbestätigte Ausnahmen sowie Jahresendtage.
- Alle sechs Seiten bei **320, 390, 768 und 1280 px**: kein horizontaler Überlauf, keine Browser-JavaScript-Fehler, keine Befunde im ausgeführten automatischen Axe-Scan. Einblendinhalte wurden für die Kontrastprüfung sichtbar gescrollt. Menü mit Enter, Tab und Escape, Fokusrückgabe, Navigation und Anrufbuttonfarben einschließlich Hover/Fokus geprüft. Verzögertes JavaScript erzeugt keinen Sprung durch das Mobilmenü.
- Ohne JavaScript: mobile Navigation auf allen sechs Seiten sichtbar, reguläre Zeiten lesbar, Navigation nutzbar, direkter Kartenlink vorhanden. Lokale Karten-/Routentests nutzen kontrollierte Antworten; reale Google-Verbindung wurde getrennt live geprüft, siehe unten.
- NAP-/Telefon-/Routen- und JSON-LD-Prüfungen bestanden. Keine neuen Produkte, Zahlungsarten, Bestände oder Zugänglichkeitsversprechen ergänzt. Sitemap-Datum 24.09.2026 bleibt korrekt, da alle sechs Inhaltsseiten tatsächlich geändert wurden.
- Drei zusätzliche Ansichten visuell geprüft: Sortimentsanfang bei 390 px, Datenschutzüberschrift und Footer bei 320 px. Überschrift bricht ohne Abschneiden um, Feiertagszeile und Schließungshinweis passen.
- Neue lokale mobile Lighthouse-Messung aller sechs Seiten am 24.09.2026, 14:30 bis 14:31 Uhr MESZ, Exit 0:

| Seite | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| Start | 96 | 100 | 100 | 100 |
| Sortiment | 99 | 100 | 100 | 100 |
| Der Laden | 96 | 100 | 100 | 100 |
| Kontakt | 99 | 100 | 100 | 100 |
| Impressum | 99 | 100 | 100 | 100 |
| Datenschutz | 99 | 100 | 100 | 100 |

CLS jeweils rund 0,00018. Rohberichte/Screenshots: `docs/qa-output/` (lokal, Git-ignoriert). Diese Messung stammt aus dem finalen lokalen Codezustand, nicht aus früheren Augustwerten. Lokale Labormessung ist kein Nachweis für alle realen Geräte/Netze; Axe ersetzt keinen vollständigen manuellen Test mit Hilfsmitteln, JSON-LD-Prüfung keinen Google Rich-Results-Test.

## Veröffentlichung und Live-Nachweis

Der Inhaber hat Push und Merge ausdrücklich beauftragt. Die zuerst mitkopierte Einschränkung „lokal ohne Veröffentlichung“ wurde durch diesen abschließenden Auftrag ersetzt.

1. Grundumsetzung: [PR #50](https://github.com/asiasince2007/website/pull/50), Merge `86e45a76ab9c7173701eec703140421bc3908e15`; [Pages-Lauf 35996808054](https://github.com/asiasince2007/website/actions/runs/35996808054) erfolgreich.
2. Live-Prüfung der Grundumsetzung am 24.09.2026, ab 14:10 Uhr MESZ: alle sechs Seiten HTTP 200, CSS/JS identisch zum lokalen Stand, Mobilmenü und Datenschutz bei 320 px, entschlüsselte E-Mail mit JavaScript. Ohne JavaScript bleibt die Cloudflare-Schutzdarstellung wie gewünscht bestehen; Navigation bleibt erreichbar. Vor Kartenfreigabe keine Google-Anfrage, echter Embed HTTP 200, korrekter Ladenname/Marker/Adresse und Bewertungswert zusätzlich visuell geprüft; Ausblenden entfernt den Frame. Route ohne JavaScript ruft den korrekten Google-Maps-Zielparameter auf. Google zeigte im frischen Browser anschließend seine Einwilligungsseite. Keine echte Navigation vor Ort, kein Anruf, keine E-Mail ausgeführt. Interne Gedächtnis-/Test-/Archivpfade liefern live 404. Bericht lokal `docs/qa-output/live-pruefung.json`.
3. Jüngste Nacharbeit: lokal geprüft auf `codex/kundenanalyse-abschluss-2026-09-24`. Veröffentlichung und erneuter Live-Nachweis werden nach Merge hier ergänzt; vorliegende Grundumsetzungsprüfung nicht als Prüfung des noch unveröffentlichten Nachtrags ausgeben.

## Verbleibende externe Schritte

- **TODO(inhaber):** Heiligabend und Silvester endgültig bestätigen; vorläufig jeweils 9 bis 14 Uhr.
- **TODO(inhaber/Google-Profil):** Website-Link im Google-Unternehmensprofil auf `https://www.asiamarkt.info/` umstellen. Nicht durch Repositoryänderung erledigt, kein Profilzugriff verwendet.
- **TODO(inhaber/Parken):** Beschilderung/Bedingungen der gegenüberliegenden konkreten Stellplätze bestätigen. Bis dahin bleiben allgemeine städtische Regeln und konkrete Ortsbedingungen sauber getrennt.
- **Pflege:** Befristete städtische E-Parkregel spätestens zum Jahreswechsel prüfen. Frühere, weiterhin offene Inhaberaufgaben wie die Bereinigung des alten Web3Forms-Schlüssels bleiben bestehen.

Neue Entscheidungen: E-38 bis E-40 in [03_entscheidungen.md](03_entscheidungen.md). Aktive Anleitungen, Pflegehinweise, Tests und Projektstand wurden entsprechend fortgeschrieben.
