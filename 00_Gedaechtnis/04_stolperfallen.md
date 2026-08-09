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

---

_Angelegt am 31.07.2026._
