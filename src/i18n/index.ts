import { fr } from './fr';
import { nl } from './nl';
import { SLUGS_CHANTIERS, SLUGS_METIERS } from './slugs';

export type Langue = 'fr' | 'nl';

export const LANGUES: Langue[] = ['fr', 'nl'];

const traductions = { fr, nl } as const;

/** Les textes de la langue demandée. */
export function t(langue: Langue) {
  return traductions[langue];
}

/**
 * Les adresses de chaque page dans les deux langues.
 * Une seule source : le sélecteur de langue, la navigation et le sitemap s'en servent.
 */
const ROUTES = {
  accueil: { fr: '/', nl: '/nl/' },
  services: { fr: '/services/', nl: '/nl/diensten/' },
  realisations: { fr: '/realisations/', nl: '/nl/realisaties/' },
  apropos: { fr: '/a-propos/', nl: '/nl/over-ons/' },
  contact: { fr: '/contact/', nl: '/nl/contact/' },
  mentionsLegales: { fr: '/mentions-legales/', nl: '/nl/juridische-informatie/' },
  viePrivee: { fr: '/vie-privee/', nl: '/nl/privacy/' },
} as const satisfies Record<string, Record<Langue, string>>;

type PageCle = keyof typeof ROUTES;

/** L'adresse d'une page dans une langue donnée. */
export function chemin(cle: PageCle, langue: Langue): string {
  return ROUTES[cle][langue];
}

/** Les sous-pages traduites : /realisations/halle-maison/ ↔ /nl/realisaties/halle-woning/, /services/rejointoiement/ ↔ /nl/diensten/voegwerk/. */
const SOUS_PAGES: Partial<Record<PageCle, Record<string, Record<Langue, string>>>> = {
  realisations: SLUGS_CHANTIERS,
  services: SLUGS_METIERS,
};

/**
 * La même page dans l'autre langue (/realisations/halle-maison/ → /nl/realisaties/halle-woning/).
 * Si la page n'existe pas dans l'autre langue, renvoie l'accueil de cette langue.
 */
export function memePageDansLaLangue(cheminActuel: string, cible: Langue): string {
  // La page introuvable n'a pas d'adresse à elle : le choix de langue y mène à l'accueil.
  if (/^\/(nl\/)?404\/?$/.test(cheminActuel)) return ROUTES.accueil[cible];
  const source: Langue = cheminActuel === '/nl' || cheminActuel.startsWith('/nl/') ? 'nl' : 'fr';
  if (source === cible) return cheminActuel;

  const normalise = cheminActuel.endsWith('/') ? cheminActuel : `${cheminActuel}/`;

  for (const [cle, route] of Object.entries(ROUTES) as [PageCle, (typeof ROUTES)[PageCle]][]) {
    if (normalise === route[source]) return route[cible];
    if (cle === 'accueil' || !normalise.startsWith(route[source])) continue;
    const slug = normalise.slice(route[source].length, -1);
    const sousPage = Object.values(SOUS_PAGES[cle] ?? {}).find((traduction) => traduction[source] === slug);
    if (sousPage) return `${route[cible]}${sousPage[cible]}/`;
  }
  return ROUTES.accueil[cible];
}

/** Les liens de la navigation principale, dans l'ordre. */
export function liensNavigation(langue: Langue) {
  const textes = t(langue);
  return [
    { libelle: textes.nav.services, href: chemin('services', langue) },
    { libelle: textes.nav.realisations, href: chemin('realisations', langue) },
    { libelle: textes.nav.apropos, href: chemin('apropos', langue) },
    { libelle: textes.nav.contact, href: chemin('contact', langue) },
  ];
}
