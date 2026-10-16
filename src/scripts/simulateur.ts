/**
 * Simulateur de surface (étape 2 du formulaire de devis) : largeur × niveaux × 3 m.
 * Ouvert, il remplit le champ « surface » au-dessus à chaque changement.
 * Sans JavaScript, il reste caché : le formulaire dit qu'Elisei mesurera sur place.
 */
const HAUTEUR_NIVEAU = 3;

document.querySelectorAll<HTMLDetailsElement>('[data-simulateur]').forEach((bloc) => {
  const surface = bloc.closest('fieldset')?.querySelector<HTMLInputElement>('input[name="surface"]');
  const [largeur, niveaux] = bloc.querySelectorAll<HTMLInputElement>('[data-facteur]');
  if (!surface || !largeur || !niveaux) return;
  bloc.hidden = false;

  const nombre = (champ: HTMLInputElement) => Math.max(0, Number(champ.value.replace(',', '.')) || 0);
  const remplir = () => {
    surface.value = String(Math.round(nombre(largeur) * Math.max(1, Math.round(nombre(niveaux))) * HAUTEUR_NIVEAU));
  };

  // Les boutons − / + : un mètre ou un niveau de plus ou de moins, entre les bornes du champ.
  bloc.querySelectorAll<HTMLButtonElement>('[data-pas]').forEach((bouton) => {
    const champ = bloc.querySelector<HTMLInputElement>(`#${bouton.dataset.cible}`);
    if (!champ) return;
    bouton.addEventListener('click', () => {
      const valeur = Math.round(nombre(champ)) + Number(bouton.dataset.pas);
      champ.value = String(Math.min(Number(champ.max), Math.max(Number(champ.min), valeur)));
      remplir();
    });
  });
  largeur.addEventListener('input', remplir);
  niveaux.addEventListener('input', remplir);
  bloc.addEventListener('toggle', () => {
    if (bloc.open) remplir();
  });
});
