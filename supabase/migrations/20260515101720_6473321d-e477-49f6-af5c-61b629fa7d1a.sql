
-- ===== Roles =====
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ===== Updated-at trigger function =====
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ===== Orders =====
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Customer
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  street TEXT,
  city TEXT,
  region TEXT,
  postcode TEXT,
  country TEXT,
  customer_notes TEXT,
  -- Order
  shipping_region TEXT NOT NULL DEFAULT 'International',
  payment_method TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  include_ebook BOOLEAN NOT NULL DEFAULT false,
  subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
  delivery_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
  processing_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
  discount NUMERIC(10,2) NOT NULL DEFAULT 0,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  -- Admin
  status TEXT NOT NULL DEFAULT 'new',
  tracking_number TEXT,
  admin_notes TEXT,
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert orders" ON public.orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins view orders" ON public.orders
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update orders" ON public.orders
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete orders" ON public.orders
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_orders_created_at ON public.orders (created_at DESC);
CREATE INDEX idx_orders_status ON public.orders (status);
CREATE INDEX idx_orders_email ON public.orders (customer_email);

CREATE TRIGGER trg_orders_updated
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER TABLE public.orders REPLICA IDENTITY FULL;

-- ===== Email Templates =====
CREATE TABLE public.email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_key TEXT NOT NULL UNIQUE,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage templates" ON public.email_templates
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_email_templates_updated
BEFORE UPDATE ON public.email_templates
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.email_templates (template_key, subject, body) VALUES
('order_confirmation',
 'Your Yeti Peptides Order #{order_id} — Awaiting Payment',
$$Hi {customer_name},

Thanks for your order with Yeti Peptides. Here's your summary:

Order #{order_id}
Date: {order_date}

{items_list}

Subtotal: {subtotal}
Delivery: {delivery_fee}
Total: {total}

Shipping to:
{address}

Payment method: {payment_method}

Payment instructions will follow shortly. Please reply to this email if you have any questions.

— Yeti Peptides
Research Use Only$$),
('payment_confirmation',
 'Payment Received — Order #{order_id}',
$$Hi {customer_name},

We've received your payment for order #{order_id} totalling {total}.

Your order is being prepared and will ship within 24–48 hours. You'll receive a tracking number once dispatched.

Thanks for choosing Yeti Peptides.

— Yeti Peptides
Research Use Only$$),
('shipping_update',
 'Your Yeti Peptides Order #{order_id} Has Shipped',
$$Hi {customer_name},

Good news — your order #{order_id} has been dispatched.

Tracking number: {tracking_number}
Track your shipment: https://yetipeptides.com/track-order

Items shipped:
{items_list}

— Yeti Peptides
Research Use Only$$);

-- ===== Stock Overrides =====
CREATE TABLE public.product_stock_overrides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL,
  variant_specification TEXT,
  out_of_stock BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (product_id, variant_specification)
);

ALTER TABLE public.product_stock_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view stock overrides" ON public.product_stock_overrides
  FOR SELECT USING (true);

CREATE POLICY "Admins manage stock overrides" ON public.product_stock_overrides
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update stock overrides" ON public.product_stock_overrides
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete stock overrides" ON public.product_stock_overrides
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_stock_overrides_updated
BEFORE UPDATE ON public.product_stock_overrides
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
