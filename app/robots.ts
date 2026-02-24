import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/feeds/"],
        disallow: ["/admin/", "/api/", "/sign-in", "/sign-up"],
      },
    ],
    sitemap: "https://mikalyzedautoboutique.com/sitemap.xml",
  };
}
