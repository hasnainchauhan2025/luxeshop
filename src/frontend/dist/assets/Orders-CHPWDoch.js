import { q as jsxRuntimeExports, W as PageLoader, t as motion, G as ShoppingBag, L as Link, w as Button, j as reactExports, Q as Package, B as Badge, C as ChevronDown, F as AnimatePresence } from "./index-CgQGP8Uk.js";
import { u as useMyOrders } from "./useOrders-cI8i4p3x.js";
import { C as ChevronUp } from "./chevron-up-CLaulU-o.js";
import { M as MapPin } from "./map-pin-B6NaJa-E.js";
import "./useMutation-CVK8QqpV.js";
const STATUS_MAP = {
  pending: {
    label: "Pending",
    cls: "bg-yellow-500/15 text-yellow-500 border-yellow-500/20"
  },
  processing: {
    label: "Processing",
    cls: "bg-blue-500/15 text-blue-500 border-blue-500/20"
  },
  shipped: {
    label: "Shipped",
    cls: "bg-primary/15 text-primary border-primary/20"
  },
  delivered: {
    label: "Delivered",
    cls: "bg-emerald-500/15 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
  },
  cancelled: {
    label: "Cancelled",
    cls: "bg-destructive/15 text-destructive border-destructive/20"
  }
};
function formatDate(ms) {
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function OrderItemRow({ item }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: item.product.images[0] ?? "/assets/images/placeholder.svg",
        alt: item.product.name,
        className: "w-full h-full object-cover",
        loading: "lazy"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: item.product.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Qty ",
        item.quantity,
        item.selectedColor ? ` · ${item.selectedColor}` : "",
        item.selectedSize ? ` · ${item.selectedSize}` : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold shrink-0", children: [
      "$",
      (item.product.price * item.quantity).toFixed(2)
    ] })
  ] });
}
function OrderCard({ order, index }) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const status = STATUS_MAP[order.status];
  const shortId = order.id.slice(-8).toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.45, delay: index * 0.07 },
      className: "glass-card !p-0 overflow-hidden",
      "data-ocid": "order-item",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full text-left px-5 py-4 flex items-center gap-3",
            onClick: () => setExpanded((v) => !v),
            "aria-expanded": expanded,
            "data-ocid": "order-expand-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 16, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-sm", children: [
                    "Order #",
                    shortId
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `text-[10px] border ${status.cls}`,
                      variant: "outline",
                      children: status.label
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  formatDate(order.createdAt),
                  " · ",
                  order.items.length,
                  " item",
                  order.items.length !== 1 ? "s" : ""
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-sm", children: [
                  "$",
                  order.total.toFixed(2)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground mt-0.5", children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 14 }) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
            className: "overflow-hidden border-t border-border/40",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-3", children: [
              order.items.length > 0 ? order.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderItemRow, { item }, item.productId)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "No item details available." }),
              order.shippingAddress && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-3 border-t border-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MapPin,
                  {
                    size: 14,
                    className: "mt-0.5 shrink-0 text-primary"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: order.shippingAddress.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  order.shippingAddress.line1,
                  order.shippingAddress.line2 && `, ${order.shippingAddress.line2}`,
                  ", ",
                  order.shippingAddress.city,
                  ",",
                  " ",
                  order.shippingAddress.state,
                  " ",
                  order.shippingAddress.postalCode,
                  ",",
                  " ",
                  order.shippingAddress.country
                ] })
              ] }) })
            ] })
          },
          "detail"
        ) })
      ]
    }
  );
}
function OrdersPage() {
  const { data: orders = [], isLoading } = useMyOrders();
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-3xl mx-auto px-6 pt-28 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "mb-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold", children: "My Orders" }),
          orders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
            orders.length,
            " order",
            orders.length !== 1 ? "s" : "",
            " in your history"
          ] })
        ]
      }
    ),
    orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5 },
        className: "text-center py-20 glass-card",
        "data-ocid": "orders-empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 28, className: "text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold mb-2", children: "No orders yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Your purchase history will appear here" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "rounded-xl gap-2",
              "data-ocid": "orders-start-shopping",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 16 }),
                " Start Shopping"
              ]
            }
          ) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "orders-list", children: orders.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderCard, { order, index: i }, order.id)) })
  ] });
}
export {
  OrdersPage
};
