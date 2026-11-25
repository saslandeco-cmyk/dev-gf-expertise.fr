import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "GF Expertise dans Capital: vos achats immobiliers en toute sérénité - GF Expertise",
  description: "GF Expertise dans le magazine Capital : interview de Frédéric Gauthier sur l'expertise indépendante avant un achat immobilier.",
  alternates: { canonical: "https://gf-expertise.fr/capital-expertise-achats-immobiliers/" },
  openGraph: {
    title: "GF Expertise dans Capital: vos achats immobiliers en toute sérénité - GF Expertise",
    description: "GF Expertise dans le magazine Capital : interview de Frédéric Gauthier sur l'expertise indépendante avant un achat immobilier.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/02/WIN_20191227_16_04_22_Pro-scaled.jpg"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GF Expertise dans Capital: vos achats immobiliers en toute sérénité - GF Expertise",
    description: "GF Expertise dans le magazine Capital : interview de Frédéric Gauthier sur l'expertise indépendante avant un achat immobilier.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/02/WIN_20191227_16_04_22_Pro-scaled.jpg"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "capital-expertise-achats-immobiliers");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "capital-expertise-achats-immobiliers";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular post-template-default single single-post postid-509 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
