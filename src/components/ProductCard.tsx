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
    <div className="frosted-glass rounded-lg p-6 hover:ice-glow transition-all duration-300">
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.category}</p>
      </div>

      <div className="space-y-4">
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

        <div className="text-3xl font-bold text-[hsl(var(--ice-blue))]">
          ${selectedVariant.price}
        </div>

        <div className="flex items-center gap-2">
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20"
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
