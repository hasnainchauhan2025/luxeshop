import { c as createLucideIcon, A as useCart, E as useAuthStore, P as useNavigate, j as reactExports, q as jsxRuntimeExports, G as ShoppingBag, L as Link, w as Button, t as motion, B as Badge, O as Separator, N as ue } from "./index-CgQGP8Uk.js";
import { I as Input } from "./input-CUkXXFPT.js";
import { L as Label } from "./label-B0XqX961.js";
import { M as MapPin } from "./map-pin-B6NaJa-E.js";
import { C as CreditCard } from "./credit-card-7TO_u_xR.js";
import { T as Tag } from "./tag-CCKU9AT5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
const TAX_RATE = 0.1;
async function validateCoupon(code) {
  await new Promise((r) => setTimeout(r, 600));
  const coupons = {
    WELCOME10: 10,
    SAVE20: 20,
    LUXURY15: 15
  };
  const upper = code.toUpperCase();
  return coupons[upper] ? { valid: true, discount: coupons[upper] } : { valid: false, discount: 0 };
}
async function createCheckoutSession(_orderData) {
  await new Promise((r) => setTimeout(r, 1e3));
  return {
    url: `/checkout/success?orderId=ord_${Date.now()}`,
    sessionId: "cs_demo"
  };
}
const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  country: "US"
};
function FormField({
  label,
  id,
  required,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: id, className: "text-sm font-medium", children: [
      label,
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-0.5", children: "*" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        id,
        required,
        className: "rounded-xl h-11",
        ...props
      }
    )
  ] });
}
function CheckoutPage() {
  const { items, total, clear } = useCart();
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = reactExports.useState(initialForm);
  const [couponCode, setCouponCode] = reactExports.useState("");
  const [couponDiscount, setCouponDiscount] = reactExports.useState(0);
  const [couponApplied, setCouponApplied] = reactExports.useState(false);
  const [couponLoading, setCouponLoading] = reactExports.useState(false);
  const [submitting, setSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (isAuthenticated && user) {
      const nameParts = (user.name ?? "").split(" ");
      setForm((f) => ({
        ...f,
        firstName: nameParts[0] ?? "",
        lastName: nameParts.slice(1).join(" "),
        email: user.email ?? ""
      }));
    }
  }, [isAuthenticated, user]);
  const subtotal = total;
  const discountAmount = couponDiscount > 0 ? subtotal * couponDiscount / 100 : 0;
  const afterDiscount = subtotal - discountAmount;
  const tax = afterDiscount * TAX_RATE;
  const orderTotal = afterDiscount + tax;
  const updateField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const handleCoupon = async () => {
    if (!couponCode.trim() || couponApplied) return;
    setCouponLoading(true);
    const result = await validateCoupon(couponCode.trim());
    setCouponLoading(false);
    if (result.valid) {
      setCouponDiscount(result.discount);
      setCouponApplied(true);
      ue.success(`Coupon applied — ${result.discount}% off!`);
    } else {
      ue.error("Invalid or expired coupon code.");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      ue.error("Your cart is empty.");
      return;
    }
    setSubmitting(true);
    const address = {
      name: `${form.firstName} ${form.lastName}`,
      line1: form.street,
      city: form.city,
      state: form.state,
      postalCode: form.zip,
      country: form.country
    };
    try {
      const session = await createCheckoutSession({
        items,
        total: orderTotal,
        address,
        coupon: couponApplied ? couponCode : void 0
      });
      if (session.url.startsWith("http")) {
        window.location.href = session.url;
      } else {
        clear();
        navigate({ to: session.url });
      }
    } catch {
      ue.error("Failed to process checkout. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-lg mx-auto px-6 pt-32 pb-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 48, className: "mx-auto text-muted-foreground mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold mb-3", children: "Cart is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Add items before checking out." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Browse Products" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-7xl mx-auto px-6 pt-32 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "mb-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl font-semibold tracking-tight mb-1", children: "Checkout" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Complete your order securely" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-10 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.1 },
            className: "glass-card space-y-5 shadow-soft",
            "data-ocid": "checkout-shipping",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 18, className: "text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Shipping Address" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FormField,
                  {
                    label: "First Name",
                    id: "firstName",
                    value: form.firstName,
                    onChange: updateField("firstName"),
                    required: true,
                    placeholder: "Alex",
                    "data-ocid": "checkout-firstname"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FormField,
                  {
                    label: "Last Name",
                    id: "lastName",
                    value: form.lastName,
                    onChange: updateField("lastName"),
                    required: true,
                    placeholder: "Morgan",
                    "data-ocid": "checkout-lastname"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FormField,
                {
                  label: "Email",
                  id: "email",
                  type: "email",
                  value: form.email,
                  onChange: updateField("email"),
                  required: true,
                  placeholder: "alex@example.com",
                  "data-ocid": "checkout-email"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FormField,
                {
                  label: "Street Address",
                  id: "street",
                  value: form.street,
                  onChange: updateField("street"),
                  required: true,
                  placeholder: "123 Lakeview Drive",
                  "data-ocid": "checkout-street"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FormField,
                  {
                    label: "City",
                    id: "city",
                    value: form.city,
                    onChange: updateField("city"),
                    required: true,
                    placeholder: "San Francisco",
                    "data-ocid": "checkout-city"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FormField,
                  {
                    label: "State",
                    id: "state",
                    value: form.state,
                    onChange: updateField("state"),
                    required: true,
                    placeholder: "CA",
                    "data-ocid": "checkout-state"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FormField,
                  {
                    label: "ZIP Code",
                    id: "zip",
                    value: form.zip,
                    onChange: updateField("zip"),
                    required: true,
                    placeholder: "94102",
                    "data-ocid": "checkout-zip"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FormField,
                {
                  label: "Country",
                  id: "country",
                  value: form.country,
                  onChange: updateField("country"),
                  required: true,
                  placeholder: "US",
                  "data-ocid": "checkout-country"
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
            transition: { duration: 0.5, delay: 0.2 },
            className: "glass-card space-y-4 shadow-soft",
            "data-ocid": "checkout-payment",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 18, className: "text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Payment" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border p-4 bg-muted/30 flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 20, className: "text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: "Stripe Secure Checkout" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "You'll be redirected to Stripe's hosted payment page" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-1 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 12 }),
                  "Encrypted"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: [
                "Visa",
                "Mastercard",
                "Amex",
                "Apple Pay",
                "Google Pay"
              ].map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "rounded-lg text-xs",
                  children: card
                },
                card
              )) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 30 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: 0.25 },
          className: "w-full lg:w-96 lg:sticky lg:top-28",
          "data-ocid": "checkout-summary",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card space-y-5 shadow-elevated", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Order Summary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-64 overflow-y-auto pr-1", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl overflow-hidden flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: item.product.images[0] ?? "/assets/images/placeholder.svg",
                      alt: item.product.name,
                      className: "w-full h-full object-cover"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: item.product.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "Qty ",
                      item.quantity,
                      item.selectedColor ? ` · ${item.selectedColor}` : "",
                      item.selectedSize ? ` · ${item.selectedSize}` : ""
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium tabular-nums flex-shrink-0", children: [
                    "$",
                    (item.product.price * item.quantity).toFixed(2)
                  ] })
                ]
              },
              item.productId
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "opacity-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", "data-ocid": "checkout-coupon", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Tag,
                  {
                    size: 13,
                    className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Coupon code",
                    value: couponCode,
                    onChange: (e) => setCouponCode(e.target.value),
                    onKeyDown: (e) => e.key === "Enter" && handleCoupon(),
                    className: "pl-8 rounded-xl h-10 text-sm",
                    disabled: couponApplied,
                    "data-ocid": "checkout-coupon-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  className: "rounded-xl px-3 h-10 transition-smooth",
                  onClick: handleCoupon,
                  disabled: couponLoading || couponApplied || !couponCode.trim(),
                  "data-ocid": "checkout-coupon-apply",
                  children: couponLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin" }) : couponApplied ? "✓" : "Apply"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", children: [
                  "$",
                  subtotal.toFixed(2)
                ] })
              ] }),
              couponDiscount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: -8 },
                  animate: { opacity: 1, y: 0 },
                  className: "flex justify-between text-primary font-medium",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Discount (",
                      couponDiscount,
                      "%)"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", children: [
                      "-$",
                      discountAmount.toFixed(2)
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Tax (10%)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", children: [
                  "$",
                  tax.toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Shipping" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: subtotal >= 100 ? "Free" : "$9.99" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "opacity-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-lg font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", children: [
                "$",
                orderTotal.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                size: "lg",
                className: "w-full rounded-2xl font-semibold transition-smooth shadow-soft gap-2",
                disabled: submitting,
                "data-ocid": "checkout-place-order",
                children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" }),
                  "Processing…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 16 }),
                  "Place Order · $",
                  orderTotal.toFixed(2)
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-center text-muted-foreground flex items-center justify-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 11 }),
              "Secured by Stripe · SSL encrypted"
            ] })
          ] })
        }
      )
    ] }) })
  ] }) });
}
export {
  CheckoutPage
};
