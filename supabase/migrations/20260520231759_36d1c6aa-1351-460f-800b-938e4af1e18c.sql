DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;

CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins manage roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins view orders" ON public.orders;
DROP POLICY IF EXISTS "Admins update orders" ON public.orders;
DROP POLICY IF EXISTS "Admins delete orders" ON public.orders;
CREATE POLICY "Admins view orders"
ON public.orders
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins update orders"
ON public.orders
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins delete orders"
ON public.orders
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins manage templates" ON public.email_templates;
CREATE POLICY "Admins manage templates"
ON public.email_templates
FOR ALL
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins manage stock overrides" ON public.product_stock_overrides;
DROP POLICY IF EXISTS "Admins update stock overrides" ON public.product_stock_overrides;
DROP POLICY IF EXISTS "Admins delete stock overrides" ON public.product_stock_overrides;
CREATE POLICY "Admins manage stock overrides"
ON public.product_stock_overrides
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins update stock overrides"
ON public.product_stock_overrides
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins delete stock overrides"
ON public.product_stock_overrides
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP FUNCTION IF EXISTS public.current_user_is_admin();