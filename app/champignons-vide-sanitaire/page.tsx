import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Problème d'humidité : des champignons dans le vide sanitaire - GF Expertise",
  description: "Champignons dans le vide sanitaire après l'achat d'une maison : étude de cas d'un expert en bâtiment indépendant à Pau, Béarn.",
  alternates: { canonical: "https://gf-expertise.fr/champignons-vide-sanitaire/" },
  openGraph: {
    title: "Problème d'humidité : des champignons dans le vide sanitaire - GF Expertise",
    description: "Champignons dans le vide sanitaire après l'achat d'une maison : étude de cas d'un expert en bâtiment indépendant à Pau, Béarn.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/02/log-cabin-1886620_1920.jpg"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Problème d'humidité : des champignons dans le vide sanitaire - GF Expertise",
    description: "Champignons dans le vide sanitaire après l'achat d'une maison : étude de cas d'un expert en bâtiment indépendant à Pau, Béarn.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/02/log-cabin-1886620_1920.jpg"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "champignons-vide-sanitaire");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "champignons-vide-sanitaire";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular post-template-default single single-post postid-558 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
