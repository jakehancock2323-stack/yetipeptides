import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import OrderStatusBadge, { ORDER_STATUSES, ORDER_STATUS_LABELS } from "@/components/admin/OrderStatusBadge";
import NewOrderDialog, { type PrefillOrder } from "@/components/admin/NewOrderDialog";
import { toast } from "sonner";
import { Download, Search, RefreshCw, Plus, Sparkles, Check, Save, StickyNote } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Order = Database["public"]["Tables"]["orders"]["Row"];

interface AdminOrdersProps {
  lockedRegion?: "UK Domestic" | "International";
  title?: string;
  subtitle?: string;
}

// ---- date grouping ----
const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};
const groupKey = (iso: string) => {
  const d = new Date(iso);
  const today = startOfDay(new Date());
  const day = startOfDay(d);
  const diffDays = Math.round((today.getTime() - day.getTime()) / 86400000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return "Earlier this week";
  if (diffDays < 30) return "Earlier this month";
  return d.toLocaleDateString(undefined, { month: "long", year: "numeric" });
};
const GROUP_ORDER = ["Today", "Yesterday", "Earlier this week", "Earlier this month"];

export default function AdminOrders({ lockedRegion, title, subtitle }: AdminOrdersProps = {}) {
  const filterKey = `admin-orders-filters:${lockedRegion ?? "all"}`;
  const initial = (() => {
    try {
      return JSON.parse(sessionStorage.getItem(filterKey) || "{}") as {
        search?: string;
        statusFilter?: string;
        regionFilter?: string;
      };
    } catch {
      return {};
    }
  })();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initial.search ?? "");
  const [statusFilter, setStatusFilter] = useState<string>(initial.statusFilter ?? "all");
  const [regionFilter, setRegionFilter] = useState<string>(lockedRegion ?? initial.regionFilter ?? "all");
  const [newOpen, setNewOpen] = useState(false);
  const [prefill, setPrefill] = useState<PrefillOrder | null>(null);
  const [parsing, setParsing] = useState(false);
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});
  const [noteDrafts, setNoteDrafts] = useState<Record<string, { notes: string; tracking: string }>>({});
  const [savingNotes, setSavingNotes] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // persist filters
  useEffect(() => {
    sessionStorage.setItem(
      filterKey,
      JSON.stringify({ search, statusFilter, regionFilter }),
    );
  }, [filterKey, search, statusFilter, regionFilter]);

  const handleScreenshot = async (file: File) => {
    setParsing(true);
    const t = toast.loading("AI is reading the screenshot…");
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(",")[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const { data, error } = await supabase.functions.invoke("parse-order-screenshot", {
        body: { imageBase64: base64, mimeType: file.type },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setPrefill(data.order as PrefillOrder);
      setNewOpen(true);
      toast.success("Order extracted — please review", { id: t });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to parse screenshot";
      toast.error(msg, { id: t });
    } finally {
      setParsing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const load = async () => {
    setLoading(true);
    let q = supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (lockedRegion) q = q.eq("shipping_region", lockedRegion);
    const { data, error } = await q;
    if (error) toast.error(error.message);
    setOrders((data ?? []) as Order[]);
    setLoading(false);
  };

  const markDelivered = async (id: string) => {
    const { error } = await supabase.from("orders").update({ status: "delivered" }).eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: "delivered" } : o)));
    toast.success("Marked as delivered");
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const saveNotes = async (id: string) => {
    const draft = noteDrafts[id];
    if (!draft) return;
    setSavingNotes((s) => ({ ...s, [id]: true }));
    const { error } = await supabase
      .from("orders")
      .update({ admin_notes: draft.notes, tracking_number: draft.tracking || null })
      .eq("id", id);
    setSavingNotes((s) => ({ ...s, [id]: false }));
    if (error) {
      toast.error(error.message);
      return;
    }
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, admin_notes: draft.notes, tracking_number: draft.tracking || null } : o,
      ),
    );
    toast.success("Notes saved");
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
          if (lockedRegion && newOrder.shipping_region !== lockedRegion) return;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const grouped = useMemo(() => {
    const map = new Map<string, Order[]>();
    for (const o of filtered) {
      const key = groupKey(o.created_at);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(o);
    }
    // stable order: known groups first, then by most recent order in the bucket
    const entries = Array.from(map.entries());
    entries.sort((a, b) => {
      const ai = GROUP_ORDER.indexOf(a[0]);
      const bi = GROUP_ORDER.indexOf(b[0]);
      if (ai !== -1 || bi !== -1) {
        return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
      }
      // older months: by latest item descending
      return new Date(b[1][0].created_at).getTime() - new Date(a[1][0].created_at).getTime();
    });
    return entries;
  }, [filtered]);

  const stats = useMemo(() => {
    const newCount = orders.filter((o) => o.status === "new").length;
    const inProgress = orders.filter((o) =>
      ["paid", "processing", "shipped"].includes(o.status),
    ).length;
    const delivered = orders.filter((o) => o.status === "delivered").length;
    return { newCount, inProgress, delivered };
  }, [orders]);

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

  const toggleNotes = (o: Order) => {
    setExpandedNotes((p) => ({ ...p, [o.id]: !p[o.id] }));
    setNoteDrafts((p) =>
      p[o.id]
        ? p
        : { ...p, [o.id]: { notes: o.admin_notes ?? "", tracking: o.tracking_number ?? "" } },
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">{title ?? "Orders"}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {subtitle ? `${subtitle} · ` : ""}
            {filtered.length} of {orders.length} shown
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleScreenshot(f);
            }}
          />
          <Button
            size="sm"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={parsing}
            className="gap-2 border-[hsl(var(--ice-blue))]/40 text-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/10"
          >
            <Sparkles className="w-4 h-4" />
            {parsing ? "Reading…" : "Import Screenshot"}
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setPrefill(null);
              setNewOpen(true);
            }}
            className="gap-2 bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/80 text-background"
          >
            <Plus className="w-4 h-4" />
            New Order
          </Button>
          <Button variant="outline" size="sm" onClick={load} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={exportCsv} className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="frosted-glass rounded-xl p-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">New</div>
          <div className="text-2xl font-bold text-amber-400 mt-1">{stats.newCount}</div>
        </div>
        <div className="frosted-glass rounded-xl p-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">In progress</div>
          <div className="text-2xl font-bold text-[hsl(var(--ice-blue))] mt-1">{stats.inProgress}</div>
        </div>
        <div className="frosted-glass rounded-xl p-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Delivered</div>
          <div className="text-2xl font-bold text-green-400 mt-1">{stats.delivered}</div>
        </div>
      </div>

      <NewOrderDialog
        open={newOpen}
        onOpenChange={(v) => {
          setNewOpen(v);
          if (!v) setPrefill(null);
        }}
        onCreated={load}
        prefill={prefill}
      />

      {/* Filters */}
      <div className="frosted-glass rounded-xl p-4 flex flex-wrap gap-3 items-center">
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
        {!lockedRegion && (
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="h-10 rounded-md bg-secondary/20 border border-border/30 px-3 text-sm"
          >
            <option value="all">All regions</option>
            <option value="UK Domestic">UK Domestic</option>
            <option value="International">International</option>
          </select>
        )}
        {(search || statusFilter !== "all" || (!lockedRegion && regionFilter !== "all")) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
              if (!lockedRegion) setRegionFilter("all");
            }}
            className="text-muted-foreground"
          >
            Clear
          </Button>
        )}
      </div>

      {/* Order groups */}
      {loading ? (
        <div className="frosted-glass rounded-xl p-12 text-center text-muted-foreground">
          Loading…
        </div>
      ) : filtered.length === 0 ? (
        <div className="frosted-glass rounded-xl p-12 text-center text-muted-foreground">
          No orders.
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map(([label, group]) => (
            <section key={label}>
              <div className="flex items-center gap-3 mb-3 px-1">
                <h2 className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--ice-blue))] font-semibold">
                  {label}
                </h2>
                <div className="h-px flex-1 bg-border/30" />
                <span className="text-xs text-muted-foreground">{group.length}</span>
              </div>
              <div className="space-y-3">
                {group.map((o) => {
                  const isExpanded = expandedNotes[o.id];
                  const draft = noteDrafts[o.id] ?? {
                    notes: o.admin_notes ?? "",
                    tracking: o.tracking_number ?? "",
                  };
                  const hasNotes = !!(o.admin_notes || o.tracking_number || o.customer_notes);
                  return (
                    <div
                      key={o.id}
                      className="frosted-glass rounded-xl p-4 sm:p-5 transition-all hover:border-[hsl(var(--ice-blue))]/30"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        {/* Left: ID + customer */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Link
                              to={`/admin/orders/${o.id}`}
                              className="font-mono text-xs uppercase text-[hsl(var(--ice-blue))] hover:underline"
                            >
                              #{o.id.split("-")[0].toUpperCase()}
                            </Link>
                            <span className="text-[11px] text-muted-foreground">
                              {new Date(o.created_at).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                              {" · "}
                              {new Date(o.created_at).toLocaleDateString()}
                            </span>
                            <span
                              className={`text-[11px] px-2 py-0.5 rounded-full border ${
                                o.shipping_region === "UK Domestic"
                                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                  : "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                              }`}
                            >
                              {o.shipping_region}
                            </span>
                            <span className="text-[11px] uppercase text-muted-foreground border border-border/30 rounded-full px-2 py-0.5">
                              {o.payment_method}
                            </span>
                          </div>
                          <div className="mt-2">
                            <div className="font-semibold text-base">{o.customer_name}</div>
                            <div className="text-xs text-muted-foreground truncate">
                              {o.customer_email}
                            </div>
                          </div>
                        </div>

                        {/* Right: total + status + actions */}
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-xl font-bold text-[hsl(var(--ice-blue))]">
                            {o.currency === "GBP" ? "£" : "$"}
                            {Number(o.total).toFixed(2)}
                          </div>
                          <div className="flex items-center gap-2 flex-wrap justify-end">
                            <select
                              value={o.status}
                              onChange={(e) => updateStatus(o.id, e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              className="h-7 text-xs rounded-md bg-secondary/30 border border-border/30 px-2"
                            >
                              {ORDER_STATUSES.map((s) => (
                                <option key={s} value={s}>
                                  {ORDER_STATUS_LABELS[s]}
                                </option>
                              ))}
                            </select>
                            <OrderStatusBadge status={o.status} />
                          </div>
                          <div className="flex items-center gap-2">
                            {o.status !== "delivered" && o.status !== "cancelled" && (
                              <Button
                                size="sm"
                                onClick={() => markDelivered(o.id)}
                                className="h-7 px-2 gap-1 bg-green-600 hover:bg-green-500 text-white text-xs"
                              >
                                <Check className="w-3 h-3" />
                                Delivered
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleNotes(o)}
                              className={`h-7 px-2 gap-1 text-xs ${
                                hasNotes ? "text-amber-400" : "text-muted-foreground"
                              }`}
                            >
                              <StickyNote className="w-3 h-3" />
                              Notes
                            </Button>
                            <Link
                              to={`/admin/orders/${o.id}`}
                              className="text-[hsl(var(--ice-blue))] hover:underline text-xs font-medium"
                            >
                              View →
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Customer notes preview (always visible if present) */}
                      {o.customer_notes && (
                        <div className="mt-3 p-2 rounded bg-amber-500/10 border border-amber-500/20 text-xs italic">
                          <span className="text-amber-400 font-medium not-italic">
                            Customer note:{" "}
                          </span>
                          {o.customer_notes}
                        </div>
                      )}

                      {/* Admin notes preview */}
                      {!isExpanded && o.admin_notes && (
                        <div className="mt-3 text-xs text-muted-foreground border-l-2 border-border/40 pl-3 line-clamp-2">
                          {o.admin_notes}
                        </div>
                      )}
                      {!isExpanded && o.tracking_number && (
                        <div className="mt-2 text-xs">
                          <span className="text-muted-foreground">Tracking: </span>
                          <span className="font-mono text-[hsl(var(--ice-blue))]">
                            {o.tracking_number}
                          </span>
                        </div>
                      )}

                      {/* Expanded inline editor */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-border/20 space-y-3">
                          <div>
                            <label className="text-xs text-muted-foreground mb-1 block">
                              Tracking number
                            </label>
                            <Input
                              value={draft.tracking}
                              onChange={(e) =>
                                setNoteDrafts((p) => ({
                                  ...p,
                                  [o.id]: { ...draft, tracking: e.target.value },
                                }))
                              }
                              placeholder="e.g. RM123456789GB"
                              className="bg-secondary/20 border-border/30 h-9 text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground mb-1 block">
                              Private notes
                            </label>
                            <Textarea
                              value={draft.notes}
                              onChange={(e) =>
                                setNoteDrafts((p) => ({
                                  ...p,
                                  [o.id]: { ...draft, notes: e.target.value },
                                }))
                              }
                              placeholder="Internal notes only you can see…"
                              className="min-h-[80px] bg-secondary/20 border-border/30 text-sm"
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleNotes(o)}
                              className="h-8 text-xs"
                            >
                              Close
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => saveNotes(o.id)}
                              disabled={savingNotes[o.id]}
                              className="h-8 gap-1 text-xs"
                            >
                              <Save className="w-3 h-3" />
                              {savingNotes[o.id] ? "Saving…" : "Save"}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
