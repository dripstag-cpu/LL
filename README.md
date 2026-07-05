# Local Levers website

Astro static site voor Local Levers. Vindbaarheid en opvolging voor klinieken en behandel-salons.

## Ontwikkelen

```bash
npm install
npm run dev      # lokale dev-server
npm run build    # productie-build naar dist/
npm run preview  # dist/ lokaal serveren
```

## Structuur

- `src/pages/` — routes. `index.astro` (home), `marketing/[niche].astro` (branche-pagina's), `gids/[topic].astro` (kennisbank), plus funnel (`check`, `audit`, `checklist`) en juridisch (`privacy`, `cookies`, `voorwaarden`) en `404.astro`.
- `src/data/` — content-data. `niches.js` (branches) en `topics.js` (aggregator kennisbank) + `topics/*.js` (gids-batches).
- `src/layouts/` — `Layout.astro` (home) en `Bare.astro` (funnel/juridisch/404).
- `src/components/CookieConsent.astro` — consent-banner met gated Meta-pixel. Staat standaard UIT (niet gemount). Aanzetten door in beide layouts `<CookieConsent />` te plaatsen en de Pixel ID in de component in te vullen.

## Gefaseerde uitrol van de kennisbank

`src/data/topics.js` bepaalt via `RELEASED_BATCHES` welke gids-batches live staan (in de build en de sitemap). Bij launch staat alleen `core` live. Voeg per ronde een batch-key toe (`maps`, `gbp`, `reviews`, `ai-directories`, `decision`), rebuild en redeploy.

## Nog te koppelen

De formulieren op `/check` (quiz) en `/checklist` posten nu naar een stub. De GHL-webhooks moeten nog gekoppeld worden.
