import { PageLoader } from "@/components/ui/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMyOrders } from "@/hooks/useOrders";
import type { CartItem, Order } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Package,
  ShoppingBag,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const STATUS_MAP: Record<Order["status"], { label: string; cls: string }> = {
  pending: {
    label: "Pending",
    cls: "bg-yellow-500/15 text-yellow-500 border-yellow-500/20",
  },
  processing: {
    label: "Processing",
    cls: "bg-blue-500/15 text-blue-500 border-blue-500/20",
  },
  shipped: {
    label: "Shipped",
    cls: "bg-primary/15 text-primary border-primary/20",
  },
  delivered: {
    label: "Delivered",
    cls: "bg-emerald-500/15 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
  },
  cancelled: {
    label: "Cancelled",
    cls: "bg-destructive/15 text-destructive border-destructive/20",
  },
};

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function OrderItemRow({ item }: { item: CartItem }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
        <img
          src={item.product.images[0] ?? "/assets/images/placeholder.svg"}
          alt={item.product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{item.product.name}</p>
        <p className="text-xs text-muted-foreground">
          Qty {item.quantity}
          {item.selectedColor ? ` · ${item.selectedColor}` : ""}
          {item.selectedSize ? ` · ${item.selectedSize}` : ""}
        </p>
      </div>
      <span className="text-sm font-semibold shrink-0">
        ${(item.product.price * item.quantity).toFixed(2)}
      </span>
    </div>
  );
}

function OrderCard({ order, index }: { order: Order; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_MAP[order.status];
  const shortId = order.id.slice(-8).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="glass-card !p-0 overflow-hidden"
      data-ocid="order-item"
    >
      {/* Order header */}
      <button
        type="button"
        className="w-full text-left px-5 py-4 flex items-center gap-3"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        data-ocid="order-expand-btn"
      >
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Package size={16} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm">Order #{shortId}</span>
            <Badge
              className={`text-[10px] border ${status.cls}`}
              variant="outline"
            >
              {status.label}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {formatDate(order.createdAt)} · {order.items.length} item
            {order.items.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="text-right shrink-0">
          <div className="font-semibold text-sm">${order.total.toFixed(2)}</div>
          <div className="text-muted-foreground mt-0.5">
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
        </div>
      </button>

      {/* Expandable detail */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border/40"
          >
            <div className="px-5 py-4 space-y-3">
              {order.items.length > 0 ? (
                order.items.map((item) => (
                  <OrderItemRow key={item.productId} item={item} />
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No item details available.
                </p>
              )}

              {/* Shipping address */}
              {order.shippingAddress && (
                <div className="pt-3 border-t border-border/30">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin
                      size={14}
                      className="mt-0.5 shrink-0 text-primary"
                    />
                    <div>
                      <span className="font-medium text-foreground">
                        {order.shippingAddress.name}
                      </span>
                      <br />
                      {order.shippingAddress.line1}
                      {order.shippingAddress.line2 &&
                        `, ${order.shippingAddress.line2}`}
                      , {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state}{" "}
                      {order.shippingAddress.postalCode},{" "}
                      {order.shippingAddress.country}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function OrdersPage() {
  const { data: orders = [], isLoading } = useMyOrders();

  if (isLoading) return <PageLoader />;

  return (
    <div className="container max-w-3xl mx-auto px-6 pt-28 pb-20">
      {/* Page title */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="font-display text-3xl font-semibold">My Orders</h1>
        {orders.length > 0 && (
          <p className="text-muted-foreground text-sm mt-1">
            {orders.length} order{orders.length !== 1 ? "s" : ""} in your
            history
          </p>
        )}
      </motion.div>

      {orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-20 glass-card"
          data-ocid="orders-empty"
        >
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={28} className="text-muted-foreground" />
          </div>
          <p className="font-display text-xl font-semibold mb-2">
            No orders yet
          </p>
          <p className="text-muted-foreground text-sm mb-6">
            Your purchase history will appear here
          </p>
          <Link to="/products">
            <Button
              size="lg"
              className="rounded-xl gap-2"
              data-ocid="orders-start-shopping"
            >
              <ShoppingBag size={16} /> Start Shopping
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-3" data-ocid="orders-list">
          {orders.map((order, i) => (
            <OrderCard key={order.id} order={order} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
