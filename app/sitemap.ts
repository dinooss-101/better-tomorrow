import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mayangimphal.org"
  const routes = [
    "",
    "/about",
    "/contact",
    "/development",
    "/future-labs",
    "/progress",
    "/scholarships",
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/progress" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/development" || route === "/progress" ? 0.8 : 0.6,
  }))
}

