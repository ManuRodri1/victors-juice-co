import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | Victor's Juice Co. | Jugos en República Dominicana",
  description: "Contáctanos en Victor's Juice Co. Estamos en República Dominicana y listos para llevarte los mejores jugos naturales, frescos y detox. WhatsApp +1 (829) 261-0894.",
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
