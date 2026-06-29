import AdminOrders from "./AdminOrders";

export default function AdminDomestic() {
  return (
    <AdminOrders
      lockedRegion="UK Domestic"
      title="UK Domestic Orders"
      subtitle="Royal Mail 24 — tracked, typically 2 days"
    />
  );
}
