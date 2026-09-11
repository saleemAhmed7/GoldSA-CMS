"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { useCurrency } from "@/components/providers/currency-provider";
import { useGoldPrice } from "@/components/providers/gold-price-provider";
import { Badge, Button, Card, SegmentedControl, StatusIndicator, Typography } from "@/components/ui";

export function DashboardHeader() {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const { rates, refresh, isLoading, isLive } = useGoldPrice();
  const [timeRange, setTimeRange] = useState("30d");
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function handleRefresh() {
    setIsRefreshing(true);
    await refresh();
    setIsRefreshing(false);
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Top Welcome Title & Filter Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Typography variant="h1" className="text-foreground font-display font-semibold tracking-tight">
              {t("operationsControlRoom")}
            </Typography>
            <Badge variant={isLive ? "success" : "accent"}>{isLive ? t("live") : "Cached"}</Badge>
          </div>
          <Typography variant="bodySmall" tone="muted" className="mt-1">
            {t("adminSubtitle")}
          </Typography>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <SegmentedControl
            size="sm"
            value={timeRange}
            onChange={setTimeRange}
            options={[
              { value: "today", label: t("today") },
              { value: "7d", label: t("days7") },
              { value: "30d", label: t("days30") },
              { value: "ytd", label: t("ytd") },
            ]}
          />
          <Button variant="outline" size="sm" isLoading={isRefreshing || isLoading} onClick={handleRefresh}>
            {t("refreshRates")}
          </Button>
        </div>
      </div>

      {/* Gold Spot Rates Ticker Card */}
      <Card variant="standard" size="sm" className="bg-surface border-brand-gold-muted/30 shadow-flat hover:shadow-medium transition-shadow">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-2">
          <div className="flex items-center gap-2">
            <StatusIndicator status={isLive ? "success" : "info"} pulse />
            <Typography variant="labelMeta" tone="accent" className="font-semibold text-brand-gold-polished uppercase tracking-wide">
              {t("liveGoldMarketRates")}
            </Typography>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse divide-border/80 text-left rtl:text-right">
            <div className="flex flex-col py-1 sm:py-0 sm:px-2">
              <Typography variant="labelMeta" tone="muted">
                {t("gold24k")}
              </Typography>
              <div className="flex items-baseline gap-1 mt-0.5 tabular-nums flex-wrap">
                <span className="font-display font-semibold text-foreground text-body-default">
                  {formatPrice(rates["24K"])} / {t("perGram")}
                </span>
                <span className="text-[10px] text-semantic-success font-medium">+0.4%</span>
              </div>
            </div>

            <div className="flex flex-col pt-2 sm:pt-0 sm:px-2 sm:pl-4 rtl:sm:pl-2 rtl:sm:pr-4">
              <Typography variant="labelMeta" tone="muted">
                {t("gold22k")}
              </Typography>
              <div className="flex items-baseline gap-1 mt-0.5 tabular-nums flex-wrap">
                <span className="font-display font-semibold text-foreground text-body-default">
                  {formatPrice(rates["22K"])} / {t("perGram")}
                </span>
                <span className="text-[10px] text-semantic-success font-medium">+0.3%</span>
              </div>
            </div>

            <div className="flex flex-col pt-2 sm:pt-0 sm:px-2 sm:pl-4 rtl:sm:pl-2 rtl:sm:pr-4">
              <Typography variant="labelMeta" tone="muted">
                {t("gold18k")}
              </Typography>
              <div className="flex items-baseline gap-1 mt-0.5 tabular-nums flex-wrap">
                <span className="font-display font-semibold text-foreground text-body-default">
                  {formatPrice(rates["18K"])} / {t("perGram")}
                </span>
                <span className="text-[10px] text-semantic-warning font-medium">0.0%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
