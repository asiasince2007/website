/* Asia Markt Thien Phu, Designrichtung A
   Ersetzt die DCLogic-Laufzeit des Design-Entwurfs durch schlichtes JavaScript.
   Ohne JavaScript bleibt die Seite vollstaendig lesbar: Der Status-Text steht
   als sinnvoller Vorgabewert im HTML, die Navigation sind gewoehnliche Links. */
(function () {
  'use strict';

  /* ---------------------------------------------------------- Oeffnungszeiten
     ZENTRALE PFLEGESTELLE: Zeiten als HH:MM, Index 0 = Sonntag.
     Ausnahmen nur mit Bestaetigung des Inhabers eintragen. Schema:
       'JJJJ-MM-TT': { zeiten: [], bestaetigtAm: 'JJJJ-MM-TT' } fuer geschlossen
       oder zeiten: [['10:00', '13:00']] fuer bestaetigte Sonderzeiten.
     Optional: hinweis: 'Betriebsferien'. Keine echten Sonderzeiten bestaetigt.
     Anleitung: 00_Gedaechtnis/oeffnungszeiten-pflegen.md.
     Bei geaenderten Wochenzeiten auch HTML und JSON-LD aktualisieren. */
  var OEFFNUNGSZEITEN = {
    woche: [[], [['09:00', '18:00']], [['09:00', '18:00']],
      [['09:00', '18:00']], [['09:00', '18:00']], [['09:00', '18:00']],
      [['09:00', '14:00']]],
    ausnahmen: {}
  };
  var TAGE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  var berlinFormat;

  function datumSchluessel(datum) { return datum.toISOString().slice(0, 10); }

  function tagVerschieben(datum, anzahl) {
    var d = new Date(datum.getTime());
    d.setUTCDate(d.getUTCDate() + anzahl);
    return d;
  }

  // Gregorianische Osterformel; nur UTC-Kalendertage, keine DST-Millisekunden.
  function ostersonntag(jahr) {
    var a = jahr % 19, b = Math.floor(jahr / 100), c = jahr % 100;
    var d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var n = h + l - 7 * m + 114;
    return new Date(Date.UTC(jahr, Math.floor(n / 31) - 1, n % 31 + 1));
  }

  // Elf Feiertage nach § 2 Feiertagsgesetz NRW. Keine Feiertage anderer Laender.
  function nrwFeiertage(jahr) {
    var tage = {};
    var fest = { '01-01': 'Neujahr', '05-01': 'Tag der Arbeit',
      '10-03': 'Tag der Deutschen Einheit', '11-01': 'Allerheiligen',
      '12-25': '1. Weihnachtstag', '12-26': '2. Weihnachtstag' };
    Object.keys(fest).forEach(function (tag) { tage[jahr + '-' + tag] = fest[tag]; });
    var ostern = ostersonntag(jahr);
    [[-2, 'Karfreitag'], [1, 'Ostermontag'], [39, 'Christi Himmelfahrt'],
      [50, 'Pfingstmontag'], [60, 'Fronleichnam']].forEach(function (eintrag) {
      tage[datumSchluessel(tagVerschieben(ostern, eintrag[0]))] = eintrag[1];
    });
    return tage;
  }

  function berlinUhr(jetzt) {
    if (!berlinFormat) berlinFormat = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    });
    var teile = {};
    berlinFormat.formatToParts(jetzt).forEach(function (teil) { teile[teil.type] = teil.value; });
    return { datum: new Date(Date.UTC(+teile.year, +teile.month - 1, +teile.day)),
      minuten: +teile.hour * 60 + +teile.minute };
  }

  function minuten(zeit) {
    if (typeof zeit !== 'string' || !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(zeit)) return NaN;
    return +zeit.slice(0, 2) * 60 + +zeit.slice(3);
  }

  function intervalle(zeiten) {
    if (!Array.isArray(zeiten)) return null;
    var ende = -1, result = [];
    for (var i = 0; i < zeiten.length; i++) {
      if (!Array.isArray(zeiten[i]) || zeiten[i].length !== 2) return null;
      var von = minuten(zeiten[i][0]), bis = minuten(zeiten[i][1]);
      if (!Number.isFinite(von) || !Number.isFinite(bis) || von >= bis || von < ende) return null;
      result.push([von, bis]); ende = bis;
    }
    return result;
  }

  function tagesplan(datum, config) {
    var key = datumSchluessel(datum), ausnahmen = config.ausnahmen || {};
    // Inhaberbestaetigung 24.09.2026: An gesetzlichen NRW-Feiertagen immer zu.
    // Die feste Feiertagsregel hat Vorrang vor versehentlich gepflegten Zeiten.
    var feiertag = nrwFeiertage(datum.getUTCFullYear())[key];
    if (feiertag) return { zeiten: [], anlass: feiertag };
    if (Object.prototype.hasOwnProperty.call(ausnahmen, key)) {
      var ausnahme = ausnahmen[key];
      var bestaetigt = ausnahme && /^\d{4}-\d{2}-\d{2}$/.test(ausnahme.bestaetigtAm || '');
      return { zeiten: bestaetigt ? intervalle(ausnahme.zeiten) : null,
        anlass: ausnahme && ausnahme.hinweis || 'Sonderzeiten' };
    }
    // Heiligabend und Silvester sind keine gesetzlichen Feiertage. Ohne
    // bestaetigte Zeiten trotzdem keine gewoehnliche Ganztagesoeffnung zusagen.
    var besonders = { '12-24': 'Heiligabend', '12-31': 'Silvester' }[key.slice(5)];
    if (besonders) return { zeiten: null, anlass: besonders };
    return { zeiten: intervalle(config.woche[datum.getUTCDay()]), anlass: '' };
  }

  function uhrzeit(min) {
    var rest = min % 60;
    return Math.floor(min / 60) + (rest ? ':' + String(rest).padStart(2, '0') : '') + ' Uhr';
  }

  function status(jetzt, config) {
    config = config || OEFFNUNGSZEITEN;
    var uhr;
    try { uhr = berlinUhr(jetzt); }
    catch (_) { return { offen: false, unklar: true, text: 'Öffnungszeiten bitte telefonisch prüfen' }; }
    var heute = tagesplan(uhr.datum, config);
    if (heute.zeiten === null) return { offen: false, unklar: true,
      text: 'Heute ' + (heute.anlass || 'Sonderzeiten') + ': Öffnungszeiten bitte telefonisch prüfen' };
    for (var n = 0; n < heute.zeiten.length; n++) {
      var zeit = heute.zeiten[n];
      if (uhr.minuten >= zeit[0] && uhr.minuten < zeit[1]) {
        return { offen: true, text: 'Jetzt geöffnet, heute bis ' + uhrzeit(zeit[1]) };
      }
      if (uhr.minuten < zeit[0]) return { offen: false,
        text: 'Gerade geschlossen, öffnet heute um ' + uhrzeit(zeit[0]) };
    }
    var unbekannt = false;
    var geschlossen = heute.anlass ? 'Heute geschlossen (' + heute.anlass + '), ' : 'Gerade geschlossen, ';
    for (var i = 1; i <= 366; i++) {
      var datum = tagVerschieben(uhr.datum, i), plan = tagesplan(datum, config);
      if (plan.zeiten === null) { unbekannt = true; continue; }
      if (!plan.zeiten.length) continue;
      var wann = i === 1 ? 'morgen' : TAGE[datum.getUTCDay()];
      if (i >= 7) wann += ', ' + datum.getUTCDate() + '.' + (datum.getUTCMonth() + 1) + '.';
      return { offen: false, text: geschlossen +
        (unbekannt ? 'nächste reguläre Öffnung ' : 'öffnet ') + wann + ' um ' + uhrzeit(plan.zeiten[0][0]) +
        (unbekannt ? '. Sonderzeiten bitte prüfen.' : '') };
    }
    return { offen: false, text: 'Geschlossen. Nächste Öffnung bitte telefonisch erfragen.' };
  }

  function statusAnzeigen() {
    var s = status(new Date());
    var texte = document.querySelectorAll('[data-status-text]');
    var punkte = document.querySelectorAll('[data-status-punkt]');
    for (var i = 0; i < texte.length; i++) texte[i].textContent = s.text;
    for (var j = 0; j < punkte.length; j++) {
      punkte[j].classList.toggle('offen', s.offen);
      punkte[j].classList.toggle('unklar', !!s.unklar);
    }
  }

  /* ------------------------------------------------------------- Navigation */
  function navigation() {
    var schalter = document.getElementById('menue-schalter');
    var nav = document.getElementById('hauptnavigation');
    if (!schalter || !nav) return;

    function zu() {
      nav.classList.remove('offen');
      schalter.setAttribute('aria-expanded', 'false');
      schalter.setAttribute('aria-label', 'Menü öffnen');
    }
    schalter.addEventListener('click', function () {
      var offen = nav.classList.toggle('offen');
      schalter.setAttribute('aria-expanded', offen ? 'true' : 'false');
      schalter.setAttribute('aria-label', offen ? 'Menü schließen' : 'Menü öffnen');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('offen')) { zu(); schalter.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !schalter.contains(e.target)) zu();
    });
    // Schalter erst nach Anmeldung aktivieren. Ohne JS zeigt der noscript-
    // Block im HTML die Links im normalen Dokumentfluss, ohne toten Schalter.
    nav.closest('header').classList.add('menue-bereit');
    // Beim Wechsel auf Desktopbreite den mobilen Zustand zuruecksetzen
    if (window.matchMedia) {
      var mq = window.matchMedia('(min-width: 901px)');
      var reagieren = function (e) { if (e.matches) zu(); };
      if (mq.addEventListener) mq.addEventListener('change', reagieren);
      else if (mq.addListener) mq.addListener(reagieren);
    }
  }

  /* -------------------------------------------------- Einblenden beim Scrollen */
  function einblenden() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    function alleZeigen() {
      document.documentElement.classList.remove('js-reveal');
      for (var i = 0; i < els.length; i++) els[i].classList.add('sichtbar');
    }

    var reduziert = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduziert || !('IntersectionObserver' in window)) { alleZeigen(); return; }

    // Was beim Laden schon im Blickfeld liegt, wird NICHT animiert: sofort
    // sichtbar setzen, bevor `js-reveal` greift. Das spart dem groessten
    // Element im ersten Bildausschnitt (Hero-Bild) das Einblenden und damit
    // Zeit beim Largest Contentful Paint.
    var drunter = [];
    for (var k = 0; k < els.length; k++) {
      var box = els[k].getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) els[k].classList.add('sichtbar');
      else drunter.push(els[k]);
    }
    if (!drunter.length) return;

    document.documentElement.classList.add('js-reveal');

    // Sicherheitsnetz: Der Effekt darf Inhalte niemals dauerhaft verstecken.
    // Ein funktionierender IntersectionObserver meldet sich unmittelbar nach
    // observe() fuer jedes Ziel, auch fuer nicht sichtbare. Bleibt diese erste
    // Meldung aus, ist er in dieser Umgebung wirkungslos: dann alles zeigen.
    var hatGemeldet = false;
    var beobachter = new IntersectionObserver(function (eintraege) {
      hatGemeldet = true;
      eintraege.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('sichtbar'); beobachter.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.02 });

    for (var j = 0; j < drunter.length; j++) beobachter.observe(drunter[j]);

    setTimeout(function () {
      if (!hatGemeldet) { beobachter.disconnect(); alleZeigen(); }
    }, 1500);
  }

  /* ------------------------------------------------ Google Maps: zwei Klicks
     Die Karte laedt erst auf ausdruecklichen Klick. Vorher gehen keinerlei
     Daten an Google. So beschrieben in datenschutz.html. */
  function karte() {
    var rahmen = document.getElementById('karte-rahmen');
    if (!rahmen) return;
    var spalte = (rahmen.closest && rahmen.closest('.maps-spalte')) || rahmen.parentNode;
    if (!spalte) return;

    var fassade = rahmen.innerHTML;   // fuer den Widerruf aufheben
    var widerruf = null;

    /* Die Startansicht der Karte steckt im pb-Parameter. Die drei Werte, auf
       die es ankommt:
         !1d  Hoehe des Sichtfelds in Metern. Kleiner = naeher dran.
              Umrechnung: 1d = 768 * 156543,03 * cos(Breitengrad) / 2^Zoom
              Zoom 15 -> 2304   Zoom 16 -> 1152   Zoom 17 -> 576   Zoom 18 -> 288
         !2d  Laenge des Mittelpunkts
         !3d  Breite des Mittelpunkts
         !5e  Kartentyp, 0 = Karte, 1 = Satellit

       Die urspruenglich von Google erzeugte URL stand auf 1d17135 (Zoom 12,1)
       und war auf 51.10096 / 6.94228 zentriert, 612 m neben dem Laden. Bei
       Zoom 12 faellt das nicht auf, ab Zoom 16 waere der Laden aus dem Bild
       gelaufen. Mittelpunkt deshalb auf die Koordinaten aus dem JSON-LD
       gesetzt und erst dann herangezoomt. */
    function laden() {
      var iframe = document.createElement('iframe');
      iframe.title = 'Standort Asia Markt Thien Phu auf Google Maps';
      iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d576!2d6.9479852!3d51.1051371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x417196e0d88ec68b%3A0xa4c0b0becc873172!2sAsia%20Markt%20Thien%20Phu!5e1!3m2!1sde!2sde!4v1776007432899!5m2!1sde!2sde';
      iframe.loading = 'lazy';
      iframe.allowFullscreen = true;
      // Google bekommt nur die Herkunft, nicht die vollstaendige Adresse der
      // Seite. Dieselbe Regel wie im Referrer-Meta-Tag.
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      rahmen.innerHTML = '';
      rahmen.appendChild(iframe);
      widerrufZeigen();
    }

    /* Widerruf der Einwilligung nach Art. 7 Abs. 3 DSGVO: Er muss so einfach
       sein wie das Erteilen. Ein Klick nimmt die Karte wieder aus der Seite,
       danach steht wieder die Fassade da. So beschrieben in datenschutz.html. */
    function widerrufZeigen() {
      if (widerruf) return;
      widerruf = document.createElement('p');
      widerruf.className = 'maps-widerruf';
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn';
      b.textContent = 'Karte ausblenden';
      b.addEventListener('click', ausblenden);
      widerruf.appendChild(b);
      spalte.appendChild(widerruf);
    }

    function ausblenden() {
      rahmen.innerHTML = fassade;
      if (widerruf && widerruf.parentNode) widerruf.parentNode.removeChild(widerruf);
      widerruf = null;
      anmelden();
      var neu = document.getElementById('karte-laden');
      if (neu) neu.focus();
    }

    // Der Ladeknopf steckt in der Fassade und wird beim Ausblenden neu
    // erzeugt. Die Anmeldung des Zuhoerers muss deshalb wiederholbar sein.
    function anmelden() {
      var knopf = document.getElementById('karte-laden');
      if (knopf) { knopf.addEventListener('click', laden); knopf.hidden = false; }
    }

    anmelden();
  }

  /* E-Mail: Im Quell-HTML vorhanden; Cloudflare verschleiert sie bei der
     Live-Auslieferung. Auf ausdruecklichen Inhaberwunsch (24.09.2026) bleibt
     dieser Schutz aktiv. Keine email_off-Ausnahme und keine lokale zweite
     Verschleierung. Live-Funktion einschliesslich CSP separat pruefen. */

  function start() {
    navigation();
    statusAnzeigen();
    einblenden();
    karte();
    // Der Status haengt an der Uhrzeit und wird minuetlich nachgezogen.
    setInterval(statusAnzeigen, 60000);
  }

  // Dieselbe Logik wird in Node getestet, die Website bleibt ein normales Script.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { status: status, nrwFeiertage: nrwFeiertage, config: OEFFNUNGSZEITEN };
  }
  if (typeof document === 'undefined') return;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
