/**
 * Les adresses traduites des pages métier et des pages chantier :
 * /services/crepi-enduit/ ↔ /nl/diensten/gevelpleister/, /realisations/halle-maison/ ↔ /nl/realisaties/halle-woning/.
 * À part des données (src/data) pour que le sitemap (astro.config.mjs) les lise sans charger les photos.
 */
import type { Langue } from '.';

export const SLUGS_METIERS = {
  crepi: { fr: 'crepi-enduit', nl: 'gevelpleister' },
  peinture: { fr: 'peinture-facade', nl: 'gevelschilderwerk' },
  nettoyage: { fr: 'nettoyage-facade', nl: 'gevelreiniging' },
  rejointoiement: { fr: 'rejointoiement', nl: 'voegwerk' },
  briques: { fr: 'reparation-briques', nl: 'herstel-bakstenen' },
} as const satisfies Record<string, Record<Langue, string>>;

/** Seuls les chantiers qui ont plusieurs photos ont une page. */
export const SLUGS_CHANTIERS = {
  umons: { fr: 'universite-de-mons', nl: 'universiteit-van-bergen' },
  'namur-immeuble': { fr: 'namur-immeuble-trois-etages', nl: 'namen-gebouw-drie-verdiepingen' },
  'namur-balcons': { fr: 'namur-immeuble-a-balcons', nl: 'namen-gebouw-met-balkons' },
  halle: { fr: 'halle-maison', nl: 'halle-woning' },
  charleroi: { fr: 'charleroi-maisons', nl: 'charleroi-woningen' },
} as const satisfies Record<string, Record<Langue, string>>;
