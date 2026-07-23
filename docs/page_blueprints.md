# GoldSA CMS: Complete Production Page Blueprint Specification

This document defines the complete screen architecture, layout parameters, interactions, data schemas, and SEO requirements for every page in **GoldSA CMS**.

---

## 1. Customer Website (Public Storefront)

All public B2C routes leverage Next.js dynamic routing and static generation under the `(storefront)` route group.

### Storefront Homepage
*   **Purpose:** Primary landing page presenting luxury branding and curated jewelry collections.
*   **Business Goal:** Convert incoming organic traffic, drive users to collection pages, and showcase branding.
*   **Target User:** Luxury retail customer.
*   **Access Permissions:** Public (Guest / Registered Customer).
*   **Route:** `/`
*   **Navigation Entry:** "Home" in top header menu.
*   **Parent Page:** None.
*   **Child Pages:** `/collections`, `/product/[slug]`.
*   **Breadcrumb:** Home
*   **Main Sections:** Hero Carousel, Dynamic Categories Grid, Featured Products Showcase, Editorial About Section, Live Instagram Gallery Feed, Footer.
*   **Widgets:** Live dynamic homepage layout manager loader.
*   **Components Used:** Button, Image, Carousel, CarouselCard, ProductCard, Skeleton, GlassHeader, Footer.
*   **Forms / Tables / Cards / Charts:** Product Cards with interactive hover image-swapping. No tables or charts.
*   **Filters / Search / Sorting:** Simple search bar trigger leading to `/search`.
*   **Bulk Actions:** None.
*   **Primary Actions:** "View Collection" (Hero CTA), "Add to Wishlist" (on Product Cards).
*   **Secondary Actions:** Newsletter email sign-up.
*   **Empty State:** Falls back to default curated placeholder collections if database config is empty.
*   **Loading State:** Glassy shimmer skeletons replacing product cards.
*   **Error State:** Falls back to global static layout with offline notice banner.
*   **Success State:** Toast showing "Subscribed to newsletter successfully!".
*   **Confirmation Dialogs:** None.
*   **Notifications:** Small toast notification alert on successful newsletter sign-up.
*   **Responsive Behavior:** 1-column layout on mobile, transitioning to 2-columns (tablet), and 4-columns (desktop).
*   **Accessibility Notes:** Carousel slides support ARIA controls (`role="region"`, `aria-roledescription="carousel"`).
*   **SEO Notes:** Page Title: "GoldSA CMS - Luxury Custom Gold & Diamond Jewelry". Meta Description: "Browse premium handcrafted gold rings, necklaces, and custom diamond collections." Injects schema.json for local business data.
*   **Data Sources:** Homepage settings JSON array (Supabase), marketing banners.
*   **Related APIs:** `GET /api/storefront/homepage`, `POST /api/storefront/newsletter`.
*   **Relationships:** Gateway to catalog lists (`/collections`) and detail screens (`/product/[slug]`).

### Collections Directory
*   **Route:** `/collections`
*   **Purpose:** Dynamic index directory of active design collections.
*   **Business Goal:** Let users search catalog paths by curated themes (e.g. Wedding Set, Daily Gold).
*   **Target User:** Customer browsing for themes.
*   **Access Permissions:** Public.
*   **Parent Page:** `/`
*   **Child Pages:** `/collections/[collection-slug]`
*   **Breadcrumb:** Home > Collections
*   **Main Sections:** Collections grid layout, banner header, newsletter capture.
*   **Components Used:** Breadcrumbs, Grid, CollectionCard.
*   **Primary Actions:** Select collection card.
*   **Data Sources:** Collections table.
*   **SEO Notes:** Meta title: "Explore Custom Jewelry Collections - GoldSA CMS".

### Product Details Page
*   **Route:** `/product/[slug]`
*   **Purpose:** Showcase individual jewelry details (weight, gold purity, diamonds, pricing).
*   **Business Goal:** Conversion (getting products added to shopping bags).
*   **Target User:** Customer ready to purchase.
*   **Access Permissions:** Public.
*   **Parent Page:** `/collections` or `/`
*   **Child Pages:** None.
*   **Breadcrumb:** Home > Products > [Product Name]
*   **Main Sections:** Dual-column display. Left: High-resolution media zoom gallery. Right: Product configurations (karat selection, custom size), dynamic pricing box, GIA certification viewer, WhatsApp share CTA.
*   **Forms:** Sizing and Karat dropdown selector form.
*   **Primary Actions:** "Add to Bag" button, "Buy Now via WhatsApp".
*   **Secondary Actions:** "Save to Favorites", "Request Quote".
*   **Loading State:** Text lines replaced by shimmer cards, gallery shows spinning loader.
*   **SEO Notes:** Dynamic schema.json containing product details, reviews, pricing, stock availability, and currencies.
*   **Data Sources:** Product details database, current gold base rates calculator.
*   **Related APIs:** `GET /api/products/[slug]`, `GET /api/pricing/calculate`.

