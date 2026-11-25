import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Mentions Légales - GF Expertise",
  description: "Mentions légales de GF Expertise : éditeur, hébergeur et informations légales du site gf-expertise.fr.",
  alternates: { canonical: "https://gf-expertise.fr/mentions-legales/" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Mentions Légales - GF Expertise",
    description: "Mentions légales de GF Expertise : éditeur, hébergeur et informations légales du site gf-expertise.fr.",
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mentions Légales - GF Expertise",
    description: "Mentions légales de GF Expertise : éditeur, hébergeur et informations légales du site gf-expertise.fr.",
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "mentions-legales");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "mentions-legales";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular page-template-default page page-id-688 wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 elementor-page elementor-page-688 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
