# GoldSA CMS: Design System Foundation Specification

This document defines the official visual identity, design tokens, accessibility standards, component variants, and layout rules for **GoldSA CMS**. Every page, feature, and component built for this platform must adhere strictly to these guidelines.

---

## 1. Design Philosophy

To reflect the heritage, quality, and high value of luxury jewelry, the UI design system is built around three core pillars: **Luxury Gold Accents**, **Premium Minimalism**, and **High Structural Trust**.

*   **Luxury & Prestige:** Luxury is defined by restraint. The UI uses fine lines, spacious layouts, and a curated gold color palette to highlight jewelry collections. Bold, saturated primary colors are avoided.
*   **Minimalism & Focus:** Every pixel must serve to highlight the jewelry. UI controls (borders, buttons, navigation panels) are kept thin, clean, and low-contrast until focused, ensuring the product images capture full attention.
*   **Structured Typography Hierarchy:** Clear contrast between tall, elegant serif headings (representing craftsmanship) and geometric, highly readable sans-serif body copy (representing modern commerce).
*   **Generous Whitespace:** Whitespace is treated as an active design element, not as empty space. It is used to frame collections, giving each jewelry item room to breathe.
*   **Robust Accessibility:** The design ensures that high-end visuals never compromise accessibility, strictly meeting WCAG 2.1 AA requirements for contrast ratios and navigation.

---

## 2. Color System

The palette features a clean separation between B2C Storefront (which leans on premium dark/cream tones) and the Admin Dashboard (which favors crisp, functional utility surfaces).

### Palette Specifications

```
Light Mode Base:  Cream/Off-white (#FCFBF9)  ──  Charcoal Text (#1A1A1A)  ──  Gold (#C5A059)
Dark Mode Base:   Obsidian/Black (#111111)   ──  White Text (#F3F4F6)     ──  Gold (#D4AF37)
```

#### 1. Primary & Neutral Backgrounds
*   **Storefront Light Base:** `#FCFBF9` (Warm Cream). Used for B2C page backgrounds to create an organic, premium feel. *Do not use pure `#FFFFFF` for B2C backgrounds.*
*   **Storefront Dark Base:** `#111111` (Obsidian Black). Used for high-end catalog collections to make precious metals and diamonds pop.
*   **Admin Dashboard Base:** `#F8F9FA` (Clean Light Grey) for light mode, `#0B0B0C` (Slate Dark) for dark mode. Ensures maximum legibility for dense tables.

#### 2. Luxury Gold Palette (Accents)
*   **Polished Gold:** `#D4AF37`. Used for high-visibility highlights, active states, pricing highlights, and luxury badges.
*   **Muted/Satin Gold:** `#C5A059`. Default accent tone used for secondary buttons, borders, active navigation markers, and decorative category dividers.
*   **Champagne Glow:** `#E6D5B8`. Used for subtle gradients, tag backdrops, and active row indicators.

#### 3. Neutrals & Borders
*   **Primary Text (Light):** `#1A1A1A` (Deep Charcoal). *Do not use pure `#000000` to prevent visual fatigue.*
*   **Secondary Text (Light):** `#6B7280` (Muted Slate). Used for labels, descriptions, and metadata.
*   **Border (Light):** `#E5E7EB` (Muted Grey) / `#E6D5B8` (Gold Tint). Fine borders (1px) used to separate sections.
*   **Card Fill (Light):** `#FFFFFF` (Solid White). Elevated surface elements.

#### 4. Semantic Status Colors
*   **Success:** `#10B981` (Emerald). Used for success alerts, successful updates, and positive toast messages.
*   **Warning:** `#F59E0B` (Amber). Used for warning states and confirmation alerts.
*   **Error:** `#EF4444` (Ruby Red). Used for validation failures, error messages, and critical alerts.
*   **Info:** `#3B82F6` (Sapphire Blue). Used for system notifications and general info.

---

## 3. Typography System

The typography scale balances elegance with legibility, pairing a luxury Serif header with a geometric Sans-Serif body font.

### Font Families
*   **Primary Display (Serif):** *Playfair Display* or *Outfit* (Fallback: Georgia, serif). Used for all headers (`h1`, `h2`, `h3`) and product titles.
*   **Primary Interface (Sans-Serif):** *Inter* or *Roboto* (Fallback: sans-serif). Used for body text, form elements, buttons, tables, and admin layout structures.

### Typography Scale & Hierarchy

