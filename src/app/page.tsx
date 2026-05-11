import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import ProductCard from "@/components/ProductCard";
import { getProducts, getApprovedReviews } from "@/lib/airtable";
import type { Metadata } from "next";
import { businessJsonLd, buildMetadata, organizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Victor's Juice Co. | Jugos Naturales en RD",
  description:
    "Jugos naturales, frescos y artesanales en República Dominicana. Descubre mezclas saludables hechas con frutas seleccionadas.",
  path: "/",
});

export const revalidate = 60;

export default async function Home() {
  const allProducts = await getProducts();
  const allReviews = await getApprovedReviews();

  const featuredProducts = allProducts
    .filter((p) => p.available && p.featured)
    .slice(0, 4);

  if (featuredProducts.length < 3) {
    const additional = allProducts
      .filter((p) => p.available && !p.featured)
      .slice(0, 3 - featuredProducts.length);
    featuredProducts.push(...additional);
  }

  const homeReviews = allReviews.slice(0, 3);

  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([businessJsonLd(), organizationJsonLd()]),
        }}
      />
      <section className={styles.hero}>
        <div className={styles.heroImageWrapper}>
          <Image
            src="https://res.cloudinary.com/dzebed7jw/image/upload/v1774295614/ChatGPT_Image_23_mar_2026_03_50_25_p.m._spowqf.png"
            alt="Jugos naturales en Santo Domingo de Victor's Juice Co."
            fill
            quality={100}
            priority
            className={styles.heroImage}
          />
          <div className={styles.heroImageOverlay}></div>
        </div>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <span className={`${styles.heroBadge} ${styles.animateFadeUp}`} style={{ animationDelay: "0.1s" }}>
              Naturalmente puro
            </span>
            <h1 className={`${styles.heroTitle} ${styles.animateFadeUp}`} style={{ animationDelay: "0.3s" }}>
              Jugos naturales, frescos
              <br />
              para tu <span style={{ fontStyle: "italic", fontWeight: 400 }}>estilo de vida</span>
            </h1>
            <p className={`${styles.heroDescription} ${styles.animateFadeUp}`} style={{ animationDelay: "0.5s" }}>
              Mezclas artesanales de jugos naturales, detox y cold-pressed en República Dominicana,
              preparadas con frutas seleccionadas y vegetales frescos para una rutina más saludable.
            </p>
            <div className={`${styles.heroActions} ${styles.animateFadeUp}`} style={{ animationDelay: "0.7s" }}>
              <Link href="/tienda" className={styles.btnPrimary}>
                Comprar ahora
              </Link>
              <Link href="/tienda" className={styles.btnOutline}>
                Ver menú
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Selección del Huerto</h2>
              <p className={styles.sectionSubtitle}>
                Descubre nuestros jugos saludables más buscados, embotellados diariamente para garantizar
                frescura, sabor limpio y una experiencia premium.
              </p>
            </div>
            <Link href="/tienda" className={styles.linkAll}>
              Ver toda la tienda &rarr;
            </Link>
          </div>
          <div className={styles.productsGrid}>
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)
            ) : (
              <p className={styles.emptyStateFallback}>
                Explora nuestra tienda para ver los jugos disponibles. Pronto añadiremos más.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.storySection}`}>
        <div className={`container ${styles.storyContainer}`}>
          <div className={styles.storyImageWrapper}>
            <video
              src="https://res.cloudinary.com/dzebed7jw/video/upload/v1775676458/Victor_s_Juice_Co._wwdhgb.mp4"
              className={styles.storyImage}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
          <div>
            <span className={styles.storySubtitle}>Nuestra esencia orgánica</span>
            <h2 className={styles.sectionTitle}>De la tierra a tu mesa, sin escalas.</h2>
            <p className={styles.heroDescription}>
              En Victor&apos;s Juice Co. creemos que la verdadera salud no tiene atajos. Trabajamos con
              ingredientes locales y procesos cuidados para crear bebidas saludables en RD.
            </p>

            <div className={styles.storyFeatures}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>🌱</div>
                <div>
                  <h3 className={styles.featureTitle}>Ingredientes seleccionados</h3>
                  <p className={styles.featureDesc}>Frutas y vegetales frescos, sin atajos innecesarios.</p>
                </div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>❄️</div>
                <div>
                  <h3 className={styles.featureTitle}>Prensado en frío</h3>
                  <p className={styles.featureDesc}>Cuidamos sabor, textura y nutrientes desde el primer sorbo.</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "2rem" }}>
              <Link href="/sobre-nosotros" className={styles.linkAll}>
                Conoce nuestra historia &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.testimonialsSection}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Comunidad Victor&apos;s</h2>
          <p className={styles.testimonialsSubtitle}>
            &ldquo;El cambio en mi energía ha sido increíble desde que integré estos jugos en mi mañana.&rdquo;
          </p>

          <div className={styles.testimonialsGrid}>
            {homeReviews.length > 0 ? (
              homeReviews.map((r, i) => (
                <div key={r.id} className={`${styles.testimonialCard} ${i === 1 ? styles.highlighted : ""}`}>
                  <div className={styles.stars}>
                    {"★".repeat(r.rating)}
                    <span style={{ color: "rgba(0,0,0,0.1)" }}>{"★".repeat(5 - r.rating)}</span>
                  </div>
                  <p className={styles.testimonialText}>&ldquo;{r.comment}&rdquo;</p>
                  <div className={styles.author}>
                    <div className={styles.authorName}>{r.customerName}</div>
                    <div className={styles.authorTitle}>Cliente verificado</div>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.emptyStateFallback}>
                Sé el primero en probar nuestros jugos naturales y dejarnos tu opinión.
              </p>
            )}
          </div>

          <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
            <Link href="/resenas" className={styles.linkAll}>
              Leer más reseñas &rarr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
