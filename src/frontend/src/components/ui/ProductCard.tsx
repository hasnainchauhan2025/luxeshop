import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  className?: string;
  index?: number;
}

export function ProductCard({
  product,
  className,
  index = 0,
}: ProductCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();

  const wishlisted = has(product.id);
  const discount = product.comparePrice
    ? Math.round(
        ((product.comparePrice - product.price) / product.comparePrice) * 100,
      )
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn("group relative", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-ocid="product-card"
    >
      <div className="relative overflow-hidden rounded-2xl bg-card border border-border/40 shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1">
        {/* Image */}
        <Link
          to="/products/$id"
          params={{ id: product.id }}
          className="block aspect-square overflow-hidden"
        >
          <div
            className={cn(
              "w-full h-full bg-muted transition-opacity duration-300",
              imgLoaded ? "opacity-0 absolute" : "opacity-100",
            )}
          />
          <img
            src={product.images[0] ?? "/assets/images/placeholder.svg"}
            alt={product.name}
            className={cn(
              "w-full h-full object-cover transition-all duration-700",
              hovered ? "scale-108" : "scale-100",
              imgLoaded ? "opacity-100" : "opacity-0",
            )}
            style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
            onLoad={() => setImgLoaded(true)}
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {discount && (
            <Badge
              variant="secondary"
              className="text-[10px] font-semibold bg-primary text-primary-foreground"
            >
              -{discount}%
            </Badge>
          )}
          {product.featured && (
            <Badge
              variant="outline"
              className="text-[10px] glass border-primary/30 text-primary"
            >
              Featured
            </Badge>
          )}
        </div>

        {/* Wishlist button */}
        <button
          type="button"
          className={cn(
            "absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center transition-smooth",
            wishlisted
              ? "text-red-500"
              : "text-muted-foreground hover:text-red-500",
          )}
          onClick={(e) => {
            e.preventDefault();
            toggle(product);
          }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          data-ocid="product-wishlist-btn"
        >
          <Heart size={15} fill={wishlisted ? "currentColor" : "none"} />
        </button>

        {/* Quick add */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-3 left-3 right-3"
        >
          <Button
            size="sm"
            className="w-full gap-2 text-xs shadow-elevated"
            onClick={(e) => {
              e.preventDefault();
              addItem(product, 1);
            }}
            data-ocid="product-add-to-cart"
          >
            <ShoppingBag size={13} />
            Add to Cart
          </Button>
        </motion.div>
      </div>

      {/* Info */}
      <div className="mt-3 px-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Badge
              variant="outline"
              className="text-[10px] text-muted-foreground border-border/50 mb-1"
            >
              {product.category}
            </Badge>
            <Link to="/products/$id" params={{ id: product.id }}>
              <h3 className="font-display text-sm font-semibold leading-snug hover:text-primary transition-smooth truncate">
                {product.name}
              </h3>
            </Link>
          </div>
          <div className="text-right shrink-0">
            <div className="text-sm font-semibold">${product.price}</div>
            {product.comparePrice && (
              <div className="text-xs text-muted-foreground line-through">
                ${product.comparePrice}
              </div>
            )}
          </div>
        </div>

        {product.rating > 0 && (
          <div className="flex items-center gap-1 mt-1.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={11}
                  className={
                    star <= Math.round(product.rating)
                      ? "text-primary fill-primary"
                      : "text-muted-foreground"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
