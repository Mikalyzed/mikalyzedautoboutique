import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased overflow-x-hidden`}
        style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
