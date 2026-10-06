"use client";

import type { ReactNode } from "react";
import { scrollToId, useLanding } from "./LandingState";

export function DomainChips({ label, names }: { label: string; names: string[] }) {
  const { active, select } = useLanding();
  return (
    <div className="domain-chips" role="group" aria-label={label}>
      {names.map((name, i) => (
        <button key={name} type="button" className="domain-chip" aria-pressed={i === active} onClick={() => select(i)}>
          {name}
        </button>
      ))}
    </div>
  );
}

/** Tous les panneaux sont rendus côté serveur (indexables) ; seul l'actif est visible. */
export function DomainPanels({ panels }: { panels: { slug: string; content: ReactNode }[] }) {
  const { active } = useLanding();
  return (
    <>
      {panels.map((p, i) => (
        <div key={p.slug} className="panel" data-active={i === active || undefined} hidden={i !== active}>
          {p.content}
        </div>
      ))}
    </>
  );
}

/** Pré-sélectionne la formation dans le formulaire puis y amène le visiteur. */
export function CallbackButton({ value, label }: { value: string; label: string }) {
  const { setInterest } = useLanding();
  return (
    <button
      type="button"
      className="callback-btn"
      onClick={() => {
        setInterest(value);
        scrollToId("rappel");
        window.setTimeout(() => document.querySelector<HTMLInputElement>('#rappel input[name="full_name"]')?.focus({ preventScroll: true }), 400);
      }}
    >
      {label}
    </button>
  );
}
