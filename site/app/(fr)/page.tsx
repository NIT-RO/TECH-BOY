import { LandingPage } from "@/components/LandingPage";
import { landingMetadata } from "@/lib/metadata";

export const metadata = landingMetadata("fr");

export default function Page() {
  return <LandingPage locale="fr" />;
}
