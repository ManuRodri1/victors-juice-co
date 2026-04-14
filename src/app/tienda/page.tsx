import styles from "./tienda.module.css";
import TiendaClient from "./TiendaClient";
import { getProducts } from "@/lib/airtable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tienda de Jugos Naturales | Victor’s Juice Co.",
  keywords: "comprar jugos naturales, jugos saludables RD",
};

export const revalidate = 60;

export default async function TiendaPage() {
  const allProducts = await getProducts();
  const availableProducts = allProducts.filter(p => p.available);

  return (
    <main className="container" style={{ padding: "4rem 1.5rem" }}>
      <div className={styles.header}>
        <h1 className={styles.title}>Nuestra Tienda</h1>
        <p className={styles.subtitle}>
          Explora nuestra selección de jugos prensados en frío, elaborados diariamente 
          con los ingredientes más frescos del huerto para nutrir tu cuerpo y alma.
        </p>
      </div>

      <TiendaClient initialProducts={availableProducts} />
    </main>
  );
}
