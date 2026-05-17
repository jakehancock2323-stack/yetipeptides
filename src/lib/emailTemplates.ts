import type { Database } from "@/integrations/supabase/types";

type Order = Database["public"]["Tables"]["orders"]["Row"];

export interface OrderItem {
  productName: string;
  productCategory?: string;
  specification: string;
  quantity: number;
  price: number;
  lineTotal: number;
}

export function buildVariables(order: Order): Record<string, string> {
  const cur = order.currency === "GBP" ? "£" : "$";
  const fmt = (n: number | string | null) => `${cur}${Number(n ?? 0).toFixed(2)}`;
  const items = (order.items as unknown as OrderItem[]) || [];
  const itemsList = items
    .map(
      (i) =>
        `• ${i.productName} (${i.specification}) × ${i.quantity} — ${fmt(i.lineTotal)}`,
    )
    .join("\n");
  const address = [
    order.street,
    `${order.city ?? ""}${order.region ? ", " + order.region : ""} ${order.postcode ?? ""}`.trim(),
    order.country,
  ]
    .filter(Boolean)
    .join("\n");
  const pm = (order.payment_method || "").toLowerCase();
  let walletAddress = "";
  if (pm.includes("btc") || pm.includes("bitcoin")) {
    walletAddress = "BTC: bc1qw9wyge8sp336wleanczaa6j70w57nlwvm6efnw";
  } else if (pm.includes("usdt") || pm.includes("usdc")) {
    walletAddress = `${pm.includes("usdc") ? "USDC" : "USDT"} (ERC-20): 0x804ec5D58F8B1643c0706c95e0064bBb5E970624`;
  } else if (pm.includes("middleman") || pm.includes("escrow")) {
    walletAddress = "Middleman / Escrow — reply to this email and we'll send the next steps.";
  }
  return {
    customer_name: order.customer_name,
    customer_email: order.customer_email,
    order_id: order.id.slice(0, 8).toUpperCase(),
    order_date: new Date(order.created_at).toLocaleDateString(),
    items_list: itemsList,
    subtotal: fmt(order.subtotal),
    delivery_fee: fmt(order.delivery_fee),
    processing_fee: fmt(order.processing_fee),
    total: fmt(order.total),
    address,
    payment_method: order.payment_method.toUpperCase(),
    wallet_address: walletAddress,
    shipping_region: order.shipping_region,
    tracking_number: order.tracking_number || "(not yet available)",
    status: order.status,
  };
}

export function fillTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}

export function buildMailto(
  to: string,
  subject: string,
  body: string,
): string {
  const params = new URLSearchParams({ subject, body });
  // URLSearchParams uses + for spaces; mailto needs %20
  return `mailto:${encodeURIComponent(to)}?${params.toString().replace(/\+/g, "%20")}`;
}

export const AVAILABLE_VARIABLES = [
  "{customer_name}",
  "{customer_email}",
  "{order_id}",
  "{order_date}",
  "{items_list}",
  "{subtotal}",
  "{delivery_fee}",
  "{processing_fee}",
  "{total}",
  "{address}",
  "{payment_method}",
  "{wallet_address}",
  "{shipping_region}",
  "{tracking_number}",
  "{status}",
];
