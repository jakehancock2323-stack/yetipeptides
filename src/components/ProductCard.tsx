import { useState } from 'react';
import { Product } from '@/data/products';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { CheckCircle2, Truck, Package, ShieldCheck, FileText, Thermometer, AlertTriangle, ChevronDown } from 'lucide-react';
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
          <Collapsible className="border border-border rounded-lg">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-accent/50 transition-colors">
              <span className="font-medium text-sm">Reconstitution Guidance</span>
              <ChevronDown className="h-4 w-4 transition-transform" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 px-4 pb-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                This information is for laboratory research only and not for human use.
                Reconstitute using bacteriostatic water as preferred by the researcher. 
                Gently swirl to mix; avoid shaking. Handle using standard laboratory procedures.
              </p>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible className="border border-border rounded-lg">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-accent/50 transition-colors">
              <span className="font-medium text-sm">Storage Instructions</span>
              <ChevronDown className="h-4 w-4 transition-transform" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 px-4 pb-4">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Store lyophilized powder at -20°C, protected from light and moisture</li>
                <li>• After reconstitution, store at 2-8°C and use within 14 days</li>
              </ul>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible className="border border-border rounded-lg">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-accent/50 transition-colors">
              <span className="font-medium text-sm">Solubility</span>
              <ChevronDown className="h-4 w-4 transition-transform" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 px-4 pb-4">
              <p className="text-sm text-muted-foreground">
                Soluble in sterile water or bacteriostatic water (for research use only)
              </p>
            </CollapsibleContent>
          </Collapsible>

          <div className="border-2 border-destructive/50 rounded-lg p-4 bg-destructive/5">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-destructive mb-1">IMPORTANT INFORMATION:</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This product is for laboratory research use only. It is not for human or veterinary use, and is not approved for diagnostic, therapeutic, or medical applications.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Handle according to appropriate laboratory safety procedures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
