import { Button, Card, Typography } from "@/components/ui";
import { LogoArea } from "@/components/layout/logo-area";
import { shellNavigationItems } from "@/components/layout/shell-data";
import { cn } from "@/lib/cn";

interface PremiumSidebarProps {
  collapsed: boolean;
  mobileOpen?: boolean;
  onToggleCollapsed?: () => void;
  onCloseMobile?: () => void;
  id?: string;
  mode?: "desktop" | "mobile";
}

const expandedWidthClass = "w-[calc(var(--spacing-layout-16)*4+var(--spacing-layout-1))]";
const sidebarSurfaceStyles =
  "flex h-dvh flex-col border-r border-border bg-surface text-foreground shadow-low transition-all duration-standard ease-out-quart";

export function PremiumSidebar({
  collapsed,
  mobileOpen = false,
  onToggleCollapsed,
  onCloseMobile,
  id,
  mode = "desktop",
}: PremiumSidebarProps) {
  const isMobile = mode === "mobile";
  const isCollapsed = isMobile ? false : collapsed;

  return (
    <aside
      id={id}
      className={cn(
        sidebarSurfaceStyles,
        isCollapsed ? "w-layout-16" : expandedWidthClass,
        isMobile &&
          "fixed inset-y-0 left-0 z-drawer-slide max-w-[calc(100dvw-var(--spacing-layout-8))] shadow-overlay",
        isMobile && (mobileOpen ? "translate-x-0" : "-translate-x-full"),
        !isMobile && "hidden lg:flex",
      )}
      aria-label={isMobile ? "Mobile application navigation" : "Application navigation"}
    >
      <LogoArea collapsed={isCollapsed} />

      <div className={cn("px-layout-4 pb-layout-3", isCollapsed && "px-layout-3")}>
        <div className="h-px bg-border" />
      </div>

      <nav
        className={cn(
          "flex flex-1 flex-col gap-layout-1 overflow-y-auto px-layout-3 py-layout-2",
          "[scrollbar-gutter:stable]",
        )}
        aria-label="Primary"
      >
        {!isCollapsed ? (
          <Typography
            as="p"
            variant="labelMeta"
            tone="muted"
            className="px-layout-3 pb-layout-2 pt-layout-1"
          >
            Workspace
          </Typography>
        ) : null}

        {shellNavigationItems.map((item, index) => {
          const isActive = index === 0;

          return (
            <div key={item.label} className="relative">
              {isActive ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-y-layout-2 left-0 w-[var(--radius-accent)] rounded-full bg-brand-gold-polished"
                />
              ) : null}
              <Button
                type="button"
                variant={isActive ? "soft" : "ghost"}
                size="md"
                isSelected={isActive}
                className={cn(
                  "w-full justify-start border-transparent text-muted hover:text-brand-gold-polished",
                  isActive && "text-brand-gold-polished shadow-flat",
                  isCollapsed ? "justify-center px-layout-2" : "pl-layout-4 pr-layout-3",
                )}
                aria-label={isCollapsed ? `${item.label}, ${item.description}` : undefined}
              >
                <span
                  className={cn(
                    "flex size-layout-4 shrink-0 items-center justify-center rounded-accent border border-border text-current",
                    isActive && "border-brand-gold-polished bg-accent-subtle",
                  )}
                  aria-hidden="true"
                >
                  <span className="size-layout-1 rounded-full bg-current" />
                </span>
                {!isCollapsed ? (
                  <span className="min-w-0 text-left">
                    <Typography
                      as="span"
                      variant="bodySmall"
                      tone={isActive ? "accent" : "default"}
                      className="block truncate"
                    >
                      {item.label}
                    </Typography>
                    <Typography as="span" variant="labelMeta" tone="muted" className="block truncate">
                      {item.description}
                    </Typography>
                  </span>
                ) : null}
              </Button>
            </div>
          );
        })}
      </nav>

      <div className="border-t border-border p-layout-3">
        {isMobile ? (
          <Button type="button" variant="outline" size="md" className="w-full" onClick={onCloseMobile}>
            Close
          </Button>
        ) : (
          <Card size="sm" className="border-border bg-background/80 p-layout-2 shadow-flat">
            {!isCollapsed ? (
              <Typography variant="labelMeta" tone="muted" className="mb-layout-2 px-layout-2">
                Navigation
              </Typography>
            ) : null}
            <Button
              type="button"
              variant="ghost"
              size="md"
              className={cn("w-full text-muted hover:text-brand-gold-polished", isCollapsed && "px-layout-2")}
              onClick={onToggleCollapsed}
              aria-expanded={!collapsed}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? "Open" : "Collapse"}
            </Button>
          </Card>
        )}
      </div>
    </aside>
  );
}

export type { PremiumSidebarProps };
