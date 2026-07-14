import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, BookOpen, Truck, Lock, ShieldCheck, UserPlus } from 'lucide-react';
import QuantityInput from '@/components/QuantityInput';


export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, includeEbook, setIncludeEbook } = useCart();
  const { user } = useAuth();
  const subtotal = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <SEO
          title="Shopping Basket – Yeti Pep"
          description="Review your research peptide order. Royal Mail 24 tracked UK domestic delivery."
          canonical="https://yetipeptides.com/cart"
        />
        <Snowfall />
        <Navbar />
        <div className="container mx-auto px-4 pt-32">
          <div className="max-w-md mx-auto text-center py-16 sm:py-20">
            <div className="frosted-glass rounded-2xl p-8 sm:p-10 glow-border">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/30 flex items-center justify-center ring-1 ring-border/30">
                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Your basket is empty</h2>
              <p className="text-sm text-muted-foreground mb-8">Browse our research-grade pep to get started.</p>
              <Link to="/products">
                <Button className="bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/90 text-background gap-2">
                  Browse Products
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <SEO
        title="Shopping Basket – Yeti Pep"
        description="Review your research peptide order. Royal Mail 24 tracked UK domestic delivery."
        canonical="https://yetipeptides.com/cart"
      />
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-24 md:pt-28">
        {/* Magazine header */}
        <div className="max-w-6xl mx-auto mb-6 md:mb-8 grid md:grid-cols-12 gap-4 items-end border-b border-border/30 pb-5">
          <div className="md:col-span-8 flex items-center gap-3">
            <div className="hidden sm:flex w-10 h-10 rounded-xl bg-[hsl(var(--ice-blue))]/12 items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-[hsl(var(--ice-blue))]" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-aurora mb-1.5">Order Review</div>
              <h1 className="text-2xl md:text-4xl font-bold leading-tight">Your Basket</h1>
            </div>
          </div>
          <div className="md:col-span-4 md:text-right text-xs text-muted-foreground">
            {items.length} line item{items.length !== 1 ? 's' : ''} · UK domestic only
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_360px] gap-5 lg:gap-6">
          {/* Items Column */}
          <div className="space-y-3">
            {!user && (
              <Link
                to="/auth?mode=signup"
                className="group block rounded-xl p-4 border border-[hsl(var(--ice-blue))]/25 bg-[hsl(var(--ice-blue))]/[0.04] hover:bg-[hsl(var(--ice-blue))]/[0.08] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[hsl(var(--ice-blue))]/15 flex items-center justify-center flex-shrink-0">
                    <UserPlus className="w-4 h-4 text-[hsl(var(--ice-blue))]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-tight">Create an account to track this order</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Sign in or sign up to save your order history.</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[hsl(var(--ice-blue))] flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            )}

            {items.map((item, index) => (
              <div
                key={`${item.product.id}-${item.variant.specification}`}
                className="group rounded-xl border border-border/30 bg-secondary/10 hover:border-[hsl(var(--ice-blue))]/30 transition-all p-4 sm:p-5 fade-in-up"
                style={{ animationDelay: `${index * 0.04}s` }}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold leading-tight">{item.product.name}</h3>
                    <p className="text-[11px] text-muted-foreground mt-1 flex flex-wrap items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full border border-border/40 text-[10px]">{item.variant.specification}</span>
                      <span className="text-[10px]">£{item.variant.price.toFixed(2)} each</span>
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.variant.specification)}
                    className="opacity-60 hover:opacity-100 hover:text-destructive transition-colors flex-shrink-0"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <QuantityInput
                    value={item.quantity}
                    onChange={(qty) =>
                      updateQuantity(item.product.id, item.variant.specification, qty)
                    }
                    className="w-20 h-9 text-sm text-center"
                  />
                  <div className="text-right">
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Line total</p>
                    <p className="text-xl sm:text-2xl font-bold text-[hsl(var(--ice-blue))] leading-none mt-0.5">
                      £{(item.variant.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <Link to="/products" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mt-2">
              <ArrowLeft className="w-3 h-3" /> Continue shopping
            </Link>
          </div>

          {/* Sidebar */}
          <div className="space-y-3 lg:sticky lg:top-28 self-start">
            {/* E-book Add-on */}
            <button
              type="button"
              onClick={() => setIncludeEbook(!includeEbook)}
              className={`w-full text-left rounded-xl border p-4 transition-all ${
                includeEbook
                  ? 'border-[hsl(var(--ice-blue))]/40 bg-[hsl(var(--ice-blue))]/[0.06]'
                  : 'border-dashed border-border/40 hover:border-border/70 bg-secondary/10'
              }`}
            >
              <div className="flex items-start gap-3">
                <Checkbox checked={includeEbook} className="mt-1 pointer-events-none" />
                <div className="flex-1">
                  <div className="text-sm font-semibold leading-tight flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[hsl(var(--ice-blue))]" />
                    Yeti's E-book – GLP1 Series
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                    Digital guide on the GLP-1 family, mechanisms & research use.
                  </p>
                </div>
                <span className="text-sm font-bold text-[hsl(var(--ice-blue))]">+£4.99</span>
              </div>
            </button>

            {/* Total Card */}
            <div className="rounded-xl p-5 bg-gradient-to-br from-[hsl(var(--ice-blue))]/[0.08] via-transparent to-transparent border border-[hsl(var(--ice-blue))]/25">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Items subtotal</span>
                  <span className="font-semibold">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Royal Mail 24 Tracked</span>
                  <span>£6.00</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>InPost Locker</span>
                  <span>Paid separately</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-[hsl(var(--ice-blue))]/20 to-transparent" />
                <div className="flex justify-between items-end pt-1">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Estimated Total</p>
                    <p className="text-xs text-muted-foreground mt-0.5">incl. Royal Mail 24</p>
                  </div>
                  <span className="text-3xl font-bold text-[hsl(var(--ice-blue))] leading-none">
                    £{(subtotal + 6).toFixed(2)}
                  </span>
                </div>
              </div>

              <Link to="/checkout" className="block mt-5">
                <Button
                  className="w-full bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/85 text-background font-semibold gap-2 h-12 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--ice-blue)/0.35)]"
                  size="lg"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border/20">
                <div className="flex flex-col items-center gap-1 text-[9.5px] text-muted-foreground text-center">
                  <Truck className="w-3.5 h-3.5 text-[hsl(var(--ice-blue))]" />
                  <span>Royal Mail 24</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-[9.5px] text-muted-foreground text-center">
                  <Lock className="w-3.5 h-3.5 text-[hsl(var(--ice-blue))]" />
                  <span>Crypto Pay</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-[9.5px] text-muted-foreground text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[hsl(var(--ice-blue))]" />
                  <span>Discreet</span>
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
