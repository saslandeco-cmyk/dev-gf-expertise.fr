import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Expert bâtiment à CAPBRETON / HOSSEGOR – Expertise indépendante rapide - GF Expertise",
  description: "Expert Bâtiment CAPBRETON / HOSSEGOR _ Expertise indépendante rapide Fissures, humidité, réception de travaux, malfaçons, ou litige pendant les travaux ? J’interviens rapidement à CAPEBRETON & HOSSEGOR et dans le sud des Landes pour réaliser une expertise technique fiable et indépendante. Les missions de GF EXPERTISE: – Expertise fissures maison – Expertise humidité maison – […]",
  alternates: { canonical: "https://gf-expertise.fr/gf-expertise-expert-technicien-en-batiment/expert-batiment-a-capbreton-hossegor-expertise-independante-rapide/" },
  openGraph: {
    title: "Expert bâtiment à CAPBRETON / HOSSEGOR – Expertise indépendante rapide - GF Expertise",
    description: "Expert Bâtiment CAPBRETON / HOSSEGOR _ Expertise indépendante rapide Fissures, humidité, réception de travaux, malfaçons, ou litige pendant les travaux ? J’interviens rapidement à CAPEBRETON & HOSSEGOR et dans le sud des Landes pour réaliser une expertise technique fiable et indépendante. Les missions de GF EXPERTISE: – Expertise fissures maison – Expertise humidité maison – […]",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/12/Capture-decran-2020-12-16-133704.png"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert bâtiment à CAPBRETON / HOSSEGOR – Expertise indépendante rapide - GF Expertise",
    description: "Expert Bâtiment CAPBRETON / HOSSEGOR _ Expertise indépendante rapide Fissures, humidité, réception de travaux, malfaçons, ou litige pendant les travaux ? J’interviens rapidement à CAPEBRETON & HOSSEGOR et dans le sud des Landes pour réaliser une expertise technique fiable et indépendante. Les missions de GF EXPERTISE: – Expertise fissures maison – Expertise humidité maison – […]",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/12/Capture-decran-2020-12-16-133704.png"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "gf-expertise-expert-technicien-en-batiment", "expert-batiment-a-capbreton-hossegor-expertise-independante-rapide");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "gf-expertise-expert-technicien-en-batiment/expert-batiment-a-capbreton-hossegor-expertise-independante-rapide";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular page-template-default page page-id-5097 page-child parent-pageid-454 wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
