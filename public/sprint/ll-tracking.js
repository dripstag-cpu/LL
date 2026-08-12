/* ======================================================================
   Local Levers - tracking- en consent-module voor /sprint/
   ----------------------------------------------------------------------
   Verantwoordelijk voor:
   1. cookie-consent (marketing-cookies uit tot akkoord)
   2. Meta-pixel laden na consent
   3. utm-, fbclid-, fbp- en fbc-waarden vangen en bewaren (first touch wint)
   4. een deterministisch lead_id genereren voor CAPI-deduplicatie
   5. events vuren (Lead, QuizComplete) met event_id

   QualifiedLead, Schedule en Purchase staan hier bewust NIET in.
   Die vuren server-side vanuit GHL (zie TRACKING-EN-CAPI.md).
   ====================================================================== */
(function () {
  'use strict';

  /* ====== CONFIGURATIE, hier vult Bryan in ========================== */
  var META_PIXEL_ID = '1712093073452181';   // Meta-pixel-id (Dataset ID), gelijk aan de rest van de site.
  /* ================================================================== */

  var CONSENT_KEY = 'll-consent';
  var STORE_KEY = 'll-sprint-attributie';
  var LEAD_KEY = 'll-sprint-lead-id';

  /* --- kleine helpers ---------------------------------------------- */
  function qs(name) {
    try {
      return new URLSearchParams(window.location.search).get(name) || '';
    } catch (e) { return ''; }
  }
  function cookie(name) {
    var m = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[2]) : '';
  }
  function readStore(key) {
    try { return JSON.parse(sessionStorage.getItem(key) || 'null'); } catch (e) { return null; }
  }
  function writeStore(key, value) {
    try { sessionStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }
  function uuid() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
    });
  }

  /* --- consent ------------------------------------------------------ */
  function storedConsent() {
    try { return JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null'); } catch (e) { return null; }
  }
  function hasMarketingConsent() {
    var c = storedConsent();
    return !!(c && c.marketing);
  }

  function loadPixel() {
    if (!META_PIXEL_ID || window.__llPixelLoaded) return;
    window.__llPixelLoaded = true;
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');
    // fbp wordt pas door de pixel gezet, dus attributie opnieuw wegschrijven.
    setTimeout(captureAttributie, 400);
  }

  function applyConsent(consent) {
    window.LL_consent = consent;
    if (consent && consent.marketing) loadPixel();
    captureAttributie();
    flushQueue();
    window.dispatchEvent(new CustomEvent('ll-consent', { detail: consent }));
  }

  function saveConsent(marketing) {
    var consent = { analytics: marketing, marketing: marketing, versie: 2, ts: new Date().toISOString() };
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(consent)); } catch (e) {}
    applyConsent(consent);
    var el = document.getElementById('ll-cookie');
    if (el) el.hidden = true;
  }

  function initConsentBanner() {
    var el = document.getElementById('ll-cookie');
    var stored = storedConsent();
    if (stored) {
      applyConsent(stored);
    } else if (el) {
      el.hidden = false;
    }
    if (!el) return;
    el.addEventListener('click', function (e) {
      var t = e.target.closest('[data-ll]');
      if (!t) return;
      saveConsent(t.getAttribute('data-ll') === 'accept');
    });
  }

  /* --- attributie ---------------------------------------------------
     utm-waarden zijn campagne-parameters die de bezoeker zelf meebrengt
     en bewaren we altijd. De fb-identificatoren (fbclid, fbp, fbc) zijn
     marketing-cookies en bewaren we alleen met toestemming.
     First touch wint: een eenmaal gevangen waarde overschrijven we niet
     met een lege.                                                      */
  function captureAttributie() {
    var prev = readStore(STORE_KEY) || {};
    var data = {
      utm_source: prev.utm_source || qs('utm_source'),
      utm_medium: prev.utm_medium || qs('utm_medium'),
      utm_campaign: prev.utm_campaign || qs('utm_campaign'),
      utm_content: prev.utm_content || qs('utm_content'),
      utm_term: prev.utm_term || qs('utm_term'),
      landingspagina: prev.landingspagina || window.location.origin + window.location.pathname,
      event_source_url: window.location.href,
      eerste_bezoek: prev.eerste_bezoek || new Date().toISOString(),
      fbclid: prev.fbclid || '',
      fbp: prev.fbp || '',
      fbc: prev.fbc || ''
    };

    if (hasMarketingConsent()) {
      var fbclid = qs('fbclid');
      if (fbclid && !data.fbclid) data.fbclid = fbclid;
      data.fbp = cookie('_fbp') || data.fbp;
      var fbcCookie = cookie('_fbc');
      if (fbcCookie) {
        data.fbc = fbcCookie;
      } else if (data.fbclid && !data.fbc) {
        // Meta-formaat: fb.1.<timestamp in ms>.<fbclid>
        data.fbc = 'fb.1.' + Date.now() + '.' + data.fbclid;
      }
    }

    writeStore(STORE_KEY, data);
    return data;
  }

  function attributie() {
    return readStore(STORE_KEY) || captureAttributie();
  }

  /* --- lead_id, de basis voor CAPI-deduplicatie ----------------------
     Eén id per bezoeker-sessie. Gaat als hidden field mee naar GHL en
     wordt daar in een custom field bewaard, zodat het server-side event
     exact hetzelfde event_id draagt als het browser-event.             */
  function leadId() {
    var id = '';
    try { id = sessionStorage.getItem(LEAD_KEY) || ''; } catch (e) {}
    if (!id) {
      id = uuid();
      try { sessionStorage.setItem(LEAD_KEY, id); } catch (e) {}
    }
    return id;
  }
  function eventId(eventName) {
    return leadId() + '-' + eventName.toLowerCase();
  }

  /* Zet het lead_id vanuit een link (?lid=...). Nodig wanneer iemand de
     bedankpagina in een nieuw venster opent vanuit een herinnering: de
     sessie-opslag is dan leeg, maar het contact moet wel hetzelfde
     blijven, ook voor de event-deduplicatie.                          */
  function setLeadId(id) {
    if (!id || !/^[a-z0-9-]{8,64}$/i.test(id)) return leadId();
    try { sessionStorage.setItem(LEAD_KEY, id); } catch (e) {}
    return id;
  }

  /* --- events -------------------------------------------------------- */
  var STANDARD_EVENTS = ['Lead', 'PageView', 'ViewContent', 'Schedule', 'Purchase', 'CompleteRegistration'];
  var queue = [];
  var fired = {};

  /* Logboek van gevuurde events. Bevat alleen eventnaam, event_id en
     tijdstip, geen persoonsgegevens. Staat in window voor de console en
     in sessionStorage zodat het na de doorverwijzing nog te controleren
     is (dedup-check tegen Meta Test Events).                          */
  var EVENTLOG_KEY = 'll-events';
  window.__llEvents = readStore(EVENTLOG_KEY) || [];

  function logEvent(record) {
    window.__llEvents.push(record);
    writeStore(EVENTLOG_KEY, window.__llEvents.slice(-20));
  }

  function send(name, params, id) {
    if (window.fbq) {
      var method = STANDARD_EVENTS.indexOf(name) !== -1 ? 'track' : 'trackCustom';
      window.fbq(method, name, params || {}, { eventID: id });
      return true;
    }
    return false;
  }

  function flushQueue() {
    if (!window.fbq) return;
    while (queue.length) {
      var q = queue.shift();
      send(q.name, q.params, q.id);
    }
  }

  /* Vuurt een event precies één keer per pagina-lading.
     Zonder consent of zonder pixel-id wordt het event alleen genoteerd,
     zodat de flow lokaal te controleren is zonder iets te versturen.   */
  function track(name, params) {
    if (fired[name]) return null;
    fired[name] = true;
    var id = eventId(name);
    var record = { event: name, event_id: id, params: params || {}, ts: new Date().toISOString() };
    logEvent(record);
    if (!send(name, params, id)) queue.push({ name: name, params: params, id: id });
    return id;
  }

  /* Is dit event in deze sessie al weggegaan? `fired` dekt alleen de huidige
     pagina, en de sprint-trechter loopt over twee pagina's. Het eventlogboek
     staat in sessionStorage en overleeft de doorverwijzing, dus dat is de
     bron. Nodig voor QuizStart, dat op scherm 1 en op de quiz-intro staat. */
  function alGevuurd(name) {
    if (fired[name]) return true;
    var log = window.__llEvents || [];
    for (var i = 0; i < log.length; i++) {
      if (log[i] && log[i].event === name) return true;
    }
    return false;
  }

  /* Vuurt een event hooguit één keer per browser binnen het venster, standaard
     30 dagen. Voor QuizStart, het optimalisatie-event: dat hoort één persoon
     één keer te tellen. Een sessie-check is daarvoor te kort, want wie later
     terugkomt krijgt een nieuw lead_id en begint schoon, terwijl Meta hem aan
     dezelfde fbp-cookie hangt en hem dus dubbel zou tellen. Geeft het
     event_id terug als er echt iets weg is, anders null.                 */
  var EENMALIG_KEY = 'll-eenmalig';
  function trackEenmalig(name, params, dagen) {
    if (alGevuurd(name)) return null;
    var log = {};
    try { log = JSON.parse(localStorage.getItem(EENMALIG_KEY) || '{}') || {}; } catch (e) {}
    var nu = new Date().getTime();
    if (log[name] && (nu - log[name]) < (dagen || 30) * 864e5) return null;
    var id = track(name, params);
    if (id) {
      log[name] = nu;
      try { localStorage.setItem(EENMALIG_KEY, JSON.stringify(log)); } catch (e) {}
    }
    return id;
  }

  /* --- publiek ------------------------------------------------------- */
  window.LL = {
    track: track,
    trackEenmalig: trackEenmalig,
    alGevuurd: alGevuurd,
    leadId: leadId,
    setLeadId: setLeadId,
    eventId: eventId,
    attributie: attributie,
    hasMarketingConsent: hasMarketingConsent
  };

  captureAttributie();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConsentBanner);
  } else {
    initConsentBanner();
  }
})();
