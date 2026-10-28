/**
 * Fabrique le grand QR code du site (design/qr-code) : il encode directement l'adresse du site,
 * sans service intermédiaire : il fonctionnera donc aussi longtemps que le site existe.
 * Fichiers : SVG (vectoriel, à n'importe quelle taille), PNG 4000 px, PDF A4. Noir sur blanc, marge de 4 modules,
 * correction d'erreur élevée (H : lisible même abîmé ou sali).
 * À relancer si l'adresse du site change : node scripts/exporter-qr-code.mjs (Google Chrome requis).
 */
import QRCode from 'qrcode';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const sortie = 'design/qr-code';
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const site = new URL(fs.readFileSync('astro.config.mjs', 'utf8').match(/const SITE = '([^']+)'/)[1]);

const qr = QRCode.create(site.href, { errorCorrectionLevel: 'H' });
const n = qr.modules.size, marge = 4;
let cases = '';
for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (qr.modules.get(x, y)) cases += `M${x + marge} ${y + marge}h1v1h-1z`;
const taille = n + 2 * marge;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${taille} ${taille}" shape-rendering="crispEdges"><rect width="${taille}" height="${taille}" fill="#fff"/><path d="${cases}" fill="#141414"/></svg>\n`;

fs.mkdirSync(sortie, { recursive: true });
fs.writeFileSync(`${sortie}/qr-code-ely-facade.svg`, svg);
await sharp(Buffer.from(svg), { density: 72 }).resize(4000, 4000, { kernel: 'nearest' }).png().toFile(`${sortie}/qr-code-ely-facade.png`);

const html = `${sortie}/.qr.html`;
fs.writeFileSync(html, `<!doctype html><meta charset="utf-8"><style>@page{size:A4;margin:0}*{margin:0}body{width:210mm;height:297mm;display:grid;place-items:center}svg{width:170mm;height:170mm}</style>${svg}`);
execFileSync(chrome, ['--headless=new', '--disable-gpu', `--print-to-pdf=${path.resolve(sortie, 'qr-code-ely-facade.pdf')}`, '--no-pdf-header-footer', pathToFileURL(path.resolve(html)).href], { stdio: 'ignore' });
fs.rmSync(html);
console.log(`QR code de ${site.href} dans ${sortie}`);
