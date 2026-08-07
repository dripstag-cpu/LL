import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://locallevers.com',
  // Oude/dode funnels naar de ene werkende voordeur sturen (2026-08-07):
  // /check (gratis vindbaarheids-rapport, webhook nooit gekoppeld) en
  // /audit (dode 37-euro-funnel) leiden nu naar de gratis sprint.
  redirects: {
    '/check': '/sprint',
    '/check/resultaat': '/sprint',
    '/audit': '/sprint',
  },
  integrations: [
    sitemap({
      // De /sprint/-landingspagina is een statisch bestand in public/, dus de
      // sitemap-integratie pakt 'm niet automatisch op. Handmatig toevoegen.
      // De bedankt-/quizpagina blijft er bewust buiten (noindex-funnel).
      customPages: ['https://locallevers.com/sprint/'],
      // Houd funnel-, bedankt- en redirect-pagina's uit de sitemap.
      filter: (page) =>
        !['/check/', '/check/resultaat/', '/audit/', '/checklist/bedankt/'].includes(
          new URL(page).pathname,
        ),
    }),
  ],
  build: {
    // Inline alle CSS in de HTML zodat er geen render-blocking CSS-request is
    // (sneller First Contentful Paint / Speed Index op mobiel).
    inlineStylesheets: 'always',
  },
  compressHTML: true,
});
