
# Yeti Peptides Admin Dashboard

## What you'll get

A password-protected `/admin` area on the same site with everything needed to run orders without relying on the email inbox.

### Pages

1. **`/admin/login`** — email + password sign-in. Only accounts with the `admin` role can get in.
2. **`/admin` (Orders)** — live table of every order. Columns: date, customer, region (UK/Intl badge), total, payment method, status. Filters by status + region, search by name/email/order ID, sortable. New orders appear in realtime with a chime + toast.
3. **`/admin/orders/:id` (Order detail)** — full breakdown of one order:
   - Customer info (with copy-address button)
   - Items, quantities, totals
   - Payment method + shipping region
   - Customer's checkout notes
   - **Status dropdown** (New → Awaiting Payment → Paid → Shipped → Cancelled)
   - **Tracking number** field
   - **Your private notes** textarea (auto-saves)
   - **📧 Send Order Confirmation** button → opens Proton with To/Subject/Body filled
   - **📧 Send Payment Confirmation** button → same, different template
   - **📧 Send Shipping Update** button (bonus — uses tracking number)
4. **`/admin/stats`** — revenue today/week/month/all-time, order count, top 10 products by quantity sold, UK vs International split, pending-action count.
5. **`/admin/customers`** — search by email, see every order from that customer.
6. **`/admin/inventory`** — toggle any product in/out of stock (UK list and Intl list independently) without editing code.
7. **`/admin/templates`** — edit the email templates live. You see all available variables listed (`{customer_name}`, `{order_id}`, `{total}`, `{items_list}`, `{tracking_number}`, etc.) and just type. Saves to DB.
8. **CSV export** button on the orders page.

### How the email buttons work

Since Proton can't be automated, clicking "Send Order Confirmation" builds a `mailto:` link with:
- **To:** customer's email
- **Subject:** from your template, variables filled
- **Body:** from your template, variables filled

…and opens your default mail client. On your phone or desktop with Proton set as default, it opens Proton's compose window with everything ready — you just hit Send. It comes from your real Proton inbox.

### Default templates (editable later)

**Order Confirmation:**
> Subject: Your Yeti Peptides Order #{order_id} — Awaiting Payment
> 
> Hi {customer_name},
> 
> Thanks for your order with Yeti Peptides. Here's your summary:
> 
> Order #{order_id}
> {items_list}
> 
> Subtotal: {subtotal}
> Delivery: {delivery_fee}
> **Total: {total}**
> 
> Shipping to: {address}
> Payment method: {payment_method}
> 
> Payment instructions will follow shortly. Reply to this email if you have any questions.
> 
> — Yeti Peptides

**Payment Confirmation:**
> Subject: Payment Received — Order #{order_id}
> 
> Hi {customer_name},
> 
> Payment confirmed for order #{order_id} totalling {total}. Your order is being prepared and will ship within 24–48 hours. You'll get a tracking number once dispatched.
> 
> — Yeti Peptides

## Technical details

### Database
- `orders` table — stores every checkout submission (customer details, items JSON, totals, status, tracking, admin notes, timestamps).
- `user_roles` table + `app_role` enum (`admin`, `user`) + `has_role()` security-definer function (your standard pattern, prevents privilege escalation).
- `email_templates` table — key/subject/body, editable via admin UI.
- `product_stock_overrides` table — admin-set out-of-stock flags per product/region, overlaid on the static `products.ts` data.

### Order capture
The existing `Checkout.tsx` flow stays the same (still sends the email via `send-order-email`), and **also** inserts the order into the `orders` table. So you don't lose the email backup, and historical orders from your inbox can be manually backfilled later if you want.

### Auth & access
- Email/password auth enabled (no Google — keeps the admin lock simple).
- Auto-confirm OFF; you'll create your one admin account, verify, then manually grant the `admin` role with one SQL insert (I'll show you exactly how, one click).
- All admin routes wrapped in a `<RequireAdmin>` guard that redirects to `/admin/login` if not signed in or not an admin.
- RLS: orders are insertable by anyone (so checkout works) but only viewable/updatable by admins.

### Realtime
`orders` table added to `supabase_realtime` publication; admin orders page subscribes to INSERTs and plays a notification.

### Files I'll create/modify
- New: `src/pages/admin/{Login,Orders,OrderDetail,Stats,Customers,Inventory,Templates}.tsx`
- New: `src/components/admin/{AdminLayout,RequireAdmin,OrderStatusBadge,EmailButton}.tsx`
- New: `src/lib/emailTemplates.ts` (variable substitution helper)
- New: `src/lib/adminAuth.ts`
- Edit: `src/App.tsx` (add routes)
- Edit: `src/pages/Checkout.tsx` (insert into orders table)
- Migration: tables + RLS + role function + realtime + seed templates

## Out of scope for v1 (can add later)
- Push/email notifications when new orders arrive (you'll see them in realtime when the tab is open)
- Multi-admin role management UI (you'll grant more admins via DB if needed)
- Refund tracking / partial refunds

---

Approve this and I'll build it. Estimate: one large build cycle. After it's live you'll create your admin account, I'll show you the one-line role grant, and you're operational.
