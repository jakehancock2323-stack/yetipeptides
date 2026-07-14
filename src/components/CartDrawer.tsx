import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart } from '@/contexts/CartContext';
import { Trash2, ShoppingBag, ArrowRight, BookOpen, Truck, Lock, Sparkles } from 'lucide-react';
import Snowfall from './Snowfall';
import QuantityInput from './QuantityInput';


interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice, includeEbook, setIncludeEbook } = useCart();
  const subtotal = getTotalPrice();
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col border-l border-[hsl(var(--ice-blue))]/15 bg-background/95 backdrop-blur-2xl"
      >
        <Snowfall />

        {/* Gradient header */}
        <div className="relative px-5 pt-6 pb-5 border-b border-border/20 bg-gradient-to-br from-[hsl(var(--ice-blue))]/[0.08] via-transparent to-transparent">
          <SheetHeader>
            <SheetTitle className="text-left flex items-center gap-2.5 text-base">
              <div className="w-8 h-8 rounded-lg bg-[hsl(var(--ice-blue))]/15 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-[hsl(var(--ice-blue))]" />
              </div>
              <div className="leading-tight">
                <div className="text-[10px] uppercase tracking-[0.25em] text-aurora">Your Basket</div>
                <div className="text-base font-bold">{itemCount} item{itemCount !== 1 ? 's' : ''}</div>
              </div>
            </SheetTitle>
          </SheetHeader>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-20 h-20 rounded-full bg-secondary/30 flex items-center justify-center mb-5 ring-1 ring-border/30">
              <ShoppingBag className="w-9 h-9 text-muted-foreground" />
            </div>
            <h3 className="text-base font-bold mb-1">Your basket is empty</h3>
            <p className="text-xs text-muted-foreground mb-6 max-w-[240px]">Browse our research-grade pep and start your order.</p>
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/90 text-background gap-2"
            >
              Continue Shopping <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2.5">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.variant.specification}`}
                  className="group relative rounded-xl border border-border/30 bg-secondary/10 hover:border-[hsl(var(--ice-blue))]/30 transition-colors p-3.5"
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm leading-tight truncate">{item.product.name}</h3>
                      <p className="text-[10.5px] text-muted-foreground mt-0.5">{item.variant.specification}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.variant.specification)}
                      className="opacity-60 hover:opacity-100 hover:text-destructive transition-colors flex-shrink-0"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <QuantityInput
                      value={item.quantity}
                      onChange={(qty) =>
                        updateQuantity(item.product.id, item.variant.specification, qty)
                      }
                      className="w-16 h-8 text-xs text-center"
                    />
                    <div className="text-right">
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Subtotal</p>
                      <p className="text-base font-bold text-[hsl(var(--ice-blue))] leading-none mt-0.5">
                        £{(item.variant.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* E-book Add-on */}
              <button
                type="button"
                onClick={() => setIncludeEbook(!includeEbook)}
                className={`w-full text-left rounded-xl border p-3.5 transition-all ${
                  includeEbook
                    ? 'border-[hsl(var(--ice-blue))]/40 bg-[hsl(var(--ice-blue))]/[0.06]'
                    : 'border-dashed border-border/40 hover:border-border/70 bg-secondary/5'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <Checkbox checked={includeEbook} className="mt-0.5 pointer-events-none" />
                  <div className="flex-1">
                    <div className="text-xs font-semibold leading-tight flex items-center gap-1.5">
                      <BookOpen className="w-3 h-3 text-[hsl(var(--ice-blue))]" />
                      Add Yeti's GLP-1 E-book
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Digital research guide</p>
                  </div>
                  <span className="text-xs font-bold text-[hsl(var(--ice-blue))]">+£4.99</span>
                </div>
              </button>
            </div>

            {/* Sticky footer */}
            <div className="border-t border-border/30 bg-card/60 backdrop-blur-xl px-4 pt-4 pb-5 space-y-3">
              <div className="flex items-center justify-between gap-3 px-1 text-[10.5px] text-muted-foreground">
                <span className="flex items-center gap-1.5"><Truck className="w-3 h-3 text-[hsl(var(--ice-blue))]" />Royal Mail 24 from £6</span>
                <span className="flex items-center gap-1.5"><Lock className="w-3 h-3 text-[hsl(var(--ice-blue))]" />Crypto secure</span>
              </div>

              <div className="rounded-xl p-4 bg-gradient-to-br from-[hsl(var(--ice-blue))]/[0.08] to-transparent border border-[hsl(var(--ice-blue))]/20">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">Subtotal</span>
                  <span className="text-2xl font-bold text-[hsl(var(--ice-blue))]">£{subtotal.toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Shipping calculated at checkout
                </p>
              </div>

              <Link to="/checkout" onClick={() => onOpenChange(false)}>
                <Button
                  className="w-full bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/85 text-background font-semibold gap-2 h-12 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--ice-blue)/0.35)]"
                >
                  Secure Checkout
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <button
                onClick={() => onOpenChange(false)}
                className="block w-full text-center text-[11px] text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
