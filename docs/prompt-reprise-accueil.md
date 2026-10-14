# Prompt de reprise : page d'accueil Ely Facade (14 octobre 2026)

À coller tel quel au début d'une nouvelle conversation. Lire d'abord `CLAUDE.md`, `docs/brief.md`, `docs/avancement.md` et `docs/suivi-client.md`.

---

## Mission

Refaire le **haut de la page d'accueil** (et, une fois validée, toute la page d'accueil) pour qu'elle fasse **« waw »** dès l'arrivée. Claudiu a validé le reste du projet (logo, thème clair, textes, formulaire) mais **rejette tous les hauts de page essayés jusqu'ici**. La page d'accueil doit être validée définitivement avant de faire les autres pages (Services, Réalisations, À propos, mentions légales, vie privée, 404) : ces pages reprendront son design.

Ce que Claudiu veut, dans ses mots : *« un header bien intégré, une bien meilleure qualité de visualisation, du waw dans les placements et dans la structure des textes, comme la page d'accueil de ce modèle Framer : https://construction-visuvate.framer.website/ (Ironwood) : l'image en fond bien remplie, et un beau texte qui va dans le thème de la photo »*.

## État actuel du code (dernier commit : `a0c255b`, rien poussé)

- Astro statique, FR (`/`) + NL (`/nl/`), `npm run build` passe sans erreur.
- **Haut de page actuel** (`src/components/accueil/Hero.astro`) : photo plein écran (`src/assets/accueil.jpg`, façade de Namur retouchée par Claudiu), voile sombre, titre « REDONNEZ À VOTRE FAÇADE TOUT SON ÉCLAT. » (« tout son éclat » en rouge), paragraphe, boutons Devis + téléphone, pastille de surtitre. **Claudiu n'aime pas du tout** : l'en-tête est une barre blanche floutée posée sur la photo (mal intégrée), la photo est coupée en haut (le toit passe sous l'en-tête), le texte tombe sur les fenêtres du bâtiment et le tout paraît bricolé. Sur téléphone on ne voit qu'une tranche du bâtiment.
- Le reste de l'accueil (sous le haut de page) : bande de 4 chiffres (`Chiffres.astro`), **avant/après en onglets** (`Comparaisons.astro` + `src/scripts/avant-apres.ts`, 11 chantiers, un curseur à la fois), étapes (`Etapes.astro`), **galerie « Sur nos chantiers »** (`Galerie.astro` + `src/scripts/galerie.ts`, 45 photos, filtre par commune Namur/Charleroi/Mons/Halle/Evere, visionneuse), métiers, équipe, méthode, FAQ, appel.
- En-tête : `src/components/Entete.astro` (transparent en haut, pilule floutée au défilement ; se cache en descendant). Sur l'accueil, `Hero.astro` force un fond blanc flouté (`:global(body:has(.hero) .entete)`) : **c'est ce qu'il faut repenser** (en-tête transparent avec logo/texte blancs sur la photo puis passage au blanc au défilement, par exemple). Un logo blanc existe dans `design/logo/` (version fond sombre) à vérifier.
- Tokens : `src/styles/tokens.css` (thème clair, `--color-accent: #c8202b`, police DM Sans hébergée). Textes : `src/i18n/fr.ts` et `nl.ts` (même structure). Photos : `src/assets/photos/` (galerie) et `src/assets/photos/paires/` (avant/après), `src/assets/accueil.jpg` (haut de page). Données : `src/data/chantiers.ts`.

## Ce qui a déjà été essayé et refusé (ne pas refaire)

1. Curseur avant/après en haut de page (Namur) : jugé moyen.
2. Échafaudage dessiné, fenêtres, règle d'étages : « enfantin », supprimé.
3. Prototypes « rouleau » (un rouleau de peinture dévoile l'après au défilement), **« briques » (la façade suivante se construit brique par brique, aimé au rendu mais « ça ne m'impressionne pas »)**, « lentille » (loupe qui montre l'après). Prototypes dans `~/Desktop/Prototypes Ely Facade/` (dossier hors dépôt).
4. Versions claires A/B/C (curseur dans une tuile, duo de photos, photo puis texte) et D/E/F/G (plein écran, carte arrondie, ciel remplacé) : « j'aime aucun ».
5. **Aucun effet au défilement dans le haut de page** : Claudiu l'a explicitement demandé (« rien au scroll »). Une seule image fixe.
6. Noir lourd, angles droits, grandes capitales brutes sur fond noir, beige : refusés plus tôt (thème « chantier »). Il aime : moderne, doux, clair, arrondi, rouge en petites touches.

## Références validées par Claudiu (à ouvrir et décortiquer, captures d'écran avec le navigateur intégré)

- https://construction-visuvate.framer.website/ (Ironwood) : **la référence principale** : photo plein cadre très riche, en-tête transparent bien intégré (logo à gauche, liens au centre, bouton à droite), pastille d'accroche, gros titre en capitales blanches sur 3 lignes, 2 lignes de texte, un bouton, photo bien cadrée qui laisse le bâtiment respirer.
- https://www.framer.com/marketplace/templates/bldr/ , `/lintel/` , `/roofera/` , `/constructal/` , `/constructiv/` , `/hearthstone-template/` , https://scandiwest.framer.website/
- Ce qui revient : **une photo d'architecture très belle** (ciel bleu ou lumière dorée, bien droite, rien qui traîne), un en-tête intégré à la photo, une hiérarchie typographique forte, très peu d'éléments.

## Ressources photo

- Haut de page : `~/Downloads/image.jpeg` (2730 × 1536, façade de Namur nettoyée et retouchée par Claudiu avec son iPhone) déjà importée en `src/assets/accueil.jpg`. Il peut en fournir d'autres. Les originaux sont dans `~/Desktop/Charleroi`, `Mons`, `Namur`, `Halle`, `Evere` (ne jamais les mettre dans `public/` : GPS ; masquer visages, plaques, numéros, panneaux et bannières d'autres sociétés par un aplat avant tout import, avec `sharp`, sans métadonnées).
- Le toit de l'immeuble de la photo d'accueil touche le bord haut de l'image : prévoir un cadrage qui le laisse respirer, ou une autre photo.
- Paires avant/après validées dans `~/Desktop/Prototypes Ely Facade/Paires validées/` et dans `src/assets/photos/paires/`.

## Règles non négociables (rappel de `CLAUDE.md`, les plus importantes ici)

- Ne rien inventer sur l'entreprise : pas de chiffres ni de promesses non confirmés. Société récente (fin 2025), jamais « depuis… ». « 6 ans de métier pour notre gérant », « 50+ chantiers réalisés par nos gérants », « garantie de 10 ans minimum », « équipe de 8 personnes, des indépendants » (jamais « salariés »). Pas de « un seul interlocuteur ».
- Métiers = uniquement la façade (crépi/enduit, peinture, nettoyage, rejointoiement, réparation de briques).
- **Pas d'image générée par IA présentée comme un chantier.** Pas de vidéo, pas de réseaux sociaux, pas d'avis, pas de prix, pas d'assurance affichés.
- Tout texte visible en FR **et** NL (FR par défaut sans préfixe, NL sous `/nl/`). Nom écrit « Ely Facade » (sans cédille) ; « façade » commun garde sa cédille.
- Site 100 % statique, pas de cookies de suivi, pas de Google Fonts. Aucun code mort (supprimer images, textes et code devenus inutiles).
- Accessibilité : contraste AA, focus visible, `prefers-reduced-motion`, contenu utilisable sans JavaScript, zones tactiles ≥ 44 px. **Tester Android (Chrome) et iPhone (Safari/WebKit)**, mobile d'abord (dock Appeler / WhatsApp / Devis en bas sur téléphone).
- Fin de chaque changement : `npm run build` sans erreur, puis **commit, jamais de push**, sans aucune mention de Claude ni ligne Co-Authored-By. Git de GitHub Desktop : `GIT_EXEC_PATH="/Applications/GitHub Desktop.app/Contents/Resources/app/git/libexec/git-core" "/Applications/GitHub Desktop.app/Contents/Resources/app/git/bin/git" …`
- Réponses courtes et directes, sans jargon (Claudiu n'est pas développeur du métier du bâtiment ; il choisit au ressenti).

## Ce qu'il faut faire, dans l'ordre

1. Ouvrir les références ci-dessus avec le navigateur intégré et **décrire précisément** (structure, en-tête, marges, tailles de titre, voile, cadrage) ce qui les rend « waw ».
2. Concevoir **un seul** haut de page très soigné, pas trois variantes au hasard : en-tête intégré à la photo (transparent puis blanc au défilement, logo adapté, version sombre/claire), bon cadrage de la photo (toit visible, sujet à droite, texte sur une zone calme), hiérarchie typographique forte, un bouton principal, vraie finition (espacements, alignements sur la grille du site, apparition douce du texte au chargement seulement). Penser **ordinateur ET téléphone** (la photo est large : sur téléphone, soit un autre cadrage choisi à la main, soit une photo plus adaptée).
3. Montrer le résultat à Claudiu **en capture d'écran** (ordinateur + téléphone) avant de passer à la suite ; lui demander un avis sans lui proposer cinq variantes.
4. Une fois l'accueil validé : revoir l'ensemble de la page (bande de chiffres, avant/après, galerie) pour qu'elle soit cohérente avec le nouveau haut de page, puis mettre à jour `docs/avancement.md`.
5. Ensuite seulement : les 5 pages métier (`/services/<slug>/`, `/nl/diensten/<slug>/`), Réalisations, À propos, mentions légales, vie privée, 404, JSON-LD, README.

## À faire côté Claudiu (hors code, déjà noté dans `docs/suivi-client.md`)

Netlify (relier GitHub, badge, adresse des devis), acheter elyfacade.be et .com **avant d'imprimer t-shirts et cartes**, email pro, fiche Google Business (Halle), Search Console, photos « avant » prises du même endroit par Simi, validation des textes et couleurs par Elisei et Simi.
