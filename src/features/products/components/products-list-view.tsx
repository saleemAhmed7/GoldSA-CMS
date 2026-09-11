"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";
import { useGoldPrice } from "@/components/providers/gold-price-provider";
import { Alert, Badge, Button, Card, Dialog, PlusIcon, PriceDisplay, SegmentedControl, StatusIndicator, Typography } from "@/components/ui";
import {
  bulkRestoreProducts,
  bulkSoftDeleteProducts,
  bulkUpdateFeatured,
  bulkUpdateStatus,
  bulkUpdateVisibility,
  deleteSupabaseProduct,
  fetchSupabaseProducts,
  restoreSupabaseProduct,
  softDeleteSupabaseProduct,
} from "../api/products-api";
import { ProductStatusBadge } from "./product-status-badge";
import { ProductStatsCards } from "./product-stats-cards";
import {
  calculateProductPriceTRY,
  type Product,
  type ProductFilters,
  type ProductSortField,
  type SortOrder,
} from "../types";

export function ProductsListView() {
  const { t, language } = useLanguage();
  const { rates } = useGoldPrice();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFromSupabase, setIsFromSupabase] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Filters State
  const [filters, setFilters] = useState<ProductFilters>({
    search: "",
    category: "all",
    karat: "all",
    status: "all",
    stockLevel: "all",
    showDeleted: false,
  });

  // Sorting State
  const [sortField, setSortField] = useState<ProductSortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Selection & Modal State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Delete Workflow State
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState<string | null>(null);

  // Search Debounce State
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchInput }));
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Load products from Supabase database
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setErrorMessage(null);
      const res = await fetchSupabaseProducts(language);
      setProducts(res.products);
      setIsFromSupabase(res.isFromSupabase);
      if (res.error) setErrorMessage(res.error);
      setIsLoading(false);
    }
    loadData();
  }, [language]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Soft Delete Filter
      if (filters.showDeleted) {
        if (!p.isDeleted) return false;
      } else {
        if (p.isDeleted) return false;
      }

      // Advanced Search Query (Name, SKU, GIA Cert, Description)
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesSku = p.sku.toLowerCase().includes(query);
        const matchesGia = p.giaCertificateNo ? p.giaCertificateNo.toLowerCase().includes(query) : false;
        const matchesDesc = p.description ? p.description.toLowerCase().includes(query) : false;
        const matchesCat = p.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSku && !matchesGia && !matchesDesc && !matchesCat) return false;
      }

      // Category
      if (filters.category !== "all" && p.category !== filters.category) {
        return false;
      }

      // Karat
      if (filters.karat !== "all" && p.karat !== filters.karat) {
        return false;
      }

      // Status
      if (filters.status !== "all" && p.status !== filters.status) {
        return false;
      }

      // Stock Level
      if (filters.stockLevel === "in_stock" && p.stockQuantity <= 0) return false;
      if (filters.stockLevel === "low_stock" && (p.stockQuantity <= 0 || p.stockQuantity > p.lowStockThreshold)) return false;
      if (filters.stockLevel === "out_of_stock" && p.stockQuantity > 0) return false;

      return true;
    });
  }, [products, filters]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      let valA: number | string = 0;
      let valB: number | string = 0;

      if (sortField === "title") {
        valA = a.title;
        valB = b.title;
      } else if (sortField === "price") {
        valA = calculateProductPriceTRY(a, rates);
        valB = calculateProductPriceTRY(b, rates);
      } else if (sortField === "stock") {
        valA = a.stockQuantity;
        valB = b.stockQuantity;
      } else if (sortField === "weight") {
        valA = a.weightGrams;
        valB = b.weightGrams;
      } else {
        valA = new Date(a.createdAt).getTime();
        valB = new Date(b.createdAt).getTime();
      }

      if (typeof valA === "string" && typeof valB === "string") {
        return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortOrder === "asc" ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });
  }, [filteredProducts, sortField, sortOrder, rates]);

  // Paginated Subset
  const totalPages = Math.ceil(sortedProducts.length / pageSize) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedProducts.slice(start, start + pageSize);
  }, [sortedProducts, currentPage, pageSize]);

  // Actions
  async function handleConfirmDelete() {
    if (!productToDelete) return;
    setIsDeleting(true);
    setDeleteError(null);
    setDeleteSuccessMessage(null);

    const result = await deleteSupabaseProduct(productToDelete.id);
    setIsDeleting(false);

    if (!result.success) {
      const err = result.error || "Failed to delete product from Supabase";
      console.error("❌ Delete product error:", err);
      setDeleteError(err);
      return;
    }

    // Success: remove product from state list & update counters without page reload!
    const deletedTitle = productToDelete.title;
    setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
    setSelectedIds((prev) => prev.filter((id) => id !== productToDelete.id));
    setDeleteSuccessMessage(`"${deletedTitle}" was permanently deleted from Supabase.`);
    setProductToDelete(null);
  }

  async function handleBulkSoftDelete() {
    if (selectedIds.length === 0) return;
    const res = await bulkSoftDeleteProducts(selectedIds);
    if (res.success) {
      setProducts((prev) =>
        prev.map((p) => (selectedIds.includes(p.id) ? { ...p, isDeleted: true } : p))
      );
      setDeleteSuccessMessage(`Moved ${selectedIds.length} products to Trash.`);
      setSelectedIds([]);
    }
  }

  async function handleBulkRestore() {
    if (selectedIds.length === 0) return;
    const res = await bulkRestoreProducts(selectedIds);
    if (res.success) {
      setProducts((prev) =>
        prev.map((p) => (selectedIds.includes(p.id) ? { ...p, isDeleted: false } : p))
      );
      setDeleteSuccessMessage(`Restored ${selectedIds.length} products from Trash.`);
      setSelectedIds([]);
    }
  }

  async function handleBulkVisibility(isVisible: boolean) {
    if (selectedIds.length === 0) return;
    const res = await bulkUpdateVisibility(selectedIds, isVisible);
    if (res.success) {
      setProducts((prev) =>
        prev.map((p) => (selectedIds.includes(p.id) ? { ...p, isVisible } : p))
      );
      setDeleteSuccessMessage(`Updated visibility for ${selectedIds.length} products.`);
      setSelectedIds([]);
    }
  }

  async function handleBulkStatus(status: "active" | "draft" | "archived") {
    if (selectedIds.length === 0) return;
    const res = await bulkUpdateStatus(selectedIds, status);
    if (res.success) {
      setProducts((prev) =>
        prev.map((p) => (selectedIds.includes(p.id) ? { ...p, status } : p))
      );
      setDeleteSuccessMessage(`Updated status to "${status}" for ${selectedIds.length} products.`);
      setSelectedIds([]);
    }
  }

  async function handleBulkFeatured(isFeatured: boolean) {
    if (selectedIds.length === 0) return;
    const res = await bulkUpdateFeatured(selectedIds, isFeatured);
    if (res.success) {
      setProducts((prev) =>
        prev.map((p) => (selectedIds.includes(p.id) ? { ...p, isFeatured } : p))
      );
      setDeleteSuccessMessage(`Updated featured state for ${selectedIds.length} products.`);
      setSelectedIds([]);
    }
  }

  async function handleSingleSoftDelete(id: string) {
    const res = await softDeleteSupabaseProduct(id);
    if (res.success) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isDeleted: true } : p))
      );
      setDeleteSuccessMessage("Product moved to Trash.");
    }
  }

  async function handleSingleRestore(id: string) {
    const res = await restoreSupabaseProduct(id);
    if (res.success) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isDeleted: false } : p))
      );
      setDeleteSuccessMessage("Product restored from Trash.");
    }
  }

  function handleToggleSelectAll() {
    if (selectedIds.length === paginatedProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedProducts.map((p) => p.id));
    }
  }

  function handleToggleSelect(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function handleBulkDelete() {
    setProducts((prev) =>
      prev.map((item) => (selectedIds.includes(item.id) ? { ...item, isDeleted: true } : item))
    );
    setSelectedIds([]);
  }

  return (
    <div className="flex flex-col gap-6 w-full pb-16">
      {/* Product Statistics Cards */}
      <ProductStatsCards products={products} />

      {deleteSuccessMessage && (
        <Alert variant="success" size="md" title="Action Completed">
          <div className="text-body-small mt-0.5">{deleteSuccessMessage}</div>
        </Alert>
      )}

      {deleteError && (
        <Alert variant="error" size="md" title="Database Error">
          <div className="font-mono text-body-small break-all mt-1">{deleteError}</div>
        </Alert>
      )}

      {/* Bulk Action Toolbar */}
      {selectedIds.length > 0 && (
        <div className="flex flex-wrap items-center justify-between p-3 border border-brand-gold-muted/40 rounded-sm bg-accent-subtle/80 backdrop-blur-xs shadow-flat gap-3">
          <div className="flex items-center gap-2">
            <span className="text-body-small font-semibold text-brand-gold-polished tabular-nums">
              {selectedIds.length} {t("itemsSelected")}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {!filters.showDeleted ? (
              <Button variant="danger" size="sm" onClick={handleBulkSoftDelete}>
                {t("bulkMoveToTrash")}
              </Button>
            ) : (
              <Button variant="primary" size="sm" onClick={handleBulkRestore}>
                {t("bulkRestoreSelected")}
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => handleBulkVisibility(true)}>
              {t("bulkMakeVisible")}
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleBulkVisibility(false)}>
              {t("bulkHideSelected")}
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleBulkStatus("active")}>
              {t("bulkSetActive")}
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleBulkStatus("draft")}>
              {t("bulkSetDraft")}
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleBulkFeatured(true)}>
              ★ {t("bulkSetFeatured")}
            </Button>
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className="text-xs text-muted hover:text-foreground font-mono ml-2 underline"
            >
              {t("deselectAll")}
            </button>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-4">
        <div className="flex flex-col gap-1.5 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Typography variant="h1" className="font-display font-semibold text-foreground tracking-tight">
              {filters.showDeleted ? t("trashBin") : t("productsCatalog")}
            </Typography>
            <Badge variant="accent" className="tabular-nums">{filteredProducts.length}</Badge>
            <Badge variant={isFromSupabase ? "success" : "neutral"} className="gap-1">
              <StatusIndicator status={isFromSupabase ? "success" : "info"} pulse={isFromSupabase} />
              {isFromSupabase ? "Supabase Live" : "Supabase Connected"}
            </Badge>
          </div>
          <Typography variant="bodySmall" tone="muted">
            {filters.showDeleted
              ? t("trashBinDesc")
              : t("productsCatalogDesc")}
          </Typography>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0 self-start md:self-auto">
          <Button
            variant={filters.showDeleted ? "danger" : "outline"}
            size="sm"
            onClick={() => setFilters({ ...filters, showDeleted: !filters.showDeleted })}
          >
            {filters.showDeleted ? t("hideDeleted") : t("showDeleted")}
          </Button>
          <Link href="/admin/products/create">
            <Button variant="primary" size="sm" leadingIcon={<PlusIcon />}>
              {t("addProduct")}
            </Button>
          </Link>
        </div>
      </div>

      {/* Database Error Banner (if any) */}
      {errorMessage && (
        <div className="p-3 rounded-sm border border-semantic-warning/40 bg-semantic-warning/10 text-body-small text-semantic-warning">
          <strong>Supabase Notice:</strong> {errorMessage}
        </div>
      )}

      {/* Filter Toolbar */}
      <Card variant="standard" size="sm" className="bg-surface border-border p-4 shadow-flat">
        <div className="flex flex-col gap-4">
          {/* Top Search & Layout Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder={t("searchProductsPlaceholder")}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-border rounded-sm bg-surface text-body-small focus:outline-none focus:ring-2 focus:ring-focus-ring"
              />
              <svg className="size-4 absolute left-3 top-2.5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <SegmentedControl
                size="sm"
                value={viewMode}
                onChange={(val) => setViewMode(val as "table" | "grid")}
                options={[
                  { value: "table", label: t("table") },
                  { value: "grid", label: t("grid") },
                ]}
              />
            </div>
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 pt-2 border-t border-border/60">
            {/* Category */}
            <select
              value={filters.category}
              onChange={(e) => {
                setFilters({ ...filters, category: e.target.value });
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 border border-border rounded-sm bg-surface text-body-small focus:outline-none"
            >
              <option value="all">{t("allCategories")}</option>
              <option value="rings">{t("categoryRings")}</option>
              <option value="bangles">{t("categoryBangles")}</option>
              <option value="necklaces">{t("categoryNecklaces")}</option>
              <option value="earrings">{t("categoryEarrings")}</option>
              <option value="bracelets">{t("categoryBracelets")}</option>
              <option value="bullion">{t("categoryBullion")}</option>
              <option value="sets">{t("categorySets")}</option>
            </select>

            {/* Karat */}
            <select
              value={filters.karat}
              onChange={(e) => {
                setFilters({ ...filters, karat: e.target.value });
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 border border-border rounded-sm bg-surface text-body-small focus:outline-none"
            >
              <option value="all">{t("allKarats")}</option>
              <option value="24K">24K Gold</option>
              <option value="22K">22K Gold</option>
              <option value="18K">18K Gold</option>
            </select>

            {/* Status */}
            <select
              value={filters.status}
              onChange={(e) => {
                setFilters({ ...filters, status: e.target.value });
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 border border-border rounded-sm bg-surface text-body-small focus:outline-none"
            >
              <option value="all">{t("allStatuses")}</option>
              <option value="active">{t("active")}</option>
              <option value="draft">{t("draft")}</option>
              <option value="archived">{t("archived")}</option>
            </select>

            {/* Stock Level */}
            <select
              value={filters.stockLevel}
              onChange={(e) => {
                setFilters({ ...filters, stockLevel: e.target.value });
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 border border-border rounded-sm bg-surface text-body-small focus:outline-none"
            >
              <option value="all">{t("allStockLevels")}</option>
              <option value="in_stock">{t("inStock")}</option>
              <option value="low_stock">{t("lowStock")}</option>
              <option value="out_of_stock">{t("outOfStockStatus")}</option>
            </select>

            {/* Sort Field */}
            <select
              value={`${sortField}-${sortOrder}`}
              onChange={(e) => {
                const [f, o] = e.target.value.split("-") as [ProductSortField, SortOrder];
                setSortField(f);
                setSortOrder(o);
              }}
              className="px-2.5 py-1.5 border border-border rounded-sm bg-surface text-body-small focus:outline-none font-medium text-brand-gold-polished col-span-2 sm:col-span-1"
            >
              <option value="createdAt-desc">{t("sortNewestFirst")}</option>
              <option value="price-desc">{t("sortPriceHighLow")}</option>
              <option value="price-asc">{t("sortPriceLowHigh")}</option>
              <option value="stock-asc">{t("sortStockLowHigh")}</option>
              <option value="weight-desc">{t("sortWeightHighLow")}</option>
              <option value="title-asc">{t("sortTitleAZ")}</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between p-3 rounded-sm border border-brand-gold-polished/40 bg-brand-gold-polished/10 text-body-small animate-in fade-in">
          <span className="font-semibold text-foreground">{selectedIds.length} {t("itemsSelected")}</span>
          <div className="flex items-center gap-2">
            <Button variant="danger" size="xs" onClick={handleBulkDelete}>
              {t("softDelete")}
            </Button>
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading ? (
        <Card variant="standard" size="sm" className="p-12 text-center border-border bg-surface shadow-flat">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="size-6 border-2 border-brand-gold-polished border-t-transparent rounded-full animate-spin" />
            <Typography variant="bodySmall" tone="muted">
              {t("loading")}
            </Typography>
          </div>
        </Card>
      ) : products.length === 0 ? (
        /* Empty State Component */
        <Card variant="standard" size="md" className="p-12 text-center border-border bg-surface shadow-flat flex flex-col items-center justify-center gap-4">
          <div className="size-16 rounded-full bg-brand-gold-muted/20 border border-brand-gold-polished/30 flex items-center justify-center text-brand-gold-polished">
            <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div className="max-w-md flex flex-col gap-1">
            <Typography variant="h2" className="font-display font-semibold text-foreground">
              {t("emptyProductsTitle")}
            </Typography>
            <Typography variant="bodySmall" tone="muted">
              {t("emptyProductsDesc")}
            </Typography>
          </div>
          <Link href="/admin/products/create" className="mt-2">
            <Button variant="primary" size="md" leadingIcon={<PlusIcon />}>
              {t("addFirstProduct")}
            </Button>
          </Link>
        </Card>
      ) : viewMode === "table" ? (
        /* Table View Mode */
        <Card variant="standard" size="sm" className="overflow-hidden border-border bg-surface shadow-flat">
          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-body-small">
              <thead className="bg-surface-header border-b border-border text-label-meta uppercase text-muted">
                <tr>
                  <th className="p-3 w-8">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === paginatedProducts.length && paginatedProducts.length > 0}
                      onChange={handleToggleSelectAll}
                      className="rounded-xs border-border text-brand-gold-polished"
                    />
                  </th>
                  <th className="p-3">{t("thProduct")}</th>
                  <th className="p-3">{t("thSku")}</th>
                  <th className="p-3">{t("thCategory")}</th>
                  <th className="p-3">{t("thKaratWeight")}</th>
                  <th className="p-3">{t("thLivePrice")}</th>
                  <th className="p-3">{t("thStock")}</th>
                  <th className="p-3">{t("thStatus")}</th>
                  <th className="p-3 text-right rtl:text-left">{t("thActions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {paginatedProducts.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-muted">
                      {t("emptyProductsTitle")}
                    </td>
                  </tr>
                ) : (
                  paginatedProducts.map((p) => {
                    const dynamicPriceTRY = calculateProductPriceTRY(p, rates);
                    const isSelected = selectedIds.includes(p.id);

                    return (
                      <tr key={p.id} className={`hover:bg-accent-subtle/50 transition-colors ${isSelected ? "bg-accent-subtle" : ""}`}>
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelect(p.id)}
                            className="rounded-xs border-border text-brand-gold-polished"
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.images[0]}
                              alt={p.title}
                              className="size-10 rounded-xs object-cover border border-border bg-surface"
                            />
                            <div className="flex flex-col">
                              <Link href={`/admin/products/${p.id}`} className="font-medium text-foreground hover:text-brand-gold-polished transition-colors line-clamp-1">
                                {p.title}
                              </Link>
                              {p.isFeatured && (
                                <span className="text-[10px] text-brand-gold-polished font-semibold">★ {t("featured")}</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-3 font-mono text-muted tabular-nums">{p.sku}</td>
                        <td className="p-3 capitalize">{p.category}</td>
                        <td className="p-3 tabular-nums">
                          <span className="font-semibold text-brand-gold-polished">{p.karat}</span> / {p.weightGrams}g
                        </td>
                        <td className="p-3 font-semibold tabular-nums">
                          <PriceDisplay price={dynamicPriceTRY} size="sm" />
                        </td>
                        <td className="p-3 tabular-nums">
                          {p.stockQuantity <= 0 ? (
                            <Badge variant="error">{t("outOfStockStatus")}</Badge>
                          ) : p.stockQuantity <= p.lowStockThreshold ? (
                            <Badge variant="warning">{p.stockQuantity} {t("lowStock")}</Badge>
                          ) : (
                            <span className="font-medium text-foreground">{p.stockQuantity}</span>
                          )}
                        </td>
                        <td className="p-3">
                          <ProductStatusBadge status={p.status} isDeleted={p.isDeleted} />
                        </td>
                        <td className="p-3 text-right rtl:text-left">
                          <div className="inline-flex items-center gap-2">
                            <Link href={`/admin/products/${p.id}`}>
                              <Button variant="ghost" size="xs">
                                {t("view")}
                              </Button>
                            </Link>
                            <Link href={`/admin/products/${p.id}/edit`}>
                              <Button variant="outline" size="xs">
                                {t("edit")}
                              </Button>
                            </Link>
                            {!p.isDeleted ? (
                              <>
                                <Button
                                  variant="ghost"
                                  size="xs"
                                  className="text-semantic-warning hover:bg-semantic-warning/10"
                                  onClick={() => handleSingleSoftDelete(p.id)}
                                  title={t("softDelete")}
                                >
                                  {t("softDelete")}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="xs"
                                  className="text-semantic-error hover:bg-semantic-error/10"
                                  onClick={() => setProductToDelete(p)}
                                  title={t("permanentDelete")}
                                >
                                  {t("delete")}
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  variant="outline"
                                  size="xs"
                                  onClick={() => handleSingleRestore(p.id)}
                                  title={t("restoreProduct")}
                                >
                                  {t("restore")}
                                </Button>
                                <Button
                                  variant="danger"
                                  size="xs"
                                  onClick={() => setProductToDelete(p)}
                                  title={t("permanentDelete")}
                                >
                                  {t("delete")}
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        /* Grid View Mode */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedProducts.map((p) => {
            const dynamicPriceTRY = calculateProductPriceTRY(p, rates);
            return (
              <Card key={p.id} variant="interactive" className="flex flex-col p-0 overflow-hidden group border-border bg-surface shadow-flat">
                <div className="relative aspect-square w-full overflow-hidden bg-accent-subtle">
                  <img src={p.images[0]} alt={p.title} className="size-full object-cover group-hover:scale-105 transition-transform duration-layout" />
                  <div className="absolute top-2 left-2 z-10 flex gap-1">
                    <ProductStatusBadge status={p.status} isDeleted={p.isDeleted} />
                    <Badge variant="accent">{p.karat}</Badge>
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1 justify-between">
                  <div>
                    <span className="text-label-meta text-muted uppercase tracking-wider">{p.category} • {p.weightGrams}g</span>
                    <h3 className="font-display font-medium text-foreground text-body-default line-clamp-1 mt-0.5">
                      {p.title}
                    </h3>
                    <div className="mt-1">
                      <PriceDisplay price={dynamicPriceTRY} size="sm" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-border/60">
                    <Link href={`/admin/products/${p.id}`} className="flex-1">
                      <Button variant="outline" size="xs" className="w-full">
                        {t("view")}
                      </Button>
                    </Link>
                    <Link href={`/admin/products/${p.id}/edit`} className="flex-1">
                      <Button variant="outline" size="xs" className="w-full">
                        {t("edit")}
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      size="xs"
                      onClick={() => setProductToDelete(p)}
                      title={t("permanentDelete")}
                    >
                      {t("delete")}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Pagination Bar */}
      {products.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border border-border rounded-sm bg-surface shadow-flat text-body-small">
          <div className="flex items-center gap-2">
            <span className="text-muted">{t("show")}:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 border border-border rounded-xs bg-background font-medium focus:outline-none focus:ring-1 focus:ring-focus-ring"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-muted">{t("perPage")}</span>
          </div>

          <div className="text-muted">
            {t("showing")} <span className="font-medium text-foreground">{sortedProducts.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}</span> {t("to")}{" "}
            <span className="font-medium text-foreground">{Math.min(currentPage * pageSize, sortedProducts.length)}</span> {t("of")}{" "}
            <span className="font-medium text-foreground">{sortedProducts.length}</span> {t("results")}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="xs"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              {t("previous")}
            </Button>
            <span className="px-3 font-medium tabular-nums text-foreground">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="xs"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              {t("next")}
            </Button>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        isOpen={Boolean(productToDelete)}
        onClose={() => {
          if (!isDeleting) setProductToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title={t("confirmDeleteTitle")}
        description={
          <span>
            {t("confirmDeleteDesc")}{" "}
            <strong className="text-foreground font-semibold">&quot;{productToDelete?.title}&quot;</strong>.
          </span>
        }
        confirmLabel={t("delete")}
        cancelLabel={t("cancel")}
        isDestructive={true}
        isLoading={isDeleting}
      />
    </div>
  );
}
