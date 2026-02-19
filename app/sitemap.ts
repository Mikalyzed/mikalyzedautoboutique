import { getAvailableVehicles, getSoldVehicles } from "@/lib/vehicles";
import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mikalyzedautoboutique.com";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/inventory`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/sell`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/reserve`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/sold`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.4 },
  ];

  const [available, sold] = await Promise.all([
    getAvailableVehicles(),
    getSoldVehicles(),
  ]);

  const vehiclePages: MetadataRoute.Sitemap = [...available, ...sold].map((v) => ({
    url: `${baseUrl}/inventory/${v.slug}/${v.vin}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: v.status === "sold" ? 0.3 : 0.8,
  }));

  return [...staticPages, ...vehiclePages];
}
