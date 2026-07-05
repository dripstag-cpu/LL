// ====================================================================== //
// Quiz state                                                              //
// ====================================================================== //
const state = {
  answers: {},   // q1/q4/q5/q6: { value, label, points, disqualify }
  bedrijf: '', plaats: '', winstdienst: '', voornaam: '', email: '', consent: false,
  current: 'intro',
  resultRevealed: false,  // HARD GATE
  category: null
};

const QUIZ_SCREENS = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'];
const STEPS = QUIZ_SCREENS.length;

function priorityScore() {
  return Object.values(state.answers).reduce((s, a) => s + ((a && a.points) || 0), 0);
}

// ====================================================================== //
// Tracking stubs                                                          //
// ====================================================================== //
function track(eventName, payload) {
  try {
    if (window.dataLayer) window.dataLayer.push({ event: eventName, ...payload });
    console.log('[track]', eventName, payload || {});
  } catch (e) {}
}

// ====================================================================== //
// Screen navigation                                                       //
// ====================================================================== //
function showScreen(key) {
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  const el = document.getElementById('screen' + key);
  if (el) {
    el.classList.add('active');
    state.current = key;
    window.scrollTo({ top: 0, behavior: 'instant' });
    updateProgress(key);
  }
}

function updateProgress(key) {
  const counter = document.getElementById('quizCounter');
  const fill = document.getElementById('progressFill');
  if (QUIZ_SCREENS.includes(key)) {
    const idx = QUIZ_SCREENS.indexOf(key) + 1;
    counter.textContent = `${idx} / ${STEPS}`;
    fill.style.width = `${(idx / STEPS) * 100}%`;
  } else if (key.startsWith('Result')) {
    counter.textContent = 'klaar';
    fill.style.width = '100%';
  } else {
    counter.textContent = '';
    fill.style.width = '0%';
  }
}

function nextQuestion(currentQ) {
  const num = parseInt(currentQ, 10);
  if (num < STEPS) {
    showScreen('Q' + (num + 1));
  } else {
    revealResult();
  }
}

function getZoekterm() {
  const w = state.winstdienst || '';
  const p = state.plaats || '';
  if (!w) return p;
  return p ? (w + ' ' + p) : w;
}

// ====================================================================== //
// Option groups (radio, auto-advance)                                     //
// ====================================================================== //
function selectOption(group, btn) {
  const q = group.dataset.question;
  group.querySelectorAll('.option').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  const value = btn.dataset.value;
  state.answers[q] = { value: value, label: btn.textContent.trim(), points: parseInt(btn.dataset.points, 10) || 0, disqualify: btn.dataset.disqualify === 'true' };
  track('quiz_question_' + q.slice(1) + '_answered', { value: value });
  if (btn.dataset.disqualify === 'true') { state.category = 'UNQUALIFIED'; setTimeout(revealResult, 320); return; }
  if (q === 'q6') {
    const wrap = document.getElementById('q6-anders-wrap');
    if (value === 'anders') {
      if (wrap) { wrap.style.display = 'block'; const inp = document.getElementById('q6-anders-input'); if (inp) inp.focus(); }
      return;
    }
    if (wrap) wrap.style.display = 'none';
  }
  setTimeout(() => nextQuestion(q.slice(1)), 320);
}

function wireGroup(group) {
  group.querySelectorAll('.option').forEach(btn => {
    btn.addEventListener('click', () => selectOption(group, btn));
  });
}

document.querySelectorAll('.options').forEach(wireGroup);

// ====================================================================== //
// Q2: bedrijfsnaam + plaats                                               //
// ====================================================================== //
(function () {
  const bedrijf = document.getElementById('q2-bedrijf');
  const plaats = document.getElementById('q2-plaats');
  const btn = document.getElementById('q2-next');
  const validate = () => { btn.disabled = !((bedrijf.value || '').trim() && (plaats.value || '').trim()); };
  bedrijf.addEventListener('input', validate);
  plaats.addEventListener('input', validate);
  btn.addEventListener('click', () => {
    if (!(bedrijf.value || '').trim() || !(plaats.value || '').trim()) return;
    state.bedrijf = bedrijf.value.trim();
    state.plaats = plaats.value.trim();
    state.answers.q2 = { bedrijf: state.bedrijf, plaats: state.plaats };
    track('quiz_question_2_answered', { bedrijf: state.bedrijf, plaats: state.plaats });
    nextQuestion('2');
  });
  validate();
})();

// ====================================================================== //
// Q3: winstdienst (vrij tekstveld)                                        //
// ====================================================================== //
(function () {
  const input = document.getElementById('q3-input');
  const btn = document.getElementById('q3-next');
  const validate = () => { btn.disabled = !(input.value || '').trim(); };
  input.addEventListener('input', validate);
  btn.addEventListener('click', () => {
    const v = (input.value || '').trim(); if (!v) return;
    state.winstdienst = v;
    state.answers.q3 = { value: v, label: v };
    track('quiz_question_3_answered', { winstdienst: v, zoekterm: getZoekterm() });
    nextQuestion('3');
  });
  validate();
})();

