import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Apparition de Fissures après achat d une Maison: vice caché ? - GF Expertise",
  description: "Le requérant, maître d’ouvrage, a souhaité l’avis de Frédéric GAUTHIER, Expert en Bâtiment à Dax, afin de prendre constat des désordres et de ses allégations. Voici la trame que suit votre expert en construction. Ci-après mes constats et avis: Pour constater des fissures et des infiltrations d’eau sur son habitation. La mission de l’expert sera […]",
};

const CONTENT_DIR = path.join(process.cwd(), "content", "apparition-fissure-maison");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "apparition-fissure-maison";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular post-template-default single single-post postid-740 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
