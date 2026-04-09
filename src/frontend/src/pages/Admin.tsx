import { AdminStats } from "@/components/admin/AdminStats";
import { CouponsTable } from "@/components/admin/CouponsTable";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { ProductForm } from "@/components/admin/ProductForm";
import { UsersTable } from "@/components/admin/UsersTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteProduct, useProducts } from "@/hooks/useProducts";
import { useAuthStore } from "@/stores/authStore";
import type { Product } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  LayoutDashboard,
  Menu,
  Package,
  Plus,
  Settings,
  ShoppingBag,
  Tag,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type AdminTab = "overview" | "products" | "orders" | "users" | "coupons";

const TABS: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={16} /> },
  { id: "products", label: "Products", icon: <Package size={16} /> },
  { id: "orders", label: "Orders", icon: <ShoppingBag size={16} /> },
  { id: "users", label: "Users", icon: <Users size={16} /> },
  { id: "coupons", label: "Coupons", icon: <Tag size={16} /> },
];

function ProductsTab() {
  const { data: products = [], isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Product deleted");
    } catch {
      toast.error("Delete failed — backend not yet connected");
    }
    setDeleteTarget(null);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {["s1", "s2", "s3", "s4", "s5"].map((k) => (
          <Skeleton key={k} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {products.length} product{products.length !== 1 ? "s" : ""}
        </p>
        <Button
          size="sm"
          className="gap-2"
          onClick={() => setAddOpen(true)}
          data-ocid="add-product-btn"
        >
          <Plus size={15} /> Add Product
        </Button>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 border-b border-border">
              {["Image", "Name", "Category", "Price", "Stock", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-medium text-muted-foreground"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-muted-foreground"
                  data-ocid="products-empty"
                >
                  No products yet
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-smooth"
                  data-ocid={`product-row-${p.id}`}
                >
                  <td className="px-4 py-3">
                    <img
                      src={p.images[0] ?? "/assets/images/placeholder.svg"}
                      alt={p.name}
                      className="w-10 h-10 rounded-lg object-cover border border-border"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/assets/images/placeholder.svg";
                      }}
                    />
                  </td>
                  <td className="px-4 py-3 font-medium max-w-[200px]">
                    <span className="truncate block">{p.name}</span>
                    {p.featured && (
                      <span className="text-xs text-primary font-medium">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {p.category}
                  </td>
                  <td className="px-4 py-3 font-medium tabular-nums">
                    ${p.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 tabular-nums">
                    <span
                      className={
                        p.stock < 10 ? "text-destructive font-medium" : ""
                      }
                    >
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs h-7 px-2"
                        onClick={() => setEditTarget(p)}
                        data-ocid={`product-edit-${p.id}`}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs h-7 px-2 text-destructive hover:text-destructive"
                        onClick={() => setDeleteTarget(p.id)}
                        data-ocid={`product-delete-${p.id}`}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden flex flex-col gap-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="glass-card flex items-center gap-4"
            data-ocid={`product-card-${p.id}`}
          >
            <img
              src={p.images[0] ?? "/assets/images/placeholder.svg"}
              alt={p.name}
              className="w-12 h-12 rounded-xl object-cover border border-border shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/images/placeholder.svg";
              }}
            />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm truncate">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.category}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-display text-sm font-bold">
                ${p.price.toLocaleString()}
              </p>
              <p
                className={`text-xs mt-0.5 ${p.stock < 10 ? "text-destructive" : "text-muted-foreground"}`}
              >
                {p.stock} in stock
              </p>
              <div className="flex gap-1 mt-1 justify-end">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs h-6 px-1.5"
                  onClick={() => setEditTarget(p)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs h-6 px-1.5 text-destructive hover:text-destructive"
                  onClick={() => setDeleteTarget(p.id)}
                >
                  Del
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit product sheet */}
      <Sheet
        open={addOpen || !!editTarget}
        onOpenChange={(v) => {
          if (!v) {
            setAddOpen(false);
            setEditTarget(null);
          }
        }}
      >
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader className="mb-6">
            <SheetTitle className="font-display text-xl">
              {editTarget ? "Edit Product" : "Add Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductForm
            product={editTarget ?? undefined}
            onClose={() => {
              setAddOpen(false);
              setEditTarget(null);
            }}
          />
        </SheetContent>
      </Sheet>

      {/* Delete confirm */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this product. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteTarget && handleDelete(deleteTarget)}
              data-ocid="product-delete-confirm"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function SidebarNav({
  activeTab,
  onChange,
}: {
  activeTab: AdminTab;
  onChange: (t: AdminTab) => void;
}) {
  return (
    <nav className="p-3 flex flex-col gap-1">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          data-ocid={`admin-tab-${tab.id}`}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth w-full text-left
            ${
              activeTab === tab.id
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
            }`}
        >
          {tab.icon}
          {tab.label}
          {activeTab === tab.id && (
            <ChevronRight size={14} className="ml-auto" />
          )}
        </button>
      ))}
    </nav>
  );
}

export function AdminPage() {
  const { isAdmin } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      toast.error("Access denied — admin only");
      navigate({ to: "/" });
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  const tabContent: Record<AdminTab, React.ReactNode> = {
    overview: (
      <div className="flex flex-col gap-6">
        <AdminStats />
        <div className="glass-card">
          <p className="text-sm font-semibold text-muted-foreground mb-3">
            Recent Orders
          </p>
          <OrdersTable />
        </div>
      </div>
    ),
    products: <ProductsTab />,
    orders: <OrdersTable />,
    users: <UsersTable />,
    coupons: <CouponsTable />,
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 border-r border-border bg-card shrink-0 sticky top-16 h-[calc(100vh-4rem)]">
        <div className="p-6 border-b border-border">
          <h2 className="font-display text-lg font-bold text-foreground">
            Admin Panel
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Store management
          </p>
        </div>
        <div className="flex-1 overflow-y-auto">
          <SidebarNav activeTab={activeTab} onChange={setActiveTab} />
        </div>
        <div className="p-3 border-t border-border">
          <button
            type="button"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted/40 hover:text-foreground transition-smooth w-full text-left"
            data-ocid="admin-settings-btn"
          >
            <Settings size={16} />
            Settings
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-16 z-20 bg-card/80 backdrop-blur border-b border-border px-4 sm:px-6 py-3 flex items-center gap-3">
          <Button
            size="sm"
            variant="ghost"
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMobileSidebarOpen(true)}
            data-ocid="admin-mobile-menu"
            aria-label="Open admin menu"
          >
            <Menu size={18} />
          </Button>
          <h1 className="font-display text-lg font-bold capitalize">
            {activeTab === "overview" ? "Dashboard" : activeTab}
          </h1>
        </header>

        {/* Page body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile sidebar sheet */}
      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="w-60 p-0">
          <SheetHeader className="p-6 border-b border-border">
            <SheetTitle className="font-display text-left">
              Admin Panel
            </SheetTitle>
          </SheetHeader>
          <SidebarNav
            activeTab={activeTab}
            onChange={(t) => {
              setActiveTab(t);
              setMobileSidebarOpen(false);
            }}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
