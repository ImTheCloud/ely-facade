/**
 * Le moteur des formulaires en étapes du site (devis).
 * Le formulaire décrit ce qu'il attend avec des attributs data- ;
 * ce script fait le reste :
 *
 * - une étape à la fois, barre de progression, « Continuer » / « Retour » ;
 * - validation : [data-choix-requis="nom"] (au moins une case cochée),
 *   champs required, email valide, case de consentement ;
 * - photos facultatives : [data-photos] (aperçus, retrait, 5 maximum, réduites avant l'envoi) ;
 * - envoi en arrière-plan à l'adresse du formulaire (worker/devis.ts),
 *   puis confirmation sur place ; en cas d'échec, les contacts directs ;
 * - si le visiteur a donné son email, le worker lui envoie une confirmation et l'écran de fin l'indique ;
 * - après l'envoi, [data-suite-whatsapp] ouvre un message qui reprend
 *   toute la demande (pour envoyer des photos) ;
 * - pré-sélection par l'adresse : ?<data-param>=valeur coche les cases dont
 *   data-cles contient cette valeur.
 *
 * Sans JavaScript, toutes les étapes s'affichent et le navigateur envoie
 * le formulaire lui-même.
 */

import { defilerVers } from './site';

function initialiser(bloc: HTMLElement) {
  const form = bloc.querySelector<HTMLFormElement>('[data-form]');
  if (!form || bloc.dataset.pret) return;
  bloc.dataset.pret = 'oui';

  const d = bloc.dataset;
  const etapes = Array.from(form.querySelectorAll<HTMLFieldSetElement>('[data-etape]'));
  const segments = Array.from(form.querySelectorAll<HTMLElement>('[data-segment]'));
  const num = form.querySelector<HTMLElement>('[data-num]');
  const nomEtape = form.querySelector<HTMLElement>('[data-nom-etape]');
  const erreur = form.querySelector<HTMLElement>('[data-erreur]');
  const boutonPrecedent = form.querySelector<HTMLButtonElement>('[data-precedent]');
  const boutonSuivant = form.querySelector<HTMLButtonElement>('[data-suivant]');
  const boutonEnvoyer = form.querySelector<HTMLButtonElement>('[data-envoyer]');
  const merci = bloc.querySelector<HTMLElement>('[data-merci]');
  const echec = bloc.querySelector<HTMLElement>('[data-echec]');
  const nomsEtapes = JSON.parse(d.nomsEtapes ?? '[]') as string[];

  let courante = 0;
  bloc.classList.add('formulaire--js');

  const montrerErreur = (message: string) => {
    if (erreur) erreur.textContent = message;
  };

  const afficher = (index: number, focus = true) => {
    courante = index;
    etapes.forEach((etape, i) => {
      etape.hidden = i !== index;
      etape.classList.toggle('entre', i === index);
    });
    segments.forEach((segment, i) => segment.classList.toggle('actif', i <= index));
    if (num) num.textContent = String(index + 1);
    if (nomEtape) nomEtape.textContent = nomsEtapes[index] ?? '';
    if (boutonPrecedent) boutonPrecedent.hidden = index === 0;
    if (boutonSuivant) boutonSuivant.hidden = index === etapes.length - 1;
    if (boutonEnvoyer) boutonEnvoyer.hidden = index !== etapes.length - 1;
    montrerErreur('');
    if (focus) {
      etapes[index].querySelector<HTMLElement>('legend')?.focus({ preventScroll: true });
      // Si le haut du formulaire est sorti de l'écran (téléphone), on y remonte.
      if (form.getBoundingClientRect().top < 80) defilerVers(form);
    }
  };

  const signaler = (message: string, champ: HTMLElement) => {
    montrerErreur(message);
    champ.setAttribute('aria-invalid', 'true');
    champ.focus();
    return false;
  };

  const valider = (index: number): boolean => {
    const etape = etapes[index];
    etape.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));

    const choix = etape.dataset.choixRequis;
    if (choix && !etape.querySelector(`input[name="${choix}"]:checked`)) {
      montrerErreur(d.erreurChoix ?? '');
      etape.querySelector<HTMLInputElement>(`input[name="${choix}"]`)?.focus();
      return false;
    }

    // Dans l'ordre de l'écran : les champs à remplir, l'email, puis la case à cocher.
    const requis = Array.from(etape.querySelectorAll<HTMLInputElement>('input[required], textarea[required]'));
    for (const champ of requis) {
      if (champ.type !== 'checkbox' && !champ.value.trim()) return signaler(champ.dataset.erreur ?? d.erreurChamp ?? '', champ);
    }

    const email = etape.querySelector<HTMLInputElement>('input[type="email"]');
    if (email && email.value.trim() && !email.checkValidity()) return signaler(d.erreurEmail ?? '', email);

    for (const champ of requis) {
      if (champ.type === 'checkbox' && !champ.checked) return signaler(d.erreurConsentement ?? '', champ);
    }
    return true;
  };

  boutonSuivant?.addEventListener('click', () => {
    if (valider(courante)) afficher(courante + 1);
  });
  boutonPrecedent?.addEventListener('click', () => afficher(courante - 1));

  // Entrée dans un champ texte : passe à l'étape suivante plutôt que d'envoyer.
  form.addEventListener('keydown', (evenement) => {
    const cible = evenement.target as HTMLElement;
    if (evenement.key === 'Enter' && cible.tagName === 'INPUT' && courante < etapes.length - 1) {
      evenement.preventDefault();
      boutonSuivant?.click();
    }
  });

  // Photos : réduites ici (1600 px, JPEG) pour un envoi léger ; l'export efface aussi les métadonnées (position GPS).
  const MAX_PHOTOS = 5;
  const COTE_MAX = 1600;
  const saisiePhotos = form.querySelector<HTMLInputElement>('[data-photos-saisie]');
  const listePhotos = form.querySelector<HTMLElement>('[data-photos-liste]');
  const photos: File[] = [];

  const reduire = async (fichier: File): Promise<File> => {
    const image = await createImageBitmap(fichier, { imageOrientation: 'from-image' });
    const echelle = Math.min(1, COTE_MAX / Math.max(image.width, image.height));
    const toile = document.createElement('canvas');
    toile.width = Math.round(image.width * echelle);
    toile.height = Math.round(image.height * echelle);
    toile.getContext('2d')?.drawImage(image, 0, 0, toile.width, toile.height);
    image.close();
    const blob = await new Promise<Blob | null>((resolve) => toile.toBlob(resolve, 'image/jpeg', 0.82));
    if (!blob) throw new Error('photo');
    return new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
  };

  const dessinerPhotos = () => {
    if (!listePhotos) return;
    listePhotos.replaceChildren();
    photos.forEach((photo, i) => {
      const vignette = document.createElement('li');
      vignette.className = 'photos__vignette';
      const image = document.createElement('img');
      image.alt = '';
      image.src = URL.createObjectURL(photo);
      image.onload = () => URL.revokeObjectURL(image.src);
      const retirer = document.createElement('button');
      retirer.type = 'button';
      retirer.className = 'photos__retirer';
      retirer.setAttribute('aria-label', `${d.photoRetirer ?? ''} ${i + 1}`.trim());
      retirer.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
      retirer.addEventListener('click', () => {
        photos.splice(i, 1);
        dessinerPhotos();
        montrerErreur('');
      });
      vignette.append(image, retirer);
      listePhotos.append(vignette);
    });
  };

  form.querySelector('[data-photos-bouton]')?.addEventListener('click', () => saisiePhotos?.click());
  saisiePhotos?.addEventListener('change', async () => {
    const choisies = Array.from(saisiePhotos.files ?? []);
    saisiePhotos.value = '';
    let message = '';
    for (const fichier of choisies) {
      if (photos.length >= MAX_PHOTOS) {
        message = d.erreurPhotosMax ?? '';
        break;
      }
      try {
        photos.push(await reduire(fichier));
      } catch {
        message = d.erreurPhoto ?? '';
      }
    }
    dessinerPhotos();
    montrerErreur(message);
  });

  // Un changement efface le message d'erreur.
  form.addEventListener('change', (evenement) => {
    if (evenement.target !== saisiePhotos) montrerErreur('');
  });

  /** Le texte lisible de la demande : data-recap = [[nom du champ, libellé], …], "" pour une ligne vide. */
  const resume = (): string => {
    const donnees = new FormData(form);
    const lignes = JSON.parse(d.recap ?? '[]') as ([string, string] | '')[];
    const dp = d.deuxPoints ?? ' : ';
    return lignes
      .map((ligne) => {
        if (!ligne) return '';
        const [nom, libelle] = ligne;
        const valeur = donnees.getAll(nom).map(String).filter(Boolean).join(', ').trim();
        return valeur ? `${libelle}${dp}${valeur}` : null;
      })
      .filter((ligne): ligne is string => ligne !== null)
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  };

  let donneesEnvoyees: FormData | null = null;

  const terminer = (panneau: HTMLElement | null, confirme = false) => {
    form.hidden = true;
    if (!panneau) return;
    if (panneau === merci) {
      const message = `${d.introSuite ?? ''}\n\n${resume()}`;
      const whatsapp = panneau.querySelector<HTMLAnchorElement>('[data-suite-whatsapp]');
      if (whatsapp) whatsapp.href = `https://wa.me/${d.whatsapp}?text=${encodeURIComponent(message)}`;
      const confirmation = panneau.querySelector<HTMLElement>('[data-merci-confirmation]');
      const adresse = panneau.querySelector<HTMLElement>('[data-confirmation-email]');
      if (confirmation && adresse) {
        adresse.textContent = (donneesEnvoyees?.get('email') as string | null)?.trim() ?? '';
        confirmation.hidden = !confirme;
      }
    }
    panneau.hidden = false;
    panneau.focus({ preventScroll: true });
    if (panneau.getBoundingClientRect().top < 80) defilerVers(panneau);
  };

  form.addEventListener('submit', async (evenement) => {
    evenement.preventDefault();
    if (!valider(courante)) return;

    const texteBouton = boutonEnvoyer?.querySelector('.bouton__texte');
    const texteInitial = texteBouton?.textContent ?? '';
    if (boutonEnvoyer) boutonEnvoyer.disabled = true;
    if (texteBouton) texteBouton.textContent = d.enCours ?? '…';

    // Le formulaire avec les photos réduites ; « Accept » demande une réponse JSON, pas une page.
    const donnees = new FormData(form);
    donneesEnvoyees = donnees;
    donnees.delete('photos');
    photos.forEach((photo) => donnees.append('photos', photo, photo.name));

    try {
      const reponse = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: donnees,
      });
      const retour = reponse.ok ? ((await reponse.json().catch(() => ({}))) as { confirmation?: boolean }) : null;
      terminer(retour ? merci : echec, retour?.confirmation === true);
    } catch {
      terminer(echec);
    } finally {
      if (boutonEnvoyer) boutonEnvoyer.disabled = false;
      if (texteBouton) texteBouton.textContent = texteInitial;
    }
  });

  bloc.querySelector('[data-recommencer]')?.addEventListener('click', () => {
    form.reset();
    photos.length = 0;
    dessinerPhotos();
    form.hidden = false;
    if (merci) merci.hidden = true;
    if (echec) echec.hidden = true;
    afficher(0);
  });
  bloc.querySelector('[data-reessayer]')?.addEventListener('click', () => {
    form.hidden = false;
    if (echec) echec.hidden = true;
    afficher(etapes.length - 1);
  });

  // Pré-sélection depuis l'adresse (ex. ?travaux=toiture, ?metier=carrelage).
  const valeur = d.param ? new URLSearchParams(location.search).get(d.param) : null;
  if (valeur) {
    form.querySelectorAll<HTMLInputElement>('input[data-cles]').forEach((caseACocher) => {
      if ((caseACocher.dataset.cles ?? '').split(' ').includes(valeur)) caseACocher.checked = true;
    });
  }

  // « Autre chose » coché : le champ « de quoi s'agit-il » apparaît et devient obligatoire.
  const caseAutre = form.querySelector<HTMLInputElement>('[data-autre-case]');
  const champAutre = form.querySelector<HTMLElement>('[data-autre-champ]');
  const saisieAutre = champAutre?.querySelector<HTMLInputElement>('input');
  const basculerAutre = () => {
    if (!caseAutre || !champAutre || !saisieAutre) return;
    champAutre.hidden = !caseAutre.checked;
    saisieAutre.required = caseAutre.checked;
    saisieAutre.removeAttribute('aria-invalid');
  };
  caseAutre?.addEventListener('change', () => {
    basculerAutre();
    if (caseAutre.checked) saisieAutre?.focus({ preventScroll: true });
  });
  form.addEventListener('reset', () => setTimeout(basculerAutre));
  basculerAutre();

  afficher(0, false);
}

document.querySelectorAll<HTMLElement>('[data-formulaire]').forEach(initialiser);
