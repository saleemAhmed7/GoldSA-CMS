import { Badge } from "./badge";

// DiscountBadge
export function DiscountBadge({ percent }: { percent: number }) {
  return <Badge variant="accent">Save {percent}%</Badge>;
}

// InventoryBadge
export type StockState = "in-stock" | "low-stock" | "out-of-stock";

export function InventoryBadge({ state }: { state: StockState }) {
  const map = {
    "in-stock": { variant: "success" as const, label: "In Stock" },
    "low-stock": { variant: "warning" as const, label: "Low Stock" },
    "out-of-stock": { variant: "error" as const, label: "Out of Stock" },
  };

  return <Badge variant={map[state].variant}>{map[state].label}</Badge>;
}

// RatingDisplay
export function RatingDisplay({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="inline-flex items-center gap-1 text-body-small text-brand-gold-polished font-medium">
      <span>★</span>
      <span>{rating.toFixed(1)}</span>
      {count !== undefined && <span className="text-muted text-label-meta">({count})</span>}
    </div>
  );
}

// OrderStatus & PaymentStatus & ShipmentStatus
export function OrderStatus({ status }: { status: "pending" | "paid" | "shipped" | "delivered" | "cancelled" }) {
  const map: Record<string, { variant: "neutral" | "success" | "warning" | "error" | "info"; label: string }> = {
    pending: { variant: "warning", label: "Pending" },
    paid: { variant: "info", label: "Paid" },
    shipped: { variant: "info", label: "Shipped" },
    delivered: { variant: "success", label: "Delivered" },
    cancelled: { variant: "error", label: "Cancelled" },
  };
  const item = map[status] || { variant: "neutral", label: status };
  return <Badge variant={item.variant}>{item.label}</Badge>;
}

export function PaymentStatus({ status }: { status: "unpaid" | "captured" | "refunded" | "failed" }) {
  const map: Record<string, { variant: "neutral" | "success" | "warning" | "error" | "info"; label: string }> = {
    unpaid: { variant: "warning", label: "Unpaid" },
    captured: { variant: "success", label: "Captured" },
    refunded: { variant: "info", label: "Refunded" },
    failed: { variant: "error", label: "Failed" },
  };
  const item = map[status] || { variant: "neutral", label: status };
  return <Badge variant={item.variant}>{item.label}</Badge>;
}
