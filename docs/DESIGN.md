---
name: AltairGO Platform
description: Traveler-facing Travel Intelligence UI using luxury Midnight and Cerulean
colors:
  midnight: "#1C2B48"
  cerulean: "#8EB1D1"
  baby-blue: "#A7C7E7"
  platinum: "#E8ECEF"
  blue-grey: "#C4D8E5"
  white: "#F8FAFC"
  bg-light: "#F8FAFC"
  fg-light: "#283954"
typography:
  display:
    fontFamily: "DM Serif Display, serif"
    fontSize: "clamp(2.25rem, 6vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  accent:
    fontFamily: "Satisfy, cursive"
    fontSize: "2rem"
rounded:
  sm: "0.25rem"
  md: "0.5rem"
  lg: "0.75rem"
  xl: "1rem"
  "2xl": "1.5rem"
  full: "9999px"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "5": "1.25rem"
  "6": "1.5rem"
  "8": "2rem"
  "10": "2.5rem"
  "12": "3rem"
  "16": "4rem"
  "20": "5rem"
  "24": "6rem"
  "32": "8rem"
components:
  button-primary:
    backgroundColor: "{colors.midnight}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
    padding: "0.75rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.cerulean}"
---

# Design System: AltairGO Platform

## 1. Overview

**Creative North Star: "The Modern Explorer's Premium Journal"**

The AltairGO design system is curated to evoke the quiet luxury, calm confidence, and structural precision of a high-end digital travel journal. Grounded in a deep maritime and atmospheric color palette, the interface rejects generic corporate tech visual languages. It emphasizes spacious layouts, cinematic photography, elegant typographic contrast, and deliberate micro-interactions to deliver a calm, stress-free planning and trip management workspace.

### Key Characteristics:
* **Calm & Cinematic**: Clean structure with generous negative space, allowing travelers to breathe while digesting complex logistics.
* **Atmospheric Palette**: A luxury color strategy blending deep Midnight Blue with sea-like Cerulean and crisp Platinum.
* **Typographic Luxury**: High-contrast pairing of a sophisticated serif display font with clean geometric body text.

---

## 2. Colors

The color system is narrow, deliberate, and contrast-verified. It uses OKLCH for dynamic lightness scaling and fluid theme transitioning (light/dark) while establishing robust fallback CSS custom properties.

### Primary
* **Midnight Blue** (`#1C2B48` / `oklch(25% 0.06 255)`): Represents travel authority, trust, and structural stability. Used for primary CTA backgrounds, brand headers, text ink, and key structural divisions.
* **Luxury Cerulean** (`#8EB1D1` / `oklch(73% 0.07 235)`): Evokes natural water bodies, open horizons, and destination beauty. Used for accent states, navigation highlights, active tabs, and primary action hover states.

### Secondary & Muted
* **Baby Blue** (`#A7C7E7` / `oklch(80% 0.07 240)`): Soft tint for accent backgrounds, information card strokes, and subtle highlights.
* **Blue Grey** (`#C4D8E5` / `oklch(85% 0.03 245)`): Cool secondary neutral used for interactive borders, table dividers, and subtle controls.
* **Platinum** (`#E8ECEF` / `oklch(95% 0.01 245)`): Off-white canvas base, clean background panels, and muted surface fills.

### Semantics
* **Success**: `#10B981` — Checked booking, completed tasks.
* **Warning**: `#F59E0B` — Expiring documents, pending action items.
* **Error**: `#EF4444` — Over-budget expenses, failed SSE operations.

---

## 3. Typography

The typographic hierarchy prioritizes readability and striking character contrast. Font families are capped at three to maintain visual discipline.

