import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const resendApiKey = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Change this to your verified Resend sender once your domain is verified.
// While you're using the Resend sandbox, you can only email the address that
// owns the Resend account. To email real customers, verify yetipeptides.com
// in Resend and keep this set to an address on that domain.
const FROM_ADDRESS = "Yeti Peptides <yetipeptides@protonmail.com>";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SendRequest {
  to: string;
  subject: string;
  body: string; // plain text
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require an authenticated admin user. This function is only ever called
    // from the admin panel (AdminOrderDetail), so non-admin callers should be
    // rejected to prevent the endpoint being used as an open email relay.
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    const token = authHeader.replace("Bearer ", "");
    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser(token);
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: roleRow } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    const { to, subject, body }: SendRequest = await req.json();
    if (!to || !subject || !body) {
      return new Response(
        JSON.stringify({ error: "Missing to / subject / body" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    const html = `<!DOCTYPE html>
<html><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #222; max-width: 640px; margin: 0 auto; padding: 24px; background:#ffffff;">
<div style="white-space: pre-wrap; font-size: 15px;">${escapeHtml(body)}</div>
<hr style="border:none; border-top:1px solid #e5e7eb; margin: 32px 0 16px;">
<p style="color:#888; font-size:12px;">Yeti Peptides &middot; Research Use Only</p>
</body></html>`;

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [to],
        subject,
        html,
        text: body,
        reply_to: "yetipeptides@protonmail.com",
      }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      console.error("Resend error:", data);
      return new Response(
        JSON.stringify({ error: data?.message || "Resend send failed", details: data }),
        { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    return new Response(JSON.stringify({ success: true, id: data?.id }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("send-customer-email error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
