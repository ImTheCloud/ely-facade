/**
 * Galerie des chantiers : filtre par commune et visionneuse plein écran.
 * Sans JavaScript, chaque photo reste un lien vers l'image en grand.
 */
export {};

const galerie = document.querySelector<HTMLElement>('[data-galerie]');

if (galerie) {
  const items = [...galerie.querySelectorAll<HTMLElement>('.galerie__item')];
  const boutons = [...galerie.querySelectorAll<HTMLButtonElement>('[data-filtres] button')];
  const visionneuse = galerie.querySelector<HTMLDialogElement>('[data-visionneuse]')!;
  const grande = visionneuse.querySelector<HTMLImageElement>('[data-grande]')!;
  const legende = visionneuse.querySelector<HTMLElement>('[data-legende]')!;
  const visibles = () => items.filter((item) => !item.hidden);
  let courante = 0;

  boutons.forEach((bouton) =>
    bouton.addEventListener('click', () => {
      boutons.forEach((autre) => autre.setAttribute('aria-pressed', String(autre === bouton)));
      const commune = bouton.dataset.commune;
      items.forEach((item) => (item.hidden = !!commune && item.dataset.commune !== commune));
    }),
  );

  function montrer(indice: number) {
    const liste = visibles();
    courante = (indice + liste.length) % liste.length;
    const lien = liste[courante].querySelector<HTMLAnchorElement>('[data-photo]')!;
    grande.src = lien.href;
    grande.alt = lien.dataset.alt ?? '';
    legende.textContent = lien.dataset.alt ?? '';
  }

  items.forEach((item) =>
    item.querySelector('[data-photo]')!.addEventListener('click', (evenement) => {
      evenement.preventDefault();
      montrer(visibles().indexOf(item));
      visionneuse.showModal();
    }),
  );

  visionneuse.querySelector('[data-fermer]')!.addEventListener('click', () => visionneuse.close());
  visionneuse.querySelector('[data-precedente]')!.addEventListener('click', () => montrer(courante - 1));
  visionneuse.querySelector('[data-suivante]')!.addEventListener('click', () => montrer(courante + 1));
  visionneuse.addEventListener('click', (evenement) => {
    if (evenement.target === visionneuse || (evenement.target as HTMLElement).classList.contains('visionneuse__cadre')) visionneuse.close();
  });
  visionneuse.addEventListener('keydown', (evenement) => {
    if (evenement.key === 'ArrowLeft') montrer(courante - 1);
    if (evenement.key === 'ArrowRight') montrer(courante + 1);
  });
}
