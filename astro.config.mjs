// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { LANGUES, memePageDansLaLangue } from './src/i18n/index.ts';

// Domaine principal (à acheter) ; elyfacade.com redirigera vers lui.
const SITE = 'https://elyfacade.be';

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
      // La page 404 et les pages de comparaison des variantes sont en noindex : hors sitemap.
      filter: (page) => !page.includes('/404/') && !page.includes('/variantes/'),

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
