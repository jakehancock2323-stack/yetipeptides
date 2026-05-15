import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import OrderStatusBadge, { ORDER_STATUSES, ORDER_STATUS_LABELS } from "@/components/admin/OrderStatusBadge";
import { toast } from "sonner";
import { ArrowLeft, Copy, Mail, Save, Trash2 } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import { buildVariables, fillTemplate, buildMailto, type OrderItem } from "@/lib/emailTemplates";

type Order = Database["public"]["Tables"]["orders"]["Row"];
type Template = Database["public"]["Tables"]["email_templates"]["Row"];

export default function AdminOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [templates, setTemplates] = useState<Record<string, Template>>({});
  const [adminNotes, setAdminNotes] = useState("");
  const [tracking, setTracking] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  const load = useCallback(async () => {
    if (!id) return;
    const [{ data: o, error }, { data: ts }] = await Promise.all([
      supabase.from("orders").select("*").eq("id", id).maybeSingle(),
      supabase.from("email_templates").select("*"),
    ]);
    if (error || !o) {
      toast.error("Order not found");
      navigate("/admin");
      return;
    }
    setOrder(o as Order);
    setAdminNotes(o.admin_notes ?? "");
    setTracking(o.tracking_number ?? "");
    const map: Record<string, Template> = {};
    (ts ?? []).forEach((t) => (map[t.template_key] = t as Template));
    setTemplates(map);
  }, [id, navigate]);

  useEffect(() => {
    load();
  }, [load]);

  if (!order) {
    return <div className="text-muted-foreground">Loading…</div>;
  }

  const items = (order.items as unknown as OrderItem[]) || [];
  const cur = order.currency === "GBP" ? "£" : "$";

  const updateOrder = async (patch: Partial<Order>) => {
    const { data, error } = await supabase
      .from("orders")
      .update(patch)
      .eq("id", order.id)
      .select()
      .maybeSingle();
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data) setOrder(data as Order);
  };

  const saveNotes = async () => {
    setSavingNotes(true);
    await updateOrder({ admin_notes: adminNotes, tracking_number: tracking || null });
    setSavingNotes(false);
    toast.success("Saved");
  };

  const sendEmail = async (templateKey: string, label: string) => {
    const t = templates[templateKey];
    if (!t) {
      toast.error(`Template "${templateKey}" not found. Add it in Email Templates.`);
      return;
    }
    const vars = buildVariables(order);
    const subject = fillTemplate(t.subject, vars);
    const body = fillTemplate(t.body, vars);
    const clipboardText =
      `To: ${order.customer_email}\nSubject: ${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(clipboardText);
    } catch {
      // ignore — we still open Proton below
    }
    // Open Proton Mail web compose in a new tab.
    window.open(
      "https://mail.proton.me/u/0/inbox?action=compose",
      "_blank",
      "noopener,noreferrer",
    );
    toast.success(`${label} copied — paste into the new Proton message`);
  };

  const copyAddress = () => {
    const addr = [
      order.customer_name,
      order.street,
      `${order.city ?? ""}${order.region ? ", " + order.region : ""} ${order.postcode ?? ""}`.trim(),
      order.country,
    ]
      .filter(Boolean)
      .join("\n");
    navigator.clipboard.writeText(addr);
    toast.success("Address copied");
  };

  const deleteOrder = async () => {
    if (!confirm("Delete this order permanently? This can't be undone.")) return;
    const { error } = await supabase.from("orders").delete().eq("id", order.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Order deleted");
    navigate("/admin");
  };

  return (
    <div className="max-w-5xl">
      <Link to="/admin" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-3 h-3" /> Back to orders
      </Link>

      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Order #{order.id.slice(0, 8).toUpperCase()}</h1>
          <p className="text-sm text-muted-foreground">
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <OrderStatusBadge status={order.status} />
          <select
            value={order.status}
            onChange={(e) => updateOrder({ status: e.target.value })}
            className="h-9 rounded-md bg-secondary/20 border border-border/30 px-3 text-sm"
          >
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {ORDER_STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-5">
        {/* Left: order content */}
        <div className="space-y-5">
          {/* Customer */}
          <div className="frosted-glass rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Customer</h2>
              <Button size="sm" variant="ghost" onClick={copyAddress} className="gap-1 h-8">
                <Copy className="w-3 h-3" /> Copy address
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Name</div>
                <div>{order.customer_name}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Email</div>
                <a href={`mailto:${order.customer_email}`} className="text-[hsl(var(--ice-blue))] hover:underline">
                  {order.customer_email}
                </a>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Phone</div>
                <div>{order.customer_phone || "—"}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Region</div>
                <div>{order.shipping_region}</div>
              </div>
              <div className="sm:col-span-2">
                <div className="text-xs text-muted-foreground">Address</div>
                <div className="whitespace-pre-line">
                  {[order.street, `${order.city ?? ""}${order.region ? ", " + order.region : ""} ${order.postcode ?? ""}`.trim(), order.country]
                    .filter(Boolean)
                    .join("\n")}
                </div>
              </div>
              {order.customer_notes && (
                <div className="sm:col-span-2">
                  <div className="text-xs text-muted-foreground">Customer notes</div>
                  <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-sm italic">
                    {order.customer_notes}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Items */}
          <div className="frosted-glass rounded-xl p-5">
            <h2 className="font-semibold mb-3">Items</h2>
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground">
                <tr className="border-b border-border/30">
                  <th className="text-left py-2">Product</th>
                  <th className="text-left py-2">Spec</th>
                  <th className="text-center py-2">Qty</th>
                  <th className="text-right py-2">Price</th>
                  <th className="text-right py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, i) => (
                  <tr key={i} className="border-b border-border/10">
                    <td className="py-2">
                      <div>{it.productName}</div>
                      {it.productCategory && (
                        <div className="text-xs text-muted-foreground">{it.productCategory}</div>
                      )}
                    </td>
                    <td className="py-2 text-xs">{it.specification}</td>
                    <td className="py-2 text-center">{it.quantity}</td>
                    <td className="py-2 text-right">
                      {cur}{Number(it.price).toFixed(2)}
                    </td>
                    <td className="py-2 text-right font-medium">
                      {cur}{Number(it.lineTotal).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 space-y-1 text-sm border-t border-border/30 pt-3">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{cur}{Number(order.subtotal).toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{cur}{Number(order.delivery_fee).toFixed(2)}</span></div>
              {Number(order.processing_fee) > 0 && (
                <div className="flex justify-between"><span className="text-muted-foreground">Processing fee</span><span>{cur}{Number(order.processing_fee).toFixed(2)}</span></div>
              )}
              <div className="flex justify-between font-bold text-base pt-2 border-t border-border/20">
                <span>Total</span><span className="text-[hsl(var(--ice-blue))]">{cur}{Number(order.total).toFixed(2)}</span>
              </div>
              <div className="text-xs text-muted-foreground pt-1">Payment: {order.payment_method.toUpperCase()}</div>
            </div>
          </div>

          {/* Admin notes */}
          <div className="frosted-glass rounded-xl p-5">
            <h2 className="font-semibold mb-3">Your private notes</h2>
            <Textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Internal notes only you can see…"
              className="min-h-[120px] bg-secondary/20 border-border/30 mb-3"
            />
            <Label className="text-xs text-muted-foreground">Tracking number</Label>
            <Input
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              placeholder="e.g. RM123456789GB"
              className="mt-1 mb-3 bg-secondary/20 border-border/30"
            />
            <Button onClick={saveNotes} disabled={savingNotes} size="sm" className="gap-2">
              <Save className="w-3 h-3" /> {savingNotes ? "Saving…" : "Save"}
            </Button>
          </div>
        </div>

        {/* Right: actions */}
        <div className="space-y-5">
          <div className="frosted-glass rounded-xl p-5 sticky top-6">
            <h2 className="font-semibold mb-1">Send email</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Opens your default email client (Proton) with a pre-filled message to{" "}
              <span className="text-foreground">{order.customer_email}</span>. You just hit Send.
            </p>
            <div className="space-y-2">
              <Button
                onClick={() => sendEmail("order_confirmation", "Order Confirmation")}
                className="w-full justify-start gap-2 bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/80 text-background"
              >
                <Mail className="w-4 h-4" /> Order Confirmation
              </Button>
              <Button
                onClick={() => sendEmail("payment_confirmation", "Payment Confirmation")}
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <Mail className="w-4 h-4" /> Payment Confirmation
              </Button>
              <Button
                onClick={() => sendEmail("shipping_update", "Shipping Update")}
                variant="outline"
                className="w-full justify-start gap-2"
                disabled={!tracking}
                title={!tracking ? "Add a tracking number first" : ""}
              >
                <Mail className="w-4 h-4" /> Shipping Update
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-4 leading-relaxed">
              Edit the templates anytime under <Link to="/admin/templates" className="text-[hsl(var(--ice-blue))] hover:underline">Email Templates</Link>.
            </p>
          </div>

          <div className="frosted-glass rounded-xl p-5">
            <h2 className="font-semibold mb-3 text-destructive">Danger zone</h2>
            <Button
              variant="destructive"
              size="sm"
              onClick={deleteOrder}
              className="w-full gap-2"
            >
              <Trash2 className="w-3 h-3" /> Delete order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
