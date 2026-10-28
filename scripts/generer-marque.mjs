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
// Version pour fond foncé ou photo : le noir devient blanc, le rouge reste rouge (la brique et « FACADE »).
const logoBlanc = logoSource.replaceAll('fill="#141414"', 'fill="#FFFFFF"');
fs.writeFileSync(`${marque}/logo-blanc.svg`, logoBlanc);

const icone = fs.readFileSync(`${source}/icone.svg`);

// Icône du site (onglet, Google) : la maison sur un carré blanc aux coins arrondis, lisible aussi sur un onglet sombre.
const maisonCarre = (t) => sharp(icone, { density: 400 }).resize(Math.round(t * 0.66), Math.round(t * 0.66), { fit: 'contain', background: '#ffffff00' }).png().toBuffer();
const faviconPng = async (t) =>
  sharp({ create: { width: t, height: t, channels: 4, background: '#ffffff00' } })
    .composite([
      { input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${t}"><rect width="${t}" height="${t}" rx="${t * 0.22}" fill="#fff"/></svg>`) },
      { input: await maisonCarre(t), gravity: 'center' },
    ])
    .png()
    .toBuffer();
const interieur = icone.toString('utf8').replace(/^<svg[^>]*>\n?/, '').replace(/<\/svg>\s*$/, '');
fs.writeFileSync(
  'public/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="22" fill="#fff"/><svg x="17" y="17" width="66" height="66" viewBox="74 74 240 273" fill="none">${interieur}</svg></svg>\n`,
);
fs.writeFileSync('public/favicon.png', await faviconPng(48));

// Google et les anciens navigateurs : une icône de 192 px et un fichier favicon.ico (16, 32 et 48 px) à la racine.
fs.writeFileSync('public/favicon-192.png', await faviconPng(192));
const tailles = [16, 32, 48];
const images = await Promise.all(tailles.map((t) => faviconPng(t)));
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
