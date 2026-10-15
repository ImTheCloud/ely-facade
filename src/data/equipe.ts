/**
 * Les portraits des deux frères (fournis par Claudiu, sans métadonnées, dans src/assets/equipe/).
 * Elisei : photo en costume. Simi : deux photos, une par page (accueil, À propos).
 */
import elisei from '../assets/equipe/elisei.jpg';
import simiLac from '../assets/equipe/simi-lac.jpg';
import simiParis from '../assets/equipe/simi-paris.jpg';

export const portraits = {
  accueil: { Elisei: elisei, Simi: simiParis },
  apropos: { Elisei: elisei, Simi: simiLac },
} as const;
