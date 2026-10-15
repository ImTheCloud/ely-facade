/**
 * Haut de page, variante b : le film d'ouverture ne démarre que lorsque ses images sont prêtes
 * (sinon on passe directement à la photo de Namur). Rien ne se passe avec « moins d'animations ».
 */
const hero = document.querySelector<HTMLElement>('[data-hero="b"]');

if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const images = [...hero.querySelectorAll<HTMLImageElement>('.hero__plan, .hero__photo')];
  let decide = false;
  const lancer = (etat: 'film-en-cours' | 'film-fini') => {
    if (decide) return;
    decide = true;
    hero.classList.add(etat);
  };

  // Au-delà de ce délai, le visiteur ne doit plus attendre : la photo de Namur s'affiche.
  const delai = window.setTimeout(() => lancer('film-fini'), 1800);
  Promise.all(images.map((image) => image.decode()))
    .then(() => lancer('film-en-cours'))
    .catch(() => lancer('film-fini'))
    .finally(() => window.clearTimeout(delai));

  // Une fois le film terminé, ses images sont retirées de l'affichage.
  const dernier = hero.querySelector<HTMLElement>('.hero__plan:last-of-type');
  dernier?.addEventListener('animationend', (evenement) => {
    if (evenement.animationName.includes('plan')) hero.classList.add('film-termine');
  });
}
