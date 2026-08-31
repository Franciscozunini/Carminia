import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { factoringProviderSlugs } from "@/lib/data/factoringProviders";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date(SITE.updated);
  const staticPaths = [
    "",
    "/factoring",
    "/factoring/calculator",
    "/factoring/compare",
    "/owner-operator-profit-calculator",
    "/break-even-rate-calculator",
    "/load-profit-calculator",
    "/methodology",
    "/how-we-make-money",
    "/about",
    "/disclaimer",
  ];

  const providerPaths = factoringProviderSlugs().map((slug) => `/factoring/${slug}`);

  return [...staticPaths, ...providerPaths].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: path.includes("calculator") ? "monthly" : "weekly",
    priority: path === "" || path === "/factoring/calculator" ? 1 : 0.7,
  }));
}
