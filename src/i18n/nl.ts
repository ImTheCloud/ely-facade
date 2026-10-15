/** Alle interfaceteksten in het Nederlands. Dezelfde structuur als fr.ts. */
export const nl = {
  code: 'nl',
  htmlLang: 'nl-BE',

  nav: {
    services: 'Diensten',
    realisations: 'Realisaties',
    apropos: 'Over ons',
    contact: 'Contact',
  },

  actions: {
    devis: 'Offerte aanvragen',
    whatsapp: 'Schrijf ons op WhatsApp',
    appeler: 'Bel ons',
  },

  deuxPoints: ': ',

  whatsappMessage: 'Goedendag, ik wil graag een offerte voor mijn gevel.',

  entete: {
    accueilAria: 'Ely Facade, startpagina',
    ouvrirMenu: 'Menu openen',
    fermerMenu: 'Menu sluiten',
    menuAria: 'Hoofdmenu',
    menu: 'Menu',
    fermer: 'Sluiten',
    contactDirect: 'Contact',
  },

  langues: {
    choisirAria: 'Taal kiezen',
    versNl: 'Deze pagina in het Nederlands lezen',
    versFr: 'Deze pagina in het Frans lezen',
  },

  piedDePage: {
    mentionsLegales: 'Juridische informatie',
    viePrivee: 'Privacy',
    droits: 'Alle rechten voorbehouden',
    zone: 'Kantoor in Halle · Overal in België',
    entreprise: 'Het bedrijf',
  },

  accessibilite: {
    allerAuContenu: 'Naar de inhoud',
  },

  communes: { mons: 'Bergen', namur: 'Namen', halle: 'Halle', charleroi: 'Charleroi', evere: 'Evere' },

  /** De vijf vakgebieden (uitsluitend de gevel). */
  metiers: {
    crepi: {
      titre: 'Gevelpleister',
      court: 'Nieuwe of te vernieuwen gevel, alle afwerkingen en systemen, inclusief isolatie langs buiten.',
    },
    peinture: {
      titre: 'Gevelschilderwerk',
      court: 'Een opgefriste gevel, in de kleur van uw keuze.',
    },
    nettoyage: {
      titre: 'Gevelreiniging',
      court: 'Alle methodes, alle ondergronden.',
    },
    rejointoiement: {
      titre: 'Voegwerk',
      court: 'Netjes vernieuwde voegen, alle methodes en alle ondergronden.',
    },
    briques: {
      titre: 'Herstel van bakstenen',
      court: 'Beschadigde bakstenen vervangen, voegen vernieuwd, scheuren behandeld, gevelstenen.',
    },
  },

  /** De werven: feiten die op de foto's te zien zijn of door Elisei bevestigd, niets anders. */
  chantiers: {
    umons: {
      titre: 'Universiteit van Bergen',
      accroche: 'Gevels van gebouwen van de Universiteit van Bergen (UMONS)',
      texte:
        'Drie gebouwen van de Universiteit van Bergen: een binnenplaats, een gebouw met vier verdiepingen en een lange gevel. De foto’s volgen de werf, van de steiger tot de afgewerkte gevel.',
      batiments: ['Binnenplaats', 'Gebouw met vier verdiepingen', 'Lange gevel'],
    },
    'namur-immeuble': {
      titre: 'Gebouw met drie verdiepingen',
      accroche: 'Een gevel van A tot Z',
      texte: 'Een gebouw met drie verdiepingen in Namen, met een witte en grijze gevel. Onze ploegen hebben de gevel van A tot Z uitgevoerd.',
      batiments: [],
    },
    'namur-balcons': {
      titre: 'Gebouw met balkons',
      accroche: 'Vijf bouwlagen, van de steiger tot de witte gevel',
      texte: 'Een gebouw met balkons en vijf bouwlagen in Namen, op een heuvel. Onze ploegen hebben de gevel van A tot Z uitgevoerd.',
      batiments: [],
    },
    halle: {
      titre: 'Woning',
      accroche: 'Een woning in Halle, de gemeente van ons kantoor',
      texte: 'Een woning in Halle: de zijgevel in de steiger, daarna de afgewerkte woning.',
      batiments: [],
    },
    charleroi: {
      titre: 'Rijwoningen',
      accroche: 'Twee rijen aaneengesloten woningen',
      texte: 'Twee rijen aaneengesloten woningen in Charleroi, in de steiger en daarna afgewerkt.',
      batiments: [],
    },
    evere: {
      titre: 'Appartementsgebouw',
      accroche: 'Een gebouw in Evere',
      texte: 'Een appartementsgebouw in Evere, ’s avonds gefotografeerd.',
      batiments: [],
    },
  },

  /** De alternatieve tekst van elke foto (de gemeente, nooit het adres). */
  photos: {
    'accueil/hero-namur': 'Gebouw met drie verdiepingen in Namen, afgewerkte witte en grijze gevel, van bovenaf gezien',
    'namur-immeuble-3-etages/pendant-face': 'Gebouw met drie verdiepingen in de steiger, van voren gezien, in Namen',
    'namur-immeuble-3-etages/pendant-rue': 'Hetzelfde gebouw in de steiger, met een werfcontainer ervoor, in Namen',
    'namur-immeuble-3-etages/apres-rue': 'Het afgewerkte gebouw met drie verdiepingen, witte en grijze gevel, vanaf de straat, in Namen',
    'namur-immeuble-balcons/pendant-debut-1': 'Het gebouw met balkons op de heuvel, bij het begin van de werken, in Namen',
    'namur-immeuble-balcons/pendant-debut-2': 'Het gebouw met balkons volledig in de steiger, bij het begin van de werken, in Namen',
    'namur-immeuble-balcons/pendant-loin-1': 'Het gebouw met balkons in de steiger, van ver gezien, in Namen',
    'namur-immeuble-balcons/pendant-loin-2': 'Het gebouw in de steiger met netten, vanaf de straat, in Namen',
    'namur-immeuble-balcons/pendant-loin-3': 'Het gebouw in de steiger boven het grasveld, in Namen',
    'namur-immeuble-balcons/pendant-grue': 'Het gebouw met balkons in de steiger, rechts een kraan, in Namen',
    'namur-immeuble-balcons/pendant-cote-gauche': 'Hoek van het gebouw met balkons in de steiger, in Namen',
    'namur-immeuble-balcons/apres-cote-gauche': 'Dezelfde hoek afgewerkt, witte gevel onder een blauwe hemel, in Namen',
    'namur-immeuble-balcons/apres-coin': 'Het afgewerkte gebouw met balkons, witte gevel, in Namen',
    'halle-maison/pendant-pignon': 'Zijgevel van een woning in de steiger, in Halle',
    'halle-maison/apres-pignon': 'Dezelfde zijgevel afgewerkt, in Halle',
    'halle-maison/final-entree': 'De ingang van de afgewerkte woning, in Halle',
    'halle-maison/final-angle': 'Hoek van de woning met het grote raam, in Halle',
    'halle-maison/final-baie-vitree': 'Gevel van de woning met de glazen pui, in Halle',
    'charleroi-rangee-1/pendant': 'Rij woningen in de steiger, in Charleroi',
    'charleroi-rangee-1/apres': 'De afgewerkte rij woningen, crèmekleurige gevel, in Charleroi',
    'charleroi-rangee-2/pendant': 'Tweede rij woningen in de steiger, in Charleroi',
    'charleroi-rangee-2/apres': 'De tweede rij afgewerkt, witte gevel, bij zonsondergang, in Charleroi',
    'charleroi-vue-ensemble/apres': 'De twee afgewerkte rijen woningen, aan weerszijden van de straat, in Charleroi',
    'mons-umons-immeuble-angle/etape-1-membrane-1': 'Gebouw met vier verdiepingen van de Universiteit van Bergen in de steiger, bij valavond',
    'mons-umons-immeuble-angle/etape-1-membrane-2': 'Hetzelfde gebouw in de steiger, vanaf het kruispunt, in Bergen',
    'mons-umons-immeuble-angle/etape-1-membrane-3': 'Hetzelfde gebouw in de steiger, vanaf de overkant van de straat, in Bergen',
    'mons-umons-immeuble-angle/etape-1-membrane-4': 'Hetzelfde gebouw in de steiger, aan het einde van de dag, in Bergen',
    'mons-umons-immeuble-angle/etape-2-sous-couche': 'Het gebouw met de crèmekleurige onderlaag, ramen nog afgeschermd, in Bergen',
    'mons-umons-immeuble-angle/etape-3-termine': 'Het afgewerkte gebouw, witte gevel, met nog één steigertoren, in Bergen',
    'mons-umons-cour/etape-1-membrane': 'Binnenplaats van de Universiteit van Bergen in de steiger, bij het begin van de werken',
    'mons-umons-cour/etape-2-isolation': 'De binnenplaats in de steiger, met de platen geplaatst, in Bergen',
    'mons-umons-cour/etape-3-aile-terminee': 'De binnenplaats van de Universiteit van Bergen, afgewerkte witte gevel',
    'mons-umons-longue-facade/pendant': 'Lange gevel van de Universiteit van Bergen in de steiger',
    'mons-umons-longue-facade/apres': 'Dezelfde lange gevel afgewerkt, in Bergen',
    'evere-immeuble/nuit': 'Appartementsgebouw op een straathoek, ’s avonds, in Evere',
  } as Record<string, string>,

  pages: {
    accueil: {
      titre: 'Ely Facade | Gevelrenovatie in heel België',
      description:
        'Gevelpleister, schilderwerk, gevelreiniging, voegwerk en herstel van bakstenen: Ely Facade renoveert uw gevel overal in België. Gratis plaatsbezoek zonder verplichting.',
    },
    contact: {
      titre: 'Contact en offerte | Ely Facade',
      description:
        'Vraag uw offerte voor gevelrenovatie aan: formulier in drie stappen, telefoon of WhatsApp. Gratis plaatsbezoek zonder verplichting, overal in België.',
    },
  },

  accueil: {
    hero: {
      pastille: 'Gevelrenovatie · Heel België',
      /** Eén regel per item: de titel past altijd op drie regels. Het laatste woord krijgt het licht. */
      titre: ['Uw gevel', 'verdient te', 'stralen.'],
      texte:
        'Gevelpleister, schilderwerk, reiniging, voegwerk, herstel van bakstenen: van het kleine huis tot het appartementsgebouw. Gratis plaatsbezoek, minstens 10\u00a0jaar garantie.',
      bouton: 'Plan mijn gratis plaatsbezoek',
      appeler: 'Bel',
      preuvesAria: 'Onze beloften',
      preuves: ['Gratis plaatsbezoek', 'Minstens 10\u00a0jaar garantie', 'Overal in België'],
      film: {
        etapes: ['Bergen · Universiteit van Bergen', 'Namen · Gebouw met balkons', 'Namen · Gebouw met drie verdiepingen'],
      },
    },


    /** De emotionele zinnen tussen de secties. Het woord tussen haakjes wordt rood onderstreept. */
    emotions: {
      durer: { phrase: 'Een gevel die [blijft].', note: 'Minstens 10 jaar garantie' },
      premiere: { phrase: 'Het eerste wat men van [uw huis] ziet.', note: '' },
      jeunesse: { phrase: 'Elke gevel krijgt een [tweede jeugd].', note: '' },
      exigence: { phrase: 'Een huis of een universiteit: [dezelfde zorg].', note: '' },
    },

    avantApres: {
      pastille: 'Voor en na',
      titre: 'Het verschil is zichtbaar.',
      texte: 'Schuif met de cursor: dezelfde gevel tijdens de werken en daarna afgewerkt.',
      aide: 'Schuif om te vergelijken',
      avant: 'Tijdens de werken',
      apres: 'Afgewerkt',
      aria: 'De gevel tijdens de werken en afgewerkt vergelijken',
      voir: 'Bekijk de werf',
    },

    etapes: {
      pastille: 'De stappen van een gevel',
      titre: 'Van steiger tot afgewerkte [gevel].',
      texte:
        'Een werf van de Universiteit van Bergen, stap voor stap. Dit is de volgorde van elke gevel met buitenisolatie en pleisterwerk.',
      lieu: 'Bergen · Universiteit van Bergen',
      etape: 'Stap',
      liste: {
        preparation: {
          titre: 'Voorbereiding en steiger',
          texte: 'De steiger wordt opgebouwd, de ondergrond voorbereid, de ramen en openingen worden afgeschermd.',
          legendes: ['Steiger en bescherming', 'Steiger en bescherming'],
        },
        isolation: {
          titre: 'Plaatsen van de isolatie',
          texte: 'De isolatieplaten worden over de hele gevel geplaatst, gelijmd en geplugd.',
          legendes: ['Tijdens de werken', 'Tijdens de werken'],
        },
        sousEnduit: {
          titre: 'Gewapende onderlaag',
          texte: 'Een glasvezelnet wordt in de onderlaag ingebed, met versterkingen rond de ramen en bovenaan de gevel.',
          legendes: ['Onderlaag'],
        },
        finition: {
          titre: 'Afwerkingspleister',
          texte: 'Na het drogen geeft de afwerkingspleister de gevel zijn uitzicht en kleur, naar keuze.',
          legendes: ['Afwerking'],
        },
        termine: {
          titre: 'Afgewerkte gevel',
          texte: 'De steiger wordt weggenomen. Uw gevel heeft minstens 10 jaar garantie.',
          legendes: ['Afgewerkte gevel, binnenplaats'],
        },
      },
    },

    umons: {
      pastille: 'Referentiewerf',
      texte:
        'Gevels van gebouwen van de Universiteit van Bergen (UMONS): een binnenplaats, een gebouw met vier verdiepingen en een lange gevel. Van het grote openbare gebouw tot de woning werken we met dezelfde zorg.',
      voir: 'De werf in beeld',
    },

    realisations: {
      pastille: 'Onze realisaties',
      titre: 'Wat u ziet, zijn [onze werven].',
      texte: 'Gevels in Bergen, Namen, Charleroi, Halle en Evere. Ons kantoor is in Halle en we werken overal in België.',
      photos: 'foto’s',
      photo: 'foto',
      voir: 'Bekijk de werf',
      precedent: 'Vorige werven',
      suivant: 'Volgende werven',
      toutes: 'Al onze realisaties',
      carte: {
        aria: 'Kaart van België: ons kantoor in Halle en de gemeenten van onze werven',
        bureau: 'Ons kantoor',
        legende: 'Overal in België',
      },
    },

    chiffres: {
      aria: 'Ely Facade in cijfers',
      liste: [
        { valeur: '6 jaar', libelle: 'ervaring van onze zaakvoerder' },
        { valeur: '50+', libelle: 'werven uitgevoerd door onze zaakvoerders' },
        { valeur: '10 jaar', libelle: 'garantie minimum' },
        { valeur: '8', libelle: 'personen in het team' },
      ],
    },

    metiers: {
      surtitre: 'Ons vak',
      titre: 'Alles voor uw gevel.',
      texte: 'Uitsluitend de gevel: dat is ons vak, en we doen niets anders.',
      voir: 'Meer weten',
    },

    equipe: {
      surtitre: 'Wie bij u langskomt',
      titre: 'Twee broers, één team.',
      texte:
        'Elisei en Simi Ungureanu leiden Ely Facade. Elisei zorgt voor het bezoek en de offerte. Simi leidt de werken op de werf. Ze werken met een team van 8 personen, zelfstandigen.',
      personnes: [
        { prenom: 'Elisei', initiale: 'E', role: 'Bezoek en offerte' },
        { prenom: 'Simi', initiale: 'S', role: 'Leiding van de werven' },
      ],
    },

    methode: {
      surtitre: 'Hoe het verloopt',
      titre: 'Van uw telefoontje tot de laatste afwerking.',
      etapes: [
        {
          titre: 'U belt ons',
          texte: 'Geef ons de oppervlakte van uw gevel (in meter) en het soort werken.',
        },
        {
          titre: 'Wij komen kijken',
          texte: 'Elisei komt bij u langs, gratis en zonder verplichting.',
        },
        {
          titre: 'U ontvangt de offerte',
          texte: 'Na het bezoek stuurt Elisei u de offerte, tegen een prijs per vierkante meter gevel.',
        },
        {
          titre: 'De werken starten',
          texte: 'Als de offerte u bevalt. Minimum 10 jaar garantie.',
        },
      ],
    },

    faq: {
      surtitre: 'Veelgestelde vragen',
      titre: 'U vraagt zich af…',
      liste: [
        {
          question: 'Kost het bezoek iets?',
          reponse: 'Nee. Elisei komt gratis en zonder verplichting langs en stuurt u daarna de offerte.',
        },
        {
          question: 'Hoe wordt de prijs berekend?',
          reponse:
            'Per vierkante meter gevel: de prijs hangt af van de oppervlakte en de gekozen materialen. Elisei geeft hem u in de offerte, na het gratis plaatsbezoek.',
        },
        {
          question: 'Waar werken jullie?',
          reponse: 'Overal in België. Ons kantoor is in Halle.',
        },
        {
          question: 'Welke gebouwen renoveren jullie?',
          reponse: 'Alle, van de kleine garage tot het appartementsgebouw met meerdere verdiepingen: huizen, appartementsgebouwen, winkels, mede-eigendommen en bedrijven.',
        },
        {
          question: 'Werken jullie ook in de winter?',
          reponse: 'Ja, we werken het hele jaar door, ook op zaterdag.',
        },
        {
          question: 'Welke materialen gebruiken jullie?',
          reponse: 'We werken met STO en hoogwaardige gammas. Goedkopere alternatieven zijn mogelijk, afhankelijk van uw budget.',
        },
        {
          question: 'Doen jullie metselwerk of dakwerken?',
          reponse: 'Nee. We doen enkel de gevel: gevelpleister, schilderwerk, reiniging, voegwerk en herstel van bakstenen. We metselen geen muren.',
        },
      ],
    },

    devis: {
      titre: 'Uw gevel verdient te stralen. [Laten we praten].',
      texte:
        'Beschrijf uw werken in drie stappen. Elisei komt gratis en vrijblijvend bij u langs en stuurt u daarna de offerte.',
      direct: 'Of rechtstreeks',
      calculateur: {
        titre: 'Hoe groot is uw gevel?',
        texte: 'Een schatting volstaat: de breedte van de gevel en het aantal bouwlagen.',
        largeur: 'Breedte (m)',
        niveaux: 'Bouwlagen',
        niveauxAide: 'gelijkvloers inbegrepen',
        moins: 'Eén bouwlaag minder',
        plus: 'Eén bouwlaag meer',
        hypothese: 'Berekend met 3 m per bouwlaag.',
        resultat: 'Geschatte oppervlakte',
        unite: 'm²',
        utiliser: 'Toevoegen aan mijn aanvraag',
        ajoute: 'Toegevoegd aan uw aanvraag',
        note: 'Elisei meet alles nauwkeurig op tijdens het gratis plaatsbezoek.',
      },
      photos: {
        titre: 'Toon ons uw gevel',
        texte: 'Stuur twee of drie foto’s van uw gevel via WhatsApp, met uw gemeente.',
        bouton: 'Mijn foto’s versturen',
        message: 'Goedendag, hier zijn enkele foto’s van mijn gevel voor een offerteaanvraag. Mijn gemeente: ',
      },
    },

    contact: {
      surtitre: 'Contact en offerte',
      titre: 'Uw offerte, zonder verplichting.',
      texte:
        'Beschrijf uw werken in drie stappen. Elisei komt gratis en vrijblijvend bij u langs en stuurt u daarna de offerte.',
      direct: 'Of rechtstreeks',
      telephone: 'Telefoon',
      email: 'E-mail',
      zone: 'Kantoor in Halle · Overal in België',
    },
  },

  formulaire: {
    etape: 'Stap',
    sur: 'van',
    etapes: ['Uw werken', 'Uw gebouw', 'Uw gegevens'],

    q1: 'Welke werken hebt u in gedachten?',
    q1Aide: 'Meerdere keuzes mogelijk',
    autre: 'Iets anders',

    q2: 'Vertel ons over uw gevel',
    batiment: 'Type gebouw',
    batiments: ['Huis', 'Appartementsgebouw', 'Handelspand', 'Ander'],
    surface: 'Geveloppervlakte (m²)',
    surfaceExemple: 'Bv.: 120',
    surfaceAide: 'Een schatting volstaat. Weet u het niet? Laat het leeg, Elisei meet ter plaatse.',

    q3: 'Waar kunnen we u antwoorden?',
    nom: 'Uw naam',
    telephone: 'Telefoon',
    email: 'E-mail',
    message: 'Een woordje over uw project',
    messageExemple: 'Bv.: voorgevel van een gesloten bebouwing, pleisterwerk hier en daar beschadigd…',
    consentement: 'Ik ga ermee akkoord dat mijn gegevens worden gebruikt om op mijn aanvraag te antwoorden.',
    consentementLien: 'Privacy',

    suivant: 'Verder',
    precedent: 'Terug',
    envoyer: 'Mijn aanvraag versturen',
    envoiEnCours: 'Bezig met verzenden…',
    facultatif: 'optioneel',

    erreurChoix: 'Kies minstens één soort werken.',
    erreurChamp: 'Dit veld is verplicht.',
    erreurEmail: 'Dit e-mailadres lijkt niet volledig.',
    erreurConsentement: 'Vink het vakje aan zodat we u kunnen antwoorden.',

    merciTitre: 'Verzonden!',
    merciTexte:
      'Uw aanvraag is goed aangekomen. Om sneller te gaan, kunt u dezelfde aanvraag via WhatsApp sturen, met enkele foto’s van uw gevel: ze is al geschreven.',
    merciWhatsApp: 'Via WhatsApp sturen',
    merciEmail: 'Per e-mail',
    recommencer: 'Nieuwe aanvraag',
    suiteIntro: 'Goedendag, hierbij mijn offerteaanvraag via de website:',
    suiteSujet: 'Mijn offerteaanvraag',

    erreurTitre: 'Het verzenden is mislukt.',
    erreurTexte: 'U kunt het opnieuw proberen, of ons rechtstreeks bellen op',
    reessayer: 'Opnieuw proberen',

    sujetFormulaire: 'Nieuwe offerteaanvraag · website Ely Facade',
    recap: {
      travaux: 'Werken',
      batiment: 'Gebouw',
      surface: 'Geveloppervlakte (m²)',
      message: 'Project',
      nom: 'Naam',
      telephone: 'Telefoon',
      email: 'E-mail',
    },
  },
} as const;
