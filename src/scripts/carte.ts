/**
 * La carte de la Belgique : toucher une commune (sur la carte ou dans la liste sous la carte) montre ses chantiers.
 * Sans JavaScript, la première commune reste affichée et les chantiers sont dans la bande de photos.
 */
document.querySelectorAll<HTMLElement>('[data-carte]').forEach((carte) => {
  const boutons = [...carte.querySelectorAll<HTMLButtonElement>('[data-point]')];
  const fiches = [...carte.querySelectorAll<HTMLElement>('[data-fiche]')];

  boutons.forEach((bouton) => {
    bouton.addEventListener('click', () => {
      const commune = bouton.dataset.point;
      boutons.forEach((autre) => {
        const actif = autre.dataset.point === commune;
        autre.classList.toggle('est-actif', actif);
        autre.setAttribute('aria-pressed', String(actif));
      });
      fiches.forEach((fiche) => fiche.classList.toggle('est-actif', fiche.dataset.fiche === commune));
    });
  });
});
