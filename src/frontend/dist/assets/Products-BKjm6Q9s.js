import { c as createLucideIcon, j as reactExports, q as jsxRuntimeExports, t as motion, x as Search, X, y as cn, S as SkeletonCard, w as Button } from "./index-CgQGP8Uk.js";
import { P as ProductCard } from "./ProductCard-Bb_nBoTz.js";
import { I as Input } from "./input-CUkXXFPT.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BpLSol7X.js";
import { a as useProducts } from "./useProducts-D_mZPzat.js";
import "./check-CrhCrbfN.js";
import "./chevron-up-CLaulU-o.js";
import "./useMutation-CVK8QqpV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const CATEGORIES = [
  "All",
  "Electronics",
  "Fashion",
  "Accessories",
  "Home",
  "Beauty",
  "Bags",
  "Apparel"
];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" }
];
const PAGE_SIZE = 12;
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = reactExports.useState(value);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
function sortProducts(products, sort) {
  if (sort === "price-asc")
    return [...products].sort((a, b) => a.price - b.price);
  if (sort === "price-desc")
    return [...products].sort((a, b) => b.price - a.price);
  return products;
}
function ProductsPage() {
  const [search, setSearch] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("All");
  const [sort, setSort] = reactExports.useState("newest");
  const [page, setPage] = reactExports.useState(1);
  const debouncedSearch = useDebounce(search, 280);
  const searchInputRef = reactExports.useRef(null);
  const { data: allProducts = [], isLoading } = useProducts(
    category !== "All" ? category : void 0
  );
  const filtered = reactExports.useMemo(() => {
    let list = allProducts;
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return sortProducts(list, sort);
  }, [allProducts, debouncedSearch, sort]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );
  const clearSearch = () => {
    var _a;
    setSearch("");
    (_a = searchInputRef.current) == null ? void 0 : _a.focus();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "mb-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-semibold", children: "All Products" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: isLoading ? "Loading…" : `${filtered.length} product${filtered.length !== 1 ? "s" : ""}` })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "sticky top-16 z-20 -mx-4 sm:-mx-6 px-4 sm:px-6 pb-4 pt-2 bg-background/80 backdrop-blur-md border-b border-border/40 mb-8",
        "data-ocid": "products-filter-bar",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Search,
                {
                  size: 15,
                  className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  ref: searchInputRef,
                  placeholder: "Search products…",
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  className: "pl-9 pr-8 rounded-xl h-9 text-sm",
                  "data-ocid": "products-search"
                }
              ),
              search && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: clearSearch,
                  className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                  "aria-label": "Clear search",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 13 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SlidersHorizontal,
                {
                  size: 14,
                  className: "text-muted-foreground shrink-0 hidden sm:block"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sort, onValueChange: (v) => setSort(v), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "w-44 h-9 rounded-xl text-sm",
                    "data-ocid": "products-sort",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SORT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt.value, children: opt.label }, opt.value)) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5",
              "data-ocid": "products-category-tabs",
              children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setCategory(cat),
                  className: cn(
                    "shrink-0 px-3.5 py-1 rounded-full text-xs font-medium transition-smooth border",
                    category === cat ? "bg-primary text-primary-foreground border-primary shadow-soft" : "bg-card text-muted-foreground border-border/50 hover:text-foreground hover:border-border"
                  ),
                  "data-ocid": `category-tab-${cat.toLowerCase()}`,
                  children: cat
                },
                cat
              ))
            }
          )
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6", children: Array.from({ length: 8 }, (_, i) => `skel-${i}`).map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, id)) }) : pageItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "text-center py-20 glass-card",
        "data-ocid": "products-empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 32, className: "mx-auto text-muted-foreground mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold mb-2", children: "No products found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-5", children: "Try a different search term or category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => {
                setSearch("");
                setCategory("All");
              },
              className: "rounded-xl gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 }),
                " Clear Filters"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 },
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6",
        "data-ocid": "products-grid",
        children: pageItems.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index: i }, product.id))
      },
      `${category}-${debouncedSearch}-${sort}-${page}`
    ),
    !isLoading && totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.3 },
        className: "flex items-center justify-center gap-2 mt-10",
        "data-ocid": "products-pagination",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              disabled: page === 1,
              onClick: () => setPage((p) => p - 1),
              className: "rounded-xl",
              "data-ocid": "pagination-prev",
              children: "Previous"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setPage(pageNum),
                className: cn(
                  "w-8 h-8 rounded-lg text-sm font-medium transition-smooth",
                  page === pageNum ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                ),
                "data-ocid": `pagination-page-${pageNum}`,
                children: pageNum
              },
              pageNum
            )
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              disabled: page === totalPages,
              onClick: () => setPage((p) => p + 1),
              className: "rounded-xl",
              "data-ocid": "pagination-next",
              children: "Next"
            }
          )
        ]
      }
    )
  ] });
}
export {
  ProductsPage
};
