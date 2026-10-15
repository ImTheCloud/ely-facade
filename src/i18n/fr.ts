/** Tous les textes d'interface en français. Le NL suit exactement la même structure. */
export const fr = {
  code: 'fr',
  htmlLang: 'fr-BE',

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
  },

  deuxPoints: ' : ',

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
    zone: 'Bureau à Halle · Partout en Belgique',
    entreprise: 'L’entreprise',
  },

  accessibilite: {
    allerAuContenu: 'Aller au contenu',
  },

  communes: { mons: 'Mons', namur: 'Namur', halle: 'Halle', charleroi: 'Charleroi', evere: 'Evere' },

  /** Les cinq métiers (uniquement la façade). */
  metiers: {
    crepi: {
      titre: 'Crépi et enduit',
      court: 'Façade neuve ou à refaire, tous types de finitions et de systèmes, isolation par l’extérieur comprise.',
    },
    peinture: {
      titre: 'Peinture de façade',
      court: 'Une façade rafraîchie, dans la teinte de votre choix.',
    },
    nettoyage: {
      titre: 'Nettoyage de façade',
      court: 'Toutes méthodes, tous supports.',
    },
    rejointoiement: {
      titre: 'Rejointoiement',
      court: 'Des joints refaits proprement, toutes méthodes et tous supports.',
    },
    briques: {
      titre: 'Réparation de briques',
      court: 'Briques abîmées remplacées, joints refaits, fissures traitées, plaquettes de parement.',
    },
  },

  /** Les chantiers : faits visibles sur les photos ou confirmés par Elisei, rien d'autre. */
  chantiers: {
    umons: {
      titre: 'Université de Mons',
      accroche: 'Façades de bâtiments de l’Université de Mons (UMons)',
      texte:
        'Trois bâtiments de l’Université de Mons : une cour intérieure, un immeuble de quatre étages et une longue façade. Les photos suivent le chantier, de l’échafaudage à la façade terminée.',
      batiments: ['Cour intérieure', 'Immeuble de quatre étages', 'Longue façade'],
    },
    'namur-immeuble': {
      titre: 'Immeuble de trois étages',
      accroche: 'Une façade réalisée de A à Z',
      texte: 'Un immeuble de trois étages à Namur, en façade blanche et grise. Nos équipes ont réalisé la façade de A à Z.',
      batiments: [],
    },
    'namur-balcons': {
      titre: 'Immeuble à balcons',
      accroche: 'Cinq niveaux, de l’échafaudage à la façade blanche',
      texte: 'Un immeuble à balcons de cinq niveaux à Namur, sur sa colline. Nos équipes ont réalisé la façade de A à Z.',
      batiments: [],
    },
    halle: {
      titre: 'Maison',
      accroche: 'Une maison à Halle, la commune de notre bureau',
      texte: 'Une maison à Halle : le pignon sous échafaudage, puis la maison terminée.',
      batiments: [],
    },
    charleroi: {
      titre: 'Rangées de maisons',
      accroche: 'Deux rangées de maisons mitoyennes',
      texte: 'Deux rangées de maisons mitoyennes à Charleroi, sous échafaudage puis terminées.',
      batiments: [],
    },
    evere: {
      titre: 'Immeuble d’appartements',
      accroche: 'Un immeuble à Evere',
      texte: 'Un immeuble d’appartements à Evere, photographié de nuit.',
      batiments: [],
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
  } as Record<string, string>,

  pages: {
    accueil: {
      titre: 'Ely Facade | Rénovation de façades partout en Belgique',
      description:
        'Crépi, peinture, nettoyage, rejointoiement et réparation de briques : Ely Facade rénove votre façade partout en Belgique. Visite sur place gratuite et sans engagement.',
    },
    contact: {
      titre: 'Contact et devis | Ely Facade',
      description:
        'Demandez votre devis de rénovation de façade : formulaire en trois étapes, téléphone ou WhatsApp. Visite sur place gratuite et sans engagement, partout en Belgique.',
    },
  },

  accueil: {
    hero: {
      pastille: 'Rénovation de façades · Toute la Belgique',
      /** Une ligne par entrée : le titre tient toujours sur trois lignes. Le dernier mot est mis en lumière. */
      titre: ['Votre façade', 'mérite de', 'briller.'],
      texte:
        'Crépi, peinture, nettoyage, rejointoiement, réparation de briques\u00a0: de la petite maison à l’immeuble. Visite gratuite, garantie de 10\u00a0ans minimum.',
      bouton: 'Demander ma visite gratuite',
      appeler: 'Appeler le',
      preuvesAria: 'Nos engagements',
      preuves: ['Visite sur place gratuite', 'Garantie 10\u00a0ans minimum', 'Partout en Belgique'],
      film: {
        etapes: ['Mons · Université de Mons', 'Namur · Immeuble à balcons', 'Namur · Immeuble de trois étages'],
      },
    },


    /** Les phrases d'émotion entre les sections. Le mot entre crochets se souligne en rouge. */
    emotions: {
      durer: { phrase: 'Une façade refaite pour [durer].', note: 'Garantie de 10 ans minimum' },
      premiere: { phrase: 'La première chose qu’on voit de [chez vous].', note: '' },
      jeunesse: { phrase: 'Chaque façade a sa [seconde jeunesse].', note: '' },
      exigence: { phrase: 'Une maison ou une université : la [même exigence].', note: '' },
    },

    avantApres: {
      pastille: 'Avant, après',
      titre: 'La différence se voit.',
      texte: 'Faites glisser le curseur : la même façade pendant les travaux, puis une fois terminée.',
      aide: 'Glissez pour comparer',
      avant: 'Pendant les travaux',
      apres: 'Terminé',
      aria: 'Comparer la façade pendant les travaux et une fois terminée',
      voir: 'Voir le chantier',
    },

    etapes: {
      pastille: 'Les étapes d’une façade',
      titre: 'De l’échafaudage à la façade [terminée].',
      texte:
        'Un chantier de l’Université de Mons, étape par étape. C’est l’ordre de toute façade isolée par l’extérieur et crépie.',
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
        finition: {
          titre: 'Enduit de finition',
          texte: 'Après séchage, l’enduit de finition donne à la façade son aspect et sa teinte, au choix.',
          legendes: ['Finition'],
        },
        termine: {
          titre: 'Façade terminée',
          texte: 'L’échafaudage est retiré. Votre façade est garantie 10 ans minimum.',
          legendes: ['Façade terminée, cour intérieure'],
        },
      },
    },

    umons: {
      pastille: 'Chantier de référence',
      texte:
        'Façades de bâtiments de l’Université de Mons (UMons) : une cour intérieure, un immeuble de quatre étages et une longue façade. Du grand bâtiment public à la maison, nous travaillons avec le même soin.',
      voir: 'Le chantier en photos',
    },

    realisations: {
      pastille: 'Nos réalisations',
      titre: 'Ce que vous voyez, ce sont [nos chantiers].',
      texte: 'Des façades à Mons, Namur, Charleroi, Halle et Evere. Notre bureau est à Halle et nous intervenons partout en Belgique.',
      photos: 'photos',
      photo: 'photo',
      voir: 'Voir le chantier',
      precedent: 'Chantiers précédents',
      suivant: 'Chantiers suivants',
      toutes: 'Toutes nos réalisations',
      carte: {
        aria: 'Carte de la Belgique : notre bureau à Halle et les communes de nos chantiers',
        bureau: 'Notre bureau',
        legende: 'Partout en Belgique',
      },
    },

    chiffres: {
      aria: 'Ely Facade en chiffres',
      liste: [
        { valeur: '6 ans', libelle: 'de métier pour notre gérant' },
        { valeur: '50+', libelle: 'chantiers réalisés par nos gérants' },
        { valeur: '10 ans', libelle: 'de garantie minimum' },
        { valeur: '8', libelle: 'personnes dans l’équipe' },
      ],
    },

    metiers: {
      surtitre: 'Nos métiers',
      titre: 'Tout pour votre façade.',
      texte: 'Uniquement la façade : c’est notre métier, et nous ne faisons que ça.',
      voir: 'En savoir plus',
    },

    equipe: {
      surtitre: 'Qui vient chez vous',
      titre: 'Deux frères, une équipe.',
      texte:
        'Elisei et Simi Ungureanu dirigent Ely Facade. Elisei s’occupe de la visite et du devis. Simi dirige les travaux sur le chantier. Ils travaillent avec une équipe de 8 personnes, des indépendants.',
      personnes: [
        { prenom: 'Elisei', initiale: 'E', role: 'Visite et devis' },
        { prenom: 'Simi', initiale: 'S', role: 'Direction des chantiers' },
      ],
    },

    methode: {
      surtitre: 'Comment ça se passe',
      titre: 'De votre appel à la dernière finition.',
      etapes: [
        {
          titre: 'Vous appelez',
          texte: 'Donnez-nous la surface de votre façade (en mètres) et le type de travaux.',
        },
        {
          titre: 'Nous venons voir',
          texte: 'Elisei se déplace chez vous, gratuitement et sans engagement.',
        },
        {
          titre: 'Vous recevez le devis',
          texte: 'Après la visite, Elisei vous envoie le devis, au prix du mètre carré de façade.',
        },
        {
          titre: 'Les travaux commencent',
          texte: 'Si le devis vous convient. Garantie de 10 ans minimum.',
        },
      ],
    },

    faq: {
      surtitre: 'Questions fréquentes',
      titre: 'Vous vous demandez…',
      liste: [
        {
          question: 'La visite est-elle payante ?',
          reponse: 'Non. Elisei se déplace gratuitement et sans engagement, puis vous envoie le devis.',
        },
        {
          question: 'Comment est calculé le prix\u00a0?',
          reponse:
            'Au mètre carré de façade\u00a0: le prix dépend de la surface et des matériaux choisis. Elisei vous le donne dans le devis, après la visite gratuite.',
        },
        {
          question: 'Où intervenez-vous ?',
          reponse: 'Partout en Belgique. Notre bureau est à Halle.',
        },
        {
          question: 'Quels bâtiments rénovez-vous ?',
          reponse: 'Tous, du petit garage à l’immeuble de plusieurs étages : maisons, immeubles, commerces, copropriétés et sociétés.',
        },
        {
          question: 'Travaillez-vous l’hiver ?',
          reponse: 'Oui, nous travaillons toute l’année, y compris le samedi.',
        },
        {
          question: 'Quels matériaux utilisez-vous ?',
          reponse: 'Nous travaillons avec STO et des gammes haut de gamme. Des alternatives moins chères sont possibles selon votre budget.',
        },
        {
          question: 'Faites-vous de la maçonnerie ou de la toiture ?',
          reponse: 'Non. Nous ne faisons que la façade : crépi, peinture, nettoyage, rejointoiement et réparation de briques. Nous ne montons pas de murs.',
        },
      ],
    },

    devis: {
      titre: 'Votre façade mérite de briller. [Parlons-en].',
      texte:
        'Décrivez vos travaux en trois étapes. Elisei se déplace gratuitement chez vous, sans engagement, puis vous envoie le devis.',
      direct: 'Ou directement',
      calculateur: {
        titre: 'Quelle surface fait votre façade ?',
        texte: 'Une estimation suffit : la largeur de la façade et le nombre de niveaux.',
        largeur: 'Largeur (m)',
        niveaux: 'Niveaux',
        niveauxAide: 'rez-de-chaussée compris',
        moins: 'Un niveau de moins',
        plus: 'Un niveau de plus',
        hypothese: 'Calcul avec 3 m par niveau.',
        resultat: 'Surface estimée',
        unite: 'm²',
        utiliser: 'Ajouter à ma demande',
        ajoute: 'Ajouté à votre demande',
        note: 'Elisei mesurera précisément sur place, lors de la visite gratuite.',
      },
      photos: {
        titre: 'Montrez-nous votre façade',
        texte: 'Envoyez deux ou trois photos de votre façade sur WhatsApp, avec votre commune.',
        bouton: 'Envoyer mes photos',
        message: 'Bonjour, voici quelques photos de ma façade pour une demande de devis. Ma commune : ',
      },
    },

    contact: {
      surtitre: 'Contact et devis',
      titre: 'Votre devis, sans engagement.',
      texte:
        'Décrivez-nous vos travaux en trois étapes. Elisei se déplace gratuitement chez vous, sans engagement, puis vous envoie le devis.',
      direct: 'Ou directement',
      telephone: 'Téléphone',
      email: 'Email',
      zone: 'Bureau à Halle · Partout en Belgique',
    },
  },

  formulaire: {
    etape: 'Étape',
    sur: 'sur',
    etapes: ['Vos travaux', 'Votre bâtiment', 'Vos coordonnées'],

    q1: 'Quels travaux avez-vous en tête ?',
    q1Aide: 'Plusieurs choix possibles',
    autre: 'Autre chose',

    q2: 'Parlez-nous de votre façade',
    batiment: 'Type de bâtiment',
    batiments: ['Maison', 'Immeuble', 'Commerce', 'Autre'],
    surface: 'Surface de façade (m²)',
    surfaceExemple: 'Ex. : 120',
    surfaceAide: 'Une estimation suffit. Vous ne savez pas ? Laissez vide, Elisei mesurera sur place.',

    q3: 'Où pouvons-nous vous répondre ?',
    nom: 'Votre nom',
    telephone: 'Téléphone',
    email: 'Email',
    message: 'Un mot sur votre projet',
    messageExemple: 'Ex. : façade avant d’une maison mitoyenne, crépi abîmé par endroits…',
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

    merciTitre: 'C’est envoyé !',
    merciTexte:
      'Votre demande nous est bien parvenue. Pour aller plus vite, vous pouvez nous envoyer la même demande sur WhatsApp, avec quelques photos de votre façade : elle est déjà écrite.',
    merciWhatsApp: 'Envoyer sur WhatsApp',
    merciEmail: 'Par email',
    recommencer: 'Nouvelle demande',
    suiteIntro: 'Bonjour, voici ma demande de devis envoyée sur le site :',
    suiteSujet: 'Ma demande de devis',

    erreurTitre: 'L’envoi n’a pas fonctionné.',
    erreurTexte: 'Vous pouvez réessayer, ou nous appeler directement au',
    reessayer: 'Réessayer',

    sujetFormulaire: 'Nouvelle demande de devis · site Ely Facade',
    recap: {
      travaux: 'Travaux',
      batiment: 'Bâtiment',
      surface: 'Surface de façade (m²)',
      message: 'Projet',
      nom: 'Nom',
      telephone: 'Téléphone',
      email: 'Email',
    },
  },
} as const;
