# Kundenanalyse der Website vom 24.09.2026

**Ergebnis:** Die Website erfüllt die wesentlichen Aufgaben eines örtlichen Lebensmittelgeschäfts bereits gut. Ein kompletter Relaunch ist aus den geprüften Befunden nicht gerechtfertigt. Der größte konkrete Fehler betrifft die Verlässlichkeit des dynamischen Öffnungsstatus. Danach folgen kleine, gezielte Verbesserungen an Besuchsplanung, Lesbarkeit und technischer Pflege.

**Auftrag und Status:** Analyse des lokalen Projekts und der veröffentlichten Website mit konkreter Umsetzungsempfehlung und Folgeprompt. Keine ausgelieferten HTML-, CSS- oder JavaScript-Dateien geändert; kein Commit, Push oder Deployment. Nur dieser Bericht, lokale Prüfnachweise und die Projektprotokolle wurden ergänzt. Empfehlungen sind noch nicht umgesetzt.

## 1. Umfang, Evidenz und Grenzen

Geprüft wurden die sechs Inhaltsseiten Start, Sortiment, Der Laden, Kontakt, Impressum und Datenschutz sowie die Routen-Zwischenseite. Dazu die tatsächlich eingebundenen Stylesheets und JavaScript-Datei, Bilder, Manifest, Metadaten, strukturierte Daten, Sitemap, robots.txt, Deployment-Ausschlüsse, Paketdefinition, vorhandene QA-Skripte und projektrelevante Dokumentation. Archivfassungen wurden als historische Referenz eingeordnet; fremde/unversionierte Arbeitsstände unter `.claude/worktrees/` wurden nicht verändert und sind keine Grundlage der Live-Bewertung.

Die Prüfung kombinierte Quelltextanalyse, echte Browserbedienung, Screenshots, HTTP-Abrufe und gezielte Funktionsproben. Das ist eine fachliche Einzelprüfung, kein Nutzertest mit Kunden und keine vollständige rechtliche oder sicherheitstechnische Zertifizierung.

| Prüfung | Tatsächliches Ergebnis |
|---|---|
| Sechs Inhaltsseiten | HTTP 200; jeweils genau eine H1; individuelle Titel, Description und Canonical vorhanden |
| Lokale Referenzen einschließlich Bildvarianten und Font-Dateien | 44 eindeutige Ziele per HTTP HEAD geprüft, alle 200 |
| Lokale HTML-IDs und reine Seitenanker | Keine doppelten IDs oder fehlenden Ziele bei den vorhandenen `href="#…"` gefunden |
| Lokal gegen live | Nach Normalisierung der Zeilenenden stimmen Hauptinhalte der vier Kundenseiten sowie `site.js`, `site.css` und Sitemap überein. Cloudflare ergänzt HTML und verändert die E-Mail auf den Rechtsseiten. Kein pauschaler Gleichheitsnachweis für alle Bytes |
| Layoutmatrix | Sechs Inhaltsseiten bei 320, 390, 768 und 1280 CSS-Pixeln geprüft; 24 Kombinationen. Nur Datenschutz bei 320 mit horizontalem Überlauf: 328 px Dokumentbreite bei 305 px nutzbarer Breite wegen Scrollbar |
| Bildprüfung | In der Layoutmatrix keine bereits fertig geladenen, defekten Bilder erkannt; direkte Bildreferenzen zusätzlich erfolgreich abgerufen. Screenshot unmittelbar nach Navigation allein ist kein Ladefehlernachweis |
| Mobiles Menü | Öffnen, Navigation zu Sortiment und Schließen mit Escape funktionieren; `aria-expanded` und Beschriftung werden aktualisiert |
| Google-Karte | Vor Freigabe beim beobachteten Kontaktseiten-Neuladen nur eigene Domain angefragt; Karte lädt nach Klick; Ausblenden entfernt den iframe und stellt den Ladeknopf wieder her |
| Route | Klick auf Kontaktseite öffnet über `/route.html` die Google-Maps-Route zum richtigen Geschäft. Keine tatsächliche Navigationsfahrt oder Prüfung eines nativen iOS-/Android-App-Wechsels |
| Öffnungsstatus | Live derselbe Zeitpunkt: Europe/Berlin meldet geöffnet, Pacific/Honolulu geschlossen. Quellfunktion zusätzlich für Wochenend- und Feiertagsfälle ausgeführt |
| JSON-LD | `node scripts/qa-jsonld.js` erfolgreich: vier GroceryStore-Blöcke parsebar und mit den hinterlegten Stammdaten konsistent. Kein Ersatz für Googles Rich-Results-Test |
| HTTPS / Weiterleitungen | HTTP wird auf HTTPS umgeleitet; Domain ohne www auf www. HSTS vorhanden. Der im Google-Profil hinterlegte HTTP-Link benötigt zwei 301-Schritte |
| Deployment-Ausschluss | Geprüfte interne Datei `/00_Gedaechtnis/plan-relaunch.md` liefert 404; kein vollständiger Nachweis für sämtliche internen Pfade |
| Frischer PageSpeed-Bericht | Nicht verfügbar: API antwortete HTTP 429, Tageskontingent ausgeschöpft. Frühere Lighthouse-Werte sind keine aktuelle Messung |

