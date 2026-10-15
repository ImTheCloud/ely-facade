/**
 * Les cinq métiers : uniquement la façade. Les textes sont dans src/i18n (metiers.<clé>).
 * Les pages métier sont à /services/<slug>/ (FR) et /nl/diensten/<slug>/ (NL).
 */
import type { NomIcone } from '../components/Icon.astro';
import { chemin, type Langue } from '../i18n';

export type CleMetier = 'crepi' | 'peinture' | 'nettoyage' | 'rejointoiement' | 'briques';

export const METIERS: { cle: CleMetier; icone: NomIcone; slug: Record<Langue, string> }[] = [
  { cle: 'crepi', icone: 'truelle', slug: { fr: 'crepi-enduit', nl: 'gevelpleister' } },
  { cle: 'peinture', icone: 'rouleau', slug: { fr: 'peinture-facade', nl: 'gevelschilderwerk' } },
  { cle: 'nettoyage', icone: 'goutte', slug: { fr: 'nettoyage-facade', nl: 'gevelreiniging' } },
  { cle: 'rejointoiement', icone: 'joint', slug: { fr: 'rejointoiement', nl: 'voegwerk' } },
  { cle: 'briques', icone: 'brique', slug: { fr: 'reparation-briques', nl: 'herstel-bakstenen' } },
];

/** L'adresse de la page d'un métier. */
export function lienMetier(cle: CleMetier, langue: Langue): string {
  const metier = METIERS.find((m) => m.cle === cle)!;
  return `${chemin('services', langue)}${metier.slug[langue]}/`;
}
