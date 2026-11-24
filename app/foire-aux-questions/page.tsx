import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Foire aux questions - GF Expertise",
  description: "Vous vous posez des questions ? Voici quelques réponses… Vous trouverez ci-dessous les réponses aux questions les plus fréquentes concernant le métier d’expert en bâtiment et ses fonctions. Si vous ne trouvez toujours pas la réponse à votre question, contactez-moi ! Quelle est la différence entre un expert bâtiment indépendant, un expert d’assurance, un expert […]",
};

const CONTENT_DIR = path.join(process.cwd(), "content", "foire-aux-questions");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "foire-aux-questions";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular page-template page-template-elementor_header_footer page page-id-4150 wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-template-full-width elementor-kit-919 elementor-page elementor-page-4150 modula-best-grid-gallery" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
