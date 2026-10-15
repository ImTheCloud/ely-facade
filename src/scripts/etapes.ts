/**
 * « Les étapes d'une façade » sur grand écran : la photo de la scène suit l'étape lue.
 * L'étape lue est celle qui passe au milieu de l'écran ; une étape à deux photos montre la seconde
 * dans sa deuxième moitié. Sur téléphone, rien à faire : chaque étape montre ses propres photos.
 */
const section = document.querySelector<HTMLElement>('[data-etapes]');

if (section) {
  const grandEcran = window.matchMedia('(min-width: 960px)');
  const etapes = [...section.querySelectorAll<HTMLElement>('.etape')];
  const plans = [...section.querySelectorAll<HTMLElement>('.scene__plan')];
  const reperes = [...section.querySelectorAll<HTMLElement>('[data-repere]')];
  let actif = -1;
  let enAttente = false;

  const montrer = (index: number, numero: number) => {
    if (index === actif) return;
    actif = index;
    plans.forEach((plan) => plan.classList.toggle('est-actif', Number(plan.dataset.plan) === index));
    reperes.forEach((repere) => repere.classList.toggle('est-actif', Number(repere.dataset.repere) <= numero));
  };

  const mettreAJour = () => {
    enAttente = false;
    if (!grandEcran.matches) return;
    const milieu = window.innerHeight / 2;
    // L'étape qui contient le milieu de l'écran (ou la plus proche).
    let choisie = etapes[0];
    for (const etape of etapes) {
      if (etape.getBoundingClientRect().top <= milieu) choisie = etape;
    }
    const zone = choisie.getBoundingClientRect();
    const progression = Math.min(0.999, Math.max(0, (milieu - zone.top) / zone.height));
    const indices = (choisie.dataset.plans ?? '0').split(' ').map(Number);
    montrer(indices[Math.floor(progression * indices.length)], Number(choisie.dataset.numero));
  };

  const demander = () => {
    if (enAttente) return;
    enAttente = true;
    requestAnimationFrame(mettreAJour);
  };

  window.addEventListener('scroll', demander, { passive: true });
  window.addEventListener('resize', demander);
  grandEcran.addEventListener('change', demander);
  mettreAJour();
}
