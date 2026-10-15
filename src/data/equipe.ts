/**
 * Les portraits des deux frères (fournis par Claudiu, sans métadonnées, dans src/assets/equipe/).
 * Accueil : les deux détourés sur fond transparent (détourage fait sur le Mac, coupés à la poitrine).
 * À propos : Elisei en costume, Simi au lac.
 */
import elisei from '../assets/equipe/elisei.jpg';
import eliseiDetoure from '../assets/equipe/elisei-detoure.png';
import simiDetoure from '../assets/equipe/simi-detoure.png';
import simiLac from '../assets/equipe/simi-lac.jpg';

export const portraits = {
  accueil: { Elisei: eliseiDetoure, Simi: simiDetoure },
  apropos: { Elisei: elisei, Simi: simiLac },
} as const;
