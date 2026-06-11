# Übergabe an Claude Code — Schritt für Schritt

> Ziel: Die Planungsdateien ins Repo bringen und Claude Code phasenweise umsetzen lassen.
> Hinweis: Es gibt **keinen** GitHub-Konnektor in der Konnektor-Liste — das Repo wird daher
> klassisch per Git/GitHub Desktop verwaltet (beides ist auf deinem Rechner installiert).

## Schritt 1 — Repo lokal holen (falls noch nicht vorhanden)

**Variante A: GitHub Desktop** (installiert) → „File ▸ Clone repository" →
`asiasince2007/website` → lokal klonen.

**Variante B: Git Bash**
```bash
cd ~/Documents
git clone https://github.com/asiasince2007/website.git
cd website
```

## Schritt 2 — Planungsdateien ins Repo kopieren

Aus dem Cowork-Ordner **„Asia Website"** ins geklonte Repo übernehmen:

- `CLAUDE.md` → **ins Repo-Root** (Claude Code liest das automatisch zuerst).
- gesamten Ordner `docs/` → ins Repo-Root (`ANALYSE.md`, `PLAN.md`, `GEDAECHTNIS.md`,
  `HERO-BEWERTUNGEN-KARUSSELL.md`, `BILD-PROMPTS.md`, `bewertungen-kuratiert.json`,
  `UEBERGABE-CLAUDE-CODE.md`).
- Für das Marquee zur Laufzeit zusätzlich eine Kopie der Bewertungen nach
  `assets/data/bewertungen-kuratiert.json` legen (oder Claude Code den Pfad anpassen lassen).
- Den Ordner `demo/` musst du **nicht** committen (nur Vorschau).

```bash
# Beispiel (Pfade ggf. anpassen)
cp "/c/Users/yphu/Documents/Claude/Projects/Asia Website/CLAUDE.md" .
cp -r "/c/Users/yphu/Documents/Claude/Projects/Asia Website/docs" .
mkdir -p assets/data && cp docs/bewertungen-kuratiert.json assets/data/
git add -A && git commit -m "docs: Analyse, Plan, Gedächtnis & Bewertungsdaten ergänzen"
git push
```

## Schritt 3 — Claude Code starten

Im Repo-Ordner Claude Code öffnen. Es liest `CLAUDE.md` → folgt zu `docs/GEDAECHTNIS.md`
und `docs/PLAN.md`. Du arbeitest die Phasen der Reihe nach ab.

## Schritt 4 — Empfohlene Start-Prompts (eine Phase pro Prompt)

1. **Setup/Performance:**
   > „Lies CLAUDE.md, docs/GEDAECHTNIS.md und docs/PLAN.md. Setze Phase 0 und Phase 1 um:
   > Tailwind-Build statt CDN, leeres styles.min.css beheben, das 3,5-MB-Logo optimieren,
   > Fonts/Icons entlasten, Google-Maps lazy. Halte dich an die Akzeptanzkriterien und
   > aktualisiere docs/GEDAECHTNIS.md."

2. **SEO-Fundament:**
   > „Setze Phase 2 um: GroceryStore-JSON-LD (Werte aus GEDAECHTNIS.md), sitemap.xml + robots.txt,
   > Open Graph/Twitter Cards, aggregateRating 4,39/100, theme-color & Favicon."

3. **Multi-Page:**
   > „Setze Phase 3 um: die SPA in echte Einzelseiten mit eigenen URLs auftrennen, Navigation
   > auf echte Links, seitenspezifische Title/Description/H1, Sitemap & alte Hash-Links mappen."

4. **Marquee:**
   > „Setze Phase 4b um: das Hero-Bewertungs-Laufband nach docs/HERO-BEWERTUNGEN-KARUSSELL.md,
   > Daten aus assets/data/bewertungen-kuratiert.json."

5. **Bilder (sobald vorhanden):**
   > „Ersetze die Hero- und Über-uns-Platzhalter durch die neuen Bilder, optimiere sie als WebP
   > (< 300 KB) und setze width/height. Sortiment bleibt bewusst ohne Produktfotos (ADR-05)."

6. **Content + A11y/Recht (Phase 5/6)** analog.

## Schritt 5 — Offene Zulieferungen von dir (`TODO(inhaber)`)

- Zwei Bilder (Hero + „Über uns") — selbst fotografieren oder per KI nach `docs/BILD-PROMPTS.md`.
- Inhabername für Impressum/Schema bestätigen.
- Google Business Profile pflegen (Kategorien, Fotos, Beiträge) — wirkt stark aufs Local-Ranking.

## Definition of Done (gilt je Änderung)

Build läuft fehlerfrei · Lighthouse-Mobil ≥ 90 in allen vier Kategorien · valides JSON-LD
(Rich-Results-Test) · NAP konsistent · keine Konsolenfehler · `docs/GEDAECHTNIS.md` aktualisiert.
