import { SkeletonCard } from "@/components/ui/LoadingSpinner";
import { ProductCard } from "@/components/ui/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFeaturedProducts } from "@/hooks/useProducts";
import type { Review } from "@/types";
import {
  Environment,
  MeshDistortMaterial,
  OrbitControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Link } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Award,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { Suspense, useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

// ─── Static Data ────────────────────────────────────────────────────────────

const REVIEWS: Review[] = [
  {
    id: "r1",
    productId: "p1",
    userId: "u1",
    userName: "Alexandra Voss",
    rating: 5,
    title: "Absolutely exquisite craftsmanship",
    body: "The Obsidian Watch arrived in a stunning presentation box. Every detail speaks to decades of horological expertise. I've received more compliments wearing this than anything else in my collection.",
    createdAt: Date.now() - 86400000 * 7,
    verified: true,
  },
  {
    id: "r2",
    productId: "p5",
    userId: "u2",
    userName: "Marcus Chen",
    rating: 5,
    title: "Worth every penny",
    body: "The leather attaché is the finest bag I've ever owned. The full-grain leather develops a gorgeous patina and the solid brass hardware feels indestructible. A true investment piece.",
    createdAt: Date.now() - 86400000 * 14,
    verified: true,
  },
  {
    id: "r3",
    productId: "p2",
    userId: "u3",
    userName: "Isabelle Fontaine",
    rating: 5,
    title: "A scent that stops time",
    body: "Lumière is unlike anything I've experienced. The bergamot opens fresh and bright, then settles into the most intimate sandalwood base. The hand-blown flacon is a work of art in itself.",
    createdAt: Date.now() - 86400000 * 21,
    verified: true,
  },
  {
    id: "r4",
    productId: "p3",
    userId: "u4",
    userName: "James Whitfield",
    rating: 4,
    title: "Minimalist perfection",
    body: "The carbon fiber wallet eliminated all the bulk from my pocket. RFID blocking works great, the carbon weave is stunning up close, and 12 cards fit perfectly. Highly recommended.",
    createdAt: Date.now() - 86400000 * 30,
    verified: true,
  },
  {
    id: "r5",
    productId: "p4",
    userId: "u5",
    userName: "Naomi Reyes",
    rating: 5,
    title: "Luxuriously soft and timeless",
    body: "The Merino Crewneck is incredibly soft against skin — no itching whatsoever. It's become my go-to for everything from board meetings to weekend getaways. Machine washable is a bonus.",
    createdAt: Date.now() - 86400000 * 45,
    verified: true,
  },
];

const CATEGORIES = [
  { label: "Electronics", icon: "⚡", color: "oklch(0.55 0.18 240 / 0.15)" },
  { label: "Fashion", icon: "✦", color: "oklch(0.55 0.16 330 / 0.15)" },
  { label: "Accessories", icon: "◈", color: "oklch(0.55 0.18 95 / 0.15)" },
  { label: "Home", icon: "◇", color: "oklch(0.55 0.15 160 / 0.15)" },
  { label: "Beauty", icon: "✿", color: "oklch(0.55 0.18 0 / 0.15)" },
];

const BRAND_VALUES = [
  {
    icon: ShieldCheck,
    title: "Craftsmanship",
    description:
      "Every item is handpicked from ateliers with generational expertise. We refuse to compromise on the details that matter.",
    year: "2018",
  },
  {
    icon: Award,
    title: "Quality",
    description:
      "Materials tested to outlast trends. Full-grain leather, sapphire crystal, merino wool — the best ingredients for lasting elegance.",
    year: "2020",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "Timeless aesthetics meet modern engineering. Carbon fiber wallets, precision movements, and sustainable luxury for a new era.",
    year: "2022",
  },
  {
    icon: Sparkles,
    title: "Curation",
    description:
      "Our edit is intentional. Every product earns its place through rigorous testing, blind comparisons, and artisan certification.",
    year: "2024",
  },
];

// ─── 3D Product Orb ─────────────────────────────────────────────────────────

function ProductOrb() {
  const meshRef = useRef<{ geometry: unknown } | null>(null);
  return (
    <mesh ref={meshRef as React.Ref<never>} castShadow>
      <icosahedronGeometry args={[1.6, 4]} />
      <MeshDistortMaterial
        color="#1a9e72"
        roughness={0.05}
        metalness={0.95}
        distort={0.3}
        speed={1.5}
        envMapIntensity={2}
      />
    </mesh>
  );
}

function ProductShowcase3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={2} color="#a0ffda" />
      <pointLight position={[-4, -2, 2]} intensity={1.5} color="#7c5cfc" />
      <Suspense fallback={null}>
        <ProductOrb />
        <Environment preset="night" />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={1.4}
        enableDamping
        dampingFactor={0.05}
      />
    </Canvas>
  );
}

