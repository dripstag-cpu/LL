function track(eventName, payload) {
  try {
    if (window.dataLayer) window.dataLayer.push({ event: eventName, ...payload });
    console.log('[track]', eventName, payload || {});
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
  try {
    // const GHL_ENDPOINT = 'https://services.leadconnectorhq.com/hooks/...';
    // await fetch(GHL_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, source: 'checklist' }) });
    track('checklist_optin', { name, email });
  } catch (e) {
    console.warn('Submit failed:', e);
  }
  window.location.href = '/checklist/bedankt/';
});