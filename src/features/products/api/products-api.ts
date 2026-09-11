import { createClient as createBrowserClient, getSupabaseConfig } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import type { Product, ProductCategory } from "../types";
import { deleteProductStorageFolder } from "./products-storage";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type ProductImageRow = Database["public"]["Tables"]["product_images"]["Row"];

/**
 * Maps a Supabase database row into the internal Product UI model based on active language direction.
 */
export function mapSupabaseProductToUI(
  row: ProductRow,
  imagesMap: Record<string, string[]> = {},
  lang: "ar" | "tr" | "en" = "en"
): Product {
  let title = row.title_en;
  let description = row.description_en || "";

  if (lang === "ar") {
    title = row.title_ar || row.title_en;
    description = row.description_ar || row.description_en || "";
  } else if (lang === "tr") {
    title = row.title_tr || row.title_en;
    description = row.description_tr || row.description_en || "";
  }

  const productImages = imagesMap[row.id] && imagesMap[row.id].length > 0
    ? imagesMap[row.id]
    : ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"];

  return {
    id: row.id,
    sku: row.sku,
    title,
    description,
    category: (row.category_id ? "rings" : "rings") as ProductCategory,
    karat: row.karat as "24K" | "22K" | "18K",
    weightGrams: Number(row.weight_grams),
    laborFeeTRY: Number(row.labor_fee_try),
    additionalCostTRY: Number(row.additional_cost_try || 0),
    stockQuantity: row.stock_quantity,
    lowStockThreshold: row.low_stock_threshold || 3,
    status: row.status,
    isVisible: row.is_visible,
    isFeatured: row.is_featured,
    giaCertificateNo: row.gia_certificate_no || undefined,
    images: productImages,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    isDeleted: Boolean(row.deleted_at),
  };
}

/**
 * Fetches products list exclusively from Supabase `products` and `product_images` tables.
 * Returns empty array if database has 0 products.
 */
export async function fetchSupabaseProducts(lang: "ar" | "tr" | "en" = "en"): Promise<{
  products: Product[];
  isFromSupabase: boolean;
  error?: string;
}> {
  try {
    const supabase = createBrowserClient();
    
    // Fetch products from Supabase
    const { data: dbProducts, error: prodError } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (prodError) {
      // Clean handling for unconfigured or error states
      return {
        products: [],
        isFromSupabase: false,
      };
    }

    if (!dbProducts || dbProducts.length === 0) {
      return {
        products: [],
        isFromSupabase: true,
      };
    }

    // Fetch product images
    const { data: dbImages } = await supabase
      .from("product_images")
      .select("*")
      .order("sort_order", { ascending: true });

    const imagesMap: Record<string, string[]> = {};
    if (dbImages) {
      dbImages.forEach((img: ProductImageRow) => {
        if (!imagesMap[img.product_id]) {
          imagesMap[img.product_id] = [];
        }
        imagesMap[img.product_id].push(img.url);
      });
    }

    const mappedProducts = dbProducts.map((row: ProductRow) =>
      mapSupabaseProductToUI(row, imagesMap, lang)
    );

    return {
      products: mappedProducts,
      isFromSupabase: true,
    };
  } catch {
    return {
      products: [],
      isFromSupabase: false,
    };
  }
}

/**
 * Fetches a single product by ID from Supabase `products` table.
 */
export async function fetchSupabaseProductById(
  id: string,
  lang: "ar" | "tr" | "en" = "en"
): Promise<Product | null> {
  try {
    const supabase = createBrowserClient();

    const { data: row, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !row) {
      return null;
    }

    const { data: dbImages } = await supabase
      .from("product_images")
      .select("*")
      .eq("product_id", id)
      .order("sort_order", { ascending: true });

    const images = dbImages && dbImages.length > 0
      ? dbImages.map((img: ProductImageRow) => img.url)
      : ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"];

    return mapSupabaseProductToUI(row, { [id]: images }, lang);
  } catch {
    return null;
  }
}

/**
 * Inserts a new product into Supabase `products` and `product_images` tables.
 */
