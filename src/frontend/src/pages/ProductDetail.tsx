import { ProductCard } from "@/components/ui/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/hooks/useCart";
import { useProduct, useProducts } from "@/hooks/useProducts";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import type { Product, Review } from "@/types";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Link, useParams } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  ZoomIn,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import type { Mesh } from "three";

// ──────────────────────────────────────────────
// Sample fallback product
// ──────────────────────────────────────────────
const FALLBACK_PRODUCT: Product = {
  id: "p1",
  name: "Obsidian Watch",
  description:
    "A precision-crafted timepiece with a sapphire crystal face and midnight matte finish. Every detail is engineered for longevity — from the 316L stainless steel case to the hand-stitched Italian leather strap. Water resistant to 200m.",
  price: 849,
  comparePrice: 1200,
  images: [
    "/assets/generated/product-watch.dim_600x600.jpg",
    "/assets/generated/product-fragrance.dim_600x600.jpg",
    "/assets/generated/product-wallet.dim_600x600.jpg",
  ],
  category: "Accessories",
  stock: 12,
  rating: 4.9,
  reviewCount: 142,
  tags: ["luxury", "watch", "accessories"],
  featured: true,
  colors: ["Midnight Black", "Brushed Silver", "Rose Gold"],
  sizes: [],
};

const SAMPLE_REVIEWS: Review[] = [
  {
    id: "r1",
    productId: "p1",
    userId: "u1",
    userName: "Marcus L.",
    rating: 5,
    title: "Absolutely flawless craftsmanship",
    body: "Received mine two weeks ago and I can't stop looking at it. The weight feels premium, the sapphire crystal is crystal-clear, and the strap is butter-smooth leather.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14,
    verified: true,
  },
  {
    id: "r2",
    productId: "p1",
    userId: "u2",
    userName: "Sophie K.",
    rating: 5,
    title: "Worth every penny",
    body: "Gifted this to my husband and he absolutely loves it. Packaging was stunning too — felt like a real luxury unboxing experience.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30,
    verified: true,
  },
  {
    id: "r3",
    productId: "p1",
    userId: "u3",
    userName: "Daniel R.",
    rating: 4,
    title: "Exceptional quality, minor notes",
    body: "The dial is stunning in all lighting conditions. Only slight feedback: the clasp takes a little getting used to. Still 5 stars in my heart.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 45,
    verified: false,
  },
];

// ──────────────────────────────────────────────
// 3-D Product Model
// ──────────────────────────────────────────────
const COLOR_HEX: Record<string, string> = {
  "Midnight Black": "#1a1a2e",
  "Brushed Silver": "#c0c0d0",
  "Rose Gold": "#b76e79",
  "Carbon Black": "#232323",
  "Silver Weave": "#aab0bc",
  "Cloud White": "#f0f0f0",
  "Slate Grey": "#64748b",
  "Forest Green": "#2d6a4f",
  Cognac: "#9b5c2a",
  "Dark Brown": "#5c3a1e",
  "Jet Black": "#0d0d0d",
  "Ash White": "#f5f0e8",
  Charcoal: "#3d3d3d",
  Terracotta: "#c0613a",
};

function ProductModel({ color }: { color: string }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  const hexColor = COLOR_HEX[color] ?? "#3b82f6";

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <torusGeometry args={[1, 0.38, 32, 64]} />
      <meshStandardMaterial
        color={hexColor}
        metalness={0.85}
        roughness={0.15}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

function ThreeDScene({ color }: { color: string }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.8} castShadow />
      <directionalLight
        position={[-3, -2, -3]}
        intensity={0.4}
        color="#8b9eff"
      />
      <Environment preset="city" />
      <ProductModel color={color} />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
      />
    </>
  );
}

