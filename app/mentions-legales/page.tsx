import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Mentions Légales - GF Expertise",
  description: "Mentions légales 1. Edition Le site gf-expertise (ci-après dénommé le Site) et ont édités par : Créateur du site : Webmaster Landes – Landeco Référencement : Agence SEO Landeco Statut INSEE : Enregistrée à l’INSEE le 04-09-2006Dénomination : MONSIEUR FREDERIC GAUTHIERAdresse : 4 RUE DES MORILLES 40260 LINXETéléphone : 06.62.43.36.84SIREN : 491 732 954SIRET (siege) : 49173295400038Activité […]",
};

const CONTENT_DIR = path.join(process.cwd(), "content", "mentions-legales");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "mentions-legales";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular page-template-default page page-id-688 wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 elementor-page elementor-page-688 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
