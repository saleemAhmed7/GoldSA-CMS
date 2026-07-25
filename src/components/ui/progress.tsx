import { cn } from "@/lib/cn";

export type ProgressVariant = "linear" | "circular" | "indeterminate";
export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps {
  value?: number; // 0..100
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  showLabel?: boolean;
  className?: string;
}

const heightSizeStyles: Record<ProgressSize, string> = {
  sm: "h-1",
  md: "h-2.5",
  lg: "h-4",
};

export function Progress({
  value = 0,
  max = 100,
  variant = "linear",
  size = "md",
  showLabel = false,
  className,
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const isIndeterminate = variant === "indeterminate";

  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      {showLabel && (
        <div className="flex justify-between text-body-small text-muted font-mono">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn(
          "w-full overflow-hidden rounded-full bg-border relative",
          heightSizeStyles[size],
        )}
      >
        <div
          className={cn(
            "h-full rounded-full bg-brand-gold-polished transition-all duration-standard",
            isIndeterminate && "w-1/3 animate-pulse bg-brand-gold-polished",
          )}
          style={{ width: isIndeterminate ? undefined : `${percentage}%` }}
        />
      </div>
    </div>
  );
}


