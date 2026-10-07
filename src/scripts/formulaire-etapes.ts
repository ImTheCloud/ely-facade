/**
 * Le moteur des formulaires en étapes du site (devis).
 * Le formulaire décrit ce qu'il attend avec des attributs data- ;
 * ce script fait le reste :
 *
 * - une étape à la fois, barre de progression, « Continuer » / « Retour » ;
 * - validation : [data-choix-requis="nom"] (au moins une case cochée),
 *   champs required, email valide, case de consentement ;
 * - envoi en arrière-plan par Netlify Forms (le formulaire porte data-netlify),
 *   puis confirmation sur place ; en cas d'échec, les contacts directs ;
 * - après l'envoi, [data-suite-whatsapp] et [data-suite-email] ouvrent un
 *   message qui reprend toute la demande (pour envoyer des photos, un CV…) ;
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

    for (const champ of Array.from(etape.querySelectorAll<HTMLInputElement>('input[required], textarea[required]'))) {
      if (champ.type === 'checkbox' && !champ.checked) return signaler(d.erreurConsentement ?? '', champ);
      if (champ.type !== 'checkbox' && !champ.value.trim()) return signaler(champ.dataset.erreur ?? d.erreurChamp ?? '', champ);
    }

    const email = etape.querySelector<HTMLInputElement>('input[type="email"]');
    if (email && email.value.trim() && !email.checkValidity()) return signaler(d.erreurEmail ?? '', email);
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

  // Un changement efface le message d'erreur.
  form.addEventListener('change', () => montrerErreur(''));

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

  const terminer = (panneau: HTMLElement | null) => {
    form.hidden = true;
    if (!panneau) return;
    if (panneau === merci) {
      const message = `${d.introSuite ?? ''}\n\n${resume()}`;
      const whatsapp = panneau.querySelector<HTMLAnchorElement>('[data-suite-whatsapp]');
      if (whatsapp) whatsapp.href = `https://wa.me/${d.whatsapp}?text=${encodeURIComponent(message)}`;
      const email = panneau.querySelector<HTMLAnchorElement>('[data-suite-email]');
      if (email) email.href = `mailto:${d.email}?subject=${encodeURIComponent(d.sujetSuite ?? '')}&body=${encodeURIComponent(message)}`;
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

    // Netlify Forms : les réponses encodées comme un formulaire classique, envoyées à la racine du site.
    const donnees = new URLSearchParams();
    new FormData(form).forEach((valeur, cle) => donnees.append(cle, String(valeur)));

    try {
      const reponse = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: donnees.toString(),
      });
      terminer(reponse.ok ? merci : echec);
    } catch {
      terminer(echec);
    } finally {
      if (boutonEnvoyer) boutonEnvoyer.disabled = false;
      if (texteBouton) texteBouton.textContent = texteInitial;
    }
  });

  bloc.querySelector('[data-recommencer]')?.addEventListener('click', () => {
    form.reset();
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

  afficher(0, false);
}

document.querySelectorAll<HTMLElement>('[data-formulaire]').forEach(initialiser);
