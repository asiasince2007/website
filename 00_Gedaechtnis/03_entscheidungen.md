# 03 — Entscheidungen

> **Diese Inhalte stehen gesammelt in [`gedaechtnis-gesamt.md`](gedaechtnis-gesamt.md).** Jene Datei ist historisch als **eine** durchgehende Wissensdatei geführt worden, deren sieben Abschnitte genau den kanonischen Kerndateien entsprechen. Bei der Vereinheitlichung am 31.07.2026 wurde sie bewusst **nicht** zerschnitten, weil ihre Abschnitte aufeinander verweisen und das Änderungsprotokoll am Ende sie zusammenhält.

Maßgeblich ist **Abschnitt 3 (Architektur-Entscheidungen in ADR-Kurzform)** der Gesamtdatei.

## Neue Einträge

**E-43 · Klassische Ladenansicht ohne inhaltlichen Umbau, 24.09.2026.** Ausdrücklicher Inhaberauftrag: weniger künstliche, traditionellere Darstellung, keine Erfindungen, Informations- oder SEO-Verluste. Nach Vergleich von CUP by Aniti, Bäckerei Suckow, KerzenwachsTante und Café New York wird die vorhandene Identität stärker gezeigt: eigener Geschäftskopf, Schaufensterrot, Naturtöne, lokale Lora-Überschriften, Arial-Fließtext, einfache Linien und echte Fotos. Vollständige HTML-Bodies und SEO-Angaben bleiben identisch; Schriftvorladung und Cacheversion ändern sich. Scroll-Reveal entfällt. Verworfen: neue Werbetexte, KI-/Stockbilder, Produktfotografien ohne Quelle, künstliche Gebrauchsspuren, neue Plattform oder bloßes Kopieren einer Referenz. Begründung und Nachweise in der [Gestaltungsanalyse](gestaltungsanalyse_2026-09-24.md). E-35 wird nur hinsichtlich der nun ausdrücklich beauftragten neuen Darstellung weiterentwickelt; seine inhaltlichen Grenzen gelten fort.

**E-42 · Konkrete Orientierung zum Parkautomaten, 24.09.2026.** Auf ausdrücklichen Wunsch des Inhabers den Beschilderungs-/Tarifsatz unmittelbar nach „direkt gegenüber“ entfernt. Stattdessen die vom Inhaber gelieferte Orientierung zum Automaten bei „EM Kabüffken“ aufgenommen: rotes rundes Schild mit weißer Schrift über dem Eingang und „Früh Kölsch“-Schilder. „Auf Höhe des Lokals“ bewahrt die ungefähre Ortsangabe, ohne einen vermessenen Standort zu behaupten. Verworfen: erfundene Hausnummer, Entfernung oder Kartenmarkierung. Die Beschreibung stammt vom Inhaber; die Stadtquellen belegen die weiterhin separat genannten allgemeinen Parkregeln.

**Ergänzung zu E-42 im selben Auftrag:** Auch „Maßgeblich ist die Beschilderung am konkreten Parkplatz“ und „Die Höchstparkdauer vor Ort beachten“ entfernt. Ein gemeinsamer freundlicher Hinweis nach den Parkregeln kennzeichnet die Angaben als Orientierung und bittet um Prüfung der aktuellen Regeln auf Schildern und am Automaten. Kostenlose 15 Minuten müssen am Automaten gestartet werden, jetzt ausdrücklich mit „müssen“ und vollständigen Sätzen formuliert. Verworfen: verstreute Wiederholungen oder ein pauschaler Haftungsausschluss.

**E-41 · Parkhinweis auf den Besuch vor Ort begrenzen, 24.09.2026.** Inhaber bestätigt die gegenüberliegenden Plätze als normale Straßenparkplätze und wünscht die Entfernung der Aufzählung zu beschrankten Parkplätzen/Tiefgaragen/Parkhäusern. Nur diesen Zusatz aus `kontakt.html` entfernt. Alternative, die vollständige städtische Ausnahmenliste weiterhin im kurzen Besuchshinweis aufzuführen, wegen fehlender Ortsrelevanz verworfen. Keine neue Tarifbestätigung daraus ableiten; Quelle und Hinweis auf konkrete Beschilderung bleiben bestehen.

