import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/airtable";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const products = await getProducts();
  const seenProductSlugs = new Set<string>();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/tienda"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/sobre-nosotros"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/resenas"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contacto"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/faq"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = products
    .filter((product) => {
      if (
        !product.available ||
        !product.slug ||
        product.slug === "producto" ||
        seenProductSlugs.has(product.slug)
      ) {
        return false;
      }

      seenProductSlugs.add(product.slug);
      return true;
    })
    .map((product) => ({
      url: absoluteUrl(`/producto/${product.slug}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...productRoutes];
}
