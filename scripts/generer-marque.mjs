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

// Google et les anciens navigateurs : une icône de 192 px et un fichier favicon.ico (16, 32 et 48 px) à la racine.
await sharp(icone, { density: 400 }).resize(192, 192, { fit: 'contain', background: '#ffffff00' }).png().toFile('public/favicon-192.png');
const tailles = [16, 32, 48];
const images = await Promise.all(tailles.map((t) => sharp(icone, { density: 400 }).resize(t, t, { fit: 'contain', background: '#ffffff00' }).png().toBuffer()));
const entete = Buffer.alloc(6 + 16 * images.length);
entete.writeUInt16LE(1, 2);
entete.writeUInt16LE(images.length, 4);
let decalage = entete.length;
images.forEach((image, i) => {
  const o = 6 + 16 * i;
  entete.writeUInt8(tailles[i], o);
  entete.writeUInt8(tailles[i], o + 1);
  entete.writeUInt16LE(1, o + 4);
  entete.writeUInt16LE(32, o + 6);
  entete.writeUInt32LE(image.length, o + 8);
  entete.writeUInt32LE(decalage, o + 12);
  decalage += image.length;
});
fs.writeFileSync('public/favicon.ico', Buffer.concat([entete, ...images]));

// iPhone : carré blanc, maison au centre (iOS arrondit lui-même).
const maison = await sharp(icone, { density: 400 }).resize(124, 124, { fit: 'contain', background: '#ffffff00' }).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 3, background: '#ffffff' } })
  .composite([{ input: maison, gravity: 'center' }])
  .png()
  .toFile('public/apple-touch-icon.png');
