import type { Metadata } from "next";
import { PrivacyPage } from "@/components/PrivacyPage";

export const metadata: Metadata = {
  title: "سياسة الخصوصية — ECSEL Academy",
  alternates: { canonical: "/ar/confidentialite", languages: { fr: "/confidentialite", ar: "/ar/confidentialite" } },
};

export default function Page() {
  return <PrivacyPage locale="ar" />;
}
