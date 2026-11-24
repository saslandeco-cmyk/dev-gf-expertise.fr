import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Frédéric Gauthier, auteur/autrice sur GF Expertise",
  description: "",
  alternates: { canonical: "https://gf-expertise.fr/author/gauthier-gfexpertisegmail-com/" },
  openGraph: {
    title: "Frédéric Gauthier, auteur/autrice sur GF Expertise",
    images: ["https://gf-expertise.fr/wp-content/litespeed/avatar/754f278181eb8682556151c28a569c28.jpg?ver=1790874893"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frédéric Gauthier, auteur/autrice sur GF Expertise",
    images: ["https://gf-expertise.fr/wp-content/litespeed/avatar/754f278181eb8682556151c28a569c28.jpg?ver=1790874893"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "author", "gauthier-gfexpertisegmail-com");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "author/gauthier-gfexpertisegmail-com";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="archive author author-gauthier-gfexpertisegmail-com author-2 wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
