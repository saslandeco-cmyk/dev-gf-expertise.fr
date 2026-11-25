import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Expertise Maison Avant Achat - GF Expertise",
  description: "Expertise immobilière avant achat : audit technique complet d'une maison, d'un appartement ou d'un local, par un expert indépendant.",
  alternates: { canonical: "https://gf-expertise.fr/expert-en-immobilier/" },
  openGraph: {
    title: "Expertise Maison Avant Achat - GF Expertise",
    description: "Expertise immobilière avant achat : audit technique complet d'une maison, d'un appartement ou d'un local, par un expert indépendant.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2017/04/une30.jpg"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expertise Maison Avant Achat - GF Expertise",
    description: "Expertise immobilière avant achat : audit technique complet d'une maison, d'un appartement ou d'un local, par un expert indépendant.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2017/04/une30.jpg"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "expert-en-immobilier");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "expert-en-immobilier";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular page-template page-template-elementor_header_footer page page-id-572 wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-template-full-width elementor-kit-919 elementor-page elementor-page-572 modula-best-grid-gallery" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
