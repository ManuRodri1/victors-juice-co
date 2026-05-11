"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./ProductCard.module.css";
import { useCart } from "@/context/CartContext";
import ConfirmModal from "./ConfirmModal";
import { getProductHref } from "@/lib/slugs";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
  category: string;
  available?: boolean;
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
}

function getHashData(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const isDark = Math.abs(hash) % 2 === 0;
  
  return { 
    badgeClass: isDark ? styles.badgeLight : styles.badgeDark 
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { badgeClass } = getHashData(product.slug);
  const productHref = getProductHref(product.slug);

  if (process.env.NODE_ENV === "development") {
    console.debug("[ProductCard] product href", {
      id: product.id,
      name: product.name,
      slug: product.slug,
      href: productHref,
    });
  }

  const handleConfirm = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <div 
        className={styles.card}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={productHref} className={styles.imageLink}>
          <div className={styles.imageWrapper}>
            {product.badge && <span className={`${styles.badge} ${badgeClass}`}>{product.badge}</span>}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={`${product.name} - jugo natural fresco Victor's Juice Co`}
              className={`${styles.image} ${isHovered ? styles.imageHovered : ''}`}
            />
          </div>
        </Link>
        
        <div className={styles.content}>
          <div className={styles.infoCol}>
            <Link href={productHref} className={styles.titleLink}>
              <h3 className={styles.title} title={product.name}>{product.name}</h3>
            </Link>
            <p className={styles.ingredients} title={product.description}>
              {product.description.split(" ").slice(0, 6).join(" ")}...
            </p>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
          </div>

          <button 
            className={`${styles.cartBtn} ${isHovered ? styles.cartBtnHovered : ''}`}
            onClick={() => setIsModalOpen(true)}
            aria-label={`Añadir ${product.name} al carrito`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              <line x1="12" y1="8" x2="12" y2="14" />
              <line x1="9" y1="11" x2="15" y2="11" />
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
