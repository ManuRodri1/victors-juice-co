import { getApprovedReviews } from "@/lib/airtable";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Reseñas de Clientes | Victor's Juice Co.",
  description:
    "Lee opiniones de clientes sobre los jugos naturales, detox y bebidas saludables de Victor's Juice Co. en República Dominicana.",
  path: "/resenas",
});

export const revalidate = 60;

export default async function ResenasPage() {
  const reviews = await getApprovedReviews();

  return (
    <main className="container" style={{ padding: "var(--spacing-3xl) 0" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "3rem", color: "var(--color-primary)", marginBottom: "var(--spacing-md)", textAlign: "center" }}>
          Reseñas de nuestros clientes
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--color-text-muted)", textAlign: "center", marginBottom: "var(--spacing-3xl)" }}>
          La comunidad Victor&apos;s sigue creciendo con personas que buscan jugos saludables en RD.
        </p>

        {reviews.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--spacing-xl)" }}>
            {reviews.map((r) => (
              <div key={r.id} style={{ background: "var(--color-white)", padding: "var(--spacing-xl)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", border: "1px solid var(--color-border)" }}>
                <div style={{ color: "var(--color-secondary)", marginBottom: "var(--spacing-sm)", letterSpacing: "2px", fontSize: "1.2rem" }}>
                  {"★".repeat(r.rating)}
                  <span style={{ color: "#e0e0e0" }}>{"★".repeat(5 - r.rating)}</span>
                </div>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "var(--spacing-lg)", color: "var(--color-text-main)" }}>
                  &ldquo;{r.comment}&rdquo;
                </p>
                <div>
                  <div style={{ fontWeight: 600, color: "var(--color-primary)" }}>{r.customerName}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Cliente verificado</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>No hay reseñas disponibles por el momento.</p>
        )}
      </div>
    </main>
  );
}
