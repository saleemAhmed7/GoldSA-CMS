"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Input, Label } from "@/components/ui";

interface GlobalSearchProps {
  className?: string;
}

export function GlobalSearch({ className }: GlobalSearchProps) {
  const { t } = useLanguage();

  return (
    <div className={className}>
      <Label htmlFor="global-shell-search" className="sr-only">
        {t("searchWorkspace")}
      </Label>
      <Input
        id="global-shell-search"
        variant="search"
        size="md"
        type="search"
        className="border-border bg-surface/80 shadow-flat"
        placeholder={t("searchWorkspace")}
        aria-label={t("searchWorkspace")}
        readOnly
      />
    </div>
  );
}
