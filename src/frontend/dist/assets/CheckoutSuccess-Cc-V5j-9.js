import { c as createLucideIcon, j as reactExports, q as jsxRuntimeExports, t as motion, Q as Package, G as ShoppingBag, L as Link, w as Button } from "./index-CgQGP8Uk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode);
const COLORS = [
  "oklch(0.65 0.2 95)",
  "oklch(0.7 0.18 160)",
  "oklch(0.75 0.15 250)",
  "oklch(0.8 0.17 50)",
  "oklch(0.65 0.2 320)"
];
function Confetti() {
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: -20,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * 4 + 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
      scale: Math.random() * 0.8 + 0.4,
      opacity: 1
    }));
    let rafId;
    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.rotation += p.rotationSpeed;
        if (p.y > canvas.height * 0.6) {
          p.opacity = Math.max(0, p.opacity - 0.02);
        }
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.scale(p.scale, p.scale);
        ctx.fillStyle = p.color;
        ctx.fillRect(-6, -4, 12, 8);
        ctx.restore();
      }
      if (frame < 300) {
        rafId = requestAnimationFrame(draw);
      }
    };
    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, []);
  return (
    // biome-ignore lint/a11y/noAriaHiddenOnFocusable: canvas is pointer-events-none, not focusable
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "canvas",
      {
        ref: canvasRef,
        className: "fixed inset-0 pointer-events-none z-50",
        "aria-hidden": "true"
      }
    )
  );
}
const steps = [
  {
    icon: CircleCheck,
    label: "Order Confirmed",
    description: "Your payment was successful"
  },
  {
    icon: Package,
    label: "Processing",
    description: "We're preparing your items"
  },
  {
    icon: ShoppingBag,
    label: "On its Way",
    description: "Estimated delivery in 3–5 days"
  }
];
function CheckoutSuccessPage() {
  const [showConfetti, setShowConfetti] = reactExports.useState(true);
  const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const orderId = searchParams.get("orderId") ?? `ORD-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
  reactExports.useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 4e3);
    return () => clearTimeout(t);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex items-center justify-center px-6 pt-24 pb-16", children: [
    showConfetti && /* @__PURE__ */ jsxRuntimeExports.jsx(Confetti, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { type: "spring", stiffness: 200, damping: 18 },
          className: "mx-auto mb-8 relative",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 h-28 rounded-full glass flex items-center justify-center mx-auto shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { scale: 0 },
                animate: { scale: 1 },
                transition: {
                  delay: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 56, className: "text-primary" })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "absolute inset-0 rounded-full",
                style: { border: "2px solid oklch(0.65 0.2 95 / 0.4)" },
                animate: { scale: [1, 1.4, 1.4], opacity: [1, 0, 0] },
                transition: { repeat: 2, duration: 1.2, delay: 0.5 }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.4, duration: 0.6 },
          className: "mb-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl font-semibold tracking-tight mb-2", children: "Thank You!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground", children: "Your order has been confirmed." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.55 },
          className: "inline-flex items-center gap-2 glass px-5 py-2.5 rounded-2xl mb-10 shadow-soft",
          "data-ocid": "success-order-id",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "Order ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-semibold", children: orderId })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.65 },
          className: "glass-card mb-8 shadow-soft",
          "data-ocid": "success-order-steps",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-5 left-[calc(16.67%+8px)] right-[calc(16.67%+8px)] h-0.5 bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute top-5 h-0.5 bg-primary transition-all duration-1000",
                style: {
                  left: "calc(16.67% + 8px)",
                  width: "calc(33.33% - 8px)"
                }
              }
            ),
            steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = i === 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.7 + i * 0.12 },
                  className: "flex flex-col items-center gap-2 flex-1 relative z-10",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-10 h-10 rounded-full flex items-center justify-center transition-smooth ${isActive ? "bg-primary text-primary-foreground shadow-soft" : "bg-muted text-muted-foreground"}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18 })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: `text-xs font-semibold ${isActive ? "text-foreground" : "text-muted-foreground"}`,
                          children: step.label
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground hidden sm:block", children: step.description })
                    ] })
                  ]
                },
                step.label
              );
            })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.p,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.9 },
          className: "text-muted-foreground text-sm mb-8 px-4",
          children: "A confirmation email will be sent to your inbox. You can track your order status from your account page."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 1 },
          className: "flex flex-col sm:flex-row gap-3 justify-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "lg",
                className: "rounded-2xl px-8 font-semibold transition-smooth w-full sm:w-auto",
                "data-ocid": "success-continue-shopping",
                children: "Continue Shopping"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/account/orders", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "lg",
                variant: "outline",
                className: "rounded-2xl px-8 font-medium transition-smooth w-full sm:w-auto",
                "data-ocid": "success-view-orders",
                children: "View Orders"
              }
            ) })
          ]
        }
      )
    ] })
  ] });
}
export {
  CheckoutSuccessPage
};
