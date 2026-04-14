"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import styles from "./confirmacion.module.css";
import Link from "next/link";

export default function ConfirmacionPage() {
  const { items, subtotal, totalItems, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalOrder, setFinalOrder] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.whatsapp) return;
    
    setIsSubmitting(true);
    setError(null);

    // Prepare Airtable Payload
    const productIds = items.map(item => item.id);
    const orderSummary = items.map(item => `- ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join("\n");

    setFinalOrder({
      items: [...items],
      subtotal,
      notes: formData.notes,
      whatsapp: formData.whatsapp,
      name: formData.name,
    });

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.name,
          whatsapp: formData.whatsapp,
          notes: formData.notes,
          total: subtotal,
          productIds,
          orderSummary
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to place order.");
      }

      try {
        const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "";
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Form: "Order Checkout Notification",
            Customer: formData.name,
            WhatsApp: formData.whatsapp,
            Notes: formData.notes,
            Items: orderSummary,
            Total: `$${subtotal.toFixed(2)}`
          })
        });
      } catch(e) {
        // Silently fail formspree to not disrupt checkout completion
        console.error("Formspree error", e);
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Hubo un error al procesar tu pedido. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return <main className={`container`}><div style={{textAlign: 'center', padding: '100px 0'}}>Cargando...</div></main>;
  }

  // Generate WhatsApp Message
  const generateWhatsAppMessage = () => {
    // Use finalOrder state so order text is preserved even if cart gets cleared
    const orderData = finalOrder || { items, subtotal, notes: formData.notes, whatsapp: formData.whatsapp, name: formData.name };

    const greeting = `Hola, me gustaría confirmar este pedido de Victor's Juice Co.`;
    const customerInfo = `*Cliente:* ${orderData.name}%0A*WhatsApp:* ${orderData.whatsapp}`;
    const itemsList = orderData.items.map((item: any) => `- ${item.name} x${item.quantity} — $${(item.price * item.quantity).toFixed(2)}`).join("%0A");
    const notesStr = orderData.notes ? `%0A%0A*Notas:* ${orderData.notes}` : "";
    const totalStr = `*Total:* $${orderData.subtotal.toFixed(2)}`;
    const closing = `Por favor confírmame la disponibilidad para procesar el pago. ¡Gracias!`;

    const fullMessage = `${greeting}%0A%0A${customerInfo}%0A%0A*Detalles del pedido:*%0A${itemsList}${notesStr}%0A%0A${totalStr}%0A%0A${closing}`;
    
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "18292610894";
    return `https://wa.me/${whatsappNumber}?text=${fullMessage}`;
  };

  if (isSubmitted) {
    return (
      <main className={`container ${styles.main}`}>
        <div className={styles.successContainer}>
          <div className={styles.successIcon}>🎉</div>
          <h1 className={styles.successTitle}>¡Pedido Registrado!</h1>
          <p className={styles.successDesc}>
            Gracias {finalOrder?.name || formData.name}, hemos recibido tu solicitud de pedido correctamente.<br />
            Para verificar la disponibilidad y proceder con el pago, por favor escríbenos a WhatsApp.
          </p>
          <a
            href={generateWhatsAppMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappBtn}
            onClick={clearCart}
          >
            Confirmar por WhatsApp →
          </a>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className={`container ${styles.main}`}>
        <p style={{textAlign: "center"}}>Tu carrito está vacío. Por favor <Link href="/tienda" style={{textDecoration:"underline", color:"var(--color-primary)"}}>vuelve a la tienda</Link>.</p>
      </main>
    );
  }

  return (
    <main className={`container ${styles.main}`}>
      <h1 className={styles.title}>Finalizar Pedido</h1>
      <p className={styles.subtitle}>
        Solicita tu pedido ahora. La disponibilidad será confirmada manualmente.
      </p>

      <div className={styles.grid}>
        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.card}>
          <h2 className={styles.cardTitle}>Tus Datos</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Nombre completo *</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className={styles.input}
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ej. María Pérez"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="whatsapp" className={styles.label}>Número de WhatsApp *</label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              required
              className={styles.input}
              value={formData.whatsapp}
              onChange={handleInputChange}
              placeholder="+123 456 7890"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="notes" className={styles.label}>Notas del pedido (opcional)</label>
            <textarea
              id="notes"
              name="notes"
              className={styles.textarea}
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Instrucciones especiales, alergias, o detalles de entrega..."
            />
          </div>
        </form>

        {/* Order Summary */}
        <div className={styles.card} style={{ height: "fit-content" }}>
          <h2 className={styles.cardTitle}>Resumen ({totalItems} items)</h2>
          
          <div style={{ marginBottom: "var(--spacing-xl)" }}>
            {items.map((item) => (
              <div key={item.id} className={styles.summaryItem}>
                <span className={styles.summaryItemName}>
                  {item.quantity}x {item.name}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className={styles.summaryTotal}>
            <span>Total Estimado</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {error && (
            <div style={{ color: "var(--color-danger)", marginTop: "var(--spacing-md)", fontSize: "0.9rem", textAlign: "center" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={!formData.name || !formData.whatsapp || isSubmitting}
          >
            {isSubmitting ? "Procesando..." : "Enviar Pedido"}
          </button>
          <p style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: "12px" }}>
            El pago se coordinará por WhatsApp tras confirmar disponibilidad.
          </p>
        </div>
      </div>
    </main>
  );
}
