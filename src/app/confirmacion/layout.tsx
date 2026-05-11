import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Confirmación de Pedido | Victor's Juice Co.",
  description: "Completa y confirma tu pedido de Victor's Juice Co.",
  path: "/confirmacion",
  noIndex: true,
});

export default function ConfirmacionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
