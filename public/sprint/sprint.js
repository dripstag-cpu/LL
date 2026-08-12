/* ======================================================================
   Local Levers - /sprint/ landingspagina
   1. belofte-echo: de hero-kop wisselt mee met utm_content (ad-1 t/m ad-5)
   2. verborgen velden vullen met attributie- en fb-waarden
   3. formulier 1 valideren (vier velden, NL-telefoon)
   4. versturen naar GHL, Lead-event vuren, door naar de bedankpagina
   ====================================================================== */
(function () {
  'use strict';

  /* ====== CONFIGURATIE, hier vult Bryan in ==========================
     De inbound-webhook-URL van de GHL-workflow "Sprint aanvraag".
     Leeg laten betekent: niet versturen, wel doorsturen naar de
     bedankpagina. Zo is de hele flow lokaal te doorlopen.            */
  var GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/agbm4h41aVGOzDyuSc16/webhook-trigger/9a6bdc8d-fadc-48d9-94ca-7f8ebf9053b4';
  var BEDANKT_URL = '/sprint/bedankt/';
  /* ================================================================== */

  /* --- 1. Belofte-echo ---------------------------------------------- */
  var KOPPEN = {
    'ad-1': 'Zij ziet je score, je aantal en hoe oud je laatste review is. Meer niet.',
    'ad-2': 'Tevreden klanten zijn geen reviews. Zeven dagen lang vragen wij het wel.',
    'ad-3': 'Dit regelen wij. Zeven dagen gratis, jij staat gewoon bij je klanten.',
    'ad-4': 'Zie zwart op wit waar jij staat als iemand in jouw stad zoekt.',
    'ad-5': 'Eerst zien wat het oplevert. Daarna beslis jij.',
    'ad-7': 'Je agenda zit vol. Alleen niet met de behandeling waar je het meeste aan verdient.',
    'ad-8': 'Je losse behandelingen lopen. Je trajecten niet.'
  };
  /* De standaardkop is bewust niet gelijk aan een van de ad-varianten: hij moet ook
     werken voor wie zonder utm binnenkomt. Niet meer "je eerste 5 tot 10 reviews",
     want doc 48 verbiedt een aantal beloven en die zin spreekt bovendien een beginner
     aan terwijl de startpoort 140 klantcontacten eist. */
  var STANDAARD_KOP = 'Iemand zoekt nu jouw beste behandeling in jouw stad. Sta jij in de top drie?';

  function zetKop() {
    var el = document.getElementById('heroKop');
    if (!el) return;
    // De kop echoot de advertentie van dit bezoek, dus de URL wint.
    // Staat er geen utm_content in de URL, dan valt hij terug op de
    // bewaarde attributie en anders op de standaardkop.
    var uitUrl = '';
    try { uitUrl = new URLSearchParams(window.location.search).get('utm_content') || ''; } catch (e) {}
    var variant = (uitUrl || window.LL.attributie().utm_content || '').trim().toLowerCase();
    el.textContent = KOPPEN[variant] || STANDAARD_KOP;
    el.setAttribute('data-variant', KOPPEN[variant] ? variant : 'standaard');
  }

  /* --- 2. Verborgen velden ------------------------------------------ */
  function vulVerborgenVelden() {
    var a = window.LL.attributie();
    var map = {
      h_lead_id: window.LL.leadId(),
      h_utm_source: a.utm_source,
      h_utm_medium: a.utm_medium,
      h_utm_campaign: a.utm_campaign,
      h_utm_content: a.utm_content,
      h_utm_term: a.utm_term,
      h_fbclid: a.fbclid,
      h_fbp: a.fbp,
      h_fbc: a.fbc,
      h_landingspagina: a.landingspagina,
      h_event_source_url: window.location.href,
      h_tijdstip: new Date().toISOString(),
      h_user_agent: navigator.userAgent
    };
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.value = map[id] || '';
    });
  }

  /* --- 3. Validatie -------------------------------------------------- */
  function schoonNummer(waarde) {
    return (waarde || '').replace(/[\s().-]/g, '');
  }

  /* Accepteert 06..., 010..., +316..., 00316... en geeft E.164 terug.
     Nederlandse nummers zijn 9 cijfers na de landcode.               */
  function naarE164(waarde) {
    var v = schoonNummer(waarde);
    if (!v) return '';
    if (/^00/.test(v)) v = '+' + v.slice(2);
    if (/^\+31[1-9][0-9]{8}$/.test(v)) return v;
    if (/^31[1-9][0-9]{8}$/.test(v)) return '+' + v;
    if (/^0[1-9][0-9]{8}$/.test(v)) return '+31' + v.slice(1);
    return '';
  }

  function geldigEmail(waarde) {
    return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test((waarde || '').trim());
  }

  function markeer(veldId, fout) {
    var wrap = document.getElementById('field-' + veldId);
    var input = document.getElementById(veldId);
    if (!wrap || !input) return;
    wrap.classList.toggle('has-error', !!fout);
    if (fout) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  }


  /* --- 4. Versturen --------------------------------------------------- */

  function bewaarVoorBedankpagina(data) {
    try { sessionStorage.setItem('ll-sprint-aanvraag', JSON.stringify(data)); } catch (e) {}
  }


  function init() {
    zetKop();
    vulVerborgenVelden();
    window.addEventListener('ll-consent', vulVerborgenVelden);

    var form = document.getElementById('startForm');
    if (!form) return;
    var knop = document.getElementById('startSubmit');

    ['winstdienst', 'stad'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', function () { markeer(id, false); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var winstdienst = (document.getElementById('winstdienst').value || '').trim();
      var stad = (document.getElementById('stad').value || '').trim();
      var fout = { winstdienst: winstdienst.length < 2, stad: stad.length < 2 };
      Object.keys(fout).forEach(function (k) { markeer(k, fout[k]); });
      var eerste = Object.keys(fout).filter(function (k) { return fout[k]; })[0];
      if (eerste) { var el = document.getElementById(eerste); if (el) el.focus(); return; }

      /* Alles wat de quizpagina nodig heeft, plus de attributie die we hier
         al hebben. De quiz stuurt het straks in één keer door naar GHL. */
      var data = { winstdienst: winstdienst, stad: stad };
      var form2 = document.getElementById('startForm');
      Array.prototype.forEach.call(form2.elements, function (el2) {
        if (el2.name && el2.type === 'hidden') data[el2.name] = el2.value;
      });
      var a = window.LL.attributie();
      ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid','fbp','fbc'].forEach(function (k) {
        if (!data[k]) data[k] = a[k] || '';
      });
      data.lead_id = window.LL.leadId();
      data.landingspagina = window.location.pathname;
      data.event_source_url = window.location.href;
      data.tijdstip = new Date().toISOString();
      data.user_agent = navigator.userAgent;

      bewaarVoorBedankpagina(data);

      knop.disabled = true;
      knop.textContent = 'Een moment';

      /* QuizStart is het optimalisatie-event. Hier begint de kwalificatie,
         en dit gebeurt veel vaker dan een volledige aanmelding. Lead vuurt
         pas op het slotscherm, waar naam, e-mail en telefoon binnenkomen. */
      window.LL.track('QuizStart', { content_name: 'Online Reputatie Sprint' });
      if (window.llTrack) window.llTrack('sprint-stap1');

      /* Even wachten voor we doorsturen. Gemeten 2026-08-11 op de live pagina:
         zonder deze pauze breekt Safari/WebKit het QuizStart-verzoek af bij de
         navigatie, 4 van 4 keer. Chromium voltooit het wel, 5 van 5. Het meeste
         advertentieverkeer komt uit de in-app browser op iPhone, dus dat is de
         maat. Met 250 ms voltooide WebKit 4 van 4. */
      setTimeout(function () {
        window.location.href = BEDANKT_URL + '?lid=' + encodeURIComponent(window.LL.leadId());
      }, 250);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ======================================================================
   Trechter-events naar Umami (toegevoegd 2026-08-11)
   ----------------------------------------------------------------------
   Waarom: Umami berekent tijd-op-pagina en bounce uitsluitend uit het
   verschil tussen twee pageviews. Deze pagina heeft er maar een, dus elke
   niet-converterende bezoeker leest als nul seconden en als bounce. Dat
   zegt niets over of iemand de pagina las of het formulier aanraakte.
   Custom events tellen niet mee in die twee getallen, maar ze verschijnen
   wel in het events-rapport, en dat is precies de trechter die we missen:
   bezoek -> gescrold -> formulier aangeraakt -> fout -> verstuurd.

   Cookieloos en zonder toestemming, net als de rest van Umami. Er gaat
   geen enkel persoonsgegeven mee, alleen de naam van de stap.
   ====================================================================== */
