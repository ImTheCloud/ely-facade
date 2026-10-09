/** Les photos de chantier (sans métadonnées, sans adresse : seule la commune est affichée). */
import grand from '../assets/photos/mons-grand-batiment.jpg';
import echafaudage from '../assets/photos/charleroi-echafaudage.jpg';
import immeuble from '../assets/photos/namur-immeuble.jpg';
import angle from '../assets/photos/mons-facade-angle.jpg';
import isolation from '../assets/photos/charleroi-isolation.jpg';
import namur from '../assets/photos/namur-echafaudage.jpg';
import maisons from '../assets/photos/charleroi-maisons.jpg';
import finie from '../assets/photos/namur-facade-finie.jpg';
import facadeBlanche from '../assets/photos/mons-facade-blanche.jpg';

export const photos = { grand, echafaudage, immeuble, angle, isolation, namur, maisons, finie } as const;
export type ClePhoto = keyof typeof photos;

/** La grande photo du haut de l'accueil. */
export const photoHero = facadeBlanche;
