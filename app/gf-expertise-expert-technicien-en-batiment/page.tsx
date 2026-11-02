import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GF Expertise : Expert en Batiment Bayonne, Pays Basque, Landes",
  description: "Expert en Contruction Bayonne, Pays Basque - Landes et Pau, Béarn. GF EXPERTISE, représenté par M. GAUTHIER Frédéric est un expert d'assuré indépendant, impartial et objectif. GF EXPERTISE c’est plus de 25 ans d’expériences dans le bâtiment et plus particulièrement dans les disciplines suivantes : Expertise technique bâtiment, Audit technique immobilier, Assistance au maître d’ouvrage (client), l’économie de la construction et la maîtrise d’œuvre d’exécution.Expert en sinistres, malfaçons, fissures, litige, conseils avant achat ou travaux.",
};

const CONTENT_DIR = path.join(process.cwd(), "content", "gf-expertise-expert-technicien-en-batiment");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular page-template-default page page-id-454 page-parent wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 elementor-page elementor-page-454 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}
