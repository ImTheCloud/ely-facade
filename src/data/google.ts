/**
 * La fiche Google d'Ely Facade. Sans import, pour que le worker (worker/avis.ts) puisse le lire.
 * L'identifiant du lieu est public : il sert au lien d'avis (QR code) et à la lecture des avis.
 */
export const googlePlaceId = 'ChIJPwMJyhrJw0cR-oC1k27c6Hg';

/** La page où le client écrit son avis (il se connecte à son compte Google, puis note). */
export const lienAvisGoogle = `https://search.google.com/local/writereview?placeid=${googlePlaceId}`;
