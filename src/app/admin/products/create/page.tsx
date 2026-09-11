"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductForm, createSupabaseProduct, type Product } from "@/features/products";
import { Alert } from "@/components/ui";

export default function CreateProductPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave(productData: Partial<Product>) {
    setErrorMessage(null);
    setIsSaving(true);
    const result = await createSupabaseProduct(productData);
    setIsSaving(false);

    if (!result.success) {
      const err = result.error || "Failed to insert product into Supabase database.";
      console.error("❌ Supabase INSERT Failed:", err, { productData });
      setErrorMessage(err);
      return; // DO NOT REDIRECT on failure!
    }

    console.log("✅ Product inserted successfully into Supabase:", result.data);
    router.push("/admin/products");
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {errorMessage && (
        <Alert variant="error" size="md" title="Supabase Database Insert Error">
          <div className="font-mono text-body-small break-all mt-1">
            {errorMessage}
          </div>
        </Alert>
      )}
      <ProductForm onSave={handleSave} isEditMode={false} isSaving={isSaving} />
    </div>
  );
}
