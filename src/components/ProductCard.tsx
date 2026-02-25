import { useState } from 'react';
import { Product } from '@/data/products';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { toast } from 'sonner';
import { CheckCircle2, Truck, ShieldCheck, FileText, AlertTriangle, ChevronDown, Beaker } from 'lucide-react';
import yetiVial from '@/assets/yeti-vial.png';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const selectedVariant = product.variants[selectedVariantIndex];

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      addToCart(product, selectedVariant, quantity);
      toast.success(`Added ${quantity}x ${product.name} to cart`);
      setQuantity(1);
    } finally {
      setTimeout(() => setIsAdding(false), 300);
    }
  };

  return (
    <div className="frosted-glass rounded-xl p-5 glow-border hover:bg-card/80 transition-all duration-300 group relative overflow-hidden flex flex-col">
      {/* Product Image */}
      <div className="relative z-10 mb-3 flex justify-center">
        <div className="w-20 h-24 flex items-center justify-center overflow-hidden">
          <img 
            src={yetiVial} 
            alt={`${product.name} - Yeti Peptides Research Vial`}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Product Header */}
      <div className="mb-2 relative z-10 text-center">
        <h3 className="text-base font-bold mb-0.5 group-hover:text-ice-blue transition-colors">{product.name}</h3>
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em]">{product.category}</p>
      </div>

      {/* Quick badges - single row */}
      <div className="flex items-center justify-center gap-3 mb-3 relative z-10">
        {[
          { icon: CheckCircle2, label: '99%+' },
          { icon: Beaker, label: 'Lyophilised' },
          { icon: FileText, label: 'COA' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Icon className="w-3 h-3 text-ice-blue" />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Ingredients (if available) */}
      {product.ingredients && (
        <div className="mb-2 relative z-10">
          <details className="group/details">
            <summary className="text-xs font-medium text-muted-foreground cursor-pointer hover:text-ice-blue transition-colors list-none flex items-center gap-1.5 select-none">
              <span className="inline-block transition-transform group-open/details:rotate-90 text-[10px]">▶</span>
              Ingredients
            </summary>
            <ul className="mt-1.5 space-y-0.5 text-[11px] text-muted-foreground pl-4">
              {product.ingredients.map((ingredient, index) => (
                <li key={index}>• {ingredient}</li>
              ))}
            </ul>
          </details>
        </div>
      )}

      <div className="space-y-2.5 relative z-10 flex-1 flex flex-col">
        {/* Variant Selection */}
        <div>
          <Select
            value={selectedVariantIndex.toString()}
            onValueChange={(value) => setSelectedVariantIndex(parseInt(value))}
          >
            <SelectTrigger className="bg-secondary/20 border-border/30 h-8 text-xs">
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

        {/* Price + Add to Cart row */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-ice-blue whitespace-nowrap">
            {formatPrice(selectedVariant.price)}
          </span>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-14 bg-secondary/20 border-border/30 h-8 text-xs text-center"
          />
          <Button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex-1 bg-ice-blue hover:bg-ice-blue/90 text-background font-semibold h-8 text-xs"
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </Button>
        </div>

        {/* Trust row */}
        <div className="flex items-center justify-between pt-2 border-t border-border/20 mt-auto">
          {[
            { icon: Truck, label: 'Tracked' },
            { icon: ShieldCheck, label: 'COA' },
            { icon: CheckCircle2, label: '99%+' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Icon className="w-3 h-3 text-ice-blue" />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Collapsibles */}
        <div className="space-y-1">
          <Collapsible className="border border-border/20 rounded-lg bg-secondary/10">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-2.5 py-2 hover:bg-secondary/20 transition-colors text-left">
              <span className="font-medium text-[11px]">Storage</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-2.5 pb-2">
              <ul className="text-[10px] text-muted-foreground space-y-0.5">
                <li>• Store at -20°C, protected from light</li>
                <li>• After reconstitution, 2-8°C, use within 14 days</li>
              </ul>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible className="border border-border/20 rounded-lg bg-secondary/10">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-2.5 py-2 hover:bg-secondary/20 transition-colors text-left">
              <span className="font-medium text-[11px]">Reconstitution</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-2.5 pb-2">
              <p className="text-[10px] text-muted-foreground">
                Reconstitute with bacteriostatic water. Add slowly down vial side. Do not shake.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Disclaimer */}
        <div className="p-2 bg-destructive/5 border border-destructive/20 rounded-lg">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="w-3 h-3 text-destructive flex-shrink-0" />
            <p className="text-[10px] font-semibold text-destructive">Research Use Only – Not for human consumption</p>
          </div>
        </div>
      </div>
    </div>
  );
}
