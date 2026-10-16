# Ely Facade : site vitrine

## Le projet

Site vitrine d'ELY FAÇADE BV (n° 1030.283.223), entreprise de rénovation de façades fondée par deux frères, Elisei et Simi Ungureanu. Bureau à Halle (Bergensesteenweg 745, 1502), intervient dans toute la Belgique. Site en français et en néerlandais.

Objectif : qu'un propriétaire, un syndic ou une société qui arrive sur le site ait confiance et prenne contact (formulaire de devis, téléphone, WhatsApp).

Le client ne veut pas toucher à l'informatique : Claudiu s'occupe de tout (logo, site, domaine, email, Google, cartes de visite).

- Contenu, pages, textes, décisions : `docs/brief.md`
- Suivi avec le client (hors site) : `docs/suivi-client.md`
- Modèle de départ : le site BS Renove (`/Users/claudiupopadiuc/Documents/GitHub/bs-renove`). On reprend sa structure, ses scripts et son moteur de formulaire, avec un design plus abouti.

## Règles non négociables

- **Ne jamais inventer d'information sur l'entreprise** (années d'expérience de l'entreprise, garanties détaillées, assurances, avis, chiffres, certifications). Si une info manque, ne rien afficher et la noter dans `docs/suivi-client.md`. Le site est en production : **aucune mention « à confirmer » ou provisoire** ne doit apparaître.
- **Société récente (fin 2025)** : jamais « depuis… » ni « fondée en… ». Les 6 ans de métier et les 50+ chantiers sont ceux d'Elisei et Simi à titre personnel, pas ceux de l'entreprise. Dans la bande des chiffres, ils s'affichent sans sous-texte ni prénom (« 6 ans d'expérience », « 50+ chantiers »).
- **Équipe de 8 personnes, indépendants** : ne jamais écrire « salariés ».
- **Garantie** : « Garantie de 10 ans minimum » seulement. Aucun détail sur les retenues de garantie des grandes sociétés.
- **Ne rien afficher** : assurance (RC, décennale), primes et aides, prix au mètre, horaires de visite, réseaux sociaux, avis clients (il n'y en a pas encore).
- **Vidéos et animations autorisées** (aucune interdiction) : motion design, vidéo, zoom, scrollytelling, tout ce qui sert le site. Les deux vidéos de chantier reçues d'Elisei (dossier Halle) sont de mauvaise qualité : ne pas les utiliser, mais une vidéo de qualité (ou créée en code/motion design) est bienvenue. Faire les choses **proprement, sans déranger le visiteur** : vidéo muette par défaut, légère et compressée, `poster`, coupée avec `prefers-reduced-motion`, contenu lisible sans elle.
- **Métiers = uniquement la façade, mais de A à Z, sur tous les chantiers** : crépi / enduit, isolation par l'extérieur, peinture de façade, nettoyage de façade, rejointoiement, réparation de briques, traitement des fissures, échafaudage (pas de montage de murs). Le chiffre « services » de l'accueil se calcule tout seul depuis `src/data/metiers.ts` (jamais écrit à la main) ; chaque service ajouté doit être confirmé par Elisei. Ni toiture, ni maçonnerie, ni intérieur, même si la BCE liste d'autres activités.
- **Photos : jamais d'adresse client.** Seule la commune est affichée (« Belgique » si inconnue). Avant tout import, **masquer par un aplat** numéros de maison, visages, plaques, coordonnées, puis vérifier à l'œil.
- **Photos dans `src/assets/`**, affichées avec `astro:assets`, importées **sans métadonnées** (sharp). Jamais dans `public/` : les originaux contiennent la position GPS.
- **Pas d'image générée par IA présentée comme un chantier.** Ce qui manque est illustré en SVG.
- **Tout texte visible existe en FR et en NL.** FR par défaut sans préfixe, NL sous `/nl/`.
- **Pas de base de données, pas de backend.** Site 100 % statique. Pas d'espace administrateur pour le moment (à revoir après la mise en ligne ; si fait, un CMS qui modifie les fichiers dans GitHub, jamais une base de données).
- **Pas de cookies de suivi**, pas de Google Fonts (polices hébergées).
- **Ne pas écrire « un seul interlocuteur »** (ni équivalents).
- **Aucun code mort** : à chaque changement, supprimer images, textes FR/NL et code devenus inutiles.
- Pas de « Rejoindre l'équipe » : ils ne recrutent pas.
- **Branches** : tout se fait directement sur `main` (décision de Claudiu, 16 octobre 2026) : pas de nouvelle branche.
- À la fin de chaque changement : `npm run build` sans erreur, puis **toujours commit** (message clair). **Push** : en session locale Claudiu pousse lui-même ; en session cloud, le push de la branche de travail est autorisé (jamais de push forcé, jamais de merge sur `main` sans demande). **Les déploiements Netlify sont en pause** (`ignore = "exit 0"` dans `netlify.toml`) : ne jamais retirer cette ligne. **Aucune collaboration de Claude** : jamais de ligne Co-Authored-By ni de mention de Claude dans les commits. Git : celui de GitHub Desktop (`/Applications/GitHub Desktop.app/Contents/Resources/app/git/bin/git`), jamais Xcode. Pour que git marche malgré la licence Xcode : `GIT_EXEC_PATH="/Applications/GitHub Desktop.app/Contents/Resources/app/git/libexec/git-core"` devant la commande git.
- Réponses courtes et directes, sans jargon.
- **README** : il présente le site (ce qu'il offre, captures, design, crédits), jamais la façon dont il a été développé ni les détails internes. Rappeler à l'utilisateur de le mettre à jour quand le projet approche d'une fin.

- **Nom écrit partout : « Ely Facade »** (sans cédille), y compris dans les logos. Exception : les mentions légales donnent la raison sociale exacte de la BCE, « ELY FAÇADE BV ». Le mot courant « façade » garde sa cédille dans les textes français.

## Outils à disposition (connecteurs Claude de Claudiu)

Figma, Netlify, Vercel (domaines), Notion, Supabase, Resend (email), Expo. Si un connecteur manque ou doit être autorisé, le noter ici et le dire à Claudiu.

## Stack

- **Astro** (sortie statique, TypeScript), GitHub + **Netlify** (`netlify.toml`). Domaine : `elyfacade.be` (principal) + `elyfacade.com` redirigé, à acheter.
- **CSS** : variables dans `src/styles/tokens.css` + styles scoped. Pas de framework CSS.
- **Textes** : `src/i18n/fr.ts` et `nl.ts`, même structure.
- **Formulaires en étapes** : devis uniquement, moteur repris de BS Renove. Envoi par **Netlify Forms**, emails vers Elisei (adresse pro à créer plus tard, à changer dans Netlify → Forms, pas dans le code).
- **Réalisations** : avant/après en content collection, comme BS Renove ; la frise des étapes dépend des photos reçues.
- **JavaScript** : vanilla (+ Lenis si pertinent). **Polices** : Fontsource.
- **Référencement** : titre et description propres à chaque page, JSON-LD `GeneralContractor`, `Service` et fil d'Ariane sur les pages métier, sitemap avec hreflang. Rien de non vérifié.

## Design : à définir

Thème **clair** (façades blanches une fois terminées). Noir et rouge souhaités par les clients, « mais pas que » : couleurs à fixer avec le logo. Un cran au-dessus de BS Renove. Le client me laisse choisir les meilleures idées selon les photos reçues.

Le logo se fait **avant** le site : 6 à 8 pistes, choix par Elisei et Simi, livraison en SVG (clair, sombre, icône ronde, version carte de visite).

### Principes (repris de BS Renove)

- **Tous les téléphones** : chaque changement testé sur Android (Chrome) **et** iPhone (Safari/WebKit).
- Mobile d'abord : dock flottant en bas (Appeler, WhatsApp, Devis). Zones tactiles ≥ 44 px.
- Accessibilité : contraste AA, focus clavier visible, vrais `<button>`/`<a>`, texte alternatif. Curseurs avant/après utilisables au clavier et qui ne bloquent jamais le défilement.
- Mouvement : tout se coupe avec `prefers-reduced-motion`, contenu utilisable sans JavaScript.
- Performance : images WebP aux bonnes tailles, chargement différé sauf haut de page.

## Commandes

- `npm run dev` : serveur local
- `npm run build` : vérification des types + construction
- `npm run preview` : aperçu du site construit

## À faire à la fin

Domaine et email pro, fiche Google Business (bureau de Halle), Search Console, QR code, cartes de visite (100, recto-verso).
