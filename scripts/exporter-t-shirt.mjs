/**
 * Fabrique le dossier t-shirt pour l'imprimeur (design/t-shirt), en blanc et en noir :
 * maquette (devant + dos, PDF A4 et PNG), fichiers d'impression du devant et du dos (PDF vectoriel + PNG).
 * Le devant reprend le logo de design/logo/impression : lancer d'abord node scripts/exporter-logo-impression.mjs.
 * À relancer si le logo ou les infos changent : node scripts/exporter-t-shirt.mjs (Google Chrome requis).
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { fr } from '../src/i18n/fr.ts';
import { nl } from '../src/i18n/nl.ts';

const logos = 'design/logo/impression';
const sortie = 'design/t-shirt';
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const police = pathToFileURL(path.resolve('node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2')).href;
const telephone = fs.readFileSync('src/data/entreprise.ts', 'utf8').match(/telephoneAffiche: '([^']+)'/)[1];
const site = new URL(fs.readFileSync('astro.config.mjs', 'utf8').match(/const SITE = '([^']+)'/)[1]).hostname;
const metier = `${fr.accueil.hero.surtitre.split(' · ')[0]} · ${nl.accueil.hero.surtitre.split(' · ')[0]}`;

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

// Mesures pour un t-shirt taille L, en millimètres.
const DEVANT = { largeur: 100, sousLeCol: 80, duMilieu: 70 };
const DOS = { largeur: 250, hauteur: 200, sousLeCol: 90 };

const logoSvg = (version, forme = 'logo') => fs.readFileSync(`${logos}/ely-facade-${forme}-${version}.svg`, 'utf8');
const contenuLogo = (svg) => svg.replace(/^<svg[^>]*>\n?/, '').replace(/<\/svg>\s*$/, '');

/** Le dos : maison au-dessus du nom (logo empilé), métier en FR et NL, téléphone, site. Unités : mm. */
function dos(c) {
  const L = DOS.largeur;
  const hMaison = 70, lMaison = hMaison * 228 / 261;
  const nom = logoSvg(c.logo).split('</g>')[1].replace(/<\/svg>\s*$/, ''); // « ELY FACADE » seul
  const hNom = L * 92.56 / 851.1, yNom = hMaison + 11;
  const yMetier = yNom + hNom + 17, yTrait = yMetier + 9;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${L} ${DOS.hauteur}" width="${L}mm" height="${DOS.hauteur}mm">
<svg x="${(L - lMaison) / 2}" y="0" width="${lMaison}" height="${hMaison}" viewBox="80 80 228 261" fill="none">${contenuLogo(logoSvg(c.logo, 'icone'))}</svg>
<svg x="0" y="${yNom}" width="${L}" height="${hNom}" viewBox="368 165.78 851.1 92.56" fill="none">${nom}</svg>
<g font-family="DM Sans" fill="${c.encre}" text-anchor="middle">
<text x="0" y="${yMetier}" text-anchor="start" font-size="9.2" font-weight="600" textLength="${L}" lengthAdjust="spacing">${metier.toUpperCase()}</text>
<rect x="${L / 2 - 15}" y="${yTrait}" width="30" height="2.4" fill="${ROUGE}"/>
<text x="${L / 2}" y="${yTrait + 36}" font-size="36" font-weight="700" letter-spacing="0.4">${telephone}</text>
<text x="${L / 2}" y="${yTrait + 60}" font-size="17" font-weight="500">${site}</text>
</g>
</svg>`;
}

/** Silhouette du t-shirt à plat (taille L), unités : mm. */
const encolure = {
  devant: 'C 520 92, 482 126, 430 126 C 378 126, 340 92, 335 40',
  dos: 'C 508 56, 470 60, 430 60 C 390 60, 352 56, 335 40',
};
const silhouette = (vue) => `M 335 40 C 290 52, 236 70, 186 90 C 136 160, 82 248, 40 322 L 124 368 C 136 344, 146 320, 153 296
C 156 430, 152 610, 150 772 Q 430 780, 710 772 C 708 610, 704 430, 707 296 C 714 320, 724 344, 736 368 L 820 322
C 778 248, 724 160, 674 90 C 624 70, 570 52, 525 40 ${encolure[vue]} Z`;

// Ourlet de manche : parallèle au bord, un peu vers l'épaule.
const ourletManche = (a, b, axe) => {
  const p = (t, d) => [a[0] + (b[0] - a[0]) * t + axe[0] * d, a[1] + (b[1] - a[1]) * t + axe[1] * d];
  const [d1, d2] = [p(0.06, 13), p(0.9, 13)];
  return `M ${d1[0].toFixed(1)} ${d1[1].toFixed(1)} L ${d2[0].toFixed(1)} ${d2[1].toFixed(1)}`;
};

function tshirt(vue, c, motif) {
  const id = `${vue}-${c.logo}`;
  const ombres = [3, 6, 9, 12].map((d) => `<path d="${silhouette(vue)}" transform="translate(0 ${d})" fill="#000" opacity="${c === couleurs.noir ? 0.05 : 0.03}"/>`).join('');
  const col = vue === 'devant'
    ? `<path d="M 335 40 C 372 62, 488 62, 525 40 ${encolure.devant} Z" fill="${c.interieur}"/>
<path d="M 337 47 C 374 69, 486 69, 523 47" stroke="${c.cote}" stroke-width="14" fill="none" clip-path="url(#int-${id})" opacity=".7"/>
<rect x="418" y="64" width="24" height="14" rx="1.5" fill="${c.cote}" opacity=".9"/>
<path d="M 326 40 C 331 98, 376 135, 430 135 C 484 135, 529 98, 534 40" stroke="${c.cote}" stroke-width="18" fill="none" clip-path="url(#corps-${id})"/>
<path d="M 335 40 ${'C 340 92, 378 126, 430 126 C 482 126, 520 92, 525 40'}" stroke="${c.couture}" stroke-width="1.6" fill="none"/>
<path d="M 316 40 C 321 106, 372 145, 430 145 C 488 145, 539 106, 544 40" stroke="${c.couture}" stroke-width="1.2" stroke-dasharray="4 3" fill="none" clip-path="url(#corps-${id})"/>`
    : `<path d="M 327 42 C 352 64, 392 69, 430 69 C 468 69, 508 64, 533 42" stroke="${c.cote}" stroke-width="16" fill="none" clip-path="url(#corps-${id})"/>
<path d="M 318 44 C 345 74, 390 79, 430 79 C 470 79, 515 74, 542 44" stroke="${c.couture}" stroke-width="1.2" stroke-dasharray="4 3" fill="none" clip-path="url(#corps-${id})"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 800">
<defs>
<clipPath id="corps-${id}"><path d="${silhouette(vue)}"/></clipPath>
<clipPath id="int-${id}"><path d="M 335 40 C 372 62, 488 62, 525 40 ${encolure.devant} Z"/></clipPath>
<linearGradient id="cotes-${id}" x1="0" x2="1">
<stop offset="0" stop-color="#000" stop-opacity="${c.ombre}"/><stop offset=".2" stop-color="#000" stop-opacity="0"/>
<stop offset=".8" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${c.ombre}"/></linearGradient>
<linearGradient id="haut-${id}" y1="0" y2="1" x1="0" x2="0">
<stop offset="0" stop-color="#fff" stop-opacity="${c.lumiere}"/><stop offset=".5" stop-color="#fff" stop-opacity="${c.lumiere * 0.4}"/>
<stop offset="1" stop-color="#000" stop-opacity="${c.ombre * 0.6}"/></linearGradient>
<radialGradient id="pli-${id}"><stop offset="0" stop-color="#000" stop-opacity="${c.ombre * 0.7}"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
</defs>
${ombres}
<path d="${silhouette(vue)}" fill="${c.tissu}"/>
<g clip-path="url(#corps-${id})">
<rect width="860" height="800" fill="url(#cotes-${id})"/>
<rect width="860" height="800" fill="url(#haut-${id})"/>
<ellipse cx="178" cy="420" rx="34" ry="150" fill="url(#pli-${id})"/>
<ellipse cx="682" cy="420" rx="34" ry="150" fill="url(#pli-${id})"/>
<ellipse cx="430" cy="790" rx="300" ry="30" fill="url(#pli-${id})"/>
<path d="M 186 90 C 205 150, 196 240, 153 296 M 674 90 C 655 150, 664 240, 707 296" stroke="${c.couture}" stroke-width="1.4" fill="none" opacity=".8"/>
<path d="M 153 757 Q 430 765, 707 757" stroke="${c.couture}" stroke-width="1.2" stroke-dasharray="4 3" fill="none"/>
<path d="${ourletManche([40, 322], [124, 368], [0.5, -0.866])} ${ourletManche([820, 322], [736, 368], [-0.5, -0.866])}" stroke="${c.couture}" stroke-width="1.2" stroke-dasharray="4 3" fill="none"/>
</g>
${col}
<path d="${silhouette(vue)}" fill="none" stroke="${c.contour}" stroke-width="2"/>
${motif}
</svg>`;
}

// Cote de largeur au-dessus d'un motif.
const cote = (x, y, l, texte) => `<g stroke="#9b968f" stroke-width="1.3" fill="none">
<path d="M ${x} ${y} H ${x + l} M ${x} ${y - 6} V ${y + 6} M ${x + l} ${y - 6} V ${y + 6}"/></g>
<text x="${x + l / 2}" y="${y - 7}" text-anchor="middle" font-family="DM Sans" font-size="17" font-weight="600" fill="#7d7871">${texte}</text>`;

function maquette(nom, c) {
  const logo = logoSvg(c.logo);
  const hLogo = DEVANT.largeur * 274 / 1152;
  const xLogo = 430 + DEVANT.duMilieu - DEVANT.largeur / 2, yLogo = 126 + DEVANT.sousLeCol;
  const motifDevant = `${cote(xLogo, yLogo - 22, DEVANT.largeur, `${DEVANT.largeur / 10} cm`)}
<svg x="${xLogo}" y="${yLogo}" width="${DEVANT.largeur}" height="${hLogo}" viewBox="74 74 1152 274">${contenuLogo(logo)}</svg>`;
  const xDos = 430 - DOS.largeur / 2, yDos = 69 + DOS.sousLeCol;
  const motifDos = `${cote(xDos, yDos - 22, DOS.largeur, `${DOS.largeur / 10} cm`)}
<svg x="${xDos}" y="${yDos}" width="${DOS.largeur}" height="${DOS.hauteur}">${dos(c).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</svg>`;

  const puce = (texte) => `<li>${texte}</li>`;
  return `<section class="page">
<header>
<div class="marque">${logoSvg('couleur').replace('<svg ', '<svg class="logo" ')}</div>
<div class="titre"><h1>Maquette t-shirt</h1><p>T-shirt ${nom} · coton épais · devant et dos</p></div>
</header>
<main>
<figure><figcaption>Devant</figcaption>${tshirt('devant', c, motifDevant)}
<ul>${[`Logo côté cœur`, `${DEVANT.largeur / 10} cm de large`, `${DEVANT.sousLeCol / 10} cm sous le col`, `${DEVANT.duMilieu / 10} cm du milieu`].map(puce).join('')}</ul>
<p class="fichier">t-shirt-devant-${nom}.pdf</p></figure>
<figure><figcaption>Dos</figcaption>${tshirt('dos', c, motifDos)}
<ul>${[`Centré`, `${DOS.largeur / 10} × ${DOS.hauteur / 10} cm`, `${DOS.sousLeCol / 10} cm sous le col`].map(puce).join('')}</ul>
<p class="fichier">t-shirt-dos-${nom}.pdf</p></figure>
</main>
<footer>
<div><h2>Couleurs d'impression</h2><p><span class="pastille" style="background:${c.encre}"></span>${c.nomEncre} ${c.encre}</p><p><span class="pastille" style="background:${ROUGE}"></span>Rouge ${ROUGE}</p></div>
<div><h2>Mesures</h2><p>Données pour une taille L, à garder du S au XXL.</p></div>
<div><h2>Fichiers</h2><p>PDF vectoriels, fond transparent. Ne pas déformer le logo ni changer les couleurs.</p></div>
</footer>
</section>`;
}

const html = (corps, style) => `<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>
@font-face{font-family:'DM Sans';src:url(${police}) format('woff2');font-weight:100 1000}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans';color:#141414;-webkit-print-color-adjust:exact;print-color-adjust:exact}
${style}</style></head><body>${corps}</body></html>`;

const styleMaquette = `@page{size:297mm 210mm;margin:0}
.page{width:297mm;height:210mm;padding:11mm 14mm 10mm;background:#f4f3f1;display:flex;flex-direction:column;overflow:hidden}
header{display:flex;justify-content:space-between;align-items:flex-end;padding-bottom:4.5mm;border-bottom:.3mm solid #dfdcd7}
.logo{display:block;height:9mm;width:auto}
.titre{text-align:right}
h1{font-size:5.4mm;font-weight:700;letter-spacing:-.01em}
.titre p{font-size:3.1mm;color:#6f6a64;margin-top:.8mm}
main{flex:1;display:grid;grid-template-columns:1fr 1fr;gap:6mm;padding-top:4mm;min-height:0}
figure{display:flex;flex-direction:column;align-items:center;min-height:0}
figcaption{font-size:2.7mm;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#8a857e}
figure>svg{width:100%;height:auto;margin-top:1mm}
ul{list-style:none;display:flex;gap:1.6mm;flex-wrap:wrap;justify-content:center;margin-top:1mm}
li{font-size:2.8mm;font-weight:500;background:#fff;border:.25mm solid #e2dfda;border-radius:10mm;padding:.9mm 2.6mm}
.fichier{font-size:2.5mm;color:#8a857e;margin-top:1.4mm}
footer{display:grid;grid-template-columns:1fr 1fr 1.3fr;gap:8mm;border-top:.3mm solid #dfdcd7;padding-top:3.5mm}
h2{font-size:2.5mm;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#8a857e;margin-bottom:1.2mm}
footer p{font-size:2.8mm;line-height:1.45;display:flex;align-items:center;gap:1.6mm}
.pastille{width:3.2mm;height:3.2mm;border-radius:50%;border:.25mm solid #cfcac4;flex:none}`;

// Chrome : PDF vectoriel et capture PNG (fond transparent si demandé).
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'ely-t-shirt-'));
function rendre(nom, contenu, { pdf, png }) {
  const fichier = path.join(temp, `${nom}.html`);
  fs.writeFileSync(fichier, contenu);
  const base = ['--headless=new', '--disable-gpu', '--hide-scrollbars', `file://${fichier}`];
  if (pdf) execFileSync(chrome, ['--no-pdf-header-footer', `--print-to-pdf=${path.resolve(pdf)}`, ...base], { stdio: 'ignore' });
  if (png) execFileSync(chrome, [`--screenshot=${path.resolve(png.fichier)}`, `--window-size=${png.l},${png.h}`,
    `--force-device-scale-factor=${png.echelle}`, ...(png.transparent ? ['--default-background-color=00000000'] : []), ...base], { stdio: 'ignore' });
}

// Ne vide que les fichiers de ce script : le sous-dossier photo (scripts/photo-t-shirt.mjs) reste.
fs.mkdirSync(sortie, { recursive: true });
for (const f of fs.readdirSync(sortie, { withFileTypes: true })) if (f.isFile()) fs.rmSync(path.join(sortie, f.name));
for (const [nom, c] of Object.entries(couleurs)) {
  for (const ext of ['pdf', 'png']) fs.copyFileSync(`${logos}/ely-facade-logo-${c.logo}.${ext}`, `${sortie}/t-shirt-devant-${nom}.${ext}`);

  const artDos = dos(c);
  rendre(`dos-${nom}-pdf`, html(artDos, `@page{size:${DOS.largeur}mm ${DOS.hauteur}mm;margin:0}svg{display:block}`), { pdf: `${sortie}/t-shirt-dos-${nom}.pdf` });
  rendre(`dos-${nom}-png`, html(artDos.replace(/width="[\d.]+mm" height="[\d.]+mm"/, `width="${DOS.largeur * 4}" height="${DOS.hauteur * 4}"`), 'html,body{background:transparent}svg{display:block}'),
    { png: { fichier: `${sortie}/t-shirt-dos-${nom}.png`, l: DOS.largeur * 4, h: DOS.hauteur * 4, echelle: 3, transparent: true } });

  const page = html(maquette(nom, c), styleMaquette);
  rendre(`maquette-${nom}`, page, { pdf: `${sortie}/maquette-t-shirt-${nom}.pdf` });
  rendre(`maquette-${nom}-png`, page, { png: { fichier: `${sortie}/maquette-t-shirt-${nom}.png`, l: 1123, h: 794, echelle: 2.5 } });
}
fs.rmSync(temp, { recursive: true });
