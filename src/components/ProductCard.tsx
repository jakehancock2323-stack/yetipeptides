import { useState } from 'react';
import { Product } from '@/data/products';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const selectedVariant = product.variants[selectedVariantIndex];

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    toast.success(`Added ${quantity}x ${product.name} to cart`);
    setQuantity(1);
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
            className="flex-1 bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/90 text-background"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
