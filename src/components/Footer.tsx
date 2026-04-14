"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, Form: "Footer Newsletter" }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={`container`}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logoWrapper} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginBottom: 'var(--spacing-md)' }}>
              <Image 
                src="https://res.cloudinary.com/dzebed7jw/image/upload/v1774301079/logo-removebg-preview_stgzps.png"
                alt="Victor's Juice Co. Logo"
                width={80}
                height={80}
                style={{ objectFit: 'contain' }}
              />
              <span className={styles.logoText} style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, fontStyle: 'italic', color: 'var(--color-white)' }}>
                Victor's Juice Co.
              </span>
            </Link>
            <p className={styles.description}>
              Llevando la frescura del huerto directamente a tu puerta.
              Sostenible, orgánico y lleno de vida.
            </p>
          </div>

          {/* Explora Column */}
          <div>
            <h3 className={styles.columnTitle}>Explora</h3>
            <ul className={styles.linksList}>
              <li><Link href="/tienda" className={styles.link}>Tienda</Link></li>
              <li><Link href="/sobre-nosotros" className={styles.link}>Sobre Nosotros</Link></li>
              <li><Link href="/tienda?filter=detox" className={styles.link}>Planes Detox</Link></li>
              <li><Link href="/tienda?filter=suscripcion" className={styles.link}>Suscripciones</Link></li>
            </ul>
          </div>

          {/* Ayuda Column */}
          <div>
            <h3 className={styles.columnTitle}>Ayuda</h3>
            <ul className={styles.linksList}>
              <li><Link href="/faq" className={styles.link}>FAQ</Link></li>
              <li><Link href="/faq#envios" className={styles.link}>Envíos</Link></li>
              <li><Link href="/contacto" className={styles.link}>Contacto</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className={styles.columnTitle}>Únete</h3>
            <p className={styles.newsletterText}>
              Recibe 10% de descuento en tu primer pedido.
            </p>
            {status === "success" ? (
              <div style={{ color: "#8FB972", fontWeight: 600, fontSize: "0.9rem", marginTop: "8px" }}>
                ¡Gracias por suscribirte!
              </div>
            ) : (
              <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Tu email"
                  className={styles.newsletterInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  required
                />
                <button type="submit" className={styles.newsletterSubmit} aria-label="Suscribirse" disabled={status === "loading"}>
                  {status === "loading" ? "..." : "→"}
                </button>
              </form>
            )}
            {status === "error" && (
              <div style={{ color: "var(--color-danger)", fontSize: "0.85rem", marginTop: "8px" }}>
                Hubo un error. Intenta de nuevo.
              </div>
            )}
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Victor's Juice Co. Freshness Bottled.</p>
        </div>
      </div>
    </footer>
  );
}
