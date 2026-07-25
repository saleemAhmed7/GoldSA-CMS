"use client";

import { Breadcrumbs, type BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { GlobalSearch } from "@/components/layout/global-search";
import { UserMenuPlaceholder } from "@/components/layout/user-menu-placeholder";
import { useLanguage } from "@/components/providers/language-provider";
import { CurrencySwitcher, IconButton, LanguageSwitcher, Typography } from "@/components/ui";

interface TopHeaderProps {
  breadcrumbs: readonly BreadcrumbItem[];
  onToggleSidebar: () => void;
  onOpenMobileSidebar: () => void;
  sidebarCollapsed?: boolean;
}

export function TopHeader({
  breadcrumbs,
  onToggleSidebar,
  onOpenMobileSidebar,
  sidebarCollapsed = false,
}: TopHeaderProps) {
  const { t } = useLanguage();

  function handleToggle() {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      onOpenMobileSidebar();
    } else {
      onToggleSidebar();
    }
  }

  return (
    <header className="sticky top-0 z-sticky-header border-b border-border bg-surface/95 shadow-low backdrop-blur-md transition-all duration-standard">
      <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-6">
        {/* Hamburger Icon Toggle & Workspace Breadcrumbs */}
        <div className="flex min-w-0 items-center gap-3">
          <IconButton
            variant="outline"
            size="sm"
            aria-label={sidebarCollapsed ? "Expand navigation" : "Collapse navigation"}
            title="Toggle sidebar"
            className="shrink-0 text-foreground hover:text-brand-gold-polished hover:border-brand-gold-polished transition-colors"
            onClick={handleToggle}
            icon={
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            }
          />

          <div className="min-w-0 flex flex-col">
            <Typography variant="labelMeta" tone="accent" className="hidden sm:block text-[11px] uppercase tracking-wider font-semibold">
              {t("workspace")}
            </Typography>
            <Breadcrumbs items={breadcrumbs} className="hidden sm:block" />
            <Typography variant="bodySmall" className="truncate sm:hidden font-medium">
              GoldSA CMS
            </Typography>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 justify-center max-w-sm mx-4">
          <GlobalSearch className="w-full" />
        </div>

        {/* Action Controls: Globe Icon Dropdown, Currency Symbol Icon Dropdown, User Menu */}
        <div className="flex items-center gap-2.5 shrink-0">
          <LanguageSwitcher />
          <CurrencySwitcher />
          <div className="h-5 w-px bg-border/80 mx-1 hidden sm:block" />
          <UserMenuPlaceholder className="shrink-0" />
        </div>
      </div>
    </header>
  );
}

export type { TopHeaderProps };
