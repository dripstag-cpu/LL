/* Homepage-gedrag. (2026-08-17)

   Hier stond 285 regels GSAP: een filmische hero die 2400 pixels lang aan het
   scherm vastgeplakt werd, plus reveal-timelines voor negen secties. Zeven van
   die negen secties bestaan niet meer sinds de omzetting naar doc 49, dus die
   code stuurde niets meer aan. De hero zelf is vervangen door een gewone kop
   met een knop, want drie schermen scrollen voordat de eerste inhoud in beeld
   komt is geen entree maar een drempel.

   Wat overblijft aan beweging doen we met een waarnemer en CSS. Dat scheelt de
   hele bibliotheek, en de twee secties die nog fadeden doen dat nog steeds. */

/* De balk stond op de homepage pas na 600 pixels scrollen. Dat kwam nog uit de
   filmische hero, waar hij het beeld in de weg zat. Die hero is weg, dus staat
   hij nu meteen in beeld, net als op elke andere pagina. Hij blijft wel apart
   gemarkeerd zodra je scrollt, voor de schaduw onder de balk. (2026-08-17) */
(function () {
  var nav = document.getElementById('siteNav');
  if (!nav) return;
  nav.classList.add('visible');
  var bezig = false;
  function bij() { nav.classList.toggle('gescrold', (window.scrollY || 0) > 40); bezig = false; }
  window.addEventListener('scroll', function () {
    if (!bezig) { requestAnimationFrame(bij); bezig = true; }
  }, { passive: true });
  bij();
})();

/* Fade-up bij het in beeld komen. Elementen met [data-op] krijgen de klasse
   is-op, de rest doet CSS. Eén keer, daarna laten staan. */
(function () {
  var els = document.querySelectorAll('[data-op]');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('is-op'); });
    return;
  }
  var w = new IntersectionObserver(function (rijen) {
    rijen.forEach(function (r) {
      if (!r.isIntersecting) return;
      r.target.classList.add('is-op');
      w.unobserve(r.target);
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (e) { w.observe(e); });
})();

(function () {
  var laatsteEl = null;
  var laatsteTijd = 0;

  function meld(el) {
    if (!el) return;
    var nu = Date.now();
    if (el === laatsteEl && nu - laatsteTijd < 1000) return;
    laatsteEl = el;
    laatsteTijd = nu;
    var href = el.getAttribute('href') || '';
    var doel = href.replace(/^\/|\/$/g, '') || 'onbekend';
    if (window.llTrack) window.llTrack('cta_klik', { positie: el.dataset.cta, target: doel });
  }

  function vanEvent(e) {
    var t = e.target;
    return t && t.closest ? t.closest('a[data-cta]') : null;
  }

  document.addEventListener('pointerdown', function (e) { meld(vanEvent(e)); }, true);
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    meld(vanEvent(e));
  }, true);
})();

/* ======================================================================
   DEMO-POPUP bij de vijf onderdeel-blokken.
   Bekijk hoe het werkt haalt de bezoeker niet van de pagina af maar speelt
   de demo af in een venster. Bestaat de video nog niet, dan blijft het
   kader staan met een eerlijke regel erin in plaats van een kapotte speler.
   ====================================================================== */
(function () {
  var overlay = document.getElementById('demoOverlay');
  if (!overlay) return;

  var NAMEN = {
    vindbaarheid: 'Lokale vindbaarheid',
    reviews: 'Het review-systeem',
    terugbelbericht: 'Het terugbelbericht',
    chat: 'De chat op je site',
    website: 'De website',
  };

  var video = document.getElementById('demoVideo');
  var leeg = document.getElementById('demoLeeg');
  var leegTekst = document.getElementById('demoLeegTekst');
  var titel = document.getElementById('demoTitel');
  var laatsteKnop = null;

  function open(slug) {
    var naam = NAMEN[slug] || 'Dit onderdeel';
    titel.textContent = naam;
    leegTekst.textContent = naam + ', de korte uitleg.';

    // Pas tonen als het bestand er echt is, anders blijft de lege staat staan.
    video.hidden = true;
    leeg.hidden = false;
    video.src = '/videos/' + slug + '.mp4';
    video.onloadeddata = function () { video.hidden = false; leeg.hidden = true; };
    video.onerror = function () { video.hidden = true; leeg.hidden = false; };
    video.load();

    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    if (window.llTrack) window.llTrack('demo_open', { bron: slug });
  }

  function sluit() {
    overlay.hidden = true;
    document.body.style.overflow = '';
    try { video.pause(); video.removeAttribute('src'); video.load(); } catch (e) {}
    if (laatsteKnop) laatsteKnop.focus();
  }

  document.addEventListener('click', function (e) {
    var knop = e.target.closest ? e.target.closest('[data-demo]') : null;
    if (knop) { laatsteKnop = knop; open(knop.getAttribute('data-demo')); return; }
    if (e.target === overlay || (e.target.closest && e.target.closest('#demoSluit'))) sluit();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !overlay.hidden) sluit();
  });
})();


