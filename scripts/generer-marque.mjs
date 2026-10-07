/**
 * Fabrique, à partir des SVG du logo (src/assets/marque), les fichiers qui
 * doivent être des images : favicon, icône iPhone et image de partage (WhatsApp, Facebook).
 * À relancer si le logo change : node scripts/generer-marque.mjs
 */
import sharp from 'sharp';
import fs from 'node:fs';

const marque = 'src/assets/marque';
const icone = fs.readFileSync(`${marque}/icone-ronde.svg`);
const logo = fs.readFileSync(`${marque}/logo.svg`);

fs.copyFileSync(`${marque}/icone-ronde.svg`, 'public/favicon.svg');
await sharp(icone, { density: 300 }).resize(48, 48).png().toFile('public/favicon.png');

// iPhone : carré plein (iOS arrondit lui-même), icône sur fond noir.
await sharp(icone, { density: 300 })
  .resize(180, 180)
  .flatten({ background: '#141414' })
  .png()
  .toFile('public/apple-touch-icon.png');

// Image de partage 1200 × 630 : le logo centré sur le crème.
const logoPng = await sharp(logo, { density: 300 }).resize({ height: 440 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#ffffff' } })
  .composite([{ input: logoPng, gravity: 'center' }])
  .png()
  .toFile('src/assets/partage.png');
