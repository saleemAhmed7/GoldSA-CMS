import { Button, Card, Typography } from "@/components/ui";

interface UserMenuPlaceholderProps {
  className?: string;
}

export function UserMenuPlaceholder({ className }: UserMenuPlaceholderProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="md"
      className={className}
      aria-haspopup="menu"
      aria-label="User menu placeholder"
    >
      <span className="flex items-center gap-layout-3">
        <Card
          aria-hidden="true"
          size="sm"
          className="flex size-layout-8 items-center justify-center rounded-md border-brand-gold-polished bg-accent-subtle p-0 shadow-low"
        >
          <Typography as="span" variant="labelMeta" tone="accent">
            GS
          </Typography>
        </Card>
        <span className="hidden min-w-0 text-left sm:block">
          <Typography as="span" variant="bodySmall" className="block truncate">
            User Menu
          </Typography>
          <Typography as="span" variant="labelMeta" tone="accent" className="block truncate">
            Placeholder
          </Typography>
        </span>
      </span>
    </Button>
  );
}
