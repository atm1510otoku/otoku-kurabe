import type { MetadataRoute } from "next";
import { getSiteUrl } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  const routes = [
    "",
    "/how-to",
    "/unit-price",
    "/discount",
    "/points",
    "/bottom-price",
    "/about",
    "/privacy",
    "/disclaimer",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency:
      route === "" ? "weekly" : route.startsWith("/unit-") ||
        route === "/discount" ||
        route === "/points" ||
        route === "/bottom-price"
        ? "monthly"
        : "yearly",
    priority: route === "" ? 1 : route.startsWith("/unit-") ||
      route === "/discount" ||
      route === "/points" ||
      route === "/bottom-price"
      ? 0.8
      : 0.4,
  }));
}