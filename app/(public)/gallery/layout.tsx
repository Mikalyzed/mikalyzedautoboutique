import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Mikalyzed Auto Boutique",
  description: "Tour the Mikalyzed Auto Boutique facility in Miami. View our showroom, lounge, full bar, racing simulator, and warehouse.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
