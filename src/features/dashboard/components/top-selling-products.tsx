"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Badge, Card, DiscountBadge, PriceDisplay, RatingDisplay, Typography } from "@/components/ui";

const topProducts = [
  {
    id: "p1",
    title: "Heritage Bridal Bangle Set (22K)",
    category: "Bangles",
    priceTRY: 215000,
    compareAtPriceTRY: 235000,
    rating: 4.9,
    reviews: 28,
    discount: 8,
    salesCount: 42,
  },
  {
    id: "p2",
    title: "Royal Solitaire Diamond Ring (18K)",
    category: "Rings",
    priceTRY: 142000,
    rating: 5.0,
    reviews: 19,
    salesCount: 38,
  },
  {
    id: "p3",
    title: "Celestial Diamond Pendant (18K)",
    category: "Necklaces",
    priceTRY: 285000,
    rating: 4.8,
    reviews: 14,
    salesCount: 29,
  },
  {
    id: "p4",
    title: "GoldSA Minted Bullion Bar 50g (24K)",
    category: "Bullion",
    priceTRY: 162500,
    rating: 5.0,
    reviews: 45,
    salesCount: 64,
  },
];

export function TopSellingProducts() {
  const { t } = useLanguage();

  return (
    <Card variant="standard" size="lg" className="flex flex-col gap-4 w-full border-brand-gold-muted/20 bg-surface shadow-flat">
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h3" className="text-foreground font-display font-semibold">
            {t("topPerformingJewelry")}
          </Typography>
          <Typography variant="bodySmall" tone="muted">
            {t("topPerformingDesc")}
          </Typography>
        </div>
        <Badge variant="accent">Top 4</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topProducts.map((item) => (
          <Card key={item.id} variant="interactive" size="sm" className="flex flex-col justify-between gap-3 p-4 border-border/80 hover:border-brand-gold-polished/50 transition-all shadow-flat hover:shadow-medium">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-label-meta text-muted uppercase font-medium">{item.category}</span>
                {item.discount ? <DiscountBadge percent={item.discount} /> : <Badge variant="neutral">{item.salesCount} {t("sold")}</Badge>}
              </div>
              <h4 className="text-body-default font-display font-medium text-foreground line-clamp-1 mt-1 group-hover:text-brand-gold-polished transition-colors">
                {item.title}
              </h4>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-border/60">
              <PriceDisplay price={item.priceTRY} compareAtPrice={item.compareAtPriceTRY} size="sm" />
              <div className="flex items-center justify-between text-body-small">
                <RatingDisplay rating={item.rating} count={item.reviews} />
                <span className="text-label-meta text-muted font-medium">{item.salesCount} {t("sold")}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}
