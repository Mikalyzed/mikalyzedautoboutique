import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
        <body
          className={`${inter.variable} font-sans antialiased overflow-x-hidden`}
          style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
        >
          {children}
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
