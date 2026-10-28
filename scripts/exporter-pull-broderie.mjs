/**
 * Fabrique les logos pour la broderie du pull à capuche (design/pull) : devant (côté cœur) et dos, en noir et en blanc.
 * Broderie = formes simples et épaisses : la maison est redessinée avec de gros joints (1,2 mm minimum à 10 cm),
 * lettres du logo telles quelles (grasses), pas de dégradé, 2 couleurs de fil par version.
 * Fichiers : pull-{devant|dos}-{noir|blanc}-broderie.{pdf|png}. Relancer : node scripts/exporter-pull-broderie.mjs (Chrome requis).
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const logos = 'design/logo/impression';
const sortie = 'design/pull';
const chrome = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const police = (poids) => pathToFileURL(path.resolve(`design/polices/dmsans-${poids}.ttf`)).href;
const telephone = fs.readFileSync('src/data/entreprise.ts', 'utf8').match(/telephoneAffiche: '([^']+)'/)[1];
const site = new URL(fs.readFileSync('astro.config.mjs', 'utf8').match(/const SITE = '([^']+)'/)[1]).hostname;
const email = fs.readFileSync('src/data/entreprise.ts', 'utf8').match(/emailPro: '([^']+)'/)?.[1] ?? 'info@elyfacade.be';
const ROUGE = '#C8202B';
const LARGEUR = 100; // mm, devant
const HAUTEUR = LARGEUR * 274 / 1152;
const DOS = { largeur: 240, hauteur: 160 }; // mm, dos : logo, filet, téléphone, email, site (tout en gras, sans petit texte)
const versions = { noir: { logo: 'fond-sombre', fil: '#FFFFFF' }, blanc: { logo: 'couleur', fil: '#141414' } };

// Maison de 228 × 261 (x 80 à 308, y 80 à 341) : toit plein, puis 4 rangées de briques séparées par 16 de joint.
const joint = 16, hBrique = 36, pas = 52;
const rangees = [
  { y: 149, largeurs: [28, 62, 62, 28] },
  { y: 201, largeurs: [65.33, 65.33, 65.33] },
  { y: 253, largeurs: [28, 62, 62, 28], rouge: 1 },
  { y: 305, largeurs: [65.33, 65.33, 65.33] },
];
function maison(fil) {
  const toit = `<path d="M194 80L277.9 133H110.1Z" fill="${fil}"/>`;
  const briques = rangees.map(({ y, largeurs, rouge }) => {
    let x = 80;
    return largeurs.map((l, i) => {
      const r = `<rect x="${x}" y="${y}" width="${l}" height="${hBrique}" fill="${i === rouge ? ROUGE : fil}"/>`;
      x += l + joint;
      return r;
    }).join('');
  }).join('');
  return `${toit}${briques}`;
}

const lettres = (version) => fs.readFileSync(`${logos}/ely-facade-logo-${version}.svg`, 'utf8').split('</g>')[1].replace(/<\/svg>\s*$/, '');

const svg = (v, l, h) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="74 74 1152 274" width="${l}" height="${h}" fill="none">${maison(v.fil)}${lettres(v.logo)}</svg>`;

/** Le dos : logo sur toute la largeur, filet rouge épais, téléphone, email et site centrés, en gras. Unités : mm. */
function dos(v) {
  const L = DOS.largeur, m = L / 2, hLogo = L * 274 / 1152;
  const yFilet = hLogo + 14, yTel = yFilet + 38, yEmail = yTel + 25, ySite = yEmail + 20;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${L} ${DOS.hauteur}" width="${L}mm" height="${DOS.hauteur}mm" font-family="DM Sans" font-weight="800" fill="${v.fil}" text-anchor="middle">
<svg x="0" y="0" width="${L}" height="${hLogo}" viewBox="74 74 1152 274" fill="none">${maison(v.fil)}${lettres(v.logo)}</svg>
<rect x="0" y="${yFilet}" width="${L}" height="2.4" fill="${ROUGE}"/>
<text x="${m}" y="${yTel}" font-size="36" textLength="${L}" lengthAdjust="spacing">${telephone}</text>
<g font-size="16"><text x="${m}" y="${yEmail}">${email}</text><text x="${m}" y="${ySite}">www.${site}</text></g>
</svg>`;
}

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'ely-pull-'));
function rendre(nom, contenu, { pdf, png, mm = [LARGEUR, HAUTEUR] }) {
  const fichier = path.join(temp, `${nom}.html`);
  fs.writeFileSync(fichier, `<!doctype html><meta charset="utf-8"><style>@font-face{font-family:'DM Sans';src:url(${police(800)});font-weight:100 900}*{margin:0}html,body{background:transparent}svg{display:block}${pdf ? `@page{size:${mm[0]}mm ${mm[1]}mm;margin:0}` : ''}</style>${contenu}`);
  const base = ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', `file://${fichier}`];
  if (pdf) execFileSync(chrome, ['--no-pdf-header-footer', `--print-to-pdf=${path.resolve(pdf)}`, ...base], { stdio: 'ignore' });
  if (png) execFileSync(chrome, [`--screenshot=${path.resolve(png.fichier)}`, `--window-size=${png.l},${png.h}`, '--force-device-scale-factor=1', '--default-background-color=00000000', ...base], { stdio: 'ignore' });
}

fs.mkdirSync(sortie, { recursive: true });
for (const [nom, v] of Object.entries(versions)) {
  rendre(`pull-${nom}-pdf`, svg(v, `${LARGEUR}mm`, `${HAUTEUR}mm`), { pdf: `${sortie}/pull-devant-${nom}-broderie.pdf` });
  const l = Math.round(LARGEUR / 25.4 * 600), h = Math.round(HAUTEUR / 25.4 * 600);
  rendre(`pull-${nom}-png`, svg(v, l, h), { png: { fichier: `${sortie}/pull-devant-${nom}-broderie.png`, l, h } });

  rendre(`pull-dos-${nom}-pdf`, dos(v), { pdf: `${sortie}/pull-dos-${nom}-broderie.pdf`, mm: [DOS.largeur, DOS.hauteur] });
  const ld = Math.round(DOS.largeur / 25.4 * 300), hd = Math.round(DOS.hauteur / 25.4 * 300);
  rendre(`pull-dos-${nom}-png`, dos(v).replace(/width="[\d.]+mm" height="[\d.]+mm"/, `width="${ld}" height="${hd}"`), { png: { fichier: `${sortie}/pull-dos-${nom}-broderie.png`, l: ld, h: hd } });
}
fs.rmSync(temp, { recursive: true });
