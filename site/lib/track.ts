type Win = Window & { fbq?: (...a: unknown[]) => void; gtag?: (...a: unknown[]) => void };

/** Conversion « demande de rappel » envoyée aux outils de mesure présents. */
export function trackLead(interest: string, source: string) {
  const w = window as Win;
  w.fbq?.("track", "Lead", { content_name: interest || "non précisé", source });
  w.gtag?.("event", "generate_lead", { interest: interest || "non précisé", source });
}

/** Provenance du visiteur : ?src=stand (QR code), sinon utm_source, sinon "site". */
export function readSource() {
  const q = new URLSearchParams(window.location.search);
  const raw = q.get("src") ?? q.get("utm_source") ?? "";
  const clean = raw.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40);
  return clean || "site";
}
