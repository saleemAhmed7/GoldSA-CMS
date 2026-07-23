import { Input, Label } from "@/components/ui";

interface GlobalSearchProps {
  className?: string;
}

export function GlobalSearch({ className }: GlobalSearchProps) {
  return (
    <div className={className}>
      <Label htmlFor="global-shell-search" className="sr-only">
        Global search
      </Label>
      <Input
        id="global-shell-search"
        variant="search"
        size="md"
        type="search"
        className="border-border bg-surface/80 shadow-flat"
        placeholder="Search the workspace"
        aria-label="Global search placeholder"
        readOnly
      />
    </div>
  );
}
