import { useProducts } from "@/hooks/useProducts";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

export function SearchBar({
  className,
  placeholder = "Search products...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { data: allProducts = [] } = useProducts();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const results: Product[] =
    debouncedQuery.length > 1
      ? allProducts
          .filter(
            (p) =>
              p.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
              p.category.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
              p.tags.some((t) =>
                t.toLowerCase().includes(debouncedQuery.toLowerCase()),
              ),
          )
          .slice(0, 6)
      : [];

  const handleSelect = (product: Product) => {
    navigate({ to: "/products/$id", params: { id: product.id } });
    setQuery("");
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query) {
      navigate({ to: "/products" });
      setOpen(false);
    }
    if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  };

  return (
    <div className={cn("relative", className)} data-ocid="search-bar">
      <div className="flex items-center gap-2 glass rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-primary/30 transition-smooth">
        <Search size={16} className="text-muted-foreground shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground min-w-0"
          data-ocid="search-input"
          aria-label="Search products"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setOpen(false);
              inputRef.current?.focus();
            }}
            className="text-muted-foreground hover:text-foreground transition-smooth shrink-0"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-0 right-0 glass-card !p-1 shadow-elevated z-50 max-h-80 overflow-y-auto"
            data-ocid="search-results"
          >
            {results.map((product) => (
              <button
                key={product.id}
                type="button"
                className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-muted/50 transition-smooth text-left"
                onClick={() => handleSelect(product)}
                data-ocid="search-result-item"
              >
                <img
                  src={product.images[0] ?? "/assets/images/placeholder.svg"}
                  alt={product.name}
                  className="w-9 h-9 rounded-lg object-cover bg-muted shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {product.category} · ${product.price}
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className="text-muted-foreground shrink-0"
                />
              </button>
            ))}

            {query.length > 1 && (
              <button
                type="button"
                className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg border-t border-border/30 mt-1 text-sm text-primary hover:bg-primary/5 transition-smooth"
                onClick={() => {
                  navigate({ to: "/products" });
                  setOpen(false);
                }}
              >
                <Search size={13} />
                See all results for "{query}"
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