### 24.09.2026 — Umsetzung der Kundenanalyse

**Neuester Nachtrag E-38 bis E-40:** Diese Vorgaben ersetzen die zuvor am selben Tag gewählten Varianten, soweit sie widersprechen.

**E-38 · Feiertage bestätigt geschlossen, Jahresendtage noch vorläufig.** Inhaber: An Feiertagen immer geschlossen. Alle elf NRW-Feiertage sind feste Schließtage mit Vorrang vor widersprüchlichen Ausnahmen. Warnungen über mögliche Feiertagsabweichungen entfallen. Stattdessen kurzer freundlicher Hinweis auf kurzfristige Schließungen in Ausnahmefällen. 24. und 31. Dezember nennt der Inhaber vorläufig mit 9 bis 14 Uhr, verlangt aber ein offenes TODO bis zur genaueren Bestätigung: noch keine gesicherten Produktionszeiten daraus machen.

**E-39 · Einfachere Sortimentsseite und Schreibweise.** Die sechs Gruppenbuttons werden auf ausdrücklichen Wunsch entfernt; die kurze Warenliste ist direkt scrollbar. Gruppenüberschriften und vorhandene Anker bleiben. Zeitspannen auf der Website und in Metadaten mit „bis“, ohne Halb-/Geviertstriche. Die bisherige Ausnahme für Zeitspannen in E-31 ist damit überholt.

**E-40 · Verifizierte Zahl und externe Linkhaftung.** Im echten Google-Embed nach Veröffentlichung 4,4 Sterne und 128 Bewertungen visuell bestätigt, jetzt beide Stellen entsprechend gepflegt. Die eingeschränkte Maps-Ansicht zuvor war kein Beleg für eine andere Anzahl. Kein pauschaler Linkhaftungsausschluss im Datenschutz: aktuelle IHK-Quellen raten davon ab und bestätigen keine generelle haftungsbefreiende Wirkung. Stadtlinks klar als externe Quellen gekennzeichnet; Hinweise auf Rechtsverletzungen prüfen und gegebenenfalls Links entfernen. Keine Garantie vollständiger Rechtssicherheit. Quellen und Abgrenzung im [Nacharbeitsbericht](nacharbeit-kundenangaben_2026-09-24.md).

**E-33 · Standortzeit und bestätigte Ausnahmepläne.** Aktive Logik in `site.js` nutzt `Europe/Berlin`, UTC-Kalendertage und elf NRW-Feiertage. Ungeklärte Feiertage sowie Heiligabend/Silvester bleiben neutral. Reguläre HTML-Zeiten bleiben ohne JavaScript vorhanden. Verworfen: Gerätezeit, ungeprüfte Sonderöffnungen und pauschale Öffnungszusagen am nächsten Wochentag. Zentrale Pflege und Nachweise siehe [Anleitung](oeffnungszeiten-pflegen.md).

**E-34 · E-Mail-Schutz bewusst erhalten.** Der Inhaber widerspricht ausdrücklich der in der Analyse vorgeschlagenen Cloudflare-Ausnahme und möchte Schutz vor Adresssammlern. Keine `email_off`-Markierung und keine Cloudflare-Einstellungsänderung. Die bekannte fehlende Live-Adresse ohne JavaScript wird als Grenze dokumentiert. Diese neue Entscheidung ersetzt die frühere offene Abschaltempfehlung; nicht erneut ungefragt abschalten. Mobile Navigation bekommt unabhängig davon einen funktionierenden Zustand ohne JavaScript.

**E-35 · Bestehende Gestaltung, kürzerer Kundenweg.** Routen-/Anrufabschluss auf Sortiment und Ladenseite, frühere telefonische Bestandsprüfung und sechs klare Warengruppen. Das wiederholte Außenfoto entfällt nur im Kopf der Sortimentsseite; vorhandene Fotos bleiben im Projekt/auf den anderen Seiten. Keine neuen Produkte oder Produktfoto-Pflicht, kein Shop und keine zusätzliche feste Aktionsleiste. Routenweiterleitung über `/route.html` bleibt erhalten.

