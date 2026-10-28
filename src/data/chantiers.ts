/**
 * Les chantiers et leurs photos (sans métadonnées, sans adresse : seule la commune est affichée).
 * Les photos sont rangées par chantier dans src/assets/photos/<chantier>/<photo>.jpg (voir scripts/importer-photos.mjs).
 * Les textes (titres, textes alternatifs) sont dans src/i18n : chantiers.<clé> et photos['<chemin>'].
 */
import { chemin, type Langue } from '../i18n';
import { SLUGS_CHANTIERS } from '../i18n/slugs';

const fichiers = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*/*.jpg', { eager: true });

/** Une photo par son chemin, ex. photo('mons-umons-cour/etape-3-aile-terminee'). */
export function photo(chemin: string): ImageMetadata {
  const module = fichiers[`../assets/photos/${chemin}.jpg`];
  if (!module) throw new Error(`Photo introuvable : ${chemin}`);
  return module.default;
}

/** La photo du haut de page : l'immeuble de Namur terminé, vu d'en haut (ciel prolongé au-dessus du toit). */
export const heroPhoto = {
  image: photo('accueil/hero-namur'),
  mobile: photo('accueil/hero-namur-mobile'),
} as const;

export type Commune = 'mons' | 'namur' | 'halle' | 'charleroi' | 'auderghem' | 'evere';

export type CleChantier = 'umons' | 'namur-immeuble' | 'namur-balcons' | 'halle' | 'charleroi' | 'charleroi-deux-couleurs' | 'auderghem' | 'evere';

/**
 * Cadrage d'une photo dans un avant/après :
 * - px, py : position de la photo dans son cadre (object-position, en %) ;
 * - tx, ty, zoom : déplacement (en % du cadre) puis agrandissement depuis le coin haut gauche,
 *   pour que la façade « pendant » se superpose à la façade « terminé » (mesuré à l'œil sur une grille).
 */
export interface Cadrage {
  px?: number;
  py?: number;
  tx?: number;
  ty?: number;
  zoom?: number;
}

export interface Paire {
  avant: string;
  apres: string;
  /** Rapport largeur / hauteur du cadre du curseur. */
  ratio: number;
  cadreAvant?: Cadrage;
  cadreApres?: Cadrage;
}

export interface Chantier {
  cle: CleChantier;
  commune: Commune;
  /** L'adresse de sa page (src/i18n/slugs.ts). Un chantier avec une seule photo n'a pas de page : il figure dans la liste des réalisations. */
  slug?: Record<Langue, string>;
  /** La photo de couverture (carte, haut de la page du chantier). */
  couverture: string;
  /** Toutes les photos du chantier, dans l'ordre du chantier (pendant → après). */
  photos: string[];
  /**
   * Les avant/après du chantier (même endroit, angle proche). Le cadre (ratio) suit la forme des photos :
   * deux photos horizontales → 4/3 ou 16/9 ; une horizontale et une verticale → carré, pour n'en abîmer aucune.
   */
  paires: Paire[];
}

