import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Vice caché sur une maison individuelle : Que faire ? - GF Expertise",
  description: "Vice caché sur une maison individuelle : que faire après l'achat ? Démarche et rôle de l'expert en bâtiment face aux responsabilités.",
  alternates: { canonical: "https://gf-expertise.fr/vice-cache-mars21/" },
  openGraph: {
    title: "Vice caché sur une maison individuelle : Que faire ? - GF Expertise",
    description: "Vice caché sur une maison individuelle : que faire après l'achat ? Démarche et rôle de l'expert en bâtiment face aux responsabilités.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/02/log-cabin-1886620_1920.jpg"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vice caché sur une maison individuelle : Que faire ? - GF Expertise",
    description: "Vice caché sur une maison individuelle : que faire après l'achat ? Démarche et rôle de l'expert en bâtiment face aux responsabilités.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/02/log-cabin-1886620_1920.jpg"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "vice-cache-mars21");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "vice-cache-mars21";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular post-template-default single single-post postid-854 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
