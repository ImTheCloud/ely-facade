# Avancement : où en est le site (9 octobre 2026)

Document de reprise pour démarrer une nouvelle conversation. Les règles du projet sont dans `CLAUDE.md`, le contenu et les décisions dans `docs/brief.md`, le suivi client dans `docs/suivi-client.md`.

## Ce qui est fait

### Logo
- Logo final choisi par le client : concept **« briques »** (maison en briques avec une brique rouge, « ELY » noir et « FACADE » rouge, version horizontale).
- Sources dans `design/logo/` : `logo.svg` (fond transparent) et `icone.svg` (la maison seule).
- `node scripts/generer-marque.mjs` copie les SVG dans `src/assets/marque/` et fabrique le favicon, l'icône iPhone et l'image de partage (`src/assets/partage.png`).
- Pas encore livrés : version blanche pour fond sombre, icône ronde, version carte de visite (à faire en fin de projet).

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
- La grande tuile de l'accueil contient aujourd'hui la maison en briques du logo (`src/components/accueil/Briques.astro`) : **c'est la place d'une grande photo ou d'un curseur avant/après**.

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
1. **Photos reçues** (une partie) : suivre la règle de `CLAUDE.md` : masquer par un aplat numéros de maison, visages, plaques, coordonnées, vérifier à l'œil, ne jamais afficher d'adresse (commune seulement), import sans métadonnées dans `src/assets/` avec `astro:assets`, jamais dans `public/`. Décider avec le client : grande photo en haut de l'accueil et/ou curseur avant/après, frise des étapes.
2. Faire évoluer le design (« faire mieux » : plus de photos, plus de relief, éventuellement animations plus soignées) avant d'ajouter des pages.
3. Les 5 pages métier (`/services/<slug>/`, `/nl/diensten/<slug>/`), avec JSON-LD `Service` et fil d'Ariane, boutons devis qui pré-cochent le métier.
4. Réalisations (avant/après en content collection), À propos, mentions légales (raison sociale exacte « ELY FAÇADE BV », n° 1030.283.223, hébergeur Netlify), vie privée, 404 (FR + NL).
5. Données structurées complètes, vérifications finales (contrastes AA, clavier, `prefers-reduced-motion`, Android et iPhone), README à mettre à jour avant la livraison.

## Points à valider avec Elisei
- « 6 ans de métier pour notre gérant », « 50+ chantiers réalisés par nos gérants », « garantie de 10 ans minimum », « équipe de 8 personnes, des indépendants » (chiffres personnels des gérants, jamais de l'entreprise).
- « Le devis arrive en quelques jours maximum après la visite » ; types de bâtiment du formulaire (maison, immeuble, commerce, autre) ; matériaux (STO et alternatives) ; travail l'hiver et le samedi.
- L'adresse Gmail d'Elisei est affichée en attendant l'email professionnel.

## Pour reprendre
- `npm run dev` pour travailler, `npm run build` avant chaque commit, puis commit et push (Git de GitHub Desktop, voir `CLAUDE.md`, aucune mention de Claude dans les commits).
- Captures de test : le script Playwright de BS Renove (`/Users/claudiupopadiuc/Documents/GitHub/bs-renove/node_modules/playwright`) fonctionne avec Chromium et WebKit.
