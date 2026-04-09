import { c as createLucideIcon, z as useParams, A as useCart, D as useWishlist, E as useAuthStore, j as reactExports, q as jsxRuntimeExports, L as Link, w as Button, t as motion, F as AnimatePresence, B as Badge, y as cn, G as ShoppingBag, H as Heart } from "./index-CgQGP8Uk.js";
import { S as Star, P as ProductCard } from "./ProductCard-Bb_nBoTz.js";
import { S as Skeleton, C as ChevronRight, T as Textarea } from "./textarea-DssqasIW.js";
import { b as useProduct, a as useProducts } from "./useProducts-D_mZPzat.js";
import { C as Canvas, a as useEmblaCarousel, E as Environment, O as OrbitControls, u as useFrame } from "./embla-carousel-react.esm-C3cl_Q9T.js";
import { M as Minus } from "./minus-Dy5w9gGy.js";
import { P as Plus } from "./plus-B88tnL3F.js";
import { C as Check } from "./check-CrhCrbfN.js";
import "./useMutation-CVK8QqpV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "11", x2: "11", y1: "8", y2: "14", key: "1vmskp" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
];
const ZoomIn = createLucideIcon("zoom-in", __iconNode);
const FALLBACK_PRODUCT = {
  id: "p1",
  name: "Obsidian Watch",
  description: "A precision-crafted timepiece with a sapphire crystal face and midnight matte finish. Every detail is engineered for longevity — from the 316L stainless steel case to the hand-stitched Italian leather strap. Water resistant to 200m.",
  price: 849,
  comparePrice: 1200,
  images: [
    "/assets/generated/product-watch.dim_600x600.jpg",
    "/assets/generated/product-fragrance.dim_600x600.jpg",
    "/assets/generated/product-wallet.dim_600x600.jpg"
  ],
  category: "Accessories",
  stock: 12,
  rating: 4.9,
  reviewCount: 142,
  tags: ["luxury", "watch", "accessories"],
  featured: true,
  colors: ["Midnight Black", "Brushed Silver", "Rose Gold"],
  sizes: []
};
const SAMPLE_REVIEWS = [
  {
    id: "r1",
    productId: "p1",
    userId: "u1",
    userName: "Marcus L.",
    rating: 5,
    title: "Absolutely flawless craftsmanship",
    body: "Received mine two weeks ago and I can't stop looking at it. The weight feels premium, the sapphire crystal is crystal-clear, and the strap is butter-smooth leather.",
    createdAt: Date.now() - 1e3 * 60 * 60 * 24 * 14,
    verified: true
  },
  {
    id: "r2",
    productId: "p1",
    userId: "u2",
    userName: "Sophie K.",
    rating: 5,
    title: "Worth every penny",
    body: "Gifted this to my husband and he absolutely loves it. Packaging was stunning too — felt like a real luxury unboxing experience.",
    createdAt: Date.now() - 1e3 * 60 * 60 * 24 * 30,
    verified: true
  },
  {
    id: "r3",
    productId: "p1",
    userId: "u3",
    userName: "Daniel R.",
    rating: 4,
    title: "Exceptional quality, minor notes",
    body: "The dial is stunning in all lighting conditions. Only slight feedback: the clasp takes a little getting used to. Still 5 stars in my heart.",
    createdAt: Date.now() - 1e3 * 60 * 60 * 24 * 45,
    verified: false
  }
];
const COLOR_HEX = {
  "Midnight Black": "#1a1a2e",
  "Brushed Silver": "#c0c0d0",
  "Rose Gold": "#b76e79",
  "Carbon Black": "#232323",
  "Silver Weave": "#aab0bc",
  "Cloud White": "#f0f0f0",
  "Slate Grey": "#64748b",
  "Forest Green": "#2d6a4f",
  Cognac: "#9b5c2a",
  "Dark Brown": "#5c3a1e",
  "Jet Black": "#0d0d0d",
  "Ash White": "#f5f0e8",
  Charcoal: "#3d3d3d",
  Terracotta: "#c0613a"
};
function ProductModel({ color }) {
  const meshRef = reactExports.useRef(null);
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
    }
  });
  const hexColor = COLOR_HEX[color] ?? "#3b82f6";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: meshRef, castShadow: true, receiveShadow: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("torusGeometry", { args: [1, 0.38, 32, 64] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshStandardMaterial",
      {
        color: hexColor,
        metalness: 0.85,
        roughness: 0.15,
        envMapIntensity: 1.5
      }
    )
  ] });
}
function ThreeDScene({ color }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.6 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("directionalLight", { position: [5, 5, 5], intensity: 1.8, castShadow: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "directionalLight",
      {
        position: [-3, -2, -3],
        intensity: 0.4,
        color: "#8b9eff"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Environment, { preset: "city" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProductModel, { color }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OrbitControls,
      {
        enableZoom: true,
        enablePan: false,
        autoRotate: false,
        minPolarAngle: Math.PI / 4,
        maxPolarAngle: 3 * Math.PI / 4
      }
    )
  ] });
}
function StarRating({
  rating,
  size = 14,
  interactive = false,
  onRate
}) {
  const [hovered, setHovered] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      disabled: !interactive,
      className: cn("transition-colors", interactive && "cursor-pointer"),
      onClick: () => onRate == null ? void 0 : onRate(s),
      onMouseEnter: () => interactive && setHovered(s),
      onMouseLeave: () => interactive && setHovered(0),
      "aria-label": `Rate ${s} star${s > 1 ? "s" : ""}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Star,
        {
          size,
          className: cn(
            (hovered || rating) >= s ? "text-amber-400 fill-amber-400" : "text-muted-foreground"
          )
        }
      )
    },
    s
  )) });
}
function Breadcrumb({ name, category }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "nav",
    {
      "aria-label": "Breadcrumb",
      className: "flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "Home" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14, className: "opacity-50 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "hover:text-foreground transition-colors", children: "Products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14, className: "opacity-50 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/70", children: category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14, className: "opacity-50 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate max-w-[160px]", children: name })
      ]
    }
  );
}
function ImageGallery({ images, name }) {
  const [activeIdx, setActiveIdx] = reactExports.useState(0);
  const [zoomed, setZoomed] = reactExports.useState(false);
  const active = images[activeIdx] ?? "/assets/images/placeholder.svg";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "relative aspect-square rounded-2xl overflow-hidden bg-card border border-border/30 w-full",
        onClick: () => setZoomed((z) => !z),
        "aria-label": zoomed ? "Click to zoom out" : "Click to zoom in",
        "data-ocid": "product-image-main",
        style: { cursor: zoomed ? "zoom-out" : "zoom-in" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.img,
            {
              src: active,
              alt: `${name} view ${activeIdx + 1}`,
              initial: { opacity: 0, scale: 1.04 },
              animate: { opacity: 1, scale: zoomed ? 1.3 : 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
              className: "w-full h-full object-cover select-none",
              loading: "eager"
            },
            active
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3 glass rounded-full p-1.5 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { size: 14, className: "text-muted-foreground" }) }),
          images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 right-3 glass rounded-full px-2 py-1 text-xs text-muted-foreground pointer-events-none", children: [
            activeIdx + 1,
            " / ",
            images.length
          ] })
        ]
      }
    ),
    images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1", children: images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setActiveIdx(i),
        className: cn(
          "shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-smooth",
          i === activeIdx ? "border-primary shadow-soft" : "border-border/30 hover:border-border opacity-60 hover:opacity-100"
        ),
        "aria-label": `View image ${i + 1}`,
        "data-ocid": `product-thumb-${i}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: img,
            alt: `${name} thumbnail ${i + 1}`,
            className: "w-full h-full object-cover",
            loading: "lazy"
          }
        )
      },
      img
    )) })
  ] });
}
function ThreeDViewer({ color }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "aspect-square rounded-2xl overflow-hidden bg-card border border-border/30 relative",
      "data-ocid": "product-3d-viewer",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          reactExports.Suspense,
          {
            fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-40 h-40 rounded-full" }) }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Canvas,
              {
                camera: { position: [0, 0, 3.5], fov: 45 },
                shadows: true,
                gl: { antialias: true, alpha: true },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThreeDScene, { color })
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "glass text-xs text-muted-foreground px-3 py-1 rounded-full", children: "Drag to rotate · Scroll to zoom" }) })
      ]
    }
  );
}
function ReviewCard({ review, index }) {
  const date = new Date(review.createdAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.07 },
      className: "glass-card",
      "data-ocid": "review-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: review.userName }),
              review.verified && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-[10px] text-emerald-400 border-emerald-400/30 py-0",
                  children: "Verified"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: date })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: review.rating, size: 12 })
        ] }),
        review.title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm mb-1", children: review.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: review.body })
      ]
    }
  );
}
function ReviewForm({ productId: _productId }) {
  const [rating, setRating] = reactExports.useState(0);
  const [comment, setComment] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return;
    setSubmitted(true);
  };
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1 },
        className: "glass-card text-center py-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 22, className: "text-emerald-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Review submitted!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Thank you for sharing your experience." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "glass-card space-y-4",
      "data-ocid": "review-form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-base", children: "Write a Review" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "text-sm text-muted-foreground mb-2", children: "Your Rating" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating, size: 22, interactive: true, onRate: setRating })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "review-comment",
              className: "text-sm text-muted-foreground mb-1 block",
              children: "Your Experience"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "review-comment",
              value: comment,
              onChange: (e) => setComment(e.target.value),
              placeholder: "Share what you love (or don't) about this product…",
              rows: 4,
              className: "resize-none bg-background/60",
              "data-ocid": "review-comment"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: rating === 0,
            className: "w-full sm:w-auto",
            "data-ocid": "review-submit",
            children: "Submit Review"
          }
        )
      ]
    }
  );
}
function RelatedCarousel({
  products,
  currentId
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1
  });
  const [canPrev, setCanPrev] = reactExports.useState(false);
  const [canNext, setCanNext] = reactExports.useState(true);
  const updateNav = reactExports.useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);
  reactExports.useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateNav);
    updateNav();
  }, [emblaApi, updateNav]);
  const related = products.filter((p) => p.id !== currentId).slice(0, 6);
  if (related.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "overflow-hidden",
        ref: emblaRef,
        "data-ocid": "related-carousel",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4", children: related.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-none w-[260px] sm:w-[280px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index: i }) }, product.id)) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "icon",
          onClick: () => emblaApi == null ? void 0 : emblaApi.scrollPrev(),
          disabled: !canPrev,
          "aria-label": "Scroll left",
          className: "rounded-full",
          "data-ocid": "carousel-prev",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "icon",
          onClick: () => emblaApi == null ? void 0 : emblaApi.scrollNext(),
          disabled: !canNext,
          "aria-label": "Scroll right",
          className: "rounded-full",
          "data-ocid": "carousel-next",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
        }
      )
    ] })
  ] });
}
const SWATCH_COLORS = {
  "Midnight Black": "bg-neutral-900 border-neutral-700",
  "Brushed Silver": "bg-slate-300 border-slate-400",
  "Rose Gold": "bg-rose-300 border-rose-400",
  "Carbon Black": "bg-neutral-900 border-neutral-700",
  "Silver Weave": "bg-slate-300 border-slate-400",
  "Cloud White": "bg-zinc-100 border-zinc-300",
  "Slate Grey": "bg-slate-500 border-slate-600",
  "Forest Green": "bg-emerald-700 border-emerald-800",
  Cognac: "bg-amber-700 border-amber-800",
  "Dark Brown": "bg-stone-700 border-stone-800",
  "Jet Black": "bg-neutral-950 border-neutral-800",
  "Ash White": "bg-zinc-100 border-zinc-300",
  Charcoal: "bg-zinc-700 border-zinc-800",
  Terracotta: "bg-orange-600 border-orange-700"
};
function ProductDetailPage() {
  var _a, _b, _c;
  const { id } = useParams({ from: "/products/$id" });
  const { data: product, isLoading } = useProduct(id);
  const { data: allProducts = [] } = useProducts();
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const resolved = product ?? (isLoading ? null : FALLBACK_PRODUCT);
  const [selectedColor, setSelectedColor] = reactExports.useState();
  const [selectedSize, setSelectedSize] = reactExports.useState();
  const [quantity, setQuantity] = reactExports.useState(1);
  const [viewMode, setViewMode] = reactExports.useState("gallery");
  const [addedToCart, setAddedToCart] = reactExports.useState(false);
  const resolvedId = resolved == null ? void 0 : resolved.id;
  const resolvedFirstColor = (_a = resolved == null ? void 0 : resolved.colors) == null ? void 0 : _a[0];
  const resolvedFirstSize = (_b = resolved == null ? void 0 : resolved.sizes) == null ? void 0 : _b[0];
  reactExports.useEffect(() => {
    if (!resolvedId) return;
    setSelectedColor(resolvedFirstColor);
    setSelectedSize(resolvedFirstSize);
  }, [resolvedId, resolvedFirstColor, resolvedFirstSize]);
  const wishlisted = resolved ? has(resolved.id) : false;
  const handleAddToCart = () => {
    if (!resolved) return;
    addItem(resolved, quantity, selectedColor, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2200);
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-10 max-w-6xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-32 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-9 rounded-full" }, i)) })
      ] })
    ] }) });
  }
  if (!resolved) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display mb-4", children: "Product not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Browse all products" }) })
    ] });
  }
  const discount = resolved.comparePrice ? Math.round(
    (resolved.comparePrice - resolved.price) / resolved.comparePrice * 100
  ) : null;
  const stockLabel = resolved.stock > 10 ? { text: "In Stock", cls: "text-emerald-400" } : resolved.stock > 0 ? { text: `Only ${resolved.stock} left`, cls: "text-amber-400" } : { text: "Out of Stock", cls: "text-destructive" };
  const activeColor = selectedColor ?? ((_c = resolved.colors) == null ? void 0 : _c[0]) ?? "slate";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-6xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { name: resolved.name, category: resolved.category }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: viewMode === "gallery" ? "default" : "outline",
                  size: "sm",
                  onClick: () => setViewMode("gallery"),
                  className: "rounded-full text-xs",
                  "data-ocid": "toggle-gallery",
                  children: "Gallery"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: viewMode === "3d" ? "default" : "outline",
                  size: "sm",
                  onClick: () => setViewMode("3d"),
                  className: "rounded-full text-xs",
                  "data-ocid": "toggle-3d",
                  children: "3D Viewer"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: viewMode === "gallery" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                transition: { duration: 0.25 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageGallery, { images: resolved.images, name: resolved.name })
              },
              "gallery"
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                transition: { duration: 0.25 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThreeDViewer, { color: activeColor })
              },
              "3d"
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.55, delay: 0.08, ease: [0.4, 0, 0.2, 1] },
          className: "flex flex-col gap-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs font-medium", children: resolved.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-xs font-medium", stockLabel.cls), children: stockLabel.text })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold leading-tight", children: resolved.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: Math.round(resolved.rating), size: 16 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                resolved.rating.toFixed(1),
                " · ",
                resolved.reviewCount,
                " reviews"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "#reviews",
                  className: "text-xs text-primary hover:underline",
                  "data-ocid": "scroll-to-reviews",
                  children: "See reviews"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-3 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-3xl font-bold", children: [
                "$",
                resolved.price
              ] }),
              resolved.comparePrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg text-muted-foreground line-through", children: [
                "$",
                resolved.comparePrice
              ] }),
              discount && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs", children: [
                "Save ",
                discount,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm", children: resolved.description }),
            resolved.colors && resolved.colors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium mb-2", children: [
                "Color:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: selectedColor })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex gap-2 flex-wrap",
                  "data-ocid": "color-selector",
                  children: resolved.colors.map((color) => {
                    const swatchClass = SWATCH_COLORS[color] ?? "bg-primary/70 border-primary";
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setSelectedColor(color),
                        className: cn(
                          "w-8 h-8 rounded-full border-2 transition-smooth",
                          swatchClass,
                          selectedColor === color ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110" : "hover:scale-105"
                        ),
                        "aria-label": `Select color ${color}`,
                        "aria-pressed": selectedColor === color,
                        "data-ocid": `color-swatch-${color.replace(/\s+/g, "-").toLowerCase()}`
                      },
                      color
                    );
                  })
                }
              )
            ] }),
            resolved.sizes && resolved.sizes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-2", children: "Size" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", "data-ocid": "size-selector", children: resolved.sizes.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSelectedSize(size),
                  className: cn(
                    "min-w-[3rem] h-10 px-3 rounded-lg border text-sm font-medium transition-smooth",
                    selectedSize === size ? "bg-primary text-primary-foreground border-primary shadow-soft" : "border-border hover:border-primary/60 bg-card"
                  ),
                  "aria-pressed": selectedSize === size,
                  "data-ocid": `size-btn-${size}`,
                  children: size
                },
                size
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-2", children: "Quantity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-3",
                  "data-ocid": "quantity-selector",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setQuantity((q) => Math.max(1, q - 1)),
                        className: "w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-smooth",
                        "aria-label": "Decrease quantity",
                        "data-ocid": "qty-minus",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 14 })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-10 text-center font-semibold text-lg tabular-nums",
                        "aria-live": "polite",
                        "data-ocid": "qty-display",
                        children: quantity
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setQuantity((q) => Math.min(resolved.stock, q + 1)),
                        className: "w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-smooth",
                        "aria-label": "Increase quantity",
                        "data-ocid": "qty-plus",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 })
                      }
                    )
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "flex-1", whileTap: { scale: 0.97 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: cn(
                    "w-full h-12 text-base font-semibold gap-2 transition-all duration-300 text-white border-transparent",
                    addedToCart ? "bg-emerald-500 hover:bg-emerald-500" : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400"
                  ),
                  onClick: handleAddToCart,
                  disabled: resolved.stock === 0,
                  "data-ocid": "add-to-cart-btn",
                  "aria-label": "Add to cart",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: addedToCart ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.span,
                    {
                      initial: { scale: 0.5, opacity: 0 },
                      animate: { scale: 1, opacity: 1 },
                      exit: { scale: 0.5, opacity: 0 },
                      className: "flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 18 }),
                        "Added to Cart!"
                      ]
                    },
                    "check"
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.span,
                    {
                      initial: { scale: 0.5, opacity: 0 },
                      animate: { scale: 1, opacity: 1 },
                      exit: { scale: 0.5, opacity: 0 },
                      className: "flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 18 }),
                        "Add to Cart"
                      ]
                    },
                    "add"
                  ) })
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  type: "button",
                  whileTap: { scale: 0.9 },
                  onClick: () => toggle(resolved),
                  className: cn(
                    "w-12 h-12 rounded-xl border flex items-center justify-center transition-smooth",
                    wishlisted ? "bg-red-500/10 border-red-500/40 text-red-400" : "border-border hover:border-red-400/50 text-muted-foreground hover:text-red-400"
                  ),
                  "aria-label": wishlisted ? "Remove from wishlist" : "Add to wishlist",
                  "data-ocid": "wishlist-btn",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Heart,
                    {
                      size: 18,
                      fill: wishlisted ? "currentColor" : "none",
                      className: "transition-smooth"
                    }
                  )
                }
              )
            ] }),
            resolved.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 pt-1", children: resolved.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-xs capitalize",
                children: tag
              },
              tag
            )) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "reviews", className: "mt-20 scroll-mt-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2", children: "Customer Reviews" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl font-display font-bold", children: resolved.rating.toFixed(1) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: Math.round(resolved.rating), size: 20 }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                  "Based on ",
                  resolved.reviewCount,
                  " reviews"
                ] })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10", children: SAMPLE_REVIEWS.map((review, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewCard, { review, index: i }, review.id)) }),
      isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewForm, { productId: resolved.id }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "glass-card text-center py-8",
          "data-ocid": "review-auth-cta",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/account",
                className: "text-primary hover:underline font-medium",
                children: "Sign in"
              }
            ),
            " ",
            "to leave a review"
          ] })
        }
      )
    ] }),
    allProducts.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-20 pb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "mb-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: "You Might Also Like" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Curated picks from the same collection" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedCarousel, { products: allProducts, currentId: resolved.id })
    ] })
  ] }) });
}
export {
  ProductDetailPage
};
