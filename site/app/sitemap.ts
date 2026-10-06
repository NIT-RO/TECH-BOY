import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { fr: `${SITE_URL}/`, ar: `${SITE_URL}/ar` };
  return [
    { url: `${SITE_URL}/`, alternates: { languages }, priority: 1 },
    { url: `${SITE_URL}/ar`, alternates: { languages }, priority: 1 },
    { url: `${SITE_URL}/confidentialite`, priority: 0.2 },
    { url: `${SITE_URL}/ar/confidentialite`, priority: 0.2 },
  ];
}
