import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart } from '@/contexts/CartContext';
import { Trash2, ShoppingBag, ArrowRight, Package, BookOpen } from 'lucide-react';
import Snowfall from './Snowfall';
import QuantityInput from './QuantityInput';
import { formatGbpEstimate, GBP_DISCLAIMER } from '@/lib/currency';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice, includeEbook, setIncludeEbook } = useCart();

  if (items.length === 0) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto border-l border-border/30">
          <Snowfall />
          <SheetHeader>
            <SheetTitle className="text-left">Shopping Cart</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-sm font-semibold mb-1">Your cart is empty</p>
            <p className="text-xs text-muted-foreground mb-6">Add some products to get started!</p>
            <Button 
              onClick={() => onOpenChange(false)}
              className="bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/90 text-background text-xs"
              size="sm"
            >
              Continue Shopping
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto flex flex-col border-l border-border/30 p-0">
        <Snowfall />
        
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-border/30">
          <SheetHeader>
            <SheetTitle className="text-left flex items-center gap-2 text-base">
              <Package className="w-4 h-4 text-[hsl(var(--ice-blue))]" />
              Cart
              <span className="text-xs font-normal text-muted-foreground">({items.length})</span>
            </SheetTitle>
          </SheetHeader>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.variant.specification}`}
              className="frosted-glass rounded-xl p-3.5"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Package className="w-4 h-4 text-[hsl(var(--ice-blue))] opacity-60" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-xs leading-tight">{item.product.name}</h3>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{item.variant.specification}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.product.id, item.variant.specification)}
                      className="hover:bg-destructive/10 hover:text-destructive h-6 w-6 flex-shrink-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-2.5">
                    <QuantityInput
                      value={item.quantity}
                      onChange={(qty) =>
                        updateQuantity(item.product.id, item.variant.specification, qty)
                      }
                      className="w-14 h-7 text-xs text-center"
                    />
                    <div className="text-right">
                      <p className="text-sm font-bold text-[hsl(var(--ice-blue))]">
                        ${(item.variant.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-[9px] text-muted-foreground">{formatGbpEstimate(item.variant.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-border/30 px-4 pt-4 pb-5 space-y-3 bg-card/40">
          {/* E-book Add-on */}
          <div className="frosted-glass rounded-xl p-3.5">
            <div className="flex items-start gap-2.5">
              <Checkbox
                id="ebook-addon"
                checked={includeEbook}
                onCheckedChange={(checked) => setIncludeEbook(checked as boolean)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <label
                  htmlFor="ebook-addon"
                  className="text-xs font-semibold cursor-pointer leading-tight flex items-center gap-1.5"
                >
                  <BookOpen className="w-3 h-3 text-[hsl(var(--ice-blue))]" />
                  E-book – GLP1 Series
                </label>
                <p className="text-[10px] text-muted-foreground mt-0.5">Digital research guide</p>
                <p className="text-xs font-bold text-[hsl(var(--ice-blue))] mt-1">+$4.99</p>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="rounded-xl p-4 ice-glow frosted-glass">
            <div className="flex justify-between items-end">
              <span className="text-sm font-bold">Total</span>
              <div className="text-right">
                <span className="text-xl font-bold text-[hsl(var(--ice-blue))]">${getTotalPrice().toFixed(2)}</span>
                <p className="text-[9px] text-muted-foreground">{formatGbpEstimate(getTotalPrice())}</p>
              </div>
            </div>
            <p className="text-[8px] text-muted-foreground mt-1">{GBP_DISCLAIMER}</p>
          </div>

          <Link to="/checkout" onClick={() => onOpenChange(false)}>
            <Button 
              className="w-full bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/80 text-background font-semibold gap-2 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--ice-blue)/0.3)]" 
              size="lg"
            >
              Checkout
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            className="w-full text-xs text-muted-foreground hover:text-foreground"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Continue Shopping
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
