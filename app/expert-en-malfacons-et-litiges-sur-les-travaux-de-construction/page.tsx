import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Expert en malfaçons et litiges sur les travaux de construction - GF Expertise",
  description: "Le nombre de litiges explose en matière de construction. Entre les retards et les abandons de chantiers, les cas de malfaçons, de non-conformité des travaux, d’absence de levée de réserves, de dépôts de bilan de la part des entrepreneurs…  l’expertise des désordres et malfaçons dans le bâtiment est de plus en plus une nécessité qu’un […]",
};

const CONTENT_DIR = path.join(process.cwd(), "content", "expert-en-malfacons-et-litiges-sur-les-travaux-de-construction");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "expert-en-malfacons-et-litiges-sur-les-travaux-de-construction";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular page-template-default page page-id-654 wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
