/**
 * Curseurs avant / après : le champ range fait tout le travail (clavier, souris, doigt).
 * Ce script ne fait que suivre sa valeur et éteindre le halo au premier geste.
 */
document.querySelectorAll<HTMLElement>('[data-comparateur]').forEach((comparateur) => {
  const champ = comparateur.querySelector<HTMLInputElement>('.comparateur__champ');
  if (!champ) return;

  champ.addEventListener('input', () => {
    comparateur.classList.add('est-touche');
    comparateur.style.setProperty('--pos', `${champ.value}%`);
  });
});
