import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQty, total, count, isEmpty } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate({ to: "/checkout" });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-background border-l border-border/40 shadow-elevated z-50 flex flex-col"
            aria-label="Shopping cart"
            data-ocid="cart-drawer"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/30">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} />
                <h2 className="font-display text-lg font-semibold">
                  Your Cart
                </h2>
                {count > 0 && (
                  <span className="text-xs text-muted-foreground">
                    ({count} items)
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onClose}
                aria-label="Close cart"
              >
                <X size={16} />
              </Button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {isEmpty ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <ShoppingBag size={24} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Your cart is empty</p>
                    <p className="text-sm text-muted-foreground">
                      Start adding products you love
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      navigate({ to: "/products" });
                      onClose();
                    }}
                  >
                    Browse Products
                  </Button>
                </div>
              ) : (
                <ul className="space-y-4" data-ocid="cart-items-list">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={`${item.productId}-${item.selectedColor}-${item.selectedSize}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-3"
                        data-ocid="cart-item"
                      >
                        <Link
                          to="/products/$id"
                          params={{ id: item.productId }}
                          onClick={onClose}
                        >
                          <img
                            src={
                              item.product.images[0] ??
                              "/assets/images/placeholder.svg"
                            }
                            alt={item.product.name}
                            className="w-20 h-20 rounded-xl object-cover bg-muted shrink-0"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <Link
                                to="/products/$id"
                                params={{ id: item.productId }}
                                onClick={onClose}
                              >
                                <p className="text-sm font-medium truncate hover:text-primary transition-smooth">
                                  {item.product.name}
                                </p>
                              </Link>
                              {(item.selectedColor || item.selectedSize) && (
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {[item.selectedColor, item.selectedSize]
                                    .filter(Boolean)
                                    .join(" · ")}
                                </p>
                              )}
                            </div>
                            <button
                              type="button"
                              className="text-muted-foreground hover:text-destructive transition-smooth shrink-0"
                              onClick={() =>
                                removeItem(item.productId, item.product.name)
                              }
                              aria-label="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1 glass rounded-lg p-1">
                              <button
                                type="button"
                                className="w-6 h-6 flex items-center justify-center rounded hover:bg-muted/60 transition-smooth"
                                onClick={() =>
                                  updateQty(item.productId, item.quantity - 1)
                                }
                                aria-label="Decrease quantity"
                                data-ocid="cart-qty-decrease"
                              >
                                <Minus size={11} />
                              </button>
                              <span
                                className="w-6 text-center text-sm font-medium"
                                data-ocid="cart-qty-value"
                              >
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                className="w-6 h-6 flex items-center justify-center rounded hover:bg-muted/60 transition-smooth"
                                onClick={() =>
                                  updateQty(item.productId, item.quantity + 1)
                                }
                                aria-label="Increase quantity"
                                data-ocid="cart-qty-increase"
                              >
                                <Plus size={11} />
                              </button>
                            </div>
                            <p className="text-sm font-semibold">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {!isEmpty && (
              <div className="px-6 py-5 border-t border-border/30 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-primary">Free</span>
                  </div>
                  <Separator className="opacity-40" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  className="w-full gap-2 h-12 text-sm"
                  onClick={handleCheckout}
                  data-ocid="cart-checkout-btn"
                >
                  Checkout
                  <ArrowRight size={16} />
                </Button>
                <button
                  type="button"
                  className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-smooth"
                  onClick={onClose}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// Hook for convenience
export function useCartDrawer() {
  const [open, setOpen] = useState(false);
  return {
    open,
    openCart: () => setOpen(true),
    closeCart: () => setOpen(false),
  };
}
