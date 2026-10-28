/**
 * Fabrique la carte de visite d'Elisei (design/carte-visite) : PDF recto-verso au gabarit Vistaprint
 * (88 × 58 mm, carte finie 85 × 55 mm, fonds perdus 1,5 mm), polices incorporées ; PNG en 91 × 61 mm, PNG du recto et du verso, et une image de présentation.
 * Le QR code mène au site. À relancer si le logo ou les infos changent : node scripts/exporter-carte-visite.mjs
 * (après exporter-logo-impression.mjs ; Google Chrome requis).
 */
import QRCode from 'qrcode';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const logos = 'design/logo/impression';
const sortie = 'design/carte-visite';
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
// Polices statiques (DM Sans 600 et 800, tirées de la version variable par fonttools) : les imprimeurs refusent les PDF à polices variables.
const police = (poids) => pathToFileURL(path.resolve(`design/polices/dmsans-${poids}.ttf`)).href;
const telephone = fs.readFileSync('src/data/entreprise.ts', 'utf8').match(/telephoneAffiche: '([^']+)'/)[1];
const site = new URL(fs.readFileSync('astro.config.mjs', 'utf8').match(/const SITE = '([^']+)'/)[1]);

const email = 'info@elyfacade.be';
const NOIR = '#141414', ROUGE = '#C8202B';
const contenu = (svg) => svg.replace(/^<svg[^>]*>\n?/, '').replace(/<\/svg>\s*$/, '');
const lire = (nom) => fs.readFileSync(`${logos}/ely-facade-${nom}.svg`, 'utf8');
const logoHorizontal = (v, l) => `<svg width="${l}mm" viewBox="74 74 1152 274" fill="none" style="display:block">${contenu(lire(`logo-${v}`))}</svg>`;
const maison = (v, h) => `<svg height="${h}mm" viewBox="74 74 240 273" fill="none" style="display:block">${contenu(lire(`icone-${v}`))}</svg>`;

// QR code : modules carrés, fond blanc, marge de 2 modules.
const qr = QRCode.create(site.href, { errorCorrectionLevel: 'M' });
const n = qr.modules.size, marge = 2;
let cases = '';
for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (qr.modules.get(x, y)) cases += `M${x + marge} ${y + marge}h1v1h-1z`;
const qrSvg = `<svg viewBox="0 0 ${n + 2 * marge} ${n + 2 * marge}" style="display:block;width:100%;height:100%"><rect width="100%" height="100%" fill="#fff"/><path d="${cases}" fill="${NOIR}"/></svg>`;

const css = `@font-face{font-family:'DM Sans';src:url(${police(600)});font-weight:100 699}
@font-face{font-family:'DM Sans';src:url(${police(800)});font-weight:700 900}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans';-webkit-print-color-adjust:exact;print-color-adjust:exact}
.carte{position:relative;width:91mm;height:61mm;overflow:hidden}
.sur{position:absolute;inset:3mm}`;

// 91 × 61 mm : 3 mm de fonds perdus de chaque côté. Tout ce qui compte reste à 5 mm du bord fini.
const slogan = 'Rénovation de façades · Gevelrenovatie';

/** Briques du logo répétées sur toute la carte (une seule brique rouge). Unités : mm. */
function briques(fond, { rouge = [3, 2], masque = '' } = {}) {
  const l = 12.25, h = 6.3, pasX = 13.8, pasY = 7.9;
  let r = '', rougeSvg = '';
  for (let y = 0, j = 0; y < 61; y += pasY, j++) for (let x = (j % 2 ? -pasX / 2 : 0), i = 0; x < 91; x += pasX, i++) {
    if (j === rouge[1] && i === rouge[0]) rougeSvg = `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${l}" height="${h}" fill="${ROUGE}"/>`;
    else r += `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${l}" height="${h}" fill="${fond}"/>`;
  }
  const svg = (contenu, style = '') => `<svg viewBox="0 0 91 61" style="position:absolute;inset:0;width:91mm;height:61mm;${style}">${contenu}</svg>`;
  return svg(r, masque) + svg(rougeSvg);
}

const carte = (fond, fg, contenu) => `<div class="carte" style="background:${fond};color:${fg}">${contenu}</div>`;
const sur = (style, contenu) => `<div class="sur" style="${style}">${contenu}</div>`;

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'ely-carte-'));
const page = (corps, extra = '') => `<!doctype html><html><head><meta charset="utf-8"><style>${css}${extra}</style></head><body>${corps}</body></html>`;
function rendre(nom, html, args) {
  const f = path.join(temp, `${nom}.html`);
  fs.writeFileSync(f, html);
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', ...args, `file://${f}`], { stdio: 'ignore' });
}

