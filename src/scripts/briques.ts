/**
 * Haut de page : la façade suivante se construit brique par brique pendant le défilement.
 * - les photos viennent des <img> déjà dans la page (optimisées par Astro) ;
 * - une brique est rouge, comme dans le logo, avant de devenir photo ;
 * - rien ne tourne si la personne préfère moins d'animations.
 */
export {};

const scene = document.querySelector<HTMLElement>('[data-briques]');
const toile = scene?.querySelector<HTMLCanvasElement>('.hero__toile');
const calme = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (scene && toile && !calme) {
  const ctx = toile.getContext('2d')!;
  const photos = [...scene.querySelectorAll<HTMLImageElement>('[data-photo]')];
  const communeEl = scene.querySelector<HTMLElement>('[data-commune-active]');
  const numeroEl = scene.querySelector<HTMLElement>('[data-numero]');
  const points = [...scene.querySelectorAll<HTMLElement>('.hero__points b')];
  const n = photos.length;

  const borner = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const adoucir = (x: number) => 1 - Math.pow(1 - x, 3);
  const hasard = (a: number, b: number) => {
    const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
    return s - Math.floor(s);
  };

  let largeur = 0;
  let hauteur = 0;
  let densite = 1;
  let avancement = 0; // 0 → n - 1 : la photo qui se construit est floor(avancement) + 1

  const couvrir = (img: HTMLImageElement, focale: number) => {
    if (!img.complete || !img.naturalWidth) return;
    const s = Math.max(largeur / img.naturalWidth, hauteur / img.naturalHeight);
    const lw = largeur / s;
    const lh = hauteur / s;
    const sx = (img.naturalWidth - lw) * focale;
    const sy = (img.naturalHeight - lh) / 2;
    ctx.drawImage(img, sx, sy, lw, lh, 0, 0, largeur, hauteur);
  };
  const focale = (i: number) => Number(photos[i].dataset.cadrage ?? 0.5);

  function dessiner() {
    ctx.setTransform(densite, 0, 0, densite, 0, 0);
    ctx.clearRect(0, 0, largeur, hauteur);
    const i = borner(Math.floor(avancement), 0, n - 1);
    couvrir(photos[i], focale(i));
    if (i >= n - 1) return;

    // La construction prend 75 % du défilement de la transition, le reste est une pause.
    const q = borner((avancement - i - 0.1) / 0.75);
    if (q <= 0) return;

    const bw = Math.max(84, Math.round(largeur / (largeur < 700 ? 5 : 11)));
    const bh = Math.round(bw * 0.46);
    const joint = Math.max(3, Math.round(bw * 0.045));
    const rangs = Math.ceil(hauteur / bh) + 1;
    const colonnes = Math.ceil(largeur / bw) + 2;
    const rouge = { r: Math.floor(rangs * 0.45), c: Math.floor(colonnes * 0.5) };
    const suivante = photos[i + 1];
    const pose = 0.28; // part du temps pendant laquelle une brique se pose

    for (let r = 0; r < rangs; r++) {
      const y = hauteur - (r + 1) * bh;
      const decalage = ((r % 2) * bw) / 2;
      for (let c = -1; c < colonnes; c++) {
        const x = c * bw - decalage;
        const ordre = (r / rangs) * (1 - pose - 0.04) + hasard(c, r) * 0.04;
        const k = borner((q - ordre) / pose);
        if (k <= 0) continue;
        const e = adoucir(k);
        const glisse = (1 - e) * 26;
        ctx.save();
        ctx.globalAlpha = Math.min(1, k * 2.2);
        ctx.beginPath();
        ctx.rect(x + joint / 2, y + joint / 2 + glisse, bw - joint, bh - joint);
        ctx.clip();
        ctx.translate(0, glisse);
        if (r === rouge.r && c === rouge.c && k < 0.98) {
          ctx.fillStyle = '#c8202b';
          ctx.fillRect(x, y, bw, bh);
        } else {
          couvrir(suivante, focale(i + 1));
        }
        ctx.restore();
      }
    }
    if (q >= 1) couvrir(suivante, focale(i + 1)); // joints comblés à la fin
  }

  function mesurer() {
    densite = Math.min(2, window.devicePixelRatio || 1);
    largeur = toile!.clientWidth;
    hauteur = toile!.clientHeight;
    toile!.width = Math.round(largeur * densite);
    toile!.height = Math.round(hauteur * densite);
  }

  let attente = 0;
  function actualiser() {
    attente = 0;
    const r = scene!.getBoundingClientRect();
    const course = scene!.offsetHeight - window.innerHeight;
    avancement = borner(-r.top / course) * (n - 1);

    const courante = borner(Math.floor(avancement + 0.5), 0, n - 1);
    if (communeEl) communeEl.textContent = photos[courante].dataset.commune ?? '';
    if (numeroEl) numeroEl.textContent = `0${courante + 1} / 0${n}`;
    points.forEach((p, k) => p.style.setProperty('--f', String(k === 0 ? 1 : borner(avancement - (k - 1)))));
    dessiner();
  }
  const planifier = () => {
    if (!attente) attente = requestAnimationFrame(actualiser);
  };

  window.addEventListener('scroll', planifier, { passive: true });
  window.addEventListener('resize', () => {
    mesurer();
    planifier();
  });
  photos.forEach((p) => p.addEventListener('load', planifier));
  mesurer();
  actualiser();
}
