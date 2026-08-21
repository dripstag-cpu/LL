// Branche-data voor de eigenaar-intentie SEO/GEO-pagina's.
// Elke branche heeft echte, eigen content (pijn, mechaniek, FAQ), zodat de pagina's
// substantieel en uniek zijn, geen naam-swaps. Voeg branches toe om te schalen.
//
// `group` bepaalt tussen welke branchepagina's onderling gelinkt wordt. Een
// branchepagina linkt alleen naar branches uit dezelfde groep, nooit naar alle
// veertien andere (SOP vindbaarheid 3.4: geen links tussen losse clusters).
// `guides` is de vaste lijst gidsartikelen die bij deze branche hoort.

export const nicheGroups = {
  klinieken: 'Klinieken en behandelpraktijken',
  salons: 'Salons en persoonlijke verzorging',
  huis: 'Vakmensen en makelaars rond het huis',
};

export const niches = [
  {
    slug: 'laserklinieken',
    group: 'klinieken',
    published: false, // gearchiveerd 2026-08-18, klinieken/beauty uit positionering (doc 53)
    guides: [
      'marketing-voor-klinieken',
      'seo-voor-klinieken',
      'ai-vindbaarheid-voor-klinieken',
      'meer-google-reviews-krijgen-als-kliniek',
      'wat-kost-marketing-voor-een-kliniek',
    ],
    label: 'laserklinieken',
    labelSingular: 'laserkliniek',
    h1: 'Marketing voor laserklinieken',
    intro:
      'Een laserkliniek leeft van terugkerende kuren en volle bezetting op dure apparatuur. Maar de meeste nieuwe klanten komen binnen via platforms die een fors deel van de eerste boeking afromen, of ze vinden simpelweg je concurrent eerst. Wij zorgen dat je direct en buiten die platforms om gevonden wordt.',
    pains: [
      {
        h: 'Je betaalt commissie voor klanten die je zelf had kunnen boeken',
        p: 'Platforms als Treatwell rekenen tot 35% commissie op de eerste boeking van een nieuwe klant. Word je in Google Maps en in de antwoorden van ChatGPT en Perplexity direct gevonden, dan boekt diezelfde klant bij jou zonder tussenpartij.',
      },
      {
        h: 'Je apparatuur moet draaien om zichzelf terug te verdienen',
        p: 'Een lasertoestel is een vaste maandlast. Lege plekken in de agenda zijn direct verlies. Betere vindbaarheid op je winstgevende behandeling houdt de bezetting op peil.',
      },
      {
        h: 'Het verschil in kwaliteit is online onzichtbaar',
        p: 'Een medische laser en een goedkope IPL zien er in de zoekresultaten hetzelfde uit. Reviews en een compleet profiel zijn wat jouw kwaliteit zichtbaar maakt en de klant laat kiezen.',
      },
    ],
    faq: [
      {
        q: 'Hoe krijg ik meer directe boekingen buiten Treatwell om?',
        a: 'Door hoger gevonden te worden op je eigen naam en op je winstgevende behandeling in Google Maps, en door je Google Bedrijfsprofiel zo compleet te maken dat mensen direct bij jou boeken. Elke directe boeking bespaart je de platform-commissie.',
      },
      {
        q: 'Werkt lokale SEO ook voor een laserkliniek?',
        a: 'Ja. Mensen zoeken lokaal naar laserontharing en huidverjonging. Wie in de top 3 van de kaart staat, pakt het grootste deel van de klikken. Dat is precies waar wij je naartoe werken.',
      },
    ],
  },
  {
    slug: 'huidklinieken',
    group: 'klinieken',
    published: false, // gearchiveerd 2026-08-18, klinieken/beauty uit positionering (doc 53)
    guides: [
      'marketing-voor-klinieken',
      'lokale-seo-voor-klinieken',
      'google-bedrijfsprofiel-optimaliseren-kliniek',
      'ai-vindbaarheid-voor-klinieken',
      'meer-google-reviews-krijgen-als-kliniek',
    ],
    label: 'huidklinieken',
    labelSingular: 'huidkliniek',
    h1: 'Marketing voor huidklinieken',
    intro:
      'Huidverjonging, microneedling, HIFU en peelings zijn behandeltrajecten met terugkerende klanten. De keuze begint online, en daar val je op tussen een handvol klinieken in dezelfde stad. Wij zorgen dat je gevonden en gekozen wordt.',
    pains: [
      {
        h: 'Je concurreert met de goedkope schoonheidssalon in de zoekresultaten',
        p: 'Voor de klant die zoekt, lijk je online op elke andere aanbieder. Een compleet profiel, de juiste categorieën en reviews zetten jouw niveau neer.',
      },
      {
        h: 'Losse marketingacties zonder rode draad',
        p: 'Steeds een nieuwe post of actie bedenken kost tijd en levert weinig op. Een vast fundament van vindbaarheid en reviews werkt op de achtergrond door.',
      },
      {
        h: 'De klant die je bijna had, boekt bij wie sneller reageert',
        p: 'Een aanvraag die \'s avonds binnenkomt en pas dagen later gezien wordt, is een verloren traject. Snelle opvolging houdt die klant binnen.',
      },
    ],
    faq: [
      {
        q: 'Hoe val ik op tussen andere huidklinieken in mijn stad?',
        a: 'Met een compleet Google Bedrijfsprofiel op je winstgevende behandeling, meer en recentere reviews dan de concurrent, en aanwezigheid op Apple Maps en in de antwoorden van ChatGPT en Perplexity. Dat samen bepaalt bij wie de klant terechtkomt.',
      },
      {
        q: 'Hoe lang duurt het voor ik hoger sta?',
        a: 'De eerste fundament-verbeteringen zetten we in de eerste weken neer. Ranking en reviews bouwen daarna geleidelijk op. We meten de nulmeting bij de start en laten maandelijks zien hoe het beweegt.',
      },
    ],
  },
  {
    slug: 'huidtherapie',
    group: 'klinieken',
    published: false, // gearchiveerd 2026-08-18, klinieken/beauty uit positionering (doc 53)
    guides: [
      'seo-voor-klinieken',
      'hoe-kom-ik-hoger-in-google-maps-als-kliniek',
      'diensten-toevoegen-google-bedrijfsprofiel',
      'meer-google-reviews-krijgen-als-kliniek',
      'waar-moet-mijn-kliniek-online-staan',
    ],
    label: 'huidtherapiepraktijken',
    labelSingular: 'huidtherapiepraktijk',
    h1: 'Marketing voor huidtherapeuten',
    intro:
      'Als huidtherapeut ben je een paramedisch specialist, maar online word je vaak verward met de goedkope schoonheidssalon. Wij zetten je vakmanschap neer waar mensen zoeken, en helpen je aan een voorspelbare stroom in plaats van piekerige drukte.',
    pains: [
      {
        h: 'Verwarring met de schoonheidssalon',
        p: 'Jouw HBO-opleiding en beschermde titel zie je niet terug in de zoekresultaten. De juiste positionering en categorieën maken het verschil zichtbaar.',
      },
      {
        h: 'Deels afhankelijk van doorverwijzing',
        p: 'Een deel van je stroom loopt via verwijzing en verzekering. Voor de zelf-betaalde behandelingen bepaalt vindbaarheid hoeveel nieuwe klanten er binnenkomen.',
      },
      {
        h: 'Geen tijd of strategie voor marketing',
        p: 'Je bent zorgverlener, geen marketeer. Wij nemen het vindbaar- en gekozen-worden uit handen, in jouw taal, zonder marketing-jargon.',
      },
    ],
    faq: [
      {
        q: 'Hoe onderscheid ik me online van een schoonheidssalon?',
        a: 'Door je profiel in te richten op je paramedische specialisatie en behandelingen, de juiste Google-categorie te kiezen, en reviews te verzamelen die je vakmanschap tonen. Zo zien zoekers en ChatGPT dat je meer bent dan een salon.',
      },
    ],
  },
  {
    slug: 'schoonheidssalons',
    group: 'salons',
    published: false, // gearchiveerd 2026-08-18, klinieken/beauty uit positionering (doc 53)
    guides: [
      'marketing-voor-schoonheidssalons',
      'seo-voor-schoonheidssalons',
      'instagram-vs-google-voor-salons',
      'review-vragen-via-whatsapp',
      'hoe-kom-ik-hoger-in-google-maps-als-kliniek',
    ],
    label: 'schoonheidssalons',
    labelSingular: 'schoonheidssalon',
    h1: 'Marketing voor schoonheids- en beautysalons',
    intro:
      'Een salon vult zich op terugkerende klanten en op de behandelingen met de beste marge. Maar veel eigenaren draaien er een fulltime Instagram-baan naast, of betalen fors aan boekingsplatforms. Wij zorgen dat je gevonden wordt en dat je opvolging staat.',
    pains: [
      {
        h: 'Instagram voelt als een tweede baan',
        p: 'Elke avond posts maken lukt niet, en weken zonder zichtbaarheid kosten klanten. Een vast fundament van vindbaarheid werkt door zonder dat jij dagelijks content hoeft te maken.',
      },
      {
        h: 'Platform-commissie op nieuwe klanten',
        p: 'Boekingsplatforms rekenen een fors deel van de eerste boeking. Direct gevonden worden houdt die klant, en die marge, bij jou.',
      },
      {
        h: 'Je goedkope behandelingen vullen de agenda, niet je winstgevende',
        p: 'Wij richten je vindbaarheid en opvolging op de behandelingen waar je marge zit, zodat je agenda zich vult met je beste werk.',
      },
    ],
    faq: [
      {
        q: 'Kan ik zonder dagelijks Instagram toch aan klanten komen?',
        a: 'Ja. Google Maps, reviews en een compleet profiel brengen doorlopend nieuwe klanten binnen, ook zonder dagelijkse posts. Social wordt dan een aanvulling, geen verplichting.',
      },
    ],
  },
  {
    slug: 'wimper-en-browstudios',
    group: 'salons',
    published: false, // gearchiveerd 2026-08-18, klinieken/beauty uit positionering (doc 53)
    guides: [
      'marketing-voor-schoonheidssalons',
      'instagram-vs-google-voor-salons',
      'reviews-vragen-zonder-opdringerig',
      'google-bedrijfsprofiel-fotos',
      'review-vragen-via-whatsapp',
    ],
    label: 'wimper- en browstudio\'s',
    labelSingular: 'wimper- en browstudio',
    h1: 'Marketing voor wimper- en browstudio\'s',
    intro:
      'Een wimper- of browstudio leeft van terugkerende klanten die elke paar weken terugkomen voor een refill. Nieuwe klanten vinden je bijna altijd eerst op Google en op social. Wij zorgen dat je daar bovenaan staat en dat je bestaande klanten blijven terugkomen.',
    pains: [
      {
        h: 'Je bent afhankelijk van social, en dat kost tijd',
        p: 'Veel studio\'s draaien volledig op Instagram, wat elke dag content maken betekent. Een sterke plek in Google Maps en goede reviews brengen doorlopend nieuwe klanten binnen, ook op de dagen dat je niet post.',
      },
      {
        h: 'Veel aanbieders, weinig onderscheid online',
        p: 'In elke stad zitten tientallen studio\'s. Voor de zoeker lijk je online op de rest. Een compleet profiel, foto\'s van je werk en recente reviews zetten jouw kwaliteit neer.',
      },
      {
        h: 'De refill die niet terugkomt',
        p: 'Een klant die niet opnieuw boekt is een terugkerende omzet die stilvalt. Een vriendelijke, automatische herinnering op het juiste moment houdt je agenda vol.',
      },
    ],
    faq: [
      {
        q: 'Werkt Google Maps ook voor een wimperstudio?',
        a: 'Ja. Mensen zoeken lokaal naar wimperextensions en browstyling. Wie in de top van de kaart staat met goede reviews, pakt het grootste deel van de nieuwe klanten.',
      },
    ],
  },
  {
    slug: 'nagelstudios',
    group: 'salons',
    published: false, // gearchiveerd 2026-08-18, klinieken/beauty uit positionering (doc 53)
    guides: [
      'marketing-voor-schoonheidssalons',
      'seo-voor-schoonheidssalons',
      'google-bedrijfsprofiel-fotos',
      'review-vragen-via-whatsapp',
      'instagram-vs-google-voor-salons',
    ],
    label: 'nagelstudio\'s',
    labelSingular: 'nagelstudio',
    h1: 'Marketing voor nagelstudio\'s',
    intro:
      'Een nagelstudio draait op vaste klanten en op een gestage stroom nieuwe boekingen. In een drukke lokale markt bepaalt je vindbaarheid en je reputatie wie de nieuwe klant boekt. Wij zorgen dat jij dat bent.',
    pains: [
      {
        h: 'Veel concurrentie in je eigen wijk',
        p: 'Nagelstudio\'s zitten dicht op elkaar. Wie het hoogst staat in Google Maps en de beste reviews heeft, wint de klant die snel wil boeken. Daar werken wij je naartoe.',
      },
      {
        h: 'Reviews die niet binnenkomen',
        p: 'Je klanten zijn tevreden, maar niemand vraagt ze om een review op het juiste moment. Een automatisch verzoek na de afspraak zet die stroom op gang.',
      },
      {
        h: 'Losse boekingen in plaats van vaste klanten',
        p: 'Een eenmalige klant is minder waard dan een vaste. Slimme opvolging nudget mensen terug voor hun volgende afspraak, zonder dat jij erachteraan hoeft.',
      },
    ],
    faq: [
      {
        q: 'Ik heb al veel klanten, is dit dan nog nuttig?',
        a: 'Zeker. Ook als je vol zit, bepaalt je vindbaarheid of je de winstgevende nieuwe klanten binnenhaalt in plaats van de losse. En reactivatie haalt meer uit de klanten die je al hebt.',
      },
    ],
  },
  {
    slug: 'permanente-makeup',
    group: 'salons',
    published: false, // gearchiveerd 2026-08-18, klinieken/beauty uit positionering (doc 53)
    guides: [
      'marketing-voor-schoonheidssalons',
      'google-bedrijfsprofiel-fotos',
      'hoeveel-google-reviews-heb-ik-nodig',
      'ai-vindbaarheid-voor-klinieken',
      'juiste-google-categorie-kiezen',
    ],
    label: 'PMU- en permanente-makeup-studio\'s',
    labelSingular: 'PMU-studio',
    h1: 'Marketing voor permanente make-up (PMU)',
    intro:
      'Permanente make-up is een behandeling waar mensen lang over nadenken en waar vertrouwen alles is. De keuze valt op reviews, op zichtbaar werk en op een compleet profiel. Wij zorgen dat je gevonden wordt en dat je reputatie voor je werkt.',
    pains: [
      {
        h: 'Vertrouwen is doorslaggevend, en dat begint online',
        p: 'Niemand kiest een PMU-artist met weinig bewijs. Reviews, foto\'s van je werk en een compleet profiel zijn wat de twijfelende klant over de streep trekt.',
      },
      {
        h: 'Je wordt gevonden op de verkeerde termen',
        p: 'Sta je goed op je naam maar niet op de behandelingen waar je marge zit, zoals wenkbrauwen of lipliner, dan mis je de zoekers die klaar zijn om te boeken.',
      },
      {
        h: 'De vraag die je bijna had',
        p: 'Een aanvraag die \'s avonds binnenkomt en pas dagen later gezien wordt, gaat naar wie sneller reageert. Snelle opvolging houdt die klant binnen.',
      },
    ],
    faq: [
      {
        q: 'Hoe laat ik mijn werk online zien zonder opdringerig te zijn?',
        a: 'Met een compleet Google Bedrijfsprofiel vol foto\'s van je werk en echte reviews. Dat overtuigt zonder verkooppraat, en het is precies wat ChatGPT of een zoeker gebruikt om jou aan te bevelen.',
      },
    ],
  },
  {
    slug: 'cryotherapie-en-wellness',
    metaTitle: 'Marketing voor cryotherapie en wellness | Local Levers',
    group: 'klinieken',
    published: false, // gearchiveerd 2026-08-18, klinieken/beauty uit positionering (doc 53)
    guides: [
      'marketing-voor-klinieken',
      'juiste-google-categorie-kiezen',
      'google-posts-voor-klinieken',
      'meer-google-reviews-krijgen-als-kliniek',
      'in-de-top-3-van-google-maps-komen',
    ],
    label: 'cryotherapie- en wellnessstudio\'s',
    labelSingular: 'cryotherapie- en wellnessstudio',
    h1: 'Marketing voor cryotherapie- en wellnessstudio\'s',
    intro:
      'Cryotherapie, ijsbaden en wellness zijn concepten die nog niet iedereen kent, en die vaak op abonnementen en terugkerende bezoeken draaien. Gevonden worden en vertrouwen opbouwen is daarom dubbel belangrijk. Wij zorgen dat mensen je vinden en begrijpen wat je biedt.',
    pains: [
      {
        h: 'Het concept moet nog uitgelegd worden',
        p: 'Een nieuwe categorie vraagt om duidelijkheid: wat bied je, voor wie, en waarom. Een compleet, helder profiel plus reviews helpen de twijfelende bezoeker over de streep.',
      },
      {
        h: 'Abonnementen die stilvallen',
        p: 'Wellness draait vaak op herhaalbezoek en abonnementen. Een klant die wegblijft is terugkerende omzet die stopt. Reactivatie en opvolging houden mensen betrokken.',
      },
      {
        h: 'Onvindbaar terwijl de interesse groeit',
        p: 'De vraag naar herstel en wellness groeit, maar als je niet bovenaan staat als iemand lokaal zoekt, gaat die interesse naar een ander. Wij zetten je op de kaart, ook in de antwoorden van ChatGPT en Perplexity.',
      },
    ],
    faq: [
      {
        q: 'Mijn concept is nog vrij nieuw, heeft SEO dan zin?',
        a: 'Juist dan. Er zijn nog weinig aanbieders, dus de concurrentie op lokale zoektermen is laag. Wie er nu staat, bouwt een voorsprong op voor als de categorie groeit.',
      },
    ],
  },
  {
    slug: 'fysiotherapie',
    group: 'klinieken',
    published: false, // gearchiveerd 2026-08-18, klinieken/beauty uit positionering (doc 53)
    guides: [
      'lokale-seo-voor-klinieken',
      'google-bedrijfsprofiel-optimaliseren-kliniek',
      'hoeveel-google-reviews-heb-ik-nodig',
      'gemiste-telefoontjes-opvolgen',
      'waarom-staat-mijn-concurrent-hoger-in-google-maps',
    ],
    label: 'fysiotherapiepraktijken',
    labelSingular: 'fysiotherapiepraktijk',
    h1: 'Marketing voor fysiotherapiepraktijken',
    intro:
      'Sinds patiënten zonder verwijzing rechtstreeks binnen mogen komen, kiezen ze steeds vaker op basis van Google-reviews en vindbaarheid welke praktijk het wordt. Je hebt geen platform-commissie, maar je bent wel sterk afhankelijk van je reputatie en je plek op de kaart. Wij zorgen dat je gevonden en gekozen wordt door de patiënten met de klachten die bij je passen.',
    pains: [
      {
        h: 'De zelfverwijzer kiest online, en kiest op reviews',
        p: 'Wie zonder verwijzing komt, zoekt eerst op fysiotherapie in de buurt en vergelijkt de sterren. Meer en recentere reviews dan de praktijk om de hoek bepalen bij wie die patiënt binnenloopt.',
      },
      {
        h: 'De praktijk om de hoek lijkt online precies op jou',
        p: 'Voor de zoeker zien twee praktijken in dezelfde wijk er identiek uit. Een compleet profiel, de juiste specialisaties en zichtbare waarderingen zetten neer waarin jij anders bent.',
      },
      {
        h: 'Je agenda vult zich, maar niet met de juiste klachten',
        p: 'Een volle agenda met behandelingen die niet bij je specialisatie passen levert minder op dan gericht gevonden worden op je vakgebied. Vindbaarheid op de juiste termen trekt de patiënten aan waar je het sterkst in bent.',
      },
    ],
    faq: [
      {
        q: 'Ik werk deels met verwijzingen, heeft vindbaarheid dan zin?',
        a: 'Ja. Een groeiend deel van de patiënten komt als zelfverwijzer binnen en kiest op reviews en je plek in Google Maps. Voor die stroom bepaalt vindbaarheid hoeveel nieuwe patiënten je binnenhaalt, naast wat er via verwijzing loopt.',
      },
      {
        q: 'Hoe krijg ik meer reviews van mijn patiënten?',
        a: 'Je patiënten zijn vaak tevreden, maar niemand vraagt ze op het juiste moment. Een vriendelijk, automatisch verzoek na de behandeling zet die stroom op gang, zonder dat jij er zelf achteraan hoeft.',
      },
    ],
  },
  {
    slug: 'chiropractie-en-osteopathie',
    group: 'klinieken',
    published: false, // gearchiveerd 2026-08-18, klinieken/beauty uit positionering (doc 53)
    guides: [
      'lokale-seo-voor-klinieken',
      'waarom-staat-mijn-concurrent-hoger-in-google-maps',
      'reviews-vragen-zonder-opdringerig',
      'ai-vindbaarheid-voor-klinieken',
      'aanvragen-buiten-openingstijden-opvangen',
    ],
    label: 'chiropractie- en osteopathiepraktijken',
    labelSingular: 'chiropractie- en osteopathiepraktijk',
    h1: 'Marketing voor chiropractoren en osteopaten',
    intro:
      'Bij chiropractie en osteopathie twijfelen mensen vaak eerst over de behandelvorm zelf, en pas daarna over de praktijk. Die drempel neem je weg met vertrouwen: reviews, een heldere uitleg en een compleet profiel zijn beslissend voor wie de afspraak maakt. Wij zorgen dat je lokaal gevonden wordt en dat je reputatie het werk doet.',
    pains: [
      {
        h: 'Mensen twijfelen eerst over de behandelvorm',
        p: 'Voor veel zoekers is chiropractie of osteopathie nog onbekend terrein. Echte reviews en een profiel dat rustig uitlegt wat je doet, halen die twijfel weg voordat iemand belt.',
      },
      {
        h: 'Je wordt op een hoop gegooid met de fysio',
        p: 'In de zoekresultaten lopen chiropractie, osteopathie en fysiotherapie door elkaar. De juiste categorieën en positionering maken zichtbaar wat jouw behandelvorm is en voor wie die bedoeld is.',
      },
      {
        h: 'Reviews zijn hier letterlijk doorslaggevend',
        p: 'Omdat de behandeling om vertrouwen draait, kijkt de twijfelende klant extra naar wat anderen zeggen. Weinig of oude reviews laten die klant afhaken naar een collega met een sterker profiel.',
      },
    ],
    faq: [
      {
        q: 'Hoe onderscheid ik me van de fysiotherapeut en van andere praktijken?',
        a: 'Door je profiel in te richten op je specifieke behandelvorm, de juiste Google-categorie te kiezen en reviews te verzamelen die vertellen waarvoor mensen bij jou terechtkomen. Zo zien zoekers en ChatGPT waarin jij verschilt.',
      },
      {
        q: 'Waarom zijn reviews juist voor mijn praktijk zo belangrijk?',
        a: 'Omdat mensen twijfelen over de behandeling zelf, wegen de ervaringen van anderen zwaarder dan bij veel andere branches. Een gestage stroom recente reviews neemt die drempel weg en bepaalt vaak wie de afspraak krijgt.',
      },
    ],
  },
  {
    slug: 'makelaars',
    group: 'huis',
    published: false, // gearchiveerd 2026-08-18: geen vakbedrijf, uit de positionering (doc 53)
    guides: [
      'google-maps-ranking-factoren',
      'hoeveel-google-reviews-heb-ik-nodig',
      'reageren-op-een-negatieve-review',
      'kom-ik-voor-in-ai-zoekresultaten',
      'gemiste-telefoontjes-opvolgen',
    ],
    label: 'makelaars',
    labelSingular: 'makelaar',
    h1: 'Marketing voor makelaars',
    intro:
      'Een huis kopen of verkopen is voor de klant een keuze die om vertrouwen draait, en die vertrouwenskeuze valt tegenwoordig op je reputatie en je vindbaarheid. Naast Funda, waar je fors voor betaalt, zoeken mensen actief naar makelaar in hun stad en vergelijken ze de waarderingen. Wij zorgen dat je daar bovenaan staat met een sterk profiel, zodat je minder afhankelijk bent van een enkel platform.',
    pains: [
      {
        h: 'Afhankelijk van Funda, en dat kost',
        p: 'Een groot deel van je zichtbaarheid en je budget gaat naar een platform dat je niet zelf in de hand hebt. Direct gevonden worden op makelaar in je stad bouwt een kanaal op dat van jou is.',
      },
      {
        h: 'De opdracht gaat naar wie het meeste vertrouwen wekt',
        p: 'Verkopers vergelijken meerdere makelaars voor ze een keuze maken. Recente reviews en een compleet profiel bepalen wie er wordt uitgenodigd voor het waardegesprek.',
      },
      {
        h: 'Een zwak Google-profiel terwijl je lokaal wilt scoren',
        p: 'Je werkt in een afgebakend gebied, maar als je niet bovenaan de kaart staat bij makelaar plus je stad, mist de zoeker je. Een sterk profiel met waarderingen zet je op de kaart, ook in de antwoorden van ChatGPT en Perplexity.',
      },
    ],
    faq: [
      {
        q: 'Hoe word ik minder afhankelijk van Funda?',
        a: 'Door een eigen vindbaarheidskanaal op te bouwen: hoog staan op makelaar in je stad in Google Maps, een compleet Bedrijfsprofiel en een stroom recente reviews. Zo komen opdrachtgevers ook rechtstreeks bij je binnen, buiten het platform om.',
      },
      {
        q: 'Waarom zijn reviews voor een makelaar zo belangrijk?',
        a: 'Omdat het verkopen of kopen van een woning een vertrouwenskeuze is met veel geld erachter. Wat eerdere klanten over je zeggen weegt zwaar mee bij wie de opdracht krijgt, en het is precies waar zoekers en ChatGPT op afgaan.',
      },
    ],
  },
  {
    slug: 'elektriciens',
    group: 'huis',
    guides: [
      'google-maps-ranking-factoren',
      'in-de-top-3-van-google-maps-komen',
      'gemiste-telefoontjes-opvolgen',
      'aanvragen-buiten-openingstijden-opvangen',
      'google-review-link-maken',
    ],
    label: 'elektriciens',
    labelSingular: 'elektricien',
    h1: 'Marketing voor elektriciens',
    intro:
      'Veel elektriciens halen hun klussen via lead-platforms, waar dezelfde aanvraag aan meerdere bedrijven wordt verkocht en je vooraf betaalt zonder te weten of je de klus krijgt. Ondertussen kiezen klanten steeds vaker zelf, op basis van wie bovenaan de kaart staat en de beste reviews heeft. Wij zorgen dat je direct gevonden en gekozen wordt, zonder tussenpartij.',
    pains: [
      {
        h: 'Je betaalt voor leads die je concurrent ook krijgt',
        p: 'Platforms als Werkspot en Offerte.nl verkopen dezelfde aanvraag aan meerdere bedrijven. Je betaalt per lead en offreert tegen anderen, zonder zekerheid dat de klus bij jou landt. Word je zelf gevonden, dan komt de aanvraag rechtstreeks binnen.',
      },
      {
        h: 'Adverteren op elektricien plus je stad is duur',
        p: 'Google Ads op zoektermen als elektricien met je stadsnaam kan flink in de papieren lopen, en je betaalt voor elke klik, ook die zonder klus. Een sterke plek in de kaartresultaten levert aanvragen op zonder dat je per klik betaalt.',
      },
      {
        h: 'Klanten kiezen op reviews en wie bovenaan staat',
        p: 'Wie een elektricien zoekt, klikt op de eerste bedrijven in Google Maps met de meeste en beste reviews. Sta je daar niet tussen, dan zien ze je niet. Wij werken je naar een top-plek en zetten je reviews op gang.',
      },
    ],
    faq: [
      {
        q: 'Kan ik zonder Werkspot toch aan klussen komen?',
        a: 'Ja. Als je in Google Maps en op Apple Maps bovenaan staat en genoeg goede reviews hebt, vinden klanten je rechtstreeks. Die aanvragen zijn van jou alleen, zonder dat je per lead betaalt of tegen meerdere anderen offreert.',
      },
      {
        q: 'Is dit goedkoper dan Google Ads?',
        a: 'Vindbaarheid in de kaartresultaten kost je geen bedrag per klik. Je bouwt een plek op die aanvragen blijft opleveren, terwijl je bij advertenties betaalt zolang je ze aan laat staan. Wij richten ons op dat blijvende fundament.',
      },
    ],
  },
  {
    slug: 'loodgieters',
    group: 'huis',
    guides: [
      'in-de-top-3-van-google-maps-komen',
      'gemiste-telefoontjes-opvolgen',
      'aanvragen-buiten-openingstijden-opvangen',
      'review-vragen-via-whatsapp',
      'google-maps-ranking-factoren',
    ],
    label: 'loodgieters',
    labelSingular: 'loodgieter',
    h1: 'Marketing voor loodgieters',
    intro:
      'Loodgieterswerk is een mix van spoed en gepland werk, en bij allebei begint de klant op Google. Bij een lekkage kiest hij wie bovenaan de kaart staat en goede reviews heeft, want hij belt meteen. Wij zorgen dat je op dat moment gevonden en gekozen wordt, in plaats van dat je betaalt voor gedeelde leads.',
    pains: [
      {
        h: 'Je concurreert met lead-platforms om je eigen klant',
        p: 'Via Werkspot en Offerte.nl koop je een aanvraag die ook aan meerdere andere loodgieters is verkocht. Je betaalt vooraf en offreert tegen de rest. Rechtstreeks gevonden worden levert aanvragen op die alleen bij jou binnenkomen.',
      },
      {
        h: 'Bij spoed telt alleen wie bovenaan staat',
        p: 'Iemand met een lekkage zoekt niet lang en belt een van de eerste bedrijven in Google Maps met goede reviews. Sta je niet in die top, dan gaat de klus naar wie er wel staat. Daar werken wij je naartoe.',
      },
      {
        h: 'De aanvraag die je te laat ziet, ben je kwijt',
        p: 'Een gemiste oproep of een bericht dat pas uren later gezien wordt, gaat naar de volgende loodgieter op de lijst. Snelle, deels automatische opvolging zorgt dat de klant bij jou blijft.',
      },
    ],
    faq: [
      {
        q: 'Hoe kom ik bovenaan bij spoedklussen in mijn stad?',
        a: 'Met een compleet Google Bedrijfsprofiel op je werkgebied, genoeg recente reviews en de juiste categorieën. Dat samen bepaalt of je in de top van de kaart verschijnt op het moment dat iemand met spoed zoekt.',
      },
      {
        q: 'Werkt dit ook voor gepland werk, zoals een badkamer of leidingwerk?',
        a: 'Ja. Voor grotere, geplande klussen vergelijken mensen rustiger en kijken ze naar je reviews en je profiel. Een sterke reputatie en goede vindbaarheid zorgen dat je ook voor dat winstgevende werk gebeld wordt.',
      },
    ],
  },
  {
    slug: 'dakdekkers',
    group: 'huis',
    guides: [
      'google-maps-ranking-factoren',
      'hoeveel-google-reviews-heb-ik-nodig',
      'reageren-op-een-negatieve-review',
      'gemiste-telefoontjes-opvolgen',
      'nap-consistentie-uitgelegd',
    ],
    label: 'dakdekkers',
    labelSingular: 'dakdekker',
    h1: 'Marketing voor dakdekkers',
    intro:
      'Een dak laten vervangen of repareren is voor de meeste mensen een dure, eenmalige klus. Voordat ze bellen, checken ze grondig je reviews en reputatie, want ze willen zeker weten dat ze geen miskoop doen. Wij zorgen dat je gevonden wordt op de kaart en dat je reputatie het vertrouwen wint.',
    pains: [
      {
        h: 'De klant checkt je reputatie voordat hij belt',
        p: 'Bij een dure dakklus neemt niemand een risico. Mensen lezen eerst je reviews en bekijken je profiel. Zonder recente, echte reviews haken ze af nog voor het contactmoment.',
      },
      {
        h: 'Het wantrouwen door malafide dakbedrijven werkt tegen je',
        p: 'De markt kent de verhalen over dakbedrijven die aanbellen en slecht werk achterlaten. Een compleet profiel met echte reviews en zichtbaar werk laat zien dat jij de betrouwbare partij bent.',
      },
      {
        h: 'Wie bovenaan de kaart staat, krijgt de offerte-aanvraag',
        p: 'Zoekt iemand op dakdekker in jouw stad, dan gaat de aanvraag naar de bedrijven die bovenaan Google Maps staan. Sta je daar niet tussen, dan zien ze je simpelweg niet.',
      },
    ],
    faq: [
      {
        q: 'Waarom zijn reviews zo belangrijk voor een dakdekker?',
        a: 'Omdat een dak een dure klus is waar mensen niet lichtvaardig over beslissen. Echte, recente reviews en een compleet profiel nemen de twijfel weg en maken jou de logische keuze wanneer iemand offertes gaat opvragen.',
      },
      {
        q: 'Hoe kom ik bovenaan bij dakdekker in mijn stad?',
        a: 'Door je Google Bedrijfsprofiel compleet te maken op de juiste categorie en werkgebied, reviews te verzamelen op het juiste moment, en zichtbaar te zijn op Google Maps, Apple Maps en in de antwoorden van ChatGPT en Perplexity. Dat samen bepaalt bij wie de aanvraag terechtkomt. We meten de nulmeting bij de start en laten maandelijks de beweging zien.',
      },
    ],
  },
  {
    slug: 'zonnepanelen',
    group: 'huis',
    guides: [
      'google-maps-ranking-factoren',
      'kom-ik-voor-in-ai-zoekresultaten',
      'hoeveel-google-reviews-heb-ik-nodig',
      'wat-levert-een-compleet-google-profiel-op',
      'gemiste-telefoontjes-opvolgen',
    ],
    label: 'zonnepaneel-installateurs',
    labelSingular: 'zonnepaneel-installateur',
    h1: 'Marketing voor zonnepaneel-installateurs',
    intro:
      'De markt voor zonnepanelen kent veel aanbieders en het vertrouwen wisselt sterk. Wie zo\'n investering doet, vergelijkt eerst en leest reviews grondig voordat hij kiest. Wij zorgen dat je gevonden wordt bij mensen die klaar zijn om te kopen, en dat je reputatie je de betrouwbare keuze maakt.',
    pains: [
      {
        h: 'Veel aanbieders, wisselend vertrouwen',
        p: 'De zonnepanelenmarkt zit vol partijen en de klant weet niet wie hij kan vertrouwen. Een compleet profiel met echte reviews zet jou neer als de installateur die zijn afspraken nakomt.',
      },
      {
        h: 'De klant vergelijkt zwaar voordat hij tekent',
        p: 'Bij een investering van duizenden euro\'s haalt niemand halsoverkop een offerte. Mensen lezen reviews en vergelijken aanbieders. Recente reviews en een sterk profiel houden je in dat rijtje, en erbovenop.',
      },
      {
        h: 'De hoge-intentie zoeker gaat naar wie bovenaan staat',
        p: 'Zoekt iemand op zonnepanelen in jouw stad, dan zit hij vaak dicht bij een beslissing. Sta je niet bovenaan de kaart, dan gaat die aanvraag naar de installateur die daar wel staat.',
      },
    ],
    faq: [
      {
        q: 'Er zijn al zoveel zonnepanelenbedrijven, hoe val ik op?',
        a: 'Door zichtbaar te zijn waar mensen kiezen: bovenaan Google Maps op je werkgebied, met meer en recentere reviews dan de concurrent, en aanwezig in de antwoorden van ChatGPT en Perplexity. Dat maakt jou de betrouwbare keuze in een markt waar vertrouwen het verschil bepaalt.',
      },
      {
        q: 'Werkt lokale vindbaarheid voor zonnepanelen?',
        a: 'Ja. Mensen zoeken lokaal naar zonnepanelen en installateurs in hun regio. Wie in de top van de kaart staat met goede reviews, pakt de aanvragen van de zoekers die klaar zijn om te investeren.',
      },
    ],
  },
  {
    slug: 'schildersbedrijven',
    group: 'huis',
    guides: [
      'in-de-top-3-van-google-maps-komen',
      'gemiste-telefoontjes-opvolgen',
      'aanvragen-buiten-openingstijden-opvangen',
      'review-vragen-via-whatsapp',
      'google-maps-ranking-factoren',
    ],
    label: 'schildersbedrijven',
    labelSingular: 'schildersbedrijf',
    h1: 'Marketing voor schildersbedrijven',
    intro:
      'Schilderwerk buiten kan niet het hele jaar, dus de drukte concentreert zich in het voorjaar en de zomer. Mensen vragen bij een paar schildersbedrijven tegelijk een offerte op en kiezen wie het eerst reageert en het meeste vertrouwen wekt. Wij zorgen dat jij daarbovenaan staat, in het seizoen en erbuiten.',
    pains: [
      {
        h: 'De offerte-aanvraag gaat naar wie het eerst reageert',
        p: 'Bij buitenschilderwerk vraagt een klant vaak bij meerdere bedrijven tegelijk een offerte op en kiest hij binnen een paar dagen. Sta je bovenaan Google Maps met goede reviews, dan ben je een van de eerste die hij belt, in plaats van dat je achteraan het rijtje meedingt.',
      },
      {
        h: 'Het seizoen bepaalt of je agenda vol zit',
        p: 'Buiten schilderen kan grofweg van april tot oktober, en in die maanden stroomt de vraag vanzelf binnen. In de wintermaanden valt dat weg, terwijl binnenschilderwerk het hele jaar door kan. Vindbaar zijn op binnenwerk houdt je agenda ook buiten het seizoen gevuld.',
      },
      {
        h: 'Je werk zit onder de verf, tot het klaar is',
        p: 'Een klant ziet pas na afloop of de afwerking netjes is en de randen recht zijn. Vooraf moet het vertrouwen dus ergens anders vandaan komen: uit foto\'s van eerder werk en uit wat andere klanten erover zeggen.',
      },
    ],
    faq: [
      {
        q: 'Ik zit in het seizoen al vol, heeft dit dan zin?',
        a: 'Juist dan. Een volle agenda in het seizoen zegt niets over de wintermaanden, en vindbaarheid op binnenschilderwerk vult precies dat gat. Daarnaast leggen we nu al de basis voor volgend seizoen, zodat je dan sneller vol zit.',
      },
      {
        q: 'Hoe kom ik hoger dan andere schildersbedrijven bij een offerte-aanvraag?',
        a: 'Door een compleet Google Bedrijfsprofiel op je werkgebied, genoeg recente reviews en de juiste categorieën, en door zichtbaar te zijn op Apple Maps en in de antwoorden van ChatGPT en Perplexity. Dat bepaalt of je in de top van de kaart verschijnt op het moment dat iemand offertes gaat opvragen, en of hij jou als eerste belt.',
      },
    ],
  },
  {
    slug: 'hoveniers',
    group: 'huis',
    guides: [
      'in-de-top-3-van-google-maps-komen',
      'gemiste-telefoontjes-opvolgen',
      'aanvragen-buiten-openingstijden-opvangen',
      'review-vragen-via-whatsapp',
      'google-maps-ranking-factoren',
    ],
    label: 'hoveniers',
    labelSingular: 'hovenier',
    h1: 'Marketing voor hoveniers',
    intro:
      'Een hoveniersbedrijf krijgt de meeste aanvragen in een paar maanden tijd, wanneer iedereen tegelijk de tuin wil laten aanpakken. Wie dan niet bovenaan staat, mist een groot deel van het seizoen. Wij zorgen dat je er staat voordat de drukte begint, en dat je werk zichtbaar is voor wie twijfelt.',
    pains: [
      {
        h: 'Het voorjaar is druk, of je bent onvindbaar',
        p: 'Vanaf begin voorjaar zoeken mensen massaal naar tuinonderhoud en tuinaanleg, en die vraag piekt in een korte periode. Sta je dan niet in de top van Google Maps, dan gaat die aanvraag naar het hoveniersbedrijf dat er wel staat, en die piek komt maar een keer per jaar terug.',
      },
      {
        h: 'Onderhoud en aanleg trekken andere klanten',
        p: 'Terugkerend tuinonderhoud vult je agenda, maar een tuinaanleg-project is vaak de klus waar je meer aan overhoudt. Vindbaarheid op de dienst waar je marge zit, bepaalt of je vooral kleine onderhoudsklussen binnenkrijgt of ook de grotere projecten.',
      },
      {
        h: 'Je werk is pas overtuigend als je het laat zien',
        p: 'Een tuin voor en na is het beste bewijs dat je levert wat je belooft, maar zonder een profiel vol foto\'s ziet niemand dat. Reviews en projectfoto\'s zijn wat de twijfelende klant over de streep trekken.',
      },
    ],
    faq: [
      {
        q: 'Hoe zorg ik dat ik klaar sta voor het voorjaar in plaats van het te missen?',
        a: 'Door al voor het seizoen begint bovenaan te staan in Google Maps en op Apple Maps, met recente reviews en een profiel dat compleet is. Mensen beginnen vaak eerder te zoeken dan te bellen, dus wie er dan al staat, pakt de piek als die komt.',
      },
      {
        q: 'Werkt dit ook voor tuinonderhoud, of alleen voor grote aanleg-projecten?',
        a: 'Voor allebei. Vindbaarheid op de dienst waar je het meest aan overhoudt, of dat aanleg is of juist een vast onderhoudscontract, bepaalt welk soort aanvraag je binnenkrijgt.',
      },
    ],
  },
  {
    slug: 'installatiebedrijven',
    group: 'huis',
    guides: [
      'in-de-top-3-van-google-maps-komen',
      'gemiste-telefoontjes-opvolgen',
      'aanvragen-buiten-openingstijden-opvangen',
      'review-vragen-via-whatsapp',
      'google-maps-ranking-factoren',
    ],
    label: 'installatiebedrijven',
    labelSingular: 'installatiebedrijf',
    h1: 'Marketing voor installatiebedrijven (cv, warmtepomp en airco)',
    intro:
      'Een cv-ketel die het begeeft is een spoedklus, een overstap naar een warmtepomp is een beslissing waar iemand weken over nadenkt. Bij allebei begint de klant met zoeken, en dat is precies waar veel installatiebedrijven onzichtbaar blijven. Wij zorgen dat je gevonden wordt op het moment dat het telt, of dat nu vandaag is of over een paar weken.',
    pains: [
      {
        h: 'Bij een storing telt alleen wie er als eerste staat',
        p: 'Een kapotte cv-ketel in de winter is geen klus waar iemand lang over nadenkt: hij zoekt, belt een van de eerste bedrijven in Google Maps met goede reviews, en klaar. Sta je daar niet tussen, dan gaat de storing naar de concurrent die er wel staat.',
      },
      {
        h: 'De overstap naar een warmtepomp is een ander soort beslissing',
        p: 'Bij vervanging van een cv-ketel of de overstap naar een warmtepomp vergelijkt iemand rustig meerdere installatiebedrijven en leest hij reviews voordat hij een offerte aanvraagt. Recente reviews en een compleet profiel houden je in dat rijtje, en liefst erbovenop.',
      },
      {
        h: 'Je vraag verschuift met het seizoen',
        p: 'Storingen aan de cv-ketel pieken in de winter, airco-installaties pieken in de zomer. Vindbaar zijn op beide houdt je agenda het hele jaar gevuld, in plaats van dat je in de rustige maanden op je handen zit.',
      },
    ],
    faq: [
      {
        q: 'Ik krijg vooral spoedklussen binnen, heeft vindbaarheid dan zin?',
        a: 'Juist bij spoed telt het meest. Wie met een kapotte ketel zoekt, belt een van de eerste bedrijven in Google Maps met goede reviews. Sta je daar niet tussen, dan ziet die klant je simpelweg niet.',
      },
      {
        q: 'Hoe help ik iemand die twijfelt over een warmtepomp om voor mij te kiezen?',
        a: 'Met een compleet Google Bedrijfsprofiel op je werkgebied, genoeg recente reviews die vertellen hoe je te werk gaat, en zichtbaarheid op Apple Maps en in de antwoorden van ChatGPT en Perplexity. Bij een grote beslissing zoals een warmtepomp weegt dat zwaarder mee dan een lage offerte alleen.',
      },
    ],
  },
  {
    slug: 'tegelzetters',
    group: 'huis',
    guides: [
      'in-de-top-3-van-google-maps-komen',
      'gemiste-telefoontjes-opvolgen',
      'aanvragen-buiten-openingstijden-opvangen',
      'review-vragen-via-whatsapp',
      'google-maps-ranking-factoren',
    ],
    label: 'tegelzetters',
    labelSingular: 'tegelzetter',
    h1: 'Marketing voor tegelzetters',
    intro:
      'Veel tegelzetters werken als onderaannemer voor een bouwbedrijf of badkamerbedrijf, zonder eigen klantcontact en zonder eigen marge daarop. Rechtstreeks gevonden worden door de particulier die zijn badkamer of keuken verbouwt, is winstgevender. Wij zorgen dat die klant jou vindt, naast het werk dat al via anderen binnenkomt.',
    pains: [
      {
        h: 'Je werkt voor de marge van een ander',
        p: 'Als onderaannemer krijg je de klus doorgeschoven, tegen een prijs die de aannemer of badkamerbedrijf bepaalt. Rechtstreeks gevonden worden door de particulier levert een klus op waar jij de prijs en de klant zelf in de hand hebt.',
      },
      {
        h: 'Je vakwerk is pas zichtbaar als het af is',
        p: 'Recht verband, strakke naden en een nette afwerking zijn wat je onderscheidt, maar dat zie je pas als de klus klaar is. Foto\'s van eerder werk op je profiel laten dat verschil zien voordat iemand je belt.',
      },
      {
        h: 'Iemand laat je weken in zijn badkamer werken',
        p: 'Een verbouwing is een vertrouwenskeuze: er komt iemand dagen of weken in huis. Reviews van eerdere klanten nemen die twijfel weg en bepalen vaak wie de opdracht krijgt boven een andere tegelzetter met dezelfde offerte.',
      },
    ],
    faq: [
      {
        q: 'Ik werk vooral via aannemers, heeft dit dan zin?',
        a: 'Ja. Rechtstreekse klussen bij particulieren lopen naast het werk dat via aannemers binnenkomt, en die klussen zijn vaak winstgevender omdat jij de prijs bepaalt. Vindbaarheid zorgt dat die klant jou zelf vindt in plaats van via een tussenpartij.',
      },
      {
        q: 'Hoe laat ik mijn vakwerk online zien?',
        a: 'Met een compleet Google Bedrijfsprofiel vol foto\'s van afgeronde klussen en echte reviews van particuliere klanten. Dat is precies wat een zoeker of ChatGPT en Perplexity gebruiken om te bepalen wie het vakwerk levert.',
      },
    ],
  },
  {
    slug: 'stukadoors',
    group: 'huis',
    guides: [
      'in-de-top-3-van-google-maps-komen',
      'gemiste-telefoontjes-opvolgen',
      'aanvragen-buiten-openingstijden-opvangen',
      'review-vragen-via-whatsapp',
      'google-maps-ranking-factoren',
    ],
    label: 'stukadoors',
    labelSingular: 'stukadoor',
    h1: 'Marketing voor stukadoors',
    intro:
      'Stucwerk is vaak een van de laatste stappen in een verbouwing of nieuwbouwproject, onder tijdsdruk van de aannemer of de opdrachtgever. Een groot deel van het werk komt binnen via doorverwijzing, terwijl de particulier die zelf zijn huis verbouwt je net zo goed rechtstreeks kan vinden. Wij zorgen dat die klant jou ook zonder tussenpersoon weet te vinden.',
    pains: [
      {
        h: 'Je bent afhankelijk van wie je doorverwijst',
        p: 'Zonder eigen naamsbekendheid ben je overgeleverd aan aannemers en andere vakmensen die je aanbevelen. Rechtstreeks gevonden worden door de particulier die verbouwt, geeft je een stroom klussen die niet van een ander afhangt.',
      },
      {
        h: 'Je werk is pas te beoordelen als het droog en glad is',
        p: 'Een klant kan vooraf niet zien of de wanden strak worden. Foto\'s van eerder werk en reviews van klanten die het resultaat wel zagen, zijn wat de twijfel wegneemt voordat je begint.',
      },
      {
        h: 'De opdracht gaat naar wie bovenaan staat',
        p: 'Zoekt iemand op stukadoor in zijn stad, dan gaat de aanvraag naar de bedrijven die bovenaan Google Maps staan met de beste reviews. Sta je daar niet tussen, dan komt die aanvraag nooit bij je binnen.',
      },
    ],
    faq: [
      {
        q: 'Ik krijg werk vooral via aannemers doorverwezen, heeft vindbaarheid dan zin?',
        a: 'Ja. Naast het werk dat via anderen binnenkomt, zoeken particulieren die zelf verbouwen rechtstreeks naar een stukadoor in hun stad. Die aanvragen mis je zolang je daar niet bovenaan staat.',
      },
      {
        q: 'Hoe overtuig ik iemand die me nog niet kent?',
        a: 'Met een compleet Google Bedrijfsprofiel vol foto\'s van afgerond werk en echte reviews. Dat is voor een klant die je nog niet kent het enige bewijs dat hij vooraf heeft, en het is precies waar ChatGPT en Perplexity op afgaan.',
      },
    ],
  },
  {
    slug: 'aannemers',
    group: 'huis',
    guides: [
      'in-de-top-3-van-google-maps-komen',
      'gemiste-telefoontjes-opvolgen',
      'aanvragen-buiten-openingstijden-opvangen',
      'review-vragen-via-whatsapp',
      'google-maps-ranking-factoren',
    ],
    label: 'aannemers en bouwbedrijven',
    labelSingular: 'aannemer',
    h1: 'Marketing voor aannemers en bouwbedrijven',
    intro:
      'Aannemers leven van grotere projecten: verbouwingen, aanbouw, nieuwbouw. De offertetrajecten lopen weken tot maanden, de bedragen zijn hoog, en de klant vergelijkt grondig voor hij tekent. Veel aannemers draaien nog vooral op via via, terwijl de klant die zelf naar een aannemer in zijn stad zoekt naar de concurrent gaat. Wij zorgen dat die klant jou ook vindt.',
    pains: [
      {
        h: 'Een offerte kost je dagen, en je weet niet of je wint',
        p: 'Bij een verbouwing of aanbouw steekt een aannemer flink wat tijd in een doordachte offerte, terwijl de klant vaak bij meerdere bedrijven tegelijk aanklopt. Sta je bovenaan in Google Maps met sterke reviews, dan zit je vaker bij die selectie in plaats van erbuiten.',
      },
      {
        h: 'Het project duurt weken, dus vertrouwen weegt zwaar',
        p: 'Een verbouwing betekent dat er wekenlang iemand in en om het huis werkt. Voor de klant is dat een risico, en dat risico weegt hij af aan de hand van reviews en wat hij over je vindt voordat hij een offerte aanvraagt.',
      },
      {
        h: 'Je zit vol via via, maar dat netwerk is eindig',
        p: 'Doorverwijzing van tevreden klanten is waardevol, maar het groeit niet vanzelf mee met wat je aankan. Rechtstreeks gevonden worden door wie nu naar een aannemer in zijn stad zoekt, geeft je een tweede stroom naast wat er al binnenkomt.',
      },
    ],
    faq: [
      {
        q: 'Ik krijg mijn werk vooral via via, heeft vindbaarheid dan zin?',
        a: 'Ja. Via via blijft waardevol, maar het schaalt niet vanzelf mee. Wie rechtstreeks naar een aannemer in zijn stad zoekt en jou niet vindt, gaat naar de partij die er wel staat. Dat is een aparte stroom aanvragen naast wat je al hebt.',
      },
      {
        q: 'Hoe overtuig ik iemand die grote bedragen investeert in mijn bedrijf?',
        a: 'Met een compleet Google Bedrijfsprofiel vol reviews van eerdere projecten, en zichtbaarheid op Apple Maps en in de antwoorden van ChatGPT en Perplexity. Bij een grote beslissing zoals een verbouwing weegt dat net zo zwaar mee als de offerte zelf.',
      },
    ],
  },
  {
    slug: 'verbouw-en-renovatie',
    group: 'huis',
    guides: [
      'in-de-top-3-van-google-maps-komen',
      'gemiste-telefoontjes-opvolgen',
      'aanvragen-buiten-openingstijden-opvangen',
      'review-vragen-via-whatsapp',
      'google-maps-ranking-factoren',
    ],
    label: 'verbouw- en renovatiebedrijven',
    labelSingular: 'verbouwbedrijf',
    h1: 'Marketing voor verbouw- en renovatiebedrijven (badkamer en keuken)',
    intro:
      'Een nieuwe badkamer of keuken is voor de meeste huiseigenaren een investering die ze maar eens in de zoveel jaar doen, en ze willen het in één keer goed. Voor ze een offerte aanvragen, bekijken ze meerdere bedrijven, lezen ze reviews en kijken ze naar foto\'s van eerder werk. Wij zorgen dat jij in dat rijtje staat, en liefst erbovenop.',
    pains: [
      {
        h: 'De klant vergelijkt uitgebreid voor hij belt',
        p: 'Een badkamer- of keukenrenovatie is een grote uitgave die niet snel wordt herhaald. Mensen nemen de tijd, bekijken meerdere bedrijven en lezen reviews grondig voordat ze een showroomafspraak maken. Sta je daar niet tussen, dan zie je die aanvraag nooit.',
      },
      {
        h: 'Je werk is pas te zien als het klaar is',
        p: 'Voor de renovatie begint, heeft de klant alleen een tekening en een belofte. Foto\'s van eerder afgeronde badkamers en keukens op je profiel laten zien wat hij kan verwachten, nog voor het eerste gesprek.',
      },
      {
        h: 'Weken bouwoverlast vraagt om vertrouwen vooraf',
        p: 'Een badkamer of keuken vernieuwen betekent dagen tot weken zonder normaal gebruik van die ruimte, met vakmensen over de vloer. Reviews van klanten die dat traject al doorliepen nemen die twijfel weg voordat jij het gesprek voert.',
      },
    ],
    faq: [
      {
        q: 'Hoe laat ik zien wat voor badkamers en keukens ik lever?',
        a: 'Met een compleet Google Bedrijfsprofiel vol foto\'s van afgeronde renovaties en echte reviews van klanten. Dat is voor iemand die nog nooit met je werkte het enige bewijs dat hij vooraf heeft.',
      },
      {
        q: 'Hoe kom ik in het rijtje waar de klant zijn offertes aanvraagt?',
        a: 'Door bovenaan te staan in Google Maps op je werkgebied, met recente reviews en de juiste categorie, en zichtbaar te zijn op Apple Maps en in de antwoorden van ChatGPT en Perplexity. Dat bepaalt of je meedingt op het moment dat iemand offertes gaat opvragen.',
      },
    ],
  },
  {
    slug: 'klusbedrijven',
    group: 'huis',
    guides: [
      'in-de-top-3-van-google-maps-komen',
      'gemiste-telefoontjes-opvolgen',
      'aanvragen-buiten-openingstijden-opvangen',
      'review-vragen-via-whatsapp',
      'google-maps-ranking-factoren',
    ],
    label: 'klusbedrijven',
    labelSingular: 'klusbedrijf',
    h1: 'Marketing voor klusbedrijven',
    intro:
      'Een klusbedrijf leeft van veel losse klussen: een deur die niet meer sluit, een plank ophangen, een laminaatvloer leggen. De klant die dat nodig heeft, zoekt meestal dezelfde dag nog en kiest snel. Wie bovenaan staat met goede reviews, krijgt de klus. Wij zorgen dat jij dat bent.',
    pains: [
      {
        h: 'Je concurreert met platforms om je eigen klant',
        p: 'Via Werkspot en vergelijkbare platforms koop je een aanvraag die ook aan andere klusbedrijven is verkocht. Je betaalt vooraf en offreert tegen de rest. Rechtstreeks gevonden worden levert een klus op die alleen bij jou binnenkomt.',
      },
      {
        h: 'Bij een kleine klus kiest de klant snel',
        p: 'Voor een kleine klus neemt niemand dagen de tijd om te vergelijken. Er wordt gezocht, een van de eerste bedrijven in Google Maps met goede reviews gebeld, en klaar. Sta je daar niet tussen, dan gaat de klus naar wie er wel staat.',
      },
      {
        h: 'Losse klussen leveren minder op dan een vaste klant',
        p: 'Een klant die één keer belt voor een klusje is minder waard dan iemand die je jaren later weer belt voor de volgende klus. Een compleet profiel met reviews zorgt dat mensen je onthouden en terugkomen in plaats van opnieuw te gaan zoeken.',
      },
    ],
    faq: [
      {
        q: 'Kan ik zonder Werkspot toch genoeg klussen binnenhalen?',
        a: 'Ja. Sta je bovenaan in Google Maps met genoeg goede reviews, dan vinden klanten je rechtstreeks. Die aanvragen zijn van jou alleen, zonder dat je per lead betaalt of tegen anderen offreert.',
      },
      {
        q: 'Ik doe heel veel verschillende klussen, hoe pak je dat aan?',
        a: 'We richten je profiel in op de klussen waar je het meest aan overhoudt, zodat je vindbaar bent op die zoektermen, naast je algemene naamsbekendheid als klusbedrijf. Op Apple Maps en in de antwoorden van ChatGPT en Perplexity werkt dezelfde keuze door.',
      },
    ],
  },
  {
    slug: 'kozijnenbedrijven',
    group: 'huis',
    guides: [
      'in-de-top-3-van-google-maps-komen',
      'gemiste-telefoontjes-opvolgen',
      'aanvragen-buiten-openingstijden-opvangen',
      'review-vragen-via-whatsapp',
      'google-maps-ranking-factoren',
    ],
    label: 'kozijnenbedrijven',
    labelSingular: 'kozijnenbedrijf',
    h1: 'Marketing voor kozijnenbedrijven (ramen, deuren en kozijnen)',
    intro:
      'Kozijnen, ramen en deuren worden meestal vervangen op een moment dat de oude kierdicht en tochtig zijn geworden, niet uit verveling. Zodra iemand op dat punt zit, vraagt hij bij een paar bedrijven tegelijk een offerte op en vergelijkt hij prijs, materiaal en reviews. Wij zorgen dat jij in dat rijtje staat op het moment dat de klant klaar is om te vervangen.',
    pains: [
      {
        h: 'Het vervangmoment komt maar eens in de zoveel jaar',
        p: 'Iemand vervangt zijn kozijnen niet vaak, dus als het moment daar is, zoekt hij serieus en vergelijkt hij grondig. Mis je dat moment omdat je niet bovenaan staat, dan duurt het jaren voor die klant weer op de markt is.',
      },
      {
        h: 'De klant vergelijkt op prijs, materiaal en vertrouwen tegelijk',
        p: 'Kunststof, hout of aluminium, en welk bedrijf het levert: dat zet iemand naast elkaar voor hij beslist. Reviews en een compleet profiel bepalen of jij in dat rijtje blijft staan naast de prijsvergelijking.',
      },
      {
        h: 'Nieuwe kozijnen zijn zichtbaar voor de hele straat',
        p: 'Een vervangen kozijn of voordeur is voor de buren meteen te zien. Dat maakt een tevreden klant een goede aanbeveling, maar alleen als er ook online iets te vinden is om die aanbeveling te bevestigen.',
      },
    ],
    faq: [
      {
        q: 'Hoe zorg ik dat ik in beeld ben als iemand eindelijk gaat vervangen?',
        a: 'Door structureel bovenaan te staan in Google Maps op kozijnen, ramen en deuren in je werkgebied, met recente reviews, een compleet profiel en zichtbaarheid op Apple Maps en in de antwoorden van ChatGPT en Perplexity. Dat is precies het moment waarop iemand na jaren twijfelen eindelijk gaat zoeken.',
      },
      {
        q: 'Hoe onderscheid ik me als de klant toch vooral op prijs let?',
        a: 'Reviews en foto\'s van eerder werk laten zien dat je afspraken nakomt en netjes oplevert. Bij een vergelijkbare offerte is dat vaak de doorslag, ook als jij niet de goedkoopste bent.',
      },
    ],
  },
  {
    slug: 'isolatiebedrijven',
    group: 'huis',
    guides: [
      'in-de-top-3-van-google-maps-komen',
      'gemiste-telefoontjes-opvolgen',
      'aanvragen-buiten-openingstijden-opvangen',
      'review-vragen-via-whatsapp',
      'google-maps-ranking-factoren',
    ],
    label: 'isolatiebedrijven',
    labelSingular: 'isolatiebedrijf',
    h1: 'Marketing voor isolatiebedrijven',
    intro:
      'Isolatie zit middenin de energietransitie: spouwmuur, vloer, dak, mensen zoeken er actief naar en subsidies maken de beslissing concreter. Maar de branche kent ook een geschiedenis van bedrijven die aanbellen en slecht werk achterlaten, en dat wantrouwen werkt tegen goede bedrijven mee. Wij zorgen dat jij eruit springt als de betrouwbare partij, op het moment dat mensen zoeken.',
    pains: [
      {
        h: 'Het wantrouwen in de branche werkt tegen je',
        p: 'Verhalen over deur-aan-deur-verkopers en slecht uitgevoerde isolatie zitten er bij veel mensen in. Een compleet profiel met echte, recente reviews laat zien dat jij niet die partij bent.',
      },
      {
        h: 'De vraag groeit, maar niet iedereen vindt jou',
        p: 'Steeds meer mensen zoeken actief naar isolatie voor hun spouwmuur, vloer of dak. Sta je niet bovenaan in Google Maps op die zoektermen, dan gaat die aanvraag naar het isolatiebedrijf dat daar wel staat.',
      },
      {
        h: 'Subsidie maakt mensen kritischer, niet minder',
        p: 'Met subsidie in het vooruitzicht rekenen mensen extra goed na en vergelijken ze meerdere aanbieders voor ze kiezen. Reviews en een helder profiel bepalen wie ze uiteindelijk bellen voor de offerte.',
      },
    ],
    faq: [
      {
        q: 'Hoe onderscheid ik me van de bedrijven die de branche een slechte naam geven?',
        a: 'Met een compleet Google Bedrijfsprofiel vol echte reviews van klanten die het werk lieten uitvoeren. Dat is precies waar een twijfelende klant op let, en het is ook wat ChatGPT en Perplexity gebruiken om jou aan te bevelen.',
      },
      {
        q: 'Ik merk dat de vraag naar isolatie groeit, hoe pak ik dat moment?',
        a: 'Door nu al bovenaan te staan in Google Maps op spouwmuur-, vloer- en dakisolatie in je werkgebied. Wie op dit moment zoekt is vaak al ver in zijn beslissing en vraagt snel een offerte aan bij wie hij als eerste tegenkomt.',
      },
    ],
  },
  {
    slug: 'straatmakers',
    group: 'huis',
    guides: [
      'in-de-top-3-van-google-maps-komen',
      'gemiste-telefoontjes-opvolgen',
      'aanvragen-buiten-openingstijden-opvangen',
      'review-vragen-via-whatsapp',
      'google-maps-ranking-factoren',
    ],
    label: 'straatmakers',
    labelSingular: 'straatmaker',
    h1: 'Marketing voor straatmakers (bestrating en sierbestrating)',
    intro:
      'Een oprit of terras laten bestraten is projectwerk dat vaak in het voorjaar en de zomer wordt aangevraagd, wanneer de tuin op de schop gaat. Het resultaat ligt letterlijk op straat, zichtbaar voor de hele buurt, wat het tot een van de sterkste vormen van mond-tot-mondreclame maakt, mits er online iets te vinden is om die aanbeveling te bevestigen. Wij zorgen dat je gevonden wordt als het seizoen begint.',
    pains: [
      {
        h: 'De drukte piekt in een paar maanden',
        p: 'Vanaf het voorjaar zoeken mensen massaal naar bestrating voor terras of oprit, en die vraag concentreert zich in een korte periode. Sta je dan niet bovenaan in Google Maps, dan gaat het project naar de straatmaker die er wel staat, en die piek komt maar een keer per jaar terug.',
      },
      {
        h: 'Je werk ligt zichtbaar bij de buren, maar dat alleen is niet genoeg',
        p: 'Een net bestraat terras of een strakke oprit valt op bij iedereen die voorbijloopt. Dat levert aanbevelingen op, maar wie die aanbeveling checkt en jou online niet vindt, gaat toch verder zoeken.',
      },
      {
        h: 'De offerte-aanvraag gaat naar wie er als eerste staat',
        p: 'Zoekt iemand op straatmaker of bestrating in zijn stad, dan gaat de aanvraag naar de bedrijven bovenaan Google Maps met de beste reviews. Sta je daar niet tussen, dan komt die aanvraag nooit bij je binnen.',
      },
    ],
    faq: [
      {
        q: 'Hoe zorg ik dat ik klaarsta voor het voorjaar in plaats van het te missen?',
        a: 'Door al voor het seizoen begint bovenaan te staan in Google Maps en op Apple Maps, met recente reviews en een compleet profiel. Mensen beginnen vaak eerder te zoeken dan te bellen, dus wie er dan al staat, pakt de piek als die komt.',
      },
      {
        q: 'Mijn werk wordt vaak aanbevolen door buren, heeft online vindbaarheid dan nog zin?',
        a: 'Juist dan. Een aanbeveling zet iemand aan om te zoeken, maar hij checkt eerst je reviews en profiel voor hij belt. Zonder dat online bewijs valt een deel van die aanbevelingen alsnog weg.',
      },
    ],
  },
  {
    slug: 'timmerbedrijven',
    group: 'huis',
    guides: [
      'in-de-top-3-van-google-maps-komen',
      'gemiste-telefoontjes-opvolgen',
      'aanvragen-buiten-openingstijden-opvangen',
      'review-vragen-via-whatsapp',
      'google-maps-ranking-factoren',
    ],
    label: 'timmerbedrijven',
    labelSingular: 'timmerbedrijf',
    h1: 'Marketing voor timmerbedrijven',
    intro:
      'Een timmerbedrijf werkt aan alles van een dakkapel tot een vlonder of maatwerk interieur, vaak in eigen opdracht en soms als onderaannemer. Het vakmanschap zit in de details, en die zijn precies wat een klant online wil zien voordat hij een timmerman aan zijn huis toelaat. Wij zorgen dat dat werk gevonden wordt door wie er rechtstreeks naar zoekt.',
    pains: [
      {
        h: 'Je vakwerk zit in details die je online moet laten zien',
        p: 'Strakke verbindingen en een nette afwerking zijn wat een timmerman onderscheidt, maar dat ziet een klant pas als het werk klaar is. Foto\'s van afgeronde projecten op je profiel laten dat verschil zien voordat iemand belt.',
      },
      {
        h: 'Je werkt voor de marge van een ander',
        p: 'Als onderaannemer krijg je de klus doorgeschoven tegen een prijs die een ander bepaalt. Rechtstreeks gevonden worden door de particulier die een dakkapel of vlonder wil, levert een klus op waar jij de prijs zelf bepaalt.',
      },
      {
        h: 'Een timmerklus laat iemand dagen bij je in huis of tuin werken',
        p: 'Of het nu een dakkapel is of een interieurstuk, er komt iemand een tijd op locatie werken. Reviews van eerdere klanten nemen die twijfel weg en bepalen vaak wie de opdracht krijgt boven een andere timmerman met dezelfde offerte.',
      },
    ],
    faq: [
      {
        q: 'Ik werk vooral als onderaannemer, heeft vindbaarheid dan zin?',
        a: 'Ja. Rechtstreekse klussen bij particulieren lopen naast het werk dat via anderen binnenkomt, en die klussen zijn vaak winstgevender omdat jij de prijs bepaalt. Vindbaarheid zorgt dat die klant jou zelf vindt.',
      },
      {
        q: 'Hoe laat ik mijn vakwerk online zien?',
        a: 'Met een compleet Google Bedrijfsprofiel vol foto\'s van afgeronde klussen en echte reviews. Dat is precies wat een zoeker of ChatGPT en Perplexity gebruiken om te bepalen wie het vakwerk levert.',
      },
    ],
  },
  {
    slug: 'ongediertebestrijding',
    group: 'huis',
    guides: [
      'in-de-top-3-van-google-maps-komen',
      'gemiste-telefoontjes-opvolgen',
      'aanvragen-buiten-openingstijden-opvangen',
      'review-vragen-via-whatsapp',
      'google-maps-ranking-factoren',
    ],
    label: 'ongediertebestrijders',
    labelSingular: 'ongediertebestrijder',
    h1: 'Marketing voor ongediertebestrijders',
    intro:
      'Wie ongedierte in huis ontdekt, wil er meteen vanaf en zoekt liever niet lang. Het is een klus met haast en met een zekere gêne, en de klant kiest bijna altijd voor het bedrijf dat bovenaan staat en er betrouwbaar uitziet. Wij zorgen dat jij daar staat op het moment dat iemand zoekt, en dat je reputatie het vertrouwen wint.',
    pains: [
      {
        h: 'Bij ongedierte telt alleen wie er als eerste staat',
        p: 'Iemand met muizen, wespen of een andere plaag zoekt niet lang en belt een van de eerste bedrijven in Google Maps met goede reviews. Sta je daar niet tussen, dan gaat de klus naar de concurrent die er wel staat.',
      },
      {
        h: 'De klant belt liever meteen goed dan twee keer',
        p: 'Niemand wil een tweede bedrijf bellen omdat het probleem terugkwam. Reviews die vertellen dat het echt is opgelost, wegen zwaarder dan de laagste prijs bij het maken van die keus.',
      },
      {
        h: 'Een deel van je omzet zit in terugkerend werk, niet in het eerste bezoek',
        p: 'Preventief contract of een controleafspraak later in het jaar levert meer op dan één losse ingreep. Een klant die tevreden is over het eerste bezoek, moet ook aan dat vervolg herinnerd worden, anders vergeet hij het.',
      },
    ],
    faq: [
      {
        q: 'Hoe kom ik bovenaan te staan als iemand met spoed zoekt?',
        a: 'Met een compleet Google Bedrijfsprofiel op je werkgebied, genoeg recente reviews, de juiste categorie en zichtbaarheid op Apple Maps en in de antwoorden van ChatGPT en Perplexity. Dat bepaalt of je in de top van Google Maps verschijnt op het moment dat iemand met een plaag in huis zoekt.',
      },
      {
        q: 'Hoe zorg ik dat klanten later terugkomen voor een controle of contract?',
        a: 'Automatische opvolging na het eerste bezoek herinnert de klant op het juiste moment aan een controleafspraak, zonder dat jij er zelf achteraan hoeft te bellen.',
      },
    ],
  },
  {
    slug: 'gevelreiniging',
    group: 'huis',
    guides: [
      'in-de-top-3-van-google-maps-komen',
      'gemiste-telefoontjes-opvolgen',
      'aanvragen-buiten-openingstijden-opvangen',
      'review-vragen-via-whatsapp',
      'google-maps-ranking-factoren',
    ],
    label: 'gevelreinigingsbedrijven',
    labelSingular: 'gevelreiniger',
    h1: 'Marketing voor gevelreinigingsbedrijven',
    intro:
      'Een schone gevel is het duidelijkste voor-en-na resultaat dat er is, en dat is precies waarom gevelreiniging zich goed leent voor wie het online laat zien. Veel klanten beslissen pas als ze bij een buurman of in hun straat een schoongemaakte gevel zien. Wij zorgen dat jij op dat moment gevonden wordt.',
    pains: [
      {
        h: 'De klant beslist vaak pas als hij het al ergens zag',
        p: 'Iemand die twijfelt over gevelreiniging wordt over de streep getrokken door een schoon huis in de buurt of door duidelijke voor-na foto\'s. Zonder een profiel met dat bewijs mist die impuls het moment om te zoeken.',
      },
      {
        h: 'Het is vaak een eenmalige beslissing zonder vaste voorkeur',
        p: 'De meeste mensen laten hun gevel maar eens in de zoveel jaar reinigen en hebben geen vast bedrijf in gedachten. Wie bovenaan in Google Maps staat met goede reviews, krijgt die zoekopdracht.',
      },
      {
        h: 'Prijs per vierkante meter wordt zwaar vergeleken',
        p: 'Omdat het werk in de basis overzichtelijk is, vraagt een klant al snel bij meerdere bedrijven een prijs op. Reviews en zichtbaar voor-na werk bepalen of jij ook meedingt naast de laagste prijs.',
      },
    ],
    faq: [
      {
        q: 'Hoe laat ik het verschil van voor en na goed zien?',
        a: 'Met een Google Bedrijfsprofiel vol foto\'s van eerder gereinigde gevels naast elkaar, en reviews van klanten die het resultaat bevestigen. Dat is precies het bewijs dat een twijfelende klant nodig heeft.',
      },
      {
        q: 'Hoe kom ik in beeld bij iemand die dit voor het eerst laat doen?',
        a: 'Door bovenaan te staan in Google Maps op gevelreiniging in je werkgebied, met recente reviews en zichtbaar op Apple Maps en in de antwoorden van ChatGPT en Perplexity. Zo vind je de klant op het moment dat hij voor het eerst gaat zoeken.',
      },
    ],
  },
  {
    slug: 'boomverzorging',
    group: 'huis',
    guides: [
      'in-de-top-3-van-google-maps-komen',
      'gemiste-telefoontjes-opvolgen',
      'aanvragen-buiten-openingstijden-opvangen',
      'review-vragen-via-whatsapp',
      'google-maps-ranking-factoren',
    ],
    label: 'boomverzorgingsbedrijven',
    labelSingular: 'boomverzorger',
    h1: 'Marketing voor boomverzorgingsbedrijven',
    intro:
      'Een boom laten snoeien of kappen is risicovol werk, dicht bij het huis, de schutting of de stroomkabel van de buren. Mensen willen daarom zeker weten dat ze een gecertificeerd bedrijf bellen, niet de eerste de beste met een kettingzaag. Wij zorgen dat jij die zekerheid online uitstraalt en dat je gevonden wordt in het juiste seizoen.',
    pains: [
      {
        h: 'Veiligheid is de eerste vraag, niet de prijs',
        p: 'Bij werk hoog in een boom of dicht bij een dak wil de klant eerst weten of het bedrijf weet wat het doet. Reviews en een profiel dat laat zien hoe je werkt, nemen die twijfel weg voor de prijs überhaupt ter sprake komt.',
      },
      {
        h: 'Het seizoen bepaalt wanneer de vraag komt',
        p: 'Snoeiwerk en kap gebeuren vooral in de wintermaanden, buiten het broedseizoen. Sta je in die periode niet bovenaan in Google Maps, dan mis je een groot deel van de vraag die dat jaar nog terugkomt.',
      },
      {
        h: 'Eén verkeerd verhaal over schade doet meer kwaad dan tien goede klussen',
        p: 'Een boom die verkeerd valt of schade aan een schutting veroorzaakt, is het beeld dat blijft hangen. Een gestage stroom recente reviews van goed uitgevoerde klussen weegt daartegen op en laat zien dat jij het wel netjes doet.',
      },
    ],
    faq: [
      {
        q: 'Hoe laat ik zien dat mijn bedrijf veilig en gecertificeerd werkt?',
        a: 'Met een compleet Google Bedrijfsprofiel en reviews die vertellen hoe de klus verliep, inclusief de zorgvuldigheid waarmee je werkte. Dat is voor een klant die het risico van het werk kent, net zo belangrijk als de prijs.',
      },
      {
        q: 'Hoe zorg ik dat ik op tijd gevonden word voor het snoeiseizoen?',
        a: 'Door al voor de winter bovenaan te staan in Google Maps op boomverzorging in je werkgebied, met recente reviews, een compleet profiel en zichtbaarheid in de antwoorden van ChatGPT en Perplexity. Wie op tijd zoekt naar een boomverzorger, vindt dan jou het eerst.',
      },
    ],
  },
];
