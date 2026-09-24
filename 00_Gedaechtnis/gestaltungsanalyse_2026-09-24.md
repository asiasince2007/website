# Gestaltungsanalyse und klassische Ladenansicht

Stand: 24.09.2026. Auftrag: die Website persönlicher, traditioneller und weniger austauschbar gestalten; ausschließlich Darstellung ändern, keine Informationen erfinden oder streichen und die vorhandene SEO-Substanz erhalten.

Die Umsetzung entstand auf `codex/klassische-ladengestaltung`, ausgehend von `main`, Commit `3e1e459` nach PR #53. Auf den anschließenden ausdrücklichen Push-/Merge-Auftrag wurde sie mit [PR #54](https://github.com/asiasince2007/website/pull/54), Merge `539d6b8`, am 24.09.2026 um 16:42 Uhr MESZ veröffentlicht. Der [Pages-Lauf 36014734951](https://github.com/asiasince2007/website/actions/runs/36014734951) ist erfolgreich. Die aktuelle Live-Prüfung steht in Abschnitt 9.

## 1. Umfang und Quellen

Untersucht wurden alle sechs aktiven Inhaltsseiten, die Routenweiterleitung, das gemeinsame Stylesheet und JavaScript, lokale Schriften und Bilder, Seitentitel, Beschreibungen, Canonicals, Social-Metadaten, JSON-LD, Sitemap, Robots-Datei und Pages-Konfiguration. Die aktive Implementierung wurde von historischen Tailwind-, Modal- und Gestaltungsbeständen getrennt betrachtet. Vorherige Projektentscheidungen zu Inhalten, Feiertagen, Parken, Bewertungen, Cloudflare und Rechtstexten bleiben maßgeblich.

