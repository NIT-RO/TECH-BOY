import type { Metadata } from "next";
import { headers } from "next/headers";
import QRCode from "qrcode";

// Page interne à imprimer : QR codes du stand, liés au domaine où le site est déployé.
export const metadata: Metadata = { title: "QR codes — ECSEL Academy", robots: { index: false, follow: false } };

const CODES = [
  { label: "Stand ECSEL Expo — version arabe", path: "/ar?src=stand" },
  { label: "Stand ECSEL Expo — version française", path: "/?src=stand" },
  { label: "Flyer / roll-up", path: "/ar?src=flyer" },
  { label: "Bio Instagram", path: "/?src=instagram" },
];

export default async function QrPage() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${proto}://${host}`;

  const codes = await Promise.all(
    CODES.map(async (c) => {
      const url = origin + c.path;
      const svg = await QRCode.toString(url, { type: "svg", margin: 1, errorCorrectionLevel: "M", color: { dark: "#0b0b0c", light: "#ffffff" } });
      return { ...c, url, svg };
    }),
  );

  return (
    <main className="site legal qr-page">
      <div className="wrap">
        <h1>QR codes</h1>
        <p>Imprimez cette page (Ctrl+P). Chaque QR code renseigne la colonne « Source » de la Google Sheet.</p>
        <div className="qr-grid">
          {codes.map((c) => (
            <figure key={c.path} className="qr-card">
              <div className="qr-img" dangerouslySetInnerHTML={{ __html: c.svg }} />
              <figcaption>
                <b>{c.label}</b>
                <span className="iso">{c.url}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </main>
  );
}
