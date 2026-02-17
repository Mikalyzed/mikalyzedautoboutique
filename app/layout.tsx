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
  title: "Mikalyzed Auto Boutique",
  description: "Premium pre-owned luxury and exotic vehicles",
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
