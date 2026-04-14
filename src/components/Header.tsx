"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { useCart } from "@/context/CartContext";

import Image from "next/image";

const NAV_LINKS = [
  { name: "Inicio", path: "/" },
  { name: "Tienda", path: "/tienda" },
  { name: "Sobre Nosotros", path: "/sobre-nosotros" },
  { name: "Reseñas", path: "/resenas" },
  { name: "Contacto", path: "/contacto" },
];

export default function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logoWrapper} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <Image 
            src="https://res.cloudinary.com/dzebed7jw/image/upload/v1774301079/logo-removebg-preview_stgzps.png"
            alt="Victor's Juice Co. Logo"
            width={65}
            height={65}
            style={{ objectFit: 'contain' }}
            priority
          />
          <span className={styles.logoText}>Victor's Juice Co.</span>
        </Link>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.isOpen : ""}`}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`${styles.navLink} ${
                pathname === link.path ? styles.active : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <button 
            className={styles.menuButton} 
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
          <Link href="/carrito" className={styles.cartButton} aria-label="Carrito">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
