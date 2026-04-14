import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Victor’s Juice Co. | Jugos Naturales en República Dominicana",
  description: "Jugos naturales, frescos y saludables en República Dominicana. Descubre Victor’s Juice Co. y disfruta mezclas artesanales hechas con frutas orgánicas.",
  keywords: "jugos naturales RD, jugos en Santo Domingo, jugos frescos República Dominicana, jugos saludables, cold pressed juice RD, jugos detox, jugos cerca de mí",
  openGraph: {
    title: "Victor’s Juice Co. | Jugos Naturales en República Dominicana",
    description: "Jugos naturales, frescos y saludables en República Dominicana. Descubre Victor’s Juice Co. y disfruta mezclas artesanales hechas con frutas orgánicas.",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dzebed7jw/image/upload/v1774295614/ChatGPT_Image_23_mar_2026_03_50_25_p.m._spowqf.png",
        width: 1200,
        height: 630,
        alt: "Victor's Juice Co. Jugos Naturales en Santo Domingo",
      }
    ]
  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png?v=2", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=2", sizes: "180x180" }
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body>
        <CartProvider>
          <div className="layout-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
