/**
 * Les photos de chantier (sans métadonnées, sans adresse : seule la commune est affichée).
 * Elles sont rangées par chantier dans src/assets/photos/<chantier>/<photo>.jpg (voir scripts/importer-photos.mjs).
 */
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
