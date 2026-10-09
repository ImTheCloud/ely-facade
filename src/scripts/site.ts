/**
 * Le « moteur » commun à toutes les pages :
 * - défilement fluide (Lenis), coupé si la personne préfère moins d'animations ;
 * - apparitions au défilement ([data-reveal]).
 *
 * Tout reste utilisable sans JavaScript : ce script ne fait qu'ajouter du mouvement.
 */
import Lenis from 'lenis';

const calme = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | undefined;
if (!calme) {
  lenis = new Lenis({ lerp: 0.11, anchors: { offset: -90 } });
  const boucle = (temps: number) => {
    lenis?.raf(temps);
    requestAnimationFrame(boucle);
  };
  requestAnimationFrame(boucle);
}

/** Fait défiler la page jusqu'à un élément (sous l'en-tête), avec ou sans Lenis. */
export function defilerVers(element: HTMLElement, decalage = 100) {
  const y = element.getBoundingClientRect().top + window.scrollY - decalage;
  if (lenis) lenis.scrollTo(y, { duration: 0.8 });
  else window.scrollTo({ top: y });
}

/** Bloque le défilement de la page (menu ouvert). */
export function bloquerDefilement(bloque: boolean) {
  if (!lenis) return;
  if (bloque) lenis.stop();
  else lenis.start();
}

const observateur = new IntersectionObserver(
  (entrees) => {
    for (const entree of entrees) {
      if (entree.isIntersecting) {
        entree.target.classList.add('est-visible');
        observateur.unobserve(entree.target);
      }
    }
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
);
document.querySelectorAll('[data-reveal]').forEach((el) => observateur.observe(el));
