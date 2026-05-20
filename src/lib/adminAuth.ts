import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

export function useAdminSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let checkId = 0;

    async function checkRole(s: Session | null) {
      const currentCheck = ++checkId;
      setSession(s);

      if (!s?.user) {
        if (!mounted || currentCheck !== checkId) return;
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      let { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", s.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const retry = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", s.user.id)
          .eq("role", "admin")
          .maybeSingle();
        data = retry.data;
        error = retry.error;
      }

      if (!mounted || currentCheck !== checkId) return;
      setIsAdmin(!error && !!data);
      setLoading(false);
    }

    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setTimeout(() => void checkRole(s), 0);
    });

    supabase.auth.getSession().then(({ data }) => {
      void checkRole(data.session);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, isAdmin, loading };
}

export async function adminSignOut() {
  await supabase.auth.signOut();
}
