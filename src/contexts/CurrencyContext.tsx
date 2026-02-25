import React, { createContext, useContext, useState } from 'react';

type Currency = 'USD' | 'GBP';

// Fixed conversion rate USD to GBP
const USD_TO_GBP = 0.79;

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  convert: (usdAmount: number) => number;
  symbol: string;
  formatPrice: (usdAmount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD');

  const convert = (usdAmount: number): number => {
    if (currency === 'GBP') {
      return Math.round(usdAmount * USD_TO_GBP * 100) / 100;
    }
    return usdAmount;
  };

  const symbol = currency === 'GBP' ? '£' : '$';

  const formatPrice = (usdAmount: number): string => {
    const converted = convert(usdAmount);
    return `${symbol}${converted.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert, symbol, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
}
