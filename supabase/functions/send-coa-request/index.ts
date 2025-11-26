import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const resendApiKey = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface COARequest {
  name: string;
  email: string;
  product: string;
  batchNumber?: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: COARequest = await req.json();
    console.log("Received COA request:", requestData);

    const { name, email, product, batchNumber, message } = requestData;

    const emailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>COA Request - Yeti Peptides</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1a2332 0%, #0d1520 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: #47d9d9; margin: 0; font-size: 28px;">📄 Certificate of Analysis Request</h1>
            <p style="color: #b0c4de; margin: 10px 0 0 0;">Yeti Peptides</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #1a2332; border-bottom: 2px solid #47d9d9; padding-bottom: 10px;">Request Details</h2>
            <table style="width: 100%; margin-bottom: 30px;">
              <tr>
                <td style="padding: 8px 0;"><strong>Name:</strong></td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Email:</strong></td>
                <td style="padding: 8px 0;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Product:</strong></td>
                <td style="padding: 8px 0; font-weight: 600; color: #47d9d9;">${product}</td>
              </tr>
              ${batchNumber ? `
              <tr>
                <td style="padding: 8px 0;"><strong>Batch Number:</strong></td>
                <td style="padding: 8px 0;">${batchNumber}</td>
              </tr>
              ` : ''}
              ${message ? `
              <tr>
                <td style="padding: 8px 0; vertical-align: top;"><strong>Additional Information:</strong></td>
                <td style="padding: 8px 0; background: #fff; padding: 12px; border-radius: 4px; border-left: 3px solid #47d9d9;">${message}</td>
              </tr>
              ` : ''}
            </table>

            <p style="margin-top: 30px; padding: 20px; background: #d4edda; border-left: 4px solid #28a745; border-radius: 4px;">
              <strong>✅ Action Required:</strong> Please send the COA for <strong>${product}</strong> to <strong>${email}</strong>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
            <p>Yeti Peptides - Premium Research Peptides</p>
            <p>This is an automated COA request notification</p>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Yeti Peptides <onboarding@resend.dev>",
        to: ["yetipeptides@protonmail.com"],
        subject: `📄 COA Request: ${product} - ${name}`,
        html: emailHTML,
      }),
    });

    const emailResponseData = await emailResponse.json();
    console.log("COA request email sent successfully:", emailResponseData);

    return new Response(JSON.stringify({ success: true, emailResponse: emailResponseData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-coa-request function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
