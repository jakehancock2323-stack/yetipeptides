
-- Pin search_path on email queue helpers
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public, pg_temp;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pg_temp;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public, pg_temp;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public, pg_temp;

-- Lock down bootstrap_admin: only authenticated users may execute
REVOKE EXECUTE ON FUNCTION public.bootstrap_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.bootstrap_admin() TO authenticated;
