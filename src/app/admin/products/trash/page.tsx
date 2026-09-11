"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";
import { Button, Typography } from "@/components/ui";
import { ProductsListView } from "@/features/products";

export default function ProductsTrashPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <Typography variant="h1" className="font-display font-semibold text-foreground">
            {t("trashBin")}
          </Typography>
          <Typography variant="bodySmall" tone="muted" className="mt-1">
            {t("trashBinDesc")}
          </Typography>
        </div>
        <Link href="/admin/products">
          <Button variant="outline" size="sm">
            {t("backToProducts")}
          </Button>
        </Link>
      </div>

      <ProductsListView />
    </div>
  );
}
