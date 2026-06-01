import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Product, ProductVariant } from '@/data/products';
import { toast } from 'sonner';
import { CartRegion, getProductRegion } from '@/lib/cartRegion';

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

const getRegionConflictMessage = (existingRegion: CartRegion, incomingRegion: CartRegion) =>
  `Your cart contains ${existingRegion} items. Clear it before adding ${incomingRegion} items.`;

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity: number) => boolean;
  removeFromCart: (productId: string, variantSpec: string) => void;
  updateQuantity: (productId: string, variantSpec: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
  includeEbook: boolean;
  setIncludeEbook: (include: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const itemsRef = useRef<CartItem[]>(items);

  const [includeEbook, setIncludeEbook] = useState<boolean>(() => {
    const saved = localStorage.getItem('includeEbook');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    itemsRef.current = items;
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('includeEbook', JSON.stringify(includeEbook));
  }, [includeEbook]);

  const addToCart = (product: Product, variant: ProductVariant, quantity: number) => {
    const incomingRegion = getProductRegion(product);
    const currentItems = itemsRef.current;
    const conflictingItem = currentItems.find((item) => getProductRegion(item.product) !== incomingRegion);
    if (conflictingItem) {
      toast.error(getRegionConflictMessage(getProductRegion(conflictingItem.product), incomingRegion));
      return false;
    }

    const existing = currentItems.find(
      item => item.product.id === product.id && 
        item.variant.specification === variant.specification
    );

    const nextItems = existing
      ? currentItems.map(item =>
          item.product.id === product.id &&
          item.variant.specification === variant.specification
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      : [...currentItems, { product, variant, quantity }];

    itemsRef.current = nextItems;
    setItems(nextItems);
    return true;
  };

  const removeFromCart = (productId: string, variantSpec: string) => {
    setItems(prev => {
      const nextItems = prev.filter(item => 
        !(item.product.id === productId && item.variant.specification === variantSpec)
      );
      itemsRef.current = nextItems;
      return nextItems;
    });
  };

  const updateQuantity = (productId: string, variantSpec: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantSpec);
      return;
    }

    setItems(prev => {
      const nextItems = prev.map(item =>
        item.product.id === productId && item.variant.specification === variantSpec
          ? { ...item, quantity }
          : item
      );
      itemsRef.current = nextItems;
      return nextItems;
    });
  };

  const clearCart = () => {
    itemsRef.current = [];
    setItems([]);
  };

  const getTotalPrice = () => {
    const itemsTotal = items.reduce((total, item) => total + (item.variant.price * item.quantity), 0);
    const ebookPrice = includeEbook ? 4.99 : 0;
    return itemsTotal + ebookPrice;
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getItemCount,
      includeEbook,
      setIncludeEbook
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
