import { cn } from "@/lib/cn";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  size?: "sm" | "md";
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  size = "md",
}: PaginationProps) {
  function getPages(): (number | string)[] {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }

  return (
    <nav aria-label="Pagination" className={cn("inline-flex items-center gap-1.5", className)}>
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={cn(
          "inline-flex items-center justify-center rounded-sm border border-border bg-surface text-muted hover:border-brand-gold-muted hover:text-brand-gold-polished disabled:opacity-40 disabled:pointer-events-none transition-colors",
          size === "sm" ? "size-8 text-xs" : "size-10 text-sm",
        )}
        aria-label="Previous Page"
      >
        ‹
      </button>

      {getPages().map((page, idx) => {
        if (page === "...") {
          return (
            <span key={`dots-${idx}`} className="px-2 text-muted select-none">
              …
            </span>
          );
        }
        const isCurrent = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            aria-current={isCurrent ? "page" : undefined}
            onClick={() => onPageChange(page as number)}
            className={cn(
              "inline-flex items-center justify-center font-medium rounded-sm border transition-colors",
              size === "sm" ? "size-8 text-xs" : "size-10 text-sm",
              isCurrent
                ? "border-brand-gold-polished bg-brand-gold-polished text-brand-obsidian font-semibold shadow-low"
                : "border-border bg-surface text-foreground hover:border-brand-gold-muted hover:text-brand-gold-polished",
            )}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={cn(
          "inline-flex items-center justify-center rounded-sm border border-border bg-surface text-muted hover:border-brand-gold-muted hover:text-brand-gold-polished disabled:opacity-40 disabled:pointer-events-none transition-colors",
          size === "sm" ? "size-8 text-xs" : "size-10 text-sm",
        )}
        aria-label="Next Page"
      >
        ›
      </button>
    </nav>
  );
}


