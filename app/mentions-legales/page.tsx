import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales - GF Expertise",
  description: "",
};

const CONTENT_DIR = path.join(process.cwd(), "content", "mentions-legales");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular page-template-default page page-id-688 wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 elementor-page elementor-page-688 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}
