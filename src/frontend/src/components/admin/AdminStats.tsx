import { useAllOrders } from "@/hooks/useOrders";
import { useProducts } from "@/hooks/useProducts";
import type { Order } from "@/types";
import { Package, ShoppingBag, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  index: number;
}

function StatCard({ icon, label, value, sub, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="glass-card flex items-start gap-4"
    >
      <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">
          {label}
        </p>
        <p className="text-2xl font-display font-bold text-foreground">
          {value}
        </p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
    </motion.div>
  );
}

export function AdminStats() {
  const { data: products = [] } = useProducts();
  const { data: orders = [] } = useAllOrders();

  const totalRevenue = orders.reduce(
    (sum: number, o: Order) => sum + o.total,
    0,
  );
  const uniqueUsers = new Set(orders.map((o: Order) => o.userId)).size;
  const pendingOrders = orders.filter(
    (o: Order) => o.status === "pending" || o.status === "processing",
  ).length;

  const stats = [
    {
      icon: <Package size={20} />,
      label: "Total Products",
      value: products.length,
      sub: `${products.filter((p) => p.featured).length} featured`,
    },
    {
      icon: <ShoppingBag size={20} />,
      label: "Total Orders",
      value: orders.length,
      sub: `${pendingOrders} pending`,
    },
    {
      icon: <Users size={20} />,
      label: "Customers",
      value: uniqueUsers,
      sub: "unique buyers",
    },
    {
      icon: <TrendingUp size={20} />,
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      sub: "all time",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <StatCard key={s.label} {...s} index={i} />
      ))}
    </div>
  );
}
