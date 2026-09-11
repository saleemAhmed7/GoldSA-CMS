import { Badge } from "@/components/ui";
import { useLanguage } from "@/components/providers/language-provider";
import type { ProductStatus } from "../types";

export interface ProductStatusBadgeProps {
  status: ProductStatus;
  isDeleted?: boolean;
  className?: string;
}

export function ProductStatusBadge({ status, isDeleted, className }: ProductStatusBadgeProps) {
  const { t } = useLanguage();

  if (isDeleted) {
    return <Badge variant="error" className={className}>{t("softDelete")}</Badge>;
  }

  switch (status) {
    case "active":
      return <Badge variant="success" className={className}>{t("active")}</Badge>;
    case "draft":
      return <Badge variant="warning" className={className}>{t("draft")}</Badge>;
    case "archived":
      return <Badge variant="neutral" className={className}>{t("archived")}</Badge>;
    default:
      return <Badge variant="neutral" className={className}>{status}</Badge>;
  }
}
