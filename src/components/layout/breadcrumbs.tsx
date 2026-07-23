import { Typography } from "@/components/ui";
import { cn } from "@/lib/cn";

interface BreadcrumbItem {
  label: string;
}

interface BreadcrumbsProps {
  items: readonly BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("min-w-0", className)}>
      <ol className="flex min-w-0 items-center gap-layout-2">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-layout-2">
              {index > 0 ? (
                <Typography as="span" variant="labelMeta" tone="muted" aria-hidden="true">
                  /
                </Typography>
              ) : null}
              <Typography
                as="span"
                variant={isCurrent ? "bodySmall" : "labelMeta"}
                tone={isCurrent ? "default" : "muted"}
                className="truncate"
                aria-current={isCurrent ? "page" : undefined}
              >
                {item.label}
              </Typography>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export type { BreadcrumbItem, BreadcrumbsProps };
