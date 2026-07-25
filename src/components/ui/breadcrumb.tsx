import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  isCurrent?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
}

export function Breadcrumb({ items, separator = "/", className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("inline-flex items-center gap-2", className)}>
      <ol className="flex items-center gap-2 text-body-small">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1 || item.isCurrent;
          return (
            <li key={idx} className="inline-flex items-center gap-2">
              {idx > 0 && <span className="text-muted select-none">{separator}</span>}
              {isLast ? (
                <span aria-current="page" className="font-medium text-foreground">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href || "#"}
                  className="text-muted hover:text-brand-gold-polished transition-colors"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}


