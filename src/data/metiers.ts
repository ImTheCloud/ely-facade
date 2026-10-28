/**
 * Les métiers de la façade, de A à Z. Les textes sont dans src/i18n (metiers.<clé>).
 * Ils s'affichent tous sur la page Services (une ancre par métier : /services/#crepi), et chacun a sa page (lienMetier).
 */
import type { NomIcone } from '../components/Icon.astro';
import { chemin, type Langue } from '../i18n';
import { SLUGS_METIERS } from '../i18n/slugs';

export type CleMetier = 'crepi' | 'isolation' | 'peinture' | 'nettoyage' | 'hydrofuge' | 'rejointoiement' | 'briques' | 'plaquettes' | 'fissures' | 'echafaudage';

export const METIERS: { cle: CleMetier; icone: NomIcone }[] = [
  { cle: 'crepi', icone: 'truelle' },
  { cle: 'isolation', icone: 'isolation' },
  { cle: 'peinture', icone: 'rouleau' },
  { cle: 'nettoyage', icone: 'goutte' },
  { cle: 'hydrofuge', icone: 'hydrofuge' },
  { cle: 'rejointoiement', icone: 'joint' },
  { cle: 'briques', icone: 'brique' },
  { cle: 'plaquettes', icone: 'plaquettes' },
  { cle: 'fissures', icone: 'fissure' },
  { cle: 'echafaudage', icone: 'echafaudage' },
];

/** L'adresse de la page d'un métier. */
export function lienMetier(cle: CleMetier, langue: Langue): string {
  return `${chemin('services', langue)}${SLUGS_METIERS[cle][langue]}/`;
}
