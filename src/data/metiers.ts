/**
 * Les métiers de la façade, de A à Z. Les textes sont dans src/i18n (metiers.<clé>).
 * Les pages métier sont à /services/<slug>/ (FR) et /nl/diensten/<slug>/ (NL), voir src/i18n/slugs.ts.
 */
import type { NomIcone } from '../components/Icon.astro';
import { chemin, type Langue } from '../i18n';
import { SLUGS_METIERS } from '../i18n/slugs';

export type CleMetier = 'crepi' | 'isolation' | 'peinture' | 'nettoyage' | 'hydrofuge' | 'rejointoiement' | 'briques' | 'fissures' | 'echafaudage';

export const METIERS: { cle: CleMetier; icone: NomIcone; slug: Record<Langue, string> }[] = [
  { cle: 'crepi', icone: 'truelle', slug: SLUGS_METIERS.crepi },
  { cle: 'isolation', icone: 'isolation', slug: SLUGS_METIERS.isolation },
  { cle: 'peinture', icone: 'rouleau', slug: SLUGS_METIERS.peinture },
  { cle: 'nettoyage', icone: 'goutte', slug: SLUGS_METIERS.nettoyage },
  { cle: 'hydrofuge', icone: 'hydrofuge', slug: SLUGS_METIERS.hydrofuge },
  { cle: 'rejointoiement', icone: 'joint', slug: SLUGS_METIERS.rejointoiement },
  { cle: 'briques', icone: 'brique', slug: SLUGS_METIERS.briques },
  { cle: 'fissures', icone: 'fissure', slug: SLUGS_METIERS.fissures },
  { cle: 'echafaudage', icone: 'echafaudage', slug: SLUGS_METIERS.echafaudage },
];

/** L'adresse de la page d'un métier. */
export function lienMetier(cle: CleMetier, langue: Langue): string {
  const metier = METIERS.find((m) => m.cle === cle)!;
  return `${chemin('services', langue)}${metier.slug[langue]}/`;
}
