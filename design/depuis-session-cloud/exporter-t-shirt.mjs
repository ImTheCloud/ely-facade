/**
 * Fabrique le dossier t-shirt pour l'imprimeur (design/t-shirt), en blanc et en noir :
 * fichiers d'impression du devant et du dos (PDF vectoriel + PNG).
 * Le devant reprend le logo de design/logo/impression : lancer d'abord node scripts/exporter-logo-impression.mjs.
 * À relancer si le logo ou les infos changent : node scripts/exporter-t-shirt.mjs (Google Chrome requis).
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const logos = 'design/logo/impression';
const sortie = 'design/t-shirt';
const chrome = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
// Polices statiques (DM Sans 600 et 800) : les imprimeurs refusent les PDF à polices variables.
const police = (poids) => pathToFileURL(path.resolve(`design/polices/dmsans-${poids}.ttf`)).href;
const telephone = fs.readFileSync('src/data/entreprise.ts', 'utf8').match(/telephoneAffiche: '([^']+)'/)[1];
const site = new URL(fs.readFileSync('astro.config.mjs', 'utf8').match(/const SITE = '([^']+)'/)[1]).hostname;
const metier = 'Rénovation de façades · Gevelrenovatie';
const email = fs.readFileSync('src/data/entreprise.ts', 'utf8').match(/emailPro: '([^']+)'/)?.[1] ?? 'info@elyfacade.be';

const ROUGE = '#C8202B';
const couleurs = {
  blanc: {
    logo: 'couleur', encre: '#141414', nomEncre: 'Noir',
    tissu: '#ffffff', contour: '#d5d3cf', interieur: '#e9e7e3', cote: '#f7f6f4', couture: '#cbc8c3', ombre: 0.05, lumiere: 0,
  },
  noir: {
    logo: 'fond-sombre', encre: '#FFFFFF', nomEncre: 'Blanc',
    tissu: '#1d1d1f', contour: '#0c0c0d', interieur: '#0f0f10', cote: '#252527', couture: '#3c3c40', ombre: 0.18, lumiere: 0.05,
  },
};

// Taille des motifs, en millimètres (positions : voir docs/design-supports.md).
const DEVANT = { largeur: 80, hauteur: 80 * 274 / 1152 };
const DOS = { largeur: 280, hauteur: 166 };

const logoSvg = (version, forme = 'logo') => fs.readFileSync(`${logos}/ely-facade-${forme}-${version}.svg`, 'utf8');
const contenuLogo = (svg) => svg.replace(/^<svg[^>]*>\n?/, '').replace(/<\/svg>\s*$/, '');

/** Le devant : le logo horizontal (maison + ELY FACADE), petit, côté cœur. */
function devant(c) {
  const { largeur: l, hauteur: h } = DEVANT;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="74 74 1152 274" width="${l}mm" height="${h}mm" fill="none">${contenuLogo(logoSvg(c.logo))}</svg>`;
}

/**
 * Le dos : le logo horizontal (maison + ELY FACADE) sur toute la largeur (280 mm), slogan FR à gauche et NL à droite,
 * filet rouge, téléphone en gros, puis email et site côte à côte. Unités : mm.
 */
function dos(c) {
  const L = DOS.largeur, m = L / 2, hLogo = L * 274 / 1152;
  const yFr = hLogo + 17, yFilet = yFr + 10, yTel = yFilet + 44, yContact = yTel + 22;
  const fr = metier.split(' · ')[0].toUpperCase();
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${L} ${DOS.hauteur}" width="${L}mm" height="${DOS.hauteur}mm" font-family="DM Sans" fill="${c.encre}">
<svg x="0" y="0" width="${L}" height="${hLogo}" viewBox="74 74 1152 274" fill="none">${contenuLogo(logoSvg(c.logo))}</svg>
<text x="${m + 1.2}" y="${yFr}" font-size="12" font-weight="600" letter-spacing="2.4" text-anchor="middle">${fr}</text>
<rect x="0" y="${yFilet}" width="${L}" height="1.8" fill="${ROUGE}"/>
<text x="0" y="${yTel}" font-size="44" font-weight="800" textLength="${L}" lengthAdjust="spacing">${telephone}</text>
<g font-size="14.5" font-weight="600"><text x="0" y="${yContact}">${email}</text><text x="${L}" y="${yContact}" text-anchor="end">www.${site}</text></g>
</svg>`;
}

const html = (corps, style) => `<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>
@font-face{font-family:'DM Sans';src:url(${police(600)});font-weight:100 699}
@font-face{font-family:'DM Sans';src:url(${police(800)});font-weight:700 900}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans';color:#141414;-webkit-print-color-adjust:exact;print-color-adjust:exact}
${style}</style></head><body>${corps}</body></html>`;

// Chrome : PDF vectoriel et capture PNG (fond transparent si demandé).
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'ely-t-shirt-'));
function rendre(nom, contenu, { pdf, png }) {
  const fichier = path.join(temp, `${nom}.html`);
  fs.writeFileSync(fichier, contenu);
  const base = ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', `file://${fichier}`];
  if (pdf) execFileSync(chrome, ['--no-pdf-header-footer', `--print-to-pdf=${path.resolve(pdf)}`, ...base], { stdio: 'ignore' });
  if (png) execFileSync(chrome, [`--screenshot=${path.resolve(png.fichier)}`, `--window-size=${png.l},${png.h}`,
    `--force-device-scale-factor=${png.echelle}`, ...(png.transparent ? ['--default-background-color=00000000'] : []), ...base], { stdio: 'ignore' });
}

fs.mkdirSync(sortie, { recursive: true });
for (const f of fs.readdirSync(sortie, { withFileTypes: true })) if (f.isFile()) fs.rmSync(path.join(sortie, f.name));
for (const [nom, c] of Object.entries(couleurs)) {
  const artDevant = devant(c);
  rendre(`devant-${nom}-pdf`, html(artDevant, `@page{size:${DEVANT.largeur}mm ${DEVANT.hauteur}mm;margin:0}svg{display:block}`), { pdf: `${sortie}/t-shirt-devant-${nom}.pdf` });
  rendre(`devant-${nom}-png`, html(artDevant.replace(/width="[\d.]+mm" height="[\d.]+mm"/, `width="${DEVANT.largeur * 8}" height="${Math.round(DEVANT.hauteur * 8)}"`), 'html,body{background:transparent}svg{display:block}'),
    { png: { fichier: `${sortie}/t-shirt-devant-${nom}.png`, l: DEVANT.largeur * 8, h: Math.round(DEVANT.hauteur * 8), echelle: 3, transparent: true } });

  const artDos = dos(c);
  rendre(`dos-${nom}-pdf`, html(artDos, `@page{size:${DOS.largeur}mm ${DOS.hauteur}mm;margin:0}svg{display:block}`), { pdf: `${sortie}/t-shirt-dos-${nom}.pdf` });
  rendre(`dos-${nom}-png`, html(artDos.replace(/width="[\d.]+mm" height="[\d.]+mm"/, `width="${DOS.largeur * 4}" height="${DOS.hauteur * 4}"`), 'html,body{background:transparent}svg{display:block}'),
    { png: { fichier: `${sortie}/t-shirt-dos-${nom}.png`, l: DOS.largeur * 4, h: DOS.hauteur * 4, echelle: 3, transparent: true } });
}
fs.rmSync(temp, { recursive: true });
