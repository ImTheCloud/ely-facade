# Reprise du projet Ely Facade (15 octobre 2026)

Document unique pour démarrer une nouvelle conversation. Il remplace l'ancien prompt de reprise. Lire aussi `CLAUDE.md` (règles non négociables), `docs/brief.md`, `docs/suivi-client.md`.

> **Prompt à coller en premier message :**
> « Lis `docs/reprise.md`, `CLAUDE.md` et `docs/brief.md`. Les décisions sont déjà prises (section 4) : ne les redemande pas. Fais, dans l'ordre : (1) ranger et renommer les photos de `~/Desktop/Photos-ElyFacade` selon le plan du document, (2) supprimer les anciennes photos du projet, (3) refaire la page d'accueil : photo de Namur en tout grand, en-tête intégré dans la photo, avant/après en dessous, puis la partie « étapes d'une façade » avec le chantier de Mons. Montre-moi des captures (ordinateur + téléphone) avant de continuer. »

---

## 1. Où en est le projet

**Fait et validé** : logo (maison en briques), thème clair doux (blanc, ardoise, rouge en petites touches, DM Sans), formulaire de devis en 3 étapes (`/contact/`), en-tête et pied de page, bilingue FR/NL, JSON-LD de base, sitemap hreflang, T-shirts (`design/t-shirt/`), carte de visite d'Elisei (`design/carte-visite/`).

**Pages existantes** : accueil (`/`, `/nl/`), contact (`/contact/`, `/nl/contact/`). **Pas encore faites** : 5 pages métier, Réalisations, À propos, mentions légales, vie privée, 404.

**La page d'accueil est le blocage.** Claudiu a rejeté tous les hauts de page essayés (curseur, échafaudage dessiné, rouleau, briques, lentille, versions claires, plein écran avec voile). Dernier état (commit `a0c255b`) : photo plein écran de Namur + titre « Redonnez à votre façade tout son éclat. » : « je n'aime pas du tout ». Défauts : en-tête = barre blanche floutée posée sur la photo (mal intégrée), le toit passe sous l'en-tête, le titre tombe sur les fenêtres du bâtiment, rendu bricolé, sur téléphone on ne voit qu'une tranche de la photo.

**Il faut repartir de zéro sur l'accueil** (et seulement ensuite faire les autres pages : elles reprendront son design).

### Code actuel (à adapter, pas à garder tel quel)

- `src/components/accueil/` : `Hero`, `Chiffres`, `Comparaisons` (avant/après en onglets), `Etapes`, `Galerie` (filtre par commune + visionneuse), `Metiers`, `Equipe`, `Methode`, `Faq`, `Appel`. Scripts : `src/scripts/` (`site.ts` Lenis + apparitions, `comparateur.ts`, `avant-apres.ts`, `galerie.ts`, `formulaire-etapes.ts`).
- En-tête : `src/components/Entete.astro` (transparent en haut, pilule floutée au défilement, se cache en descendant, menu plein écran sur mobile). `Hero.astro` le force en blanc flouté : à repenser.
- Textes : `src/i18n/fr.ts`, `nl.ts` (même structure). Données : `src/data/chantiers.ts`, `entreprise.ts`. Tokens : `src/styles/tokens.css`.
- `npm run build` passe sans erreur. Dernier commit : `472547c` (rien poussé : Claudiu pousse lui-même).

---

## 2. Nouvelles photos : `~/Desktop/Photos-ElyFacade` (35 photos, métadonnées déjà absentes)

Claudiu a trié par chantier. **Elles remplacent tout ce qui est dans le projet.** Les noms de dossiers/fichiers actuels sont approximatifs (« copie 2 », « pendantaussi »…) : tout renommer proprement.

Inventaire (n° = ordre alphabétique du dossier, dimensions, ce que je vois). Les « pendant » sont tous *sous échafaudage*, aucune vraie photo « avant les travaux ».

