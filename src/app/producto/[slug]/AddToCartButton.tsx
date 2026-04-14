"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/components/ProductCard";
import ConfirmModal from "@/components/ConfirmModal";

interface AddToCartButtonProps {
  product: Product;
  styles: Record<string, string>;
}

export default function AddToCartActionBar({ product, styles }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.actionsRow}>
        <div className={styles.qtyWrapper}>
          <span className={styles.qtyLabel}>Cantidad</span>
          <div className={styles.qtySelector}>
            <button 
              className={styles.qtyBtn} 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              aria-label="Disminuir"
              disabled={quantity <= 1}
            >
              -
            </button>
            <input 
              type="text" 
              readOnly 
              value={quantity} 
              className={styles.qtyInput} 
              aria-label="Cantidad"
            />
            <button 
              className={styles.qtyBtn} 
              onClick={() => setQuantity(q => q + 1)}
              aria-label="Aumentar"
            >
              +
            </button>
          </div>
        </div>
        
        <div className={styles.addBtnWrapper}>
          <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            Agregar al Carrito
          </button>
          <button className={styles.wishlistBtn} aria-label="Añadir a lista de deseos">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>

      <ConfirmModal 
        isOpen={isModalOpen} 
        onConfirm={handleConfirm} 
        onCancel={() => setIsModalOpen(false)} 
      />
    </>
  );
}
