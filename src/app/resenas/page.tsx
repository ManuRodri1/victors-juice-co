import { getApprovedReviews } from "@/lib/airtable";

export const revalidate = 60;

export default async function ResenasPage() {
  const reviews = await getApprovedReviews();

  return (
    <main className="container" style={{ padding: "var(--spacing-3xl) 0" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "3rem", color: "var(--color-primary)", marginBottom: "var(--spacing-md)", textAlign: "center" }}>
          Lo que dicen nuestros clientes
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--color-text-muted)", textAlign: "center", marginBottom: "var(--spacing-3xl)" }}>
          La comunidad Victor's sigue creciendo todos los días.
        </p>

        {reviews.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--spacing-xl)" }}>
            {reviews.map((r, i) => (
              <div key={r.id} style={{ background: "var(--color-white)", padding: "var(--spacing-xl)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", border: "1px solid var(--color-border)" }}>
                <div style={{ color: "var(--color-secondary)", marginBottom: "var(--spacing-sm)", letterSpacing: "2px", fontSize: "1.2rem" }}>
                  {"★".repeat(r.rating)}
                  <span style={{color: "#e0e0e0"}}>{"★".repeat(5 - r.rating)}</span>
                </div>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "var(--spacing-lg)", color: "var(--color-text-main)" }}>
                  "{r.comment}"
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