### Checkout Page
*   **Route:** `/checkout`
*   **Purpose:** Capture user shipping details, payment preferences, and complete transaction.
*   **Business Goal:** Maximize checkout completion rates, secure client details.
*   **Target User:** Buyers finalizing checkout.
*   **Access Permissions:** Public (Guest checkout allowed).
*   **Parent Page:** `/cart`
*   **Breadcrumb:** Home > Shopping Bag > Checkout
*   **Forms:** Multi-step Shipping address forms, billing details selector, contact verification.
*   **Primary Actions:** "Place Order" (submits billing).
*   **Data Sources:** Cart checkout schemas, user address lists.

---

## 2. Authentication Namespace

Authentication screens reside under `/auth` routes and use minimal layouts.

### Login Page
*   **Route:** `/auth/login`
*   **Purpose:** Standard user and admin authentication form.
*   **Business Goal:** Authenticate store operators and customers.
*   **Target User:** System administrators, registered customers.
*   **Access Permissions:** Public.
*   **Forms:** Email and password input boxes.
*   **Primary Actions:** "Sign In".
*   **Secondary Actions:** "Forgot Password" link.
*   **Related APIs:** `POST /api/auth/login`.

---

## 3. Admin Dashboard Pages

Admin dashboard layouts are protected under security middleware checking user tokens.

### Dashboard Home
*   **Route:** `/admin/dashboard`
*   **Purpose:** Store metrics control room showing active gold prices, sales logs, and system operations.
*   **Business Goal:** Provide managers with a clear view of business health.
*   **Target User:** Owner, Admin, Editor.
*   **Access Permissions:** Role authenticated.
*   **Widgets:** Active Gold Spot Price indicator card, Today's Sales chart, Open Orders grid, Low Stock alert card.
*   **Charts:** Interactive line charts plotting sales revenue against date ranges.
*   **Data Sources:** Dashboard summary APIs.
*   **Related APIs:** `GET /api/admin/dashboard/summary`.

### Products Catalog Manager
*   **Route:** `/admin/products`
*   **Purpose:** Add, update, and manage the jewelry inventory database.
*   **Business Goal:** Keep jewelry descriptions, weights, images, and prices accurate.
*   **Target User:** Owner, Admin, Editor.
*   **Tables:** Comprehensive inventory list showing image thumbnails, weights, karats, pricing rules, stock counts.
*   **Filters:** Filter by Karat, Category, Stock Level, and Visibility.
*   **Bulk Actions:** Bulk update gold workmanship margins, Bulk delete, Bulk toggle visibility.
*   **Primary Actions:** "Add Product".
*   **Related APIs:** `GET /api/admin/products`, `POST /api/admin/products/bulk`.

### Media Library
*   **Route:** `/admin/media`
*   **Purpose:** Centralized asset management panel.
*   **Business Goal:** Store, optimize, and organize branding and product images.
*   **Target User:** Owner, Admin, Editor.
*   **Main Sections:** Directory folder tree panel, Upload zone, Asset Details sidebar.
*   **Primary Actions:** "Upload Files" (multi-select), "New Folder".
*   **Data Sources:** Supabase Storage APIs.

### Audit Logs Console
*   **Route:** `/admin/audit-logs`
*   **Purpose:** Security ledger capturing all database and setup changes.
*   **Business Goal:** Maintain security logs and trace errors.
*   **Target User:** Owner only.
*   **Access Permissions:** Owner role.
*   **Tables:** Immutable audit table mapping timestamps, operator accounts, actions, targets, and before/after details.
*   **Related APIs:** `GET /api/admin/audit-logs`.

---

## 4. Settings Configuration Namespace

Isolated dashboard paths under `/admin/settings/*` managing key settings.

### General Settings (`/admin/settings/general`)
*   **Purpose:** Configure basic storefront parameters: Name, Logo, Favicon, Contact Info, Social Media lists.
*   **Business Goal:** Quick store updates.
*   **Target User:** Owner, Admin.

### Pricing Configuration (`/admin/settings/pricing`)
*   **Purpose:** Set manual gold base rates per gram per karat (24K, 22K, 18K) and standard profit margins.
*   **Business Goal:** Directly control product prices to react to market changes.
*   **Target User:** Owner, Admin.
*   **Forms:** Karat input table, markup factor inputs.
*   **Primary Actions:** "Save and Re-calculate Catalog Prices".

### Backup Settings (`/admin/settings/backup`)
*   **Purpose:** Plan database snapshot frequencies, configure storage rules, and run manual restorations.
*   **Business Goal:** Prevent data loss and enable quick recovery.
*   **Target User:** Owner only.

---

## 5. System Error Page Layouts

System pages provide clear instructions when requests fail or sites undergo updates.

### Forbidden / Access Denied (`/403`)
*   **Purpose:** Displayed when active user privileges do not match page authorization requirements.
*   **Target User:** Blocked administrators.
*   **Access Permissions:** Public fallback.
*   **Primary Actions:** "Return to Dashboard", "Switch Account".

### Not Found (`/404`)
*   **Purpose:** Displayed when a URL path does not map to active routes.
*   **Primary Actions:** "Go to Homepage", "Search Catalog".
