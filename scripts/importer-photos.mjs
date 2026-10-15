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

/** [fichier source, destination, options { crop:[x0,y0,x1,y1], masques:[[x0,y0,x1,y1]], ciel, largeur, hauteur, masqueFacade }] */
const photos = [
  // Accueil
  // Ciel prolongé au-dessus du toit (le faîte touche le bord de la photo) : voir prolongerCiel().
  [NA + 'Photo pour Page principale.jpeg', 'accueil/hero-namur', { ciel: 0.3, largeur: 2400, masqueFacade: true }],
  // Cadrage vertical pour téléphone : l'aile gauche et le toit en haut, la route et la pelouse en bas (sous le texte).
  [NA + 'Photo pour Page principale.jpeg', 'accueil/hero-namur-mobile', { ciel: 0.3, crop: [5, 13, 34, 100], largeur: 1400, hauteur: 2800, masqueFacade: true }],

  // Namur : immeuble de 3 étages
  [NA + 'Avant-apres copie 2/apres.jpeg', 'namur-immeuble-3-etages/apres-rue', { masques: [[1, 66.3, 7.4, 70]] }],
  // Trois personnes et une voiture en bas à droite : recadrées hors de l'image.
  [NA + 'Avant-apres copie 2/pendant.jpeg', 'namur-immeuble-3-etages/pendant-face', { crop: [0, 0, 71, 68] }],
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
  // Panneau de chantier (adresse du chantier) et numéros peints sur la façade : aplats.
  [CH + 'Avant-Après/Bloc1avant.jpeg', 'charleroi-rangee-1/pendant', { masques: [[20.3, 46.5, 27, 64], [0.3, 58.7, 1.5, 59.9], [4.4, 57.5, 5.6, 59.5]] }],
  [CH + 'Avant-Après/Bloc1apres.jpeg', 'charleroi-rangee-1/apres'],
  [CH + 'Avant-Après copie 2/Bloc2avant.jpeg', 'charleroi-rangee-2/pendant'],
  [CH + 'Avant-Après copie 2/Bloc2apres.jpeg', 'charleroi-rangee-2/apres'],
  [CH + 'VuDesChantiersTerminé.jpeg', 'charleroi-vue-ensemble/apres'],

  // Mons : Université de Mons (UMons), immeuble d'angle à 4 étages (étapes)
  [UM + 'Avant-apres copie 2/pendant.jpeg', 'mons-umons-immeuble-angle/etape-1-membrane-1'],
  [UM + 'Avant-apres copie 2/pendantaussi.jpeg', 'mons-umons-immeuble-angle/etape-1-membrane-2', { masques: [[14.7, 65.2, 16.2, 66.3], [80.2, 67.3, 82, 68.7]] }],
  [UM + 'Avant-apres copie 2/pendantaussi2.jpeg', 'mons-umons-immeuble-angle/etape-1-membrane-3'],
  [UM + 'Avant-apres copie 2/pendantaussi3.jpeg', 'mons-umons-immeuble-angle/etape-1-membrane-4'],
  [UM + 'Avant-apres copie 2/pendantaussi4.jpeg', 'mons-umons-immeuble-angle/etape-2-sous-couche', { masques: [[2.4, 66.9, 4.2, 68.1]] }],
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

/**
 * Prolonge le ciel au-dessus de la photo (hauteur ajoutée = fraction × hauteur), sans rien inventer d'autre :
 * - juste au-dessus du bord, le ciel de la photo est reflété (nuages compris), sauf ce qui n'est pas du ciel
 *   (toit, fils électriques), remplacé par la couleur du ciel voisin ;
 * - plus haut, un dégradé doux vers un bleu un peu plus profond, comme un vrai ciel au zénith.
 */
async function prolongerCiel(buffer, fraction) {
  const { data, info } = await sharp(buffer).raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;
  const S = Math.round(H * fraction);
  const px = (x, y) => (y * W + x) * C;
  const estCiel = (i) => data[i + 2] > data[i] + 12 && data[i] + data[i + 1] + data[i + 2] > 420;

  // Couleur du ciel par colonne (bande du haut), lissée horizontalement.
  const brut = new Array(W).fill(null);
  for (let x = 0; x < W; x++) {
    let r = 0, g = 0, b = 0, n = 0;
    for (let y = 0; y < Math.min(24, H); y++) {
      const i = px(x, y);
      if (estCiel(i)) { r += data[i]; g += data[i + 1]; b += data[i + 2]; n++; }
    }
    if (n) brut[x] = [r / n, g / n, b / n];
  }
  for (let x = 0; x < W; x++) {
    if (brut[x]) continue;
    let a = x, z = x;
    while (a >= 0 && !brut[a]) a--;
    while (z < W && !brut[z]) z++;
    const ca = brut[a] ?? brut[z], cz = brut[z] ?? brut[a], t = a < 0 || z >= W ? 0 : (x - a) / (z - a);
    brut[x] = ca.map((v, k) => v + (cz[k] - v) * t);
  }
  const rayon = Math.round(W / 18);
  const lisse = brut.map((_, x) => {
    const somme = [0, 0, 0];
    let n = 0;
    for (let k = Math.max(0, x - rayon); k <= Math.min(W - 1, x + rayon); k++) { somme[0] += brut[k][0]; somme[1] += brut[k][1]; somme[2] += brut[k][2]; n++; }
    return somme.map((v) => v / n);
  });
  const moyenne = lisse.reduce((m, c) => m.map((v, k) => v + c[k] / W), [0, 0, 0]);
  const zenith = [moyenne[0] * 0.8, moyenne[1] * 0.88, Math.min(255, moyenne[2] * 1.02)];

  const lisser = (t) => t * t * (3 - 2 * t);
  const M = Math.min(S, Math.round(H * 0.09));

  // Ciel « sûr » : le pixel et tous ses voisins proches sont du ciel (le bord du toit et les fils ne débordent pas).
  const R = 5;
  const sur = new Uint8Array(W * M);
  for (let y = 0; y < M; y++) {
    for (let x = 0; x < W; x++) {
      let ok = 1;
      for (let dy = -R; dy <= R && ok; dy++) {
        for (let dx = -R; dx <= R; dx += R) {
          const xx = Math.min(W - 1, Math.max(0, x + dx)), yy = Math.min(H - 1, Math.max(0, y + dy));
          if (!estCiel(px(xx, yy))) { ok = 0; break; }
        }
      }
      sur[y * W + x] = ok;
    }
  }
  const ciel = Buffer.alloc(W * S * 3);
  for (let d = 1; d <= S; d++) {
    const yPhoto = Math.min(M - 1, d - 1);
    const reflet = lisser(Math.min(1, d / M));
    const haut = lisser(Math.min(1, Math.max(0, (d - M * 0.5) / (S - M * 0.5)))) * 0.75;
    for (let x = 0; x < W; x++) {
      const i = px(x, yPhoto);
      const base = lisse[x];
      const photo = sur[yPhoto * W + x] ? [data[i], data[i + 1], data[i + 2]] : base;
      const o = ((S - d) * W + x) * 3;
      for (let k = 0; k < 3; k++) {
        const v = photo[k] + (base[k] - photo[k]) * reflet;
        ciel[o + k] = Math.max(0, Math.min(255, Math.round(v + (zenith[k] - v) * haut + (Math.random() - 0.5) * 2)));
      }
    }
  }
  const bande = await sharp(ciel, { raw: { width: W, height: S, channels: 3 } }).blur(1.2).png().toBuffer();
  return sharp({ create: { width: W, height: H + S, channels: 3, background: '#000' } })
    .composite([{ input: bande, top: 0, left: 0 }, { input: await sharp(buffer).png().toBuffer(), top: S, left: 0 }])
    .png()
    .toBuffer();
}

/**
 * Masque des surfaces blanches de la façade (PNG transparent, même cadrage que la photo) :
 * le reflet de lumière du haut de page ne passe que sur elles. Le ciel bleu et la verdure restent hors du masque.
 */
async function masqueFacade(fichier) {
  const { data, info } = await sharp(fichier).resize({ width: 1200 }).raw().toBuffer({ resolveWithObject: true });
  const alpha = Buffer.alloc(info.width * info.height);
  for (let i = 0, p = 0; i < alpha.length; i++, p += info.channels) {
    const r = data[p], g = data[p + 1], b = data[p + 2];
    const min = Math.min(r, g, b), ecart = Math.max(r, g, b) - min;
    const clair = Math.min(1, Math.max(0, (min - 125) / 70));
    const neutre = Math.min(1, Math.max(0, 1 - (ecart - 14) / 26));
    alpha[i] = Math.round(255 * clair * neutre);
  }
  const blanc = await sharp({ create: { width: info.width, height: info.height, channels: 3, background: '#ffffff' } }).raw().toBuffer();
  const masque = await sharp(alpha, { raw: { width: info.width, height: info.height, channels: 1 } }).blur(1.5).extractChannel(0).raw().toBuffer();
  await sharp(blanc, { raw: { width: info.width, height: info.height, channels: 3 } })
    .joinChannel(masque, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png({ compressionLevel: 9, palette: false })
    .toFile(fichier.replace(/\.jpg$/, '-masque.png'));
}

for (const [source, destination, options = {}] of photos) {
  const { crop, masques = [], ciel, largeur = 2000, hauteur = largeur, masqueFacade: avecMasque } = options;
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
    // stats() lit l'image d'entrée, pas le résultat de extract() : on isole d'abord la zone.
    const stats = await sharp(await sharp(original).extract({ left, top, width, height }).toBuffer()).stats();
    const [r, g, b] = stats.channels.map((c) => Math.round(c.mean));
    pieces.push({ input: { create: { width, height, channels: 3, background: { r, g, b } } }, left, top });
  }
  let tampon = pieces.length ? await sharp(original).composite(pieces).toBuffer() : original;
  if (ciel) tampon = await prolongerCiel(tampon, ciel);
  let image = sharp(tampon);

  if (crop) {
    // Le recadrage se fait sur l'image finale (ciel prolongé compris).
    const { width: w, height: h } = await sharp(tampon).metadata();
    const [x0, y0, x1, y1] = crop;
    const left = Math.round((x0 / 100) * w);
    const top = Math.round((y0 / 100) * h);
    image = image.extract({ left, top, width: Math.round((x1 / 100) * w) - left, height: Math.round((y1 / 100) * h) - top });
  }

  const fichier = `${OUT}${destination}.jpg`;
  fs.mkdirSync(fichier.slice(0, fichier.lastIndexOf('/')), { recursive: true });
  await image.resize({ width: largeur, height: hauteur, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 84, mozjpeg: true }).toFile(fichier);
  if (avecMasque) await masqueFacade(fichier);
}
console.log(`${photos.length} photos importées dans ${OUT}`);
