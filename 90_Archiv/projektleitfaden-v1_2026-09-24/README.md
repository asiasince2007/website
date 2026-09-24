# Asia Markt Thien Phu — Website-Projekt

> **Abgeschlossenes Projekt.** Dieser Ordner liegt im Archiv `ZZ_Archiv_Abgeschlossene-Projekte/`. Er wird vollständig aufbewahrt, aber nicht mehr fortgeschrieben. Inhalte können überholt sein — vor jeder Wiederverwendung Aktualität prüfen. Soll wieder daran gearbeitet werden, wandert der Ordner zurück auf die oberste Ebene.
>
> **Achtung, dieses Projekt ist live.** Der Ordner ist ein Git-Repository, dessen `main`-Branch über GitHub Pages die öffentlich erreichbare Website ausliefert (`www.asiamarkt.info`, CNAME im Repo). Archiviert heißt hier: es wird nicht mehr aktiv weiterentwickelt — **nicht**, dass Änderungen folgenlos wären. Ein Push auf `main` geht sofort live.

Analyse, Plan und Gedächtnis zur Verbesserung der Website von **Asia Markt Thien Phu**
(asiatisches Lebensmittelgeschäft, Hauptstraße 74, 40764 Langenfeld).
Live: https://www.asiamarkt.info/ · Repo: `asiasince2007/website` (GitHub Pages).

## Dateien

| Datei | Zweck |
|---|---|
| `CLAUDE.md` | Leitfaden für Claude Code (Regeln, Stack, Definition of Done). Wird bei der Umsetzung zuerst gelesen. |
| `00_Gedaechtnis/analyse-ausgangslage.md` | Ausführliche Ist-Analyse: Technik, SEO, Performance, Visuell/UX, Content, A11y/Recht — mit Schweregraden. |
| `00_Gedaechtnis/plan-relaunch.md` | Phasenweiser, abhakbarer Umsetzungsplan mit Akzeptanzkriterien für autonome Ausführung. |
| `00_Gedaechtnis/gedaechtnis-gesamt.md` | Lebendes Gedächtnis: Stammdaten (NAP), Entscheidungen, bekannte Fehler/Fixes, Lernprotokoll. |
| `00_Gedaechtnis/hero-bewertungen-karussell.md` | Konzept + fertiger Referenz-Code für das Hero-Bewertungs-Laufband (rechts→links, Endlosschleife). |
| `docs/bewertungen-kuratiert.json` | Kuratierte echte Google-Bewertungen (13 fürs Marquee + 35er-Pool) inkl. Statistik (100, Ø 4,39). |

## So geht es weiter

1. **Diese vier Dateien ins Repo übernehmen** (z. B. `docs/` + `CLAUDE.md` ins Root von
   `asiasince2007/website` kopieren), damit Claude Code sie direkt liest. Commit/Push machst du.
2. **Claude Code starten** und mit Phase 0 → 1 → 2 … aus `PLAN.md` beginnen.
3. Nach jeder Sitzung `00_Gedaechtnis/gedaechtnis-gesamt.md` aktualisieren (Lernprotokoll).

> Hinweis: Es ist **kein** GitHub-Konnektor aktiv verbunden. Das öffentliche Repo wurde für
> die Analyse direkt geklont. Für automatisches Pushen wäre ein GitHub-Konnektor oder ein
> lokaler Git-Workflow nötig.
