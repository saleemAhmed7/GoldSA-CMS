import { createClient as createBrowserClient } from "@/lib/supabase/client";
import { compressImage } from "@/lib/utils/image-processor";

export interface UploadResult {
  success: boolean;
  publicUrl?: string;
  storagePath?: string;
  error?: string;
}

/**
 * Uploads a product image directly to the Supabase Storage 'products' bucket under folder `products/{productId}/`.
 * Automatically resizes to max 2000px width and converts to WebP format.
 */
export async function uploadProductImage(
  productId: string,
  file: File,
  sortOrder: number = 0
): Promise<UploadResult> {
  try {
    const supabase = createBrowserClient();

    // 1. Client-side Image Compression (Max 2000px width, WebP format)
    const { blob, fileName } = await compressImage(file, {
      maxWidth: 2000,
      maxHeight: 2000,
      quality: 0.85,
      mimeType: "image/webp",
    });

    // 2. Storage Folder Hierarchy: products/{productId}/image-001-timestamp.webp
    const indexStr = String(sortOrder + 1).padStart(3, "0");
    const timestamp = Date.now();
    const storagePath = `${productId}/image-${indexStr}-${timestamp}.webp`;

    // 3. Upload File to Supabase Storage Bucket 'products'
    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(storagePath, blob, {
        contentType: "image/webp",
        cacheControl: "360000",
        upsert: true,
      });

    if (uploadError) {
      const isNetworkErr = uploadError.message?.includes("fetch");
      const errorMsg = isNetworkErr
        ? `Storage Network Error: Unable to reach Supabase Storage endpoint (Failed to fetch). Verify your NEXT_PUBLIC_SUPABASE_URL configuration.`
        : uploadError.message;

      console.error("❌ Supabase Storage Upload Error:", uploadError.message || uploadError);
      return { success: false, error: errorMsg };
    }

    // 4. Generate Public URL
    const { data: publicUrlData } = supabase.storage
      .from("products")
      .getPublicUrl(storagePath);

    console.log("✅ Supabase Storage Upload Succeeded:", publicUrlData.publicUrl);

    return {
      success: true,
      publicUrl: publicUrlData.publicUrl,
      storagePath,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to upload image to Supabase Storage";
    console.error("❌ Storage Upload Catch Exception:", msg);
    return { success: false, error: msg };
  }
}

/**
 * Deletes a single image file from Supabase Storage 'products' bucket by storage path.
 */
export async function deleteStorageFile(storagePath: string): Promise<boolean> {
  try {
    const supabase = createBrowserClient();
    const { error } = await supabase.storage.from("products").remove([storagePath]);
    if (error) {
      console.error("❌ Delete Storage File Error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("❌ Delete Storage File Exception:", err);
    return false;
  }
}

/**
 * Removes all file objects inside `products/{productId}/` folder from Supabase Storage.
 */
export async function deleteProductStorageFolder(productId: string): Promise<boolean> {
  try {
    const supabase = createBrowserClient();

    // List all objects inside folder {productId}
    const { data: files, error: listError } = await supabase.storage
      .from("products")
      .list(productId);

    if (listError || !files || files.length === 0) {
      return true;
    }

    const pathsToDelete = files.map((file) => `${productId}/${file.name}`);
    const { error: removeError } = await supabase.storage
      .from("products")
      .remove(pathsToDelete);

    if (removeError) {
      console.error("❌ Delete Storage Folder Error:", removeError.message);
      return false;
    }

    console.log(`✅ Storage folder ${productId}/ cleaned up successfully (${pathsToDelete.length} files removed).`);
    return true;
  } catch (err) {
    console.error("❌ Delete Storage Folder Exception:", err);
    return false;
  }
}
