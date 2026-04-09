import { useCartStore } from "@/stores/cartStore";
import type { Product } from "@/types";
import { toast } from "sonner";

export function useCart() {
  const { items, addItem, removeItem, updateQty, clear, total, count } =
    useCartStore();

  const handleAddItem = (
    product: Product,
    quantity = 1,
    color?: string,
    size?: string,
  ) => {
    addItem(product, quantity, color, size);
    toast.success(`${product.name} added to cart`, {
      description: `${quantity} × $${product.price}`,
    });
  };

  const handleRemoveItem = (productId: string, productName?: string) => {
    removeItem(productId);
    if (productName) {
      toast.info(`${productName} removed from cart`);
    }
  };

  return {
    items,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    updateQty,
    clear,
    total: total(),
    count: count(),
    isEmpty: items.length === 0,
  };
}
