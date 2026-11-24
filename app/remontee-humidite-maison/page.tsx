import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Remontée d’humidité dans une maison: Que faire ? - GF Expertise",
  description: "Le requérant, maître d’ouvrage, a souhaité l’avis de Frédéric GAUTHIER, Expert en Bâtiment près de Mimizan dans les Landes, afin de prendre constat des désordres et de ses allégations. Voici la trame que suit votre expert en construction. Le requérant a souhaité l’avis d’un expert pour les désordres suivants : Remontée d’humidité au sol dans […]",
  alternates: { canonical: "https://gf-expertise.fr/remontee-humidite-maison/" },
  openGraph: {
    title: "Remontée d’humidité dans une maison: Que faire ? - GF Expertise",
    description: "Le requérant, maître d’ouvrage, a souhaité l’avis de Frédéric GAUTHIER, Expert en Bâtiment près de Mimizan dans les Landes, afin de prendre constat des désordres et de ses allégations. Voici la trame que suit votre expert en construction. Le requérant a souhaité l’avis d’un expert pour les désordres suivants : Remontée d’humidité au sol dans […]",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/12/mesure_humidite-1.jpg"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remontée d’humidité dans une maison: Que faire ? - GF Expertise",
    description: "Le requérant, maître d’ouvrage, a souhaité l’avis de Frédéric GAUTHIER, Expert en Bâtiment près de Mimizan dans les Landes, afin de prendre constat des désordres et de ses allégations. Voici la trame que suit votre expert en construction. Le requérant a souhaité l’avis d’un expert pour les désordres suivants : Remontée d’humidité au sol dans […]",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/12/mesure_humidite-1.jpg"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "remontee-humidite-maison");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "remontee-humidite-maison";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular post-template-default single single-post postid-762 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
