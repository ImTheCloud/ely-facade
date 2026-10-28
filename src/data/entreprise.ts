/**
 * Les faits vérifiés sur l'entreprise.
 * Ils ne changent pas d'une langue à l'autre.
 * Ne rien ajouter ici qui ne soit pas confirmé par le client.
 */
import { chemin, type Langue } from '../i18n';

export const entreprise = {
  nomCourt: 'Ely Facade',
  /** Raison sociale exacte (BCE) : seulement dans les mentions légales. */
  raisonSociale: 'ELY FAÇADE BV',
  /** Le bureau (siège), Bergensesteenweg 745, 1502 Halle. */
  rue: 'Bergensesteenweg 745',
  codePostal: '1502',
  ville: 'Halle',
  /** Numéro d'entreprise (BCE) ; la TVA est le même numéro précédé de BE. */
  numeroEntreprise: '1030.283.223',
  gerant: 'Elisei Ungureanu',
  /** Le nom de famille des deux frères. */
  nomFamille: 'Ungureanu',

  /** Affiché à l'écran, format belge. */
  telephoneAffiche: '0492 43 96 17',
  /** Pour le lien « Appeler ». */
  telephoneLien: '+32492439617',
  /** Pour le lien WhatsApp (sans + ni espaces). */
  whatsappNumero: '32492439617',

  email: 'info@elyfacade.be',
} as const;

/** L'itinéraire vers le bureau, dans Google Maps (un simple lien : rien n'est chargé depuis Google sur nos pages). */
export const lienItineraire = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${entreprise.nomCourt}, ${entreprise.rue}, ${entreprise.codePostal} ${entreprise.ville}`,
)}`;

/** L'identifiant de l'entreprise dans les données structurées : la page Services y renvoie. */
export function idEntreprise(site: URL): string {
  return new URL('/#entreprise', site).href;
}

/** Construit le lien WhatsApp avec le message déjà écrit. */
export function lienWhatsApp(message: string): string {
  return `https://wa.me/${entreprise.whatsappNumero}?text=${encodeURIComponent(message)}`;
}

/** Tous les boutons « Demander un devis » mènent au formulaire de la page contact. */
export function lienDevis(langue: Langue): string {
  return `${chemin('contact', langue)}#devis`;
}
