/** Tous les textes d'interface en français. Le NL suit exactement la même structure. */
export const fr = {
  htmlLang: 'fr-BE',
  pays: 'Belgique',

  nav: {
    services: 'Services',
    realisations: 'Réalisations',
    apropos: 'À propos',
    contact: 'Contact',
  },

  actions: {
    devis: 'Demander un devis',
    whatsapp: 'Écrire sur WhatsApp',
    appeler: 'Appeler',
    contactAria: 'Nous contacter',
    email: 'Écrire un email',
    emailCourt: 'Email',
    devisCourt: 'Devis',
  },

  deuxPoints: '\u00a0: ',

  whatsappMessage: 'Bonjour, je souhaiterais un devis pour ma façade.',

  entete: {
    accueilAria: 'Ely Facade, accueil',
    ouvrirMenu: 'Ouvrir le menu',
    fermerMenu: 'Fermer le menu',
    menuAria: 'Menu principal',
    menu: 'Menu',
    fermer: 'Fermer',
    contactDirect: 'Nous joindre',
  },

  langues: {
    choisirAria: 'Choisir la langue',
    versNl: 'Lire cette page en néerlandais',
    versFr: 'Lire cette page en français',
  },

  piedDePage: {
    mentionsLegales: 'Mentions légales',
    viePrivee: 'Vie privée',
    droits: 'Tous droits réservés',
    credit: 'Site conçu par',
    creditQuestion: 'Un site comme celui-ci ?',
    creditSujet: 'Un site comme celui d’Ely Facade',
    entreprise: 'L’entreprise',
    menuAria: 'Plan du site',
    languesAria: 'Langue du site',
    /** Le QR code pour laisser un avis Google (#avis, en bas de chaque page). */
    avis: {
      titre: 'Votre chantier est terminé ?',
      texte: 'Votre avis nous aide beaucoup. Scannez le code avec l’appareil photo de votre téléphone : cela prend une minute.',
      bouton: 'Laisser un avis sur Google',
      alt: 'QR code vers la page d’avis Google d’Ely Facade',
    },
  },

  accessibilite: {
    allerAuContenu: 'Aller au contenu',
  },

  communes: { mons: 'Mons', namur: 'Namur', halle: 'Halle', charleroi: 'Charleroi', auderghem: 'Auderghem', evere: 'Evere' },

  /** Les métiers de la façade, de A à Z. */
  metiers: {
    crepi: {
      titre: 'Crépi et enduit',
      court: 'Façade neuve ou à refaire, tous types de finitions et de systèmes, isolation par l’extérieur comprise.',
      points: [
        'Façade neuve ou façade à refaire',
        'Tous types de finitions et de systèmes',
        'Isolation par l’extérieur comprise',
        'STO et gammes haut de gamme, ou des alternatives moins chères selon votre budget',
        'Avec nos matériaux ou les vôtres',
      ],
      description:
        'Crépi et enduit de façade, isolation par l’extérieur comprise, partout en Belgique. Tous types de finitions. Visite gratuite, garantie de 10\u00a0ans minimum.',
    },
    isolation: {
      titre: 'Isolation par l’extérieur',
      court: 'Des panneaux isolants posés sur toute la façade, puis recouverts d’un enduit.',
      points: [
        'Isolation thermique et acoustique',
        'Panneaux isolants collés et chevillés',
        'Sous-enduit armé d’un treillis en fibre de verre',
        'Renforts autour des fenêtres et en haut de façade',
        'Enduit de finition, dans l’aspect et la teinte de votre choix',
      ],
      description:
        'Isolation de façade par l’extérieur, sous-enduit armé et enduit de finition, partout en Belgique. Visite gratuite, garantie de 10\u00a0ans minimum.',
    },
    peinture: {
      titre: 'Peinture de façade',
      court: 'Une façade rafraîchie, dans la teinte de votre choix.',
      points: [
        'Peinture de façade, dans la teinte de votre choix',
        'Maisons, immeubles, commerces et copropriétés',
        'Le prix au mètre carré de façade, donné dans le devis',
      ],
      description:
        'Peinture de façade dans la teinte de votre choix, pour maisons, immeubles et commerces, partout en Belgique. Visite gratuite et sans engagement.',
    },
    nettoyage: {
      titre: 'Nettoyage de façade',
      court: 'Toutes méthodes, tous supports.',
      points: [
        'Toutes méthodes de nettoyage',
        'Tous supports',
        'Maisons, immeubles, commerces et copropriétés',
      ],
      description:
        'Nettoyage de façade, toutes méthodes et tous supports, partout en Belgique. Visite gratuite et sans engagement, devis au mètre carré.',
    },
    hydrofuge: {
      titre: 'Traitement hydrofuge',
      court: 'Votre façade protégée de l’eau et de l’humidité.',
      points: ['Façade protégée de l’eau', 'Sur la façade existante'],
      description: 'Traitement hydrofuge de façade, partout en Belgique. Visite gratuite et sans engagement.',
    },
    rejointoiement: {
      titre: 'Rejointoiement',
      court: 'Des joints refaits proprement, toutes méthodes et tous supports.',
      points: [
        'Joints refaits proprement',
        'Toutes méthodes',
        'Tous supports',
      ],
      description:
        'Rejointoiement de façade, toutes méthodes et tous supports, partout en Belgique. Visite gratuite, garantie de 10\u00a0ans minimum.',
    },
    briques: {
      titre: 'Réparation de briques',
      court: 'Briques abîmées remplacées, joints refaits, fissures traitées, plaquettes de parement.',
      points: [
        'Remplacement des briques abîmées',
        'Joints refaits',
        'Fissures traitées',
        'Plaquettes de parement',
        'Tous types de briques',
      ],
      description:
        'Réparation de briques de façade\u00a0: briques remplacées, joints refaits, fissures traitées, plaquettes de parement. Partout en Belgique, visite gratuite.',
    },
    plaquettes: {
      titre: 'Plaquettes de parement',
      court: 'L’aspect de la brique, posé sur votre façade.',
      points: ['Plaquettes de parement posées', 'Sur la façade existante'],
      description: 'Pose de plaquettes de parement sur votre façade, partout en Belgique. Visite gratuite et sans engagement.',
    },
    fissures: {
      titre: 'Traitement des fissures',
      court: 'Les fissures de votre façade traitées.',
      points: ['Fissures traitées', 'Sur la façade existante'],
      description: 'Traitement des fissures de façade, partout en Belgique. Visite gratuite et sans engagement.',
    },
    echafaudage: {
      titre: 'Échafaudage',
      court: 'Montage de l’échafaudage et protection des fenêtres, jusqu’au retrait.',
      points: ['Montage de l’échafaudage', 'Protection des fenêtres et des ouvertures', 'Retrait de l’échafaudage en fin de chantier'],
      description:
        'Échafaudage pour vos travaux de façade\u00a0: montage, protection des fenêtres et retrait, partout en Belgique. Visite gratuite et sans engagement.',
    },
  },

  /** Les chantiers : faits visibles sur les photos ou confirmés par Elisei, rien d'autre. */
  chantiers: {
    umons: {
      titre: 'Université de Mons',
      accroche: 'Façades de bâtiments de l’Université de Mons (UMons)',
      texte:
        'Trois bâtiments de l’Université de Mons\u00a0: une cour intérieure, un immeuble de quatre étages et une longue façade, de l’échafaudage à la façade terminée.',
      batiments: ['Cour intérieure', 'Immeuble de quatre étages', 'Longue façade'],
    },
    'namur-immeuble': {
      titre: 'Immeuble de trois étages',
      accroche: 'Une façade réalisée de A à Z',
      texte: 'Un immeuble de trois étages à Namur, en façade blanche et grise. Nos équipes ont réalisé la façade de A à Z.',
    },
    'namur-balcons': {
      titre: 'Immeuble à balcons',
      accroche: 'Cinq niveaux, de l’échafaudage à la façade blanche',
      texte: 'Un immeuble à balcons de cinq niveaux à Namur, sur sa colline. Nos équipes ont réalisé la façade de A à Z.',
    },
    halle: {
      titre: 'Maison',
      accroche: 'Une maison à Halle, la commune de notre bureau',
      texte: 'Une maison à Halle\u00a0: le pignon sous échafaudage, puis la maison terminée.',
    },
    charleroi: {
      titre: 'Rangées de maisons',
      accroche: 'Deux chantiers, 23 maisons au total',
      texte: 'Deux chantiers à Charleroi, 23 maisons au total\u00a0: deux rangées de maisons mitoyennes, sous échafaudage puis terminées.',
    },
    'charleroi-deux-couleurs': {
      titre: 'Maison en deux couleurs',
      accroche: 'Un crépi blanc et anthracite',
      texte:
        'Une maison à Charleroi, en crépi de deux couleurs, blanc et anthracite\u00a0: la façade avant, l’arrière, l’annexe et l’étage sur le toit-terrasse, de l’échafaudage à la façade terminée.',
    },
    auderghem: {
      titre: 'Maison aspect brique',
      accroche: 'Une façade blanche à l’aspect brique',
      texte:
        'Une maison à Auderghem\u00a0: la façade sous échafaudage, côté rue et côté jardin, puis terminée en blanc à l’aspect brique, jusque dans les détails.',
    },
    evere: {
      titre: 'Immeuble d’appartements',
      accroche: 'Un immeuble à Evere',
    },
  },

  /** Le texte alternatif de chaque photo (la commune, jamais l'adresse). */
  photos: {
    'accueil/hero-namur': 'Immeuble de trois étages à Namur, façade blanche et grise terminée, vu d’en haut',
    'namur-immeuble-3-etages/pendant-face': 'Immeuble de trois étages sous échafaudage, vu de face, à Namur',
    'namur-immeuble-3-etages/pendant-rue': 'Le même immeuble sous échafaudage, une benne de chantier devant, à Namur',
    'namur-immeuble-3-etages/apres-rue': 'L’immeuble de trois étages terminé, façade blanche et grise, vu de la rue, à Namur',
    'namur-immeuble-balcons/pendant-debut-1': 'L’immeuble à balcons sur sa colline, au début des travaux, à Namur',
    'namur-immeuble-balcons/pendant-debut-2': 'L’immeuble à balcons entièrement échafaudé, au début des travaux, à Namur',
    'namur-immeuble-balcons/pendant-loin-1': 'L’immeuble à balcons sous échafaudage, vu de loin, à Namur',
    'namur-immeuble-balcons/pendant-loin-2': 'L’immeuble sous échafaudage et filets, vu de la rue, à Namur',
    'namur-immeuble-balcons/pendant-loin-3': 'L’immeuble sous échafaudage au-dessus de sa pelouse, à Namur',
    'namur-immeuble-balcons/pendant-grue': 'L’immeuble à balcons sous échafaudage, une grue à droite, à Namur',
    'namur-immeuble-balcons/pendant-cote-gauche': 'Angle de l’immeuble à balcons sous échafaudage, à Namur',
    'namur-immeuble-balcons/apres-cote-gauche': 'Le même angle terminé, façade blanche sous un ciel bleu, à Namur',
    'namur-immeuble-balcons/apres-coin': 'L’immeuble à balcons terminé, façade blanche, à Namur',
    'halle-maison/pendant-pignon': 'Pignon d’une maison sous échafaudage, à Halle',
    'halle-maison/apres-pignon': 'Le même pignon terminé, à Halle',
    'halle-maison/final-entree': 'L’entrée de la maison terminée, à Halle',
    'halle-maison/final-angle': 'Angle de la maison et sa grande fenêtre, à Halle',
    'halle-maison/final-baie-vitree': 'Façade de la maison et sa baie vitrée, à Halle',
    'charleroi-rangee-1/pendant': 'Rangée de maisons sous échafaudage, à Charleroi',
    'charleroi-rangee-1/apres': 'La rangée de maisons terminée, façade crème, à Charleroi',
    'charleroi-rangee-2/pendant': 'Deuxième rangée de maisons sous échafaudage, à Charleroi',
    'charleroi-rangee-2/apres': 'La deuxième rangée terminée, façade blanche, au soleil couchant, à Charleroi',
    'charleroi-vue-ensemble/apres': 'Les deux rangées de maisons terminées, de part et d’autre de la rue, à Charleroi',
    'mons-umons-immeuble-angle/etape-1-membrane-1': 'Immeuble de quatre étages de l’Université de Mons sous échafaudage, au crépuscule',
    'mons-umons-immeuble-angle/etape-1-membrane-2': 'Le même immeuble sous échafaudage, vu du carrefour, à Mons',
    'mons-umons-immeuble-angle/etape-1-membrane-3': 'Le même immeuble sous échafaudage, vu de l’autre côté de la rue, à Mons',
    'mons-umons-immeuble-angle/etape-1-membrane-4': 'Le même immeuble sous échafaudage, en fin de journée, à Mons',
    'mons-umons-immeuble-angle/etape-2-sous-couche': 'L’immeuble avec sa sous-couche crème, fenêtres encore protégées, à Mons',
    'mons-umons-immeuble-angle/etape-3-termine': 'L’immeuble terminé, façade blanche, avec une dernière tour d’échafaudage, à Mons',
    'mons-umons-cour/etape-1-membrane': 'Cour intérieure de l’Université de Mons sous échafaudage, au début des travaux',
    'mons-umons-cour/etape-2-isolation': 'La cour intérieure sous échafaudage, panneaux posés, à Mons',
    'mons-umons-cour/etape-3-aile-terminee': 'La cour intérieure de l’Université de Mons, façade blanche terminée',
    'mons-umons-longue-facade/pendant': 'Longue façade de l’Université de Mons sous échafaudage',
    'mons-umons-longue-facade/apres': 'La même longue façade terminée, à Mons',
    'evere-immeuble/nuit': 'Immeuble d’appartements au coin d’une rue, de nuit, à Evere',
    'auderghem-maison/rue-pendant-1': 'La maison sous échafaudage côté rue, panneaux posés, à Auderghem',
    'auderghem-maison/rue-pendant-2': 'La maison sous échafaudage, vue de la rue, à Auderghem',
    'auderghem-maison/rue-pendant-3': 'La façade côté rue sous échafaudage, couche claire posée, à Auderghem',
    'auderghem-maison/rue-pendant-4': 'La façade côté rue presque blanche, encore sous échafaudage, à Auderghem',
    'auderghem-maison/arriere-pendant': 'L’arrière de la maison sous échafaudage, panneaux de bois posés, à Auderghem',
    'auderghem-maison/arriere-apres': 'L’arrière de la maison, façade blanche, avec sa véranda, à Auderghem',
    'auderghem-maison/cote-apres': 'Le côté de la maison, façade blanche à l’aspect brique, au-dessus de la pelouse, à Auderghem',
    'auderghem-maison/finition-angle': 'Angle de la façade à l’aspect brique, de près, à Auderghem',
    'auderghem-maison/finition-mur-long': 'Un long mur à l’aspect brique, vu depuis l’échafaudage, à Auderghem',
    'auderghem-maison/finition-arete': 'L’arête d’un mur à l’aspect brique, depuis l’échafaudage, à Auderghem',
    'auderghem-maison/finition-fenetres': 'Le mur à l’aspect brique autour des fenêtres, à Auderghem',
    'auderghem-maison/finition-detail': 'Le relief des briques et des joints, de très près, à Auderghem',
    'auderghem-maison/finition-avancee': 'Une partie avancée de la façade, à l’aspect brique, entre les tubes de l’échafaudage, à Auderghem',
    'charleroi-deux-couleurs/coin-pendant-1': 'La maison vue du jardin, panneaux noirs posés, à Charleroi',
    'charleroi-deux-couleurs/coin-pendant-2': 'Le même angle sous échafaudage, panneaux noirs posés, à Charleroi',
    'charleroi-deux-couleurs/annexe-pendant-1': 'L’annexe côté jardin, panneaux noirs posés, fenêtres protégées, à Charleroi',
    'charleroi-deux-couleurs/toit-terrasse-pendant': 'L’étage sur le toit-terrasse, panneaux noirs posés, à Charleroi',
    'charleroi-deux-couleurs/annexe-pendant-2': 'L’annexe avec une couche anthracite, fenêtres protégées, à Charleroi',
    'charleroi-deux-couleurs/arriere-pendant': 'L’arrière de la maison sous échafaudage, couche anthracite, à Charleroi',
    'charleroi-deux-couleurs/jardin-haut-pendant-2': 'La maison vue d’en haut, couche anthracite et échafaudage, à Charleroi',
    'charleroi-deux-couleurs/jardin-haut-pendant-1': 'La maison vue d’en haut, couche crème, à Charleroi',
    'charleroi-deux-couleurs/face-pendant': 'La façade avant sous échafaudage, couche crème, à Charleroi',
    'charleroi-deux-couleurs/angle-pendant': 'La maison sous échafaudage et bâche, vue de la rue, à Charleroi',
    'charleroi-deux-couleurs/jardin-pendant': 'La maison côté jardin sous échafaudage, couche crème, à Charleroi',
    'charleroi-deux-couleurs/face-apres': 'La façade avant terminée, crépi blanc et anthracite, à Charleroi',
    'charleroi-deux-couleurs/angle-apres': 'La maison terminée, blanche en bas et anthracite en haut, vue de biais, à Charleroi',
    'charleroi-deux-couleurs/angle-apres-2': 'La maison terminée et sa porte de garage, vue de la rue, à Charleroi',
    'charleroi-deux-couleurs/arriere-apres': 'L’arrière de la maison terminé, blanc et anthracite, à Charleroi',
    'charleroi-deux-couleurs/coin-apres': 'L’annexe et la maison terminées, vues du jardin, à Charleroi',
    'charleroi-deux-couleurs/annexe-apres': 'L’annexe terminée, façade blanche et grandes fenêtres, à Charleroi',
    'charleroi-deux-couleurs/toit-terrasse-apres': 'L’étage sur le toit-terrasse terminé, blanc et gris, à Charleroi',
  } as Record<string, string>,

  /** Fil d'Ariane des pages intérieures. */
  fil: { aria: 'Fil d’Ariane', accueil: 'Accueil' },

  /** Les pages « Services » et métier. */
  services: {
    titre: 'Tout pour votre façade.',
    texte:
      'De A à Z, sur tous les chantiers\u00a0: crépi, isolation, peinture, nettoyage, rejointoiement, réparation de briques… Du petit garage à l’immeuble de plusieurs étages.',
    pourQui: {
      titre: 'Pour tous les bâtiments',
      texte: 'Maisons, immeubles, commerces, copropriétés et sociétés\u00a0: du petit garage à l’immeuble de plusieurs étages.',
    },
    atouts: [
      { titre: 'Visite gratuite', texte: 'Elisei se déplace chez vous, gratuitement et sans engagement.' },
      { titre: 'Garantie de 10\u00a0ans minimum', texte: 'Sur les travaux de façade.' },
      { titre: 'Partout en Belgique', texte: 'Notre bureau est à Halle.' },
      { titre: 'Toute l’année', texte: 'Nous travaillons aussi l’hiver et le samedi.' },
    ],
    materiaux: {
      titre: 'Les matériaux',
      texte:
        'Nous travaillons avec STO et des gammes haut de gamme. Selon votre budget, des alternatives moins chères sont possibles, avec nos matériaux ou les vôtres.',
    },
    devis: {
      titre: 'Un projet pour votre façade\u00a0?',
      texte: 'Visite sur place gratuite, sans engagement. Le devis est établi au mètre carré de façade.',
    },
    /** La page d'un métier. */
    metierPage: {
      inclus: 'Ce que comprend ce service',
      realisations: 'Voir nos réalisations',
      autres: 'Nos autres services',
      tous: 'Tous nos services',
    },
  },

  /** La page « Réalisations » et les pages de chaque chantier. */
  realisationsPage: {
    titre: 'Quelques-uns de nos chantiers.',
    texte:
      'Une sélection de façades à Mons, Namur, Charleroi, Halle, Auderghem et Evere, de l’échafaudage à la façade terminée. Seule la commune est indiquée\u00a0: jamais l’adresse de nos clients.',
    photos: 'Le chantier en photos',
    retour: 'Retour aux réalisations',
    autres: 'D’autres chantiers',
    agrandir: 'Agrandir la photo',
    fermer: 'Fermer',
    precedente: 'Photo précédente',
    suivante: 'Photo suivante',
    visionneuse: 'Photo du chantier',
    devis: {
      titre: 'Et votre façade\u00a0?',
      texte: 'Visite sur place gratuite, sans engagement, partout en Belgique.',
    },
  },

  /** La page « À propos ». */
  apropos: {
    titre: 'Deux frères, une équipe.',
    texte:
      'Ely Facade est dirigée par deux frères, Elisei et Simion Ungureanu. Elisei vient chez vous pour la visite et le devis, puis travaille sur le chantier\u00a0; Simion dirige les travaux. Notre bureau est à Halle et nous intervenons partout en Belgique.',
    nom: {
      titre: 'Ely, comme Elisei',
      texte: 'Le nom de l’entreprise vient du prénom d’Elisei, son gérant.',
    },
    personnes: [
      {
        prenom: 'Elisei',
        role: 'Chef d’entreprise · Visite, devis et chantier',
        phrase: 'Sur votre façade, du premier regard à la [dernière touche].',
        texte: 'Il vient voir votre façade, la mesure et vous envoie le devis, puis rejoint l’équipe sur le chantier. Six ans de métier dans la façade.',
      },
      {
        prenom: 'Simion',
        role: 'Chef de chantier',
        phrase: 'Le chantier, [c’est lui]. De l’échafaudage à la finition.',
        texte: 'Il dirige l’équipe sur le chantier, de la préparation à la finition, jusqu’au retrait de l’échafaudage.',
      },
    ],
    equipe: {
      titre: 'Une équipe sur chaque chantier',
      texte: 'Des indépendants qui travaillent avec Elisei et Simion sur chaque chantier.',
    },
    engagementsTitre: 'Nos engagements',
    engagements: [
      { titre: 'Toute la façade, de A à Z', texte: 'Sur tous types de chantiers\u00a0: c’est notre métier.' },
      { titre: 'Visite gratuite', texte: 'Sans engagement, partout en Belgique.' },
      { titre: 'Garantie de 10\u00a0ans minimum', texte: 'Sur les travaux de façade.' },
      { titre: 'Toute l’année', texte: 'Aussi l’hiver et le samedi.' },
    ],
    bureau: {
      titre: 'Notre bureau',
      texte: 'Les visites se font chez vous\u00a0: Elisei fixe le rendez-vous avec vous au premier appel.',
    },
  },

  /** Mentions légales. */
  legal: {
    titre: 'Mentions légales',
    intro: 'Les informations légales sur l’éditeur et l’hébergeur de ce site.',
    editeurTitre: 'Éditeur du site',
    forme: 'Société à responsabilité limitée (BV / SRL)',
    siege: 'Siège',
    bce: 'Numéro d’entreprise (BCE)',
    tva: 'TVA',
    gerant: 'Gérant',
    contact: 'Contact',
    hebergeurTitre: 'Hébergement',
    hebergeur: 'Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, États-Unis',
    proprieteTitre: 'Photos et textes',
    propriete:
      'Les textes, les photos et le logo de ce site appartiennent à ELY FAÇADE BV. Les photos montrent nos chantiers\u00a0: seule la commune est indiquée, jamais l’adresse. Toute reproduction demande notre accord.',
    creditsTitre: 'Crédits',
    credits:
      'Polices DM Sans et Bricolage Grotesque (licence SIL Open Font License), hébergées sur ce site. Icônes, carte et illustrations dessinées pour Ely Facade.',
    responsabiliteTitre: 'Responsabilité',
    responsabilite:
      'Nous veillons à l’exactitude des informations de ce site. Seul le devis, établi après la visite, engage Ely Facade sur les travaux et le prix.',
  },

  /** Vie privée. {email} et {telephone} sont remplacés par les coordonnées. */
  viePrivee: {
    titre: 'Vie privée',
    intro:
      'Ce site ne vous suit pas\u00a0: aucun cookie, aucune mesure d’audience. Voici ce que nous faisons des informations que vous nous envoyez.',
    sections: [
      {
        titre: 'Qui est responsable',
        textes: [
          'ELY FAÇADE BV, Bergensesteenweg 745, 1502 Halle, Belgique (numéro d’entreprise 1030.283.223).',
          'Pour toute question\u00a0: {email} ou {telephone}.',
        ],
      },
      {
        titre: 'Les données que nous recevons',
        textes: [
          'Par le formulaire de devis\u00a0: les travaux souhaités, le type de bâtiment, la surface de façade si vous la donnez, votre nom, votre téléphone, votre email et votre message s’ils sont remplis, les photos de votre façade si vous en joignez, et la langue du site.',
          'Si vous nous contactez directement (téléphone, WhatsApp, email)\u00a0: ce que vous choisissez de nous envoyer, par exemple des photos de votre façade.',
        ],
      },
      {
        titre: 'Pourquoi',
        textes: [
          'Uniquement pour répondre à votre demande\u00a0: vous contacter, organiser la visite et vous envoyer le devis. Nous ne vendons ni ne cédons vos données, et nous ne vous envoyons pas de publicité.',
          'Base légale\u00a0: votre demande de devis (mesures précontractuelles) et votre accord, donné en cochant la case du formulaire.',
        ],
      },
      {
        titre: 'Qui les reçoit',
        textes: [
          'Ce site est hébergé par Cloudflare, Inc. (États-Unis). Le formulaire est transmis par email grâce à Resend (États-Unis). Les transferts hors de l’Union européenne sont encadrés par les garanties prévues par le RGPD.',
          'Si vous utilisez WhatsApp, les règles de WhatsApp (Meta) s’appliquent à ces échanges.',
        ],
      },
      {
        titre: 'Combien de temps',
        textes: [
          'Le temps de traiter votre demande. Si vous devenez client, aussi longtemps que la loi nous oblige à garder les documents (comptabilité, garantie).',
        ],
      },
      {
        titre: 'Cookies',
        textes: [
          'Aucun cookie. Le site retient seulement, dans votre navigateur, la langue que vous avez choisie (français ou néerlandais). Cette information ne nous est jamais envoyée.',
        ],
      },
      {
        titre: 'Vos droits',
        textes: [
          'Vous pouvez à tout moment demander à voir, corriger ou effacer vos données, ou vous opposer à leur utilisation\u00a0: écrivez-nous à {email}.',
          'Vous pouvez aussi introduire une plainte auprès de l’Autorité de protection des données (rue de la Presse 35, 1000 Bruxelles, autoriteprotectiondonnees.be).',
        ],
      },
    ],
    miseAJour: 'Mise à jour\u00a0: octobre 2026.',
  },

  /** La page introuvable. */
  erreur: {
    titre: 'Il manque une brique.',
    texte: 'Cette page n’existe pas, ou plus. Tout le reste du site est bien en place\u00a0:',
    accueil: 'Retour à l’accueil',
    realisations: 'Voir nos réalisations',
  },

  pages: {
    accueil: {
      titre: 'Ely Facade | Rénovation de façades partout en Belgique',
      description:
        'Toute la façade, de A à Z\u00a0: crépi, isolation par l’extérieur, peinture, nettoyage, rejointoiement… Partout en Belgique. Visite gratuite et sans engagement.',
    },
    services: {
      titre: 'Nos métiers de façade | Ely Facade',
      description:
        'Toute la façade, de A à Z\u00a0: crépi, isolation, peinture, nettoyage, rejointoiement… Partout en Belgique. Visite gratuite, garantie de 10\u00a0ans minimum.',
    },
    metier: {
      /** {service} : le nom du métier (metiers.<clé>.titre). */
      titre: '{service} partout en Belgique | Ely Facade',
    },
    realisations: {
      titre: 'Nos réalisations | Ely Facade',
      description:
        'Quelques chantiers de façade en photos\u00a0: Université de Mons, Namur, Charleroi, Halle, Auderghem et Evere, de l’échafaudage à la façade terminée.',
    },
    apropos: {
      titre: 'À propos | Ely Facade',
      description:
        'Ely Facade, ce sont deux frères, Elisei et Simion Ungureanu, et leur équipe. Bureau à Halle, chantiers de façade partout en Belgique.',
    },
    mentionsLegales: {
      titre: 'Mentions légales | Ely Facade',
      description: 'Éditeur, hébergeur et informations légales du site Ely Facade (ELY FAÇADE BV, numéro d’entreprise 1030.283.223).',
    },
    viePrivee: {
      titre: 'Vie privée | Ely Facade',
      description: 'Aucun cookie, aucune mesure d’audience\u00a0: ce que nous faisons des informations envoyées par le formulaire de devis.',
    },
    erreur: {
      titre: 'Page introuvable | Ely Facade',
      description: 'Cette page n’existe pas ou plus.',
    },
    contact: {
      titre: 'Contact et devis | Ely Facade',
      description:
        'Demandez votre devis de rénovation de façade\u00a0: formulaire en trois étapes, téléphone ou WhatsApp. Visite gratuite et sans engagement, partout en Belgique.',
    },
  },

  accueil: {
    hero: {
      /** Une ligne par entrée : le titre tient toujours sur trois lignes. Le dernier mot est mis en lumière. */
      titre: ['Votre façade', 'mérite de', 'briller.'],
      texte: 'Rénovation de façades pour tous les bâtiments.',
      bouton: 'Demander ma visite gratuite',
      appeler: 'Appeler le',
      preuvesAria: 'Nos engagements',
      preuves: ['Garantie 10\u00a0ans minimum', 'Partout en Belgique'],
    },


    /** Les phrases d'émotion entre les sections. Le mot entre crochets se souligne en rouge. */
    emotions: {
      durer: { phrase: 'Une façade refaite pour [durer].' },
    },

    avantApres: {
      titre: 'La différence se voit.',
      texte: 'Faites glisser le curseur\u00a0: la même façade pendant les travaux, puis une fois terminée.',
      avant: 'Pendant les travaux',
      apres: 'Après',
      aria: 'Comparer la façade pendant les travaux et une fois terminée',
      voir: 'Voir le chantier',
    },

    etapes: {
      titre: 'De l’échafaudage à la façade [terminée].',
      chantier: 'À l’Université de Mons',
      texte: 'Étape par étape, sur un vrai chantier. C’est l’ordre de toute façade isolée par l’extérieur et crépie.',
      voir: 'Le chantier en photos',
      lieu: 'Mons · Université de Mons',
      etape: 'Étape',
      liste: {
        preparation: {
          titre: 'Préparation et échafaudage',
          texte: 'L’échafaudage est monté, le support est préparé, les fenêtres et les ouvertures sont protégées.',
          legendes: ['Échafaudage et protections', 'Échafaudage et protections'],
        },
        isolation: {
          titre: 'Pose de l’isolation',
          texte: 'Les panneaux isolants sont posés sur toute la façade, collés et chevillés.',
          legendes: ['Pendant les travaux', 'Pendant les travaux'],
        },
        sousEnduit: {
          titre: 'Sous-enduit armé',
          texte: 'Un treillis en fibre de verre est noyé dans le sous-enduit, avec des renforts autour des fenêtres et en haut de façade.',
          legendes: ['Sous-couche'],
        },
        termine: {
          titre: 'Façade terminée',
          texte: 'Après séchage, l’enduit de finition donne à la façade son aspect et sa teinte, au choix. Il ne reste plus qu’à retirer l’échafaudage.',
          legendes: ['Façade terminée', 'Façade terminée, autre point de vue'],
        },
      },
    },

    realisations: {
      pastille: 'Nos réalisations',
      titre: 'Quelques [chantiers] parmi tant d’autres.',
      texte: 'Une sélection de façades, de l’échafaudage à la façade terminée. Touchez un point de la carte pour voir le chantier.',
      photos: 'photos',
      photo: 'photo',
      voir: 'Voir le chantier',
      precedent: 'Chantiers précédents',
      suivant: 'Chantiers suivants',
      toutes: 'Voir plus de chantiers',
      carte: {
        aria: 'Carte de la Belgique\u00a0: notre bureau à Halle et les communes de quelques-uns de nos chantiers',
        bureau: 'Notre bureau',
        bureauHalle: 'Notre bureau, à Halle',
        chantier: 'Un de nos chantiers',
        villes: { anvers: 'Anvers', gand: 'Gand', liege: 'Liège' },
      },
    },

    chiffres: {
      titre: 'Ely Facade en quelques [chiffres]\u00a0:',
      liste: [
        { valeur: '6 ans', mot: 'd’expérience' },
        { valeur: '50+', mot: 'chantiers' },
        { valeur: '2', mot: 'frères' },
        { valeur: '≈\u00a07 jours', mot: 'pour votre devis' },
        { valeur: '{n}', mot: 'services' },
        { valeur: '12/12', mot: 'mois' },
        { valeur: '10 ans', mot: 'de garantie minimum' },
        { valeur: '0\u00a0€', mot: 'la visite' },
      ],
    },

    metiers: {
      titre: 'Tout pour votre façade.',
      texte: 'Toute la façade, de A à Z\u00a0: du petit garage à l’immeuble.',
      voir: 'En savoir plus',
    },

    equipe: {
      portrait: 'Portrait de',
      titre: 'Deux frères, une équipe solidaire.',
      personnes: [
        {
          prenom: 'Elisei',
          role: 'Chef d’entreprise',
          roleCourt: 'Chef d’entreprise',
          texte: 'Il mesure votre façade, vous envoie le devis et travaille sur le chantier.',
        },
        {
          prenom: 'Simion',
          role: 'Chef de chantier',
          roleCourt: 'Chef de chantier',
          texte: 'Il dirige l’équipe sur le chantier, de l’échafaudage à la dernière finition.',
        },
      ],
    },

    methode: {
      titre: 'Votre façade, en [quatre étapes].',
      texte: 'De votre premier appel à la façade terminée\u00a0: voici comment se passe un chantier avec Ely Facade.',
      realisations: 'Voir nos réalisations',
      etapes: [
        {
          titre: 'Vous nous contactez',
          texte: 'Par téléphone, sur WhatsApp ou avec la demande de devis du site\u00a0: la surface de votre façade et les travaux souhaités suffisent.',
        },
        {
          titre: 'Elisei vient voir',
          texte: 'Il se déplace chez vous et mesure votre façade. La visite est gratuite et sans engagement.',
        },
        {
          titre: 'Vous recevez le devis',
          texte: 'Un devis clair, au prix du mètre carré de façade. Vous décidez, sans pression.',
        },
        {
          titre: 'Nous réalisons votre façade',
          texte: 'Simion et l’équipe s’en chargent, de l’échafaudage à la finition. Garantie de 10\u00a0ans minimum.',
        },
      ],
    },

    faq: {
      titre: 'Questions fréquentes',
      liste: [
        {
          question: 'La visite est-elle payante\u00a0?',
          reponse: 'Non. Elisei se déplace gratuitement et sans engagement, puis vous envoie le devis.',
        },
        {
          question: 'Sous quel délai recevrai-je le devis\u00a0?',
          reponse: 'Environ une semaine entre votre premier contact et la réception du devis, visite d’Elisei sur place comprise.',
        },
        {
          question: 'Comment est calculé le prix\u00a0?',
          reponse:
            'Au mètre carré de façade\u00a0: le prix dépend de la surface et des matériaux choisis. Elisei vous le donne dans le devis, après la visite gratuite.',
        },
        {
          question: 'Où intervenez-vous\u00a0?',
          reponse: 'Partout en Belgique. Notre bureau est à Halle.',
        },
        {
          question: 'Quels bâtiments rénovez-vous\u00a0?',
          reponse: 'Tous, du petit garage à l’immeuble de plusieurs étages\u00a0: maisons, immeubles, commerces, copropriétés et sociétés.',
        },
        {
          question: 'Travaillez-vous l’hiver\u00a0?',
          reponse: 'Oui, nous travaillons toute l’année, y compris le samedi.',
        },
        {
          question: 'Quels matériaux utilisez-vous\u00a0?',
          reponse: 'Nous travaillons avec STO et des gammes haut de gamme. Des alternatives moins chères sont possibles selon votre budget.',
        },
        {
          question: 'Faites-vous de la maçonnerie ou de la toiture\u00a0?',
          reponse: 'Non. Nous ne faisons que la façade, mais de A à Z\u00a0: crépi, peinture, nettoyage, rejointoiement, réparation de briques… Nous ne montons pas de murs.',
        },
      ],
    },

    devis: {
      titre: 'Votre façade mérite de briller. [Parlons-en].',
      texte: 'Décrivez vos travaux en trois étapes.',
    },

    contact: {
      titre: 'Votre devis, sans engagement.',
      texte: 'Décrivez-nous vos travaux en trois étapes. Elisei se déplace gratuitement chez vous, puis vous envoie le devis.',
      direct: 'Ou directement',
      telephone: 'Téléphone',
      email: 'Email',
      adresse: 'Bureau · Google Maps',
    },
  },

  formulaire: {
    etape: 'Étape',
    sur: 'sur',
    etapes: ['Vos travaux', 'Votre bâtiment', 'Vos coordonnées'],

    q1: 'Quels travaux avez-vous en tête\u00a0?',
    q1Aide: 'Plusieurs choix possibles',
    complet: 'Façade complète, de A à Z',
    autre: 'Autre chose',
    autrePrecision: 'Dites-nous de quoi il s’agit',
    autreExemple: 'Ex.\u00a0: une fissure à réparer',
    erreurAutre: 'Dites-nous en quelques mots de quoi il s’agit.',

    q2: 'Parlez-nous de votre façade',
    batiment: 'Type de bâtiment',
    batiments: ['Maison', 'Immeuble', 'Commerce', 'Autre'],
    surface: 'Surface de façade (m²)',
    surfaceExemple: 'Ex.\u00a0: 120',
    surfaceAide: 'Une estimation suffit. Vous ne savez pas\u00a0? Calculez-la ci-dessous, ou laissez vide\u00a0: Elisei mesurera sur place.',
    simulateur: {
      ouvrir: 'Calculer la surface',
      largeur: 'Largeur',
      largeurAide: 'en mètres',
      niveaux: 'Niveaux',
      niveauxAide: 'rez-de-chaussée compris',
      moinsLargeur: 'Un mètre de moins',
      plusLargeur: 'Un mètre de plus',
      moins: 'Un niveau de moins',
      plus: 'Un niveau de plus',
      hypothese: 'Largeur × niveaux × 3\u00a0m de hauteur par niveau. La surface est remplie au-dessus.',
    },

    q3: 'Où pouvons-nous vous répondre\u00a0?',
    nom: 'Votre nom',
    telephone: 'Téléphone',
    email: 'Email',
    message: 'Un mot sur votre projet',
    messageExemple: 'Ex.\u00a0: façade avant d’une maison mitoyenne, crépi abîmé par endroits…',
    photos: 'Photos de la façade',
    photosBouton: 'Ajouter des photos',
    photosAide: 'Cinq photos au maximum : elles nous aident à préparer votre devis.',
    photoRetirer: 'Retirer la photo',
    erreurPhotosMax: 'Cinq photos au maximum.',
    erreurPhoto: 'Cette photo n’a pas pu être ajoutée. Essayez-en une autre.',
    consentement: 'J’accepte que mes données soient utilisées pour répondre à ma demande.',
    consentementLien: 'Vie privée',

    suivant: 'Continuer',
    precedent: 'Retour',
    envoyer: 'Envoyer ma demande',
    envoiEnCours: 'Envoi…',
    facultatif: 'facultatif',

    erreurChoix: 'Choisissez au moins un type de travaux.',
    erreurChamp: 'Ce champ est obligatoire.',
    erreurEmail: 'Cette adresse email ne semble pas complète.',
    erreurConsentement: 'Cochez la case pour que nous puissions vous répondre.',

    merciTitre: 'C’est envoyé\u00a0!',
    merciTexte:
      'Votre demande nous est bien parvenue. Pour aller plus vite, vous pouvez nous envoyer la même demande sur WhatsApp, avec quelques photos de votre façade\u00a0: elle est déjà écrite.',
    merciWhatsApp: 'Envoyer sur WhatsApp',
    merciEmail: 'Par email',
    recommencer: 'Nouvelle demande',
    suiteIntro: 'Bonjour, voici ma demande de devis envoyée sur le site\u00a0:',
    suiteSujet: 'Ma demande de devis',

    erreurTitre: 'L’envoi n’a pas fonctionné.',
    erreurTexte: 'Vous pouvez réessayer, ou nous appeler directement au',
    reessayer: 'Réessayer',

    recap: {
      travaux: 'Travaux',
      autre: 'Autre',
      batiment: 'Bâtiment',
      surface: 'Surface de façade (m²)',
      message: 'Projet',
      nom: 'Nom',
      telephone: 'Téléphone',
      email: 'Email',
    },
  },
} as const;
