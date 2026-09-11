"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Button, Card, PlusIcon, Typography } from "@/components/ui";

export function QuickActionsBar() {
  const { t } = useLanguage();

  return (
    <Card variant="standard" size="md" className="flex flex-col gap-3 w-full bg-accent-subtle/20 border-brand-gold-muted/30 shadow-flat">
      <div className="flex items-center justify-between">
        <Typography variant="labelMeta" tone="accent" className="font-semibold text-brand-gold-polished uppercase tracking-wide">
          {t("quickActions")}
        </Typography>
        <Typography variant="bodySmall" tone="muted">
          {t("quickActionsDesc")}
        </Typography>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary" size="md" leadingIcon={<PlusIcon />}>
          {t("addNewJewelry")}
        </Button>
        <Button variant="secondary" size="md">
          {t("updateGoldRates")}
        </Button>
        <Button variant="outline" size="md">
          {t("fulfillOrders")}
        </Button>
        <Button variant="outline" size="md">
          {t("uploadCertificate")}
        </Button>
        <Button variant="outline" size="md">
          {t("exportReport")}
        </Button>
      </div>
    </Card>
  );
}
