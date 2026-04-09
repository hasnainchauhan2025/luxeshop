import { useWishlistStore } from "@/stores/wishlistStore";
import type { Product } from "@/types";
import { toast } from "sonner";

export function useWishlist() {
  const { items, toggle, has, clear } = useWishlistStore();

  const handleToggle = (product: Product) => {
    const alreadyIn = has(product.id);
    toggle(product);
    if (alreadyIn) {
      toast.info(`${product.name} removed from wishlist`);
    } else {
      toast.success(`${product.name} added to wishlist`);
    }
  };

  return {
    items,
    toggle: handleToggle,
    has,
    clear,
    count: items.length,
  };
}
