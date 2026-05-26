import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export type ItemLine = {
  productName: string;
  productCategory: string;
  specification: string;
  quantity: number;
  price: number;
};

export type PrefillOrder = {
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  street?: string;
  city?: string;
  region?: string;
  postcode?: string;
  country?: string;
  customer_notes?: string;
  shipping_region?: "UK Domestic" | "International";
  currency?: "USD" | "GBP";
  payment_method?: string;
  delivery_fee?: number;
  processing_fee?: number;
  discount?: number;
  items?: Partial<ItemLine>[];
};



const emptyLine = (): ItemLine => ({
  productName: "",
  productCategory: "",
  specification: "",
  quantity: 1,
  price: 0,
});

export default function NewOrderDialog({
  open,
  onOpenChange,
  onCreated,
  prefill,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onCreated: () => void;
  prefill?: PrefillOrder | null;
}) {
  const [saving, setSaving] = useState(false);
  const [region, setRegion] = useState<"UK Domestic" | "International">("International");
  const [currency, setCurrency] = useState<"USD" | "GBP">("USD");
  const [paymentMethod, setPaymentMethod] = useState("usdt");
  const [status, setStatus] = useState("new");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [regionField, setRegionField] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(65);
  const [processingFee, setProcessingFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [items, setItems] = useState<ItemLine[]>([emptyLine()]);

  useEffect(() => {
    if (!open || !prefill) return;
    if (prefill.customer_name) setCustomerName(prefill.customer_name);
    if (prefill.customer_email) setCustomerEmail(prefill.customer_email);
    if (prefill.customer_phone) setCustomerPhone(prefill.customer_phone);
    if (prefill.street) setStreet(prefill.street);
    if (prefill.city) setCity(prefill.city);
    if (prefill.region) setRegionField(prefill.region);
    if (prefill.postcode) setPostcode(prefill.postcode);
    if (prefill.country) setCountry(prefill.country);
    if (prefill.customer_notes) setCustomerNotes(prefill.customer_notes);
    if (prefill.shipping_region) setRegion(prefill.shipping_region);
    if (prefill.currency) setCurrency(prefill.currency);
    if (prefill.payment_method) setPaymentMethod(prefill.payment_method);
    if (typeof prefill.delivery_fee === "number") setDeliveryFee(prefill.delivery_fee);
    if (typeof prefill.processing_fee === "number") setProcessingFee(prefill.processing_fee);
    if (typeof prefill.discount === "number") setDiscount(prefill.discount);
    if (prefill.items && prefill.items.length) {
      setItems(
        prefill.items.map((it) => ({
          productName: it.productName ?? "",
          productCategory: it.productCategory ?? "",
          specification: it.specification ?? "",
          quantity: Number(it.quantity ?? 1),
          price: Number(it.price ?? 0),
        })),
      );
    }
  }, [open, prefill]);


  const subtotal = items.reduce((s, it) => s + Number(it.price) * Number(it.quantity), 0);
  const total = Math.max(0, subtotal + Number(deliveryFee) + Number(processingFee) - Number(discount));

  const updateItem = (i: number, patch: Partial<ItemLine>) => {
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  };

  const reset = () => {
    setCustomerName(""); setCustomerEmail(""); setCustomerPhone("");
    setStreet(""); setCity(""); setRegionField(""); setPostcode(""); setCountry("");
    setCustomerNotes(""); setAdminNotes("");
    setDeliveryFee(65); setProcessingFee(0); setDiscount(0);
    setItems([emptyLine()]);
    setRegion("International"); setCurrency("USD"); setPaymentMethod("usdt"); setStatus("new");
  };

  const submit = async () => {
    if (!customerName.trim() || !customerEmail.trim()) {
      toast.error("Customer name and email are required");
      return;
    }
    const cleanItems = items
      .filter((it) => it.productName.trim())
      .map((it) => ({
        productName: it.productName,
        productCategory: it.productCategory,
        specification: it.specification,
        quantity: Number(it.quantity),
        price: Number(it.price),
        lineTotal: Number(it.price) * Number(it.quantity),
      }));
    if (cleanItems.length === 0) {
      toast.error("Add at least one item");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("orders").insert({
      customer_name: customerName.trim(),
      customer_email: customerEmail.trim(),
      customer_phone: customerPhone.trim() || null,
      street: street.trim() || null,
      city: city.trim() || null,
      region: regionField.trim() || null,
      postcode: postcode.trim() || null,
      country: country.trim() || null,
      customer_notes: customerNotes.trim() || null,
      admin_notes: adminNotes.trim() || null,
      shipping_region: region,
      payment_method: paymentMethod,
      currency,
      status,
      items: cleanItems,
      subtotal,
      delivery_fee: Number(deliveryFee),
      processing_fee: Number(processingFee),
      discount: Number(discount),
      total,
      include_ebook: false,
    });
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Order created");
    reset();
    onOpenChange(false);
    onCreated();
  };

  const cur = currency === "GBP" ? "£" : "$";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New order</DialogTitle>
          <DialogDescription>Manually add an order to the system.</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Meta */}
          <div className="grid sm:grid-cols-4 gap-3">
            <div>
              <Label className="text-xs">Region</Label>
              <select
                value={region}
                onChange={(e) => {
                  const r = e.target.value as "UK Domestic" | "International";
                  setRegion(r);
                  setCurrency(r === "UK Domestic" ? "GBP" : "USD");
                  setPaymentMethod(r === "UK Domestic" ? "bank" : "usdt");
                }}
                className="mt-1 h-10 w-full rounded-md bg-secondary/20 border border-border/30 px-3 text-sm"
              >
                <option>UK Domestic</option>
                <option>International</option>
              </select>
            </div>
            <div>
              <Label className="text-xs">Currency</Label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as "USD" | "GBP")}
                className="mt-1 h-10 w-full rounded-md bg-secondary/20 border border-border/30 px-3 text-sm"
              >
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            <div>
              <Label className="text-xs">Payment</Label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mt-1 h-10 w-full rounded-md bg-secondary/20 border border-border/30 px-3 text-sm"
              >
                <option value="usdt">USDT</option>
                <option value="usdc">USDC</option>
                <option value="btc">BTC</option>
                <option value="bank">Bank Transfer</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <Label className="text-xs">Status</Label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 h-10 w-full rounded-md bg-secondary/20 border border-border/30 px-3 text-sm"
              >
                <option value="new">New</option>
                <option value="awaiting_payment">Awaiting Payment</option>
                <option value="paid">Paid</option>
                <option value="shipped">Shipped</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Customer */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Name *</Label>
              <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="mt-1 bg-secondary/20 border-border/30" />
            </div>
            <div>
              <Label className="text-xs">Email *</Label>
              <Input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="mt-1 bg-secondary/20 border-border/30" />
            </div>
            <div>
              <Label className="text-xs">Phone</Label>
              <Input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="mt-1 bg-secondary/20 border-border/30" />
            </div>
            <div>
              <Label className="text-xs">Country</Label>
              <Input value={country} onChange={(e) => setCountry(e.target.value)} className="mt-1 bg-secondary/20 border-border/30" />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-xs">Street</Label>
              <Input value={street} onChange={(e) => setStreet(e.target.value)} className="mt-1 bg-secondary/20 border-border/30" />
            </div>
            <div>
              <Label className="text-xs">City</Label>
              <Input value={city} onChange={(e) => setCity(e.target.value)} className="mt-1 bg-secondary/20 border-border/30" />
            </div>
            <div>
              <Label className="text-xs">Region / County</Label>
              <Input value={regionField} onChange={(e) => setRegionField(e.target.value)} className="mt-1 bg-secondary/20 border-border/30" />
            </div>
            <div>
              <Label className="text-xs">Postcode</Label>
              <Input value={postcode} onChange={(e) => setPostcode(e.target.value)} className="mt-1 bg-secondary/20 border-border/30" />
            </div>
          </div>

          {/* Items */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-semibold">Items</Label>
              <Button type="button" size="sm" variant="outline" onClick={() => setItems((p) => [...p, emptyLine()])} className="gap-1 h-8">
                <Plus className="w-3 h-3" /> Add line
              </Button>
            </div>
            <div className="space-y-2">
              {items.map((it, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 items-end p-2 rounded-md bg-secondary/10 border border-border/20">
                  <div className="col-span-4">
                    <Label className="text-[10px] text-muted-foreground">Product</Label>
                    <Input value={it.productName} onChange={(e) => updateItem(i, { productName: e.target.value })} className="h-9 bg-secondary/20 border-border/30" />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-[10px] text-muted-foreground">Category</Label>
                    <Input value={it.productCategory} onChange={(e) => updateItem(i, { productCategory: e.target.value })} className="h-9 bg-secondary/20 border-border/30" />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-[10px] text-muted-foreground">Spec</Label>
                    <Input value={it.specification} onChange={(e) => updateItem(i, { specification: e.target.value })} className="h-9 bg-secondary/20 border-border/30" />
                  </div>
                  <div className="col-span-1">
                    <Label className="text-[10px] text-muted-foreground">Qty</Label>
                    <Input type="number" min={1} value={it.quantity} onChange={(e) => updateItem(i, { quantity: Number(e.target.value) })} className="h-9 bg-secondary/20 border-border/30" />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-[10px] text-muted-foreground">Price ({cur})</Label>
                    <Input type="number" min={0} step="0.01" value={it.price} onChange={(e) => updateItem(i, { price: Number(e.target.value) })} className="h-9 bg-secondary/20 border-border/30" />
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <Button type="button" size="sm" variant="ghost" onClick={() => setItems((p) => p.filter((_, idx) => idx !== i))} className="h-9 w-9 p-0 text-destructive hover:text-destructive" disabled={items.length === 1}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <Label className="text-xs">Delivery fee ({cur})</Label>
              <Input type="number" min={0} step="0.01" value={deliveryFee} onChange={(e) => setDeliveryFee(Number(e.target.value))} className="mt-1 bg-secondary/20 border-border/30" />
            </div>
            <div>
              <Label className="text-xs">Processing fee ({cur})</Label>
              <Input type="number" min={0} step="0.01" value={processingFee} onChange={(e) => setProcessingFee(Number(e.target.value))} className="mt-1 bg-secondary/20 border-border/30" />
            </div>
            <div>
              <Label className="text-xs">Discount ({cur})</Label>
              <Input type="number" min={0} step="0.01" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} className="mt-1 bg-secondary/20 border-border/30" />
            </div>
          </div>

          <div className="frosted-glass rounded-xl p-4 space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{cur}{subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{cur}{Number(deliveryFee).toFixed(2)}</span></div>
            {Number(processingFee) > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Processing</span><span>{cur}{Number(processingFee).toFixed(2)}</span></div>}
            {Number(discount) > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Discount</span><span>−{cur}{Number(discount).toFixed(2)}</span></div>}
            <div className="flex justify-between font-bold text-base pt-2 border-t border-border/20"><span>Total</span><span className="text-[hsl(var(--ice-blue))]">{cur}{total.toFixed(2)}</span></div>
          </div>

          {/* Notes */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Customer notes</Label>
              <Textarea value={customerNotes} onChange={(e) => setCustomerNotes(e.target.value)} className="mt-1 min-h-[80px] bg-secondary/20 border-border/30" />
            </div>
            <div>
              <Label className="text-xs">Admin notes (private)</Label>
              <Textarea value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} className="mt-1 min-h-[80px] bg-secondary/20 border-border/30" />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>Cancel</Button>
          <Button onClick={submit} disabled={saving} className="bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/80 text-background">
            {saving ? "Creating…" : "Create order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
