import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Preguntas Frecuentes | Victor's Juice Co.",
  description:
    "Resuelve dudas sobre duración, envío, pedidos y planes detox de Victor's Juice Co., tienda de jugos naturales en República Dominicana.",
  path: "/faq",
});

export default function FAQPage() {
  const faqs = [
    {
      q: "¿Cuánto duran los jugos?",
      a: "Nuestros jugos son naturales, crudos y prensados en frío. En refrigeración se mantienen frescos hasta por 4-5 días.",
    },
    {
      q: "¿Cómo calculan el costo de envío?",
      a: "El envío se coordina según la zona de entrega y se confirma por WhatsApp antes de procesar el pedido.",
    },
    {
      q: "¿Puedo personalizar un plan detox?",
      a: "Sí, puedes contactarnos directamente y nuestro equipo preparará un plan detox de 1, 3 o 5 días según tus objetivos y gustos.",
    },
    {
      q: "¿Dónde puedo comprar jugos naturales en Santo Domingo?",
      a: "Puedes comprar jugos naturales de Victor's Juice Co. desde nuestra tienda en línea y coordinar disponibilidad o entrega por WhatsApp.",
    },
  ];

  return (
    <main className="container" style={{ padding: "var(--spacing-3xl) 0" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "3rem", color: "var(--color-primary)", marginBottom: "var(--spacing-md)", textAlign: "center" }}>
          Preguntas Frecuentes
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--color-text-muted)", textAlign: "center", marginBottom: "var(--spacing-3xl)" }}>
          Todo lo que necesitas saber sobre nuestros jugos naturales, pedidos y sistema de entrega.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
          {faqs.map((faq, index) => (
            <details key={index} style={{ background: "var(--color-white)", padding: "var(--spacing-lg)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", cursor: "pointer" }}>
              <summary style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--color-primary)", outline: "none", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {faq.q}
                <span style={{ color: "var(--color-secondary)" }}>+</span>
              </summary>
              <p style={{ marginTop: "var(--spacing-md)", color: "var(--color-text-main)", lineHeight: 1.6, paddingTop: "var(--spacing-md)", borderTop: "1px solid #f0f0f0" }}>
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}