/* Schuifbalk met branchekaarten. Twee losse rails (klinieken en beauty,
   lokale dienstverleners), elk met eigen pijlen. Pijlen schuiven op. */
(function () {
  var rails = document.querySelectorAll('.br-rail');
  if (!rails.length) return;
  rails.forEach(function (rail) {
    var stap = function () {
      var k = rail.querySelector('.br-kaart');
      return k ? k.getBoundingClientRect().width + 18 : 250;
    };
    var wrap = rail.parentElement;
    var vorige = wrap.querySelector('.br-vorige');
    var volgende = wrap.querySelector('.br-volgende');
    if (vorige) vorige.addEventListener('click', function () { rail.scrollLeft -= stap() * 2; });
    if (volgende) volgende.addEventListener('click', function () { rail.scrollLeft += stap() * 2; });
  });
})();

/* Beweging in de toestellen van de onderdeel-blokken.

   De schermen bestaan uit scenes die elkaar in een lus afwisselen, precies
   zoals in het voorbeeld dat we hebben ontleed. Binnen een scene bouwt de
   inhoud zich op: berichten komen een voor een binnen, sterren lopen vol,
   tekst typt zichzelf.

   Het meeste zit in CSS. Wat hier gebeurt is de timing van de losse regels
   binnen een gesprek, want die hangt af van hoe lang een bericht is, en het
   starten en stoppen bij het in en uit beeld komen. Een animatie die
   doorloopt terwijl niemand kijkt kost alleen maar accu. */
(function () {
  var toestellen = document.querySelectorAll('.dev');
  if (!toestellen.length || !('IntersectionObserver' in window)) return;

  var CYCLUS = 15000;                 // moet gelijk zijn aan animation-duration van .sc
  var VENSTERS = {                    // begin van elke scene binnen de lus, in ms
    'sc--1': 0, 'sc--2': 0.31 * CYCLUS, 'sc--3': 0.64 * CYCLUS,
    'sc--a': 0, 'sc--b': 0.48 * CYCLUS
  };

  function startVan(el) {
    /* Twee manieren waarop iets pas later in de lus begint: als scene binnen
       één toestel, of als heel toestel in een paar (websiteblok: eerst de
       laptop, daarna de telefoon). */
    var paar = el.closest('[data-start]');
    if (paar) return parseFloat(paar.dataset.start) * CYCLUS;
    var s = el.closest('.sc');
    if (!s) return 0;
    for (var k in VENSTERS) { if (s.classList.contains(k)) return VENSTERS[k]; }
    return 0;
  }

  /* Berichten binnen een gesprek lopen op in tijd, en een lang bericht blijft
     langer staan voordat het volgende komt. Een scene die pas halverwege de
     lus in beeld komt, begint zijn eigen opbouw ook pas dan. */
  function zetVertraging(dev) {
    dev.querySelectorAll('.fs-body, .lg, .ib-body').forEach(function (groep) {
      var basis = startVan(groep) + 300;
      var t = basis;
      groep.querySelectorAll('.bl, .lg-rij, .ib-bl').forEach(function (el) {
        el.style.animationDelay = t + 'ms';
        // Een lijst rolt in een keer binnen, een gesprek gaat op leestempo:
        // je moet een bericht kunnen lezen voordat het antwoord komt.
        t += el.classList.contains('lg-rij')
          ? 150
          : 620 + Math.min(900, (el.textContent || '').length * 11);
      });
    });
    /* De rest heeft een vaste eigen vertraging. Die staat hier en niet in CSS,
       want er moet nog de starttijd van de scene bij op. */
    function stel(kiezer, vertraging) {
      dev.querySelectorAll(kiezer).forEach(function (el, i) {
        el.style.animationDelay = (startVan(el) + vertraging(i)) + 'ms';
      });
    }
    stel('.rvk-sterren span', function (i) { return 900 + i * 150; });
    stel('.typ', function () { return 700; });
    stel('.wb-nav', function () { return 200; });
    stel('.wb-tekst', function () { return 450; });
    stel('.wb-form', function () { return 700; });
    stel('.wb-klaar', function () { return 950; });
    stel('.ob-p', function (i) { return 300 + i * 42; });
  }

  var waarnemer = new IntersectionObserver(function (rijen) {
    rijen.forEach(function (r) {
      if (r.isIntersecting) {
        if (!r.target.dataset.gezet) { zetVertraging(r.target); r.target.dataset.gezet = '1'; }
        r.target.classList.add('speelt');
      } else {
        r.target.classList.remove('speelt');
      }
    });
  }, { threshold: 0.3 });

  toestellen.forEach(function (t) { waarnemer.observe(t); });
})();
