import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { Analytics } from "@/components/Analytics";
import { fontVariables } from "@/lib/fonts";
import "../globals.css";

export { viewport } from "@/lib/metadata";

export default function FrenchRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" dir="ltr" className={fontVariables}>
      <body>
        {children}
        <Analytics />
        <Toaster position="top-center" richColors closeButton dir="ltr" />
      </body>
    </html>
  );
}
