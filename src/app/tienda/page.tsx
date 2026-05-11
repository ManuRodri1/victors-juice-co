import styles from "./tienda.module.css";
import TiendaClient from "./TiendaClient";
import { getProducts } from "@/lib/airtable";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Tienda de Jugos Naturales | Victor's Juice Co.",
  description:
    "Compra jugos naturales, detox y saludables de Victor's Juice Co. en República Dominicana.",
  path: "/tienda",
});

export const revalidate = 60;

export default async function TiendaPage() {
  const allProducts = await getProducts();
  const availableProducts = allProducts.filter((p) => p.available);

  return (
    <main className="container" style={{ padding: "4rem 1.5rem" }}>
      <div className={styles.header}>
        <h1 className={styles.title}>Tienda de jugos naturales</h1>
        <p className={styles.subtitle}>
          Explora jugos naturales, detox y bebidas saludables en RD, elaborados diariamente
          con ingredientes frescos para quienes buscan sabor, bienestar y calidad artesanal.
        </p>
      </div>

      <TiendaClient initialProducts={availableProducts} />
    </main>
  );
}
