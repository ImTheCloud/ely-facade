// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { LANGUES, chemin, memePageDansLaLangue } from './src/i18n/index.ts';

// Domaine principal (à acheter) ; elyfacade.com redirigera vers lui.
const SITE = 'https://elyfacade.be';

// Les pages légales sont en noindex : hors sitemap, comme la 404 et les variantes du haut de page.
const PAGES_LEGALES = LANGUES.flatMap((langue) => [chemin('mentionsLegales', langue), chemin('viePrivee', langue)]);

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'nl'],
    // Le français n'a pas de préfixe : « / », pas « /fr/ ».
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const adresse = new URL(page).pathname;
        return !adresse.endsWith('/404/') && !adresse.startsWith('/variantes/') && !PAGES_LEGALES.includes(adresse);
      },

      // Les adresses sont traduites (/services/ ↔ /nl/diensten/) : on relie
      // les deux langues nous-mêmes, avec la même table que le sélecteur de langue.
      serialize(element) {
        const chemin = new URL(element.url).pathname;
        element.links = LANGUES.map((code) => ({
          lang: code === 'fr' ? 'fr-BE' : 'nl-BE',
          url: new URL(memePageDansLaLangue(chemin, code), SITE).href,
        }));
        element.links.push({
          lang: 'x-default',
          url: new URL(memePageDansLaLangue(chemin, 'fr'), SITE).href,
        });
        return element;
      },
    }),
  ],
});
