# Design System Document

## 1. Overview & Creative North Star: "The Modern Orchard"
This design system is built to bridge the gap between organic heritage and high-end digital precision. Our Creative North Star is **"The Modern Orchard"**—a philosophy that rejects the clinical, boxy constraints of traditional e-commerce in favor of a layered, editorial experience. 

We break the "template" look by utilizing intentional asymmetry, where high-quality product photography bleeds off-grid, and typography is treated with the spatial reverence of a luxury print magazine. By pairing the grounded, deep greens of the earth with vibrant, sun-kissed citrus accents, we create a digital environment that feels fresh, premium, and inherently trustworthy.

---

## 2. Colors: Tonal Depth & Organic Warmth
Our palette is rooted in a "Nature-First" logic. We avoid pure blacks and harsh whites to maintain a high-end, approachable feel.

### The "No-Line" Rule
**Designers are strictly prohibited from using 1px solid borders for sectioning.** To define boundaries, use background color shifts (e.g., a `surface-container-low` section transitioning into a `surface` background). This creates a seamless flow that feels architectural rather than engineered.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine paper. 
- **Base Layer:** `surface` (#fbf9f6) for the primary background.
- **Secondary Sections:** Use `surface-container-low` (#f57c00) to grouping related content.
- **Interactive Cards:** Use `surface-container-lowest` (#ffffff) to provide a soft, natural lift against darker sections.

### The "Glass & Gradient" Rule
To add "soul" to the interface:
- **Glassmorphism:** For floating navigation or modal overlays, use semi-transparent `surface` colors with a 20px-40px backdrop blur.
- **Signature Gradients:** Use subtle linear gradients (e.g., `primary` #005012 to `primary-container` #006b1b) on large CTA surfaces to mimic the natural light hitting a leaf, avoiding the "flat" look of generic UI.

---

## 3. Typography: Editorial Authority
The interplay between Noto Serif and Plus Jakarta Sans creates a dialogue between tradition and innovation.

*   **The Hero (Noto Serif):** Used for `display` and `headline` levels. This typeface conveys the brand's heritage and juice-making craft. Large scales and generous tracking are encouraged for high-impact editorial moments.
*   **The Utility (Plus Jakarta Sans):** Used for `title`, `body`, and `label` levels. Its high x-height and clean geometric forms ensure maximum legibility for product details and nutritional information.

**Hierarchy Strategy:** 
- Use `display-lg` (3.5rem) for brand-defining statements with wide-set letter spacing. 
- Use `body-lg` (1rem) for storytelling segments to maintain a premium reading experience.

---

## 4. Elevation & Depth: Tonal Layering
We define hierarchy through perceived weight and light, not structural lines.

*   **The Layering Principle:** Depth is achieved by stacking surface tokens. A `surface-container-lowest` card placed on a `surface-container-high` background creates a clear, tactile distinction without visual noise.
*   **Ambient Shadows:** When a float is required (e.g., a "Add to Cart" sticky bar), use extra-diffused shadows.
    *   *Values:* Blur: 40px-60px | Opacity: 4%-6% | Color: Tinted with `on-surface` (#1b1c1a).
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token at **15% opacity**. Never use 100% opaque lines.
*   **Visual Continuity:** As seen in the provided logo, the organic curves of the orange and leaves should be reflected in our container geometry. Use the `xl` (3rem) or `full` (9999px) roundedness tokens to echo the logo’s circular motif.

---

## 5. Components: Tactile & Refined
All components must feel "hand-finished."

*   **Buttons:**
    *   *Primary:* `primary` background with `on-primary` text. Use `full` roundedness.
    *   *Strategic Accent (Conversion):* Use `secondary-container` (#fc820c) for high-intent actions like "Buy Now."
*   **Cards:** Forbid divider lines. Separate card content using `spacing-6` (2rem) of vertical white space or subtle shifts from `surface-container-low` to `surface-container-highest`.
*   **Chips:** Use for flavor profiles (e.g., "Cold-Pressed," "Organic"). Background: `surface-variant`, Text: `on-surface-variant`, Roundedness: `full`.
*   **Input Fields:** Ghost-styled. Use `surface-container-low` as the fill with no border. On focus, transition to a `primary` "Ghost Border" at 20% opacity.
*   **Product Glass:** A custom component for Victor’s Juice Co. High-quality juice bottle photography should be placed on a `surface-container-lowest` card with a very subtle `primary` gradient wash at 5% opacity to make the green liquid "pop."

---

## 6. Do’s and Don’ts

### Do
*   **DO** use asymmetric layouts where images overlap background color transitions.
*   **DO** prioritize whitespace. If a section feels crowded, double the spacing token (e.g., move from `10` to `20`).
*   **DO** use the vibrant orange (#f57c00) sparingly as a "heat map" for where you want the user to click.

### Don’t
*   **DON'T** use 1px solid black or grey borders. This immediately destroys the premium "editorial" feel.
*   **DON'T** use standard "drop shadows" that look like dark smudges. Keep them airy and tinted.
*   **DON'T** use the serif font (Noto Serif) for long-form body text; it is reserved for "thematic" moments and headings.
*   **DON'T** crowd the logo. The Victor’s Juice Co. logo requires a "clear zone" equivalent to the height of the "V" on all sides.