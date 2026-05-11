import type { Metadata } from "next";
import { buildMetadata, BUSINESS_PHONE } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contacto | Victor's Juice Co.",
  description: `Contacta a Victor's Juice Co. para comprar jugos naturales y bebidas saludables en República Dominicana. WhatsApp ${BUSINESS_PHONE}.`,
  path: "/contacto",
});

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
