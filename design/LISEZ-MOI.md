# Identité visuelle et supports imprimés

- **Couleurs** : noir `#141414`, rouge `#C8202B`, blanc `#FFFFFF`. Le rouge ne sert qu'en petites touches (la brique du logo, un trait), jamais en grand aplat.
- **Police** : DM Sans, en versions statiques (`polices/`), parce que les imprimeurs refusent les polices variables.
- **Nom** : « Ely Facade » (sans cédille) partout.

## Dossiers

| Dossier | Contenu |
|---|---|
| `logo/` | Sources du logo (SVG) et versions prêtes pour l'imprimeur dans `logo/impression/` : logo horizontal et icône, en couleur, fond sombre, noir et blanc (PDF, SVG, PNG) |
| `carte-visite/` | Carte de visite recto-verso au gabarit Vistaprint (88 × 58 mm avec fonds perdus), PDF vectoriels |
| `t-shirt/` | Devant et dos, blanc et noir, et fiches techniques pour l'imprimeur |
| `depuis-session-cloud/` | Versions plus récentes des t-shirts (dos refait) |
| `pull/` | Pulls à capuche pour la broderie, devant et dos, noir et blanc |
| `qr-code/` | QR code du site (il encode directement `https://elyfacade.be/`) et QR code des avis Google (il ouvre la page « écrire un avis » de la fiche), en SVG, PNG 4000 px et PDF |
| `google/` | Images pour la fiche Google : paires « Pendant les travaux / Après » et photos de façades terminées |

Les photos de t-shirts vierges (`t-shirt/photo/sources/`) sont générées par IA : elles servent seulement aux maquettes, jamais au site.

## Refaire les fichiers

Les scripts sont dans `scripts/` et utilisent Google Chrome sur Mac : `exporter-logo-impression.mjs`, `exporter-carte-visite.mjs`, `exporter-t-shirt.mjs`, `exporter-pull-broderie.mjs`, `exporter-qr-code.mjs`, `exporter-fiche-google.mjs`, `generer-marque.mjs` (logo du site). `generer-image-partage.mjs` fabrique l'image affichée quand on partage le site.

## Imprimeur (Vistaprint)

- Carte de visite : un fichier par face. Cadre bleu du gabarit = bord avant coupe, le fond doit aller jusqu'ici ; rectangle vert = zone de sécurité, tout le texte dedans.
- Vistaprint refuse les polices variables et les polices de type 3 : les PDF utilisent les polices statiques de `polices/`.
- T-shirts : zone d'impression 25 × 25 cm au maximum, fond d'impression « aucune couleur » (sinon un carré blanc est imprimé).