Nicht eingesehen wurden Search Console, Cloudflare-Statistik/Verträge, interne Google-Unternehmensprofil-Einstellungen, echte Besuchs- oder Umsatzdaten. Native Mobilbrowser, Screenreader, sämtliche Tastaturpfade und automatisierte WCAG-Komplettscans waren nicht Bestandteil einer vollständigen Gerätematrix. Telefonlinks wurden geprüft, ohne anzurufen. Es wurden keine Nachrichten oder Bewertungen versandt.

Lokale Nachweise: [Layoutmatrix](../docs/audit_2026-09-24/responsive-checks.json), [Start mobil 390](../docs/audit_2026-09-24/start-mobil-390.jpg), [Menü mobil 320](../docs/audit_2026-09-24/menue-mobil-320.jpg), [Datenschutz 320](../docs/audit_2026-09-24/datenschutz-320.jpg). Zwei fehlerhafte Aufnahmeversuche sind ausdrücklich als Werkzeug-Artefakte unter `90_Archiv/audit-aufnahme-artefakte_2026-09-24/` archiviert und belegen keinen Websitefehler.

## 2. Perspektive der Kunden

**Einstieg über Google Maps:** Dieser Besucher kennt häufig schon Standort, Bewertungen und Öffnungszeiten. Auf der Website sucht er eine Bestätigung, konkrete Waren oder praktische Besuchsinformationen. Name, Adresse, Telefon und reguläre Zeiten stimmen mit dem am 24.09.2026 geöffneten Google-Profil überein. Die Ladenfotos helfen beim Wiedererkennen vor Ort. Der Nutzen würde steigen, wenn auch nach dem Lesen von Sortiment und Ladenvorstellung sofort eine Route planbar wäre.

**Einstieg über eine allgemeine Suche:** Der erste Bildschirm beantwortet verständlich, was für ein Geschäft es ist und wo es liegt. Konkrete Zutaten und Marken sind hilfreicher als allgemeine Qualitätsversprechen. Die ruhige Gestaltung, lesbare Grundschrift und echten Außenaufnahmen sind passend. Eine neue Animation, ein großes Framework oder mehr allgemeiner Werbetext lösen hier kein belegtes Kundenproblem.

**Einstieg über eine Produktsuche direkt ins Sortiment:** Die Seite enthält echte, konkrete Beispiele und bereits einen telefonischen Verfügbarkeitscheck. Mobil steht vor den Produktgruppen allerdings erneut ein relativ großes Außenfoto. Bei der geprüften 390-px-Ansicht begann die erste Warengruppe erst ungefähr 690 px unter Dokumentbeginn; der Anrufhinweis am Seitenende lag etwa bei 1900 px. Ein kleineres beziehungsweise weiter unten angeordnetes Außenfoto und ein kurzer Verfügbarkeitslink vor der Liste würden die gewünschte Antwort früher sichtbar machen.

**Besuchsentscheidung:** Öffnungszeiten, Standort, Parken und Bezahlung sind schon vorhanden. Offen bleiben nur Detailfragen wie akzeptierte Kartenarten, stufenloser Eingang und gegebenenfalls eine geeignete Haltestelle. Diese Angaben fehlen als Information; daraus folgt nicht, dass das Geschäft diese Leistungen nicht bietet. Nur nach Bestätigung ergänzen.

## 3. Befunde nach Priorität

