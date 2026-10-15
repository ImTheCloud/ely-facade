/**
 * Bandes de cartes qui défilent horizontalement : les flèches avancent d'une carte,
 * et se grisent aux extrémités. Le doigt, la molette et le clavier marchent sans ce script.
 */
document.querySelectorAll<HTMLElement>('[data-bande]').forEach((bloc) => {
  const liste = bloc.querySelector<HTMLElement>('[data-bande-liste]');
  const precedent = bloc.querySelector<HTMLButtonElement>('[data-bande-precedent]');
  const suivant = bloc.querySelector<HTMLButtonElement>('[data-bande-suivant]');
  if (!liste || !precedent || !suivant) return;

  const calme = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pas = () => (liste.firstElementChild as HTMLElement | null)?.getBoundingClientRect().width ?? 320;

  const etat = () => {
    precedent.disabled = liste.scrollLeft <= 4;
    suivant.disabled = liste.scrollLeft + liste.clientWidth >= liste.scrollWidth - 4;
  };

  precedent.addEventListener('click', () => liste.scrollBy({ left: -pas(), behavior: calme ? 'auto' : 'smooth' }));
  suivant.addEventListener('click', () => liste.scrollBy({ left: pas(), behavior: calme ? 'auto' : 'smooth' }));
  liste.addEventListener('scroll', etat, { passive: true });
  window.addEventListener('resize', etat);
  etat();
});
