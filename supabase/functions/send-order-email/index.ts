import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const resendApiKey = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  productName: string;
  productCategory: string;
  specification: string;
  quantity: number;
  price: number;
  lineTotal: number;
}

interface OrderEmailRequest {
  customerDetails: {
    fullName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    region: string;
    postcode: string;
    country: string;
  };
  paymentMethod: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const orderData: OrderEmailRequest = await req.json();
    console.log("Received order data:", orderData);

    const { customerDetails, paymentMethod, items, subtotal, deliveryFee, total } = orderData;

    // Build order items HTML
    const itemsHTML = items.map(item => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px;">${item.productName}</td>
        <td style="padding: 12px; color: #666;">${item.productCategory}</td>
        <td style="padding: 12px;">${item.specification}</td>
        <td style="padding: 12px; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; text-align: right;">$${item.price.toFixed(2)}</td>
        <td style="padding: 12px; text-align: right; font-weight: 600;">$${item.lineTotal.toFixed(2)}</td>
      </tr>
    `).join('');

    const emailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Order - Yeti Peptides</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1a2332 0%, #0d1520 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: #47d9d9; margin: 0; font-size: 28px;">🎉 New Order Received!</h1>
            <p style="color: #b0c4de; margin: 10px 0 0 0;">Yeti Peptides</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #1a2332; border-bottom: 2px solid #47d9d9; padding-bottom: 10px;">Customer Details</h2>
            <table style="width: 100%; margin-bottom: 30px;">
              <tr>
                <td style="padding: 8px 0;"><strong>Name:</strong></td>
                <td style="padding: 8px 0;">${customerDetails.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Email:</strong></td>
                <td style="padding: 8px 0;">${customerDetails.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0;">${customerDetails.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; vertical-align: top;"><strong>Address:</strong></td>
                <td style="padding: 8px 0;">
                  ${customerDetails.street}<br>
                  ${customerDetails.city}, ${customerDetails.region} ${customerDetails.postcode}<br>
                  ${customerDetails.country}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Payment Method:</strong></td>
                <td style="padding: 8px 0;">${paymentMethod.toUpperCase()}</td>
              </tr>
            </table>

            <h2 style="color: #1a2332; border-bottom: 2px solid #47d9d9; padding-bottom: 10px;">Order Items</h2>
            <table style="width: 100%; border-collapse: collapse; background: white; margin-bottom: 30px; border-radius: 8px; overflow: hidden;">
              <thead>
                <tr style="background: #1a2332; color: white;">
                  <th style="padding: 12px; text-align: left;">Product</th>
                  <th style="padding: 12px; text-align: left;">Category</th>
                  <th style="padding: 12px; text-align: left;">Specification</th>
                  <th style="padding: 12px; text-align: center;">Qty</th>
                  <th style="padding: 12px; text-align: right;">Price</th>
                  <th style="padding: 12px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>

            <div style="background: white; padding: 20px; border-radius: 8px; border: 2px solid #47d9d9;">
              <table style="width: 100%;">
                <tr>
                  <td style="padding: 8px 0; font-size: 16px;"><strong>Subtotal:</strong></td>
                  <td style="padding: 8px 0; text-align: right; font-size: 16px;">$${subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 16px;"><strong>Delivery Fee:</strong></td>
                  <td style="padding: 8px 0; text-align: right; font-size: 16px;">$${deliveryFee.toFixed(2)}</td>
                </tr>
                <tr style="border-top: 2px solid #47d9d9;">
                  <td style="padding: 12px 0; font-size: 20px; color: #47d9d9;"><strong>TOTAL:</strong></td>
                  <td style="padding: 12px 0; text-align: right; font-size: 24px; color: #47d9d9; font-weight: bold;">$${total.toFixed(2)}</td>
                </tr>
              </table>
            </div>

            <p style="margin-top: 30px; padding: 20px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
              <strong>⚠️ Action Required:</strong> Review this order and send payment instructions to <strong>${customerDetails.email}</strong>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
            <p>Yeti Peptides - Premium Research Peptides</p>
            <p>This is an automated order notification</p>
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
        subject: `🧪 New Order from ${customerDetails.fullName} - $${total.toFixed(2)}`,
        html: emailHTML,
      }),
    });

    const emailResponseData = await emailResponse.json();
    console.log("Email sent successfully:", emailResponseData);

    return new Response(JSON.stringify({ success: true, emailResponse: emailResponseData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-order-email function:", error);
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
