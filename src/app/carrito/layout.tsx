import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Carrito | Victor's Juice Co.",
  description: "Revisa tu carrito de compra en Victor's Juice Co.",
  path: "/carrito",
  noIndex: true,
});

export default function CarritoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
