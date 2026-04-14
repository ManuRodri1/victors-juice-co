"use client";

import { useState } from "react";

export default function ContactoPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, Form: "Contact Page" }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="container" style={{ padding: "var(--spacing-3xl) 0" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "3rem", color: "var(--color-primary)", marginBottom: "var(--spacing-md)", textAlign: "center" }}>
          Contacto
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--color-text-muted)", textAlign: "center", marginBottom: "var(--spacing-3xl)" }}>
          ¿Tienes alguna pregunta, comentario o solicitud especial? Escríbenos y nuestro equipo te responderá lo antes posible.
        </p>

        <div style={{ display: "grid", gap: "var(--spacing-2xl)", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          
          <div style={{ background: "var(--color-white)", padding: "var(--spacing-2xl)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)" }}>
            <h2 style={{ fontSize: "1.5rem", color: "var(--color-primary)", marginBottom: "var(--spacing-lg)" }}>
              Información
            </h2>
            <div style={{ marginBottom: "var(--spacing-md)" }}>
              <strong>Email:</strong><br />
              <a href="mailto:hola@victorsjuice.co" style={{ color: "var(--color-secondary)" }}>hola@victorsjuice.co</a>
            </div>
            <div style={{ marginBottom: "var(--spacing-md)" }}>
              <strong>WhatsApp / Teléfono:</strong><br />
              +1 (829) 261-0894
            </div>
            <div style={{ marginBottom: "var(--spacing-md)" }}>
              <strong>Horario de atención:</strong><br />
              Lunes a Sábado: 8:00 AM - 6:00 PM
            </div>
          </div>

          <form style={{ background: "var(--color-white)", padding: "var(--spacing-2xl)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)" }} onSubmit={handleSubmit}>
            <h2 style={{ fontSize: "1.5rem", color: "var(--color-primary)", marginBottom: "var(--spacing-lg)" }}>
              Envíanos un mensaje
            </h2>
            
            {status === "success" ? (
              <div style={{ padding: "16px", background: "#f0f8f1", color: "#2d6a4f", borderRadius: "8px", fontWeight: 500, textAlign: "center" }}>
                ¡Gracias por escribirnos! Hemos recibido tu mensaje y te contactaremos pronto.
              </div>
            ) : (
              <>
                <div style={{ marginBottom: "var(--spacing-md)" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>Nombre</label>
                  <input type="text" required style={{ width: "100%", padding: "12px", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", background: "#fafafa" }} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} disabled={status === "loading"} />
                </div>
                <div style={{ marginBottom: "var(--spacing-md)" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>Email</label>
                  <input type="email" required style={{ width: "100%", padding: "12px", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", background: "#fafafa" }} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} disabled={status === "loading"} />
                </div>
                <div style={{ marginBottom: "var(--spacing-md)" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>Mensaje</label>
                  <textarea required style={{ width: "100%", minHeight: "120px", padding: "12px", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", background: "#fafafa", resize: "vertical" }} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} disabled={status === "loading"} />
                </div>
                {status === "error" && (
                  <div style={{ color: "var(--color-danger)", marginBottom: "12px", fontSize: "0.9rem" }}>Hubo un error enviando tu mensaje. Por favor intenta más tarde.</div>
                )}
                <button type="submit" style={{ width: "100%", padding: "14px", backgroundColor: "var(--color-secondary)", color: "white", border: "none", borderRadius: "var(--radius-full)", fontWeight: 600, cursor: status === "loading" ? "not-allowed" : "pointer" }} disabled={status === "loading"}>
                  {status === "loading" ? "Enviando..." : "Enviar Mensaje"}
                </button>
              </>
            )}
          </form>

        </div>
      </div>
    </main>
  );
}
