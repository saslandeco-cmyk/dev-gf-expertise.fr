import type { Metadata } from "next";
import "./globals.css";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Site-wide kill switch while the migration isn't ready to go live.
  // Every page inherits this unless it sets its own `robots` - remove once
  // ready to be indexed for real (and restore the sitemap link in robots.ts).
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <body>
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  );
}
