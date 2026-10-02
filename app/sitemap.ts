import type { MetadataRoute } from "next";
import { guideSlugs } from "./guides/data";
import { getSiteUrl } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  const routes = [
    "",
    "/how-to",
    "/unit-price",
    "/discount",
    "/tax",
    "/points",
    "/bottom-price",
    "/guides",
    ...guideSlugs.map((slug) => `/guides/${slug}`),
    "/about",
    "/privacy",
    "/disclaimer",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency:
      route === ""
        ? "weekly"
        : route === "/guides" ||
            route.startsWith("/guides/") ||
            route.startsWith("/unit-") ||
            route === "/discount" ||
            route === "/tax" ||
            route === "/points" ||
            route === "/bottom-price"
          ? "monthly"
          : "yearly",
    priority:
      route === ""
        ? 1
        : route === "/guides" ||
            route.startsWith("/guides/") ||
            route.startsWith("/unit-") ||
            route === "/discount" ||
            route === "/tax" ||
            route === "/points" ||
            route === "/bottom-price"
          ? 0.8
          : 0.4,
  }));
}