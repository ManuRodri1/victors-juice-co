import type { Metadata } from "next";

export const SITE_NAME = "Victor's Juice Co.";
export const BUSINESS_PHONE = "+1 (829) 261-0894";
export const BUSINESS_PHONE_E164 = "+18292610894";
export const DEFAULT_SITE_URL = "http://localhost:3000";
export const OG_IMAGE =
  "https://res.cloudinary.com/dzebed7jw/image/upload/v1774295614/ChatGPT_Image_23_mar_2026_03_50_25_p.m._spowqf.png";

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");
}

export function absoluteUrl(path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

type SeoOptions = {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  image?: string;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  type = "website",
  noIndex = false,
  image = OG_IMAGE,
}: SeoOptions): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "es_DO",
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Victor's Juice Co. jugos naturales en República Dominicana",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function businessJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "FoodEstablishment"],
    "@id": `${siteUrl}/#localbusiness`,
    name: SITE_NAME,
    url: siteUrl,
    image: OG_IMAGE,
    telephone: BUSINESS_PHONE_E164,
    priceRange: "$$",
    description:
      "Tienda de jugos naturales, jugos detox y bebidas saludables en República Dominicana.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santo Domingo",
      addressRegion: "Distrito Nacional",
      addressCountry: "DO",
    },
    areaServed: {
      "@type": "Country",
      name: "República Dominicana",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS_PHONE_E164,
      contactType: "customer service",
      availableLanguage: ["es"],
    },
    sameAs: [`https://wa.me/${BUSINESS_PHONE_E164.replace("+", "")}`],
  };
}

export function organizationJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: SITE_NAME,
    url: siteUrl,
    logo: absoluteUrl("/web-app-manifest-512x512.png"),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS_PHONE_E164,
      contactType: "customer service",
      availableLanguage: ["es"],
    },
  };
}
