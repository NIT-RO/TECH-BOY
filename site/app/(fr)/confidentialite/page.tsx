import type { Metadata } from "next";
import { PrivacyPage } from "@/components/PrivacyPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité — ECSEL Academy",
  alternates: { canonical: "/confidentialite", languages: { fr: "/confidentialite", ar: "/ar/confidentialite" } },
};

export default function Page() {
  return <PrivacyPage locale="fr" />;
}
