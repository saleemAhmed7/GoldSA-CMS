# GoldSA CMS — Database Architecture Specification

## Overview
This document specifies the complete, production-ready PostgreSQL relational database schema for the GoldSA CMS luxury jewelry platform. The design is optimized for high performance, multi-currency dynamic gold pricing calculations, auditability, role-based access control (RBAC), and future scalability.

---

## Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    users ||--o{ user_roles : "assigned"
    roles ||--o{ user_roles : "has"
    roles ||--o{ role_permissions : "granted"
    permissions ||--o{ role_permissions : "defines"
    
    categories ||--o{ categories : "sub_category"
    categories ||--o{ products : "contains"
    suppliers ||--o{ products : "supplies"
    
    products ||--o{ product_images : "gallery"
    products ||--o{ product_variants : "has"
    products ||--o{ inventory : "tracks"
    product_variants ||--o{ inventory : "tracks_variant"
    
    customers ||--o{ orders : "places"
    users ||--o? customers : "linked_user"
    
    orders ||--o{ order_items : "contains"
    products ||--o{ order_items : "purchased"
    product_variants ||--o{ order_items : "purchased_variant"
    
    users ||--o{ audit_logs : "performs"
    users ||--o{ inventory : "operates"
```

---

## Core Tables Specification

### 1. `users`
System operators, administrators, and store staff.
- `id` (UUID, Primary Key)
- `email` (VARCHAR(255), Unique, Not Null)
- `full_name` (VARCHAR(255), Not Null)
- `phone` (VARCHAR(50))
- `avatar_url` (TEXT)
- `status` (VARCHAR(20), Default 'active' - CHECK: active, suspended, inactive)
- `last_login_at` (TIMESTAMPTZ)
- `created_at` (TIMESTAMPTZ, Default now())
- `updated_at` (TIMESTAMPTZ, Default now())
- `deleted_at` (TIMESTAMPTZ)

### 2. `roles`
Role definitions for RBAC (e.g. Super Admin, Jewelry Operator, Auditor).
- `id` (UUID, Primary Key)
- `name` (VARCHAR(50), Unique, Not Null)
- `description` (TEXT)
- `created_at` (TIMESTAMPTZ, Default now())
- `updated_at` (TIMESTAMPTZ, Default now())

### 3. `permissions`
Granular permission actions across system modules.
- `id` (UUID, Primary Key)
- `name` (VARCHAR(100), Unique, Not Null) -- e.g., 'products:create'
- `module` (VARCHAR(50), Not Null)
- `description` (TEXT)
- `created_at` (TIMESTAMPTZ, Default now())
- `updated_at` (TIMESTAMPTZ, Default now())

### 4. `user_roles`
Junction table for user role assignments.
- `id` (UUID, Primary Key)
- `user_id` (UUID, FK -> `users.id` ON DELETE CASCADE)
- `role_id` (UUID, FK -> `roles.id` ON DELETE CASCADE)
- `created_at` (TIMESTAMPTZ, Default now())
- `updated_at` (TIMESTAMPTZ, Default now())
- Constraint: UNIQUE(user_id, role_id)

### 5. `role_permissions`
Junction table linking permissions to roles.
- `id` (UUID, Primary Key)
- `role_id` (UUID, FK -> `roles.id` ON DELETE CASCADE)
- `permission_id` (UUID, FK -> `permissions.id` ON DELETE CASCADE)
- `created_at` (TIMESTAMPTZ, Default now())
- `updated_at` (TIMESTAMPTZ, Default now())
- Constraint: UNIQUE(role_id, permission_id)

### 6. `categories`
Hierarchical jewelry categories (Rings, Bangles, Necklaces, Bullion, etc.) with multi-language support.
- `id` (UUID, Primary Key)
- `parent_id` (UUID, Self FK -> `categories.id` ON DELETE SET NULL)
- `slug` (VARCHAR(100), Unique, Not Null)
- `name_ar` (VARCHAR(150), Not Null)
- `name_tr` (VARCHAR(150), Not Null)
- `name_en` (VARCHAR(150), Not Null)
- `description_ar` (TEXT)
- `description_tr` (TEXT)
- `description_en` (TEXT)
- `image_url` (TEXT)
- `sort_order` (INT, Default 0)
- `is_active` (BOOLEAN, Default true)
- `created_at` (TIMESTAMPTZ, Default now())
- `updated_at` (TIMESTAMPTZ, Default now())
- `deleted_at` (TIMESTAMPTZ)

### 7. `suppliers`
Jewelry craft workshops, refineries, and diamond certifiers.
- `id` (UUID, Primary Key)
- `name` (VARCHAR(255), Not Null)
- `code` (VARCHAR(50), Unique, Not Null)
- `contact_person` (VARCHAR(150))
- `email` (VARCHAR(255))
- `phone` (VARCHAR(50))
- `address` (TEXT)
- `city` (VARCHAR(100))
- `country` (VARCHAR(100))
- `tax_id` (VARCHAR(100))
- `created_at` (TIMESTAMPTZ, Default now())
- `updated_at` (TIMESTAMPTZ, Default now())
- `deleted_at` (TIMESTAMPTZ)

### 8. `products`
Core jewelry catalog item metadata (Dynamic pricing: spot rates + weight + labor).
- `id` (UUID, Primary Key)
- `category_id` (UUID, FK -> `categories.id` ON DELETE RESTRICT)
- `supplier_id` (UUID, FK -> `suppliers.id` ON DELETE SET NULL)
- `sku` (VARCHAR(100), Unique, Not Null)
- `slug` (VARCHAR(255), Unique, Not Null)
- `title_ar` (VARCHAR(255), Not Null)
- `title_tr` (VARCHAR(255), Not Null)
- `title_en` (VARCHAR(255), Not Null)
- `description_ar` (TEXT)
- `description_tr` (TEXT)
- `description_en` (TEXT)
- `karat` (VARCHAR(10), Not Null - CHECK: '24K', '22K', '18K', '14K')
- `weight_grams` (NUMERIC(10,3), Not Null - CHECK: > 0)
- `labor_fee_try` (NUMERIC(12,2), Not Null, Default 0.00)
- `additional_cost_try` (NUMERIC(12,2), Default 0.00)
- `stock_quantity` (INT, Not Null, Default 0 - CHECK: >= 0)
- `low_stock_threshold` (INT, Default 3)
- `status` (VARCHAR(20), Default 'active' - CHECK: draft, active, archived)
- `is_visible` (BOOLEAN, Default true)
- `is_featured` (BOOLEAN, Default false)
- `gia_certificate_no` (VARCHAR(100))
- `created_at` (TIMESTAMPTZ, Default now())
- `updated_at` (TIMESTAMPTZ, Default now())
- `deleted_at` (TIMESTAMPTZ)

### 9. `product_images`
Product photo gallery with primary showcase flags.
- `id` (UUID, Primary Key)
- `product_id` (UUID, FK -> `products.id` ON DELETE CASCADE)
- `url` (TEXT, Not Null)
- `alt_text` (VARCHAR(255))
- `is_primary` (BOOLEAN, Default false)
- `sort_order` (INT, Default 0)
- `created_at` (TIMESTAMPTZ, Default now())
- `updated_at` (TIMESTAMPTZ, Default now())

### 10. `product_variants`
Product options (sizes, finishes, weights) supporting multi-variant inventory.
- `id` (UUID, Primary Key)
- `product_id` (UUID, FK -> `products.id` ON DELETE CASCADE)
- `sku` (VARCHAR(100), Unique, Not Null)
- `title` (VARCHAR(255), Not Null)
- `weight_grams` (NUMERIC(10,3), Not Null)
- `labor_fee_try` (NUMERIC(12,2), Not Null)
- `additional_cost_try` (NUMERIC(12,2), Default 0.00)
- `stock_quantity` (INT, Not Null, Default 0)
- `options` (JSONB) -- e.g., {"ring_size": "54", "finish": "Polished"}
- `created_at` (TIMESTAMPTZ, Default now())
- `updated_at` (TIMESTAMPTZ, Default now())
- `deleted_at` (TIMESTAMPTZ)

### 11. `inventory`
Vault stock movements and audit ledger.
- `id` (UUID, Primary Key)
- `product_id` (UUID, FK -> `products.id` ON DELETE RESTRICT)
- `variant_id` (UUID, FK -> `product_variants.id` ON DELETE RESTRICT)
- `location` (VARCHAR(100), Default 'Main Vault')
- `movement_type` (VARCHAR(20), Not Null - CHECK: stock_in, stock_out, reservation, adjustment, return)
- `quantity` (INT, Not Null)
- `reference_no` (VARCHAR(100))
- `performed_by` (UUID, FK -> `users.id` ON DELETE SET NULL)
- `notes` (TEXT)
- `created_at` (TIMESTAMPTZ, Default now())
- `updated_at` (TIMESTAMPTZ, Default now())

### 12. `customers`
VIP and retail customer ledger.
- `id` (UUID, Primary Key)
- `user_id` (UUID, FK -> `users.id` ON DELETE SET NULL)
- `full_name` (VARCHAR(255), Not Null)
- `email` (VARCHAR(255))
- `phone` (VARCHAR(50))
- `vip_tier` (VARCHAR(20), Default 'standard' - CHECK: standard, gold, vip_black)
- `address_line` (TEXT)
- `city` (VARCHAR(100))
- `country` (VARCHAR(100))
- `total_orders_count` (INT, Default 0)
- `total_spent_try` (NUMERIC(14,2), Default 0.00)
- `created_at` (TIMESTAMPTZ, Default now())
- `updated_at` (TIMESTAMPTZ, Default now())
- `deleted_at` (TIMESTAMPTZ)

### 13. `orders`
Customer purchases and custom craftsmanship orders.
- `id` (UUID, Primary Key)
- `order_no` (VARCHAR(50), Unique, Not Null)
- `customer_id` (UUID, FK -> `customers.id` ON DELETE RESTRICT)
- `currency_code` (VARCHAR(10), Default 'TRY')
- `fx_rate_to_try` (NUMERIC(10,4), Default 1.0000)
- `subtotal_amount` (NUMERIC(14,2), Not Null)
- `tax_amount` (NUMERIC(14,2), Default 0.00)
- `discount_amount` (NUMERIC(14,2), Default 0.00)
- `total_amount` (NUMERIC(14,2), Not Null)
- `order_status` (VARCHAR(30), Default 'pending' - CHECK: pending, processing, fulfillment, shipped, completed, cancelled)
- `payment_status` (VARCHAR(30), Default 'pending' - CHECK: pending, verified, refunded, failed)
- `shipping_address` (TEXT)
- `notes` (TEXT)
- `created_at` (TIMESTAMPTZ, Default now())
- `updated_at` (TIMESTAMPTZ, Default now())
- `deleted_at` (TIMESTAMPTZ)

### 14. `order_items`
Purchased items with price and gold weight snapshot at order creation time.
- `id` (UUID, Primary Key)
- `order_id` (UUID, FK -> `orders.id` ON DELETE CASCADE)
- `product_id` (UUID, FK -> `products.id` ON DELETE RESTRICT)
- `variant_id` (UUID, FK -> `product_variants.id` ON DELETE RESTRICT)
- `title_snapshot` (VARCHAR(255), Not Null)
- `sku_snapshot` (VARCHAR(100), Not Null)
- `karat_snapshot` (VARCHAR(10), Not Null)
- `weight_grams_snapshot` (NUMERIC(10,3), Not Null)
- `unit_price_try` (NUMERIC(12,2), Not Null)
- `quantity` (INT, Default 1)
- `total_price_try` (NUMERIC(14,2), Not Null)
- `created_at` (TIMESTAMPTZ, Default now())
- `updated_at` (TIMESTAMPTZ, Default now())

### 15. `gold_rates`
Historical base market spot rates log per gram.
- `id` (UUID, Primary Key)
- `rate_24k_try` (NUMERIC(12,2), Not Null)
- `rate_22k_try` (NUMERIC(12,2), Not Null)
- `rate_18k_try` (NUMERIC(12,2), Not Null)
- `gold_usd_per_ounce` (NUMERIC(12,2), Not Null)
- `usd_try_fx_rate` (NUMERIC(10,4), Not Null)
- `source` (VARCHAR(50), Default 'goldapi.io')
- `is_live` (BOOLEAN, Default true)
- `created_at` (TIMESTAMPTZ, Default now())
- `updated_at` (TIMESTAMPTZ, Default now())

### 16. `currencies`
Multicurrency management (TRY, USD, SAR).
- `id` (UUID, Primary Key)
- `code` (VARCHAR(10), Unique, Not Null)
- `name` (VARCHAR(50), Not Null)
- `symbol` (VARCHAR(10), Not Null)
- `fx_rate_to_try` (NUMERIC(12,6), Default 1.000000)
- `is_active` (BOOLEAN, Default true)
- `is_base` (BOOLEAN, Default false)
- `created_at` (TIMESTAMPTZ, Default now())
- `updated_at` (TIMESTAMPTZ, Default now())

### 17. `settings`
System global key-value configuration.
- `id` (UUID, Primary Key)
- `key` (VARCHAR(100), Unique, Not Null)
- `value` (JSONB, Not Null)
- `description` (TEXT)
- `category` (VARCHAR(50), Default 'general')
- `created_at` (TIMESTAMPTZ, Default now())
- `updated_at` (TIMESTAMPTZ, Default now())

### 18. `audit_logs`
Immutable compliance and security activity log.
- `id` (UUID, Primary Key)
- `user_id` (UUID, FK -> `users.id` ON DELETE SET NULL)
- `action` (VARCHAR(100), Not Null)
- `entity_type` (VARCHAR(50), Not Null)
- `entity_id` (UUID)
- `ip_address` (VARCHAR(45))
- `user_agent` (TEXT)
- `old_values` (JSONB)
- `new_values` (JSONB)
- `created_at` (TIMESTAMPTZ, Default now())
- `updated_at` (TIMESTAMPTZ, Default now())

---

## Recommended Performance Indexes

```sql
-- Product filtering & search indexes
CREATE INDEX idx_products_category ON products(category_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_karat_status ON products(karat, status) WHERE deleted_at IS NULL;
CREATE INDEX idx_products_created_at ON products(created_at DESC);

-- Inventory & variant lookup
CREATE INDEX idx_product_variants_product_id ON product_variants(product_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_inventory_product_id ON inventory(product_id);
CREATE INDEX idx_inventory_variant_id ON inventory(variant_id);

-- Order & Customer lookup
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(order_status, payment_status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);

-- Gold rates & Audit trails
CREATE INDEX idx_gold_rates_created_at ON gold_rates(created_at DESC);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
```
