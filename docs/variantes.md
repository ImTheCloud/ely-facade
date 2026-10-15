# Haut de page : 3 variantes à comparer

Les trois variantes partagent la même photo (immeuble de Namur, ciel prolongé au-dessus du toit), le même en-tête posé dans la photo (logo et liens blancs, bouton clair, blanc flouté dès qu'on défile) et les mêmes textes (décision 11). Elles diffèrent par la mise en page et le mouvement.

## Comment les voir

- **Sur l'accueil** (`/`) : la variante **C**, celle que je juge la meilleure.
- **Pages de comparaison** : `/variantes/a/`, `/variantes/b/`, `/variantes/c/` (petit sélecteur A · B · C en haut de l'écran).
- **Raccourci** : `/?hero=a`, `/?hero=b`, `/?hero=c` mènent à ces pages.
- En local : `npm run build && npm run preview`, puis http://localhost:4321/variantes/a/ etc.

Les pages de comparaison sont hors Google (`noindex`) et hors sitemap.

## A · « Mise au point » (la plus fidèle à Ironwood)

- Texte **empilé à gauche** : pastille, titre sur 3 lignes, texte, bouton, téléphone, preuves.
- Entrée : la photo arrive floue et légèrement zoomée, puis se pose et devient nette (1,5 s) ; le titre se révèle ligne par ligne.
- Limite : sur ordinateur, le titre passe devant les fenêtres de l'aile gauche (adoucies par le voile). C'est la composition d'Ironwood, mais elle ne respecte pas parfaitement la décision 12.

## B · « Film d'ouverture »

- Même mise en page que A.
- Entrée : un court film (4,5 s) enchaîne deux façades terminées par l'équipe, **Université de Mons** (cour intérieure) puis **Namur, immeuble à balcons**, en fondu et zoom lent, puis s'arrête sur la photo de Namur. Une petite légende indique la commune de chaque plan.
- Le film ne démarre que si ses images sont prêtes (sinon la photo de Namur s'affiche directement) ; le titre et le bouton sont lisibles dès le début.

## C · « La façade qui brille » (sur l'accueil)

- **Titre en bas à gauche, sur la route et la pelouse** : il ne tombe pas sur les fenêtres (décision 12). Les détails (texte, bouton, téléphone, preuves) sont dans un **panneau de verre** à droite, lisible partout (contraste AA même devant la façade blanche).
- Entrée : un **reflet de lumière** passe une fois sur les surfaces blanches de la façade (et seulement sur elles), puis sur le mot « briller » ; enfin **la brique rouge du logo** vient se poser comme point final du titre.
- Pourquoi je la préfère : elle tient la promesse du titre (la façade brille vraiment), elle signe la marque (la brique rouge) et c'est la seule qui ne met jamais le titre sur les fenêtres.

## Communs aux trois

- Bouton « Demander ma visite gratuite » (mène au formulaire de devis en bas de l'accueil) et téléphone disponibles tout de suite.
- Téléphone : cadrage vertical dédié (aile gauche et toit en haut, route et pelouse en bas, sous le texte).
- Tout se coupe avec « réduire les animations » ; sans JavaScript, la photo et le texte s'affichent normalement.

## Après le choix de Claudiu (à faire)

Garder la variante choisie et supprimer le reste (aucun code mort) :
1. Dans `src/components/accueil/Hero.astro`, retirer les blocs et styles des deux autres variantes (`hero--a`, `hero--b`, `hero--c`), le script `src/scripts/hero.ts` si B n'est pas gardée, les masques `hero-namur*-masque.png` (et l'option `masqueFacade` du script d'import) si C n'est pas gardée.
2. Supprimer `src/pages/variantes/`, `src/data/hero.ts`, le sélecteur et le petit script `?hero=` de `PageAccueil.astro`, le filtre `/variantes/` dans `astro.config.mjs`, les textes `hero.film` (FR et NL) si B n'est pas gardée, et ce fichier.
