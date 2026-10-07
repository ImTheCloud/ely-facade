/**
 * Les faits vérifiés sur l'entreprise (source : docs/brief.md).
 * Ils ne changent pas d'une langue à l'autre.
 * Ne rien ajouter ici qui ne soit pas confirmé par le client.
 */
import { chemin, type Langue } from '../i18n';

export const entreprise = {
  nomCourt: 'Ely Facade',
  ville: 'Halle',

  /** Affiché à l'écran, format belge. */
  telephoneAffiche: '0492 43 96 17',
  /** Pour le lien « Appeler ». */
  telephoneLien: '+32492439617',
  /** Pour le lien WhatsApp (sans + ni espaces). */
  whatsappNumero: '32492439617',

  /** Adresse provisoire de la boîte d'Elisei, à remplacer par l'adresse pro du domaine. */
  email: 'ungureanuelisei17@gmail.com',
} as const;

/** Construit le lien WhatsApp avec le message déjà écrit. */
export function lienWhatsApp(message: string): string {
  return `https://wa.me/${entreprise.whatsappNumero}?text=${encodeURIComponent(message)}`;
}

/** Tous les boutons « Demander un devis » mènent au formulaire de la page contact. */
export function lienDevis(langue: Langue): string {
  return `${chemin('contact', langue)}#devis`;
}
