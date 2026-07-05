// === Tracking event stubs ===
function track(eventName, payload) {
  // Replace with real Pixel/GA4 calls during launch.
  try {
    if (window.dataLayer) window.dataLayer.push({ event: eventName, ...payload });
    console.log('[track]', eventName, payload || {});
  } catch (e) {}
}

document.addEventListener('DOMContentLoaded', () => {
  track('page_view', { page: 'audit' });

  // Audit CTA click tracking
  document.querySelectorAll('a[data-cta]').forEach(el => {
    el.addEventListener('click', () => {
      track('audit_cta_click', { position: el.dataset.cta });
    });
  });

  // FAQ open tracking
  document.querySelectorAll('details.faq-item').forEach(el => {
    el.addEventListener('toggle', () => {
      if (el.open) {
        const q = el.querySelector('summary')?.textContent?.trim() || '';
        track('faq_open', { question: q });
      }
    });
  });

  // Sticky badge: show after hero scrolled past
  const badge = document.getElementById('stickyBadge');
  const hero = document.querySelector('.hero');
  if (badge && hero) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) badge.classList.remove('show');
      else badge.classList.add('show');
    }, { threshold: 0, rootMargin: '-100px 0px 0px 0px' });
    observer.observe(hero);
  }
});