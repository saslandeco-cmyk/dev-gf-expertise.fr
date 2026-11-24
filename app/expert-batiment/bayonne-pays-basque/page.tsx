import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Accueil - GF Expertise",
  description: "Frédéric GAUTHIER Expert en bâtiment Landes – Pays Basque – Pyrénées Atlantiques demande d’nformations Qualifié dans le bâtiment depuis 1996   Chez GF EXPERTISE, il n’y a pas de « NOUS », mais simplement Frédéric GAUTHIER, expert en bâtiment intervenant pour les particuliers, les professionnels, les agents immobiliers, les syndics, les collectivités et institutions publiques […]",
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
