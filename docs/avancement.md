# Avancement : où en est le site

## État du projet (15 octobre 2026)

**Le site est complet et sur `main`.** Toutes les pages existent en français et en néerlandais : accueil, Services et 5 métiers, Réalisations et 5 pages de chantier, À propos, Contact (devis), mentions légales, vie privée, 404. Référencement, accessibilité et vérifications faits (voir les étapes ci-dessous).

- **Haut de page choisi : C « La façade qui brille »** (choix de Claudiu). Les variantes A et B et les pages de comparaison sont supprimées. Ajustements demandés : pas de pastille, pas de liste des métiers dans le panneau, accroche « Rénovation de façades pour tous les bâtiments. », engagements réduits à « Garantie 10 ans minimum » et « Partout en Belgique » (la visite gratuite est dans le bouton). Sur téléphone, tout le texte est posé sur la pelouse et la route.
- **En ligne : pas encore.** Les déploiements Netlify sont en pause (`ignore = "exit 0"` dans `netlify.toml`).
- **Façon de travailler** : chaque nouveau changement se fait dans **une nouvelle branche** partie de `main`, puis est fusionné dans `main` une fois validé.

### Branche `ameliorations-accueil` (16 octobre 2026, à tester par Claudiu avant fusion)
- **Haut de page** : accroche raccourcie ; sur téléphone le titre est plus grand et tout le texte reste sur la pelouse et la route.
- **Chiffres** : 8 chiffres confirmés (6 ans, 50+, 2 frères, 8 personnes, 5 métiers, 12/12 mois, 10 ans de garantie, 0 € la visite). Retirés de la page À propos (doublon avec l'équipe).
- **Moins de répétitions** : phrases « La première chose qu'on voit de chez vous » et « Chaque façade a sa seconde jeunesse » (photo) supprimées ; garantie et « gratuit » retirés des endroits proches de leur première mention ; Umons sans la phrase déjà dite par le titre.
- **Espaces** entre les sections réduits (44 px téléphone, 72 px ordinateur au lieu de 72 et 120).
- **Avant/après** : un curseur partout (Namur ×2, Halle, Charleroi) ; les paires aux angles différents sont cadrées au mieux, à revoir à l'œil.
- **Étapes** : 4 étapes l'une sous l'autre (la 4e est « Façade terminée », avec la cour de l'UMons comme autre point de vue). Chaque photo a son cadre ; sur ordinateur le texte reste en vue à gauche.
- **Carte de Belgique** refaite : bureau de Halle avec le logo et le nom en rouge, Namur en premier partout (liste, bande, carte), points sombres pour les chantiers, villes repères, toucher une commune montre ses chantiers (liste de communes sous la carte sur téléphone). Texte « quelques chantiers » partout (plus jamais « toutes nos réalisations »).
- **Équipe** : « Deux frères, une équipe de 8. »
- **Formulaire** : tuile « Façade complète, de A à Z » ; « Autre chose » ouvre un champ pour préciser ; sur téléphone, tuiles en 2 colonnes et boutons Continuer / Envoyer collés en bas de l'écran. Les blocs « Montrez-nous votre façade » et « Ou directement » sont retirés (les photos se proposent après l'envoi, sur WhatsApp) ; le calculateur devient un « simulateur de surface » expliqué, à droite du formulaire sur ordinateur.
- **Email** : bouton Email ajouté dans la barre du bas sur téléphone et dans le bandeau d'appel des pages intérieures.

### Reste à faire côté Claudiu
- Tester sur un vrai iPhone (Safari n'a pas pu être testé dans la session cloud).
- Netlify : reprendre les déploiements (retirer la ligne `ignore`), relier le dépôt, retirer le badge, choisir l'adresse qui reçoit les devis.
- Acheter `elyfacade.be` et `elyfacade.com` **avant d'imprimer** cartes de visite et t-shirts ; email pro ; fiche Google Business (Halle) ; Search Console.
- Faire valider textes et couleurs par Elisei et Simi ; demander des photos « avant » sans échafaudage ; points à confirmer dans `docs/suivi-client.md`.
- Relire le README.

## Session autonome du 15 octobre 2026 (plan de `docs/reprise.md`, section 8)

### Étapes
- [x] 1. Photos contrôlées à l'œil : plaques masquées (2 à Mons : `mons-umons-immeuble-angle/etape-1-membrane-2`, `etape-2-sous-couche`), panneau de chantier et numéros peints sur des portes de garage masqués (Charleroi, `charleroi-rangee-1/pendant`), personnes et voiture recadrées hors de `namur-immeuble-3-etages/pendant-face`. Ciel prolongé au-dessus du toit de la photo d'accueil (le faîte touchait le bord) : reflet du ciel de la photo puis dégradé, sans rien inventer d'autre (`prolongerCiel()` dans `scripts/importer-photos.mjs`). Cadrage vertical pour téléphone : `accueil/hero-namur-mobile.jpg`.
- [x] 2. Nettoyage : anciennes photos (`src/assets/photos/*.jpg`, `paires/`, `accueil.jpg`), anciens avant/après, étapes, galerie et leurs textes FR/NL supprimés.
- [x] 3. Références : sites Framer bloqués par le réseau de la session ; capture Ironwood étudiée et fiches publiques résumées dans `docs/references/README.md`.
- [x] 4. En-tête et haut de page en 3 variantes : A « Mise au point », B « Film d'ouverture », C « La façade qui brille ». **C retenue par Claudiu**, A et B supprimées. En-tête posé dans la photo (logo blanc avec la brique rouge, liens blancs, bouton clair), blanc flouté au défilement. Titres en Bricolage Grotesque (capitales, 800, -0,03 em). Cadrage du toit calculé au pixel près pour toutes les tailles d'écran.
- [x] 5. Reste de l'accueil, dans l'ordre : phrase « Une façade refaite pour durer » → 4 chiffres → phrase « La première chose qu'on voit de chez vous » → avant/après (UMons cour en premier, puis Namur ×2, Halle, Charleroi) → phrase sur photo « Chaque façade a sa seconde jeunesse » → les étapes d'une façade (UMons, 7 photos, récit au défilement) → phrase « Une maison ou une université » → UMons, chantier de référence → réalisations (carte de Belgique + bande de 6 chantiers) → métiers (bande ardoise) → équipe → méthode → FAQ (+ « Comment est calculé le prix ? ») → devis (formulaire sur la page, calculateur de surface, photos par WhatsApp). Toutes les photos sont utilisées (accueil + pages Réalisations à l'étape 6).
- [x] 6. Pages (FR + NL) : Services (+ 5 pages métier : ce que nous faisons, étapes et façades crépies pour le crépi, illustration SVG pour les autres métiers, devis avec le métier pré-coché), Réalisations (liste + carte, une page par chantier avec photos par bâtiment, visionneuse plein écran, avant/après), À propos (les deux frères, l'équipe, le bureau de Halle), mentions légales (« ELY FAÇADE BV », n° 1030.283.223, hébergeur), vie privée, 404 (« Il manque une brique »). Le sélecteur de langue et les liens hreflang mènent à la même page dans l'autre langue, même quand l'adresse est traduite (`src/i18n/slugs.ts`). Pages légales et 404 : hors Google et hors sitemap.
- [x] 7. Référencement : titre et description propres à chaque page (descriptions ramenées sous 160 caractères), JSON-LD `GeneralContractor` sur l'accueil (adresse complète du bureau, n° de TVA, raison sociale, zone : Belgique), `Service` sur chaque page métier (relié à l'entreprise), fil d'Ariane `BreadcrumbList` sur toutes les pages intérieures, sitemap FR/NL avec hreflang (30 pages, sans les pages légales ni la 404). Les pages de chantier partagées sur WhatsApp montrent la photo du chantier.
- [x] 8. Vérifications finales, sur toutes les pages (FR + NL) : accessibilité automatique (axe, niveau AA) sans aucun défaut sur ordinateur et téléphone ; navigation au clavier avec contour visible partout ; tout le contenu visible sans JavaScript et avec « moins d'animations » (plus aucun mouvement dans ce mode, seulement des fondus) ; aucun débordement de 320 px à l'ordinateur ; aucun lien cassé ; aucun texte français dans les pages NL ; règles de contenu relues (aucun « depuis », « salariés », assurance, prix, avis…) ; code mort retiré (textes FR/NL inutilisés, icône). Corrigé en passant : contrastes (étiquette « avant » des curseurs, numéros rouges sur fond ardoise, mot WhatsApp du dock), cibles tactiles portées à 44 px (FR/NL, pied de page, fil d'Ariane), titres néerlandais longs (« Gevelschilderwerk ») qui ne se coupent plus au milieu du mot, liste des métiers et bouton menu sur petit téléphone, masque du reflet allégé sur téléphone (109 → 65 Ko). Poids : accueil ≈ 0,9 Mo au chargement sur ordinateur, pages intérieures 0,3 à 1 Mo. **Limite** : WebKit (Safari iPhone) n'a pas pu être installé dans la session cloud ; tests faits avec Chromium en émulation Android et iPhone. À revérifier sur un vrai iPhone.
- [x] 9. README : présente le site (ce qu'il offre, captures dans `docs/captures/`, design, crédits). À relire par Claudiu, et à mettre à jour quand le domaine sera en ligne.
- [x] 10. Rapport final remis à Claudiu (captures des 3 variantes, de l'accueil et des pages).

### Idées originales (section 9 de la reprise)
1. **« La façade qui brille »** (haut de page de l'accueil) : un reflet de lumière passe une fois sur les seules surfaces blanches de la façade (masque calculé depuis la photo), puis sur le mot « briller » ; la brique rouge du logo se pose comme point final du titre. Pourquoi : le titre devient vrai sous les yeux du visiteur, et la marque signe la page. Où : `Hero.astro`, `scripts/importer-photos.mjs` (masque).
2. **« Faites avancer le chantier »** : les étapes d'une façade racontées au défilement, la photo de l'UMons reste fixe et passe de l'échafaudage à la façade terminée, avec des pastilles 1 → 5. Pourquoi : montre le savoir-faire sans jargon, avec de vraies photos. Où : `Etapes.astro`, `scripts/etapes.ts`.
3. **Calculateur de surface** : largeur × niveaux → surface estimée, ajoutée au formulaire de devis d'un clic. Pourquoi : la surface est la première question d'Elisei ; le client n'a plus à la deviner. Aucun prix affiché. Où : `Devis.astro`, `scripts/calcul.ts`.
4. **Carte de Belgique des chantiers** : dessin simplifié, le bureau de Halle en brique rouge qui pulse, les communes de chantiers qui apparaissent une à une, « Partout en Belgique ». Pourquoi : rassure sur la zone d'intervention en un coup d'œil. Où : `CarteBelgique.astro`.
5. **« Montrez-nous votre façade »** : un bouton WhatsApp avec un message déjà écrit pour envoyer 2-3 photos et sa commune. Pourquoi : le contact le plus simple pour un particulier. Où : `Devis.astro`.
6. **La brique rouge comme signature** : point de la pastille, puces, numéros d'étapes, soulignements des mots clés qui se tracent en rouge. Où : `global.css` (`.brique`, `.souligne`).
7. **Phrases d'émotion mot par mot** (décision 20) : les mots s'éclaircissent un à un, puis le mot clé se souligne en rouge ; une phrase sur photo plein cadre qui glisse au défilement. Où : `Phrase.astro`, `Souligne.astro`.

### Décisions prises seul (à relire par Claudiu)
- Avant/après : seules les paires prises presque du même endroit sont en curseur (UMons cour, UMons longue façade, Namur trois étages), cadrées pour que les façades se superposent. Pour Halle, Charleroi et Namur balcons, les angles sont trop différents : les deux photos sont côte à côte dans le même cadre (un curseur aurait l'air cassé).
- Cour de l'UMons : la photo « pendant » utilisée est `etape-2-isolation` (même cour, angle proche de la photo « après ») ; `etape-1-membrane` est trop éloignée pour un curseur. Elle reste sur la page du chantier.
- Délais retirés : « le devis en quelques jours maximum » n'est plus affiché (décision 11 : pas de délai non confirmé).
- Étapes d'une façade : textes généraux de l'ordre confirmé par Elisei ; les légendes des photos ne disent que ce qu'on voit (« Échafaudage et protections », « Pendant les travaux », « Sous-couche », « Finition », « Façade terminée »).
- Haut de page par défaut : variante C. C'est la seule où le titre ne tombe pas sur les fenêtres (décision 12) ; les détails sont dans un panneau de verre pour rester lisibles devant la façade blanche.
- Téléphone : cadrage sur l'aile gauche de l'immeuble (toit et façade en haut, route et pelouse en bas sous le texte) ; le cadrage sur l'angle droit mettait le texte sur la façade.
- Police des titres : Bricolage Grotesque, version « taille optique » (plus fine et serrée aux grandes tailles). Gardée : le rendu en capture est convaincant, Sora et Manrope n'ont pas été nécessaires.
- Masques des photos : la couleur des aplats est maintenant la couleur moyenne de la zone masquée (avant : celle de toute la photo, d'où des rectangles gris visibles).
- Ciel prolongé sur la photo d'accueil (retouche, comme le ciel déjà retouché par Claudiu) : c'était le seul moyen que le toit « respire » sous l'en-tête.
- WebKit (iPhone) n'a pas pu être installé dans la session cloud (téléchargement bloqué par le réseau) : tests faits avec Chromium en émulation iPhone et Android. À revérifier sur un vrai iPhone.
- « Charleroi : 2 chantiers, 23 maisons » (nom du dossier photo) n'est pas affiché : chiffre non confirmé (noté dans `docs/suivi-client.md`).
- Page Crépi : « Nos façades en crépi » montre l'UMons, l'immeuble de Namur (trois étages) et Charleroi, qui ont l'air crépis sur les photos. À faire confirmer (noté dans `docs/suivi-client.md`).
- Les métiers sans photo (peinture, nettoyage, rejointoiement, briques) sont illustrés par un mur de briques dessiné en SVG, animé selon le métier ; jamais présenté comme un chantier.
- Langue automatique : un appareil réglé en néerlandais arrive sur la page NL, tous les autres sur la page FR (même en arrivant par une adresse /nl/), sauf si la langue a été choisie avec le sélecteur. Comportement repris de l'existant, gardé tel quel.

---

## Historique (avant le 15 octobre)

Document de reprise pour démarrer une nouvelle conversation. Les règles du projet sont dans `CLAUDE.md`, le contenu et les décisions dans `docs/brief.md`, le suivi client dans `docs/suivi-client.md`.

## Ce qui est fait

### Logo
- Logo final choisi par le client : concept **« briques »** (maison en briques avec une brique rouge, « ELY » noir et « FACADE » rouge, version horizontale).
- Sources dans `design/logo/` : `logo.svg` (fond transparent) et `icone.svg` (la maison seule).
- `node scripts/generer-marque.mjs` copie les SVG dans `src/assets/marque/` et fabrique le favicon, l'icône iPhone et l'image de partage (`src/assets/partage.png`).
- Fichiers pour l'imprimeur (t-shirts…) dans `design/logo/impression/` : logo et icône en couleur, fond sombre, noir, blanc ; chacun en PDF vectoriel, SVG et PNG 4000 px, avec un `LISEZ-MOI.txt`. Fabriqués par `node scripts/exporter-logo-impression.mjs`.
- T-shirts : maquettes (devant + dos, blanc et noir) et fichiers d'impression dans `design/t-shirt/`, fabriqués par `node scripts/exporter-t-shirt.mjs` (après `exporter-logo-impression.mjs`). Devant : logo 10 cm côté cœur. Dos (25 × 23 cm) : logo empilé (maison de 10 cm au-dessus du nom), « Rénovation de façades · Gevelrenovatie », téléphone, elyfacade.be. 25 cm de large maximum (zone d'impression Vistaprint).
- Maquettes photo pour le client dans `design/t-shirt/photo/` (`node scripts/photo-t-shirt.mjs`) : le vrai fichier d'impression posé sur une photo de t-shirts vierges générée par IA (`photo/sources/`, maquette seulement, jamais sur le site).
- Carte de visite d'Elisei (exemple) dans `design/carte-visite/` : PDF imprimeur recto-verso avec fonds perdus (85 × 55 mm fini), PNG, image de présentation, fabriqués par `node scripts/exporter-carte-visite.mjs`. QR code vers elyfacade.be (domaine pas encore acheté), pas d'email affiché tant que l'adresse pro n'existe pas.
- Pas encore livrés : icône ronde.

### Site (Astro, statique, FR + NL)
- Projet en place : Astro, sitemap avec hreflang, `netlify.toml`, polices hébergées (DM Sans via Fontsource), aucun cookie.
- **Pages faites** : accueil (`/` et `/nl/`), contact avec formulaire de devis (`/contact/` et `/nl/contact/`).
- **Pages encore inexistantes** (le menu y mène déjà) : Services (+ 5 pages métier), Réalisations, À propos, mentions légales, vie privée, 404.
- Textes dans `src/i18n/fr.ts` et `nl.ts` (même structure). Routes dans `src/i18n/index.ts`. Coordonnées dans `src/data/entreprise.ts`.
- Accueil : en-tête verre flouté, titre, grille de tuiles (maison en briques + 4 chiffres), 5 métiers, « Deux frères, une équipe », 4 étapes, FAQ, bloc d'appel au contact, pied de page. Barre Appeler / WhatsApp / Devis collée en bas sur mobile.
- Formulaire de devis en 3 étapes (travaux, bâtiment et surface, coordonnées). Envoi par Netlify Forms, puis message WhatsApp ou email déjà écrit. `?travaux=<cle>` pré-coche un métier (clés : `crepi`, `peinture`, `nettoyage`, `rejointoiement`, `briques`, `autre`).
- Testé : Chrome et WebKit (iPhone), mobile 390 px et ordinateur 1440 px, pas de débordement horizontal.

### Design : historique des essais (pour ne pas refaire les mêmes erreurs)
1. Premier jet repris de BS Renove : refusé, trop proche de BS Renove.
2. « Chantier brut » (noir et rouge, angles droits, capitales Anton) : refusé.
3. Thème clair avec noir et rouge forts : refusé (« pas moderne, trop d'angles droits, noir et rouge trop forts sur le blanc »).
4. **Actuel : « Bento moderne », rouge en petites touches** : le client dit « beaucoup mieux » mais pense qu'on peut faire encore mieux. Détails :
   - fond `#fbfbfa`, tuiles blanches aux coins arrondis (28 px), ombres douces ;
   - texte gris ardoise `#1f2429` / `#4a5058` (pas de noir pur) ;
   - rouge `#c8202b` seulement sur le bouton principal, un mot du titre, les icônes, un point, une tuile rosée ;
   - réglages dans `src/styles/tokens.css`.
- Ce que le client n'aime pas : dessins d'immeubles (supprimés), angles droits, couleurs fortes, fond beige. Il veut du moderne, du doux, plus de photos.
5. **Nouveau (10 octobre 2026), à faire valider : l'avant/après d'abord**, même thème clair, plus sobre (le premier essai avec échafaudage dessiné, fenêtres et règle d'étages a été jugé enfantin et supprimé) :
   - haut de l'accueil : photo pleine largeur avec **curseur avant/après** (Namur) qui se révèle tout seul à l'arrivée, puis se manipule au doigt, à la souris ou au clavier (`Comparateur.astro`, `src/scripts/comparateur.ts`) ;
   - bande de 4 chiffres posée sur le bas de la photo ;
   - section « Avant, après » : 2 autres curseurs (Charleroi, Mons) ;
   - section « Les étapes » : échafaudage, isolation, sous-couche et armature, crépi, terminé (5 photos) ;
   - les photos « après » sont recalées sur les photos « avant » (même point de vue) par un script de traitement ponctuel ; seules les paires vérifiées à l'œil sont utilisées.
   - Une fois validé, les autres pages reprennent ces composants.
- Ce que le client n'aime pas : dessins d'immeubles (supprimés), angles droits, couleurs fortes, fond beige. Il veut du moderne, du doux, plus de photos.
5. **Nouveau (10 octobre 2026), à faire valider : « La façade qui se révèle »**, même thème clair et doux, plus de photos et une idée propre au métier :
   - accueil : grande photo de façade avec un **échafaudage dessiné en SVG qui se retire étage par étage** au chargement (bouton pour le revoir, coupé avec `prefers-reduced-motion`), `Hero.astro` + `Echafaudage.astro` ;
   - les 4 chiffres sont des **fenêtres** (cadre graphite fin, vitre claire, reflet qui suit le doigt ou la souris) ;
   - **règle des niveaux** sur le côté (grand écran) : +0, +1, +2… comme des cotes d'étage, l'étage lu s'allume (`site.ts`, attribut `data-niveau` sur chaque section) ;
   - grain très léger sur le fond (comme un crépi fin) ;
   - galerie « Sur nos chantiers » (`Chantiers.astro`) avec 8 photos, commune seulement.
   - Une fois validé, les autres pages reprennent ces composants (tuiles, fenêtres, photos, règle des niveaux).

### Design : version « photo unique + avant/après » (14 octobre 2026), à faire valider
- Haut de page : une seule photo plein écran (`src/assets/accueil.jpg`, l'immeuble de Namur terminé vu d'en haut, **nettoyée et retouchée par Claudiu** : ciel, objets retirés), titre « Redonnez à votre façade tout son éclat. » et boutons à gauche comme sur les modèles Framer (Ironwood), **rien au défilement** (`Hero.astro`). Sur téléphone la photo est dans une fenêtre arrondie, le texte dessous. Les essais « rouleau », « briques » et « lentille » ont été abandonnés.
- Bande des 4 chiffres, puis **avant/après en onglets** (`Comparaisons.astro`, `src/scripts/avant-apres.ts`) : 11 chantiers, un curseur visible à la fois (4 à Namur dont l'immeuble à balcons, 1 à Charleroi, 6 à Mons). Paires validées par le client, photos dans `src/assets/photos/paires/` (visages, plaques, panneaux et bannières d'autres entreprises masqués par un aplat, sans métadonnées). La photo « après » de Mons (34) sert à trois curseurs, celle de Namur (54) à deux, celle de la cour de Mons (39) à deux.
- Puis étapes, **galerie « Sur nos chantiers »** (45 photos : Namur, Charleroi, Mons, Halle, Evere ; filtre par commune, visionneuse, `Galerie.astro` + `src/scripts/galerie.ts`), métiers, équipe, etc.
- Les photos de la galerie (`src/assets/photos/*.jpg`) sont masquées mais pas toutes revues en grand : à regarder avant la mise en ligne.

### Netlify (site de test)
- Projet **ely-facade** (équipe ELI4IT), adresse `https://ely-facade.netlify.app`, formulaires activés (formulaire « devis » détecté).
- Déploiement actuel : fait à la main avec le connecteur Netlify (`deploy-site` donne une commande `npx @netlify/mcp ...` à lancer dans le dossier du projet ; le jeton dans la commande expire vite, en redemander un à chaque fois). Le dépôt GitHub n'est pas encore relié.
- Dépôt : `ImTheCloud/ely-facade`, branche `main`, tout est commité et poussé.

## À faire côté Claudiu (hors code)
- Relier le dépôt GitHub à Netlify (Project configuration → Build & deploy → Link repository).
- Désactiver le badge « Powered by Netlify » (Project configuration → General).
- Forms → Form notifications : choisir l'adresse qui reçoit les devis.
- Montrer le design à Elisei et Simi, faire valider logo et textes.
- Acheter `elyfacade.be` et `elyfacade.com` (connecteur Vercel : montrer le prix avant d'acheter), email pro, fiche Google Business, Search Console, QR code, cartes de visite.

## Prochaines étapes (dans l'ordre)
1. **Photos** : 56 reçues (Charleroi, Mons, Namur), 9 retenues dans `src/assets/photos/` (recadrées pour retirer plaques, panneaux, personnes ; aplats sur le reste ; sans métadonnées). 3 paires avant/après exactes trouvées (Namur, Charleroi, Mons). Aucune photo n'a été prise avant l'installation de l'échafaudage : la photo « avant » est toujours « pendant les travaux ». À demander à Elisei : des photos de la façade d'origine, sans échafaudage, prises du même endroit que celles-ci.
2. Faire évoluer le design (« faire mieux » : plus de photos, plus de relief, éventuellement animations plus soignées) avant d'ajouter des pages.
3. Les 5 pages métier (`/services/<slug>/`, `/nl/diensten/<slug>/`), avec JSON-LD `Service` et fil d'Ariane, boutons devis qui pré-cochent le métier.
4. Réalisations (avant/après en content collection), À propos, mentions légales (raison sociale exacte « ELY FAÇADE BV », n° 1030.283.223, hébergeur Netlify), vie privée, 404 (FR + NL).
5. Données structurées complètes, vérifications finales (contrastes AA, clavier, `prefers-reduced-motion`, Android et iPhone), README à mettre à jour avant la livraison.

## Points à valider avec Elisei
- « 6 ans de métier pour notre gérant », « 50+ chantiers réalisés par nos gérants », « garantie de 10 ans minimum », « équipe de 8 personnes, des indépendants » (chiffres personnels des gérants, jamais de l'entreprise).
- « Le devis arrive en quelques jours maximum après la visite » ; types de bâtiment du formulaire (maison, immeuble, commerce, autre) ; matériaux (STO et alternatives) ; travail l'hiver et le samedi.
- L'adresse Gmail d'Elisei est affichée en attendant l'email professionnel.

## Pour reprendre
- `npm run dev` pour travailler, `npm run build` avant chaque commit, puis commit, sans push (Claudiu pousse lui-même ; Git de GitHub Desktop, voir `CLAUDE.md`, aucune mention de Claude dans les commits).
- Captures de test : le script Playwright de BS Renove (`/Users/claudiupopadiuc/Documents/GitHub/bs-renove/node_modules/playwright`) fonctionne avec Chromium et WebKit.
