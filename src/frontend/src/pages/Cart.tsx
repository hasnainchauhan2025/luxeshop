import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Tag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const TAX_RATE = 0.1;

// Mock coupon validation — replace with real backend call when available
async function validateCoupon(
  code: string,
): Promise<{ valid: boolean; discount: number; message: string }> {
  await new Promise((r) => setTimeout(r, 600));
  const coupons: Record<string, number> = {
    WELCOME10: 10,
    SAVE20: 20,
    LUXURY15: 15,
  };
  const upper = code.toUpperCase();
  if (coupons[upper]) {
    return {
      valid: true,
      discount: coupons[upper],
      message: `${coupons[upper]}% off applied!`,
    };
  }
  return {
    valid: false,
    discount: 0,
    message: "Invalid or expired coupon code.",
  };
}

function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6"
      data-ocid="cart-empty-state"
    >
      <div className="relative mb-8">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
            ease: "easeInOut",
          }}
          className="w-28 h-28 rounded-3xl glass flex items-center justify-center shadow-elevated"
        >
          <ShoppingBag size={52} className="text-primary" />
        </motion.div>
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        />
      </div>
      <h2 className="font-display text-4xl font-semibold mb-3 tracking-tight">
        Your cart is empty
      </h2>
      <p className="text-muted-foreground text-lg mb-8 max-w-sm">
        Discover our curated collection of premium products and add something
        you love.
      </p>
      <Link to="/products">
        <Button
          size="lg"
          className="rounded-2xl px-8 font-medium transition-smooth"
          data-ocid="cart-start-shopping"
        >
          Start Shopping
        </Button>
      </Link>
    </motion.div>
  );
}

interface CartItemRowProps {
  item: {
    productId: string;
    product: {
      name: string;
      price: number;
      images: string[];
      colors?: string[];
      sizes?: string[];
    };
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
  };
  onRemove: (id: string, name?: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
}

function CartItemRow({ item, onRemove, onUpdateQty }: CartItemRowProps) {
  const subtotal = item.product.price * item.quantity;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card flex gap-4 items-center group"
      data-ocid="cart-item-row"
    >
      {/* Image */}
      <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-soft">
        <img
          src={item.product.images[0] ?? "/assets/images/placeholder.svg"}
          alt={item.product.name}
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-base truncate">{item.product.name}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {item.selectedColor && (
            <Badge variant="secondary" className="text-xs rounded-lg">
              {item.selectedColor}
            </Badge>
          )}
          {item.selectedSize && (
            <Badge variant="secondary" className="text-xs rounded-lg">
              {item.selectedSize}
            </Badge>
          )}
          <span className="text-sm text-muted-foreground">
            ${item.product.price.toFixed(2)} each
          </span>
        </div>
      </div>

      {/* Qty selector */}
      <div
        className="flex items-center gap-2 flex-shrink-0"
        data-ocid="cart-qty-selector"
      >
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-xl transition-smooth"
          onClick={() => onUpdateQty(item.productId, item.quantity - 1)}
          aria-label="Decrease quantity"
        >
          <Minus size={14} />
        </Button>
        <span className="w-8 text-center font-medium text-sm tabular-nums">
          {item.quantity}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-xl transition-smooth"
          onClick={() => onUpdateQty(item.productId, item.quantity + 1)}
          aria-label="Increase quantity"
        >
          <Plus size={14} />
        </Button>
      </div>

      {/* Subtotal */}
      <p className="font-semibold text-base w-20 text-right tabular-nums flex-shrink-0">
        ${subtotal.toFixed(2)}
      </p>

      {/* Remove */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-xl text-muted-foreground hover:text-destructive transition-smooth flex-shrink-0"
        onClick={() => onRemove(item.productId, item.product.name)}
        aria-label={`Remove ${item.product.name}`}
        data-ocid="cart-item-remove"
      >
        <X size={16} />
      </Button>
    </motion.div>
  );
}

interface CouponInputProps {
  onApply: (discount: number, code: string) => void;
}

