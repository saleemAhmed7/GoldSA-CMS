"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Card, Typography, StatusIndicator } from "@/components/ui";
import type { Product } from "../types";

export interface ProductStatsCardsProps {
  products: Product[];
}

export function ProductStatsCards({ products }: ProductStatsCardsProps) {
  const { t } = useLanguage();
  const total = products.filter((p) => !p.isDeleted).length;
  const active = products.filter((p) => !p.isDeleted && p.status === "active").length;
  const draft = products.filter((p) => !p.isDeleted && p.status === "draft").length;
  const featured = products.filter((p) => !p.isDeleted && p.isFeatured).length;
  const lowStock = products.filter((p) => !p.isDeleted && p.stockQuantity > 0 && p.stockQuantity <= p.lowStockThreshold).length;
  const outOfStock = products.filter((p) => !p.isDeleted && p.stockQuantity <= 0).length;
  const deleted = products.filter((p) => p.isDeleted).length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 w-full">
      <Card variant="standard" size="sm" className="flex flex-col p-3 border-border bg-surface shadow-flat">
        <Typography variant="labelMeta" tone="muted" className="uppercase font-semibold tracking-wider text-[11px]">
          {t("total")}
        </Typography>
        <div className="flex items-center justify-between mt-1">
          <span className="font-display text-header-2 font-semibold text-foreground tabular-nums">{total}</span>
          <StatusIndicator status="info" />
        </div>
      </Card>

      <Card variant="standard" size="sm" className="flex flex-col p-3 border-border bg-surface shadow-flat">
        <Typography variant="labelMeta" tone="muted" className="uppercase font-semibold tracking-wider text-[11px]">
          {t("active")}
        </Typography>
        <div className="flex items-center justify-between mt-1">
          <span className="font-display text-header-2 font-semibold text-semantic-success tabular-nums">{active}</span>
          <StatusIndicator status="success" />
        </div>
      </Card>

      <Card variant="standard" size="sm" className="flex flex-col p-3 border-border bg-surface shadow-flat">
        <Typography variant="labelMeta" tone="muted" className="uppercase font-semibold tracking-wider text-[11px]">
          {t("draft")}
        </Typography>
        <div className="flex items-center justify-between mt-1">
          <span className="font-display text-header-2 font-semibold text-muted tabular-nums">{draft}</span>
          <StatusIndicator status="neutral" />
        </div>
      </Card>

      <Card variant="standard" size="sm" className="flex flex-col p-3 border-border bg-surface shadow-flat">
        <Typography variant="labelMeta" tone="muted" className="uppercase font-semibold tracking-wider text-[11px]">
          {t("featured")}
        </Typography>
        <div className="flex items-center justify-between mt-1">
          <span className="font-display text-header-2 font-semibold text-brand-gold-polished tabular-nums">{featured}</span>
          <span className="text-brand-gold-polished text-xs">★</span>
        </div>
      </Card>

      <Card variant="standard" size="sm" className="flex flex-col p-3 border-border bg-surface shadow-flat">
        <Typography variant="labelMeta" tone="muted" className="uppercase font-semibold tracking-wider text-[11px]">
          {t("lowStock")}
        </Typography>
        <div className="flex items-center justify-between mt-1">
          <span className="font-display text-header-2 font-semibold text-semantic-warning tabular-nums">{lowStock}</span>
          <StatusIndicator status="warning" />
        </div>
      </Card>

      <Card variant="standard" size="sm" className="flex flex-col p-3 border-border bg-surface shadow-flat">
        <Typography variant="labelMeta" tone="muted" className="uppercase font-semibold tracking-wider text-[11px]">
          {t("outOfStockStatus")}
        </Typography>
        <div className="flex items-center justify-between mt-1">
          <span className="font-display text-header-2 font-semibold text-semantic-error tabular-nums">{outOfStock}</span>
          <StatusIndicator status="error" />
        </div>
      </Card>

      <Card variant="standard" size="sm" className="flex flex-col p-3 border-border bg-surface shadow-flat">
        <Typography variant="labelMeta" tone="muted" className="uppercase font-semibold tracking-wider text-[11px]">
          {t("trash")}
        </Typography>
        <div className="flex items-center justify-between mt-1">
          <span className="font-display text-header-2 font-semibold text-muted tabular-nums">{deleted}</span>
          <span className="text-muted text-xs">🗑</span>
        </div>
      </Card>
    </div>
  );
}
