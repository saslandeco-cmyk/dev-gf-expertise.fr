import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Expert en malfaçons et litiges sur les travaux de construction - GF Expertise",
  description: "Litiges et malfaçons dans la construction : pourquoi l'expertise indépendante est devenue incontournable dès le début des chantiers.",
  alternates: { canonical: "https://gf-expertise.fr/expert-en-malfacons-et-litiges-sur-les-travaux-de-construction/" },
  openGraph: {
    title: "Expert en malfaçons et litiges sur les travaux de construction - GF Expertise",
    description: "Litiges et malfaçons dans la construction : pourquoi l'expertise indépendante est devenue incontournable dès le début des chantiers.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/02/litiges-batiment2-e1582049851406.jpg"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert en malfaçons et litiges sur les travaux de construction - GF Expertise",
    description: "Litiges et malfaçons dans la construction : pourquoi l'expertise indépendante est devenue incontournable dès le début des chantiers.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/02/litiges-batiment2-e1582049851406.jpg"],
  },
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
