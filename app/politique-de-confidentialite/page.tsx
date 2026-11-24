import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Protection des données personnelles - GF Expertise",
  description: "Politique de protection des données I – Objectifs et champ d’application Les termes commençant par une majuscule utilisés dans la présente Politique de protection des Données personnelles (ci-après la « Politique ») sont définis dans l’Annexe 1 « Définitions ». 1. Objectifs de la Politique Gf-expertise accorde la plus grande importance et le plus grand […]",
  alternates: { canonical: "https://gf-expertise.fr/politique-de-confidentialite/" },
  openGraph: {
    title: "Protection des données personnelles - GF Expertise",
    description: "Politique de protection des données I – Objectifs et champ d’application Les termes commençant par une majuscule utilisés dans la présente Politique de protection des Données personnelles (ci-après la « Politique ») sont définis dans l’Annexe 1 « Définitions ». 1. Objectifs de la Politique Gf-expertise accorde la plus grande importance et le plus grand […]",
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Protection des données personnelles - GF Expertise",
    description: "Politique de protection des données I – Objectifs et champ d’application Les termes commençant par une majuscule utilisés dans la présente Politique de protection des Données personnelles (ci-après la « Politique ») sont définis dans l’Annexe 1 « Définitions ». 1. Objectifs de la Politique Gf-expertise accorde la plus grande importance et le plus grand […]",
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "politique-de-confidentialite");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "politique-de-confidentialite";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="privacy-policy wp-singular page-template page-template-elementor_header_footer page page-id-3 wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-template-full-width elementor-kit-919 elementor-page elementor-page-3 modula-best-grid-gallery" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
