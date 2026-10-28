/**
 * Les avis Google : lus chez Google par ce serveur (jamais par le navigateur du visiteur, qui ne parle qu'à elyfacade.be),
 * gardés 6 h en cache, puis affichés par la section « avis » de l'accueil.
 *
 * Réglage dans Cloudflare → Workers & Pages → ely-facade → Settings → Variables and Secrets :
 * - GOOGLE_PLACES_API_KEY (secret) : une clé Google Cloud limitée à « Places API (New) ».
 *
 * Sans clé, ou sans aucun avis, la réponse est vide : le site n'affiche alors que le QR code.
 */
import { googlePlaceId } from '../src/data/google';

export type EnvAvis = { GOOGLE_PLACES_API_KEY?: string };

interface Avis {
  auteur: string;
  note: number;
  texte: string;
  date: string;
}

interface ReponseAvis {
  note: number;
  total: number;
  avis: Avis[];
}

interface LieuGoogle {
  rating?: number;
  userRatingCount?: number;
  reviews?: {
    rating?: number;
    publishTime?: string;
    text?: { text?: string };
    originalText?: { text?: string };
    authorAttribution?: { displayName?: string };
  }[];
}

const VIDE: ReponseAvis = { note: 0, total: 0, avis: [] };
const CACHE_HEURES = 6;
const AVIS_MAX = 5;
const TEXTE_MAX = 600;

const reponse = (corps: ReponseAvis, secondes: number) =>
  new Response(JSON.stringify(corps), {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': `public, max-age=300, s-maxage=${secondes}` },
  });

async function lireChezGoogle(cle: string, langue: string): Promise<ReponseAvis | null> {
  const reponseGoogle = await fetch(`https://places.googleapis.com/v1/places/${googlePlaceId}?languageCode=${langue}`, {
    headers: {
      'X-Goog-Api-Key': cle,
      'X-Goog-FieldMask': 'rating,userRatingCount,reviews.rating,reviews.publishTime,reviews.text,reviews.originalText,reviews.authorAttribution.displayName',
    },
    signal: AbortSignal.timeout(5000),
  });
  if (!reponseGoogle.ok) return null;

  const lieu = (await reponseGoogle.json()) as LieuGoogle;
  const avis = (lieu.reviews ?? [])
    .map((a) => ({
      auteur: a.authorAttribution?.displayName?.trim() ?? '',
      note: Math.round(a.rating ?? 0),
      // Le texte d'origine, tel que le client l'a écrit (Google le traduit sinon).
      texte: (a.originalText?.text ?? a.text?.text ?? '').trim().slice(0, TEXTE_MAX),
      date: a.publishTime ?? '',
    }))
    .filter((a) => a.texte && a.note >= 1 && a.note <= 5)
    .slice(0, AVIS_MAX);

  return { note: lieu.rating ?? 0, total: lieu.userRatingCount ?? 0, avis };
}

export async function lireAvis(request: Request, env: EnvAvis, attendre: (promesse: Promise<unknown>) => void): Promise<Response> {
  if (!env.GOOGLE_PLACES_API_KEY) return reponse(VIDE, 300);

  const url = new URL(request.url);
  const langue = url.searchParams.get('lang') === 'nl' ? 'nl' : 'fr';
  const cle = new Request(`${url.origin}/api/avis?lang=${langue}`);
  const cache = (caches as unknown as { default: Cache }).default;

  const garde = await cache.match(cle);
  if (garde) return garde;

  let donnees: ReponseAvis | null = null;
  try {
    donnees = await lireChezGoogle(env.GOOGLE_PLACES_API_KEY, langue);
  } catch {
    // Google ne répond pas : la section reste sans avis, on réessaie dans quelques minutes.
  }

  const resultat = reponse(donnees ?? VIDE, donnees ? CACHE_HEURES * 3600 : 300);
  attendre(cache.put(cle, resultat.clone()));
  return resultat;
}
