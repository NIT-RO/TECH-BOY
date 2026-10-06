import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { fontVariables } from "@/lib/fonts";
import "../globals.css";

export { viewport } from "@/lib/metadata";

export default function ArabicRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={fontVariables}>
      <body>
        {children}
        <Toaster position="top-center" richColors closeButton dir="rtl" />
      </body>
    </html>
  );
}
