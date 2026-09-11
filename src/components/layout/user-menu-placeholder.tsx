"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Button, Card, Typography } from "@/components/ui";

interface UserMenuPlaceholderProps {
  className?: string;
}

export function UserMenuPlaceholder({ className }: UserMenuPlaceholderProps) {
  const { t } = useLanguage();

  return (
    <Button
      type="button"
      variant="ghost"
      size="md"
      className={className}
      aria-haspopup="menu"
      aria-label={t("administrator")}
    >
      <span className="flex items-center gap-layout-3">
        <Card
          aria-hidden="true"
          size="sm"
          className="flex size-layout-8 items-center justify-center rounded-md border-brand-gold-polished bg-accent-subtle p-0 shadow-low"
        >
          <Typography as="span" variant="labelMeta" tone="accent">
            GS
          </Typography>
        </Card>
        <span className="hidden min-w-0 text-left rtl:text-right sm:block">
          <Typography as="span" variant="bodySmall" className="block truncate font-medium">
            {t("administrator")}
          </Typography>
          <Typography as="span" variant="labelMeta" tone="accent" className="block truncate text-[10px]">
            {t("superAdmin")}
          </Typography>
        </span>
      </span>
    </Button>
  );
}
