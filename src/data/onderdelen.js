// Onderdeel-pagina's van het pakket (doc 49), toegevoegd 2026-08-16.
// Uitgebreid naar negen onderdelen op 2026-08-17, gelijk aan de negen die op de
// homepage staan. Campagnes Met Één Klik kwam er als laatste bij.
//
// Waarom deze pagina's bestaan: "marketing voor [branche]" is bezet door
// gespecialiseerde bureaus, terwijl de probleem-termen (hoger in Google Maps,
// meer reviews, gemiste oproep) alleen door blogartikelen bezet worden. Elk
// onderdeel van het pakket krijgt daarom een eigen pagina die op die term
// gericht is. De prijs en de voorwaarden staan op /prijs/, hier niet.
//
// DE VOLGORDE IS DIE VAN DE HOMEPAGE, dus die van de .section-ob-blokken in
// src/home-body.html. /wat-we-doen/ nummert ze uit deze lijst, dus loopt de
// nummering daar gelijk met de volgorde waarin je ze op de homepage tegenkomt.
// Hij was hier uit de pas gelopen en is op 2026-08-17 weer gelijkgetrokken.
// Verandert de volgorde op de homepage, dan verandert hij hier mee.
//
// PRODUCTNAMEN, 2026-08-17. Ze heetten "De website", "Het review-systeem", "De
// chat op je site": omschrijvingen, geen namen. Ze hebben nu een naam, zodat er
// naar een ding verwezen kan worden in plaats van naar een categorie. De slugs
// zijn expres níét meegewijzigd, want daar hangen alle links aan.
//
// VASTE OPBOUW PER PAGINA (2026-08-17, gelijkgetrokken met het voorbeeld dat we
// aanhouden, zie doc 51):
//   1. H1 met de productnaam, groot en gecentreerd
//   2. `regel`, de cursieve regel met de klap erin, en de knop
//   3. de demo met `voorbeeld` erin
//   4. "Wat is <naam>?" met `wat` in gewone taal
//   5. vier voordeelblokken uit `blokken`
//   6. klaar, de vaste staart komt uit SiteFooter.astro
//
// `regel` en de koppen in `blokken` zijn gelijk aan de .section-ob-blokken in
// src/home-body.html. Daar staat de korte versie, hier de lange, precies zoals
// bij het voorbeeld dat we aanhouden. Wijzigt een naam of een kop op de
// homepage, dan wijzigt hij hier mee.
//
// Het veld `grens` bestaat niet meer. Losse diensten staan er positief bij
// onder de vier voordelen, en dat blok kent het voorbeeld niet. De grens staat
// nu in de laatste alinea van `wat`, want daar hoort hij: dat is de uitleg.
//
// DOELGROEP (gekanteld 2026-08-18, zie doc 53). Lokale dienstverleners, de
// vaklui rond het huis. Geen kliniek- of salontaal: een installateur heeft
// geen behandelingen maar klussen en offertes. De voorbeelden wisselen bewust
// over de vakken (installateur, loodgieter, elektricien, schilder, dakdekker,
// hovenier), zodat niemand zich er buiten leest.
//
// TOON. Maatstaf is src/home-body.html: de .section-ob-blokken en de FAQ.
// Begin bij het ongemakkelijke moment, niet bij de functie. Spreektaal, korte
// zinnen, droog. Geen nette marketingtaal. En niets over dat we net begonnen
// zijn: gewoon opschrijven wat het systeem doet.
//
// `voorbeeld.soort` bepaalt hoe het voorbeeld getekend wordt in
// [onderdeel].astro: 'gesprek' (berichten), 'meting' (raster met legenda),
// 'pagina' (opbouw van een webpagina) of 'lijst' (regels onder elkaar, zoals
// een postvak of een gesprekkenlijst).
//
// `sub` (2026-08-17, avond) is de korte regel onder de naam in het
// uitklapmenu, zoals het voorbeeld dat onder elke productnaam heeft. Eén
// regel, zegt wat het ding doet, geen claim en geen cijfer.
//
// `secties` (2026-08-17, avond) is de nieuwe opbouw van de productpagina's,
// naar de feature-pagina's van het voorbeeld (doc 51b): benoemde
// werking-secties met elk een kop en een paar alinea's, in plaats van
// "Wat is X" plus vier voordeelblokken. Een onderdeel mét `secties` gebruikt
// de nieuwe vorm; de rest valt terug op de oude tot hij is omgezet. De
// werking komt altijd uit doc 49 en de SOP's, nooit uit het hoofd.

