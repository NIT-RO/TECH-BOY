import { ImageResponse } from "next/og";
import { totalFormations, domains } from "@/lib/catalogue";

export const dynamic = "force-static";

// Image de partage (1200×630). Texte latin uniquement : pas de police arabe à embarquer.
export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0b0b0c", color: "#fff", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <span style={{ fontSize: 56, fontWeight: 900, color: "#e1251b" }}>ECSEL</span>
          <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: 8 }}>ACADEMY</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span style={{ fontSize: 76, fontWeight: 900, lineHeight: 1.05 }}>BI3 · KBER · DOUM</span>
          <span style={{ fontSize: 34, color: "#c9c9cc" }}>
            {`${totalFormations} formations en présentiel · ${domains.map((d) => d.name.fr).join(" · ")}`}
          </span>
        </div>
        <span style={{ fontSize: 28, color: "#e1251b" }}>Bab Ezzouar, Alger · BUILD · LEARN · SCALE</span>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
