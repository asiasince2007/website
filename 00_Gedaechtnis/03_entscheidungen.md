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

---

_Angelegt am 31.07.2026._