export async function createSupabaseProduct(
  productData: Partial<Product>
): Promise<{ success: boolean; data?: ProductRow; error?: string }> {
  const config = getSupabaseConfig();

  if (!config.isConfigured) {
    const missingErr =
      "Supabase environment variables are missing in .env.local! Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY with your project credentials.";
    console.error("❌ Supabase Configuration Missing:", missingErr);
    return { success: false, error: missingErr };
  }

  try {
    const supabase = createBrowserClient();

    const newProductPayload = {
      sku: productData.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      slug: (productData.title || "jewelry").toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now(),
      title_ar: productData.title || "قطعة مجوهرات جديدة",
      title_tr: productData.title || "Yeni Mücevher",
      title_en: productData.title || "New Jewelry Item",
      description_ar: productData.description || "",
      description_tr: productData.description || "",
      description_en: productData.description || "",
      karat: productData.karat || "18K",
      weight_grams: productData.weightGrams || 5.0,
      labor_fee_try: productData.laborFeeTRY || 3500,
      additional_cost_try: productData.additionalCostTRY || 0,
      stock_quantity: productData.stockQuantity ?? 10,
      low_stock_threshold: productData.lowStockThreshold ?? 3,
      status: productData.status || "active",
      is_visible: productData.isVisible ?? true,
      is_featured: productData.isFeatured ?? false,
      gia_certificate_no: productData.giaCertificateNo || null,
    };

    console.log(`📡 Sending POST request to Supabase Endpoint: ${config.url}/rest/v1/products`);

    const { data, error } = await supabase
      .from("products")
      .insert(newProductPayload)
      .select()
      .single();

    if (error) {
      const isNetworkErr = error.message?.includes("fetch") || error.message?.includes("Failed") || !error.code;
      const formattedMessage = isNetworkErr
        ? `Supabase Network Error: Unable to connect to project endpoint (${config.url}). Please check your connection or verify NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local.`
        : [error.message, error.details, error.hint].filter(Boolean).join(" | ");

      console.error("❌ Supabase REST Error Response:", {
        message: error.message || "Failed to fetch",
        code: error.code || "PGRST_NETWORK_ERROR",
        details: error.details || `Failed to connect to ${config.url}/rest/v1/products`,
        hint: error.hint || "Check .env.local Supabase credentials and network connectivity",
        requestUrl: `${config.url}/rest/v1/products`,
      });

      return { success: false, error: formattedMessage };
    }

    // Insert Product Images if provided
    if (data && productData.images && productData.images.length > 0) {
      const imageRecords = productData.images.map((url, sort_order) => ({
        product_id: data.id,
        url,
        is_primary: sort_order === 0,
        sort_order,
      }));

      await supabase.from("product_images").insert(imageRecords);
    }

    console.log("✅ Supabase INSERT Succeeded:", data);
    return { success: true, data };
  } catch (err) {
    const netErr = err instanceof Error ? err.message : String(err);
    console.error("❌ Network Fetch Error:", {
      targetUrl: `${config.url}/rest/v1/products`,
      error: netErr,
    });
    return {
      success: false,
      error: `Network Error: Unable to connect to Supabase project at ${config.url} (${netErr})`,
    };
  }
}

/**
 * Updates an existing product in Supabase `products` table.
 */
export async function updateSupabaseProduct(
  id: string,
  productData: Partial<Product>
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createBrowserClient();

    const updatePayload = {
      sku: productData.sku,
      title_ar: productData.title,
      title_tr: productData.title,
      title_en: productData.title,
      description_ar: productData.description,
      description_tr: productData.description,
      description_en: productData.description,
      karat: productData.karat,
      weight_grams: productData.weightGrams,
      labor_fee_try: productData.laborFeeTRY,
      additional_cost_try: productData.additionalCostTRY,
      stock_quantity: productData.stockQuantity,
      low_stock_threshold: productData.lowStockThreshold,
      status: productData.status,
      is_visible: productData.isVisible,
      is_featured: productData.isFeatured,
      gia_certificate_no: productData.giaCertificateNo || null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("products")
      .update(updatePayload)
      .eq("id", id);

    if (error) {
      console.error("❌ Supabase Product Update Error:", error);
      return { success: false, error: error.message };
    }

    // Update Product Images if provided
    if (productData.images) {
      await supabase.from("product_images").delete().eq("product_id", id);

      if (productData.images.length > 0) {
        const imageRecords = productData.images.map((url, sort_order) => ({
          product_id: id,
          url,
          is_primary: sort_order === 0,
          sort_order,
        }));
        await supabase.from("product_images").insert(imageRecords);
      }
    }

    console.log("✅ Supabase UPDATE Succeeded for ID:", id);
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update product in Supabase",
    };
  }
}

