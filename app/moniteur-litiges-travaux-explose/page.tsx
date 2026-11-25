import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Le moniteur : le nombre de litiges par travaux explose - GF Expertise",
  description: "Le nombre de litiges liés aux travaux de construction explose en France : retards, abandons de chantier et malfaçons, selon une étude CLCV.",
  alternates: { canonical: "https://gf-expertise.fr/moniteur-litiges-travaux-explose/" },
  openGraph: {
    title: "Le moniteur : le nombre de litiges par travaux explose - GF Expertise",
    description: "Le nombre de litiges liés aux travaux de construction explose en France : retards, abandons de chantier et malfaçons, selon une étude CLCV.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/02/litiges-batiment2-e1582049851406.jpg"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Le moniteur : le nombre de litiges par travaux explose - GF Expertise",
    description: "Le nombre de litiges liés aux travaux de construction explose en France : retards, abandons de chantier et malfaçons, selon une étude CLCV.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/02/litiges-batiment2-e1582049851406.jpg"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "moniteur-litiges-travaux-explose");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "moniteur-litiges-travaux-explose";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular post-template-default single single-post postid-554 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
