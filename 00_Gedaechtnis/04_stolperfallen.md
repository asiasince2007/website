# 04 — Stolperfallen

> **Diese Inhalte stehen gesammelt in [`gedaechtnis-gesamt.md`](gedaechtnis-gesamt.md).** Jene Datei ist historisch als **eine** durchgehende Wissensdatei geführt worden, deren sieben Abschnitte genau den kanonischen Kerndateien entsprechen. Bei der Vereinheitlichung am 31.07.2026 wurde sie bewusst **nicht** zerschnitten, weil ihre Abschnitte aufeinander verweisen und das Änderungsprotokoll am Ende sie zusammenhält.

Maßgeblich ist **Abschnitt 5 (Bekannte Fehler und Fixes)** der Gesamtdatei — eine durchnummerierte Wissensdatenbank `F-01` bis `F-09` mit Problem, Ursache und Fix-Status je Eintrag. Werkzeug- und Dateisystemfehler gehören zusätzlich in [`../../../00_UNIVERSAL_Technikgedaechtnis.md`](../../../00_UNIVERSAL_Technikgedaechtnis.md).

## Neue Einträge

_Neue Stolperfallen können wahlweise hier oder direkt im entsprechenden Abschnitt von `gedaechtnis-gesamt.md` ergänzt werden — aber konsequent an **einer** Stelle. Wird diese Datei genutzt, gehört ein Verweis darauf in den betreffenden Abschnitt der Gesamtdatei._

### 09.08.2026 — beim Relaunch aufgetreten

**F-10 · Bilder aus Claude Design kamen abgeschnitten an.**
_Was passiert ist:_ `DesignSync get_file` lieferte jede der fünf `web-*.jpg`
mit exakt 196 608 Byte (192 KiB) und `truncated: true` — ohne JPEG-Endmarker.
Beim Betrachten fiel es nicht sofort auf: `web-ladenfront.jpg` verlor nur
1 226 Byte und sah vollständig aus, `web-laden-eingang.jpg` dagegen 48 % und
war unten schwarz.
_Warum:_ harte Größengrenze der Leseschnittstelle, unabhängig vom Dateityp.
_Wie behoben:_ Der Inhaber hat die Originale manuell exportiert; daraus die
fertigen Zuschnitte des Designers übernommen.
_Künftig vermeiden:_ Binärdateien nie über `get_file` beziehen, ohne
`truncated` zu prüfen. Bei JPEG zusätzlich auf den Endmarker `FF D9` testen —
eine abgeschnittene Datei öffnet sich anstandslos und wirkt oben intakt.
Gehört auch ins [Universal-Technikgedächtnis](../../../00_UNIVERSAL_Technikgedaechtnis.md).

**F-11 · Einblendeffekt kann Inhalte dauerhaft verstecken.**
_Was passiert ist:_ Der Entwurf setzt `opacity: 0` auf alle Abschnitte und
macht sie erst per IntersectionObserver sichtbar. In der Vorschau feuerte der
Observer nie — die halbe Seite blieb unsichtbar, auch nach dem Scrollen.
_Warum:_ Die Vorschau zeichnete keine Frames; ein eigens angelegter
Test-Observer auf ein sichtbares Element meldete sich ebenfalls nicht. Also
ein Umgebungsartefakt — aber derselbe Effekt trifft jeden Browser, in dem der
Observer aus irgendeinem Grund ausfällt.
_Wie behoben:_ Zwei Änderungen in `assets/js/site.js`. Erstens ein
Sicherheitsnetz: Meldet sich der Observer nicht innerhalb von 1,5 s (er meldet
sich normalerweise sofort nach `observe()`, auch für nicht sichtbare Ziele),
wird `js-reveal` entfernt und alles gezeigt. Zweitens wird gar nicht erst
animiert, was beim Laden schon im Blickfeld liegt — das spart dem Hero-Bild
das Einblenden und damit Zeit beim Largest Contentful Paint.
_Künftig vermeiden:_ Ein Deko-Effekt darf nie die einzige Bedingung dafür
sein, dass Text sichtbar wird. Immer eine Rückfallebene einbauen.

