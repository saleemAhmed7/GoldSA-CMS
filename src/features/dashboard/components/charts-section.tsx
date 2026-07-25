"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { useCurrency } from "@/components/providers/currency-provider";
import { Badge, Card, Progress, SegmentedControl, Typography } from "@/components/ui";

export function ChartsSection() {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const [chartView, setChartView] = useState("revenue");

  // Peak revenue in TRY
  const peakRevenueTRY = 540000;
  const k22_RevenueTRY = 2079000;
  const k18_RevenueTRY = 1232000;
  const k24_RevenueTRY = 539000;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      {/* Sales Revenue Trend Chart Placeholder */}
      <Card variant="standard" size="lg" className="lg:col-span-2 flex flex-col justify-between gap-6 border-brand-gold-muted/20 bg-surface shadow-flat">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Typography variant="h3" className="text-foreground font-display font-semibold">
              {t("salesRevenueTrend")}
            </Typography>
            <Typography variant="bodySmall" tone="muted">
              {t("monthlyRevenueBreakdown")}
            </Typography>
          </div>
          <SegmentedControl
            size="sm"
            value={chartView}
            onChange={setChartView}
            options={[
              { value: "revenue", label: "Revenue" },
              { value: "orders", label: "Orders" },
            ]}
          />
        </div>

        {/* Visual Chart Graphic Placeholder */}
        <div className="relative flex flex-col justify-between h-56 w-full border border-border/60 rounded-sm bg-background/60 p-4 overflow-hidden">
          {/* Background Grid Lines */}
          <div className="absolute inset-x-4 top-8 border-b border-border/40 border-dashed" />
          <div className="absolute inset-x-4 top-20 border-b border-border/40 border-dashed" />
          <div className="absolute inset-x-4 top-32 border-b border-border/40 border-dashed" />
          <div className="absolute inset-x-4 top-44 border-b border-border/40 border-dashed" />

          {/* SVG Trend Curve */}
          <svg className="absolute inset-0 size-full overflow-visible p-4" preserveAspectRatio="none" viewBox="0 0 500 150">
            <defs>
              <linearGradient id="goldLightGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <path
              d="M 0 120 Q 80 40, 160 80 T 320 30 T 500 10 L 500 150 L 0 150 Z"
              fill="url(#goldLightGradient)"
            />
            <path
              d="M 0 120 Q 80 40, 160 80 T 320 30 T 500 10"
              fill="none"
              stroke="#C5A059"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>

          <div className="z-10 flex justify-between text-label-meta text-muted mt-auto pt-4 font-medium">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-border/60 text-body-small">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-brand-gold-polished" />
              <span className="text-foreground font-medium">{t("customOrders")} (62%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-brand-gold-muted/40" />
              <span className="text-muted">{t("standardCatalog")} (38%)</span>
            </div>
          </div>
          <Badge variant="accent">{t("peak")}: {formatPrice(peakRevenueTRY)}</Badge>
        </div>
      </Card>

      {/* Karat Sales Distribution Panel */}
      <Card variant="standard" size="lg" className="flex flex-col justify-between gap-6 border-brand-gold-muted/20 bg-surface shadow-flat">
        <div>
          <Typography variant="h3" className="text-foreground font-display font-semibold">
            {t("revenueByKrat")}
          </Typography>
          <Typography variant="bodySmall" tone="muted" className="mt-1">
            {t("goldPuritySales")}
          </Typography>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-body-small font-medium">
              <span className="text-foreground">{t("gold22k")}</span>
              <span className="text-brand-gold-polished font-semibold">54% ({formatPrice(k22_RevenueTRY)})</span>
            </div>
            <Progress value={54} size="md" />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-body-small font-medium">
              <span className="text-foreground">{t("gold18k")}</span>
              <span className="text-brand-gold-polished font-semibold">32% ({formatPrice(k18_RevenueTRY)})</span>
            </div>
            <Progress value={32} size="md" />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-body-small font-medium">
              <span className="text-foreground">{t("gold24k")}</span>
              <span className="text-brand-gold-polished font-semibold">14% ({formatPrice(k24_RevenueTRY)})</span>
            </div>
            <Progress value={14} size="md" />
          </div>
        </div>

        <div className="p-3 rounded-sm border border-border bg-background/80 text-body-small text-muted font-medium">
          {t("bangleInsight")}
        </div>
      </Card>
    </div>
  );
}