(function () {
  'use strict';

  // Umami laadt met defer. Bufferen tot het er is, daarna alsnog versturen.
  var wachtrij = [];
  var klaar = false;
  function spoel() {
    if (!window.umami || typeof window.umami.track !== 'function') return false;
    klaar = true;
    while (wachtrij.length) {
      var ev = wachtrij.shift();
      try { window.umami.track(ev[0], ev[1]); } catch (e) {}
    }
    return true;
  }
  function tel(naam, data) {
    if (klaar || spoel()) {
      try { window.umami.track(naam, data); } catch (e) {}
    } else {
      wachtrij.push([naam, data]);
    }
  }
  window.llTrack = tel;

  var pogingen = 0;
  var timer = setInterval(function () {
    if (spoel() || ++pogingen > 40) clearInterval(timer);
  }, 250);

  function eenmalig(fn) {
    var gedaan = false;
    return function () { if (gedaan) return; gedaan = true; fn.apply(null, arguments); };
  }

  function start() {
    var form = document.getElementById('startForm');

    /* 1. Scroll-diepte. Zegt of mensen voorbij de kop komen. */
    var vlaggen = { 50: eenmalig(function () { tel('sprint-scroll-50'); }),
                    90: eenmalig(function () { tel('sprint-scroll-90'); }) };
    function kijkScroll() {
      var h = document.documentElement;
      var totaal = (h.scrollHeight - h.clientHeight);
      if (totaal <= 0) return;
      var pct = (h.scrollTop || document.body.scrollTop) / totaal * 100;
      if (pct >= 50) vlaggen[50]();
      if (pct >= 90) vlaggen[90]();
    }
    window.addEventListener('scroll', kijkScroll, { passive: true });
    kijkScroll();

    if (!form) return;

    /* 2. Formulier aangeraakt. Het getal dat we nu het hardst missen:
          hoeveel bezoekers beginnen uberhaupt met invullen. */
    var raakteAan = eenmalig(function () { tel('sprint-form-start'); });
    form.addEventListener('focusin', raakteAan);

    /* 3. Validatiefout. Vertelt op welk veld mensen stranden. */
    var foutGemeld = false;
    form.addEventListener('submit', function () {
      setTimeout(function () {
        var eerste = form.querySelector('.has-error');
        if (!eerste) return;
        var veld = eerste.querySelector('input, select, textarea');
        var naam = (veld && (veld.id || veld.name)) || 'onbekend';
        if (!foutGemeld) { tel('sprint-form-fout', { veld: naam }); foutGemeld = true; }
      }, 60);
    });

    /* 4. Verstuurd. Dubbelt met het Lead-event naar Meta, maar dan in
          dezelfde bak als de rest van de trechter, dus vergelijkbaar. */
    var origineel = window.LL && window.LL.track;
    if (origineel) {
      window.LL.track = function (naam, params) {
        if (naam === 'QuizStart') tel('sprint-stap1');
        if (naam === 'Lead') tel('sprint-lead');
        return origineel.apply(window.LL, arguments);
      };
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();

/* Vangnet voor browsers zonder :has(): klasse op de body zetten zolang er een
   invoerveld focus heeft. De korte vertraging voorkomt geflikker bij het springen
   van veld naar veld. Toelichting staat in sprint.css. */
(function () {
  var t, velden = 'input, textarea, select';
  function isVeld(el) { return el && el.matches && el.matches(velden); }
  document.addEventListener('focusin', function (e) {
    if (!isVeld(e.target)) return;
    clearTimeout(t);
    document.body.classList.add('ll-typt');
  });
  document.addEventListener('focusout', function (e) {
    if (!isVeld(e.target)) return;
    clearTimeout(t);
    t = setTimeout(function () {
      if (!isVeld(document.activeElement)) document.body.classList.remove('ll-typt');
    }, 80);
  });
})();
