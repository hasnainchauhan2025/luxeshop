import type { Product, WishlistItem } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
  items: WishlistItem[];
  toggle: (product: Product) => void;
  has: (productId: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggle: (product) => {
        const exists = get().has(product.id);
        if (exists) {
          set((state) => ({
            items: state.items.filter((i) => i.productId !== product.id),
          }));
        } else {
          set((state) => ({
            items: [
              ...state.items,
              { productId: product.id, product, addedAt: Date.now() },
            ],
          }));
        }
      },

      has: (productId) => get().items.some((i) => i.productId === productId),

      clear: () => set({ items: [] }),
    }),
    { name: "wishlist-store" },
  ),
);
