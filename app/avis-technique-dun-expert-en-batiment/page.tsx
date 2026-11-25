import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Avis technique d'un Expert en bâtiment - GF Expertise",
  description: "Avis technique d'un expert en bâtiment sur l'état de deux bâtiments avant la rédaction d'un bail : diagnostic et estimation des travaux.",
  alternates: { canonical: "https://gf-expertise.fr/avis-technique-dun-expert-en-batiment/" },
  openGraph: {
    title: "Avis technique d'un Expert en bâtiment - GF Expertise",
    description: "Avis technique d'un expert en bâtiment sur l'état de deux bâtiments avant la rédaction d'un bail : diagnostic et estimation des travaux.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/12/baniere1-1.png"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avis technique d'un Expert en bâtiment - GF Expertise",
    description: "Avis technique d'un expert en bâtiment sur l'état de deux bâtiments avant la rédaction d'un bail : diagnostic et estimation des travaux.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/12/baniere1-1.png"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "avis-technique-dun-expert-en-batiment");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "avis-technique-dun-expert-en-batiment";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular post-template-default single single-post postid-784 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
