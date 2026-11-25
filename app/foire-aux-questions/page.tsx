import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Foire aux questions - GF Expertise",
  description: "Expert bâtiment indépendant, expert d'assurance, expert judiciaire : quelles différences ? Réponses aux questions les plus fréquentes.",
  alternates: { canonical: "https://gf-expertise.fr/foire-aux-questions/" },
  openGraph: {
    title: "Foire aux questions - GF Expertise",
    description: "Expert bâtiment indépendant, expert d'assurance, expert judiciaire : quelles différences ? Réponses aux questions les plus fréquentes.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2026/02/mystery-box-with-gifts-concept-scaled.jpg"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Foire aux questions - GF Expertise",
    description: "Expert bâtiment indépendant, expert d'assurance, expert judiciaire : quelles différences ? Réponses aux questions les plus fréquentes.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2026/02/mystery-box-with-gifts-concept-scaled.jpg"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "foire-aux-questions");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "foire-aux-questions";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular page-template page-template-elementor_header_footer page page-id-4150 wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-template-full-width elementor-kit-919 elementor-page elementor-page-4150 modula-best-grid-gallery" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
