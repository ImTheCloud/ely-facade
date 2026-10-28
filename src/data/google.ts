/**
 * La fiche Google d'Ely Facade. L'identifiant du lieu est public : il sert au lien d'avis (QR code, et public/_redirects pour /avis).
 */
export const googlePlaceId = 'ChIJPwMJyhrJw0cR-oC1k27c6Hg';

/** La page où le client écrit son avis (il se connecte à son compte Google, puis note). */
export const lienAvisGoogle = `https://search.google.com/local/writereview?placeid=${googlePlaceId}`;
