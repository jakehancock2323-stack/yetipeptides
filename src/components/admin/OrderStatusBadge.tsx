const styles: Record<string, string> = {
  new: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  awaiting_payment: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  shipped: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
};

const labels: Record<string, string> = {
  new: "New",
  awaiting_payment: "Awaiting Payment",
  paid: "Paid",
  shipped: "Shipped",
  cancelled: "Cancelled",
};

export const ORDER_STATUSES = ["new", "awaiting_payment", "paid", "shipped", "cancelled"];
export const ORDER_STATUS_LABELS = labels;

export default function OrderStatusBadge({ status }: { status: string }) {
  const cls = styles[status] || styles.new;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-medium ${cls}`}>
      {labels[status] || status}
    </span>
  );
}
