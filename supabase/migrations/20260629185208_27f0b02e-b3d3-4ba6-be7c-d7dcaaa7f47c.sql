
-- Link orders to user accounts for order history
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS orders_user_id_idx ON public.orders(user_id);

-- Allow authenticated customers to view their own orders only
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
CREATE POLICY "Users can view their own orders"
  ON public.orders FOR SELECT
  TO authenticated
  USING (user_id IS NOT NULL AND user_id = auth.uid());

-- Allow authenticated users to attach their user_id to an order they create (insert policy already allows anon)
DROP POLICY IF EXISTS "Authenticated users can insert their own orders" ON public.orders;
CREATE POLICY "Authenticated users can insert their own orders"
  ON public.orders FOR INSERT
  TO authenticated
  WITH CHECK (user_id IS NULL OR user_id = auth.uid());
