import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant } from '@/data/products';

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  removeFromCart: (productId: string, variantSpec: string) => void;
  updateQuantity: (productId: string, variantSpec: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, variant: ProductVariant, quantity: number) => {
    setItems(prev => {
      const existing = prev.find(
        item => item.product.id === product.id && 
        item.variant.specification === variant.specification
      );

      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && 
          item.variant.specification === variant.specification
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { product, variant, quantity }];
    });
  };

  const removeFromCart = (productId: string, variantSpec: string) => {
    setItems(prev => 
      prev.filter(item => 
        !(item.product.id === productId && item.variant.specification === variantSpec)
      )
    );
  };

  const updateQuantity = (productId: string, variantSpec: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantSpec);
      return;
    }

    setItems(prev =>
      prev.map(item =>
        item.product.id === productId && item.variant.specification === variantSpec
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.variant.price * item.quantity), 0);
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
      getItemCount
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
