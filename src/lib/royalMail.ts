import type { Database } from "@/integrations/supabase/types";

type Order = Database["public"]["Tables"]["orders"]["Row"];

type OrderItem = {
  productName?: string;
  productCategory?: string;
  specification?: string;
  quantity?: number;
  price?: number;
};

// Royal Mail Click & Drop CSV — standard import column set.
// Upload at https://business.parcel.royalmail.com/ → Orders → Import.
const HEADERS = [
  "Order reference",
  "Recipient name",
  "Recipient address line 1",
  "Recipient address line 2",
  "Recipient address line 3",
  "Recipient town",
  "Recipient county",
  "Recipient postcode",
  "Recipient country",
  "Recipient email",
  "Recipient mobile",
  "Order date",
  "Weight (kg)",
  "Format",
  "Length (cm)",
  "Width (cm)",
  "Depth (cm)",
  "Service",
  "Order subtotal",
  "Order total",
  "Currency",
  "Special instructions",
];

const csvEscape = (v: unknown): string => {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
};

export function buildRoyalMailCsv(
  order: Order,
  opts: { service?: string; format?: string; weightKg?: number } = {},
): string {
  const service = opts.service ?? "Tracked 24";
  const format = opts.format ?? "Parcel";
  const items = (order.items as unknown as OrderItem[]) || [];
  const totalQty = items.reduce((s, it) => s + Number(it.quantity ?? 1), 0);
  // Rough default: 0.1 kg per item, min 0.1, capped 2 kg for the small-parcel band.
  const weightKg =
    opts.weightKg ?? Math.min(2, Math.max(0.1, Number((totalQty * 0.1).toFixed(2))));

  const orderRef = order.id.slice(0, 8).toUpperCase();
  const orderDate = new Date(order.created_at).toISOString().slice(0, 10);

  const row = [
    orderRef,
    order.customer_name,
    order.street ?? "",
    "",
    "",
    order.city ?? "",
    order.region ?? "",
    order.postcode ?? "",
    "GB",
    order.customer_email,
    order.customer_phone ?? "",
    orderDate,
    weightKg,
    format,
    "",
    "",
    "",
    service,
    Number(order.subtotal ?? 0).toFixed(2),
    Number(order.total ?? 0).toFixed(2),
    order.currency ?? "GBP",
    order.customer_notes ?? "",
  ];

  return [HEADERS.join(","), row.map(csvEscape).join(",")].join("\r\n") + "\r\n";
}

export function downloadRoyalMailCsv(order: Order, service = "Tracked 24") {
  const csv = buildRoyalMailCsv(order, { service });
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `royalmail-${order.id.slice(0, 8).toUpperCase()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
