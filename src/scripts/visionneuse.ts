/**
 * Visionneuse des photos d'un chantier : un clic sur une photo l'ouvre en grand (<dialog> natif :
 * Échap ferme, le focus reste dedans). Flèches gauche / droite pour passer d'une photo à l'autre.
 * Sans JavaScript, chaque photo est un lien vers sa grande version.
 */
document.querySelectorAll<HTMLElement>('[data-galerie]').forEach((galerie) => {
  const dialogue = galerie.querySelector<HTMLDialogElement>('[data-visionneuse]');
  const grande = dialogue?.querySelector<HTMLImageElement>('[data-grande]');
  const legende = dialogue?.querySelector<HTMLElement>('[data-legende]');
  const liens = [...galerie.querySelectorAll<HTMLAnchorElement>('[data-photo]')];
  if (!dialogue || !grande || !legende || !liens.length) return;

  let courante = 0;
  let origine: HTMLElement | null = null;

  const montrer = (index: number) => {
    courante = (index + liens.length) % liens.length;
    const lien = liens[courante];
    grande.src = lien.href;
    grande.srcset = lien.dataset.srcset ?? '';
    grande.sizes = '100vw';
    grande.alt = lien.dataset.alt ?? '';
    legende.textContent = lien.dataset.alt ?? '';
  };

  liens.forEach((lien, i) =>
    lien.addEventListener('click', (evenement) => {
      evenement.preventDefault();
      origine = lien;
      montrer(i);
      dialogue.showModal();
    }),
  );

  dialogue.querySelector('[data-fermer]')?.addEventListener('click', () => dialogue.close());
  dialogue.querySelector('[data-precedente]')?.addEventListener('click', () => montrer(courante - 1));
  dialogue.querySelector('[data-suivante]')?.addEventListener('click', () => montrer(courante + 1));
  dialogue.addEventListener('keydown', (evenement) => {
    if (evenement.key === 'ArrowLeft') montrer(courante - 1);
    if (evenement.key === 'ArrowRight') montrer(courante + 1);
  });
  // Un clic à côté de la photo ferme la visionneuse.
  dialogue.addEventListener('click', (evenement) => {
    if (evenement.target === dialogue || (evenement.target as HTMLElement).classList.contains('visionneuse__cadre')) dialogue.close();
  });
  dialogue.addEventListener('close', () => origine?.focus());
});
