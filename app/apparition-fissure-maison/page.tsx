import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Apparition de Fissures après achat d une Maison: vice caché ? - GF Expertise",
  description: "Fissures découvertes après l'achat d'une maison : vice caché ou non ? Étude de cas par Frédéric Gauthier, expert en bâtiment à Dax.",
  alternates: { canonical: "https://gf-expertise.fr/apparition-fissure-maison/" },
  openGraph: {
    title: "Apparition de Fissures après achat d une Maison: vice caché ? - GF Expertise",
    description: "Fissures découvertes après l'achat d'une maison : vice caché ou non ? Étude de cas par Frédéric Gauthier, expert en bâtiment à Dax.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/12/fissure-maison-individuelle.jpg"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apparition de Fissures après achat d une Maison: vice caché ? - GF Expertise",
    description: "Fissures découvertes après l'achat d'une maison : vice caché ou non ? Étude de cas par Frédéric Gauthier, expert en bâtiment à Dax.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/12/fissure-maison-individuelle.jpg"],
  },
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
