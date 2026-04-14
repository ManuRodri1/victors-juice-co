# Design System Specification: Victor’s Juice Co.

## 1. Overview & Creative North Star: "The Organic Orchardist"
The Creative North Star for this design system is **"The Organic Orchardist."** This concept moves away from the sterile, rigid grids of traditional e-commerce and embraces a fluid, editorial layout that mimics the layered, tactile nature of a high-end botanical journal. 

We break the "template" look by using intentional white space, generous roundedness, and a "Tonal Depth" strategy. Instead of sharp lines and boxes, we use overlapping elements and soft, organic shifts in background color to guide the eye. The goal is to make the user feel like they are interacting with a physical, premium product—one that is as fresh and vibrant as the juice itself.

---

## 2. Colors & Surface Strategy
Our palette is rooted in the natural world, utilizing deep, leafy greens and energetic citrus oranges balanced by a sophisticated cream base.

### The Palette (Core Tokens)
- **Primary (`#006b1b`):** Used for brand expression and primary calls to action.
- **Secondary (`#874e00`):** Our "Vibrant Orange" evolution. Use this for accents that require high conversion visibility.
- **Background (`#f8f6f2`):** A warm, light cream that provides an organic foundation, far more premium than pure white.
- **Surface Tiers:**
    - `surface-container-lowest`: `#ffffff` (Pure white, used for high-lift cards).
    - `surface-container-low`: `#f2f1ec` (Subtle depth).
    - `surface-container-high`: `#e4e2de` (Stronger definition).

### Visual Rules for Designers
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Definition must be achieved through background shifts. For example, a Product Grid on `surface-container-low` should sit against a main `background` page.
*   **The Glass & Gradient Rule:** For floating navigation or product "quick view" modals, use **Glassmorphism**. Apply `surface` color at 70% opacity with a `20px` backdrop-blur.
*   **Signature Textures:** Main Hero buttons should use a subtle linear gradient from `primary` to `primary_dim` to add "juice-like" depth and weight.

---

## 3. Typography: The Editorial Balance
We use a high-contrast pairing to evoke a sense of heritage and modern clarity.

*   **Display & Headlines (Noto Serif):** Our "Elegant Serif." Use these for product names and editorial storytelling. The serif adds a "Premium Health" authority.
    - `display-lg` (3.5rem): Reserved for hero statements.
*   **Titles & Body (Plus Jakarta Sans):** Our "Clean Sans-Serif." This provides high legibility for product descriptions and functional UI elements.
    - `title-md` (1.125rem): Ideal for product card titles.
    - `body-md` (0.875rem): Standard description text.
*   **Labeling:** All labels use `plusJakartaSans` at `label-md` (0.75rem) to maintain a technical, clean feel against the more emotional serif headings.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are too "digital." We use **Tonal Layering** to create a soft, natural lift.

*   **The Layering Principle:** Stack surfaces to create hierarchy.
    *   *Level 0:* `background` (The Orchard floor).
    *   *Level 1:* `surface-container-low` (Content sections).
    *   *Level 2:* `surface-container-lowest` (The white product card).
*   **Ambient Shadows:** If a card needs to "float" (e.g., a cart drawer), use a shadow with a blur of `40px`, Y-offset of `10px`, and an opacity of `6%` using the `on_surface` color.
*   **The "Ghost Border" Fallback:** For input fields only, use `outline-variant` at 20% opacity. Never use high-contrast black borders.

---

## 5. Components

### Buttons & Interaction
*   **Primary Button:** Background: `secondary` (Orange). Radius: `full`. Text: `on_secondary` (Bold). These should feel like "Vitamin C" for the layout—energetic and impossible to miss.
*   **Secondary Button:** Background: `surface-container-high`. Text: `on_surface`. Radius: `xl`.
*   **Ghost Interaction:** On hover, buttons should scale by `1.02` with a `300ms` ease-out transition.

### Cards & Lists
*   **Product Cards:** No borders. Background: `surface-container-lowest`. Corner Radius: `lg` (2rem). Content within the card should use `spacing-6` padding to ensure a "spacious" feel.
*   **Lists:** Forbid divider lines. Separate items using `spacing-4` vertical gaps and subtle background-color toggles on hover.

### Inputs & Fields
*   **Text Inputs:** Background: `surface-container-low`. Radius: `md` (1.5rem). The label should sit inside the container in `label-md` to maintain a compact, modern aesthetic.

### Additional Signature Components
*   **Juice Chips:** Use `primary-container` for ingredient tags (e.g., "Cold Pressed," "Organic"). Radius: `full`.
*   **The Floating Navigation:** A centered, glassmorphic pill-shaped bar at the bottom of the viewport for mobile-first accessibility.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical layouts. Let product images overlap the edges of containers to create a "fresh, bursting" feel.
*   **Do** use the `lg` (2rem) and `xl` (3rem) corner radii for major containers to maintain the "Soft Minimalism" vibe.
*   **Do** prioritize vertical white space (`spacing-16` and `spacing-20`) between sections to let the brand breathe.

### Don’t:
*   **Don’t** use pure black for text. Use `on_surface` (`#2e2f2d`) to keep the typography feeling organic and soft.
*   **Don’t** use sharp 90-degree corners. Everything in nature is rounded; the UI should be too.
*   **Don’t** use standard "Grey" shadows. Ensure shadows are tinted with the background hue to maintain the creaminess of the palette.