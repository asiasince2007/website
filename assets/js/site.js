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
    var knopf = document.getElementById('karte-laden');
    var rahmen = document.getElementById('karte-rahmen');
    if (!knopf || !rahmen) return;

    knopf.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.title = 'Standort Asia Markt Thien Phu auf Google Maps';
      iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17135.738250219!2d6.942283857049664!3d51.10095676347082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x417196e0d88ec68b%3A0xa4c0b0becc873172!2sAsia%20Markt%20Thien%20Phu!5e1!3m2!1sde!2sde!4v1776007432899!5m2!1sde!2sde';
      iframe.loading = 'lazy';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      rahmen.innerHTML = '';
      rahmen.appendChild(iframe);
    });
  }

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
