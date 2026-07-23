import { Breadcrumbs, type BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { GlobalSearch } from "@/components/layout/global-search";
import { UserMenuPlaceholder } from "@/components/layout/user-menu-placeholder";
import { Button, Typography } from "@/components/ui";

interface TopHeaderProps {
  breadcrumbs: readonly BreadcrumbItem[];
  onOpenMobileSidebar: () => void;
}

export function TopHeader({ breadcrumbs, onOpenMobileSidebar }: TopHeaderProps) {
  return (
    <header className="sticky top-0 z-sticky-header border-b border-border bg-background/80 shadow-low backdrop-blur-md">
      <div className="flex min-h-[calc(var(--spacing-layout-12)+var(--spacing-layout-4))] items-center gap-layout-3 px-layout-4 lg:gap-layout-4 lg:px-layout-6">
        <div className="flex min-w-0 flex-1 items-center gap-layout-3">
          <Button
            type="button"
            variant="outline"
            size="md"
            className="shrink-0 lg:hidden"
            onClick={onOpenMobileSidebar}
            aria-controls="mobile-application-sidebar"
            aria-label="Open navigation"
          >
            Menu
          </Button>

          <div className="min-w-0">
            <Typography variant="labelMeta" tone="accent" className="hidden sm:block">
              Admin Workspace
            </Typography>
            <Breadcrumbs items={breadcrumbs} className="hidden sm:block" />
            <Typography variant="bodySmall" className="truncate sm:hidden">
              GoldSA CMS
            </Typography>
          </div>
        </div>

        <GlobalSearch className="hidden w-full max-w-[calc(var(--spacing-layout-16)*4+var(--spacing-layout-8))] md:block" />
        <UserMenuPlaceholder className="shrink-0" />
      </div>
    </header>
  );
}

export type { TopHeaderProps };
