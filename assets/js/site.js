/* Asia Markt Thien Phu — Designrichtung A
   Ersetzt die DCLogic-Laufzeit des Design-Entwurfs durch schlichtes JavaScript.
   Ohne JavaScript bleibt die Seite vollstaendig lesbar: Der Status-Text steht
   als sinnvoller Vorgabewert im HTML, die Navigation sind gewoehnliche Links. */
(function () {
  'use strict';

  /* ---------------------------------------------------------- Oeffnungszeiten
     Index = Wochentag nach Date#getDay (0 = Sonntag). Werte in Minuten. */
  var ZEITEN = [
    null,          // Sonntag
    [540, 1080],   // Montag    9:00 - 18:00
    [540, 1080],   // Dienstag
    [540, 1080],   // Mittwoch
    [540, 1080],   // Donnerstag
    [540, 1080],   // Freitag
    [540, 840]     // Samstag   9:00 - 14:00
  ];
  var TAGE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

  function status(jetzt) {
    var tag = jetzt.getDay();
    var min = jetzt.getHours() * 60 + jetzt.getMinutes();
    var heute = ZEITEN[tag];

    if (heute && min >= heute[0] && min < heute[1]) {
      return { offen: true, text: 'Jetzt geöffnet, heute bis ' + Math.floor(heute[1] / 60) + ' Uhr' };
    }
    // Vor der Oeffnung am selben Tag
    if (heute && min < heute[0]) {
      return { offen: false, text: 'Gerade geschlossen, öffnet heute um 9 Uhr' };
    }
    // Sonst: naechsten Tag mit Oeffnungszeiten suchen
    for (var i = 1; i <= 7; i++) {
      var t = (tag + i) % 7;
      if (!ZEITEN[t]) continue;
      var wann = i === 1 ? 'morgen' : TAGE[t];
      return { offen: false, text: 'Gerade geschlossen, öffnet ' + wann + ' um 9 Uhr' };
    }
    return { offen: false, text: 'Gerade geschlossen' };
  }

  function statusAnzeigen() {
    var s = status(new Date());
    var texte = document.querySelectorAll('[data-status-text]');
    var punkte = document.querySelectorAll('[data-status-punkt]');
    for (var i = 0; i < texte.length; i++) texte[i].textContent = s.text;
    for (var j = 0; j < punkte.length; j++) punkte[j].classList.toggle('offen', s.offen);
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
    // observe() fuer jedes Ziel — auch fuer nicht sichtbare. Bleibt diese erste
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
       und war auf 51.10096 / 6.94228 zentriert — 612 m neben dem Laden. Bei
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
      // Seite — dieselbe Regel wie im Referrer-Meta-Tag der Seite.
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
    // erzeugt — die Anmeldung des Zuhoerers muss deshalb wiederholbar sein.
    function anmelden() {
      var knopf = document.getElementById('karte-laden');
      if (knopf) knopf.addEventListener('click', laden);
    }

    anmelden();
  }

  /* ------------------------------------------------- E-Mail-Adresse ------
     Frueher wurde die Adresse hier per JavaScript zusammengesetzt, um
     Adresssammlern das Auslesen zu erschweren. Das ist entfallen: § 5 Abs. 1
     Nr. 2 DDG verlangt die E-Mail-Adresse „leicht erkennbar, unmittelbar
     erreichbar und staendig verfuegbar" — ohne JavaScript stand im Impressum
     gar keine Adresse. Sie steht jetzt im Klartext in impressum.html und
     datenschutz.html. */

  function start() {
    statusAnzeigen();
    navigation();
    einblenden();
    karte();
    // Der Status haengt an der Uhrzeit — minuetlich nachziehen.
    setInterval(statusAnzeigen, 60000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
