"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "./LandingState";

/** Slogan façon tableau d'affichage à palettes : les mots défilent en basculant. */
export function FlapSlogan({ words }: { words: readonly string[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), 2200);
    return () => window.clearInterval(id);
  }, [words.length]);

  return (
    <div className="slogan" role="img" aria-label={words.join(" · ")}>
      <span className="flap" aria-hidden="true">
        <span key={i} className="flap-word">
          {words[i]}.
        </span>
      </span>
    </div>
  );
}
