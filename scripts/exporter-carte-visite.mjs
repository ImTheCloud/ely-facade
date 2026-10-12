/**
 * Fabrique la carte de visite d'Elisei (design/carte-visite) : PDF recto-verso avec fonds perdus (91 × 61 mm,
 * carte finie 85 × 55 mm), PNG du recto et du verso, et une image de présentation pour le client.
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
const police = pathToFileURL(path.resolve('node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2')).href;
const telephone = fs.readFileSync('src/data/entreprise.ts', 'utf8').match(/telephoneAffiche: '([^']+)'/)[1];
const site = new URL(fs.readFileSync('astro.config.mjs', 'utf8').match(/const SITE = '([^']+)'/)[1]);

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

const css = `@font-face{font-family:'DM Sans';src:url(${police}) format('woff2');font-weight:100 1000}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans';-webkit-print-color-adjust:exact;print-color-adjust:exact}
.carte{position:relative;width:91mm;height:61mm;overflow:hidden}
.sur{position:absolute;inset:3mm}`;

// 91 × 61 mm : 3 mm de fonds perdus de chaque côté. Tout ce qui compte reste à 5 mm du bord fini.
const recto = `<div class="carte" style="background:#fff">
<div class="sur" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5.5mm">
${logoHorizontal('couleur', 56)}
<div style="width:9mm;height:.5mm;background:${ROUGE}"></div>
<div style="font-size:2.1mm;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:${NOIR}">Rénovation de façades · Gevelrenovatie</div>
</div></div>`;

const verso = `<div class="carte" style="background:${NOIR};color:#fff">
<div style="position:absolute;left:0;top:0;bottom:0;width:2mm;background:${ROUGE}"></div>
<div class="sur" style="left:9mm;right:8mm;top:8mm;bottom:8mm;display:flex;justify-content:space-between">
<div style="display:flex;flex-direction:column;justify-content:space-between">
<div>${maison('fond-sombre', 9)}
<div style="font-size:4.6mm;font-weight:700;letter-spacing:-.01em;margin-top:3.6mm;line-height:1.1">Elisei Ungureanu</div>
<div style="font-size:2.3mm;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:${ROUGE};margin-top:1.2mm;filter:brightness(1.25)">Gérant</div></div>
<div style="font-size:2.7mm;line-height:1.65;font-weight:500">
<div style="font-size:3.5mm;font-weight:700;margin-bottom:.5mm">${telephone}</div>
<div>${site.hostname}</div>
<div style="opacity:.72">Bergensesteenweg 745 · 1502 Halle</div></div>
</div>
<div style="display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:1.6mm">
<div style="width:20mm;height:20mm;border-radius:1.2mm;overflow:hidden">${qrSvg}</div>
<div style="font-size:1.9mm;font-weight:600;letter-spacing:.18em;text-transform:uppercase;opacity:.8">Toute la Belgique</div>
</div></div></div>`;

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'ely-carte-'));
const page = (corps, extra = '') => `<!doctype html><html><head><meta charset="utf-8"><style>${css}${extra}</style></head><body>${corps}</body></html>`;
function rendre(nom, html, args) {
  const f = path.join(temp, `${nom}.html`);
  fs.writeFileSync(f, html);
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', ...args, `file://${f}`], { stdio: 'ignore' });
}

fs.rmSync(sortie, { recursive: true, force: true });
fs.mkdirSync(sortie, { recursive: true });

// PDF pour l'imprimeur : page 1 recto, page 2 verso, fonds perdus compris.
rendre('imprimeur', page(`<div style="page-break-after:always">${recto}</div>${verso}`, '@page{size:91mm 61mm;margin:0}'),
  ['--no-pdf-header-footer', `--print-to-pdf=${path.resolve(sortie, 'carte-visite-imprimeur.pdf')}`]);

// PNG de chaque face (300 dpi environ), fonds perdus compris (91 × 61 mm).
const px = (mm) => Math.round(mm * 3.7795);
for (const [nom, face] of [['recto', recto], ['verso', verso]]) {
  rendre(nom, page(`<div style="width:${px(91)}px;height:${px(61)}px;overflow:hidden">${face}</div>`, 'html,body{margin:0}'),
    [`--screenshot=${path.resolve(temp, `${nom}-large.png`)}`, `--window-size=${px(91)},${px(61)}`, '--force-device-scale-factor=3.125']);
}

// Image de présentation : deux cartes posées sur un fond clair, légèrement décalées, avec ombre.
const imgs = ['recto', 'verso'].map((n) => pathToFileURL(path.resolve(temp, `${n}-large.png`)).href);
const carte = (src, style) => `<div style="position:absolute;width:85mm;height:55mm;border-radius:1.2mm;overflow:hidden;box-shadow:0 .3mm .6mm rgba(0,0,0,.18),0 4mm 9mm rgba(0,0,0,.22),0 9mm 22mm rgba(0,0,0,.14);${style}"><img src="${src}" style="position:absolute;left:-3mm;top:-3mm;width:91mm;height:61mm"></div>`;
rendre('presentation', page(`<div style="position:relative;width:210mm;height:140mm;background:radial-gradient(120% 120% at 30% 20%,#f3f1ed,#d9d6d0)">
${carte(imgs[1], 'left:106mm;top:66mm;transform:rotate(5deg)')}
${carte(imgs[0], 'left:14mm;top:20mm;transform:rotate(-4deg)')}</div>`, 'html,body{margin:0}'),
  [`--screenshot=${path.resolve(sortie, 'carte-visite-presentation.png')}`, `--window-size=${px(210)},${px(140)}`, '--force-device-scale-factor=2']);

for (const nom of ['recto', 'verso']) fs.copyFileSync(path.join(temp, `${nom}-large.png`), path.join(sortie, `carte-visite-${nom}.png`));
fs.rmSync(temp, { recursive: true });
