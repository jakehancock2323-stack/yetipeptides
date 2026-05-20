-- Remove orders table from realtime publication to prevent PII broadcasts
ALTER PUBLICATION supabase_realtime DROP TABLE public.orders;

-- Lock down bootstrap_admin: admin already exists, no one else should call it.
-- Revoke execute from anon and authenticated roles.
REVOKE EXECUTE ON FUNCTION public.bootstrap_admin() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.bootstrap_admin() FROM anon;
REVOKE EXECUTE ON FUNCTION public.bootstrap_admin() FROM authenticated;