import { D as useWishlist, q as jsxRuntimeExports, t as motion, L as Link, w as Button, G as ShoppingBag, H as Heart } from "./index-CgQGP8Uk.js";
import { P as ProductCard } from "./ProductCard-Bb_nBoTz.js";
function WishlistPage() {
  const { items } = useWishlist();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-7xl mx-auto px-6 pt-28 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "flex items-center justify-between mb-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold", children: "Wishlist" }),
            items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
              items.length,
              " saved item",
              items.length !== 1 ? "s" : ""
            ] })
          ] }),
          items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "gap-2 rounded-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 14 }),
            "Continue Shopping"
          ] }) })
        ]
      }
    ),
    items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5 },
        className: "text-center py-20 glass-card",
        "data-ocid": "wishlist-empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 28, className: "text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold mb-2", children: "Nothing saved yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Tap the heart on any product to save it here" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "rounded-xl gap-2",
              "data-ocid": "wishlist-browse-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 16 }),
                " Browse Products"
              ]
            }
          ) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.4 },
        className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6",
        "data-ocid": "wishlist-grid",
        children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProductCard,
          {
            product: item.product,
            index: i
          },
          item.productId
        ))
      }
    )
  ] });
}
export {
  WishlistPage
};
