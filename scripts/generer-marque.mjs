/**
 * Fabrique, à partir des SVG du logo (design/logo), les fichiers du site :
 * copie dans src/assets/marque, favicon, icône iPhone et image de partage (WhatsApp, Facebook).
 * À relancer si le logo change : node scripts/generer-marque.mjs
 */
import sharp from 'sharp';
import fs from 'node:fs';

const source = 'design/logo';
const marque = 'src/assets/marque';
fs.mkdirSync(marque, { recursive: true });
for (const nom of ['logo.svg', 'icone.svg']) fs.copyFileSync(`${source}/${nom}`, `${marque}/${nom}`);

const icone = fs.readFileSync(`${source}/icone.svg`);
const logo = fs.readFileSync(`${source}/logo.svg`);

fs.copyFileSync(`${source}/icone.svg`, 'public/favicon.svg');
await sharp(icone, { density: 400 }).resize(48, 48, { fit: 'contain', background: '#ffffff00' }).png().toFile('public/favicon.png');

// iPhone : carré blanc, maison au centre (iOS arrondit lui-même).
const maison = await sharp(icone, { density: 400 }).resize(124, 124, { fit: 'contain', background: '#ffffff00' }).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 3, background: '#ffffff' } })
  .composite([{ input: maison, gravity: 'center' }])
  .png()
  .toFile('public/apple-touch-icon.png');

// Image de partage 1200 × 630 : le logo centré sur blanc.
const logoPng = await sharp(logo, { density: 300 }).resize({ width: 960 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#ffffff' } })
  .composite([{ input: logoPng, gravity: 'center' }])
  .png()
  .toFile('src/assets/partage.png');
