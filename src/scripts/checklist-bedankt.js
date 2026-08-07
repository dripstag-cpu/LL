// Loopt via window.llTrack (components/Analytics.astro). Die filtert de
// persoonsgegevens eruit en stuurt de rest door naar Umami.
function track(eventName, payload) {
  try {
    if (window.llTrack) window.llTrack(eventName, payload);
  } catch (e) {}
}
document.addEventListener('DOMContentLoaded', () => { track('page_view', { page: 'checklist_thanks' }); });