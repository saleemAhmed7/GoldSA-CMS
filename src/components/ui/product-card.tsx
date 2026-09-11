"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useCurrency } from "@/components/providers/currency-provider";
import { Card } from "./card";
import { Button } from "./button";

// PriceDisplay
export interface PriceDisplayProps {
  price: number; // base amount in TRY
  compareAtPrice?: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PriceDisplay({
  price,
  compareAtPrice,
  size = "md",
  className,
}: PriceDisplayProps) {
  const { formatPrice } = useCurrency();

  const formattedPrice = formatPrice(price);
  const formattedCompare = compareAtPrice ? formatPrice(compareAtPrice) : null;

  return (
    <span className="inline-flex items-baseline gap-2 font-display tabular-nums">
      <span
        className={cn(
          "font-semibold text-brand-gold-polished",
          size === "sm" && "text-body-default",
          size === "md" && "text-header-3",
          size === "lg" && "text-header-2",
          className,
        )}
      >
        {formattedPrice}
      </span>
      {formattedCompare && (
        <span className="text-body-small text-muted line-through">
          {formattedCompare}
        </span>
      )}
    </span>
  );
}

// ProductCard
export interface ProductCardProps {
  title: string;
  price: number;
  compareAtPrice?: number;
  imageSrc?: string;
  category?: string;
  badge?: ReactNode;
  isOutOfStock?: boolean;
  onAddToCart?: () => void;
  onClick?: () => void;
  className?: string;
}

export function ProductCard({
  title,
  price,
  compareAtPrice,
  imageSrc,
  category,
  badge,
  isOutOfStock = false,
  onAddToCart,
  onClick,
  className,
}: ProductCardProps) {
  return (
    <Card
      variant="interactive"
      onClick={onClick}
      className={cn("flex flex-col overflow-hidden p-0 group", className)}
    >
      <div className="relative aspect-square w-full bg-surface overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="size-full object-cover transition-transform duration-layout ease-out-quart group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-muted text-label-meta">
            No Image
          </div>
        )}
        {badge && <div className="absolute top-3 left-3 z-10">{badge}</div>}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/70 backdrop-blur-xs flex items-center justify-center font-display font-medium text-semantic-error">
            Out of Stock
          </div>
        )}
      </div>

      <div className="flex flex-col p-4 gap-2 flex-1">
        {category && <span className="text-label-meta text-muted uppercase">{category}</span>}
        <h3 className="text-body-default font-display font-medium text-foreground line-clamp-1 group-hover:text-brand-gold-polished transition-colors">
          {title}
        </h3>
        <PriceDisplay price={price} compareAtPrice={compareAtPrice} size="sm" />
        {onAddToCart && (
          <Button
            variant="outline"
            size="sm"
            disabled={isOutOfStock}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="mt-2 w-full"
          >
            Add to Cart
          </Button>
        )}
      </div>
    </Card>
  );
}
