/**
 * Envoi de la demande de devis : reçoit le formulaire de la page contact et le
 * transmet par email à l'entreprise avec Resend.
 *
 * Réglages dans Cloudflare → Workers & Pages → ely-facade → Settings → Variables and Secrets :
 * - RESEND_API_KEY (secret) : la clé d'envoi Resend ;
 * - DEVIS_DESTINATAIRE (facultatif) : l'adresse qui reçoit les devis, info@elyfacade.be par défaut.
 *
 * Le champ « bot-field » est un piège à robots : un humain ne le remplit jamais. Le limiteur (wrangler.jsonc) refuse
 * plus de 5 envois par minute depuis la même adresse.
 */

export type Env = {
  RESEND_API_KEY?: string;
  DEVIS_DESTINATAIRE?: string;
  LIMITEUR_DEVIS?: { limit: (options: { key: string }) => Promise<{ success: boolean }> };
};

const EXPEDITEUR = 'Ely Facade <devis@elyfacade.be>';
const DESTINATAIRE = 'info@elyfacade.be';
const SUJET = 'Nouvelle demande de devis · site Ely Facade';
const LONGUEUR_MAX = 5000;
const PHOTOS_MAX = 5;
const PHOTO_TAILLE_MAX = 8 * 1024 * 1024;
const CORPS_MAX = PHOTOS_MAX * PHOTO_TAILLE_MAX + 1024 * 1024;
const EXTENSIONS: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/heic': 'heic', 'image/heif': 'heif' };

/** Les champs du formulaire dans l'ordre de l'email, avec leur libellé. */
const CHAMPS: [string, string][] = [
  ['travaux', 'Travaux'],
  ['autre_precision', 'Autre précision'],
  ['batiment', 'Bâtiment'],
  ['surface', 'Surface'],
  ['message', 'Message'],
  ['nom', 'Nom'],
  ['telephone', 'Téléphone'],
  ['email', 'Email'],
  ['langue', 'Langue du site'],
];

const REMERCIEMENT = {
  FR: { titre: 'Merci !', texte: 'Votre demande est bien envoyée. Nous vous recontactons très vite.', retour: 'Retour au site', adresse: '/' },
  NL: { titre: 'Bedankt!', texte: 'Uw aanvraag is verstuurd. We nemen snel contact met u op.', retour: 'Terug naar de website', adresse: '/nl/' },
};

const echapper = (texte: string) =>
  texte.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Le contenu d'une photo en base64, par morceaux pour ne pas saturer la pile. */
const enBase64 = async (fichier: File): Promise<string> => {
  const octets = new Uint8Array(await fichier.arrayBuffer());
  let texte = '';
  for (let i = 0; i < octets.length; i += 0x8000) texte += String.fromCharCode(...octets.subarray(i, i + 0x8000));
  return btoa(texte);
};

const json = (corps: object, statut: number) =>
  new Response(JSON.stringify(corps), { status: statut, headers: { 'Content-Type': 'application/json' } });

export async function envoyerDevis(request: Request, env: Env): Promise<Response> {
  // Trop d'envois d'un coup depuis la même adresse : refusé avant toute lecture.
  if (env.LIMITEUR_DEVIS) {
    const { success } = await env.LIMITEUR_DEVIS.limit({ key: request.headers.get('CF-Connecting-IP') ?? 'inconnue' });
    if (!success) return json({ ok: false }, 429);
  }

  // Une demande plus lourde que 5 photos au maximum n'est pas lue du tout.
  if (Number(request.headers.get('Content-Length') ?? 0) > CORPS_MAX) return json({ ok: false }, 413);
  const formulaire = await request.formData();
  const lire = (nom: string) =>
    formulaire.getAll(nom).map((valeur) => String(valeur).trim().slice(0, LONGUEUR_MAX)).filter(Boolean).join(', ');

  // Le même texte pour tous les robots : on ne leur dit pas qu'ils ont été repérés.
  const robot = lire('bot-field') !== '';
  const attendHtml = !(request.headers.get('Accept') ?? '').includes('application/json');
  const langue = lire('langue') === 'NL' ? 'NL' : 'FR';

  const reponseOk = () => {
    if (!attendHtml) return json({ ok: true }, 200);
    const r = REMERCIEMENT[langue];
    return new Response(
      `<!doctype html><html lang="${langue.toLowerCase()}"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${r.titre}</title>` +
        `<body style="font-family:system-ui,sans-serif;max-width:32rem;margin:4rem auto;padding:0 1rem"><h1>${r.titre}</h1><p>${r.texte}</p><p><a href="${r.adresse}">${r.retour}</a></p></body></html>`,
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
    );
  };

  if (robot) return reponseOk();

  if (!lire('nom') || !lire('telephone') || !lire('travaux') || lire('consentement') !== 'oui') {
    return json({ ok: false }, 400);
  }
  if (!env.RESEND_API_KEY) return json({ ok: false }, 500);

  // Seules de vraies photos, en nombre et en poids raisonnables : le reste est refusé.
  const photos = formulaire.getAll('photos').filter((valeur): valeur is File => typeof valeur !== 'string' && valeur.size > 0);
  if (photos.length > PHOTOS_MAX || photos.some((photo) => photo.size > PHOTO_TAILLE_MAX || !(photo.type in EXTENSIONS))) {
    return json({ ok: false }, 400);
  }
  const pieces = await Promise.all(
    photos.map(async (photo, i) => ({ filename: `photo-${i + 1}.${EXTENSIONS[photo.type]}`, content: await enBase64(photo) })),
  );

  const lignes: (readonly [string, string])[] = CHAMPS.map(([nom, libelle]) => [libelle, lire(nom)] as const).filter(([, valeur]) => valeur);
  if (pieces.length) lignes.push(['Photos', `${pieces.length} jointe${pieces.length > 1 ? 's' : ''} à cet email`]);
  const email = lire('email');

  const envoi = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: EXPEDITEUR,
      to: [env.DEVIS_DESTINATAIRE || DESTINATAIRE],
      ...(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? { reply_to: email } : {}),
      subject: SUJET,
      ...(pieces.length ? { attachments: pieces } : {}),
      text: lignes.map(([libelle, valeur]) => `${libelle} : ${valeur}`).join('\n'),
      html: `<table cellpadding="6" style="font-family:system-ui,sans-serif">${lignes
        .map(([libelle, valeur]) => `<tr><td><strong>${echapper(libelle)}</strong></td><td>${echapper(valeur).replace(/\n/g, '<br>')}</td></tr>`)
        .join('')}</table>`,
    }),
  });

  if (!envoi.ok) return json({ ok: false }, 502);
  return reponseOk();
}
