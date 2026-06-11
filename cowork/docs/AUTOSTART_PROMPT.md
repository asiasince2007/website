# Autonomer Start-Prompt — Asia Markt Thien Phu Website
> Diesen Text als Eingabe-Prompt beim Start einer Claude Code Session verwenden.
> Model-Flag: `claude --model MODEL_HIER_EINTRAGEN`

---

## PROMPT (kopieren & einfügen)

```
Du arbeitest autonom an der Website von Asia Markt Thien Phu (https://www.asiamarkt.info/).

**PFLICHT VOR JEDEM ERSTEN SCHRITT:**
1. Lies `docs/GEDAECHTNIS.md` vollständig — dort stehen verbindliche NAP-Daten, Öffnungszeiten, Architekturentscheidungen und das bisherige Änderungsprotokoll. Diese Datei ist deine einzige Quelle der Wahrheit.
2. Lies `docs/PLAN.md` — dort stehen alle offenen Aufgaben mit Akzeptanzkriterien, phasenweise sortiert.
3. Lies `CLAUDE.md` im Root — dort stehen die globalen Regeln für dieses Projekt.

**DEINE AUFGABE:**
Arbeite `docs/PLAN.md` der Reihe nach ab, beginnend mit der ersten nicht abgehakten Aufgabe. Pro Aufgabe:
- Prüfe die Akzeptanzkriterien, bevor du anfängst.
- Implementiere die Änderung minimal und korrekt.
- Verifiziere die Akzeptanzkriterien nach der Umsetzung.
- Hake die Aufgabe in `docs/PLAN.md` ab (`[ ]` → `[x]`).
- Mache einen kleinen, thematisch sauberen `git commit` mit aussagekräftiger Nachricht.
- Ergänze `docs/GEDAECHTNIS.md` → Abschnitt „Änderungs- & Lernprotokoll".
Dann weiter mit der nächsten Aufgabe.

**ABSOLUTE REGELN (niemals brechen):**
- NAP (Name, Adresse, Telefon) ausschließlich aus `docs/GEDAECHTNIS.md` — niemals erfinden oder variieren.
- Nur Deutsch. Kein i18n.
- Kein Online-Shop, kein Warenkorb, kein Checkout.
- Keine Erfindungen: Produkte, Preise, Bewertungen nur verwenden, wenn in den Docs belegt. Unbekanntes als `TODO(inhaber)` markieren.
- Kein Bild > 300 KB committen.
- GitHub-Pages-kompatibel bleiben (statisch, kein serverseitiges Rendering).
- Build muss fehlerfrei laufen (`npm run build:css`) bevor du commitest.

**BEI UNKLARHEITEN:**
Markiere die Stelle mit `TODO(inhaber): [Frage]` und fahre mit der nächsten lösbaren Aufgabe fort. Stoppe nicht wegen fehlender Inhaber-Informationen.

**AM ENDE JEDER SITZUNG:**
- `docs/GEDAECHTNIS.md` → „Änderungs- & Lernprotokoll" mit Datum, erledigten Tasks und offenen Punkten aktualisieren.
- Alle Änderungen committen.
- Kurze Zusammenfassung: Was wurde erledigt, was ist als nächstes offen.

Fang jetzt an.
```

---

## Verwendung in der Kommandozeile

```bash
# Im Repo-Verzeichnis:
cd "C:\Users\yphu\Documents\Claude\Projects\Asia Website"

# Standard (interaktiv, Modell aus Config):
claude

# Mit spezifischem Modell + erweitertem Thinking:
claude --model claude-opus-4-5 --extended-thinking

# Vollautonomer Modus (kein manuelles OK bei jedem Schritt):
claude --model claude-opus-4-5 --dangerously-skip-permissions

# Prompt direkt mitgeben (non-interactive):
claude --model claude-opus-4-5 -p "$(cat docs/AUTOSTART_PROMPT.md | grep -A200 '## PROMPT' | tail -n +3 | head -n -4)"
```

> ⚠️ `--dangerously-skip-permissions` nur verwenden, wenn du dem Modell vertraust
> und den Repo-Zustand im Blick behältst (z.B. via `git diff` danach).

---

## Empfohlener Workflow

1. `git pull` — sicherstellen, dass du den neuesten Stand hast
2. Claude Code mit Prompt starten (s. oben)
3. Claude arbeitet autonom Phase für Phase ab
4. Am Ende: `git log --oneline -10` prüfen, dann `git push`
