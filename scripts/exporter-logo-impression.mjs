/**
 * Fabrique, à partir des SVG du logo (design/logo), les fichiers pour un imprimeur
 * (t-shirts, cartes, autocollants) dans design/logo/impression : SVG, PDF vectoriel et PNG 4000 px.
 * Quatre versions : couleur, fond sombre, noir, blanc (en une couleur, la brique rouge devient un vide).
 * À relancer si le logo change : node scripts/exporter-logo-impression.mjs (Google Chrome requis pour les PDF).
 */
import sharp from 'sharp';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const source = 'design/logo';
const sortie = 'design/logo/impression';
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
fs.rmSync(sortie, { recursive: true, force: true });
fs.mkdirSync(sortie, { recursive: true });

const NOIR = '#141414', ROUGE = '#C8202B', BLANC = '#FFFFFF';
const BRIQUE_ROUGE = /<rect x="119\.5" y="215" width="70" height="36" fill="#C8202B"\/>\n/;

// Le masque devient un tracé de découpe : mieux lu par les logiciels d'imprimerie.
const preparer = (svg) => svg
  .replace(' role="img" aria-label="Ely Facade"', '')
  .replace(/<mask[\s\S]*?<\/mask>/, '<defs><clipPath id="maison"><path d="M194 80L308 152V341H80V152L194 80Z"/></clipPath></defs>')
  .replace('<g mask="url(#mask0_25_2)">', '<g clip-path="url(#maison)">');

const versions = {
  couleur: (s) => s,
  'fond-sombre': (s) => s.replaceAll(NOIR, BLANC),
  noir: (s) => s.replace(BRIQUE_ROUGE, '').replaceAll(ROUGE, NOIR),
  blanc: (s) => s.replace(BRIQUE_ROUGE, '').replaceAll(NOIR, BLANC).replaceAll(ROUGE, BLANC),
};

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'ely-logo-'));
for (const [nom, largeur] of [['logo', 4000], ['icone', 2000]]) {
  const base = preparer(fs.readFileSync(`${source}/${nom}.svg`, 'utf8'));
  if (!BRIQUE_ROUGE.test(base)) throw new Error(`Brique rouge introuvable dans ${nom}.svg`);
  const [, , l, h] = base.match(/viewBox="([^"]+)"/)[1].split(' ');

  for (const [version, transformer] of Object.entries(versions)) {
    const svg = transformer(base);
    const fichier = path.resolve(sortie, `ely-facade-${nom}-${version}`);
    fs.writeFileSync(`${fichier}.svg`, svg);
    await sharp(Buffer.from(svg), { density: 600 }).resize({ width: largeur }).png().toFile(`${fichier}.png`);

    // PDF vectoriel : page de la taille exacte du logo, fond transparent.
    const html = path.join(temp, `${nom}-${version}.html`);
    fs.writeFileSync(html, `<!doctype html><meta charset="utf-8"><style>@page{size:${l}px ${h}px;margin:0}body{margin:0}svg{display:block;width:${l}px;height:${h}px}</style>${svg}`);
    execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${fichier}.pdf`, `file://${html}`], { stdio: 'ignore' });
  }
}
fs.rmSync(temp, { recursive: true });

fs.writeFileSync(`${sortie}/LISEZ-MOI.txt`, `Logo Ely Facade : fichiers pour l'impression

Format à donner à l'imprimeur : le PDF (vectoriel, agrandissable sans perte).
Le PNG (4000 px, fond transparent) sert si l'imprimeur demande une image.

- couleur      : t-shirt blanc ou clair (noir + rouge)
- fond-sombre  : t-shirt noir ou foncé (blanc + rouge)
- noir         : impression en une seule couleur, sur fond clair
- blanc        : impression en une seule couleur, sur fond foncé

"logo" = maison + nom (devant ou dos). "icone" = la maison seule (poitrine, manche).

Couleurs :
- Noir  #141414  (RVB 20, 20, 20)
- Rouge #C8202B  (RVB 200, 32, 43)
`);
