"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Card, Typography } from "@/components/ui";
import { LogoArea } from "@/components/layout/logo-area";
import { useLanguage } from "@/components/providers/language-provider";
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
  "flex h-dvh flex-col border-r rtl:border-l rtl:border-r-0 border-border bg-surface text-foreground shadow-low transition-all duration-standard ease-out-quart";

export function PremiumSidebar({
  collapsed,
  mobileOpen = false,
  onToggleCollapsed,
  onCloseMobile,
  id = "application-sidebar",
}: PremiumSidebarProps) {
  const { t } = useLanguage();
  const pathname = usePathname();

  const navItems = [
    { key: "dashboard", href: "/admin/dashboard", label: t("dashboard"), description: t("workspace") },
    { key: "catalog", href: "/admin/products", label: t("catalog"), description: "22K, 24K, 18K" },
    { key: "media", href: "/admin/dashboard", label: t("media"), description: "GIA, Assets" },
    { key: "settings", href: "/admin/dashboard", label: t("settings"), description: "General, Rates" },
  ] as const;

  return (
    <>
      {/* Mobile Backdrop Overlay - directly below sidebar in stacking context */}
      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-overlay-scrim bg-black/40 transition-opacity lg:hidden border-0 p-0 cursor-default outline-none"
          aria-label="Close navigation overlay"
          onClick={onCloseMobile}
        />
      ) : null}

      <aside
        id={id}
        className={cn(
          sidebarSurfaceStyles,
          "fixed inset-y-0 left-0 rtl:left-auto rtl:right-0",
          // Desktop sizing
          collapsed ? "lg:w-layout-16" : `lg:${expandedWidthClass}`,
          // Mobile Drawer styling & transition
          "z-drawer-slide max-lg:max-w-[calc(100dvw-var(--spacing-layout-8))] max-lg:w-[calc(var(--spacing-layout-16)*4+var(--spacing-layout-1))] max-lg:shadow-overlay",
          mobileOpen
            ? "max-lg:translate-x-0 max-lg:pointer-events-auto max-lg:visible"
            : "max-lg:-translate-x-full max-lg:rtl:translate-x-full max-lg:pointer-events-none max-lg:invisible",
          // Desktop screen overrides
          "lg:z-sticky-header lg:flex lg:translate-x-0 lg:pointer-events-auto lg:visible",
        )}
        aria-label="Application navigation"
      >
        <LogoArea collapsed={collapsed} />

        <div className={cn("px-layout-4 pb-layout-3", collapsed && "lg:px-layout-3")}>
          <div className="h-px bg-border" />
        </div>

        <nav
          className={cn(
            "flex flex-1 flex-col gap-layout-1 overflow-y-auto px-layout-3 py-layout-2",
            "[scrollbar-gutter:stable]",
          )}
          aria-label="Primary"
        >
          <Typography
            as="p"
            variant="labelMeta"
            tone="muted"
            className={cn("px-layout-3 pb-layout-2 pt-layout-1", collapsed && "lg:hidden")}
          >
            {t("workspace")}
          </Typography>

          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

            return (
              <div key={item.key} className="relative">
                {isActive ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-layout-2 left-0 rtl:left-auto rtl:right-0 w-[var(--radius-accent)] rounded-full bg-brand-gold-polished"
                  />
                ) : null}
                <Link href={item.href} onClick={() => onCloseMobile?.()}>
                  <Button
                    type="button"
                    variant={isActive ? "soft" : "ghost"}
                    size="md"
                    isSelected={isActive}
                    className={cn(
                      "w-full justify-start border-transparent text-muted hover:text-brand-gold-polished",
                      isActive && "text-brand-gold-polished shadow-flat",
                      collapsed ? "lg:justify-center lg:px-layout-2" : "pl-layout-4 pr-layout-3 rtl:pl-layout-3 rtl:pr-layout-4",
                    )}
                    aria-label={collapsed ? `${item.label}, ${item.description}` : undefined}
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
                    <span className={cn("min-w-0 text-left rtl:text-right", collapsed && "lg:hidden")}>
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
                  </Button>
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="border-t border-border p-layout-3">
          <div className="lg:hidden">
            <Button type="button" variant="outline" size="md" className="w-full" onClick={onCloseMobile}>
              {t("close")}
            </Button>
          </div>
          <div className="hidden lg:block">
            <Card size="sm" className="border-border bg-background/80 p-layout-2 shadow-flat">
              {!collapsed ? (
                <Typography variant="labelMeta" tone="muted" className="mb-layout-2 px-layout-2">
                  {t("navigation")}
                </Typography>
              ) : null}
              <Button
                type="button"
                variant="ghost"
                size="md"
                className={cn("w-full text-muted hover:text-brand-gold-polished", collapsed && "px-layout-2")}
                onClick={onToggleCollapsed}
                aria-expanded={!collapsed}
                aria-label={collapsed ? t("expandSidebar") : t("collapseSidebar")}
              >
                {collapsed ? t("open") : t("close")}
              </Button>
            </Card>
          </div>
        </div>
      </aside>
    </>
  );
}

export type { PremiumSidebarProps };
