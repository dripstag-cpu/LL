function track(eventName, payload) {
  try {
    if (window.dataLayer) window.dataLayer.push({ event: eventName, ...payload });
    console.log('[track]', eventName, payload || {});
  } catch (e) {}
}
document.addEventListener('DOMContentLoaded', () => { track('page_view', { page: 'checklist_thanks' }); });