import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "GF Expertise dans Capital: vos achats immobiliers en toute sérénité - GF Expertise",
  description: "Vingt-cinq ans d’expérience, des connaissances techniques solides : au sein de GF Expertise qu’il a fondée en 2016, Frédéric Gauthier est expert indépendant en immobilier et bâtiment. Entretien avec ce conseiller technique de choix. Quel est votre parcours ? Titulaire d’un diplôme d’économiste de la construction et coordinateur de travaux, j’ai travaillé dans des bureaux […]",
};

const CONTENT_DIR = path.join(process.cwd(), "content", "capital-expertise-achats-immobiliers");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "capital-expertise-achats-immobiliers";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular post-template-default single single-post postid-509 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
