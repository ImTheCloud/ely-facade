# Reprise du projet Ely Facade (15 octobre 2026)

Document unique pour démarrer une nouvelle conversation. Il remplace l'ancien prompt de reprise. Lire aussi `CLAUDE.md` (règles non négociables), `docs/brief.md`, `docs/suivi-client.md`.

> **Prompt à coller en premier message (mode autonome) :**
> « Lis `docs/reprise.md` en entier, puis `CLAUDE.md`, `docs/brief.md` et `docs/references/README.md`. Toutes les décisions sont prises (section 4) : ne me les redemande pas. Exécute tout le plan de la section 8, de bout en bout, sans t'arrêter pour demander mon avis, en suivant le protocole d'autonomie et les critères de qualité du document. Tu ne m'interromps que si un choix est impossible à trancher avec le document. Commit après chaque étape (jamais de push). À la fin, donne-moi un rapport court avec captures. »

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

> L'ordre des étapes est **confirmé par Elisei** (voir section 4, point 9). Ne pas affirmer de détails techniques (matériaux, épaisseurs…) au-delà de ce qu'on voit.

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
- Capture de référence : `docs/references/ironwood-hero-choisi-par-claudiu.webp`. Références validées : https://construction-visuvate.framer.website/ (Ironwood, **la** référence : en-tête transparent intégré à une photo riche, pastille d'accroche, gros titre en capitales sur 3 lignes, un bouton), et les modèles Framer `bldr`, `lintel`, `roofera`, `constructal`, `constructiv`, `hearthstone-template`, https://scandiwest.framer.website/ (ouvrir avec le navigateur intégré, décrire ce qui les rend « waw »).
- Il aime : moderne, doux, clair, arrondi, rouge en petites touches. Il refuse : noir lourd, angles droits, beige, couleurs trop fortes, dessins d'immeubles, effets au défilement dans le haut de page (« rien au scroll »), plusieurs variantes au hasard.
- **Proposer un seul design très soigné**, le montrer en capture (ordinateur + téléphone), demander son avis, itérer. Réponses courtes, sans jargon.