**E-36 · Quellengebundene Park- und Bewertungsangaben.** Stadtbedingungen inklusive Registrierung der kostenlosen 15 Minuten und befristeter E-Parkregel präzisiert; konkrete Stellplätze nicht ungeprüft einem Tarif zugeordnet. Google zeigte erneut 4,4 Sterne, aber in der neuen eingeschränkten Ansicht keine Bewertungsanzahl. Deshalb genaue Anzahl weggelassen, Sterne mit Prüfdatum 24.09.2026 beibehalten. Verworfen: 128 aus der früheren Sitzung ohne aktuelle Sichtbarkeit übernehmen. Bestehende Zitatdaten unverändert.

**E-37 · Aktive Tests und autorisierte Veröffentlichung.** Playwright/Axe prüfen die tatsächlichen sechs HTML-Seiten und aktiven Assets. Alte Puppeteer-/Modaltests sind archiviert; Tailwind bleibt nur historisch verfügbar. Neue lokale Lighthouse-Messung statt alter Scorebehauptung. Der ausdrücklich abschließende Push-/Merge-Auftrag des Inhabers hat Vorrang vor der zuvor im selben Auftrag übernommenen Formulierung „lokal ohne Veröffentlichung“. Google-Profil-Änderung bleibt gesonderter externer Schritt.

_Neue Entscheidungen können wahlweise hier oder direkt im entsprechenden Abschnitt von `gedaechtnis-gesamt.md` ergänzt werden — aber konsequent an **einer** Stelle. Wird diese Datei genutzt, gehört ein Verweis darauf in den betreffenden Abschnitt der Gesamtdatei._

### 09.08.2026 — Relaunch auf Designrichtung A („Ladenschild")

**E-10 · Entwurf als echte Multi-Page nachgebaut statt Export übernommen.**
Der Export aus Claude Design ist ein Vorschau-Bundle (`<title>Bundled Page</title>`),
rendert nur mit JavaScript und ist eine Einzelseite mit JS-Umschaltung.
_Verworfene Alternative:_ den Export als `index.html` einspielen — hätte
`/sortiment.html`, `/ueber-uns.html` und `/kontakt.html` aus dem Google-Index
fallen lassen und `sitemap.xml` entwertet. Die URLs blieben deshalb unverändert;
nur die Beschriftung „Tradition & Auswahl" heißt jetzt „Der Laden", die Datei
weiterhin `ueber-uns.html`.

**E-11 · Schrift weiterhin selbst gehostet.** Der Entwurf lädt Nunito von
`fonts.googleapis.com`. _Verworfen,_ weil das gegen die CSP verstößt und
Besucher-IPs an Google gibt. Das Repo hat Nunito 400–700 bereits lokal; die
im Entwurf verwendete Stärke 800 wird auf 700 abgebildet.

**E-12 · Karte bleibt die Google-Maps-Zwei-Klick-Lösung.** Der Entwurf bringt
eine `karte.html` mit Leaflet von `unpkg.com` und Kacheln von OpenStreetMap.
_Verworfen,_ weil das zwei neue Drittanbieter einführt und eine Änderung von
`datenschutz.html` erzwungen hätte — dort ist ausdrücklich die Zwei-Klick-Lösung
für Google Maps beschrieben. Beides muss übereinstimmen.

**E-13 · Eigenes Stylesheet statt Tailwind.** `assets/css/site.css` ist
handgeschrieben, rund 400 Zeilen, ohne Build-Schritt. _Verworfen:_ die Palette
des Entwurfs in `tailwind.config.js` nachzuziehen — der Entwurf nutzt Tailwind
gar nicht, und der bisherige Build erzeugte 26 KB CSS für weniger Layout.
`npm run build:css` und `styles.min.css` bleiben bestehen, weil die
archivierten Seiten und die beiden Rechtsseiten sie noch verwenden.