/** Mesure des textes dans Chrome, polices chargées, pour un corps de 1 mm : encre (décalage à gauche, largeur, hauteur au-dessus
 *  et en dessous de la ligne de base) et position de la ligne de base dans une ligne de hauteur 1. */
function mesurer(textes) {
  const f = path.join(temp, 'mesure.html');
  fs.writeFileSync(f, page(`<script>
Promise.all([document.fonts.load('600 100px "DM Sans"'), document.fonts.load('800 100px "DM Sans"')]).then(() => {
  const ctx = document.createElement('canvas').getContext('2d');
  document.title = JSON.stringify(${JSON.stringify(textes)}.map(([texte, poids, espacement = 0]) => {
    ctx.font = poids + ' 100px "DM Sans"';
    ctx.letterSpacing = espacement * 100 + 'px';
    const m = ctx.measureText(texte), hauteur = m.fontBoundingBoxAscent + m.fontBoundingBoxDescent;
    return { gauche: -m.actualBoundingBoxLeft / 100, largeur: (m.actualBoundingBoxLeft + m.actualBoundingBoxRight) / 100,
      haut: m.actualBoundingBoxAscent / 100, bas: m.actualBoundingBoxDescent / 100, base: ((100 - hauteur) / 2 + m.fontBoundingBoxAscent) / 100 };
  }));
});
</script>`));
  const dom = execFileSync(chrome, ['--headless=new', '--disable-gpu', '--virtual-time-budget=5000', '--dump-dom', `file://${f}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  return JSON.parse(dom.match(/<title>(.*?)<\/title>/)[1]);
}

// Recto : mur de briques et logo centré.
const recto = carte(NOIR, '#fff', `${briques('#1f1f1f', { rouge: [5, 6], masque: '-webkit-mask-image:radial-gradient(ellipse 62% 70% at 50% 50%,transparent 38%,#000 92%)' })}
${sur('display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5.5mm', `${logoHorizontal('fond-sombre', 56)}
<div style="width:9mm;height:.5mm;background:${ROUGE}"></div>
<div style="font-size:2.1mm;font-weight:600;letter-spacing:.22em;text-transform:uppercase">${slogan}</div>`)}`);

// Verso : grille à deux colonnes, en mm sur la carte de 91 × 61 (contenu entre x 8 et 83, y 8 et 53, soit 5 mm du bord fini).
// Deux colonnes de même largeur : en haut, le logo à gauche et le nom sur une ligne à droite, aussi larges l'un que l'autre
// (leurs lettres ont alors la même hauteur) et posés sur la même ligne de base ; le trait rouge finit au bas de la maison.
// En bas, le QR code et le lien du site, exactement aussi large que lui ; les infos commencent au haut du QR code et finissent
// sur la ligne de base du lien, écrites dans le même corps que lui ; les filets ont la largeur du nom.
const lien = `www.${site.hostname}`, nom = 'Elisei Ungureanu';
const [mLien, mNom, mH] = mesurer([[lien, 600], [nom, 800, -0.02], ['H', 600]]);
const gauche = 8, droite = 83, haut = 8, bas = 53, gouttiere = 7;
const colonne = (droite - gauche - gouttiere) / 2, droiteX = gauche + colonne + gouttiere;
const hLogo = colonne * 274 / 1152;
const baseLogo = haut + hLogo * 182 / 274, maisonBas = haut + hLogo * 267 / 274;
const corpsNom = colonne / mNom.largeur, corpsEtiquette = 1.5;
// Le QR code prend toute la hauteur libre sous le logo (6 mm d'écart) ; le corps du lien en découle.
const tailleQr = (bas - maisonBas - 6 - 1.8) / (1 + (mLien.haut + mLien.bas) / mLien.largeur), corps = tailleQr / mLien.largeur;
const baseLien = bas - mLien.bas * corps;
const qrHaut = baseLien - mLien.haut * corps - 1.8 - tailleQr;
const mm = (v) => `${v.toFixed(3)}mm`;
const place = (x, y, style, contenu) => `<div style="position:absolute;left:${mm(x)};top:${mm(y)};${style}">${contenu}</div>`;
const texte = (taille, poids, style = '') => `font-size:${mm(taille)};font-weight:${poids};line-height:1;white-space:nowrap;${style}`;
const filet = '<div style="height:.25mm;background:rgba(255,255,255,.2)"></div>';
const info = (etiquette, valeur) => `<div><div style="${texte(corpsEtiquette, 600, 'letter-spacing:.2em;text-transform:uppercase;opacity:.5;margin-bottom:1.2mm')}">${etiquette}</div><div style="${texte(corps, 600, 'line-height:1.2')}">${valeur}</div></div>`;
const infosHaut = qrHaut - (mH.base - mH.haut) * corpsEtiquette, infosBas = baseLien + (1.1 - mH.base) * corps;

const verso = carte(NOIR, '#fff', `
${place(gauche, haut, '', logoHorizontal('fond-sombre', colonne))}
${place(droiteX - mNom.gauche * corpsNom, baseLogo - mNom.base * corpsNom, texte(corpsNom, 800, 'letter-spacing:-.02em'), nom)}
${place(droiteX, maisonBas - 0.45, `width:7mm;height:.45mm;background:${ROUGE}`, '')}
${place(gauche, qrHaut, `width:${mm(tailleQr)};height:${mm(tailleQr)};border-radius:1.2mm;overflow:hidden`, qrSvg)}
${place(gauche - mLien.gauche * corps, baseLien - mLien.base * corps, texte(corps, 600), lien)}
${place(droiteX, infosHaut, `width:${mm(droite - droiteX)};height:${mm(infosBas - infosHaut)};display:flex;flex-direction:column;justify-content:space-between`,
  `${info('Tel.', telephone)}${filet}${info('Email', email)}${filet}${info('Bureau · Kantoor', 'Bergensesteenweg 745<br>1502 Halle')}`)}`);

fs.rmSync(sortie, { recursive: true, force: true });
fs.mkdirSync(sortie, { recursive: true });
const px = (mm) => Math.round(mm * 3.7795);

// PDF pour l'imprimeur : page 1 recto, page 2 verso, fonds perdus compris.
// Gabarit Vistaprint : 88 × 58 mm (carte finie 85 × 55 mm, 1,5 mm de fonds perdus). On rogne 1,5 mm de la mise en page de 91 × 61 mm.
const feuille = (face) => `<div style="position:relative;width:88mm;height:58mm;overflow:hidden"><div style="position:absolute;left:-1.5mm;top:-1.5mm">${face}</div></div>`;
// Un fichier par face (Vistaprint importe mieux une page à la fois) : PDF vectoriel et PNG à 600 dpi, au gabarit exact.
for (const [face, html] of [['recto', recto], ['verso', verso]]) {
  rendre(`${face}-pdf`, page(feuille(html), '@page{size:88mm 58mm;margin:0}'),
    ['--no-pdf-header-footer', `--print-to-pdf=${path.resolve(sortie, `carte-visite-${face}.pdf`)}`]);
  rendre(`${face}-impression`, page(`<div style="width:${px(88)}px;height:${px(58)}px">${feuille(html)}</div>`, 'html,body{margin:0}'),
    [`--screenshot=${path.resolve(sortie, `carte-visite-${face}-600dpi.png`)}`, `--window-size=${px(88)},${px(58)}`, '--force-device-scale-factor=6.25']);
}

// PNG de chaque face pour la présentation (91 × 61 mm).
for (const [face, html] of [['recto', recto], ['verso', verso]]) {
  rendre(face, page(`<div style="width:${px(91)}px;height:${px(61)}px;overflow:hidden">${html}</div>`, 'html,body{margin:0}'),
    [`--screenshot=${path.resolve(sortie, `carte-visite-${face}.png`)}`, `--window-size=${px(91)},${px(61)}`, '--force-device-scale-factor=3.125']);
}

// Présentation : les deux faces posées sur une table, légèrement décalées.
const ombre = 'box-shadow:0 .3mm .6mm rgba(0,0,0,.18),0 4mm 9mm rgba(0,0,0,.22),0 9mm 22mm rgba(0,0,0,.14)';
const vignette = (face, style) => `<div style="position:absolute;width:85mm;height:55mm;border-radius:1.2mm;overflow:hidden;${ombre};${style}"><img src="${pathToFileURL(path.resolve(sortie, `carte-visite-${face}.png`)).href}" style="position:absolute;left:-3mm;top:-3mm;width:91mm;height:61mm"></div>`;
rendre('presentation', page(`<div style="position:relative;width:210mm;height:140mm;background:radial-gradient(120% 120% at 30% 20%,#f3f1ed,#d9d6d0)">
${vignette('verso', 'left:106mm;top:66mm;transform:rotate(5deg)')}${vignette('recto', 'left:14mm;top:20mm;transform:rotate(-4deg)')}</div>`, 'html,body{margin:0}'),
  [`--screenshot=${path.resolve(sortie, 'carte-visite-presentation.png')}`, `--window-size=${px(210)},${px(140)}`, '--force-device-scale-factor=2']);

fs.rmSync(temp, { recursive: true });
