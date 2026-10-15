/**
 * « Les étapes d'une façade » : on choisit l'étape avec les pastilles numérotées, avec le bouton « Étape suivante »
 * ou avec les flèches du clavier. Une seule étape est visible à la fois ; rien ne bouge au défilement.
 */
const section = document.querySelector<HTMLElement>('[data-etapes]');

if (section) {
  const onglets = [...section.querySelectorAll<HTMLButtonElement>('[data-onglet]')];
  const etapes = [...section.querySelectorAll<HTMLElement>('[data-etape]')];

  const montrer = (index: number, focus = false) => {
    onglets.forEach((onglet, i) => {
      const actif = i === index;
      onglet.classList.toggle('est-actif', actif);
      onglet.setAttribute('aria-selected', String(actif));
      onglet.tabIndex = actif ? 0 : -1;
    });
    etapes.forEach((etape, i) => etape.classList.toggle('est-actif', i === index));
    if (focus) onglets[index].focus();
  };

  onglets.forEach((onglet, i) => {
    onglet.addEventListener('click', () => montrer(i));
    onglet.addEventListener('keydown', (evenement) => {
      const suivant = evenement.key === 'ArrowRight' || evenement.key === 'ArrowDown';
      const precedent = evenement.key === 'ArrowLeft' || evenement.key === 'ArrowUp';
      if (!suivant && !precedent) return;
      evenement.preventDefault();
      montrer((i + (suivant ? 1 : -1) + onglets.length) % onglets.length, true);
    });
  });

  etapes.forEach((etape, i) => {
    etape.querySelector('[data-suivante]')?.addEventListener('click', () => montrer(Math.min(i + 1, etapes.length - 1)));
  });
}
