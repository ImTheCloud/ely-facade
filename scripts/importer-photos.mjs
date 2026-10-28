/**
 * Importe les photos de `photos-sources/` vers `src/assets/photos/<chantier>/<nom>.jpg` :
 * recadrage, aplats sur plaques et visages, taille maximale, aucune métadonnée (sharp les retire).
 * Relancer : `node scripts/importer-photos.mjs` (tout), ou `node scripts/importer-photos.mjs auderghem` (seulement
 * les destinations qui commencent ainsi). Les coordonnées sont en % de l'image d'origine.
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
const AU = 'Auderghem/';
const CD = 'Charleroi maison deux couleurs/';

/** [fichier source, destination, options { crop:[x0,y0,x1,y1], masques:[[x0,y0,x1,y1]], reflet:[x0,y0,x1,y1], refletSauf:[x0,y0,x1,y1], ciel, largeur, hauteur, masqueFacade }] */
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

  // Auderghem : maison, façade aspect brique
  // Boîte aux lettres (étiquette), plaque de la camionnette, numéro de la maison, numéro du lampadaire, affiches du chantier : aplats.
  [AU + 'rue-pendant-1.jpeg', 'auderghem-maison/rue-pendant-1', { masques: [[63.8, 69.6, 66.8, 71.3]] }],
  [AU + 'rue-pendant-2.jpeg', 'auderghem-maison/rue-pendant-2', { masques: [[16.4, 61.7, 20.8, 64.2], [22, 63.9, 23.6, 64.9], [58.6, 55.8, 60, 58], [63.2, 49.4, 65.5, 53]] }],
  [AU + 'rue-pendant-3.jpeg', 'auderghem-maison/rue-pendant-3', { masques: [[71.3, 70.6, 73.2, 73], [57.6, 54, 58.6, 59.6], [77.8, 57.8, 80.8, 63.6], [52, 66.6, 53.2, 67.6]] }],
  [AU + 'rue-pendant-4.jpeg', 'auderghem-maison/rue-pendant-4', { masques: [[67.1, 74.1, 69.2, 75.3]] }],
  [AU + 'arriere-pendant.jpeg', 'auderghem-maison/arriere-pendant'],
  [AU + 'arriere-apres.jpeg', 'auderghem-maison/arriere-apres'],
  [AU + 'cote-apres.jpeg', 'auderghem-maison/cote-apres'],
  // Les finitions de près (la 3 double presque la 2 : non importée).
  [AU + 'finitions/finition-1.jpeg', 'auderghem-maison/finition-angle'],
  [AU + 'finitions/finition-2.jpeg', 'auderghem-maison/finition-mur-long'],
  [AU + 'finitions/finition-4.jpeg', 'auderghem-maison/finition-arete'],
  [AU + 'finitions/finition-5.jpeg', 'auderghem-maison/finition-fenetres'],
  [AU + 'finitions/finition-6.jpeg', 'auderghem-maison/finition-detail'],
  [AU + 'finitions/finition-7.jpeg', 'auderghem-maison/finition-avancee'],

  // Charleroi : maison en crépi de deux couleurs
  // Plaques de voiture, plaque professionnelle et affiche sur la maison voisine, visage d'un ouvrier : aplats.
  [CD + 'coin-pendant-1.jpeg', 'charleroi-deux-couleurs/coin-pendant-1'],
  [CD + 'coin-pendant-2.jpeg', 'charleroi-deux-couleurs/coin-pendant-2'],
  [CD + 'annexe-pendant-1.jpeg', 'charleroi-deux-couleurs/annexe-pendant-1'],
  [CD + 'toit-terrasse-pendant.jpeg', 'charleroi-deux-couleurs/toit-terrasse-pendant'],
  [CD + 'annexe-pendant-2.jpeg', 'charleroi-deux-couleurs/annexe-pendant-2'],
  [CD + 'arriere-pendant.jpeg', 'charleroi-deux-couleurs/arriere-pendant'],
  [CD + 'jardin-haut-pendant-2.jpeg', 'charleroi-deux-couleurs/jardin-haut-pendant-2'],
  [CD + 'jardin-haut-pendant-1.jpeg', 'charleroi-deux-couleurs/jardin-haut-pendant-1'],
  [CD + 'face-pendant.jpeg', 'charleroi-deux-couleurs/face-pendant', { masques: [[77.9, 56.9, 81.8, 66.7]] }],
  [CD + 'angle-pendant.jpeg', 'charleroi-deux-couleurs/angle-pendant', { masques: [[74.8, 58, 76, 62.2], [91.9, 66.6, 95.1, 68.2]] }],
  [CD + 'jardin-pendant.jpeg', 'charleroi-deux-couleurs/jardin-pendant', { masques: [[52.4, 63.4, 55, 67.3]] }],
  [CD + 'face-apres.jpeg', 'charleroi-deux-couleurs/face-apres', { masques: [[81.6, 50.8, 84.6, 55.7]] }],
  [CD + 'angle-apres.jpeg', 'charleroi-deux-couleurs/angle-apres', { masques: [[83.5, 66.7, 85.6, 73.6]] }],
  // Une camionnette et sa plaque au bord droit : recadrée hors de l'image.
  [CD + 'angle-apres-2.jpeg', 'charleroi-deux-couleurs/angle-apres-2', { masques: [[75.3, 52, 76.3, 56.2]], crop: [0, 0, 91.5, 100] }],
  // Un reflet rond du soleil sur l'étage anthracite : effacé (voir effacerReflet()), sans toucher au muret blanc devant.
  [CD + 'arriere-apres.jpeg', 'charleroi-deux-couleurs/arriere-apres', { reflet: [53.9, 32.6, 61.5, 43.2], refletSauf: [0, 39.5, 57.15, 100] }],
  [CD + 'coin-apres.jpeg', 'charleroi-deux-couleurs/coin-apres'],
  [CD + 'annexe-apres.jpeg', 'charleroi-deux-couleurs/annexe-apres'],
  [CD + 'toit-terrasse-apres.jpeg', 'charleroi-deux-couleurs/toit-terrasse-apres'],
];

