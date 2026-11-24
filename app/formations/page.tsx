import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Formation Aux Techniques du Bâtiment pour les Agents Immobiliers - GF Expertise",
  description: "L’agent immobilier se doit de maîtriser le vocabulaire et connaître techniquement son produit. Dans cette formation sur les techniques du bâtiment réalisée pour le compte de l’organisme de formation en ligne Alur Magma, vous allez appréhender le volet technique mais également la réglementation thermique, les études techniques avant projet, les formalités techniques d’achèvement des travaux… […]",
};

const CONTENT_DIR = path.join(process.cwd(), "content", "formations");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "formations";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular page-template-default page page-id-837 wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 elementor-page elementor-page-837 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
