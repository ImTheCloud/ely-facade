# Ely Facade : site vitrine

Site vitrine d'ELY FAÇADE BV, entreprise de rénovation de façades, bureau à Halle, interventions dans toute la Belgique. Site en français et en néerlandais, en ligne sur https://elyfacade.be. Objectif : qu'un propriétaire, un syndic ou une société qui arrive sur le site ait confiance et prenne contact (formulaire de devis, téléphone, WhatsApp).

## Contenu : règles à respecter

- **Seulement des faits vérifiés par le client.** Ne rien inventer (ancienneté de l'entreprise, garanties détaillées, assurances, avis, chiffres, certifications). Si une information manque, ne rien afficher. Aucune mention « à confirmer » ou provisoire sur le site.
- **Ancienneté** : ne jamais écrire « depuis… » ni « fondée en… ». Dans la bande des chiffres : « 6 ans d'expérience » et « 50+ chantiers », sans sous-texte ni prénom.
- **Équipe** : ne jamais écrire « salariés » ni afficher le nombre de personnes.
- **Garantie** : « Garantie de 10 ans minimum » seulement, sans détail.
- **Ne pas afficher sans l'accord du client** : assurances, primes et aides, prix, horaires de visite, réseaux sociaux.
- **Avis Google** : jamais écrits ni copiés à la main. Le QR code qui mène à la page d'avis est dans le pied de page de chaque page (`#avis`, lien court `/avis`) ; Elisei ouvre le site, descend tout en bas et le client scanne. L'affichage automatique des avis (lecture par l'API Google Places) a été retiré : il est dans l'historique git (commits « Avis Google »).
- **Services** : uniquement la façade, de A à Z : crépi et enduit, isolation par l'extérieur, peinture de façade, nettoyage de façade, traitement hydrofuge, rejointoiement, réparation de briques, plaquettes de parement, traitement des fissures, échafaudage. Le nombre de services se calcule depuis `src/data/metiers.ts` (jamais écrit à la main) ; chaque service a sa page (`/services/<service>/`, adresses dans `src/i18n/slugs.ts`) ; tout nouveau service doit être confirmé par le client. Ni toiture, ni maçonnerie, ni intérieur.
- **Ne pas écrire « un seul interlocuteur »** (ni équivalents). Pas de « Rejoindre l'équipe ».
- **Nom écrit partout : « Ely Facade »** (sans cédille), y compris dans les logos. Exception : les mentions légales donnent la raison sociale « ELY FAÇADE BV ». Le mot courant « façade » garde sa cédille.
- **Tout texte visible existe en FR et en NL.** FR par défaut sans préfixe, NL sous `/nl/`. Fichiers `src/i18n/fr.ts` et `nl.ts`, même structure.

## Photos

- **Jamais d'adresse client** : seule la commune est affichée (« Belgique » si inconnue). Avant tout import, masquer par un aplat numéros de maison, visages, plaques et coordonnées, puis vérifier à l'œil.
- Les photos vont dans `src/assets/`, importées **sans métadonnées** (sharp) et affichées avec `astro:assets`. Jamais dans `public/`. Les originaux (position GPS, éléments non masqués) ne sont jamais dans le dépôt.
- Pas d'image générée par IA présentée comme un chantier : ce qui manque est illustré en SVG.
- Les avant/après (« Pendant les travaux » / « Après ») sont le contenu le plus fort : toujours proposer le maximum de paires bien alignées, la plus parlante en premier (`paires[0]` sert sur l'accueil et sur la carte).

## Technique

- **Astro** (sortie statique, TypeScript), hébergé sur **Cloudflare Workers** avec fichiers statiques : `wrangler.jsonc`, en-têtes dans `public/_headers`, script serveur dans `worker/`. Chaque push sur `main` met le site à jour. Domaine `elyfacade.be` chez Infomaniak, DNS chez Cloudflare, email pro `info@elyfacade.be`.
- **Pas de base de données, pas de backend** : seule exception, `worker/devis.ts` (envoi du devis et des photos jointes par Resend, clé `RESEND_API_KEY` dans Cloudflare, destinataire modifiable avec `DEVIS_DESTINATAIRE`).
- **Pas de cookies de suivi**, pas de Google Fonts (polices Fontsource hébergées). Google Maps : un simple lien, aucune carte intégrée.
- **CSS** : variables dans `src/styles/tokens.css` + styles scoped, pas de framework. **JavaScript** vanilla (+ Lenis).
- **Référencement** : titre et description propres à chaque page, JSON-LD (`GeneralContractor` avec les deux dirigeants, `Service`, fil d'Ariane), sitemap avec hreflang.
- **Aucun code mort** : à chaque changement, supprimer images, textes FR/NL et code devenus inutiles.

## Design

Thème clair (façades blanches une fois terminées) : blanc façade `#FBFBFA`, ardoise `#1F2429`, rouge brique `#C8202B` en petites touches (la brique du logo). Polices : Bricolage Grotesque (titres) et DM Sans (texte). Logo, supports imprimés et images de la fiche Google : dossier `design/`.

- Mobile d'abord : dock flottant en bas (Appeler, WhatsApp, Email, Devis), zones tactiles ≥ 44 px. Chaque changement est testé sur Android (Chrome) **et** iPhone (Safari).
- Accessibilité : contraste AA, focus clavier visible, vrais `<button>`/`<a>`, texte alternatif, curseurs avant/après utilisables au clavier et qui ne bloquent jamais le défilement.
- Mouvement : vidéos et animations autorisées, mais sans déranger le visiteur (muettes par défaut, légères, coupées avec `prefers-reduced-motion`, contenu lisible sans elles).
- Performance : images WebP aux bonnes tailles, chargement différé sauf haut de page.

## Dépôt et façon de travailler

- Le dépôt est **public** : aucun secret, aucune photo d'origine, aucune note privée dans les fichiers.
- Tout se fait directement sur `main`. À la fin de chaque changement : `npm run build` sans erreur, puis commit avec un message clair, sans ligne `Co-Authored-By`.
- Push sur `main` après chaque changement, autorisé en permanence par le propriétaire (28 oct. 2026). Un push en force ou la suppression d'une branche distante demande son accord explicite.
- Le README présente le site (ce qu'il offre, captures, design, crédits), jamais la façon dont il a été développé.

## Commandes

- `npm run dev` : serveur local
- `npm run build` : vérification des types + construction
- `npm run preview` : aperçu du site construit
