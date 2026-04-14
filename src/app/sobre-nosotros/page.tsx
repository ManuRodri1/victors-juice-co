import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nosotros | Victor's Juice Co.",
  description: "Conoce nuestra historia y el compromiso de Victor's Juice Co. con ofrecer los mejores jugos naturales y detox en República Dominicana.",
  keywords: "jugos naturales RD, jugos saludables, jugos en Santo Domingo, tienda de jugos naturales",
};

export default function SobreNosotrosPage() {
  return (
    <main className="container" style={{ padding: "var(--spacing-3xl) 0" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", color: "var(--color-primary)", marginBottom: "var(--spacing-md)" }}>
          Nuestra Historia
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "var(--spacing-2xl)" }}>
          Victor's Juice Co. nació de una pasión simple: llevar los beneficios reales de la 
          naturaleza directamente a tu mesa en República Dominicana. Elaboramos bebidas saludables en RD sin escalas, conservantes o atajos.
        </p>

        <div style={{ position: "relative", width: "100%", height: "400px", borderRadius: "var(--radius-xl)", overflow: "hidden", marginBottom: "var(--spacing-3xl)" }}>
          <video 
            src="https://res.cloudinary.com/dzebed7jw/video/upload/v1775676458/Victor_s_Juice_Co._wwdhgb.mp4" 
            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            autoPlay 
            muted 
            loop 
            playsInline
          />
        </div>

        <div style={{ textAlign: "left" }}>
          <h2 style={{ fontSize: "2rem", color: "var(--color-primary)", marginBottom: "var(--spacing-md)" }}>
            Compromiso con la Calidad
          </h2>
          <p style={{ lineHeight: 1.8, color: "var(--color-text-main)", marginBottom: "var(--spacing-xl)" }}>
            Trabajamos mano a mano con agricultores locales que practican la agricultura 
            orgánica regenerativa. Cada botella de nuestros jugos naturales a domicilio en RD que llega a tus 
            manos está llena de hasta un kilo de verduras y frutas de temporada, ideales como jugos detox.
          </p>

          <h2 style={{ fontSize: "2rem", color: "var(--color-primary)", marginBottom: "var(--spacing-md)" }}>
            Prensado en Frío
          </h2>
          <p style={{ lineHeight: 1.8, color: "var(--color-text-main)", marginBottom: "var(--spacing-xl)" }}>
            A diferencia de las licuadoras tradicionales que generan calor, nuestra 
            tecnología de prensado en frío aplica miles de libras de presión para extraer 
            el jugo, manteniendo intactas todas las vitaminas, minerales y enzimas vivas.
          </p>
        </div>
      </div>
    </main>
  );
}
