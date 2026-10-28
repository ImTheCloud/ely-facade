/**
 * Fabrique l'image affichée quand on partage le site sur WhatsApp,
 * Facebook ou LinkedIn (1200 × 630), en français et en néerlandais :
 * le logo et le titre de l'accueil à gauche, la photo du haut de l'accueil (l'immeuble de Namur)
 * à droite, cadrée sur l'immeuble entier (toit compris), avec peu de ciel.
 *
 * Rendue par le navigateur (Playwright) pour avoir exactement les polices
 * du site ; la photo passe d'abord par sharp (sans métadonnées).
 *
 * Usage : node scripts/generer-image-partage.mjs
 * Sortie : src/assets/partage.jpg (FR) et src/assets/partage-nl.jpg (NL).
 */
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright';
import sharp from 'sharp';

const enBase64 = (chemin, type) => `data:${type};base64,${readFileSync(chemin).toString('base64')}`;
const police = (nom) => enBase64(`node_modules/@fontsource-variable/${nom}/files/${nom}-latin-wght-normal.woff2`, 'font/woff2');
const photo = `data:image/jpeg;base64,${(await sharp('src/assets/photos/accueil/hero-namur.jpg').resize(1700).jpeg({ quality: 90 }).toBuffer()).toString('base64')}`;
const logo = enBase64('src/assets/marque/logo.svg', 'image/svg+xml');

// Les titres sont ceux de l'accueil (src/i18n).
const textes = {
  fr: { titre: ['Votre façade', 'mérite de'], lumiere: 'briller', pied: 'Visite gratuite · 0492 43 96 17', sortie: 'src/assets/partage.jpg' },
  nl: { titre: ['Uw gevel', 'verdient te'], lumiere: 'stralen', pied: 'Gratis plaatsbezoek · 0492 43 96 17', sortie: 'src/assets/partage-nl.jpg' },
};

const page = (t) => `<!doctype html><html><head><style>
  @font-face { font-family: 'Bricolage'; src: url(${police('bricolage-grotesque')}); font-weight: 200 800; font-stretch: 75% 100%; }
  @font-face { font-family: 'DM Sans'; src: url(${police('dm-sans')}); font-weight: 100 1000; }
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; display: flex; align-items: center; gap: 32px; padding: 0 40px 0 56px; background: #fbfbfa; color: #1f2429; font-family: 'DM Sans'; }
  .texte { flex: 1; display: flex; flex-direction: column; height: 540px; }
  .logo { height: 62px; align-self: flex-start; }
  h1 { margin-top: auto; font: 800 48px/0.95 'Bricolage'; letter-spacing: -0.03em; text-transform: uppercase; }
  h1 span { display: block; }
  h1 .lumiere { color: #c8202b; }
  .brique { display: inline-block; width: 0.36em; height: 0.2em; margin-left: 0.06em; background: #c8202b; border-radius: 2px; }
  .trait { width: 64px; height: 4px; margin-top: 26px; background: #c8202b; }
  .pied { margin-top: auto; font: 650 23px/1.2 'DM Sans'; white-space: nowrap; }
  .site { margin-top: 8px; font: 500 21px/1 'DM Sans'; color: #4a5058; }
  .cadre { position: relative; width: 690px; height: 460px; border-radius: 28px; overflow: hidden; box-shadow: 0 18px 50px -12px rgba(31, 36, 41, 0.35); }
  /* Photo agrandie de 25 % et calée sur l'immeuble : le toit, la façade entière et la pelouse restent visibles, avec peu de ciel. */
  .cadre img { position: absolute; left: -67px; top: -136px; width: 125%; height: auto; }
</style></head><body>
  <div class="texte">
    <img class="logo" src="${logo}" alt="">
    <h1>${t.titre.map((ligne) => `<span>${ligne}</span>`).join('')}<span class="lumiere">${t.lumiere}<i class="brique"></i></span></h1>
    <div class="trait"></div>
    <p class="pied">${t.pied}</p>
    <p class="site">elyfacade.be</p>
  </div>
  <div class="cadre"><img src="${photo}" alt=""></div>
</body></html>`;

const navigateur = await chromium.launch();
const onglet = await navigateur.newPage({ viewport: { width: 1200, height: 630 } });
for (const [langue, t] of Object.entries(textes)) {
  await onglet.setContent(page(t));
  await onglet.evaluate(() => document.fonts.ready);
  const png = await onglet.screenshot({ type: 'png' });
  // Repassé par sharp : JPEG léger (WhatsApp préfère moins de 300 Ko), aucune métadonnée.
  await sharp(png).jpeg({ quality: 84, mozjpeg: true }).toFile(t.sortie);
  console.log(`image de partage (${langue}) →`, t.sortie);
}
await navigateur.close();
