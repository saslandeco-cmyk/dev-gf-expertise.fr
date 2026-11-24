import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "INFILTRATION DE TOITURE : TROUVER LA FUITE N’EST PAS TOUJOURS SI SIMPLE - GF Expertise",
  description: "Une auréole au plafond, une trace d’humidité ou de l’eau qui apparaît lors de fortes pluies ? L’origine d’une infiltration de toiture n’est pas forcément située juste au-dessus du dommage visible. L’eau peut cheminer sous les tuiles, le long d’un écran de sous-toiture, d’une pièce de charpente ou d’un isolant avant de devenir visible plusieurs […]",
};

const CONTENT_DIR = path.join(process.cwd(), "content", "infiltration-de-toiture-trouver-la-fuite-nest-pas-toujours-si-simple");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "infiltration-de-toiture-trouver-la-fuite-nest-pas-toujours-si-simple";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular post-template-default single single-post postid-5164 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