Die [öffentliche Startseite](https://www.asiamarkt.info/) wurde im Browser einschließlich des sichtbaren Inhalts geprüft. Der Webabruf meldete dort HTTP 403; der normale Browser konnte die Seite anzeigen. Diese Zugriffsbegrenzung ist kein Beleg für einen allgemeinen Websiteausfall. Die lokal bereits laufende Vorschau auf Port 4173 lieferte vor der Änderung die identische Startseiten-Quelldatei aus diesem Workspace.

Alle vier gewünschten Referenzen wurden am 24.09.2026 sowohl über ihren Seiteninhalt als auch im Browser visuell betrachtet. Die Untersuchung umfasst ihren sichtbaren Aufbau, ihre Bildsprache und ihre Informationsdarstellung. Sie ist keine vollständige technische Qualitätsprüfung dieser fremden Websites und kein Beweis für ihre Entstehung ohne KI.

## 2. Ausgangslage der Asia-Markt-Website

Die Website besitzt bereits die wichtigsten Voraussetzungen für einen glaubwürdigen lokalen Auftritt: eine genaue Anschrift, eine direkt erreichbare Telefonnummer, konkrete Öffnungszeiten, tatsächliche Außenaufnahmen, eine nachvollziehbare Sortimentsliste und datierte Bewertungsquellen. Der Familienbetrieb, die Gründung 2007 und die persönliche Beratung sind bereits vorhandene Inhalte. Für diesen Gestaltungsauftrag wurden sie erhalten, nicht neu behauptet.

Der vom Inhaber beschriebene künstliche Eindruck lässt sich gestalterisch nachvollziehen. Er entsteht aus dem Zusammenspiel mehrerer Muster: rundliche Nunito-Schrift auch in großen Überschriften, eine dominante geteilte Einstiegsfläche, ein farbiges Statusabzeichen, rosa Hintergrundbänder, abgerundete Bilder und Kontaktkarten sowie Einblendeffekte beim Scrollen. Jedes einzelne Mittel kann angemessen sein; ihre Kombination wirkt hier stärker nach wiederverwendbarer Werbevorlage als nach dem konkreten Geschäft an der Hauptstraße. Das ist eine gestalterische Bewertung, kein technisch messbarer KI-Nachweis.

| Bereich | Vorhandene Substanz | Darstellungsproblem | Umgesetzte Antwort |
|---|---|---|---|
| Kopf und Navigation | Logo, vollständiger Geschäftsname, Ortsbezug, Gründungsjahr, vier Seitenlinks, Anruf | Kleine Marke in einer gewöhnlichen horizontalen Navigationsleiste | Eigenständiger Geschäftskopf mit größerem Namen und darunterliegender klassischer Navigation am Desktop |
| Startseite | Einführung, Ladenfront, Anruf, Route, Zeiten, Parken, Zahlung, sechs Gruppen, drei Zitate, zwei weitere Fotos | Sehr große rundliche Überschrift, farbiges Abzeichen, wiederkehrende rosa Flächen | Schaufensterfoto links, kompakterer Text rechts, Serifenschrift, schlichter Status, ruhige Naturtöne |
| Sortiment | Sechs vollständige Warengruppen, Verfügbarkeitshinweis, Beispiele, Besuchsabschluss | Bisherige Typografie wirkt wie dieselben Komponenten der Startseite | Warenverzeichnis mit roten Gruppenüberschriften, klaren Trennlinien und gut lesbaren Beschreibungsspalten |
| Der Laden | Geschichte, Auswahl und Beratung, vier Fakten, Bewertungsquelle, drei Galerieaufnahmen, Besuch | Kennzahlenraster hat eine Anmutung wie eine Unternehmenspräsentation | Fakten in vier einfachen Zeilen, vertraute Fotoansichten und zurückhaltende Schriftgrößen |
| Kontakt | Adresse, Telefon, Zeiten, Status, vollständige Parkinformationen und Quellen, Karte | Viele separate umrahmte Karten konkurrieren miteinander | Offene Spalten, ein zusammenhängender Zeitenbereich, Parktext neben einer begrenzten Kartenfläche |
| Impressum | Vollständiger vorhandener Rechtstext und Kontakte | Passt zwar zum bisherigen Stil, soll den neuen Auftritt mittragen | Gleicher neuer Kopf, klassische Überschriften, ruhige Lesespalte |
| Datenschutz | Vorhandene fünf Abschnitte, Quellen und Kontaktangaben | Lange Überschrift und Text müssen auch schmal lesbar bleiben | Unveränderter Wortlaut, vorhandene weiche Trennstelle, angepasste Lesetypografie |
| Route | Sofortige Google-Maps-Weiterleitung, Ersatzlink, `noindex` | Keine dauerhafte Inhaltsseite | Vollständig unverändert erhalten und funktional geprüft |

Das Repository ist technisch für diese Aufgabe gut geeignet: statische HTML-Dateien, eine gemeinsame aktive CSS-Datei, wenig JavaScript und lokale Medien. Eine neue Plattform würde die Aufgabe unnötig vergrößern. Unbenutzte Interimsbilder, historische Tailwind-Dateien und archivierte Werkzeuge sind keine sichtbaren Bestandteile der aktuellen Gestaltung. Sie wurden nicht erneut aktiviert oder gelöscht.

## 3. Was sich aus den lokalen Beispielen ableiten lässt

| Referenz | Tatsächlich beobachtet | Übertragbare Gestaltungsentscheidung | Grenze der Übertragung |
|---|---|---|---|
| [CUP by Aniti](https://cup-aniti.de/) | Deutliche Wortmarke, helle Flächen, warme beige Akzente, rechteckige Essens- und Cafébilder, konkrete Kontakt-, Reservierungs- und Veranstaltungsinformationen | Eigene Marke, passende ruhige Farben und direkte Bild-Text-Zuordnung | Shop, Reservierung, Newsletter und große Einwilligungsoberfläche gehören zum dortigen Angebot; sie sind kein Bedarf des Asia Markts |
| [Bäckerei Suckow](https://www.baeckerei-suckow.de/) | Markante Bäckereimarke, Serifentexte, handwerksbezogenes Hintergrundmotiv, feste Inhaltsbereiche und konkrete Betriebsinformationen | Geschäftstyp über Typografie und eigene Motive erkennbar machen; Inhalte dürfen einfach und sachlich angeordnet sein | Dunkle Textflächen, aufwendiges Hintergrundbild und schmale Randspalten werden nicht kopiert |
| [KerzenwachsTante](https://www.kerzenwachstante.de/) | Heller Hintergrund, zurückhaltende Farbakzente, serifenbetonte Überschrift, Produktfotografien, persönliche Erklärung und konkreter Ladenbezug | Die vorhandenen Dinge und den realen Ort zeigen; Überschriften können traditionell sein, ohne den übrigen Text zu überladen | Das ist ein personalisierender Onlineshop. Seine Verkaufsfunktionen und Leistungsversprechen sind nicht übertragbar |
| [Café New York](https://cafe-ny.de/) | Wiedererkennbare eigene Marke, Rot und dunkle Töne, starke Gastronomietypografie, direkte Speisekarten- und Telefonzugänge | Charakter aus realer Marke und Nutzung entwickeln; Hauptaktionen verständlich beschriften | Riesige Einstiegsflächen, Schmuckschrift und zeitweise verzögert erscheinende Inhalte würden den schnellen Ladenbesuch erschweren |

Gemeinsam ist diesen Beispielen weniger eine bestimmte technische Vorlage als die erkennbare Beziehung zum jeweiligen Geschäft. Daraus folgt für den Asia Markt: Der rote Schaufensterrahmen, das bestehende Logo, die tatsächliche Ladenfront und die konkreten Besuchsinformationen sind die passende Basis. Die Websites wurden als gestalterische Referenzen verwendet; Texte, Bilder oder Geschäftsaussagen wurden nicht übernommen.

## 4. Fachliche Einordnung

Die Blickverlaufsforschung der Nielsen Norman Group unterscheidet informative Bilder von bloßer Dekoration. Bilder mit relevantem Informationsgehalt bekommen Aufmerksamkeit; austauschbare Schmuckbilder werden häufig übergangen. Die vorhandene Ladenfront hilft beim Wiedererkennen vor Ort und trägt damit eine konkrete Information. Diese Forschung stützt ihre Verwendung, beweist jedoch keine bestimmte Wirkung des neuen Designs auf diese Kundschaft. Quelle: [Photos as Web Content](https://www.nngroup.com/articles/photos-as-web-content/), geöffnet am 24.09.2026.

Eine weitere Untersuchung beschreibt Gestaltungsgüte, früh erkennbare Informationen, vollständige und aktuelle Inhalte sowie externe Verbindungen als Faktoren für wahrgenommene Glaubwürdigkeit. Verständliche Navigation, stimmige Farben, echte Geschäftsinformationen und nachvollziehbare Quellen passen dazu. Absichtlich unleserliche, unregelmäßige oder technisch veraltete Gestaltung folgt daraus nicht. Quelle: [Trustworthiness in Web Design: 4 Credibility Factors](https://www.nngroup.com/articles/trustworthy-design/), geöffnet am 24.09.2026.

Google fordert bei der mobilen Indexierung insbesondere gleichwertige Inhalte, klare Überschriften, vorhandene strukturierte Daten, passende Metadaten und zugängliche Bilder. Diese Punkte sprechen für die Beibehaltung der bestehenden HTML-Seiten und ihrer Inhalte über alle Bildschirmgrößen hinweg. Ein anderer visueller Aufbau ist damit vereinbar. Quelle: [Mobile-first Indexing Best Practices](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing), geöffnet am 24.09.2026.

Die konkrete Wahl von Lora, dunklem Rot, Naturtönen und schlichtem Satz ist eine aus diesen Beobachtungen abgeleitete Designentscheidung. Sie ist keine aus den Quellen ableitbare universelle Formel gegen einen KI-Eindruck und wurde nicht in einem Kundentest evaluiert.

## 5. Die neue Gestaltung

Der Desktopkopf stellt das Geschäft sichtbar vor: vorhandenes Logo, Geschäftsname in dunklem Rot, darunter die bestehende Orts- und Jahresangabe. Die Navigation steht in einer eigenen Zeile zwischen einer feinen neutralen und einer roten Linie. Die bisherige obere Informationszeile bleibt vollständig bestehen, tritt durch ihre helle Fläche aber zurück. Auf kleinen Bildschirmen bleibt der kompakte Kopf mit bedienbarem Menü erhalten.

Die Überschriften verwenden die bereits vorhandene, lokal gehostete Lora in Stärke 700. Der Fließtext nutzt Arial mit vorhandenen Systemalternativen. Die zwei bisherigen Nunito-Vorladungen werden durch eine einzige Lora-Vorladung ersetzt. Es kommen weder ein externer Schriftanbieter noch neue Schriftdateien dazu. Kurze große Überschriften bekommen keine automatische Worttrennung; die vorhandene manuelle Trennstelle der Datenschutzerklärung bleibt nutzbar.

Die Palette greift das Schaufensterrot auf: `#932f29` als Hauptakzent, `#71231f` für dessen dunkleren Zustand, der bestehende helle Grund `#fffbf5`, ein neutrales Band `#f1eee5` und dunkle Textfarben. Helles Gold erscheint nur in den Fußzeilenlinks. Statusgrün bleibt ein funktionales Signal. Zentrale Farben stehen am Anfang von `assets/css/site.css` und lassen sich konsistent pflegen.

Fotos und Schaltflächen besitzen nur noch eine minimale Rundung von zwei Pixeln. Die Geschäftsaufnahmen bleiben in ihren bisherigen Dateien, Zuschnitten und HTML-Attributen erhalten. Am Desktop steht das große Schaufensterfoto links, am Handy folgen Einführung und direkte Besuchsaktionen vor dem Foto. Die Reihenfolge des HTML und sämtliche Bildbeschreibungen bleiben unverändert.

Die Informationen zu Öffnungszeiten, Parken und Zahlung werden weiterhin zusammenhängend gezeigt. Warenkategorien und Fakten sind durch Linien gegliedert. Bewertungen behalten ihren exakten Wortlaut, ihre drei Datierungen, die Gesamtzahl, den Stand und den Echtheitshinweis. Eine ruhigere Zitattypografie ersetzt die optische Hervorhebung durch rosa Akzente.

Alle Scroll-Einblendungen entfallen einschließlich ihrer JavaScript-Funktion. Text wird nicht zunächst unsichtbar gemacht. Die Öffnungslogik mit Berliner Zeitzone und NRW-Feiertagen, die Navigation und das Ein- und Ausblenden der Google-Karte bleiben funktional bestehen. Auf dem Desktop scrollt der größere Geschäftskopf mit; mobil bleibt der kompakte Kopf erreichbar.

## 6. Nachweis des Informationserhalts und der SEO-Substanz

`node scripts/qa-design-preservation.cjs` vergleicht die Umsetzung direkt mit Commit `3e1e459`. Der Vergleich erlaubt im Kopf der sechs Seiten ausschließlich die konkret vorgesehenen Schriftvorladungen und die neue CSS-/JS-Cacheversion. Der gesamte übrige Quelltext und zusätzlich jeder vollständige `<body>` werden abgeglichen. CRLF/LF werden entsprechend Git normalisiert; inhaltliche Leerzeichen, Text, Attribute und Reihenfolge werden dadurch nicht freigegeben.

Das Ergebnis ist für alle sechs Seiten identisch: keine Änderung an sichtbaren Texten, Links, Ankern, Bildbeschreibungen, Überschriftentexten oder -ebenen, geschäftlichen Angaben, rechtlichen Hinweisen, Metadaten oder JSON-LD. Es handelt sich damit um einen strengeren Nachweis als eine manuell ausgewählte Liste wichtiger Sätze.

Weitere 46 Dateien sind ebenfalls unverändert: Route, Robots-Datei, Sitemap, Manifest, Domain- und Pages-Konfiguration, Schriftdefinitionen sowie sämtliche Dateien in `assets/images/` und `assets/fonts/`. Textdateien einschließlich SVG werden nach Zeilenendnormalisierung verglichen; Rasterbilder und Schriftdateien byteweise. CSS und JavaScript tragen auf allen sechs Inhaltsseiten einheitlich `2026092403`. Das schon zutreffende Sitemap-Datum 24.09.2026 bleibt bestehen.

Diese Nachweise sichern die technische und inhaltliche Ausgangsbasis für die Suchmaschinenoptimierung. Sie garantieren keine künftige Position bei Google. Search-Console-Verläufe, reale Besucherdaten und eine erneute Auslieferungsprüfung nach Veröffentlichung sind von den lokalen Tests getrennte Nachweise.

## 7. Durchgeführte Prüfungen

Am 24.09.2026 mit Node 26.7.0, lokalem Chrome und der bestehenden Testsuite:

| Prüfung | Ergebnis |
|---|---|
| Logik und Struktur | 15 von 15 bestanden: Öffnungszeiten, Feiertage, Zeitzonen, Ausnahmen, interne Ziele, JSON-LD und SEO-Struktur |
| Browserfälle | 36 von 36 bestanden, einschließlich sechs Seiten bei 320, 390, 768 und 1280 px |
| Automatische Barrierefreiheitsprüfung | Keine Axe-Verstöße in den geprüften Seiten und Menüzuständen |
| Ohne JavaScript | Navigation, statische Zeiten, Inhalte und Routenweiterleitung erreichbar |
| Menü | Tastatur, Escape, Fokus, Anrufkontrast und Navigation geprüft |
| Verzögerter Skriptstart | Kein Layoutsprung durch den Mobilmenüschalter |
| Karte | Vor Freigabe keine Google-Anfrage; Laden, Ausblenden und Fokusrückgabe bestanden |
| Route | Richtiger Zielparameter im neuen Tab auch ohne JavaScript |
| Inhaltserhalt | Sechs vollständige Seiten und 46 weitere Dateien gegen den Ausgangscommit abgeglichen |
| Visuelle Prüfung | Alle sechs Desktop-Gesamtansichten betrachtet; zusätzlich Start/Menü bei 390 px, Sortiment/Kontakt bei 390 px und Datenschutz bei 320 px |
| Diff | `git diff --check` ohne Formatfehler |

Die lokale mobile Lighthouse-Messung lief von 16:24 bis 16:25 Uhr MESZ am 24.09.2026:

| Seite | Performance | Accessibility | Best Practices | SEO | CLS |
|---|---:|---:|---:|---:|---:|
| Start | 97 | 100 | 100 | 100 | 0 |
| Sortiment | 100 | 100 | 100 | 100 | 0 |
| Der Laden | 97 | 100 | 100 | 100 | 0 |
| Kontakt | 100 | 100 | 100 | 100 | 0 |
| Impressum | 100 | 100 | 100 | 100 | 0 |
| Datenschutz | 100 | 100 | 100 | 100 | 0 |

Die beiden fotoreichen Seiten erreichen lokal einen LCP von ungefähr 2,56 beziehungsweise 2,63 Sekunden; die übrigen liegen bei ungefähr 1,58 Sekunden. Das sind Labormessungen mit simulierter mobiler Last, keine realen Nutzungsdaten. Der SEO-Score misst ausgewählte technische Voraussetzungen, keine Rankings. Axe und Lighthouse sind keine vollständige WCAG-Zertifizierung. Die reproduzierbaren Karten- und Routentests verwenden kontrollierte Google-Antworten; die echte Google-Auslieferung wurde anschließend im Veröffentlichungsschritt separat geprüft (Abschnitt 9). Der bestehende Cloudflare-E-Mail-Schutz bleibt unverändert und wurde nach Veröffentlichung erneut live geprüft (Abschnitt 9).

## 8. Ablage und Übergabe

Aktive Gestaltung: `assets/css/site.css`. JavaScriptänderung: ausschließlich die bisherige Scroll-Einblendung entfernt. HTMLänderungen: Schriftvorladung und Cacheversion. Vorfassungen von CSS/JS: `90_Archiv/gestaltung-v1_2026-09-24/`, mit Herkunftsangabe. Reproduzierbarer Bestandserhalt: `scripts/qa-design-preservation.cjs`. Rohberichte und Screenshots: `docs/qa-output/`, weiterhin Git-ignoriert. Archiv, Dokumentation und Prüfscripte bleiben über `_config.yml` vom Pages-Output ausgeschlossen.

Die Dokumentation des aktuellen Standes und der Entscheidungen wurde fortgeschrieben. Der anschließend ausdrücklich beauftragte Live-Schritt ist mit PR #54 erledigt. Die folgenden Nachweise betreffen die tatsächlich veröffentlichte Fassung.


## 9. Veröffentlichung und Live-Prüfung

Am 24.09.2026 hat der Inhaber ausdrücklich Push und Merge beauftragt. Commit `3a4821e` wurde über PR #54 mit `539d6b8` in `main` gemergt. GitHub Pages hat diesen Commit im Lauf `36014734951` erfolgreich gebaut und veröffentlicht.

Die HTTP-Prüfung ab 16:43 Uhr MESZ bestätigt HTTP 200 für alle sechs Inhaltsseiten hinter Cloudflare, durchgehend Assetversion `2026092403`, gleiche Canonicals und JSON-LD sowie identischen CSS-/JS-Inhalt nach Zeilenendnormalisierung. Die neu hinzugekommenen Dokumentations-, Archiv- und Prüfscripte sind über die öffentliche Domain nicht abrufbar (vier kontrollierte Pfade HTTP 404). Rohbeleg: `docs/qa-output/design/publication-http.json`.

Im echten Browser wurden die neue Startansicht bei 390 px, Öffnen des Mobilmenüs und Schließen per Escape kontrolliert. Die verschleierten E-Mail-Adressen auf Impressum und Datenschutz werden korrekt zum sichtbaren `mailto:`-Kontakt decodiert. Auf Kontakt war vor Freigabe kein Karten-Iframe vorhanden; nach Freigabe erschien die echte Google-Satellitenkarte mit dem Marker für Asia Markt Thien Phu, nach „Karte ausblenden“ war der Iframe wieder entfernt. `/route.html` führte zum Google-Maps-Routenziel Asia Markt Thien Phu, Hauptstraße 74, 40764 Langenfeld (Rheinland). Es wurden keine Anrufe oder E-Mails ausgelöst.

Die lokale Test-/Lighthouse-Messung aus Abschnitt 7 bleibt ein Labornachweis; der aktuelle Live-Test ergänzt ihn, ersetzt aber keine Search-Console- oder Felddatenprüfung. Die bekannte Cloudflare-Einschränkung bei deaktiviertem JavaScript bleibt gemäß Inhaberentscheidung unverändert.