### Namur : immeuble de 3 étages (toit vert puis ardoise)
| Fichier d'origine | Contenu | Nom proposé |
|---|---|---|
| `Namur/Photo pour Page principale.jpeg` (2730×1536) | immeuble blanc et gris terminé, vu d'en haut, ciel bleu, retouchée par Claudiu | `accueil/hero-namur.jpg` (**photo de l'accueil**) |
| `Namur/Avant:apres copie 2/apres.jpeg` (1600×900) | terminé, vu de la rue, grand arbre à droite | `namur-immeuble-3-etages/apres-rue.jpg` |
| `…/pendant.jpeg` | sous échafaudage, vu de la rue, benne jaune « MAES » | `namur-immeuble-3-etages/pendant-rue.jpg` |
| `…/pednantaussi.jpeg` | sous échafaudage, de face, **3 personnes visibles + camionnette** (à masquer ou recadrer) | `namur-immeuble-3-etages/pendant-face.jpg` |

### Namur : immeuble à balcons (5 niveaux, autre chantier)
| Fichier d'origine | Contenu | Nom proposé |
|---|---|---|
| `NamurAutrechantier/Avant:apres copie/avant.jpeg` (2100×1576) | sous échafaudage et filets, grue à droite, ciel bleu | `namur-immeuble-balcons/pendant-grue.jpg` |
| `NamurAutrechantier/Avant:apres copie/apres.jpeg` (4032×3024) | terminé, vu du coin, ciel gris | `namur-immeuble-balcons/apres-coin.jpg` |
| `NamurAutrechantier/Avant:apres copie 3/avantcotégauche.jpeg` (3024×4032, portrait) | côté gauche sous échafaudage, membrane noire | `namur-immeuble-balcons/pendant-cote-gauche.jpg` |
| `NamurAutrechantier/Avant:apres copie 3/aprescotégauche.jpeg` (4032×3024) | côté gauche terminé, poteau électrique | `namur-immeuble-balcons/apres-cote-gauche.jpg` |
| `Namur/Avant:apres copie 4/pendant.jpeg`, `pendantaussi.jpeg` (portrait), `pendantcotédroit.jpeg` | **même immeuble à balcons**, de loin, échafaudage + filets, bannière « De Graeve » | `namur-immeuble-balcons/pendant-loin-1…3.jpg` |
| `Namur/avantpendant.jpeg`, `avantpendentaaussi.jpeg` | même immeuble, stade plus précoce (échafaudage nu), sacs bleus | `namur-immeuble-balcons/pendant-debut-1…2.jpg` |

(Les 5 dernières lignes sont rangées dans `Namur/` par Claudiu mais montrent l'immeuble à balcons : à confirmer.)

### Charleroi : « 2 chantiers, total de 23 maisons »
| Fichier d'origine | Contenu | Nom proposé |
|---|---|---|
| `…/Avant:Après/Bloc1avant.jpeg` (1600×1200) | bloc 1 sous échafaudage, panneau de chantier | `charleroi-rangee-1/pendant.jpg` |
| `…/Avant:Après/Bloc1apres.jpeg` (**1024×765**, basse résolution) | bloc 1 terminé, façade crème | `charleroi-rangee-1/apres.jpg` |
| `…/Avant:Après copie 2/Bloc2avant.jpeg` (1600×1200) | bloc 2 sous échafaudage, voiture, garages | `charleroi-rangee-2/pendant.jpg` |
| `…/Avant:Après copie 2/Bloc2apres.jpeg` (**1024×765**) | bloc 2 terminé, soleil couchant | `charleroi-rangee-2/apres.jpg` |
| `…/VuDes2ChantiersTerminé.jpeg` | les deux blocs terminés, **voiture avec plaque lisible** (à masquer) | `charleroi-rangee-2-blocs/apres-vue-ensemble.jpg` |

### Mons : UMons (l'université), 3 bâtiments
**Bâtiment à 4 étages (bâche Wust), vu de la rue** : ordre chronologique que je propose, d'après ce qu'on voit :
1. membrane noire et fenêtres protégées en bleu, panneaux d'isolation empilés : `Avant:apres copie 2/pendant.jpeg` (crépuscule), `pendantaussi.jpeg`, `pendantaussi2.jpeg`, `pendantaussi3.jpeg` (quatre prises de vue d'un même stade, à des heures différentes) ;
2. sous-couche crème posée, fenêtres encore protégées : `pendantaussi4.jpeg` ;
3. finition blanche terminée, une seule tour d'échafaudage restante : `Avant:apres copie 2/apres.jpeg` (1600×1200).

