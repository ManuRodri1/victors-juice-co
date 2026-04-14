import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import ProductCard from "@/components/ProductCard";
import { getProducts, getApprovedReviews } from "@/lib/airtable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jugos Naturales en RD | Victor’s Juice Co.",
  keywords: "jugos naturales RD, jugos frescos, jugos orgánicos",
};

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  const allProducts = await getProducts();
  const allReviews = await getApprovedReviews();

  // "Selección del Huerto": prioritize featured products (Featured = true) and available products.
  const featuredProducts = allProducts
    .filter(p => p.available && p.featured)
    .slice(0, 4);
    
  // If not enough featured, fill with available
  if (featuredProducts.length < 3) {
    const additional = allProducts
      .filter(p => p.available && !p.featured)
      .slice(0, 3 - featuredProducts.length);
    featuredProducts.push(...additional);
  }

  // "Comunidad Victor's": limited set of approved reviews (e.g. 3)
  const homeReviews = allReviews.slice(0, 3);

  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Victor's Juice Co.",
            "image": "https://res.cloudinary.com/dzebed7jw/image/upload/v1774295614/ChatGPT_Image_23_mar_2026_03_50_25_p.m._spowqf.png",
            "@id": "https://victorsjuice.co",
            "url": "https://victorsjuice.co",
            "telephone": "+18292610894",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Santo Domingo",
              "addressLocality": "Santo Domingo",
              "addressRegion": "Distrito Nacional",
              "addressCountry": "DO"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
              ],
              "opens": "08:00",
              "closes": "18:00"
            }
          })
        }}
      />
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrapper}>
          <Image 
            src="https://res.cloudinary.com/dzebed7jw/image/upload/v1774295614/ChatGPT_Image_23_mar_2026_03_50_25_p.m._spowqf.png" 
            alt="jugos naturales en Santo Domingo de Victor's Juice Co"
            fill
            quality={100}
            priority
            className={styles.heroImage} 
          />
          <div className={styles.heroImageOverlay}></div>
        </div>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <span className={`${styles.heroBadge} ${styles.animateFadeUp}`} style={{ animationDelay: "0.1s" }}>Naturalmente Puro</span>
            <h1 className={`${styles.heroTitle} ${styles.animateFadeUp}`} style={{ animationDelay: "0.3s" }}>
              Jugos naturales, frescos<br/>para tu <span style={{ fontStyle: "italic", fontWeight: 400 }}>estilo de vida</span>
            </h1>
            <p className={`${styles.heroDescription} ${styles.animateFadeUp}`} style={{ animationDelay: "0.5s" }}>
              Nuestras mezclas artesanales de jugos detox y cold pressed combinan superalimentos y frutas
              orgánicas prensadas en frío en República Dominicana, para nutrir tu cuerpo con la esencia
              más pura de la naturaleza.
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

      {/* Featured Products */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Selección del Huerto</h2>
              <p className={styles.sectionSubtitle}>
                Descubre nuestros sabores más buscados, embotellados diariamente
                para garantizar la máxima frescura.
              </p>
            </div>
            <Link href="/tienda" className={styles.linkAll}>
              Ver toda la tienda →
            </Link>
          </div>
          <div className={styles.productsGrid}>
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
               <p className={styles.emptyStateFallback}>Explora nuestra tienda para ver los jugos disponibles. ¡Pronto añadiremos más!</p>
            )}
          </div>
        </div>
      </section>

      {/* Story Section */}
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
            <span className={styles.storySubtitle}>Nuestra Esencia Orgánica</span>
            <h2 className={styles.sectionTitle}>De la tierra a tu mesa, sin escalas.</h2>
            <p className={styles.heroDescription}>
              En Victor's Juice Co., creemos que la verdadera salud no tiene atajos.
              Trabajamos directamente con agricultores locales que respetan los ciclos naturales de la tierra.
            </p>

            <div className={styles.storyFeatures}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>🌱</div>
                <div>
                  <h3 className={styles.featureTitle}>100% Orgánico Certificado</h3>
                  <p className={styles.featureDesc}>Sin pesticidas ni químicos sintéticos. Solo pureza vegetal.</p>
                </div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>❄️</div>
                <div>
                  <h3 className={styles.featureTitle}>Prensado en Frío</h3>
                  <p className={styles.featureDesc}>Mantenemos todas las enzimas y vitaminas intactas.</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <Link href="/sobre-nosotros" className={styles.linkAll}>
                Conoce nuestra historia →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`${styles.section} ${styles.testimonialsSection}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Comunidad Victor's</h2>
          <p className={styles.testimonialsSubtitle}>
            "El cambio en mi energía ha sido increíble desde que integré estos jugos en mi mañana."
          </p>

          <div className={styles.testimonialsGrid}>
            {homeReviews.length > 0 ? (
              homeReviews.map((r, i) => (
                <div key={r.id} className={`${styles.testimonialCard} ${i === 1 ? styles.highlighted : ''}`}>
                  <div className={styles.stars}>{"★".repeat(r.rating)}<span style={{color: 'rgba(0,0,0,0.1)'}}>{"★".repeat(5-r.rating)}</span></div>
                  <p className={styles.testimonialText}>
                    "{r.comment}"
                  </p>
                  <div className={styles.author}>
                    <div className={styles.authorName}>{r.customerName}</div>
                    <div className={styles.authorTitle}>Cliente verificado</div>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.emptyStateFallback}>Sé el primero en probar nuestros jugos naturales y dejarnos tu opinión.</p>
            )}
          </div>
          
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <Link href="/resenas" className={styles.linkAll}>
              Leer más reseñas →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
