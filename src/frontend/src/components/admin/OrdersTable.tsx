import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllOrders, useUpdateOrderStatus } from "@/hooks/useOrders";
import type { Order } from "@/types";
import { CreditCard, Eye, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_COLORS: Record<Order["status"], string> = {
  pending: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400",
  processing: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  shipped: "bg-purple-500/15 text-purple-600 dark:text-purple-400",
  delivered: "bg-green-500/15 text-green-600 dark:text-green-400",
  cancelled: "bg-red-500/15 text-red-600 dark:text-red-400",
};

const STATUS_OPTIONS: Order["status"][] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function OrderDetailModal({
  order,
  open,
  onClose,
}: {
  order: Order;
  open: boolean;
  onClose: () => void;
}) {
  const updateStatus = useUpdateOrderStatus();
  const [status, setStatus] = useState<Order["status"]>(order.status);
  const [saving, setSaving] = useState(false);

  const handleStatusUpdate = async () => {
    setSaving(true);
    try {
      await updateStatus.mutateAsync({ orderId: order.id, status });
      toast.success("Order status updated");
      onClose();
    } catch {
      toast.error("Failed to update status");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">
            Order #{order.id.slice(-6).toUpperCase()}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* Status update */}
          <div className="flex items-center gap-3">
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as Order["status"])}
            >
              <SelectTrigger className="w-40" data-ocid="order-status-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s} className="capitalize">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              size="sm"
              onClick={handleStatusUpdate}
              disabled={saving || status === order.status}
              data-ocid="order-status-save"
            >
              {saving ? "Saving…" : "Update Status"}
            </Button>
          </div>

          {/* Shipping address */}
          <div className="glass-card !p-4 !rounded-xl">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground text-sm font-medium">
              <MapPin size={14} />
              Shipping Address
            </div>
            <p className="text-sm text-foreground font-medium">
              {order.shippingAddress.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {order.shippingAddress.line1}
              {order.shippingAddress.line2
                ? `, ${order.shippingAddress.line2}`
                : ""}
            </p>
            <p className="text-sm text-muted-foreground">
              {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
          </div>

          {/* Payment */}
          {order.stripeSessionId && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CreditCard size={14} />
              <span>Stripe ID:</span>
              <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                {order.stripeSessionId}
              </code>
            </div>
          )}

          {/* Items */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Items ({order.items.length})
            </p>
            {order.items.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">
                No item details available
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {order.items.map((item) => (
                  <li
                    key={item.productId}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-foreground">
                      {item.product?.name ?? item.productId}
                    </span>
                    <span className="text-muted-foreground">
                      ×{item.quantity} · ${item.product?.price ?? "—"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center border-t border-border pt-3">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="font-display text-lg font-bold">
              ${order.total.toLocaleString()}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function OrdersTable() {
  const { data: orders = [], isLoading } = useAllOrders();
  const [selected, setSelected] = useState<Order | null>(null);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {["s1", "s2", "s3", "s4"].map((k) => (
          <Skeleton key={k} className="h-14 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 border-b border-border">
              {[
                "Order ID",
                "Customer",
                "Date",
                "Status",
                "Total",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-medium text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-muted-foreground"
                  data-ocid="orders-empty"
                >
                  No orders yet
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-smooth"
                  data-ocid={`order-row-${order.id}`}
                >
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    #{order.id.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-4 py-3 font-medium truncate max-w-[150px]">
                    {order.shippingAddress.name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium tabular-nums">
                    ${order.total.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-1.5 text-xs"
                      onClick={() => setSelected(order)}
                      data-ocid={`order-view-${order.id}`}
                    >
                      <Eye size={13} /> View
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden flex flex-col gap-3">
        {orders.length === 0 ? (
          <div
            className="glass-card text-center text-muted-foreground"
            data-ocid="orders-empty-mobile"
          >
            No orders yet
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="glass-card flex items-start justify-between gap-3"
              data-ocid={`order-card-${order.id}`}
            >
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">
                  {order.shippingAddress.name}
                </p>
                <p className="text-xs font-mono text-muted-foreground mt-0.5">
                  #{order.id.slice(-6).toUpperCase()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[order.status]}`}
                >
                  {order.status}
                </span>
                <span className="font-display text-sm font-bold">
                  ${order.total.toLocaleString()}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs gap-1 h-7 px-2"
                  onClick={() => setSelected(order)}
                >
                  <Eye size={12} /> View
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {selected && (
        <OrderDetailModal
          order={selected}
          open={!!selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
