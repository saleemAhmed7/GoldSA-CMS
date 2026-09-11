"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/providers/language-provider";
import { Alert, Button, Card, Dialog, Typography } from "@/components/ui";
import { ProductForm, deleteSupabaseProduct, fetchSupabaseProductById, updateSupabaseProduct, type Product } from "@/features/products";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { language, t } = useLanguage();

  const [existingProduct, setExistingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Delete Workflow State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const product = await fetchSupabaseProductById(resolvedParams.id, language);
      setExistingProduct(product);
      setIsLoading(false);
    }
    loadData();
  }, [resolvedParams.id, language]);

  async function handleSave(productData: Partial<Product>) {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSaving(true);

    const result = await updateSupabaseProduct(resolvedParams.id, productData);
    setIsSaving(false);

    if (!result.success) {
      const err = result.error || "Failed to update product in Supabase database.";
      console.error("❌ Supabase UPDATE Failed:", err, { productData });
      setErrorMessage(err);
      return;
    }

    // Show success toast / alert
    const msg = t("productUpdated") || "Product details updated successfully in Supabase database.";
    setSuccessMessage(msg);
    console.log("✅ Product updated successfully in Supabase ID:", resolvedParams.id);

    // Refresh product data from Supabase to keep state in sync
    const refreshedProduct = await fetchSupabaseProductById(resolvedParams.id, language);
    if (refreshedProduct) {
      setExistingProduct(refreshedProduct);
    }
  }

  async function handleConfirmDelete() {
    if (!existingProduct) return;
    setIsDeleting(true);
    setErrorMessage(null);

    const result = await deleteSupabaseProduct(existingProduct.id);
    setIsDeleting(false);

    if (!result.success) {
      const err = result.error || "Failed to delete product from Supabase";
      console.error("❌ Delete product error:", err);
      setErrorMessage(err);
      return;
    }

    router.push("/admin/products");
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 gap-3">
        <div className="size-6 border-2 border-brand-gold-polished border-t-transparent rounded-full animate-spin" />
        <Typography variant="bodySmall" tone="muted">
          Loading product from Supabase...
        </Typography>
      </div>
    );
  }

  if (!existingProduct) {
    return (
      <Card variant="standard" size="md" className="p-8 text-center border-border bg-surface shadow-flat">
        <Typography variant="h2" className="text-foreground font-display font-semibold mb-2">
          Product Not Found
        </Typography>
        <Button variant="outline" size="sm" onClick={() => router.push("/admin/products")}>
          {t("backToProducts")}
        </Button>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {successMessage && (
        <Alert variant="success" size="md" title="Success">
          <div className="text-body-small mt-0.5">{successMessage}</div>
        </Alert>
      )}

      {errorMessage && (
        <Alert variant="error" size="md" title="Supabase Database Error">
          <div className="font-mono text-body-small break-all mt-1">
            {errorMessage}
          </div>
        </Alert>
      )}

      <ProductForm
        initialProduct={existingProduct}
        onSave={handleSave}
        onDelete={() => setIsDeleteDialogOpen(true)}
        isEditMode={true}
        isSaving={isSaving}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          if (!isDeleting) setIsDeleteDialogOpen(false);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        description={
          <span>
            Are you sure you want to permanently delete{" "}
            <strong className="text-foreground font-semibold">&quot;{existingProduct.title}&quot;</strong>? This action will remove the product and its images from Supabase and cannot be undone.
          </span>
        }
        confirmLabel="Delete Product"
        cancelLabel="Cancel"
        isDestructive={true}
        isLoading={isDeleting}
      />
    </div>
  );
}
