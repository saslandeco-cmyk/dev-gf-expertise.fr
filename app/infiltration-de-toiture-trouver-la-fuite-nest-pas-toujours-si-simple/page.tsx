import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "INFILTRATION DE TOITURE : TROUVER LA FUITE N’EST PAS TOUJOURS SI SIMPLE - GF Expertise",
  description: "Infiltration de toiture : pourquoi trouver l'origine d'une fuite n'est pas toujours simple, et comment un expert en identifie la cause.",
  alternates: { canonical: "https://gf-expertise.fr/infiltration-de-toiture-trouver-la-fuite-nest-pas-toujours-si-simple/" },
  openGraph: {
    title: "INFILTRATION DE TOITURE : TROUVER LA FUITE N’EST PAS TOUJOURS SI SIMPLE - GF Expertise",
    description: "Infiltration de toiture : pourquoi trouver l'origine d'une fuite n'est pas toujours simple, et comment un expert en identifie la cause.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2026/10/Localiser-une-infiltration-de-toiture.png"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "INFILTRATION DE TOITURE : TROUVER LA FUITE N’EST PAS TOUJOURS SI SIMPLE - GF Expertise",
    description: "Infiltration de toiture : pourquoi trouver l'origine d'une fuite n'est pas toujours simple, et comment un expert en identifie la cause.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2026/10/Localiser-une-infiltration-de-toiture.png"],
  },
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
