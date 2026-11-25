import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Des fissures apparaissent ? Que faire ? - GF Expertise",
  description: "Des fissures apparaissent chez vous ? Exemple de diagnostic d'un expert en bâtiment sur un affaissement de dalle lié à une infiltration.",
  alternates: { canonical: "https://gf-expertise.fr/fissures-infiltrations/" },
  openGraph: {
    title: "Des fissures apparaissent ? Que faire ? - GF Expertise",
    description: "Des fissures apparaissent chez vous ? Exemple de diagnostic d'un expert en bâtiment sur un affaissement de dalle lié à une infiltration.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2021/11/fissurre.jpg"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Des fissures apparaissent ? Que faire ? - GF Expertise",
    description: "Des fissures apparaissent chez vous ? Exemple de diagnostic d'un expert en bâtiment sur un affaissement de dalle lié à une infiltration.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2021/11/fissurre.jpg"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "fissures-infiltrations");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "fissures-infiltrations";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular post-template-default single single-post postid-881 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
