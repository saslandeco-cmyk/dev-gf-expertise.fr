import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Avis technique d'un Expert en bâtiment - GF Expertise",
  description: "Le requérant a sollicité mon expertise en qualité d’expert bâtiment et économiste de la construction pour avoir un avis technique sur l’état de deux bâtiments dans le cadre de la rédaction d’un nouveau bail. La mission de l’expert sera suivant le devis 20-138 du x-x-2020 : Diagnostic technique des bâtiments. Donner un avis sur l’état […]",
};

const CONTENT_DIR = path.join(process.cwd(), "content", "avis-technique-dun-expert-en-batiment");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "avis-technique-dun-expert-en-batiment";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular post-template-default single single-post postid-784 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
