/**
 * Maquette photo du t-shirt pour le client : pose les fichiers d'impression (design/t-shirt)
 * sur une photo de t-shirts vierges (design/t-shirt/photo/sources), en suivant plis, lumière et grain du tissu.
 * Les photos de t-shirts vierges sont générées par IA : maquette seulement, jamais sur le site.
 * À relancer après node scripts/exporter-t-shirt.mjs : node scripts/photo-t-shirt.mjs
 */
import sharp from 'sharp';

const dossier = 'design/t-shirt';
const ECHELLE = 2; // la photo est agrandie pour que le logo reste net

// Mêmes mesures que la maquette technique (scripts/exporter-t-shirt.mjs), en cm.
const DEVANT = { largeur: 10, sousLeCol: 8, duMilieu: 7 };
const DOS = { largeur: 25, sousLeCol: 9 };

// Repères relevés sur chaque photo (pixels de la photo d'origine) : milieu du t-shirt, bas du col, échelle.
const photos = {
  blanc: {
    source: 't-shirts-blancs.png',
    devant: { milieu: 435, col: 272, pxParCm: 8 },
    dos: { milieu: 1133, col: 213, pxParCm: 7.8 },
    encre: 1,
    ombres: 1,
    grain: 0.45,
  },
  noir: {
    source: 't-shirts-noirs.png',
    devant: { milieu: 410, col: 245, pxParCm: 8.1 },
    dos: { milieu: 1134, col: 210, pxParCm: 8 },
    encre: 0.93, // l'encre blanche sur coton noir n'est jamais d'un blanc pur
    ombres: 0.35, // et elle marque moins les plis que le tissu lui-même
    grain: 0.3,
  },
};

const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
async function flou(canal, l, h, sigma) {
  const { data } = await sharp(Buffer.from(canal), { raw: { width: l, height: h, channels: 1 } }).blur(sigma)
    .extractChannel(0).raw().toBuffer({ resolveWithObject: true });
  return data;
}

for (const [nom, p] of Object.entries(photos)) {
  const { data: base, info } = await sharp(`${dossier}/photo/sources/${p.source}`)
    .resize({ width: (await sharp(`${dossier}/photo/sources/${p.source}`).metadata()).width * ECHELLE, kernel: 'lanczos3' })
    .removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: l, height: h } = info;

  const L = new Uint8Array(l * h);
  for (let i = 0; i < l * h; i++) L[i] = lum(base[3 * i], base[3 * i + 1], base[3 * i + 2]);
  const [ombre, relief, grainFin, grainMoyen] = await Promise.all([flou(L, l, h, 16), flou(L, l, h, 5), flou(L, l, h, 0.6), flou(L, l, h, 2.5)]);

  const sortie = Buffer.from(base);
  const motifs = [
    { fichier: `t-shirt-devant-${nom}.png`, ...p.devant, largeur: DEVANT.largeur, haut: DEVANT.sousLeCol, decalage: DEVANT.duMilieu },
    { fichier: `t-shirt-dos-${nom}.png`, ...p.dos, largeur: DOS.largeur, haut: DOS.sousLeCol, decalage: 0 },
  ];

  for (const m of motifs) {
    const k = m.pxParCm * ECHELLE;
    const lm = Math.round(m.largeur * k);
    const { data: art, info: ia } = await sharp(`${dossier}/${m.fichier}`).resize({ width: lm, kernel: 'lanczos3' })
      .ensureAlpha().blur(0.45).raw().toBuffer({ resolveWithObject: true });
    const x0 = Math.round((m.milieu + m.decalage * m.pxParCm) * ECHELLE - lm / 2);
    const y0 = Math.round((m.col + m.haut * m.pxParCm) * ECHELLE);

    // Lumière moyenne sous le motif : référence pour les ombres.
    let somme = 0;
    for (let y = y0; y < y0 + ia.height; y++) for (let x = x0; x < x0 + lm; x++) somme += ombre[y * l + x];
    const ref = somme / (lm * ia.height);

    // Lecture du motif avec interpolation (couleurs prémultipliées par l'opacité).
    const lire = (u, v) => {
      const xa = Math.floor(u), ya = Math.floor(v), fx = u - xa, fy = v - ya, res = [0, 0, 0, 0];
      for (const [dx, dy, w] of [[0, 0, (1 - fx) * (1 - fy)], [1, 0, fx * (1 - fy)], [0, 1, (1 - fx) * fy], [1, 1, fx * fy]]) {
        const xx = xa + dx, yy = ya + dy;
        if (xx < 0 || yy < 0 || xx >= ia.width || yy >= ia.height || !w) continue;
        const i = 4 * (yy * ia.width + xx), a = art[i + 3] / 255;
        res[0] += art[i] * a * w; res[1] += art[i + 1] * a * w; res[2] += art[i + 2] * a * w; res[3] += a * w;
      }
      return res;
    };

    const marge = 6;
    for (let y = y0 - marge; y < y0 + ia.height + marge; y++) {
      for (let x = x0 - marge; x < x0 + lm + marge; x++) {
        const i = y * l + x;
        // Le motif suit le relief du tissu (léger déplacement selon la pente de lumière).
        const gx = (relief[i + 1] - relief[i - 1]) / 2, gy = (relief[i + l] - relief[i - l]) / 2;
        const dx = Math.max(-3, Math.min(3, gx * 1.2)), dy = Math.max(-3, Math.min(3, gy * 1.2));
        const [r, g, b, a] = lire(x - x0 - dx, y - y0 - dy);
        if (a <= 0.001) continue;
        const teinte = Math.max(0.7, Math.min(1.07, 1 + (ombre[i] / ref - 1) * p.ombres));
        const grain = (grainFin[i] - grainMoyen[i]) / 255;
        const opacite = a * 0.97;
        for (let c = 0; c < 3; c++) {
          const encre = (c === 0 ? r : c === 1 ? g : b) / a / 255 * p.encre;
          const imprime = Math.max(0, Math.min(1, encre * teinte + grain * p.grain));
          sortie[3 * i + c] = Math.round(sortie[3 * i + c] * (1 - opacite) + imprime * 255 * opacite);
        }
      }
    }
  }

  await sharp(sortie, { raw: { width: l, height: h, channels: 3 } }).jpeg({ quality: 90, mozjpeg: true })
    .toFile(`${dossier}/photo/t-shirt-${nom}.jpg`);
}
