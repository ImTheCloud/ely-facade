/** Les photos de chantier (sans métadonnées, sans adresse : seule la commune est affichée). */
import charleroiAvant from '../assets/photos/charleroi-avant.jpg';
import charleroiApres from '../assets/photos/charleroi-apres.jpg';
import isolation from '../assets/photos/charleroi-isolation.jpg';
import souscouche from '../assets/photos/charleroi-echafaudage.jpg';
import crepi from '../assets/photos/mons-facade-blanche.jpg';

/** Les paires avant/après : même endroit, même angle. Photos masquées (visages, plaques, panneaux), sans métadonnées. */
import namurRueAvant from '../assets/photos/paires/namur-rue-avant.jpg';
import namurRueLargeAvant from '../assets/photos/paires/namur-rue-large-avant.jpg';
import namurRueApres from '../assets/photos/paires/namur-rue-apres.jpg';
import namurFaceAvant from '../assets/photos/paires/namur-face-avant.jpg';
import namurFaceApres from '../assets/photos/paires/namur-face-apres.jpg';
import monsLongueAvant from '../assets/photos/paires/mons-longue-avant.jpg';
import monsLongueApres from '../assets/photos/paires/mons-longue-apres.jpg';
import monsCourAvant1 from '../assets/photos/paires/mons-cour-avant-1.jpg';
import monsCourAvant2 from '../assets/photos/paires/mons-cour-avant-2.jpg';
import monsCourApres from '../assets/photos/paires/mons-cour-apres.jpg';
import monsAngleAvant1 from '../assets/photos/paires/mons-angle-avant-1.jpg';
import monsAngleAvant2 from '../assets/photos/paires/mons-angle-avant-2.jpg';
import monsAngleAvant3 from '../assets/photos/paires/mons-angle-avant-3.jpg';
import monsAngleApres from '../assets/photos/paires/mons-angle-apres.jpg';

export const paires = {
  'namur-rue': { avant: namurRueAvant, apres: namurRueApres },
  'namur-rue-large': { avant: namurRueLargeAvant, apres: namurRueApres },
  'namur-face': { avant: namurFaceAvant, apres: namurFaceApres },
  charleroi: { avant: charleroiAvant, apres: charleroiApres },
  'mons-longue': { avant: monsLongueAvant, apres: monsLongueApres },
  'mons-cour-1': { avant: monsCourAvant1, apres: monsCourApres },
  'mons-cour-2': { avant: monsCourAvant2, apres: monsCourApres },
  'mons-angle-1': { avant: monsAngleAvant1, apres: monsAngleApres },
  'mons-angle-2': { avant: monsAngleAvant2, apres: monsAngleApres },
  'mons-angle-3': { avant: monsAngleAvant3, apres: monsAngleApres },
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

/** Toutes les photos de chantier (sans métadonnées, sans adresse), pour la galerie. */
const fichiers = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.jpg', { eager: true });
export const galerie = Object.entries(fichiers)
  .map(([chemin, module]) => {
    const nom = chemin.split('/').pop()!.replace('.jpg', '');
    return { nom, commune: nom.split('-')[0] as 'namur' | 'charleroi' | 'mons', image: module.default };
  })
  .sort((a, b) => a.nom.localeCompare(b.nom));

/** La photo du haut de page : l'immeuble de Namur terminé, vu d'en haut. */
export const heroPhoto = { image: namurFaceApres, cadrage: '50% 35%' } as const;
