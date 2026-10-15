/**
 * Curseurs avant / après : le champ range fait tout le travail (clavier, souris, doigt).
 * Ce script suit sa valeur et, à la première apparition à l'écran, fait glisser le curseur une fois
 * (de la droite vers le milieu) pour montrer qu'il bouge. Rien ne bouge avec « moins d'animations ».
 */
const calme = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function placer(comparateur: HTMLElement, champ: HTMLInputElement, valeur: number) {
  champ.value = String(valeur);
  comparateur.style.setProperty('--pos', `${valeur}%`);
}

function glisser(comparateur: HTMLElement, champ: HTMLInputElement) {
  const debut = performance.now();
  const duree = 1400;
  const depart = 86;
  const arrivee = 50;
  const pas = (maintenant: number) => {
    if (comparateur.dataset.touche) return;
    const t = Math.min(1, (maintenant - debut) / duree);
    const doux = 1 - Math.pow(1 - t, 3);
    placer(comparateur, champ, depart + (arrivee - depart) * doux);
    if (t < 1) requestAnimationFrame(pas);
  };
  requestAnimationFrame(pas);
}

const observateur = calme
  ? null
  : new IntersectionObserver(
      (entrees) => {
        for (const entree of entrees) {
          if (!entree.isIntersecting) continue;
          const comparateur = entree.target as HTMLElement;
          observateur?.unobserve(comparateur);
          const champ = comparateur.querySelector<HTMLInputElement>('.comparateur__champ');
          if (champ && !comparateur.dataset.touche) glisser(comparateur, champ);
        }
      },
      { threshold: 0.55 },
    );

document.querySelectorAll<HTMLElement>('[data-comparateur]').forEach((comparateur) => {
  const champ = comparateur.querySelector<HTMLInputElement>('.comparateur__champ');
  if (!champ) return;

  champ.addEventListener('input', () => {
    comparateur.dataset.touche = 'oui';
    comparateur.style.setProperty('--pos', `${champ.value}%`);
  });
  observateur?.observe(comparateur);
});