function CouponInput({ onApply }: CouponInputProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleApply = async () => {
    if (!code.trim()) return;
    setLoading(true);
    const result = await validateCoupon(code.trim());
    setLoading(false);
    if (result.valid) {
      setApplied(true);
      onApply(result.discount, code.toUpperCase());
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="flex gap-2" data-ocid="cart-coupon">
      <div className="relative flex-1">
        <Tag
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder="Enter coupon code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleApply()}
          className="pl-8 rounded-xl"
          disabled={applied}
          data-ocid="cart-coupon-input"
        />
      </div>
      <Button
        variant="outline"
        className="rounded-xl px-4 transition-smooth"
        onClick={handleApply}
        disabled={loading || applied || !code.trim()}
        data-ocid="cart-coupon-apply"
      >
        {loading ? (
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            Applying
          </span>
        ) : applied ? (
          "Applied ✓"
        ) : (
          "Apply"
        )}
      </Button>
    </div>
  );
}

export function CartPage() {
  const { items, removeItem, updateQty, total, isEmpty, count } = useCart();
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");

  const subtotal = total;
  const discountAmount =
    couponDiscount > 0 ? (subtotal * couponDiscount) / 100 : 0;
  const afterDiscount = subtotal - discountAmount;
  const tax = afterDiscount * TAX_RATE;
  const orderTotal = afterDiscount + tax;

  if (isEmpty) return <EmptyCart />;

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-baseline gap-4 mb-10"
        >
          <h1 className="font-display text-5xl font-semibold tracking-tight">
            Your Cart
          </h1>
          <Badge variant="secondary" className="text-base rounded-xl px-3 py-1">
            {count} {count === 1 ? "item" : "items"}
          </Badge>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Cart items */}
          <div className="flex-1 min-w-0 space-y-3" data-ocid="cart-items-list">
            <AnimatePresence mode="popLayout">
              {items.map((item, idx) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: idx * 0.05,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <CartItemRow
                    item={item}
                    onRemove={removeItem}
                    onUpdateQty={updateQty}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Clear cart */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-end pt-2"
            >
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive gap-2 rounded-xl"
                onClick={() => {
                  for (const item of items) {
                    removeItem(item.productId);
                  }
                  toast.info("Cart cleared");
                }}
                data-ocid="cart-clear"
              >
                <Trash2 size={14} />
                Clear cart
              </Button>
            </motion.div>
          </div>

          {/* Order summary sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-96 lg:sticky lg:top-28"
            data-ocid="cart-summary"
          >
            <div className="glass-card space-y-5 shadow-elevated">
              <h2 className="font-display text-xl font-semibold">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium tabular-nums">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                {couponDiscount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex justify-between text-primary"
                  >
                    <span>
                      Coupon ({couponCode}) -{couponDiscount}%
                    </span>
                    <span className="font-medium tabular-nums">
                      -${discountAmount.toFixed(2)}
                    </span>
                  </motion.div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Estimated tax (10%)
                  </span>
                  <span className="font-medium tabular-nums">
                    ${tax.toFixed(2)}
                  </span>
                </div>
              </div>

              <Separator className="opacity-50" />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="tabular-nums">${orderTotal.toFixed(2)}</span>
              </div>

              <CouponInput
                onApply={(discount, code) => {
                  setCouponDiscount(discount);
                  setCouponCode(code);
                }}
              />

              <Link to="/checkout">
                <Button
                  size="lg"
                  className="w-full rounded-2xl font-semibold transition-smooth shadow-soft"
                  data-ocid="cart-checkout-cta"
                >
                  <motion.span
                    className="flex items-center gap-2"
                    whileHover={{ gap: "12px" }}
                    transition={{ duration: 0.2 }}
                  >
                    Proceed to Checkout
                    <span>→</span>
                  </motion.span>
                </Button>
              </Link>

              <p className="text-xs text-center text-muted-foreground">
                Free shipping on orders over $100
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
