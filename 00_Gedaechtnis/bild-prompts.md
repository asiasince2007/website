# Bild-Prompts für Hero & „Über uns"

> Es fehlen zwei echte Bilder (Hero-Startseite, „Über uns"-Innenaufnahme). Da hier keine
> KI-Bildgenerierung verfügbar ist, hier **fertige Prompts** zum Einfügen in ein Bild-Tool
> (z. B. ChatGPT/DALL·E, Midjourney, Adobe Firefly, Leonardo). Die Briefings entsprechen den
> bereits im Code hinterlegten Platzhalter-Beschreibungen.

## Technische Vorgaben (für beide Bilder)

- **Seitenverhältnis 4:5 (Hochformat)**, Zielgröße ~800×1000 px (für Web als WebP exportieren).
- Warmes, natürliches Licht; Naturtöne passend zur Marke (Creme, Grün, Erdtöne).
- **Kein Text, kein Logo, keine Wasserzeichen** im Bild. Keine erkennbaren echten Personen/Gesichter.
- Nach Erzeugung: als WebP komprimieren (< 300 KB) und unter passendem Namen in
  `assets/images/` ablegen (z. B. `hero-zutaten.webp`, `ueber-uns-laden.webp`); im Code den
  Platzhalter durch `<picture>`/`<img>` ersetzen (PLAN P4).

## 1) Hero – „Frische asiatische Zutaten"

**Deutsch:**
> Professionelle Food-Fotografie aus der Vogelperspektive: frische asiatische Zutaten
> appetitlich auf einer rustikalen Holzoberfläche arrangiert – Zitronengras, Thai-Basilikum,
> Galangal, rote Chilischoten, Kaffirlimettenblätter, Pak Choi, eine Schale Jasminreis,
> Sternanis und frischer Koriander. Warmes Naturlicht, lebendige, satte Farben, weicher
> Schärfeverlauf, hohe Detailtiefe, hochwertige Kochbuch-Ästhetik. Hochformat 4:5, kein Text.

**English (oft bessere Ergebnisse):**
> Professional overhead food photography: fresh Asian ingredients beautifully arranged on a
> rustic wooden surface — lemongrass, Thai basil, galangal, red chilies, kaffir lime leaves,
> pak choi, a bowl of jasmine rice, star anise and fresh cilantro. Warm natural light, vivid
> saturated colors, soft depth of field, high detail, premium cookbook aesthetic. Vertical 4:5,
> no text, no watermark.

## 2) „Über uns" – Ladeninterieur

**Deutsch:**
> Stimmungsvolle Innenaufnahme eines kleinen, gepflegten asiatischen Lebensmittelladens:
> ordentlich eingeräumte Regale voller bunter asiatischer Produktverpackungen, im Hintergrund
> ein Frischwarenbereich mit Gemüse sichtbar. Warmes Ladenlicht, Blick entlang eines schmalen
> Gangs, einladende und authentische Atmosphäre, Eindruck von Vielfalt und Reichhaltigkeit.
> Hochformat 4:5, keine erkennbaren Personen, kein Text.

**English:**
> Atmospheric interior photo of a small, tidy Asian grocery store: neatly stocked shelves full
> of colorful Asian product packaging, a fresh produce area with vegetables visible in the
> background. Warm store lighting, view down a narrow aisle, inviting and authentic atmosphere,
> sense of variety and abundance. Vertical 4:5, no recognizable people, no text, no watermark.

## Alternative ohne KI

- Eigene Handyfotos sind völlig ausreichend, wenn sie hell und gerade sind: Tageslicht nutzen,
  aufräumen, im Hochformat fotografieren – Claude Code kann sie zuschneiden/optimieren.
- Für den Hero genügt zur Not auch ein einziges sauberes Foto eines vollen Regals oder einer
  Auswahl frischer Zutaten.
