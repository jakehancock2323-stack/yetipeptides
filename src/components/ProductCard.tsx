import { useState } from 'react';
import { Product } from '@/data/products';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { ShoppingCart, Flame } from 'lucide-react';
import yetiVial from '@/assets/yeti-vial.png';
import v1PenImage from '@/assets/v1-pen.png';
import penCartridgeImage from '@/assets/pen-cartridge.png';
import hospiraBacWaterImage from '@/assets/bac-water-hospira.png';
import frostSkinImage from '@/assets/frostskin-serum.png';
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
  const isProductOutOfStock = product.outOfStock;
  const isVariantOutOfStock = selectedVariant.outOfStock;
  const isCurrentlyOutOfStock = isProductOutOfStock || isVariantOutOfStock;
  const allVariantsOutOfStock = product.outOfStock || product.variants.every(v => v.outOfStock);
  const isGbp = product.currency === 'GBP';
  const currencySymbol = isGbp ? '£' : '$';
  const productImage = product.id === 'v1-pen' ? v1PenImage : product.id === '3ml-pen-cartridge' ? penCartridgeImage : product.id === 'hospira-bac-water' ? hospiraBacWaterImage : yetiVial;

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

  const isUkDomestic = product.region === 'UK Domestic';

  return (
    <div className={`group relative rounded-xl border bg-card/30 hover:bg-card/60 transition-all duration-300 overflow-hidden flex flex-col ${
      product.popular ? 'border-amber-500/40 hover:border-amber-500/60 shadow-[0_0_24px_-12px] shadow-amber-500/40' :
      isUkDomestic ? 'border-ice-blue/25 hover:border-ice-blue/50' : 'border-border/20'
    }`}>
      {/* Most Popular ribbon */}
      {product.popular && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-background text-[11px] font-bold uppercase tracking-wider shadow-md">
          <Flame className="w-3 h-3" />
          Most Popular
        </div>
      )}

      {/* Image */}
      <div className="relative bg-secondary/10 flex items-center justify-center py-6">
        <img 
          src={productImage} 
          alt={`${product.name} - Research Product`}
          className={`${product.id === 'v1-pen' || product.id === '3ml-pen-cartridge' || product.id === 'hospira-bac-water' ? 'w-36 h-36' : 'w-20 h-28'} object-contain transition-transform duration-500 group-hover:scale-110 ${allVariantsOutOfStock ? 'opacity-40 grayscale' : ''}`}
          loading="lazy"
        />
        {isUkDomestic && (
          <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-bold text-ice-blue bg-ice-blue/15 backdrop-blur-sm px-2 py-0.5 rounded">
            UK
          </span>
        )}
        {allVariantsOutOfStock ? (
          <span className="absolute top-3 right-3 text-[11px] uppercase tracking-wider font-bold text-destructive bg-destructive/10 backdrop-blur-sm px-2 py-0.5 rounded">
            Out of Stock
          </span>
        ) : product.stockBadge ? (
          <span className="absolute top-3 right-3 text-[11px] uppercase tracking-wider font-bold text-ice-blue bg-ice-blue/10 backdrop-blur-sm px-2 py-0.5 rounded">
            {product.stockBadge}
          </span>
        ) : null}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Category label */}
        <span className="text-[11px] uppercase tracking-wider font-medium text-muted-foreground">
          {product.category}
        </span>

        {/* Name + Price */}
        <div className="flex items-start justify-between gap-2 -mt-1">
          <h3 className="text-base font-semibold leading-tight group-hover:text-ice-blue transition-colors">
            {product.name}
          </h3>
          <div className="text-right whitespace-nowrap">
            <span className="text-2xl font-bold text-ice-blue">{currencySymbol}{selectedVariant.price}</span>
            {!isGbp && (
              <p className="text-xs text-muted-foreground">{formatGbpEstimate(selectedVariant.price)}</p>
            )}
          </div>
        </div>

        {/* Ingredients preview */}
        {product.ingredients && (
          <details className="text-sm">
            <summary className="text-xs font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors select-none">
              View ingredients
            </summary>
            <ul className="mt-1.5 space-y-0.5 text-muted-foreground pl-3">
              {product.ingredients.map((ingredient, i) => (
                <li key={i} className="text-xs">· {ingredient}</li>
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
            <SelectTrigger className="bg-secondary/20 border-border/20 h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {product.variants.map((variant, index) => (
                <SelectItem key={index} value={index.toString()} className={`text-sm ${variant.outOfStock ? 'text-muted-foreground line-through' : ''}`}>
                  {variant.specification} — {currencySymbol}{variant.price}{variant.outOfStock ? ' (Out of Stock)' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {product.variants.length === 1 && (
          <p className="text-sm text-muted-foreground">{selectedVariant.specification}</p>
        )}

        {/* Add to cart */}
        <div className="flex items-center gap-2 mt-auto">
          {isCurrentlyOutOfStock ? (
            <Button 
              disabled
              size="sm"
              className="flex-1 h-9 text-sm"
              variant="outline"
            >
              {isProductOutOfStock ? 'Out of Stock' : 'Variant Out of Stock'}
            </Button>
          ) : (
            <>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-14 bg-secondary/20 border-border/20 h-9 text-sm text-center"
              />
              <Button 
                onClick={handleAddToCart}
                disabled={isAdding}
                size="sm"
                className="flex-1 bg-ice-blue hover:bg-ice-blue/90 text-background font-semibold h-9 text-sm gap-1.5"
              >
                <ShoppingCart className="w-4 h-4" />
                {isAdding ? "Added!" : "Add to Cart"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
