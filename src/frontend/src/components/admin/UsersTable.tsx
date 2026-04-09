import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllOrders } from "@/hooks/useOrders";
import type { Order } from "@/types";
import { useMemo } from "react";

interface DerivedUser {
  principal: string;
  name: string;
  orderCount: number;
  totalSpent: number;
  joinedAt: number;
}

function truncatePrincipal(p: string) {
  if (p.length <= 16) return p;
  return `${p.slice(0, 8)}…${p.slice(-6)}`;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function UsersTable() {
  const { data: orders = [], isLoading } = useAllOrders();

  const users: DerivedUser[] = useMemo(() => {
    const map = new Map<string, DerivedUser>();
    for (const order of orders) {
      const uid = order.userId;
      const existing = map.get(uid);
      if (existing) {
        existing.orderCount += 1;
        existing.totalSpent += order.total;
        if (order.createdAt < existing.joinedAt)
          existing.joinedAt = order.createdAt;
      } else {
        map.set(uid, {
          principal: uid,
          name: order.shippingAddress?.name ?? uid,
          orderCount: 1,
          totalSpent: order.total,
          joinedAt: order.createdAt,
        });
      }
    }
    return Array.from(map.values()).sort((a, b) => b.joinedAt - a.joinedAt);
  }, [orders]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {["s1", "s2", "s3", "s4"].map((k) => (
          <Skeleton key={k} className="h-14 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 border-b border-border">
              {[
                "Customer",
                "Principal",
                "Orders",
                "Total Spent",
                "Member Since",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-medium text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-muted-foreground"
                  data-ocid="users-empty"
                >
                  No users yet
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr
                  key={u.principal}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-smooth"
                  data-ocid={`user-row-${u.principal.slice(0, 8)}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {initials(u.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {truncatePrincipal(u.principal)}
                  </td>
                  <td className="px-4 py-3 tabular-nums">{u.orderCount}</td>
                  <td className="px-4 py-3 tabular-nums">
                    ${u.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDate(u.joinedAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden flex flex-col gap-3">
        {users.length === 0 ? (
          <div
            className="glass-card text-center text-muted-foreground"
            data-ocid="users-empty-mobile"
          >
            No users yet
          </div>
        ) : (
          users.map((u) => (
            <div
              key={u.principal}
              className="glass-card flex items-center gap-4"
              data-ocid={`user-card-${u.principal.slice(0, 8)}`}
            >
              <Avatar className="w-10 h-10 shrink-0">
                <AvatarFallback className="text-sm bg-primary/10 text-primary">
                  {initials(u.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm">{u.name}</p>
                <p className="text-xs font-mono text-muted-foreground truncate mt-0.5">
                  {truncatePrincipal(u.principal)}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-display text-sm font-bold">
                  ${u.totalSpent.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  {u.orderCount} order{u.orderCount !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
