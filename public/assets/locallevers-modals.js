/*!
 * Local Levers modals
 * - Quiz "Waar sta jij nu?" als popup
 * - GBP-checklist opt-in als popup
 * - Exit-intent trigger voor checklist
 *
 * Hookt automatisch op a[href="/check/"], a[href="/checklist/"], [data-open-quiz], [data-open-checklist].
 * Standalone pagina's /check/ en /checklist/ blijven werken als fallback voor directe URLs.
 */
(function () {
  'use strict';

  // ====================================================================== //
  // CSS                                                                     //
  // ====================================================================== //
  const CSS = `
  .llm-backdrop {
    position: fixed; inset: 0; z-index: 9998;
    background: rgba(8, 8, 7, 0.78);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    display: none; align-items: flex-start; justify-content: center;
    overflow-y: auto;
    padding: 32px 16px;
    animation: llmFade 220ms ease-out;
  }
  .llm-backdrop.open { display: flex; }
  @keyframes llmFade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes llmRise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }

  .llm-modal {
    position: relative;
    width: 100%; max-width: 640px;
    background: #0a0a09;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    color: #FAFAF8;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    line-height: 1.6;
    overflow: hidden;
    animation: llmRise 280ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .llm-modal-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    background: rgba(20,20,19,0.6);
    position: sticky; top: 0; z-index: 5;
  }
  .llm-modal-logo { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 15px; }
  .llm-modal-logo span { color: #4ADE80; }
  .llm-modal-counter { font-size: 12px; color: #A0A09A; font-variant-numeric: tabular-nums; }
  .llm-modal-close {
    background: transparent; border: none; cursor: pointer;
    width: 32px; height: 32px; border-radius: 8px;
    display: inline-flex; align-items: center; justify-content: center;
    color: #A0A09A;
    transition: background 200ms, color 200ms;
    margin-left: 12px;
  }
  .llm-modal-close:hover { background: rgba(255,255,255,0.06); color: #FAFAF8; }
  .llm-modal-close svg { width: 18px; height: 18px; }

  .llm-progress {
    height: 3px; background: rgba(255,255,255,0.06);
    position: relative;
  }
  .llm-progress-fill {
    height: 100%; background: #4ADE80; width: 0%;
    transition: width 400ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .llm-modal-body { padding: 32px 28px 36px; }
  .llm-modal-body * { box-sizing: border-box; }

  .llm-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; color: #4ADE80;
    margin-bottom: 14px;
  }
  .llm-eyebrow::before { content: ''; width: 20px; height: 1px; background: rgba(74,222,128,0.4); }

  .llm-title {
    font-family: 'Outfit', sans-serif; font-weight: 800; line-height: 1.15; letter-spacing: -0.02em;
    font-size: clamp(22px, 4vw, 30px); margin-bottom: 12px;
  }
  .llm-title .accent { color: #4ADE80; }
  .llm-help { color: #A0A09A; font-size: 14px; margin-bottom: 22px; }

  .llm-screen { display: none; }
  .llm-screen.active { display: block; animation: llmRise 280ms ease-out; }

  /* Intro features */
  .llm-features { list-style: none; padding: 0; margin: 0 0 24px; display: grid; gap: 10px; }
  .llm-features li { padding-left: 22px; position: relative; color: #A0A09A; font-size: 14px; }
  .llm-features li::before {
    content: ''; position: absolute; left: 0; top: 10px;
    width: 12px; height: 1px; background: #4ADE80;
  }

  /* Options */
  .llm-options { display: grid; gap: 8px; margin-bottom: 22px; }
  .llm-option {
    display: block; padding: 16px 18px; min-height: 52px;
    background: #141413; border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px; color: #FAFAF8;
    font-family: inherit; font-size: 15px; line-height: 1.4;
    cursor: pointer; text-align: left;
    transition: border-color 180ms, background 180ms;
  }
  .llm-option:hover { border-color: #1A7A54; background: rgba(26,122,84,0.08); }
  .llm-option.selected { border-color: #4ADE80; background: rgba(74,222,128,0.08); box-shadow: 0 0 0 1px #4ADE80; }

  /* Inputs */
  .llm-input {
    display: block; width: 100%;
    padding: 16px 18px; min-height: 52px;
    background: #141413; border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px; color: #FAFAF8;
    font-family: inherit; font-size: 16px;
    margin-bottom: 18px;
  }
  .llm-input:focus { outline: none; border-color: #4ADE80; }

  /* Buttons */
  .llm-btn-primary {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    background: #1A7A54; color: #fff;
    font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 16px;
    padding: 14px 24px; min-height: 52px; border: none; border-radius: 10px;
    width: 100%; cursor: pointer;
    transition: background 200ms, transform 200ms;
  }
  .llm-btn-primary:hover:not(:disabled) { background: #1f9067; transform: translateY(-1px); }
  .llm-btn-primary:disabled { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.3); cursor: not-allowed; transform: none; }

  /* Result card */
  .llm-result {
    padding: 24px; background: #141413;
    border: 1px solid rgba(255,255,255,0.08); border-radius: 14px;
    margin-bottom: 4px;
  }
  .llm-result h2 { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: clamp(22px, 3.5vw, 30px); line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 16px; }
  .llm-result h2 .accent { color: #4ADE80; }
  .llm-result p { color: #A0A09A; font-size: 15px; margin-bottom: 14px; }
  .llm-result p.lead { color: #FAFAF8; font-size: 16px; }
  .llm-result p strong { color: #FAFAF8; }
  .llm-result ul { list-style: none; padding: 0; margin: 0 0 16px; }
  .llm-result ul li { padding-left: 22px; position: relative; color: #A0A09A; font-size: 15px; margin-bottom: 10px; }
  .llm-result ul li::before { content: ''; position: absolute; left: 0; top: 11px; width: 12px; height: 1px; background: #4ADE80; }
  .llm-callout {
    padding: 16px; background: rgba(74,222,128,0.06); border: 1px solid rgba(74,222,128,0.2);
    border-radius: 10px; margin: 16px 0; font-size: 15px; color: #FAFAF8;
  }
  .llm-callout strong { color: #4ADE80; font-size: 20px; font-family: 'Outfit', sans-serif; }
  .llm-cta {
    display: inline-flex; align-items: center; justify-content: center;
    background: #1A7A54; color: #fff;
    font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 16px;
    padding: 14px 24px; min-height: 52px; border-radius: 10px;
    text-decoration: none;
    margin-top: 12px;
    transition: background 200ms, transform 200ms;
  }
  .llm-cta:hover { background: #1f9067; transform: translateY(-1px); }
  .llm-result-sub { color: #A0A09A; font-size: 13px; margin-top: 12px; font-style: italic; }

  /* Error */
  .llm-error { color: #ff6b6b; font-size: 13px; margin-top: 6px; min-height: 18px; }
  .llm-note { color: #A0A09A; font-size: 13px; margin-top: 10px; font-style: italic; }

  /* Checklist modal specifics */
  .llm-checklist-bullets { list-style: none; padding: 0; margin: 0 0 24px; display: grid; gap: 10px; }
  .llm-checklist-bullets li { padding-left: 22px; position: relative; color: #A0A09A; font-size: 14px; }
  .llm-checklist-bullets li::before {
    content: ''; position: absolute; left: 0; top: 10px;
    width: 12px; height: 1px; background: #4ADE80;
  }

  body.llm-no-scroll { overflow: hidden; }

  @media (max-width: 480px) {
    .llm-backdrop { padding: 0; }
    .llm-modal { border-radius: 0; min-height: 100vh; max-width: 100%; }
    .llm-modal-body { padding: 24px 20px 32px; }
    .llm-title { font-size: 22px; }
  }
  `;

  // ====================================================================== //
  // Quiz scoring (mirror van /check/)                                       //
  // ====================================================================== //
  function scoreQ3(v) { if (v < 5) return 20; if (v <= 15) return 15; if (v <= 30) return 10; return 5; }
  function scoreQ5(v) { if (v <= 20) return 20; if (v <= 50) return 15; if (v <= 100) return 10; return 5; }

  function aovMidpoint(v) {
    if (v === '100-200') return 150;
    if (v === '200-500') return 350;
    if (v === '500-2000') return 1250;
    if (v === 'gt2000') return 2500;
    return 0;
  }
  function extraCapacityBucket(v) {
    if (v === 'bijna-leeg') return { label: '6 tot 12', mid: 9 };
    if (v === 'te-leeg') return { label: '4 tot 8', mid: 6 };
    if (v === 'oke') return { label: '3 tot 5', mid: 4 };
    if (v === 'vol-ruimte') return { label: '1 tot 3', mid: 2 };
    return { label: '1 tot 2', mid: 1 };
  }
  function reviewBenchmark(v) {
    if (v < 20) return '60 tot 120 reviews';
    if (v < 50) return '80 tot 150 reviews';
    if (v < 100) return '120 tot 200 reviews';
    return '200+ reviews';
  }
  function segmentLabel(v) { return v === 'kliniek' ? 'klinieken' : 'lokale dienstverleners'; }

  // ====================================================================== //
  // Tracking                                                                //
  // ====================================================================== //
  function track(eventName, payload) {
    try {
      if (window.dataLayer) window.dataLayer.push({ event: eventName, ...payload });
      console.log('[track]', eventName, payload || {});
    } catch (e) {}
  }

  // ====================================================================== //
  // Modal core                                                              //
  // ====================================================================== //
  let backdropEl = null;
  let modalBodyEl = null;
  let modalCounterEl = null;
  let modalProgressEl = null;

  function injectCSS() {
    if (document.getElementById('llm-styles')) return;
    const style = document.createElement('style');
    style.id = 'llm-styles';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function buildShell() {
    if (backdropEl) return;
    backdropEl = document.createElement('div');
    backdropEl.className = 'llm-backdrop';
    backdropEl.setAttribute('role', 'dialog');
    backdropEl.setAttribute('aria-modal', 'true');
    backdropEl.innerHTML = `
      <div class="llm-modal" role="document">
        <header class="llm-modal-head">
          <span class="llm-modal-logo">Local<span>Levers</span></span>
          <span class="llm-modal-counter" data-counter></span>
          <button class="llm-modal-close" aria-label="Sluiten" data-close>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M6 18L18 6"/></svg>
          </button>
        </header>
        <div class="llm-progress"><div class="llm-progress-fill" data-progress></div></div>
        <div class="llm-modal-body" data-body></div>
      </div>
    `;
    document.body.appendChild(backdropEl);
    modalBodyEl = backdropEl.querySelector('[data-body]');
    modalCounterEl = backdropEl.querySelector('[data-counter]');
    modalProgressEl = backdropEl.querySelector('[data-progress]');

    backdropEl.addEventListener('click', (e) => {
      if (e.target === backdropEl) closeModal();
    });
    backdropEl.querySelector('[data-close]').addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdropEl.classList.contains('open')) closeModal();
    });
  }

  function openModal() {
    buildShell();
    backdropEl.classList.add('open');
    document.body.classList.add('llm-no-scroll');
  }

  function closeModal() {
    if (!backdropEl) return;
    backdropEl.classList.remove('open');
    document.body.classList.remove('llm-no-scroll');
    modalBodyEl.innerHTML = '';
    modalCounterEl.textContent = '';
    modalProgressEl.style.width = '0%';
  }

  function setCounter(text, pct) {
    modalCounterEl.textContent = text || '';
    modalProgressEl.style.width = (pct || 0) + '%';
  }

  // ====================================================================== //
  // QUIZ                                                                    //
  // ====================================================================== //
  function quizMarkup() {
    return `
      <section class="llm-screen active" data-screen="intro">
        <div class="llm-eyebrow">2-min check</div>
        <h2 class="llm-title">Waar sta jij nu?</h2>
        <p class="llm-help">7 korte vragen. Daarna krijg je een diagnose op maat plus mijn concrete aanbeveling. Geen call zonder eerst te kijken.</p>
        <ul class="llm-features">
          <li>7 vragen, ongeveer 2 minuten</li>
          <li>Diagnose plus aanbeveling per email</li>
          <li>Geen verkooppraat, geen automatische call-boekingen</li>
        </ul>
        <button class="llm-btn-primary" data-start>Start de check</button>
      </section>

      <section class="llm-screen" data-screen="q1">
        <div class="llm-eyebrow">Vraag 1 van 7</div>
        <h2 class="llm-title">Wat voor bedrijf heb je?</h2>
        <div class="llm-options" data-q="q1">
          <button class="llm-option" data-value="kliniek" data-points="20">Kliniek (tandarts, dermatoloog, fysio, dierenarts, esthetiek, hair transplant)</button>
          <button class="llm-option" data-value="dienstverlener" data-points="20">Lokale dienstverlener (installateur, elektricien, loodgieter, sanitair, klimaattechniek, witgoed, renovatie)</button>
          <button class="llm-option" data-value="ecommerce" data-points="0" data-disqualify="true">E-commerce of online-only bedrijf</button>
          <button class="llm-option" data-value="anders" data-points="0" data-disqualify="true">Iets anders</button>
        </div>
      </section>

      <section class="llm-screen" data-screen="q2">
        <div class="llm-eyebrow">Vraag 2 van 7</div>
        <h2 class="llm-title">Wat is je gemiddelde klantbedrag (AOV)?</h2>
        <div class="llm-options" data-q="q2">
          <button class="llm-option" data-value="lt100" data-points="0" data-disqualify="true">Minder dan €100</button>
          <button class="llm-option" data-value="100-200" data-points="5">€100 tot €200</button>
          <button class="llm-option" data-value="200-500" data-points="15">€200 tot €500</button>
          <button class="llm-option" data-value="500-2000" data-points="20">€500 tot €2.000</button>
          <button class="llm-option" data-value="gt2000" data-points="25">Meer dan €2.000</button>
        </div>
      </section>

      <section class="llm-screen" data-screen="q3">
        <div class="llm-eyebrow">Vraag 3 van 7</div>
        <h2 class="llm-title">Hoeveel nieuwe klanten of patiënten per maand?</h2>
        <p class="llm-help">Schatting is prima. Tel alleen nieuwe klanten, geen herhaalbezoek.</p>
        <input type="number" min="0" max="500" inputmode="numeric" class="llm-input" data-numeric="q3" placeholder="Bijvoorbeeld: 15">
        <button class="llm-btn-primary" data-next="q3" disabled>Volgende</button>
      </section>

      <section class="llm-screen" data-screen="q4">
        <div class="llm-eyebrow">Vraag 4 van 7</div>
        <h2 class="llm-title">Op welke positie sta je in Google Maps voor je belangrijkste zoekterm?</h2>
        <div class="llm-options" data-q="q4">
          <button class="llm-option" data-value="1" data-points="5">Positie 1</button>
          <button class="llm-option" data-value="2-3" data-points="10">Positie 2 of 3</button>
          <button class="llm-option" data-value="4-7" data-points="15">Positie 4 tot 7</button>
          <button class="llm-option" data-value="8plus" data-points="20">Positie 8 of lager</button>
          <button class="llm-option" data-value="unknown" data-points="15">Weet ik niet</button>
        </div>
      </section>

      <section class="llm-screen" data-screen="q5">
        <div class="llm-eyebrow">Vraag 5 van 7</div>
        <h2 class="llm-title">Hoeveel Google-reviews heb je?</h2>
        <p class="llm-help">Alleen Google-reviews, niet TripAdvisor of Trustpilot.</p>
        <input type="number" min="0" max="1000" inputmode="numeric" class="llm-input" data-numeric="q5" placeholder="Bijvoorbeeld: 42">
        <button class="llm-btn-primary" data-next="q5" disabled>Volgende</button>
      </section>

      <section class="llm-screen" data-screen="q6">
        <div class="llm-eyebrow">Vraag 6 van 7</div>
        <h2 class="llm-title">Wat is je grootste frustratie op dit moment?</h2>
        <div class="llm-options" data-q="q6">
          <button class="llm-option" data-value="zichtbaarheid" data-points="15">Ik sta niet hoog genoeg in Google</button>
          <button class="llm-option" data-value="miscalls" data-points="15">Ik mis te veel telefoontjes of berichten</button>
          <button class="llm-option" data-value="weinig-klanten" data-points="15">Ik krijg te weinig nieuwe klanten</button>
          <button class="llm-option" data-value="concurrent" data-points="5">Mijn concurrent doet het beter en ik weet niet waarom</button>
          <button class="llm-option" data-value="te-druk" data-points="10">Ik heb het te druk om er iets aan te doen</button>
          <button class="llm-option" data-value="geen" data-points="5">Geen grote frustratie, ik kijk gewoon wat er mogelijk is</button>
        </div>
      </section>

      <section class="llm-screen" data-screen="q7">
        <div class="llm-eyebrow">Vraag 7 van 7</div>
        <h2 class="llm-title">Hoe vol is je agenda de komende 4 weken?</h2>
        <div class="llm-options" data-q="q7">
          <button class="llm-option" data-value="overvol" data-points="5">Overvol, ik kan er niets bij hebben</button>
          <button class="llm-option" data-value="vol-ruimte" data-points="10">Vol, maar er kan iets bij</button>
          <button class="llm-option" data-value="oke" data-points="15">Oké, kan beter</button>
          <button class="llm-option" data-value="te-leeg" data-points="20">Te leeg, ik heb klanten nodig</button>
          <button class="llm-option" data-value="bijna-leeg" data-points="20">Bijna leeg, urgentie hoog</button>
        </div>
      </section>

      <section class="llm-screen" data-screen="email">
        <div class="llm-eyebrow">Bijna klaar</div>
        <h2 class="llm-title">Waar mag ik het resultaat sturen?</h2>
        <p class="llm-help">Plus een schatting van wat je nu naar verwachting per maand laat liggen op tafel, plus mijn concrete aanbeveling voor jouw situatie.</p>
        <form data-email-form novalidate>
          <input type="email" class="llm-input" data-email-input placeholder="jouw@email.nl" autocomplete="email" required>
          <button type="submit" class="llm-btn-primary">Stuur me het resultaat</button>
          <div class="llm-error" data-email-error></div>
          <p class="llm-note">Geen marketing-bombardement. Het resultaat plus maximaal 5 vervolgmails verspreid over 2 weken, dan stopt het.</p>
        </form>
      </section>

      <section class="llm-screen" data-screen="result-hot">
        <div class="llm-eyebrow">Je resultaat</div>
        <div class="llm-result">
          <h2>Op basis van je input: tot <span class="accent" data-hot-missed>€-</span> aan potentiële omzet per maand</h2>
          <p class="lead">Hier zit de ruimte tussen waar je nu staat en waar de top in jouw segment staat:</p>
          <ul>
            <li>Maps-positie: <strong data-hot-position>?</strong>. Top 3 pakt 75% van alle kliks (BrightLocal 2024).</li>
            <li>Google-reviews: <strong data-hot-reviews>?</strong>. Bedrijven met 100+ reviews staan gemiddeld 3 plekken hoger in de Maps-pack (Whitespark 2024).</li>
            <li>Agenda: ruimte voor <strong data-hot-extra>?</strong> extra klanten per maand bij je AOV van <strong data-hot-aov>?</strong>.</li>
          </ul>
          <div class="llm-callout">Geschatte potentiële omzet: <strong data-hot-missed2>€-</strong> per maand bij 20% beter benutten van die ruimte. Een aanname op basis van standaard uplift bij betere vindbaarheid + lead-response, geen belofte.</div>
          <p>Wil je een 30-min gesprek om te kijken of we dit voor jou kunnen oppakken? Geen verkooppraat. We bespreken je situatie en of er een fit is.</p>
          <a href="https://go.locallevers.com/book" class="llm-cta" data-result-cta="hot" target="_blank" rel="noopener">Boek mijn strategie-call (gratis)</a>
          <p class="llm-result-sub">30 minuten, gratis. Bryan beslist na het gesprek of een audit of een traject zinnig is.</p>
        </div>
      </section>

      <section class="llm-screen" data-screen="result-warm">
        <div class="llm-eyebrow">Je resultaat</div>
        <div class="llm-result">
          <h2>Je situatie heeft <span class="accent">potentieel</span>, maar er is wat voorwerk</h2>
          <p class="lead">Op basis van je antwoorden zie ik 2-3 concrete verbeterpunten. Voordat je een gesprek inplant is het slim om eerst de diagnose te hebben, zodat de call inhoudelijk wordt in plaats van oriënterend.</p>
          <p>Mijn advies: start met de €37 audit. 48 uur na bestelling heb je een complete diagnose en concrete fixes voor je profiel. Daarna pas inplannen als je verder wil.</p>
          <a href="/audit/" class="llm-cta" data-result-cta="warm">Doe de €37 audit</a>
          <p class="llm-result-sub">14 dagen geld-terug-garantie. Geen abonnement. Geen verkoop-trucs.</p>
        </div>
      </section>

      <section class="llm-screen" data-screen="result-cold">
        <div class="llm-eyebrow">Je resultaat</div>
        <div class="llm-result">
          <h2>Je hebt <span class="accent">geen acute marketing-pijn</span></h2>
          <p class="lead">Op basis van je antwoorden zie ik geen urgente problemen. Dat is goed nieuws. Wat je wel kunt doen: de gratis GBP-checklist 2026 downloaden zodat je zelf je profiel kunt nakijken op de 13 punten die in 2026 belangrijk zijn (inclusief AI-zichtbaarheid).</p>
          <p>Daarbij krijg je 5 emails verspreid over 2 weken met inzichten per niche. Geen verkoop-bombardementen. Mocht je situatie veranderen, weet je waar ik zit.</p>
          <button class="llm-cta" data-open-checklist data-result-cta="cold">Download de gratis checklist</button>
        </div>
      </section>

      <section class="llm-screen" data-screen="result-unqualified">
        <div class="llm-eyebrow">Je resultaat</div>
        <div class="llm-result">
          <h2>We zijn waarschijnlijk niet de juiste fit</h2>
          <p class="lead">Local Levers werkt specifiek met klinieken en lokale dienstverleners met klantbedragen vanaf €200. Voor andere bedrijfstypes zijn er bureaus die beter passen.</p>
          <p>Je krijgt geen verkoopgesprek aangeboden. Wel kun je de gratis GBP-checklist nemen, die werkt voor elk lokaal bedrijf met een Google-profiel.</p>
          <button class="llm-cta" data-open-checklist data-result-cta="unqualified">Download de checklist (gratis, geen email-marketing)</button>
        </div>
      </section>
    `;
  }

  function initQuiz() {
    const state = { answers: {}, total: 0, category: null, revealed: false };
    const QUIZ_SCREENS = ['q1','q2','q3','q4','q5','q6','q7'];

    function show(name) {
      modalBodyEl.querySelectorAll('.llm-screen').forEach(s => s.classList.remove('active'));
      const el = modalBodyEl.querySelector(`[data-screen="${name}"]`);
      if (el) el.classList.add('active');
      if (QUIZ_SCREENS.includes(name)) {
        const idx = QUIZ_SCREENS.indexOf(name) + 1;
        setCounter(`${idx} / 7`, (idx / 7) * 100);
      } else if (name === 'email') {
        setCounter('email', 100);
      } else if (name && name.startsWith('result')) {
        setCounter('klaar', 100);
      } else {
        setCounter('', 0);
      }
      // Scroll modal body to top
      modalBodyEl.scrollTop = 0;
      if (backdropEl) backdropEl.scrollTop = 0;
    }

    function next(currentQNum) {
      if (currentQNum < 7) show('q' + (currentQNum + 1));
      else show('email');
    }

    // Intro
    modalBodyEl.querySelector('[data-start]').addEventListener('click', () => {
      track('quiz_started', {});
      show('q1');
    });

    // Option clicks
    modalBodyEl.querySelectorAll('.llm-options').forEach(group => {
      const q = group.dataset.q;
      group.querySelectorAll('.llm-option').forEach(btn => {
        btn.addEventListener('click', () => {
          group.querySelectorAll('.llm-option').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          state.answers[q] = {
            value: btn.dataset.value,
            points: parseInt(btn.dataset.points, 10),
            disqualify: btn.dataset.disqualify === 'true'
          };
          track('quiz_question_' + q.slice(1) + '_answered', { value: btn.dataset.value });
          setTimeout(() => next(parseInt(q.slice(1), 10)), 320);
        });
      });
    });

    // Numeric inputs
    [['q3', scoreQ3], ['q5', scoreQ5]].forEach(([key, scoreFn]) => {
      const input = modalBodyEl.querySelector(`[data-numeric="${key}"]`);
      const btn = modalBodyEl.querySelector(`[data-next="${key}"]`);
      const validate = () => {
        const v = parseInt(input.value, 10);
        btn.disabled = !(Number.isInteger(v) && v >= 0);
      };
      input.addEventListener('input', validate);
      btn.addEventListener('click', () => {
        const v = parseInt(input.value, 10);
        if (!Number.isInteger(v) || v < 0) return;
        state.answers[key] = { value: v, points: scoreFn(v), disqualify: false };
        track('quiz_question_' + key.slice(1) + '_answered', { value: v });
        next(parseInt(key.slice(1), 10));
      });
      validate();
    });

    function compute() {
      const dq = ['q1','q2'].some(k => state.answers[k]?.disqualify);
      if (dq) { state.category = 'UNQUALIFIED'; state.total = null; return; }
      const total = Object.values(state.answers).reduce((s, a) => s + (a.points || 0), 0);
      state.total = total;
      if (total >= 100) state.category = 'HOT';
      else if (total >= 70) state.category = 'WARM';
      else state.category = 'COLD';
    }

    function renderHot() {
      const aovVal = state.answers.q2?.value;
      const aov = aovMidpoint(aovVal);
      const cap = extraCapacityBucket(state.answers.q7?.value);
      const missed = Math.round(cap.mid * aov * 0.20);
      const eur = (n) => '€' + n.toLocaleString('nl-NL');
      const posMap = { '1': 'Plek 1', '2-3': 'Plek 2 of 3', '4-7': 'Plek 4 tot 7', '8plus': 'Plek 8 of lager', 'unknown': 'Onbekend' };
      const aovLabel = { '100-200': '€100 tot €200', '200-500': '€200 tot €500', '500-2000': '€500 tot €2.000', 'gt2000': 'meer dan €2.000' };
      const reviews = state.answers.q5?.value;
      modalBodyEl.querySelector('[data-hot-missed]').textContent = eur(missed);
      modalBodyEl.querySelector('[data-hot-missed2]').textContent = eur(missed);
      modalBodyEl.querySelector('[data-hot-position]').textContent = posMap[state.answers.q4?.value] || 'Onbekend';
      modalBodyEl.querySelector('[data-hot-reviews]').textContent = (reviews != null) ? reviews : '?';
      modalBodyEl.querySelector('[data-hot-aov]').textContent = aovLabel[aovVal] || '?';
      modalBodyEl.querySelector('[data-hot-extra]').textContent = cap.label;
    }

    function reveal() {
      state.revealed = true;
      compute();
      if (state.category === 'HOT') { renderHot(); show('result-hot'); }
      else if (state.category === 'WARM') show('result-warm');
      else if (state.category === 'COLD') show('result-cold');
      else show('result-unqualified');
      track('quiz_result_shown', { category: state.category, score: state.total });

      // Wire result CTAs (incl. cold/unqualified → checklist popup)
      modalBodyEl.querySelectorAll('[data-result-cta]').forEach(el => {
        el.addEventListener('click', (e) => {
          track('quiz_result_cta_click', { category: state.category, target: el.dataset.resultCta });
          if (el.hasAttribute('data-open-checklist')) {
            e.preventDefault();
            closeModal();
            // Slight delay to avoid backdrop overlap
            setTimeout(openChecklist, 200);
          }
        }, { once: true });
      });
    }

    // Email gate (HARD)
    const form = modalBodyEl.querySelector('[data-email-form]');
    const emailInput = modalBodyEl.querySelector('[data-email-input]');
    const emailError = modalBodyEl.querySelector('[data-email-error]');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      emailError.textContent = '';
      const email = (emailInput.value || '').trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!valid) {
        emailError.textContent = 'Vul een geldig e-mailadres in.';
        emailInput.focus();
        return;
      }
      compute();
      try {
        // const GHL_ENDPOINT = 'https://services.leadconnectorhq.com/hooks/...';
        // await fetch(GHL_ENDPOINT, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email, answers: state.answers, score: state.total, category: state.category, source: 'quiz-modal', timestamp: new Date().toISOString() })});
        track('quiz_email_submitted', { category: state.category });
      } catch (err) { console.warn('Quiz submit failed', err); }
      reveal();
    });
  }

  function openQuiz() {
    track('quiz_modal_opened', {});
    openModal();
    modalBodyEl.innerHTML = quizMarkup();
    setCounter('', 0);
    initQuiz();
  }

  // ====================================================================== //
  // CHECKLIST MODAL                                                         //
  // ====================================================================== //
  function checklistMarkup() {
    return `
      <section class="llm-screen active" data-screen="checklist-form">
        <div class="llm-eyebrow">Voor klinieken en lokale dienstverleners</div>
        <h2 class="llm-title">GBP-checklist 2026: weet binnen <span class="accent">10 minuten</span> waar je staat</h2>
        <p class="llm-help">13 punten die in 2026 bepalen of je Google-profiel werkt of niet, inclusief 4 nieuwe punten voor AI-zichtbaarheid. We zullen je nooit spammen. Pinky promise.</p>
        <ul class="llm-checklist-bullets">
          <li>13-punts checklist als PDF, drukklaar.</li>
          <li>4 nieuwe punten voor ChatGPT, Gemini en Perplexity.</li>
          <li>Prioritering: welke 3 punten als eerste, welke 10 daarna.</li>
          <li>5 emails met inzichten specifiek voor klinieken en dienstverleners.</li>
        </ul>
        <form data-cl-form novalidate>
          <input type="text" class="llm-input" data-cl-name placeholder="Wat is je voornaam?" autocomplete="given-name" required style="margin-bottom:12px;">
          <input type="email" class="llm-input" data-cl-input placeholder="Wat is jouw beste email?" autocomplete="email" required>
          <button type="submit" class="llm-btn-primary">Stuur me de checklist</button>
          <div class="llm-error" data-cl-error></div>
          <p class="llm-note">PDF plus 5 emails verspreid over 2 weken. Uitschrijven met één klik.</p>
        </form>
      </section>

      <section class="llm-screen" data-screen="checklist-thanks">
        <div class="llm-eyebrow">Check je inbox</div>
        <h2 class="llm-title">De PDF is onderweg.</h2>
        <p class="llm-help" style="font-size: 15px; color: #FAFAF8; margin-bottom: 20px;">Kijk ook even in spam mocht hij niet binnen 5 minuten binnen zijn.</p>

        <div class="llm-result" style="border-left: 3px solid #4ADE80; margin-bottom: 14px;">
          <h2 style="font-size: 20px;">Wil je nu ook weten waar je staat?</h2>
          <p>De checklist is een DIY-tool. De 2-min check geeft je een diagnose op maat plus een schatting van wat je per maand laat liggen op tafel.</p>
          <button class="llm-cta" data-open-quiz-after-checklist>Doe de 2-min check</button>
          <p class="llm-result-sub">7 vragen, 2 minuten, gratis. Direct in dit venster.</p>
        </div>

        <div class="llm-result" style="border-left: 3px solid rgba(255,255,255,0.15);">
          <h2 style="font-size: 18px;">Liever direct een diagnose van Bryan?</h2>
          <p>De €37 audit: 12-min Loom plus PDF binnen 48 uur. Niet verplicht, wel het snelste pad als je hulp wil.</p>
          <a href="/audit/" class="llm-cta" style="background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #FAFAF8;">Lees over de audit</a>
          <p class="llm-result-sub">14 dagen geld-terug-garantie.</p>
        </div>
      </section>
    `;
  }

  function initChecklist() {
    const form = modalBodyEl.querySelector('[data-cl-form]');
    const input = modalBodyEl.querySelector('[data-cl-input]');
    const err = modalBodyEl.querySelector('[data-cl-error]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      err.textContent = '';
      const email = (input.value || '').trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!valid) { err.textContent = 'Vul een geldig e-mailadres in.'; input.focus(); return; }
      try {
        // const GHL_ENDPOINT = 'https://services.leadconnectorhq.com/hooks/...';
        // await fetch(GHL_ENDPOINT, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email, source: 'checklist-modal', timestamp: new Date().toISOString() })});
        track('checklist_optin', { email, source: 'modal' });
      } catch (e) { console.warn('Checklist submit failed', e); }
      try { localStorage.setItem('ll_checklist_optin', '1'); } catch (e) {}
      // Show thanks
      modalBodyEl.querySelectorAll('.llm-screen').forEach(s => s.classList.remove('active'));
      modalBodyEl.querySelector('[data-screen="checklist-thanks"]').classList.add('active');

      // Wire the post-checklist quiz upsell
      const quizUpsellBtn = modalBodyEl.querySelector('[data-open-quiz-after-checklist]');
      if (quizUpsellBtn) {
        quizUpsellBtn.addEventListener('click', () => {
          track('checklist_to_quiz_cta_click', { email });
          // Replace modal body with quiz, keep modal open
          modalBodyEl.innerHTML = quizMarkup();
          setCounter('', 0);
          initQuiz();
        }, { once: true });
      }
    });
  }

  function openChecklist() {
    track('checklist_modal_opened', {});
    openModal();
    modalBodyEl.innerHTML = checklistMarkup();
    setCounter('', 0);
    initChecklist();
  }

  // ====================================================================== //
  // Trigger wiring (event delegation - catches static + dynamic CTAs)       //
  // ====================================================================== //
  function bindTriggers() {
    // Skip on standalone pages so internal navigation still works.
    const path = location.pathname;
    const onCheckPage = /\/check\/?$/.test(path) || path.endsWith('/check/index.html');
    const onChecklistPage = /\/checklist(\/(bedankt\/?)?)?$/.test(path) || path.endsWith('/checklist/index.html') || path.endsWith('/checklist/bedankt/index.html');

    const isQuizTrigger = (el) => {
      if (!el) return false;
      if (el.hasAttribute && el.hasAttribute('data-open-quiz')) return true;
      const href = el.getAttribute && el.getAttribute('href');
      return href === '/check/' || href === '/check' || href === 'check/' || href === '../check/';
    };
    const isChecklistTrigger = (el) => {
      if (!el) return false;
      if (el.hasAttribute && el.hasAttribute('data-open-checklist')) return true;
      const href = el.getAttribute && el.getAttribute('href');
      return href === '/checklist/' || href === '/checklist' || href === 'checklist/' || href === '../checklist/';
    };

    document.addEventListener('click', (e) => {
      // Climb up to find the nearest <a> or <button> that's a trigger
      let el = e.target;
      while (el && el !== document.body) {
        if (isQuizTrigger(el) && !onCheckPage) {
          e.preventDefault();
          openQuiz();
          return;
        }
        if (isChecklistTrigger(el) && !onChecklistPage) {
          e.preventDefault();
          openChecklist();
          return;
        }
        el = el.parentElement;
      }
    }, true); // capture phase: beats any other handler
  }

  // ====================================================================== //
  // Exit intent                                                             //
  // ====================================================================== //
  function shouldTriggerExitIntent() {
    if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) return false;
    try { if (localStorage.getItem('ll_checklist_optin') === '1') return false; } catch (_) {}
    try { if (sessionStorage.getItem('ll_exit_shown') === '1') return false; } catch (_) {}
    if (backdropEl && backdropEl.classList.contains('open')) return false; // already in a modal
    return true;
  }

  function fireExitIntent() {
    if (!shouldTriggerExitIntent()) return;
    try { sessionStorage.setItem('ll_exit_shown', '1'); } catch (_) {}
    track('exit_intent_checklist_shown', {});
    openChecklist();
  }

  function setupExitIntent() {
    if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) return;
    let armed = false;
    setTimeout(() => { armed = true; }, 5000); // 5s grace

    // Primary: cursor leaves through the top edge of the viewport
    document.addEventListener('mouseout', (e) => {
      if (!armed) return;
      if (e.relatedTarget) return;          // cursor still inside browser
      if ((e.clientY || 0) > 50) return;    // not at top
      fireExitIntent();
    });

    // Fallback: page-hidden (tab switch / close) after grace + scroll-engagement
    document.addEventListener('visibilitychange', () => {
      if (!armed) return;
      if (document.visibilityState !== 'hidden') return;
      if ((window.scrollY || 0) < 200) return; // need some engagement
      fireExitIntent();
    });
  }

  // ====================================================================== //
  // Init                                                                    //
  // ====================================================================== //
  function init() {
    injectCSS();
    bindTriggers();
    setupExitIntent();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for manual open + testing
  window.LLModals = {
    openQuiz,
    openChecklist,
    closeModal,
    // Test helpers (handig in console)
    testExitIntent: function () {
      try { localStorage.removeItem('ll_checklist_optin'); } catch (_) {}
      try { sessionStorage.removeItem('ll_exit_shown'); } catch (_) {}
      openChecklist();
    },
    clearFlags: function () {
      try { localStorage.removeItem('ll_checklist_optin'); } catch (_) {}
      try { sessionStorage.removeItem('ll_exit_shown'); } catch (_) {}
      console.log('LL flags cleared. Wacht 5s en beweeg dan je muis naar de bovenkant van het venster.');
    }
  };
})();
