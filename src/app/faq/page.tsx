export default function FAQPage() {
  const faqs = [
    {
      q: "¿Cuánto duran los jugos?",
      a: "Nuestros jugos son 100% naturales, crudos y prensados en frío, sin pasteurizar. En el refrigerador se mantienen frescos hasta por 4-5 días."
    },
    {
      q: "¿Cómo calculan el costo de envío?",
      a: "El envío es gratuito para pedidos superiores a $50. Para órdenes menores, existe una tarifa plana según la zona de entrega que se confirmará por WhatsApp."
    },
    {
      q: "¿Puedo personalizar un plan Detox?",
      a: "Sí, puedes contactarnos directamente y nuestro equipo preparará un plan Detox de 1, 3 o 5 días que se ajuste a tus objetivos y gustos personales."
    },
    {
      q: "¿Son aptos para personas con diabetes?",
      a: "Recomendamos principalmente nuestros jugos 100% vegetales (como el Vitalidad Verde) o el plan Detox. Siempre es mejor consultar con tu médico de cabecera."
    }
  ];

  return (
    <main className="container" style={{ padding: "var(--spacing-3xl) 0" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "3rem", color: "var(--color-primary)", marginBottom: "var(--spacing-md)", textAlign: "center" }}>
          Preguntas Frecuentes
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--color-text-muted)", textAlign: "center", marginBottom: "var(--spacing-3xl)" }}>
          Todo lo que necesitas saber sobre nuestros jugos y sistema de entrega.
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
