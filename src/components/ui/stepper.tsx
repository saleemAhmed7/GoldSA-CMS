import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface StepItem {
  id: string | number;
  label: ReactNode;
  description?: ReactNode;
}

export interface StepperProps {
  steps: StepItem[];
  currentStep: number; // 0-indexed
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Stepper({
  steps,
  currentStep,
  orientation = "horizontal",
  className,
}: StepperProps) {
  const isVertical = orientation === "vertical";

  return (
    <div
      className={cn(
        "flex w-full",
        isVertical ? "flex-col gap-6" : "flex-row items-center justify-between gap-4",
        className,
      )}
    >
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isCurrent = idx === currentStep;

        return (
          <div
            key={step.id}
            className={cn(
              "flex items-center gap-3 relative flex-1",
              isVertical ? "flex-row" : "flex-row items-center",
            )}
          >
            <div
              className={cn(
                "size-8 rounded-full flex items-center justify-center font-semibold text-body-small border transition-colors shrink-0",
                isCompleted && "border-brand-gold-polished bg-brand-gold-polished text-brand-obsidian",
                isCurrent && "border-brand-gold-polished bg-accent-subtle text-brand-gold-polished ring-2 ring-brand-gold-polished/20",
                !isCompleted && !isCurrent && "border-border bg-surface text-muted",
              )}
            >
              {isCompleted ? (
                <svg className="size-4 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                idx + 1
              )}
            </div>

            <div className="flex flex-col">
              <span
                className={cn(
                  "text-body-small font-medium",
                  isCurrent ? "text-brand-gold-polished" : isCompleted ? "text-foreground" : "text-muted",
                )}
              >
                {step.label}
              </span>
              {step.description && <span className="text-label-meta text-muted">{step.description}</span>}
            </div>

            {!isVertical && idx < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-4 transition-colors",
                  idx < currentStep ? "bg-brand-gold-polished" : "bg-border",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}


