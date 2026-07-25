import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

// Avatar
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  status?: "online" | "offline" | "busy";
}

const avatarSizeStyles: Record<AvatarSize, string> = {
  xs: "size-6 text-xs",
  sm: "size-8 text-xs",
  md: "size-9 text-sm", // 36px Admin standard
  lg: "size-12 text-base",
  xl: "size-16 text-lg",
};

const statusColors = {
  online: "bg-semantic-success",
  offline: "bg-muted",
  busy: "bg-semantic-error",
};

export function Avatar({
  src,
  alt = "User Avatar",
  initials,
  size = "md",
  status,
  className,
  ...props
}: AvatarProps) {
  return (
    <div className={cn("relative inline-flex shrink-0 select-none", className)} {...props}>
      <div
        className={cn(
          "flex items-center justify-center rounded-md border border-border bg-surface font-semibold text-brand-gold-polished overflow-hidden shadow-flat",
          avatarSizeStyles[size],
        )}
      >
        {src ? (
          <img src={src} alt={alt} className="size-full object-cover" />
        ) : (
          <span>{initials || "GS"}</span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            "absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-background",
            statusColors[status],
          )}
        />
      )}
    </div>
  );
}

// Divider
export type DividerVariant = "horizontal" | "vertical" | "dashed";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: DividerVariant;
}

export function Divider({ className, variant = "horizontal", ...props }: DividerProps) {
  const isVertical = variant === "vertical";
  const isDashed = variant === "dashed";

  return (
    <div
      role="separator"
      className={cn(
        "bg-border shrink-0",
        isVertical ? "h-full w-[1px] my-auto" : "w-full h-[1px] my-4",
        isDashed && "bg-transparent border-t border-dashed border-border h-0",
        className,
      )}
      {...props}
    />
  );
}
