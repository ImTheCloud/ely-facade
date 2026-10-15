/** Les variantes du haut de page (voir docs/variantes.md) et celle affichée sur l'accueil. */
export const VARIANTES_HERO = ['a', 'b', 'c'] as const;
export type VarianteHero = (typeof VARIANTES_HERO)[number];
export const VARIANTE_HERO_ACCUEIL: VarianteHero = 'c';
