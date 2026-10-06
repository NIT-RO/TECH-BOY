"use server";

import { headers } from "next/headers";
import { domains, type Locale } from "@/lib/catalogue";
import { normalizeDzPhone, PREFERRED_TIMES, validName, type PreferredTime } from "@/lib/lead";

export type LeadResult =
  | { ok: true }
  | { ok: false; reason: "invalid"; fields: ("full_name" | "phone")[] }
  | { ok: false; reason: "delivery" };

/** Résout la valeur du <select> (d:<slug> ou f:<slug>) en libellé lisible pour l'équipe. */
function describeInterest(value: string) {
  const [type, slug] = value.split(":");
  for (const d of domains) {
    if (type === "d" && d.slug === slug) return { domain: d.name.fr, formation: null };
    const match = d.formations.find((x) => x.slug === slug);
    if (type === "f" && match) return { domain: d.name.fr, formation: match.title.fr };
  }
  return { domain: null, formation: null };
}

export async function submitLead(formData: FormData): Promise<LeadResult> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();

  // Pot de miel : un robot remplit ce champ invisible. On fait mine d'accepter.
  if (get("website")) return { ok: true };

  const fullName = get("full_name").slice(0, 80);
  const phone = normalizeDzPhone(get("phone"));
  const fields: ("full_name" | "phone")[] = [];
  if (!validName(fullName)) fields.push("full_name");
  if (!phone) fields.push("phone");
  if (fields.length) return { ok: false, reason: "invalid", fields };

  const time = get("preferred_time");
  const locale: Locale = get("locale") === "ar" ? "ar" : "fr";
  const interest = get("interest");

  const lead = {
    created_at: new Date().toISOString(),
    full_name: fullName,
    phone,
    interest,
    ...describeInterest(interest),
    preferred_time: (PREFERRED_TIMES as readonly string[]).includes(time) ? (time as PreferredTime) || null : null,
    message: get("message").slice(0, 500) || null,
    locale,
    source: get("source") || "site",
    user_agent: (await headers()).get("user-agent"),
  };

  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) {
    console.error("[lead] LEADS_WEBHOOK_URL non configurée — demande non transmise", lead);
    return { ok: false, reason: "delivery" };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEADS_WEBHOOK_SECRET ? { "X-Webhook-Secret": process.env.LEADS_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { ok: true };
  } catch (err) {
    console.error("[lead] échec de l'envoi au webhook", err, lead);
    return { ok: false, reason: "delivery" };
  }
}
