/**
 * Fabrique les images pour la fiche Google (design/google) :
 * - avant-apres/ : chaque paire « Pendant les travaux » / « Après » du site, l'une au-dessus de l'autre, en 1600 × 1600 px ;
 * - apres/ : les photos de façades terminées, réduites à 2000 px.
 * Mêmes photos (déjà masquées, sans métadonnées) et mêmes cadrages que les curseurs du site (src/data/chantiers.ts).
 * À relancer si les photos ou les paires changent : node scripts/exporter-fiche-google.mjs (Google Chrome requis).
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const photos = 'src/assets/photos';
const sortie = 'design/google';
const police = (poids) => pathToFileURL(path.resolve(`design/polices/dmsans-${poids}.ttf`)).href;

// [nom du fichier, avant, après, cadrage de l'avant, cadrage de l'après] : comme les paires de src/data/chantiers.ts.
const paires = [
  ['charleroi-cote', 'charleroi-deux-couleurs/arriere-pendant', 'charleroi-deux-couleurs/arriere-apres'],
  ['charleroi-coin', 'charleroi-deux-couleurs/coin-pendant-2', 'charleroi-deux-couleurs/coin-apres'],
  ['charleroi-annexe', 'charleroi-deux-couleurs/annexe-pendant-1', 'charleroi-deux-couleurs/annexe-apres', { zoom: 1.11, tx: -4.9, ty: -3.9 }],
  ['charleroi-toit-terrasse', 'charleroi-deux-couleurs/toit-terrasse-pendant', 'charleroi-deux-couleurs/toit-terrasse-apres', { zoom: 1.5, tx: -25.2, ty: -25.4 }],
  ['charleroi-rangee-1', 'charleroi-rangee-2/pendant', 'charleroi-rangee-2/apres', { px: 58 }, { px: 45 }],
  ['charleroi-rangee-2', 'charleroi-rangee-1/pendant', 'charleroi-rangee-1/apres', { px: 50 }, { px: 30 }],
  ['namur-immeuble', 'namur-immeuble-3-etages/pendant-rue', 'namur-immeuble-3-etages/apres-rue', {}, { zoom: 1.08, tx: -1, ty: -8 }],
  ['namur-balcons', 'namur-immeuble-balcons/pendant-cote-gauche', 'namur-immeuble-balcons/apres-cote-gauche', { py: 45 }, { px: 38 }],
  ['mons-universite-cour', 'mons-umons-cour/etape-2-isolation', 'mons-umons-cour/etape-3-aile-terminee', { zoom: 1.13, tx: -13, ty: -5 }],
  ['mons-universite-longue-facade', 'mons-umons-longue-facade/pendant', 'mons-umons-longue-facade/apres', { zoom: 1.12, tx: -11.8, ty: -5.6 }],
  ['halle-pignon', 'halle-maison/pendant-pignon', 'halle-maison/apres-pignon', { px: 48 }, { py: 38 }],
  ['auderghem-arriere', 'auderghem-maison/arriere-pendant', 'auderghem-maison/arriere-apres', { zoom: 1.2, tx: -10.6, ty: -19.5 }],
];

// Les photos de façades terminées (hors paires déjà montrées avec leur « avant » dans ce même dossier).
const apres = [
  'charleroi-deux-couleurs/face-apres', 'charleroi-deux-couleurs/angle-apres', 'charleroi-deux-couleurs/angle-apres-2',
  'charleroi-vue-ensemble/apres', 'namur-immeuble-balcons/apres-coin', 'mons-umons-immeuble-angle/etape-3-termine',
  'halle-maison/final-angle', 'halle-maison/final-baie-vitree', 'halle-maison/final-entree',
  'auderghem-maison/cote-apres', 'auderghem-maison/finition-angle', 'accueil/hero-namur',
];

const url = (cle) => pathToFileURL(path.resolve(`${photos}/${cle}.jpg`)).href;
const cadre = (c = {}) =>
  `object-position:${c.px ?? 50}% ${c.py ?? 50}%;transform-origin:0 0;transform:translate(${c.tx ?? 0}%,${c.ty ?? 0}%) scale(${c.zoom ?? 1})`;
const panneau = (cle, c, etiquette) =>
  `<div class="p"><img src="${url(cle)}" style="${cadre(c)}"><span>${etiquette}</span></div>`;

const css = `@font-face{font-family:'DM Sans';src:url(${police(800)});font-weight:700 900}
*{box-sizing:border-box;margin:0;padding:0}
body{width:1600px;height:1600px;background:#fff;font-family:'DM Sans'}
.p{position:relative;width:1600px;height:796px;overflow:hidden}
.p+.p{margin-top:8px}
.p img{width:100%;height:100%;object-fit:cover;display:block}
.p span{position:absolute;left:36px;top:36px;padding:16px 30px;border-radius:999px;background:#141414;color:#fff;font-weight:800;font-size:44px;line-height:1}`;

fs.mkdirSync(`${sortie}/avant-apres`, { recursive: true });
fs.mkdirSync(`${sortie}/apres`, { recursive: true });
const dossier = fs.mkdtempSync(path.join(os.tmpdir(), 'google-'));

for (const [nom, avant, fin, cAvant, cApres] of paires) {
  const html = path.join(dossier, `${nom}.html`);
  fs.writeFileSync(html, `<!doctype html><meta charset="utf-8"><style>${css}</style>${panneau(avant, cAvant, 'Pendant les travaux')}${panneau(fin, cApres, 'Après')}`);
  const png = path.join(dossier, `${nom}.png`);
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', '--window-size=1600,1600', `--screenshot=${png}`, pathToFileURL(html).href], { stdio: 'ignore' });
  await sharp(png).jpeg({ quality: 88 }).toFile(`${sortie}/avant-apres/${nom}.jpg`);
}

for (const cle of apres) {
  await sharp(`${photos}/${cle}.jpg`).resize({ width: 2000, withoutEnlargement: true }).jpeg({ quality: 88 }).toFile(`${sortie}/apres/${cle.replace('/', '-')}.jpg`);
}
console.log(`${paires.length} paires et ${apres.length} photos dans ${sortie}`);
