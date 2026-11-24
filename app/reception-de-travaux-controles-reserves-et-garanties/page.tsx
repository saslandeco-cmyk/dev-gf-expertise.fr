import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Réception de travaux : contrôles, réserves et garanties - GF Expertise",
  description: "Découvrez les contrôles à effectuer, comment rédiger des réserves précises et pourquoi se faire accompagner par un expert bâtiment. La réception de travaux n’est pas une simple remise de clés. C’est l’acte par lequel le maître d’ouvrage accepte les travaux réalisés, avec ou sans réserves. Cette étape marque officiellement la fin du chantier et constitue […]",
  alternates: { canonical: "https://gf-expertise.fr/reception-de-travaux-controles-reserves-et-garanties/" },
  openGraph: {
    title: "Réception de travaux : contrôles, réserves et garanties - GF Expertise",
    description: "Découvrez les contrôles à effectuer, comment rédiger des réserves précises et pourquoi se faire accompagner par un expert bâtiment. La réception de travaux n’est pas une simple remise de clés. C’est l’acte par lequel le maître d’ouvrage accepte les travaux réalisés, avec ou sans réserves. Cette étape marque officiellement la fin du chantier et constitue […]",
    images: ["https://gf-expertise.fr/wp-content/uploads/2026/10/Controle-expert-de-la-baie-vitree-1024x576.png"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Réception de travaux : contrôles, réserves et garanties - GF Expertise",
    description: "Découvrez les contrôles à effectuer, comment rédiger des réserves précises et pourquoi se faire accompagner par un expert bâtiment. La réception de travaux n’est pas une simple remise de clés. C’est l’acte par lequel le maître d’ouvrage accepte les travaux réalisés, avec ou sans réserves. Cette étape marque officiellement la fin du chantier et constitue […]",
    images: ["https://gf-expertise.fr/wp-content/uploads/2026/10/Controle-expert-de-la-baie-vitree-1024x576.png"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "reception-de-travaux-controles-reserves-et-garanties");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "reception-de-travaux-controles-reserves-et-garanties";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular post-template-default single single-post postid-5179 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
