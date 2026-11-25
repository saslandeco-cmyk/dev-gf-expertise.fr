import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Devis travaux : faites-les vérifier par un expert bâtiment - GF Expertise",
  description: "Devis travaux : pourquoi les faire vérifier par un expert bâtiment avant de signer, pour s'assurer qu'ils correspondent à vos besoins.",
  alternates: { canonical: "https://gf-expertise.fr/devis-travaux-faites-les-verifier-par-un-expert-batiment/" },
  openGraph: {
    title: "Devis travaux : faites-les vérifier par un expert bâtiment - GF Expertise",
    description: "Devis travaux : pourquoi les faire vérifier par un expert bâtiment avant de signer, pour s'assurer qu'ils correspondent à vos besoins.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2026/10/Analyse-experte-des-devis-et-plans.png"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devis travaux : faites-les vérifier par un expert bâtiment - GF Expertise",
    description: "Devis travaux : pourquoi les faire vérifier par un expert bâtiment avant de signer, pour s'assurer qu'ils correspondent à vos besoins.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2026/10/Analyse-experte-des-devis-et-plans.png"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "devis-travaux-faites-les-verifier-par-un-expert-batiment");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "devis-travaux-faites-les-verifier-par-un-expert-batiment";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular post-template-default single single-post postid-5182 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
