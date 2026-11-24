import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getEffectiveBodyHtml } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Vice caché sur une maison individuelle : Que faire ? - GF Expertise",
  description: "Après découvrir une imperfection à la suite de l’achat d’une maison, que devez-vous faire ? Appeler un expert en bâtiment évidemment ! Ce dernier vérifie le respect des normes et de la réglementation, Il constate les désordres, recherche l’origine des dommages, propose des solutions amiables et détermine la responsabilité de chacun. 1 – Généralités 1.1 […]",
  alternates: { canonical: "https://gf-expertise.fr/vice-cache-mars21/" },
  openGraph: {
    title: "Vice caché sur une maison individuelle : Que faire ? - GF Expertise",
    description: "Après découvrir une imperfection à la suite de l’achat d’une maison, que devez-vous faire ? Appeler un expert en bâtiment évidemment ! Ce dernier vérifie le respect des normes et de la réglementation, Il constate les désordres, recherche l’origine des dommages, propose des solutions amiables et détermine la responsabilité de chacun. 1 – Généralités 1.1 […]",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/02/log-cabin-1886620_1920.jpg"],
    siteName: "GF Expertise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vice caché sur une maison individuelle : Que faire ? - GF Expertise",
    description: "Après découvrir une imperfection à la suite de l’achat d’une maison, que devez-vous faire ? Appeler un expert en bâtiment évidemment ! Ce dernier vérifie le respect des normes et de la réglementation, Il constate les désordres, recherche l’origine des dommages, propose des solutions amiables et détermine la responsabilité de chacun. 1 – Généralités 1.1 […]",
    images: ["https://gf-expertise.fr/wp-content/uploads/2020/02/log-cabin-1886620_1920.jpg"],
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content", "vice-cache-mars21");
const headHtml = fs.readFileSync(path.join(CONTENT_DIR, "head.html"), "utf8");
const bodyHtml = fs.readFileSync(path.join(CONTENT_DIR, "body.html"), "utf8");
const SLUG = "vice-cache-mars21";

export default async function Page() {
  const effectiveBodyHtml = await getEffectiveBodyHtml(SLUG, bodyHtml);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headHtml }} />
      <div className="wp-singular post-template-default single single-post postid-854 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-blocksy wp-child-theme-gf-expertise-child elementor-default elementor-kit-919 modula-best-grid-gallery ct-elementor-default-template" dangerouslySetInnerHTML={{ __html: effectiveBodyHtml }} />
    </>
  );
}