**E-14 · Bewertungszahl auf 4,4 / 127 vereinheitlicht.** Beleg ist der
Google-Export vom 09.08.2026 (`totalScore` 4.4, `reviewsCount` 127, einheitlich
über alle 98 lesbaren Datensätze). Die bisherige `125` im JSON-LD war veraltet.
Siehe auch [[04_stolperfallen]] zur Prüfung der Zitate.

### 09.08.2026 — Nacharbeit nach dem Relaunch

**E-15 · Rechtsseiten in das neue Design überführt, Rechtstext unangetastet.**
`impressum.html` und `datenschutz.html` trugen weiterhin das alte
Tailwind-Layout. Sie haben jetzt denselben Rahmen wie alle anderen Seiten.
_Verworfene Alternative:_ die Seiten neu schreiben — zu riskant bei
Rechtstexten. Stattdessen chirurgische Eingriffe nur an Kopf, Rahmen und
Fußbereich; dass der Rechtstext zeichengenau identisch blieb, ist per
Textvergleich gegen die Vorfassung belegt (17 bzw. 60 Textblöcke).

**E-16 · Zwei Farbtöne des Entwurfs abgedunkelt.** `#8B7D6E` auf Creme ergab
3,88:1 (nötig 4,5) und `#A99C8D` auf Rose 2,36:1 (nötig 3,0). Beide sind so
weit abgedunkelt worden, wie die Schwelle es verlangt, nicht weiter:
`#7F7265` und `#95897C`. Ebenso die Fußzeile von Alpha 0,5 auf 0,58 — sie
verfehlte AA mit 4,47:1 um Haaresbreite.
_Verworfen:_ die Farben unverändert lassen und den Befund hinnehmen. Bei einem
Ladengeschäft mit älterer Kundschaft ist Lesbarkeit kein Nebenschauplatz.

**E-17 · Überschriften gestaffelt.** Der Entwurf nutzt 54px nur auf der
Startseite und 46–48px auf den Unterseiten; meine erste Fassung setzte
überall 54px. Grundwert ist jetzt die Unterseite, `.hero h1` hebt sich ab.
Die 48px der Kontaktseite sind auf 46px vereinheitlicht — zwei Pixel
rechtfertigen keine eigene Klasse.

**E-18 · Bilder mit `srcset` statt einer Fassung für alle.** Ein 375-px-Handy
lud die 1400-px-Datei in einen 331-px-Kasten; Lighthouse wies 503 KB unnötige
Bilddaten aus. Jede Aufnahme liegt jetzt in drei Breiten vor.
_Verworfen:_ WebP oder AVIF zusätzlich — dafür fehlt hier ein Encoder
(`System.Drawing` kann es nicht), und die Ersparnis wäre nach dem Verkleinern
nur noch rund 96 KB. Bleibt als Option, wenn ein Encoder verfügbar ist.

**E-19 · Zwei Fotos oben beschnitten, Seitenverhältnisse weichen bewusst ab.**
Auf Wunsch des Inhabers zeigen Eingangs- und Schaufensterfoto nicht mehr den
Bereich oberhalb des Ladens — beim Eingang Betonunterzug und zusammengerollte,
ausgefranste Markise (22 % oben weg, jetzt 1200/1089 statt 1400/1628), beim
Schaufenster Unterzug und cremefarbener Sturz oberhalb des roten Rahmens
(13,6 % weg, jetzt 1400/858 statt 1600/1136). Der rote Rahmen bleibt oben als
schmaler Streifen erhalten, sonst verlöre das Bild seinen Rahmen.

Beide Zuschnitte stammen aus der jeweils höchstauflösenden Quelle in
`asiamarkt-website-verbessern/project/uploads/`, nicht aus der bereits
komprimierten Webfassung. Beim Schaufenster ist das die unretuschierte
`schaufenster.jpg` mit 1600×1136 — daher stammt auch das `1600/1136` des
Entwurfs.

