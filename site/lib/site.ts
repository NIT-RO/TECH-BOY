// URL publique : NEXT_PUBLIC_SITE_URL si définie, sinon le domaine de production fourni par Vercel.
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercelHost ? `https://${vercelHost}` : "http://localhost:3000")
).replace(/\/$/, "");

export const PHONE_E164 = "+213770401365";
export const PHONE_DISPLAY = "0770 40 13 65";
export const WHATSAPP_URL = `https://wa.me/${PHONE_E164.slice(1)}`;
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Cit%C3%A9%20Soummam%2C%20Lot%2015%20N%C2%B05%2C%20Bab%20Ezzouar%2C%20Alger";

export const whatsappLink = (text: string) => `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
