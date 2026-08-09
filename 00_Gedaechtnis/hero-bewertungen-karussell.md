# Hero-Bewertungen-Marquee — Konzept & Referenz-Implementierung

> **Ziel:** Im/unter dem Hero der Startseite laufen mehrere echte Google-Bewertungen als
> Endlosband **kontinuierlich von rechts nach links** („Marquee"), flüssig und harmonisch.
> Datenquelle: `docs/bewertungen-kuratiert.json` (Feld `marquee_auswahl`, 13 kuratierte
> 5-Sterne-Bewertungen; weitere im Feld `alle_5_sterne_mit_text`).

## 1. UX-/Design-Anforderungen

- **Laufrichtung:** rechts → links, gleichmäßige Geschwindigkeit, **nahtlose Endlosschleife**
  (kein Sprung). Technik: Karten-Set zweimal hintereinander rendern und um genau -50 %
  translatieren (`@keyframes` von `0` bis `-50%`).
- **Tempo:** ruhig, lesbar. Richtwert ~40–60 s pro Durchlauf bei 13×2 Karten; über
  `--marquee-duration` steuerbar. Lieber etwas langsamer = hochwertiger Eindruck.
- **Karten:** feste Breite (z. B. `w-80` / 320 px), gleiche Höhe, Markenlook (cremefarbener
  Grund `brand-cream`, weicher Rand/Schatten, abgerundet). Inhalt: 5 goldene Sterne
  (`brand-gold`), Zitat (2–4 Zeilen, bei Bedarf `line-clamp`), Autorname + dezent „Google".
- **Pause beim Hover/Fokus:** `:hover`/`:focus-within` → `animation-play-state: paused`,
  damit Lesende eine Bewertung anhalten können.
- **Barrierefreiheit:** `@media (prefers-reduced-motion: reduce)` → Animation aus, stattdessen
  horizontal scrollbares Band (`overflow-x:auto`). Region mit `aria-label="Kundenbewertungen"`.
  Bei Endlos-Duplikaten die Klone mit `aria-hidden="true"` markieren (kein doppeltes Vorlesen).
- **Ränder:** links/rechts weiche Verlaufs-Maske (fade), damit Karten nicht hart abgeschnitten
  wirken (`mask-image: linear-gradient(...)`).
- **Performance:** nur `transform` animieren (GPU), kein `left`/`margin`. `will-change: transform`.
- **Platzierung:** Vorschlag — als eigenes Band **direkt unter dem Hero** über voller Breite,
  oder die bestehende statische „Google Bewertungen"-Sektion durch dieses Laufband ersetzen
  (die ausführliche Bewertungs-Sektion kann darunter erhalten bleiben).

## 2. Datenanbindung

Karten aus `docs/bewertungen-kuratiert.json` → `marquee_auswahl` generieren (Build-Schritt
oder zur Laufzeit per `fetch`). Jede Bewertung: `{ author, date, rating, text }`.
NAP/Markennamen-Konsistenz beachten. **Keine Texte erfinden** — nur Einträge aus der Datei.

> SEO-Bonus: Diese realen Bewertungen zusätzlich als `Review`/`aggregateRating` im
> `GroceryStore`-JSON-LD spiegeln (siehe `PLAN.md` P2.4) — `aggregateRating` mit den realen
> Werten **Ø 4,39 / 100 Bewertungen** (Quelle: Export).

## 3. Referenz-Implementierung (Tailwind + Vanilla, GitHub-Pages-tauglich)

```html
<!-- Bewertungs-Marquee -->
<section aria-label="Kundenbewertungen" class="reviews-marquee py-10 bg-brand-beige/40">
  <div class="marquee group relative overflow-hidden">
    <ul class="marquee__track flex gap-6 w-max">
      <!-- JS füllt hier 2x dieselben Karten ein (Original + aria-hidden-Klon) -->
    </ul>
  </div>
</section>

<style>
  .marquee { -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
             mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
  .marquee__track { animation: marquee var(--marquee-duration, 50s) linear infinite;
                    will-change: transform; }
  .marquee:hover .marquee__track,
  .marquee:focus-within .marquee__track { animation-play-state: paused; }
  @keyframes marquee { from { transform: translateX(0); }
                       to   { transform: translateX(-50%); } }
  @media (prefers-reduced-motion: reduce) {
    .marquee__track { animation: none; }
    .marquee { overflow-x: auto; }
  }
</style>

<script>
  // Daten kommen aus docs/bewertungen-kuratiert.json -> marquee_auswahl
  fetch('assets/data/bewertungen-kuratiert.json')
    .then(r => r.json())
    .then(({ marquee_auswahl: reviews }) => {
      const track = document.querySelector('.marquee__track');
      const card = (r, clone=false) => `
        <li class="w-80 shrink-0 ${clone ? '' : ''}" ${clone ? 'aria-hidden="true"' : ''}>
          <figure class="h-full bg-brand-cream soft-border rounded-2xl p-6 shadow-sm flex flex-col">
            <div class="text-brand-gold mb-3" aria-label="5 von 5 Sternen">★★★★★</div>
            <blockquote class="text-gray-700 leading-relaxed flex-1">„${r.text}"</blockquote>
            <figcaption class="mt-4 text-sm font-semibold text-brand-darkGreen">
              ${r.author} <span class="font-normal text-gray-400">· Google</span>
            </figcaption>
          </figure>
        </li>`;
      // Original-Set + Klon-Set (für nahtlose Schleife)
      track.innerHTML = reviews.map(r => card(r)).join('')
                      + reviews.map(r => card(r, true)).join('');
    });
</script>
```

**Hinweise zur Umsetzung:**

- Die JSON-Datei nach `assets/data/bewertungen-kuratiert.json` ins ausgelieferte Verzeichnis
  legen (oder Inhalt beim Build inlinen, um den `fetch` zu sparen).
- Beim Tailwind-Build sicherstellen, dass die genutzten Klassen (`w-80`, `line-clamp-4` etc.)
  im `content`-Glob erfasst sind. `line-clamp` ist in Tailwind 3 enthalten.
- Anzahl Karten: 13 wirken gut. Für noch mehr Fülle aus `alle_5_sterne_mit_text` ergänzen,
  aber Lesbarkeit > Masse. Bei Änderung von Anzahl/Tempo `--marquee-duration` anpassen,
  damit der Lauf gleichmäßig bleibt.
- Optional zweite Reihe in Gegenrichtung (links → rechts) für „lebendigeres" Band — sparsam
  einsetzen, kann unruhig wirken.

## 4. Akzeptanzkriterien

- [ ] Band läuft endlos & nahtlos (kein sichtbarer Sprung beim Schleifenpunkt).
- [ ] Pause bei Hover/Fokus funktioniert; Karten sind anklick-/lesbar.
- [ ] `prefers-reduced-motion` deaktiviert die Animation, Band bleibt scrollbar.
- [ ] Nur reale Bewertungen aus der JSON; Autornamen korrekt; keine erfundenen Texte.
- [ ] Mobil sauber (eine Kartenhöhe, kein Layout-Shift, gute Lesegröße).
- [ ] Optional: `aggregateRating` (4,39 / 100) im JSON-LD ergänzt.
