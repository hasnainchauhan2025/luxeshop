import { A as useCart, j as reactExports, q as jsxRuntimeExports, t as motion, B as Badge, F as AnimatePresence, w as Button, N as ue, O as Separator, L as Link, G as ShoppingBag, X } from "./index-CgQGP8Uk.js";
import { I as Input } from "./input-CUkXXFPT.js";
import { T as Trash2 } from "./trash-2-D7ljJV5l.js";
import { M as Minus } from "./minus-Dy5w9gGy.js";
import { P as Plus } from "./plus-B88tnL3F.js";
import { T as Tag } from "./tag-CCKU9AT5.js";
const TAX_RATE = 0.1;
async function validateCoupon(code) {
  await new Promise((r) => setTimeout(r, 600));
  const coupons = {
    WELCOME10: 10,
    SAVE20: 20,
    LUXURY15: 15
  };
  const upper = code.toUpperCase();
  if (coupons[upper]) {
    return {
      valid: true,
      discount: coupons[upper],
      message: `${coupons[upper]}% off applied!`
    };
  }
  return {
    valid: false,
    discount: 0,
    message: "Invalid or expired coupon code."
  };
}
function EmptyCart() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      className: "flex flex-col items-center justify-center min-h-[60vh] text-center px-6",
      "data-ocid": "cart-empty-state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: { y: [0, -10, 0] },
              transition: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                ease: "easeInOut"
              },
              className: "w-28 h-28 rounded-3xl glass flex items-center justify-center shadow-elevated",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 52, className: "text-primary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary",
              animate: { scale: [1, 1.2, 1] },
              transition: { repeat: Number.POSITIVE_INFINITY, duration: 2 }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-semibold mb-3 tracking-tight", children: "Your cart is empty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-8 max-w-sm", children: "Discover our curated collection of premium products and add something you love." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "lg",
            className: "rounded-2xl px-8 font-medium transition-smooth",
            "data-ocid": "cart-start-shopping",
            children: "Start Shopping"
          }
        ) })
      ]
    }
  );
}
function CartItemRow({ item, onRemove, onUpdateQty }) {
  const subtotal = item.product.price * item.quantity;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      layout: true,
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 30, height: 0, marginBottom: 0 },
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      className: "glass-card flex gap-4 items-center group",
      "data-ocid": "cart-item-row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: item.product.images[0] ?? "/assets/images/placeholder.svg",
            alt: item.product.name,
            className: "w-full h-full object-cover transition-smooth group-hover:scale-105"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-base truncate", children: item.product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 flex-wrap", children: [
            item.selectedColor && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs rounded-lg", children: item.selectedColor }),
            item.selectedSize && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs rounded-lg", children: item.selectedSize }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
              "$",
              item.product.price.toFixed(2),
              " each"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 flex-shrink-0",
            "data-ocid": "cart-qty-selector",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "icon",
                  className: "h-8 w-8 rounded-xl transition-smooth",
                  onClick: () => onUpdateQty(item.productId, item.quantity - 1),
                  "aria-label": "Decrease quantity",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 14 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 text-center font-medium text-sm tabular-nums", children: item.quantity }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "icon",
                  className: "h-8 w-8 rounded-xl transition-smooth",
                  onClick: () => onUpdateQty(item.productId, item.quantity + 1),
                  "aria-label": "Increase quantity",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-base w-20 text-right tabular-nums flex-shrink-0", children: [
          "$",
          subtotal.toFixed(2)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "h-8 w-8 rounded-xl text-muted-foreground hover:text-destructive transition-smooth flex-shrink-0",
            onClick: () => onRemove(item.productId, item.product.name),
            "aria-label": `Remove ${item.product.name}`,
            "data-ocid": "cart-item-remove",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
          }
        )
      ]
    }
  );
}
function CouponInput({ onApply }) {
  const [code, setCode] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [applied, setApplied] = reactExports.useState(false);
  const handleApply = async () => {
    if (!code.trim()) return;
    setLoading(true);
    const result = await validateCoupon(code.trim());
    setLoading(false);
    if (result.valid) {
      setApplied(true);
      onApply(result.discount, code.toUpperCase());
      ue.success(result.message);
    } else {
      ue.error(result.message);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", "data-ocid": "cart-coupon", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tag,
        {
          size: 14,
          className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Enter coupon code",
          value: code,
          onChange: (e) => setCode(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && handleApply(),
          className: "pl-8 rounded-xl",
          disabled: applied,
          "data-ocid": "cart-coupon-input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "outline",
        className: "rounded-xl px-4 transition-smooth",
        onClick: handleApply,
        disabled: loading || applied || !code.trim(),
        "data-ocid": "cart-coupon-apply",
        children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin" }),
          "Applying"
        ] }) : applied ? "Applied ✓" : "Apply"
      }
    )
  ] });
}
function CartPage() {
  const { items, removeItem, updateQty, total, isEmpty, count } = useCart();
  const [couponDiscount, setCouponDiscount] = reactExports.useState(0);
  const [couponCode, setCouponCode] = reactExports.useState("");
  const subtotal = total;
  const discountAmount = couponDiscount > 0 ? subtotal * couponDiscount / 100 : 0;
  const afterDiscount = subtotal - discountAmount;
  const tax = afterDiscount * TAX_RATE;
  const orderTotal = afterDiscount + tax;
  if (isEmpty) return /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyCart, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-7xl mx-auto px-6 pt-32 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "flex items-baseline gap-4 mb-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl font-semibold tracking-tight", children: "Your Cart" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-base rounded-xl px-3 py-1", children: [
            count,
            " ",
            count === 1 ? "item" : "items"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-10 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-3", "data-ocid": "cart-items-list", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: {
              delay: idx * 0.05,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1]
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              CartItemRow,
              {
                item,
                onRemove: removeItem,
                onUpdateQty: updateQty
              }
            )
          },
          item.productId
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.3 },
            className: "flex justify-end pt-2",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "text-muted-foreground hover:text-destructive gap-2 rounded-xl",
                onClick: () => {
                  for (const item of items) {
                    removeItem(item.productId);
                  }
                  ue.info("Cart cleared");
                },
                "data-ocid": "cart-clear",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 }),
                  "Clear cart"
                ]
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 30 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: 0.2 },
          className: "w-full lg:w-96 lg:sticky lg:top-28",
          "data-ocid": "cart-summary",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card space-y-5 shadow-elevated", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Order Summary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium tabular-nums", children: [
                  "$",
                  subtotal.toFixed(2)
                ] })
              ] }),
              couponDiscount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, height: 0 },
                  animate: { opacity: 1, height: "auto" },
                  className: "flex justify-between text-primary",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Coupon (",
                      couponCode,
                      ") -",
                      couponDiscount,
                      "%"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium tabular-nums", children: [
                      "-$",
                      discountAmount.toFixed(2)
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Estimated tax (10%)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium tabular-nums", children: [
                  "$",
                  tax.toFixed(2)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "opacity-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-lg font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", children: [
                "$",
                orderTotal.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CouponInput,
              {
                onApply: (discount, code) => {
                  setCouponDiscount(discount);
                  setCouponCode(code);
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "lg",
                className: "w-full rounded-2xl font-semibold transition-smooth shadow-soft",
                "data-ocid": "cart-checkout-cta",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.span,
                  {
                    className: "flex items-center gap-2",
                    whileHover: { gap: "12px" },
                    transition: { duration: 0.2 },
                    children: [
                      "Proceed to Checkout",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "→" })
                    ]
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground", children: "Free shipping on orders over $100" })
          ] })
        }
      )
    ] })
  ] }) });
}
export {
  CartPage
};
