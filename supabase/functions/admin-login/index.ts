import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ADMIN_USERNAME = Deno.env.get("ADMIN_USERNAME") ?? "";
const ADMIN_PASSWORD = Deno.env.get("ADMIN_PASSWORD") ?? "";
const ADMIN_EMAIL = "yeti@yetipeptides.admin";

// Constant-time string comparison
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: "Admin credentials not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { username, password } = await req.json();
    if (typeof username !== "string" || typeof password !== "string") {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const userOk = safeEqual(username.trim().toLowerCase(), ADMIN_USERNAME.trim().toLowerCase());
    const passOk = safeEqual(password, ADMIN_PASSWORD);
    if (!userOk || !passOk) {
      // Small delay to slow brute force
      await new Promise((r) => setTimeout(r, 400));
      return new Response(JSON.stringify({ error: "Invalid username or password" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Ensure the Supabase auth user exists with the current ADMIN_PASSWORD.
    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Try to find the user by email via listUsers (paginated). Use a simple loop.
    let existingId: string | null = null;
    for (let page = 1; page <= 5 && !existingId; page++) {
      const { data } = await admin.auth.admin.listUsers({ page, perPage: 200 });
      const found = data?.users?.find((u: any) => u.email?.toLowerCase() === ADMIN_EMAIL);
      if (found) existingId = found.id;
      if (!data?.users?.length || data.users.length < 200) break;
    }

    if (existingId) {
      // Sync password to current secret so server-side signin always works
      await admin.auth.admin.updateUserById(existingId, {
        password: ADMIN_PASSWORD,
        email_confirm: true,
      });
    } else {
      const { error: createErr } = await admin.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        email_confirm: true,
      });
      if (createErr) {
        return new Response(JSON.stringify({ error: createErr.message }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    // Issue a session via password sign-in server-side
    const anon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data: signIn, error: signErr } = await anon.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });
    if (signErr || !signIn?.session) {
      return new Response(JSON.stringify({ error: signErr?.message ?? "Sign in failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    return new Response(
      JSON.stringify({
        access_token: signIn.session.access_token,
        refresh_token: signIn.session.refresh_token,
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } },
    );
  } catch (err: any) {
    console.error("admin-login error:", err);
    return new Response(JSON.stringify({ error: err.message ?? "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
