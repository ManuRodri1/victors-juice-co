import { notFound } from "next/navigation";
import styles from "./producto.module.css";
import { getProducts } from "@/lib/airtable";
import AddToCartActionBar from "./AddToCartButton";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const products = await getProducts();
  const product = products.find((p) => p.slug === decodedSlug);

  if (!product) {
    return { title: "Producto no encontrado | Victor's Juice Co." };
  }

  return {
    title: `${product.name} | Victor's Juice Co.`,
    description: product.description || `Jugo natural prensado en frío ${product.name}. Refrescante y saludable.`,
  };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const products = await getProducts();
  const product = products.find((p) => p.slug === decodedSlug);

  if (!product || !product.available) {
    return notFound();
  }

  // Related products
  const related = products.filter((p) => p.id !== product.id && p.available).slice(0, 3);

  // Hash background color
  const bgColors = ["#1a2a35", "#E3B5A4", "#89AE5D", "#F0C14B", "#1D3241", "#9DBBB1"];
  let hash = 0;
  for (let i = 0; i < product.slug.length; i++) {
    hash = product.slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  const bgColor = bgColors[Math.abs(hash) % bgColors.length];

  // Old price simulation (+15%)
  const oldPrice = (product.price * 1.15).toFixed(2);

  return (
    <main className={`container ${styles.main}`}>
      <div className={styles.heroGrid}>
        {/* LEFT COLUMN - Image Presentation */}
        <div className={styles.imagePlacard} style={{ backgroundColor: bgColor }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt={`${product.name} - jugo natural fresco prensado en frío Victor's Juice Co`} className={styles.productImg} />
          <div className={styles.floatingFeature}>
            <div className={styles.floatingTitle}>Cold-Pressed</div>
            <div className={styles.floatingDesc}>Extraído en frío para preservar cada nutriente esencial.</div>
          </div>
        </div>

        {/* RIGHT COLUMN - Info */}
        <div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                "name": product.name,
                "image": product.image,
                "description": product.description || "Jugo natural prensado en frío.",
                "brand": {
                  "@type": "Brand",
                  "name": "Victor's Juice Co."
                },
                "offers": {
                  "@type": "Offer",
                  "url": `https://victorsjuice.co/producto/${product.slug}`,
                  "priceCurrency": "DOP",
                  "price": product.price,
                  "availability": "https://schema.org/InStock",
                  "itemCondition": "https://schema.org/NewCondition"
                }
              })
            }}
          />
          <div className={styles.breadcrumb}>
            JUGOS / <span>{product.category || "PREMIUM SERIES"}</span>
          </div>
          <h1 className={styles.title}>{product.name}</h1>
          
          <div className={styles.priceBlock}>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
            <span className={styles.oldPrice}>${oldPrice}</span>
          </div>
          
          <p className={styles.description}>
            {product.description || "Una alquimia revitalizante de frutas orgánicas prensadas en frío."}
            Nuestras mezclas son diseñadas para regenerar tu cuerpo y elevar tu energía natural desde el primer sorbo.
          </p>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <div className={styles.featureTitle}>Energizante</div>
              <div className={styles.featureDesc}>Impulso natural sin caídas.</div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🍃</div>
              <div className={styles.featureTitle}>100% Natural</div>
              <div className={styles.featureDesc}>Sin azúcares ni químicos.</div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔬</div>
              <div className={styles.featureTitle}>Antioxidante</div>
              <div className={styles.featureDesc}>Combate el estrés celular.</div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⏱</div>
              <div className={styles.featureTitle}>Fresh Daily</div>
              <div className={styles.featureDesc}>Embotellado cada mañana.</div>
            </div>
          </div>

          <AddToCartActionBar product={product} styles={styles} />
        </div>
      </div>

      {/* LOWER INFO GRID */}
      <div className={styles.infoGrid}>
        <div>
          <h2 className={styles.infoTitle}>Ingredientes Reales</h2>
          <p className={styles.infoText}>
            No escondemos nada. Nuestro jugo {product.name} contiene ingredientes prensados el mismo día de entrega para conservar todos sus nutrientes vivos naturales y antioxidantes.
          </p>
        </div>
        <div>
          <h2 className={styles.infoTitle}>Compromiso Ético</h2>
          <p className={styles.infoText}>
            Trabajamos directamente con agricultores locales para asegurar que cada fruta sea recolectada en su punto óptimo de madurez y bajo condiciones sustentables.
          </p>
        </div>
        <div>
          <h2 className={styles.infoTitle}>Información Nutricional</h2>
          <div className={styles.nutriRow}>
            <span>Calorías</span>
            <span>120 kcal</span>
          </div>
          <div className={styles.nutriRow}>
            <span>Azúcar (Natural)</span>
            <span>14g</span>
          </div>
          <div className={styles.nutriRow}>
            <span>Vitamina C</span>
            <span>80% VD</span>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.relatedHeader}>
            <div>
              <div className={styles.relatedEyebrow}>Siguiente Nivel</div>
              <h2 className={styles.relatedTitle}>También te podría gustar</h2>
            </div>
            <Link href="/tienda" className={styles.relatedLink}>
              Ver todos &rarr;
            </Link>
          </div>
          <div className={styles.productsGrid}>
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
