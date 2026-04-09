import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { useAuthStore } from "@/stores/authStore";
import type { Address } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import { CreditCard, Lock, MapPin, ShoppingBag, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const TAX_RATE = 0.1;

async function validateCoupon(
  code: string,
): Promise<{ valid: boolean; discount: number }> {
  await new Promise((r) => setTimeout(r, 600));
  const coupons: Record<string, number> = {
    WELCOME10: 10,
    SAVE20: 20,
    LUXURY15: 15,
  };
  const upper = code.toUpperCase();
  return coupons[upper]
    ? { valid: true, discount: coupons[upper] }
    : { valid: false, discount: 0 };
}

async function createCheckoutSession(_orderData: {
  items: unknown[];
  total: number;
  address: Address;
  coupon?: string;
}): Promise<{ url: string; sessionId: string }> {
  await new Promise((r) => setTimeout(r, 1000));
  // In production, this calls the backend actor createCheckoutSession method
  // For demo, redirect to success page
  return {
    url: `/checkout/success?orderId=ord_${Date.now()}`,
    sessionId: "cs_demo",
  };
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  country: "US",
};

function FormField({
  label,
  id,
  required,
  ...props
}: {
  label: string;
  id: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      <Input
        id={id}
        required={required}
        className="rounded-xl h-11"
        {...props}
      />
    </div>
  );
}

export function CheckoutPage() {
  const { items, total, clear } = useCart();
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>(initialForm);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Pre-fill from user profile
  useEffect(() => {
    if (isAuthenticated && user) {
      const nameParts = (user.name ?? "").split(" ");
      setForm((f) => ({
        ...f,
        firstName: nameParts[0] ?? "",
        lastName: nameParts.slice(1).join(" "),
        email: user.email ?? "",
      }));
    }
  }, [isAuthenticated, user]);

  const subtotal = total;
  const discountAmount =
    couponDiscount > 0 ? (subtotal * couponDiscount) / 100 : 0;
  const afterDiscount = subtotal - discountAmount;
  const tax = afterDiscount * TAX_RATE;
  const orderTotal = afterDiscount + tax;

  const updateField =
    (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleCoupon = async () => {
    if (!couponCode.trim() || couponApplied) return;
    setCouponLoading(true);
    const result = await validateCoupon(couponCode.trim());
    setCouponLoading(false);
    if (result.valid) {
      setCouponDiscount(result.discount);
      setCouponApplied(true);
      toast.success(`Coupon applied — ${result.discount}% off!`);
    } else {
      toast.error("Invalid or expired coupon code.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    setSubmitting(true);

    const address: Address = {
      name: `${form.firstName} ${form.lastName}`,
      line1: form.street,
      city: form.city,
      state: form.state,
      postalCode: form.zip,
      country: form.country,
    };

    try {
      const session = await createCheckoutSession({
        items,
        total: orderTotal,
        address,
        coupon: couponApplied ? couponCode : undefined,
      });

      // If a real Stripe URL, redirect there; otherwise navigate to success page
      if (session.url.startsWith("http")) {
        window.location.href = session.url;
      } else {
        clear();
        navigate({ to: session.url as "/checkout/success" });
      }
    } catch {
      toast.error("Failed to process checkout. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container max-w-lg mx-auto px-6 pt-32 pb-16 text-center">
        <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4" />
        <h1 className="font-display text-3xl font-semibold mb-3">
          Cart is empty
        </h1>
        <p className="text-muted-foreground mb-6">
          Add items before checking out.
        </p>
        <Link to="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="font-display text-5xl font-semibold tracking-tight mb-1">
            Checkout
          </h1>
          <p className="text-muted-foreground">Complete your order securely</p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Left — form */}
            <div className="flex-1 min-w-0 space-y-8">
              {/* Shipping address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-card space-y-5 shadow-soft"
                data-ocid="checkout-shipping"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={18} className="text-primary" />
                  <h2 className="font-display text-xl font-semibold">
                    Shipping Address
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="First Name"
                    id="firstName"
                    value={form.firstName}
                    onChange={updateField("firstName")}
                    required
                    placeholder="Alex"
                    data-ocid="checkout-firstname"
                  />
                  <FormField
                    label="Last Name"
                    id="lastName"
                    value={form.lastName}
                    onChange={updateField("lastName")}
                    required
                    placeholder="Morgan"
                    data-ocid="checkout-lastname"
                  />
                </div>
                <FormField
                  label="Email"
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={updateField("email")}
                  required
                  placeholder="alex@example.com"
                  data-ocid="checkout-email"
                />
                <FormField
                  label="Street Address"
                  id="street"
                  value={form.street}
                  onChange={updateField("street")}
                  required
                  placeholder="123 Lakeview Drive"
                  data-ocid="checkout-street"
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <FormField
                      label="City"
                      id="city"
                      value={form.city}
                      onChange={updateField("city")}
                      required
                      placeholder="San Francisco"
                      data-ocid="checkout-city"
                    />
                  </div>
                  <FormField
                    label="State"
                    id="state"
                    value={form.state}
                    onChange={updateField("state")}
                    required
                    placeholder="CA"
                    data-ocid="checkout-state"
                  />
                  <FormField
                    label="ZIP Code"
                    id="zip"
                    value={form.zip}
                    onChange={updateField("zip")}
                    required
                    placeholder="94102"
                    data-ocid="checkout-zip"
                  />
                </div>
                <FormField
                  label="Country"
                  id="country"
                  value={form.country}
                  onChange={updateField("country")}
                  required
                  placeholder="US"
                  data-ocid="checkout-country"
                />
              </motion.div>

              {/* Payment */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card space-y-4 shadow-soft"
                data-ocid="checkout-payment"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard size={18} className="text-primary" />
                  <h2 className="font-display text-xl font-semibold">
                    Payment
                  </h2>
                </div>
                <div className="rounded-2xl border border-border p-4 bg-muted/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CreditCard size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      Stripe Secure Checkout
                    </p>
                    <p className="text-xs text-muted-foreground">
                      You'll be redirected to Stripe's hosted payment page
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                    <Lock size={12} />
                    Encrypted
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {[
                    "Visa",
                    "Mastercard",
                    "Amex",
                    "Apple Pay",
                    "Google Pay",
                  ].map((card) => (
                    <Badge
                      key={card}
                      variant="secondary"
                      className="rounded-lg text-xs"
                    >
                      {card}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right — order summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="w-full lg:w-96 lg:sticky lg:top-28"
              data-ocid="checkout-summary"
            >
              <div className="glass-card space-y-5 shadow-elevated">
                <h2 className="font-display text-xl font-semibold">
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center gap-3"
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={
                            item.product.images[0] ??
                            "/assets/images/placeholder.svg"
                          }
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty {item.quantity}
                          {item.selectedColor ? ` · ${item.selectedColor}` : ""}
                          {item.selectedSize ? ` · ${item.selectedSize}` : ""}
                        </p>
                      </div>
                      <span className="text-sm font-medium tabular-nums flex-shrink-0">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator className="opacity-50" />

                {/* Coupon */}
                <div className="flex gap-2" data-ocid="checkout-coupon">
                  <div className="relative flex-1">
                    <Tag
                      size={13}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleCoupon()}
                      className="pl-8 rounded-xl h-10 text-sm"
                      disabled={couponApplied}
                      data-ocid="checkout-coupon-input"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-xl px-3 h-10 transition-smooth"
                    onClick={handleCoupon}
                    disabled={
                      couponLoading || couponApplied || !couponCode.trim()
                    }
                    data-ocid="checkout-coupon-apply"
                  >
                    {couponLoading ? (
                      <span className="w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    ) : couponApplied ? (
                      "✓"
                    ) : (
                      "Apply"
                    )}
                  </Button>
                </div>

                {/* Pricing breakdown */}
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="tabular-nums">${subtotal.toFixed(2)}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-between text-primary font-medium"
                    >
                      <span>Discount ({couponDiscount}%)</span>
                      <span className="tabular-nums">
                        -${discountAmount.toFixed(2)}
                      </span>
                    </motion.div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="tabular-nums">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-primary font-medium">
                      {subtotal >= 100 ? "Free" : "$9.99"}
                    </span>
                  </div>
                </div>

                <Separator className="opacity-50" />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="tabular-nums">${orderTotal.toFixed(2)}</span>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-2xl font-semibold transition-smooth shadow-soft gap-2"
                  disabled={submitting}
                  data-ocid="checkout-place-order"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                      Processing…
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      Place Order · ${orderTotal.toFixed(2)}
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                  <Lock size={11} />
                  Secured by Stripe · SSL encrypted
                </p>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}