// ─── THREE namespace shim (used in ProductOrb ref type) ────────────────────
// (removed — using React.Ref<never> instead)

// ─── Particle Hero Background ───────────────────────────────────────────────

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let w = canvas.width;
    let h = canvas.height;
    let raf: number;

    interface Particle {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      opacity: number;
      color: string;
    }

    const colors = [
      "oklch(0.65 0.2 95)",
      "oklch(0.55 0.18 180)",
      "oklch(0.6 0.15 240)",
    ];
    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.6 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }
    draw();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      w = canvas.width;
      h = canvas.height;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    // biome-ignore lint/a11y/noAriaHiddenOnFocusable: decorative canvas element
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────

function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    const words = el.querySelectorAll(".hero-word");
    gsap.fromTo(
      words,
      { opacity: 0, y: 40, rotateX: -30 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.3,
      },
    );
  }, []);

  const scrollToFeatured = () => {
    document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Background image with parallax */}
      <motion.div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <img
          src="/assets/generated/hero-luxury-bg.dim_1920x1080.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
      </motion.div>

      {/* Floating particles */}
      <ParticleCanvas />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Badge
            variant="outline"
            className="glass border-primary/40 text-primary px-4 py-1 text-xs tracking-widest uppercase"
          >
            ✦ Curated Luxury
          </Badge>
        </motion.div>

        <div
          ref={headlineRef}
          className="mb-6"
          style={{ transformStyle: "preserve-3d" }}
        >
          {["Discover", "Luxury", "Redefined"].map((word) => (
            <span
              key={word}
              className="hero-word inline-block opacity-0 font-display font-black text-[clamp(3.5rem,10vw,8rem)] leading-none tracking-tight"
              style={{ marginRight: word !== "Redefined" ? "0.3em" : 0 }}
            >
              {word === "Luxury" ? (
                <span className="text-gradient">{word}</span>
              ) : (
                word
              )}
            </span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Meticulously sourced. Endlessly refined. Objects designed to outlast
          every trend and earn their place in your story.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <Link to="/products">
            <Button
              size="lg"
              className="glass border border-primary/40 bg-primary/10 text-foreground hover:bg-primary hover:text-primary-foreground px-8 py-4 text-sm tracking-wide font-semibold transition-smooth shadow-elevated group"
              data-ocid="hero-shop-cta"
            >
              <Sparkles
                size={16}
                className="mr-2 group-hover:rotate-12 transition-smooth"
              />
              Shop the Collection
            </Button>
          </Link>
          <button
            type="button"
            onClick={scrollToFeatured}
            className="text-muted-foreground hover:text-foreground text-sm tracking-wide transition-smooth flex items-center gap-2"
            data-ocid="hero-explore-btn"
          >
            Explore below
            <ArrowRight size={14} />
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll chevron */}
      <motion.button
        type="button"
        onClick={scrollToFeatured}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-muted-foreground hover:text-primary transition-smooth"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        aria-label="Scroll down"
        data-ocid="hero-scroll-chevron"
      >
        <ChevronDown size={28} strokeWidth={1.5} />
      </motion.button>
    </section>
  );
}

// ─── Featured Products ───────────────────────────────────────────────────────

