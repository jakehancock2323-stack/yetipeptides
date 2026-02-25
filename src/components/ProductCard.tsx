import { useState } from 'react';
import { Product } from '@/data/products';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { CheckCircle2, Truck, Package, ShieldCheck, FileText, AlertTriangle, ChevronDown, Beaker, Snowflake } from 'lucide-react';
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
      <div className="relative z-10 mb-4 flex justify-center">
        <div className="w-28 h-36 flex items-center justify-center overflow-hidden">
          <img 
            src={yetiVial} 
            alt={`${product.name} - Yeti Peptides Research Vial`}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Product Header */}
      <div className="mb-3 relative z-10 text-center">
        <h3 className="text-lg font-bold mb-0.5 group-hover:text-ice-blue transition-colors">{product.name}</h3>
        <p className="text-[11px] text-muted-foreground uppercase tracking-[0.15em]">{product.category}</p>
      </div>

      {/* Scientific Highlights */}
      <div className="grid grid-cols-2 gap-1.5 mb-4 relative z-10">
        {[
          { icon: CheckCircle2, label: 'High Purity 99%+' },
          { icon: Beaker, label: 'Lyophilised Powder' },
          { icon: FileText, label: 'COA on Request' },
          { icon: Snowflake, label: 'Cold Storage' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-secondary/30 rounded px-2 py-1">
            <Icon className="w-3 h-3 text-ice-blue flex-shrink-0" />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Ingredients (if available) */}
      {product.ingredients && (
        <div className="mb-3 relative z-10">
          <details className="group/details">
            <summary className="text-sm font-medium text-muted-foreground cursor-pointer hover:text-ice-blue transition-colors list-none flex items-center gap-2 select-none">
              <span className="inline-block transition-transform group-open/details:rotate-90">▶</span>
              Key Ingredients
            </summary>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground pl-6">
              {product.ingredients.map((ingredient, index) => (
                <li key={index}>• {ingredient}</li>
              ))}
            </ul>
          </details>
        </div>
      )}

      <div className="space-y-3 relative z-10 flex-1 flex flex-col">
        {/* Variant Selection */}
        <div>
          <label className="text-[10px] text-muted-foreground mb-1.5 block uppercase tracking-[0.15em]">Specification</label>
          <Select
            value={selectedVariantIndex.toString()}
            onValueChange={(value) => setSelectedVariantIndex(parseInt(value))}
          >
            <SelectTrigger className="bg-secondary/20 border-border/30 h-9 text-sm">
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

        {/* Price Display */}
        <div className="text-2xl font-bold text-ice-blue">
          ${selectedVariant.price}
        </div>

        {/* Add to Cart */}
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 bg-secondary/20 border-border/30 h-9 text-sm"
          />
          <Button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex-1 bg-ice-blue hover:bg-ice-blue/90 text-background font-semibold h-9 text-sm"
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 gap-1.5 pt-3 border-t border-border/20 mt-auto">
          {[
            { icon: Truck, label: 'Tracked Shipping' },
            { icon: Package, label: 'Discreet Package' },
            { icon: ShieldCheck, label: 'COA Available' },
            { icon: CheckCircle2, label: '99%+ Purity' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Icon className="w-3 h-3 text-ice-blue" />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Collapsible Sections */}
        <div className="space-y-1.5">
          <Collapsible className="border border-border/20 rounded-lg bg-secondary/10">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2.5 hover:bg-secondary/20 transition-colors text-left">
              <span className="font-medium text-xs">Storage Guidance</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-2.5 pb-2.5">
              <ul className="text-[11px] text-muted-foreground space-y-1">
                <li>• Store lyophilised powder at -20°C, protected from light</li>
                <li>• After reconstitution, store at 2-8°C</li>
                <li>• Use reconstituted solution within 14 days</li>
                <li>• Avoid repeated freeze-thaw cycles</li>
              </ul>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible className="border border-border/20 rounded-lg bg-secondary/10">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2.5 hover:bg-secondary/20 transition-colors text-left">
              <span className="font-medium text-xs">Reconstitution</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-2.5 pb-2.5">
              <p className="text-[11px] text-muted-foreground">
                Reconstitute with sterile water or bacteriostatic water. Add solvent slowly 
                down the side of the vial. Allow to dissolve gently - do not shake or vortex. 
                For research use only.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Research Use Disclaimer */}
        <div className="mt-2 p-2.5 bg-destructive/5 border border-destructive/20 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-semibold text-destructive mb-0.5">Research Use Only</p>
              <p className="text-[11px] text-muted-foreground">
                For laboratory research only. Not for human consumption.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
