/**
 * Importe les photos de `photos-sources/` vers `src/assets/photos/<chantier>/<nom>.jpg` :
 * recadrage, aplats sur plaques et visages, taille maximale, aucune métadonnée (sharp les retire).
 * Relancer : `node scripts/importer-photos.mjs`. Les coordonnées sont en % de l'image d'origine.
 * (Les noms de sociétés visibles sur les chantiers restent visibles : décision du client.)
 */
import sharp from 'sharp';
import fs from 'fs';

const SRC = 'photos-sources/';
const OUT = 'src/assets/photos/';

const CH = 'Charleroi2chantiersTotalDe23maisons/';
const HA = 'Halle Maison/';
const NA = 'Namur/';
const NB = 'NamurAutrechantier/';
const UM = 'UMons Université/';

/** [fichier source, destination, options { crop:[x0,y0,x1,y1], masques:[[x0,y0,x1,y1]], largeur }] */
const photos = [
  // Accueil
  [NA + 'Photo pour Page principale.jpeg', 'accueil/hero-namur', { largeur: 2400 }],

  // Namur : immeuble de 3 étages
  [NA + 'Avant-apres copie 2/apres.jpeg', 'namur-immeuble-3-etages/apres-rue', { masques: [[1, 66.3, 7.4, 70]] }],
  [NA + 'Avant-apres copie 2/pendant.jpeg', 'namur-immeuble-3-etages/pendant-face', { crop: [0, 0, 84, 82] }],
  [NA + 'Avant-apres copie 2/pednantaussi.jpeg', 'namur-immeuble-3-etages/pendant-rue'],

  // Namur : immeuble à balcons
  [NB + 'Avant-apres copie/avant.jpeg', 'namur-immeuble-balcons/pendant-grue'],
  [NB + 'Avant-apres copie/apres.Jpeg', 'namur-immeuble-balcons/apres-coin'],
  [NB + 'Avant-apres copie 3/avantcotégauche.jpeg', 'namur-immeuble-balcons/pendant-cote-gauche'],
  [NB + 'Avant-apres copie 3/aprescotégauche.jpeg', 'namur-immeuble-balcons/apres-cote-gauche'],
  [NA + 'Avant-apres copie 4/pendant.jpeg', 'namur-immeuble-balcons/pendant-loin-1', { masques: [[24.2, 62.8, 27.4, 64.9]] }],
  [NA + 'Avant-apres copie 4/pendantaussi.jpeg', 'namur-immeuble-balcons/pendant-loin-2', { masques: [[65.4, 64.6, 69.8, 66.4]] }],
  [NA + 'Avant-apres copie 4/pendantcotédroit.jpeg', 'namur-immeuble-balcons/pendant-loin-3'],
  [NA + 'avantpendant.jpeg', 'namur-immeuble-balcons/pendant-debut-1'],
  [NA + 'avantpendentaaussi.jpeg', 'namur-immeuble-balcons/pendant-debut-2'],

  // Charleroi
  [CH + 'Avant-Après/Bloc1avant.jpeg', 'charleroi-rangee-1/pendant'],
  [CH + 'Avant-Après/Bloc1apres.jpeg', 'charleroi-rangee-1/apres'],
  [CH + 'Avant-Après copie 2/Bloc2avant.jpeg', 'charleroi-rangee-2/pendant'],
  [CH + 'Avant-Après copie 2/Bloc2apres.jpeg', 'charleroi-rangee-2/apres'],
  [CH + 'VuDesChantiersTerminé.jpeg', 'charleroi-vue-ensemble/apres'],

  // Mons : Université de Mons (UMons), immeuble d'angle à 4 étages (étapes)
  [UM + 'Avant-apres copie 2/pendant.jpeg', 'mons-umons-immeuble-angle/etape-1-membrane-1'],
  [UM + 'Avant-apres copie 2/pendantaussi.jpeg', 'mons-umons-immeuble-angle/etape-1-membrane-2'],
  [UM + 'Avant-apres copie 2/pendantaussi2.jpeg', 'mons-umons-immeuble-angle/etape-1-membrane-3'],
  [UM + 'Avant-apres copie 2/pendantaussi3.jpeg', 'mons-umons-immeuble-angle/etape-1-membrane-4'],
  [UM + 'Avant-apres copie 2/pendantaussi4.jpeg', 'mons-umons-immeuble-angle/etape-2-sous-couche'],
  [UM + 'Avant-apres copie 2/apres.Jpeg', 'mons-umons-immeuble-angle/etape-3-termine'],

  // Mons : UMons, cour intérieure en U (premier avant/après du site)
  [UM + 'Avant-apres/pendantaussi.jpeg', 'mons-umons-cour/etape-1-membrane'],
  [UM + 'Avant-apres/pendant.jpeg', 'mons-umons-cour/etape-2-isolation', { masques: [[33, 62.6, 35.2, 64.6]] }],
  [UM + 'Avant-apres/apres.jpeg', 'mons-umons-cour/etape-3-aile-terminee'],

  // Mons : UMons, longue façade
  [UM + 'Avant-apres copie/avant.jpeg', 'mons-umons-longue-facade/pendant'],
  [UM + 'Avant-apres copie/apres.jpeg', 'mons-umons-longue-facade/apres'],

  // Halle : maison en briques claires
  [HA + 'Avant-Apres/pendant.jpeg', 'halle-maison/pendant-pignon'],
  [HA + 'Avant-Apres/apres.jpeg', 'halle-maison/apres-pignon'],
  [HA + 'rendufinal.jpeg', 'halle-maison/final-entree'],
  [HA + 'rendufinal2.jpeg', 'halle-maison/final-angle'],
  [HA + 'rendufinal3.jpeg', 'halle-maison/final-baie-vitree', { masques: [[30, 50, 34.5, 64]] }],

  // Evere
  ['Evere/UniquePhotoDeEvere.jpeg', 'evere-immeuble/nuit'],
];

for (const [source, destination, options = {}] of photos) {
  const { crop, masques = [], largeur = 2000 } = options;
  const original = await sharp(SRC + source).rotate().removeAlpha().toBuffer();
  const meta = await sharp(original).metadata();
  const W = meta.width;
  const H = meta.height;

  // Aplats : couleur moyenne de la zone, pour que l'aplat se fonde dans l'image.
  const pieces = [];
  for (const [x0, y0, x1, y1] of masques) {
    const left = Math.round((x0 / 100) * W);
    const top = Math.round((y0 / 100) * H);
    const width = Math.round((x1 / 100) * W) - left;
    const height = Math.round((y1 / 100) * H) - top;
    const stats = await sharp(original).extract({ left, top, width, height }).stats();
    const [r, g, b] = stats.channels.map((c) => Math.round(c.mean));
    pieces.push({ input: { create: { width, height, channels: 3, background: { r, g, b } } }, left, top });
  }
  let image = sharp(pieces.length ? await sharp(original).composite(pieces).toBuffer() : original);

  if (crop) {
    const [x0, y0, x1, y1] = crop;
    const left = Math.round((x0 / 100) * W);
    const top = Math.round((y0 / 100) * H);
    image = image.extract({ left, top, width: Math.round((x1 / 100) * W) - left, height: Math.round((y1 / 100) * H) - top });
  }

  const fichier = `${OUT}${destination}.jpg`;
  fs.mkdirSync(fichier.slice(0, fichier.lastIndexOf('/')), { recursive: true });
  await image.resize({ width: largeur, height: largeur, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 84, mozjpeg: true }).toFile(fichier);
}
console.log(`${photos.length} photos importées dans ${OUT}`);
