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
  displayHero: "font-display text-display-hero",
  h1: "font-display text-header-1",
  h2: "font-display text-header-2",
  h3: "font-display text-header-3",
  body: "font-interface text-body-default",
  bodySmall: "font-interface text-body-small",
  labelMeta: "font-interface text-label-meta uppercase",
  action: "font-interface text-action-button",
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
