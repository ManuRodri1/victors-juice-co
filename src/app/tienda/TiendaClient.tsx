"use client";

import { useState } from "react";
import styles from "./tienda.module.css";
import ProductCard, { Product } from "@/components/ProductCard";

interface TiendaClientProps {
  initialProducts: Product[];
}

const CATEGORIES = ["Todos", "Jugos naturales", "Detox", "Energía", "Shots funcionales", "Personalizados"];

export default function TiendaClient({ initialProducts }: TiendaClientProps) {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProducts = initialProducts.filter((product) => 
    activeCategory === "Todos" || product.category === activeCategory
  );

  return (
    <>
      <div className={styles.filters}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
        <select className={styles.sortSelect} aria-label="Ordenar por" defaultValue="Ordenar por: Popularidad">
          <option>Ordenar por: Popularidad</option>
          <option>Precio: Menor a Mayor</option>
          <option>Precio: Mayor a Menor</option>
        </select>
      </div>

      {filteredProducts.length > 0 ? (
        <div className={styles.productsGrid}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
           No se encontraron jugos disponibles en esta categoría.
        </div>
      )}
    </>
  );
}
