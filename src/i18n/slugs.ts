/**
 * Les adresses traduites des pages chantier :
 * /realisations/halle-maison/ ↔ /nl/realisaties/halle-woning/.
 * À part des données (src/data) pour que le sitemap (astro.config.mjs) les lise sans charger les photos.
 */
import type { CleMetier } from '../data/metiers';
import type { Langue } from '.';

/** Seuls les chantiers qui ont plusieurs photos ont une page. */
export const SLUGS_CHANTIERS = {
  umons: { fr: 'universite-de-mons', nl: 'universiteit-van-bergen' },
  'namur-immeuble': { fr: 'namur-immeuble-trois-etages', nl: 'namen-gebouw-drie-verdiepingen' },
  'namur-balcons': { fr: 'namur-immeuble-a-balcons', nl: 'namen-gebouw-met-balkons' },
  halle: { fr: 'halle-maison', nl: 'halle-woning' },
  charleroi: { fr: 'charleroi-maisons', nl: 'charleroi-woningen' },
  'charleroi-deux-couleurs': { fr: 'charleroi-maison-deux-couleurs', nl: 'charleroi-woning-twee-kleuren' },
  auderghem: { fr: 'auderghem-maison', nl: 'oudergem-woning' },
} as const satisfies Record<string, Record<Langue, string>>;

export type CleChantierAvecPage = keyof typeof SLUGS_CHANTIERS;

/** Les adresses traduites des pages métier : /services/crepi-et-enduit-de-facade/ ↔ /nl/diensten/gevelpleister/. */
export const SLUGS_METIERS = {
  crepi: { fr: 'crepi-et-enduit-de-facade', nl: 'gevelpleister' },
  isolation: { fr: 'isolation-par-l-exterieur', nl: 'buitenisolatie' },
  peinture: { fr: 'peinture-de-facade', nl: 'gevelschilderwerk' },
  nettoyage: { fr: 'nettoyage-de-facade', nl: 'gevelreiniging' },
  hydrofuge: { fr: 'traitement-hydrofuge', nl: 'gevelimpregnatie' },
  rejointoiement: { fr: 'rejointoiement', nl: 'voegwerk' },
  briques: { fr: 'reparation-de-briques', nl: 'baksteenherstel' },
  plaquettes: { fr: 'plaquettes-de-parement', nl: 'steenstrips' },
  fissures: { fr: 'traitement-des-fissures', nl: 'scheurherstel' },
  echafaudage: { fr: 'echafaudage', nl: 'steigerwerk' },
} as const satisfies Record<CleMetier, Record<Langue, string>>;
