import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Snowfall from "@/components/Snowfall";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/CartContext";
import { useRegion } from "@/contexts/RegionContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Lock, ShieldCheck, CreditCard, Package, ArrowRight, BookOpen } from "lucide-react";
import { formatGbpEstimate, GBP_DISCLAIMER } from '@/lib/currency';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart, includeEbook } = useCart();
  const { region } = useRegion();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("usdt");
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

    const requiredFields = Object.entries(formData).filter(([key]) => key !== "notes");
    for (const [key, value] of requiredFields) {
      if (!value.trim()) {
        toast.error(`Please fill in ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`);
        return;
      }
    }

    setIsSubmitting(true);

    const orderData = {
      customerDetails: formData,
      paymentMethod,
      shippingRegion: region,
      items: items.map((item) => ({
        productName: item.product.name,
        productCategory: item.product.category,
        specification: item.variant.specification,
        quantity: item.quantity,
        price: item.variant.price,
        lineTotal: item.variant.price * item.quantity,
      })),
      subtotal: calculateSubtotal(),
      deliveryFee: 65,
      discount: 0,
      promoCode: null,
      total: calculateTotal(),
      includeEbook,
    };

    try {
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

  const calculateSubtotal = () => getTotalPrice();
  const calculateTotal = () => calculateSubtotal() + 65;

  return (
    <div className="min-h-screen pb-20">
      <SEO 
        title="Secure Checkout – Yeti Peptides | Research Peptide Supplier"
        description="Complete your research peptide order with secure cryptocurrency payment. Safe, discreet worldwide shipping from UK-based supplier."
        keywords="secure peptide checkout, buy peptides online, crypto payment peptides, UK peptide supplier"
        canonical="https://yetipeptides.com/checkout"
      />
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-32">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-[hsl(var(--ice-blue))]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--ice-blue))] font-semibold">
              Secure Checkout
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--frost))] bg-clip-text text-transparent">
            Complete Your Order
          </h1>
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_380px] gap-6">
          {/* Customer Details Form */}
          <div className="frosted-glass rounded-2xl p-5 sm:p-7 glow-border">
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[hsl(var(--ice-blue))]/10 flex items-center justify-center">
                <span className="text-xs font-bold text-[hsl(var(--ice-blue))]">1</span>
              </div>
              Customer Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-xs text-muted-foreground">Full Name *</Label>
                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required className="mt-1 bg-secondary/20 border-border/30 focus:border-[hsl(var(--ice-blue))]/50" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-xs text-muted-foreground">Email *</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="mt-1 bg-secondary/20 border-border/30 focus:border-[hsl(var(--ice-blue))]/50" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-xs text-muted-foreground">Phone Number *</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required className="mt-1 bg-secondary/20 border-border/30 focus:border-[hsl(var(--ice-blue))]/50" />
                </div>
              </div>

              <div>
                <Label htmlFor="street" className="text-xs text-muted-foreground">Street Address *</Label>
                <Input id="street" name="street" value={formData.street} onChange={handleChange} required className="mt-1 bg-secondary/20 border-border/30 focus:border-[hsl(var(--ice-blue))]/50" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-xs text-muted-foreground">City *</Label>
                  <Input id="city" name="city" value={formData.city} onChange={handleChange} required className="mt-1 bg-secondary/20 border-border/30 focus:border-[hsl(var(--ice-blue))]/50" />
                </div>
                <div>
                  <Label htmlFor="region" className="text-xs text-muted-foreground">Region/State *</Label>
                  <Input id="region" name="region" value={formData.region} onChange={handleChange} required className="mt-1 bg-secondary/20 border-border/30 focus:border-[hsl(var(--ice-blue))]/50" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="postcode" className="text-xs text-muted-foreground">Postcode *</Label>
                  <Input id="postcode" name="postcode" value={formData.postcode} onChange={handleChange} required className="mt-1 bg-secondary/20 border-border/30 focus:border-[hsl(var(--ice-blue))]/50" />
                </div>
                <div>
                  <Label htmlFor="country" className="text-xs text-muted-foreground">Country *</Label>
                  <Input id="country" name="country" value={formData.country} onChange={handleChange} required className="mt-1 bg-secondary/20 border-border/30 focus:border-[hsl(var(--ice-blue))]/50" />
                </div>
              </div>

              <div>
                <Label htmlFor="notes" className="text-xs text-muted-foreground">Optional Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any special instructions..."
                  className="min-h-[80px] mt-1 bg-secondary/20 border-border/30 focus:border-[hsl(var(--ice-blue))]/50"
                />
              </div>

              {/* Payment Method */}
              <div className="pt-3">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[hsl(var(--ice-blue))]/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-[hsl(var(--ice-blue))]">2</span>
                  </div>
                  Payment Method
                </h2>

                {/* Security Badge */}
                <div className="mb-4 p-3 rounded-xl border border-[hsl(var(--ice-blue))]/15 bg-[hsl(var(--ice-blue))]/[0.03]">
                  <div className="flex items-center justify-center gap-5">
                    <div className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[hsl(var(--ice-blue))]" />
                      <span className="text-[10px] text-muted-foreground">Encrypted</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[hsl(var(--ice-blue))]" />
                      <span className="text-[10px] text-muted-foreground">Secure</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-[hsl(var(--ice-blue))]" />
                      <span className="text-[10px] text-muted-foreground">Private</span>
                    </div>
                  </div>
                </div>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
                  <label htmlFor="usdt" className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${paymentMethod === 'usdt' ? 'border-[hsl(var(--ice-blue))]/40 bg-[hsl(var(--ice-blue))]/[0.05]' : 'border-border/30 hover:border-border/60'}`}>
                    <RadioGroupItem value="usdt" id="usdt" />
                    <span className="text-sm font-medium">USDT</span>
                  </label>
                  <label htmlFor="usdc" className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${paymentMethod === 'usdc' ? 'border-[hsl(var(--ice-blue))]/40 bg-[hsl(var(--ice-blue))]/[0.05]' : 'border-border/30 hover:border-border/60'}`}>
                    <RadioGroupItem value="usdc" id="usdc" />
                    <span className="text-sm font-medium">USDC</span>
                  </label>
                  <label htmlFor="middleman" className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${paymentMethod === 'middleman' ? 'border-[hsl(var(--ice-blue))]/40 bg-[hsl(var(--ice-blue))]/[0.05]' : 'border-border/30 hover:border-border/60'}`}>
                    <RadioGroupItem value="middleman" id="middleman" />
                    <div>
                      <span className="text-sm font-medium">Middleman Service</span>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Secure third-party escrow for added protection</p>
                    </div>
                  </label>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/80 text-background font-semibold gap-2 mt-4 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--ice-blue)/0.3)]"
                size="lg"
              >
                {isSubmitting ? "Processing..." : "Place Order"}
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="frosted-glass rounded-2xl p-5 lg:sticky lg:top-32 glow-border">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Package className="w-4 h-4 text-[hsl(var(--ice-blue))]" />
                Order Summary
              </h2>

              <div className="space-y-3 mb-5 max-h-[350px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.variant.specification}`} className="flex justify-between items-start gap-2 pb-3 border-b border-border/20">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold leading-tight">{item.product.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{item.variant.specification} × {item.quantity}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-sm font-bold">${(item.variant.price * item.quantity).toFixed(2)}</span>
                      <p className="text-[9px] text-muted-foreground">{formatGbpEstimate(item.variant.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}

                {includeEbook && (
                  <div className="flex justify-between items-start gap-2 pb-3 border-b border-border/20">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3 h-3 text-[hsl(var(--ice-blue))]" />
                      <p className="text-xs font-semibold">E-book – GLP1 Series</p>
                    </div>
                    <span className="text-sm font-bold">$4.99</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-3 border-t border-border/30">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Delivery</span>
                  <span>$65.00</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-[hsl(var(--ice-blue))]/20 to-transparent my-2" />
                <div className="flex justify-between items-end">
                  <span className="text-base font-bold">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-[hsl(var(--ice-blue))]">${calculateTotal().toFixed(2)}</span>
                    <p className="text-[10px] text-muted-foreground">{formatGbpEstimate(calculateTotal())}</p>
                  </div>
                </div>
                <p className="text-[8px] text-muted-foreground mt-2">{GBP_DISCLAIMER}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
