import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Merci pour votre demande - GF Expertise",
  description: "Votre message a bien été envoyé.Je vous contacte dans les plus brefs délais.Merci de m’avoir sollicité !",
  alternates: { canonical: "https://gf-expertise.fr/merci-pour-votre-demande/" },
  openGraph: {
    title: "Merci pour votre demande - GF Expertise",
    description: "Votre message a bien été envoyé.Je vous contacte dans les plus brefs délais.Merci de m’avoir sollicité !",
    images: ["https://gf-expertise.fr/wp-content/uploads/2026/02/expertbatimentlandespaysbasque.png"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merci pour votre demande - GF Expertise",
    description: "Votre message a bien été envoyé.Je vous contacte dans les plus brefs délais.Merci de m’avoir sollicité !",
    images: ["https://gf-expertise.fr/wp-content/uploads/2026/02/expertbatimentlandespaysbasque.png"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "merci-pour-votre-demande");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "merci-pour-votre-demande";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular page-template-default page page-id-2826 wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 elementor-page elementor-page-2826 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
