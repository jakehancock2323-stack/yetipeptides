import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart } from '@/contexts/CartContext';
import { Trash2, ShoppingBag } from 'lucide-react';
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
          <div className="max-w-2xl mx-auto text-center py-20">
            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Add some products to get started!</p>
            <Link to="/products">
              <Button className="bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/90 text-background">
                Browse Products
              </Button>
            </Link>
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
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--frost))] bg-clip-text text-transparent">
          Shopping Cart
        </h1>

        <div className="max-w-4xl mx-auto">
          <div className="frosted-glass rounded-lg p-4 sm:p-6 mb-6">
            {items.map((item, index) => (
              <div
                key={`${item.product.id}-${item.variant.specification}`}
                className={`flex flex-col gap-4 ${
                  index !== items.length - 1 ? 'border-b border-border pb-6 mb-6' : ''
                }`}
              >
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold mb-1">{item.product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{item.product.category}</p>
                  <p className="text-sm">{item.variant.specification}</p>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 w-full justify-between sm:justify-start">
                  <div className="flex items-center gap-2">
                    <QuantityInput
                      value={item.quantity}
                      onChange={(qty) =>
                        updateQuantity(item.product.id, item.variant.specification, qty)
                      }
                      className="w-16 sm:w-20 text-center"
                    />
                  </div>

                  <div className="min-w-[80px] sm:min-w-[100px] text-right">
                    <p className="text-lg sm:text-xl font-bold text-[hsl(var(--ice-blue))]">${(item.variant.price * item.quantity).toFixed(2)}</p>
                    <p className="text-[11px] text-muted-foreground">{formatGbpEstimate(item.variant.price * item.quantity)}</p>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.product.id, item.variant.specification)}
                    className="hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* E-book Add-on */}
          <div className="frosted-glass rounded-lg p-4 sm:p-6 mb-6">
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
                  className="text-base sm:text-lg font-semibold cursor-pointer leading-tight block mb-2"
                >
                  Yeti's E-book – The GLP1 Series
                </label>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  A concise digital guide explaining the GLP-1 family, mechanisms, and research use.
                </p>
                <p className="text-lg sm:text-xl font-bold text-[hsl(var(--ice-blue))]">+$4.99</p>
              </div>
            </div>
          </div>

          <div className="frosted-glass rounded-lg p-4 sm:p-6">
            <div className="flex justify-between items-center mb-2 text-xl sm:text-2xl font-bold">
              <span>Total:</span>
              <div className="text-right">
                <span className="text-[hsl(var(--ice-blue))]">${getTotalPrice().toFixed(2)}</span>
                <p className="text-xs text-muted-foreground font-normal">{formatGbpEstimate(getTotalPrice())}</p>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mb-4">{GBP_DISCLAIMER}</p>

            <Link to="/checkout">
              <Button className="w-full bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/90 text-background" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
