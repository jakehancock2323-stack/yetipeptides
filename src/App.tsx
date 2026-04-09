import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from "./contexts/CartContext";
import { RegionProvider } from "./contexts/RegionContext";
import AgeVerification from "./components/AgeVerification";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Contact from "./pages/Contact";
import PeptideCalculator from "./pages/PeptideCalculator";
import AboutUs from "./pages/AboutUs";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import ShippingReturns from "./pages/ShippingReturns";
import ResearchDisclaimer from "./pages/ResearchDisclaimer";
import HowToPayCrypto from "./pages/HowToPayCrypto";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <RegionProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
              <AgeVerification onVerified={() => setIsVerified(true)} />
              {isVerified && (
                <BrowserRouter>
                  <ScrollToTop />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/about" element={<AboutUs />} />
                    
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/calculator" element={<PeptideCalculator />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-conditions" element={<TermsConditions />} />
                    <Route path="/shipping-returns" element={<ShippingReturns />} />
                    <Route path="/research-disclaimer" element={<ResearchDisclaimer />} />
                    <Route path="/how-to-pay-crypto" element={<HowToPayCrypto />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              )}
            </CartProvider>
          </RegionProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
