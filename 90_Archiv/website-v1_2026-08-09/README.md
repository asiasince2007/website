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

Die Seiten lagen ursprünglich im **Repo-Wurzelverzeichnis** und verweisen
entsprechend relativ auf `assets/css/styles.min.css`, `assets/js/main.js`,
`assets/fonts/` und `assets/images/`. Aus dem Archivordner heraus greifen diese
Pfade ins Leere — die Dateien sind hier als **Textbeleg** abgelegt, nicht als
lauffähige Kopie.

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