function FeaturedSection() {
  const { data: products, isLoading } = useFeaturedProducts();

  return (
    <section
      id="featured"
      className="py-24 px-6 max-w-7xl mx-auto"
      data-ocid="featured-section"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-14 text-center"
      >
        <Badge
          variant="outline"
          className="glass border-primary/30 text-primary mb-4 text-xs tracking-widest uppercase px-3 py-1"
        >
          Handpicked
        </Badge>
        <h2 className="font-display font-black text-[clamp(2.2rem,5vw,4rem)] leading-tight mb-4">
          Featured Products
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto text-base leading-relaxed">
          Each piece curated for those who recognise the difference between
          ownership and possession.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
        {isLoading
          ? (["s-watch", "s-frag", "s-wallet", "s-bag"] as const).map((k) => (
              <SkeletonCard key={k} />
            ))
          : (products ?? []).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 text-center"
      >
        <Link to="/products">
          <Button
            variant="outline"
            className="glass border-border/60 px-8 gap-2 group"
            data-ocid="featured-view-all"
          >
            View All Products
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-smooth"
            />
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}

// ─── 3D Product Showcase ─────────────────────────────────────────────────────

function ShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const textX = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ background: "oklch(0.14 0.01 40)" }}
      data-ocid="showcase-section"
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div style={{ x: textX }} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge
              variant="outline"
              className="glass border-primary/30 text-primary mb-4 text-xs tracking-widest uppercase px-3 py-1"
            >
              Interactive
            </Badge>
            <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.8rem)] leading-tight mb-6">
              Explore in
              <br />
              <span className="text-gradient">Three Dimensions</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-sm">
              Drag to rotate. Discover every facet of our craftsmanship before
              it arrives at your door. Luxury deserves to be seen from every
              angle.
            </p>
            <Link to="/products">
              <Button
                size="lg"
                className="glass border-primary/40 bg-primary/10 hover:bg-primary hover:text-primary-foreground gap-2 group transition-smooth"
                data-ocid="showcase-cta"
              >
                Shop Now
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-smooth"
                />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-[400px] md:h-[520px] rounded-2xl overflow-hidden"
          style={{ background: "oklch(0.11 0.02 240 / 0.5)" }}
          data-ocid="showcase-3d-viewer"
        >
          <ProductShowcase3D />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground glass px-3 py-1.5 rounded-full pointer-events-none">
            ✦ Drag to rotate
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Product Categories ──────────────────────────────────────────────────────

function CategoriesSection() {
  return (
    <section className="py-24 px-6" data-ocid="categories-section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-tight mb-3">
            Shop by Category
          </h2>
          <p className="text-muted-foreground">
            Explore our curated departments
          </p>
        </motion.div>

        {/* Horizontal scroll on mobile */}
        <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:overflow-visible scrollbar-hide">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="shrink-0 w-36 md:w-auto"
            >
              <Link to="/products" search={{ category: cat.label }}>
                <div
                  className="glass-card flex flex-col items-center gap-3 cursor-pointer hover:-translate-y-2 transition-smooth hover:shadow-elevated text-center group"
                  style={{ background: cat.color }}
                  data-ocid={`category-${cat.label.toLowerCase()}`}
                >
                  <span className="text-3xl group-hover:scale-110 transition-smooth inline-block">
                    {cat.icon}
                  </span>
                  <span className="font-semibold text-sm">{cat.label}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Reviews Carousel ────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={14}
          className={
            s <= rating ? "fill-primary text-primary" : "text-muted-foreground"
          }
        />
      ))}
    </div>
  );
}

function ReviewsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    // Manual autoplay
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(interval);
    };
  }, [emblaApi]);

  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "oklch(0.13 0.02 50)" }}
      data-ocid="reviews-section"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <Badge
            variant="outline"
            className="glass border-primary/30 text-primary mb-4 text-xs tracking-widest uppercase px-3 py-1"
          >
            5-Star Stories
          </Badge>
          <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-tight">
            What our clients say
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-5">
              {REVIEWS.map((review) => (
                <div
                  key={review.id}
                  className="glass-card min-w-[min(360px,85vw)] flex flex-col gap-4"
                  data-ocid="review-card"
                >
                  <StarRating rating={review.rating} />
                  <h3 className="font-display font-bold text-lg leading-snug">
                    "{review.title}"
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {review.body}
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-border/20">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{
                        background: "oklch(0.5 0.18 95 / 0.2)",
                        color: "oklch(0.65 0.2 95)",
                      }}
                    >
                      {review.userName[0]}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">
                        {review.userName}
                      </div>
                      {review.verified && (
                        <div className="text-xs text-primary flex items-center gap-1">
                          <ShieldCheck size={10} /> Verified Purchase
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots navigation */}
          <div
            className="flex justify-center gap-2 mt-8"
            role="tablist"
            aria-label="Review slides"
          >
            {REVIEWS.map((review, i) => (
              <button
                key={review.id}
                type="button"
                role="tab"
                aria-selected={i === selectedIndex}
                aria-label={`Go to review ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className="transition-smooth"
                data-ocid={`review-dot-${i}`}
              >
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: i === selectedIndex ? "24px" : "8px",
                    height: "8px",
                    background:
                      i === selectedIndex
                        ? "oklch(0.65 0.2 95)"
                        : "oklch(0.4 0 0)",
                  }}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Brand Story Section ─────────────────────────────────────────────────────

function BrandStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".brand-line",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 bg-background"
      data-ocid="brand-story-section"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <Badge
            variant="outline"
            className="glass border-primary/30 text-primary mb-4 text-xs tracking-widest uppercase px-3 py-1"
          >
            Our Philosophy
          </Badge>
          <h2 className="font-display font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-tight">
            Built on principles,
            <br />
            <span className="text-gradient">not trends</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -ml-px hidden sm:block"
            style={{ background: "oklch(0.3 0.02 50)" }}
          >
            <div
              className="brand-line absolute inset-0 w-full"
              style={{
                background: "oklch(0.65 0.2 95)",
                transformOrigin: "top",
              }}
            />
          </div>

          <div className="space-y-10">
            {BRAND_VALUES.map((value, i) => {
              const Icon = value.icon;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start gap-6 sm:gap-10 ${
                    !isLeft ? "sm:flex-row-reverse" : ""
                  }`}
                  data-ocid={`brand-value-${value.title.toLowerCase()}`}
                >
                  {/* Dot on timeline */}
                  <div
                    className="absolute left-6 md:left-1/2 -ml-3 mt-1 hidden sm:flex w-6 h-6 rounded-full items-center justify-center z-10"
                    style={{
                      background: "oklch(0.65 0.2 95 / 0.2)",
                      border: "2px solid oklch(0.65 0.2 95)",
                    }}
                  />

                  {/* Card */}
                  <div
                    className={`glass-card flex gap-4 items-start w-full sm:w-[calc(50%-2rem)] ${
                      !isLeft ? "sm:ml-auto" : "sm:mr-auto"
                    }`}
                  >
                    <div
                      className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "oklch(0.65 0.2 95 / 0.15)" }}
                    >
                      <Icon size={18} style={{ color: "oklch(0.65 0.2 95)" }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display font-bold text-lg">
                          {value.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className="text-[10px] border-border/40 text-muted-foreground"
                        >
                          {value.year}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ──────────────────────────────────────────────────────────────

function CtaBanner() {
  return (
    <section
      className="py-20 px-6 relative overflow-hidden"
      data-ocid="cta-banner"
    >
      <div
        className="max-w-3xl mx-auto glass-card text-center"
        style={{ background: "oklch(0.16 0.04 95 / 0.5)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-4xl mb-4">✦</div>
          <h2 className="font-display font-black text-[clamp(1.8rem,4vw,3rem)] leading-tight mb-4">
            Begin your collection
          </h2>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
            Free shipping on orders over $500. Returns accepted within 30 days.
            Lifetime warranty on select pieces.
          </p>
          <Link to="/products">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 gap-2 shadow-elevated group"
              data-ocid="cta-banner-btn"
            >
              Shop Now
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-smooth"
              />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Home Page ───────────────────────────────────────────────────────────────

export function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedSection />
      <ShowcaseSection />
      <CategoriesSection />
      <ReviewsSection />
      <BrandStorySection />
      <CtaBanner />
    </main>
  );
}
