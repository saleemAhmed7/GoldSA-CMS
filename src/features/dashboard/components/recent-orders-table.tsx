"use client";

import { useLanguage } from "@/components/providers/language-provider";
import {
  Card,
  DropdownMenu,
  IconButton,
  OrderStatus,
  PaymentStatus,
  PriceDisplay,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from "@/components/ui";

interface OrderRecord {
  id: string;
  customer: string;
  items: string;
  amountTRY: number; // Base amount in TRY
  orderStatus: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "unpaid" | "captured" | "refunded" | "failed";
  date: string;
}

const mockOrders: OrderRecord[] = [
  {
    id: "#ORD-9402",
    customer: "Princess Noura Al-Saud",
    items: "Heritage Bangle Set (22K)",
    amountTRY: 215000,
    orderStatus: "paid",
    paymentStatus: "captured",
    date: "2026-07-24",
  },
  {
    id: "#ORD-9401",
    customer: "Tariq Al-Mansoor",
    items: "Royal Solitaire Ring (18K)",
    amountTRY: 142000,
    orderStatus: "pending",
    paymentStatus: "unpaid",
    date: "2026-07-24",
  },
  {
    id: "#ORD-9400",
    customer: "Fatima Al-Zahrani",
    items: "Diamond Pendant Necklace",
    amountTRY: 285000,
    orderStatus: "shipped",
    paymentStatus: "captured",
    date: "2026-07-23",
  },
  {
    id: "#ORD-9399",
    customer: "Khaled Bin Sultan",
    items: "24K Gold Bar 50g",
    amountTRY: 162500,
    orderStatus: "delivered",
    paymentStatus: "captured",
    date: "2026-07-23",
  },
  {
    id: "#ORD-9398",
    customer: "Amina Al-Otaibi",
    items: "Bridal Suite Necklace (22K)",
    amountTRY: 438000,
    orderStatus: "paid",
    paymentStatus: "captured",
    date: "2026-07-22",
  },
];

export function RecentOrdersTable() {
  const { t } = useLanguage();

  return (
    <Card variant="standard" size="lg" className="flex flex-col gap-4 w-full border-brand-gold-muted/20 bg-surface shadow-flat">
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h3" className="text-foreground font-display font-semibold">
            {t("recentOrders")}
          </Typography>
          <Typography variant="bodySmall" tone="muted">
            {t("recentOrdersDesc")}
          </Typography>
        </div>
      </div>

      <Table variant="basic">
        <TableHeader>
          <TableRow>
            <TableHead>{t("orderId")}</TableHead>
            <TableHead>{t("customer")}</TableHead>
            <TableHead>{t("jewelryItems")}</TableHead>
            <TableHead>{t("totalAmount")}</TableHead>
            <TableHead>{t("orderStatus")}</TableHead>
            <TableHead>{t("paymentStatus")}</TableHead>
            <TableHead>{t("date")}</TableHead>
            <TableHead className="text-right rtl:text-left">{t("action")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockOrders.map((order) => (
            <TableRow key={order.id} className="hover:bg-accent-subtle/30 transition-colors">
              <TableCell className="font-mono font-medium text-brand-gold-polished">
                {order.id}
              </TableCell>
              <TableCell className="font-medium text-foreground">{order.customer}</TableCell>
              <TableCell className="text-muted">{order.items}</TableCell>
              <TableCell>
                <PriceDisplay price={order.amountTRY} size="sm" />
              </TableCell>
              <TableCell>
                <OrderStatus status={order.orderStatus} />
              </TableCell>
              <TableCell>
                <PaymentStatus status={order.paymentStatus} />
              </TableCell>
              <TableCell className="text-muted text-label-meta">{order.date}</TableCell>
              <TableCell className="text-right rtl:text-left">
                <DropdownMenu
                  align="right"
                  trigger={
                    <IconButton
                      aria-label="Order actions"
                      variant="ghost"
                      size="xs"
                      icon={
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      }
                    />
                  }
                  items={[
                    { id: "view", label: t("viewDetails") },
                    { id: "invoice", label: t("generateInvoice") },
                    { id: "status", label: t("updateStatus") },
                  ]}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
