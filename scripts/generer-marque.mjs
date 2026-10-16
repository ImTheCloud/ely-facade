/**
 * Fabrique, à partir des SVG du logo (design/logo), les fichiers du site :
 * logo (normal et blanc) dans src/assets/marque, favicon, icône iPhone.
 * À relancer si le logo change : node scripts/generer-marque.mjs
 */
import sharp from 'sharp';
import fs from 'node:fs';

const source = 'design/logo';
const marque = 'src/assets/marque';
fs.mkdirSync(marque, { recursive: true });
fs.copyFileSync(`${source}/logo.svg`, `${marque}/logo.svg`);

// Version blanche pour l'en-tête posé sur la photo : tout en blanc sauf la brique rouge de la maison.
const logoSource = fs.readFileSync(`${source}/logo.svg`, 'utf8');
const logoBlanc = logoSource
  .replaceAll('fill="#141414"', 'fill="#FFFFFF"')
  .replace(/<path([^>]*?)fill="#C8202B"/g, '<path$1fill="#FFFFFF"');
fs.writeFileSync(`${marque}/logo-blanc.svg`, logoBlanc);

const icone = fs.readFileSync(`${source}/icone.svg`);

fs.copyFileSync(`${source}/icone.svg`, 'public/favicon.svg');
await sharp(icone, { density: 400 }).resize(48, 48, { fit: 'contain', background: '#ffffff00' }).png().toFile('public/favicon.png');

// iPhone : carré blanc, maison au centre (iOS arrondit lui-même).
const maison = await sharp(icone, { density: 400 }).resize(124, 124, { fit: 'contain', background: '#ffffff00' }).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 3, background: '#ffffff' } })
  .composite([{ input: maison, gravity: 'center' }])
  .png()
  .toFile('public/apple-touch-icon.png');
