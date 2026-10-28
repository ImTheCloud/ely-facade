/**
 * Curseurs avant / après : le champ range fait tout le travail (clavier, souris, doigt).
 * Ce script suit seulement sa valeur pour déplacer la poignée et la photo « terminé ».
 * Le curseur reste au milieu à l'arrivée : aucune animation automatique.
 */
document.querySelectorAll<HTMLElement>('[data-comparateur]').forEach((comparateur) => {
  const champ = comparateur.querySelector<HTMLInputElement>('.comparateur__champ');
  if (!champ) return;

  champ.addEventListener('input', () => {
    comparateur.style.setProperty('--pos', `${champ.value}%`);
  });
});
