import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Accueil - GF Expertise",
  description: "Frédéric Gauthier, expert en bâtiment indépendant dans les Landes et le Pays Basque depuis 1996 : fissures, malfaçons, expertise avant achat immobilier.",
  alternates: { canonical: "https://gf-expertise.fr/" },
  openGraph: {
    title: "Accueil - GF Expertise",
    description: "Frédéric Gauthier, expert en bâtiment indépendant dans les Landes et le Pays Basque depuis 1996 : fissures, malfaçons, expertise avant achat immobilier.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2026/01/perturbationb.png"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Accueil - GF Expertise",
    description: "Frédéric Gauthier, expert en bâtiment indépendant dans les Landes et le Pays Basque depuis 1996 : fissures, malfaçons, expertise avant achat immobilier.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2026/01/perturbationb.png"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "__home__");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "__home__";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      {/* The hero is a CSS background-image (Elementor "classic" background),
          not an <img> - invisible to the browser's preload scanner, so it's
          the LCP element but was the last thing to start loading (measured
          at ~5s). This hints it in instead of waiting on the external
          stylesheet to resolve the background-image rule. */}
      <link
        rel="preload"
        as="image"
        href="/wp-content/uploads/2026/01/expertenbatimentlandespaybasque.png"
        fetchPriority="high"
      />
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="home wp-singular page-template-default page page-id-731 wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 elementor-page elementor-page-731 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
