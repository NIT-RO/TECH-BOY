"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, scrollToId, useLanding } from "./LandingState";

export type PrismFace = { name: string; tagline: string; countLabel: string };

type Props = {
  faces: PrismFace[];
  labels: { group: string; prev: string; next: string; prevGlyph: string; nextGlyph: string; arrow: string };
};

const RADIUS = 88; // demi-largeur d'une face (px) : prisme à base carrée
const HALF_HEIGHT = 107.5; // demi-hauteur d'une face (px)

/** Carrousel 3D des domaines. Cliquer une face ouvre le domaine dans la section #formations. */
export function Prism({ faces, labels }: Props) {
  const { active, select, autoAdvance } = useLanding();
  const [turns, setTurns] = useState(0); // quarts de tour cumulés : on tourne toujours par le chemin le plus court
  const stageRef = useRef<HTMLDivElement>(null);
  const n = faces.length;

  useEffect(() => {
    setTurns((t) => {
      const current = ((t % n) + n) % n;
      let delta = active - current;
      if (delta > n / 2) delta -= n;
      if (delta < -n / 2) delta += n;
      return t + delta;
    });
  }, [active, n]);

  // Rotation automatique, seulement quand le prisme est à l'écran.
  useEffect(() => {
    const el = stageRef.current;
    if (!el || prefersReducedMotion()) return;
    let id = 0;
    const io = new IntersectionObserver(([entry]) => {
      window.clearInterval(id);
      if (entry.isIntersecting) id = window.setInterval(autoAdvance, 3500);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, [autoAdvance]);

  return (
    <div className="prism-wrap">
      <div ref={stageRef} className="stage" role="group" aria-roledescription="carrousel 3D" aria-label={labels.group}>
        <div className="glow" aria-hidden="true" />
        <div className="prism" style={{ transform: `translateZ(-${RADIUS}px) rotateX(-10deg) rotateY(${turns * 90}deg)` }}>
          {faces.map((face, i) => {
            const facing = Math.cos(((turns - i) * Math.PI) / 2);
            return (
              <button
                key={face.name}
                type="button"
                className="face"
                tabIndex={i === active ? 0 : -1}
                aria-label={`${face.name}, ${face.countLabel}`}
                onClick={() => {
                  select(i);
                  scrollToId("formations");
                }}
                style={{
                  transform: `rotateY(${-i * 90}deg) translateZ(${RADIUS}px)`,
                  ["--lit" as string]: Math.max(0, facing).toFixed(3),
                }}
              >
                <span className="f-num">
                  {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                </span>
                <span className="f-body">
                  <span className="f-name">{face.name}</span>
                  <span className="f-tag">{face.tagline}</span>
                </span>
                <span className="f-foot">
                  <span>{face.countLabel}</span>
                  <span aria-hidden="true">{labels.arrow}</span>
                </span>
              </button>
            );
          })}
          <div className="cap" aria-hidden="true" style={{ transform: `translateY(-${HALF_HEIGHT}px) rotateX(90deg)` }}>
            <b>EA</b>
          </div>
          <div className="cap" aria-hidden="true" style={{ transform: `translateY(${HALF_HEIGHT}px) rotateX(90deg)` }} />
        </div>
        <div className="floor" aria-hidden="true" />
      </div>
      <div className="controls">
        <button type="button" aria-label={labels.prev} onClick={() => select(active - 1)}>
          {labels.prevGlyph}
        </button>
        <output aria-live="polite">
          {String(active + 1).padStart(2, "0")} · {faces[active]?.name}
        </output>
        <button type="button" aria-label={labels.next} onClick={() => select(active + 1)}>
          {labels.nextGlyph}
        </button>
      </div>
    </div>
  );
}
