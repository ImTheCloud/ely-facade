# Prompt : vérification finale du site (état du 16 octobre 2026)

Copier-coller tout ce qui suit dans une nouvelle session Claude Code ouverte dans le dossier du projet.

---

Tu reprends le site vitrine **Ely Facade** (rénovation de façades, Belgique, FR + NL) dans `/Users/claudiupopadiuc/Documents/GitHub/ely-facade`. Je suis Claudiu : je m'occupe de tout l'informatique pour les deux gérants (Elisei et Simi Ungureanu). Réponds-moi en français, court, direct, sans jargon.

**Le site est terminé et validé par moi.** Je ne veux pas de refonte. Je veux une **dernière vérification** : la liste de ce qui reste à corriger ou à faire avant la mise en ligne, classée par importance.

## Lis d'abord
1. `CLAUDE.md` : les règles non négociables (rien d'inventé sur l'entreprise, jamais « depuis », pas de « salariés », garantie « 10 ans minimum » seulement, pas de prix/assurance/avis, photos sans adresse client ni métadonnées, tout en FR **et** NL, site statique, aucun code mort, nom écrit « Ely Facade »).
2. `docs/avancement.md` (en tête : la branche `ameliorations-accueil` et tout ce qui a changé).
3. `docs/suivi-client.md` (ce qui reste à confirmer par Elisei : notamment les services **traitement hydrofuge** et **plaquettes de parement**, la photo du haut de page à Namur).

## État
- Tout le travail récent est sur la branche **`ameliorations-accueil`** (partie de `main`, jamais poussée : je pousse et je fusionne moi-même).
- Accueil, dans l'ordre : haut de page → Elisei et Simi (« ELY FACADE ») → méthode en 4 étapes → chiffres → avant/après → phrase → carte et chantiers → étapes UMons → métiers (10) → FAQ → devis.
- Formulaire de devis en 3 étapes (Netlify Forms), simulateur de surface dans l'étape 2. Déploiements Netlify en pause (`ignore = "exit 0"` dans `netlify.toml` : ne jamais retirer).

## Ce que je veux (lecture et vérification d'abord, corrections seulement si je dis oui)
1. **Contrôle des règles** sur toutes les pages FR et NL : aucune info inventée, aucun « depuis », « salariés », prix, assurance, avis, « à confirmer » visible ; nom « Ely Facade » partout (« ELY FAÇADE BV » seulement dans les mentions légales) ; aucune adresse de client sur les photos.
2. **Technique** : `npm run build` sans erreur ni avertissement ; code mort (textes FR/NL, composants, images, styles inutilisés) ; FR et NL de même structure ; liens cassés ; titres et descriptions de chaque page ; données structurées et sitemap (10 services, chantiers).
3. **Téléphone et ordinateur** (320, 390, 1280, 1440 px, FR et NL) : rien qui déborde, rien de coupé, pas de mot seul en fin de ligne gênant, chaque section lisible sans trop de vide ; accessibilité de base (contrastes, clavier, textes alternatifs) ; « moins d'animations » respecté.
4. **Performance** : poids des pages et des images, ce qui ralentit au défilement.
5. **Avant la mise en ligne** : la liste de ce qu'il me reste à faire hors code (domaine `elyfacade.be` + `.com`, email pro, adresse qui reçoit les devis dans Netlify → Forms, test d'envoi réel, Google Business, Search Console, README à relire, fusion dans `main`).

## Façon de travailler
- Rends-moi d'abord **un rapport court** : ce qui est cassé, ce qui est risqué, ce qui est un détail. Pour chaque point : où, pourquoi, et la correction proposée. Ne corrige rien sans mon accord, sauf les fautes évidentes (faute de frappe, lien cassé), que tu listes.
- Ne teste pas trop longtemps : je teste moi-même ensuite.
- **Git** : uniquement `/Applications/GitHub Desktop.app/Contents/Resources/app/git/bin/git`, avec `GIT_EXEC_PATH="/Applications/GitHub Desktop.app/Contents/Resources/app/git/libexec/git-core"` devant. Nouvelle branche partie de `ameliorations-accueil` (ou de `main` si je l'ai fusionnée) pour les corrections. Commit en français, **sans** ligne Co-Authored-By ni mention de Claude. **Ne pousse jamais.**
- N'invente rien sur l'entreprise : si une info manque, note-la dans `docs/suivi-client.md`.
