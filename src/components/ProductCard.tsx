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
    <div className="frosted-glass rounded-lg p-6 hover:ice-glow hover:scale-[1.01] hover:border-ice-blue/50 transition-all duration-300 group relative overflow-hidden flex flex-col">
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-ice-blue/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-ice-blue/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-ice-blue/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-ice-blue/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Product Image */}
      <div className="relative z-10 mb-4 flex justify-center">
        <div className="w-32 h-40 flex items-center justify-center overflow-hidden">
          <img 
            src={yetiVial} 
            alt={`${product.name} - Yeti Peptides Research Vial`}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Product Header */}
      <div className="mb-4 relative z-10 text-center">
        <h3 className="text-lg sm:text-xl font-bold mb-1 group-hover:text-ice-blue transition-colors">{product.name}</h3>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</p>
      </div>

      {/* Scientific Highlights */}
      <div className="grid grid-cols-2 gap-2 mb-4 relative z-10">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/50 rounded px-2 py-1">
          <CheckCircle2 className="w-3 h-3 text-ice-blue flex-shrink-0" />
          <span>High Purity 99%+</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/50 rounded px-2 py-1">
          <Beaker className="w-3 h-3 text-ice-blue flex-shrink-0" />
          <span>Lyophilised Powder</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/50 rounded px-2 py-1">
          <FileText className="w-3 h-3 text-ice-blue flex-shrink-0" />
          <span>COA on Request</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/50 rounded px-2 py-1">
          <Snowflake className="w-3 h-3 text-ice-blue flex-shrink-0" />
          <span>Cold Storage</span>
        </div>
      </div>

      {/* Ingredients (if available) */}
      {product.ingredients && (
        <div className="mb-4 relative z-10">
          <details className="group/details">
            <summary className="text-sm font-medium text-muted-foreground cursor-pointer hover:text-ice-blue transition-colors list-none flex items-center gap-2 select-none">
              <span className="inline-block transition-transform group-open/details:rotate-90">▶</span>
              Key Ingredients
            </summary>
            <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground pl-6 pr-2">
              {product.ingredients.map((ingredient, index) => (
                <li key={index} className="leading-relaxed">• {ingredient}</li>
              ))}
            </ul>
          </details>
        </div>
      )}

      <div className="space-y-4 relative z-10 flex-1 flex flex-col">
        {/* Variant Selection */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block uppercase tracking-wide">Specification</label>
          <Select
            value={selectedVariantIndex.toString()}
            onValueChange={(value) => setSelectedVariantIndex(parseInt(value))}
          >
            <SelectTrigger className="bg-secondary/30">
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
        <div className="text-2xl sm:text-3xl font-bold text-ice-blue">
          £{selectedVariant.price}
        </div>

        {/* Add to Cart */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full sm:w-20 bg-secondary/30"
          />
          <Button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex-1 bg-ice-blue hover:bg-ice-blue/90 text-background font-semibold"
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-border/50 mt-auto">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Truck className="w-3.5 h-3.5 text-ice-blue" />
            <span>Tracked Shipping</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Package className="w-3.5 h-3.5 text-ice-blue" />
            <span>Discreet Package</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="w-3.5 h-3.5 text-ice-blue" />
            <span>COA Available</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="w-3.5 h-3.5 text-ice-blue" />
            <span>99%+ Purity</span>
          </div>
        </div>

        {/* Collapsible Sections */}
        <div className="space-y-2">
          <Collapsible className="border border-border/50 rounded-lg bg-secondary/20">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-secondary/30 transition-colors text-left">
              <span className="font-medium text-sm">Storage Guidance</span>
              <ChevronDown className="h-4 w-4 transition-transform" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3 pb-3">
              <ul className="text-xs text-muted-foreground space-y-1.5">
                <li>• Store lyophilised powder at -20°C, protected from light</li>
                <li>• After reconstitution, store at 2-8°C</li>
                <li>• Use reconstituted solution within 14 days</li>
                <li>• Avoid repeated freeze-thaw cycles</li>
              </ul>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible className="border border-border/50 rounded-lg bg-secondary/20">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-secondary/30 transition-colors text-left">
              <span className="font-medium text-sm">Reconstitution</span>
              <ChevronDown className="h-4 w-4 transition-transform" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3 pb-3">
              <p className="text-xs text-muted-foreground">
                Reconstitute with sterile water or bacteriostatic water. Add solvent slowly 
                down the side of the vial. Allow to dissolve gently - do not shake or vortex. 
                For research use only.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Research Use Disclaimer */}
        <div className="mt-3 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-destructive mb-0.5">Research Use Only</p>
              <p className="text-xs text-muted-foreground">
                For laboratory research only. Not for human consumption.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}