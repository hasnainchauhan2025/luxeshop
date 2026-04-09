import type { CartItem, Product } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
  items: CartItem[];
  addItem: (
    product: Product,
    quantity?: number,
    color?: string,
    size?: string,
  ) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, quantity: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity, color, size) => {
        const qty = quantity != null ? quantity : 1;
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.productId === product.id &&
              i.selectedColor === color &&
              i.selectedSize === size,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === product.id &&
                i.selectedColor === color &&
                i.selectedSize === size
                  ? { ...i, quantity: i.quantity + qty }
                  : i,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                product,
                quantity: qty,
                selectedColor: color,
                selectedSize: size,
              },
            ],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },

      updateQty: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i,
          ),
        }));
      },

      clear: () => set({ items: [] }),

      total: () =>
        get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0,
        ),

      count: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: "cart-store" },
  ),
);
