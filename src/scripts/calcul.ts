/**
 * Calculateur de surface (section devis de l'accueil) : largeur × niveaux × 3 m.
 * « Ajouter à ma demande » met le résultat dans le champ « surface » du formulaire de devis de la page.
 * Sans JavaScript, le calculateur reste caché : le formulaire dit qu'Elisei mesurera sur place.
 */
import { defilerVers } from './site';

const HAUTEUR_NIVEAU = 3;

document.querySelectorAll<HTMLElement>('[data-calcul]').forEach((bloc) => {
  const largeur = bloc.querySelector<HTMLInputElement>('[data-largeur]');
  const niveaux = bloc.querySelector<HTMLInputElement>('[data-niveaux]');
  const resultat = bloc.querySelector<HTMLOutputElement>('[data-resultat]');
  const utiliser = bloc.querySelector<HTMLButtonElement>('[data-utiliser]');
  if (!largeur || !niveaux || !resultat || !utiliser) return;

  bloc.hidden = false;
  const libelle = utiliser.querySelector('span');
  const texteInitial = libelle?.textContent ?? '';
  const unite = utiliser.dataset.unite ?? 'm²';

  const surface = () => {
    const l = Math.max(0, Number(largeur.value.replace(',', '.')) || 0);
    const n = Math.max(1, Math.round(Number(niveaux.value) || 1));
    return Math.round(l * n * HAUTEUR_NIVEAU);
  };

  const afficher = () => {
    resultat.value = `${surface()} ${unite}`;
    utiliser.classList.remove('est-ajoute');
    if (libelle) libelle.textContent = texteInitial;
  };

  const changerNiveaux = (pas: number) => {
    niveaux.value = String(Math.min(30, Math.max(1, (Number(niveaux.value) || 1) + pas)));
    afficher();
  };

  bloc.querySelector('[data-moins]')?.addEventListener('click', () => changerNiveaux(-1));
  bloc.querySelector('[data-plus]')?.addEventListener('click', () => changerNiveaux(1));
  largeur.addEventListener('input', afficher);
  niveaux.addEventListener('input', afficher);

  utiliser.addEventListener('click', () => {
    const champ = document.querySelector<HTMLInputElement>('[data-formulaire] input[name="surface"]');
    const formulaire = document.querySelector<HTMLElement>('[data-formulaire]');
    if (!champ || !formulaire) return;
    champ.value = String(surface());
    champ.dispatchEvent(new Event('change', { bubbles: true }));
    utiliser.classList.add('est-ajoute');
    if (libelle) libelle.textContent = utiliser.dataset.ajoute ?? texteInitial;
    if (formulaire.getBoundingClientRect().top < 0) defilerVers(formulaire);
  });

  afficher();
});
