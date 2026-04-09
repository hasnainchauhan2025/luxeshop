import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { SiInstagram, SiPinterest, SiX } from "react-icons/si";

const LINKS = {
  Shop: [
    { label: "All Products", to: "/products" },
    { label: "Accessories", to: "/products" },
    { label: "Apparel", to: "/products" },
    { label: "Beauty", to: "/products" },
    { label: "Home", to: "/products" },
  ],
  Account: [
    { label: "My Account", to: "/account" },
    { label: "Orders", to: "/account/orders" },
    { label: "Wishlist", to: "/account/wishlist" },
    { label: "Cart", to: "/cart" },
  ],
  Company: [
    { label: "About Us", to: "/" },
    { label: "Sustainability", to: "/" },
    { label: "Press", to: "/" },
    { label: "Contact", to: "/" },
  ],
};

const SOCIALS = [
  { Icon: SiInstagram, label: "Instagram", url: "https://instagram.com" },
  { Icon: SiX, label: "X (Twitter)", url: "https://x.com" },
  { Icon: SiPinterest, label: "Pinterest", url: "https://pinterest.com" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer
      className="bg-card border-t border-border/40 mt-auto"
      data-ocid="footer"
    >
      <div className="container max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link
              to="/"
              className="font-display text-2xl font-semibold text-gradient"
            >
              LUXE
            </Link>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-xs">
              Curated objects of enduring quality. Each piece selected for its
              exceptional craftsmanship and timeless design.
            </p>
            <div className="flex gap-4 mt-6">
              {SOCIALS.map(({ Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 glass rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-smooth"
                  aria-label={label}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {items.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-foreground/70 hover:text-primary transition-smooth"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-6 opacity-40" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>
            © {year}. Built with love using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-smooth underline-offset-2 hover:underline"
            >
              caffeine.ai
            </a>
          </span>
          <div className="flex gap-4">
            <a
              href="https://caffeine.ai/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-smooth"
            >
              Privacy Policy
            </a>
            <a
              href="https://caffeine.ai/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-smooth"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
