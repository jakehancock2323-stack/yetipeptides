import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Snowfall from "@/components/Snowfall";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Lock, ShieldCheck, CreditCard } from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart, includeEbook } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("btc");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    region: "",
    postcode: "",
    country: "",
    notes: "",
  });

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Basic validation (exclude optional notes field)
    const requiredFields = Object.entries(formData).filter(([key]) => key !== "notes");
    for (const [key, value] of requiredFields) {
      if (!value.trim()) {
        toast.error(`Please fill in ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`);
        return;
      }
    }

    setIsSubmitting(true);

    // Prepare order data
    const orderData = {
      customerDetails: formData,
      paymentMethod,
      items: items.map((item) => ({
        productName: item.product.name,
        productCategory: item.product.category,
        specification: item.variant.specification,
        quantity: item.quantity,
        price: item.variant.price,
        lineTotal: item.variant.price * item.quantity,
      })),
      subtotal: getTotalPrice(),
      deliveryFee: 65,
      total: getTotalPrice() + 65,
      includeEbook,
    };

    try {
      // Call the edge function to send email
      const { error } = await supabase.functions.invoke("send-order-email", {
        body: orderData,
      });

      if (error) {
        console.error("Error sending order email:", error);
        toast.error("Order placed but email notification failed. We have your details.");
      } else {
        toast.success("Order submitted! Check your email for payment instructions.");
      }

      clearCart();
      navigate("/order-success", { state: { orderData } });
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("There was an error processing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen pb-20">
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-32">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--frost))] bg-clip-text text-transparent">
          Checkout
        </h1>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Customer Details Form */}
          <div className="frosted-glass rounded-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">Customer Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="street">Street Address *</Label>
                <Input id="street" name="street" value={formData.street} onChange={handleChange} required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="region">Region/State *</Label>
                  <Input id="region" name="region" value={formData.region} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="postcode">Postcode *</Label>
                  <Input id="postcode" name="postcode" value={formData.postcode} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Optional Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any special instructions or notes for your order..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="pt-4">
                <Label className="text-lg mb-3 block">Payment Method *</Label>

                {/* Security Badges */}
                <div className="mb-4 p-4 rounded-lg border border-[hsl(var(--ice-blue))]/30 bg-card/50">
                  <div className="flex items-center justify-center gap-6 mb-3">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[hsl(var(--ice-blue))]" />
                      <span className="text-xs text-muted-foreground">Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[hsl(var(--ice-blue))]" />
                      <span className="text-xs text-muted-foreground">Safe & Private</span>
                    </div>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">Your information is encrypted and secure</p>
                </div>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="btc" id="btc" />
                    <Label htmlFor="btc" className="cursor-pointer">
                      Bitcoin (BTC)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="usdt" id="usdt" />
                    <Label htmlFor="usdt" className="cursor-pointer">
                      USDT
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="usdc" id="usdc" />
                    <Label htmlFor="usdc" className="cursor-pointer">
                      USDC
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/90 text-background"
                size="lg"
              >
                {isSubmitting ? "Processing Order..." : "Place Order"}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="frosted-glass rounded-lg p-4 sm:p-6 md:sticky md:top-32">
              <h2 className="text-xl sm:text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.variant.specification}`} className="border-b border-border pb-4">
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold">{item.product.name}</span>
                      <span>${(item.variant.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.variant.specification} × {item.quantity}
                    </div>
                  </div>
                ))}

                {includeEbook && (
                  <div className="border-b border-border pb-4">
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold">Yeti's E-book – The GLP1 Series</span>
                      <span>$4.99</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Digital Guide × 1</div>
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-4 border-t border-border">
                <div className="flex justify-between text-lg">
                  <span>Subtotal:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Delivery:</span>
                  <span>$65.00</span>
                </div>
                <div className="flex justify-between text-2xl font-bold pt-2 border-t border-border mt-2">
                  <span>Total:</span>
                  <span className="text-[hsl(var(--ice-blue))]">${(getTotalPrice() + 65).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