// ====================================================================== //
// Q6: frustratie "Anders" tekstveld                                       //
// ====================================================================== //
(function () {
  const input = document.getElementById('q6-anders-input');
  const btn = document.getElementById('q6-next');
  if (!input || !btn) return;
  input.addEventListener('input', () => { btn.disabled = !(input.value || '').trim(); });
  btn.addEventListener('click', () => {
    const t = (input.value || '').trim(); if (!t) return;
    state.answers.q6 = { value: 'anders', label: 'Anders', text: t, points: 0, disqualify: false };
    track('quiz_question_6_answered', { value: 'anders' });
    nextQuestion('6');
  });
})();

// ====================================================================== //
// Intro                                                                   //
// ====================================================================== //
document.getElementById('startBtn').addEventListener('click', () => {
  track('quiz_started', {});
  showScreen('Q1');
});

// ====================================================================== //
// Result routing                                                          //
// ====================================================================== //
function renderQualified() {
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('rqVoornaam', state.voornaam);
  set('rqBedrijf', state.bedrijf);
  set('rqPlaats', state.plaats);
  set('rqPlaats2', state.plaats);
  set('rqWinstdienst', (state.answers.q3 && state.answers.q3.label) || '');
}

function revealResult() {
  state.resultRevealed = true;
  if (state.category !== 'UNQUALIFIED') state.category = 'QUALIFIED';
  if (state.category === 'QUALIFIED') {
    renderQualified();
    showScreen('ResultQualified');
  } else {
    showScreen('ResultUnqualified');
  }
  track('quiz_result_shown', { category: state.category });

  document.querySelectorAll('[data-result-cta]').forEach(el => {
    el.addEventListener('click', () => {
      track('quiz_result_cta_click', { category: state.category, target: el.dataset.resultCta });
    }, { once: true });
  });
}

// ====================================================================== //
// Q7: contact + consent (HARD GATE)                                       //
// ====================================================================== //
const contactForm = document.getElementById('contactForm');
const voornaamInput = document.getElementById('voornaamInput');
const emailInput = document.getElementById('emailInput');
const consentInput = document.getElementById('consentInput');
const contactSubmit = document.getElementById('contactSubmit');
const emailError = document.getElementById('emailError');

const emailValid = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((emailInput.value || '').trim());
function validateContact() {
  contactSubmit.disabled = !((voornaamInput.value || '').trim() && emailValid() && consentInput.checked);
}
voornaamInput.addEventListener('input', validateContact);
emailInput.addEventListener('input', validateContact);
consentInput.addEventListener('change', validateContact);
validateContact();

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  emailError.textContent = '';
  if (!(voornaamInput.value || '').trim()) { emailError.textContent = 'Vul je voornaam in.'; voornaamInput.focus(); return; }
  if (!emailValid()) { emailError.textContent = 'Vul een geldig e-mailadres in.'; emailInput.focus(); return; }
  if (!consentInput.checked) { emailError.textContent = 'Vink de toestemming aan.'; return; }

  state.voornaam = voornaamInput.value.trim();
  state.email = emailInput.value.trim();
  state.consent = true;

  const payload = {
    voornaam: state.voornaam,
    email: state.email,
    type: state.answers.q1 && state.answers.q1.value,
    bedrijf: state.bedrijf,
    plaats: state.plaats,
    winstdienst: state.answers.q3 && state.answers.q3.label,
    zoekterm: getZoekterm(),
    aov: state.answers.q4 && state.answers.q4.value,
    timing: state.answers.q5 && state.answers.q5.value,
    prioriteit: priorityScore(),
    frustratie: state.answers.q6 && (state.answers.q6.text || state.answers.q6.label),
    consent: true,
    source: 'check',
    timestamp: new Date().toISOString()
  };

  try {
    // const GHL_ENDPOINT = 'https://services.leadconnectorhq.com/hooks/...';
    // await fetch(GHL_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    track('quiz_email_submitted', { category: 'QUALIFIED', zoekterm: payload.zoekterm, timing: payload.timing, prioriteit: payload.prioriteit });
  } catch (err) {
    console.warn('Quiz submit failed:', err);
  }

  revealResult();
});

// ====================================================================== //
// Hard gate enforcement                                                    //
// ====================================================================== //
window.addEventListener('load', () => {
  const activeId = document.querySelector('.screen.active')?.id || '';
  if (activeId.startsWith('screenResult') && !state.resultRevealed) {
    showScreen('intro');
  }
  track('page_view', { page: 'check' });
});