* **Display Family**: `DM Serif Display, serif` — Used exclusively for Hero headings, section titles (`h1`, `h2`), and high-impact travel journal moments. High editorial weight.
* **Body Family**: `Poppins, sans-serif` — Used for body copy, form fields, tab text, lists, and general UI items. Clean, geometric, and readable.
* **Accent Family**: `Satisfy, cursive` — Used sparingly for decorative script callouts, hand-written journal accents, and editorial flourishes.
* **Mono Family**: `JetBrains Mono, monospace` — Reserved strictly for expense numbers, flight times, and technical admin data.

### Typographic Scale:
* **Display Heading**: `clamp(2.25rem, 6vw, 3.75rem)` (DM Serif Display, letter-spacing: `-0.02em`)
* **H1 / Page Title**: `clamp(1.875rem, 4vw, 3rem)` (DM Serif Display, letter-spacing: `-0.01em`)
* **H2 / Section Title**: `clamp(1.5rem, 3vw, 2.25rem)` (DM Serif Display, letter-spacing: `-0.01em`)
* **Body Text**: `1rem` / `16px` (Poppins, regular, line-height: `1.625`)
* **UI Labels & Captions**: `0.875rem` / `14px` (Poppins, medium-to-semibold)

---

## 4. Elevation

The elevation system relies on atmospheric light scattering, glassmorphic refraction, and flat tonal containment instead of deep artificial drop shadows.

* **Flat Tonal Boundaries**: Cards and secondary blocks utilize high-contrast borders (`1px solid var(--color-border)`) and a subtle background fill rather than drop shadows.
* **Tactile Glassmorphism**: High-elevation components (navigation bars, modal overlays, sticky action drawers) use a semi-transparent white backdrop (`oklch(100% 0 0 / 55%)`) layered with a crisp frosted-glass blur (`blur(20px) saturate(180%)`) and thin white borders to sit on top of the physical page space.
* **Elevation Ramps**:
  - **Flat**: Card list items, forms, standard panels.
  - **Low Shadow (`--shadow-md`)**: Interactive buttons and active bento card hover states.
  - **High (`--shadow-xl` / Glass)**: Modal backdrops, action dropdowns, global alerts, toast notifications.

---

## 5. Components

All core UI elements are designed to respect the editorial grid and tactile spacing.

### Primary Button (`.btnPrimary`):
* **Normal**: Midnight Blue background (`#1C2B48`), Platinum text (`#E8ECEF`), circular rounded pill (`var(--radius-full)`), tight vertical-to-horizontal padding ratios.
* **States**: Scale scaling (`scale(1.02)`) and deep Cerulean background transitions on hover, with a clean focus ring on keyboard focus.

### Bento Cards (`.DestinationCard`):
* Tactile rectangular shapes (`--radius-xl` / `16px`) with flat borders and highly curated aspect ratios (wide/tall/square).
* Images inside cards scale gently on hover with custom easing (`cubic-bezier(0.16, 1, 0.3, 1)`) to pull the traveler's eye into the location.

### Segmented Tab Controls:
* Curved background tracks with sliding glassmorphic tabs that snap smoothly using Framer Motion spring physics.

---

## 6. Do's and Don'ts

### Do's:
* **Do** pair every serif display heading with robust, geometric body copy.
* **Do** balance long paragraphs with wide layout gaps, ensuring the body line length stays within `65-75ch` for perfect readability.
* **Do** use OKLCH-derived values for dark-mode transitions to guarantee consistent contrast values (≥4.5:1).
* **Do** animate list entrances with staggering effects using ease-out exponential curves.

### Don'ts:
* **Don't** use gradient text under any circumstances; rely on size and font weight for premium emphasis.
* **Don't** use side-stripe colored borders on cards or notifications; always use full elegant borders.
* **Don't** pair deep borders (`border: 1px solid`) with large, blurred drop shadows on the same card element.
* **Don't** apply wide all-caps tracking on body copy; keep uppercase text strictly confined to short category kickers or badges (≤4 words).
* **Don't** over-round cards; cards should cap at a clean `12px` to `16px` boundary, reserving full pills solely for active buttons and badges.
