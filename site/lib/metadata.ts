import type { Metadata, Viewport } from "next";
import type { Locale } from "./catalogue";
import { dict, homePath } from "./i18n";
import { SITE_URL } from "./site";

export const viewport: Viewport = { themeColor: "#0b0b0c" };

export function landingMetadata(locale: Locale): Metadata {
  const { title, description } = dict[locale].meta;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: homePath(locale),
      languages: { fr: "/", ar: "/ar", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: "ECSEL Academy",
      title,
      description,
      url: homePath(locale),
      locale: locale === "ar" ? "ar_DZ" : "fr_DZ",
      alternateLocale: locale === "ar" ? "fr_DZ" : "ar_DZ",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "ECSEL Academy" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}
