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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCart } from "@/contexts/CartContext";
import { useRegion } from "@/contexts/RegionContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Lock, ShieldCheck, CreditCard, Package, ArrowRight, ArrowLeft, BookOpen, Check, AlertTriangle } from "lucide-react";
import { formatGbpEstimate, GBP_DISCLAIMER } from '@/lib/currency';
import { getProductRegion, hasMixedProductRegions } from '@/lib/cartRegion';
import type { Json } from '@/integrations/supabase/types';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart, includeEbook } = useCart();
  const { region } = useRegion();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("usdt");
  const [ukShippingMethod, setUkShippingMethod] = useState<"royal-mail" | "inpost">("royal-mail");
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
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

  const validateDetails = () => {
    const requiredFields = Object.entries(formData).filter(([key]) => key !== "notes");
    for (const [key, value] of requiredFields) {
      if (!value.trim()) {
        toast.error(`Please fill in ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`);
        return false;
      }
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (ukOrdersOnHold) {
      toast.error("UK domestic orders are temporarily on hold. We'll be back on the 29th.");
      return;
    }
    if (intlOrdersOnHold) {
      toast.error("International orders are temporarily on hold. We'll be back on the 29th.");
      return;
    }
    if (!validateDetails()) return;
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const mixedRegionCart = hasMixedProductRegions(items);
  const allItemsUKDomestic = items.length > 0 && items.every(item => getProductRegion(item.product) === 'UK Domestic');
  // Force UK Domestic pricing/currency whenever every item is UK-only,
  // regardless of the global region toggle.
  const isUK = allItemsUKDomestic;
  const effectiveRegion = allItemsUKDomestic ? 'UK Domestic' : 'International';
  const deliveryFee = isUK ? (ukShippingMethod === 'royal-mail' ? 6 : 0) : 65;
  const currencySymbol = isUK ? '£' : '$';
  const shippingMethodLabel = isUK
    ? (ukShippingMethod === 'royal-mail' ? 'Royal Mail 24 Tracked' : 'InPost Locker (Anonymous)')
    : 'International Shipping';

  // Temporary holds. Both resume on the 29th of this month.
  const UK_DOMESTIC_HOLD = true;
  const INTERNATIONAL_HOLD = true;
  const ukOrdersOnHold = UK_DOMESTIC_HOLD && isUK;
  const intlOrdersOnHold = INTERNATIONAL_HOLD && !isUK;
  const ordersOnHold = ukOrdersOnHold || intlOrdersOnHold;

  // Safety: if PayPal or Bank Transfer is still selected (removed options), reset
  if (paymentMethod === 'paypal' || paymentMethod === 'bank') {
    setPaymentMethod('usdt');
  }

  const handlePlaceOrder = async () => {
    if (isSubmitting) return;
    if (ukOrdersOnHold) {
      toast.error("UK domestic orders are temporarily on hold. We'll be back on the 29th.");
      setConfirmOpen(false);
      return;
    }
    if (intlOrdersOnHold) {
      toast.error("International orders are temporarily on hold. We'll be back on the 29th.");
      setConfirmOpen(false);
      return;
    }
    if (mixedRegionCart) {
      toast.error("Domestic and international items can't be ordered together. Please remove one region before checkout.");
      setConfirmOpen(false);
      return;
    }

    setConfirmOpen(false);
    setIsSubmitting(true);

    const orderData = {
      customerDetails: formData,
      paymentMethod,
      shippingRegion: effectiveRegion,
      shippingMethod: shippingMethodLabel,
      items: items.map((item) => ({
        productName: item.product.preOrder ? `${item.product.name} (PRE-ORDER)` : item.product.name,
        productCategory: item.product.category,
        specification: item.variant.specification,
        quantity: item.quantity,
        price: item.variant.price,
        lineTotal: item.variant.price * item.quantity,
      })),
      subtotal: calculateSubtotal(),
      deliveryFee,
      processingFee: btcFee,
      discount: promoDiscount,
      promoCode: appliedPromo,
      total: calculateTotal(),
      includeEbook,
    };

    // Single ID shared between DB row + both emails so admin can match by Order #
    const orderUuid = crypto.randomUUID();
    const orderId = orderUuid.split('-')[0].toUpperCase();

    try {
      // Save to admin orders DB (independent of email; failures don't block checkout)
      try {
        await supabase.from("orders").insert({
          id: orderUuid,
          customer_name: formData.fullName,
          customer_email: formData.email,
          customer_phone: formData.phone,
          street: formData.street,
          city: formData.city,
          region: formData.region,
          postcode: formData.postcode,
          country: formData.country,
          customer_notes: [isUK ? `Shipping: ${shippingMethodLabel}` : null, formData.notes].filter(Boolean).join(' | ') || null,
          shipping_region: effectiveRegion,
          payment_method: paymentMethod,
          items: orderData.items as unknown as Json,
          include_ebook: includeEbook,
          subtotal: orderData.subtotal,
          delivery_fee: orderData.deliveryFee,
          processing_fee: orderData.processingFee,
          discount: promoDiscount,
          total: orderData.total,
          currency: isUK ? "GBP" : "USD",
          status: "new",
        });
      } catch (dbErr) {
        console.error("Failed to save order to DB:", dbErr);
      }

      const { error } = await supabase.functions.invoke("send-order-email", {
        body: { ...orderData, orderId },
      });

      if (error) {
        console.error("Error sending order email:", error);
        toast.error("Order placed but email notification failed. We have your details.");
      } else {
        toast.success("Order submitted! Check your email for payment instructions.");
      }

      // Customer-facing branded order confirmation (sent for all regions — UK domestic is crypto-only now)
      try {
        const pm = paymentMethod.toLowerCase();
        const paymentLabels: Record<string, string> = {
          usdt: 'USDT (ERC-20)',
          usdc: 'USDC (ERC-20)',
          btc: 'Bitcoin (BTC)',
          bank: 'Bank Transfer',
          middleman: 'Middleman / Escrow',
        };
        let walletAddress = '';
        let paymentInstructions = '';
        if (pm.includes('btc') || pm.includes('bitcoin')) {
          walletAddress = 'BTC: bc1qw9wyge8sp336wleanczaa6j70w57nlwvm6efnw';
          paymentInstructions = 'Send the exact total above in BTC to the address. Reply to this email with your transaction hash (TXID) once sent.';
        } else if (pm.includes('usdc')) {
          walletAddress = 'USDC (ERC-20): 0x804ec5D58F8B1643c0706c95e0064bBb5E970624';
          paymentInstructions = 'Send the exact total in USDC on the ERC-20 (Ethereum) network. Reply to this email with your transaction hash (TXID) once sent.';
        } else if (pm.includes('usdt')) {
          walletAddress = 'USDT (ERC-20): 0x804ec5D58F8B1643c0706c95e0064bBb5E970624';
          paymentInstructions = 'Send the exact total in USDT on the ERC-20 (Ethereum) network. Reply to this email with your transaction hash (TXID) once sent.';
        } else if (pm.includes('middleman') || pm.includes('escrow')) {
          paymentInstructions = "You've selected Middleman / Escrow. Reply to this email and we'll send the next steps for using PayPal or CashApp via our trusted middleman.";
        } else if (pm.includes('bank')) {
          paymentInstructions = "You've selected Bank Transfer. Reply to this email and we'll send the bank details for your region.";
        }

        const shippingAddress = [
          formData.street,
          `${formData.city || ''}${formData.region ? ', ' + formData.region : ''} ${formData.postcode || ''}`.trim(),
          formData.country,
        ].filter(Boolean).join('\n');

        await supabase.functions.invoke('send-transactional-email', {
          body: {
            templateName: 'order-confirmation',
            recipientEmail: formData.email,
            idempotencyKey: `order-confirm-${orderId}`,
            templateData: {
              orderId,
              orderDate: new Date().toLocaleDateString(),
              customerName: formData.fullName?.split(' ')[0] || '',
              items: orderData.items.map((i) => ({
                name: i.productName,
                variant: i.specification,
                quantity: i.quantity,
                price: i.price,
              })),
              subtotal: orderData.subtotal,
              shipping: orderData.deliveryFee,
              processingFee: orderData.processingFee,
              discount: orderData.discount,
              total: orderData.total,
              currency: isUK ? 'GBP' : 'USD',
              paymentMethod: paymentLabels[paymentMethod] || paymentMethod,
              walletAddress,
              paymentInstructions,
              shippingAddress,
            },
          },
        });
      } catch (custErr) {
        console.error('Customer confirmation email failed:', custErr);
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
  const iceElixirSubtotal = items
    .filter(i => i.product.id === 'frostskin-serum')
    .reduce((sum, i) => sum + i.variant.price * i.quantity, 0);
  const promoDiscount = appliedPromo === 'HAIRYYETI' ? +(iceElixirSubtotal * 0.07).toFixed(2) : 0;
  const btcFee = paymentMethod === 'btc' ? (calculateSubtotal() + deliveryFee - promoDiscount) * 0.04 : 0;
  const calculateTotal = () => calculateSubtotal() + deliveryFee + btcFee - promoDiscount;

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (code !== 'HAIRYYETI') {
      toast.error('Invalid promo code');
      return;
    }
    if (iceElixirSubtotal <= 0) {
      toast.error('HAIRYYETI only applies to Ice Elixir');
      return;
    }
    setAppliedPromo('HAIRYYETI');
    toast.success('Promo applied — 7% off Ice Elixir');
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoInput('');
  };

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
        <div className="text-center mb-8">
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

        {/* Step Indicator */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= 1 ? 'bg-[hsl(var(--ice-blue))] text-background' : 'bg-secondary/30 text-muted-foreground'}`}>
                {step > 1 ? <Check className="w-4 h-4" /> : "1"}
              </div>
              <span className={`text-xs font-medium ${step >= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>Details</span>
            </div>
            <div className={`h-px flex-1 transition-all ${step >= 2 ? 'bg-[hsl(var(--ice-blue))]' : 'bg-border/40'}`} />
            <div className="flex items-center gap-2 flex-1 justify-end">
              <span className={`text-xs font-medium ${step >= 2 ? 'text-foreground' : 'text-muted-foreground'}`}>Payment</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= 2 ? 'bg-[hsl(var(--ice-blue))] text-background' : 'bg-secondary/30 text-muted-foreground'}`}>
                2
              </div>
            </div>
          </div>
        </div>

        {ukOrdersOnHold && (
          <div className="max-w-2xl mx-auto mb-6">
            <div className="frosted-glass rounded-2xl p-6 sm:p-8 glow-border border border-[hsl(var(--ice-blue))]/30 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(var(--ice-blue))]/10 mb-4">
                <AlertTriangle className="w-6 h-6 text-[hsl(var(--ice-blue))]" />
              </div>
              <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--frost))] bg-clip-text text-transparent">
                UK Domestic Orders Temporarily On Hold
              </h2>
              <p className="text-sm text-foreground/80 mb-4">
                We're not accepting UK domestic orders at the moment. Domestic orders will resume on the <span className="font-semibold text-foreground">29th of this month</span>.
              </p>
              <p className="text-xs text-muted-foreground mb-5">
                International orders are unaffected and continue to ship as normal.
              </p>
              <Button
                onClick={() => navigate('/products')}
                className="bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/80 text-background font-semibold"
              >
                Back to Products
              </Button>
            </div>
          </div>
        )}

        {!ukOrdersOnHold && step === 1 && (
          <div className="max-w-2xl mx-auto">
            <div className="frosted-glass rounded-2xl p-5 sm:p-7 glow-border">
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[hsl(var(--ice-blue))]/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-[hsl(var(--ice-blue))]">1</span>
                </div>
                Customer Details
              </h2>
              <form onSubmit={handleContinue} className="space-y-4">
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

                <Button
                  type="submit"
                  className="w-full bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/80 text-background font-semibold gap-2 mt-2 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--ice-blue)/0.3)]"
                  size="lg"
                >
                  Continue to Payment
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        )}

        {!ukOrdersOnHold && step === 2 && (
          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_380px] gap-6">
            {/* Payment Method */}
            <div className="frosted-glass rounded-2xl p-5 sm:p-7 glow-border">
              {isUK && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Package className="w-4 h-4 text-[hsl(var(--ice-blue))]" />
                    Shipping Method
                  </h2>
                  <RadioGroup
                    value={ukShippingMethod}
                    onValueChange={(v) => setUkShippingMethod(v as "royal-mail" | "inpost")}
                    className="space-y-2"
                  >
                    <label htmlFor="royal-mail" className={`flex items-center justify-between gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${ukShippingMethod === 'royal-mail' ? 'border-[hsl(var(--ice-blue))]/40 bg-[hsl(var(--ice-blue))]/[0.05]' : 'border-border/30 hover:border-border/60'}`}>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="royal-mail" id="royal-mail" />
                        <div>
                          <span className="text-sm font-medium">Royal Mail 24 Tracked</span>
                          <p className="text-[10px] text-muted-foreground mt-0.5">Next-day tracked delivery to your address</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold">£6.00</span>
                    </label>
                    <label htmlFor="inpost" className={`flex items-center justify-between gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${ukShippingMethod === 'inpost' ? 'border-[hsl(var(--ice-blue))]/40 bg-[hsl(var(--ice-blue))]/[0.05]' : 'border-border/30 hover:border-border/60'}`}>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="inpost" id="inpost" />
                        <div>
                          <span className="text-sm font-medium">InPost Locker</span>
                          <p className="text-[10px] text-muted-foreground mt-0.5">More anonymous — set up your InPost QR code and email it to us. Delivery fee paid separately via InPost.</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-[hsl(var(--ice-blue))]">Paid separately</span>
                    </label>
                  </RadioGroup>
                </div>
              )}

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
                <label htmlFor="btc" className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${paymentMethod === 'btc' ? 'border-[hsl(var(--ice-blue))]/40 bg-[hsl(var(--ice-blue))]/[0.05]' : 'border-border/30 hover:border-border/60'}`}>
                  <RadioGroupItem value="btc" id="btc" />
                  <div>
                    <span className="text-sm font-medium">BTC (Bitcoin)</span>
                    <p className="text-[10px] text-muted-foreground mt-0.5">A 4% processing fee applies to all Bitcoin payments</p>
                  </div>
                </label>
              </RadioGroup>

              {/* Final Confirmation Notice */}
              <div className="mt-5 p-3 rounded-xl border border-amber-500/20 bg-amber-500/[0.04] flex gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Pressing <span className="font-semibold text-foreground">Place Order</span> will submit your order. You'll be asked to confirm before it's sent.
                </p>
              </div>

              <div className="flex gap-3 mt-5">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => { setStep(1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="gap-2 border-border/40"
                  size="lg"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    if (mixedRegionCart) {
                      toast.error("Domestic and international items can't be ordered together. Please remove one region before checkout.");
                      return;
                    }
                    setConfirmOpen(true);
                  }}
                  disabled={isSubmitting || mixedRegionCart}
                  className="flex-1 bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/80 text-background font-semibold gap-2 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--ice-blue)/0.3)]"
                  size="lg"
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="frosted-glass rounded-2xl p-5 lg:sticky lg:top-32 glow-border">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Package className="w-4 h-4 text-[hsl(var(--ice-blue))]" />
                  Order Summary
                </h2>

                <div className="space-y-3 mb-5 max-h-[350px] overflow-y-auto pr-1">
                  {mixedRegionCart && (
                    <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs font-semibold text-destructive">
                      Domestic and international items can't be ordered together. Remove one region before checkout.
                    </div>
                  )}

                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.variant.specification}`} className="flex justify-between items-start gap-2 pb-3 border-b border-border/20">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold leading-tight">{item.product.name}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{item.variant.specification} × {item.quantity}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-sm font-bold">{currencySymbol}{(item.variant.price * item.quantity).toFixed(2)}</span>
                        {!isUK && (
                          <p className="text-[9px] text-muted-foreground">{formatGbpEstimate(item.variant.price * item.quantity)}</p>
                        )}
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

                {/* Promo Code */}
                {iceElixirSubtotal > 0 && (
                  <div className="pt-3 border-t border-border/30">
                    {appliedPromo ? (
                      <div className="flex items-center justify-between gap-2 p-2 rounded-lg border border-[hsl(var(--ice-blue))]/30 bg-[hsl(var(--ice-blue))]/[0.06]">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <Check className="w-3.5 h-3.5 text-[hsl(var(--ice-blue))] flex-shrink-0" />
                          <span className="text-xs font-semibold truncate">{appliedPromo}</span>
                          <span className="text-[10px] text-muted-foreground">— 7% off Ice Elixir</span>
                        </div>
                        <button
                          type="button"
                          onClick={removePromo}
                          className="text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="Promo code"
                          className="h-9 bg-secondary/20 border-border/30 text-xs"
                        />
                        <Button
                          type="button"
                          onClick={applyPromo}
                          variant="outline"
                          size="sm"
                          className="h-9 border-[hsl(var(--ice-blue))]/30 text-xs"
                        >
                          Apply
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2 pt-3 border-t border-border/30">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{currencySymbol}{calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Delivery{isUK ? ` (${shippingMethodLabel})` : ''}</span>
                    <span>{isUK && ukShippingMethod === 'inpost' ? 'Paid separately via InPost' : (deliveryFee === 0 ? 'Free' : `${currencySymbol}${deliveryFee.toFixed(2)}`)}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-xs text-[hsl(var(--ice-blue))]">
                      <span>Discount ({appliedPromo})</span>
                      <span>−{currencySymbol}{promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  {btcFee > 0 && (
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>BTC Processing Fee (4%)</span>
                      <span>{currencySymbol}{btcFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="h-px bg-gradient-to-r from-transparent via-[hsl(var(--ice-blue))]/20 to-transparent my-2" />
                  <div className="flex justify-between items-end">
                    <span className="text-base font-bold">Total</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-[hsl(var(--ice-blue))]">{currencySymbol}{calculateTotal().toFixed(2)}</span>
                      {!isUK && (
                        <p className="text-[10px] text-muted-foreground">{formatGbpEstimate(calculateTotal())}</p>
                      )}
                    </div>
                  </div>
                  {!isUK && <p className="text-[8px] text-muted-foreground mt-2">{GBP_DISCLAIMER}</p>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="frosted-glass border-[hsl(var(--ice-blue))]/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[hsl(var(--ice-blue))]" />
              Confirm Your Order
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3 pt-2">
              <span className="block">
                You're about to submit your order for{" "}
                <span className="font-bold text-foreground">{currencySymbol}{calculateTotal().toFixed(2)}</span>{" "}
                using <span className="font-bold text-foreground uppercase">{paymentMethod === 'bank' ? 'Bank Transfer' : paymentMethod === 'paypal' ? 'PayPal' : paymentMethod === 'btc' ? 'BTC (incl. 4% fee)' : paymentMethod}</span>.
              </span>
              <span className="block text-xs">
                After confirming, you'll receive an email with payment instructions. This action cannot be undone.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border/40">Go Back</AlertDialogCancel>
            <AlertDialogAction
              onClick={handlePlaceOrder}
              className="bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/80 text-background font-semibold"
            >
              Yes, Submit Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
}
