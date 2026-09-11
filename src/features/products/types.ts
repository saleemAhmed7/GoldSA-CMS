export type GoldKarat = "24K" | "22K" | "18K";

export type ProductCategory =
  | "rings"
  | "bangles"
  | "necklaces"
  | "earrings"
  | "bracelets"
  | "bullion"
  | "sets";

export type ProductStatus = "active" | "draft" | "archived";

export interface ProductVariantOption {
  name: string; // e.g., "Ring Size", "Metal Finish"
  value: string; // e.g., "54 (EU)", "Polished Gold"
}

export interface ProductVariant {
  id: string;
  sku: string;
  title: string;
  weightGrams: number;
  laborFeeTRY: number;
  additionalCostTRY?: number;
  stockQuantity: number;
  options: ProductVariantOption[];
  isDefault?: boolean;
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  description: string;
  category: ProductCategory;
  karat: GoldKarat;
  weightGrams: number;
  laborFeeTRY: number; // Labor / Craftsmanship markup fee per item or gram
  additionalCostTRY?: number; // Gemstones, diamond accents, or certification cost
  stockQuantity: number;
  lowStockThreshold: number;
  status: ProductStatus;
  isDeleted: boolean; // Soft delete flag
  isVisible: boolean; // Storefront visibility
  isFeatured: boolean; // Homepage/featured showcase
  images: string[]; // Primary image is images[0]
  giaCertificateNo?: string;
  variants?: ProductVariant[]; // Future-proof product variants architecture
  createdAt: string;
  updatedAt: string;
}

export interface GoldSpotRatesTRY {
  "24K": number; // default 3150 TRY/gram
  "22K": number; // default 2888 TRY/gram
  "18K": number; // default 2362 TRY/gram
}

export const DEFAULT_GOLD_RATES: GoldSpotRatesTRY = {
  "24K": 3150,
  "22K": 2888,
  "18K": 2362,
};

/**
 * Dynamically computes product total price in TRY from gold spot rates, weight, labor, and extra costs.
 */
export function calculateProductPriceTRY(
  product: Pick<Product, "karat" | "weightGrams" | "laborFeeTRY" | "additionalCostTRY">,
  customRates?: GoldSpotRatesTRY,
): number {
  const rates = customRates || DEFAULT_GOLD_RATES;
  const baseRatePerGram = rates[product.karat] || rates["24K"];
  const goldContentCost = baseRatePerGram * (product.weightGrams || 0);
  const laborCost = product.laborFeeTRY || 0;
  const extraCost = product.additionalCostTRY || 0;
  return Math.round(goldContentCost + laborCost + extraCost);
}

export interface ProductFilters {
  search: string;
  category: string; // "all" | ProductCategory
  karat: string; // "all" | GoldKarat
  status: string; // "all" | ProductStatus
  stockLevel: string; // "all" | "in_stock" | "low_stock" | "out_of_stock"
  showDeleted: boolean;
}

export type ProductSortField = "title" | "price" | "stock" | "weight" | "createdAt";
export type SortOrder = "asc" | "desc";