export const onderdelen = [
  {
    slug: 'website',
    feiten: [
      { k: 'Een pagina per dienst', t: 'Daar wordt apart op gezocht, dus daar word je apart op gevonden.' },
      { k: 'Je beste reviews op elke pagina', t: 'Actueel gehouden, zonder dat je ernaar om hoeft te kijken.' },
      { k: 'Een aanvraag wordt een gesprek', t: 'Het formulier start WhatsApp, geen mailtje dat blijft liggen.' },
    ],
    naam: 'Functionele Website',
    sub: 'Een site die van bezoekers aanvragen maakt',
    kort: 'Een site met hosting die van een bezoeker een gesprek maakt, inbegrepen zolang je klant bent.',
    regel:
      'Iemand zoekt je op na een aanrader van de buurman en vindt een site die al drie jaar hetzelfde zegt. Wij bouwen er een die van dat bezoek een gesprek maakt, met hosting inbegrepen zolang je klant bent.',
    title: 'Functionele Website: een site die aanvragen oppakt | Local Levers',
    description:
      'Een website met hosting en een pagina per dienst, met je beste reviews op elke pagina en formulieren die een gesprek in WhatsApp starten.',
    wat: [
      'Een website is geen folder die in de kast ligt te wachten. Het is de plek waar iemand binnen een paar tellen besluit of hij belt, of doorscrollt naar het volgende bedrijf op zijn lijstje.',
      'Functionele Website is de site die wij bouwen, hosten en bijhouden. Een eigen pagina per dienst die je aanbiedt, je beste reviews in beeld op elke pagina, en een formulier dat geen mailtje stuurt maar meteen een gesprek in WhatsApp opent.',
      'Hij zit in het maandbedrag: geen bouwkosten vooraf en niets om zelf te installeren. Heb je al een site waar je blij mee bent, dan blijft die staan en bouwen we het systeem eromheen. Een aanvraag komt binnen, er gaat meteen een reactie terug, en de vervolgstap, een offerte, het scopen van de klus of een moment om langs te komen, wordt vanuit hetzelfde gesprek geregeld.',
    ],
    blokken: [
      {
        h: 'Gevonden op wat je doet, niet alleen op je naam',
        p: 'Wie een cv-ketel zoekt typt zelden je bedrijfsnaam in, hij typt wat hij nodig heeft. De site wordt opgebouwd op precies die woorden, en zo dat Google, Bing en Apple hem alle drie kunnen lezen.',
      },
      {
        h: 'Je beste reviews doen het werk',
        p: 'Onder je reviews zitten er altijd een paar die niet je sterkste zijn. Die hoeft een nieuwe klant niet als eerste te lezen. Je beste voorbeelden lopen mee op elke pagina en blijven vanzelf actueel.',
      },
      {
        h: 'Gebouwd voor een duim, niet voor een muis',
        p: 'Je klant kijkt met één hand, staand in de rij bij de bouwmarkt, op een wisselend netwerk. Daar moet de site het doen, niet op jouw grote scherm thuis met snel wifi.',
      },
      {
        h: 'Een aanvraag is geen mailtje dat kan wachten',
        p: 'Mail belandt in een postvak waar je vanavond wel even doorheen scrolt. Hier opent een aanvraag meteen een gesprek in WhatsApp, met het eerste antwoord al onderweg voordat jij je telefoon oppakt.',
      },
    ],
    voorbeeld: {
      soort: 'pagina',
      kop: 'Zo is een dienstpagina opgebouwd',
      label: 'Pagina voor één dienst',
      onderdelenlijst: [
        { blok: 'kop', tekst: 'Wat je doet en voor wie het is' },
        { blok: 'knop', tekst: 'Maak een afspraak, gaat naar het systeem dat je al draait' },
        { blok: 'tekst', tekst: 'Wat het inhoudt, hoe lang het duurt, wat mensen vooraf vragen' },
        { blok: 'reviews', tekst: 'Je beste reviews, actueel gehouden' },
        { blok: 'formulier', tekst: 'Aanvraag start een gesprek in WhatsApp' },
        { blok: 'chat', tekst: 'De chat staat rechtsonder mee te kijken' },
      ],
      onder:
        'Hierboven staat de opbouw, de inhoud is van jouw bedrijf. Elke dienst krijgt zo zijn eigen pagina: een installatiebedrijf krijgt er een voor cv-ketels en een voor warmtepompen, want daar wordt apart op gezocht.',
    },
  },
  {
    slug: 'reviews',
    feiten: [
      { k: 'Kritiek komt eerst bij jou', t: 'Met naam en nummer, zodat je kunt bellen en oplossen. De reviewlink staat er nog steeds bij.' },
      { k: 'Vier tot vijf herinneringen', t: 'Verspreid over vier weken, met ongeveer een week ertussen.' },
      { k: 'Elke review beantwoord', t: 'Binnen twee dagen, persoonlijk en in jouw naam.' },
    ],
    naam: 'Reviewtrechter',
    sub: 'Meer echte reviews, kritiek eerst bij jou',
    secties: [
      {
        h: 'Eerst feedback, dan de review',
        p: [
          'Elke klant die je hebt geholpen krijgt achteraf één simpele vraag, via WhatsApp of mail, op het kanaal waar hij toch al met je zit. Ging het goed, dan volgt meteen de link naar je profiel. Was er iets niet naar wens, dan komt dat eerst bij jou terecht, met naam en nummer erbij, zodat jij het als eerste hoort en het kunt rechtzetten. De link naar je profiel staat ook op dat formulier, dus de klant houdt zelf de keuze om er publiek iets over te schrijven.',
          'Geen trucje. Een eerlijke vraag, op het moment dat de klus nog vers zit.',
        ],
      },
      {
        h: 'Vriendelijke herinneringen',
        p: [
          'Je klant meende het toen hij zei dat hij nog een review zou zetten. En dan komt er een wasmachine kapot, een verjaardag, gewoon een maandag, en het schiet erbij in. Daarom herinneren we hem er vier tot vijf keer aan binnen vier weken, in jouw naam en op jouw toon. Lang genoeg om het er nog van te laten komen, rustig genoeg om niemand op de kast te jagen.',
        ],
      },
      {
        h: 'Eén klik per klant',
        p: [
          'Zelf achter iedereen aanbellen voor een review kost je een avond die je niet hebt. Hier typ je een naam en een nummer, klikt op versturen, en het systeem doet de rest: de vraag, de link, de herinneringen en het bijhouden van wie al gereageerd heeft.',
        ],
      },
      {
        h: 'Je hele klantenlijst in één keer',
        p: [
          'De meeste reviews die je nog moet krijgen zitten al in je telefoon, in klanten van vorig jaar die je nooit meer gesproken hebt. Heb je een lijst, dan zetten we daar een campagne op die in een rustig tempo dezelfde vraag stelt. Niet alles tegelijk, want honderd reviews in één week gelooft niemand.',
        ],
      },
      {
        h: 'Elke review krijgt antwoord',
        p: [
          'Onder twintig reviews precies dezelfde bedankregel plakken, dat ziet iedereen, ook Google. Daarom krijgt elke review een antwoord dat over die klant gaat, ook de kritische. Wie nog twijfelt leest juist die het eerst.',
        ],
      },
    ],
    kort: 'Iedereen die klant bij je was krijgt de vraag hoe het ging, via WhatsApp of e-mail.',
    regel:
      'Je rijdt weg na een geklaarde klus en vraagt nooit om een review, want dat voelt raar bij het afrekenen. Wij vragen het een paar dagen later, via WhatsApp, op een toon die niet als bedelen klinkt.',
    title: 'Reviewtrechter: meer Google-reviews krijgen | Local Levers',
    description:
      'Een review-systeem op je bestaande klanten, via WhatsApp of e-mail. Tevreden klanten naar je profiel, kritiek eerst naar jou, en elke review persoonlijk beantwoord.',
    wat: [
      'Je klant was blij met het resultaat, zei het aan de deur, en schreef er nooit iets over op. Niet omdat hij het vergat, maar omdat niemand het hem ooit vroeg.',
      'Reviewtrechter vraagt het wel, voor elke klant die je hebt gehad, via het kanaal waarop hij toch al met je appt of mailt. Is hij tevreden, dan krijgt hij de link naar je profiel. Heeft hij iets aan te merken, dan komt dat eerst bij jou terecht, met naam en nummer, zodat je kunt bellen en het kunt oplossen. De link naar je profiel staat ook op dat formulier, want die keuze blijft bij de klant.',
      'We beginnen bij de klanten die je al hebt gehad, want dat is meteen de grootste stapel namen die je al kent. Reviews die zo binnenkomen wegen ook het zwaarst, want elke lezer ziet meteen dat het om een echte klant gaat.',
    ],
    blokken: [
      {
        h: 'We beginnen bij wie je al kent',
        p: 'Je hebt honderden namen in je klantenlijst staan en een handjevol reviews op je profiel. Dat verschil is het hele werk. We beginnen bij wie er het kortst geleden was, want die weet nog precies hoe het ging.',
      },
      {
        h: 'Eerst vragen hoe het ging',
        p: 'Er gaat een korte vraag voor de link langs. Was het niet goed, dan hoor jij het als eerste, met naam en nummer erbij, zodat je diezelfde dag kunt bellen. De link naar je profiel staat er gewoon bij, de klant kiest zelf.',
      },
      {
        h: 'Mensen zeggen ja en doen het niet',
        p: 'Niet uit onwil, ze staan gewoon af te rekenen als het bericht binnenkomt. Wij herinneren ze eraan, vriendelijk, een paar keer over vier weken. Zodra iemand iets achterlaat, stopt het voor hem.',
      },
      {
        h: 'Elk antwoord is van jou',
        p: 'Dezelfde zin onder twintig reviews ziet iedereen, ook Google. Elke review krijgt een antwoord dat over die klant gaat. De kritische ook, en juist die: wie nog twijfelt leest vooral hoe je reageert als iets misging.',
      },
    ],
    voorbeeld: {
      soort: 'gesprek',
      kop: 'Zo ziet de vraag aan je klant eruit',
      label: 'WhatsApp',
      regels: [
        {
          van: 'wij',
          tekst:
            'Hoi Sanne, we hebben vorige week de cv-ketel bij je vervangen. Hoe ging het? Je mag antwoorden met een cijfer van 1 tot 5.',
        },
        { van: 'klant', tekst: '5, netjes achtergelaten ook' },
        {
          van: 'wij',
          tekst:
            'Fijn om te horen, dank je wel. Wil je dat hier neerzetten? Het kost je een halve minuut en mensen die twijfelen hebben er veel aan. [link naar je profiel]',
        },
      ],
      onder:
        'Komt er een 1, 2 of 3 binnen, dan volgt eerst een formulier waarop jij leest wat er misging, met naam en nummer erbij, zodat je diezelfde dag kunt bellen. De link naar je profiel staat ook op dat formulier. De tekst wordt op jouw bedrijf ingericht en gaat uit onder je eigen naam.',
    },
  },
  {
    slug: 'terugbelbericht',
    feiten: [
      { k: 'Binnen dertig seconden een bericht', t: 'Elke gemiste oproep krijgt er automatisch een.' },
      { k: 'Meteen een antwoord terug', t: 'De beller hoort dat je hem gezien hebt, in plaats van de volgende te bellen.' },
      { k: 'Jij ziet de melding', t: 'Naam en nummer staan al klaar in je postvak.' },
    ],
    naam: 'Gemiste Oproep Terugbericht',
    sub: 'Elke gemiste oproep krijgt meteen een bericht',
    kort: 'Mis je een oproep, dan krijgt die beller binnen dertig seconden een bericht met de juiste link.',
    regel:
      'Je staat op een steiger met je handen vol als de telefoon voor de derde keer gaat. Binnen dertig seconden staat er bij die beller een bericht in plaats van een gemiste oproep.',
    title: 'Gemiste Oproep Terugbericht: nooit meer een gemiste oproep | Local Levers',
    description:
      'Een gemiste oproep krijgt binnen dertig seconden een bericht terug, via WhatsApp met sms als terugval. Ook buiten openingstijden.',
    wat: [
      'Iemand die niet doorkomt, belt door naar de volgende op zijn lijstje. Niet omdat hij ontrouw is, maar omdat hij een probleem heeft dat vandaag nog opgelost moet worden.',
      'Gemiste Oproep Terugbericht stuurt die beller binnen dertig seconden een bericht terug: dat je hem gezien hebt en dat je terugkomt op wat hij nodig heeft. Ook als je op een klus zit, met een klant in gesprek bent, of het zondag is. Antwoordt hij, dan staat er een gesprek in je telefoon in plaats van een streepje in je oproeplijst.',
      'Een gemiste oproep is geen gesprek dat de klant zelf via WhatsApp begon, en daar gelden regels voor. Kan het eerste bericht daarom niet meteen via WhatsApp, dan gaat het per sms, en loopt het gesprek vanaf zijn antwoord gewoon door op WhatsApp.',
    ],
    blokken: [
      {
        h: 'Sneller dan jij je telefoon uit je zak krijgt',
        p: 'Je staat op een ladder, of je hebt je handen vol gips. Tegen de tijd dat jij terugbelt, heeft diegene het net zo makkelijk bij de volgende geprobeerd.',
      },
      {
        h: "Ook om half tien 's avonds",
        p: 'Wie vrijdagavond belt en niets terughoort, probeert het zaterdag gewoon bij de volgende. Dit bericht kent geen openingstijden en geen weekend.',
      },
      {
        h: 'Een reactie, geen belofte',
        p: "Niet 'we bellen je zo snel mogelijk terug', dat belooft iedereen en niemand gelooft het meer. Gewoon een bericht dat meteen vraagt waar het over gaat, zodat het gesprek al loopt tegen de tijd dat jij het overneemt.",
      },
      {
        h: 'En dan neem jij het over',
        p: 'Zodra jij zelf begint te typen, houdt het systeem zich stil. Een collega die de telefoon aanneemt, kan het gesprek gewoon teruglezen en overnemen.',
      },
    ],
    voorbeeld: {
      soort: 'gesprek',
      kop: 'Zo ziet het bericht eruit bij de beller',
      label: 'WhatsApp, binnen 30 seconden',
      regels: [
        {
          van: 'wij',
          tekst:
            'Hoi, je belde net naar [je bedrijfsnaam] en we konden niet opnemen. Waar kunnen we je mee helpen? Wil je liever meteen een moment kiezen, dan kan dat hier: [link]',
        },
        { van: 'klant', tekst: 'Ik wilde vragen of jullie donderdag nog kunnen' },
      ],
      onder:
        'De tekst ligt vast en wordt ingericht met je eigen naam en je eigen link. Vanaf het antwoord loopt het gesprek gewoon door, bij jou in beeld.',
    },
  },
  {
    slug: 'campagnes',
    feiten: [
      { k: 'Eén klik', t: 'Naam en nummer invoeren, de campagne doet de rest.' },
      { k: 'Twee campagnes staan klaar', t: 'Doorverwijzingen vragen en oude klanten terughalen.' },
      { k: 'Voorgebouwd op jouw toon', t: 'Geen losse acties verzinnen op een vrijdagmiddag.' },
    ],
    naam: 'Campagnes Met \u00c9\u00e9n Klik',
    sub: 'E\u00e9n knop en je klanten horen weer van je',
    kort: 'Twee kant-en-klare campagnes naar je bestaande klantenlijst. Naam en nummer erin, en hij loopt.',
    regel:
      'Ergens op je telefoon of in een oud Excel-bestand staan honderden klanten die je nooit meer gesproken hebt. Twee campagnes staan klaar om ze weer aan het praten te krijgen: naam en nummer erin, en hij loopt.',
    title: 'Campagnes Met \u00c9\u00e9n Klik: je klantenlijst weer aan het werk | Local Levers',
    description:
      'Twee kant-en-klare campagnes naar je bestaande klanten: doorverwijzingen vragen en oude klanten terughalen. Naam en nummer erin, en de campagne loopt.',
    wat: [
      'Je klantenlijst is het waardevolste dat je hebt. Die mensen kennen je al, hebben al eens betaald, en hoeven niet meer overtuigd te worden dat je bestaat. Meestal doet er niemand iets mee.',
      'Campagnes Met \u00c9\u00e9n Klik zet er twee voor je klaar: doorverwijzingen vragen aan wie tevreden bij je wegging, en oude klanten terughalen die je een tijd niet gesproken hebt. Je vult een voornaam en een nummer in en de campagne loopt, of je zet je hele lijst er in \u00e9\u00e9n keer in.',
    ],
    blokken: [
      {
        h: 'Oude klanten terughalen',
        p: 'Mensen die \u00e9\u00e9n keer klant waren en daarna nooit meer iets van je hoorden. Ze zijn niet weg, er is alleen nooit meer iets gevraagd. Dezelfde campagne pakt ook de offertes op die destijds ergens zijn blijven liggen.',
      },
      {
        h: 'Doorverwijzingen vragen',
        p: 'Naar wie tevreden bij je wegging, met de vraag of hij iemand kent die hetzelfde nodig heeft. Dat is de klant die het minst kost om binnen te halen, en meestal vraagt niemand erom.',
      },
      {
        h: 'E\u00e9n knop, en hij loopt',
        p: 'Je vult een voornaam en een nummer in, of je zet je hele klantenlijst er in \u00e9\u00e9n keer in. De tekst staat er al, op jouw toon, dus je hoeft op een vrijdagmiddag geen actie te verzinnen.',
      },
      {
        h: 'Wie antwoordt komt bij jou binnen',
        p: 'Reacties belanden niet in een systeem waar je zelf in moet gaan kijken. Ze komen in je postvak terecht, bij de rest van je gesprekken, zodat je gewoon terug kunt appen.',
      },
    ],
    voorbeeld: {
      soort: 'lijst',
      kop: 'Zo zien de twee campagnes eruit',
      label: 'Campagnes, klaar om te starten',
      rijen: [
        {
          titel: 'Oude klanten terughalen',
          bij: 'Naar je hele lijst',
          tekst: 'Mensen die een tijd niet geweest zijn, en aanvragen die zijn blijven liggen',
        },
        {
          titel: 'Doorverwijzingen vragen',
          bij: 'Naar wie tevreden was',
          tekst: 'De vraag of hij iemand kent die hetzelfde nodig heeft',
        },
      ],
      onder:
        'Hierboven staat de opmaak. Je vult een voornaam en een nummer in, of je zet je hele klantenlijst er in \u00e9\u00e9n keer in. Wie antwoordt komt in je postvak terecht, bij de rest van je gesprekken.',
    },
  },
  {
    slug: 'vindbaarheid',
    feiten: [
      { k: 'Google, Bing en Apple', t: 'Ingericht en gelijk gehouden, want daar putten de AI-zoekhulpen uit.' },
      { k: 'AI-zoekhulpen gemeten', t: 'Je ziet wat ChatGPT en de rest over je zeggen.' },
      { k: 'Elke maand een kaart van je stad', t: 'Per wijk, met vorige maand ernaast.' },
    ],
    naam: 'Lokale Vindbaarheid',
    sub: 'Echt gevonden worden, ook buiten Google',
    kort: 'Je gegevens kloppen overal waar mensen zoeken, en elke maand zie je op een kaart waar je staat.',
    regel:
      "Typ 'loodgieter' in en je eigen bedrijf staat pas op pagina twee, ook al zit je er al twaalf jaar. Wij richten je profiel in op wat je doet, niet alleen op hoe je heet: op Google, Bing, Apple en in de AI-zoekhulpen.",
    title: 'Lokale Vindbaarheid: hoger in Google Maps komen | Local Levers',
    description:
      'Je profiel op Google, Bing en Apple ingericht en onderhouden, je zichtbaarheid in AI-zoekhulpen gemeten, en elke maand een kaart van je eigen stad.',
    wat: [
      'Op je bedrijfsnaam zoekt bijna niemand, behalve mensen die je toch al kennen. Die had je al. Er wordt gezocht op wat je doet, in een plaats, op een telefoon, tussen twee klussen door.',
      'Lokale Vindbaarheid zet je bedrijfsprofiel op de dienst waar jij het meeste aan verdient en houdt het bij: Google, Bing Places en Apple Business Connect, alle drie hetzelfde. Daar putten ChatGPT en de andere zoekhulpen ook uit, dus we meten wat er over je bedrijf teruggegeven wordt. Dat blijft niet bij één keer inrichten, er gaat elke maand onderhoud overheen.',
      'Wij beloven het werk, en jij kunt het elke maand nakijken op je eigen kaart. Een vaste plek in de resultaten belooft iedereen, en niemand heeft die in de hand.',
    ],
    blokken: [
      {
        h: 'Op je bedrijfsnaam zoekt niemand',
        p: 'Behalve mensen die je al kennen. Die had je al. Je profiel staat daarom op wat je doet, niet op hoe je heet.',
      },
      {
        h: 'Ook buiten Google',
        p: 'Op een iPhone opent de kaart van Apple, en in Windows komen de gegevens uit Bing. Daar halen de AI-zoekhulpen hun antwoorden ook vandaan, dus die drie moeten hetzelfde zeggen.',
      },
      {
        h: 'Een oude openingstijd is iemand voor een dichte deur',
        p: 'Gegevens verlopen, en anderen kunnen ze aanpassen zonder dat jij het merkt. Daarom kijken we er elke maand overheen in plaats van het één keer in te richten en los te laten.',
      },
      {
        h: 'Elke maand een kaart van je eigen stad',
        p: 'Per meetpunt zie je hoe zichtbaar je daar bent, met vorige maand ernaast. Geen dashboard waar je zelf iets in moet zoeken, en er zit een spraakbericht bij waarin we het doorlopen.',
      },
    ],
    voorbeeld: {
      soort: 'meting',
      kop: 'Zo ziet de meting in je maandrapport eruit',
      label: 'Maandrapport, kaart van je stad',
      // Vaste illustratie van de opmaak. Bewust gemengd en zonder cijfers: dit
      // laat de vorm van het rapport zien, geen resultaat van een klant.
      raster: [
        ['goed', 'goed', 'goed', 'matig', 'zwak'],
        ['goed', 'goed', 'matig', 'matig', 'zwak'],
        ['goed', 'goed', 'goed', 'matig', 'matig'],
        ['matig', 'goed', 'goed', 'matig', 'zwak'],
        ['zwak', 'matig', 'matig', 'zwak', 'zwak'],
      ],
      legenda: [
        { kleur: 'goed', tekst: 'Hier word je gevonden' },
        { kleur: 'matig', tekst: 'Hier sta je onderaan' },
        { kleur: 'zwak', tekst: 'Hier kom je niet voor' },
      ],
      onder:
        'Elk punt is een plek in je stad waar we gemeten hebben, met je vestiging in het midden. Hierboven staat de opmaak, de kleuren op jouw kaart komen uit je eigen meting. Er zit een spraakbericht bij waarin we doorlopen wat er veranderd is en wat we die maand gedaan hebben.',
    },
  },
  {
    slug: 'chat',
    feiten: [
      { k: 'Beantwoordt vragen direct', t: 'Prijs, duur, openingstijden, uit jouw eigen informatie.' },
      { k: 'Legt de aanvraag meteen vast', t: 'Naam, nummer en wat er speelt, klaar voor jouw vervolg.' },
      { k: 'Naam en nummer vastgelegd', t: 'Het gesprek loopt door, ook als het tabblad dichtgaat.' },
    ],
    naam: 'Chat Op Je Website',
    sub: 'Beantwoordt vragen en legt de aanvraag meteen vast',
    kort: 'Beantwoordt de vragen die mensen stellen voordat ze een aanvraag doen, en legt die aanvraag meteen vast.',
    regel:
      "De drie vragen die iedereen stelt voordat hij een aanvraag doet, worden beantwoord op het moment dat hij ze stelt, ook om elf uur 's avonds. En de aanvraag zelf komt meteen bij je binnen.",
    title: 'Chat Op Je Website: vragen beantwoord voordat iemand een aanvraag doet | Local Levers',
    description:
      'Een chat op je site die vragen over prijs en doorlooptijd meteen beantwoordt, de aanvraag vastlegt en naar jou doorzet.',
    wat: [
      'Het antwoord staat op je site. Alleen leest niemand het, ze vragen het. Meestal om elf uur \'s avonds.',
      'Chat Op Je Website staat rechtsonder op je site en geeft die antwoorden meteen, met de tekst van je eigen pagina\'s als bron. Daarna vraagt hij waar het over gaat, legt de aanvraag vast en zet hem door naar jou. Hij vraagt vroeg om een naam en een nummer, zodat het gesprek niet kwijt is zodra iemand zijn tabblad sluit.',
      'Wat hij nooit doet is zelf iets verzinnen. Blijft een vraag buiten wat er over jouw bedrijf is vastgelegd, dan geeft hij dat eerlijk aan en komt hij bij jou terecht in plaats van te gokken.',
    ],
    blokken: [
      {
        h: 'Wat kost het, hoe snel kun je, hoe gaat het',
        p: 'Elke week weer diezelfde drie. De antwoorden staan op je site, maar mensen lezen ze niet. Nu hoef jij ze ook niet meer te typen.',
      },
      {
        h: 'Het juiste antwoord, niet de homepage',
        p: 'Jij hebt tien diensten met tien verschillende verhalen. Vraagt iemand naar een laadpaal, dan gaat het antwoord over een laadpaal, niet over een algemeen welkomstpraatje dat nergens op aansluit. Daar zit het echte werk.',
      },
      {
        h: 'Weet hij het niet, dan zegt hij dat',
        p: 'Er wordt niets verzonnen. Staat het antwoord niet in wat we over jouw bedrijf hebben vastgelegd, dan noteert hij de vraag en komt hij bij jou terecht.',
      },
      {
        h: 'Waar hij van afblijft',
        p: 'Een installateur wordt om een vaste prijs gevraagd zonder dat er iemand gekeken heeft, een dakdekker om een garantie op een dak dat hij niet van dichtbij gezien heeft. Allebei gaan ze naar jou, met een seintje erbij.',
      },
    ],
    voorbeeld: {
      soort: 'gesprek',
      kop: 'Zo ziet een gesprek op je site eruit',
      label: 'Chat op je website',
      regels: [
        { van: 'klant', tekst: 'Wat kost het om een laadpaal te laten plaatsen?' },
        {
          van: 'wij',
          tekst:
            'Dat hangt af van de afstand tot je meterkast en of er een aparte groep bij moet. Wat een standaard plaatsing kost, staat op onze pagina over laadpalen. Zal ik een vrijblijvende check van vijftien minuten voor je inplannen? Dan weet je precies waar je aan toe bent.',
        },
        { van: 'klant', tekst: 'Ja, graag' },
        {
          van: 'wij',
          tekst:
            'Hier kies je een moment dat je uitkomt: [link]. Mag ik alvast je naam en mobiele nummer, dan raak je het gesprek niet kwijt als je de pagina sluit.',
        },
      ],
      onder:
        'De antwoorden komen uit je eigen pagina\'s, dus je legt het één keer uit en het staat op twee plekken goed. De link die de chat geeft is die van je eigen systeem.',
    },
  },
  {
    slug: 'opvolging',
    feiten: [
      { k: 'Binnen een minuut antwoord', t: 'Ook op zondagavond half elf.' },
      { k: 'Via WhatsApp', t: 'Met sms en e-mail als terugval.' },
      { k: 'Niets blijft liggen', t: 'Elke aanvraag komt in het postvak, met opvolging eraan.' },
    ],
    naam: 'Automatische Opvolging',
    sub: 'Elke aanvraag krijgt vanzelf antwoord via WhatsApp',
    kort: 'Elke aanvraag krijgt binnen een minuut een WhatsApp-bericht terug, waar hij ook binnenkomt.',
    regel:
      "Om kwart voor negen 's avonds vult iemand tegelijk drie offerteformulieren in, van jou en van twee concurrenten. Wie als eerste antwoordt voert het gesprek, en bij ons ben jij dat, binnen een minuut.",
    title: 'Automatische Opvolging: aanvragen die niet blijven liggen | Local Levers',
    description:
      'Elke aanvraag via je formulier, chat, telefoon, Facebook of Instagram krijgt binnen een minuut antwoord. Jij krijgt een seintje en neemt het gesprek over wanneer het uitkomt.',
    wat: [
      'Iemand die een aanvraag doet, doet er meestal meer dan één. Wie als eerste iets terugzegt voert het gesprek. De rest krijgt later te horen dat het al geregeld is.',
      'Automatische Opvolging zorgt dat jij die eerste bent. Komt er iets binnen via je formulier, de chat, de telefoon, Facebook of Instagram, dan gaat er binnen een minuut antwoord terug: dat het aangekomen is en dat er snel iemand op reageert. Jij krijgt tegelijk een bericht met wie het is, waar het over gaat en langs welke deur hij binnenkwam.',
      'Zodra het over het werk zelf gaat, over een klacht, of over iets waar jij met eigen ogen naar moet kijken, komt het bij jou terecht, met het hele gesprek erbij zodat je niet bij nul begint.',
    ],
    blokken: [
      {
        h: 'Uit welke hoek hij ook komt',
        p: 'Formulier, chat, telefoon, Facebook, Instagram. Vijf deuren, één antwoord, en het komt allemaal op dezelfde plek uit.',
      },
      {
        h: 'Niet de goedkoopste wint',
        p: 'En ook niet de beste. Meestal degene die er als eerste was. Dat jij op dat moment iemand aan het helpen was, weet die aanvrager niet.',
      },
      {
        h: 'Jij krijgt een seintje',
        p: 'Zodra er iemand binnenkomt weet jij het, zonder ergens te kijken of iets te verversen. Zit er iets tussen dat haast heeft, dan zie je dat nu en niet vanavond.',
      },
      {
        h: 'En dan stopt het',
        p: 'Zodra jij zelf iets typt in dat gesprek, doet het systeem er het zwijgen toe. Er komt dus nooit een bericht overheen terwijl jij aan het typen bent.',
      },
    ],
    voorbeeld: {
      soort: 'gesprek',
      kop: 'Zo ziet een aanvraag eruit die binnenkomt',
      label: 'Aanvraag via je website, binnen 1 minuut',
      regels: [
        {
          van: 'klant',
          tekst:
            'Sanne, 06-..., ik wil een offerte voor een nieuwe cv-ketel. Kan iemand langskomen? Het liefst na vijf uur.',
        },
        {
          van: 'wij',
          tekst:
            'Hoi Sanne, bedankt voor je bericht, hij is bij ons binnen. Je hoort vandaag nog van ons. Wil je liever meteen een moment kiezen, dan kan dat hier: [link]',
        },
        { van: 'klant', tekst: 'Ik kijk even, bedankt' },
      ],
      onder:
        'Tegelijk krijg jij een bericht met haar naam, haar nummer en waar het over gaat. Neem je het gesprek zelf over, dan houdt de opvolging voor haar op.',
    },
  },
  {
    slug: 'inbox',
    feiten: [
      { k: 'Vier deuren, één scherm', t: 'Site, telefoon, Facebook en Instagram komen samen binnen.' },
      { k: 'Niets meer zoeken', t: 'Alles op volgorde van binnenkomst, met de klant erbij.' },
      { k: 'Op desktop en telefoon', t: 'Antwoorden waar je bent, niet waar je computer staat.' },
    ],
    naam: 'Alles-in-één Postvak',
    sub: 'Alle berichten op één plek, niet in vier apps',
    kort: 'WhatsApp, Facebook, Instagram en e-mail in één scherm in plaats van vier apps.',
    regel:
      'Sanne appte gisteren op Instagram, Mark mailde vanochtend, en je weet van geen van beiden meer waar je gebleven was. Nu staat het in één scherm, op je computer en op je telefoon, met je collega erbij.',
    title: 'Alles-in-één Postvak: al je berichten in één scherm | Local Levers',
    description:
      'Alle berichten in één scherm in plaats van vier apps, ook op je telefoon. Je collega ziet hetzelfde en je ziet meteen wat nog niet beantwoord is.',
    wat: [
      'De ene vraag komt binnen via WhatsApp, de volgende onder een reactie op Instagram, de derde gewoon in je mail. Wat blijft liggen is niet het drukke kanaal, maar het kanaal waar je die dag toevallig niet in zat.',
      'Alles-in-één Postvak zet alles in dezelfde lijst, met erbij waar het vandaan komt. Klik je iemand aan, dan zie je meteen wat er eerder met hem besproken is, ook als dat via een ander kanaal liep. Er zit een app bij met exact dezelfde lijst, dus je antwoordt net zo makkelijk tussen twee klussen door als achter een bureau.',
      'Je e-mail en je sociale kanalen blijven gewoon van jou, op de manier die je al gewend bent. Dit komt ernaast: één plek waar alles samenkomt zodra er iets binnenkomt.',
    ],
    blokken: [
      {
        h: 'Je hoeft niet te onthouden waar iemand je schreef',
        p: 'Vier apps is vier keer opnieuw inloggen, en niemand weet meer waar het gesprek gebleven is. Nu staat alles gewoon onder elkaar.',
      },
      {
        h: 'Ook op je telefoon',
        p: 'Dezelfde lijst, in je hand, waar je ook bent. Wat je daar beantwoordt, staat op de computer ook als beantwoord.',
      },
      {
        h: 'Je collega ziet hetzelfde',
        p: 'Wie de planning doet, hoeft jou niet te bellen om te weten wat er speelt. En jullie sturen niet allebei hetzelfde antwoord naar dezelfde klant.',
      },
      {
        h: 'Niets zakt naar beneden',
        p: 'Beantwoord of niet, dat zie je in één oogopslag. Wat open staat blijft bovenaan tot er iemand iets mee doet.',
      },
    ],
    voorbeeld: {
      soort: 'lijst',
      kop: 'Zo ziet je postvak eruit',
      label: 'Postvak, alle kanalen',
      rijen: [
        {
          titel: 'Sanne',
          bij: 'WhatsApp',
          tekst: 'Kunnen jullie donderdag langskomen voor een lekkage?',
          merk: 'Nog niet beantwoord',
        },
        {
          titel: 'Mark',
          bij: 'Instagram',
          tekst: 'Wat kost het vervangen van een cv-ketel ongeveer?',
          merk: 'Nog niet beantwoord',
        },
        { titel: 'Ilse', bij: 'Facebook', tekst: 'Werken jullie ook op zaterdag?' },
        { titel: 'Peter', bij: 'E-mail', tekst: 'Graag een offerte voor nieuwe kozijnen' },
      ],
      onder:
        'Hierboven staat de opmaak, de namen zijn verzonnen. Wat nog open staat blijft bovenaan, zodat je niet hoeft te zoeken waar je gebleven was.',
    },
  },
  {
    slug: 'nummer',
    feiten: [
      { k: 'Bellen en appen zakelijk', t: 'Op één nummer, los van je privénummer.' },
      { k: 'Je privénummer blijft privé', t: 'Ook al gebruik je je eigen toestel.' },
      { k: 'Gemiste oproepen gezien', t: 'Het terugbelbericht hangt er direct aan.' },
    ],
    naam: 'Zakelijk Nummer',
    sub: 'Zakelijk bellen en appen, privé blijft privé',
    kort: 'Een eigen nummer waarop gebeld en geappt kan worden, zodat je 06 niet meer op je profiel staat.',
    regel:
      'Je privénummer staat op je profiel, dus klanten bellen jou, ook op zondag tijdens het eten. Wij zetten bellen en appen op één zakelijk nummer, los van je eigen toestel.',
    title: 'Zakelijk Nummer: één nummer voor bellen en appen | Local Levers',
    description:
      'Een eigen zakelijk nummer voor bellen en appen, zodat je 06 niet meer op je profiel staat. Je ziet waar een oproep vandaan komt en het nummer blijft van jou.',
    wat: [
      'Bij de meeste bedrijven van jouw formaat staat het privénummer van de eigenaar op het profiel, op de site en op de kaartjes. Dat gaat goed tot iemand op zondagavond tijdens het eten belt om een klus te verzetten.',
      'Zakelijk Nummer is één zakelijk nummer voor bellen én appen. Dat zet je op je bedrijfsprofiel, je site en je advertenties, en alles wat erop binnenkomt staat bij de rest van je berichten. Het nummer staat op jouw bedrijf, niet op dat van ons, dus stop je, dan neem je het gewoon mee.',
      'Het nummer komt naast wat je al hebt: je zet hem op de plekken waar mensen je vinden, en je eigen 06 hoef je nergens meer neer te zetten.',
    ],
    blokken: [
      {
        h: 'Je klanten bellen je bedrijf, niet jou',
        p: 'Eén nummer op je profiel, je site en je kaartje. En dat is niet het nummer waarop je moeder je belt.',
      },
      {
        h: 'Bellen en appen op hetzelfde nummer',
        p: 'Mensen bellen steeds minder en appen steeds meer. Hier kan allebei, en het komt op dezelfde plek uit als de rest.',
      },
      {
        h: 'Hier hangt het terugbelbericht aan',
        p: 'Een gemiste oproep valt alleen op als de lijn erdoorheen loopt. Dit nummer is waar dat begint, en het terugbelbericht sluit er direct op aan.',
      },
      {
        h: 'Het blijft van jou',
        p: 'Een nummer dat overal op je profiel staat maar dat je kwijtraakt zodra je opzegt, helpt je op de lange termijn niet. Dit nummer staat op jouw naam, dus het gaat gewoon met je mee.',
      },
    ],
    voorbeeld: {
      soort: 'lijst',
      kop: 'Zo ziet je gesprekkenlijst eruit',
      label: 'Gesprekken, één dag',
      rijen: [
        { titel: 'Inkomend', bij: '09:12', tekst: 'Opgenomen, 4 minuten' },
        {
          titel: 'Gemist',
          bij: '11:48',
          tekst: 'Bericht verstuurd binnen 30 seconden',
          merk: 'Klant heeft geantwoord',
        },
        { titel: 'Inkomend', bij: '14:03', tekst: 'Opgenomen, 2 minuten' },
        {
          titel: 'Gemist',
          bij: '17:26',
          tekst: 'Bericht verstuurd binnen 30 seconden',
          merk: 'Afspraak ingepland',
        },
      ],
      onder:
        'Hierboven staat de opmaak. Elke gemiste oproep krijgt het terugbelbericht, dus je ziet wat er gebeurt met de telefoontjes die je niet hebt kunnen opnemen.',
    },
  },
];
