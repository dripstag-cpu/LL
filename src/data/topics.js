// Aggregator + rollout-controle voor de gids/kennisbank-pagina's.
//
// BELANGRIJK: alleen batches die in RELEASED_BATCHES staan worden gebouwd en
// komen in de sitemap. Wat hier niet vrijgegeven is, bestaat wel als bestand
// maar gaat NIET live. Zo klopt de sitemap altijd met wat echt online staat.
import { topics as core } from './topics/core.js';
import { topics as maps } from './topics/maps.js';
import { topics as gbp } from './topics/gbp.js';
import { topics as reviews } from './topics/reviews.js';
import { topics as aiDirectories } from './topics/ai-directories.js';
import { topics as decision } from './topics/decision.js';

// Elke batch met zijn weergavegroep in de kennisbank. Volgorde = volgorde op de hub.
const BATCHES = [
  { key: 'maps', group: 'Google Maps en lokale ranking', items: maps },
  { key: 'gbp', group: 'Je Google Bedrijfsprofiel', items: gbp },
  { key: 'reviews', group: 'Reviews en reputatie', items: reviews },
  { key: 'ai-directories', group: 'AI-zoekmachines en directories', items: aiDirectories },
  { key: 'decision', group: 'Kiezen en opvolgen', items: decision },
  { key: 'core', group: 'Veelgestelde vragen', items: core },
];

// ====== ROLLOUT-SCHAKELAAR ======
// Voeg per publicatie-ronde een batch-key toe om die live te zetten.
// Mogelijke keys: 'core', 'maps', 'gbp', 'reviews', 'ai-directories', 'decision'.
// Bij launch staat alleen 'core' live (de 6 sterkste gidsen). Rebuild + redeploy na elke wijziging.
export const RELEASED_BATCHES = ['core'];
// ================================

const seen = new Set();
export const topics = BATCHES.flatMap(({ key, group, items }) =>
  items
    .filter((t) => RELEASED_BATCHES.includes(key) && t.published !== false)
    .map((t) => ({ ...t, group })),
).filter((t) => {
  if (seen.has(t.slug)) return false;
  seen.add(t.slug);
  return true;
});

// Groepen voor de kennisbank-hub (alleen groepen die live pagina's hebben).
export const groups = BATCHES.map(({ group }) => ({
  title: group,
  items: topics.filter((t) => t.group === group),
})).filter((g) => g.items.length > 0);
