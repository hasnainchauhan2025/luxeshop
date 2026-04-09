import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/useWishlist";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

export function WishlistPage() {
  const { items } = useWishlist();

  return (
    <div className="container max-w-7xl mx-auto px-6 pt-28 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="font-display text-3xl font-semibold">Wishlist</h1>
          {items.length > 0 && (
            <p className="text-muted-foreground text-sm mt-1">
              {items.length} saved item{items.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        {items.length > 0 && (
          <Link to="/products">
            <Button variant="outline" size="sm" className="gap-2 rounded-xl">
              <ShoppingBag size={14} />
              Continue Shopping
            </Button>
          </Link>
        )}
      </motion.div>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-20 glass-card"
          data-ocid="wishlist-empty"
        >
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Heart size={28} className="text-muted-foreground" />
          </div>
          <p className="font-display text-xl font-semibold mb-2">
            Nothing saved yet
          </p>
          <p className="text-muted-foreground text-sm mb-6">
            Tap the heart on any product to save it here
          </p>
          <Link to="/products">
            <Button
              size="lg"
              className="rounded-xl gap-2"
              data-ocid="wishlist-browse-btn"
            >
              <ShoppingBag size={16} /> Browse Products
            </Button>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6"
          data-ocid="wishlist-grid"
        >
          {items.map((item, i) => (
            <ProductCard
              key={item.productId}
              product={item.product}
              index={i}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
