import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Expert bâtiment DEPARTEMENT PYRENNEES-ATLANTIQUES – Expertise indépendante rapide - GF Expertise",
  description: "Expert bâtiment indépendant dans les Pyrénées-Atlantiques : fissures, humidité, malfaçons, réception de travaux. Expertise fiable et rapide.",
  alternates: { canonical: "https://gf-expertise.fr/gf-expertise-expert-technicien-en-batiment/expert-batiment-departement-landes-expertise-independante-rapide/" },
  openGraph: {
    title: "Expert bâtiment DEPARTEMENT PYRENNEES-ATLANTIQUES – Expertise indépendante rapide - GF Expertise",
    description: "Expert bâtiment indépendant dans les Pyrénées-Atlantiques : fissures, humidité, malfaçons, réception de travaux. Expertise fiable et rapide.",
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert bâtiment DEPARTEMENT PYRENNEES-ATLANTIQUES – Expertise indépendante rapide - GF Expertise",
    description: "Expert bâtiment indépendant dans les Pyrénées-Atlantiques : fissures, humidité, malfaçons, réception de travaux. Expertise fiable et rapide.",
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "gf-expertise-expert-technicien-en-batiment", "expert-batiment-departement-landes-expertise-independante-rapide");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "gf-expertise-expert-technicien-en-batiment/expert-batiment-departement-landes-expertise-independante-rapide";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular page-template-default page page-id-5102 page-child parent-pageid-454 wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 elementor-page elementor-page-5102 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
