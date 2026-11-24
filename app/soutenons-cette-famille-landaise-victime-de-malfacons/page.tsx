import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Soutenons cette famille landaise victime de malfaçons - GF Expertise",
  description: "Extrait d’un article Sud Ouest rédigé par Arnauld Bernard Publié le 01/10/2020 Lionel et Géraldine Labesque ont obtenu la condamnation de l’entrepreneur et de son assurance pour des malfaçons sur leur maison, bâtie à Messanges. Problème : les personnes en cause sont insolvables. Sud Ouest Solidarité invite à soutenir ce couple de Landais Lionel et […]",
  alternates: { canonical: "https://gf-expertise.fr/soutenons-cette-famille-landaise-victime-de-malfacons/" },
  openGraph: {
    title: "Soutenons cette famille landaise victime de malfaçons - GF Expertise",
    description: "Extrait d’un article Sud Ouest rédigé par Arnauld Bernard Publié le 01/10/2020 Lionel et Géraldine Labesque ont obtenu la condamnation de l’entrepreneur et de son assurance pour des malfaçons sur leur maison, bâtie à Messanges. Problème : les personnes en cause sont insolvables. Sud Ouest Solidarité invite à soutenir ce couple de Landais Lionel et […]",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/10/aidemaisonj.jpg"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soutenons cette famille landaise victime de malfaçons - GF Expertise",
    description: "Extrait d’un article Sud Ouest rédigé par Arnauld Bernard Publié le 01/10/2020 Lionel et Géraldine Labesque ont obtenu la condamnation de l’entrepreneur et de son assurance pour des malfaçons sur leur maison, bâtie à Messanges. Problème : les personnes en cause sont insolvables. Sud Ouest Solidarité invite à soutenir ce couple de Landais Lionel et […]",
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
