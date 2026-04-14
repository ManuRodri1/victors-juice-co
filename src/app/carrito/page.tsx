"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import styles from "./carrito.module.css";
import { useEffect, useState } from "react";

export default function CarritoPage() {
  const { items, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration errors by only rendering cart contents after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <main className={`container ${styles.main}`}><div style={{textAlign: 'center', padding: '100px 0'}}>Cargando carrito...</div></main>;
  }

  if (items.length === 0) {
    return (
      <main className={`container ${styles.main}`}>
        <h1 className={styles.title}>Tu Carrito</h1>
        <div className={styles.emptyState}>
          <h2>Tu carrito está vacío</h2>
          <p>Aún no has añadido ningún jugo a tu carrito. ¡Explora nuestros sabrosos productos!</p>
          <Link href="/tienda" className={styles.continueShopping}>
            Ir a la tienda
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={`container ${styles.main}`}>
      <h1 className={styles.title}>Tu Carrito</h1>
      
      <div className={styles.cartContainer}>
        {/* Items List */}
        <div className={styles.itemsList}>
          {items.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.itemImageWrapper}>
                {item.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image} alt={`${item.name} - jugo natural Victor's Juice Co`} className={styles.itemImage} />
                )}
              </div>
              <div className={styles.itemInfo}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <div className={styles.itemPrice}>${item.price.toFixed(2)}</div>
              </div>
              <div className={styles.itemActions}>
                <div className={styles.quantitySelector}>
                  <button 
                    className={styles.qtyBtn} 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    aria-label="Disminuir cantidad"
                  >
                    -
                  </button>
                  <input readOnly type="text" value={item.quantity} className={styles.qtyInput} />
                  <button 
                    className={styles.qtyBtn} 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>
                <button 
                  className={styles.removeBtn} 
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className={styles.summary}>
          <h2 className={styles.summaryTitle}>Resumen del Pedido</h2>
          
          <div className={styles.summaryRow}>
            <span>Subtotal ({totalItems} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Envío</span>
            <span style={{ color: "var(--color-secondary)" }}>Por calcular</span>
          </div>
          
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <Link href="/confirmacion" className={styles.checkoutBtn}>
            Proceder al pago
          </Link>
        </div>
      </div>
    </main>
  );
}
