import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { buildMetadata, getSiteUrl, OG_IMAGE, SITE_NAME } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: SITE_NAME,
  ...buildMetadata({
    title: "Victor's Juice Co. | Jugos Naturales en RD",
    description:
      "Jugos naturales, frescos y artesanales en República Dominicana. Descubre mezclas saludables hechas con frutas seleccionadas.",
    path: "/",
  }),
  keywords: [
    "Victor's Juice Co.",
    "jugos naturales RD",
    "jugos naturales en Santo Domingo",
    "jugos frescos República Dominicana",
    "jugos saludables",
    "jugos detox",
    "jugos orgánicos",
    "bebidas saludables RD",
    "jugos cerca de mí",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "food and beverage",
  icons: {
    icon: [
      { url: "/favicon-96x96.png?v=2", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=2", sizes: "180x180" }],
  },
  other: {
    "og:image:secure_url": OG_IMAGE,
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-DO" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body>
        <CartProvider>
          <div className="layout-wrapper" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <div style={{ flex: 1 }}>{children}</div>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
