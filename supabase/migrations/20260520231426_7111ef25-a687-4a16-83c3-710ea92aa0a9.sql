CREATE OR REPLACE FUNCTION public.current_user_is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'::public.app_role
  )
$$;

REVOKE EXECUTE ON FUNCTION public.current_user_is_admin() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.current_user_is_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.current_user_is_admin() TO authenticated;

DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.current_user_is_admin());
CREATE POLICY "Admins manage roles"
ON public.user_roles
FOR ALL
USING (public.current_user_is_admin())
WITH CHECK (public.current_user_is_admin());

DROP POLICY IF EXISTS "Admins view orders" ON public.orders;
DROP POLICY IF EXISTS "Admins update orders" ON public.orders;
DROP POLICY IF EXISTS "Admins delete orders" ON public.orders;
CREATE POLICY "Admins view orders"
ON public.orders
FOR SELECT
USING (public.current_user_is_admin());
CREATE POLICY "Admins update orders"
ON public.orders
FOR UPDATE
USING (public.current_user_is_admin());
CREATE POLICY "Admins delete orders"
ON public.orders
FOR DELETE
USING (public.current_user_is_admin());

DROP POLICY IF EXISTS "Admins manage templates" ON public.email_templates;
CREATE POLICY "Admins manage templates"
ON public.email_templates
FOR ALL
USING (public.current_user_is_admin())
WITH CHECK (public.current_user_is_admin());

DROP POLICY IF EXISTS "Admins manage stock overrides" ON public.product_stock_overrides;
DROP POLICY IF EXISTS "Admins update stock overrides" ON public.product_stock_overrides;
DROP POLICY IF EXISTS "Admins delete stock overrides" ON public.product_stock_overrides;
CREATE POLICY "Admins manage stock overrides"
ON public.product_stock_overrides
FOR INSERT
WITH CHECK (public.current_user_is_admin());
CREATE POLICY "Admins update stock overrides"
ON public.product_stock_overrides
FOR UPDATE
USING (public.current_user_is_admin());
CREATE POLICY "Admins delete stock overrides"
ON public.product_stock_overrides
FOR DELETE
USING (public.current_user_is_admin());