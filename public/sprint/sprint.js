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

  function valideer() {
    var waarden = {
      bedrijfsnaam: (document.getElementById('bedrijfsnaam').value || '').trim(),
      naam: (document.getElementById('naam').value || '').trim(),
      email: (document.getElementById('email').value || '').trim(),
      telefoon: (document.getElementById('telefoon').value || '').trim()
    };
    var fouten = {
      bedrijfsnaam: waarden.bedrijfsnaam.length < 2,
      naam: waarden.naam.length < 2,
      email: !geldigEmail(waarden.email),
      telefoon: !naarE164(waarden.telefoon)
    };
    Object.keys(fouten).forEach(function (k) { markeer(k, fouten[k]); });
    var eersteFout = Object.keys(fouten).filter(function (k) { return fouten[k]; })[0];
    return { ok: !eersteFout, eersteFout: eersteFout, waarden: waarden };
  }

  /* --- 4. Versturen --------------------------------------------------- */
  function verzamel(waarden) {
    var form = document.getElementById('sprintForm');
    var data = {};
    Array.prototype.forEach.call(form.elements, function (el) {
      if (el.name) data[el.name] = el.value;
    });
    data.bedrijfsnaam = waarden.bedrijfsnaam;
    data.naam = waarden.naam;
    data.voornaam = waarden.naam.split(' ')[0];
    data.achternaam = waarden.naam.split(' ').slice(1).join(' ');
    data.email = waarden.email.toLowerCase();
    data.telefoon = waarden.telefoon;
    data.telefoon_e164 = naarE164(waarden.telefoon);
    data.formulier = 'sprint-aanvraag';
    return data;
  }

  function bewaarVoorBedankpagina(data) {
    try { sessionStorage.setItem('ll-sprint-aanvraag', JSON.stringify(data)); } catch (e) {}
  }

  function toonFout(bericht) {
    var status = document.getElementById('formStatus');
    if (!status) return;
    status.textContent = bericht;
    status.className = 'form-status is-error';
  }

  function init() {
    zetKop();
    vulVerborgenVelden();
    window.addEventListener('ll-consent', vulVerborgenVelden);

    var form = document.getElementById('sprintForm');
    if (!form) return;
    var knop = document.getElementById('sprintSubmit');

    ['bedrijfsnaam', 'naam', 'email', 'telefoon'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', function () {
        markeer(id, false);
        // E.164 blijft meelopen, zodat het veld ook zonder submit klopt.
        if (id === 'telefoon') document.getElementById('h_telefoon_e164').value = naarE164(el.value);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var check = valideer();
      if (!check.ok) {
        var el = document.getElementById(check.eersteFout);
        if (el) el.focus();
        return;
      }

      vulVerborgenVelden();
      document.getElementById('h_telefoon_e164').value = naarE164(check.waarden.telefoon);

      var data = verzamel(check.waarden);
      bewaarVoorBedankpagina(data);

      knop.disabled = true;
      knop.textContent = 'Bezig met versturen';

      // Lead vuurt precies één keer, met het event_id dat GHL ook krijgt.
      window.LL.track('Lead', { content_name: 'Online Reputatie Sprint' });

      // Het lead_id gaat mee in de link, zodat de quiz het contact ook
      // terugvindt als de bezoeker daar in een ander venster belandt.
      function door() {
        window.location.href = BEDANKT_URL + '?lid=' + encodeURIComponent(window.LL.leadId());
      }

      if (!GHL_WEBHOOK_URL) {
        // Nog geen webhook gekoppeld: de flow loopt lokaal gewoon door.
        if (window.console) console.warn('[sprint] GHL_WEBHOOK_URL is leeg, aanvraag niet verstuurd.', data);
        door();
        return;
      }

      fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(door).catch(function () {
        // Niet de lead verliezen: doorgaan naar de quiz, daar gaat alles opnieuw mee.
        toonFout('Het versturen duurde langer dan verwacht. We gaan door naar de vragen, je aanvraag staat genoteerd.');
        setTimeout(door, 1200);
      });
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
  var pogingen = 0;
  var timer = setInterval(function () {
    if (spoel() || ++pogingen > 40) clearInterval(timer);
  }, 250);

  function eenmalig(fn) {
    var gedaan = false;
    return function () { if (gedaan) return; gedaan = true; fn.apply(null, arguments); };
  }

  function start() {
    var form = document.getElementById('sprintForm');

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
