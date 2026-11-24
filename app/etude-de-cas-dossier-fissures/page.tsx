import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Etude de cas : Dossier Fissures - GF Expertise",
  description: "Sur la demande d’un maitre d’ouvrage, GF EXPERTISE est missionné pour diagnostiquer un cas de fissures et pour établir un rapport de constat afin de définir l’évolution d’un sinistre révélé précédemment par un expert d’assurance. Ainsi 4 ans après l’expertise initiale, plusieurs nouvelles fissures ont été détectées, outre un élargissement de l’amplitude et un allongement […]",
  alternates: { canonical: "https://gf-expertise.fr/etude-de-cas-dossier-fissures/" },
  openGraph: {
    title: "Etude de cas : Dossier Fissures - GF Expertise",
    description: "Sur la demande d’un maitre d’ouvrage, GF EXPERTISE est missionné pour diagnostiquer un cas de fissures et pour établir un rapport de constat afin de définir l’évolution d’un sinistre révélé précédemment par un expert d’assurance. Ainsi 4 ans après l’expertise initiale, plusieurs nouvelles fissures ont été détectées, outre un élargissement de l’amplitude et un allongement […]",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/02/crack-695010_1920.jpg"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Etude de cas : Dossier Fissures - GF Expertise",
    description: "Sur la demande d’un maitre d’ouvrage, GF EXPERTISE est missionné pour diagnostiquer un cas de fissures et pour établir un rapport de constat afin de définir l’évolution d’un sinistre révélé précédemment par un expert d’assurance. Ainsi 4 ans après l’expertise initiale, plusieurs nouvelles fissures ont été détectées, outre un élargissement de l’amplitude et un allongement […]",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/02/crack-695010_1920.jpg"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "etude-de-cas-dossier-fissures");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "etude-de-cas-dossier-fissures";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular post-template-default single single-post postid-560 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
