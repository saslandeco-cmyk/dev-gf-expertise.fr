import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protection des données personnelles - GF Expertise",
  description: "",
};

const CONTENT_DIR = path.join(process.cwd(), "content", "politique-de-confidentialite");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="privacy-policy wp-singular page-template page-template-elementor_header_footer page page-id-3 wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-template-full-width elementor-kit-919 elementor-page elementor-page-3 modula-best-grid-gallery" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}
