import { useState } from 'react';
import { Product } from '@/data/products';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { CheckCircle2, Truck, Package, ShieldCheck, FileText, Thermometer, AlertTriangle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const selectedVariant = product.variants[selectedVariantIndex];

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      addToCart(product, selectedVariant, quantity);
      toast.success(`Added ${quantity}x ${product.name} to cart`);
      setQuantity(1);
    } finally {
      // Brief delay to show loading state
      setTimeout(() => setIsAdding(false), 300);
    }
  };

  return (
    <div className="frosted-glass rounded-lg p-6 hover:ice-glow hover:scale-[1.02] hover:border-[hsl(var(--ice-blue))]/50 transition-all duration-300 group relative overflow-hidden">
      {/* Ice shards decoration */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[hsl(var(--ice-blue))]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[hsl(var(--ice-blue))]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[hsl(var(--ice-blue))]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[hsl(var(--ice-blue))]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Frost crystals */}
      <div className="absolute top-2 left-2 text-[hsl(var(--ice-blue))]/30 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">❄</div>
      <div className="absolute top-2 right-2 text-[hsl(var(--ice-blue))]/30 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">❄</div>
      <div className="absolute bottom-2 left-2 text-[hsl(var(--ice-blue))]/30 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">❄</div>
      <div className="absolute bottom-2 right-2 text-[hsl(var(--ice-blue))]/30 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">❄</div>
      
      <div className="mb-4 relative z-10">
        <h3 className="text-lg sm:text-xl font-semibold mb-1 group-hover:text-[hsl(var(--ice-blue))] transition-colors">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.category}</p>
      </div>

      {product.ingredients && (
        <div className="mb-4 relative z-10">
          <details className="group/details">
            <summary className="text-sm font-medium text-muted-foreground cursor-pointer hover:text-[hsl(var(--ice-blue))] transition-colors list-none flex items-center gap-2 select-none">
              <span className="inline-block transition-transform group-open/details:rotate-90">▶</span>
              Key Ingredients (per vial)
            </summary>
            <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-muted-foreground pl-6 pr-2">
              {product.ingredients.map((ingredient, index) => (
                <li key={index} className="leading-relaxed">• {ingredient}</li>
              ))}
            </ul>
          </details>
        </div>
      )}

      <div className="space-y-4 relative z-10">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Specification</label>
          <Select
            value={selectedVariantIndex.toString()}
            onValueChange={(value) => setSelectedVariantIndex(parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {product.variants.map((variant, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {variant.specification}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-2xl sm:text-3xl font-bold text-[hsl(var(--ice-blue))]">
          ${selectedVariant.price}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full sm:w-20"
          />
          <Button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex-1 bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/90 text-background"
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-border/50 mt-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Truck className="w-3.5 h-3.5 text-[hsl(var(--ice-blue))]" />
            <span>Tracked Shipping</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Package className="w-3.5 h-3.5 text-[hsl(var(--ice-blue))]" />
            <span>Discreet Package</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="w-3.5 h-3.5 text-[hsl(var(--ice-blue))]" />
            <span>Certificate of Analysis</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="w-3.5 h-3.5 text-[hsl(var(--ice-blue))]" />
            <span>99%+ Purity</span>
          </div>
        </div>

        {/* Research Use Warning */}
        <div className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
            <p className="text-xs font-semibold text-destructive">Research Use Only</p>
          </div>
          <p className="text-xs text-muted-foreground">Not for Human Consumption</p>
        </div>

        {/* Collapsible Information Sections */}
        <div className="mt-4 space-y-2">
          {/* Reconstitution Guidance */}
          <Collapsible>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-3 bg-card/50 hover:bg-card/70 rounded-lg border border-border/50 transition-colors">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[hsl(var(--ice-blue))]" />
                  <span className="text-sm font-medium">Reconstitution Guidance</span>
                </div>
                <span className="text-xs text-muted-foreground">▼</span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 mt-1 bg-card/30 rounded-lg border border-border/30">
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                  <strong className="text-foreground">Research Use Only:</strong> This information is for laboratory research only and not for human use.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Reconstitute using bacteriostatic water as preferred by the researcher. Gently swirl to mix; avoid shaking. 
                  Handle using standard laboratory procedures.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Storage Guidance */}
          <Collapsible>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-3 bg-card/50 hover:bg-card/70 rounded-lg border border-border/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-[hsl(var(--ice-blue))]" />
                  <span className="text-sm font-medium">Storage Guidance</span>
                </div>
                <span className="text-xs text-muted-foreground">▼</span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 mt-1 bg-card/30 rounded-lg border border-border/30">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Store sealed vials in a cool, dry place away from light. After reconstitution, refrigerate. 
                  Keep out of direct sunlight. Research use only.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
}
