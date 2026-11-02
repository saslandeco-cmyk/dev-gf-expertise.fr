import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frédéric Gauthier, auteur/autrice sur GF Expertise - Page 2 sur 2",
  description: "",
};

const CONTENT_DIR = path.join(process.cwd(), "content", "author", "gauthier-gfexpertisegmail-com", "page", "2");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="archive paged author author-gauthier-gfexpertisegmail-com author-2 wp-custom-logo wp-embed-responsive paged-2 author-paged-2 wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}
