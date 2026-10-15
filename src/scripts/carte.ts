/**
 * La carte de la Belgique : toucher une commune (sur la carte ou dans la liste sous la carte) ouvre sa fenêtre :
 * - ordinateur : une petite fenêtre près du point, qui se ferme en cliquant ailleurs ou avec Échap ;
 * - téléphone : une feuille qui monte du bas, avec un fond sombre, qui se ferme avec la croix, le fond ou Échap.
 * La fenêtre montre l'avant/après du chantier et un lien vers sa page.
 * Sans JavaScript, rien de tout cela : les chantiers sont dans la bande de photos sous la carte.
 */
import { bloquerDefilement } from './site';

const telephone = window.matchMedia('(max-width: 699px)');
const calme = window.matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll<HTMLElement>('[data-carte]').forEach((carte) => {
  const conteneur = carte.querySelector<HTMLElement>('[data-popups]');
  if (!conteneur) return;
  // Les fenêtres vivent à la fin de la page : rien ne peut les couper ou les cacher.
  document.body.appendChild(conteneur);

  const fond = conteneur.querySelector<HTMLElement>('[data-fond]')!;
  const fiches = [...conteneur.querySelectorAll<HTMLElement>('[data-fiche]')];
  const declencheurs = [...carte.querySelectorAll<HTMLButtonElement>('[data-point]')];

  let ouverte: HTMLElement | null = null;
  let origine: HTMLElement | null = null;
  let minuteur = 0;

  const marquer = (commune: string | null) => {
    declencheurs.forEach((bouton) => {
      const actif = bouton.dataset.point === commune;
      bouton.classList.toggle('est-actif', actif);
      bouton.setAttribute('aria-expanded', String(actif));
    });
  };

  const placer = (fiche: HTMLElement, declencheur: HTMLElement) => {
    if (telephone.matches) {
      fiche.style.left = '';
      fiche.style.top = '';
      return;
    }
    const rond = declencheur.querySelector('.point__rond')?.getBoundingClientRect() ?? declencheur.getBoundingClientRect();
    const cx = rond.left + rond.width / 2;
    const cy = rond.top + rond.height / 2;
    const l = fiche.offsetWidth;
    const h = fiche.offsetHeight;
    const marge = 12;
    const gauche = Math.min(Math.max(cx - l / 2, marge), window.innerWidth - l - marge);
    // Sous le point si la place suffit, sinon au-dessus, sinon calée dans l'écran.
    let haut = cy + 26;
    if (haut + h > window.innerHeight - marge) haut = cy - 26 - h;
    if (haut < marge) haut = Math.max(marge, window.innerHeight - h - marge);
    fiche.style.left = `${gauche + window.scrollX}px`;
    fiche.style.top = `${haut + window.scrollY}px`;
  };

  const fermer = (rendreLeFocus = true) => {
    if (!ouverte) return;
    const fiche = ouverte;
    ouverte = null;
    fiche.classList.remove('est-ouvert');
    fond.classList.remove('est-ouvert');
    marquer(null);
    if (telephone.matches) bloquerDefilement(false);
    window.clearTimeout(minuteur);
    minuteur = window.setTimeout(
      () => {
        fiche.hidden = true;
        fond.hidden = true;
      },
      calme.matches ? 0 : 380,
    );
    if (rendreLeFocus) origine?.focus({ preventScroll: true });
    origine = null;
  };

  const ouvrir = (commune: string, declencheur: HTMLElement) => {
    const fiche = fiches.find((f) => f.dataset.fiche === commune);
    if (!fiche) return;
    if (ouverte) fermer(false);
    window.clearTimeout(minuteur);

    origine = declencheur;
    ouverte = fiche;
    marquer(commune);

    fiche.hidden = false;
    if (telephone.matches) {
      fond.hidden = false;
      bloquerDefilement(true);
    }
    placer(fiche, declencheur);
    // Un instant pour que la fenêtre existe avant de s'animer.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        fiche.classList.add('est-ouvert');
        fond.classList.add('est-ouvert');
        fiche.focus({ preventScroll: true });
      }),
    );
  };

  declencheurs.forEach((bouton) => {
    bouton.addEventListener('click', () => {
      const commune = bouton.dataset.point ?? '';
      if (ouverte?.dataset.fiche === commune) fermer();
      else ouvrir(commune, bouton);
    });
  });

  fiches.forEach((fiche) => {
    fiche.querySelector('[data-fermer]')?.addEventListener('click', () => fermer());

    // Plusieurs chantiers dans la même commune : on choisit lequel voir.
    const onglets = [...fiche.querySelectorAll<HTMLButtonElement>('[data-onglet]')];
    const cas = [...fiche.querySelectorAll<HTMLElement>('[data-cas]')];
    onglets.forEach((onglet) => {
      onglet.addEventListener('click', () => {
        onglets.forEach((autre) => {
          const actif = autre === onglet;
          autre.classList.toggle('est-actif', actif);
          autre.setAttribute('aria-pressed', String(actif));
        });
        cas.forEach((c) => c.classList.toggle('est-actif', c.dataset.cas === onglet.dataset.onglet));
        if (ouverte === fiche && !telephone.matches && origine) placer(fiche, origine);
      });
    });
  });

  fond.addEventListener('click', () => fermer());

  // Ordinateur : un clic ailleurs ferme la fenêtre.
  document.addEventListener('pointerdown', (evenement) => {
    if (!ouverte || telephone.matches) return;
    const cible = evenement.target as Node;
    if (ouverte.contains(cible) || declencheurs.some((bouton) => bouton.contains(cible))) return;
    fermer(false);
  });

  document.addEventListener('keydown', (evenement) => {
    if (evenement.key === 'Escape' && ouverte) fermer();
  });

  // Seul un changement de largeur ferme (la barre d'adresse du téléphone qui se replie ne doit rien fermer).
  let largeur = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth === largeur) return;
    largeur = window.innerWidth;
    fermer(false);
  });
});
