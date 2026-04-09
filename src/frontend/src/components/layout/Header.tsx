import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  Heart,
  LogOut,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Shop", to: "/products" },
  { label: "New Arrivals", to: "/products" },
  { label: "Collections", to: "/products" },
  { label: "About", to: "/#brand-story" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { count } = useCart();
  const { count: wishCount } = useWishlist();
  const { user, isAuthenticated, isAdmin, login, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 100);
  }, [searchOpen]);

  const handleCartClick = () => navigate({ to: "/cart" });

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-background/70 backdrop-blur-xl border-b border-border/30 shadow-elevated py-2"
            : "bg-transparent py-4",
        )}
        data-ocid="header"
      >
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              to="/"
              className="font-display text-xl md:text-2xl font-semibold text-gradient shrink-0"
              data-ocid="header-logo"
            >
              LUXE
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="text-sm font-medium text-foreground/70 hover:text-primary transition-smooth"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Search toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Search"
                data-ocid="header-search-btn"
              >
                <Search size={18} />
              </Button>

              <ThemeToggle />

              {/* Wishlist */}
              <Link to="/account/wishlist" data-ocid="header-wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 relative"
                  aria-label="Wishlist"
                >
                  <Heart size={18} />
                  {wishCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[9px] rounded-full">
                      {wishCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 relative"
                onClick={handleCartClick}
                aria-label="Cart"
                data-ocid="header-cart-btn"
              >
                <ShoppingBag size={18} />
                {count > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[9px] rounded-full bg-primary text-primary-foreground">
                    {count}
                  </Badge>
                )}
              </Button>

              {/* User menu */}
              <div
                className="relative hidden md:block"
                data-ocid="header-user-menu"
              >
                {isAuthenticated ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 h-9"
                    onClick={() => setUserMenuOpen((v) => !v)}
                    aria-label="User menu"
                    aria-expanded={userMenuOpen}
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <User size={12} />
                    </div>
                    <span className="text-xs max-w-[80px] truncate">
                      {user?.name ?? user?.principal?.slice(0, 6) ?? "Account"}
                    </span>
                    <ChevronDown size={12} />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="h-9"
                    onClick={login}
                    data-ocid="header-login-btn"
                  >
                    Sign In
                  </Button>
                )}

                <AnimatePresence>
                  {userMenuOpen && isAuthenticated && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 glass-card !p-1 shadow-elevated rounded-xl z-50"
                    >
                      {[
                        { icon: User, label: "Profile", to: "/account" },
                        {
                          icon: Package,
                          label: "My Orders",
                          to: "/account/orders",
                        },
                        {
                          icon: Heart,
                          label: "Wishlist",
                          to: "/account/wishlist",
                        },
                        ...(isAdmin
                          ? [{ icon: Settings, label: "Admin", to: "/admin" }]
                          : []),
                      ].map(({ icon: Icon, label, to }) => (
                        <Link
                          key={label}
                          to={to}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm hover:bg-muted/50 transition-smooth"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Icon size={14} className="text-muted-foreground" />
                          {label}
                        </Link>
                      ))}
                      <button
                        type="button"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm hover:bg-destructive/10 hover:text-destructive transition-smooth w-full text-left mt-1"
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                      >
                        <LogOut size={14} className="text-muted-foreground" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile hamburger */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 md:hidden"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Menu"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-border/30 bg-background/80 backdrop-blur-xl"
            >
              <div className="container max-w-3xl mx-auto px-6 py-3">
                <div className="flex items-center gap-3">
                  <Search
                    size={16}
                    className="text-muted-foreground shrink-0"
                  />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search products..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const term = (
                          e.target as HTMLInputElement
                        ).value.trim();
                        navigate({
                          to: "/products",
                          search: term ? { search: term } : undefined,
                        });
                        setSearchOpen(false);
                      }
                      if (e.key === "Escape") setSearchOpen(false);
                    }}
                    data-ocid="header-search-input"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0"
                    onClick={() => setSearchOpen(false)}
                  >
                    <X size={14} />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden pt-20 px-6"
          >
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="text-xl font-display font-medium py-3 border-b border-border/30 hover:text-primary transition-smooth"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <div className="pt-4">
                {isAuthenticated ? (
                  <button
                    type="button"
                    className="flex items-center gap-2 text-destructive/80 hover:text-destructive transition-smooth py-2"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => {
                      login();
                      setMobileOpen(false);
                    }}
                  >
                    Sign In with Internet Identity
                  </Button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
