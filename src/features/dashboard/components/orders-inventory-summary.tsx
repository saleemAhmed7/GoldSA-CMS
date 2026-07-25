"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Badge, Card, InventoryBadge, OrderStatus, Progress, Typography } from "@/components/ui";

export function OrdersInventorySummary() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Order Status Distribution */}
      <Card variant="standard" size="md" className="flex flex-col justify-between gap-4 h-full border-brand-gold-muted/20 bg-surface shadow-flat">
        <div>
          <Typography variant="h3" className="text-foreground font-display font-semibold">
            {t("fulfillmentLifecycle")}
          </Typography>
          <Typography variant="bodySmall" tone="muted">
            {t("orderProgression")}
          </Typography>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <OrderStatus status="pending" />
            <span className="text-body-small font-medium text-foreground">5 orders (20.8%)</span>
          </div>
          <Progress value={20.8} size="sm" />

          <div className="flex items-center justify-between mt-1">
            <OrderStatus status="paid" />
            <span className="text-body-small font-medium text-foreground">8 orders (33.3%)</span>
          </div>
          <Progress value={33.3} size="sm" />

          <div className="flex items-center justify-between mt-1">
            <OrderStatus status="shipped" />
            <span className="text-body-small font-medium text-foreground">7 orders (29.2%)</span>
          </div>
          <Progress value={29.2} size="sm" />

          <div className="flex items-center justify-between mt-1">
            <OrderStatus status="delivered" />
            <span className="text-body-small font-medium text-foreground">4 orders (16.7%)</span>
          </div>
          <Progress value={16.7} size="sm" />
        </div>
      </Card>

      {/* Inventory Health & Safety Thresholds */}
      <Card variant="standard" size="md" className="flex flex-col justify-between gap-4 h-full border-brand-gold-muted/20 bg-surface shadow-flat">
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="h3" className="text-foreground font-display font-semibold">
              {t("inventoryHealth")}
            </Typography>
            <Typography variant="bodySmall" tone="muted">
              {t("stockLevelsAndWarnings")}
            </Typography>
          </div>
          <Badge variant="warning">3 {t("actionItems")}</Badge>
        </div>

        <div className="flex flex-col gap-3 divide-y divide-border/60">
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              <span className="text-body-default font-medium text-foreground">Royal Solitaire Ring (18K)</span>
              <span className="text-label-meta text-muted">SKU: RNG-1092</span>
            </div>
            <InventoryBadge state="low-stock" />
          </div>

          <div className="flex items-center justify-between pt-3">
            <div className="flex flex-col">
              <span className="text-body-default font-medium text-foreground">Heritage Bangle Set (22K)</span>
              <span className="text-label-meta text-muted">SKU: BNG-2041</span>
            </div>
            <InventoryBadge state="low-stock" />
          </div>

          <div className="flex items-center justify-between pt-3">
            <div className="flex flex-col">
              <span className="text-body-default font-medium text-foreground">Diamond Pendant Necklace</span>
              <span className="text-label-meta text-muted">SKU: NCK-3011</span>
            </div>
            <InventoryBadge state="out-of-stock" />
          </div>
        </div>
      </Card>
    </div>
  );
}
