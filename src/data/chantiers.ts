/**
 * Les chantiers et leurs photos (sans métadonnées, sans adresse : seule la commune est affichée).
 * Les photos sont rangées par chantier dans src/assets/photos/<chantier>/<photo>.jpg (voir scripts/importer-photos.mjs).
 * Les textes (titres, textes alternatifs) sont dans src/i18n : chantiers.<clé> et photos['<chemin>'].
 */
import type { Langue } from '../i18n';

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

export type Commune = 'mons' | 'namur' | 'halle' | 'charleroi' | 'evere';

export type CleChantier = 'umons' | 'namur-immeuble' | 'namur-balcons' | 'halle' | 'charleroi' | 'evere';

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
  /**
   * « curseur » : les deux photos sont prises du même endroit, on les superpose.
   * « duo » : les angles sont trop différents pour un curseur, les deux photos sont côte à côte.
   */
  mode: 'curseur' | 'duo';
  /** Rapport largeur / hauteur du cadre (curseur). */
  ratio: number;
  cadreAvant?: Cadrage;
  cadreApres?: Cadrage;
}

export interface Chantier {
  cle: CleChantier;
  commune: Commune;
  slug: Record<Langue, string>;
  /** La photo de couverture (carte, haut de la page du chantier). */
  couverture: string;
  /** Toutes les photos du chantier, dans l'ordre du chantier (pendant → après). */
  photos: string[];
  /** Les avant/après du chantier (même endroit, angle proche). */
  paires: Paire[];
  /** Un chantier avec une seule photo n'a pas de page à lui : il figure dans la liste des réalisations. */
  page: boolean;
}

export const CHANTIERS: Chantier[] = [
  {
    cle: 'umons',
    commune: 'mons',
    slug: { fr: 'universite-de-mons', nl: 'universiteit-van-bergen' },
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
        mode: 'curseur',
        ratio: 16 / 9,
        cadreAvant: { zoom: 1.13, tx: -13, ty: -5 },
      },
      {
        avant: 'mons-umons-longue-facade/pendant',
        apres: 'mons-umons-longue-facade/apres',
        mode: 'curseur',
        ratio: 16 / 9,
        cadreAvant: { zoom: 1.12, tx: -11.8, ty: -5.6 },
      },
    ],
    page: true,
  },
  {
    cle: 'namur-immeuble',
    commune: 'namur',
    slug: { fr: 'namur-immeuble-trois-etages', nl: 'namen-gebouw-drie-verdiepingen' },
    couverture: 'accueil/hero-namur',
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
        mode: 'curseur',
        ratio: 4 / 3,
        cadreApres: { zoom: 1.08, tx: -1, ty: -8 },
      },
    ],
    page: true,
  },
  {
    cle: 'namur-balcons',
    commune: 'namur',
    slug: { fr: 'namur-immeuble-a-balcons', nl: 'namen-gebouw-met-balkons' },
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
        mode: 'duo',
        ratio: 4 / 3,
        cadreAvant: { py: 40 },
        cadreApres: { px: 33 },
      },
    ],
    page: true,
  },
  {
    cle: 'halle',
    commune: 'halle',
    slug: { fr: 'halle-maison', nl: 'halle-woning' },
    couverture: 'halle-maison/final-entree',
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
        mode: 'duo',
        ratio: 4 / 3,
        cadreAvant: { px: 40 },
        cadreApres: { px: 62 },
      },
    ],
    page: true,
  },
  {
    cle: 'charleroi',
    commune: 'charleroi',
    slug: { fr: 'charleroi-maisons', nl: 'charleroi-woningen' },
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
        mode: 'duo',
        ratio: 4 / 3,
        cadreAvant: { px: 58 },
        cadreApres: { px: 45 },
      },
      {
        avant: 'charleroi-rangee-1/pendant',
        apres: 'charleroi-rangee-1/apres',
        mode: 'duo',
        ratio: 4 / 3,
        cadreAvant: { px: 50 },
        cadreApres: { px: 30 },
      },
    ],
    page: true,
  },
  {
    cle: 'evere',
    commune: 'evere',
    slug: { fr: 'evere-immeuble', nl: 'evere-gebouw' },
    couverture: 'evere-immeuble/nuit',
    photos: ['evere-immeuble/nuit'],
    paires: [],
    page: false,
  },
];

export function chantier(cle: CleChantier): Chantier {
  return CHANTIERS.find((c) => c.cle === cle)!;
}

/**
 * « Les étapes d'une façade » : l'immeuble de quatre étages de l'Université de Mons, dans l'ordre
 * confirmé par Elisei (le 15 octobre 2026), puis la cour intérieure terminée pour l'étape finale.
 * Chaque étape montre une ou deux photos.
 */
export const ETAPES_FACADE: { cle: 'preparation' | 'isolation' | 'sousEnduit' | 'finition' | 'termine'; photos: string[] }[] = [
  { cle: 'preparation', photos: ['mons-umons-immeuble-angle/etape-1-membrane-1', 'mons-umons-immeuble-angle/etape-1-membrane-2'] },
  { cle: 'isolation', photos: ['mons-umons-immeuble-angle/etape-1-membrane-3', 'mons-umons-immeuble-angle/etape-1-membrane-4'] },
  { cle: 'sousEnduit', photos: ['mons-umons-immeuble-angle/etape-2-sous-couche'] },
  { cle: 'finition', photos: ['mons-umons-immeuble-angle/etape-3-termine'] },
  { cle: 'termine', photos: ['mons-umons-cour/etape-3-aile-terminee'] },
];
