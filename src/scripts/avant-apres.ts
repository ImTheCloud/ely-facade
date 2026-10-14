/**
 * Avant / après : une rangée d'onglets (un chantier chacun), un seul curseur visible à la fois.
 * Sans JavaScript, seul le premier curseur est affiché ; les flèches du clavier passent d'un onglet à l'autre.
 */
document.querySelectorAll<HTMLElement>('[data-avant-apres]').forEach((section) => {
  const onglets = [...section.querySelectorAll<HTMLButtonElement>('[role="tab"]')];

  function choisir(onglet: HTMLButtonElement, focus = false) {
    onglets.forEach((autre) => {
      const actif = autre === onglet;
      autre.setAttribute('aria-selected', String(actif));
      autre.tabIndex = actif ? 0 : -1;
      const panneau = document.getElementById(autre.getAttribute('aria-controls') ?? '');
      if (panneau) panneau.hidden = !actif;
    });
    if (focus) onglet.focus();
    onglet.scrollIntoView({ block: 'nearest', inline: 'center' });
  }

  onglets.forEach((onglet, i) => {
    onglet.addEventListener('click', () => choisir(onglet));
    onglet.addEventListener('keydown', (evenement) => {
      const pas = evenement.key === 'ArrowRight' ? 1 : evenement.key === 'ArrowLeft' ? -1 : 0;
      if (!pas) return;
      evenement.preventDefault();
      choisir(onglets[(i + pas + onglets.length) % onglets.length], true);
    });
  });
});