_Abgewogen:_ Der Schaufenster-Zuschnitt bringt die beiden Bilder der
Startgalerie fast auf gleiche Höhe (Unterschied von 56 px auf 9 px). In der
Dreiergalerie auf „Der Laden" wächst die Höhenspanne dagegen von 88 px auf
129 px. Das ist hingenommen: Der Entwurf setzt dort `align-items: start`,
die versetzte Anordnung ist gewollt.

### 12.08.2026 — Rechtskorrekturen an Impressum, Datenschutz und Bewertungen

**E-20 · E-Mail-Adresse steht wieder im Klartext im Quelltext.** Die Adresse wurde
bis dahin erst im Browser aus zwei Teilstrings zusammengesetzt (`email()` in
`site.js`); ohne JavaScript stand im Impressum gar keine. § 5 Abs. 1 Nr. 2 DDG
verlangt sie aber „leicht erkennbar, unmittelbar erreichbar und ständig verfügbar".
_Verworfene Alternative:_ den Spamschutz behalten und nur eine Grafik ergänzen —
scheitert an derselben Anforderung und zusätzlich an der Barrierefreiheit. Der
Schutz war ohnehin wirkungslos: Die Teilstrings standen offen in `site.js`.
Die Funktion `email()` ist entfallen, das Attribut `data-email-link` existiert
nicht mehr.

**E-21 · `aggregateRating` aus allen JSON-LD-Blöcken entfernt.** Eine Bewertung,
mit der ein Unternehmen sich selbst auszeichnet, verstößt gegen Googles
Richtlinie zu Bewertungs-Rich-Results (self-serving reviews) und riskiert eine
manuelle Maßnahme — und das Google-Profil ist für diesen Laden der wichtigste
Kanal (vgl. `F-15`). _Verworfen:_ die Auszeichnung behalten und auf Kulanz hoffen.
Die Note 4,4 aus 127 Bewertungen steht weiterhin im sichtbaren Text von Start-
und Ladenseite, jetzt mit Quellenangabe. Rückgängig zu machen ist das mit einem
Commit, falls der Inhaber anders entscheidet.

**E-22 · Bewertungszitate anonymisiert und mit Echtheitshinweis versehen.**
Zwei der drei Zitate auf der Startseite trugen den Klarnamen der Verfasserin
oder des Verfassers. Alle drei sind jetzt einheitlich als „Google-Bewertung,
Monat Jahr" ausgewiesen — dieselbe Lösung, die `F-12` schon für das dritte Zitat
gefunden hatte. Dazu kommt der Hinweis nach § 5b Abs. 3 UWG (ob und wie die
Echtheit sichergestellt wird) samt Link auf das vollständige Google-Profil; der
Link entkräftet zugleich den Vorwurf, nur die guten Stimmen zu zeigen.

**E-23 · Die Karte lässt sich wieder ausblenden.** Art. 7 Abs. 3 DSGVO verlangt,
dass der Widerruf einer Einwilligung so einfach ist wie ihre Erteilung. Bisher
half nur das Neuladen der Seite. `karte()` in `site.js` erzeugt nach dem Laden
einen Knopf „Karte ausblenden"; er stellt die Fassade wieder her, meldet den
Ladeknopf neu an und setzt den Fokus zurück. Der Knopf sitzt in der neuen
`.maps-spalte` **neben** dem Rahmen, nicht darin: `.maps-rahmen` hat
`overflow: hidden` und hätte ihn verschluckt. Nebenbei ist die
`referrerPolicy` des iframes von `no-referrer-when-downgrade` auf
`strict-origin-when-cross-origin` gezogen — Google bekommt jetzt nur noch die
Herkunft, nicht die vollständige Adresse der Kontaktseite.

**E-24 · Cloudflare aus der CSP entfernt.** `script-src` und `connect-src`
erlaubten weiterhin `static.cloudflareinsights.com`, obwohl der Beacon seit dem
Relaunch nicht mehr geladen wird. Die Prüfung der Live-Seite hat bestätigt, dass
auch serverseitig nichts injiziert wird (`Server: GitHub.com`, kein
Cloudflare-Proxy). Erlaubnis und Wirklichkeit stimmen damit wieder überein.

### 12.08.2026 — Zwischenseite für die Routenplanung

