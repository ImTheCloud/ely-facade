/**
 * Le seul code qui tourne côté serveur : le site est servi tel quel depuis dist/ ;
 * ce script n'est appelé que pour ce que le site ne contient pas :
 * - POST /api/devis : l'envoi du formulaire de devis (worker/devis.ts) ;
 * - GET /api/avis : les avis Google, lus côté serveur (worker/avis.ts) ;
 * - une page introuvable : la 404 de la bonne langue (français, ou néerlandais sous /nl/).
 */
import { lireAvis, type EnvAvis } from './avis';
import { envoyerDevis, type Env } from './devis';

type Environnement = Env & EnvAvis & { ASSETS: { fetch: (demande: Request | URL) => Promise<Response> } };

export default {
  async fetch(request: Request, env: Environnement, ctx: { waitUntil: (promesse: Promise<unknown>) => void }): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/devis' && request.method === 'POST') return envoyerDevis(request, env);
    if (url.pathname === '/api/avis' && request.method === 'GET') return lireAvis(request, env, (p) => ctx.waitUntil(p));

    const page = await env.ASSETS.fetch(new URL(url.pathname.startsWith('/nl/') ? '/nl/404/' : '/404.html', url));
    return new Response(page.body, { status: 404, headers: page.headers });
  },
};
