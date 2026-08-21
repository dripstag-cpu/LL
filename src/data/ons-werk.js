// Data voor de galerij op /ons-werk/, herschreven 2026-08-17 (avond).
//
// De galerij toont per kaart vier apparaten op een vlakke kleur: monitor
// midden-achter, tablet linksvoor met de telefoon ervoor, laptop rechtsvoor.
// Dezelfde opstelling als de werk-pagina van het voorbeeld dat we aanhouden.
// Alleen beelden, geen uitleg.
//
// Eerst twee ontwerpen van ons eigen website-sjabloon, ingevuld voor de twee
// doelgroepen (een kliniek en een lokale dienstverlener, fictieve bedrijven).
// Daarna echte sites die Bryan gebouwd heeft, aangeleverd op 2026-08-17.
//
// De beelden staan in public/img/ons-werk/ (1600x1000, jpg) en zijn gemaakt
// met Playwright: schermafdruk van de site op 1440x900, 768x1024 en 390x844,
// daarna in de apparaten gezet. Laptop en telefoon zijn de frames uit
// public/img/mockups/ met de scherm-insets uit global.css; monitor en tablet
// zijn getekende bezels in dezelfde stijl. De hele pijplijn, inclusief de
// bron-HTML van de twee ontwerp-kaarten, staat in scripts/ons-werk-mockups/
// in de projectroot (niet in git), met een leesmij.
//
// Regels voor wie dit aanpast:
//   1. Echte sites alleen als wij ze zelf gebouwd hebben, aangeleverd door
//      Bryan. Het akkoord per bedrijf regelt Bryan.
//   2. Ontwerp-kaarten gebruiken fictieve bedrijven, nooit een echte naam,
//      en de steden variëren bewust (Bryan, 2026-08-17): de kliniek zit in
//      Utrecht, het installatiebedrijf in Amersfoort.
//   3. Alt-tekst zegt wat je ziet, zonder claims of cijfers.
//   4. dutchpadelschool.nl hoort ook in dit rijtje maar was op 2026-08-17
//      onbereikbaar (verbinding komt niet tot stand, ook niet via www of
//      http; DNS wijst wel gewoon naar 178.251.232.170). Toevoegen zodra de
//      site weer online staat.

export const galerij = [
  {
    naam: 'Eemhof Installatie (ontwerp)',
    beeld: '/img/ons-werk/demo-installatie.jpg',
    alt: 'Website-ontwerp voor een installatiebedrijf, op monitor, laptop, tablet en telefoon',
  },
  {
    naam: 'Van Dijk Schilderwerken, Woerden (ontwerp)',
    beeld: '/img/ons-werk/demo-schilder.jpg',
    alt: 'Website-ontwerp voor een schildersbedrijf in Woerden, op monitor, laptop, tablet en telefoon',
  },
  {
    naam: 'Dutch Padel',
    beeld: '/img/ons-werk/dutchpadel.jpg',
    alt: 'Website van Dutch Padel op monitor, laptop, tablet en telefoon',
  },
  {
    naam: 'BOB Detachering',
    beeld: '/img/ons-werk/bobdetachering.jpg',
    alt: 'Website van BOB Detachering op monitor, laptop, tablet en telefoon',
  },
  {
    naam: 'Amigo Grill',
    beeld: '/img/ons-werk/amigogrill.jpg',
    alt: 'Website van Amigo Grill op monitor, laptop, tablet en telefoon',
  },
  {
    naam: 'Café Brakke',
    beeld: '/img/ons-werk/cafebrakke.jpg',
    alt: 'Website van Café Brakke op monitor, laptop, tablet en telefoon',
  },
  {
    naam: 'Mosaic Amsterdam',
    beeld: '/img/ons-werk/mosaic.jpg',
    alt: 'Website van restaurant Mosaic Amsterdam op monitor, laptop, tablet en telefoon',
  },
];