### Pistes pour le « waw » (à évaluer, pas à imposer)
- En-tête **transparent avec logo et liens blancs** sur la photo, qui devient blanc flouté seulement après défilement. Vérifier qu'il existe un logo blanc (`design/logo/`, version fond sombre).
- Cadrage de la photo de Namur choisi à la main pour ordinateur **et** pour téléphone (photo large : sur mobile, soit un recadrage vertical dédié exporté depuis l'original, soit un bloc photo arrondi) ; le toit ne doit pas toucher le bord ; le texte va sur une zone calme (à gauche, sur les arbres/le ciel), pas sur les fenêtres.
- Typographie forte (capitales, tracking serré), pastille d'accroche, un bouton principal rouge, le téléphone en secondaire ; apparition douce du texte au chargement seulement.
- Section avant/après : grands curseurs par chantier, légendes avec la commune.
- **Phrases d'émotion animées au défilement** entre les sections (décision 20) : c'est ce qui donne le rythme et le « waw » du reste de la page.
- Section « étapes » avec **la chronologie de Mons** (membrane → sous-couche → finition ; cour : membrane → isolation → aile terminée) en vraies photos, sans texte technique inventé.

---

## 4. Décisions prises par Claudiu (15 octobre 2026, ne plus les redemander)

1. **Immeuble à balcons** : c'est aussi Namur mais **un autre chantier** ; le lieu exact n'a pas d'importance, on affiche seulement la commune. À ranger comme un chantier à part (`namur-immeuble-balcons`) ; libre au développeur de choisir comment le présenter sur le site (deux chantiers distincts à Namur).
2. **Charleroi** : la qualité des « après » (1024 px) est la seule disponible : s'en contenter (les afficher en taille raisonnable, pas en plein écran).
3. **Noms de sociétés visibles (Wust, De Graeve, Travhydro, MAES, ACT) : NE PAS masquer** (« ce n'est pas important »). Continuer à masquer visages, plaques d'immatriculation, numéros de maison, coordonnées, panneaux de chantier avec adresse.
4. **UMons** : **citer l'université** comme référence (« Université de Mons (UMons) », chantier prestigieux). Montrer les panneaux UMons tels quels. Rester factuel : « façades de bâtiments de l'Université de Mons », sans inventer de détails (surface, durée, client, rôle exact des gérants). **Confirmé par Elisei** : l'UMons peut être cité publiquement.
5. **Halle** : `pendant` et `apres` sont bien le même pignon : en faire une paire avant/après (curseur).
6. **Personnes** : retirer (recadrage ou aplat sur les visages) la photo de face de Namur.
7. **Photo retouchée du haut de page** (ciel, objets retirés) : acceptée par Elisei et Simi.
8. **Vidéos** : jamais affichées.
9. **Ordre des étapes de Mons** : Claudiu demande de se renseigner. Ordre standard d'une façade isolée par l'extérieur sous enduit, d'après des sources de la profession (OPPBTP/FFB, IZI by EDF, fiches métier, sources françaises ; la pratique belge est la même dans ses grandes lignes, **ordre confirmé par Elisei le 15 octobre**) :
   1. préparation du support et échafaudage (protections des ouvertures) ;
   2. pose des panneaux isolants (collés et/ou chevillés) ;
   3. sous-enduit armé : treillis de fibre de verre marouflé dans le sous-enduit (le treillis n'est pas une étape séparée) + renforts aux fenêtres et en haut de façade ;
   4. séchage, puis enduit de finition (aspect et teinte au choix) ;
   5. retrait de l'échafaudage, façade terminée.
   Correspondance avec les photos de Mons : membrane/panneaux sombres et fenêtres protégées → étape 2 ; couche crème → étape 3 ; façade blanche → étape 4-5. **Ne pas affirmer** de matériaux ou techniques précis (la couche noire n'est pas identifiée : membrane ou isolant, ne pas la nommer) ; légendes factuelles : « Échafaudage et protections », « Pose de l'isolation » (seulement si l'image le montre sans doute), « Sous-couche », « Finition », « Façade terminée ».

10. **Ambiance en 5 mots** : **premium, confiance, moderne, lumineux, solide** (beaucoup d'espace, photo très soignée, peu d'éléments).
11. **Titre du haut de page : « VOTRE FAÇADE MÉRITE DE BRILLER. »** (NL : « UW GEVEL VERDIENT TE STRALEN. », l'IA corrige si le néerlandais ne sonne pas naturel). Choisi par Claudiu. Autour :
    - Pastille : « Rénovation de façades · Toute la Belgique » (« Gevelrenovatie · Heel België »)
    - Texte (faits confirmés seulement) : « Crépi, peinture, nettoyage, rejointoiement, réparation de briques : de la petite maison à l'immeuble. Visite gratuite, garantie de 10 ans minimum. » (NL équivalent)
    - **Bouton principal** : « Demander ma visite gratuite » (« Plan mijn gratis plaatsbezoek »), lien vers `#devis` ; secondaire : le téléphone `0492 43 96 17`.
    - Sous le bouton, une ligne de 3 mini-preuves : « Visite sur place gratuite · Garantie 10 ans minimum · Partout en Belgique ».
    - Jamais de chiffre ou de promesse non confirmé (pas de « délai », « meilleur prix », « satisfaction garantie »).
12. **Mise en page du haut de page** : texte **en bas à gauche** sur la zone calme de la photo (arbres, pelouse), la façade reste visible à droite, comme Ironwood. Le texte ne doit jamais tomber sur les fenêtres du bâtiment.
13. **Périmètre autonome** : accueil complet, puis **toutes les autres pages** (5 pages métier, Réalisations, À propos, mentions légales, vie privée, 404, SEO, README). L'IA va jusqu'au bout seule.
14. **Police** : l'IA est autorisée à ajouter **une police d'affichage** (Fontsource, hébergée) pour les gros titres, en gardant DM Sans pour le texte, si cela améliore le rendu premium.

15. **Ordre des avant/après** : le premier curseur de la section est **UMons, la cour intérieure** (dossier `UMons Université/Avant:apres`, le 1er dossier : avant = membrane noire, après = `WhatsApp Image … (8).jpeg`, aile de gauche terminée) : Claudiu trouve cette photo « après » très belle. Les autres suivent (UMons longue façade, UMons immeuble d'angle, Namur ×2, Halle, Charleroi). Si, en voyant les images, l'IA juge que Claudiu parlait plutôt du bâtiment à 4 étages (`Avant:apres copie 2/apres.jpeg`), elle le note dans `docs/avancement.md` et met les deux en tête.

16. **Section « étapes » = le dossier `UMons Université/Avant:apres copie 2`** (immeuble à 4 étages, bâche Wust, 6 photos) : Claudiu l'aime beaucoup pour ses nombreuses étapes. C'est **la colonne vertébrale de la section** : utiliser les 6 photos (4 de la membrane noire à des moments différents, la sous-couche crème, la finition blanche), dans l'ordre confirmé, avec légendes factuelles. La cour intérieure (3 étapes) sert de complément ; Namur et Halle peuvent illustrer l'étape finale.

17. **Police** : plus grosse, plus moderne et plus caractère pour les titres de ce genre de site : **Bricolage Grotesque** (variable, `@fontsource-variable/bricolage-grotesque`, hébergée) en graisse 700-800, capitales, interlettrage serré (≈ -0.03 em), très grands corps (`clamp(44px, 7.2vw, 112px)`), pour tous les titres du site ; **DM Sans** reste pour le texte courant. Si le rendu n'est pas convaincant en capture, tester `Sora` ou `Manrope`, garder la meilleure, la noter. Pas de Google Fonts.
18. **Couleurs du haut de page : cohérentes avec le site ET avec la photo** (pas de jaune/orange comme Ironwood, qui est dû à sa photo chaude). Palette : blanc, ardoise `#1f2429`, rouge `#c8202b` en touches seulement (point de la pastille, bouton principal). Voile sur la photo = **ardoise-bleutée** (ex. `rgba(15, 24, 36, …)`) en dégradé léger à gauche et en bas, jamais un noir neutre lourd. Échantillonner les couleurs de la photo (`sharp`) pour accorder le voile et les accents ; contraste AA obligatoire.
19. **Référence de composition** : capture `docs/references/ironwood-hero-choisi-par-claudiu.webp` (celle que Claudiu a envoyée). À reproduire dans l'esprit : en-tête transparent (logo à gauche, liens au centre en blanc discret, bouton clair à droite), pastille d'accroche, titre très gros en capitales sur 3 lignes, 3 lignes de texte, **un** bouton avec petite flèche carrée, photo qui remplit tout l'écran, texte à gauche sur la zone calme. Reproduire la **qualité de finition**, pas les couleurs ni les textes.

20. **Phrases d'émotion au défilement (le « waw » du reste de la page d'accueil).** Claudiu veut, **sous** le haut de page (qui reste fixe, « rien au scroll » ne concerne que lui), des **phrases fortes qui jouent sur l'émotion quand on défile**, avec de belles animations. Ce sont de grandes sections-citations (très grand titre Bricolage Grotesque, beaucoup d'espace, parfois sur fond de photo plein cadre), placées entre les sections de contenu :
    | Après la section… | Phrase (FR) | NL (à faire relire) |
    |---|---|---|
    | Haut de page | **Une façade refaite pour durer.** + « Garantie de 10 ans minimum » | **Een gevel die blijft.** |
    | Bande de chiffres / avant-avant-après | **La première chose qu'on voit de chez vous.** | **Het eerste wat men van uw huis ziet.** |
    | Avant/après | **Chaque façade a sa seconde jeunesse.** | **Elke gevel krijgt een tweede jeugd.** |
    | Étapes | **De l'échafaudage à la façade terminée.** | **Van steiger tot afgewerkte gevel.** |
    | UMons | **Une maison ou une université : la même exigence.** | **Een huis of een universiteit: dezelfde zorg.** |
    | Galerie | **Ce que vous voyez, ce sont nos chantiers.** | **Wat u ziet, zijn onze werven.** |
    | Équipe | **Deux frères, une équipe.** | **Twee broers, één team.** |
    | Appel final | **Votre façade mérite de briller. Parlons-en.** | **Uw gevel verdient te stralen. Laten we praten.** |
    L'IA peut ajuster, remplacer ou en ajouter 2 ou 3 du même style (courtes, émotionnelles, **uniquement vraies et vérifiables**, jamais de chiffre inventé) ; elle les écrit en FR **et** NL dans `fr.ts`/`nl.ts`.
    **Animations (soignées, sobres, premium)** : apparition ligne par ligne (masque qui glisse vers le haut) ou mot par mot qui s'éclaircit progressivement avec le défilement ; léger parallaxe sur les fonds photo ; un soulignement ou un mot en rouge qui se trace ; compteurs doux. Uniquement `transform` et `opacity` (60 images/s, rien qui bloque le défilement), via `IntersectionObserver` ou CSS scroll-driven animations avec repli ; Lenis déjà présent (`src/scripts/site.ts`). **Tout se coupe avec `prefers-reduced-motion`, le texte est lisible sans JavaScript, les curseurs avant/après ne bloquent jamais le défilement.** Pas de mouvement dans le haut de page.

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

---

## 8. Plan d'exécution autonome (de bout en bout)

### Protocole d'autonomie
- **Ne pas s'arrêter pour demander** « c'est bon ? ». Les décisions sont dans la section 4 ; en cas de doute, choisir l'option la plus conforme à `CLAUDE.md` et à l'ambiance premium, la noter dans `docs/avancement.md`, continuer.
- **Seules raisons de s'arrêter** : une information sur l'entreprise manque et ne peut pas être omise (la noter dans `docs/suivi-client.md` et omettre l'élément), ou un outil/droit manque.
- **Commit après chaque étape** (`npm run build` sans erreur d'abord), jamais de push, sans mention de Claude.
- Tenir `docs/avancement.md` à jour (ce qui est fait, ce qui reste, décisions prises seul).
- Utiliser le navigateur intégré pour **voir** le résultat à chaque étape : `npm run preview` puis captures à 1440 px, 768 px et 375 px (mobile émulé : taille d'écran 375 × 812) ; vérifier aussi WebKit (iPhone) si possible avec le Playwright de `/Users/claudiupopadiuc/Documents/GitHub/bs-renove/node_modules/playwright`.
- Pour le haut de page : **boucle d'auto-critique d'au moins 3 tours** : capture → comparer aux captures de références (`docs/references/`) → lister honnêtement les défauts → corriger → recommencer. Ne passer à la suite que si le haut de page est au niveau des références.

### Critères de qualité du haut de page (checklist, tous à cocher)
- [ ] La photo de Namur remplit **tout** l'écran (100 svh), nette, bien cadrée, le toit **respire** (jamais collé ou coupé par l'en-tête). Cadrage ordinateur et cadrage téléphone choisis séparément (export vertical depuis l'original si besoin).
- [ ] L'en-tête est **dans la photo** : transparent, logo et liens blancs (logo blanc : voir `design/logo/`), bouton Devis lisible ; il devient blanc flouté seulement après défilement ; menu mobile soigné.
- [ ] Titre (décision 11) en Bricolage Grotesque (décision 17), capitales, très gros, tracking serré, 3 lignes maximum, **en bas à gauche, sur la zone calme** ; une pastille d'accroche discrète ; **un** bouton principal « Demander ma visite gratuite » et le téléphone en secondaire ; les 3 mini-preuves sous le bouton.
- [ ] Couleurs du haut de page accordées à la photo et à la palette du site (décision 18).
- [ ] Contraste AA du texte sur la photo (voile léger et progressif, pas un gros bloc sombre).
- [ ] Aucune animation au défilement dans le haut de page (apparition douce du texte au chargement seulement, coupée avec `prefers-reduced-motion`).
- [ ] Rendu **premium** à 375 px : rien d'écrasé, texte lisible, zones tactiles ≥ 44 px, dock Appeler / WhatsApp / Devis en bas.
- [ ] Marges et alignements sur la grille du site, aucune coupure de mot disgracieuse, titres FR **et** NL tiennent.

### Étapes
1. **Photos** : suivre la section 2. Renommer et ranger ; importer dans `src/assets/photos/<commune>-<chantier>/` avec masquage (visages, plaques, numéros, panneaux avec adresse ; les noms de sociétés restent visibles), recadrages, sans métadonnées (`sharp`) ; vérifier chaque image à l'œil ; export haute qualité pour le haut de page.
2. **Nettoyage** : supprimer les anciennes photos du projet et tout le code/texte FR+NL devenus inutiles (aucun code mort).
3. **Références** : ouvrir les liens de `docs/references/README.md`, enregistrer les captures, remplir le tableau.
4. **En-tête et haut de page** : refaire `Entete.astro` + `Hero.astro` selon la checklist (boucle d'auto-critique).
5. **Reste de l'accueil**, dans cet ordre : bande de chiffres sobre (« 6 ans de métier pour notre gérant », « 50+ chantiers réalisés par nos gérants », « 10 ans de garantie minimum », « 8 personnes dans l'équipe ») → **phrases d'émotion animées (décision 20) entre les sections** → **avant/après** (**UMons cour intérieure en premier**, puis les autres ; grands curseurs, un par chantier avec la commune, y compris Halle, les deux chantiers de Namur, Mons, Charleroi) → **« Les étapes d'une façade »** avec la chronologie de Mons/UMons en vraies photos (ordre confirmé, légendes factuelles) → **chantier prestigieux : Université de Mons (UMons)** mis en valeur → réalisations par commune (galerie) → métiers → équipe → méthode → FAQ → appel. **Utiliser toutes les photos** quelque part.
6. **Pages métier** (5), **Réalisations** (une page ou section par chantier), **À propos**, **mentions légales** (« ELY FAÇADE BV », n° 1030.283.223, hébergeur Netlify), **vie privée**, **404**, en FR et NL, avec le même niveau de soin que l'accueil.
7. **SEO** : titre et description par page, JSON-LD `GeneralContractor`, `Service` et fil d'Ariane, sitemap hreflang.
8. **Vérifications finales** : contrastes AA, clavier, `prefers-reduced-motion`, sans JavaScript, poids des images, Android et iPhone, `npm run build`.
9. **README** : présenter le site (ce qu'il offre, captures, design, crédits), jamais le développement. Rappeler à Claudiu de le relire.
10. **Rapport final court** : ce qui est fait, captures (ordinateur + téléphone) du haut de page et de l'accueil, ce qui reste côté Claudiu (section 7).
