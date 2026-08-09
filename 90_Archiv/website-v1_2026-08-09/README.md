# Website v1 — Stand 09.08.2026

Die vier Seiten der ersten Website-Fassung, abgelöst durch den Relaunch
„Richtung A — Ladenschild".

| Datei | war erreichbar unter |
|---|---|
| `index.html` | `https://www.asiamarkt.info/` |
| `sortiment.html` | `https://www.asiamarkt.info/sortiment.html` |
| `ueber-uns.html` | `https://www.asiamarkt.info/ueber-uns.html` |
| `kontakt.html` | `https://www.asiamarkt.info/kontakt.html` |

## Wichtig beim Lesen dieser Dateien

Die Seiten lagen ursprünglich im **Repo-Wurzelverzeichnis**. `styles.min.css`
und `main.js` sind am 09.08.2026 mit hierher gewandert und liegen unter
denselben relativen Pfaden wie zuvor — beim Öffnen aus diesem Ordner heraus
laden Layout und Skript also. Fonts und Bilder fehlen, sie liegen weiterhin
nur im Wurzelverzeichnis.

## Warum `main.js` nicht mehr ausgeliefert wird

Die Datei enthält in Zeile 4 den Web3Forms-Zugriffsschlüssel
`W3F_KEY = 'f91a4036-…'` des Vorschlags- und Feedbackformulars. Nach dem
Relaunch referenzierte sie keine einzige Seite mehr, sie wurde von GitHub Pages
aber weiterhin unter `/assets/js/main.js` öffentlich ausgeliefert — toter Code
mit einem funktionsfähigen Schlüssel, mit dem sich das Postfach des Inhabers
zuspammen ließe. Mit dem Umzug in diesen Ordner (`_config.yml` → `exclude`)
ist sie nicht mehr abrufbar.

> **TODO(inhaber):** Der Schlüssel steht weiterhin in der Git-Historie und
> lässt sich daraus rekonstruieren. Er sollte im Web3Forms-Konto **ersetzt oder
> gelöscht** werden. Das kann nur der Kontoinhaber tun.

## Warum der Bewertungs-Dialog nicht zurückkehren sollte

`main.js` enthält mit `reviewYes()` / `reviewNo()` eine Bewertungsweiche: Auf
die Frage „Waren Sie zufrieden?" führte **Ja** direkt zum Google-Bewertungs­
formular, **Nein** dagegen in ein privates Feedbackfeld. Google untersagt
dieses Vorgehen ausdrücklich — negative Bewertungen dürfen nicht abgefangen
und positive nicht gezielt eingeworben werden (Review Gating). Sollte das
Formular je zurückkehren, dann ohne diese Verzweigung.

Der exakte, lauffähige Live-Stand steht im Git-Verlauf: Commit `19ed9a4`
(„Merge pull request #48"). So lässt er sich vollständig wiederherstellen:

```bash
git show 19ed9a4:index.html > /tmp/alt-index.html
```

## Nicht ausgeliefert

`90_Archiv` steht in `_config.yml` unter `exclude`. GitHub Pages baut den Ordner
damit nicht mit aus — die alten Seiten bleiben im Repo erhalten, sind unter
`www.asiamarkt.info` aber nicht abrufbar. Das verhindert Duplicate Content:
Google würde sonst zwei nahezu identische Fassungen jeder Seite finden.

`impressum.html` und `datenschutz.html` sind **bewusst nicht** mitarchiviert
worden. Sie gelten unverändert weiter, liegen weiterhin im Wurzelverzeichnis und
werden aus dem Footer der neuen Seiten verlinkt.