| Classification | Font Size | Line Height | Letter Spacing | Font Weight | Usage Example |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Header (Hero)** | 48px / 3.0rem | 1.15 | `-0.02em` | SemiBold (600) | Homepage Title Hero |
| **Header 1 (h1)** | 36px / 2.25rem| 1.20 | `-0.01em` | Medium (500) | Collection Title, Page Header |
| **Header 2 (h2)** | 24px / 1.50rem| 1.30 | `0.00em` | Regular (400) | Product Detail Card Header |
| **Header 3 (h3)** | 20px / 1.25rem| 1.40 | `0.01em` | Medium (500) | Subsection headers |
| **Body (Default)** | 16px / 1.00rem| 1.60 | `0.00em` | Regular (400) | Product descriptions, articles |
| **Body (Small)** | 14px / 0.875rem| 1.50 | `0.01em` | Regular (400) | Meta values, footer links |
| **Label / Meta** | 12px / 0.75rem| 1.40 | `0.05em` (Caps)| Medium (500) | Table headers, form labels |
| **Action / Button** | 14px / 0.875rem| 1.20 | `0.03em` | SemiBold (600) | Primary & Secondary Actions |

---

## 4. Spacing System

Spacing is based on an 8px grid system, ensuring mathematical harmony and clean responsive layout alignments.

### Base Scale

| Value Token | Px Equivalent | Application Area |
| :--- | :--- | :--- |
| `space-1` | 4px | Small badge internal padding, close button offsets |
| `space-2` | 8px | Button inline padding, card element gaps |
| `space-3` | 12px | Label to input gap, tag spacing |
| `space-4` | 16px | Card content padding, default list gaps |
| `space-6` | 24px | Layout columns gap, modal inner padding |
| `space-8` | 32px | Section grid gap, drawer outer margins |
| `space-12` | 48px | Storefront page component gaps, header padding |
| `space-16` | 64px | Hero component spacing, footer margins |

---

## 5. Border Radius System

GoldSA CMS uses sharp, clean corners to reflect a structured, architectural sense of luxury. Soft, circular geometries are restricted to specific element types.

*   **Sharp Corners (`0px`):** Used for large storefront banners, full-width screen layouts, and hero sections.
*   **Fine Accent Radius (`2px`):** Used for badges, tags, and indicator lines.
*   **Standard Primitives (`4px` / `rounded-sm`):** Buttons, inputs, card layouts, dropdown menus, and standard image containers.
*   **System Layout Blocks (`8px` / `rounded-md`):** Dialog boxes, slide-out drawers, user avatars, and media library thumbnail grids.
*   **Pill Rounded (`9999px`):** Strictly restricted to notification counts and status indicator lights.

---

## 6. Shadows & Elevation

Elevations are simulated using soft, translucent shadows instead of heavy, solid borders.

| Elevation Level | Styling Definition | Common Application |
| :--- | :--- | :--- |
| **Flat (Level 0)** | Border: 1px Solid (`#E5E7EB` / `#222`) | Base cards, table lines, background layouts |
| **Low (Level 1)** | Shadow: `0 2px 4px 0 rgba(0, 0, 0, 0.03)` | Page header bar (sticky), static page lists |
| **Medium (Level 2)** | Shadow: `0 4px 12px -2px rgba(0, 0, 0, 0.05)` | Hover states of product cards, simple dropdowns |
| **High (Level 3)** | Shadow: `0 12px 24px -4px rgba(0, 0, 0, 0.08)` | Modals, flyout menus, system dialog alerts |
| **Overlay (Level 4)** | Shadow: `0 20px 48px -8px rgba(0, 0, 0, 0.12)` | Right drawers (cart, filter panel), popups |

---

## 7. Icon System

Icons are used as secondary helpers to reinforce visual clarity without adding clutter.

*   **Selected Library:** *Lucide Icons* (or equivalent clean line-based vector library).
*   **Default Stroke Width:** 1.5px. Avoid using filled icons unless marking an active state (e.g., active bookmark/favorite).
*   **Sizes:**
    *   *Small (Action):* 16px × 16px (Buttons, metadata lists).
    *   *Medium (Standard):* 20px × 20px (Sidebar menus, header navigations, input fields).
    *   *Large (Feature):* 32px × 32px (Empty states, service benefit banners).
*   **Accessibility:** Every standalone interactive icon must contain an `aria-label` or be paired with descriptive screen-reader-only text (`sr-only`).

---

## 8. Animation System