// ──────────────────────────────────────────────
// Star Rating
// ──────────────────────────────────────────────
function StarRating({
  rating,
  size = 14,
  interactive = false,
  onRate,
}: {
  rating: number;
  size?: number;
  interactive?: boolean;
  onRate?: (r: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          disabled={!interactive}
          className={cn("transition-colors", interactive && "cursor-pointer")}
          onClick={() => onRate?.(s)}
          onMouseEnter={() => interactive && setHovered(s)}
          onMouseLeave={() => interactive && setHovered(0)}
          aria-label={`Rate ${s} star${s > 1 ? "s" : ""}`}
        >
          <Star
            size={size}
            className={cn(
              (hovered || rating) >= s
                ? "text-amber-400 fill-amber-400"
                : "text-muted-foreground",
            )}
          />
        </button>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────
// Breadcrumb
// ──────────────────────────────────────────────
function Breadcrumb({ name, category }: { name: string; category: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap"
    >
      <Link to="/" className="hover:text-foreground transition-colors">
        Home
      </Link>
      <ChevronRight size={14} className="opacity-50 shrink-0" />
      <Link to="/products" className="hover:text-foreground transition-colors">
        Products
      </Link>
      <ChevronRight size={14} className="opacity-50 shrink-0" />
      <span className="text-muted-foreground/70">{category}</span>
      <ChevronRight size={14} className="opacity-50 shrink-0" />
      <span className="text-foreground font-medium truncate max-w-[160px]">
        {name}
      </span>
    </nav>
  );
}

// ──────────────────────────────────────────────
// Image Gallery
// ──────────────────────────────────────────────
function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const active = images[activeIdx] ?? "/assets/images/placeholder.svg";

  return (
    <div className="flex flex-col gap-3">
      {/* Main image — use a button for proper a11y */}
      <button
        type="button"
        className="relative aspect-square rounded-2xl overflow-hidden bg-card border border-border/30 w-full"
        onClick={() => setZoomed((z) => !z)}
        aria-label={zoomed ? "Click to zoom out" : "Click to zoom in"}
        data-ocid="product-image-main"
        style={{ cursor: zoomed ? "zoom-out" : "zoom-in" }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={active}
            alt={`${name} view ${activeIdx + 1}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: zoomed ? 1.3 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="w-full h-full object-cover select-none"
            loading="eager"
          />
        </AnimatePresence>
        <div className="absolute top-3 right-3 glass rounded-full p-1.5 pointer-events-none">
          <ZoomIn size={14} className="text-muted-foreground" />
        </div>
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 glass rounded-full px-2 py-1 text-xs text-muted-foreground pointer-events-none">
            {activeIdx + 1} / {images.length}
          </div>
        )}
      </button>

      {/* Thumbnails — use stable image URL as key */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={cn(
                "shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-smooth",
                i === activeIdx
                  ? "border-primary shadow-soft"
                  : "border-border/30 hover:border-border opacity-60 hover:opacity-100",
              )}
              aria-label={`View image ${i + 1}`}
              data-ocid={`product-thumb-${i}`}
            >
              <img
                src={img}
                alt={`${name} thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// 3-D Viewer Panel
// ──────────────────────────────────────────────
function ThreeDViewer({ color }: { color: string }) {
  return (
    <div
      className="aspect-square rounded-2xl overflow-hidden bg-card border border-border/30 relative"
      data-ocid="product-3d-viewer"
    >
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-card">
            <Skeleton className="w-40 h-40 rounded-full" />
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 3.5], fov: 45 }}
          shadows
          gl={{ antialias: true, alpha: true }}
        >
          <ThreeDScene color={color} />
        </Canvas>
      </Suspense>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
        <span className="glass text-xs text-muted-foreground px-3 py-1 rounded-full">
          Drag to rotate · Scroll to zoom
        </span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Review Card
// ──────────────────────────────────────────────
function ReviewCard({ review, index }: { review: Review; index: number }) {
  const date = new Date(review.createdAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="glass-card"
      data-ocid="review-card"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{review.userName}</span>
            {review.verified && (
              <Badge
                variant="outline"
                className="text-[10px] text-emerald-400 border-emerald-400/30 py-0"
              >
                Verified
              </Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        <StarRating rating={review.rating} size={12} />
      </div>
      {review.title && (
        <p className="font-semibold text-sm mb-1">{review.title}</p>
      )}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {review.body}
      </p>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// Review Form
// ──────────────────────────────────────────────
function ReviewForm({ productId: _productId }: { productId: string }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card text-center py-8"
      >
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
          <Check size={22} className="text-emerald-400" />
        </div>
        <p className="font-semibold">Review submitted!</p>
        <p className="text-sm text-muted-foreground mt-1">
          Thank you for sharing your experience.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card space-y-4"
      data-ocid="review-form"
    >
      <h4 className="font-display font-semibold text-base">Write a Review</h4>
      <fieldset>
        <legend className="text-sm text-muted-foreground mb-2">
          Your Rating
        </legend>
        <StarRating rating={rating} size={22} interactive onRate={setRating} />
      </fieldset>
      <div>
        <label
          htmlFor="review-comment"
          className="text-sm text-muted-foreground mb-1 block"
        >
          Your Experience
        </label>
        <Textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share what you love (or don't) about this product…"
          rows={4}
          className="resize-none bg-background/60"
          data-ocid="review-comment"
        />
      </div>
      <Button
        type="submit"
        disabled={rating === 0}
        className="w-full sm:w-auto"
        data-ocid="review-submit"
      >
        Submit Review
      </Button>
    </form>
  );
}

// ──────────────────────────────────────────────
// Related Products Carousel
// ──────────────────────────────────────────────
function RelatedCarousel({
  products,
  currentId,
}: {
  products: Product[];
  currentId: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateNav = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateNav);
    updateNav();
  }, [emblaApi, updateNav]);

  const related = products.filter((p) => p.id !== currentId).slice(0, 6);
  if (related.length === 0) return null;

  return (
    <div className="relative">
      <div
        className="overflow-hidden"
        ref={emblaRef}
        data-ocid="related-carousel"
      >
        <div className="flex gap-4">
          {related.map((product, i) => (
            <div key={product.id} className="flex-none w-[260px] sm:w-[280px]">
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          aria-label="Scroll left"
          className="rounded-full"
          data-ocid="carousel-prev"
        >
          <ChevronLeft size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          aria-label="Scroll right"
          className="rounded-full"
          data-ocid="carousel-next"
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Color Swatches map
// ──────────────────────────────────────────────
const SWATCH_COLORS: Record<string, string> = {
  "Midnight Black": "bg-neutral-900 border-neutral-700",
  "Brushed Silver": "bg-slate-300 border-slate-400",
  "Rose Gold": "bg-rose-300 border-rose-400",
  "Carbon Black": "bg-neutral-900 border-neutral-700",
  "Silver Weave": "bg-slate-300 border-slate-400",
  "Cloud White": "bg-zinc-100 border-zinc-300",
  "Slate Grey": "bg-slate-500 border-slate-600",
  "Forest Green": "bg-emerald-700 border-emerald-800",
  Cognac: "bg-amber-700 border-amber-800",
  "Dark Brown": "bg-stone-700 border-stone-800",
  "Jet Black": "bg-neutral-950 border-neutral-800",
  "Ash White": "bg-zinc-100 border-zinc-300",
  Charcoal: "bg-zinc-700 border-zinc-800",
  Terracotta: "bg-orange-600 border-orange-700",
};

// ──────────────────────────────────────────────
// Main Page Export
// ──────────────────────────────────────────────
export function ProductDetailPage() {
  const { id } = useParams({ from: "/products/$id" });
  const { data: product, isLoading } = useProduct(id);
  const { data: allProducts = [] } = useProducts();
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const resolved = product ?? (isLoading ? null : FALLBACK_PRODUCT);

  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [viewMode, setViewMode] = useState<"gallery" | "3d">("gallery");
  const [addedToCart, setAddedToCart] = useState(false);

  // Sync color/size when product loads
  const resolvedId = resolved?.id;
  const resolvedFirstColor = resolved?.colors?.[0];
  const resolvedFirstSize = resolved?.sizes?.[0];
  useEffect(() => {
    if (!resolvedId) return;
    setSelectedColor(resolvedFirstColor);
    setSelectedSize(resolvedFirstSize);
  }, [resolvedId, resolvedFirstColor, resolvedFirstSize]);

  const wishlisted = resolved ? has(resolved.id) : false;

  const handleAddToCart = () => {
    if (!resolved) return;
    addItem(resolved, quantity, selectedColor, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2200);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-9 w-9 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!resolved) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <p className="text-2xl font-display mb-4">Product not found</p>
        <Link to="/products">
          <Button>Browse all products</Button>
        </Link>
      </div>
    );
  }

  const discount = resolved.comparePrice
    ? Math.round(
        ((resolved.comparePrice - resolved.price) / resolved.comparePrice) *
          100,
      )
    : null;

  const stockLabel =
    resolved.stock > 10
      ? { text: "In Stock", cls: "text-emerald-400" }
      : resolved.stock > 0
        ? { text: `Only ${resolved.stock} left`, cls: "text-amber-400" }
        : { text: "Out of Stock", cls: "text-destructive" };

  const activeColor = selectedColor ?? resolved.colors?.[0] ?? "slate";

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb */}
        <Breadcrumb name={resolved.name} category={resolved.category} />

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* ── Left: Visual column ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* View toggle */}
            <div className="flex gap-2 mb-4">
              <Button
                variant={viewMode === "gallery" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("gallery")}
                className="rounded-full text-xs"
                data-ocid="toggle-gallery"
              >
                Gallery
              </Button>
              <Button
                variant={viewMode === "3d" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("3d")}
                className="rounded-full text-xs"
                data-ocid="toggle-3d"
              >
                3D Viewer
              </Button>
            </div>

            <AnimatePresence mode="wait">
              {viewMode === "gallery" ? (
                <motion.div
                  key="gallery"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ImageGallery images={resolved.images} name={resolved.name} />
                </motion.div>
              ) : (
                <motion.div
                  key="3d"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ThreeDViewer color={activeColor} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Right: Info column ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col gap-5"
          >
            {/* Category + Stock */}
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-xs font-medium">
                {resolved.category}
              </Badge>
              <span className={cn("text-xs font-medium", stockLabel.cls)}>
                {stockLabel.text}
              </span>
            </div>

            {/* Product name */}
            <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
              {resolved.name}
            </h1>

            {/* Rating row */}
            <div className="flex items-center gap-3 flex-wrap">
              <StarRating rating={Math.round(resolved.rating)} size={16} />
              <span className="text-sm text-muted-foreground">
                {resolved.rating.toFixed(1)} · {resolved.reviewCount} reviews
              </span>
              <a
                href="#reviews"
                className="text-xs text-primary hover:underline"
                data-ocid="scroll-to-reviews"
              >
                See reviews
              </a>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="font-display text-3xl font-bold">
                ${resolved.price}
              </span>
              {resolved.comparePrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${resolved.comparePrice}
                </span>
              )}
              {discount && (
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                  Save {discount}%
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed text-sm">
              {resolved.description}
            </p>

            {/* Color selector */}
            {resolved.colors && resolved.colors.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">
                  Color:{" "}
                  <span className="text-muted-foreground font-normal">
                    {selectedColor}
                  </span>
                </p>
                <div
                  className="flex gap-2 flex-wrap"
                  data-ocid="color-selector"
                >
                  {resolved.colors.map((color) => {
                    const swatchClass =
                      SWATCH_COLORS[color] ?? "bg-primary/70 border-primary";
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "w-8 h-8 rounded-full border-2 transition-smooth",
                          swatchClass,
                          selectedColor === color
                            ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                            : "hover:scale-105",
                        )}
                        aria-label={`Select color ${color}`}
                        aria-pressed={selectedColor === color}
                        data-ocid={`color-swatch-${color.replace(/\s+/g, "-").toLowerCase()}`}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size selector */}
            {resolved.sizes && resolved.sizes.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Size</p>
                <div className="flex gap-2 flex-wrap" data-ocid="size-selector">
                  {resolved.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "min-w-[3rem] h-10 px-3 rounded-lg border text-sm font-medium transition-smooth",
                        selectedSize === size
                          ? "bg-primary text-primary-foreground border-primary shadow-soft"
                          : "border-border hover:border-primary/60 bg-card",
                      )}
                      aria-pressed={selectedSize === size}
                      data-ocid={`size-btn-${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity selector */}
            <div>
              <p className="text-sm font-medium mb-2">Quantity</p>
              <div
                className="flex items-center gap-3"
                data-ocid="quantity-selector"
              >
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-smooth"
                  aria-label="Decrease quantity"
                  data-ocid="qty-minus"
                >
                  <Minus size={14} />
                </button>
                <span
                  className="w-10 text-center font-semibold text-lg tabular-nums"
                  aria-live="polite"
                  data-ocid="qty-display"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.min(resolved.stock, q + 1))
                  }
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-smooth"
                  aria-label="Increase quantity"
                  data-ocid="qty-plus"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTA row */}
            <div className="flex gap-3 pt-2">
              <motion.div className="flex-1" whileTap={{ scale: 0.97 }}>
                <Button
                  className={cn(
                    "w-full h-12 text-base font-semibold gap-2 transition-all duration-300 text-white border-transparent",
                    addedToCart
                      ? "bg-emerald-500 hover:bg-emerald-500"
                      : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400",
                  )}
                  onClick={handleAddToCart}
                  disabled={resolved.stock === 0}
                  data-ocid="add-to-cart-btn"
                  aria-label="Add to cart"
                >
                  <AnimatePresence mode="wait">
                    {addedToCart ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Check size={18} />
                        Added to Cart!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingBag size={18} />
                        Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={() => toggle(resolved)}
                className={cn(
                  "w-12 h-12 rounded-xl border flex items-center justify-center transition-smooth",
                  wishlisted
                    ? "bg-red-500/10 border-red-500/40 text-red-400"
                    : "border-border hover:border-red-400/50 text-muted-foreground hover:text-red-400",
                )}
                aria-label={
                  wishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
                data-ocid="wishlist-btn"
              >
                <Heart
                  size={18}
                  fill={wishlisted ? "currentColor" : "none"}
                  className="transition-smooth"
                />
              </motion.button>
            </div>

            {/* Tags */}
            {resolved.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {resolved.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs capitalize"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* ── Reviews section ── */}
        <section id="reviews" className="mt-20 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-2xl font-bold mb-2">
              Customer Reviews
            </h2>
            <div className="flex items-center gap-4 mb-8">
              <div className="text-5xl font-display font-bold">
                {resolved.rating.toFixed(1)}
              </div>
              <div>
                <StarRating rating={Math.round(resolved.rating)} size={20} />
                <p className="text-sm text-muted-foreground mt-1">
                  Based on {resolved.reviewCount} reviews
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
            {SAMPLE_REVIEWS.map((review, i) => (
              <ReviewCard key={review.id} review={review} index={i} />
            ))}
          </div>

          {isAuthenticated ? (
            <ReviewForm productId={resolved.id} />
          ) : (
            <div
              className="glass-card text-center py-8"
              data-ocid="review-auth-cta"
            >
              <p className="text-muted-foreground text-sm">
                <Link
                  to="/account"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>{" "}
                to leave a review
              </p>
            </div>
          )}
        </section>

        {/* ── Related Products ── */}
        {allProducts.length > 1 && (
          <section className="mt-20 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h2 className="font-display text-2xl font-bold">
                You Might Also Like
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Curated picks from the same collection
              </p>
            </motion.div>
            <RelatedCarousel products={allProducts} currentId={resolved.id} />
          </section>
        )}
      </div>
    </div>
  );
}
