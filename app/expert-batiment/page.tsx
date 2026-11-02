import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expert en Bâtiment Pau, Béarn et Dax / Mont de Marsan,Landes",
  description: "GF Expertise est votre expert indépendant. Il prendra en charge votre dossier dans les cas de sinistre (innondation, dégât des eaux, incendie, tempête,..;etc) , désaccord avec votre assureur, ou malfaçon lors de travaux, litige avec un artisan, étude des contrats et devis de travaux avant la signature, conseils techniques, résolution amiable des litiges.",
};

const CONTENT_DIR = path.join(process.cwd(), "content", "expert-batiment");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular page-template page-template-elementor_header_footer page page-id-570 page-parent wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-template-full-width elementor-kit-919 elementor-page elementor-page-570 modula-best-grid-gallery" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}