export const CHANTIERS: Chantier[] = [
  {
    cle: 'namur-immeuble',
    commune: 'namur',
    slug: SLUGS_CHANTIERS['namur-immeuble'],
    // La couverture est l'immeuble de l'avant/après ; la photo du haut de l'accueil (même site) termine la galerie.
    couverture: 'namur-immeuble-3-etages/apres-rue',
    photos: [
      'namur-immeuble-3-etages/pendant-face',
      'namur-immeuble-3-etages/pendant-rue',
      'namur-immeuble-3-etages/apres-rue',
      'accueil/hero-namur',
    ],
    paires: [
      {
        avant: 'namur-immeuble-3-etages/pendant-rue',
        apres: 'namur-immeuble-3-etages/apres-rue',
        ratio: 4 / 3,
        cadreApres: { zoom: 1.08, tx: -1, ty: -8 },
      },
    ],
  },
  {
    cle: 'namur-balcons',
    commune: 'namur',
    slug: SLUGS_CHANTIERS['namur-balcons'],
    couverture: 'namur-immeuble-balcons/apres-cote-gauche',
    photos: [
      'namur-immeuble-balcons/pendant-debut-1',
      'namur-immeuble-balcons/pendant-debut-2',
      'namur-immeuble-balcons/pendant-loin-1',
      'namur-immeuble-balcons/pendant-loin-2',
      'namur-immeuble-balcons/pendant-loin-3',
      'namur-immeuble-balcons/pendant-grue',
      'namur-immeuble-balcons/pendant-cote-gauche',
      'namur-immeuble-balcons/apres-cote-gauche',
      'namur-immeuble-balcons/apres-coin',
    ],
    paires: [
      {
        avant: 'namur-immeuble-balcons/pendant-cote-gauche',
        apres: 'namur-immeuble-balcons/apres-cote-gauche',
        ratio: 1,
        cadreAvant: { py: 45 },
        cadreApres: { px: 38 },
      },
    ],
  },
  {
    cle: 'umons',
    commune: 'mons',
    slug: SLUGS_CHANTIERS.umons,
    couverture: 'mons-umons-cour/etape-3-aile-terminee',
    photos: [
      'mons-umons-immeuble-angle/etape-1-membrane-1',
      'mons-umons-immeuble-angle/etape-1-membrane-2',
      'mons-umons-immeuble-angle/etape-1-membrane-3',
      'mons-umons-immeuble-angle/etape-1-membrane-4',
      'mons-umons-immeuble-angle/etape-2-sous-couche',
      'mons-umons-immeuble-angle/etape-3-termine',
      'mons-umons-cour/etape-1-membrane',
      'mons-umons-cour/etape-2-isolation',
      'mons-umons-cour/etape-3-aile-terminee',
      'mons-umons-longue-facade/pendant',
      'mons-umons-longue-facade/apres',
    ],
    paires: [
      {
        avant: 'mons-umons-cour/etape-2-isolation',
        apres: 'mons-umons-cour/etape-3-aile-terminee',
        ratio: 16 / 9,
        cadreAvant: { zoom: 1.13, tx: -13, ty: -5 },
      },
      {
        avant: 'mons-umons-longue-facade/pendant',
        apres: 'mons-umons-longue-facade/apres',
        ratio: 16 / 9,
        cadreAvant: { zoom: 1.12, tx: -11.8, ty: -5.6 },
      },
    ],
  },
  {
    cle: 'halle',
    commune: 'halle',
    slug: SLUGS_CHANTIERS.halle,
    couverture: 'halle-maison/final-baie-vitree',
    photos: [
      'halle-maison/pendant-pignon',
      'halle-maison/apres-pignon',
      'halle-maison/final-entree',
      'halle-maison/final-angle',
      'halle-maison/final-baie-vitree',
    ],
    paires: [
      {
        avant: 'halle-maison/pendant-pignon',
        apres: 'halle-maison/apres-pignon',
        ratio: 1,
        cadreAvant: { px: 48 },
        cadreApres: { py: 38 },
      },
    ],
  },
  {
    cle: 'charleroi',
    commune: 'charleroi',
    slug: SLUGS_CHANTIERS.charleroi,
    couverture: 'charleroi-vue-ensemble/apres',
    photos: [
      'charleroi-rangee-1/pendant',
      'charleroi-rangee-1/apres',
      'charleroi-rangee-2/pendant',
      'charleroi-rangee-2/apres',
      'charleroi-vue-ensemble/apres',
    ],
    paires: [
      {
        avant: 'charleroi-rangee-2/pendant',
        apres: 'charleroi-rangee-2/apres',
        ratio: 4 / 3,
        cadreAvant: { px: 58 },
        cadreApres: { px: 45 },
      },
      {
        avant: 'charleroi-rangee-1/pendant',
        apres: 'charleroi-rangee-1/apres',
        ratio: 4 / 3,
        cadreAvant: { px: 50 },
        cadreApres: { px: 30 },
      },
    ],
  },
  {
    cle: 'charleroi-deux-couleurs',
    commune: 'charleroi',
    slug: SLUGS_CHANTIERS['charleroi-deux-couleurs'],
    couverture: 'charleroi-deux-couleurs/angle-apres',
    // Ordre des travaux (confirmé par Elisei) : panneaux noirs, couche crème, couche anthracite à la fin, puis la maison terminée.
    photos: [
      'charleroi-deux-couleurs/coin-pendant-1',
      'charleroi-deux-couleurs/coin-pendant-2',
      'charleroi-deux-couleurs/annexe-pendant-1',
      'charleroi-deux-couleurs/toit-terrasse-pendant',
      'charleroi-deux-couleurs/jardin-haut-pendant-1',
      'charleroi-deux-couleurs/face-pendant',
      'charleroi-deux-couleurs/jardin-pendant',
      'charleroi-deux-couleurs/angle-pendant',
      'charleroi-deux-couleurs/annexe-pendant-2',
      'charleroi-deux-couleurs/arriere-pendant',
      'charleroi-deux-couleurs/jardin-haut-pendant-2',
      'charleroi-deux-couleurs/face-apres',
      'charleroi-deux-couleurs/angle-apres',
      'charleroi-deux-couleurs/angle-apres-2',
      'charleroi-deux-couleurs/arriere-apres',
      'charleroi-deux-couleurs/coin-apres',
      'charleroi-deux-couleurs/annexe-apres',
      'charleroi-deux-couleurs/toit-terrasse-apres',
    ],
    paires: [
      // La plus parlante (le côté, avec l'étage anthracite) : elle passe en premier, donc sur l'accueil et la carte.
      {
        avant: 'charleroi-deux-couleurs/arriere-pendant',
        apres: 'charleroi-deux-couleurs/arriere-apres',
        ratio: 4 / 3,
      },
      {
        avant: 'charleroi-deux-couleurs/coin-pendant-2',
        apres: 'charleroi-deux-couleurs/coin-apres',
        ratio: 4 / 3,
      },
      {
        avant: 'charleroi-deux-couleurs/annexe-pendant-1',
        apres: 'charleroi-deux-couleurs/annexe-apres',
        ratio: 4 / 3,
        cadreAvant: { zoom: 1.11, tx: -4.9, ty: -3.9 },
      },
      {
        avant: 'charleroi-deux-couleurs/toit-terrasse-pendant',
        apres: 'charleroi-deux-couleurs/toit-terrasse-apres',
        ratio: 4 / 3,
        cadreAvant: { zoom: 1.5, tx: -25.2, ty: -25.4 },
      },
    ],
  },
  {
    cle: 'auderghem',
    commune: 'auderghem',
    slug: SLUGS_CHANTIERS.auderghem,
    couverture: 'auderghem-maison/cote-apres',
    photos: [
      'auderghem-maison/rue-pendant-1',
      'auderghem-maison/rue-pendant-2',
      'auderghem-maison/rue-pendant-3',
      'auderghem-maison/rue-pendant-4',
      'auderghem-maison/arriere-pendant',
      'auderghem-maison/arriere-apres',
      'auderghem-maison/cote-apres',
      'auderghem-maison/finition-angle',
      'auderghem-maison/finition-mur-long',
      'auderghem-maison/finition-arete',
      'auderghem-maison/finition-fenetres',
      'auderghem-maison/finition-detail',
      'auderghem-maison/finition-avancee',
    ],
    paires: [
      {
        avant: 'auderghem-maison/arriere-pendant',
        apres: 'auderghem-maison/arriere-apres',
        ratio: 4 / 3,
        cadreAvant: { zoom: 1.2, tx: -10.6, ty: -19.5 },
      },
    ],
  },
  {
    cle: 'evere',
    commune: 'evere',
    couverture: 'evere-immeuble/nuit',
    photos: ['evere-immeuble/nuit'],
    paires: [],
  },
];

