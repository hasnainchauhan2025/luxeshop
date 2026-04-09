import { SkeletonCard } from "@/components/ui/LoadingSpinner";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProducts } from "@/hooks/useProducts";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

type SortKey = "newest" | "price-asc" | "price-desc";

const CATEGORIES = [
  "All",
  "Electronics",
  "Fashion",
  "Accessories",
  "Home",
  "Beauty",
  "Bags",
  "Apparel",
] as const;
const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];
const PAGE_SIZE = 12;

function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function sortProducts(products: Product[], sort: SortKey): Product[] {
  if (sort === "price-asc")
    return [...products].sort((a, b) => a.price - b.price);
  if (sort === "price-desc")
    return [...products].sort((a, b) => b.price - a.price);
  return products;
}

export function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortKey>("newest");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 280);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { data: allProducts = [], isLoading } = useProducts(
    category !== "All" ? category : undefined,
  );

  // Filter + sort
  const filtered = useMemo(() => {
    let list = allProducts;
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return sortProducts(list, sort);
  }, [allProducts, debouncedSearch, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const clearSearch = () => {
    setSearch("");
    searchInputRef.current?.focus();
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="font-display text-3xl sm:text-4xl font-semibold">
          All Products
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {isLoading
            ? "Loading…"
            : `${filtered.length} product${filtered.length !== 1 ? "s" : ""}`}
        </p>
      </motion.div>

      {/* Sticky filter bar */}
      <div
        className="sticky top-16 z-20 -mx-4 sm:-mx-6 px-4 sm:px-6 pb-4 pt-2 bg-background/80 backdrop-blur-md border-b border-border/40 mb-8"
        data-ocid="products-filter-bar"
      >
        {/* Search + Sort */}
        <div className="flex gap-3 mb-3">
          <div className="relative flex-1 max-w-sm">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <Input
              ref={searchInputRef}
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-8 rounded-xl h-9 text-sm"
              data-ocid="products-search"
            />
            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal
              size={14}
              className="text-muted-foreground shrink-0 hidden sm:block"
            />
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger
                className="w-44 h-9 rounded-xl text-sm"
                data-ocid="products-sort"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category tabs */}
        <div
          className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5"
          data-ocid="products-category-tabs"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                "shrink-0 px-3.5 py-1 rounded-full text-xs font-medium transition-smooth border",
                category === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-soft"
                  : "bg-card text-muted-foreground border-border/50 hover:text-foreground hover:border-border",
              )}
              data-ocid={`category-tab-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {Array.from({ length: 8 }, (_, i) => `skel-${i}`).map((id) => (
            <SkeletonCard key={id} />
          ))}
        </div>
      ) : pageItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 glass-card"
          data-ocid="products-empty"
        >
          <Search size={32} className="mx-auto text-muted-foreground mb-4" />
          <p className="font-display text-xl font-semibold mb-2">
            No products found
          </p>
          <p className="text-muted-foreground text-sm mb-5">
            Try a different search term or category
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
            className="rounded-xl gap-2"
          >
            <X size={14} /> Clear Filters
          </Button>
        </motion.div>
      ) : (
        <motion.div
          key={`${category}-${debouncedSearch}-${sort}-${page}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
          data-ocid="products-grid"
        >
          {pageItems.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-2 mt-10"
          data-ocid="products-pagination"
        >
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-xl"
            data-ocid="pagination-prev"
          >
            Previous
          </Button>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setPage(pageNum)}
                  className={cn(
                    "w-8 h-8 rounded-lg text-sm font-medium transition-smooth",
                    page === pageNum
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                  data-ocid={`pagination-page-${pageNum}`}
                >
                  {pageNum}
                </button>
              ),
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-xl"
            data-ocid="pagination-next"
          >
            Next
          </Button>
        </motion.div>
      )}
    </div>
  );
}
