import type { Database } from "@/integrations/supabase/types";

type Order = Database["public"]["Tables"]["orders"]["Row"];

type OrderItem = {
  productName?: string;
  productCategory?: string;
  specification?: string;
  quantity?: number;
  price?: number;
};

// Royal Mail Click & Drop — "Default" CSV import template column set.
// These header names match the template Royal Mail provides for download
// at https://business.parcel.royalmail.com/ → Settings → Import/Export → Order import.
// Using these exact headers means Click & Drop auto-maps every column with the
// built-in "Default" mapping; no custom import profile setup required.
const HEADERS = [
  "Order reference",
  "Recipient name",
  "Recipient address line 1",
  "Recipient address line 2",
  "Recipient address line 3",
  "Recipient town",
  "Recipient county",
  "Recipient postcode",
  "Recipient country code",
  "Recipient email",
  "Recipient phone",
  "Order date",
  "Order value",
  "Currency code",
  "Weight (kg)",
  "Length (cm)",
  "Width (cm)",
  "Height (cm)",
  "Service",
  "Format",
  "Packaging",
  "Channel",
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
  // Service must match a name Click & Drop recognises. "Tracked 24" is the
  // standard display name; Click & Drop accepts it directly with the
  // default import profile.
  const service = opts.service ?? "Tracked 24";
  const format = opts.format ?? "Parcel"; // Parcel | Large Letter | Letter
  const items = (order.items as unknown as OrderItem[]) || [];
  const totalQty = items.reduce((s, it) => s + Number(it.quantity ?? 1), 0);
  // Rough default: 0.1 kg per item, min 0.1, capped 2 kg for small-parcel band.
  const weightKg =
    opts.weightKg ?? Math.min(2, Math.max(0.1, Number((totalQty * 0.1).toFixed(2))));

  const orderRef = order.id.slice(0, 8).toUpperCase();
  // Click & Drop expects DD/MM/YYYY in the default template.
  const d = new Date(order.created_at);
  const orderDate = `${String(d.getDate()).padStart(2, "0")}/${String(
    d.getMonth() + 1,
  ).padStart(2, "0")}/${d.getFullYear()}`;

  const row = [
    orderRef,
    order.customer_name,
    order.street ?? "",
    "",
    "",
    order.city ?? "",
    order.region ?? "",
    (order.postcode ?? "").toUpperCase(),
    "GB", // ISO country code — required, not the country name
    order.customer_email,
    order.customer_phone ?? "",
    orderDate,
    Number(order.total ?? 0).toFixed(2),
    order.currency ?? "GBP",
    weightKg,
    "",
    "",
    "",
    service,
    format,
    "",
    "Yeti Peptides",
    order.customer_notes ?? "",
  ];

  // UTF-8 BOM helps Excel and Click & Drop detect encoding correctly.
  const bom = "\ufeff";
  return bom + [HEADERS.join(","), row.map(csvEscape).join(",")].join("\r\n") + "\r\n";
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
