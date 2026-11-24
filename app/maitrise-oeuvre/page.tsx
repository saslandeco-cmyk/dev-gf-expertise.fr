import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Maitrise d’œuvre à Bayonne - Dax :  Côte Basque - Landes - GF Expertise",
  description: "Maitrise d’œuvre à Bayonne – Dax : Côte Basque – Landes Vous avez un projet de travaux de construction neuve ou de rénovation, sur une villa ou un immeuble ? Faîtes vous assister par un expert en constructions. Nous assurons une mission de maîtrise d’œuvre complète d’exécution sur les départements des Landes et Pays Basque […]",
};

const CONTENT_DIR = path.join(process.cwd(), "content", "maitrise-oeuvre");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "maitrise-oeuvre";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular page-template-default page page-id-1088 wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 elementor-page elementor-page-1088 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
