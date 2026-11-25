import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Contact - GF Expertise",
  description: "Besoin de conseils ou d'un accompagnement ? Malfaçons, vices cachés, litiges travaux : contactez Frédéric Gauthier, expert en bâtiment indépendant.",
  alternates: { canonical: "https://gf-expertise.fr/expert-en-batiment/" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Contact - GF Expertise",
    description: "Besoin de conseils ou d'un accompagnement ? Malfaçons, vices cachés, litiges travaux : contactez Frédéric Gauthier, expert en bâtiment indépendant.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2026/02/expertbatimentlandespaysbasque.png"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact - GF Expertise",
    description: "Besoin de conseils ou d'un accompagnement ? Malfaçons, vices cachés, litiges travaux : contactez Frédéric Gauthier, expert en bâtiment indépendant.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2026/02/expertbatimentlandespaysbasque.png"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "expert-en-batiment");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "expert-en-batiment";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular page-template page-template-elementor_header_footer page page-id-206 wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-template-full-width elementor-kit-919 elementor-page elementor-page-206 modula-best-grid-gallery" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
