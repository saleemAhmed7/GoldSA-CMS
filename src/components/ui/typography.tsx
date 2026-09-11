import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type TypographyVariant =
  | "displayHero"
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "bodySmall"
  | "labelMeta"
  | "action";

type TypographyTone = "default" | "muted" | "accent" | "success" | "warning" | "error" | "info";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
  variant?: TypographyVariant;
  tone?: TypographyTone;
}

const typographyElementByVariant: Record<TypographyVariant, ElementType> = {
  displayHero: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  body: "p",
  bodySmall: "p",
  labelMeta: "span",
  action: "span",
};

const typographyVariantStyles: Record<TypographyVariant, string> = {
  displayHero: "font-display text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight",
  h1: "font-display text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight leading-tight",
  h2: "font-display text-lg sm:text-xl lg:text-2xl font-normal leading-snug",
  h3: "font-display text-base sm:text-lg lg:text-xl font-medium leading-snug",
  body: "font-interface text-sm sm:text-base leading-relaxed",
  bodySmall: "font-interface text-xs sm:text-sm leading-normal",
  labelMeta: "font-interface text-[11px] sm:text-xs uppercase tracking-wider font-medium",
  action: "font-interface text-xs sm:text-sm font-semibold tracking-wide",
};

const typographyToneStyles: Record<TypographyTone, string> = {
  default: "text-foreground",
  muted: "text-muted",
  accent: "text-brand-gold-polished",
  success: "text-semantic-success",
  warning: "text-semantic-warning",
  error: "text-semantic-error",
  info: "text-semantic-info",
};

export function Typography({
  as,
  className,
  children,
  variant = "body",
  tone = "default",
  ...props
}: TypographyProps) {
  const Component = as ?? typographyElementByVariant[variant];

  return (
    <Component
      className={cn(typographyVariantStyles[variant], typographyToneStyles[tone], className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export type { TypographyProps, TypographyTone, TypographyVariant };
