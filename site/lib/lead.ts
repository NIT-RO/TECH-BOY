export const PREFERRED_TIMES = ["", "morning", "afternoon", "evening"] as const;
export type PreferredTime = (typeof PREFERRED_TIMES)[number];

/**
 * Normalise un numéro algérien au format E.164 (+213XXXXXXXXX).
 * Accepte 0XXXXXXXXX, +213XXXXXXXXX, 00213XXXXXXXXX, avec espaces, points ou tirets.
 * Mobiles : 05/06/07 ; fixes : 02/03/04 (9 chiffres après l'indicatif). Renvoie null si invalide.
 */
export function normalizeDzPhone(raw: string): string | null {
  let digits = raw.replace(/[\s.\-()]/g, "");
  if (digits.startsWith("+213")) digits = digits.slice(4);
  else if (digits.startsWith("00213")) digits = digits.slice(5);
  else if (digits.startsWith("0")) digits = digits.slice(1);
  else return null;
  return /^[2-7]\d{8}$/.test(digits) ? `+213${digits}` : null;
}

export const validName = (name: string) => name.trim().length >= 2 && name.trim().length <= 80;
