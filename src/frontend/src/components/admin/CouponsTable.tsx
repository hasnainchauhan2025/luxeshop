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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { Coupon } from "@/types";
import { Loader2, Plus, Tag, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Seed coupons since backend is not yet connected
const SEED_COUPONS: Coupon[] = [
  {
    code: "LAUNCH20",
    discount: 20,
    type: "percentage",
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 30,
    usageLimit: 100,
    usageCount: 34,
    active: true,
  },
  {
    code: "VIP50",
    discount: 50,
    type: "fixed",
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 14,
    usageLimit: 20,
    usageCount: 8,
    active: true,
  },
  {
    code: "SUMMER10",
    discount: 10,
    type: "percentage",
    expiresAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
    usageLimit: 500,
    usageCount: 312,
    active: false,
  },
];

function formatExpiry(ts?: number) {
  if (!ts) return "No expiry";
  const d = new Date(ts);
  const past = d < new Date();
  return `${d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}${past ? " (expired)" : ""}`;
}

interface NewCouponForm {
  code: string;
  discount: string;
  expiresAt: string;
}

export function CouponsTable() {
  const [coupons, setCoupons] = useState<Coupon[]>(SEED_COUPONS);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<NewCouponForm>({
    code: "",
    discount: "",
    expiresAt: "",
  });

  const toggleActive = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, active: !c.active } : c)),
    );
    toast.success("Coupon updated");
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    toast.success("Coupon deleted");
    setDeleteTarget(null);
  };

  const handleAddCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code || !form.discount) {
      toast.error("Code and discount are required");
      return;
    }
    if (coupons.find((c) => c.code === form.code.toUpperCase())) {
      toast.error("Coupon code already exists");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    const newCoupon: Coupon = {
      code: form.code.toUpperCase(),
      discount: Number(form.discount),
      type: "percentage",
      expiresAt: form.expiresAt
        ? new Date(form.expiresAt).getTime()
        : undefined,
      usageLimit: undefined,
      usageCount: 0,
      active: true,
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    setForm({ code: "", discount: "", expiresAt: "" });
    setShowForm(false);
    setSaving(false);
    toast.success("Coupon created");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Add Coupon */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {coupons.length} coupon{coupons.length !== 1 ? "s" : ""} total
        </p>
        <Button
          size="sm"
          className="gap-2"
          onClick={() => setShowForm(!showForm)}
          data-ocid="add-coupon-btn"
        >
          <Plus size={15} />
          Add Coupon
        </Button>
      </div>

      {/* Inline Add Form */}
      {showForm && (
        <form
          onSubmit={handleAddCoupon}
          className="glass-card !rounded-xl flex flex-col sm:flex-row gap-3 items-end"
        >
          <div className="flex flex-col gap-1.5 flex-1">
            <Label htmlFor="coupon-code">Code *</Label>
            <Input
              id="coupon-code"
              value={form.code}
              onChange={(e) =>
                setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))
              }
              placeholder="SAVE15"
              data-ocid="coupon-code-input"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5 w-32">
            <Label htmlFor="coupon-discount">Discount (%) *</Label>
            <Input
              id="coupon-discount"
              type="number"
              min={1}
              max={100}
              value={form.discount}
              onChange={(e) =>
                setForm((f) => ({ ...f, discount: e.target.value }))
              }
              placeholder="15"
              data-ocid="coupon-discount-input"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5 w-44">
            <Label htmlFor="coupon-expiry">Expiry Date</Label>
            <Input
              id="coupon-expiry"
              type="date"
              value={form.expiresAt}
              onChange={(e) =>
                setForm((f) => ({ ...f, expiresAt: e.target.value }))
              }
              data-ocid="coupon-expiry-input"
            />
          </div>
          <div className="flex gap-2 shrink-0">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={saving}
              data-ocid="coupon-form-submit"
            >
              {saving ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      )}

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 border-b border-border">
              {["Code", "Discount", "Usage", "Expiry", "Active", "Actions"].map(
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
            {coupons.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-muted-foreground"
                  data-ocid="coupons-empty"
                >
                  No coupons yet
                </td>
              </tr>
            ) : (
              coupons.map((coupon) => (
                <tr
                  key={coupon.code}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-smooth"
                  data-ocid={`coupon-row-${coupon.code}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Tag size={13} className="text-primary" />
                      <code className="font-mono text-xs font-bold">
                        {coupon.code}
                      </code>
                    </div>
                  </td>
                  <td className="px-4 py-3 tabular-nums">
                    {coupon.type === "percentage"
                      ? `${coupon.discount}%`
                      : `$${coupon.discount}`}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground tabular-nums">
                    {coupon.usageCount}
                    {coupon.usageLimit ? ` / ${coupon.usageLimit}` : ""}
                  </td>
                  <td
                    className={`px-4 py-3 text-xs ${coupon.expiresAt && coupon.expiresAt < Date.now() ? "text-destructive" : "text-muted-foreground"}`}
                  >
                    {formatExpiry(coupon.expiresAt)}
                  </td>
                  <td className="px-4 py-3">
                    <Switch
                      checked={coupon.active}
                      onCheckedChange={() => toggleActive(coupon.code)}
                      data-ocid={`coupon-toggle-${coupon.code}`}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive gap-1.5 text-xs"
                      onClick={() => setDeleteTarget(coupon.code)}
                      data-ocid={`coupon-delete-${coupon.code}`}
                    >
                      <Trash2 size={12} /> Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden flex flex-col gap-3">
        {coupons.map((coupon) => (
          <div
            key={coupon.code}
            className="glass-card flex items-center justify-between gap-3"
            data-ocid={`coupon-card-${coupon.code}`}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Tag size={13} className="text-primary" />
                <code className="font-mono text-xs font-bold">
                  {coupon.code}
                </code>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {coupon.type === "percentage"
                  ? `${coupon.discount}% off`
                  : `$${coupon.discount} off`}{" "}
                · {coupon.usageCount} uses
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {formatExpiry(coupon.expiresAt)}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Switch
                checked={coupon.active}
                onCheckedChange={() => toggleActive(coupon.code)}
              />
              <Button
                size="sm"
                variant="ghost"
                className="text-destructive h-8 w-8 p-0"
                onClick={() => setDeleteTarget(coupon.code)}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirm */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete coupon?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete coupon{" "}
              <code className="font-mono font-bold">{deleteTarget}</code>. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteTarget && deleteCoupon(deleteTarget)}
              data-ocid="coupon-delete-confirm"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