→ `mons-immeuble-angle/etape-1-membrane-1…4.jpg`, `etape-2-sous-couche.jpg`, `etape-3-termine.jpg`.

**Cour intérieure (en U)** :
1. `Avant:apres/pendantaussi.jpeg` : membrane noire des deux ailes, camionnette, bâche Wust → `mons-cour/etape-1-membrane.jpg`
2. `Avant:apres/pendant.jpeg` : panneaux blancs et encadrements noirs posés, parking vide → `mons-cour/etape-2-isolation.jpg`
3. `Avant:apres/WhatsApp Image … (8).jpeg` : aile de gauche terminée en blanc, camionnettes → `mons-cour/etape-3-aile-terminee.jpg`

**Longue façade (côté gauche, panneau UMons)** : `Avant:apres copie/avant.jpeg` (échafaudage, façade en cours) → `mons-longue-facade/pendant.jpg` ; `…/apres.jpeg` (terminée, ciel bleu) → `mons-longue-facade/apres.jpg`.

> L'ordre des étapes est **déduit des images**. `CLAUDE.md` demande de le faire confirmer par Elisei/Simi (ordre exact, mots, étapes manquantes comme préparation du support ou profilés) : à noter dans `docs/suivi-client.md`, ne pas affirmer de détails techniques (matériaux, épaisseurs…).

