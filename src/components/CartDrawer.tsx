import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart } from '@/contexts/CartContext';
import { Trash2, ShoppingBag } from 'lucide-react';
import Snowfall from './Snowfall';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice, includeEbook, setIncludeEbook } = useCart();

  if (items.length === 0) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <Snowfall />
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center py-16">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-lg font-semibold mb-2">Your cart is empty</p>
            <p className="text-sm text-muted-foreground mb-6">Add some products to get started!</p>
            <Button 
              onClick={() => onOpenChange(false)}
              className="bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/90 text-background"
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
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto flex flex-col">
        <Snowfall />
        <SheetHeader>
          <SheetTitle>Shopping Cart ({items.length} items)</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.variant.specification}`}
              className="frosted-glass rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1">{item.product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-1">{item.product.category}</p>
                  <p className="text-xs text-muted-foreground">{item.variant.specification}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.product.id, item.variant.specification)}
                  className="hover:bg-destructive hover:text-destructive-foreground h-8 w-8"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Qty:</span>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item.product.id,
                        item.variant.specification,
                        parseInt(e.target.value) || 1
                      )
                    }
                    className="w-16 h-8 text-sm"
                  />
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">${item.variant.price} each</p>
                  <p className="font-bold text-[hsl(var(--ice-blue))]">
                    ${(item.variant.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-4 mt-auto space-y-4">
          {/* E-book Add-on */}
          <div className="frosted-glass rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="ebook-addon"
                checked={includeEbook}
                onCheckedChange={(checked) => setIncludeEbook(checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1">
                <label
                  htmlFor="ebook-addon"
                  className="text-sm font-semibold cursor-pointer leading-tight block mb-1"
                >
                  Yeti's E-book – The GLP1 Series
                </label>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A concise digital guide explaining the GLP-1 family, mechanisms, and research use.
                </p>
                <p className="text-sm font-bold text-[hsl(var(--ice-blue))] mt-2">+$4.99</p>
              </div>
            </div>
          </div>

          <div className="frosted-glass rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
              <span>Total:</span>
              <span className="text-[hsl(var(--ice-blue))]">${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>

          <Link to="/checkout" onClick={() => onOpenChange(false)}>
            <Button 
              className="w-full bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/90 text-background" 
              size="lg"
            >
              Proceed to Checkout
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Continue Shopping
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
