/**
 * Les métiers de la façade, de A à Z. Les textes sont dans src/i18n (metiers.<clé>).
 * Ils s'affichent tous sur la page Services (une ancre par métier : /services/#crepi).
 */
import type { NomIcone } from '../components/Icon.astro';

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
