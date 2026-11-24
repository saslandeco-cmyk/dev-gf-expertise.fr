import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Contact - GF Expertise",
  description: "Besoins de conseils ou d’un accompagnement ? Malfaçons, expertises avant achat, litiges avec une entreprise, suspicions de vices cachés, sinistres ou désaccord avec un assureur… Expert en bâtiment pour particuliers et professionnels Veuillez activer JavaScript dans votre navigateur pour remplir ce formulaire.Veuillez activer JavaScript dans votre navigateur pour remplir ce formulaire. Identité : * PrénomNom […]",
};

const CONTENT_DIR = path.join(process.cwd(), "content", "contact");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "contact";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular page-template page-template-elementor_header_footer page page-id-206 wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-template-full-width elementor-kit-919 elementor-page elementor-page-206 modula-best-grid-gallery" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
