import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mikalyzedautoboutique.com"),
  title: "Mikalyzed Auto Boutique",
  description: "Premium pre-owned luxury and exotic vehicles",
  openGraph: {
    title: "Mikalyzed Auto Boutique",
    description: "Premium pre-owned luxury and exotic vehicles",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Mikalyzed Auto Boutique" }],
    type: "website",
    siteName: "Mikalyzed Auto Boutique",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mikalyzed Auto Boutique",
    description: "Premium pre-owned luxury and exotic vehicles",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="overflow-x-hidden">
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "AutoDealer",
                name: "Mikalyzed Auto Boutique",
                description: "Premium pre-owned luxury and exotic vehicles in Miami, FL",
                url: "https://mikalyzedautoboutique.com",
                logo: "https://mikalyzedautoboutique.com/og-image.png",
                image: "https://mikalyzedautoboutique.com/og-image.png",
                telephone: "+1-305-720-2533",
                email: "info@mikalyzedautoboutique.com",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "3455 NW 30th Ave",
                  addressLocality: "Miami",
                  addressRegion: "FL",
                  postalCode: "33142",
                  addressCountry: "US",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 25.8072,
                  longitude: -80.2483,
                },
                sameAs: [
                  "https://www.facebook.com/p/Mikalyzed-Auto-Boutique-61559979093260/",
                  "https://www.instagram.com/mikalyzed_autoboutique/",
                  "https://www.youtube.com/@mikalyzedautoboutique",
                  "https://www.tiktok.com/@mikalyzed_autoboutique",
                ],
                priceRange: "$$$",
              }),
            }}
          />
        </head>
        <body
          className={`${inter.variable} font-sans antialiased overflow-x-hidden`}
          style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
        >
          {children}
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
