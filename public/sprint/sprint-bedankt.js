/* ======================================================================
   Local Levers - /sprint/bedankt/ kwalificatie-quiz
   Negen vragen, scoring en routing conform BRIEFING-SPRINT-PAGINA.md
   sectie 5. De routing is poort-gebaseerd (de briefing legt de poorten
   vast); de score is het prioriteits-getal voor de opvolging.
   QualifiedLead vuurt hier NIET; dat gebeurt server-side vanuit GHL.
   ====================================================================== */
(function () {
  'use strict';

  /* ====== CONFIGURATIE, hier vult Bryan in ==========================
     Inbound-webhook van de GHL-workflow "Sprint kwalificatie".
     Boekingslink: de GHL-kalender voor de sprint-doorloop.           */
  var GHL_QUIZ_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/agbm4h41aVGOzDyuSc16/webhook-trigger/7478ac71-09ea-4b7b-8dba-80b9e6596f42';
  var BOEKING_URL = 'https://api.leadconnectorhq.com/widget/booking/QzCITDWEPnRz1TfPeXbJ';

  /* Video per uitkomst. Alle drie staan bewust leeg: er komt dan geen
     videoblok op dat scherm, geen placeholder, niets. Is er later een
     bestand, zet hier het pad neer en het blok verschijnt vanzelf.
     Voorbeeld: hot: '../video/sprint-doorloop.mp4'                    */
  var VIDEOS = {
    hot: '',
    mid: '',
    dq: ''
  };
  /* ================================================================== */

  var VRAGEN = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9'];

  var state = {
    scherm: 'intro',
    antwoorden: {},          // per vraag: { waarde, label, punten }
    winstdienst: '',
    aanvraag: null,
    herstelEmail: '',
    verzonden: false,
    gestart: false,
    laatsteVraag: '',
    deelVerstuurdBij: -1
  };

  /* --- aanvraaggegevens uit formulier 1 ------------------------------ */
  function leesAanvraag() {
    try { return JSON.parse(sessionStorage.getItem('ll-sprint-aanvraag') || 'null'); } catch (e) { return null; }
  }

  function urlParam(naam) {
    try { return new URLSearchParams(window.location.search).get(naam) || ''; } catch (e) { return ''; }
  }

  /* Haalt het lead_id uit de link en poetst de URL daarna schoon, zodat
     het id niet in referrers of in event_source_url belandt. */
  function leesLeadIdUitLink() {
    var lid = urlParam('lid');
    if (!lid) return '';
    window.LL.setLeadId(lid);
    try {
      var schoon = window.location.pathname + window.location.hash;
      window.history.replaceState({}, '', schoon);
    } catch (e) {}
    return lid;
  }

  /* --- voortgang bewaren --------------------------------------------
     Antwoorden gaan in localStorage onder het lead_id, zodat iemand die
     via een herinnering terugkomt niet opnieuw hoeft te beginnen. Ze
     staan bewust niet in sessionStorage: die herinneringslink opent in
     een nieuw venster en dan is sessie-opslag leeg.                   */
  var VOORTGANG_KEY = 'll-sprint-voortgang';

  function bewaarVoortgang() {
    if (state.verzonden) return;
    try {
      localStorage.setItem(VOORTGANG_KEY, JSON.stringify({
        lead_id: window.LL.leadId(),
        antwoorden: state.antwoorden,
        winstdienst: state.winstdienst
      }));
    } catch (e) {}
  }

  function wisVoortgang() {
    try { localStorage.removeItem(VOORTGANG_KEY); } catch (e) {}
  }

  function haalVoortgang() {
    var opgeslagen = null;
    try { opgeslagen = JSON.parse(localStorage.getItem(VOORTGANG_KEY) || 'null'); } catch (e) {}
    if (!opgeslagen || opgeslagen.lead_id !== window.LL.leadId()) return 0;
    if (!opgeslagen.antwoorden || !Object.keys(opgeslagen.antwoorden).length) return 0;
    state.antwoorden = opgeslagen.antwoorden;
    state.winstdienst = opgeslagen.winstdienst || '';
    return Object.keys(state.antwoorden).filter(function (k) { return k !== 'q6b'; }).length;
  }

  /* Eerste vraag zonder antwoord. Wie op vraag 6 "nee" zei maar de
     vervolgvraag niet beantwoordde, komt terug op vraag 6. */
  function eersteOpenVraag() {
    if (waarde('q6') === 'nee' && !waarde('q6b')) return 'q6';
    for (var i = 0; i < VRAGEN.length; i++) {
      if (!state.antwoorden[VRAGEN[i]]) return VRAGEN[i];
    }
    return VRAGEN[0];
  }

  /* Zet de eerder gegeven antwoorden weer als gekozen in beeld. */
  function herstelSelecties() {
    Object.keys(state.antwoorden).forEach(function (v) {
      var groep = document.querySelector('.opties[data-vraag="' + v + '"]');
      if (!groep) return;
      var knop = groep.querySelector('.optie[data-waarde="' + state.antwoorden[v].waarde + '"]');
      if (knop) knop.classList.add('is-selected');
    });
    if (state.winstdienst) {
      var veld = document.getElementById('q2-winstdienst');
      if (veld) veld.value = state.winstdienst;
    }
    if (waarde('q6') === 'nee') {
      var vervolg = document.getElementById('q6-vervolg');
      if (vervolg) vervolg.hidden = false;
    }
  }

  function geldigEmail(waarde) {
    return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test((waarde || '').trim());
  }

  function zaaknaam() {
    return (state.aanvraag && state.aanvraag.bedrijfsnaam) || '';
  }

  /* --- schermen ------------------------------------------------------ */
  function toon(scherm) {
    var vorige = document.querySelector('.screen.is-active');
    if (vorige) vorige.classList.remove('is-active');
    var el = document.getElementById('screen-' + scherm);
    if (!el) return;
    el.classList.add('is-active');
    state.scherm = scherm;
    window.scrollTo({ top: 0, behavior: 'instant' });
    voortgang(scherm);
  }

  function voortgang(scherm) {
    var teller = document.getElementById('quizTeller');
    var balk = document.getElementById('quizVoortgang');
    var index = VRAGEN.indexOf(scherm);
    if (index !== -1) {
      teller.textContent = (index + 1) + ' van ' + VRAGEN.length;
      balk.style.width = (((index + 1) / VRAGEN.length) * 100) + '%';
    } else if (scherm === 'intro') {
      teller.textContent = '';
      balk.style.width = '0%';
    } else {
      teller.textContent = 'klaar';
      balk.style.width = '100%';
    }
  }

  function volgende(vraag) {
    var index = VRAGEN.indexOf(vraag);
    if (index === -1 || index === VRAGEN.length - 1) return afronden();
    toon(VRAGEN[index + 1]);
  }

  /* --- antwoorden ---------------------------------------------------- */
  function kies(groep, knop) {
    var vraag = groep.dataset.vraag;
    groep.querySelectorAll('.optie').forEach(function (b) { b.classList.remove('is-selected'); });
    knop.classList.add('is-selected');
    state.antwoorden[vraag] = {
      waarde: knop.dataset.waarde,
      label: knop.textContent.trim(),
      punten: parseInt(knop.dataset.punten, 10) || 0
    };
    state.laatsteVraag = vraag;
    bewaarVoortgang();

    // Vraag 6 "nee" loopt niet door maar vraagt eerst de toezegging dat
    // de beslisser bij het gesprek is. Zonder dat heeft praten geen zin.
    if (vraag === 'q6') {
      var vervolg = document.getElementById('q6-vervolg');
      if (knop.dataset.waarde === 'nee') {
        delete state.antwoorden.q6b;
        vervolg.hidden = false;
        setTimeout(function () { vervolg.scrollIntoView({ block: 'nearest' }); }, 60);
        return;
      }
      delete state.antwoorden.q6b;
      vervolg.hidden = true;
    }

    // De vervolgvraag hoort bij vraag 6, dus daarna gewoon naar vraag 7.
    if (vraag === 'q6b') {
      setTimeout(function () { volgende('q6'); }, 260);
      return;
    }

    setTimeout(function () { volgende(vraag); }, 260);
  }

  /* --- scoring en routing --------------------------------------------
     Puntentelling (vastgelegd in GHL-WORKFLOW-SPEC.md sectie 1):
       q1 salon 3 / kliniek 3 / andere lokale zaak 2 / geen van deze 0
       q3 tot 50 euro 0 / 50-100 1 / 100-250 2 / meer dan 250 3
       q4 rustig 0 / redelijk 2 / vol 3 / overvol 2
       q5 minder dan 20 0 / 20-50 1 / 50-100 2 / meer dan 100 3
       q6 eigenaar 3 / samen 2 / nee 0, met vervolg q6b beslisser erbij 1 / niet 0
       q7 500-plus 3 / 150-500 2 / minder dan 150 0 / geen 0
       q8 uitbesteed 2 / zelf social 1 / niks 0
       q9 ja 3 / grotendeels 2 / nee 0
     Maximum 23. De score routeert niet, hij prioriteert.              */
  function score() {
    return Object.keys(state.antwoorden).reduce(function (som, v) {
      var a = state.antwoorden[v];
      return som + ((a && a.punten) || 0);
    }, 0);
  }

  function waarde(vraag) {
    return (state.antwoorden[vraag] || {}).waarde || '';
  }

  /* Rechtvaardigings-check, de bindende matrix uit de briefing sectie 5.
     De Motor kost 447 per maand en moet zichzelf terugverdienen via
     klantwaarde maal extra klanten, dus we meten beide kanten.
       sterk       behandelwaarde 100-plus OF 50-plus nieuwe klanten
       acceptabel  behandelwaarde 50 tot 100 met 20 tot 50 nieuwe klanten
       onhoudbaar  behandelwaarde tot 50 met minder dan 20 nieuwe klanten
     De twee resterende combinaties (tot 50 euro met 20-50 klanten, en
     50-100 euro met minder dan 20 klanten) vallen tussen acceptabel en
     onhoudbaar in. Die heten hier zwak: nooit HOT, wel MID.          */
  function rechtvaardiging() {
    var w = waarde('q3');
    var k = waarde('q5');
    var hogeWaarde = (w === '100-250' || w === '250-plus');
    var veelKlanten = (k === '50-100' || k === '100-plus');

    if (hogeWaarde || veelKlanten) return 'sterk';
    if (w === '50-100' && k === '20-50') return 'acceptabel';
    if (w === 'tot-50' && k === 'onder-20') return 'onhoudbaar';
    return 'zwak';
  }

  function poorten() {
    var r = rechtvaardiging();
    return {
      fit: ['salon', 'kliniek', 'lokaal-afspraken'].indexOf(waarde('q1')) !== -1,
      rechtvaardiging: (r === 'sterk' || r === 'acceptabel'),
      agenda: ['redelijk', 'vol', 'overvol'].indexOf(waarde('q4')) !== -1,
      beslisser: ['eigenaar', 'samen'].indexOf(waarde('q6')) !== -1 || waarde('q6b') === 'ja',
      contacten: ['150-500', '500-plus'].indexOf(waarde('q7')) !== -1,
      akkoord: ['ja', 'grotendeels'].indexOf(waarde('q9')) !== -1
    };
  }

  function routeer() {
    var p = poorten();
    var dq = waarde('q1') === 'geen-van-deze'
      || (waarde('q6') === 'nee' && waarde('q6b') !== 'ja')
      || rechtvaardiging() === 'onhoudbaar'
      || (waarde('q9') === 'nee' && waarde('q4') === 'rustig');

    if (dq) return { route: 'DQ', gefaald: [] };

    var gefaald = Object.keys(p).filter(function (k) { return !p[k]; });
    if (!gefaald.length) return { route: 'HOT', gefaald: [] };
    return { route: 'MID', gefaald: gefaald };
  }

  function tags(route) {
    var lijst = ['sprint-' + route.toLowerCase()];
    // Kans-tags hebben geen betekenis op een afgewezen contact.
    if (route === 'DQ') return lijst;
    var db = waarde('q7');
    if (waarde('q1') === 'kliniek' && (db === '150-500' || db === '500-plus')) {
      lijst.push('reactivatie-kans');
      if (db === '500-plus') lijst.push('reactivatie-kans-sterk');
    }
    if (waarde('q6b') === 'ja') lijst.push('beslisser-erbij');
    if (waarde('q8') === 'uitbesteed') {
      lijst.push('ads-kans');
      // Extra gewicht bij een sterke rechtvaardiging: budget-ruimte aannemelijk.
      if (rechtvaardiging() === 'sterk') lijst.push('ads-kans-sterk');
    }
    return lijst;
  }

  /* --- afronden ------------------------------------------------------- */
  function afronden() {
    if (state.verzonden) return;
    state.verzonden = true;
    wisVoortgang();

    var uitslag = routeer();
    var payload = bouwPayload(uitslag);

    window.__llQuiz = {
      route: uitslag.route,
      score: payload.score,
      tags: payload.tags,
      gefaald: uitslag.gefaald,
      rechtvaardiging: payload.rechtvaardiging,
      lead_id: payload.lead_id,
      // waarop GHL dit contact kan terugvinden, handig bij het testen
      match: payload.email ? 'lead_id en e-mail' : 'alleen lead_id'
    };

    // QuizComplete is het reserve-optimalisatiedoel; browser-side is prima.
    window.LL.track('QuizComplete', { content_name: 'Sprint kwalificatie' });

    verstuur(payload);

    if (uitslag.route === 'HOT') toonHot();
    else if (uitslag.route === 'MID') toonMid(uitslag.gefaald);
    else toonDq();
  }

  function bouwPayload(uitslag) {
    var data = Object.assign({}, state.aanvraag || {});
    data.formulier = 'sprint-kwalificatie';
    data.lead_id = window.LL.leadId();
    // Zonder bewaarde aanvraag is het e-mailadres uit het herstelveld de
    // enige sleutel waarop GHL het bestaande contact kan vinden.
    if (!data.email && state.herstelEmail) data.email = state.herstelEmail.toLowerCase();
    data.winstdienst = state.winstdienst;
    data.score = score();
    data.route = uitslag.route;
    data.tags = tags(uitslag.route);
    data.rechtvaardiging = rechtvaardiging();
    data.gefaalde_poorten = uitslag.gefaald.join(',');
    VRAGEN.forEach(function (v) {
      var a = state.antwoorden[v];
      data[v] = a ? a.waarde : (v === 'q2' ? state.winstdienst : '');
      data[v + '_label'] = a ? a.label : (v === 'q2' ? state.winstdienst : '');
    });
    var q6b = state.antwoorden.q6b;
    data.q6b = q6b ? q6b.waarde : '';
    data.q6b_label = q6b ? q6b.label : '';
    var attr = window.LL.attributie();
    Object.keys(attr).forEach(function (k) { if (!data[k]) data[k] = attr[k]; });
    return data;
  }

  function verstuur(payload) {
    if (!GHL_QUIZ_WEBHOOK_URL) {
      if (window.console) console.warn('[sprint] GHL_QUIZ_WEBHOOK_URL is leeg, antwoorden niet verstuurd.', payload);
      return;
    }
    try {
      fetch(GHL_QUIZ_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(function () {});
    } catch (e) {}
  }

  /* --- boekingslink ---------------------------------------------------
     Naam, e-mail en telefoon staan al in de sessie, ingevuld op formulier
     1. Die gaan als parameters mee naar de kalender, zodat het
     boekingsformulier ingevuld staat en de bezoeker alleen nog een tijd
     kiest. Dat scheelt niet alleen frictie: typt iemand daar een ander
     e-mailadres, dan maakt GHL een tweede contact en landt de afspraak
     los van de quiz-antwoorden en de route.                            */
  function boekingsLink() {
    if (!BOEKING_URL) return '';
    var a = state.aanvraag || {};
    var velden = {
      first_name: a.voornaam || '',
      last_name: a.achternaam || '',
      email: a.email || state.herstelEmail || '',
      phone: a.telefoon_e164 || a.telefoon || '',
      lead_id: window.LL.leadId() || ''
    };
    var delen = [];
    Object.keys(velden).forEach(function (sleutel) {
      var waarde = velden[sleutel];
      if (waarde) delen.push(encodeURIComponent(sleutel) + '=' + encodeURIComponent(waarde));
    });
    if (!delen.length) return BOEKING_URL;
    // De link mag zelf al een query dragen, dus niet blind een vraagteken plakken.
    return BOEKING_URL + (BOEKING_URL.indexOf('?') === -1 ? '?' : '&') + delen.join('&');
  }

  /* --- afhakers ------------------------------------------------------
     Wie de quiz begint maar niet afmaakt, laat zijn antwoorden tot dat
     punt toch achter. Dat levert de winstdienst op (het waardevolste
     veld) en laat zien bij welke vraag mensen afhaken. Versturen gebeurt
     bij het verlaten van de pagina, met sendBeacon, want een gewone
     fetch overleeft dat moment op mobiel niet betrouwbaar.            */
  function aantalAntwoorden() {
    return VRAGEN.filter(function (v) { return !!state.antwoorden[v]; }).length;
  }

  function verstuurDeel() {
    if (state.verzonden || !state.gestart) return;
    var n = aantalAntwoorden();
    if (n === 0 || n === state.deelVerstuurdBij) return;
    state.deelVerstuurdBij = n;

    var data = Object.assign({}, state.aanvraag || {});
    data.formulier = 'sprint-kwalificatie-deels';
    data.lead_id = window.LL.leadId();
    if (!data.email && state.herstelEmail) data.email = state.herstelEmail.toLowerCase();
    data.winstdienst = state.winstdienst;
    data.antwoorden_gegeven = n;
    data.laatste_vraag = state.laatsteVraag;
    if (state.antwoorden.q3 && state.antwoorden.q5) data.rechtvaardiging = rechtvaardiging();
    VRAGEN.forEach(function (v) {
      var a = state.antwoorden[v];
      if (a) {
        data[v] = a.waarde;
        data[v + '_label'] = a.label;
      }
    });

    if (!GHL_QUIZ_WEBHOOK_URL) {
      if (window.console) console.warn('[sprint] deel-payload niet verstuurd, webhook leeg.', data);
      return;
    }
    try {
      var blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      if (!navigator.sendBeacon || !navigator.sendBeacon(GHL_QUIZ_WEBHOOK_URL, blob)) {
        fetch(GHL_QUIZ_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
          keepalive: true
        }).catch(function () {});
      }
    } catch (e) {}
  }

  /* --- uitkomstschermen ----------------------------------------------- */
  function vulZaaknaam() {
    var naam = zaaknaam();
    document.querySelectorAll('.zaaknaam').forEach(function (el) {
      el.textContent = naam || 'je zaak';
    });
  }

  function toonHot() {
    vulZaaknaam();
    regelVideo('hot');
    var knop = document.getElementById('boekKnop');
    var melding = document.getElementById('boekMelding');
    var link = boekingsLink();
    if (link) {
      knop.setAttribute('href', link);
      knop.setAttribute('target', '_blank');
      knop.setAttribute('rel', 'noopener');
    } else {
      knop.addEventListener('click', function (e) {
        e.preventDefault();
        melding.classList.add('is-zichtbaar');
      });
    }
    toon('hot');
  }

  function toonMid(gefaald) {
    vulZaaknaam();
    regelVideo('mid');
    var blok = document.getElementById('midReden');
    if (gefaald.length === 1 && gefaald[0] === 'contacten') {
      blok.textContent = 'Eén ding alvast eerlijk: de sprint werkt door jouw eigen tevreden klanten te benaderen, en daar zijn er minimaal circa 140 voor nodig. Met minder kunnen we de belofte van die week niet waarmaken. Zodra je lijst groot genoeg is, ben je welkom.';
      blok.hidden = false;
    }
    toon('mid');
  }

  function toonDq() {
    regelVideo('dq');
    toon('dq');
  }

  /* Toont het videoblok van een uitkomst alleen als er in VIDEOS een
     bestand voor is ingesteld. Staat dat leeg, dan blijft het blok
     verborgen en leest het scherm gewoon door, zonder placeholder en
     zonder gat. Laadt een ingesteld bestand toch niet, dan verdwijnt
     het blok alsnog, zodat er nooit een kapotte speler blijft staan. */
  function regelVideo(uitkomst) {
    var blok = document.querySelector('[data-video="' + uitkomst + '"]');
    if (!blok) return;
    var bron = VIDEOS[uitkomst];
    if (!bron) { blok.hidden = true; return; }
    var video = blok.querySelector('video');
    video.addEventListener('error', function () { blok.hidden = true; }, true);
    video.src = bron;
    blok.hidden = false;
  }

  /* --- opstarten ------------------------------------------------------- */
  function init() {
    var lid = leesLeadIdUitLink();
    state.aanvraag = leesAanvraag();

    var introZaak = document.getElementById('introZaak');
    if (introZaak && zaaknaam()) introZaak.textContent = ', ' + zaaknaam();

    /* Kennen we het contact? Dat is zo via de bewaarde aanvraag of via het
       lead_id in de link. Zo niet, dan vragen we alleen het e-mailadres,
       want anders komen de antwoorden los van de aanvraag binnen. */
    var herstelBlok = document.getElementById('herstelBlok');
    var herstelVeld = document.getElementById('herstelEmail');
    var herstelHint = document.getElementById('herstelHint');
    var bekend = !!lid || !!(state.aanvraag && state.aanvraag.email);
    if (!bekend) herstelBlok.hidden = false;

    /* Was diegene al begonnen, dan pakken we de draad op in plaats van
       hem opnieuw negen vragen te laten doen. Dat is precies de situatie
       van iemand die via de herinnering terugkomt. */
    var alGegeven = haalVoortgang();
    var startKnop = document.getElementById('startQuiz');
    if (alGegeven) {
      herstelSelecties();
      document.getElementById('introHelp').textContent =
        'Je was al begonnen en je antwoorden staan nog bewaard. Nog ' +
        (VRAGEN.length - alGegeven) + ' van de negen te gaan.';
      startKnop.textContent = 'Ga verder waar je gebleven was';
    }

    document.getElementById('startQuiz').addEventListener('click', function () {
      if (!bekend) {
        var v = (herstelVeld.value || '').trim();
        if (!geldigEmail(v)) {
          herstelHint.style.color = 'var(--error)';
          herstelVeld.focus();
          return;
        }
        herstelHint.style.color = '';
        state.herstelEmail = v;
      }
      if (!state.gestart) {
        state.gestart = true;
        // Voedt de retargeting-doelgroep "quiz-starters zonder finish" (doc 46).
        window.LL.track('QuizStart', { content_name: 'Sprint kwalificatie' });
      }
      toon(alGegeven ? eersteOpenVraag() : 'q1');
    });

    // Afhakers: bij het verlaten van de pagina gaat mee wat er al ligt.
    window.addEventListener('pagehide', verstuurDeel);
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') verstuurDeel();
    });

    document.querySelectorAll('.opties').forEach(function (groep) {
      groep.querySelectorAll('.optie').forEach(function (knop) {
        knop.addEventListener('click', function () { kies(groep, knop); });
      });
    });

    document.querySelectorAll('[data-terug]').forEach(function (knop) {
      knop.addEventListener('click', function () { toon(knop.dataset.terug); });
    });

    var veld = document.getElementById('q2-winstdienst');
    var verder = document.getElementById('q2-verder');
    var hint = document.getElementById('q2-hint');
    verder.addEventListener('click', function () {
      var v = (veld.value || '').trim();
      if (v.length < 2) {
        hint.style.color = 'var(--error)';
        veld.focus();
        return;
      }
      hint.style.color = '';
      state.winstdienst = v;
      state.antwoorden.q2 = { waarde: v, label: v, punten: 0 };
      state.laatsteVraag = 'q2';
      bewaarVoortgang();
      volgende('q2');
    });
    veld.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); verder.click(); }
    });

    voortgang('intro');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
