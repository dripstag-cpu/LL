// Hulpfuncties voor de <title> en <meta name="description"> van de gegenereerde
// pagina's. Doel: titels onder de 60 tekens en descriptions van 150 tot 160
// tekens die op een hele zin of een heel woord eindigen, nooit midden in een woord.

const SENTENCE_END = /[.!?]/;

// Is de punt op index i een echt zinseinde, of hoort hij bij een afkorting of getal?
function isSentenceBoundary(text, i) {
  const after = text.slice(i + 1);
  if (after.trim() === '') return true;
  if (!/^\s/.test(after)) return false; // "5.000" of "bijv.iets"
  const next = after.trimStart().charAt(0);
  return next === next.toUpperCase() && next !== next.toLowerCase();
}

/**
 * Kap `text` af op de laatste zinsgrens binnen `max`. Levert die minder dan
 * `min` tekens op, dan valt hij terug op de laatste woordgrens binnen `max`,
 * met een beletselteken zodat zichtbaar is dat de zin doorloopt.
 */
export function metaDescription(text, { min = 150, max = 160 } = {}) {
  const clean = String(text).replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;

  let boundary = -1;
  for (let i = 0; i < max && i < clean.length; i++) {
    if (SENTENCE_END.test(clean[i]) && isSentenceBoundary(clean, i)) boundary = i;
  }
  if (boundary >= min - 1) return clean.slice(0, boundary + 1);

  // Anders op een woordgrens, nooit midden in een woord. Eerst de langste
  // prefix waar het beletselteken nog bij past; wordt die te kort, dan de
  // langste prefix die op zichzelf binnen `max` valt.
  const opWoordgrens = (ruimte) => {
    const venster = clean.slice(0, ruimte + 1);
    const laatsteSpatie = venster.lastIndexOf(' ');
    return clean
      .slice(0, laatsteSpatie > 0 ? laatsteSpatie : ruimte)
      .replace(/[\s,;:.!?-]+$/, '');
  };

  const metTeken = `${opWoordgrens(max - 1)}…`;
  return metTeken.length >= min ? metTeken : opWoordgrens(max);
}

/**
 * Titel van een pagina: het handgeschreven `metaTitle` wint, anders de
 * standaardconstructie met de merknaam erachter.
 */
export function pageTitle(item, brand = 'Local Levers') {
  return item.metaTitle || `${item.h1} | ${brand}`;
}
