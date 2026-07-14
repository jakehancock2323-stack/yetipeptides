import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Snowfall from "@/components/Snowfall";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Package, LogOut, ShoppingBag, Truck, ArrowRight, Clock, Check } from "lucide-react";
import { toast } from "sonner";

interface OrderRow {
  id: string;
  created_at: string;
  total: number;
  currency: string;
  status: string;
  tracking_number: string | null;
  items: any;
  shipping_region: string;
}

const statusStyle = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    case "shipped":
      return "bg-[hsl(var(--ice-blue))]/15 text-[hsl(var(--ice-blue))] border-[hsl(var(--ice-blue))]/30";
    case "paid":
      return "bg-aurora/15 text-aurora border-aurora/30";
    case "cancelled":
      return "bg-destructive/15 text-destructive border-destructive/30";
    default:
      return "bg-amber-500/15 text-amber-400 border-amber-500/30";
  }
};

export default function Account() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    let mounted = true;
    (async () => {
      setLoadingOrders(true);
      const { data, error } = await supabase
        .from("orders")
        .select("id, created_at, total, currency, status, tracking_number, items, shipping_region")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (!mounted) return;
      if (error) {
        toast.error("Could not load your orders");
      } else {
        setOrders((data ?? []) as OrderRow[]);
      }
      setLoadingOrders(false);
    })();
    return () => {
      mounted = false;
    };
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    navigate("/");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen">
        <Snowfall />
        <Navbar />
        <div className="container mx-auto px-4 pt-32 text-center text-sm text-muted-foreground">Loading…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <SEO
        title="My Account – Yeti Pep"
        description="View your Yeti Pep order history, track current shipments and manage your account."
        canonical="https://yetipeptides.com/account"
      />
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-24 md:pt-28">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-8 md:mb-10 grid md:grid-cols-12 gap-4 items-end border-b border-border/30 pb-6">
          <div className="md:col-span-8">
            <div className="text-[10px] uppercase tracking-[0.3em] text-aurora mb-2">Customer Portal</div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">My Account</h1>
            <p className="text-sm text-muted-foreground mt-2 truncate">Signed in as {user.email}</p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-2 border-border/40">
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </Button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Package className="w-5 h-5 text-[hsl(var(--ice-blue))]" /> Order History
            </h2>
            <Link to="/products" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              Continue Shopping <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loadingOrders ? (
            <div className="frosted-glass rounded-2xl p-10 text-center text-sm text-muted-foreground">Loading your orders…</div>
          ) : orders.length === 0 ? (
            <div className="frosted-glass rounded-2xl p-10 text-center glow-border">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/30 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-1">No orders yet</h3>
              <p className="text-sm text-muted-foreground mb-6">Future orders placed while you're signed in will appear here.</p>
              <Link to="/products">
                <Button className="bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/80 text-background gap-2">
                  Browse Products <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((o) => {
                const items = Array.isArray(o.items) ? (o.items as any[]) : [];
                const itemCount = items.reduce((s, i) => s + (i.quantity || 0), 0);
                const orderRef = o.id.slice(0, 8).toUpperCase();
                return (
                  <div key={o.id} className="frosted-glass rounded-xl p-4 sm:p-5 glow-border">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Order</span>
                          <span className="text-sm font-mono font-bold">#{orderRef}</span>
                          <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusStyle(o.status)}`}>
                            {o.status === "delivered" ? <Check className="w-2.5 h-2.5 inline mr-0.5" /> : null}
                            {o.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          {new Date(o.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[hsl(var(--ice-blue))]">£{Number(o.total).toFixed(2)}</p>
                        <p className="text-[10px] text-muted-foreground">{itemCount} item{itemCount !== 1 ? "s" : ""}</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 mb-3">
                      {items.slice(0, 4).map((i, idx) => (
                        <div key={idx} className="flex justify-between text-xs">
                          <span className="text-foreground/80 truncate pr-2">
                            {i.quantity}× {i.productName} <span className="text-muted-foreground">· {i.specification}</span>
                          </span>
                          <span className="text-muted-foreground flex-shrink-0">£{Number(i.lineTotal ?? i.price ?? 0).toFixed(2)}</span>
                        </div>
                      ))}
                      {items.length > 4 && (
                        <p className="text-[10px] text-muted-foreground">+ {items.length - 4} more item(s)</p>
                      )}
                    </div>

                    {o.tracking_number && (
                      <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-border/20">
                        <div className="flex items-center gap-2 min-w-0">
                          <Truck className="w-3.5 h-3.5 text-[hsl(var(--ice-blue))] flex-shrink-0" />
                          <span className="text-[11px] text-muted-foreground">Tracking</span>
                          <span className="text-xs font-mono font-semibold truncate">{o.tracking_number}</span>
                        </div>
                        <Link to={`/track-order?tracking=${encodeURIComponent(o.tracking_number)}`}>
                          <Button size="sm" variant="outline" className="h-7 text-[10px] border-border/40 gap-1">
                            Track <ArrowRight className="w-3 h-3" />
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
