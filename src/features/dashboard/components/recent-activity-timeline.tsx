"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Card, Timeline, Typography } from "@/components/ui";

export function RecentActivityTimeline() {
  const { t } = useLanguage();

  const auditLogs = [
    {
      id: "act-1",
      title: t("gold24k") + " base rate updated",
      date: "10 mins ago",
      description: "Operator adjusted 24K spot rate.",
    },
    {
      id: "act-2",
      title: t("recentOrders") + " #ORD-9402",
      date: "35 mins ago",
      description: "Princess Noura Al-Saud purchased Heritage Bangle Set.",
    },
    {
      id: "act-3",
      title: t("uploadCertificate") + " #GIA-74921",
      date: "2 hours ago",
      description: "GIA certificate attached to Celestial Pendant.",
    },
    {
      id: "act-4",
      title: t("lowStockAlerts") + " triggered",
      date: "4 hours ago",
      description: "Royal Solitaire Ring (18K) reached safety limit.",
    },
    {
      id: "act-5",
      title: t("catalogInventory") + " price recalculation",
      date: "Yesterday",
      description: "Automated batch recalculation updated 148 product prices.",
    },
  ];

  return (
    <Card variant="standard" size="lg" className="flex flex-col gap-4 w-full border-brand-gold-muted/20 bg-surface shadow-flat">
      <div>
        <Typography variant="h3" className="text-foreground font-display font-semibold">
          {t("recentActivityLedger")}
        </Typography>
        <Typography variant="bodySmall" tone="muted">
          {t("auditTrailDesc")}
        </Typography>
      </div>

      <div className="pt-2">
        <Timeline events={auditLogs} />
      </div>
    </Card>
  );
}
