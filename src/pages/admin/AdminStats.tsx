import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Order = Database["public"]["Tables"]["orders"]["Row"];

export default function AdminStats() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(2000)
      .then(({ data }) => {
        setOrders((data ?? []) as Order[]);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-muted-foreground">Loading…</div>;

  const now = Date.now();
  const since = (days: number) => now - days * 86400000;
  const sumTotal = (list: Order[]) => list.reduce((s, o) => s + Number(o.total), 0);
  const today = orders.filter((o) => new Date(o.created_at).getTime() > since(1));
  const week = orders.filter((o) => new Date(o.created_at).getTime() > since(7));
  const month = orders.filter((o) => new Date(o.created_at).getTime() > since(30));

  // top products
  const productCounts: Record<string, { name: string; qty: number; revenue: number }> = {};
  orders.forEach((o) => {
    (o.items as any[]).forEach((it) => {
      const key = it.productName;
      if (!productCounts[key]) productCounts[key] = { name: key, qty: 0, revenue: 0 };
      productCounts[key].qty += Number(it.quantity);
      productCounts[key].revenue += Number(it.lineTotal);
    });
  });
  const topProducts = Object.values(productCounts).sort((a, b) => b.qty - a.qty).slice(0, 10);

  const ukOrders = orders.filter((o) => o.shipping_region === "UK Domestic");
  const intlOrders = orders.filter((o) => o.shipping_region !== "UK Domestic");
  const pendingCount = orders.filter((o) => o.status === "new" || o.status === "awaiting_payment").length;

  const Stat = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
    <div className="frosted-glass rounded-xl p-5">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-2xl font-bold mt-1 text-[hsl(var(--ice-blue))]">{value}</div>
      {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Stats</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Stat label="Today" value={`$${sumTotal(today).toFixed(2)}`} sub={`${today.length} orders`} />
        <Stat label="Last 7 days" value={`$${sumTotal(week).toFixed(2)}`} sub={`${week.length} orders`} />
        <Stat label="Last 30 days" value={`$${sumTotal(month).toFixed(2)}`} sub={`${month.length} orders`} />
        <Stat label="All-time" value={`$${sumTotal(orders).toFixed(2)}`} sub={`${orders.length} orders`} />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="frosted-glass rounded-xl p-5">
          <h2 className="font-semibold mb-4">Top products (all-time)</h2>
          {topProducts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No data yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground">
                <tr className="border-b border-border/30">
                  <th className="text-left py-2">Product</th>
                  <th className="text-right py-2">Units</th>
                  <th className="text-right py-2">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p) => (
                  <tr key={p.name} className="border-b border-border/10">
                    <td className="py-2">{p.name}</td>
                    <td className="py-2 text-right">{p.qty}</td>
                    <td className="py-2 text-right">${p.revenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="space-y-5">
          <div className="frosted-glass rounded-xl p-5">
            <h2 className="font-semibold mb-4">UK vs International</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-amber-400">UK Domestic</span>
                  <span>{ukOrders.length} orders · ${sumTotal(ukOrders).toFixed(2)}</span>
                </div>
                <div className="h-2 rounded-full bg-secondary/30 overflow-hidden">
                  <div
                    className="h-full bg-amber-500/60"
                    style={{ width: `${(ukOrders.length / Math.max(1, orders.length)) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-cyan-400">International</span>
                  <span>{intlOrders.length} orders · ${sumTotal(intlOrders).toFixed(2)}</span>
                </div>
                <div className="h-2 rounded-full bg-secondary/30 overflow-hidden">
                  <div
                    className="h-full bg-cyan-500/60"
                    style={{ width: `${(intlOrders.length / Math.max(1, orders.length)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="frosted-glass rounded-xl p-5">
            <h2 className="font-semibold mb-2">Needs your attention</h2>
            <div className="text-3xl font-bold text-amber-400">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">orders are New or Awaiting Payment</p>
          </div>
        </div>
      </div>
    </div>
  );
}
