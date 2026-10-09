/** Les photos de chantier (sans métadonnées, sans adresse : seule la commune est affichée). */
import namurAvant from '../assets/photos/namur-avant.jpg';
import namurApres from '../assets/photos/namur-apres.jpg';
import charleroiAvant from '../assets/photos/charleroi-avant.jpg';
import charleroiApres from '../assets/photos/charleroi-apres.jpg';
import monsAvant from '../assets/photos/mons-avant.jpg';
import monsApres from '../assets/photos/mons-apres.jpg';
import isolation from '../assets/photos/charleroi-isolation.jpg';
import souscouche from '../assets/photos/charleroi-echafaudage.jpg';
import crepi from '../assets/photos/mons-facade-blanche.jpg';

/** Les paires avant/après : même endroit, même angle (la photo « après » est recalée sur la photo « avant »). */
export const paires = {
  namur: { avant: namurAvant, apres: namurApres },
  charleroi: { avant: charleroiAvant, apres: charleroiApres },
  mons: { avant: monsAvant, apres: monsApres },
} as const;
export type ClePaire = keyof typeof paires;

/** Les photos des étapes d'une rénovation. */
export const etapes = {
  echafaudage: charleroiAvant,
  isolation,
  souscouche,
  crepi,
  termine: charleroiApres,
} as const;
export type CleEtape = keyof typeof etapes;