### Halle : maison en briques claires
`Halle Maison/Avant:Apres/pendant.jpeg` (1600×1200, pignon sous échafaudage, lumière dorée) → `halle-maison/pendant-pignon.jpg` ; `…/apres.jpeg` (1200×1600, pignon terminé, terre au premier plan) → `halle-maison/apres-pignon.jpg` ; `rendufinal.jpeg` (entrée, portrait), `rendufinal2.jpeg` (angle fenêtre noire), `rendufinal3.jpeg` (baie vitrée, **reflet d'une personne dans la vitre** : à masquer) → `halle-maison/final-entree.jpg`, `final-angle.jpg`, `final-baie-vitree.jpg`.

### Evere
`Evere/Que 1 image.jpeg` (4032×3024) : immeuble d'appartements de nuit → `evere-immeuble/nuit.jpg`. Une seule photo, pas d'avant/après.

### Structure cible
```
src/assets/photos/
  accueil/hero-namur.jpg
  <commune>-<chantier>/<etape>-<detail>.jpg     (noms en minuscules, sans accents, tirets)
```
Pour chaque photo importée : **masquer par un aplat** visages, plaques d'immatriculation, numéros de maison, coordonnées, panneaux de chantier avec adresse (**les noms et bannières de sociétés restent visibles**) puis vérifier à l'œil ; recadrer si besoin ; export WebP/JPEG sans métadonnées avec `sharp`. Jamais dans `public/`. Seule la commune est affichée (pour Mons : « Mons, Université de Mons (UMons) », **jamais l'adresse**).

### À supprimer (« tout ce qu'on a utilisé jusqu'ici »)
`src/assets/photos/*.jpg` (45), `src/assets/photos/paires/` (16), `src/assets/accueil.jpg`, et le code/les textes FR+NL qui ne servent plus (`galerie.photos`, anciennes paires dans `chantiers.ts` et `fr.ts`/`nl.ts`, etc. : **aucun code mort**). Les originaux restent dans `~/Desktop/Photos-ElyFacade`. Les anciens dossiers `~/Desktop/Charleroi|Mons|Namur|Halle|Evere` (contiennent la position GPS) ne sont pas dans le projet : ne les supprimer qu'à la demande de Claudiu.

---

## 3. Ce que Claudiu veut pour l'accueil (ses mots)

- **Photo de Namur en tout grand**, l'en-tête **à l'intérieur de la photo**, « ultra beau, ultra moderne », « une très très belle page d'accueil ».
- **Ensuite tous les avant/après, un peu en bas.**
- **Puis une partie « avancement et étapes d'une façade » avec le chantier de Mons** (« parle d'elles avec de bonnes images »).
- **Utiliser toutes les photos** de façon idéale : avant/après, étapes, galerie/réalisations par chantier.
- Références validées : https://construction-visuvate.framer.website/ (Ironwood, **la** référence : en-tête transparent intégré à une photo riche, pastille d'accroche, gros titre en capitales sur 3 lignes, un bouton), et les modèles Framer `bldr`, `lintel`, `roofera`, `constructal`, `constructiv`, `hearthstone-template`, https://scandiwest.framer.website/ (ouvrir avec le navigateur intégré, décrire ce qui les rend « waw »).
- Il aime : moderne, doux, clair, arrondi, rouge en petites touches. Il refuse : noir lourd, angles droits, beige, couleurs trop fortes, dessins d'immeubles, effets au défilement dans le haut de page (« rien au scroll »), plusieurs variantes au hasard.
- **Proposer un seul design très soigné**, le montrer en capture (ordinateur + téléphone), demander son avis, itérer. Réponses courtes, sans jargon.

### Pistes pour le « waw » (à évaluer, pas à imposer)
- En-tête **transparent avec logo et liens blancs** sur la photo, qui devient blanc flouté seulement après défilement. Vérifier qu'il existe un logo blanc (`design/logo/`, version fond sombre).
- Cadrage de la photo de Namur choisi à la main pour ordinateur **et** pour téléphone (photo large : sur mobile, soit un recadrage vertical dédié exporté depuis l'original, soit un bloc photo arrondi) ; le toit ne doit pas toucher le bord ; le texte va sur une zone calme (à gauche, sur les arbres/le ciel), pas sur les fenêtres.
- Typographie forte (capitales, tracking serré), pastille d'accroche, un bouton principal rouge, le téléphone en secondaire ; apparition douce du texte au chargement seulement.
- Section avant/après : grands curseurs par chantier, légendes avec la commune.
- Section « étapes » avec **la chronologie de Mons** (membrane → sous-couche → finition ; cour : membrane → isolation → aile terminée) en vraies photos, sans texte technique inventé.

---

## 4. Décisions prises par Claudiu (15 octobre 2026, ne plus les redemander)

1. **Immeuble à balcons** : c'est aussi Namur mais **un autre chantier** ; le lieu exact n'a pas d'importance, on affiche seulement la commune. À ranger comme un chantier à part (`namur-immeuble-balcons`) ; libre au développeur de choisir comment le présenter sur le site (deux chantiers distincts à Namur).
2. **Charleroi** : la qualité des « après » (1024 px) est la seule disponible : s'en contenter (les afficher en taille raisonnable, pas en plein écran).
3. **Noms de sociétés visibles (Wust, De Graeve, Travhydro, MAES, ACT) : NE PAS masquer** (« ce n'est pas important »). Continuer à masquer visages, plaques d'immatriculation, numéros de maison, coordonnées, panneaux de chantier avec adresse.
4. **UMons** : **citer l'université** comme référence (« Université de Mons (UMons) », chantier prestigieux). Montrer les panneaux UMons tels quels. Rester factuel : « façades de bâtiments de l'Université de Mons », sans inventer de détails (surface, durée, client, rôle exact des gérants). À noter dans `docs/suivi-client.md` : faire confirmer par Elisei qu'il peut citer l'UMons publiquement.
5. **Halle** : `pendant` et `apres` sont bien le même pignon : en faire une paire avant/après (curseur).
6. **Personnes** : retirer (recadrage ou aplat sur les visages) la photo de face de Namur.
7. **Photo retouchée du haut de page** (ciel, objets retirés) : acceptée par Elisei et Simi.
8. **Vidéos** : jamais affichées.
9. **Ordre des étapes de Mons** : Claudiu demande de se renseigner. Ordre standard d'une façade isolée par l'extérieur sous enduit, d'après des sources de la profession (OPPBTP/FFB, IZI by EDF, fiches métier, sources françaises ; la pratique belge est la même dans ses grandes lignes, **à faire confirmer par Elisei**) :
   1. préparation du support et échafaudage (protections des ouvertures) ;
   2. pose des panneaux isolants (collés et/ou chevillés) ;
   3. sous-enduit armé : treillis de fibre de verre marouflé dans le sous-enduit (le treillis n'est pas une étape séparée) + renforts aux fenêtres et en haut de façade ;
   4. séchage, puis enduit de finition (aspect et teinte au choix) ;
   5. retrait de l'échafaudage, façade terminée.
   Correspondance avec les photos de Mons : membrane/panneaux sombres et fenêtres protégées → étape 2 ; couche crème → étape 3 ; façade blanche → étape 4-5. **Ne pas affirmer** de matériaux ou techniques précis (la couche noire n'est pas identifiée : membrane ou isolant, ne pas la nommer) ; légendes factuelles : « Échafaudage et protections », « Pose de l'isolation » (seulement si l'image le montre sans doute), « Sous-couche », « Finition », « Façade terminée ».

## 5. Règles non négociables (rappel, voir `CLAUDE.md`)

- Ne jamais inventer d'information sur l'entreprise. Société récente (fin 2025) : jamais « depuis… ». « 6 ans de métier pour notre gérant », « 50+ chantiers réalisés par nos gérants », « garantie de 10 ans minimum », « équipe de 8 personnes, des indépendants » (jamais « salariés »). Pas de « un seul interlocuteur ».
- Métiers = uniquement la façade (crépi/enduit, peinture, nettoyage, rejointoiement, réparation de briques).
- Tout texte visible en FR **et** NL. Nom « Ely Facade » (sans cédille). Site 100 % statique, pas de cookies de suivi, polices hébergées.
- Photos : jamais d'adresse client (seule la commune), `src/assets/` + `astro:assets`, sans métadonnées. Pas d'image IA présentée comme chantier. Pas de vidéo, avis, prix, assurance, réseaux sociaux.
- Accessibilité (contraste AA, focus, `prefers-reduced-motion`, contenu utilisable sans JS, zones tactiles ≥ 44 px), mobile d'abord, **test Android (Chrome) et iPhone (Safari/WebKit)**.
- Fin de chaque changement : `npm run build` sans erreur, puis **commit, jamais de push**, aucune mention de Claude ni ligne Co-Authored-By. Git de GitHub Desktop : `GIT_EXEC_PATH="/Applications/GitHub Desktop.app/Contents/Resources/app/git/libexec/git-core" "/Applications/GitHub Desktop.app/Contents/Resources/app/git/bin/git" …`

## 6. Après l'accueil (ordre)

5 pages métier (`/services/<slug>/`, `/nl/diensten/<slug>/`, JSON-LD `Service` + fil d'Ariane, boutons devis qui pré-cochent le métier) → Réalisations (une page par chantier avec ses photos) → À propos → mentions légales (« ELY FAÇADE BV », n° 1030.283.223, hébergeur Netlify) → vie privée → 404 → vérifications finales → README à mettre à jour avant la livraison.

## 7. Côté Claudiu (hors code)

Netlify (relier GitHub, retirer le badge, adresse des devis), acheter elyfacade.be et .com **avant d'imprimer** t-shirts et cartes, email pro, fiche Google Business (Halle), Search Console, photos « avant » du même endroit par Simi, validation des textes et couleurs par Elisei et Simi.