const filtres = process.argv.slice(2);
const choisies = filtres.length ? photos.filter(([, destination]) => filtres.some((f) => destination.startsWith(f))) : photos;

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
 * Efface un reflet de soleil (un rond clair) posé sur un mur sombre et uni, dans l'ellipse inscrite dans la zone :
 * la teinte de chaque colonne vient du mur juste au-dessus et juste en dessous du reflet (fondue de l'un à l'autre),
 * le grain est copié d'un morceau de mur propre juste à droite.
 * Rien n'est touché dans la zone « sauf » (un muret clair devant le mur, par exemple).
 */
async function effacerReflet(buffer, [x0, y0, x1, y1], sauf) {
  const { data, info } = await sharp(buffer).raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;
  const cx = ((x0 + x1) / 200) * W, cy = ((y0 + y1) / 200) * H;
  const rx = ((x1 - x0) / 200) * W, ry = ((y1 - y0) / 200) * H;
  const decalage = Math.round(rx * 2.4);
  const [sx0, sy0, sx1, sy1] = (sauf ?? [0, 0, 0, 0]).map((v, k) => (v / 100) * (k % 2 ? H : W));
  const dansReflet = (x, y) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1 && !(x >= sx0 && x <= sx1 && y >= sy0 && y <= sy1);
  const px = (x, y) => (Math.min(H - 1, Math.max(0, y)) * W + Math.min(W - 1, Math.max(0, x))) * C;
  const lum = (i) => (data[i] + data[i + 1] + data[i + 2]) / 3;
  const moyenne = (x, y, rayon, garder) => {
    const somme = [0, 0, 0];
    let n = 0;
    for (let yy = y - rayon; yy <= y + rayon; yy++) {
      for (let xx = x - rayon; xx <= x + rayon; xx++) {
        const i = px(xx, yy);
        if (!garder(xx, yy, i)) continue;
        somme[0] += data[i]; somme[1] += data[i + 1]; somme[2] += data[i + 2]; n++;
      }
    }
    return n ? somme.map((v) => v / n) : null;
  };
  // Le mur (ni une fenêtre noire, ni un rebord clair) sur quelques lignes, autour d'une colonne.
  const mur = (x, yA, yB) => {
    const somme = [0, 0, 0];
    let n = 0;
    for (let yy = yA; yy <= yB; yy++) {
      for (let xx = x - 3; xx <= x + 3; xx++) {
        const i = px(xx, yy);
        if (dansReflet(xx, yy) || lum(i) < 20 || lum(i) > 90) continue;
        somme[0] += data[i]; somme[1] += data[i + 1]; somme[2] += data[i + 2]; n++;
      }
    }
    return n ? somme.map((v) => v / n) : null;
  };
  const sortie = Buffer.from(data);
  const haut = Math.floor(cy - ry), bas = Math.ceil(cy + ry);
  for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
    const dessus = mur(x, haut - 14, haut - 3);
    const dessous = mur(x, bas + 3, bas + 14);
    for (let y = haut; y <= bas; y++) {
      if (!dansReflet(x, y)) continue;
      const t = (y - haut) / (bas - haut);
      const fond = dessus && dessous ? dessus.map((v, k) => v + (dessous[k] - v) * t) : dessus ?? dessous;
      const propre = px(x + decalage, y);
      const autour = moyenne(x + decalage, y, 4, (xx, yy, j) => lum(j) < 90);
      if (!fond || !autour) continue;
      const i = px(x, y);
      for (let k = 0; k < 3; k++) sortie[i + k] = Math.max(0, Math.min(255, Math.round(fond[k] + data[propre + k] - autour[k])));
    }
  }
  return sharp(sortie, { raw: { width: W, height: H, channels: C } }).png().toBuffer();
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

for (const [source, destination, options = {}] of choisies) {
  const { crop, masques = [], reflet, refletSauf, ciel, largeur = 2000, hauteur = largeur, masqueFacade: avecMasque } = options;
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
  if (reflet) tampon = await effacerReflet(tampon, reflet, refletSauf);
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
console.log(`${choisies.length} photos importées dans ${OUT}`);