**E-25 · `route.html` als zählbare Zwischenstation vor Google Maps.**
Der Inhaber wollte wissen, wie oft „Route planen" gedrückt wird. Klicks auf
einen Link, der die Seite verlässt, hinterlassen im Serverprotokoll nichts —
gemessen werden könnten sie nur mit JavaScript im Browser, und das ist nach der
Linie der Aufsichtsbehörden einwilligungspflichtig (§ 25 Abs. 1 TDDDG, EDSA-
Leitlinien 2/2023). Beide „Route planen"-Knöpfe zeigen deshalb jetzt auf
`/route.html`; diese Seite leitet per `<meta http-equiv="refresh">` sofort zu
Google weiter. Aus dem Klick wird damit eine gewöhnliche Seitenanfrage, die
jede serverseitige Statistik zählt — ohne Skript, ohne Cookie, ohne Zugriff auf
das Endgerät.

_Verworfene Alternative:_ das Cloudflare-Web-Analytics-Snippet einbauen, das
der Inhaber am selben Tag geschickt hatte. Es ist der JavaScript-Beacon, nicht
der Proxy — also genau die einwilligungspflichtige Variante. Auf seine Ansage
hin nicht umgesetzt.

_Umsetzungsdetails, die nicht offensichtlich sind:_

- **Kein JavaScript.** `<meta refresh>` funktioniert auch ohne, und ein
  `location.replace` wäre mit der CSP ohne `'unsafe-inline'` ohnehin nicht
  gegangen. Die CSP der Seite setzt zusätzlich `script-src 'none'`.
- **`noindex, nofollow`**, und die Seite steht bewusst *nicht* in der
  `sitemap.xml`. Ein `Disallow` in `robots.txt` wäre falsch: Dann käme Google
  gar nicht erst an das `noindex` heran.
- **Die aufrufenden Links behalten `target="_blank"`.** Das ist kein Zufall:
  `<meta refresh>` hinterlässt in manchen Browsern einen Verlaufseintrag, und
  der Zurück-Knopf liefe in eine Schleife. In einem frischen Tab gibt es
  nichts, wohin zurück.
- **Weiterleitungsziel zeichengleich** mit dem bisherigen Direktlink, geprüft
  gegen die archivierte Fassung.
- Für **„Anrufen"** gibt es kein Gegenstück. Ein `tel:`-Link löst keine
  Serveranfrage aus, und eine Zwischenseite davor wäre unzuverlässig. Diese
  Zahl steht im Google-Unternehmensprofil unter „Leistung".

_Noch offen:_ Gezählt wird erst, wenn der Cloudflare-Proxy steht — GitHub Pages
gibt keine Protokolle heraus. Die Datenschutzerklärung braucht dafür heute
nichts: Der Aufruf von `route.html` ist eine gewöhnliche Seitenanfrage und von
Abschnitt 3 (Server-Protokolle, Art. 6 Abs. 1 lit. f) gedeckt. Ein
klarstellender Satz kommt beim Umschreiben für Cloudflare dazu.

### 14.08.2026 — Cloudflare als Proxy davor, Datenschutzerklärung nachgezogen

**E-26 · Auslieferung läuft jetzt über Cloudflare.** Die Nameserver liegen bei
Cloudflare, der Proxy ist aktiv (`Server: cloudflare`, `CF-RAY: …-FRA`).
Abschnitt 3 der Datenschutzerklärung heißt deshalb nicht mehr
„Hosting – GitHub Pages", sondern „Hosting, Auslieferung und
Besucherstatistik" und hat drei Unterabschnitte: GitHub speichert, Cloudflare
liefert aus und schützt, aus denselben Anfragen entsteht die Statistik.
Cloudflare ist als Auftragsverarbeiter benannt, Rechtsgrundlage Art. 6 Abs. 1
lit. f DSGVO, USA-Übermittlung in Abschnitt 7 mit DPF-Zertifizierung.

