import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { Heart, Home, Search, ShoppingBag, User } from "lucide-react";

const NAV_ITEMS = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/products", icon: Search, label: "Search" },
  { to: "/cart", icon: ShoppingBag, label: "Cart" },
  { to: "/account/wishlist", icon: Heart, label: "Wishlist" },
  { to: "/account", icon: User, label: "Profile" },
];

export function MobileNav() {
  const location = useLocation();
  const { count } = useCart();
  const { count: wishCount } = useWishlist();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass border-t border-border/40 shadow-elevated"
      data-ocid="mobile-nav"
    >
      <div className="flex items-center justify-around px-2 py-2 pb-safe">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => {
          const active =
            location.pathname === to ||
            (to !== "/" && location.pathname.startsWith(to));
          const badge =
            to === "/cart" ? count : to === "/account/wishlist" ? wishCount : 0;
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-smooth min-w-[52px]",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
              data-ocid={`mobile-nav-${label.toLowerCase()}`}
            >
              <span className="relative">
                <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
                {badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                    {badge > 99 ? "99+" : badge}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
