"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, scrollToId, useLanding } from "./LandingState";

export type PrismFace = { name: string; tagline: string; countLabel: string };

type Props = {
  faces: PrismFace[];
  labels: { group: string; prev: string; next: string; prevGlyph: string; nextGlyph: string; arrow: string };
  /** Sens de lecture : le domaine suivant apparaît à gauche en arabe, à droite en français. */
  rtl: boolean;
};

const WIDTH = 260; // largeur d'une face (px) : prisme à base carrée
const HEIGHT = 320; // hauteur d'une face (px)
const RADIUS = WIDTH / 2;
const HALF_HEIGHT = HEIGHT / 2;
const PADDING = 22; // marge intérieure d'une face (px), à garder égale au CSS
const VIEW_Y = 24; // vue de biais : on voit la face active et le flanc du domaine suivant
const VIEW_X = -16; // vue plongeante : on voit le dessus du cube

/** Évite les coupures disgracieuses : « E- / commerce », « & » seul en début de ligne. */
const displayName = (name: string) => name.replace(/-/g, "\u2011").replace(/ & /g, "\u00a0& ");

/** Taille du nom calée sur son mot le plus long, pour qu'aucun mot ne déborde de la face. */
function nameSize(name: string) {
  const longest = Math.max(...name.split(/\s+/).map((w) => w.length));
  const charWidth = /[\u0600-\u06FF]/.test(name) ? 0.5 : 0.62; // largeur moyenne d'un caractère gras, en em
  return Math.round(Math.min(44, Math.max(20, (WIDTH - 2 * PADDING) / (longest * charWidth))));
}

/** Carrousel 3D des domaines. Cliquer une face ouvre le domaine dans la section #formations. */
export function Prism({ faces, labels, rtl }: Props) {
  const sign = rtl ? 1 : -1;
  const { active, select, autoAdvance } = useLanding();
  const [turns, setTurns] = useState(0); // quarts de tour cumulés : on tourne toujours par le chemin le plus court
  const stageRef = useRef<HTMLDivElement>(null);
  const prismRef = useRef<HTMLDivElement>(null);
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

  // Ajustement fin : réduit le nom tant que le contenu dépasse de la face (noms longs sur 3 lignes).
  useEffect(() => {
    const fit = () => {
      prismRef.current?.querySelectorAll<HTMLElement>(".face").forEach((face, i) => {
        let size = nameSize(faces[i].name);
        face.style.setProperty("--name-size", `${size}px`);
        const name = face.querySelector<HTMLElement>(".f-name");
        const overflows = () => face.scrollHeight > face.clientHeight + 1 || (!!name && name.scrollWidth > name.clientWidth + 1);
        while (size > 18 && overflows()) {
          size -= 2;
          face.style.setProperty("--name-size", `${size}px`);
        }
      });
    };
    fit();
    document.fonts?.ready.then(fit);
  }, [faces]);

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
        <div ref={prismRef} className="prism" style={{ width: WIDTH, height: HEIGHT, transform: `translateZ(-${RADIUS}px) rotateX(${VIEW_X}deg) rotateY(${sign * (turns * 90 + VIEW_Y)}deg)` }}>
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
                  transform: `rotateY(${-sign * i * 90}deg) translateZ(${RADIUS}px)`,
                  ["--lit" as string]: Math.max(0, facing).toFixed(3),
                  ["--name-size" as string]: `${nameSize(face.name)}px`,
                }}
              >
                <span className="f-num" dir="ltr">
                  {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                </span>
                <span className="f-body">
                  <span className="f-name">{displayName(face.name)}</span>
                  <span className="f-tag">{face.tagline}</span>
                </span>
                <span className="f-foot">
                  <span>{face.countLabel}</span>
                  <span aria-hidden="true">{labels.arrow}</span>
                </span>
              </button>
            );
          })}
          <div className="cap" aria-hidden="true" style={{ width: WIDTH, height: WIDTH, margin: `-${RADIUS}px 0 0 -${RADIUS}px`, transform: `translateY(-${HALF_HEIGHT}px) rotateX(90deg)` }}>
            <b>EA</b>
          </div>
          <div className="cap" aria-hidden="true" style={{ width: WIDTH, height: WIDTH, margin: `-${RADIUS}px 0 0 -${RADIUS}px`, transform: `translateY(${HALF_HEIGHT}px) rotateX(90deg)` }} />
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
