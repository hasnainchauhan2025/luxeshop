import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Heart, LogOut, Package, Save, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const NAV_LINKS = [
  {
    icon: Package,
    label: "My Orders",
    to: "/account/orders",
    desc: "Track and manage orders",
  },
  {
    icon: Heart,
    label: "Wishlist",
    to: "/account/wishlist",
    desc: "Saved items for later",
  },
] as const;

export function AccountPage() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState<ProfileForm>({
    firstName: "",
    lastName: "",
    email: user?.email ?? "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm text-center"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
            <User size={34} className="text-primary" />
          </div>
          <h1 className="font-display text-4xl font-semibold mb-3">
            Welcome Back
          </h1>
          <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
            Sign in with Internet Identity to manage your profile, orders, and
            wishlist.
          </p>
          <Button
            size="lg"
            onClick={login}
            className="w-full text-base font-semibold h-13 rounded-2xl shadow-elevated gap-2"
            data-ocid="account-login-btn"
          >
            Sign In with Internet Identity
          </Button>
        </motion.div>
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate profile save — backend call would go here
    await new Promise((r) => setTimeout(r, 800));
    setIsSaving(false);
    toast.success("Profile updated successfully");
  };

  const handleChange =
    (field: keyof ProfileForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <div className="container max-w-3xl mx-auto px-6 pt-28 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-10"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <User size={26} className="text-primary" />
        </div>
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-semibold">
            {user?.name ?? "My Account"}
          </h1>
          <p
            className="text-xs text-muted-foreground truncate max-w-xs mt-0.5"
            title={user?.principal}
          >
            {user?.principal}
          </p>
        </div>
      </motion.div>

      {/* Quick Nav */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 gap-3 mb-10"
      >
        {NAV_LINKS.map(({ icon: Icon, label, to, desc }) => (
          <Link key={label} to={to}>
            <div
              className="glass-card hover:border-primary/40 cursor-pointer group"
              data-ocid={`account-nav-${label.toLowerCase().replace(/\s/g, "-")}`}
            >
              <Icon
                size={22}
                className="text-primary mb-2 group-hover:scale-110 transition-smooth"
              />
              <h3 className="font-medium text-sm mb-0.5">{label}</h3>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          </Link>
        ))}
      </motion.div>

      <Separator className="mb-10" />

      {/* Profile Form */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="font-display text-xl font-semibold mb-6">
          Profile Details
        </h2>
        <form onSubmit={handleSave} className="space-y-6">
          {/* Name row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="First Name" id="firstName">
              <Input
                id="firstName"
                placeholder="Alex"
                value={form.firstName}
                onChange={handleChange("firstName")}
                data-ocid="profile-first-name"
              />
            </FormField>
            <FormField label="Last Name" id="lastName">
              <Input
                id="lastName"
                placeholder="Morgan"
                value={form.lastName}
                onChange={handleChange("lastName")}
                data-ocid="profile-last-name"
              />
            </FormField>
          </div>

          <FormField label="Email Address" id="email">
            <Input
              id="email"
              type="email"
              placeholder="alex@example.com"
              value={form.email}
              onChange={handleChange("email")}
              data-ocid="profile-email"
            />
          </FormField>

          <Separator />
          <p className="text-sm font-medium text-muted-foreground -mt-2">
            Shipping Address
          </p>

          <FormField label="Street Address" id="street">
            <Input
              id="street"
              placeholder="123 Lakeview Dr"
              value={form.street}
              onChange={handleChange("street")}
              data-ocid="profile-street"
            />
          </FormField>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="col-span-2">
              <FormField label="City" id="city">
                <Input
                  id="city"
                  placeholder="San Francisco"
                  value={form.city}
                  onChange={handleChange("city")}
                  data-ocid="profile-city"
                />
              </FormField>
            </div>
            <FormField label="State" id="state">
              <Input
                id="state"
                placeholder="CA"
                value={form.state}
                onChange={handleChange("state")}
                data-ocid="profile-state"
              />
            </FormField>
            <FormField label="ZIP Code" id="zip">
              <Input
                id="zip"
                placeholder="94102"
                value={form.zip}
                onChange={handleChange("zip")}
                data-ocid="profile-zip"
              />
            </FormField>
          </div>

          <FormField label="Country" id="country">
            <Input
              id="country"
              placeholder="United States"
              value={form.country}
              onChange={handleChange("country")}
              data-ocid="profile-country"
            />
          </FormField>

          <div className="flex items-center gap-3 pt-2">
            <Button
              type="submit"
              size="lg"
              disabled={isSaving}
              className={cn("gap-2 rounded-xl", isSaving && "opacity-80")}
              data-ocid="profile-save-btn"
            >
              <Save size={16} />
              {isSaving ? "Saving…" : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="gap-2 rounded-xl"
              onClick={logout}
              data-ocid="account-logout-btn"
            >
              <LogOut size={16} />
              Sign Out
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function FormField({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      {children}
    </div>
  );
}
