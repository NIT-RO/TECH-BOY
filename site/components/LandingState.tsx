"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type LandingState = {
  /** Index du domaine affiché (prisme, chips et panneaux restent synchronisés). */
  active: number;
  /** Choix du visiteur : arrête définitivement la rotation automatique du prisme. */
  select: (i: number) => void;
  /** Avance automatique du prisme, ignorée dès que le visiteur a choisi un domaine. */
  autoAdvance: () => void;
  /** Valeur pré-sélectionnée dans le formulaire (d:<slug> | f:<slug> | ""). */
  interest: string;
  setInterest: (v: string) => void;
};

const Ctx = createContext<LandingState | null>(null);

export function LandingStateProvider({ count, children }: { count: number; children: ReactNode }) {
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [interest, setInterest] = useState("");

  const value = useMemo<LandingState>(
    () => ({
      active,
      select: (i) => {
        setInteracted(true);
        setActive(((i % count) + count) % count);
      },
      autoAdvance: () => {
        if (!interacted) setActive((a) => (a + 1) % count);
      },
      interest,
      setInterest,
    }),
    [active, interacted, interest, count],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLanding() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLanding doit être utilisé dans <LandingStateProvider>");
  return ctx;
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const scrollToId = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
