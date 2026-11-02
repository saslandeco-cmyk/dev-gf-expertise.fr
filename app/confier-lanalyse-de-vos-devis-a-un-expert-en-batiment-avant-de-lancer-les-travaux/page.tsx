import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pourquoi confier l’analyse de vos devis à un expert en bâtiment avant de lancer les travaux ? - GF Expertise",
  description: "",
};

const CONTENT_DIR = path.join(process.cwd(), "content", "confier-lanalyse-de-vos-devis-a-un-expert-en-batiment-avant-de-lancer-les-travaux");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular page-template-default page page-id-5188 wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 elementor-page elementor-page-5188 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}
