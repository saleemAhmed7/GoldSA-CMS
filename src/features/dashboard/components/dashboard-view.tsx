"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Button, Card, EmptyState, SegmentedControl, Skeleton, Typography } from "@/components/ui";
import { DashboardHeader } from "./dashboard-header";
import { KpiSection } from "./kpi-section";
import { ChartsSection } from "./charts-section";
import { OrdersInventorySummary } from "./orders-inventory-summary";
import { RecentOrdersTable } from "./recent-orders-table";
import { TopSellingProducts } from "./top-selling-products";
import { RecentActivityTimeline } from "./recent-activity-timeline";
import { QuickActionsBar } from "./quick-actions-bar";

type ViewState = "normal" | "loading" | "empty";

export function DashboardView() {
  const { t } = useLanguage();
  const [viewState, setViewState] = useState<ViewState>("normal");

  return (
    <div className="flex flex-col gap-8 w-full pb-12">
      {/* Dev Preview Mode Toggle Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 rounded-sm border border-border bg-surface/90 shadow-flat text-body-small">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-brand-gold-polished shrink-0">{t("statePreview")}</span>
          <Typography variant="bodySmall" tone="muted" className="hidden sm:block truncate">
            {t("testConditions")}
          </Typography>
        </div>
        <div className="shrink-0">
          <SegmentedControl
            size="sm"
            value={viewState}
            onChange={(val) => setViewState(val as ViewState)}
            options={[
              { value: "normal", label: t("normalView") },
              { value: "loading", label: t("loadingSkeleton") },
              { value: "empty", label: t("emptyState") },
            ]}
          />
        </div>
      </div>

      {/* Loading Skeletons View */}
      {viewState === "loading" ? (
        <div className="flex flex-col gap-8 w-full animate-in fade-in">
          <Skeleton variant="card" className="h-28 w-full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Skeleton variant="card" className="h-32" />
            <Skeleton variant="card" className="h-32" />
            <Skeleton variant="card" className="h-32" />
            <Skeleton variant="card" className="h-32" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton variant="card" className="lg:col-span-2 h-72" />
            <Skeleton variant="card" className="h-72" />
          </div>
          <Skeleton variant="card" className="h-64 w-full" />
        </div>
      ) : viewState === "empty" ? (
        /* Empty State View */
        <Card variant="standard" size="lg" className="my-8 border-border bg-surface">
          <EmptyState
            title={t("noDataTitle")}
            description={t("noDataDesc")}
            action={
              <Button variant="primary" size="md" onClick={() => setViewState("normal")}>
                {t("returnToNormal")}
              </Button>
            }
          />
        </Card>
      ) : (
        /* Normal Complete Dashboard View */
        <div className="flex flex-col gap-8 w-full">
          <DashboardHeader />
          <QuickActionsBar />
          <KpiSection />
          <ChartsSection />
          <OrdersInventorySummary />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <RecentOrdersTable />
              <TopSellingProducts />
            </div>
            <div className="flex flex-col gap-6">
              <RecentActivityTimeline />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
