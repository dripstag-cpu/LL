// Loopt via window.llTrack (components/Analytics.astro). Die filtert de
// persoonsgegevens eruit en stuurt de rest door naar Umami.
function track(eventName, payload) {
  try {
    if (window.llTrack) window.llTrack(eventName, payload);
  } catch (e) {}
}

document.addEventListener('DOMContentLoaded', () => {
  track('page_view', { page: 'checklist' });
});

const form = document.getElementById('checklistForm');
const nameInput = document.getElementById('nameInput');
const input = document.getElementById('emailInput');
const consentInput = document.getElementById('consentInput');
const submitBtn = document.getElementById('checklistSubmit');
const err = document.getElementById('emailError');

const emailOk = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((input.value || '').trim());
function validate() {
  submitBtn.disabled = !((nameInput.value || '').trim() && emailOk() && consentInput.checked);
}
nameInput.addEventListener('input', validate);
input.addEventListener('input', validate);
consentInput.addEventListener('change', validate);
validate();

// Eén keer vuren zodra iemand echt begint te typen. Samen met checklist_optin
// laat dit zien hoeveel mensen starten en alsnog afhaken.
let formGestart = false;
function markeerStart() {
  if (formGestart) return;
  formGestart = true;
  track('form_start', { source: 'checklist' });
}
nameInput.addEventListener('input', markeerStart, { once: true });
input.addEventListener('input', markeerStart, { once: true });

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  err.textContent = '';
  const name = (nameInput.value || '').trim();
  if (!name) {
    err.textContent = 'Vul je voornaam in.';
    nameInput.focus();
    return;
  }
  const email = (input.value || '').trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!valid) {
    err.textContent = 'Vul een geldig e-mailadres in.';
    input.focus();
    return;
  }
  if (!consentInput.checked) {
    err.textContent = 'Vink de toestemming aan.';
    return;
  }
  // Inbound-webhook van de GHL-workflow "Checklist aanvraag". window.LL.velden()
  // levert attributie, fbp/fbc en de consent-status; die reizen mee zodat de
  // Conversion API-actie in GHL op marketing_consent kan filteren.
  const GHL_ENDPOINT = 'https://services.leadconnectorhq.com/hooks/agbm4h41aVGOzDyuSc16/webhook-trigger/48006a0d-16d1-486c-ab2f-d8b3613d6b4e';
  try {
    const velden = (window.LL && window.LL.velden) ? window.LL.velden() : {};
    await fetch(GHL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.assign({}, velden, {
        formulier: 'checklist-aanvraag',
        voornaam: name,
        email: email.toLowerCase(),
        optin_checklist: 'ja'
      }))
    });
    track('checklist_optin', { source: 'checklist' });
  } catch (e) {
    console.warn('Submit failed:', e);
  }
  window.location.href = '/checklist/bedankt/';
});