**E-27 · Das Bot-Skript von Cloudflare wird von unserer eigenen CSP gestoppt.**
Cloudflare hängt auf jeder Seite ein Inline-Skript ans Dokumentende, das
`/cdn-cgi/challenge-platform/scripts/jsd/main.js` nachladen würde. Unsere CSP
steht in Zeile 10 und erlaubt `script-src 'self'` **ohne** `'unsafe-inline'`;
die Einschleusung sitzt in Zeile 288, also danach. Cloudflare sendet keinen
eigenen CSP-Header, der das aufweichen würde. Das Skript wird deshalb
blockiert und lädt nie.

**Das ist die tragende Säule der Einwilligungsfreiheit** — und sie ist dünner,
als sie aussieht: Wer je `'unsafe-inline'` in die CSP schreibt, macht die
Aussage „keine Skripte, kein Zugriff auf das Endgerät" in Abschnitt 3 und 6
der Datenschutzerklärung unwahr und braucht ein Einwilligungsbanner.
_Verworfene Alternative:_ die Aussage auf die CSP zu stützen und das im Text zu
erwähnen — zu fragil für einen Rechtstext. Die Erklärung sagt schlicht, was
gilt; die Abhängigkeit steht hier.

**E-28 · Zwei Cloudflare-Schalter bleiben zu prüfen.**
*Email Address Obfuscation* (Scrape Shield) ist noch an: Sie ersetzt die
E-Mail-Adresse in `impressum.html` und `datenschutz.html` durch
`/cdn-cgi/l/email-protection`; im Quelltext steht die Adresse damit **nicht**
mehr. Im Browser mit JavaScript erscheint sie normal — der Inhaber hat das mit
einem Screenshot belegt —, ohne JavaScript aber gar nicht. Das ist derselbe
Mangel wie in `F-19`, nur kleiner: Screenreader führen JavaScript aus, betroffen
sind allein Besucher mit abgeschaltetem JavaScript. Empfehlung steht, die
Entscheidung liegt beim Inhaber.
*Speed Brain* (Prefetch, `eagerness: conservative`) ist an und lädt Links beim
Antippen vor. Das kann die Zählung von `/route.html` leicht nach oben
verzerren, weil auch ein abgebrochener Klick schon einen Abruf auslöst.
Verzerrung gering, Geschwindigkeitsgewinn real — bewusst angelassen.

### 14.08.2026 — Rechtstexte auf das Pflichtprogramm gekürzt

**E-29 · Impressum von neun Abschnitten auf zwei.** Übrig bleiben die Angaben
nach § 5 Abs. 1 DDG und die Kontaktdaten. Gestrichen wurden:

| Gestrichen | Warum |
|---|---|
| Berufsrechtliche Regelungen (LMIV, LFGB) | § 5 DDG verlangt so etwas nicht. Die Aufsichtsbehörde nach Nr. 3 ist nur bei **zulassungspflichtigen** Tätigkeiten zu nennen; Lebensmitteleinzelhandel ist nach Art. 6 Abs. 2 VO (EG) 852/2004 lediglich **registrierungspflichtig**. |
| Verantwortlich nach § 18 Abs. 2 MStV | Gilt für journalistisch-redaktionelle Angebote. Eine Ladenwebsite ist keines. |
| Verbraucherstreitbeilegung | § 36 VSBG greift bei zehn oder weniger Beschäftigten nicht, siehe [`01_kontext.md`](01_kontext.md). |
| Haftung für Inhalte, Haftung für Links, Urheberrecht | Nicht vorgeschrieben und nach herrschender Meinung wirkungslos: Die Haftungsprivilegien der Art. 4 bis 6 DSA gelten kraft Gesetzes, das Urheberrecht entsteht nach § 7 UrhG mit dem Werk. Der Link-Disclaimer kann sogar schaden, weil er den Eindruck erweckt, man habe die verlinkten Inhalte geprüft. |

