import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Pourquoi confier l’analyse de vos devis à un expert en bâtiment avant de lancer les travaux ? - GF Expertise",
  description: "Pourquoi faire analyser vos devis de travaux par un expert en bâtiment avant de signer : prestations, cohérence et points de vigilance.",
  alternates: { canonical: "https://gf-expertise.fr/confier-lanalyse-de-vos-devis-a-un-expert-en-batiment-avant-de-lancer-les-travaux/" },
  openGraph: {
    title: "Pourquoi confier l’analyse de vos devis à un expert en bâtiment avant de lancer les travaux ? - GF Expertise",
    description: "Pourquoi faire analyser vos devis de travaux par un expert en bâtiment avant de signer : prestations, cohérence et points de vigilance.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2026/10/Analyse-experte-des-devis-et-plans.png"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pourquoi confier l’analyse de vos devis à un expert en bâtiment avant de lancer les travaux ? - GF Expertise",
    description: "Pourquoi faire analyser vos devis de travaux par un expert en bâtiment avant de signer : prestations, cohérence et points de vigilance.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2026/10/Analyse-experte-des-devis-et-plans.png"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "confier-lanalyse-de-vos-devis-a-un-expert-en-batiment-avant-de-lancer-les-travaux");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "confier-lanalyse-de-vos-devis-a-un-expert-en-batiment-avant-de-lancer-les-travaux";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular page-template-default page page-id-5188 wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 elementor-page elementor-page-5188 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
