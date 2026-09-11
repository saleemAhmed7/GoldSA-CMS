import { Card, Typography } from "@/components/ui";
import { cn } from "@/lib/cn";

interface LogoAreaProps {
  collapsed?: boolean;
}

export function LogoArea({ collapsed = false }: LogoAreaProps) {
  return (
    <div
      className={cn(
        "flex min-h-[calc(var(--spacing-layout-12)+var(--spacing-layout-4))] items-center gap-layout-3 px-layout-4",
        collapsed && "justify-center px-layout-3",
      )}
    >
      <Card
        aria-hidden="true"
        size="sm"
        className="flex size-layout-8 shrink-0 items-center justify-center rounded-sm border-brand-gold-polished bg-accent-subtle p-0 shadow-low"
      >
        <Typography as="span" variant="action" tone="accent">
          G
        </Typography>
      </Card>
      <div
        className={cn(
          "min-w-0 transition-opacity duration-standard ease-out-quart",
          collapsed && "lg:pointer-events-none lg:opacity-0",
        )}
      >
        <Typography variant="h3" className="truncate">
          GoldSA CMS
        </Typography>
        <Typography variant="labelMeta" tone="accent" className="truncate">
          Enterprise Admin
        </Typography>
      </div>
    </div>
  );
}
