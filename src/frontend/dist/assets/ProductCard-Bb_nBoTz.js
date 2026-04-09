import { c as createLucideIcon, j as reactExports, A as useCart, D as useWishlist, q as jsxRuntimeExports, t as motion, L as Link, y as cn, B as Badge, H as Heart, w as Button, G as ShoppingBag } from "./index-CgQGP8Uk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
function ProductCard({
  product,
  className,
  index = 0
}) {
  const [imgLoaded, setImgLoaded] = reactExports.useState(false);
  const [hovered, setHovered] = reactExports.useState(false);
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const wishlisted = has(product.id);
  const discount = product.comparePrice ? Math.round(
    (product.comparePrice - product.price) / product.comparePrice * 100
  ) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: index * 0.08 },
      className: cn("group relative", className),
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      "data-ocid": "product-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl bg-card border border-border/40 shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/products/$id",
              params: { id: product.id },
              className: "block aspect-square overflow-hidden",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "w-full h-full bg-muted transition-opacity duration-300",
                      imgLoaded ? "opacity-0 absolute" : "opacity-100"
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: product.images[0] ?? "/assets/images/placeholder.svg",
                    alt: product.name,
                    className: cn(
                      "w-full h-full object-cover transition-all duration-700",
                      hovered ? "scale-108" : "scale-100",
                      imgLoaded ? "opacity-100" : "opacity-0"
                    ),
                    style: { transform: hovered ? "scale(1.08)" : "scale(1)" },
                    onLoad: () => setImgLoaded(true),
                    loading: "lazy"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 left-3 flex gap-1.5", children: [
            discount && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "secondary",
                className: "text-[10px] font-semibold bg-primary text-primary-foreground",
                children: [
                  "-",
                  discount,
                  "%"
                ]
              }
            ),
            product.featured && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-[10px] glass border-primary/30 text-primary",
                children: "Featured"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: cn(
                "absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center transition-smooth",
                wishlisted ? "text-red-500" : "text-muted-foreground hover:text-red-500"
              ),
              onClick: (e) => {
                e.preventDefault();
                toggle(product);
              },
              "aria-label": wishlisted ? "Remove from wishlist" : "Add to wishlist",
              "data-ocid": "product-wishlist-btn",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 15, fill: wishlisted ? "currentColor" : "none" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 },
              transition: { duration: 0.2 },
              className: "absolute bottom-3 left-3 right-3",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "w-full gap-2 text-xs shadow-elevated",
                  onClick: (e) => {
                    e.preventDefault();
                    addItem(product, 1);
                  },
                  "data-ocid": "product-add-to-cart",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 13 }),
                    "Add to Cart"
                  ]
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 px-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-[10px] text-muted-foreground border-border/50 mb-1",
                  children: product.category
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/$id", params: { id: product.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold leading-snug hover:text-primary transition-smooth truncate", children: product.name }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold", children: [
                "$",
                product.price
              ] }),
              product.comparePrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground line-through", children: [
                "$",
                product.comparePrice
              ] })
            ] })
          ] }),
          product.rating > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                size: 11,
                className: star <= Math.round(product.rating) ? "text-primary fill-primary" : "text-muted-foreground"
              },
              star
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "(",
              product.reviewCount,
              ")"
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  ProductCard as P,
  Star as S
};
