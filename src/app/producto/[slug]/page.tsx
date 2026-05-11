import styles from "./producto.module.css";
import { getProductBySlug, getProducts } from "@/lib/airtable";
import AddToCartActionBar from "./AddToCartButton";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductHref } from "@/lib/slugs";
import { absoluteUrl, buildMetadata, SITE_NAME } from "@/lib/seo";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || !product.available) {
    return buildMetadata({
      title: "Producto no encontrado | Victor's Juice Co.",
      description: "Este producto ya no está disponible en Victor's Juice Co.",
      path: `/producto/${slug}`,
      noIndex: true,
    });
  }

  const path = getProductHref(product.slug);

  return buildMetadata({
    title: `${product.name} | Victor's Juice Co.`,
    description:
      product.description ||
      `Compra ${product.name}, un jugo natural fresco de Victor's Juice Co. en República Dominicana.`,
    path,
    image: product.image,
  });
}

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getProducts();
  const seenSlugs = new Set<string>();

  return products
    .filter((p) => {
      if (!p.available || !p.slug || p.slug === "producto" || seenSlugs.has(p.slug)) {
        return false;
      }

      seenSlugs.add(p.slug);
      return true;
    })
    .map((p) => ({ slug: p.slug }));
}

export default async function ProductDetail({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || !product.available) {
    notFound();
  }

  const products = await getProducts();
  const related = products.filter((p) => p.id !== product.id && p.available).slice(0, 3);
  const oldPrice = (product.price * 1.15).toFixed(2);
  const productPath = getProductHref(product.slug);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${absoluteUrl(productPath)}#product`,
    name: product.name,
    image: product.image,
    description: product.description || "Jugo natural fresco de Victor's Juice Co.",
    category: product.category,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(productPath),
      priceCurrency: "DOP",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tienda",
        item: absoluteUrl("/tienda"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: absoluteUrl(productPath),
      },
    ],
  };

  return (
    <main className={`container ${styles.main}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([productJsonLd, breadcrumbJsonLd]) }}
      />
      <div className={styles.heroGrid}>
        <div className={styles.imagePlacard}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={`${product.name} - jugo natural fresco prensado en frío de Victor's Juice Co.`}
            className={styles.productImg}
          />
          <div className={styles.floatingFeature}>
            <div className={styles.floatingTitle}>Cold-Pressed</div>
            <div className={styles.floatingDesc}>Extraído en frío para preservar cada nutriente esencial.</div>
          </div>
        </div>

        <div>
          <div className={styles.breadcrumb}>
            <Link href="/tienda">JUGOS</Link> / <span>{product.category || "PREMIUM SERIES"}</span>
          </div>
          <h1 className={styles.title}>{product.name}</h1>

          <div className={styles.priceBlock}>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
            <span className={styles.oldPrice}>${oldPrice}</span>
          </div>

          <p className={styles.description}>
            {product.description || "Una mezcla revitalizante de frutas seleccionadas prensadas en frío."}
            {" "}Este jugo natural está diseñado para acompañar una rutina saludable con frescura,
            sabor artesanal y energía limpia.
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

      <div className={styles.infoGrid}>
        <div>
          <h2 className={styles.infoTitle}>Ingredientes Reales</h2>
          <p className={styles.infoText}>
            Nuestro jugo {product.name} contiene ingredientes frescos preparados para conservar
            sabor, textura y nutrientes naturales.
          </p>
        </div>
        <div>
          <h2 className={styles.infoTitle}>Compromiso Local</h2>
          <p className={styles.infoText}>
            Seleccionamos frutas y vegetales con enfoque en calidad, frescura y una experiencia
            artesanal pensada para República Dominicana.
          </p>
        </div>
        <div>
          <h2 className={styles.infoTitle}>Información Nutricional</h2>
          <div className={styles.nutriRow}>
            <span>Calorías</span>
            <span>120 kcal</span>
          </div>
          <div className={styles.nutriRow}>
            <span>Azúcar natural</span>
            <span>14g</span>
          </div>
          <div className={styles.nutriRow}>
            <span>Vitamina C</span>
            <span>80% VD</span>
          </div>
        </div>
      </div>

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
