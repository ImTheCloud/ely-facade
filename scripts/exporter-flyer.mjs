/**
 * Fabrique les supports d'Ely Facade à partir des textes et des photos du site : flyer A5 recto verso et panneau de chantier
 * (120 × 80 cm). PNG pour les aperçus, PDF avec 3 mm de fonds perdus pour l'imprimeur.
 * À relancer si le logo, les services ou les infos changent : node scripts/exporter-flyer.mjs (Google Chrome requis).
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const url = (p) => pathToFileURL(path.resolve(p)).href;
const fr = fs.readFileSync('src/i18n/fr.ts', 'utf8');
const telephone = fs.readFileSync('src/data/entreprise.ts', 'utf8').match(/telephoneAffiche: '([^']+)'/)[1];
const services = [...fr.slice(fr.indexOf('metiers: {'), fr.indexOf('metiers: {') + 9000).matchAll(/titre: '([^']+)'/g)].map((m) => m[1]).slice(0, 10);
const NOIR = '#141414', ROUGE = '#C8202B';
const logo = (v, h) => `<img src="${url(`design/logo/impression/ely-facade-logo-${v}.svg`)}" style="height:${h};display:block">`;
const qr = (c) => `<img src="${url('design/qr-code/qr-code-ely-facade.svg')}" style="width:${c};height:${c};display:block;border-radius:1.4mm">`;
const briques = (c, t = 12) => `<svg style="position:absolute;inset:0;width:100%;height:100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="b" width="${t * 2}mm" height="${t}mm" patternUnits="userSpaceOnUse"><g fill="${c}"><rect x=".5mm" y=".5mm" width="${t * 2 - 1}mm" height="${t / 2 - 1}mm"/><rect x="${-t + 0.5}mm" y="${t / 2 + 0.5}mm" width="${t * 2 - 1}mm" height="${t / 2 - 1}mm"/><rect x="${t + 0.5}mm" y="${t / 2 + 0.5}mm" width="${t * 2 - 1}mm" height="${t / 2 - 1}mm"/></g></pattern></defs><rect width="100%" height="100%" fill="url(#b)"/></svg>`;
const css = `@font-face{font-family:'DM Sans';src:url(${url('design/polices/dmsans-600.ttf')});font-weight:100 699}@font-face{font-family:'DM Sans';src:url(${url('design/polices/dmsans-800.ttf')});font-weight:700 900}
*{box-sizing:border-box;margin:0;padding:0}html{-webkit-print-color-adjust:exact;print-color-adjust:exact}body{font-family:'DM Sans';color:${NOIR}}
.page{position:relative;overflow:hidden;background:#fff}.couvre{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}`;
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'ely-flyer-'));
// l et h : le format fini en mm. Le dessin déborde de 3 mm de chaque côté.
function rendre(dossier, nom, corps, l, h, echelle = 1) {
  fs.mkdirSync(dossier, { recursive: true });
  const L = l + 6, H = h + 6;
  const f = path.join(temp, 'p.html');
  const html = (bord) => `<!doctype html><meta charset="utf-8"><style>${css}@page{size:${L}mm ${H}mm;margin:0}.page{width:${L}mm;height:${H}mm;${bord}}</style><div class="page">${corps}</div>`;
  fs.writeFileSync(f, html(''));
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=5000', `--print-to-pdf=${path.resolve(dossier, `${nom}.pdf`)}`, `file://${f}`], { stdio: 'ignore' });
  // L'aperçu : le format fini, sans les fonds perdus.
  fs.writeFileSync(f, html('margin:-3mm'));
  const px = (mm) => Math.round(mm * 96 / 25.4);
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--force-device-scale-factor=${echelle}`, `--window-size=${px(l)},${px(h)}`, '--virtual-time-budget=5000', `--screenshot=${path.resolve(dossier, `${nom}.png`)}`, `file://${f}`], { stdio: 'ignore' });
}

rendre('design/flyer', 'flyer-recto', `
  <img class="couvre" src="${url('src/assets/photos/accueil/hero-namur-mobile.jpg')}" style="height:62%;object-position:50% 40%">
  <div style="position:absolute;left:0;right:0;top:0;height:62%;background:linear-gradient(180deg,rgb(12 14 18/.82),rgb(12 14 18/0) 38%,rgb(12 14 18/0) 60%,rgb(20 20 20/.5))"></div>
  <div style="position:absolute;left:13mm;top:13mm">${logo('blanc', '12mm')}</div>
  <div style="position:absolute;left:0;right:0;bottom:0;height:41%;background:${NOIR}">${briques('#1b1b1b', 14)}</div>
  <div style="position:absolute;left:13mm;right:13mm;top:53.5%;color:#fff">
    <p style="font-weight:800;font-size:17.4mm;line-height:.94;letter-spacing:-.045em">Votre façade<br>mérite de<br>briller<span style="display:inline-block;width:5.6mm;height:3.4mm;margin-left:1.2mm;background:${ROUGE}"></span></p>
  </div>
  <div style="position:absolute;left:13mm;right:13mm;bottom:13mm;display:flex;align-items:flex-end;justify-content:space-between;color:#fff">
    <div><p style="font-size:3.7mm;font-weight:600;opacity:.82">Rénovation de façades, partout en Belgique</p><p style="margin-top:2mm;font-weight:800;font-size:9.4mm;letter-spacing:-.02em;line-height:1">${telephone}</p></div>
    <div style="padding:1.6mm;border-radius:2mm;background:#fff">${qr('19mm')}</div>
  </div>`, 148, 210, 2.2);

rendre('design/flyer', 'flyer-verso', `
  <div style="position:absolute;inset:0;background:#FBFBFA"></div>
  <div style="position:absolute;left:13mm;right:13mm;top:14mm">
    <p style="font-weight:800;font-size:11mm;line-height:1;letter-spacing:-.04em">Toute la façade,<br>de A à <span style="color:${ROUGE}">Z.</span></p>
    <ul style="display:grid;grid-template-columns:1fr 1fr;gap:0 7mm;margin-top:7mm;list-style:none">${services.map((s) => `<li style="display:flex;gap:2.4mm;align-items:center;padding:2.1mm 0;border-bottom:.25mm solid #ddd;font-weight:600;font-size:3.9mm"><span style="flex:none;width:3.6mm;height:2.2mm;background:${ROUGE}"></span>${s}</li>`).join('')}</ul>
  </div>
  <div style="position:absolute;left:13mm;right:13mm;top:93mm;height:56mm;display:grid;grid-template-columns:1fr 1fr;gap:2mm">
    ${[['pendant-pignon', 'Pendant les travaux'], ['apres-pignon', 'Après']].map(([p, t]) => `<figure style="position:relative;overflow:hidden;border-radius:2.4mm"><img class="couvre" src="${url(`src/assets/photos/halle-maison/${p}.jpg`)}"><figcaption style="position:absolute;left:2.4mm;top:2.4mm;padding:1mm 2.4mm;border-radius:4mm;background:${t === 'Après' ? '#fff' : NOIR};color:${t === 'Après' ? NOIR : '#fff'};font-weight:600;font-size:2.8mm">${t}</figcaption></figure>`).join('')}
  </div>
  <div style="position:absolute;left:13mm;right:13mm;top:155mm;display:grid;grid-template-columns:repeat(3,1fr);gap:4mm">
    ${[['Gratuite', 'La visite, sans engagement'], ['10 ans', 'De garantie minimum'], ['50+', 'Chantiers']].map(([a, b]) => `<div style="border-top:.9mm solid ${ROUGE};padding-top:2mm"><p style="font-weight:800;font-size:7mm;letter-spacing:-.03em;line-height:1">${a}</p><p style="margin-top:1mm;font-size:3.2mm;font-weight:600;color:#555">${b}</p></div>`).join('')}
  </div>
  <div style="position:absolute;left:0;right:0;bottom:0;height:37mm;background:${NOIR}">${briques('#1b1b1b', 14)}</div>
  <div style="position:absolute;left:13mm;right:13mm;bottom:12mm;display:flex;align-items:center;justify-content:space-between;color:#fff">${logo('fond-sombre', '9mm')}<div style="text-align:right;font-weight:600;font-size:3.6mm;line-height:1.5"><b style="font-weight:800;font-size:6mm">${telephone}</b><br>info@elyfacade.be<br>www.elyfacade.be</div></div>`, 148, 210, 2.2);

rendre('design/panneau', 'panneau-chantier', `
  <div style="position:absolute;inset:0;background:${NOIR}">${briques('#1c1c1c', 92)}</div>
  <div style="position:absolute;left:78mm;top:84mm">${logo('fond-sombre', '190mm')}</div>
  <p style="position:absolute;left:78mm;top:330mm;color:#fff;font-weight:600;font-size:37mm;letter-spacing:.1em;white-space:nowrap">RÉNOVATION DE FAÇADES · GEVELRENOVATIE</p>
  <div style="position:absolute;left:78mm;right:78mm;top:416mm;height:6mm;background:${ROUGE}"></div>
  <p style="position:absolute;left:78mm;top:458mm;color:#fff;font-weight:800;font-size:164mm;letter-spacing:-.025em;line-height:1;white-space:nowrap">${telephone}</p>
  <p style="position:absolute;left:78mm;top:640mm;color:#fff;font-weight:600;font-size:56mm">www.elyfacade.be</p>
  <div style="position:absolute;right:78mm;top:78mm;padding:11mm;border-radius:14mm;background:#fff">${qr('178mm')}</div>`, 1200, 800, 0.42);
