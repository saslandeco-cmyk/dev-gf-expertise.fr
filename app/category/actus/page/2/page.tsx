import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Archives des Actualites - Page 2 sur 2 - GF Expertise",
  description: "",
  alternates: { canonical: "https://gf-expertise.fr/category/actus/page/2/" },
  openGraph: {
    title: "Archives des Actualites - Page 2 sur 2 - GF Expertise",
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Archives des Actualites - Page 2 sur 2 - GF Expertise",
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "category", "actus", "page", "2");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "category/actus/page/2";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="archive paged category category-actus category-2 wp-custom-logo wp-embed-responsive paged-2 category-paged-2 wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
