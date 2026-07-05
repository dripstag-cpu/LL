import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://locallevers.com',
  integrations: [
    sitemap({
      // Houd funnel-, bedankt- en redirect-pagina's uit de sitemap (noindex).
      filter: (page) =>
        !['/check/resultaat/', '/audit/', '/checklist/bedankt/'].includes(
          new URL(page).pathname,
        ),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