**E-30 · Datenschutzerklärung von elf Abschnitten auf fünf.** Geblieben ist,
was Art. 13 DSGVO und § 25 TDDDG verlangen: Verantwortlicher, Aufruf der
Website (GitHub, Cloudflare, Statistik, USA), Google Maps mit Einwilligung und
Widerruf, Betroffenenrechte, und das Widerspruchsrecht gesondert nach
Art. 21 Abs. 4 DSGVO. Gestrichen: „Datenschutz auf einen Blick" (eine
Zusammenfassung ist nirgends vorgeschrieben), der Satz zum
Datenschutzbeauftragten (Art. 13 Abs. 1 lit. b verlangt seine Kontaktdaten nur
„gegebenenfalls"; ist keiner benannt, gibt es nichts mitzuteilen), die
Abschnitte zu Schriftarten und Cookies (beides Aussagen über Verarbeitungen,
die *nicht* stattfinden, also ohne Informationspflicht), der eigene
Drittland-Abschnitt (in Abschnitt 2 und 3 eingearbeitet) und die Stand-Angabe
(nicht vorgeschrieben).

_Belegt und nicht geraten:_ GitHub Inc. hat eine **eigene**
DPF-Zertifizierung, unabhängig von Microsoft. Cloudflare, Inc. und Google LLC
sind ebenfalls zertifiziert. Alle drei sind namentlich genannt, wie es
Art. 13 Abs. 1 lit. e und f verlangt.

_Abgewogen:_ Kürzen erhöht das Risiko, eine Pflichtangabe zu verlieren. Die
Gegenprobe lief deshalb buchstabenweise gegen Art. 13 Abs. 1 lit. a bis f und
Abs. 2 lit. a bis f. Zwei Buchstaben sind hier gegenstandslos: lit. e des
Abs. 2 (Bereitstellungspflicht) mangels Eingabefeldern, lit. f (automatisierte
Entscheidungsfindung) mangels solcher.

**E-31 · Geviertstriche entfernt.** Alle 32 Vorkommen von „—" in den
ausgelieferten Dateien sind ersetzt, in Fließtext und Kommentaren durch Komma
oder Doppelpunkt, in Seitentiteln durch „|" wie auf den übrigen Seiten. Der
Geviertstrich ist eine englische Konvention und im Deutschen ohnehin fehl am
Platz.

_Nachtrag am selben Tag, zwei Fehler im ersten Durchgang:_

**Erstens** war die Ersetzung mechanisch (überall ein Komma) und hat sechs
Kommafehler erzeugt, darunter vier Komma­splices in Kommentaren von `site.js`
und `site.css`. Nachgezogen mit Punkt, Doppelpunkt oder Umformulierung.
Merke: Ein Gedankenstrich verbindet zwei Hauptsätze; ein Komma darf das im
Deutschen nur eingeschränkt, ein Punkt immer.

**Zweitens**, und wichtiger: Der Halbgeviertstrich „–" ist **nicht pauschal
harmlos**. Er hat zwei verschiedene Aufgaben, und nur eine davon ist korrekt.

| Verwendung | Beispiel | Bewertung |
|---|---|---|
| Spanne | `Mo–Fr`, `9–18 Uhr` | richtig, bleibt |
| Gedankenstrich | „Asia Markt Thien Phu in Langenfeld – frische Kräuter …" | dasselbe Muster wie „—", entfernt |

Elf solcher Gedankenstriche standen in den Seitenbeschreibungen und im Titel
von `ueber-uns.html`, also genau dort, wo sie in Google-Treffern und beim
Teilen sichtbar werden: drei in `index.html`, zwei in `sortiment.html`, vier
in `ueber-uns.html`, zwei in `kontakt.html`. Sie sind durch Doppelpunkt, Komma oder Punkt ersetzt.
Übrig bleiben ausschließlich Spannen; die Gegenprobe listet nur noch
`Mo–Fr`, `9–18` und `9–14`.

**E-32 · Die CSS-Regel `.rechtstext code` ist wieder entfallen.** Sie war für
die Erwähnung von `/route.html` in der Datenschutzerklärung angelegt worden;
mit der Kürzung auf das gesetzliche Minimum (`E-30`) ist diese Erwähnung
weggefallen, und kein Rechtstext enthält mehr ein `<code>`-Element.

---

_Angelegt am 31.07.2026._
