import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const resendApiKey = Deno.env.get("RESEND_API_KEY");

// Change this to your verified Resend sender once your domain is verified.
// While you're using the Resend sandbox, you can only email the address that
// owns the Resend account. To email real customers, verify yetipeptides.com
// in Resend and keep this set to an address on that domain.
const FROM_ADDRESS = "Yeti Peptides <orders@yetipeptides.com>";

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
