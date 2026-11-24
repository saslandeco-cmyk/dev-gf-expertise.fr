import { SITE_URL } from "@/lib/site-url";

// Site-wide ProfessionalService structured data (schema.org), built from the
// business details on content/mentions-legales (address, SIRET) and the
// site header (phone, Instagram) - helps Google understand GF Expertise as
// a real local business rather than just a stack of unrelated pages.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "GF Expertise",
  image: `${SITE_URL}/wp-content/uploads/2021/12/Logo-gf-expertise.png`,
  url: SITE_URL,
  telephone: "+33662433684",
  email: "gauthier.gfexpertise@gmail.com",
  founder: {
    "@type": "Person",
    name: "Frédéric Gauthier",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "4 Rue des Morilles",
    postalCode: "40260",
    addressLocality: "Linxe",
    addressCountry: "FR",
  },
  areaServed: ["Landes", "Pays Basque", "Pyrénées-Atlantiques", "Béarn", "Bordeaux"],
  sameAs: ["https://www.instagram.com/gf.expertise/"],
};

export default function OrganizationJsonLd() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
