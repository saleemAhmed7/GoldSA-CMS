"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/providers/language-provider";
import { useCurrency } from "@/components/providers/currency-provider";
import { useGoldPrice } from "@/components/providers/gold-price-provider";
import { Alert, Badge, Button, Card, Dialog, PriceDisplay, Typography } from "@/components/ui";
import { deleteSupabaseProduct, fetchSupabaseProductById } from "../api/products-api";
import { ProductStatusBadge } from "./product-status-badge";
import { calculateProductPriceTRY, type Product } from "../types";

export interface ProductDetailsViewProps {
  productId: string;
}

export function ProductDetailsView({ productId }: ProductDetailsViewProps) {
  const { t, language } = useLanguage();
  const { formatPrice } = useCurrency();
  const { rates } = useGoldPrice();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Delete Workflow State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true);
      const data = await fetchSupabaseProductById(productId, language);
      setProduct(data);
      setIsLoading(false);
    }
    loadProduct();
  }, [productId, language]);

  async function handleConfirmDelete() {
    if (!product) return;
    setIsDeleting(true);
    setDeleteError(null);

    const result = await deleteSupabaseProduct(product.id);
    setIsDeleting(false);

    if (!result.success) {
      const err = result.error || "Failed to delete product from Supabase";
      console.error("❌ Delete product error:", err);
      setDeleteError(err);
      return;
    }

    router.push("/admin/products");
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 gap-3">
        <div className="size-6 border-2 border-brand-gold-polished border-t-transparent rounded-full animate-spin" />
        <Typography variant="bodySmall" tone="muted">
          Loading product details from Supabase...
        </Typography>
      </div>
    );
  }

  if (!product) {
    return (
      <Card variant="standard" size="md" className="p-8 text-center border-border bg-surface shadow-flat">
        <Typography variant="h2" className="text-foreground font-display font-semibold mb-2">
          Product Not Found
        </Typography>
        <Typography variant="bodySmall" tone="muted" className="mb-6">
          The requested product ID does not exist in the database.
        </Typography>
        <Button variant="outline" size="sm" onClick={() => router.push("/admin/products")}>
          {t("backToProducts")}
        </Button>
      </Card>
    );
  }

  const dynamicPriceTRY = calculateProductPriceTRY(product, rates);
  const activeSpotRate = rates[product.karat] || rates["24K"];
  const goldContentCostTRY = activeSpotRate * product.weightGrams;

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto pb-16">
      {deleteError && (
        <Alert variant="error" size="md" title="Delete Product Error">
          <div className="font-mono text-body-small break-all mt-1">{deleteError}</div>
        </Alert>
      )}

      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Typography variant="h1" className="font-display font-semibold text-foreground">
              {product.title}
            </Typography>
            <ProductStatusBadge status={product.status} isDeleted={product.isDeleted} />
            <Badge variant="accent">{product.karat}</Badge>
          </div>
          <div className="flex items-center gap-3 mt-1 text-body-small text-muted font-mono">
            <span>SKU: {product.sku}</span>
            <span>•</span>
            <span className="capitalize">{product.category}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Button variant="outline" size="sm" onClick={() => router.push("/admin/products")}>
            {t("backToProducts")}
          </Button>
          <Link href={`/admin/products/${product.id}/edit`}>
            <Button variant="outline" size="sm">
              {t("editProduct")}
            </Button>
          </Link>
          <Button variant="danger" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
            Delete Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image Gallery & Description */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Main Gallery Display */}
          <Card variant="standard" size="sm" className="p-2 border-border bg-surface shadow-flat">
            <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-accent-subtle border border-border">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.title}
                className="size-full object-cover"
              />
            </div>

            {/* Thumbnail Selector */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 mt-3 px-1 overflow-x-auto pb-1">
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative size-16 rounded-sm overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx ? "border-brand-gold-polished shadow-low" : "border-border opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="size-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </Card>

          {/* Description */}
          <Card variant="standard" size="md" className="flex flex-col gap-3 border-border bg-surface">
            <Typography variant="h3" className="font-display font-semibold text-foreground">
              {t("generalInfoTitle")}
            </Typography>
            <Typography variant="bodySmall" className="leading-relaxed text-foreground">
              {product.description}
            </Typography>
          </Card>

          {/* Product Variants (if available) */}
          {product.variants && product.variants.length > 0 && (
            <Card variant="standard" size="md" className="flex flex-col gap-4 border-border bg-surface">
              <Typography variant="h3" className="font-display font-semibold text-foreground">
                {t("variants")} ({product.variants.length})
              </Typography>
              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right text-body-small">
                  <thead className="bg-surface-header border-b border-border text-label-meta uppercase text-muted">
                    <tr>
                      <th className="p-2">Variant Title</th>
                      <th className="p-2">SKU</th>
                      <th className="p-2">Weight</th>
                      <th className="p-2">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {product.variants.map((v) => (
                      <tr key={v.id}>
                        <td className="p-2 font-medium">{v.title}</td>
                        <td className="p-2 font-mono text-muted">{v.sku}</td>
                        <td className="p-2 tabular-nums">{v.weightGrams}g</td>
                        <td className="p-2 tabular-nums">{v.stockQuantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>

        {/* Right Column: Pricing Breakdown & Technical Specs */}
        <div className="flex flex-col gap-6">
          {/* Dynamic Price Box */}
          <Card variant="elevated" size="md" className="flex flex-col gap-4 border-brand-gold-muted/40 bg-surface shadow-medium">
            <Typography variant="labelMeta" tone="accent" className="uppercase font-semibold text-brand-gold-polished tracking-wide">
              {t("calculatedPrice")}
            </Typography>

            <div>
              <PriceDisplay price={dynamicPriceTRY} size="lg" className="text-header-1 font-semibold" />
              <Typography variant="bodySmall" tone="muted" className="mt-1">
                {t("dynamicPriceNote")}
              </Typography>
            </div>

            <div className="flex flex-col gap-2 pt-3 border-t border-border/80 text-body-small divide-y divide-border/40">
              <div className="flex justify-between py-1">
                <span className="text-muted">{t("goldContentCost")} ({product.weightGrams}g):</span>
                <span className="font-semibold text-foreground tabular-nums">{formatPrice(goldContentCostTRY)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted">{t("laborMarkup")}:</span>
                <span className="font-semibold text-foreground tabular-nums">{formatPrice(product.laborFeeTRY)}</span>
              </div>
              {product.additionalCostTRY && product.additionalCostTRY > 0 ? (
                <div className="flex justify-between py-1">
                  <span className="text-muted">{t("extraAccents")}:</span>
                  <span className="font-semibold text-foreground tabular-nums">{formatPrice(product.additionalCostTRY)}</span>
                </div>
              ) : null}
            </div>
          </Card>

          {/* Technical Specifications */}
          <Card variant="standard" size="md" className="flex flex-col gap-4 border-border bg-surface">
            <Typography variant="h3" className="font-display font-semibold text-foreground">
              {t("productSpecifications")}
            </Typography>

            <div className="flex flex-col gap-3 text-body-small divide-y divide-border/60">
              <div className="flex justify-between py-1">
                <span className="text-muted">{t("goldKarat")}:</span>
                <span className="font-semibold text-brand-gold-polished">{product.karat}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted">{t("weightGrams")}:</span>
                <span className="font-semibold text-foreground tabular-nums">{product.weightGrams}g</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted">{t("category")}:</span>
                <span className="font-medium text-foreground capitalize">{product.category}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted">{t("stockQuantity")}:</span>
                <span className="font-semibold text-foreground tabular-nums">{product.stockQuantity}</span>
              </div>
              {product.giaCertificateNo && (
                <div className="flex justify-between py-1">
                  <span className="text-muted">{t("giaCertificate")}:</span>
                  <span className="font-mono font-semibold text-semantic-info">{product.giaCertificateNo}</span>
                </div>
              )}
              <div className="flex justify-between py-1">
                <span className="text-muted">{t("visibility")}:</span>
                <span className="font-medium text-foreground">{product.isVisible ? t("publishedVisible") : t("hidden")}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

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
            <strong className="text-foreground font-semibold">&quot;{product.title}&quot;</strong>? This action will remove the product and its images from Supabase and cannot be undone.
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
