import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Maitrise d’œuvre à Bayonne - Dax :  Côte Basque - Landes - GF Expertise",
  description: "Maîtrise d'œuvre à Bayonne, Dax, Côte Basque et Landes : assistance complète pour vos travaux de construction ou de rénovation.",
  alternates: { canonical: "https://gf-expertise.fr/assistance-a-maitre-douvrage/" },
  openGraph: {
    title: "Maitrise d’œuvre à Bayonne - Dax :  Côte Basque - Landes - GF Expertise",
    description: "Maîtrise d'œuvre à Bayonne, Dax, Côte Basque et Landes : assistance complète pour vos travaux de construction ou de rénovation.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2022/03/Maitrise-doeuvre-Landes-Pays-Basques.jpg"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maitrise d’œuvre à Bayonne - Dax :  Côte Basque - Landes - GF Expertise",
    description: "Maîtrise d'œuvre à Bayonne, Dax, Côte Basque et Landes : assistance complète pour vos travaux de construction ou de rénovation.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2022/03/Maitrise-doeuvre-Landes-Pays-Basques.jpg"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "assistance-a-maitre-douvrage");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "assistance-a-maitre-douvrage";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular page-template-default page page-id-1088 wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 elementor-page elementor-page-1088 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
