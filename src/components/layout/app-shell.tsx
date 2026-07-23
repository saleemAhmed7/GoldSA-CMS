"use client";

import { useEffect, useState, type ReactNode } from "react";
import { MainContentContainer } from "@/components/layout/main-content-container";
import { PremiumSidebar } from "@/components/layout/premium-sidebar";
import { defaultBreadcrumbItems } from "@/components/layout/shell-data";
import { TopHeader } from "@/components/layout/top-header";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";

type AppShellVariant = "storefront" | "admin";

interface AppShellProps {
  children: ReactNode;
  variant?: AppShellVariant;
}

export function AppShell({ children, variant = "storefront" }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!mobileSidebarOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileSidebarOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileSidebarOpen]);

  if (variant !== "admin") {
    return (
      <div data-app-shell={variant} className="min-h-dvh bg-background text-foreground">
        {children}
      </div>
    );
  }

  return (
    <div data-app-shell={variant} className="min-h-dvh bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-layout-4 focus:top-layout-4 focus:z-toast-alert focus:rounded-sm focus:bg-surface focus:px-layout-4 focus:py-layout-3 focus:text-brand-gold-polished focus:shadow-high"
      >
        Skip to main content
      </a>

      <PremiumSidebar
        collapsed={sidebarCollapsed}
        onToggleCollapsed={() => setSidebarCollapsed((current) => !current)}
      />

      <PremiumSidebar
        id="mobile-application-sidebar"
        mode="mobile"
        collapsed={false}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {mobileSidebarOpen ? (
        <Button
          type="button"
          variant="ghost"
          size="md"
          className="fixed inset-0 z-overlay-scrim h-auto w-auto rounded-flat bg-background/80 p-0 backdrop-blur-sm lg:hidden"
          aria-label="Close navigation overlay"
          onClick={() => setMobileSidebarOpen(false)}
        />
      ) : null}

      <div
        className={cn(
          "min-h-dvh transition-[padding] duration-standard ease-out-quart lg:pl-[calc(var(--spacing-layout-16)*4+var(--spacing-layout-1))]",
          sidebarCollapsed && "lg:pl-layout-16",
        )}
      >
        <TopHeader
          breadcrumbs={defaultBreadcrumbItems}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        />
        <MainContentContainer>{children}</MainContentContainer>
      </div>
    </div>
  );
}

export type { AppShellProps, AppShellVariant };
