import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "5 Exemples de malfaçons dans le bâtiment - GF Expertise",
  description: "5 cas de malfaçons parmi les plus marquants en immobilier, rapportés par la presse, analysés par un expert en bâtiment indépendant.",
  alternates: { canonical: "https://gf-expertise.fr/5-exemples-de-malfacons/" },
  openGraph: {
    title: "5 Exemples de malfaçons dans le bâtiment - GF Expertise",
    description: "5 cas de malfaçons parmi les plus marquants en immobilier, rapportés par la presse, analysés par un expert en bâtiment indépendant.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/02/building-690177_1920.jpg"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "5 Exemples de malfaçons dans le bâtiment - GF Expertise",
    description: "5 cas de malfaçons parmi les plus marquants en immobilier, rapportés par la presse, analysés par un expert en bâtiment indépendant.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/02/building-690177_1920.jpg"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "5-exemples-de-malfacons");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "5-exemples-de-malfacons";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular post-template-default single single-post postid-556 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
