# Öffnungszeiten und Ausnahmen pflegen

Stand: 24.09.2026. Verantwortliche Quelle für tatsächliche Sonderzeiten ist der Inhaber. Es gibt aktuell **keine bestätigten Sonderöffnungen oder Schließtage** in der Konfiguration.

## Zentrale Pflegestelle

Am Anfang von `assets/js/site.js` steht `OEFFNUNGSZEITEN`. `woche` enthält sieben Einträge: Sonntag bis Samstag. Regulär Montag–Freitag 09:00–18:00, Samstag 09:00–14:00, Sonntag geschlossen. Die Berechnung erfolgt in `Europe/Berlin`, unabhängig von der Gerätezeitzone. Eine falsch eingestellte absolute Geräteuhr kann eine statische Website ohne Zeitdienst weiterhin nicht korrigieren.

`ausnahmen` enthält einzelne Kalenderdaten. Ein bestätigter Schließtag hat `zeiten: []`; bestätigte Sonderzeiten haben geordnete Zeitfenster. `bestaetigtAm` dokumentiert das tatsächliche Bestätigungsdatum. Optional benennt `hinweis` den Anlass. Nicht ohne Bestätigung eintragen; Beispielwerte unten sind **keine realen Öffnungszusagen**:

```javascript
// Schema, nicht unverändert veröffentlichen:
'JJJJ-MM-TT': {
  zeiten: [],                  // geschlossen
  bestaetigtAm: 'JJJJ-MM-TT',   // Datum der tatsächlichen Inhaberbestätigung
  hinweis: 'Betriebsferien'
}
// Für bestätigte Sonderzeiten z. B. zeiten: [['10:00', '13:00']].
// Für Mittagspause zwei getrennte Fenster; Start muss vor Ende liegen.
```

Je Betriebsferientag einen Eintrag pflegen. Uhrzeiten im Format `HH:MM` von 00:00 bis 23:59, keine überlappenden oder über Mitternacht laufenden Fenster. Fehlende Bestätigung, ungültige Zeiten oder Überschneidungen erzeugen einen neutralen Prüfhinweis. Der nächste Öffnungstermin überspringt bestätigte Schließtage und berücksichtigt Sonderzeiten. Liegt ein ungeklärter Tag dazwischen, wird nur die **nächste reguläre Öffnung** mit Hinweis auf Sonderzeiten genannt.

## NRW-Feiertage

Automatisch berechnet werden Neujahr, Karfreitag, Ostermontag, 1. Mai, Christi Himmelfahrt, Pfingstmontag, Fronleichnam, Tag der Deutschen Einheit, Allerheiligen und die beiden Weihnachtstage. Ohne bestätigte Ausnahme wird an diesen Tagen nicht „Jetzt geöffnet“ behauptet. Es erscheint „Heute [Feiertag]: Öffnungszeiten bitte telefonisch prüfen“.

Heiligabend und Silvester sind **keine gesetzlichen NRW-Feiertage**, bleiben ohne bestätigte Zeiten ebenfalls ungeklärt. Feiertage anderer Bundesländer werden nicht übernommen. Quelle: [§ 2 Feiertagsgesetz NRW](https://recht.nrw.de/lrgv/gesetz/01012000-bekanntmachung-der-neufassung-des-gesetzes-ueber-die-sonn-und-feiertage/), geprüft 24.09.2026. Eine Geschäftsbestätigung ersetzt bei Sonderöffnungen keine gegebenenfalls erforderliche Erlaubnis; keine rechtliche Zulässigkeit aus dem technischen Feld ableiten.

## Sichtbare Angaben und Veröffentlichung

1. Bestätigung und betroffene Kalendertage festhalten, dann Konfiguration ändern. Bei wichtigen bevorstehenden Ausnahmen einen sichtbaren HTML-Hinweis auf Start-/Kontaktseite ergänzen, damit er auch ohne JavaScript verfügbar ist. Bei Bedarf bestätigte `specialOpeningHoursSpecification` in den vorhandenen JSON-LD-Blöcken konsistent ergänzen; unbekannte Zeiten nie als offen oder geschlossen auszeichnen.
2. Wenn reguläre Wochenzeiten wechseln: alle sichtbaren Tabellen/Footer/Besuchsabschlüsse und vier JSON-LD-Blöcke in index/kontakt/impressum/datenschutz sowie `woche` synchron anpassen. Auch Google-Unternehmensprofil separat pflegen.
3. `npm test` ausführen. Ergänzte Ausnahmen mit Datum vor, während und nach der Ausnahme prüfen, ebenso den zuvor angezeigten nächsten Öffnungstermin.
4. Cacheversion von `site.js` in allen sechs Seiten erhöhen, Sitemap nur für tatsächliche Seitenänderungen aktualisieren. Die statischen regulären Zeiten und der Feiertagshinweis bleiben erhalten.
5. Nach autorisierter Veröffentlichung tatsächliche Website inklusive Cache prüfen. Abgelaufene Ausnahmen erst nach Protokollierung im Projektgedächtnis bereinigen. Keine Sonderöffnung allein aus einer nicht leeren Testkonfiguration in Produktion kopieren.
