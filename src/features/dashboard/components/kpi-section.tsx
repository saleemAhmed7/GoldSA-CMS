"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Badge, Card, PriceDisplay, StatusIndicator, Typography } from "@/components/ui";

export function KpiSection() {
  const { t } = useLanguage();

  // Revenue in TRY (base currency)
  const totalRevenueTRY = 3850000;
  const prevRevenueTRY = 3370000;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {/* 1. Total Sales Revenue */}
      <Card variant="elevated" size="md" className="flex flex-col justify-between gap-3 h-full border-brand-gold-muted/20 hover:border-brand-gold-polished/40 transition-all shadow-flat hover:shadow-medium">
        <div className="flex items-center justify-between">
          <Typography variant="labelMeta" tone="muted">
            {t("totalSalesRevenue")}
          </Typography>
          <Badge variant="success" className="tabular-nums">+14.2%</Badge>
        </div>
        <div>
          <PriceDisplay price={totalRevenueTRY} size="lg" className="tabular-nums" />
          <Typography as="span" variant="bodySmall" tone="muted" className="block mt-1 tabular-nums">
            {t("vsPreviousMonth")}: <PriceDisplay price={prevRevenueTRY} size="sm" className="text-muted line-through font-normal inline tabular-nums" />
          </Typography>
        </div>
      </Card>

      {/* 2. Active Open Orders */}
      <Card variant="elevated" size="md" className="relative overflow-hidden flex flex-col justify-between gap-3 h-full border-border hover:border-brand-gold-polished/40 transition-all shadow-flat hover:shadow-medium">
        <div className="flex items-start justify-between gap-3">
          <div className="relative flex min-h-6 items-center pl-6">
            <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 z-0">
              <StatusIndicator status="info" pulse className="shrink-0" />
            </span>
            <Typography variant="labelMeta" tone="muted" className="leading-5">
              {t("activeOpenOrders")}
            </Typography>
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2 tabular-nums">
            <span className="font-display text-header-1 font-semibold text-foreground leading-none">24</span>
            <Typography variant="bodySmall" tone="muted">
              {t("inFulfillmentQueue")}
            </Typography>
          </div>
          <Typography variant="bodySmall" tone="muted" className="mt-1 tabular-nums">
            5 {t("pendingPaymentVerification")}
          </Typography>
        </div>
      </Card>

      {/* 3. Gold Inventory Items */}
      <Card variant="elevated" size="md" className="flex flex-col justify-between gap-3 h-full border-border hover:border-brand-gold-polished/40 transition-all shadow-flat hover:shadow-medium">
        <div className="flex items-center justify-between">
          <Typography variant="labelMeta" tone="muted">
            {t("catalogInventory")}
          </Typography>
          <Badge variant="accent" className="tabular-nums">4,820g Gold</Badge>
        </div>
        <div>
          <div className="flex items-baseline gap-2 tabular-nums">
            <span className="font-display text-header-1 font-semibold text-foreground leading-none">148</span>
            <Typography variant="bodySmall" tone="muted">
              {t("activeJewelryItems")}
            </Typography>
          </div>
          <Typography variant="bodySmall" tone="muted" className="mt-1">
            {t("gold24k")}, {t("gold22k")} & {t("gold18k")}
          </Typography>
        </div>
      </Card>

      {/* 4. Low Stock Alerts */}
      <Card variant="elevated" size="md" className="relative overflow-hidden flex flex-col justify-between gap-3 h-full border-semantic-warning/30 bg-semantic-warning/5 hover:border-semantic-warning transition-all shadow-flat hover:shadow-medium">
        <div className="flex items-start justify-between gap-3">
          <div className="relative flex min-h-6 items-center pl-6">
            <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 z-0">
              <StatusIndicator status="warning" pulse className="shrink-0" />
            </span>
            <Typography variant="labelMeta" tone="warning" className="leading-5">
              {t("lowStockAlerts")}
            </Typography>
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2 tabular-nums">
            <span className="font-display text-header-1 font-semibold text-semantic-warning leading-none">3</span>
            <Typography variant="bodySmall" tone="warning">
              {t("itemsNeedReorder")}
            </Typography>
          </div>
          <Typography variant="bodySmall" tone="muted" className="mt-1">
            Solitaire Ring & Royal Bangle low
          </Typography>
        </div>
      </Card>
    </div>
  );
}