export function chantier(cle: CleChantier): Chantier {
  return CHANTIERS.find((c) => c.cle === cle)!;
}

/** L'adresse de la page d'un chantier. */
export function lienChantier(cle: CleChantier, langue: Langue): string {
  const slug = chantier(cle).slug;
  if (!slug) throw new Error(`Pas de page pour le chantier ${cle}`);
  return `${chemin('realisations', langue)}${slug[langue]}/`;
}

/**
 * « Les étapes d'une façade » : l'immeuble de quatre étages de l'Université de Mons, dans l'ordre
 * confirmé par Elisei (le 15 octobre 2026). La dernière étape montre l'immeuble terminé, puis la cour intérieure
 * (un autre point de vue sur la même université). Chaque étape montre une ou deux photos.
 */
export const ETAPES_FACADE: { cle: 'preparation' | 'isolation' | 'sousEnduit' | 'termine'; photos: string[] }[] = [
  { cle: 'preparation', photos: ['mons-umons-immeuble-angle/etape-1-membrane-1', 'mons-umons-immeuble-angle/etape-1-membrane-2'] },
  { cle: 'isolation', photos: ['mons-umons-immeuble-angle/etape-1-membrane-3', 'mons-umons-immeuble-angle/etape-1-membrane-4'] },
  { cle: 'sousEnduit', photos: ['mons-umons-immeuble-angle/etape-2-sous-couche'] },
  { cle: 'termine', photos: ['mons-umons-immeuble-angle/etape-3-termine', 'mons-umons-cour/etape-3-aile-terminee'] },
];
