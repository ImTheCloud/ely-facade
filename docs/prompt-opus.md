# Prompt à donner à Opus (état du 16 octobre 2026)

Copier-coller tout ce qui suit dans une nouvelle session Claude Code ouverte dans le dossier du projet.

---

Tu reprends le site vitrine **Ely Facade** (rénovation de façades, Belgique, FR + NL) dans `/Users/claudiupopadiuc/Documents/GitHub/ely-facade`. Je suis Claudiu : je fais tout l'informatique pour les deux gérants (Elisei et Simi Ungureanu). Réponds-moi en français, court, direct, sans jargon.

## Lis d'abord (dans cet ordre)
1. `CLAUDE.md` : les règles non négociables (rien d'inventé sur l'entreprise, société récente donc jamais « depuis », pas de « salariés », garantie « 10 ans minimum » seulement, pas de prix/assurance/avis, photos sans adresse client et sans métadonnées dans `src/assets/`, tout texte en FR **et** NL, site 100 % statique, aucun code mort).
2. `docs/avancement.md` (en tête : l'état du projet et ce qui a changé sur la branche en cours).
3. `docs/suivi-client.md` (ce qui est confirmé, ce qui est à demander à Elisei, rien n'est affiché tant que ce n'est pas confirmé).

## Où on en est
- Le site complet est sur `main`. Tout le travail récent est dans la branche **`ameliorations-accueil`** (partie de `main`, plusieurs commits, **jamais poussée** : je pousse moi-même). Reste sur cette branche ou crée-en une nouvelle depuis `main` pour chaque nouveau changement ; ne touche jamais `main`.
- Fait sur cette branche : haut de page « Votre façade mérite de briller » (titre grand sur téléphone), grande section Équipe juste sous le haut de page (portraits d'Elisei et Simi, prénom sur la photo, phrases), avant/après en curseur partout (Namur en premier), chiffres (8, dont le nombre de services calculé depuis `src/data/metiers.ts`), carte de Belgique interactive (petite maison pour le bureau, fenêtre avant/après et lien chantier au clic : popup sur ordinateur, feuille du bas sur téléphone), étapes d'une façade en liste continue, 8 services (isolation par l'extérieur, traitement des fissures et échafaudage ajoutés), formulaire de devis compact sur téléphone (boutons collés en bas, tuile « Façade complète, de A à Z », champ « Autre chose »), simulateur de surface, bouton Email partout où il y a WhatsApp, moins d'espaces entre sections, moins de répétitions.
- Dernière demande en cours : sur téléphone, Elisei et Simi côte à côte sur le même écran, visage bien centré (fait, à valider par moi).

## Ce que je veux que tu fasses (dans cet ordre)
1. **Audit sans rien casser** : lance `npm run build`, ouvre le site (le serveur de dev tourne déjà sur http://localhost:4321, sinon `npm run dev`) et fais le tour de l'accueil sur téléphone (390 px, aussi 320 px) et ordinateur (1440 px), en FR puis en NL. Liste-moi ce qui est cassé, lent, moche ou répété (la même info deux fois dans le même écran est interdite ; deux fois à plusieurs écrans d'écart reste acceptable).
2. **Performance, surtout la carte de Belgique** : j'ai remarqué que le site devient plus lent quand on arrive sur la carte (`src/components/CarteBelgique.astro`, `src/scripts/carte.ts`). J'ai déjà retiré le flou de l'ombre, le `clipPath` et l'animation infinie ; mesure avec le CPU ralenti x4 (outils du navigateur), trouve ce qui coûte encore (animations, `backdrop-filter`, `drop-shadow`, popups, curseurs), et allège sans perdre l'effet. Vérifie aussi le poids des images de l'accueil.
3. **Section Équipe** (`src/components/accueil/Equipe.astro`) : je veux qu'elle soit **inventive et très belle**, un cran au-dessus d'un site vitrine classique. Propose 2 ou 3 idées (composition, mouvement doux, typographie, photos) puis réalise la meilleure. Contraintes : Elisei n'est pas seulement « visite et devis », il travaille aussi sur les chantiers ; Simi dirige les chantiers ; chacun a une belle phrase (déjà dans `src/i18n/fr.ts` et `nl.ts`, améliore-les si tu as mieux, sans rien inventer de factuel) ; ne jamais montrer les mains dans les poches de Simi ; sur téléphone les deux frères tiennent sur le même écran, visage centré. La photo d'Elisei n'a que 400 px de large (c'est ce que j'ai) : dis-moi si une photo plus grande changerait le rendu et je la demanderai.
4. **Menu sur téléphone** : sur certaines largeurs, le bouton « Menu » en haut à droite ressemble à être coupé ou peu visible. Je n'ai pas réussi à le reproduire à 320, 360, 393, 430 et 768 px dans mes tests (pas de débordement mesuré). Cherche la cause (largeur du logo, sélecteur FR/NL, barre de défilement, zoom du navigateur), rends le bouton toujours entièrement visible et bien contrasté.
5. **Qualité générale** : cherche le code mort (textes FR/NL ou fichiers devenus inutiles), vérifie que FR et NL ont exactement la même structure (`src/i18n/fr.ts` / `nl.ts`), que `npm run build` passe sans erreur, et que rien ne déborde à 320 px.

## Façon de travailler (obligatoire)
- Une liste de tâches courte, un point d'avancement à la fin de chaque étape.
- Teste toi-même au minimum (téléphone + ordinateur, FR + NL) : je teste ensuite et je te dis ce que je n'aime pas. Ne demande pas de validation pour les détails de style ; demande-moi seulement ce qui change le contenu ou une règle.
- **Git** : uniquement `/Applications/GitHub Desktop.app/Contents/Resources/app/git/bin/git`, avec `GIT_EXEC_PATH="/Applications/GitHub Desktop.app/Contents/Resources/app/git/libexec/git-core"` devant la commande. Commit en français à la fin de chaque changement, **sans** ligne Co-Authored-By et **sans** mention de Claude. **Ne pousse jamais.** Ne retire jamais la ligne `ignore = "exit 0"` de `netlify.toml`.
- N'invente rien sur l'entreprise. Si une info manque, ne l'affiche pas et note-la dans `docs/suivi-client.md`.
- Mets à jour `docs/avancement.md` (en tête) à chaque lot terminé.