**F-12 · Ein Zitat schien erfunden, war es aber nicht.**
_Was passiert ist:_ Von den drei Bewertungszitaten des Entwurfs ließ sich eines
zunächst nicht im Google-Export finden — ausgerechnet das ohne Namen, nur als
„Google-Bewertung, Mai 2026" ausgewiesen.
_Warum:_ Der Anzeigename des Kontos lautet „Are you okay?" (13.05.2026). Der
Entwurf hatte ihn zu Recht weggelassen, und meine erste Suche war zu eng.
_Künftig vermeiden:_ Vor dem Verwerfen einer Angabe mit Teilzeichenketten
gegensuchen. Und: anonyme Attribution ist hier kein Warnzeichen, sondern die
saubere Lösung für unbrauchbare Anzeigenamen.

**F-13 · Bildattribute haben `aspect-ratio` ausgehebelt.**
_Was passiert ist:_ Nach dem Relaunch waren sämtliche Fotos in viel zu hohe
Kästen geschnitten — die Ladenfront mit Verhältnis 0,562 statt 1,333, das
Eingangsfoto mit 0,332 statt 0,860.
_Warum:_ Die Attribute `width`/`height` am `<img>` wirken als Presentational
Hint auf **beide** CSS-Eigenschaften. `.foto` setzte `width: 100%`, aber nie
`height` — also blieb `height: 1050px` aus dem Attribut stehen. Stehen Breite
und Höhe beide fest, ignoriert der Browser `aspect-ratio` vollständig, und
`object-fit: cover` beschneidet auf den falschen Kasten.
_Wie behoben:_ `height: auto` in `.foto`. Die Attribute bleiben, sie
reservieren den Platz und verhindern Layoutsprünge.
_Künftig vermeiden:_ `width`/`height` am Bild und `aspect-ratio` im CSS
vertragen sich nur mit `height: auto`. Nie am gerenderten Kasten sparen —
Verhältnis messen (`getBoundingClientRect`), nicht nur die Breite.

**F-14 · Toter Code lieferte weiter einen gültigen Zugangsschlüssel aus.**
_Was passiert ist:_ `assets/js/main.js` wurde nach dem Relaunch von keiner
Seite mehr eingebunden, von GitHub Pages aber weiterhin unter
`/assets/js/main.js` mit HTTP 200 ausgeliefert — inklusive
`W3F_KEY = 'f91a4036-…'`, dem Web3Forms-Schlüssel des alten Formulars. Damit
ließe sich das Postfach des Inhabers zuspammen.
_Warum:_ „Nicht mehr verlinkt" ist nicht dasselbe wie „nicht mehr abrufbar".
Jekyll liefert jede Datei aus, die nicht in `exclude` steht.
_Wie behoben:_ Datei nach `90_Archiv/website-v1_2026-08-09/assets/js/`
verschoben (dort greift `exclude`), nicht gelöscht.
_Künftig vermeiden:_ Nach jedem Umbau prüfen, welche Dateien noch öffentlich
erreichbar sind — nicht, welche noch verlinkt sind. Der Schlüssel steht
weiterhin in der Git-Historie und muss im Web3Forms-Konto ersetzt werden.

**F-15 · Der alte Bewertungs-Dialog verstieß gegen Google-Richtlinien.**
_Was passiert ist:_ Beim Prüfen, ob der entfallene Vorschlags-Dialog
zurückkehren soll, fiel eine zweite Funktion auf: `reviewYes()` /
`reviewNo()` in `main.js` fragten „Waren Sie zufrieden?" — **Ja** führte zum
Google-Bewertungsformular, **Nein** in ein privates Feedbackfeld.
_Warum das ein Problem ist:_ Google untersagt Review Gating ausdrücklich.
Negative Bewertungen dürfen nicht abgefangen und positive nicht gezielt
eingeworben werden. Verstöße können Bewertungen oder das Profil kosten — und
das Profil ist für diesen Laden der wichtigste Kanal überhaupt.
_Künftig vermeiden:_ Nie nach Zufriedenheit filtern, bevor um eine Bewertung
gebeten wird. Entweder alle fragen oder niemanden.

---

_Angelegt am 31.07.2026._
