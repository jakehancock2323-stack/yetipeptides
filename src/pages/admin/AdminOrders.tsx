import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OrderStatusBadge, { ORDER_STATUSES, ORDER_STATUS_LABELS } from "@/components/admin/OrderStatusBadge";
import { toast } from "sonner";
import { Download, Search, RefreshCw } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Order = Database["public"]["Tables"]["orders"]["Row"];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) toast.error(error.message);
    setOrders((data ?? []) as Order[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
    const channel = supabase
      .channel("orders-feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          const newOrder = payload.new as Order;
          setOrders((prev) => [newOrder, ...prev]);
          toast.success(`🔔 New order from ${newOrder.customer_name}`, {
            duration: 8000,
          });
          try {
            new Audio(
              "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=",
            ).play().catch(() => {});
          } catch {}
        },
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        (payload) => {
          const upd = payload.new as Order;
          setOrders((prev) => prev.map((o) => (o.id === upd.id ? upd : o)));
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (regionFilter !== "all" && o.shipping_region !== regionFilter) return false;
      if (search) {
        const s = search.toLowerCase();
        if (
          !o.customer_name.toLowerCase().includes(s) &&
          !o.customer_email.toLowerCase().includes(s) &&
          !o.id.toLowerCase().includes(s)
        )
          return false;
      }
      return true;
    });
  }, [orders, search, statusFilter, regionFilter]);

  const exportCsv = () => {
    const headers = [
      "id",
      "date",
      "name",
      "email",
      "phone",
      "region",
      "payment",
      "status",
      "total",
      "currency",
      "tracking",
    ];
    const rows = filtered.map((o) => [
      o.id,
      new Date(o.created_at).toISOString(),
      o.customer_name,
      o.customer_email,
      o.customer_phone ?? "",
      o.shipping_region,
      o.payment_method,
      o.status,
      o.total,
      o.currency,
      o.tracking_number ?? "",
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `yeti-orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} of {orders.length} orders
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={load} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={exportCsv} className="gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="frosted-glass rounded-xl p-4 mb-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search name, email, order ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-secondary/20 border-border/30"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 rounded-md bg-secondary/20 border border-border/30 px-3 text-sm"
        >
          <option value="all">All statuses</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {ORDER_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="h-10 rounded-md bg-secondary/20 border border-border/30 px-3 text-sm"
        >
          <option value="all">All regions</option>
          <option value="UK Domestic">UK Domestic</option>
          <option value="International">International</option>
        </select>
      </div>

      <div className="frosted-glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/30 text-xs text-muted-foreground uppercase tracking-wider">
              <tr>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Customer</th>
                <th className="text-left p-3">Region</th>
                <th className="text-left p-3">Payment</th>
                <th className="text-right p-3">Total</th>
                <th className="text-left p-3">Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground">
                    Loading…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground">
                    No orders.
                  </td>
                </tr>
              ) : (
                filtered.map((o) => (
                  <tr
                    key={o.id}
                    className="border-t border-border/20 hover:bg-secondary/10 transition-colors"
                  >
                    <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(o.created_at).toLocaleString()}
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{o.customer_name}</div>
                      <div className="text-xs text-muted-foreground">{o.customer_email}</div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full border ${
                          o.shipping_region === "UK Domestic"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            : "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                        }`}
                      >
                        {o.shipping_region}
                      </span>
                    </td>
                    <td className="p-3 text-xs uppercase">{o.payment_method}</td>
                    <td className="p-3 text-right font-semibold">
                      {o.currency === "GBP" ? "£" : "$"}
                      {Number(o.total).toFixed(2)}
                    </td>
                    <td className="p-3">
                      <OrderStatusBadge status={o.status} />
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        to={`/admin/orders/${o.id}`}
                        className="text-[hsl(var(--ice-blue))] hover:underline text-xs font-medium"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
