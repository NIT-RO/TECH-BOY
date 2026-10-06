"use client";

import { useId, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { submitLead } from "@/app/actions";
import type { Locale } from "@/lib/catalogue";
import { dict } from "@/lib/i18n";
import { normalizeDzPhone, PREFERRED_TIMES, validName } from "@/lib/lead";
import { whatsappLink } from "@/lib/site";
import { useLanding } from "./LandingState";

export type LeadGroup = {
  slug: string;
  name: string;
  formations: { slug: string; title: string }[];
};

type Field = "full_name" | "phone";

export function LeadForm({ locale, groups, privacyHref }: { locale: Locale; groups: LeadGroup[]; privacyHref: string }) {
  const t = dict[locale].form;
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const { interest, setInterest } = useLanding();
  const [errors, setErrors] = useState<Field[]>([]);
  const [pending, startTransition] = useTransition();

  const interestLabel = (value: string) => {
    const [type, slug] = value.split(":");
    for (const g of groups) {
      if (type === "d" && g.slug === slug) return g.name;
      const match = g.formations.find((f) => f.slug === slug);
      if (type === "f" && match) return match.title;
    }
    return "";
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("full_name") ?? "");

    const invalid: Field[] = [];
    if (!validName(name)) invalid.push("full_name");
    if (!normalizeDzPhone(String(data.get("phone") ?? ""))) invalid.push("phone");
    setErrors(invalid);
    if (invalid.length) {
      formRef.current?.querySelector<HTMLInputElement>(`[name="${invalid[0]}"]`)?.focus();
      return;
    }

    startTransition(async () => {
      const res = await submitLead(data).catch(() => ({ ok: false as const, reason: "delivery" as const }));
      if (res.ok) {
        toast.success(t.success);
        formRef.current?.reset();
        setInterest("");
        return;
      }
      if (res.reason === "invalid") {
        setErrors(res.fields);
        return;
      }
      toast.error(t.failure, {
        duration: 15000,
        action: {
          label: t.whatsappAction,
          onClick: () => window.open(whatsappLink(t.whatsappText(name.trim(), interestLabel(interest))), "_blank", "noopener"),
        },
      });
    });
  };

  const err = (f: Field) => errors.includes(f);

  return (
    <form ref={formRef} className="lead-form" noValidate onSubmit={onSubmit}>
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="source" value="site" />
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" name="website" defaultValue="" />
        </label>
      </div>

      <div className="field">
        <label htmlFor={`${id}-name`}>{t.name}</label>
        <input
          id={`${id}-name`}
          name="full_name"
          autoComplete="name"
          required
          maxLength={80}
          aria-invalid={err("full_name")}
          aria-describedby={err("full_name") ? `${id}-name-err` : undefined}
        />
        {err("full_name") && (
          <p id={`${id}-name-err`} className="field-error" role="alert">
            {t.errors.name}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor={`${id}-phone`}>{t.phone}</label>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          dir="ltr"
          autoComplete="tel"
          required
          className="mono"
          aria-invalid={err("phone")}
          aria-describedby={`${id}-phone-hint${err("phone") ? ` ${id}-phone-err` : ""}`}
        />
        <p id={`${id}-phone-hint`} className="field-hint">
          {t.phoneHint}
        </p>
        {err("phone") && (
          <p id={`${id}-phone-err`} className="field-error" role="alert">
            {t.errors.phone}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor={`${id}-interest`}>{t.interest}</label>
        <select id={`${id}-interest`} name="interest" value={interest} onChange={(e) => setInterest(e.target.value)}>
          <option value="">{t.undecided}</option>
          {groups.map((g) => (
            <optgroup key={g.slug} label={g.name}>
              <option value={`d:${g.slug}`}>
                {g.name} — {t.wholeDomain}
              </option>
              {g.formations.map((f) => (
                <option key={f.slug} value={`f:${f.slug}`}>
                  {f.title}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <fieldset className="time-options">
        <legend>{t.when}</legend>
        {PREFERRED_TIMES.map((v) => (
          <label key={v || "any"}>
            <input type="radio" name="preferred_time" value={v} defaultChecked={v === ""} />
            <span>{t.times[v]}</span>
          </label>
        ))}
      </fieldset>

      <div className="field">
        <label htmlFor={`${id}-message`}>{t.message}</label>
        <textarea id={`${id}-message`} name="message" rows={3} maxLength={500} />
      </div>

      <p className="consent">
        {t.consent} <a href={privacyHref}>{t.privacy}</a>
      </p>

      <button type="submit" className="submit" disabled={pending}>
        {pending ? t.sending : t.submit}
      </button>
    </form>
  );
}
