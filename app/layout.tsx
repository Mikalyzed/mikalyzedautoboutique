import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import MetaPixelEvents from "@/app/components/MetaPixelEvents";
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
          <MetaPixelEvents />
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-V3EN46Q726"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-V3EN46Q726');
            `}
          </Script>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1098796205169596');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=1098796205169596&ev=PageView&noscript=1"
              alt=""
            />
          </noscript>
        </body>
      </html>
    </ClerkProvider>
  );
}
