import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Accueil - GF Expertise",
  description: "Frédéric Gauthier, expert en bâtiment indépendant à Bayonne et dans le Pays Basque : fissures, malfaçons, expertise avant achat, litiges.",
  alternates: { canonical: "https://gf-expertise.fr/expert-batiment/bayonne-pays-basque/" },
  openGraph: {
    title: "Accueil - GF Expertise",
    description: "Frédéric Gauthier, expert en bâtiment indépendant à Bayonne et dans le Pays Basque : fissures, malfaçons, expertise avant achat, litiges.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2026/01/perturbationb.png"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Accueil - GF Expertise",
    description: "Frédéric Gauthier, expert en bâtiment indépendant à Bayonne et dans le Pays Basque : fissures, malfaçons, expertise avant achat, litiges.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2026/01/perturbationb.png"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "expert-batiment", "bayonne-pays-basque");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "expert-batiment/bayonne-pays-basque";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="home wp-singular page-template-default page page-id-731 wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 elementor-page elementor-page-731 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
