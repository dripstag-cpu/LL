import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://locallevers.com',
  // Oude/dode funnels naar de ene werkende voordeur sturen. Sinds het
  // totaalpakket (doc 49, 2026-08-16) is dat /gesprek/: /check (dood
  // vindbaarheids-rapport, webhook nooit gekoppeld) en /audit (dode
  // 37-euro-funnel). /sprint/ en /checklist/ zijn zelf doorverwijspagina's
  // geworden, want daar loopt nog verkeer op.
  // Branches met te lage klantwaarde geschrapt (2026-08-16): /marketing/kappers
  // en /marketing/barbershops stonden live en zijn geindexeerd, dus ze gaan
  // naar de branche-hub in plaats van naar een 404.
  // Gids-samenvoeging (2026-08-16): /gids/vindbaar-in-chatgpt-als-kliniek/ dekte
  // hetzelfde onderwerp als /gids/ai-vindbaarheid-voor-klinieken/ en concurreerde
  // ermee. De pagina stond live, dus hij redirect naar de samengevoegde versie.
  
  integrations: [
    sitemap({
      // Houd bedankt- en doorverwijspagina's uit de sitemap, plus de pagina's die
      // op noindex staan: /marketing/kappers/ en /marketing/barbershops/ zijn
      // geschrapte branches die alleen nog doorverwijzen, de kliniek-gids is
      // samengevoegd en /gesprek/plannen/ is de stap na het formulier. /gesprek/ hoort er
      // juist WEL in: dat is de enige pagina met de prijs erop, en de hele
      // positionering is dat die prijs publiek is. Elke branche- en gids-pagina
      // stuurt zijn CTA daarheen.
      filter: (page) =>
        ![
          '/check/',
          '/check/resultaat/',
          '/audit/',
          '/checklist/',
          '/checklist/bedankt/',
          '/marketing/kappers/',
          '/marketing/barbershops/',
          '/gids/vindbaar-in-chatgpt-als-kliniek/',
          '/gesprek/plannen/',
        ].includes(new URL(page).pathname),
    }),
  ],
  build: {
    // Inline alle CSS in de HTML zodat er geen render-blocking CSS-request is
    // (sneller First Contentful Paint / Speed Index op mobiel).
    inlineStylesheets: 'always',
  },
  compressHTML: true,
});
