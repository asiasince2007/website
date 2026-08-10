# 03 — Entscheidungen

> **Diese Inhalte stehen gesammelt in [`gedaechtnis-gesamt.md`](gedaechtnis-gesamt.md).** Jene Datei ist historisch als **eine** durchgehende Wissensdatei geführt worden, deren sieben Abschnitte genau den kanonischen Kerndateien entsprechen. Bei der Vereinheitlichung am 31.07.2026 wurde sie bewusst **nicht** zerschnitten, weil ihre Abschnitte aufeinander verweisen und das Änderungsprotokoll am Ende sie zusammenhält.

Maßgeblich ist **Abschnitt 3 (Architektur-Entscheidungen in ADR-Kurzform)** der Gesamtdatei.

## Neue Einträge

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

---

_Angelegt am 31.07.2026._
