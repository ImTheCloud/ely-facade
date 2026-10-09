/**
 * Curseurs avant / après.
 * - le champ range fait tout le travail (clavier, souris, doigt) ; ce script ne fait que suivre sa valeur ;
 * - les curseurs [data-animer] se révèlent tout seuls quand ils arrivent à l'écran, sauf mouvement réduit.
 */
const calme = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FIN = 34; // où le curseur s'arrête : on voit les deux photos
const DUREE = 2800;

document.querySelectorAll<HTMLElement>('[data-comparateur]').forEach((comparateur) => {
  const champ = comparateur.querySelector<HTMLInputElement>('.comparateur__champ');
  if (!champ) return;

  let image = 0;
  const placer = (valeur: number) => {
    comparateur.style.setProperty('--pos', `${valeur}%`);
    champ.value = String(valeur);
  };
  const toucher = () => {
    cancelAnimationFrame(image);
    comparateur.classList.add('est-touche');
  };

  champ.addEventListener('input', () => {
    toucher();
    comparateur.style.setProperty('--pos', `${champ.value}%`);
  });

  if (!comparateur.hasAttribute('data-animer')) return;

  if (calme) {
    placer(FIN);
    return;
  }

  placer(100);
  const vue = new IntersectionObserver(
    ([entree]) => {
      if (!entree.isIntersecting) return;
      vue.disconnect();
      let debut = 0;
      const avancer = (temps: number) => {
        debut ||= temps;
        const avancement = Math.min(1, (temps - debut) / DUREE);
        const ease = avancement < 0.5 ? 4 * avancement ** 3 : 1 - (-2 * avancement + 2) ** 3 / 2;
        placer(100 - (100 - FIN) * ease);
        if (avancement < 1) image = requestAnimationFrame(avancer);
      };
      setTimeout(() => {
        if (!comparateur.classList.contains('est-touche')) image = requestAnimationFrame(avancer);
      }, 600);
    },
    { threshold: 0.35 },
  );
  vue.observe(comparateur);
});
