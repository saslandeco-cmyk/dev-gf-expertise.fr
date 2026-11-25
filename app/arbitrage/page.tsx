import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Arbitrage Litiges Travaux et Problèmes de Construction - GF Expertise",
  description: "L'arbitrage, mode alternatif de règlement des litiges de travaux et de construction : principe, déroulement et quand y recourir.",
  alternates: { canonical: "https://gf-expertise.fr/arbitrage/" },
  openGraph: {
    title: "Arbitrage Litiges Travaux et Problèmes de Construction - GF Expertise",
    description: "L'arbitrage, mode alternatif de règlement des litiges de travaux et de construction : principe, déroulement et quand y recourir.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2017/10/purchase-3113198_1920.jpg"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arbitrage Litiges Travaux et Problèmes de Construction - GF Expertise",
    description: "L'arbitrage, mode alternatif de règlement des litiges de travaux et de construction : principe, déroulement et quand y recourir.",
    images: ["https://gf-expertise.fr/wp-content/uploads/2017/10/purchase-3113198_1920.jpg"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "arbitrage");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "arbitrage";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular page-template-default page page-id-510 wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 elementor-page elementor-page-510 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
