"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/providers/language-provider";
import { useCurrency } from "@/components/providers/currency-provider";
import { useGoldPrice } from "@/components/providers/gold-price-provider";
import { Button, Card, PlusIcon, PriceDisplay, Switch, Typography } from "@/components/ui";
import { ProductImageManager } from "./product-image-manager";
import {
  calculateProductPriceTRY,
  type GoldKarat,
  type Product,
  type ProductCategory,
  type ProductStatus,
} from "../types";

export interface ProductFormProps {
  initialProduct?: Product;
  onSave: (productData: Partial<Product>) => void;
  onDelete?: () => void;
  isEditMode?: boolean;
  isSaving?: boolean;
}

export function ProductForm({ initialProduct, onSave, onDelete, isEditMode = false, isSaving = false }: ProductFormProps) {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const { rates } = useGoldPrice();
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState(initialProduct?.title || "");
  const [sku, setSku] = useState(initialProduct?.sku || "SKU-1001");
  const [description, setDescription] = useState(initialProduct?.description || "");
  const [category, setCategory] = useState<ProductCategory>(initialProduct?.category || "rings");
  const [karat, setKarat] = useState<GoldKarat>(initialProduct?.karat || "18K");
  const [weightGrams, setWeightGrams] = useState<number>(initialProduct?.weightGrams || 5.0);
  const [laborFeeTRY, setLaborFeeTRY] = useState<number>(initialProduct?.laborFeeTRY || 3500);
  const [additionalCostTRY, setAdditionalCostTRY] = useState<number>(initialProduct?.additionalCostTRY || 0);
  const [stockQuantity, setStockQuantity] = useState<number>(initialProduct?.stockQuantity ?? 10);
  const [lowStockThreshold, setLowStockThreshold] = useState<number>(initialProduct?.lowStockThreshold ?? 3);
  const [status, setStatus] = useState<ProductStatus>(initialProduct?.status || "active");
  const [isVisible, setIsVisible] = useState<boolean>(initialProduct?.isVisible ?? true);
  const [isFeatured, setIsFeatured] = useState<boolean>(initialProduct?.isFeatured ?? false);
  const [giaCertificateNo, setGiaCertificateNo] = useState(initialProduct?.giaCertificateNo || "");

  // Image Gallery State
  const [images, setImages] = useState<string[]>(
    initialProduct?.images && initialProduct.images.length > 0
      ? initialProduct.images
      : ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"]
  );

  // Re-synchronize Form State when initialProduct updates from database
  useEffect(() => {
    if (initialProduct) {
      setTitle(initialProduct.title || "");
      setSku(initialProduct.sku || "");
      setDescription(initialProduct.description || "");
      setCategory(initialProduct.category || "rings");
      setKarat(initialProduct.karat || "18K");
      setWeightGrams(initialProduct.weightGrams || 5.0);
      setLaborFeeTRY(initialProduct.laborFeeTRY || 3500);
      setAdditionalCostTRY(initialProduct.additionalCostTRY || 0);
      setStockQuantity(initialProduct.stockQuantity ?? 10);
      setLowStockThreshold(initialProduct.lowStockThreshold ?? 3);
      setStatus(initialProduct.status || "active");
      setIsVisible(initialProduct.isVisible ?? true);
      setIsFeatured(initialProduct.isFeatured ?? false);
      setGiaCertificateNo(initialProduct.giaCertificateNo || "");
      if (initialProduct.images && initialProduct.images.length > 0) {
        setImages(initialProduct.images);
      }
    } else {
      setSku(`SKU-${Math.floor(1000 + Math.random() * 9000)}`);
    }
  }, [initialProduct]);

  // Live Computed Price derived from Real Live Market Rates
  const computedPriceTRY = calculateProductPriceTRY(
    { karat, weightGrams, laborFeeTRY, additionalCostTRY },
    rates
  );

  const activeSpotRate = rates[karat] || rates["24K"];
  const goldContentCostTRY = activeSpotRate * weightGrams;

  function handleSubmit(submitStatus?: ProductStatus) {
    const finalStatus = submitStatus || status;
    const productData: Partial<Product> = {
      title,
      sku,
      description,
      category,
      karat,
      weightGrams,
      laborFeeTRY,
      additionalCostTRY,
      stockQuantity,
      lowStockThreshold,
      status: finalStatus,
      isVisible,
      isFeatured,
      images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"],
      giaCertificateNo: giaCertificateNo.trim() || undefined,
    };
    onSave(productData);
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
        <div>
          <Typography variant="h1" className="font-display font-semibold text-foreground">
            {isEditMode ? t("editProduct") : t("addProduct")}
          </Typography>
          <Typography variant="bodySmall" tone="muted" className="mt-1">
            {t("productsCatalogDesc")}
          </Typography>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Button variant="outline" size="sm" onClick={() => router.push("/admin/products")} disabled={isSaving}>
            {t("backToProducts")}
          </Button>
          {isEditMode && onDelete && (
            <Button variant="danger" size="sm" onClick={onDelete} disabled={isSaving}>
              Delete Product
            </Button>
          )}
          <Button variant="outline" size="sm" isLoading={isSaving} disabled={isSaving} onClick={() => handleSubmit("draft")}>
            {t("saveAsDraft")}
          </Button>
          <Button variant="primary" size="sm" isLoading={isSaving} disabled={isSaving} onClick={() => handleSubmit("active")}>
            {isEditMode ? t("saveProduct") : t("saveAndPublish")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Left Form Columns */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Section 1: General Product Information */}
          <Card variant="standard" size="md" className="flex flex-col gap-5 border-border bg-surface shadow-flat">
            <Typography variant="h3" className="font-display font-semibold text-foreground">
              {t("generalInfoTitle")}
            </Typography>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="product-title" className="text-body-small font-medium text-foreground">
                {t("productTitleLabel")}
              </label>
              <input
                id="product-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t("productTitlePlaceholder")}
                className="w-full px-3 py-2 border border-border rounded-sm bg-surface text-body-default focus:outline-none focus:ring-2 focus:ring-focus-ring"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="product-sku" className="text-body-small font-medium text-foreground">
                  {t("sku")} *
                </label>
                <input
                  id="product-sku"
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-sm bg-surface text-body-default tabular-nums focus:outline-none focus:ring-2 focus:ring-focus-ring"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="product-category" className="text-body-small font-medium text-foreground">
                  {t("category")} *
                </label>
                <select
                  id="product-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProductCategory)}
                  className="w-full px-3 py-2 border border-border rounded-sm bg-surface text-body-default focus:outline-none focus:ring-2 focus:ring-focus-ring"
                >
                  <option value="rings">{t("categoryRings")}</option>
                  <option value="bangles">{t("categoryBangles")}</option>
                  <option value="necklaces">{t("categoryNecklaces")}</option>
                  <option value="earrings">{t("categoryEarrings")}</option>
                  <option value="bracelets">{t("categoryBracelets")}</option>
                  <option value="bullion">{t("categoryBullion")}</option>
                  <option value="sets">{t("categorySets")}</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="product-desc" className="text-body-small font-medium text-foreground">
                {t("recentOrdersDesc")}
              </label>
              <textarea
                id="product-desc"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("productDescPlaceholder")}
                className="w-full px-3 py-2 border border-border rounded-sm bg-surface text-body-default focus:outline-none focus:ring-2 focus:ring-focus-ring resize-y"
              />
            </div>
          </Card>

          {/* Section 2: Technical Gold Specifications */}
          <Card variant="standard" size="md" className="flex flex-col gap-5 border-border bg-surface shadow-flat">
            <Typography variant="h3" className="font-display font-semibold text-foreground">
              {t("productSpecifications")}
            </Typography>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="gold-karat" className="text-body-small font-medium text-foreground">
                  {t("goldKarat")} *
                </label>
                <select
                  id="gold-karat"
                  value={karat}
                  onChange={(e) => setKarat(e.target.value as GoldKarat)}
                  className="w-full px-3 py-2 border border-border rounded-sm bg-surface text-body-default font-semibold focus:outline-none focus:ring-2 focus:ring-focus-ring"
                >
                  <option value="24K">24K (999 Pure)</option>
                  <option value="22K">22K (916 Standard)</option>
                  <option value="18K">18K (750 Fine)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="weight-grams" className="text-body-small font-medium text-foreground">
                  {t("weightGrams")} *
                </label>
                <input
                  id="weight-grams"
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={weightGrams}
                  onChange={(e) => setWeightGrams(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-border rounded-sm bg-surface text-body-default tabular-nums focus:outline-none focus:ring-2 focus:ring-focus-ring"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="labor-fee" className="text-body-small font-medium text-foreground">
                  {t("laborFee")} (TRY) *
                </label>
                <input
                  id="labor-fee"
                  type="number"
                  step="100"
                  min="0"
                  value={laborFeeTRY}
                  onChange={(e) => setLaborFeeTRY(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-border rounded-sm bg-surface text-body-default tabular-nums focus:outline-none focus:ring-2 focus:ring-focus-ring"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="additional-cost" className="text-body-small font-medium text-foreground">
                  {t("additionalCost")} (TRY)
                </label>
                <input
                  id="additional-cost"
                  type="number"
                  step="500"
                  min="0"
                  value={additionalCostTRY}
                  onChange={(e) => setAdditionalCostTRY(parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-border rounded-sm bg-surface text-body-default tabular-nums focus:outline-none focus:ring-2 focus:ring-focus-ring"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="gia-cert" className="text-body-small font-medium text-foreground">
                  {t("giaCertificate")}
                </label>
                <input
                  id="gia-cert"
                  type="text"
                  value={giaCertificateNo}
                  onChange={(e) => setGiaCertificateNo(e.target.value)}
                  placeholder="e.g. GIA-74921092"
                  className="w-full px-3 py-2 border border-border rounded-sm bg-surface text-body-default focus:outline-none focus:ring-2 focus:ring-focus-ring"
                />
              </div>
            </div>
          </Card>

          {/* Section 3: Product Image Gallery */}
          <Card variant="standard" size="md" className="flex flex-col gap-5 border-border bg-surface shadow-flat">
            <Typography variant="h3" className="font-display font-semibold text-foreground">
              {t("productImages")}
            </Typography>

            <ProductImageManager
              images={images}
              onChange={setImages}
              productId={initialProduct?.id}
            />
          </Card>
        </div>

        {/* Right Sidebar Form Columns */}
        <div className="flex flex-col gap-6">
          {/* Live Dynamic Price Calculator Box */}
          <Card variant="elevated" size="md" className="flex flex-col gap-4 border-brand-gold-muted/40 bg-surface shadow-medium">
            <Typography variant="labelMeta" tone="accent" className="uppercase font-semibold text-brand-gold-polished tracking-wide">
              {t("calculatedPrice")}
            </Typography>

            <div>
              <PriceDisplay price={computedPriceTRY} size="lg" className="text-header-1 font-semibold" />
              <Typography variant="bodySmall" tone="muted" className="mt-1">
                {t("dynamicPriceNote")}
              </Typography>
            </div>

            <div className="flex flex-col gap-2 pt-3 border-t border-border/80 text-body-small divide-y divide-border/40">
              <div className="flex justify-between py-1">
                <span className="text-muted">{t("goldContentCost")} ({weightGrams}g):</span>
                <span className="font-semibold text-foreground tabular-nums">{formatPrice(goldContentCostTRY)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted">{t("laborMarkup")}:</span>
                <span className="font-semibold text-foreground tabular-nums">{formatPrice(laborFeeTRY)}</span>
              </div>
              {additionalCostTRY > 0 && (
                <div className="flex justify-between py-1">
                  <span className="text-muted">{t("extraAccents")}:</span>
                  <span className="font-semibold text-foreground tabular-nums">{formatPrice(additionalCostTRY)}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Inventory & Stock Levels */}
          <Card variant="standard" size="md" className="flex flex-col gap-4 border-border bg-surface shadow-flat">
            <Typography variant="h3" className="font-display font-semibold text-foreground">
              {t("inventoryStockTitle")}
            </Typography>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="stock-qty" className="text-body-small font-medium text-foreground">
                {t("stockQuantity")} *
              </label>
              <input
                id="stock-qty"
                type="number"
                min="0"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(parseInt(e.target.value, 10) || 0)}
                className="w-full px-3 py-2 border border-border rounded-sm bg-surface text-body-default tabular-nums focus:outline-none focus:ring-2 focus:ring-focus-ring"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="low-stock-thresh" className="text-body-small font-medium text-foreground">
                {t("lowStockThresholdLabel")}
              </label>
              <input
                id="low-stock-thresh"
                type="number"
                min="1"
                value={lowStockThreshold}
                onChange={(e) => setLowStockThreshold(parseInt(e.target.value, 10) || 1)}
                className="w-full px-3 py-2 border border-border rounded-sm bg-surface text-body-default tabular-nums focus:outline-none focus:ring-2 focus:ring-focus-ring"
              />
            </div>
          </Card>

          {/* Publishing & Visibility Settings */}
          <Card variant="standard" size="md" className="flex flex-col gap-5 border-border bg-surface shadow-flat">
            <Typography variant="h3" className="font-display font-semibold text-foreground">
              {t("publishingSettings")}
            </Typography>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="status-select" className="text-body-small font-medium text-foreground">
                {t("productStatusLabel")}
              </label>
              <select
                id="status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as ProductStatus)}
                className="w-full px-3 py-2 border border-border rounded-sm bg-surface text-body-default font-medium focus:outline-none focus:ring-2 focus:ring-focus-ring"
              >
                <option value="active">{t("active")}</option>
                <option value="draft">{t("draft")}</option>
                <option value="archived">{t("archived")}</option>
              </select>
            </div>

            <div className="flex flex-col gap-4 pt-2 border-t border-border/60">
              <div className="flex items-center justify-between">
                <span className="text-body-small font-medium text-foreground">{t("visibility")}</span>
                <Switch
                  checked={isVisible}
                  onChange={setIsVisible}
                  aria-label={t("visibility")}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-body-small font-medium text-foreground">{t("featured")}</span>
                <Switch
                  checked={isFeatured}
                  onChange={setIsFeatured}
                  aria-label={t("featured")}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
