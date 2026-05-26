import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { imageBase64, mimeType } = await req.json();
    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "imageBase64 required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const dataUrl = `data:${mimeType || "image/png"};base64,${imageBase64}`;

    const tool = {
      type: "function",
      function: {
        name: "extract_order",
        description: "Extract order details from a screenshot of an order email or message.",
        parameters: {
          type: "object",
          properties: {
            customer_name: { type: "string" },
            customer_email: { type: "string" },
            customer_phone: { type: "string" },
            street: { type: "string" },
            city: { type: "string" },
            region: { type: "string", description: "State, province, or county" },
            postcode: { type: "string" },
            country: { type: "string" },
            shipping_region: {
              type: "string",
              enum: ["UK Domestic", "International"],
              description: "UK Domestic if country is United Kingdom / UK, else International",
            },
            currency: { type: "string", enum: ["USD", "GBP"] },
            payment_method: {
              type: "string",
              enum: ["usdt", "usdc", "btc", "bank", "other"],
            },
            customer_notes: { type: "string" },
            delivery_fee: { type: "number" },
            processing_fee: { type: "number" },
            discount: { type: "number" },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productName: { type: "string" },
                  productCategory: { type: "string" },
                  specification: { type: "string", description: "Variant or strength e.g. 10mg, 600mg x10 vials" },
                  quantity: { type: "number" },
                  price: { type: "number", description: "Unit price in the order's currency" },
                },
                required: ["productName", "quantity", "price"],
                additionalProperties: false,
              },
            },
          },
          required: ["customer_name", "customer_email", "items"],
          additionalProperties: false,
        },
      },
    };

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          {
            role: "system",
            content:
              "You extract structured order data from screenshots of order confirmation emails for Yeti Peptides. Read all visible text carefully. If a field is not visible, omit it. Always include the items list with unit price and quantity. UK Domestic uses GBP & bank transfer; International uses USD & crypto (usdt/usdc/btc). Default delivery_fee is 65 if not clearly shown.",
          },
          {
            role: "user",
            content: [
              { type: "text", text: "Extract this order." },
              { type: "image_url", image_url: { url: dataUrl } },
            ],
          },
        ],
        tools: [tool],
        tool_choice: { type: "function", function: { name: "extract_order" } },
      }),
    });

    if (!aiResp.ok) {
      const txt = await aiResp.text();
      console.error("AI gateway error:", aiResp.status, txt);
      if (aiResp.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResp.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Add funds in Workspace settings." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI gateway failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiResp.json();
    const call = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!call) {
      return new Response(JSON.stringify({ error: "AI returned no structured data" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const parsed = JSON.parse(call.function.arguments);
    return new Response(JSON.stringify({ order: parsed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("parse-order-screenshot error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
