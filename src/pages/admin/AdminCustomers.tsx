import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import OrderStatusBadge from "@/components/admin/OrderStatusBadge";
import type { Database } from "@/integrations/supabase/types";

type Order = Database["public"]["Tables"]["orders"]["Row"];

export default function AdminCustomers() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(2000)
      .then(({ data }) => setOrders((data ?? []) as Order[]));
  }, []);

  const grouped = useMemo(() => {
    const map: Record<string, { email: string; name: string; orders: Order[]; total: number }> = {};
    orders.forEach((o) => {
      const k = o.customer_email.toLowerCase();
      if (!map[k]) map[k] = { email: o.customer_email, name: o.customer_name, orders: [], total: 0 };
      map[k].orders.push(o);
      map[k].total += Number(o.total);
    });
    let arr = Object.values(map).sort((a, b) => b.orders.length - a.orders.length);
    if (search) {
      const s = search.toLowerCase();
      arr = arr.filter((c) => c.email.toLowerCase().includes(s) || c.name.toLowerCase().includes(s));
    }
    return arr;
  }, [orders, search]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Customers</h1>
      <p className="text-sm text-muted-foreground mb-6">{grouped.length} unique customers</p>

      <Input
        placeholder="Search by email or name…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md mb-5 bg-secondary/20 border-border/30"
      />

      <div className="space-y-4">
        {grouped.map((c) => (
          <div key={c.email} className="frosted-glass rounded-xl p-5">
            <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
              <div>
                <div className="font-semibold">{c.name}</div>
                <a href={`mailto:${c.email}`} className="text-xs text-[hsl(var(--ice-blue))] hover:underline">
                  {c.email}
                </a>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold">${c.total.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">{c.orders.length} order{c.orders.length === 1 ? "" : "s"}</div>
              </div>
            </div>
            <div className="space-y-1.5">
              {c.orders.map((o) => (
                <Link
                  key={o.id}
                  to={`/admin/orders/${o.id}`}
                  className="flex items-center justify-between text-xs px-2 py-1.5 rounded hover:bg-secondary/20"
                >
                  <span className="text-muted-foreground">
                    {new Date(o.created_at).toLocaleDateString()} · #{o.id.slice(0, 8).toUpperCase()}
                  </span>
                  <span className="flex items-center gap-2">
                    <OrderStatusBadge status={o.status} />
                    <span className="font-medium">${Number(o.total).toFixed(2)}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
