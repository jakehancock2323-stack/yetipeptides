import { useState } from 'react';
import { Product } from '@/data/products';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { ShoppingCart } from 'lucide-react';
import yetiVial from '@/assets/yeti-vial.png';
import v1PenImage from '@/assets/v1-pen.png';
import penCartridgeImage from '@/assets/pen-cartridge.png';
import { formatGbpEstimate } from '@/lib/currency';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const selectedVariant = product.variants[selectedVariantIndex];
  const isGbp = product.currency === 'GBP';
  const currencySymbol = isGbp ? '£' : '$';
  const productImage = product.id === 'v1-pen' ? v1PenImage : product.id === '3ml-pen-cartridge' ? penCartridgeImage : yetiVial;

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
    <div className="group rounded-xl border border-border/20 bg-card/30 hover:bg-card/60 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative bg-secondary/10 flex items-center justify-center py-6">
        <img 
          src={productImage} 
          alt={`${product.name} - Research Product`}
          className={`${product.id === 'v1-pen' || product.id === '3ml-pen-cartridge' ? 'w-36 h-36' : 'w-20 h-28'} object-contain transition-transform duration-500 group-hover:scale-110 ${product.outOfStock ? 'opacity-40 grayscale' : ''}`}
          loading="lazy"
        />
        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider text-muted-foreground bg-background/60 backdrop-blur-sm px-2 py-0.5 rounded">
          {product.category}
        </span>
        {product.outOfStock && (
          <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider font-bold text-destructive bg-destructive/10 backdrop-blur-sm px-2 py-0.5 rounded">
            Out of Stock
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Name + Price */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold leading-tight group-hover:text-ice-blue transition-colors">
            {product.name}
          </h3>
          <div className="text-right whitespace-nowrap">
            <span className="text-xl font-bold text-ice-blue">{currencySymbol}{selectedVariant.price}</span>
            {!isGbp && (
              <p className="text-xs text-muted-foreground">{formatGbpEstimate(selectedVariant.price)}</p>
            )}
          </div>
        </div>

        {/* Ingredients preview */}
        {product.ingredients && (
          <details className="text-xs">
            <summary className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
              View ingredients
            </summary>
            <ul className="mt-1.5 space-y-0.5 text-muted-foreground pl-3">
              {product.ingredients.map((ingredient, i) => (
                <li key={i} className="text-[11px]">· {ingredient}</li>
              ))}
            </ul>
          </details>
        )}

        {/* Variant selector */}
        {product.variants.length > 1 && (
          <Select
            value={selectedVariantIndex.toString()}
            onValueChange={(value) => setSelectedVariantIndex(parseInt(value))}
          >
            <SelectTrigger className="bg-secondary/20 border-border/20 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {product.variants.map((variant, index) => (
                <SelectItem key={index} value={index.toString()} className="text-xs">
                  {variant.specification} — {currencySymbol}{variant.price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {product.variants.length === 1 && (
          <p className="text-xs text-muted-foreground">{selectedVariant.specification}</p>
        )}

        {/* Add to cart */}
        <div className="flex items-center gap-2 mt-auto">
          {product.outOfStock ? (
            <Button 
              disabled
              size="sm"
              className="flex-1 h-8 text-xs"
              variant="outline"
            >
              Out of Stock
            </Button>
          ) : (
            <>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-14 bg-secondary/20 border-border/20 h-8 text-xs text-center"
              />
              <Button 
                onClick={handleAddToCart}
                disabled={isAdding}
                size="sm"
                className="flex-1 bg-ice-blue hover:bg-ice-blue/90 text-background font-medium h-8 text-xs gap-1.5"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                {isAdding ? "Added!" : "Add to Cart"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
