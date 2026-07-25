import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// List
export interface ListProps {
  children: ReactNode;
  variant?: "simple" | "divided" | "interactive";
  className?: string;
}

export function List({ children, variant = "simple", className }: ListProps) {
  return (
    <ul
      className={cn(
        "flex flex-col w-full text-body-default text-foreground",
        variant === "divided" && "divide-y divide-border",
        className,
      )}
    >
      {children}
    </ul>
  );
}

export function ListItem({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <li
      onClick={onClick}
      className={cn(
        "flex items-center justify-between py-3 px-4 transition-colors",
        onClick && "cursor-pointer hover:bg-accent-subtle hover:text-brand-gold-polished",
        className,
      )}
    >
      {children}
    </li>
  );
}

// DescriptionList
export interface DescriptionItem {
  label: ReactNode;
  value: ReactNode;
}

export interface DescriptionListProps {
  items: DescriptionItem[];
  variant?: "horizontal" | "vertical";
  className?: string;
}

export function DescriptionList({ items, variant = "horizontal", className }: DescriptionListProps) {
  const isHorizontal = variant === "horizontal";

  return (
    <dl className={cn("grid gap-4 text-body-small", isHorizontal ? "grid-cols-1 md:grid-cols-2" : "flex flex-col", className)}>
      {items.map((item, idx) => (
        <div key={idx} className="flex flex-col gap-1 border-b border-border/50 pb-2">
          <dt className="text-label-meta uppercase text-muted font-medium">{item.label}</dt>
          <dd className="font-interface text-foreground font-medium">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

// Timeline
export interface TimelineEvent {
  id: string;
  title: ReactNode;
  date?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
}

export interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function Timeline({ events, className }: TimelineProps) {
  return (
    <div className={cn("flex flex-col gap-6 relative pl-6 border-l border-border", className)}>
      {events.map((event) => (
        <div key={event.id} className="relative flex flex-col gap-1">
          <span className="absolute -left-[31px] top-1 flex size-4 items-center justify-center rounded-full border-2 border-brand-gold-polished bg-background text-brand-gold-polished">
            {event.icon || <span className="size-1.5 rounded-full bg-brand-gold-polished" />}
          </span>
          <div className="flex items-center justify-between">
            <h4 className="text-body-default font-medium text-foreground">{event.title}</h4>
            {event.date && <span className="text-label-meta text-muted">{event.date}</span>}
          </div>
          {event.description && <p className="text-body-small text-muted">{event.description}</p>}
        </div>
      ))}
    </div>
  );
}