### A1 — Hohe Priorität: Öffnungsstatus berücksichtigt keine Ausnahmen und falsche Zeitzone

`assets/js/site.js:21–44` liest `getDay()` und `getHours()` aus `new Date()`. Damit gilt die Gerätezeitzone. Der Live-Test mit zwei emulierten Zeitzonen lieferte zum selben Zeitpunkt widersprüchliche Zustände. Die regulären Schließgrenzen am Samstag funktionieren dagegen: 13:59 offen, 14:00 geschlossen; Sonntag führt korrekt auf Montag.

Feiertage, Urlaub und Sonderöffnungen fehlen vollständig. Die unveränderte Quellfunktion ergibt am **03.10.2026 um 10 Uhr „Jetzt geöffnet, heute bis 14 Uhr“**, am **25.12.2026 um 12 Uhr „Jetzt geöffnet, heute bis 18 Uhr“**. Das sind reproduzierte Programmausgaben, keine bestätigten tatsächlichen Öffnungstage. Beide Daten sind Feiertage; die aktuelle Umsetzung erkennt sie nicht. Quelle: [Feiertagskalender des Landtags NRW](https://www.landtag.nrw.de/portal/WWW/dokumentenarchiv/Dokument/MMI18-161.pdf).

**Verbesserung:** Immer `Europe/Berlin` zugrunde legen. Reguläre Zeiten, bestätigte Schließtage und Sonderzeiten an einer klaren Pflegestelle führen. Auch die Suche nach dem nächsten Öffnungstag muss Ausnahmen überspringen. Bei ungeklärten Feiertagen keinen sicheren Live-Status behaupten, sondern etwa „Feiertag: Öffnungszeiten bitte telefonisch prüfen“. Reguläre Zeiten ohne JavaScript sichtbar halten. Keine unbestätigten Sonderöffnungen veröffentlichen. Strukturierte Daten und Google-Profil separat konsistent pflegen; eine Websiteänderung aktualisiert das Google-Profil nicht automatisch.

**Nutzen:** Verhindert eine konkrete Fehlentscheidung zur Anfahrt. Höhere Priorität als kosmetische Optimierung.

### A2 — Hohe Priorität, kleine Korrektur: Kontrast des Menü-Anrufbuttons

Die Regel `.nav a` in `assets/css/site.css:119` gewinnt bei der Textfarbe gegen `.btn-anruf` in Zeile 128. Im Browser wurde `rgb(36,28,22)` auf `rgb(180,52,46)` gemessen, also **2,77:1 Kontrast**. Das betrifft Desktopnavigation und geöffnetes Mobilmenü. Der große Anrufknopf im Startbereich ist hiervon nicht betroffen.

**Verbesserung:** Den Navigationsbutton gezielt mit weißer Schrift gestalten, etwa über `.nav .btn-anruf`, und Normal-, Hover- sowie Fokuszustände prüfen. Für den 15-/17-px-Text gilt das Mindestverhältnis 4,5:1. Quelle: [W3C: Contrast Minimum](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum).

### A3 — Mittlere Priorität: Die Anfahrt ist nach dem Lesen unnötig umständlich

Nur Start- und Kontaktseite enthalten „Route planen“. Sortiment hat am Ende einen guten Anrufhinweis, jedoch keine Route. „Der Laden“ und der gemeinsame Footer enthalten ebenfalls keinen Routenlink. Mobil bleibt beim Scrollen nur der kompakte Kopf mit Menüknopf; der direkte Anruf steckt dann im Menü.

**Verbesserung:** Am Ende von Sortiment und Ladenvorstellung eine knappe Besuchseinladung mit „Route planen“ und „Anrufen“ ergänzen; Adresse beziehungsweise Zeiten dabei kompakt anzeigen. Auf der Startseite Route als primäre Besuchsaktion und Anruf als zweite Aktion erwägen. Für Produktsuche bleibt der Anruf sinnvoll, deshalb beide Wege erhalten. Eine mobile Leiste mit zwei Aktionen ist eine zusätzliche Option, wenn sie Footer, Text und Tastaturfokus zuverlässig freilässt; sie ist keine Voraussetzung für die erste Verbesserung.

Die vorhandene Routen-Zwischenseite funktioniert und wurde bewusst für serverseitige Auswertung eingeführt. Sie deshalb nicht beiläufig entfernen. Serveranfragen sind allerdings keine eindeutigen Personen oder Ladenbesuche: Wiederholungen, Bots und Vorabladen können Zahlen beeinflussen.

**Evidenzgrenze:** Die zusätzlichen Klickwege sind beobachtet. Eine bestimmte Steigerung von Ladenbesuchen oder Umsatz ist damit nicht gemessen.

### A4 — Mittlere Priorität: Sortiment schneller zugänglich und klarer gruppieren

Die Beispiele sind konkret und nützlich. Die Reihenfolge auf Mobil verzögert jedoch den Zugang zur eigentlichen Liste; das Außenfoto wiederholt Information von Start und Ladenseite. Außerdem steht Tofu sowohl bei Kräutern/Gemüse als auch bei „Tofu, Tee und Getränke“, Edamame und Enoki stehen unter dieser ungewöhnlich gemischten Überschrift.

**Verbesserung:** Den oberen Bereich verkürzen, die telefonische Nachfrage nach konkreter Ware früh anbieten und bei Bedarf sechs schlichte Sprunglinks zu stabilen Abschnitts-IDs ergänzen. Tofu/Pilze konsistent zuordnen und die Gruppen verständlich benennen, ohne Waren aus der Liste zu verlieren. Ergänzung: „Die Auswahl kann wechseln. Für einen bestimmten Artikel rufen Sie bitte kurz an.“ Das ist eine Verfügbarkeitsklärung, kein Warenwirtschaftssystem.

Die dokumentierte Entscheidung, **keine Produktfotos** vorauszusetzen, bleibt bestehen. Keine Lagerbestände, Preise, Marken, Bio-/Halal-/Vegan-Aussagen oder zusätzliche Produktgruppen erfinden. Reis als eigenständige Warengruppe wäre nur nach Bestätigung des tatsächlichen Angebots sinnvoll.

### A5 — Mittlere Priorität: Parkhinweis um entscheidende Bedingungen ergänzen

Die Grundangaben 15 Minuten frei und 1 Euro pro Stunde sind durch die Stadtquelle gedeckt. Allerdings muss auch der kostenlose Parkvorgang am Automaten mit Kennzeichen gestartet werden. Die städtische FAQ nennt **1 Euro pro angefangene Stunde**; die Website formuliert nur „danach 1 €/Std.“. Für Elektrofahrzeuge nennt die Stadt zusätzlich zur Parkscheibe ein E-Kennzeichen oder die passende Plakette. Die allgemeine Regelung ist derzeit bis **31.12.2026** verlängert, mit Ausnahmen für beschrankte Flächen/Tiefgaragen/Parkhäuser.

**Verbesserung:** Startseite knapp halten, Details auf Kontaktseite ergänzen: kostenlosen Parkvorgang am Automaten starten; Voraussetzungen für E-Autos benennen; Quelle verlinken und Aktualisierung vor Ende 2026 vormerken. Die genaue Beschilderung und Zuständigkeit der konkret gegenüberliegenden Stellplätze vor einer verbindlichen Detailaussage prüfen. Keine Stellplatzgarantie suggerieren.

Quellen: [Städtische FAQ zum Parken](https://www.langenfeld.de/Startseite/Aktuelles-und-Information/Aktuelles.htm/Aktuelles/Zukunft-des-strassenbegleitenden-Parkens.html), [Elektromobilität in Langenfeld](https://www.langenfeld.de/Seiten/Elektromobilitaet-in-Langenfeld.html).

### A6 — Mittlere Priorität: E-Mail und Navigation bei ausgefallenem JavaScript

Das lokale Impressum enthält eine normale E-Mail-Adresse. Cloudflare ersetzt sie bei der Auslieferung. Mit abgeschaltetem JavaScript stand im Live-Browser **„[email protected]“** mit einem Cloudflare-Schutzlink statt der Adresse. Mit JavaScript erschien die richtige Adresse. Unabhängig davon bleibt das mobile Menü ohne JavaScript geschlossen; es fehlen normale Navigationslinks zu Sortiment und Kontakt im Footer.

**Verbesserung:** Die Pflichtkontaktadresse von Cloudflares Obfuscation ausnehmen, mit dokumentierten `email_off`-Markierungen oder einer gezielten Cloudflare-Einstellung, und das Ergebnis nach Deployment live ohne JavaScript prüfen. Die mobile Navigation als lesbaren Grundzustand aufbauen und erst bei erfolgreich initialisierter Bedienlogik einklappen. Der Karten-Direktlink und die statischen Öffnungszeiten sind bereits gute Rückfallebenen.

Dies ist ein bestätigtes Erreichbarkeitsproblem; eine abschließende rechtliche Bewertung des Impressums wurde nicht durchgeführt. [Cloudflare dokumentiert die Transformation und Ausnahmen](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/). [§ 5 DDG](https://www.gesetze-im-internet.de/ddg/DDG.pdf) verlangt unter anderem die Adresse für elektronische Post.

### A7 — Kleine, belegte Layoutkorrektur: Datenschutzüberschrift bei 320 px

Der lange Begriff „Datenschutzerklärung“ bricht nicht passend um. Im 320-px-Test entsteht horizontaler Überlauf, der Screenshot zeigt das abgeschnittene Wort. Alle übrigen geprüften Seiten/Breiten hatten in der Matrix keinen horizontalen Überlauf.

**Verbesserung:** Einen geeigneten Wortumbruch beziehungsweise deutsche Silbentrennung für lange Überschriften zulassen. Nicht den Inhalt durch `overflow-x:hidden` abschneiden. Danach 320 px und vergrößerten Text erneut prüfen.

### A8 — Kleine Pflegeaufgaben: Google-Profil, Bewertungen und Sitemap

Das öffentliche [Google-Profil](https://maps.app.goo.gl/AYB2Qmshj8aWzXBR7) zeigte am Prüftag **4,4 Sterne und 128 Bewertungen**, auf Start- und Ladenseite stehen 127 mit dem transparenten Hinweis „Stand August 2026“. Das ist eine datierte Momentaufnahme und kein gravierender falscher Werbewert. Bei der nächsten Pflege beide Stellen synchron aktualisieren oder auf die genaue Anzahl verzichten. Beim Umsetzen erneut prüfen, nicht die Zahl aus diesem Bericht dauerhaft als aktuell übernehmen.

Der dort hinterlegte Website-Link lautet `http://asiamarkt.info/` und führt über `https://asiamarkt.info/` erst zur kanonischen `https://www.asiamarkt.info/`. Das funktioniert. Eine direkte Hinterlegung der kanonischen HTTPS-Adresse spart zwei Weiterleitungen und ist besonders für diesen Einstieg passend. Die Änderung erfolgt im Google-Unternehmensprofil, nicht allein im Repository.

Die Sitemap trägt für Impressum/Datenschutz noch `2026-06-12`, obwohl beide im August substanziell geändert wurden. Auch andere Einträge spiegeln den jüngsten Inhaltsstand nicht vollständig. `lastmod` bei echten Änderungen pflegen oder weglassen, wenn die Daten nicht zuverlässig geführt werden. Nicht pauschal täglich aktualisieren. Quelle: [Google zum lastmod-Wert](https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping).

### A9 — Mittlere Priorität für die Wartung: Dokumentation und alte Tests widersprechen dem aktuellen Stand

README und CLAUDE beschreiben teils noch Archivpfad, Single-Page-Umbau und Tailwind-Workflow. Die aktive Website nutzt längst mehrere HTML-Seiten, `assets/css/site.css` und `assets/js/site.js`. `npm run build:css` baut alten Tailwind-Code und prüft nicht das aktive Design. `qa-multipage.js` erwartet alte Überschriften, `#mobile-menu-button` und entfernte Dialoge; `qa-p8.js` setzt entfernte Funktionen voraus. `puppeteer-core`/`axe-core` sind keine deklarierten Projektabhängigkeiten. Die alten Tests wurden deshalb nicht als aktuelle Tests ausgegeben.

Besonders lehrreich: Das Juni-Protokoll nennt bereits einen behobenen Europe/Berlin-Fehler. Der aktuelle August-Code verwendet wieder Gerätezeit. Ein Test gegen die tatsächlich eingebundene Datei hätte diese Regression erkennen können.

**Verbesserung:** Einstieg und aktive Befehle berichtigen, historische Stände klar markieren, alte Skripte nach Prüfung archivieren und wenige passende Regressionstests aufbauen. Priorität haben Öffnungslogik mit Zeitzonen/Feiertagen, aktuelle Navigation/Links, mobile Lesbarkeit und konsistente Stammdaten. Kein Frameworkwechsel erforderlich.

## 4. Was bereits gut ist und erhalten bleiben sollte

Die vier Kundenseiten haben eigenständige URLs und vollständigen, direkt lesbaren HTML-Inhalt. Name und Ort erscheinen verständlich in wichtigen Titeln und Texten. Beschreibungen, Canonicals, Sitemap, robots.txt, lokale Schriften, optimiertes Logo, responsive Bildvarianten, Bildabmessungen und verzögertes Laden unterer Bilder sind vorhanden. Die größte vorhandene JPEG-Datei liegt bei etwa 240 kB; das Headerlogo bei etwa 8,4 kB. Das aktive JavaScript ist rund 9,7 kB, das Stylesheet rund 21,3 kB unkomprimiert. Es gibt keinen belegten Grund für einen schweren Technikumbau.

Die Kartenfreigabe funktioniert. Kerninformationen sind ohne Registrierung zugänglich. Aufdringliche Popups oder unnötige Einkaufsprozesse fehlen. Die Website kommuniziert richtig, dass das Geschäft vor Ort verkauft. Die normalen Wochenzeiten und Telefonnummern sind konsistent. Die vorhandenen Bewertungen sind datiert und führen zum vollständigen Profil.

Optionale WebP-/AVIF-Optimierung der Fotos und ein zur heutigen Farbwelt passendes Vorschaubild können später erfolgen. Das vorhandene Social-Vorschaubild enthält richtige Geschäftsinformationen, verwendet aber noch die ältere grüne Gestaltung. Ungenutzte Lora-Schriftdefinitionen oder alte Assets kosten nicht automatisch bei jedem Seitenaufruf ihre gesamte Dateigröße; Browser laden unbenutzte Fonts nicht allein wegen ihrer Existenz. Solche Aufräumarbeiten haben geringeren Kundennutzen als A1–A7.

Die Seiten sind in der verwendeten Websuche auffindbar. Das beweist weder eine bestimmte Google-Platzierung noch vollständige Indexierung. Vor weiterem SEO-Text erst Search-Console-Suchanfragen und Unternehmensprofil-Leistung prüfen. Google nennt Relevanz, Entfernung und Bekanntheit als Faktoren; ein sauber gepflegtes Profil ist deshalb sinnvoller als unbelegte Rankingversprechen. Quelle: [Google zur lokalen Auffindbarkeit](https://support.google.com/business/answer/7091?hl=de).

## 5. Empfohlener Umsetzungsumfang

**Erstes Paket:** A1 Öffnungsstatus, A2 Kontrast, A7 Wortumbruch, A6 Fallbacks. Dazu Regressionstests der tatsächlichen Problemfälle. Diese Punkte beseitigen bestätigte Fehler.

**Zweites Paket:** A3 Routenabschlüsse und mobile Besuchsplanung, A4 schnellerer Sortimentszugang, A5 präzisere Parkhinweise. Das bestehende Design, die vorhandenen Bilder und die statische Architektur genügen.

**Pflege im selben Durchgang:** A8 datierte Angaben und Sitemap, A9 Dokumentation und aussagekräftige Prüfungen. Änderung des Website-Links im Google-Profil als externen Schritt getrennt ausweisen. Die kleine Differenz der Bewertungszahl rechtfertigt allein keinen großen Umbau.

**Nur nach konkreter Bestätigung:** Kartenarten/Mindestbetrag, Eingangsstufen, geeignetes ÖPNV-Ziel, zusätzliche Waren und Sonderöffnungszeiten. Eine echte Innenraumaufnahme wäre optional für die Ladenvorstellung hilfreich, ist aber keine Voraussetzung; keine Produktfoto-Pflicht und keine künstlich erzeugten Ladenszenen als Tatsachenabbildung.

Abnahme der späteren Änderungen: unveränderte Geschäftsidentität; keine erfundenen Angaben; Standortzeit unabhängig vom Gerät; aussagekräftige Behandlung von Ausnahmen; keine abgeschnittenen Inhalte ab 320 px; lesbare Aktionen mit Tastatur und ohne JavaScript; Karte und Routenlink weiter funktionsfähig; tatsächliche Ergebnisse der neuen Tests und gegebenenfalls Lighthouse berichten. Nicht bestandene oder nicht mögliche Prüfungen offen lassen.
