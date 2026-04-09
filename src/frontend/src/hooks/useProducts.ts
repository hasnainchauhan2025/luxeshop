import { createActor } from "@/backend";
import type { ProductInput } from "@/backend";
import type { Product } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Mock products for development (backend.d.ts has empty interface)
const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Obsidian Watch",
    description:
      "A precision-crafted timepiece with a sapphire crystal face and midnight matte finish. Water resistant to 200m.",
    price: 849,
    comparePrice: 1200,
    images: ["/assets/generated/product-watch.dim_600x600.jpg"],
    category: "Accessories",
    stock: 12,
    rating: 4.9,
    reviewCount: 142,
    tags: ["luxury", "watch", "accessories"],
    featured: true,
    colors: ["Midnight Black", "Brushed Silver", "Rose Gold"],
  },
  {
    id: "p2",
    name: "Lumière Fragrance",
    description:
      "An artisanal eau de parfum blending bergamot, vetiver, and sandalwood. 50ml hand-blown glass flacon.",
    price: 320,
    images: ["/assets/generated/product-fragrance.dim_600x600.jpg"],
    category: "Beauty",
    stock: 28,
    rating: 4.8,
    reviewCount: 89,
    tags: ["fragrance", "luxury", "beauty"],
    featured: true,
  },
  {
    id: "p3",
    name: "Carbon Fiber Wallet",
    description:
      "Ultra-thin RFID-blocking wallet crafted from aerospace-grade carbon fiber. Holds 12 cards.",
    price: 195,
    comparePrice: 250,
    images: ["/assets/generated/product-wallet.dim_600x600.jpg"],
    category: "Accessories",
    stock: 45,
    rating: 4.7,
    reviewCount: 203,
    tags: ["wallet", "carbon fiber", "minimalist"],
    featured: true,
    colors: ["Carbon Black", "Silver Weave"],
  },
  {
    id: "p4",
    name: "Merino Crewneck",
    description:
      "Superfine 18.5 micron merino wool crewneck. Naturally temperature-regulating, machine washable.",
    price: 285,
    images: ["/assets/generated/product-sweater.dim_600x600.jpg"],
    category: "Apparel",
    stock: 33,
    rating: 4.6,
    reviewCount: 67,
    tags: ["apparel", "merino", "knitwear"],
    featured: false,
    colors: ["Cloud White", "Slate Grey", "Forest Green"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "p5",
    name: "Leather Attaché",
    description:
      'Hand-stitched full-grain leather briefcase with solid brass hardware. Fits 15" laptop.',
    price: 1150,
    comparePrice: 1400,
    images: ["/assets/generated/product-bag.dim_600x600.jpg"],
    category: "Bags",
    stock: 8,
    rating: 4.9,
    reviewCount: 54,
    tags: ["leather", "bag", "briefcase"],
    featured: true,
    colors: ["Cognac", "Dark Brown", "Jet Black"],
  },
  {
    id: "p6",
    name: "Ceramic Pour-Over",
    description:
      "Handthrown stoneware pour-over kit with walnut stand. Each piece is one-of-a-kind.",
    price: 175,
    images: ["/assets/generated/product-ceramic.dim_600x600.jpg"],
    category: "Home",
    stock: 20,
    rating: 4.8,
    reviewCount: 31,
    tags: ["ceramic", "coffee", "home"],
    featured: false,
    colors: ["Ash White", "Charcoal", "Terracotta"],
  },
];

export function useProducts(category?: string) {
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: async () =>
      category
        ? MOCK_PRODUCTS.filter((p) => p.category === category)
        : MOCK_PRODUCTS,
    staleTime: 1000 * 60 * 5,
  });
}

export function useFeaturedProducts() {
  return useQuery<Product[]>({
    queryKey: ["products", "featured"],
    queryFn: async () => MOCK_PRODUCTS.filter((p) => p.featured),
    staleTime: 1000 * 60 * 5,
  });
}

export function useProduct(id: string) {
  return useQuery<Product | null>({
    queryKey: ["product", id],
    queryFn: async () => MOCK_PRODUCTS.find((p) => p.id === id) ?? null,
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAddProduct() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (
      product: Omit<Product, "id" | "rating" | "reviewCount">,
    ) => {
      if (!actor) throw new Error("Not connected");
      const input: ProductInput = {
        name: product.name,
        description: product.description,
        price: BigInt(Math.round(product.price * 100)),
        category: product.category,
        featured: product.featured ?? false,
        colors: product.colors ?? [],
        sizes: product.sizes ?? [],
        stockByVariant: [["default", BigInt(product.stock ?? 0)]],
        images: [],
      };
      return actor.createProduct(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (args: { id: string; updates: Partial<Product> }) => {
      if (!actor) throw new Error("Not connected");
      const existing = MOCK_PRODUCTS.find((p) => p.id === args.id);
      const merged = { ...existing, ...args.updates } as Product;
      const input: ProductInput = {
        name: merged.name,
        description: merged.description ?? "",
        price: BigInt(Math.round((merged.price ?? 0) * 100)),
        category: merged.category ?? "",
        featured: merged.featured ?? false,
        colors: merged.colors ?? [],
        sizes: merged.sizes ?? [],
        stockByVariant: [["default", BigInt(merged.stock ?? 0)]],
        images: [],
      };
      return actor.updateProduct(BigInt(args.id), input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProduct(BigInt(id));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}
