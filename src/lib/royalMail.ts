import type { Database } from "@/integrations/supabase/types";

type Order = Database["public"]["Tables"]["orders"]["Row"];

type OrderItem = {
  productName?: string;
  productCategory?: string;
  specification?: string;
  quantity?: number;
  price?: number;
};

// Royal Mail Click & Drop CSV. Headers match the official "Default" import
// template column names so they auto-map once the user saves a mapping
// profile in Click & Drop (Settings → Import/Export → "Save as default mapping"
// on the first import). First/last name are split because the default
// "Name format" setting in Click & Drop is "First and last names are separate".
const HEADERS = [
  "Order reference",
  "Recipient first name",
  "Recipient last name",
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
  const weightKg =
    opts.weightKg ?? Math.min(2, Math.max(0.1, Number((totalQty * 0.1).toFixed(2))));

  const orderRef = order.id.slice(0, 8).toUpperCase();
  const d = new Date(order.created_at);
  const orderDate = `${String(d.getDate()).padStart(2, "0")}/${String(
    d.getMonth() + 1,
  ).padStart(2, "0")}/${d.getFullYear()}`;

  const fullName = (order.customer_name ?? "").trim();
  const nameParts = fullName.split(/\s+/);
  const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : fullName;
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

  const row = [
    orderRef,
    firstName,
    lastName,
    order.street ?? "",
    "",
    "",
    order.city ?? "",
    order.region ?? "",
    (order.postcode ?? "").toUpperCase(),
    "GB",
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
    "Yeti Peptides",
    order.customer_notes ?? "",
  ];

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
