import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Soutenons cette famille landaise victime de malfaçons - GF Expertise",
  description: "Soutenons une famille landaise victime de malfaçons : retour sur une affaire de construction et la condamnation d'un entrepreneur insolvable.",
  alternates: { canonical: "https://gf-expertise.fr/soutenons-cette-famille-landaise-victime-de-malfacons/" },
  openGraph: {
    title: "Soutenons cette famille landaise victime de malfaçons - GF Expertise",
    description: "Soutenons une famille landaise victime de malfaçons : retour sur une affaire de construction et la condamnation d'un entrepreneur insolvable.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/10/aidemaisonj.jpg"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soutenons cette famille landaise victime de malfaçons - GF Expertise",
    description: "Soutenons une famille landaise victime de malfaçons : retour sur une affaire de construction et la condamnation d'un entrepreneur insolvable.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/10/aidemaisonj.jpg"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "soutenons-cette-famille-landaise-victime-de-malfacons");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "soutenons-cette-famille-landaise-victime-de-malfacons";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular post-template-default single single-post postid-707 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