/**
 * Deletes a product and its associated product_images from Supabase.
 */
export async function deleteSupabaseProduct(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createBrowserClient();

    // 1. Clean up entire product folder in Supabase Storage
    await deleteProductStorageFolder(id);

    // 2. Explicitly delete related product_images records
    await supabase.from("product_images").delete().eq("product_id", id);

    // 3. Delete product row from products table
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("❌ Supabase Product Delete Error:", error);
      return { success: false, error: error.message };
    }

    console.log("✅ Supabase DELETE Succeeded for ID:", id);
    return { success: true };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Failed to delete product from Supabase";
    console.error("❌ Supabase DELETE Catch Exception:", errorMsg);
    return { success: false, error: errorMsg };
  }
}

/**
 * Soft-deletes a product by setting `deleted_at = NOW()`.
 */
export async function softDeleteSupabaseProduct(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createBrowserClient();
    const { error } = await supabase
      .from("products")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Soft delete failed" };
  }
}

/**
 * Restores a soft-deleted product by setting `deleted_at = NULL`.
 */
export async function restoreSupabaseProduct(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createBrowserClient();
    const { error } = await supabase
      .from("products")
      .update({ deleted_at: null })
      .eq("id", id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Restore failed" };
  }
}

/**
 * Bulk soft-deletes multiple products by setting `deleted_at = NOW()`.
 */
export async function bulkSoftDeleteProducts(ids: string[]): Promise<{ success: boolean; error?: string }> {
  if (ids.length === 0) return { success: true };
  try {
    const supabase = createBrowserClient();
    const { error } = await supabase
      .from("products")
      .update({ deleted_at: new Date().toISOString() })
      .in("id", ids);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Bulk soft delete failed" };
  }
}

/**
 * Bulk restores multiple soft-deleted products by setting `deleted_at = NULL`.
 */
export async function bulkRestoreProducts(ids: string[]): Promise<{ success: boolean; error?: string }> {
  if (ids.length === 0) return { success: true };
  try {
    const supabase = createBrowserClient();
    const { error } = await supabase
      .from("products")
      .update({ deleted_at: null })
      .in("id", ids);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Bulk restore failed" };
  }
}

/**
 * Bulk updates visibility for multiple products.
 */
export async function bulkUpdateVisibility(
  ids: string[],
  isVisible: boolean
): Promise<{ success: boolean; error?: string }> {
  if (ids.length === 0) return { success: true };
  try {
    const supabase = createBrowserClient();
    const { error } = await supabase
      .from("products")
      .update({ is_visible: isVisible })
      .in("id", ids);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Bulk visibility update failed" };
  }
}

/**
 * Bulk updates status for multiple products.
 */
export async function bulkUpdateStatus(
  ids: string[],
  status: "active" | "draft" | "archived"
): Promise<{ success: boolean; error?: string }> {
  if (ids.length === 0) return { success: true };
  try {
    const supabase = createBrowserClient();
    const { error } = await supabase
      .from("products")
      .update({ status })
      .in("id", ids);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Bulk status update failed" };
  }
}

/**
 * Bulk updates featured state for multiple products.
 */
export async function bulkUpdateFeatured(
  ids: string[],
  isFeatured: boolean
): Promise<{ success: boolean; error?: string }> {
  if (ids.length === 0) return { success: true };
  try {
    const supabase = createBrowserClient();
    const { error } = await supabase
      .from("products")
      .update({ is_featured: isFeatured })
      .in("id", ids);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Bulk featured update failed" };
  }
}