Transitions in GoldSA CMS must feel slow, deliberate, and high-end. Avoid bouncy, rapid, or overly complex cartoon animations.

*   **Easing Curves:** Standard transition uses `cubic-bezier(0.25, 1, 0.5, 1)` (Out Quart) or custom ease-out transitions for smooth, non-linear decelerations.
*   **Duration Scale:**
    *   *Immediate / Micro:* 150ms. Used for simple button hover states, background transitions, and text highlights.
    *   *Standard Interactive:* 300ms. Used for dropdown reveals, modal fade-ins, and small card transitions.
    *   *Structural / Layout:* 450ms. Used for sliding drawers, slide-down banners, and route transitions.
*   **Accessibility (Reduced Motion):** If a user's system preferences request reduced motion (`@media (prefers-reduced-motion: reduce)`), all transitional translations must revert to immediate or basic `opacity` fades.

---

## 9. Responsive Strategy

Following a **Mobile-First** approach, storefront views are optimized for mobile phones (B2C) while dashboard tools (Admin) prioritize laptop and desktop sizes.

### Viewport Breakpoints
*   **Mobile (Default):** `< 640px`. Single-column grids, bottom navigation bars, full-screen overlay actions.
*   **Tablet (`sm`):** `640px` to `767px`. Two-column lists, smaller margins, floating actions.
*   **Tablet Landscape (`md`):** `768px` to `1023px`. Two/Three-column product grids, persistent filter columns.
*   **Laptop (`lg`):** `1024px` to `1279px`. Full admin sidebar navigation, multi-column tables, primary layouts.
*   **Desktop (`xl`):** `1280px` to `1535px`. Storefront container max-width set to `1280px` (`max-w-7xl` centered).
*   **Wide Desktop (`2xl`):** `>= 1536px`. Wide aspect galleries, expanded margins, large imagery showcases.

---

## 10. Accessibility Standards (WCAG 2.1 AA)

All user interface developments must conform to these standard practices:

*   **Color Contrast:** Text-to-background contrast ratio must be at least `4.5:1` for regular copy, and `3:1` for large text elements (above 18pt).
*   **Keyboard Traps:** Modals and drawers must lock focus parameters internally while open. Navigating past the boundary must loop back to the close action (accessible via the `Tab` key). Pressing `Esc` must trigger close callbacks.
*   **Focus Ring Indicator:** Every focusable item must expose a high-contrast ring outline:
    *   *Light Mode:* 2px width ring with a offset border using `Polished Gold (#D4AF37)`.
*   **Touch Target Minimums:** All interactive layout elements (buttons, links, page controls) must have a touch target area of at least 44px × 44px.

---

## 11. Design Tokens

Design tokens are organized as standard reference variables.

### Global Reference Table

```typescript
export const DESIGN_TOKENS = {
  colors: {
    storefront: {
      backgroundLight: '#FCFBF9',
      backgroundDark: '#111111',
      primaryTextLight: '#1A1A1A',
      primaryTextDark: '#F3F4F6',
    },
    accent: {
      goldPolished: '#D4AF37',
      goldMuted: '#C5A059',
      champagne: '#E6D5B8',
    },
    semantic: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  radius: {
    flat: '0px',
    accent: '2px',
    sm: '4px',
    md: '8px',
    full: '9999px',
  },
  typography: {
    fontDisplay: '"Playfair Display", Georgia, serif',
    fontInterface: '"Inter", "Roboto", sans-serif',
  },
  elevation: {
    low: '0px 2px 4px 0px rgba(0, 0, 0, 0.03)',
    medium: '0px 4px 12px -2px rgba(0, 0, 0, 0.05)',
    high: '0px 12px 24px -4px rgba(0, 0, 0, 0.08)',
  },
  animation: {
    curveOutQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
    durationMicro: '150ms',
    durationStandard: '300ms',
    durationLayout: '450ms',
  },
  zIndex: {
    stickyHeader: 100,
    dropdownMenu: 200,
    overlayScrim: 300,
    drawerSlide: 400,
    modalPopup: 500,
    toastAlert: 600,
  }
};
```

---

## 12. Naming Conventions

To keep styling files, classes, and component attributes organized, developer files must follow these naming structures:

*   **Colors:** `bg-brand-cream`, `text-brand-gold-polished`, `border-semantic-error-light`.
*   **Typography:** `font-display`, `font-interface`, `text-display-hero`, `text-body-small`.
*   **Spacing:** `p-layout-sm` (internal element padding), `m-layout-section` (section vertical margin).
*   **UI Components:** PascalCase prefixed with function scopes where necessary (`ProductCard`, `CartDrawer`, `BaseModal`).
*   **Component Variants:** camelCase mapping to functional parameters: `variant="goldBorder"`, `size="large"`.
*   **Interactive States:** Prefixed with native CSS target classes: `hover:text-brand-gold-polished`, `focus-visible:ring-brand-gold-polished`, `active:scale-95`.

---

## 13. Component State System

Every interactive UI component must visualise its dynamic states with unified properties.

*   **Default:** Standard resting state. Accents are muted, boundaries use fine lines (`1px`), text contrast is balanced.
*   **Hover:** Triggered by pointer entry. Backgrounds fade slightly lighter/darker (opacity shift of 10-15%), gold accents become active, and cursor switches to `pointer`.
*   **Focus:** Keyboard focus indicator. Exposes a `2px` offset outline using `Polished Gold (#D4AF37)`.
*   **Active:** Triggered on click/press. Subtle inward scaling (`scale-98`) and background darkening.
*   **Selected:** Active persistence state (e.g., active size filter). Border shifts to `Polished Gold`, background gains a subtle `Champagne Glow (#E6D5B8)` tint.
*   **Disabled:** Pointer-events disabled, opacity drops to `40%`, cursor set to `not-allowed`.
*   **Loading:** Content components display shimmer animation pulses. Buttons display a centered, rotating gold circular loader while locking click events.
*   **Success:** Borders and focus rings switch to `Success Green (#10B981)`.
*   **Warning:** Alert borders switch to `Warning Yellow (#F59E0B)`.
*   **Error:** Borders and validation messages switch to `Error Red (#EF4444)`.
*   **Read Only:** Visual presentation looks like the default state but input interactive events are disabled, hiding input borders and focus capabilities.

---

## 14. Layout System

### Customer Storefront Layout
*   **Max Content Width:** Centered container at `1280px` (`max-w-7xl`).
*   **Sticky Header:** Floating bar height of `72px` built using glassmorphic backgrounds (`backdrop-blur-md bg-opacity-80`).
*   **Footer:** Dynamic high-contrast sections with responsive multi-columns.
*   **Scrolling:** Enabled via native smooth scrolling parameters.

### Admin Dashboard Layout
*   **Sidebar Width:** Collapsed state of `64px`, expanded state of `260px` with a transition duration of `300ms`.
*   **Header Height:** Fixed bar height of `60px` hosting global indicators, profile actions, and live currency parameters.
*   **Safe Areas:** Minimum content layout margin of `24px` (`p-6`) on all dashboard viewport sizes.

---

## 15. Component Size System

Standardized size variants ensure consistent layouts across B2C and Admin screens.

*   **Buttons & Inputs:**
    *   *Small (SM):* Height `32px`. Used in compact table fields and filter badges.
    *   *Medium (MD):* Height `44px` (Default touch target minimum). Used for main buttons and input fields.
    *   *Large (LG):* Height `56px`. Used for storefront Hero CTA buttons and single checkout steps.
*   **Modals & Dialogs:**
    *   *Confirmation:* Max width `400px`. Centered on screen.
    *   *Standard:* Max width `600px`. Used for simple data entry.
    *   *Details/Forms:* Max width `900px`. Used for product configuration.
*   **Drawers:**
    *   *Cart / Filters:* Default width `420px`.
*   **Avatars:**
    *   *Admin Profile:* Size `36px × 36px`.
*   **Badges & Icons:**
    *   *Standard:* Height `20px` (text-xs).
*   **Tables:**
    *   *Admin Density:* Header heights of `40px`, Row heights of `56px` to ensure comfortable viewing.

---

## 16. Theme Rules

GoldSA CMS supports light and dark themes, managed via class selectors (`.light` and `.dark`) injected on the root element.

*   **Theme Detection:** Next-themes configurations query local storage defaults or fallback to user system settings (`prefers-color-scheme`).
*   **Transitions:** Theme changes are animated smoothly over `300ms` using opacity and background fades.
*   **Accents Consistency:** Gold highlights (`#D4AF37` / `#C5A059`) remain visually identical across light and dark modes to maintain brand identity.
*   **Neutral Shifts:**
    *   *Light Mode:* Warm cream backgrounds (`#FCFBF9`) with charcoal typography (`#1A1A1A`).
    *   *Dark Mode:* Charcoal/black backgrounds (`#111111`) with off-white typography (`#F3F4F6`).
