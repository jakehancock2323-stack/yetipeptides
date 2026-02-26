import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart } from '@/contexts/CartContext';
import { Trash2, ShoppingBag, ArrowRight, Package, BookOpen } from 'lucide-react';
import QuantityInput from '@/components/QuantityInput';
import { formatGbpEstimate, GBP_DISCLAIMER } from '@/lib/currency';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, includeEbook, setIncludeEbook } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <SEO 
          title="Shopping Cart – Yeti Peptides"
          description="Review your research peptide order. Premium laboratory-grade peptides with secure checkout. UK & worldwide shipping available."
          keywords="peptide cart, buy peptides, research peptide checkout"
          canonical="https://yetipeptides.com/cart"
        />
        <Snowfall />
        <Navbar />
        <div className="container mx-auto px-4 pt-32">
          <div className="max-w-md mx-auto text-center py-20">
            <div className="frosted-glass rounded-2xl p-10 glow-border">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/30 flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Cart is empty</h2>
              <p className="text-sm text-muted-foreground mb-8">Browse our research-grade peptides to get started.</p>
              <Link to="/products">
                <Button className="bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/90 text-background gap-2">
                  Browse Products
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <SEO 
        title="Shopping Cart – Yeti Peptides"
        description="Review your research peptide order. Premium laboratory-grade peptides with secure checkout. UK & worldwide shipping available."
        keywords="peptide cart, buy peptides, research peptide checkout"
        canonical="https://yetipeptides.com/cart"
      />
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-32">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--ice-blue))] font-semibold">
            Order Review
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--frost))] bg-clip-text text-transparent">
            Shopping Cart
          </h1>
          <p className="text-sm text-muted-foreground mt-2">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-[1fr_340px] gap-6">
          {/* Items Column */}
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={`${item.product.id}-${item.variant.specification}`}
                className="frosted-glass rounded-xl p-4 glow-border fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-secondary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Package className="w-5 h-5 text-[hsl(var(--ice-blue))]" />
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold leading-tight">{item.product.name}</h3>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{item.variant.specification}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.product.id, item.variant.specification)}
                        className="hover:bg-destructive/10 hover:text-destructive h-7 w-7 flex-shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <QuantityInput
                        value={item.quantity}
                        onChange={(qty) =>
                          updateQuantity(item.product.id, item.variant.specification, qty)
                        }
                        className="w-16 sm:w-20 text-center h-8 text-sm"
                      />
                      <div className="text-right">
                        <p className="text-lg font-bold text-[hsl(var(--ice-blue))]">${(item.variant.price * item.quantity).toFixed(2)}</p>
                        <p className="text-[11px] text-muted-foreground">{formatGbpEstimate(item.variant.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* E-book Add-on */}
            <div className="frosted-glass rounded-xl p-4 glow-border">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="ebook-addon-cart"
                  checked={includeEbook}
                  onCheckedChange={(checked) => setIncludeEbook(checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label
                    htmlFor="ebook-addon-cart"
                    className="text-sm font-semibold cursor-pointer leading-tight flex items-center gap-2"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[hsl(var(--ice-blue))]" />
                    Yeti's E-book – GLP1 Series
                  </label>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                    Digital guide: GLP-1 family, mechanisms & research use.
                  </p>
                  <p className="text-sm font-bold text-[hsl(var(--ice-blue))] mt-2">+$4.99</p>
                </div>
              </div>
            </div>

            {/* Total Card */}
            <div className="frosted-glass rounded-xl p-5 ice-glow">
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-[hsl(var(--ice-blue))]">${getTotalPrice().toFixed(2)}</span>
                    <p className="text-[11px] text-muted-foreground">{formatGbpEstimate(getTotalPrice())}</p>
                  </div>
                </div>
                <p className="text-[9px] text-muted-foreground">{GBP_DISCLAIMER}</p>
              </div>

              <Link to="/checkout" className="block mt-5">
                <Button className="w-full bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/80 text-background font-semibold gap-2 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--ice-blue)/0.3)]" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
